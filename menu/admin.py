from django.contrib import admin

from .models import Product, Category, Table, TableCount, TableView, TableTime, BookTable

class BookTableAdmin(admin.ModelAdmin):
    list_display = ('id', 'booked_for_date', 'booked_for_time', 'is_booked','is_confirmed')

admin.site.register(Product),
admin.site.register(Category),
admin.site.register(Table),
admin.site.register(TableCount),
admin.site.register(TableView),
admin.site.register(TableTime),
admin.site.register(BookTable, BookTableAdmin),