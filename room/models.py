from django.db import models
from users.models import User


class PeopleVariation(models.Model):
    no_of_adult = models.IntegerField(default=1)
    no_of_child = models.IntegerField(default=0)

    def __str__(self):
        return f"{ self.no_of_adult } Adult & { self.no_of_child } Child"


class RoomType(models.Model):
    name = models.CharField(max_length=100)
    image_main = models.ImageField(
        upload_to='room_type', null=True, blank=True)
    description =  models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{ self.id }"


class Rooms(models.Model):
    name = models.CharField(max_length=100)
    image_main = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    image_2 = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    image_3 = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    image_4 = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    image_5 = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    image_6 = models.ImageField(
        upload_to='rooms', null=True, blank=True)
    room_type = models.ForeignKey(RoomType, on_delete=models.SET_NULL, null=True, blank=True)
    people_variation = models.ManyToManyField(PeopleVariation, blank=True)
    price = models.DecimalField(
        max_digits=20, decimal_places=2, null=True, blank=True)
    short_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{ self.id }"


class RoomPayment(models.Model):
    order_id = models.CharField(max_length=200)
    payment_id = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    amount_paid = models.FloatField()
    paid = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user}_Room Payment"


class RoomBooked(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    room_type = models.ForeignKey(
        Rooms, on_delete=models.CASCADE, null=True, blank=True)
    no_of_room = models.IntegerField(default=1)
    check_in = models.DateField()
    check_out = models.DateField()
    is_booked = models.BooleanField(default=False)
    no_of_days = models.IntegerField(default=1)
    ordered_date_time = models.DateTimeField(auto_now=True)
    payment = models.ForeignKey(
        RoomPayment, on_delete=models.SET_NULL, null=True, blank=True)
    payment_method = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return f"{ self.id }"

    def get_total_one_night(self):
        return self.room_type.price

    def get_total(self):
        return (self.room_type.price*self.no_of_days)
