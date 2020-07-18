from django import forms

from .models import User


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()
    remember = forms.BooleanField(required=False)


# REMOVE
from django.contrib.auth.forms import AuthenticationForm


class LoginFormTemp(AuthenticationForm):
    username = forms.CharField(label='Email / Username')
