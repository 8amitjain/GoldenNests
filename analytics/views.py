from datetime import timezone, timedelta, datetime
import datetime as dt
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse, HttpResponse
from django.views import View

from users.models import User
from .filters import ProductFilter, ReviewFilter
from django.shortcuts import render, redirect
from django.utils import timezone
# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from menu.models import Product, Category, BookTable, Table, TableTime
from order.models import Coupon, Order, Cart, OfflineOrder, TableCart, CancelOrder
from home.models import Contact
from order.filters import OrderFilter
from room.models import RoomBooked, ReviewRoom, Rooms
from django.core.mail import EmailMessage
from django.conf import settings

from .forms import AdminTableBookForm, AdminRoomBookForm, TableCreateForm, RoomsCreateForm
import requests
from django.conf import settings
from django.db.models import Q
import qrcode
from io import BytesIO
from django.core.files import File


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
    success_url = reverse_lazy('analytics:coupon-list')


class CouponUpdateView(LoginRequiredMixin, IsAdmin, SuccessMessageMixin, UpdateView):
    model = Coupon
    fields = '__all__'
    template_name = "analytics/coupon_add_update.html"
    success_message = "Coupon was updated successfully"

    def get_success_url(self):
        return reverse('analytics:coupon-update', kwargs={'pk': self.kwargs.get('pk')})


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


class ContactDeleteView(LoginRequiredMixin, IsAdmin, DeleteView):
    model = Contact

    def delete(self, request, *args, **kwargs):
        contact = self.get_object()
        contact.delete()
        messages.success(self.request, "Contact deleted!")
        return redirect('analytics:contact')


# Order
# Order List View Admin
class OrderListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Order
    paginate_by = 5
    queryset = Order.objects.filter(ordered=True)
    template_name = "analytics/order_list.html"

    def get_queryset(self):
        now = datetime.now()
        return Order.objects.filter(ordered=True)

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



# Offline Order List View Admin
class OfflineOrderListView(LoginRequiredMixin, IsAdmin, ListView):
    model = OfflineOrder
    paginate_by = 5
    queryset = OfflineOrder.objects.filter(ordered=True)
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


# Order Detail View Admin
class OfflineOrderDetailView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        context = {}
        pk = self.kwargs.get('pk')
        order = OfflineOrder.objects.get(pk=pk)
        context['object'] = order
        return render(self.request, 'analytics/order_detail.html', context)





class GenerateQrCodeView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        table = Table.objects.filter(id=kwargs.get('pk')).first()
        if table:
            messages.success(self.request, "Qr Code generated, please download it!")
            path = generate_qr(self.request, table.id)
        return redirect('analytics:table-list')


def generate_qr(request, table_id):
    table = Table.objects.filter(id=table_id).first()
    directory = settings.MEDIA_ROOT
    url = reverse('menu:menu')
    url = str(request.build_absolute_uri(url))
    url += f"?table_id={table.id}&is_scan=True"
    img = qrcode.make(url)
    img_name = f"{table.id}_qr.png"
    # path ='/qr_code/' + img_name/
    blob = BytesIO()
    img.save(blob, 'png')
    table.qr_code.save(img_name, File(blob), save=True)
    table.save()
    return img_name


# Order status Update
class OrderStatusUpdateView(LoginRequiredMixin, IsAdmin, DetailView):
    def get(self, *args, **kwargs):
        order_status = self.kwargs.get('order_status')
        order_pk = self.kwargs.get('pk')
        cart = Cart.objects.get(pk=order_pk)
        cart.order_status = order_status
        order = Order.objects.filter(cart=cart).first()
        cart.save()
        if order:
            carts = order.cart.all()
            status = 0
            status = "Preparing" if len(order.cart.filter(order_status="Preparing")) == len(carts) else 0
            if not status:
                status = "Ready" if len(order.cart.filter(order_status="Ready")) == len(carts) else 0
            if not status:
                status = "Delivered" if len(order.cart.filter(order_status="Delivered")) == len(carts) else 0
            if not status:
                status = "CANCELLED" if len(order.cart.filter(order_status="CANCELLED")) == len(carts) else 0
            if not status:
                status = "Processing"
            order.order_status = status
            order.save()
        if cart.order_status == "Delivered":
            cart.delivered_date_time = timezone.now()
            time = timezone.now() + timedelta(days=7)
            cart.return_window = time
        cart.save()
        return redirect("analytics:order-detail", pk=order.id)


