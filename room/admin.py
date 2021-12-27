from django.contrib import admin

# Register your models here.
from .models import PeopleVariation, RoomType, Rooms, RoomPayment, RoomBooked, ReviewRoom


class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')



class RoomBookedAdmin(admin.ModelAdmin):
    list_display = ('id','user','check_in', 'check_out', 'is_booked', 'is_confirmed', 'is_checked_out')
    list_filter = ('user','room_type')

admin.site.register(Rooms, RoomTypeAdmin)
admin.site.register(RoomBooked, RoomBookedAdmin)
admin.site.register(RoomType)
admin.site.register(ReviewRoom)
admin.site.register(PeopleVariation)
admin.site.register(RoomPayment)