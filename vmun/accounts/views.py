from django.http import JsonResponse
from django.views.generic.detail import DetailView
from django.views import View
from django.views.generic.edit import FormView
from django.core import serializers
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.shortcuts import redirect

from .models import User
from .forms import LoginForm, UserSignupForm

import json


class JSONResponseMixin:
    def render_to_json_response(self, context, **response_kwargs):
        return JsonResponse(self.get_data(context), **response_kwargs)

    def get_data(self, context):
        dictionary = context.split(', ')
        context = {}

        head_string = dictionary[2][11:].split(': ')
        context[head_string[0][1:-1]] = head_string[1][1:-1]

        for attribute in dictionary[3:len(dictionary)-1]:
            tmp_string = attribute.split(': ')
            context[tmp_string[0][1:-1]] = tmp_string[1][1:-1]

        last_string = dictionary[len(dictionary)-1][:-3].split(': ')
        context[last_string[0][1:-1]] = last_string[1][1:-1]

        del(context['password'])
        for key, value in context.items():
            if value == 'ru':
                context[key] = 'true'
            elif value == 'ul':
                context[key] = 'null'

        return context


class JSONProfileView(JSONResponseMixin, DetailView):
    model = User
    template_name = 'accounts/dashboard/profile-json.html'

    def get_context_data(self, **kwargs):
        data = serializers.serialize('json', self.get_queryset())
        return data

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserLoginView(View):
    form_class = LoginForm
    template_name = 'accounts/auth/auth-login.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {'form': self.form_class})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': 'user not found'})

        return JsonResponse({'success': False, 'errors': form.errors})
        

class UserSignupView(FormView):
    form_class = UserSignupForm
    template_name = 'accounts/auth/auth-signup.html'

