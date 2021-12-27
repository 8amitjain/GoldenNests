from django.test import TestCase, Client
from django.shortcuts import reverse
from django.contrib.messages import get_messages
from datetime import datetime, timedelta

from menu.models import Product, Category
from order.models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon
)
from users.models import User
from home.models import RestaurantsTiming


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
            image='http://127.0.0.1:8000/media/products/PriceAlertt_EO1nBiY.jpg',
        )
        self.product_2 = Product.objects.create(
            category=self.category,
            title='test product 2',
            price=1000.00,
            image='http://127.0.0.1:8000/media/products/PriceAlertt_EO1nBiY.jpg',
        )
        # Creating a coupon
        self.coupon = Coupon.objects.create(
            code="#GN10",
            discount_percent=10.00,
            minimum_order_amount=1000.00,
            max_discount_amount=100
        )
        self.coupon_2 = Coupon.objects.create(
            code="#GN20",
            discount_percent=20.00,
            minimum_order_amount=1000.00,
            max_discount_amount=400
        )

        self.timing = RestaurantsTiming.objects.create(
            opening_time='6:00:00',
            closing_time='23:00:00'
        )

        self.menu_url = reverse('menu:menu')
        self.cart_url = reverse('order:cart')
        self.checkout_url = reverse('order:checkout')
        self.order_detail_url = reverse('order:detail', kwargs={'pk': 1})
        self.add_to_cart_url = reverse('order:add-to-cart', kwargs={'slug': self.product.slug})
        self.add_to_cart_2_url = reverse('order:add-to-cart', kwargs={'slug': self.product_2.slug})
        self.add_to_cart_invalid_url = reverse('order:add-to-cart', kwargs={'slug': 'self.product_2.slug'})
        return super().setUp()


