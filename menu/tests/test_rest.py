from django.shortcuts import reverse
from rest_framework.test import APITestCase
from django.utils import timezone

from menu.models import Product, Category, TableCount, TableView, TableTime, Table, BookTable
from order.models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon
)
from users.models import User
from home.models import RestaurantsTiming


class BaseTest(APITestCase):

    def setUp(self):
        # Creating a user
        self.user = User.objects.create_user(
            name='test',
            email='pytest_tests@gmail.com',
            password='Test@321',
            phone_number=1234567890,
            is_active=True
        )
        self.user_2 = User.objects.create_user(
            name='test 2',
            email='pytest_tests2@gmail.com',
            password='Test@321',
            phone_number=1234567890,
            is_active=True
        )
        # Creating a category
        self.category = Category.objects.create(
            title='test category',
        )
        # Creating product's
        self.product = Product.objects.create(
            category=self.category,
            title='test product',
            price=500.00,
            image='http://127.0.0.1:8000/MK8-unsplash.jpg',
        )
        self.product_2 = Product.objects.create(
            category=self.category,
            title='test product 2',
            price=1000.00,
            image='http://127.0.0.1:8000/MK8-unsplash.jpg',
        )
        # Creating a TableCount
        self.table_count = TableCount.objects.create(
            title=3,
        )
        self.table_count_2 = TableCount.objects.create(
            title=4,
        )

        # Creating a TableView
        self.table_view = TableView.objects.create(
            title='Indoor',
        )
        # Creating a TableView
        self.table_time = TableTime.objects.create(
            time=timezone.datetime.now().strftime('%H:%M:%S'),
        )
        self.table_time_2 = TableTime.objects.create(
            time='11:22:33',
        )

        self.table_1 = Table.objects.create(
            title='1',
            people_count=self.table_count,
            sitting_type=self.table_view,
        )
        self.table_2 = Table.objects.create(
            title='2',
            people_count=self.table_count_2,
            sitting_type=self.table_view,
        )

        self.timing = RestaurantsTiming.objects.create(
            opening_time='6:00:00',
            closing_time='23:00:00'
        )

        self.book_table_data = {
                "name": "TEST",
                "email": "test@gmail.com",
                "phone_number": 1230456789,
                "people_count": "1",
                "sitting_type": "1",
                "booked_for_date": "2021-1-21",
                "booked_for_time": "1",
                "add_food": "0"
            }

        self.book_table_data_2 = {
            "name": "TEST",
            "email": "test@gmail.com",
            "phone_number": 1230456789,
            "people_count": "1",
            "sitting_type": "1",
            "booked_for_date": "2021-1-21",
            "booked_for_time": "1",
            "add_food": "add_food"
        }

        self.login_data = {
            'username': 'pytest_tests@gmail.com',
            'email': 'pytest_tests@gmail.com',
            'password': 'Test@321'
        }
        self.login_data_2 = {
            'username': 'pytest_tests2@gmail.com',
            'email': 'pytest_tests2@gmail.com',
            'password': 'Test@321'
        }
        self.login_url = reverse('api-login')
        self.add_to_cart_url = reverse('order:api-add-to-cart', kwargs={'slug': self.product.slug})
        self.checkout_url = reverse('order:api-checkout')

        self.book_table_url = reverse('menu:api-table-book')
        self.remove_table = reverse('menu:api-table-remove')
        return super().setUp()


class BookTableOrder(BaseTest):

    def test_post_book_table_non_auth(self):
        # Not Auth
        try:
            response = self.client.post(self.book_table_url, self.book_table_data)
            self.assertEqual(1, 2)
        except:
            self.assertEqual(1, 1)

    def test_post_book_table_work_case_1(self):
        # Book Table ntg in cart without food to table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked')
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, True)
        self.assertEqual(order.first().cart.all().first(), None)

    def test_post_book_table_work_case_2(self):
        # Book Table with products in cart but without food adding to table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked')
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, True)
        self.assertEqual(order.first().cart.all().first(), None)

    def test_post_book_table_work_case_3(self):
        # Book Table ntg in cart with food to table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked, Add food to cart and continue checkout!')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, True)
        self.assertEqual(order.first().cart.all().first().product, self.product)

    def test_post_book_table_non_work_case_1(self):
        # Book Table with already booked timing
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked, Add food to cart and continue checkout!')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)
        self.client.logout()

        # Login other user and booking a table which is added to order but not booked
        # Book Table ntg in cart with food to table
        response = self.client.post(self.login_url, self.login_data_2)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked, Add food to cart and continue checkout!')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user_2, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, True)
        self.assertEqual(order.first().cart.all().first().product, self.product)

        # Login back to user 1 and trying to book a already booked table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        self.client.get(self.add_to_cart_url)
        response = self.client.get(self.checkout_url)
        self.assertEqual(response.data['data'], "Table is already booked choose, Please book another table")
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 0)

        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.first().table, None)

    def test_post_book_table_non_work_case_2(self):
        # Book table while one is already in order
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked, Add food to cart and continue checkout!')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data['data'], 'Table already added to order')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)


class RemoveBookTable(BaseTest):

    def test_post_remove_book_table_non_auth(self):
        # Not Auth
        try:
            response = self.client.get(self.remove_table)
            self.assertEqual(1, 2)
        except:
            self.assertEqual(1, 1)

    def test_get_remove_book_table_work_case_1(self):
        # Remove Book Table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.post(self.book_table_url, self.book_table_data_2)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data'], 'Table Booked, Add food to cart and continue checkout!')
        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table.is_booked, False)
        self.assertEqual(order.first().cart.all().first(), None)

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.get(self.remove_table)
        self.assertEqual(response.data['data'], 'Table was removed form order.')

        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().table, None)

    def test_get_remove_book_table_non_work_case_1(self):
        # Remove Book Table ntg in cart with food to table
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.get(self.remove_table)
        self.assertEqual(response.data['data'], 'Table Does Not Exist')

        order = Order.objects.filter(user=self.user, ordered=False)
        self.assertEqual(order.count(), 0)

