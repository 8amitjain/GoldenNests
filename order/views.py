from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin, PermissionDenied
from django.shortcuts import (
    get_object_or_404, redirect, render
)
from django.http import JsonResponse
from django.utils import timezone
from django.views.generic import View
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView
import datetime

from menu.models import Product
from .filters import OrderFilter
from .forms import CouponCustomerForm
from .models import (
    Cart, Order, Payment, CancelOrder, CouponCustomer, Coupon
)
from home.models import RestaurantsTiming
# from vowsnviews.local_settings import razorpay_api, razorpay_secret
# import razorpay


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
                         'quantity' : 0, 'item': order.cart.count()
                         })
            else:
                return JsonResponse(
                        {'get_total': 0, 'get_tax_total': 0,
                         'get_total_without_coupon': 0,
                         'get_coupon_total': 0,
                         'get_cart_total': 0,
                         'quantity' : 0, 'item': 0
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
                         'quantity' : cart.quantity, 'item': order.cart.count()
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
            ORN = f"ORN-{100000 + int(order.id)}"
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


class CartListView(LoginRequiredMixin, ListView):
    model = Cart
    # Template name cart_list.html
    # object_list variable name

    # Filter queryset to show only login in user's cart and no show ordered product
    def get_queryset(self):
        qs = self.model.objects.filter(ordered=False, user=self.request.user)
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        order = Order.objects.filter(user=self.request.user, ordered=False).first()

        form = CouponCustomerForm()
        context['form'] = form
        context['order'] = order
        context['cart_count'] = order.cart.count()
        return context

    def post(self, form, **kwargs):
        form = CouponCustomerForm(self.request.POST)
        if form.is_valid():
            coupon_form = form.save(commit=False)
            try:
                coupon = CouponCustomer.objects.get(code=coupon_form.code, user=self.request.user)
                if coupon.used is True:
                    messages.info(self.request, f'Coupon Already Used!')
                    return redirect("order:cart")
            except:
                coupon_form.user = self.request.user
                coupon_form.save()
                coupon = coupon_form
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
                messages.success(self.request, f'Coupon Applied!')
            else:
                messages.info(self.request, f'Minimum order amount should be {vendor_coupon.minimum_order_amount}!')
        return redirect("order:cart")


class OrderListView(LoginRequiredMixin, ListView):
    model = Order
    paginate_by = 20
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


class OrderDetailView(LoginRequiredMixin, UserPassesTestMixin, DetailView):
    model = Order
    # Template name order_detail.html
    # object_list variable name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # .strftime('%Y-%m-%d %H:%M:%S')
        return context

    def test_func(self):
        model = self.get_object()
        return self.request.user == model.user


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


# TODO Test
class CheckoutView(LoginRequiredMixin, View):

    # def get(self, *args, **kwargs):
    #     cart = Cart.objects.filter(user=self.request.user, ordered=False)
    #     order = Order.objects.get(user=self.request.user, ordered=False)
    #
    #     amount = int(order.get_total())
    #     amount = int(amount) * 100
    #     context = {
    #         'cart_query': cart,
    #         'amount': amount,
    #     }
    #     return render(self.request, 'order/checkout.html', context)

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

            messages.success(self.request, "Your order was successful!")
            return redirect('order:detail', pk=order.id)
        else:
            messages.info(self.request, "Restaurant is closed")
            return redirect('/')


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
        if order.get_sub_total() < coupon.minimum_order_amount:
            coupon_customer.delete()
            messages.info(self.request, "Not applicable")
            return redirect('order:cart')
        if order.coupon:
            prev_coupon = CouponCustomer.objects.get(id=order.coupon.id)
            prev_coupon.delete()
        order.coupon = coupon_customer
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