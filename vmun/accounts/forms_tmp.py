from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.utils.translation import gettext, gettext_lazy as _

from .models import User


class UserSignupForm(UserCreationForm):
    gender_choices = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('others', 'Non-binary'),
        ('none', 'Prefer not to say'),
    ]

    first_name = forms.CharField(label=_("First name"), strip=True, max_length=75)
    last_name = forms.CharField(label=_("Last name"), strip=True, max_length=75)
    email = forms.EmailField(label=_("Email"))
    birthday = forms.SplitDateTimeField(label=_("Birthday"))
    gender = forms.ChoiceField(label=_("Choices"), choices=gender_choices)

    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
    )

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email", "birthday", "gender")
        field_classes = {'username': UsernameField}