class AddToCartTest(BaseTest):

    def test_add_to_cart_non_auth(self):
        # Testing Anonymous User
        response = self.client.get(self.add_to_cart_url)

        # since user in not logged in should redirect to login page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user/login/?next=' + self.add_to_cart_url)

    def test_add_to_cart_working_case(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # CASE 1
        # Adds food item to cart for first time qty = 1
        response = self.client.get(self.add_to_cart_url)
        order = Order.objects.all().last()
        # Verifying data
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.last().product.title, self.product.title)
        self.assertEqual(order.cart.last().quantity, 1)
        self.assertEqual(order.get_total(), 500.00 + order.get_tax_total())
        self.assertEqual(order.get_total_without_coupon(), 500.00)
        self.assertEqual(order.get_coupon_total(), 0)
        self.assertRedirects(response, self.menu_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Food Item was added to your cart.")  # Checking the message

        # CASE 2
        # Adding the same food item again
        response = self.client.get(self.add_to_cart_url)
        order = Order.objects.all().last()
        # Verifying data
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.last().product.title, self.product.title)
        self.assertEqual(order.cart.last().quantity, 2)
        self.assertEqual(order.get_total(), 1000.00 + order.get_tax_total())
        self.assertEqual(order.get_total_without_coupon(), 1000.00)
        self.assertEqual(order.get_coupon_total(), 0)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Quantity was updated.")  # Checking the message

        # CASE 3
        # Adding a new food item to cart with existing order
        response = self.client.get(self.add_to_cart_2_url)
        order = Order.objects.all().last()
        # Verifying data
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.last().product.title, self.product_2.title)
        self.assertEqual(order.cart.last().quantity, 1)
        self.assertEqual(order.get_total(), 2000.00 + order.get_tax_total())
        self.assertEqual(order.get_total_without_coupon(), 2000.00)
        self.assertEqual(order.get_coupon_total(), 0)
        self.assertRedirects(response, self.menu_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Food Item was added to your cart.")  # Checking the message

    def test_add_to_cart_invalid_cases(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # CASE 1
        # Go to url with invalid slug
        response = self.client.get(self.add_to_cart_invalid_url)
        self.assertEqual(response.status_code, 404)

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # CASE 2
        # Set a limit per item in order
        # adding a item to cart and setting its qty to 9
        self.client.get(self.add_to_cart_url)
        order = Order.objects.all().last()
        order_cart = order.cart.last()
        order_cart.quantity = 9
        order_cart.save()
        order.save()

        # Checking qty is 9
        order = Order.objects.all().last()
        self.assertEqual(order.cart.last().quantity, 9)

        # Checking qty is 10
        response = self.client.get(self.add_to_cart_url)
        order = Order.objects.all().last()
        self.assertEqual(order.cart.last().quantity, 10)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[0].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Quantity was updated.")  # Checking the message

        # Checking qty is 10 while again adding to cart
        response = self.client.get(self.add_to_cart_url)
        order = Order.objects.all().last()
        self.assertEqual(order.cart.last().quantity, 10)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(str(messages[-1]), "Maximum quantity added.")  # Checking the message
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag


class RemoveToCartTest(BaseTest):

    def base_remove(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # Creating a cart with 2 products
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_2_url)

        order = Order.objects.last()
        self.remove_from_cart_url = reverse('order:remove-from-cart', kwargs={'pk': order.cart.first().id})
        self.remove_from_cart_2_url = reverse('order:remove-from-cart', kwargs={'pk': order.cart.last().id})

    def test_remove_from_cart_working_case(self):
        self.base_remove()
        order = Order.objects.last()

        self.assertEqual(order.cart.count(), 2)
        self.assertEqual(order.cart.first().quantity, 2)

        # Remove product from cart qty was 2 now is 1
        response = self.client.get(self.remove_from_cart_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.count(), 2)
        self.assertEqual(order.cart.first().quantity, 1)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Quantity was decreased.")  # Checking the message

        # Remove product from cart qty was 1 now is 0
        response = self.client.get(self.remove_from_cart_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.count(), 1)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Dish was removed from plate.")  # Checking the message

        # Remove product from cart qty was 1 now is 0
        response = self.client.get(self.remove_from_cart_2_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.count(), 0)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Dish was removed from plate.")  # Checking the message

    def test_remove_from_cart_invalid_cases(self):
        self.base_remove()
        # Logging User
        self.client.login(email="pytest_tests2@gmail.com", password="Test@321")

        order = Order.objects.last()

        self.assertEqual(order.cart.count(), 2)
        self.assertEqual(order.cart.first().quantity, 2)

        # Remove product from cart of other user
        response = self.client.get(self.remove_from_cart_url)
        self.assertEqual(response.status_code, 403)


class DeleteFromCartTest(BaseTest):

    def base_remove(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # Creating a cart with 2 products
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_2_url)

        order = Order.objects.last()
        self.delete_cart_url = reverse('order:delete-cart', kwargs={'pk': order.cart.first().id})
        self.delete_cart_2_url = reverse('order:delete-cart', kwargs={'pk': order.cart.last().id})

    def test_remove_from_cart_working_case(self):
        self.base_remove()
        order = Order.objects.last()

        self.assertEqual(order.cart.count(), 2)
        self.assertEqual(order.cart.first().quantity, 2)

        # Delete cart
        response = self.client.get(self.delete_cart_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.count(), 1)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Food Item was removed form cart.")  # Checking the message

        # Delete cart
        response = self.client.get(self.delete_cart_2_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.cart.count(), 0)
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Food Item was removed form cart.")  # Checking the message

    def test_remove_from_cart_invalid_cases(self):
        self.base_remove()
        # Logging User
        self.client.login(email="pytest_tests2@gmail.com", password="Test@321")

        order = Order.objects.last()

        self.assertEqual(order.cart.count(), 2)
        self.assertEqual(order.cart.first().quantity, 2)

        # Remove product from cart of other user
        response = self.client.get(self.delete_cart_url)
        self.assertEqual(response.status_code, 403)


class OrderDetailTest(BaseTest):

    def base(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # Creating a cart with 2 products
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_2_url)

        order = Order.objects.all().last()
        self.order_detail_url = reverse('order:detail', kwargs={'pk': order.id})

    def test_order_detail_non_auth(self):
        self.base()
        self.client.logout()
        # Testing Anonymous User
        response = self.client.get(self.order_detail_url)

        # since user in not logged in should redirect to login page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user/login/?next=' + self.order_detail_url)

    def test_order_detail(self):
        self.base()
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")
        response = self.client.get(self.order_detail_url)
        self.assertEqual(response.status_code, 200)

    def test_order_detail_invalid(self):
        self.base()
        # since wrong is user in logged in should give 403
        self.client.login(email="pytest_tests2@gmail.com", password="Test@321")
        response = self.client.get(self.order_detail_url)
        self.assertEqual(response.status_code, 403)


class CartCouponTest(BaseTest):

    def base(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # Creating a cart with 2 products
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_2_url)

    def test_cart_non_auth(self):
        # Testing Anonymous User
        response = self.client.get(self.cart_url)

        # since user in not logged in should redirect to login page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user/login/?next=' + self.cart_url)

    def test_cart_working_case(self):
        self.base()

        # Checking get response
        response = self.client.get(self.cart_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'order/cart_list.html')

        # Checking post response
        response = self.client.post(self.cart_url, {'code': '#GN10'})
        order = Order.objects.filter(user=self.user, ordered=False).first()

        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 2000)
        self.assertEqual(order.get_coupon_total(), 100)
        self.assertEqual(order.get_total(), 1900 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message

    def test_cart_invalid_case1(self):
        # Case1
        # cart total to be below max discount amount
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")
        # Checking post response
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        response = self.client.post(self.cart_url, {'code': '#GN10'})
        order = Order.objects.filter(user=self.user, ordered=False).first()

        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 1000)
        self.assertEqual(order.get_coupon_total(), 100)
        self.assertEqual(order.get_total(), 900 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message

        # Case2
        # coupon already used but not ordered
        self.client.get(self.add_to_cart_url)

        response = self.client.post(self.cart_url, {'code': '#GN10'})
        order = Order.objects.filter(user=self.user, ordered=False).first()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 1500)
        self.assertEqual(order.get_coupon_total(), 100)
        self.assertEqual(order.get_total(), 1400 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message

        # Case 3
        # Using other coupon after applying a coupon
        response = self.client.post(self.cart_url, {'code': '#GN20'})
        order = Order.objects.filter(user=self.user, ordered=False).first()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 1500)
        self.assertEqual(order.get_coupon_total(), 300)
        self.assertEqual(order.get_total(), 1200 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message

        response = self.client.post(self.cart_url, {'code': '#GN10'})
        order = Order.objects.filter(user=self.user, ordered=False).first()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 1500)
        self.assertEqual(order.get_coupon_total(), 100)
        self.assertEqual(order.get_total(), 1400 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message

        # coupon already used and ordered
        # Case 3
        # coupon already used and ordered
        self.client.get(self.checkout_url)
        order_count = Order.objects.filter(user=self.user, ordered=True).count()
        order_ordered = Order.objects.filter(user=self.user, ordered=True).first()
        self.assertEqual(order_count, 1)
        self.assertEqual(order_ordered.coupon_customer.coupon.code, "#GN10")
        self.assertEqual(order_ordered.coupon_customer.discount_amount, 100)

        self.client.get(self.add_to_cart_url)
        # Case 4
        # below minimum order value
        response = self.client.post(self.cart_url, {'code': '#GN20'})
        order = Order.objects.filter(user=self.user, ordered=False).first()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 500)
        self.assertEqual(order.get_coupon_total(), 0)
        self.assertEqual(order.get_total(), 500 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'info')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Minimum order amount should be 1000.0!")  # Checking the message

        # Case 5
        # checking unordered code is working
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        response = self.client.post(self.cart_url, {'code': '#GN20'})
        order = Order.objects.filter(user=self.user, ordered=False).first()
        self.assertEqual(response.status_code, 302)
        self.assertEqual(order.get_total_without_coupon(), 1500)
        self.assertEqual(order.get_coupon_total(), 300)
        self.assertEqual(order.get_total(), 1200 + order.get_tax_total())
        self.assertRedirects(response, self.cart_url)
        # Checking message
        messages = list(get_messages(response.wsgi_request))  # Get the messages
        self.assertEqual(messages[-1].tags, 'success')  # Checking the tag
        self.assertEqual(str(messages[-1]), "Coupon Applied!")  # Checking the message


class CancelOrderTest(BaseTest):

    def base(self):
        # Logging User
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")

        # Checking no order's are there
        order = Order.objects.all().last()
        self.assertEqual(order, None)

        # Creating a cart with 2 products
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_2_url)
        self.client.get(self.checkout_url)

        order = Order.objects.all().first()
        self.cancel_order_url = reverse('order:cancel', kwargs={'pk': order.id})

    def test_cart_non_auth(self):
        self.base()
        self.client.logout()
        # Testing Anonymous User
        response = self.client.post(self.cancel_order_url)

        # since user in not logged in should redirect to login page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user/login/?next=' + self.cancel_order_url)

    def test_cart_working_case(self):
        self.base()

        # Checking get response
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        order = Order.objects.all().last()
        cancel_order = CancelOrder.objects.all().last()

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.order_detail_url)
        self.assertEqual(order.cancel_requested, True)
        self.assertEqual(cancel_order.order, order)

    def test_cart_invalid_case(self):
        self.base()
        self.client.logout()

        # Case 1
        # order user is different than login user
        self.client.login(email="pytest_tests2@gmail.com", password="Test@321")
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        self.assertEqual(response.status_code, 403)
        self.client.logout()

        # Case 2
        # Order cancel request is already true
        self.client.login(email="pytest_tests@gmail.com", password="Test@321")
        self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        self.assertEqual(response.status_code, 403)

        # Case 3
        # order status is ready
        self.client.get(self.add_to_cart_2_url)
        self.client.get(self.checkout_url)
        order = Order.objects.all().first()
        order.order_status = 'Ready'

        self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        self.assertEqual(response.status_code, 403)

        # order status is ready
        self.client.get(self.add_to_cart_2_url)
        self.client.get(self.checkout_url)
        order = Order.objects.all().first()
        order.order_status = 'Delivered'

        self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        self.assertEqual(response.status_code, 403)

        # order status is ready
        self.client.get(self.add_to_cart_2_url)
        self.client.get(self.checkout_url)
        order = Order.objects.all().first()
        order.order_status = 'CANCELED'

        self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        response = self.client.post(self.cancel_order_url, {'cancel_reason': 'Other', 'review_description': 'test'})
        self.assertEqual(response.status_code, 403)


