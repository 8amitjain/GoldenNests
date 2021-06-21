from django.db import models
from users.models import User
from order.models import Payment

class PeopleVariation(models.Model):
    no_of_adult = models.IntegerField(default=1)
    no_of_child = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    def __str__(self):
        return f"{ self.no_of_adult } Adult & { self.no_of_child } Child"

class RoomType(models.Model):
    name = models.CharField(max_length=100)
    image_main = models.ImageField(upload_to='room_type', null= True, blank=True)
    people_variation = models.ManyToManyField(PeopleVariation, blank=True)
    price = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    short_description = models.TextField(null=True, blank=True)
    room_available = models.IntegerField()
    def __str__(self):
        return f"{ self.id }"
    def is_available(self):
        if self.room_available == 0:
            return False
        return True

class RoomCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, null=True, blank=True)
    people_variation = models.ForeignKey(PeopleVariation, on_delete=models.CASCADE, null=True, blank=True)
    no_of_rooms = models.IntegerField(default=1)

    def __str__(self):
        return f"{ self.id }"
    
    def get_total_one_night(self):
        variation_price = self.people_variation.price
        type_price = self.room_type.price
        return (variation_price + type_price)*int(self.no_of_rooms) 

class Room(models.Model):
    room_cart = models.ForeignKey(RoomCart, on_delete=models.SET_NULL, null=True, blank=True)
    no_of_room = models.IntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    is_booked = models.BooleanField(default=False)
    no_of_days = models.IntegerField(default=1)
    ordered_date_time = models.DateTimeField(auto_now=True)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True, blank=True)
    payment_method = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return f"{ self.id }"
    
    def get_full_total(self):
        return int(self.room_cart.get_total_one_night())*int(self.no_of_days)



