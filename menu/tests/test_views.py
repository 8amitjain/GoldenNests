from django.test import TestCase, Client
from django.shortcuts import reverse
from django.utils import timezone
from django.contrib.messages import get_messages

from menu.models import Product, Category, TableCount, TableView, TableTime, Table, BookTable
from order.models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon
)
from users.models import User


class BaseTest(TestCase):

    def setUp(self):
        self.client = Client()

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
        self.menu_url = reverse('menu:menu')
        self.book_table_url = reverse('menu:book-table')
        self.checkout_url = reverse('order:checkout')
        self.order_detail_url = reverse('order:detail', kwargs={'pk': 1})
        self.add_to_cart_url = reverse('order:add-to-cart', kwargs={'slug': self.product.slug})
        return super().setUp()


class TableBookTest(BaseTest):
    def test_book_table_non_auth(self):
        # Testing Anonymous User
        response = self.client.post(self.book_table_url)

        # since user in not logged in should redirect to login page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user/login/?next=' + self.book_table_url)

    def test_book_table_working_case(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Book Table
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': ''
        })
        self.assertEqual(response.status_code, 302)

        self.assertRedirects(response, self.order_detail_url)
        book_table = BookTable.objects.all().last()
        order = Order.objects.filter(ordered=True).last()
        self.assertEqual(order.table.is_booked, True)
        self.assertEqual(order.table, book_table)
        self.assertEqual(order.cart.count(), 0)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Table Booked!")  # Checking the message

    def test_book_table_working_case_2(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Book table and add food
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count_2.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': 'add_food'
        })
        self.assertEqual(response.status_code, 302)
        order = Order.objects.filter(ordered=False).last()
        self.assertEqual(order.table.is_booked, False)
        self.assertEqual(order.cart.count(), 0)
        self.assertRedirects(response, self.menu_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), 'Table Booked, Add food to cart and continue checkout!')
        # Checking the message

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)

        book_table = BookTable.objects.all().last()
        order = Order.objects.filter(ordered=True).last()

        self.assertEqual(order.cart.count(), 1)
        self.assertEqual(order.table.is_booked, True)
        self.assertEqual(order.table, book_table)
        self.assertEqual(order.cart.first().product.title, 'test product')

    def test_book_table_invalid_cases(self):
        # Case 1
        # Book table with cart products already in both case
        # Direct Book
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")
        self.client.get(self.add_to_cart_url)
        # Book Table
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': ''
        })
        self.assertEqual(response.status_code, 302)

        self.assertRedirects(response, self.order_detail_url)
        book_table = BookTable.objects.all().last()
        order = Order.objects.filter(ordered=True).last()
        self.assertEqual(order.table.is_booked, True)
        self.assertEqual(order.table, book_table)
        self.assertEqual(order.cart.count(), 0)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Table Booked!")  # Checking the message

        # Case 2 book non available table
        book_table = BookTable.objects.count()
        order = Order.objects.filter(ordered=True).count()
        self.assertEqual(order, 1)
        self.assertEqual(book_table, 1)

        self.client.get(self.add_to_cart_url)
        # Book Table
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': ''
        })
        self.assertEqual(response.status_code, 302)
        book_table = BookTable.objects.count()
        order = Order.objects.filter(ordered=True).count()
        self.assertEqual(order, 1)
        self.assertEqual(book_table, 1)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Table not available at the given time")  # Checking the message

    def test_book_table_invalid_cases_2(self):
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")
        # Add Food then Book
        self.client.get(self.add_to_cart_url)
        # Book table and add food
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count_2.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': 'add_food'
        })
        self.assertEqual(response.status_code, 302)
        order = Order.objects.filter(ordered=False).last()
        self.assertEqual(order.table.is_booked, False)
        self.assertEqual(order.cart.count(), 1)
        self.assertRedirects(response, self.menu_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), 'Table Booked, Add food to cart and continue checkout!')
        # Checking the message

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)

        book_table = BookTable.objects.all().last()
        order = Order.objects.filter(ordered=True).last()

        self.assertEqual(order.cart.count(), 1)
        self.assertEqual(order.table.is_booked, True)
        self.assertEqual(order.table, book_table)
        self.assertEqual(order.cart.first().product.title, 'test product')

        # Case 2
        # Book table with not available timing
        book_table = BookTable.objects.count()
        order = Order.objects.filter(ordered=True).count()
        self.assertEqual(order, 1)
        self.assertEqual(book_table, 1)

        self.client.get(self.add_to_cart_url)
        # Book table and add food
        response = self.client.post(self.book_table_url, {
            'name': 'TEST',
            'email': 'test@gamil.com',
            'phone_number': '8275123023',
            'people_count': self.table_count_2.id,
            'sitting_type': self.table_view.id,
            'booked_for_date': timezone.datetime.now().strftime('%Y-%m-%d'),
            'booked_for_time': self.table_time.id,
            'add_food': 'add_food'
        })
        self.assertEqual(response.status_code, 302)
        book_table = BookTable.objects.count()
        order = Order.objects.filter(ordered=True).count()
        self.assertEqual(order, 1)
        self.assertEqual(book_table, 1)

        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), 'Table not available at the given time')
        # Checking the message

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)

        book_table = BookTable.objects.count()
        order = Order.objects.filter(ordered=True).count()
        self.assertEqual(order, 2)
        self.assertEqual(book_table, 1)
