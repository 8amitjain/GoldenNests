from django.views.generic.list import ListView
from django.views import View
from django.contrib import messages
from django.http import HttpResponseRedirect

from .models import Product, Category, Table, BookTable
from .forms import BookTableForm


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


class BookTableView(View):
    # TODO Add two option while booking a table to either book only and book and continue ordering food
    # def get(self, *args, **kwargs):
    #     date = '2021-01-10'
    #     time = '13:00:00'
    #     people_count = 4
    #     sitting_type = 'Indoor'
    #     book_table = BookTable.objects.filter(booked_for_date=date, booked_for_time__time=time)
    #     # Get the booked tabled for given date and time
    #     print(book_table)
    #
    #     table_available = Table.objects.filter(
    #     people_count__title=people_count, sitting_type__title=sitting_type).exclude(booktable__in=book_table)
    #     # Get the non booked tabled for given date and time by filtering
    #     print(table_available)
    #     book_table = BookTable.objects.filter(asd='as')
    #     available_table = Table.objects.all(asd='asd')

    def post(self, *args, **kwargs):
        form = BookTableForm(self.request.POST)
        if form.is_valid:
            print(self.request.POST, 'DATA')
            print(self.request.POST['add_food'], 'DATA')
            table_form = form.save(commit=False)

            book_table = BookTable.objects.filter(booked_for_date=table_form.booked_for_date,
                                                  booked_for_time=table_form.booked_for_time)
            # Getting the booked tabled for given date and time

            table_available = Table.objects.filter(
                people_count=table_form.people_count, sitting_type=table_form.sitting_type
            ).exclude(booktable__in=book_table)
            # Get the non booked tabled for given date and time by filtering

            if table_available:
                table_form.table = table_available.first()
                table_form.save()
                messages.info(self.request, 'Table Booked')
            else:
                messages.info(self.request, 'Table not available at the given time')
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

        messages.warning(self.request, 'Invalid data in From')
        return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))
