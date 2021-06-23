from django.db import models
from django.utils import timezone, dateformat
from datetime import timedelta


class RestaurantsTiming(models.Model):
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self):
        return f"Restaurants Timing"

    def is_restaurant_open(self):
        now = dateformat.format(timezone.now(), 'H:i:s')
        # now = now + str(timedelta(minutes=30)) # Not working
        return self.opening_time.strftime('%H:%M:%S') < now < self.closing_time.strftime('%H:%M:%S')



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