from __future__ import unicode_literals
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.shortcuts import reverse
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.conf import settings
from django.utils import timezone

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('Email'), unique=True, max_length=320, help_text='Provide an email for registration')
    name = models.CharField(_('Name'), max_length=70)
    phone_number = models.BigIntegerField(help_text='Provide an mobile number without +91')  # TODO add validator

    date_confirmation_mail_sent = models.DateTimeField(_('date confirmation mail sent'), default=timezone.now)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=False)
    is_verified = models.BooleanField(_('verified'), default=False)
    is_staff = models.BooleanField(_('staff'), default=False)

    token = models.TextField(_('token'), blank=True, null=True)  # Used in DRF

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse("profile")

    def get_full_name(self):
        full_name = '%s %s' % (self.name)
        return full_name.strip()

    def get_short_name(self):
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    # Used in DRF
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
        email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
                                                       reset_password_token.key)

        send_mail(
            # title:
            "Password Reset for {title}".format(title="Some website title"),
            # message:
            email_plaintext_message,
            # from:
            settings.AUTH_USER_MODEL,
            # to:
            [reset_password_token.user.email]
        )

