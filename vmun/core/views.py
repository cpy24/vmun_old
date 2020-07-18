from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template import Context, loader


class ContextDataMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['username'] = self.request.user.username
        try:
            context['slug'] = self.request.user.slug
            context['user_auth'] = True
        except AttributeError:
            context['slug'] = ''
            context['user_auth'] = False
        return context


class IndexView(TemplateView, ContextDataMixin):
    template_name = 'core/index.html'


def error404(request):
    template = loader.get_template('core/handle/404.html')

    return HttpResponse(content=template.render(), content_type='text/html; charset=utf-8', status=404)
