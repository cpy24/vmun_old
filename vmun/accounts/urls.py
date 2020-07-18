from django.urls import path, include
from django.contrib.auth.views import LogoutView

from . import views

urlpatterns = [
    path('api/<slug:slug>', views.JSONProfileView.as_view(), name='account_api'),
    path('login', views.UserLoginView.as_view(), name='login'),
    path('signup', views.UserSignupView.as_view(), name='signup'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('login_tmp', views.LoginViewTemp.as_view(), name='login_tmp'),
]
