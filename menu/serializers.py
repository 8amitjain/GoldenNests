from rest_framework import serializers

from .models import Product, Category, BookTable, TableCount, TableView, TableTime


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


# TableCount Serializer
class TableCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableCount
        fields = '__all__'


# TableView Serializer
class TableViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableView
        fields = '__all__'


# TableTime Serializer
class TableTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableTime
        fields = '__all__'

