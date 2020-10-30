from django.contrib import admin

from .models import FoodCategory, FoodItem, PlateItems

admin.site.register(FoodCategory)
admin.site.register(FoodItem)
admin.site.register(PlateItems)
