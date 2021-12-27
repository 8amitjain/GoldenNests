from django.db import models
from django.utils import timezone, dateformat
from datetime import timedelta, datetime
from ckeditor.fields import RichTextField


class RestaurantsTiming(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self):
        return f"Restaurants Timing"

    def is_restaurant_open(self):
        now = datetime.now()
        now = now.strftime('%H:%M:%S')
        return self.opening_time.strftime('%H:%M:%S') < now < self.closing_time.strftime('%H:%M:%S')



class TPP(models.Model):
    tand_c = RichTextField(null=True, blank=True)
    shipping_policy = RichTextField(null=True, blank=True)
    refund_policy = RichTextField(null=True, blank=True)
    return_policy = RichTextField(null=True, blank=True)
    cancellation_policy = RichTextField(null=True, blank=True)
    privacy_policy = RichTextField(null=True, blank=True)

    def __str__(self):
        return 'TPP'


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    mobile = models.BigIntegerField()
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    seen = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.name}_{self.mobile}"


class UpcomingEvent(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{ self.title }"