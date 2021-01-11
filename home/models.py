from django.db import models
from django.utils import timezone, dateformat
from datetime import datetime
from datetime import timedelta


class RestaurantsTiming(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self):
        return f"Restaurants Timing"

    def is_restaurant_open(self):
        now = dateformat.format(timezone.now(), 'H:i:s')
        now = now + str(timedelta(minutes=30))
        return self.opening_time.strftime('%H:%M:%S') < now and now > self.closing_time.strftime('%H:%M:%S')



