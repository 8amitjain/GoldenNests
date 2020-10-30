from django.contrib import admin

from .models import FoodCategory, FoodItem, PlateItems, FoodOrder

admin.site.register(FoodCategory)
admin.site.register(FoodItem)
admin.site.register(PlateItems)
admin.site.register(FoodOrder)
