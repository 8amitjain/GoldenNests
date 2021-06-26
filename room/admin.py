from django.contrib import admin

# Register your models here.
from .models import PeopleVariation, RoomType, Rooms, RoomPayment, RoomBooked


class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')


class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    list_filter = ('user',)


admin.site.register(Rooms, RoomTypeAdmin)
admin.site.register(RoomBooked, RoomAdmin)
admin.site.register(RoomType)
admin.site.register(PeopleVariation)
admin.site.register(RoomPayment)
