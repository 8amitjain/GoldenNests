from django.db import models
from django.utils import timezone
from django.shortcuts import reverse

from users.models import User
from menu.models import Product, BookTable

import datetime

# Order
ORDER_STATUS = (
    ('Processing', 'Processing'),
    ('Preparing', 'Preparing'),
    ('Ready', 'Ready'),
    ('Delivered', 'Delivered'),
    ('CANCELED', 'CANCELED')
)


# Cancel
CANCEL_REASON = (
    ('Not Needed', 'Not Needed'),
    ('Ordered Wrong Dishes', 'Ordered Wrong Dishes'),
    ('Receiving To Late', 'Receiving To Late'),
    ('Other', 'Other')
)

CANCEL_STATUS = (
    ('Processing Request', 'Processing Request'),
    ('CANCEL Denied', 'CANCEL Denied'),
    ('Cancel Granted', 'Cancel Granted'),
)


# Cart
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    size = models.CharField(max_length=200, null=True, blank=True)

    # If qty is greater than 10 then make it 10
    def save(self, *args, **kwargs):
        if self.quantity > 10:
            self.quantity = 10
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} of {self.product.title}"

    def get_total_item_price(self):
        return self.quantity * self.product.price

    def get_tax(self):
        amt = self.get_total_item_price()
        return amt * 18 // 100

    def get_absolute_url(self):  # Redirect to this link after changing quantity in cart  , kwargs={'slug': self.slug })
        return reverse("order-add-to-cart", kwargs={'slug': self.product.slug})

    def get_remove_from_cart_url(self):  # remove one qty
        return reverse("order:remove-from-cart", kwargs={'pk': self.id})

    def get_delete_cart_url(self):  # remove one item
        return reverse("order:delete-cart", kwargs={'pk': self.id})


# Coupon
class Coupon(models.Model):
    code = models.CharField(max_length=15, unique=True)
    discount_percent = models.FloatField()
    minimum_order_amount = models.FloatField()
    max_discount_amount = models.FloatField()

    def __str__(self):
        return self.code


class CouponCustomer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=15)
    discount_amount = models.FloatField(null=True, blank=True)
    used = models.BooleanField(default=False)
    # applicable = models.BooleanField(default=False)

    class Meta:
        unique_together = ('code', 'user')

    def __str__(self):
        return f"{self.code}_{self.user}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table = models.ForeignKey(BookTable, on_delete=models.SET_NULL, null=True, blank=True)
    cart = models.ManyToManyField(Cart, blank=True)

    coupon_used = models.BooleanField(default=False)
    coupon_customer = models.ForeignKey(CouponCustomer, on_delete=models.CASCADE, null=True, blank=True)

    order_ref_number = models.CharField(unique=True, default='ORD-100000', max_length=15)
    ordered_date_time = models.DateTimeField()
    # timestamp = models.DateTimeField(auto_now_add=True)

    ordered = models.BooleanField(default=False)
    order_status = models.CharField(choices=ORDER_STATUS, max_length=50, default='Processing')

    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, null=True, blank=True)
    payment_method = models.CharField(max_length=30, null=True, blank=True)

    received = models.BooleanField(default=False)
    cancel_requested = models.BooleanField(default=False)

    class Meta:
        ordering = ['-ordered_date_time']

    def __str__(self):
        return f"{self.user} Order"

    def get_total(self):
        total = 0
        for order_item in self.cart.all():
            total += order_item.get_total_item_price()
        if self.coupon_customer:
            total = float(total) - self.get_coupon_total()
        tax = self.get_tax_total()
        return float(total) + float(tax)

    def get_tax_total(self):
        total = 0
        for order_item in self.cart.all():
            total += order_item.get_tax()
        return float(total)
    
    def get_tax(self):
        total = self.get_total()
        total = total * 5 //100
        return total

    def get_total_without_coupon(self):
        total = 0
        for order_item in self.cart.all():
            total += order_item.get_total_item_price()
        return total

    def get_coupon_total(self):
        if self.coupon_customer:
            vendor_coupon = Coupon.objects.get(code=self.coupon_customer.coupon.code)
            total = self.get_total_without_coupon()
            if total >= vendor_coupon.minimum_order_amount:
                discount_amount = float(total) * (vendor_coupon.discount_percent / 100)
                if discount_amount > vendor_coupon.max_discount_amount:
                    self.coupon_customer.coupon.discount_amount = vendor_coupon.max_discount_amount
                else:
                    self.coupon_customer.coupon.discount_amount = discount_amount
            try:
                return self.coupon_customer.coupon.discount_amount
            except AttributeError:
                return 0
        else:
            return 0


class CancelOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)

    cancel_requested = models.BooleanField(default=True)
    cancel_status = models.CharField(choices=CANCEL_STATUS, max_length=50, default='Processing Cancel Request')
    cancel_granted = models.BooleanField(default=False)

    cancel_date = models.DateTimeField(default=timezone.now)
    cancel_reason = models.CharField(choices=CANCEL_REASON, max_length=50, null=True, blank=True)
    review_description = models.TextField(help_text='Please Describe in detail reason of cancel.')

    def __str__(self):
        return f"{self.user}_{self.cancel_reason}_CANCELED"

    def get_absolute_url(self):  # Redirect to this link after filling the form for cancel order
        return reverse("order:detail", kwargs={'pk': self.order.id})

    class Meta:
        ordering = ['cancel_date']


class Payment(models.Model):
    order_id = models.CharField(max_length=200)
    payment_id = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    amount_paid = models.FloatField()
    paid = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user}_Payment"
