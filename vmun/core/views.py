from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template import Context, loader
from django.views.defaults import page_not_found, server_error, permission_denied, bad_request


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


def error_404(request, exception):
    return page_not_found(request, exception, template_name="core/handle/404.html")


def error_500(request):
    return server_error(request, template_name="core/handle/500.html")


def error_403(request, exception):
    return permission_denied(request, exception, template_name="core/handle/403.html")


def error_400(request, exception):
    return bad_request(request, exception, template_name="core/handle/400.html")