class OfflineOrderStatusUpdateView(LoginRequiredMixin, IsAdmin, DetailView):
    def get(self, *args, **kwargs):
        order_status = self.kwargs.get('order_status')
        order_pk = self.kwargs.get('pk')
        cart = TableCart.objects.get(pk=order_pk)
        cart.order_status = order_status
        order = OfflineOrder.objects.filter(cart=cart).first()
        cart.save()
        if order:
            carts = order.cart.all()
            status = 0
            status = "Preparing" if len(order.cart.filter(order_status="Preparing")) == len(carts) else 0
            if not status:
                status = "Ready" if len(order.cart.filter(order_status="Ready")) == len(carts) else 0
            if not status:
                status = "Delivered" if len(order.cart.filter(order_status="Delivered")) == len(carts) else 0
            if not status:
                status = "CANCELLED" if len(order.cart.filter(order_status="CANCELLED")) == len(carts) else 0
            if not status:
                status = "Processing"
            order.order_status = status
            order.save()
        if cart.order_status == "Delivered":
            cart.is_expired = True
            cart.delivered_date_time = timezone.now()
            time = timezone.now() + timedelta(days=7)
            cart.return_window = time
            order.is_expired = True
            order.save()

        cart.save()
        return redirect("analytics:offline-order-detail", pk=order.id)


# Order Seen
class OrderSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        order = Order.objects.get(pk=pk)
        order.seen = True
        order.save()
        return redirect("analytics:order-list")


class OfflineOrderSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        order = OfflineOrder.objects.get(pk=pk)
        order.seen = True
        order.save()
        return redirect("analytics:offline-order-list")

class TableReservationSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFRER')
        pk = self.kwargs.get('pk')
        table = BookTable.objects.get(pk=pk)
        table.seen = True
        table.save()
        if redirect_url:
            return redirect(redirect_url)
        return redirect("analytics:not-confirmed-table-list")

class RoomSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFRER')
        pk = self.kwargs.get('pk')
        room = RoomBooked.objects.get(pk=pk)
        room.seen = True
        room.save()
        if redirect_url:
            return redirect(redirect_url)
        return redirect("analytics:not-confirmed-rooms-list")

class TableReserveListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Order
    paginate_by = 40
    template_name = 'analytics/table_reservation.html'

    def get_queryset(self):
        order_table = self.model.objects.filter(table__is_booked__exact=True, table__is_confirmed=True, ordered=True)
        admin_tables = BookTable.objects.filter(is_booked=True, is_confirmed=True).exclude(
            id__in=[order.table.id for order in order_table])

        return order_table

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['admin_tables'] = BookTable.objects.filter(is_booked=True, is_confirmed=True).exclude(
            id__in=[order.table.id for order in self.object_list])
        return context


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
    paginate_by = 20

    def get_queryset(self):
        return self.model.objects.all()#filter(is_published=False)

    def get_context_data(self, *args, **kwargs):
        context = super(ReviewListView, self).get_context_data(**kwargs)
        filter_query = ReviewFilter(self.request.GET, self.object_list)
        context['object_list'] = self.object_list
        if len(filter_query.qs) != len(self.object_list):
            context['object_list'] = filter_query.qs
            context['filter_query'] = filter_query.qs
            if len(filter_query.qs) > self.paginate_by:
                context['is_paginated'] = False
        return context

class ReviewDeleteView(LoginRequiredMixin, IsAdmin, DeleteView):
    model = ReviewRoom

    def delete(self, request, *args, **kwargs):
        review = self.get_object()
        review.delete()
        messages.success(self.request, "Review Deleted!")
        return redirect('analytics:review-list')

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


