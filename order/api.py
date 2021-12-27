from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.utils import timezone
from django.shortcuts import get_object_or_404

from menu.models import Product
from home.models import RestaurantsTiming
from .models import Cart, Order, CancelOrder, CouponCustomer, Coupon, Payment, CANCEL_REASON
from .serializers import CartSerializer, OrderSerializer, PaymentSerializer


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
                        'data': "Maximum quantity added."
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    cart.quantity += 1
                    cart.save()
                    response = {
                        'data': "Quantity was updated."
                    }
                    return Response(response, status=status.HTTP_200_OK)
            else:
                order.cart.add(cart)
                order.save()
                response = {
                    'data': "Food Item was added to your cart.",
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
                    return Response(response,  status=status.HTTP_400_BAD_REQUEST)
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
                    'data': f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!'
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        response = {
            'data': "FORBIDDEN."
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
            'data': "FORBIDDEN."
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
                'data': "Restaurant is closed",
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

        order = Order.objects.get(id=self.kwargs.get('pk'))
        if order.user == self.request.user:
            response = {
                'order_total': order.get_total(),
                'tax_total': order.get_tax_total(),
                'total_without_coupon': order.get_total_without_coupon(),
                'coupon_total': order.get_coupon_total()
            }
            return Response(response, status=status.HTTP_200_OK)
        response = {
            'data' 'FORBIDDEN'
        }
        return Response(response, status=status.HTTP_403_FORBIDDEN)


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
            'data' 'FORBIDDEN'
        }
        return Response(response, status=status.HTTP_403_FORBIDDEN)
