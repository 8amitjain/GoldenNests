from django.db import models
from django.utils import timezone, dateformat
from datetime import timedelta
from ckeditor.fields import RichTextField


class RestaurantsTiming(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self):
        return f"Restaurants Timing"

    def is_restaurant_open(self):
        now = dateformat.format(timezone.now(), 'H:i:s')
        # now = now + str(timedelta(minutes=30)) # Not working
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


class UpcomingEvent(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{ self.title }"
