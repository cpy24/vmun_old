from django.shortcuts import render
from django.views.generic.base import TemplateView


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
