from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import (
    generics, permissions, status
)
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer, UserUpdateSerializer
)
from .models import User
from .utils import send_activation_mail


# Register
class RegisterAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        message = 'Account successfully created Please click the link in your mail and login to active your account.'
        send_activation_mail(self.request, message, user)
        user.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Login API
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data['email'])
        except ObjectDoesNotExist:
            response = {
                'data': 'Incorrect email or Password',
            }
            return Response(response)

        if user.is_active:
            serializer = AuthTokenSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            serializer = UserSerializer(user)
            token = AuthToken.objects.create(user)[1]
            response = {
                'data': serializer.data,
                'code': status.HTTP_200_OK,
                'token': token,
            }
        else:
            response = {
                'data': 'User Not active',
                'code': status.HTTP_400_BAD_REQUEST,
            }
        return Response(response)


# Resend Confirmation mail
class ResendEmailConfirmationAPI(APIView):
    def get(self, request, email, *args, **kwargs):
        user = User.objects.get(email=email)
        # Check if user is active and send mail
        now = datetime.now()
        before_10_min = now + timedelta(minutes=-10)
        if not user.is_active:
            if user.date_confirmation_mail_sent > before_10_min:
                response = {
                    'data':
                        'Verification mail was just sent few minutes ago please check you mail or wait to resend again.',
                    'code': status.HTTP_200_OK
                }
            else:
                message = \
                    'Account successfully created Please click the link in your mail and login to active your account.'
                user.date_confirmation_mail_sent = now
                user.save()
                send_activation_mail(self.request, message, user)
                response = {
                    'data':
                    'Account successfully created Please click the link in your mail and login to active your account.',
                    'code': status.HTTP_200_OK
                }
        else:
            response = {
                'data': 'Already verified',
                'code': status.HTTP_200_OK
            }
        return Response(response)


# Password Change
class ChangePasswordAPI(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password is correct
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"data": "Wrong password (Old)."}, status=status.HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will get
            # check if new password and conf new password match
            if serializer.data.get("new_password") == serializer.data.get("new_password_conf"):

                # check if new password and old password do not match
                if serializer.data.get("new_password") == serializer.data.get("new_password_conf") == \
                        serializer.data.get("old_password"):
                    return Response({"data": "New password is same as old password."},
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    self.object.set_password(serializer.data.get("new_password"))
            else:
                return Response({"data": "New password does not match."}, status=status.HTTP_400_BAD_REQUEST)
            self.object.save()
            response = {
                'data': 'Password updated successfully',
                'code': status.HTTP_200_OK,
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUpdateAPI(generics.UpdateAPIView):

    # queryset = User.objects.all()
    model = User
    permission_classes = (IsAuthenticated,)
    serializer_class = UserUpdateSerializer

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
