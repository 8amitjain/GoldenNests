import datetime

from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
from django.db.models import Q
from ckeditor.fields import RichTextField
from django.template.defaultfilters import slugify
import datetime as dt

import qrcode
from PIL import Image, ImageDraw
from io import BytesIO
from django.core.files import File

LABEL_CHOICES = (
    ('Suggested', 'Suggested'),
    ('Special', 'Special'),
    ('Trending', 'Trending'),
    ('Top Selling', 'Top Selling'),
    ('Popular', 'Popular'),
    ('Chef selection', 'Chef selection'),
)

# SIZE_OPTION
SIZE_OPTION = (
    ('Small', 'Small'),
    ('Medium', 'Medium'),
    ('Large', 'Large'),
)

REVIEW_RATING_CHOICES = (
    (1.0, 1.0),
    (2.0, 2.0),
    (3.0, 3.0),
    (4.0, 4.0),
    (5.0, 5.0),
)


class Review(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(default=timezone.now)
    # title = models.CharField(max_length=300)
    review_description = models.TextField()
    rating = models.FloatField(choices=REVIEW_RATING_CHOICES, max_length=3)

    def __str__(self):
        return f"{self.rating}_user"

    def get_absolute_url(self):  # Redirect to this link after adding review
        return reverse("product-list-view")

    def to_int(self):
        return int(self.rating)


class CategoryQuerySet(models.QuerySet):
    def search(self, query=None):
        qs = self
        if query is not None:
            or_lookup = (Q(title__icontains=query) |
                         Q(slug__icontains=query)
                         )
            qs = qs.filter(or_lookup).distinct()  # distinct() is often necessary with Q lookups
            return qs


class CategoryManager(models.Manager):
    def get_queryset(self):
        return CategoryQuerySet(self.model, using=self._db)

    def search(self, query=None):
        return self.get_queryset().search(query=query)


class Category(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    image = models.ImageField(upload_to='category', null=True, blank=True)  # image of slide ...
    is_active = models.BooleanField(default=True)

    objects = CategoryManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):  # Redirect to this link after adding category , kwargs={'slug': self.slug })
        return reverse("analytics:category-list")


class ProductQuerySet(models.QuerySet):
    def search(self, query=None):
        qs = self
        if query is not None:
            or_lookup = (Q(title__icontains=query) |
                         Q(description__icontains=query) |
                         Q(slug__icontains=query)
                         )
            qs = qs.filter(or_lookup).distinct()  # distinct() is often necessary with Q lookups
            return qs


class ProductManager(models.Manager):
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def search(self, query=None):
        return self.get_queryset().search(query=query)


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    size = models.CharField(choices=SIZE_OPTION, max_length=50, null=True, blank=True)
    cost_per = models.CharField(max_length=200, null=True, blank=True,
                                help_text="Cost of food item is per plate or per pcs")

    price = models.DecimalField(max_digits=20, decimal_places=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=14, null=True, blank=True,
                             help_text="Food Item is Special, Popular etc or leave it blank for no label. \
                                        (Label will be displayed over a item.)")
    description = RichTextField(help_text='To describe food item in short', null=True, blank=True)
    image = models.ImageField(upload_to='products', null=True, blank=True)

    veg = models.BooleanField(default=True)
    first_class = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    trending = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add=True)

    objects = ProductManager()

    class Meta:
        db_table = 'products_product'
        ordering = ['title']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):  # Redirect to this link after adding product
        return reverse("analytics:menu-list")

    def get_add_to_cart_url(self):  # Redirect to this link after adding product in cart
        return reverse("order:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_search_redirect(self):
        return reverse("product-detail-view", kwargs={'pk': self.id})


class TableCount(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def _str_(self):
        return str(self.title)

    # def get_absolute_url(self):  # Redirect to this link after adding category , kwargs={'slug': self.slug })
    #     return reverse("admin-category-list")


class TableView(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    # def get_absolute_url(self):  # Redirect to this link after adding category , kwargs={'slug': self.slug })
    #     return reverse("admin-category-list")


class TableTime(models.Model):
    time = models.TimeField(unique=True)

    def __str__(self):
        return str(self.time)


class Table(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True, null=True)

    people_count = models.ForeignKey(TableCount, on_delete=models.CASCADE)
    sitting_type = models.ForeignKey(TableView, on_delete=models.CASCADE)

    # is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    trending = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add=True)
    qr_code = models.ImageField(upload_to='qr_code', null=True, blank=True)
    class Meta:
        ordering = ['title']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

TABLE_STATUS = (
    ('Processing', 'Processing'),
    ('Confirmed', 'Confirmed'),
    ('CANCELED', 'CANCELED')
)

class BookTable(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=320)
    phone_number = models.BigIntegerField()  # TODO add validator
    order_ref_number = models.CharField(unique=True,max_length=15, null=True, blank=True)

    status = models.CharField(max_length=200, choices=TABLE_STATUS, default="Processing")
    people_count = models.ForeignKey(TableCount, on_delete=models.CASCADE)
    sitting_type = models.ForeignKey(TableView, on_delete=models.CASCADE)

    booked_for_date = models.DateField()  # TODO validate only future dates
    booked_for_time = models.TimeField()

    # booked_for_time = models.ForeignKey(TableTime, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)
    is_booked = models.BooleanField(default=False)
    is_confirmed = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_booked_offline = models.BooleanField(default=False)

    seen = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.table.title}_{self.name}'

    def is_available_for_cancellation(self):
        now = dt.date.today()
        if (self.booked_for_date - now).days <= 0:
            time_now = datetime.datetime.now().time()
            time_now_delta = datetime.timedelta(hours=time_now.hour, minutes=time_now.minute, seconds=time_now.second)
            book_time_delta = datetime.timedelta(hours=self.booked_for_time.hour, minutes=self.booked_for_time.minute,
                                                 seconds=self.booked_for_time.second)
            if (book_time_delta - time_now_delta).total_seconds() < 3600:
                return False
        return True

    class Meta:
        ordering = ['booked_for_date']