class ContactSeenUpdateView(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        contact = Contact.objects.get(pk=pk)
        contact.seen = True
        contact.save()
        return redirect('analytics:contact')


class NotConfirmRoomBookingList(LoginRequiredMixin, IsAdmin, ListView):
    model = RoomBooked
    template_name = 'analytics/booked_room.html'

    def get_queryset(self):
        return self.model.objects.filter(is_booked=True, is_confirmed=False, is_rejected=False)


class NotConfirmTableReservationList(LoginRequiredMixin, IsAdmin, ListView):
    model = Order
    template_name = 'analytics/table_reservation.html'

    def get_queryset(self):
        order_table = self.model.objects.filter(table__is_booked=True, ordered=True, table__is_confirmed=False,
                                                table__is_rejected=False).order_by('-table__booked_for_date', 'table__booked_for_time')
        return order_table

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ConfirmRoomBooking(LoginRequiredMixin, IsAdmin, View):

    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        room_book = RoomBooked.objects.filter(id=id).first()
        if room_book:
            if not check_room_available_before_confirming(room_book):
                messages.warning(self.request, "Room not available")
                return redirect('analytics:not-confirmed-rooms-list')
            else:
                room_book.is_confirmed = True
                room_book.save()
                user = room_book.user
                message = "Your room booking is confirmed! Enjoy your Holiday."
                send_mail(self.request, user, message)
                send_sms(self.request, "Your room booking is confirmed! Enjoy your Holiday.", room_book.phone_number)
                messages.success(self.request, "Room booking Confirmed, message is sent to user email")
        return redirect('analytics:not-confirmed-rooms-list')


def check_room_available_before_confirming(room):
    new_room = room
    if room:
        room_booked = RoomBooked.objects.filter(room_type=new_room.room_type, is_booked=True,
                                                is_confirmed=True).exclude(id__in=[new_room.id])
        already_booked = 0
        for room in room_booked:
            if room.check_in <= new_room.check_in <= room.check_out:
                already_booked += 1
            elif room.check_in <= new_room.check_out <= room.check_out:
                already_booked += 1
        stock = new_room.room_type.stock_no
        print("Aniket", stock, already_booked)
        if already_booked < stock:
            return True
        return False


class RoomCheckout(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        return_url = self.request.META.get('HTTP_REFERER')
        id = self.kwargs.get('pk')
        booked_room = RoomBooked.objects.filter(id=id).last()
        if booked_room:
            if not booked_room.is_confirmed:
                messages.warning(self.request, "Room not confirmed yet!")
                if return_url:
                    return redirect(return_url)
                return redirect('analytics:booked-room-list')
            booked_room.is_checked_out = True
            booked_room.save()
        if return_url:
            return redirect(return_url)
        return redirect('analytics:booked-room-list')


class ConfirmTableReservation(LoginRequiredMixin, IsAdmin, View):

    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        book_table = BookTable.objects.filter(id=id).first()
        if book_table:
            if not check_table_available_before_confirming(book_table):
                messages.warning(self.request, "This table is already book and confirm by admin manually")
                return redirect('analytics:not-confirmed-table-list')
            book_table.is_confirmed = True
            book_table.status = "Confirmed"
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


def check_table_available_before_confirming(table):
    table = table
    date = table.booked_for_date
    time = table.booked_for_time
    time = (dt.timedelta(hours=time.hour, minutes=time.minute)).total_seconds()

    book_tables = BookTable.objects.filter(booked_for_date=date)
    for table in book_tables:
        if table:
            start_time = (
                dt.timedelta(hours=table.booked_for_time.hour, minutes=table.booked_for_time.minute)).total_seconds()
            endtime = start_time + 3600
            if start_time <= time <= endtime:
                return JsonResponse({
                    'status': 'false',
                })
            else:
                return JsonResponse({
                    'status': 'true'
                })
    return JsonResponse({
        'status': 'true'
    })


def send_mail(request, user, message):
    email = EmailMessage(
        f'Status',
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
            book_table.is_booked_offline = True

            book_table.save()
            ORN = f"TRN-{100000 + int(book_table.id)}"
            book_table.order_ref_number = ORN
            book_table.save()
            messages.success(self.request, "Table is reserved.")
            return redirect('analytics:booked-room-list')
        else:
            form = book_table
            return HttpResponse(form.errors.as_json())
            # return render(self.request, 'analytics/book_table_admin.html', {'form': form})


class BookRoomAdmin(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        form = AdminRoomBookForm(None)
        return render(self.request, 'analytics/book_room_admin.html', {'form': form})

    def post(self, *args, **kwargs):
        form = AdminRoomBookForm(self.request.POST)
        check_in = datetime.strptime(
            self.request.POST.get('check_in'), "%Y-%m-%d")
        check_out = datetime.strptime(
            self.request.POST.get('check_out'), "%Y-%m-%d")
        user_email = self.request.POST.get('email')
        days = check_out - check_in
        no_of_days = days.days
        if form.is_valid():
            room = form.instance
            if (check_in - datetime.today()).days + 1 < 0:
                messages.info(self.request, "Please select proper check in date")
                return render(self.request, 'analytics/book_room_admin.html', {'form': form})
            if not no_of_days > 0:
                messages.info(self.request, "Please select proper check out date")
                return render(self.request, 'analytics/book_room_admin.html', {'form': form})
            user = self.request.user
            room.user = user
            room.payment_method = "Admin Payment"
            room.no_of_days = no_of_days
            room.is_booked = True
            room.is_confirmed = True
            room.is_booked_offline = True
            room.save()
            messages.info(self.request, "Room booked Successfully")
            if user_email:
                user = User()
                user.email = user_email
                send_mail(self.request, user, "Room booked successfully!")
                send_sms(self.request, "Your room booking confirmed, Enjoy your holiday!", room.phone_number)
            return redirect('analytics:admin-book-room')
        else:
            return render(self.request, 'analytics/book_room_admin.html', {'form': form})


def check_room_available(request):
    id = request.GET.get('room_id')
    check_in = request.GET.get('check_in')
    check_out = request.GET.get('check_out')

    check_in = datetime.strptime(check_in, "%Y-%m-%d").date()
    check_out = datetime.strptime(check_out, "%Y-%m-%d").date()
    rooms = Rooms.objects.filter(id=id).first()
    booked_room = 0
    if rooms:
        room_booked = RoomBooked.objects.filter(room_type=rooms, is_booked=True, is_confirmed=True,
                                                is_checked_out=False)
        if not room_booked:
            return JsonResponse({
                'status': 'true',
            })
        for room in room_booked:
            if room.check_in <= check_in <= room.check_out:
                booked_room += 1
            elif room.check_in <= check_out <= room.check_out:
                booked_room += 1
        if booked_room < rooms.stock_no:
            return JsonResponse({
                'status': 'true',
            })
        return JsonResponse({
            'status': 'false',
        })


def check_table_available(request):
    table_id = request.GET.get('table_id')
    date = request.GET.get('date')
    time = request.GET.get('time')
    date = datetime.strptime(date, "%Y-%m-%d").date()
    time = datetime.strptime(time, "%H:%M").time()
    time = (dt.timedelta(hours=time.hour, minutes=time.minute)).total_seconds()

    table = Table.objects.filter(id=int(table_id)).first()
    if table:
        book_table = BookTable.objects.filter(table=table, booked_for_date=date, is_confirmed=True)
        if book_table:
            for table in book_table:
                if table:
                    start_time = (dt.timedelta(hours=table.booked_for_time.hour,
                                               minutes=table.booked_for_time.minute)).total_seconds()
                    endtime = start_time + 3600
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


class RejectTableReservation(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        table = BookTable.objects.filter(id=id).first()
        if not table:
            messages.warning(self.request, "Table not Exist")
            return redirect('analytics:not-confirmed-table-list')
        table.is_rejected = True
        table.save()
        message = "Sorry, your table reservation is Cancelled because of unavailability of Table!"
        send_sms(self.request, message, table.phone_number)
        messages.success(self.request, "Table reservation cancelled, message sent to user")
        return redirect('analytics:not-confirmed-table-list')


class RejectRoomBooking(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        room = RoomBooked.objects.filter(id=id).first()
        if not room:
            messages.warning(self.request, "Room not Exist")
            return redirect('analytics:not-confirmed-rooms-list')
        room.is_rejected = True
        room.save()
        message = "Sorry, your room booking is Cancelled because of unavailability of Room!"
        phone_number = room.phone_number if room.phone_number else room.user.phone_number
        send_sms(self.request, message, phone_number)
        messages.success(self.request, "Room booking cancelled, message sent to user")
        return redirect('analytics:not-confirmed-rooms-list')


class Overview(LoginRequiredMixin, IsAdmin, View):
    def get(self, *args, **kwargs):
        start = dt.date.today()
        end = start + dt.timedelta(days=1)
        todays_orders = Order.objects.filter(ordered=True, ordered_date_time__range=(start, end)).count()
        total_orders = Order.objects.filter(ordered=True).count()

        todays_bookings = RoomBooked.objects.filter(is_booked=True, ordered_date_time__range=(start, end)).count()
        total_bookings = RoomBooked.objects.filter(is_booked=True).count()

        todays_reservations = BookTable.objects.filter(is_booked=True, booked_at__range=(start, end)).count()
        total_reservations = BookTable.objects.filter(is_booked=True).count()

        todays_offline_order = OfflineOrder.objects.filter(ordered=True, ordered_date_time__range=(start, end)).count()
        total_offline_orders = OfflineOrder.objects.filter(ordered=True).count()
        context = {
            'todays_orders': todays_orders,
            'total_orders': total_orders,
            'todays_bookings': todays_bookings,
            'total_bookings': total_bookings,
            'todays_reservations': todays_reservations,
            'total_reservations': total_reservations,
            'todays_offline_order': todays_offline_order,
            'total_offline_orderes': total_offline_orders,
        }
        return render(self.request, "analytics/dashboard.html", context)


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
    return response


def send_order_notification(request, message):
    url = "https://www.fast2sms.com/dev/bulkV2"
    admin = User.objects.filter(is_staff=True, is_active=True, is_verified=True).last()
    paylod = f"sender_id=TXTIND&message={message}&route=v3&numbers={admin.phone_number}"
    headers = {
        'authorization': settings.FAST_SMS_API,
        'Content-Type': "application/x-www-form-urlencoded",
        'Cache-Control': "no-cache",
    }
    response = requests.request("POST", url, data=paylod, headers=headers)
    response = response.text
    return response

# ajax call
def get_notification(request):
    order_unseen = Order.objects.filter(ordered=True, seen=False).count()
    cancel_order_unseen = CancelOrder.objects.filter(is_seen=False).count()
    table_booking_to_confirmed = BookTable.objects.filter(is_booked=True, is_confirmed=False, is_rejected=False).count()
    room_booking_to_confirmed = RoomBooked.objects.filter(is_booked=True, is_confirmed=False, is_rejected=False).count()
    room_review = ReviewRoom.objects.filter(is_seen=False).count()
    unseen_contact = Contact.objects.filter(seen=False).count()
    offline_order_unseen = OfflineOrder.objects.filter(ordered=True, seen=False).count()

    if order_unseen or cancel_order_unseen or table_booking_to_confirmed or room_booking_to_confirmed or room_review or unseen_contact or offline_order_unseen:
        return JsonResponse({
            'show': 'true',
            'order_unseen': order_unseen,
            'cancel_order_unseen': cancel_order_unseen,
            'table_booking_to_confirmed': table_booking_to_confirmed,
            'room_booking_to_confirmed': room_booking_to_confirmed,
            'room_review': room_review,
            'unseen_contact': unseen_contact,
            'offline_order_unseen': offline_order_unseen,
        })
    else:
        return JsonResponse({
            'show': 'false',
            'order_unseen': order_unseen,
            'cancel_order_unseen': cancel_order_unseen,
            'table_booking_to_confirmed': table_booking_to_confirmed,
            'room_booking_to_confirmed': room_booking_to_confirmed,
            'room_review': room_review,
            'unseen_contact': unseen_contact,
            'offline_order_unseen': offline_order_unseen,
        })


class NotificationCheck(View):
    def get(self, request):
        context = {}
        order_unseen = Order.objects.filter(ordered=True, seen=False).count()
        cancel_order_unseen = CancelOrder.objects.filter(is_seen=False).count()
        table_booking_to_confirmed = BookTable.objects.filter(is_booked=True, is_confirmed=False,
                                                              is_rejected=False, seen=False).count()
        room_booking_to_confirmed = RoomBooked.objects.filter(is_booked=True, is_confirmed=False,
                                                              is_rejected=False, seen=False).count()
        room_review = ReviewRoom.objects.filter(is_seen=False).count()
        unseen_contact = Contact.objects.filter(seen=False).count()
        offline_order_unseen = OfflineOrder.objects.filter(ordered=True, seen=False).count()
        context['order_unseen'] = order_unseen
        context['cancel_order_unseen'] = cancel_order_unseen
        context['table_booking_to_confirmed'] = table_booking_to_confirmed
        context['room_booking_to_confirmed'] = room_booking_to_confirmed
        context['room_review'] = room_review
        context['unseen_contact'] = unseen_contact
        context['offline_order'] = offline_order_unseen
        if order_unseen or cancel_order_unseen or table_booking_to_confirmed or room_booking_to_confirmed or room_review or unseen_contact or offline_order_unseen:
            context['show_notifications'] = True

        return JsonResponse(context)


class TableListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Table
    paginate_by = 30
    template_name = 'analytics/table_list.html'

class TableCreateView(LoginRequiredMixin, IsAdmin, CreateView):
    model = Table
    form_class = TableCreateForm
    template_name = 'analytics/table_create.html'

    def form_valid(self, form):
        table = form.instance
        table.save()
        messages.success(self.request, "Table Created Successfully")
        return redirect('analytics:table-list')

class TableUpdateView(LoginRequiredMixin, IsAdmin, UpdateView):
    model = Table
    form_class = TableCreateForm
    template_name = 'analytics/table_create.html'

    def form_valid(self, form):
        table = form.instance
        table.save()
        messages.success(self.request, "Table updated successfully.")
        return redirect('analytics:table-detail', pk=self.kwargs.get('pk'))

class TableDetailView(LoginRequiredMixin, IsAdmin, DetailView):
    model = Table
    template_name = 'analytics/table_detail.html'

class TableDeleteView(LoginRequiredMixin, IsAdmin, DeleteView):
    model = Table
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        table = self.get_object()
        table.delete()
        messages.success(self.request, "Table deleted successfully.")
        return redirect('analytics:table-list')


class RoomsListView(LoginRequiredMixin, IsAdmin, ListView):
    model = Rooms
    paginate_by = 30
    template_name = 'analytics/rooms_list.html'


class RoomsCreateView(LoginRequiredMixin, IsAdmin, CreateView):
    model = Rooms
    form_class = RoomsCreateForm
    template_name = 'analytics/rooms_create.html'

    def form_valid(self, form):
        rooms = form.instance
        rooms.save()
        messages.success(self.request, "Room Created Successfully")
        return redirect('analytics:rooms-list')


class RoomsUpdateView(LoginRequiredMixin, IsAdmin, UpdateView):
    model = Rooms
    form_class = RoomsCreateForm
    template_name = 'analytics/rooms_create.html'

    def form_valid(self, form):
        rooms = form.instance
        rooms.save()
        messages.success(self.request, "Room updated successfully.")
        return redirect('analytics:rooms-detail', pk=self.kwargs.get('pk'))


class RoomsDetailView(LoginRequiredMixin, IsAdmin, DetailView):
    model = Rooms
    template_name = 'analytics/rooms_detail.html'


class RoomsDeleteView(LoginRequiredMixin, IsAdmin, DeleteView):
    model = Rooms
    template_name = 'analytics/delete.html'

    def delete(self, request, *args, **kwargs):
        rooms = self.get_object()
        rooms.delete()
        messages.success(self.request, "Room deleted successfully.")
        return redirect('analytics:rooms-list')

# class ReviewList(LoginRequiredMixin, IsAdmin, ListView):
#     model = ReviewRoom
#     template_name = 'analytics/review_list.html'
#     paginate_by = 20
#
#     def get_context_data(self, *, object_list=None, **kwargs):
#         context = super(ReviewList, self).get_context_data(**kwargs)
#         filter_query = ReviewFilter(self.request.GET, self.object_list)
#         if len(filter_query.qs) != len(self.object_list):
#             context['object_list'] = filter_query.qs
#             context['filter_query'] = filter_query.qs
#             if len(filter_query.qs) > self.paginate_by:
#                 context['is_paginated'] = False
#         return context




