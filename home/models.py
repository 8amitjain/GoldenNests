from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User


class FoodCategory(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField(null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("category", kwargs={
            'slug': self.slug
        })


class FoodItem(models.Model):
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    price = models.FloatField(null=True)
    slug = models.SlugField(unique=True)

    short_description = models.TextField(help_text='To describe product in short', null=True)
    image_main = models.ImageField(null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("store-product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("remove-single-item-from-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_single_item_from_cart_url(self):
        return reverse("get_remove_single_item_from_cart_url", kwargs={
            'slug': self.slug
        })


class PlateItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()

    def get_total_quantity(self):
        return self.quantity


class FoodOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(PlateItems)
    order_ref_number = models.CharField(unique=True, default='ORD-100000', max_length=15)
    ordered_date = models.DateField()
    ordered_time = models.TimeField()
    ordered = models.BooleanField(default=False)

    # address = models.ForeignKey(CustomerAddress, on_delete=models.SET_NULL, blank=True, null=True)
    # payment = models.ForeignKey(
    #     'Payment', on_delete=models.SET_NULL, blank=True, null=True)

    # received = models.BooleanField(default=False, blank=True, null=True)
    # payment_method = models.CharField(default='Online by card', max_length=30)
    total_items = models.IntegerField(blank=True, null=True)
    # taxes = models.FloatField(default=0)

    # itemss = models.ForeignKey(Item, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f"{self.user} FoodOrder"

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

    def get_total_without_coupoun(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

    def get_sub_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_item_price()
        return total

    def get_discounted_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_amount_saved()
        return total

