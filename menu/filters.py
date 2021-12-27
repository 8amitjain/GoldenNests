import django_filters
from django import forms
from .models import Product


class ProductFilter(django_filters.FilterSet):
    veg = django_filters.BooleanFilter(widget=forms.CheckboxInput)

    class Meta:
        model = Product
        fields = ['veg', ]