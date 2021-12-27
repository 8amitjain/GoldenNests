from datetime import datetime

from django.db.models import Q
from django.urls import reverse
from django.views.generic import CreateView
from django.views.generic.list import ListView
from django.views import View
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils import timezone
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from analytics.views import send_order_notification
from home.models import RestaurantsTiming
from .filters import ProductFilter
from .models import Product, Category, Table, BookTable, Review, TableTime
from .forms import BookTableForm
from order.models import Order, OfflineOrder
import datetime as dt


# Food Item
# Show all Food Item
class MenuListView(ListView):
    model = Product
    paginate_by = 50
    template_name = 'menu/menu.html'

    def get_template_names(self):
        if not self.request.GET.get('is_scan'):
            return 'menu/menu.html'
        return 'menu/offline_menu.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        filter_q = self.request.GET
        if filter_q:
            if 'veg' in filter_q.keys():
                if filter_q['veg']:
                    veg_filter = ProductFilter(self.request.GET, queryset=self.object_list)
                    context['filter'] = veg_filter
                    if len(veg_filter.qs) != self.object_list:
                        context['object_list'] = veg_filter.qs
                        if len(veg_filter.qs) < self.paginate_by:
                            context['is_paginated'] = False
        category_list = Category.objects.filter(is_active=True)
        user = self.request.user if self.request.user.is_authenticated else None
        if user:
            order = Order.objects.filter(ordered=False, user=user).first()
            context['order'] = order
        if not user:
            qr_order = OfflineOrder.objects.filter(ordered=False, session_user=self.request.session.session_key).last()
            context['order'] = qr_order
        context['category_list'] = category_list
        return context

    def get_queryset(self):
        queryset = self.model.objects.filter(is_active=True)
        return queryset


class BookTableView(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        # start_time = datetime.strptime("9:00:00", "%H:%M:%S").time()
        # end_time = datetime.strptime("21:00:00", "%H:%M:%S").time()
        # now = datetime.now().time()
        timing = RestaurantsTiming.objects.first()
        if not timing.is_restaurant_open():
            messages.warning(self.request, "Sorry, Table Reservation is from 9 A.M. to 9 P.M.")
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

        form = BookTableForm(self.request.POST)
        if form.is_valid:

            now = datetime.now().date()
            book_date = form['booked_for_date'].value()
            book_time = form['booked_for_time'].value()
            book_date = datetime.strptime(book_date, "%Y-%m-%d")
            if now == book_date.date():
                time_now = datetime.now().time()
                time_now = dt.timedelta(hours=time_now.hour, minutes=time_now.minute).total_seconds()
                table_time = datetime.strptime(book_time, "%H:%M").time()
                table_time_delta = dt.timedelta(hours=table_time.hour, minutes=table_time.minute).total_seconds()
                if not table_time_delta - time_now > 7199:
                    messages.warning(self.request, "Sorry, Table booking is available after 2 hours from current time!")
                    if redirect_url:
                        return redirect(redirect_url)
                    return redirect('home')

            add_food = self.request.POST['add_food']
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
                    messages.warning(self.request, "Sorry, Order not accepted from 2 hours before shutting down!!!")
                    if redirect_url:
                        return redirect(redirect_url)
                    return redirect('home')

            # Getting the booked tabled for given date and time
            # book_table = BookTable.objects.filter(booked_for_date=table_form.booked_for_date,
            #                                       booked_for_time=table_form.booked_for_time, is_booked=True)

            # Get the non booked tabled for given date and time by filtering
            table_available = Table.objects.last()
            # table_available = Table.objects.filter(
            #     people_count=table_form.people_count, sitting_type__=table_form.sitting_type
            # ).first()
            if table_available:
                # getting or creating a order
                order = Order.objects.filter(user=self.request.user, ordered=False).first()
                if order and order.table and order.cart.all():
                    messages.info(self.request, 'Table already added to order')
                    return redirect('order:cart')
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
                    messages.info(self.request, 'Table Booked, Add food to cart and continue checkout!')
                    return redirect('menu:menu')
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
                    messages.success(self.request, 'Table Booked!')
                    return redirect('menu:thanks-page', pk=order.id)
            else:
                messages.info(self.request, 'Table not available at the given time')
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

        messages.warning(self.request, 'Invalid data in From')
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))


class TableBookingSuccessView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        order = Order.objects.filter(id=self.kwargs.get('pk')).first()
        if not order:
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))
        if order.table.is_booked:
            if order.cart.count() > 0:
                return redirect('order:cart')
            return render(self.request, "menu/table_reservation_success.html")
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))


class RemoveTableOrder(LoginRequiredMixin, UserPassesTestMixin, View):
    def get(self, *args, **kwargs):
        order = Order.objects.filter(ordered=False, user=self.request.user).first()
        BookTable.objects.get(id=order.table.id).delete()
        messages.info(self.request, "Table was removed form order.")
        return redirect("order:cart")

    def test_func(self):
        order = Order.objects.filter(ordered=False, user=self.request.user).first()
        if order:
            return not order.table.is_booked
        else:
            return False


class BookedTableListView(LoginRequiredMixin, ListView):
    model = BookTable
    template_name = 'menu/booked_table_list.html'

    def get_queryset(self):
        user = self.request.user
        return self.model.objects.filter(user=user)


# class ConfirmBookedTableListView(LoginRequiredMixin, ListView):
#     model = BookTable
#     template_name = 'menu/booked_table_list.html'
#
#     def get_queryset(self):
#         user = self.request.user
#         return self.model.objects.filter(user=user).filter(is_confirmed=True)


class CancelTableBeforeDateTime(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        redirect_url = self.request.META.get('HTTP_REFERER')
        id = self.request.POST.get('table_id')
        if not id:
            messages.warning(self.request, "Unknown Table")
            return redirect('menu:booked-table-list' if not redirect_url else redirect_url)
        book_table = BookTable.objects.filter(id=int(id)).first()
        if not book_table:
            messages.warning(self.request, "Table not Found")
            return redirect('menu:booked-table-list' if not redirect_url else redirect_url)
        if book_table.is_available_for_cancellation:
            book_table.delete()
            messages.success(self.request, "Your table reservation is cancelled!")
            return redirect('menu:booked-table-list' if not redirect_url else redirect_url)
        messages.warning(self.request, "Table is not cancel after booking time")
        return redirect('menu:booked-table-list' if not redirect_url else redirect_url)


def check_table_available(request):
    # id = request.GET.get('table_id')
    # date = request.GET.get('date')
    # time = request.GET.get('time')
    #
    # date = datetime.strptime(date, "%Y-%m-%d").date()
    # time = datetime.strptime(time, "%H:%M").time()
    # time = (dt.timedelta(hours=time.hour, minutes=time.minute)).total_seconds()
    #
    # book_tables = BookTable.objects.filter(booked_for_date=date, is_booked=True)
    # for table in book_tables:
    #     if table:
    #         start_time = (
    #             dt.timedelta(hours=table.booked_for_time.hour, minutes=table.booked_for_time.minute)).total_seconds()
    #         endtime = start_time + 3600
    #         if start_time <= time <= endtime:
    #             return JsonResponse({
    #                 'status': 'false',
    #             })
    #         else:
    #             return JsonResponse({
    #                 'status': 'true'
    #             })
    return JsonResponse({
        'status': 'true'
    })