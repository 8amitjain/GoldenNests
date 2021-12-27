from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin, PermissionDenied
from django.shortcuts import (
    get_object_or_404, redirect, render
)
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView
import datetime

from analytics.views import send_order_notification
from golden_nest.settings import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from menu.models import Product, Table
from .filters import OrderFilter
from .forms import CouponCustomerForm
from .models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon, TableCart, OfflineOrder
)
from home.models import RestaurantsTiming

import razorpay
from django.views.decorators.csrf import csrf_exempt


class RemoveAllCart(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        cart_list = Cart.objects.filter(user=self.request.user)
        for cart in cart_list:
            order_qs = Order.objects.filter(user=self.request.user, ordered=False, cart=cart)
            for order in order_qs:
                order.delete()
            cart.delete()
        messages.success(self.request, "All items from cart removed!")
        return redirect('order:cart')


class RemoveAllTableCart(View):
    def get(self, *args, **kwargs):
        cart_list = TableCart.objects.filter(session_user=self.request.session.session_key)
        for cart in cart_list:
            order_qs = OfflineOrder.objects.filter(session_user=self.request.session.session_key, ordered=False,
                                                   cart=cart)
            for order in order_qs:
                order.delete()
            cart.delete()
        messages.success(self.request, "All items from cart removed!")
        redirect_url = self.request.META.get('HTTP_REFERER')
        return redirect(redirect_url)


class AddtoCartQR(View):
    def get(self, request, *args, **kwargs):
        pk = self.request.GET.get('product_id')
        table_id = self.request.GET.get('table_id')
        session_user = self.request.session.session_key
        table = Table.objects.filter(id=int(table_id)).first()
        if not table:
            return JsonResponse({
                'status': 'table not found'
            })
        quantity = int(request.GET.get('quantity', 1))
        product = get_object_or_404(Product, pk=pk)
        if not product.is_active:
            raise PermissionDenied
        if not request.session or not request.session.session_key:
            request.session.save()

        cart, created = TableCart.objects.get_or_create(
            product=product,
            ordered=False,
            is_expired=False,
            session_user=session_user
        )
        if quantity <= 0:
            order_qs = OfflineOrder.objects.filter(table=table, ordered=False, is_expired=False,
                                                   session_user=session_user)
            cart.delete()
            order = order_qs.filter(cart=cart).first()
            if order and order.cart.count() == 0:
                order.delete()
            messages.info(request, "Product was removed from order.")
            if order_qs.exists():
                order = order_qs[0]
                return JsonResponse(
                    {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                     'get_total_without_coupon': order.get_total_without_coupon(),
                     'get_coupon_total': order.get_coupon_total(),
                     'get_cart_total': cart.get_total_item_price(),
                     'quantity': 0, 'item': order.cart.count()
                     })
            else:
                return JsonResponse(
                    {'get_total': 0, 'get_tax_total': 0,
                     'get_total_without_coupon': 0,
                     'get_coupon_total': 0,
                     'get_cart_total': 0,
                     'quantity': 0, 'item': 0
                     })
        cart.quantity = quantity
        cart.save()
        order_qs = OfflineOrder.objects.filter(table=table, ordered=False, is_expired=False, session_user=session_user)
        if order_qs.exists():
            order = order_qs.last()
            if cart in order.cart.all():
                if cart.quantity >= 10:
                    cart.quantity = 10
                    messages.info(request, "Only 10 items per cart")
                    return JsonResponse(
                        {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                         'get_total_without_coupon': order.get_total_without_coupon(),
                         'get_coupon_total': order.get_coupon_total(),
                         'get_cart_total': cart.get_total_item_price(),
                         'quantity': cart.quantity, 'item': order.cart.count(),

                         })
                else:
                    messages.info(request, "Product quantity was updated")
                    return JsonResponse(
                        {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                         'get_total_without_coupon': order.get_total_without_coupon(),
                         'get_coupon_total': order.get_coupon_total(),
                         'get_cart_total': cart.get_total_item_price(),
                         'quantity': cart.quantity, 'item': order.cart.count()
                         })
            else:
                order.cart.add(cart)
                order.save()
                messages.info(request, "Product was added to your cart.")
                return JsonResponse(
                    {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                     'get_total_without_coupon': order.get_total_without_coupon(),
                     'get_coupon_total': order.get_coupon_total(),
                     'get_cart_total': cart.get_total_item_price(),
                     'quantity': cart.quantity, 'item': order.cart.count()
                     })
        else:
            ordered_date_time = timezone.now()
            order = OfflineOrder.objects.create(
                table=table, ordered_date_time=ordered_date_time, session_user=session_user)
            ORN = f"ORN{100000 + int(order.id)}"
            order.order_ref_number = ORN
            order.cart.add(cart)
            order.save()
            messages.success(request, "Food Item was added to your cart.")
            return JsonResponse(
                {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                 'get_total_without_coupon': order.get_total_without_coupon(),
                 'get_coupon_total': order.get_coupon_total(),
                 'get_cart_total': cart.get_total_item_price(),
                 'quantity': cart.quantity, 'item': order.cart.count()
                 })


class AddtoCart(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        quantity = int(request.GET.get('quantity', 1))
        product = get_object_or_404(Product, pk=pk)
        if not product.is_active:
            raise PermissionDenied
        if not request.session or not request.session.session_key:
            request.session.save()

        user = self.request.user if self.request.user.is_authenticated else None

        cart, created = Cart.objects.get_or_create(
            product=product,
            user=request.user,
            ordered=False,
        )

        if quantity <= 0:
            order_qs = Order.objects.filter(user=request.user, ordered=False)
            cart.delete()
            order = order_qs.filter(cart=cart).first()
            if order and order.cart.count() == 0:
                order.delete()
            messages.info(request, "Product was removed from order.")
            if order_qs.exists():
                order = order_qs[0]
                return JsonResponse(
                    {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                     'get_total_without_coupon': order.get_total_without_coupon(),
                     'get_coupon_total': order.get_coupon_total(),
                     'get_cart_total': cart.get_total_item_price(),
                     'quantity': 0, 'item': order.cart.count()
                     })
            else:
                return JsonResponse(
                    {'get_total': 0, 'get_tax_total': 0,
                     'get_total_without_coupon': 0,
                     'get_coupon_total': 0,
                     'get_cart_total': 0,
                     'quantity': 0, 'item': 0
                     })
        cart.quantity = quantity
        cart.save()
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if cart in order.cart.all():
                if cart.quantity >= 10:
                    cart.quantity = 10
                    messages.info(request, "Only 10 items per cart")
                    return JsonResponse(
                        {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                         'get_total_without_coupon': order.get_total_without_coupon(),
                         'get_coupon_total': order.get_coupon_total(),
                         'get_cart_total': cart.get_total_item_price(),
                         'quantity': cart.quantity, 'item': order.cart.count(),

                         })
                else:
                    messages.info(request, "Product quantity was updated")
                    return JsonResponse(
                        {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                         'get_total_without_coupon': order.get_total_without_coupon(),
                         'get_coupon_total': order.get_coupon_total(),
                         'get_cart_total': cart.get_total_item_price(),
                         'quantity': cart.quantity, 'item': order.cart.count()
                         })
            else:
                order.cart.add(cart)
                order.save()
                messages.info(request, "Product was added to your cart.")
                return JsonResponse(
                    {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                     'get_total_without_coupon': order.get_total_without_coupon(),
                     'get_coupon_total': order.get_coupon_total(),
                     'get_cart_total': cart.get_total_item_price(),
                     'quantity': cart.quantity, 'item': order.cart.count()
                     })
        else:
            ordered_date_time = timezone.now()
            order = Order.objects.create(
                user=user, ordered_date_time=ordered_date_time)
            ORN = f"ORN{100000 + int(order.id)}"
            order.order_ref_number = ORN
            order.cart.add(cart)
            order.save()
            messages.success(request, "Food Item was added to your cart.")
            return JsonResponse(
                {'get_total': order.get_total(), 'get_tax_total': order.get_tax_total(),
                 'get_total_without_coupon': order.get_total_without_coupon(),
                 'get_coupon_total': order.get_coupon_total(),
                 'get_cart_total': cart.get_total_item_price(),
                 'quantity': cart.quantity, 'item': order.cart.count()
                 })


class RemoveFromCart(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        cart = Cart.objects.get(id=self.kwargs.get('pk'))
        order_qs = Order.objects.filter(
            user=self.request.user,
            ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if cart.quantity > 1:
                cart.quantity -= 1
                cart.save()
                messages.info(self.request, "Quantity was decreased.")
            else:
                order.cart.remove(cart)
                cart.delete()
                # Mini Order gets deleted automatic after deleting cart
                messages.info(self.request, "Dish was removed from plate.")
            return redirect("order:cart")
        else:
            messages.info(
                self.request, "You don't have any product in your plate.")
            return redirect("/")

    def test_func(self):
        cart = Cart.objects.get(id=self.kwargs.get('pk'))
        return self.request.user == cart.user


class DeleteCart(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        cart = Cart.objects.get(id=self.kwargs.get('pk'))
        cart.delete()
        messages.info(self.request, "Food Item was removed form cart.")
        return redirect("order:cart")

    def test_func(self):
        cart = Cart.objects.get(id=self.kwargs.get('pk'))
        return self.request.user == cart.user


class DeleteTableCart(UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        cart = TableCart.objects.get(id=self.kwargs.get('pk'))
        cart.delete()
        messages.info(self.request, "Food Item was removed form cart.")
        redirect_url = self.request.META.get('HTTP_REFERER')
        return redirect(redirect_url)

    def test_func(self):
        cart = TableCart.objects.get(id=self.kwargs.get('pk'))
        return self.request.session.session_key == cart.session_user


class OfflineCartListView(UserPassesTestMixin,ListView):
    model = TableCart
    template_name = 'order/cart_list.html'

    def test_func(self):
        attr = self.request.GET
        return True if attr else False
    # Template name cart_list.html
    # object_list variable name

    # Filter queryset to show only login in user's cart and no show ordered product
    def get_queryset(self):
        qs = self.model.objects.filter(ordered=False, session_user=self.request.session.session_key)
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        order = OfflineOrder.objects.filter(session_user=self.request.session.session_key, ordered=False).first()

        form = CouponCustomerForm()
        context['form'] = form
        context['order'] = order
        context['cart_count'] = order.cart.count() if order else 0
        return context

    def post(self, form, **kwargs):
        form = CouponCustomerForm(self.request.POST)
        if form.is_valid():
            coupon_form = form.save(commit=False)
            try:
                coupon = CouponCustomer.objects.get(code=coupon_form.code,
                                                    session_user=self.request.session.session_key)
                if coupon.used is True:
                    messages.info(self.request, f'Coupon Already Used!')
                    return redirect("order:cart")
            except:
                coupon_form.user = self.request.user
                coupon_form.save()
                coupon = coupon_form
            order = OfflineOrder.objects.filter(session_user=self.request.session.session_key, ordered=False).first()
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
                messages.success(self.request, f'Coupon Applied!')
            else:
                messages.info(self.request, f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!')
        return redirect("order:cart")
        

class CartListView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        return redirect("home:home")
    
# class CartListView(LoginRequiredMixin, ListView):
#     model = Cart

#     # Template name cart_list.html
#     # object_list variable name

#     # Filter queryset to show only login in user's cart and no show ordered product
#     def get_queryset(self):
#         qs = self.model.objects.filter(ordered=False, user=self.request.user)
#         return qs

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         order = Order.objects.filter(user=self.request.user, ordered=False).first()

#         form = CouponCustomerForm()
#         context['form'] = form
#         context['order'] = order
#         context['cart_count'] = order.cart.count() if order else 0
#         return context

#     def post(self, form, **kwargs):
#         form = CouponCustomerForm(self.request.POST)
#         if form.is_valid():
#             coupon_form = form.save(commit=False)
#             try:
#                 coupon = CouponCustomer.objects.get(code=coupon_form.code, user=self.request.user)
#                 if coupon.used is True:
#                     messages.info(self.request, f'Coupon Already Used!')
#                     return redirect("order:cart")
#             except:
#                 coupon_form.user = self.request.user
#                 coupon_form.save()
#                 coupon = coupon_form
#             order = Order.objects.filter(user=self.request.user, ordered=False).first()
#             order_amount = order.get_total_without_coupon()

#             vendor_coupon = Coupon.objects.get(code=coupon.code)
#             if order_amount >= vendor_coupon.minimum_order_amount:
#                 discount_amount = int(float(order_amount) * (float(vendor_coupon.discount_percent) / 100))
#                 if discount_amount > vendor_coupon.max_discount_amount:
#                     coupon.discount_amount = vendor_coupon.max_discount_amount
#                 else:
#                     coupon.discount_amount = discount_amount
#                 coupon.coupon = vendor_coupon
#                 coupon.save()

#                 # Adding Coupon to order
#                 order.coupon_customer = coupon
#                 # order.coupon_used = True
#                 order.save()
#                 messages.success(self.request, f'Coupon Applied!')
#             else:
#                 messages.info(self.request, f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!')
#         return redirect("order:cart")


class OrderListView(LoginRequiredMixin, ListView):
    model = Order
    paginate_by = 20
    template_name = "order/order.html"

    # Template name order_list.html
    # object_list variable name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # context['order'] = Order.objects.filter(ordered=True)

        current_query = self.object_list
        # current_query = Order.objects.all()
        order_filter = OrderFilter(self.request.GET, queryset=current_query)
        context['filter'] = order_filter
        if len(order_filter.qs) != current_query.count():
            context['object_list'] = order_filter.qs
            if len(order_filter.qs) < self.paginate_by:
                context['is_paginated'] = False
        return context

    def get_queryset(self):
        queryset = self.model.objects.filter(user=self.request.user, ordered=True)
        return queryset


class OrderDetailView(LoginRequiredMixin, View):
    model = Order
    template_name = 'order/order_detail.html'

    def get(self, *args, **kwargs):
        order = Order.objects.filter(id=self.kwargs.get('pk')).first()
        context = {}
        if not order:
            messages.info(self.request, "Order does not exist!")
            return redirect('order:list')
        if not order.user == self.request.user:
            return redirect('order:list')
        if not order.cart.all():
            messages.info(self.request, "Order does not exist!")
            return redirect('order:list')
        context['object'] = order
        context['now'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return render(self.request, self.template_name, context)


class CancelOrderView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = CancelOrder
    fields = ['cancel_reason', 'review_description']

    # template name cancelorder_form.html

    def form_valid(self, form):
        cancel_form = form.instance
        cancel_form.user = self.request.user
        cancel_form.save()

        order = Order.objects.get(id=self.kwargs.get('pk'))
        order.cancel_requested = True
        order.save()

        cancel_form.order = order
        cancel_form.save()

        return super().form_valid(form)

    def test_func(self):
        order = Order.objects.get(id=self.kwargs.get('pk'))
        if not order.user == self.request.user:
            return False
        elif order.order_status not in ['Processing', 'Preparing']:
            return False
        elif order.cancel_requested is True:
            return False
        else:
            return True


class OfflineCheckoutView(View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        timing = RestaurantsTiming.objects.first()
        order = OfflineOrder.objects.filter(session_user=self.request.session.session_key, ordered=False).last()
        if timing.is_restaurant_open():
            for cart in order.cart.all():
                cart.ordered = True
                cart.order_ref_number = order.order_ref_number
                cart.product_title = cart.product.title
                cart.product_discount_price = cart.product.price
                cart.order_total = cart.get_total_item_price() + cart.get_tax()
                cart.save()
            order.ordered = True
            order.save()
            return render(self.request, "order/offline_order_success.html")
        else:
            messages.info(self.request, "Restaurant is closed")
            return redirect(redirect_url)


# TODO Test
class CheckoutView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        timing = RestaurantsTiming.objects.first()

        order = Order.objects.filter(user=self.request.user, ordered=False).first()
        close_timing = timing.closing_time
        if order.table:
            booked_time = order.table.booked_for_time
            now = datetime.timedelta(hours=booked_time.hour, minutes=booked_time.minute) + datetime.timedelta(hours=2)
            if not datetime.timedelta(hours=close_timing.hour, minutes=close_timing.minute,
                                      seconds=close_timing.second) > now:
                messages.warning(self.request, "Sorry, Order not accepted from 2 hours before shutting down!!!")
                return redirect('order:cart')
        amount = int(order.get_total())
        context = {}
        context['object_list'] = Cart.objects.filter(ordered=False, user=self.request.user)
        form = CouponCustomerForm()
        context['form'] = form
        context['order'] = order
        context['cart_count'] = order.cart.count() if order else 0

        if timing.is_restaurant_open():
            order_amount = (order.get_total() * 100)
            order_currency = "INR"
            order_receipt = order.order_ref_number
            user_name = order.user.name
            phone_number = order.user.phone_number
            notes = {
                'User': user_name,
                'Phone Number': phone_number,
            }
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            payment = client.order.create(dict(amount=order_amount, currency=order_currency))
            context['key'] = RAZORPAY_KEY_ID
            context['payment'] = payment
            return render(self.request, 'order/cart_list.html', context)
        else:
            messages.info(self.request, "Restaurant is closed")
            return redirect('order:cart')


@method_decorator(csrf_exempt, name='dispatch')
class RazorPayResponseView(View):
    def post(self, request, *args, **kwargs):
        payment_id = request.POST.get('razorpay_payment_id', '')
        razorpay_order_id = request.POST.get('razorpay_order_id', '')
        signature = request.POST.get('razorpay_signature', '')
        order_id = request.POST.get('order', '')
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
                        admin_order_detail_url = reverse('analytics:order-detail', kwargs={'pk':order.id})
                        admin_order_detail_url = self.request.build_absolute_uri(admin_order_detail_url)
                        msg = f"New Order is placed. Check Order Detail:\n {admin_order_detail_url}"
                        send_order_notification(self.request, msg)
                        messages.success(self.request, "Order placed!")
                        return redirect('order:detail', pk=order.pk)
            else:
                return HttpResponse("Signature mismatched")


class CheckoutCoupon(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        coupon_code = self.request.POST.get('coupon_code')
        coupon = Coupon.objects.filter(code=coupon_code).first()
        coupon_customer, created = CouponCustomer.objects.get_or_create(
            user=self.request.user, coupon=coupon)
        if not created:
            messages.warning(self.request, "Coupon already used")
            return redirect('order:cart')
        if not coupon:
            messages.warning(self.request, "Coupon does not exists")
            return redirect('order:cart')
        order = Order.objects.filter(
            user=self.request.user, ordered=False).first()
        if order.get_total_without_coupon() < coupon.minimum_order_amount:
            coupon_customer.delete()
            messages.info(self.request, "Not applicable")
            return redirect('order:cart')
        if order.coupon_customer:
            prev_coupon = CouponCustomer.objects.get(id=order.coupon.id)
            prev_coupon.delete()
        order.coupon_customer = coupon_customer
        order.save()
        coupon_customer.discount_amount = order.get_coupon_total()
        coupon_customer.save()
        messages.success(self.request, "Coupon applied!")
        return redirect('order:cart')


class CheckoutCouponRemove(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        order = Order.objects.filter(
            user=self.request.user, ordered=False).first()
        if order.coupon:
            prev_coupon = CouponCustomer.objects.get(id=order.coupon.id)
            prev_coupon.delete()
            order.coupon = None
            order.save()
            messages.info(self.request, "Coupon removed!")
        return redirect('order:checkout')