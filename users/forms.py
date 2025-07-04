from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

from .models import (User)


class LoginForm(forms.Form):
    email = forms.CharField(label='email')
    password = forms.CharField(label='Password', widget=forms.PasswordInput)


class EmailForm(forms.Form):
    email = forms.CharField(label='email')


class RegistrationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('email', 'name', 'phone_number', 'password1', 'password2')

    def clean(self):
        super(RegistrationForm, self).clean()
        phone_number = self.cleaned_data.get('phone_number')
        if len(str(phone_number)) != 10:
            raise ValidationError(
                _(f'{phone_number} is not an valid mobile number'))


# if inherit form UserChangeForm then user fields are working but also getting password reset form
class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'name', 'phone_number')

    def clean_email(self):
        email = self.cleaned_data['email']
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError(
                _(f'{email} is not an valid email'))

        try:
            email = User.objects.exclude(pk=self.instance.pk).get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError('email "%s" is already in use.' % email)

