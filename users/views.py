from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import (
    ObjectDoesNotExist, ValidationError
)
from django.core.validators import validate_email
from django.shortcuts import redirect, render
from django.utils.encoding import force_text
from django.utils.translation import gettext_lazy as _
from django.views import View
from django.views.generic.edit import (
    FormView, CreateView, UpdateView, DeleteView
)
from django.views.generic.list import ListView
from django.utils.http import urlsafe_base64_decode

from .forms import (
    RegistrationForm, LoginForm, EmailForm
)
from users.models import User

from .utils import (
    account_activation_token, send_activation_mail
)


# Customer registration view
class SignUpView(SuccessMessageMixin, CreateView):
    template_name = 'users/register.html'
    success_url = '/user/login/'
    form_class = RegistrationForm
    success_message = "Your account was created successfully"

    def form_valid(self, form):
        user = form.instance
        user.save()

        # Check if email is phone number or email (if email send mail)
        message = 'Account successfully created Please click the link in your mail and login to active your account.'
        send_activation_mail(self.request, message, user)
        return super().form_valid(form)


# Login View
class LoginView(SuccessMessageMixin, FormView):
    form_class = LoginForm
    template_name = 'users/login.html'
    success_url = '/'

    def form_valid(self, form):
        # Validate data and show of user is active or inactive
        # TODO check if it is a good practise to redirect in form_valid function if not

        credentials = form.cleaned_data
        user = authenticate(email=credentials['email'],
                            password=credentials['password'])
        # Get the user
        try:
            user_query = User.objects.get(email=credentials['email'])
        except ObjectDoesNotExist:
            messages.error(self.request, 'email or password not correct is not correct')
            return redirect('login')

        # if user is not active show activation in HTML message!
        if user is not None:
            if user.is_active:
                login(self.request, user)
                return redirect('/')
        if not user_query.is_active:
            messages.error(self.request, 'Your account is not active Please click on \
                           <a href="/user/resend-confirmation/">activate</a> to your activate your account.',
                           extra_tags='safe')
            return redirect('login')
        else:
            messages.error(self.request, 'email or password not correct')
            return redirect('login')


# Verifying email on link click
class EmailVerificationView(View):
    def get(self, request, uidb64, token):
        try:
            pk = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=pk)

            if not account_activation_token.check_token(user, token):
                return redirect('login'+'?message='+'User already activated')

            if user.is_active:
                return redirect('login')
            user.is_active = True
            user.save()

            messages.success(request, 'Account activated successfully')
            return redirect('login')

        except Exception as ex:
            pass

        return redirect('login')


# TODO set a limit on verification sending
# Resend Mail or SMS for verification
class ResendMailConfirmationView(SuccessMessageMixin, FormView):
    form_class = EmailForm
    template_name = 'users/login.html'
    success_url = '/'

    def form_valid(self, form):
        # Validate email and send mail or SMS
        # TODO Send SMS

        # Get the user
        credentials = form.cleaned_data
        try:
            user = User.objects.get(email=credentials['email'])
        except ObjectDoesNotExist:
            messages.error(self.request, 'email is not correct')
            return redirect('resend-email-confirmation')

        # Check if user is active and send mail
        if not user.is_active:
            message = 'Verification Mail Resend!, Please click the link in your mail and login to active \
                       your account.'
            send_activation_mail(self.request, message, user)
            messages.info(self.request, 'Verification Mail Resend Successfully')
            return redirect('login')
        else:
            messages.info(self.request, 'User is already active. Please Login!')
            return redirect('login')


# User Update View
class UserUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = User
    fields = ['email', 'first_name', 'last_name', 'phone_number']
    # template_name = 'users/user_form_.html'

    # template name user_form
    def form_valid(self, form):
        credentials = form.cleaned_data
        phone = credentials['phone_number']

        if len(str(phone)) == 10:
            user = form.instance
            user.save()
            return redirect('profile')

    def test_func(self):
        model = self.get_object()
        return self.request.user == model

