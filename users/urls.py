from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from . import views
from . import api

urlpatterns = [
    # Login and Register
    path('account/', TemplateView.as_view(template_name="users/manage_account.html"), name='account'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.SignUpView.as_view(), name='register'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/login.html'), name='logout'),

    # Update Username
    path('update/<int:pk>/', views.UserUpdateView.as_view(), name='update'),

    # User Username Verification
    path('resend-confirmation/', views.ResendMailConfirmationView.as_view(),
         name='resend-email-confirmation'),
    path('activate/<uidb64>/<token>', views.EmailVerificationView.as_view(), name='activate'),

    # Password
    path('change-password/', auth_views.PasswordChangeView.as_view(template_name='users/password_change.html'),
         name='password_change'),
    path('change-password-done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='users/password_change_done.html'),
         name='password_change_done'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'),
         name='password_reset'),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'),
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'),
         name='password_reset_complete'),

    # Rest Api
    # Login and Register
    path('api/register/', api.RegisterAPI.as_view(), name='api-customer-register'),
    path('api/login/', api.LoginAPI.as_view(), name='api-customer-login'),

    # Update
    path('api/user/update/<int:pk>/', api.UpdateUpdateAPI.as_view(), name='api-customer-update'),

    # Username Verification
    path('api/resend-confirmation/<str:email>/', api.ResendEmailConfirmationAPI.as_view(),
         name='api-resend-username-confirmation'),

    # Password
    path('api/password/change/', api.ChangePasswordAPI.as_view(), name='api-customer-password-change'),
    path('api/password/reset/', include('django_rest_passwordreset.urls', namespace='api-password-reset')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
