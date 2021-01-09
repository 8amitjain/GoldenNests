from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
from django.db.models import Q
from ckeditor.fields import RichTextField

from users.models import User

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
    (1, 1),
    (1.5, 1.5),
    (2, 2),
    (2.5, 2.5),
    (3, 3),
    (3.5, 3.5),
    (4, 4),
    (4.5, 4.5),
    (5, 5),
)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
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
                         Q(description__icontains=query) |
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
    slug = models.SlugField(unique=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='category', null=True, blank=True)  # image of slide ...
    is_active = models.BooleanField(default=True)

    objects = CategoryManager()

    def __str__(self):
        return self.title

    def get_absolute_url(self):  # Redirect to this link after adding category , kwargs={'slug': self.slug })
        return reverse("admin-category-list")


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
    slug = models.SlugField(unique=True)

    size = models.CharField(choices=SIZE_OPTION, max_length=50, null=True, blank=True)
    cost_per = models.CharField(max_length=200, null=True, blank=True,
                                help_text="Cost of food item is per plate or per pcs")

    price = models.DecimalField(max_digits=20, decimal_places=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=14, null=True, blank=True,
                             help_text="Food Item is Special, Popular etc or leave it blank for no label. \
                                        (Label will be displayed over a item.)")
    description = RichTextField(help_text='To describe food item in short', null=True, blank=True)
    image = models.ImageField(upload_to='products')

    is_active = models.BooleanField(default=True)
    trending = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add=True)

    objects = ProductManager()

    class Meta:
        db_table = 'products_product'
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):  # Redirect to this link after adding product
        return reverse("admin-product-list")

    def get_add_to_cart_url(self):  # Redirect to this link after adding product in cart
        return reverse("order:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_search_redirect(self):
        return reverse("product-detail-view", kwargs={'pk': self.id})





