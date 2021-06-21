from django.contrib import admin

# Register your models here.
from .models import PeopleVariation, RoomType, Room

class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')

class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    list_filter = ('user',)


admin.site.register(RoomType, RoomTypeAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(PeopleVariation)
