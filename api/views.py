import razorpay
from django.urls import reverse
from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.utils import timezone

from analytics.views import send_order_notification, send_mail
from golden_nest.settings import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from home.models import RestaurantsTiming
from menu.forms import BookTableForm
from menu.models import Product, Category, TableCount, TableView, TableTime, BookTable, Table
from menu.serializers import ProductSerializer, CategorySerializer, TableTimeSerializer, TableCountSerializer, \
    TableViewSerializer, BookTableSerializer
import datetime as dt
from django.shortcuts import get_object_or_404
from order.models import Cart, Order, CancelOrder, CouponCustomer, Coupon, Payment, CANCEL_REASON
from order.serializers import CartSerializer, OrderSerializer, PaymentSerializer

from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from room.forms import RoomAddForm
from room.models import Rooms, RoomBooked, RoomPayment
from room.serializers import RoomSerializer, RoomBookedSerializer
from users.serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer, UserUpdateSerializer
)
from users.models import User
from users.utils import send_activation_mail


class ProductListAPI(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class ProductAPI(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class CategoryAPI(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class CategoryListAPI(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class TableCountAPI(generics.RetrieveAPIView):
    queryset = TableCount.objects.all()
    serializer_class = TableCountSerializer
    permission_classes = [permissions.AllowAny]


class TableCountListAPI(generics.ListAPIView):
    queryset = TableCount.objects.all()
    serializer_class = TableCountSerializer
    permission_classes = [permissions.AllowAny]


class TableViewAPI(generics.RetrieveAPIView):
    queryset = TableView.objects.all()
    serializer_class = TableViewSerializer
    permission_classes = [permissions.AllowAny]


class TableViewListAPI(generics.ListAPIView):
    queryset = TableView.objects.all()
    serializer_class = TableViewSerializer
    permission_classes = [permissions.AllowAny]


class TableTimeAPI(generics.RetrieveAPIView):
    queryset = TableTime.objects.all()
    serializer_class = TableTimeSerializer
    permission_classes = [permissions.AllowAny]


class TableTimeListAPI(generics.ListAPIView):
    queryset = TableTime.objects.all()
    serializer_class = TableTimeSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookTableAPI(views.APIView):

    def post(self, request, format=None):
        add_food = self.request.data.get('add_food')

        timing = RestaurantsTiming.objects.first()
        if not timing.is_restaurant_open():
            data = {'error': 'Sorry, Table Reservation is from 9 A.M. to 9 P.M.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        print(self.request.data)
        name = request.data['name'] if request.data.get('name') else None
        email = request.data['email'] if request.data.get('email') else None
        phone_number = request.data['phone_number'] if request.data.get('phone_number') else None
        people_count = request.data['people_count'] if request.data.get('people_count') else None
        sitting_type = request.data['sitting_type'] if request.data.get('sitting_type') else None
        booked_for_date = request.data['booked_for_date'] if request.data.get('booked_for_date') else None
        booked_for_time = request.data['booked_for_time'] if request.data.get('booked_for_time') else None
        form = BookTableForm(data={
            'name': name,
            'email': email,
            'sitting_type': sitting_type,
            'people_count': people_count,
            'booked_for_date': booked_for_date,
            'booked_for_time': booked_for_time,
            'phone_number': phone_number,
        })
        if form.is_valid():
            now = datetime.now().date()
            book_date = datetime.strptime(booked_for_date, "%Y-%m-%d")
            if now == book_date.date():
                time_now = datetime.now().time()
                time_now = dt.timedelta(hours=time_now.hour, minutes=time_now.minute).total_seconds()
                table_time = datetime.strptime(booked_for_time, "%H:%M").time()
                table_time_delta = dt.timedelta(hours=table_time.hour, minutes=table_time.minute).total_seconds()
                if not table_time_delta - time_now > 7199:
                    data = {'data': 'Sorry, Table booking is available after 2 hours from current time!'}
                    return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)

            table_form = form.save(commit=False)
            table_form.user = self.request.user
            timing = RestaurantsTiming.objects.first()
            close_timing = timing.closing_time
            if table_form:
                booked_time = table_form.booked_for_time
                now = dt.timedelta(hours=booked_time.hour, minutes=booked_time.minute) + dt.timedelta(
                    hours=2)
                if not dt.timedelta(hours=close_timing.hour, minutes=close_timing.minute,
                                    seconds=close_timing.second) > now:
                    data = {'error': 'Sorry, Order not accepted from 2 hours before shutting down!!!'}
                    return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)
            table_available = Table.objects.last()

            if table_available:
                # getting or creating a order
                order = Order.objects.filter(user=self.request.user, ordered=False).first()
                if order and order.table and order.cart.all():
                    order_cart_url = reverse('order:cart')
                    url = self.request.build_absolute_uri(order_cart_url)
                    data = {'data': 'Table already added to order', 'redirect_url': url}
                    return Response(data, status=status.HTTP_308_PERMANENT_REDIRECT)
                if not order:
                    ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    order = Order.objects.create(
                        user=self.request.user, ordered_date_time=ordered_date_time)
                    ORN = f"ORN-{100000 + int(order.id)}"
                    order.order_ref_number = ORN
                    order.save()
                if order.table:
                    table = order.table
                    table.delete()
                table_form.table = table_available

                table_form.save()  # saving book table here for order
                ORN = f"TRN-{100000 + int(table_form.id)}"
                table_form.order_ref_number = ORN
                table_form.save()
                order.table = table_form
                order.save()
                if add_food == 'add_food':
                    menu_url = reverse('menu:menu')
                    url = self.request.build_absolute_uri(menu_url)
                    data = {'data': 'Table Booked, Add food to cart and continue checkout!', 'redirect_url': url}
                    return Response(data, status=status.HTTP_308_PERMANENT_REDIRECT)
                else:
                    if order.cart.all():
                        for cart in order.cart.all():
                            cart.delete()

                    order.ordered = True
                    order.save()

                    table = order.table
                    table.is_booked = True
                    table.save()

                    admin_unconfirmed_table_url = reverse('analytics:not-confirmed-table-list')
                    admin_unconfirmed_table_url = self.request.build_absolute_uri(admin_unconfirmed_table_url)
                    msg = f"New Table is reserved. Check Unconfirmed Table List:\n {admin_unconfirmed_table_url}"
                    send_order_notification(self.request, msg)
                    data = {'data': 'Table Booked!'}
                    return Response(data, status=status.HTTP_202_ACCEPTED)
            else:
                data = {'error': 'Table not available at the given time'}
                return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)
        data = form.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


class RemoveTableOrderAPI(views.APIView):

    def get(self, request, format=None):
        order = Order.objects.filter(ordered=False, user=request.user).first()
        if not order:
            data = {'error': 'Order Does Not Exist'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        if order.table.is_booked is not True:
            BookTable.objects.get(id=order.table.id).delete()
            data = {'data': 'Table was removed form order.'}
            return Response(data, status=status.HTTP_200_OK)
        data = {'error': 'FORBIDDEN'}
        return Response(data, status=status.HTTP_403_FORBIDDEN)


# Order API
class CartListAPI(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cart = Cart.objects.filter(user=self.request.user, ordered=False)
        return cart


class CartQuantityUpdateAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, cart_pk, qty):
        cart = Cart.objects.get(id=cart_pk)
        cart.quantity = qty
        cart.save()
        if qty == 0:
            order = Order.objects.get(ordered=False, cart=cart)
            order.cart.remove(cart)
            cart.delete()
        response = {
            'data': 'Cart Updated',
            'id': cart.id,
        }
        return Response(response, status=status.HTTP_200_OK)


class AddToCartAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        cart, created = Cart.objects.get_or_create(
            product=product,
            user=request.user,
            ordered=False,
            # size=size,
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if order.cart.filter(product=product).exists():
                if cart.quantity >= 10:
                    response = {
                        'data': "Maximum quantity added.",
                        'id': cart.id,
                        'order_id': order.id,
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    cart.quantity += 1
                    cart.save()
                    response = {
                        'data': "Quantity was updated.",
                        'id': cart.id,
                        'order_id': order.id,

                    }
                    return Response(response, status=status.HTTP_200_OK)
            else:
                order.cart.add(cart)
                order.save()
                response = {
                    'data': "Food Item was added to your cart.",
                    'id': cart.id,
                    'order_id': order.id,

                }
                return Response(response, status=status.HTTP_200_OK)
        else:
            ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            order = Order.objects.create(
                user=request.user, ordered_date_time=ordered_date_time)
            ORN = f"ORN-{100000 + int(order.id)}"
            order.order_ref_number = ORN
            order.cart.add(cart)
            order.save()
            response = {
                'data': "Food Item was added to your cart.",
                'id': cart.id,
                'order_id': order.id,
            }
            return Response(response, status=status.HTTP_200_OK)


class AddCouponOrderAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order = Order.objects.filter(user=request.user, ordered=False).first()
        if order and request.data['code']:
            try:
                coupon = CouponCustomer.objects.get(code=request.data['code'], user=self.request.user)
                if coupon.used is True:
                    response = {
                        'data': 'Coupon Already Used!'
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            except:
                coupon = CouponCustomer.objects.create(user=self.request.user, code=request.data['code'])
            order = Order.objects.filter(user=self.request.user, ordered=False).first()
            order_amount = order.get_total_without_coupon()

            vendor_coupon = Coupon.objects.get(code=coupon.code)
            if order_amount >= vendor_coupon.minimum_order_amount:
                discount_amount = int(float(order_amount) * (float(vendor_coupon.discount_percent) / 100))
                if discount_amount > vendor_coupon.max_discount_amount:
                    coupon.discount_amount = vendor_coupon.max_discount_amount
                else:
                    coupon.discount_amount = discount_amount
                coupon.coupon = vendor_coupon
                coupon.save()

                # Adding Coupon to order
                order.coupon_customer = coupon
                # order.coupon_used = True
                order.save()
                response = {
                    'data': 'Coupon Applied!',
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {
                    'error': f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!'
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        response = {
            'error': "FORBIDDEN."
        }
        return Response(response, status=status.HTTP_403_FORBIDDEN)


class CancelOrderAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order = Order.objects.get(id=self.kwargs.get('pk'))
        if order.user == self.request.user and order.order_status in ['Processing', 'Preparing'] and \
                order.cancel_requested is False:
            cancel_form = CancelOrder.objects.create(cancel_reason=request.data['cancel_reason'],
                                                     review_description=request.data['review_description'])
            order.cancel_requested = True
            order.save()

            cancel_form.order = order
            cancel_form.save()
            response = {
                'data': "Order Cancel Requested.",
            }
            return Response(response, status=status.HTTP_200_OK)
        response = {
            'error': "FORBIDDEN."
        }
        return Response(response, status=status.HTTP_403_FORBIDDEN)


class OrderListAPI(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        order = Order.objects.filter(user=self.request.user, ordered=True)
        return order


class OrderDetailAPI(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class CheckoutAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        order = Order.objects.filter(user=self.request.user, ordered=False).first()
        amount = int(order.get_total())

        # payment_id = self.request.POST.get('payment_id', False)
        # if payment_id:  # add not
        #     return redirect('order-checkout')
        # else:
        timing = RestaurantsTiming.objects.first()
        if timing.is_restaurant_open():
            # client = razorpay.Client(auth=(razorpay_api, razorpay_secret))
            # razorpay_payment = client.order.create(
            #     {
            #         'amount': amount,
            #         'currency': order_currency,
            #         'payment_capture': 1
            #     }
            # )

            # Adding Payment
            payment = Payment()
            payment.user = self.request.user
            payment.amount = amount
            payment.order_id = f'{self.request.user.id}_{timezone.datetime.now()}'
            payment.payment_id = f'{self.request.user.id}_{timezone.datetime.now()}'
            payment.amount_paid = order.get_total()
            # payment.payment_id = razorpay_payment['id']
            # payment.amount_paid = razorpay_payment['amount_paid']
            payment.save()

            # Checking if coupon is applied.
            if order.coupon_used:
                coupon_customer = CouponCustomer.objects.get(id=order.coupon_customer.id)
                coupon_customer.used = True
                coupon_customer.save()

            # Updating cart
            cart = order.cart.all()
            cart.update(ordered=True)

            if order.table:
                table = order.table
                table.is_booked = True
                table.save()

            ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            order.ordered_date_time = ordered_date_time
            order.payment = payment
            order.ordered = True
            order.order_id = payment.order_id
            order.payment.payment_method = 'Online'
            order.save()

            # payment.paid = True
            # payment.save()
            response = {
                'data': "Your order was successful!",
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'error': "Restaurant is closed",
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class OrderCancelReasonAPI(views.APIView):

    @staticmethod
    def get(self):
        return Response(CANCEL_REASON, status=status.HTTP_200_OK)


class CartDetailAPI(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]


class PaymentDetailAPI(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrderTotalAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        user = self.request.user
        order = Order.objects.filter(ordered=False, user=user).last()
        # order = Order.objects.get(id=self.kwargs.get('pk'))
        if order:
            response = {
                'order_id': order.id,
                'order_total': order.get_total(),
                'order_total_without_tax': order.get_total() - order.get_tax_total(),
                'tax_total': order.get_tax_total(),
                'total_without_coupon': order.get_total_without_coupon(),
                'coupon_total': order.get_coupon_total()
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'error' 'Cart Empty'
            }
            return Response(response, status=status.HTTP_200_OK)


class CartTotalAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        cart = Cart.objects.get(id=self.kwargs.get('pk'))
        if cart.user == self.request.user:
            response = {
                'cart_total': cart.get_total_item_price(),
                'cart_tax': cart.get_tax()
            }
            return Response(response, status=status.HTTP_200_OK)
        response = {
            'error' 'FORBIDDEN'
        }
        return Response(response, status=status.HTTP_403_FORBIDDEN)


# Users API


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
                'error': 'Incorrect email or Password',
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
                'error': 'User Not active',
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
                'error': 'Already verified',
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
                return Response({"error": "Wrong password (Old)."}, status=status.HTTP_400_BAD_REQUEST)

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
                return Response({"error": "New password does not match."}, status=status.HTTP_400_BAD_REQUEST)
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


class RoomListAPI(generics.ListAPIView):
    model = Rooms
    serializer_class = RoomSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        rooms = Rooms.objects.all()
        return rooms


class BookRoomAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        name = request.data.get('name') if request.data.get('name') else None
        phone_number = request.data.get('phone_number') if request.data.get('phone_number') else None
        check_in = request.data.get('check_in') if request.data.get('check_in') else None
        check_out = request.data.get('check_out') if request.data.get('check_out') else None
        people_variation = request.data.get('people_variation') if request.data.get('people_variation') else None

        form = RoomAddForm(data={
            'name': name,
            'phone_number': phone_number,
            'check_in': check_in,
            'check_out': check_out,
            'people_variation': people_variation,
        })
        if form.is_valid():
            book_room = form.instance
            book_room.user = self.request.user
            pk = self.kwargs.get('pk')
            room_type = get_object_or_404(Rooms, pk=pk)
            if not room_type:
                data = {'error': "Room not exist!"}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            if not room_type.stock_no > 0:
                data = {'error': "Room not available, sorry for inconvenience"}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            book_room_remain = book_room.check_out - book_room.check_in

            no_of_days = book_room_remain.days

            if (book_room.check_in - datetime.now().date()).days + 1 < 0:
                data = {'error': "Please select proper check in date"}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            if not no_of_days > 0:
                data = {'error': "Please select proper check out date"}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            book_room.room_type = room_type
            room_type.save()
            book_room.payment_method = "API Payment Call"
            book_room.no_of_days = no_of_days
            book_room.is_booked = False
            book_room.save()
            total = book_room.no_of_days * book_room.room_type.price
            tax = total * 12 // 100
            sub_total = total + tax
            data = {'data': "Room Booked Successfully",'user_id': book_room.user.id , 'id': book_room.id, 'no_of_days': book_room.no_of_days, 'people': book_room.people_variation.no_of_person,'tax': tax ,'total': total, 'order_amount': sub_total}
            return Response(data, status=status.HTTP_200_OK)
        else:
            print(form.errors.as_json())
        data = form.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


class PaymentAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id') if request.data.get('user_id') else None
        payment_id = request.data.get('payment_id') if request.data.get('payment_id') else None
        razorpay_order_id = request.data.get('razorpay_order_id') if request.data.get('razorpay_order_id') else None
        signature = request.data.get('signature') if request.data.get('signature') else None
        order_id = request.data.get('order_id') if request.data.get('order_id') else None

        user = User.objects.filter(id=int(user_id)).last()
        booking = RoomBooked.objects.filter(id=int(order_id)).first()
        if booking and user:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            result = client.utility.verify_payment_signature(params_dict)
            if result is None:
                try:
                    order_amount = (booking.get_total() * 100)
                    order_currency = "INR"
                    captured_payment = client.payment.capture(payment_id, order_amount, {"currency": order_currency})
                    response = client.payment.fetch(payment_id)
                except:
                    response = client.payment.fetch(payment_id)
                    if response['status'] == 'authorized' or response['status'] == 'captured':
                        user = request.user
                        # Reduce stock and update order to ordered True
                        booking.is_booked = True
                        room_type = booking.room_type
                        room_type.stock_no -= 1
                        room_type.save()
                        payment = RoomPayment()
                        payment.user = user
                        payment.amount = booking.get_total()
                        payment.order_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.payment_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.amount_paid = int(response['amount']) / 100
                        payment.payment_method = response['method']
                        payment.razorpay_order_id = razorpay_order_id
                        payment.payment_id = payment_id
                        payment.signature = signature
                        payment.paid = True
                        payment.save()
                        booking.payment = payment
                        booking.payment_method = payment.payment_method
                        booking.save()

                        send_mail(self.request, booking.user, "You will be notify when your room booking is confirmed!")
                        admin_unconfirmed_table_url = reverse('analytics:not-confirmed-rooms-list')
                        admin_unconfirmed_table_url = self.request.build_absolute_uri(admin_unconfirmed_table_url)
                        msg = f"New Room is booked. Check Unconfirmed Room List:\n {admin_unconfirmed_table_url}"
                        send_order_notification(self.request, msg)

                        data = {'data': "Room booked Successfully."}
                        return Response(data, status=status.HTTP_200_OK)


class RazorPayResponseView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        payment_id = request.data.get('razorpay_payment_id', '')
        razorpay_order_id = request.data.get('razorpay_order_id', '')
        signature = request.data.get('razorpay_signature', '')
        order_id = request.data.get('order', '')
        order = Order.objects.filter(id=int(order_id)).first()
        if order:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            result = client.utility.verify_payment_signature(params_dict)
            if result is None:
                try:
                    order_amount = (order.get_total() * 100)
                    order_currency = "INR"
                    captured_payment = client.payment.capture(payment_id, order_amount, {"currency": order_currency})
                    response = client.payment.fetch(payment_id)
                except:
                    response = client.payment.fetch(payment_id)
                    if response['status'] == 'authorized' or response['status'] == 'captured':
                        user = request.user
                        # Reduce stock and update order to ordered True
                        for cart in order.cart.all():
                            cart.ordered = True
                            cart.order_ref_number = order.order_ref_number
                            cart.product_title = cart.product.title
                            cart.product_discount_price = cart.product.price
                            cart.order_total = cart.get_total_item_price() + cart.get_tax()
                            cart.save()
                        order.ordered = True
                        payment = Payment()
                        payment.user = user
                        payment.amount = order.get_total()
                        payment.order_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.payment_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.amount_paid = int(response['amount']) / 100
                        payment.payment_method = response['method']
                        payment.razorpay_order_id = razorpay_order_id
                        payment.payment_id = payment_id
                        payment.signature = signature
                        payment.paid = True
                        payment.save()
                        order.payment = payment
                        order.payment_method = payment.payment_method
                        if order.table:
                            table = order.table
                            table.is_booked = True
                            table.save()
                        order.ordered = True
                        order.tax = order.get_tax_total()
                        order.total = order.get_total()
                        order.save()
                        coupon_customer = order.coupon_customer
                        if coupon_customer:
                            coupon_customer.used = True
                            coupon_customer.save()
                            order.coupon_used = True
                            order.save()
                        admin_order_detail_url = reverse('analytics:order-detail', kwargs={'pk': order.id})
                        admin_order_detail_url = self.request.build_absolute_uri(admin_order_detail_url)
                        msg = f"New Order is placed. Check Order Detail:\n {admin_order_detail_url}"
                        send_order_notification(self.request, msg)
                        data = {'data': "Order placed Successfully."}
                        return Response(data, status=status.HTTP_200_OK)
            else:
                data = {'error': "Signature Mismatched."}
                return Response(data, status=status.HTTP_400_BAD_REQUEST)


class BookedRoomListViewAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    model = RoomBooked
    serializer_class = RoomBookedSerializer

    def get_queryset(self):
        queryset = self.model.objects.filter(
            user=self.request.user, is_booked=True, is_rejected=False)
        return queryset


class ConfirmedBookRoomListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    model = RoomBooked
    serializer_class = RoomBookedSerializer

    def get_queryset(self):
        queryset = self.model.objects.filter(
            user=self.request.user, is_booked=True, is_confirmed=True, is_rejected=False)
        return queryset

class BookedTableListAPIView(generics.ListAPIView):
    model = BookTable
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookTableSerializer

    def get_queryset(self):
        user = self.request.user
        return self.model.objects.filter(user=user)
