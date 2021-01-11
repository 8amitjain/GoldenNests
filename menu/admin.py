from django.contrib import admin

from .models import Product, Category, Table, TableCount, TableView, TableTime, BookTable

admin.site.register(Product),
admin.site.register(Category),
admin.site.register(Table),
admin.site.register(TableCount),
admin.site.register(TableView),
admin.site.register(TableTime),
admin.site.register(BookTable),
