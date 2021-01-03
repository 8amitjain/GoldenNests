from django.test import SimpleTestCase
from django.shortcuts import reverse


class TestUrls(SimpleTestCase):
    def setUp(self):
        self.register_url = reverse('register')

    def test_get_register_url(self):
        response = self.client.get(self.register_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'users/register.html')
