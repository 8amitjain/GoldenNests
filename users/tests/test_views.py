from django.test import TestCase, Client
from django.shortcuts import reverse
from django.contrib.messages import get_messages
from datetime import datetime, timedelta

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
        self.register_data_2 = {
            'email': 'test2@gmail.com',
            'name': 'Test2',
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
        self.update_url = reverse('update', kwargs={'pk': 1})
        self.update_url_2 = reverse('update', kwargs={'pk': 2})
        self.update_url_3 = reverse('update', kwargs={'pk': 3})

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

        # Setting user is_active to True
        user = User.objects.first()
        now = datetime.now()
        before_10_min = now + timedelta(minutes=-20)
        user.date_confirmation_mail_sent = before_10_min
        user.save()

        # testing with user inactive
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.login_url)

        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        # print(*messages, 'MESSAGES')
        self.assertEqual(str(messages[-1]), 'Verification mail sent successfully')

        # Trying to send mail again
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.resend_email_confirmation_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0].tags, 'warning')  # Checking the tag
        self.assertEqual(str(messages[0]),
                         'Verification mail was just sent few minutes ago please check you mail or wait to resend again'
                         )  # Checking the message

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
        self.assertRedirects(response, self.resend_email_confirmation_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0].tags, 'warning')  # Checking the tag
        self.assertEqual(str(messages[0]), 'Email is not correct')  # Checking the message

        # mail send just few minutes ago
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.resend_email_confirmation_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0].tags, 'warning')  # Checking the tag
        self.assertEqual(str(messages[0]),
                         'Verification mail was just sent few minutes ago please check you mail or wait to resend again'
                         )  # Checking the message

        # Setting user is_active to True
        user = User.objects.first()
        user.is_active = True
        user.save()

        # User is already active
        response = self.client.post(self.resend_email_confirmation_url, {'email': 'test@gmail.com'})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.login_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[0]), 'User is already active. Please Login!')  # Checking the message


class UpdateUser(BaseTest):

    def test_get_resend(self):
        # Without login
        response = self.client.get(self.update_url)

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/user/login/?next=' + self.update_url)
        # testing template and status code

    def test_post_resend(self):
        # Register and login a user
        # Register a User
        self.client.post(self.register_url, self.register_data)
        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # passing login data to login url
        self.client.post(self.login_url, self.login_data)

        # Getting user data and checking user data
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)

        # Updating details of user
        response = self.client.post(self.update_url, {'name': 'TEST Updated', 'phone_number': 1234567899})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.update_url)

        # Getting user data and checking if data is updated
        user = User.objects.first()
        self.assertEqual(user.name, 'TEST Updated')
        self.assertEqual(user.phone_number, 1234567899)

        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), 'Details Updated!')

    def test_post_resend_invalid_case(self):
        # Register and login a user
        # Register a User
        self.client.post(self.register_url, self.register_data)
        # User is_active is set to True
        user = User.objects.first()
        user.is_active = True
        user.save()
        # passing login data to login url
        self.client.post(self.login_url, self.login_data)

        # No Data
        response = self.client.post(self.update_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/update.html')

        # Invalid data phone_number is 9 digits
        # Getting user data and checking user data
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)
        # Invalid data phone_number is 9 digits
        response = self.client.post(self.update_url, {'name': 'TEST Updated', 'phone_number': 123456789})
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.update_url)
        # Getting user data and checking data is not updated
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)
        # Checking message
        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0].tags, 'warning')  # Checking the tag
        self.assertEqual(str(messages[0]), 'Invalid Phone Number')  # Checking the message

        # Changing the id

        # Register user2
        self.client.post(self.register_url, self.register_data_2)
        # User is_active is set to True
        user = User.objects.last()
        user.is_active = True
        user.save()

        # Accessing other user url
        response = self.client.post(self.update_url_2, {'name': 'TEST asdfasd', 'phone_number': 123456789})
        self.assertEqual(response.status_code, 403)
        # self.assertRedirects(response, self.update_url_2)
        # Checking if data is not changed
        user = User.objects.first()
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.phone_number, 1234567890)

        # Accessing non existent user url
        response = self.client.post(self.update_url_3, {'name': 'TEST', 'phone_number': 123456789})
        self.assertEqual(response.status_code, 404)
        # self.assertRedirects(response, self.update_url_3)



