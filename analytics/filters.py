import django_filters
from django import forms

from menu.models import Product
from room.models import ReviewRoom, Rooms


class ProductFilter(django_filters.FilterSet):
    note = django_filters.CharFilter(field_name='title', lookup_expr='icontains')

    date_added = django_filters.DateFilter(field_name="date_added", lookup_expr='iexact')

    class Meta:
        model = Product
        fields = ['is_active', 'date_added']

class ReviewFilter(django_filters.FilterSet):
    product = django_filters.NumberFilter()

    class Meta:
        model = ReviewRoom
        fields = ['product',]