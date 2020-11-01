from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.views.generic.list import ListView

from .models import FoodOrder, FoodItem, PlateItems


def food_item(request):
    menu = FoodItem.objects.all()[:4]
    order = PlateItems.objects.filter(user=request.user, ordered=False)
    full_order = FoodOrder.objects.get(user=request.user, ordered=False)
    context = {
        'menu': menu,
        'order_items': order,
        'order_items_count': order.count(),
        'order': full_order,
    }
    return render(request, 'home/index.html', context)


def menu_item(request):
    menu = FoodItem.objects.all()
    order = PlateItems.objects.filter(user=request.user, ordered=False)
    full_order = FoodOrder.objects.get(user=request.user, ordered=False)
    context = {
        'menu': menu,
        'order_items': order,
        'order_items_count': order.count(),
        'order': full_order,
    }
    return render(request, 'home/menu.html', context)


def menu_item_2(request):
    menu = FoodItem.objects.all()
    order = PlateItems.objects.filter(user=request.user, ordered=False)
    full_order = FoodOrder.objects.get(user=request.user, ordered=False)
    context = {
        'menu': menu,
        'order_items': order,
        'order_items_count': order.count(),
        'order': full_order,
    }
    return render(request, 'home/menu2.html', context)


def menu_item_3(request):
    menu = FoodItem.objects.all()
    order = PlateItems.objects.filter(user=request.user, ordered=False)
    full_order = FoodOrder.objects.get(user=request.user, ordered=False)

    context = {
        'menu': menu,
        'order_items': order,
        'order_items_count': order.count(),
        'order': full_order,
    }
    return render(request, 'home/menu3.html', context)
# class FoodItemView(ListView):
#     model = FoodItem
#     paginate_by = 5
#     # template_name = "home/index.html"
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         try:
#             order = PlateItems.objects.get(user=self.request.user, ordered=False)
#             context.update({
#                 'order_items': order,
#             })
#         except:
#             pass
#         return context


class CartView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = PlateItems.objects.get(user=self.request.user, ordered=False)
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
    order_item, created = PlateItems.objects.get_or_create(
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
            return redirect("/")
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
    return redirect('/')


@login_required
def remove_single_item_from_cart(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = FoodOrder.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = PlateItems.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            try:
                mini_order = PlateItems.objects.get(item=item, ordered=False, user=request.user)
                mini_order.delete()
            except ObjectDoesNotExist:
                pass
            order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
            return redirect("/")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("/")
    else:
        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("/")


@login_required
def add_to_cart_menu(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_item, created = PlateItems.objects.get_or_create(
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
            return redirect("menu")
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
    return redirect('menu')


@login_required
def remove_single_item_from_cart_menu(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = FoodOrder.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = PlateItems.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            try:
                mini_order = PlateItems.objects.get(item=item, ordered=False, user=request.user)
                mini_order.delete()
            except ObjectDoesNotExist:
                pass
            order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
            return redirect("menu")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("menu")
    else:
        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("menu")


@login_required
def add_to_cart_menu2(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_item, created = PlateItems.objects.get_or_create(
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
            return redirect("menu-2")
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
    return redirect('menu-2', slug=item.id)


@login_required
def remove_single_item_from_cart_menu2(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = FoodOrder.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = PlateItems.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            try:
                mini_order = PlateItems.objects.get(item=item, ordered=False, user=request.user)
                mini_order.delete()
            except ObjectDoesNotExist:
                pass
            order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
            return redirect("menu-2")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("menu-2")
    else:
        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("menu-2")


@login_required
def add_to_cart_menu3(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_item, created = PlateItems.objects.get_or_create(
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
            return redirect("menu-3")
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
    return redirect('menu-3')


@login_required
def remove_single_item_from_cart_menu3(request, slug):
    item = get_object_or_404(FoodItem, slug=slug)
    order_qs = FoodOrder.objects.filter(
        user=request.user,
        ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = PlateItems.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            try:
                mini_order = PlateItems.objects.get(item=item, ordered=False, user=request.user)
                mini_order.delete()
            except ObjectDoesNotExist:
                pass
            order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
            return redirect("menu-3")
        else:
            # add a message saying the user dosent have an order
            messages.info(request, "Item was not in your cart.")
            return redirect("menu-3")
    else:
        # add a message saying the user dosent have an order
        messages.info(request, "You don't have an active order.")
        return redirect("menu-3")
