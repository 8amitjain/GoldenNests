from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import (
    get_object_or_404, redirect, render
)
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
    Cart, Order, Payment, CancelMiniOrder, CouponCustomer, Coupon
)
from home.models import RestaurantsTiming
# from vowsnviews.local_settings import razorpay_api, razorpay_secret
# import razorpay


# TODO add sizes
@login_required
def add_to_cart(request, slug, size=None):
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
                messages.info(request, "Maximum quantity added.")
                return redirect("order:cart")
            else:
                cart.quantity += 1
                cart.save()
                messages.success(request, "Quantity was updated.")
                return redirect("order:cart")
        else:
            order.cart.add(cart)
            order.save()
            messages.success(request, "Food Item was added to your cart.")
            return redirect('menu:menu')
    else:
        ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        order = Order.objects.create(
            user=request.user, ordered_date_time=ordered_date_time)  # vendor=product.sold_by
        ORN = f"ORN-{100000 + int(order.id)}"
        order.order_ref_number = ORN
        order.cart.add(cart)
        order.save()
        messages.success(request, "Food Item was added to your cart.")
        return redirect('menu:menu')


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
            messages.info(self.request, "You don't have any product in your plate.")
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


# TODO Test
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
            try:
                coupon_form = form.save(commit=False)
                coupon_form.user = self.request.user
                coupon_form.save()
                coupon = coupon_form
            except :
                coupon_form = form.save(commit=False)
                coupon = CouponCustomer.objects.get(code=coupon_form.code, user=self.request.user)
                if coupon.used is True:
                    messages.info(self.request, f'Coupon Already Used!')
                    return redirect("order:cart")
            order = Order.objects.get(user=self.request.user, ordered=False)
            # coupon.discount_amount = 0
            order_amount = order.get_total_without_coupon()
            # coupon.save()
            vendor_coupon = Coupon.objects.get(code=coupon.code)
            if order_amount >= vendor_coupon.minimum_order_amount:
                coupon.discount_amount = int(float(order_amount) * (float(vendor_coupon.discount_percent) / 100))
                coupon.coupon = vendor_coupon
                coupon.save()

                # Adding Coupon to order
                order.coupon_customer = coupon
                order.coupon_used = True
                order.save()
                messages.success(self.request, f'Coupon Applied!')
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


# TODO Test
class CancelMiniOrderView(LoginRequiredMixin, UserPassesTestMixin, CreateView):
    model = CancelMiniOrder
    fields = ['cancel_reason', 'review_description']
    # template name cancelminiorder_form.html

    def form_valid(self, form):
        cancel_form = form.instance
        cancel_form.user = self.request.user
        cancel_form.save()

        order = Order.objects.get(id=self.kwargs.get('pk'))
        order.cancel_requested = True
        order.save()

        cancel_form.cancel_mini_order = order
        cancel_form.save()

        return super().form_valid(form)

    def test_func(self):
        order = Order.objects.get(id=self.kwargs.get('pk'))
        if not order.user == self.request.user:
            return False
        elif order.order_status not in ['Preparing', 'Shipping']:
            return False
        elif order.cancel_requested is True:
            return False
        elif order.return_requested is True:
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

        payment_id = self.request.POST.get('payment_id', False)
        if payment_id: # add not
            return redirect('order-checkout')
        else:
            # elif self.request.user.address.all().exists():
            # client = razorpay.Client(auth=(razorpay_api, razorpay_secret))
            # razorpay_payment = client.order.create(
            #     {
            #         'amount': amount,
            #         'currency': order_currency,
            #         'payment_capture': 1
            #     }
            # )
            payment = Payment()
            payment.user = self.request.user
            payment.amount = amount
            payment.order_id = f'{self.request.user.id}_{timezone.datetime.now()}'
            payment.payment_id = f'{self.request.user.id}_{timezone.datetime.now()}'
            payment.amount_paid = order.get_total()
            # payment.razor_pay_id = razorpay_payment['id']
            # payment.amount_paid = razorpay_payment['amount_paid']
            payment.save()

            cart = order.cart.all()
            # for cart_object in cart:
            #     cart_object.order = True
            #     cart_object.save()
                # if cart_object.product.stock_no:
                #     cart_object.product.stock_no = int(cart_object.product.stock_no) - cart_object.quantity
                #     cart_object.product.save()

            ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            order.ordered_date_time = ordered_date_time

            # Checking if coupon is applied.
            if order.coupon_used:
                coupon_customer = CouponCustomer.objects.get(id=order.coupon_customer.id)
                coupon_customer.used = True
                coupon_customer.save()
            cart.update(ordered=True)

            order.payment = payment
            order.ordered = True
            order.order_id = payment.order_id
            order.payment.payment_method = 'Online'
            order.save()

            # payment.paid = True
            # payment.save()

            messages.success(self.request, "Your order was successful!")
            return redirect('/')
        # else:
        #     messages.warning(self.request, "Please select or add delivery address!")
        #     return redirect('order-checkout')


