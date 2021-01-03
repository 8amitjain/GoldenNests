from django.test import TestCase, Client
from django.shortcuts import reverse

from users.models import User


class BaseTest(TestCase):

    def setUp(self):
        self.client = Client()

        # Register Details
        self.register_data = {
            'email': 'test@gmail.com',
            'name': 'Test',
            'phone_number': '1234567890',
            'password1': 'Test@321',
            'password2': 'Test@321'
        }
        self.register_data_invalid = {
            'email': 'test2@gmail.com',
            'name': 'Test',
            'phone_number': '123456789',
            'password1': 'Test@321',
            'password2': 'Test@321'
        }

        # Login Details
        self.login_data = {
            'email': 'test@gmail.com',
            'password': 'Test@321',
        }

        self.login_data_invalid = {
            'email': 'test2@gmail.com',
            'password': 'Test@321'
        }

        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.resend_email_confirmation_url = reverse('resend-email-confirmation')

        return super().setUp()


class RegisterUser(BaseTest):

    def test_get_register(self):
        response = self.client.get(self.register_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/register.html')
        # testing template and status code

    def test_post_register(self):
        self.assertEqual(User.objects.count(), 0)

        # passing register data to register url
        response = self.client.post(self.register_url, self.register_data)

        # Checking if user if registered and active is false
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.all().first().is_active, False)
        self.assertEqual(response.status_code, 302)

        # Checking with invalid phone_number
        response = self.client.post(self.register_url, self.register_data_invalid)

        # Checking if user if registered and active is false
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.status_code, 200)

    def test_post_register_no_data(self):
        self.assertEqual(User.objects.count(), 0)

        # passing no data to register url
        response = self.client.post(self.register_url)

        # Checking if user if registered and active is false
        self.assertEqual(User.objects.count(), 0)
        self.assertEqual(response.status_code, 200)
        # Response is 200 because form does not submit with invalid data!


class LoginUser(BaseTest):

    def test_get_login(self):
        response = self.client.get(self.login_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/login.html')
        # testing template and status code

    def test_post_login(self):
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
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/')

    def test_post_login_invalid_case(self):
        self.assertEqual(User.objects.count(), 0)

        # Register a User
        self.client.post(self.register_url, self.register_data)
        self.assertEqual(User.objects.count(), 1)  # Checking registered user

        # Passing No data
        response = self.client.post(self.login_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/login.html')

        # User is inactive
        response = self.client.post(self.login_url, self.login_data)
        self.assertRedirects(response, '/user/login/')
        self.assertEqual(response.status_code, 302)

        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()

        # passing invalid data to login url
        response = self.client.post(self.login_url, self.login_data_invalid)
        self.assertRedirects(response, '/user/login/')
        self.assertEqual(response.status_code, 302)
        # Response is 302 because redirect after form is submitted form view


class ResendEmailUser(BaseTest):

    def test_get_resend(self):
        response = self.client.get(self.resend_email_confirmation_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/resend_mail.html')
        # testing template and status code

    def test_post_resend(self):
        # Register a User
        self.client.post(self.register_url, self.register_data)

        # testing with user inactive
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/user/login/')

    def test_post_resend_invalid_case(self):
        # Register a User
        self.client.post(self.register_url, self.register_data)

        # No Data
        response = self.client.post(self.resend_email_confirmation_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/resend_mail.html')

        # Non exist user email
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test2@gmail.com'})
        self.assertEqual(response.status_code, 302)
        # self.assertRedirects(response, reverse(self.resend_email_confirmation_url))

        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()

        # User is already active
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        # self.assertRedirects(response, reverse(self.login_url))

