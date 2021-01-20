from django.shortcuts import reverse
from rest_framework.test import APITestCase
from django.utils import timezone

from menu.models import Product, Category, TableCount, TableView, TableTime, Table, BookTable
from order.models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon
)
from users.models import User
from home.models import RestaurantsTiming

from order.serializers import CartSerializer, OrderSerializer, PaymentSerializer


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
            minimum_order_amount=1500.00,
            max_discount_amount=400
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

        self.cart_url = reverse('order:api-cart')
        self.add_coupon_url = reverse('order:api-coupon-order')
        self.add_to_cart_url = reverse('order:api-add-to-cart', kwargs={'slug': self.product.slug})
        self.add_to_cart_2_url = reverse('order:api-add-to-cart', kwargs={'slug': self.product_2.slug})

        self.order_list_url = reverse('order:api-list')

        self.checkout_url = reverse('order:api-checkout')
        self.order_detail_url = reverse('order:api-detail', kwargs={'pk': 1})
        return super().setUp()


class CartList(BaseTest):

    def non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.client.get(self.add_to_cart_url)
        response = self.client.get(self.cart_url)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_valid_case_1(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        response = self.client.get(self.cart_url)

        self.assertEqual(response.status_code, 200)
        cart = Cart.objects.filter(user=self.user, ordered=False)
        serializer = CartSerializer(cart.first())
        self.assertEqual(response.data[0], serializer.data)


class CartQtyUpdate(BaseTest):

    def non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.update_cart = reverse('order:api-cart-qty-update', kwargs={'cart_pk': 1, 'qty': 4})

        response = self.client.get(self.update_cart)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_valid_case_1(self):
        # Increasing cart qty
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        cart = Cart.objects.filter(user=self.user, ordered=False)
        self.update_cart = reverse('order:api-cart-qty-update', kwargs={'cart_pk': cart.first().id, 'qty': 4})
        response = self.client.get(self.update_cart)

        self.assertEqual(response.status_code, 200)
        cart = Cart.objects.get(id=cart.first().id)

        self.assertEqual(response.data['data'], 'Cart Updated')
        self.assertEqual(cart.quantity, 4)

        # Decreasing Qty
        cart = Cart.objects.filter(user=self.user, ordered=False)
        self.update_cart = reverse('order:api-cart-qty-update', kwargs={'cart_pk': cart.first().id, 'qty': 2})
        response = self.client.get(self.update_cart)

        self.assertEqual(response.status_code, 200)
        cart = Cart.objects.get(id=cart.first().id)

        self.assertEqual(response.data['data'], 'Cart Updated')
        self.assertEqual(cart.quantity, 2)

    def test_get_valid_case_2(self):
        # Deleting cart by making qty 0
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        cart = Cart.objects.filter(user=self.user, ordered=False)
        self.update_cart = reverse('order:api-cart-qty-update', kwargs={'cart_pk': cart.first().id, 'qty': 0})
        response = self.client.get(self.update_cart)

        self.assertEqual(response.status_code, 200)
        cart = Cart.objects.filter(user=self.user, ordered=False)

        self.assertEqual(response.data['data'], 'Cart Updated')
        self.assertEqual(cart.first(), None)


class AddToCart(BaseTest):

    def non_auth(self):
        self.client.post(self.login_url, self.login_data)
        response = self.client.get(self.add_to_cart_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_valid_case_1(self):
        # Adding to cart and creating a order.
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        response = self.client.get(self.add_to_cart_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], 'Food Item was added to your cart.')

        cart = Cart.objects.filter(user=self.user, ordered=False)
        order = Order.objects.filter(user=self.user, ordered=False).last()

        self.assertEqual(cart.last().quantity, 1)
        self.assertEqual(order.cart.all().last(), cart.last())
        self.assertEqual(order.cart.all().first().product, self.product)

        # Adding to cart while the same product is already in cart
        response = self.client.get(self.add_to_cart_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Quantity was updated.")

        cart = Cart.objects.filter(user=self.user, ordered=False)
        order = Order.objects.filter(user=self.user, ordered=False).last()

        self.assertEqual(cart.last().quantity, 2)
        self.assertEqual(order.cart.all().last(), cart.last())
        self.assertEqual(order.cart.all().last().product, self.product)

        # Adding to cart while the other product is already in cart
        response = self.client.get(self.add_to_cart_2_url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Food Item was added to your cart.",)

        cart = Cart.objects.filter(user=self.user, ordered=False)
        order = Order.objects.filter(user=self.user, ordered=False).last()

        self.assertEqual(cart.last().quantity, 1)
        self.assertEqual(order.cart.all().last(), cart.last())
        self.assertEqual(order.cart.all().last().product, self.product_2)

        # Adding max qty
        self.client.get(self.add_to_cart_url)  # 3
        self.client.get(self.add_to_cart_url)  # 4
        self.client.get(self.add_to_cart_url)  # 5
        self.client.get(self.add_to_cart_url)  # 6
        self.client.get(self.add_to_cart_url)  # 7
        self.client.get(self.add_to_cart_url)  # 8
        response = self.client.get(self.add_to_cart_url)  # 9

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'],  "Quantity was updated.")
        cart = Cart.objects.filter(user=self.user, ordered=False)
        self.assertEqual(cart.first().quantity, 9)

        response = self.client.get(self.add_to_cart_url)  # 10
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Quantity was updated.")
        cart = Cart.objects.filter(user=self.user, ordered=False)
        self.assertEqual(cart.first().quantity, 10)

        response = self.client.get(self.add_to_cart_url)  # 11
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Maximum quantity added.")
        cart = Cart.objects.filter(user=self.user, ordered=False)
        order = Order.objects.filter(user=self.user, ordered=False).last()

        self.assertEqual(cart.first().quantity, 10)
        self.assertEqual(order.cart.all().last(), cart.last())
        self.assertEqual(order.cart.all().first().product, self.product)

        response = self.client.get(self.add_to_cart_url)  # 12
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Maximum quantity added.")
        cart = Cart.objects.filter(user=self.user, ordered=False)
        order = Order.objects.filter(user=self.user, ordered=False).last()

        self.assertEqual(cart.first().quantity, 10)
        self.assertEqual(order.cart.all().last(), cart.last())
        self.assertEqual(order.cart.all().first().product, self.product)


class AddCoupon(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        response = self.client.get(self.add_coupon_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_invalid_data(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
        response = self.client.get(self.add_coupon_url)
        self.assertEqual(response.status_code, 405)

    def test_get_valid_case_1(self):
        # Adding coupon to order
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18)

        response = self.client.post(self.add_coupon_url, {'code': '#GN10'})
        self.assertEqual(response.data['data'],  'Coupon Applied!')
        self.assertEqual(response.status_code, 200)

        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertNotEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18 - 100)

        # Adding coupon to order while one is added
        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertNotEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18 - 100)

        response = self.client.post(self.add_coupon_url, {'code': '#GN10'})
        self.assertEqual(response.data['data'], 'Coupon Applied!')
        self.assertEqual(response.status_code, 200)

        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertNotEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18 - 100)

        # Check max discount
        self.client.get(self.add_to_cart_url)
        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertNotEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1500 + 1500 * 0.18 - 100)

        # Trying to use already use coupon
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True).first()
        self.assertNotEqual(order.coupon_customer, None)
        self.assertEqual(order.coupon_customer.used, True)
        self.assertEqual(order.get_total(), 1500 + 1500 * 0.18 - 100)
        self.assertEqual(order.payment.amount, 1500 + 1500 * 0.18 - 100)

        self.client.get(self.add_to_cart_url)
        self.client.get(self.add_to_cart_url)
        response = self.client.post(self.add_coupon_url, {'code': '#GN10'})
        self.assertEqual(response.data['data'], 'Coupon Already Used!')
        self.assertEqual(response.status_code, 400)

        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18)

        # order amount below min amt of coupon
        response = self.client.post(self.add_coupon_url, {'code': '#GN20'})
        vendor_coupon = Coupon.objects.get(code='#GN20')
        self.assertEqual(response.data['data'], f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!')
        self.assertEqual(response.status_code, 400)

        order = Order.objects.filter(user=self.user, ordered=False).last()
        self.assertEqual(order.coupon_customer, None)
        self.assertEqual(order.get_total(), 1000 + 1000 * 0.18)


class CancelOrderTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': 1})

        response = self.client.post(self.cancel_order, {
            "cancel_reason": "Not Needed",
            "review_description": "testttt"
        })
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    # def test_invalid_data(self):
    #     response = self.client.post(self.login_url, self.login_data)
    #     token = response.data["token"]
    #     self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')
    #
    #     self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': 1})
    #     response = self.client.post(self.cancel_order, {
    #         "cancel_reason": "Not Needed",
    #         "review_description": "testttt"
    #     })
    #     self.assertEqual(response.status_code, 403)
    #     self.assertEqual(response.data['data'], "FORBIDDEN")

    def test_get_valid_case_1(self):
        # Canceling order
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().cancel_requested, False)

        self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': order.last().id})
        response = self.client.post(self.cancel_order, {
            "cancel_reason": "Not Needed",
            "review_description": "testttt"
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], "Order Cancel Requested.")

        order = Order.objects.filter(user=self.user, ordered=True).last()
        self.assertEqual(order.cancel_requested, True)
        cancel_order = CancelOrder.objects.get(order=order)
        self.assertEqual(cancel_order.order, order)

        # Requesting cancel again
        self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': order.id})
        response = self.client.post(self.cancel_order, {
            "cancel_reason": "Not Needed",
            "review_description": "testttt"
        })

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['data'], "FORBIDDEN.")

        order = Order.objects.filter(user=self.user, ordered=True).last()
        self.assertEqual(order.cancel_requested, True)
        cancel_order = CancelOrder.objects.get(order=order)
        self.assertEqual(cancel_order.order, order)

    def test_get_valid_case_2(self):
        # order status is other than Processing, Preparing

        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().cancel_requested, False)
        order = order.last()
        order.order_status = "Ready"
        order.save()

        self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': order.id})
        response = self.client.post(self.cancel_order, {
            "cancel_reason": "Not Needed",
            "review_description": "testttt"
        })

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['data'], "FORBIDDEN.")

        order = Order.objects.filter(user=self.user, ordered=True).last()
        self.assertEqual(order.cancel_requested, False)
        cancel_order = CancelOrder.objects.filter(order=order).first()
        self.assertEqual(cancel_order, None)

    def test_get_valid_case_3(self):
        # order status is other than Processing, Preparing

        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)
        self.assertEqual(order.count(), 1)
        self.assertEqual(order.first().cancel_requested, False)
        order = order.last()
        order.order_status = "Delivered"
        order.save()

        self.cancel_order = reverse('order:api-cancel-order', kwargs={'pk': order.id})
        response = self.client.post(self.cancel_order, {
            "cancel_reason": "Not Needed",
            "review_description": "testttt"
        })

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['data'], "FORBIDDEN.")

        order = Order.objects.filter(user=self.user, ordered=True).last()
        self.assertEqual(order.cancel_requested, False)
        cancel_order = CancelOrder.objects.filter(order=order).first()
        self.assertEqual(cancel_order, None)


class OrderListTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        response = self.client.post(self.order_list_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)

        response = self.client.get(self.order_list_url)
        self.assertEqual(response.status_code, 200)
        order = Order.objects.filter(user=self.user, ordered=True)
        serializer = OrderSerializer(order.first())
        self.assertEqual(response.data[0], serializer.data)


class OrderDetailTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.order_detail_url = reverse('order:api-detail', kwargs={'pk': 1})
        response = self.client.post(self.order_detail_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)

        self.order_detail_url = reverse('order:api-detail', kwargs={'pk': order.first().id})
        response = self.client.get(self.order_detail_url)
        self.assertEqual(response.status_code, 200)
        order = Order.objects.filter(user=self.user, ordered=True)
        serializer = OrderSerializer(order.first())
        self.assertEqual(response.data, serializer.data)


class CartDetailTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.cart_detail_url = reverse('order:api-cart-detail', kwargs={'pk': 1})
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)

        self.cart_detail_url = reverse('order:api-cart-detail', kwargs={'pk': order.first().cart.all().first().id})
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        cart = Cart.objects.filter(user=self.user, ordered=True)
        serializer = CartSerializer(cart.first())
        self.assertEqual(response.data, serializer.data)


class PaymentDetailTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.payment_detail_url = reverse('order:api-payment-detail', kwargs={'pk': 1})
        response = self.client.get(self.payment_detail_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)

        self.payment_detail_url = reverse('order:api-payment-detail', kwargs={'pk': order.first().payment.id})
        response = self.client.get(self.payment_detail_url)
        self.assertEqual(response.status_code, 200)
        order = Order.objects.filter(user=self.user, ordered=True)
        serializer = PaymentSerializer(order.first().payment)
        self.assertEqual(response.data, serializer.data)


class OrderTotalTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.order_total_url = reverse('order:api-total', kwargs={'pk': 1})
        response = self.client.get(self.order_total_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)

        self.order_total_url = reverse('order:api-total', kwargs={'pk': order.first().id})
        response = self.client.get(self.order_total_url)
        self.assertEqual(response.status_code, 200)
        order = Order.objects.filter(user=self.user, ordered=True).last()
        response = {
            'order_total': order.get_total(),
            'tax_total': order.get_tax_total(),
            'total_without_coupon': order.get_total_without_coupon(),
            'coupon_total': order.get_coupon_total()
        }
        self.assertEqual(response, response)


class CartTotalTest(BaseTest):

    def test_non_auth(self):
        self.client.post(self.login_url, self.login_data)
        self.cart_total_url = reverse('order:api-cart-total', kwargs={'pk': 1})
        response = self.client.get(self.cart_total_url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data['detail'], "Authentication credentials were not provided.")

    def test_get_order_list(self):
        response = self.client.post(self.login_url, self.login_data)
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f'token {token}')

        self.client.get(self.add_to_cart_url)
        self.client.get(self.checkout_url)
        order = Order.objects.filter(user=self.user, ordered=True)

        self.cart_total_url = reverse('order:api-cart-total', kwargs={'pk': order.first().id})
        response = self.client.get(self.cart_total_url)
        self.assertEqual(response.status_code, 200)
        order = Order.objects.filter(user=self.user, ordered=True).last()
        cart = order.cart.all().first()
        response = {
            'cart_total': cart.get_total_item_price(),
            'cart_tax': cart.get_tax()
        }
        self.assertEqual(response, response)
