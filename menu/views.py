from django.views.generic.list import ListView
from django.views import View
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.utils import timezone
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Product, Category, Table, BookTable
from .forms import BookTableForm
from order.models import Order


# Food Item
# Show all Food Item
class MenuListView(ListView):
    model = Product
    paginate_by = 50
    template_name = 'menu/menu.html'
    # object_list variable name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        category_list = Category.objects.filter(is_active=True)
        context['category_list'] = category_list
        return context

    def get_queryset(self):
        queryset = self.model.objects.filter(is_active=True)
        return queryset


class BookTableView(LoginRequiredMixin, View):
    def post(self, *args, **kwargs):
        form = BookTableForm(self.request.POST)
        if form.is_valid:
            add_food = self.request.POST['add_food']
            table_form = form.save(commit=False)

            # Getting the booked tabled for given date and time
            book_table = BookTable.objects.filter(booked_for_date=table_form.booked_for_date,
                                                  booked_for_time=table_form.booked_for_time, is_booked=True)

            # Get the non booked tabled for given date and time by filtering
            table_available = Table.objects.filter(
                people_count=table_form.people_count, sitting_type=table_form.sitting_type
            ).exclude(booktable__in=book_table)

            if table_available:
                table_form.table = table_available.first()
                table_form.save()

                # getting or creating a order
                order = Order.objects.filter(user=self.request.user, ordered=False).first()
                if not order:
                    ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    order = Order.objects.create(
                        user=self.request.user, ordered_date_time=ordered_date_time)
                    ORN = f"ORN-{100000 + int(order.id)}"
                    order.order_ref_number = ORN
                    order.save()

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
                    messages.success(self.request, 'Table Booked!')
                    return redirect('order:detail', pk=order.id)
            else:
                messages.info(self.request, 'Table not available at the given time')
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

        messages.warning(self.request, 'Invalid data in From')
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))
