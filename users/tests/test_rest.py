from django.shortcuts import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import datetime, timedelta

from users.serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer, UserUpdateSerializer
)
from users.models import User


class BaseTest(APITestCase):

    def setUp(self):
        # Register Details
        self.register_data = {
            'email': 'test@gmail.com',
            'name': 'Test',
            'phone_number': '1234567890',
            'password': 'Test@321',
            'token': ""
        }
        self.register_data_invalid = {
            'email': 'test2@gmail.com',
            'name': 'Test',
            'phone_number': '123456789',
            'password': 'Test@321',
            'token': ""
        }

        # Login Details
        self.login_data = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'Test@321',
        }

        self.login_data_invalid = {
            'username': 'test2@gmail.com',
            'email': 'test2@gmail.com',
            'password': 'Test@321'
        }
        self.login_data_invalid_pass = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'Testt@321'
        }

        self.register_url = reverse('api-register')
        self.login_url = reverse('api-login')
        self.update_url = reverse('api-update')
        self.resend_email_confirmation_url = reverse('api-resend-username-confirmation',
                                                     kwargs={'email': 'test@gmail.com'})
        self.resend_email_confirmation_url_invalid = reverse('api-resend-username-confirmation',
                                                             kwargs={'email': 'test2@gmail.com'})
        self.password_change = reverse('api-password-change')

        return super().setUp()


class RegisterUser(BaseTest):

    def test_post_register_valid(self):
        # Zero User
        self.assertEqual(User.objects.count(), 0)

        # Registering a user
        response = self.client.post(self.register_url, self.register_data)

        # Checking if user is not registered
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)

        # Invalid Data
        # Registering a user with invalid number
        response = self.client.post(self.register_url, self.register_data_invalid)
        # Checking if user is not registered
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        # self.assertEqual(response.data, '')

        self.register_data_invalid = {
            'email': 'test@gmail.com',
            'name': 'Test',
            'phone_number': '1234567890',
            'password': 'Test@321',
            'token': ""
        }
        # Registering a user with exist email
        response = self.client.post(self.register_url, self.register_data_invalid)
        # Checking if user is registered
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

        # Registering a user with no data
        response = self.client.post(self.register_url)
        # Checking if user is not registered
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)


class LoginUser(BaseTest):

    def test_post_login_valid(self):
        self.assertEqual(User.objects.count(), 0)

        # Register a User
        self.client.post(self.register_url, self.register_data)
        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()

        self.assertEqual(User.objects.count(), 1)  # Checking registered user

        # passing login data to login url
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')

    def test_post_login_invalid_case(self):
        self.assertEqual(User.objects.count(), 0)

        # Register a User
        self.client.post(self.register_url, self.register_data)
        self.assertEqual(User.objects.count(), 1)  # Checking registered user

        # Incorrect Mail
        response = self.client.post(self.login_url, self.login_data_invalid)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'],  "Incorrect email or Password")

        # User is inactive
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], 'User Not active')
        self.assertEqual(response.data['code'], 400)

        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # Incorrect Password and user is active
        response = self.client.post(self.login_url, self.login_data_invalid_pass)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['non_field_errors'][0], "Unable to log in with provided credentials.")


class ResendEmailUser(BaseTest):

    def test_get_resend(self):
        # Register a User
        self.client.post(self.register_url, self.register_data)

        # Setting user is_active to True
        user = User.objects.first()
        now = datetime.now()
        before_10_min = now + timedelta(minutes=-20)
        user.date_confirmation_mail_sent = before_10_min
        user.save()

        # testing with user inactive
        response = self.client.get(self.resend_email_confirmation_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data['data'],
            'Account successfully created Please click the link in your mail and login to active your account.'
        )

        # testing with user inactive
        response = self.client.get(self.resend_email_confirmation_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data['data'],
            'Verification mail was just sent few minutes ago please check you mail or wait to resend again.'
        )  # Checking the message

    def test_post_resend_invalid_case(self):
        # Register a User
        self.client.post(self.register_url, self.register_data)

        # mail send just few minutes ago
        response = self.client.get(self.resend_email_confirmation_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data['data'],
            'Verification mail was just sent few minutes ago please check you mail or wait to resend again.'
        )  # Checking the message

        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()

        # User is already active
        response = self.client.get(self.resend_email_confirmation_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data['data'],
            'Already verified',
        )  # Checking the message


class PasswordUser(BaseTest):

    def test_put_pass_valid(self):
        # Register a User and login
        self.client.post(self.register_url, self.register_data)
        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # Login in
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]
        password_data = {
                            "old_password": "Test@321",
                            "new_password": "amitjain",
                            "new_password_conf": "amitjain"
                        }
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.password_change, password_data)
        self.assertEqual(response.data['data'], 'Password updated successfully')
        self.assertEqual(response.status_code, 200)

        self.login_data = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'amitjain',
        }

        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')

    def test_put_pass_invalid(self):
        # Register a User and login
        self.client.post(self.register_url, self.register_data)
        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # Login in
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]

        # Old password is wrong
        password_data = {
            "old_password": "Testa@321",
            "new_password": "amitjain",
            "new_password_conf": "amitjain"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.password_change, password_data)
        self.assertEqual(response.data['data'], 'Wrong password (Old).')
        self.assertEqual(response.status_code, 400)

        self.login_data = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'Test@321',
        }
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]

        # Old password is same as new
        password_data = {
            "old_password": "Test@321",
            "new_password": "Test@321",
            "new_password_conf": "Test@321"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.password_change, password_data)
        self.assertEqual(response.data['data'], 'New password is same as old password.')
        self.assertEqual(response.status_code, 400)

        self.login_data = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'Test@321',
        }
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]

        # New Password Does not match
        password_data = {
            "old_password": "Test@321",
            "new_password": "amiatjain",
            "new_password_conf": "amitjain"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.password_change, password_data)
        self.assertEqual(response.data['data'], 'New password does not match.')
        self.assertEqual(response.status_code, 400)

        self.login_data = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'Test@321',
        }
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')


class UpdateUser(BaseTest):

    def test_post_resend(self):
        # Register and login a user
        # Register a User
        self.client.post(self.register_url, self.register_data)
        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # passing login data to login url
        # Login in
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]

        # Getting user data and checking user data
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)

        # Updating details of user
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.update_url, {'name': 'TEST Updated', 'phone_number': 1234567899})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'name': 'TEST Updated', 'phone_number': 1234567899})

        # Getting user data and checking if data is updated
        user = User.objects.first()
        self.assertEqual(user.name, 'TEST Updated')
        self.assertEqual(user.phone_number, 1234567899)

    def test_post_resend_invalid_case(self):
        # Register and login a user
        # Register a User
        self.client.post(self.register_url, self.register_data)
        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # passing login data to login url
        # Login in
        response = self.client.post(self.login_url, self.login_data)
        self.assertEqual(response.data['data']['email'], 'test@gmail.com')
        token = response.data["token"]

        # Invalid data phone_number is 9 digits
        # Getting user data and checking user data
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)
        # Invalid data phone_number is 9 digits
        # Updating details of user
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.put(self.update_url, {'name': 'TEST Updated', 'phone_number': 123456789})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['phone_number']['data'], "Phone number is not valid.")

        # Getting user data and checking data is not updated
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)

