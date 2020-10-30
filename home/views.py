from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils import timezone

from .models import FoodOrder, FoodItem


class Home(TemplateView):
    template_name = "home/index.html"


class CartView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = FoodOrder.objects.get(user=self.request.user, ordered=False)
            context = {
                'object': order,
            }
            return render(self.request, 'store/cart.html', context)
        except ObjectDoesNotExist:
            messages.error(self.request, "You do not have any item in cart")
            return redirect("/")


@login_required
def add_to_cart(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_item, created = FoodItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False,
    )
    order_qs = FoodOrder.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "Item qty was updated.")
            return redirect("store:store-cart")
        else:
            order.items.add(order_item)
            order.save()

    else:
        ordered_date = timezone.datetime.now().strftime('%Y-%m-%d')
        ordered_time = timezone.datetime.now().strftime('%H:%M:%S')
        order = FoodOrder.objects.create(
            user=request.user, ordered_date=ordered_date, ordered_time=ordered_time)
        ORN = f"ORN-{100000 + int(order.id)}"
        order.order_ref_number = ORN
        order.items.add(order_item)
        order.save()
        messages.info(request, "Item was added to your cart.")
    return redirect('store:store-product', slug=item.id)

#  return redirect("store:store-cart")


@login_required
def remove_from_cart(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = FoodItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order_item.quantity = 1
            order_item.save()
            order.items.remove(order_item)
            try:
                mini_order = MiniOrder.objects.filter(order_item=order_item, ordered=False)
                mini_order.delete()
            except ObjectDoesNotExist:
                pass
            messages.info(request, "Item was removed from your cart.")
            return redirect("store:store-cart")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("store:store-cart", slug=slug)
    else:

        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("store:store-cart", slug=slug)


@login_required
def remove_single_item_from_cart(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = FoodItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
                try:
                    mini_order = MiniOrder.objects.get(order_item=order_item, ordered=False)
                    mini_order.delete()
                except ObjectDoesNotExist:
                    pass
            messages.info(request, "This item quantity was updated.")
            return redirect("store:store-cart")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("store:store-cart", slug=slug)
    else:
        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("store:store-cart", slug=slug)

