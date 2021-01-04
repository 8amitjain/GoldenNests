from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import validate_email
from django.shortcuts import redirect
from django.utils.encoding import force_text
from django.views import View
from django.views.generic.edit import (
    FormView, CreateView, UpdateView
)
from django.utils.http import urlsafe_base64_decode
from datetime import datetime, timedelta

from .forms import (
    RegistrationForm, LoginForm, EmailForm
)
from .utils import (
    account_activation_token, send_activation_mail
)
from users.models import User


# Customer registration view
class SignUpView(SuccessMessageMixin, CreateView):
    template_name = 'users/register.html'
    success_url = '/user/login/'
    form_class = RegistrationForm
    success_message = "Your account was created successfully"

    def form_valid(self, form):
        user = form.instance
        user.save()
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


# Resend Mail
class ResendMailConfirmationView(SuccessMessageMixin, FormView):
    form_class = EmailForm
    template_name = 'users/resend_mail.html'
    success_url = '/'

    def form_valid(self, form):
        # Get the user
        credentials = form.cleaned_data
        try:
            user = User.objects.get(email=credentials['email'])
        except ObjectDoesNotExist:
            messages.warning(self.request, 'Email is not correct')
            return redirect('resend-email-confirmation')

        # Check if user is active and send mail
        now = datetime.now()
        before_10_min = now + timedelta(minutes=-10)
        if not user.is_active:
            if user.date_confirmation_mail_sent > before_10_min:
                message = \
                    'Verification mail was just sent few minutes ago please check you mail or wait to resend again'
                messages.warning(self.request, message)
                return redirect('resend-email-confirmation')
            message = 'Verification Mail Resend!, Please click the link in your mail and login to active \
                       your account.'
            user.date_confirmation_mail_sent = now
            user.save()
            send_activation_mail(self.request, message, user)
            messages.success(self.request, 'Verification mail sent successfully')
            return redirect('login')
        else:
            messages.info(self.request, 'User is already active. Please Login!')
            return redirect('login')


# User Update View
class UserUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = User
    fields = ['name', 'phone_number']
    template_name = 'users/update.html'

    # template name user_form
    def form_valid(self, form):
        credentials = form.cleaned_data
        phone = credentials['phone_number']

        if len(str(phone)) == 10:
            user = form.instance
            user.save()
            messages.success(self.request, 'Details Updated!')
            return redirect('update', pk=self.kwargs.get('pk'))
        messages.warning(self.request, 'Invalid Phone Number')
        return redirect('update', pk=self.kwargs.get('pk'))

    def test_func(self):
        model = self.get_object()
        return self.request.user == model

