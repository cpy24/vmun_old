from django import forms

from .models import User


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()
    remember = forms.BooleanField(required=False)
