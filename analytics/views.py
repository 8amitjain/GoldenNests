from datetime import timezone, timedelta, datetime
import datetime as dt
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from django.views import View

from users.models import User
from .filters import ProductFilter
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from menu.models import Product, Category, BookTable, Table, TableTime
from order.models import Coupon, Order, Cart
from home.models import Contact
from order.filters import OrderFilter
from room.models import RoomBooked, ReviewRoom
from django.core.mail import EmailMessage
from django.conf import settings

from .forms import AdminTableBookForm
import requests
from django.conf import settings


class IsAdmin:
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_staff and request.user.is_active and request.user.is_verified:
            return super().dispatch(request, *args, **kwargs)
        else:
            raise PermissionDenied


# List Products
class ProductListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Product
    template_name = 'analytics/menu_list.html'

    def get_queryset(self, *args, **kwargs):
        queryset = self.model.objects.filter(is_active=True)
        filter_query = ProductFilter(self.request.GET, queryset=queryset)
        return filter_query.qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = self.model.objects.filter(is_active=True)
        filter_query = ProductFilter(self.request.GET, queryset=queryset)
        context['filter'] = filter_query
        return context


# Add Products
class ProductAddView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, CreateView):
    model = Product
    fields = '__all__'
    template_name = "analytics/menu_add_update.html"
    success_message = "Product was created successfully"


# Update Products
class ProductUpdateView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, UpdateView):
    model = Product
    fields = '__all__'
    template_name = "analytics/menu_add_update.html"
    success_message = "Menu was updated successfully"

    def get_success_url(self):
        return reverse('analytics:menu-list')


# Delete Products
class ProductDeleteView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, DeleteView):
    model = Product
    template_name = "analytics/menu_add_update.html"

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.delete()
        messages.success(self.request, "Menu was deleted successfully")
        return redirect('analytics:menu-list')


class CategoryListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Category
    paginate_by = 40
    template_name = "analytics/category_list.html"


class CategoryAddView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, CreateView):
    model = Category
    fields = '__all__'
    template_name = "analytics/category_add_update.html"
    success_message = "Category was created successfully"


class CategoryUpdateView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, UpdateView):
    model = Category
    fields = '__all__'
    template_name = "analytics/category_add_update.html"
    success_message = "Category was updated successfully"

    def get_success_url(self):
        return reverse('analytics:category-list', kwargs={'pk': self.kwargs.get('pk')})


class CategoryDeleteView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, DeleteView):
    model = Category

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.delete()
        messages.success(self.request, "Category was deleted successfully")
        return redirect('analytics:category-list')


# Show all Coupon
class CouponListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Coupon
    paginate_by = 40
    template_name = "analytics/coupon_list.html"


class CouponAddView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, CreateView):
    model = Coupon
    fields = '__all__'
    template_name = "analytics/coupon_add_update.html"
    success_message = "Coupon was created successfully"


class CouponUpdateView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, UpdateView):
    model = Coupon
    fields = '__all__'
    template_name = "analytics/coupon_add_update.html"
    success_message = "Coupon was updated successfully"

    def get_success_url(self):
        return reverse('analytics:coupon-list', kwargs={'pk': self.kwargs.get('pk')})


class CouponDeleteView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, DeleteView):
    model = Coupon

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.delete()
        messages.success(self.request, "Coupon was deleted successfully")
        return redirect('analytics:coupon-list')


class ContactListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Contact
    paginate_by = 40
    template_name = 'analytics/contact_list.html'


# Order
# Order List View Admin
class OrderListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Order
    paginate_by = 5
    queryset = Order.objects.filter(ordered=True)
    template_name = "analytics/order_list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        current_query = self.object_list
        order_filter = OrderFilter(self.request.GET, queryset=current_query)
        context['filter'] = order_filter
        if len(order_filter.qs) != len(current_query):
            context['object_list'] = order_filter.qs
            if len(order_filter.qs) < self.paginate_by:
                context['is_paginated'] = False
        return context


# Order Detail View Admin
class OrderDetailView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        context = {}
        pk = self.kwargs.get('pk')
        order = Order.objects.get(pk=pk)
        context['object'] = order
        return render(self.request, 'analytics/order_detail.html', context)


# Order status Update
class OrderStatusUpdateView(LoginRequiredMixin, IsAdmin, DetailView):
    def get(self, *args, **kwargs):
        order_status = self.kwargs.get('order_status')
        order_pk = self.kwargs.get('pk')
        cart = Cart.objects.get(pk=order_pk)
        cart.order_status = order_status
        if cart.order_status == "Delivered":
            cart.delivered_date_time = timezone.now()
            time = timezone.now() + timedelta(days=7)
            cart.return_window = time
        cart.save()
        return redirect("analytics:order-list")


# Order Seen
class OrderSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        order = Order.objects.get(pk=pk)
        order.seen = True
        order.save()
        return redirect("analytics:order-list")


class TableReserveListView(LoginRequiredMixin, IsAdmin, ListView):
    model = BookTable
    paginate_by = 40
    template_name = 'analytics/table_reservation.html'

    def get_queryset(self):
        return self.model.objects.filter(is_confirmed=True)


