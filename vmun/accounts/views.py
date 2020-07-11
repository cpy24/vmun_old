from django.http import JsonResponse
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.contrib.auth.views import LoginView
from django.views.generic.edit import FormView
from django.conf import settings
from django.utils import timezone
from django.core import serializers

from .models import User
from .forms import UserSignupForm


class ContextDataMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['username'] = self.request.user.username
        context['site_key'] = settings.RECAPTCHA_SITE_KEY
        try:
            context['slug'] = self.request.user.slug
            context['user_auth'] = True
        except AttributeError:
            context['slug'] = ''
            context['user_auth'] = False
        return context


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
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        data = serializers.serialize('json', self.get_queryset())
        return data

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)


class UserLoginView(LoginView):
    template_name = 'accounts/auth/auth-login.html'


class UserSignupView(FormView):
    form_class = UserSignupForm
    template_name = 'accounts/auth/auth-signup.html'

    # dedicated because of recaptcha
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['username'] = self.request.user.username
        context['site_key'] = settings.RECAPTCHA_SITE_KEY
        try:
            context['slug'] = self.request.user.slug
            context['user_auth'] = True
        except AttributeError:
            context['slug'] = ''
            context['user_auth'] = False
        return context