class BookedRoomListView(LoginRequiredMixin, IsAdmin, ListView):
    model = RoomBooked
    queryset = RoomBooked.objects.filter(is_booked=True, is_confirmed=True)
    paginate_by = 40
    template_name = 'analytics/booked_room.html'


class RoomDetailView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        context = {}
        pk = self.kwargs.get('pk')
        order = RoomBooked.objects.get(pk=pk)
        context['object'] = order
        return render(self.request, 'analytics/room_detail.html', context)


class ReviewListView(LoginRequiredMixin, IsAdmin, ListView):
    model = ReviewRoom
    template_name = 'analytics/review_list.html'

    def get_queryset(self):
        return self.model.objects.filter(is_published=False)


class ReviewApproveView(LoginRequiredMixin, IsAdmin, View):

    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        review = ReviewRoom.objects.filter(id=id).first()
        if review:
            review.is_published = True
            review.save()
            messages.success(self.request, "Review Approved successfully")
            return redirect('analytics:review-list')
        else:
            messages.warning(self.request, "Review Not Exist")


class ReviewSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        review = ReviewRoom.objects.get(pk=pk)
        review.is_seen = True
        review.save()
        return redirect("analytics:review-list")


class NotConfirmRoomBookingList(LoginRequiredMixin, IsAdmin, ListView):
    model = RoomBooked
    template_name = 'analytics/booked_room.html'

    def get_queryset(self):
        return self.model.objects.filter(is_booked=True, is_confirmed=False)


class NotConfirmTableReservationList(LoginRequiredMixin, IsAdmin, ListView):
    model = BookTable
    template_name = 'analytics/table_reservation.html'

    def get_queryset(self):
        return self.model.objects.filter(is_booked=True, is_confirmed=False)

class ConfirmRoomBooking(LoginRequiredMixin, IsAdmin, View):

    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        room_book = RoomBooked.objects.filter(id=id).first()
        if room_book:
            room_book.is_confirmed = True
            room_book.save()
            user = room_book.user
            message = "Your room booking is confirmed! Enjoy your Holiday."
            send_mail(self.request, user, message)
            send_sms(self.request, "Your room booking is confirmed! Enjoy your Holiday.", user.phone_number)
            messages.success(self.request, "Room booking Confirmed, message is sent to user email")
        return redirect('analytics:not-confirmed-rooms-list')


class ConfirmTableReservation(LoginRequiredMixin, IsAdmin, View):

    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        book_table = BookTable.objects.filter(id=id).first()
        if book_table:
            book_table.is_confirmed = True
            book_table.save()
            user = User()
            user.name = book_table.name
            user.email = book_table.email
            user.phone_number = book_table.phone_number
            message = "Your table reservation is confirmed! Enjoy your Dinner."
            send_sms(self.request, "Your table reservation is confirmed! Enjoy your Dinner.", user.phone_number)
            # send_mail(self.request, user, message)
            messages.success(self.request, "Table reservation Confirmed, message is sent to user email")
        return redirect('analytics:not-confirmed-table-list')


def send_mail(request, user, message):
    email = EmailMessage(
        f'Order Status',
        message,
        settings.AUTH_USER_MODEL,
        [user.email, settings.EMAIL_HOST_USER],
    )
    email.content_subtype = "html"
    email.send(fail_silently=True)


class BookTableAdmin(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        form = AdminTableBookForm(None)
        return render(self.request, 'analytics/book_table_admin.html', {'form': form})

    def post(self, *args, **kwargs):
        book_table = AdminTableBookForm(self.request.POST)
        if book_table.is_valid():
            book_table = book_table.instance
            book_table.is_confirmed = True
            book_table.is_booked = True
            book_table.save()
            messages.success(self.request, "Table is reserved.")
            return redirect('analytics:admin-book-table')
        else:
            form = book_table
            return render(self.request, 'analytics/book_table_admin.html', {'form': form})


def check_table_available(request):
    table_id = request.GET.get('table_id')
    date = request.GET.get('date')
    time = request.GET.get('time')
    date = datetime.strptime(date, "%Y-%m-%d").date()
    time_obj = TableTime.objects.filter(id=int(time)).first()
    time = time_obj.time
    table = Table.objects.filter(id=int(table_id)).first()
    if table:
        book_table = BookTable.objects.filter(table=table, booked_for_date=date, booked_for_time=time_obj.id,
                                              is_confirmed=True)
        if book_table:
            for table in book_table:
                if table:
                    start_time = table.booked_for_time.time
                    endtime = dt.time(start_time.hour + 1, start_time.minute, start_time.second)
                    if start_time <= time <= endtime:
                        return JsonResponse({
                            'status': 'false',
                        })
                    else:
                        return JsonResponse({
                            'status': 'true',
                        })
        else:
            return JsonResponse({
                'status': 'true',
            })


def send_sms(request, message, phone_number):
    url = "https://www.fast2sms.com/dev/bulkV2"
    paylod = f"sender_id=TXTIND&message={message}&route=v3&numbers={phone_number}"
    headers = {
        'authorization': settings.FAST_SMS_API,
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache",
    }
    response = requests.request("POST", url, data=paylod, headers=headers)
    response = response.text
    if response[1] == 'true':
        return True
