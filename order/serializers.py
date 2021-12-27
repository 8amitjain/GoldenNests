from rest_framework import serializers

from menu.serializers import ProductSerializer
from .models import Cart, Order, Payment


# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    total_item_price = serializers.FloatField(source='get_total_item_price')
    get_tax_total = serializers.FloatField(source='get_tax')

    class Meta:
        model = Cart
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(CartSerializer, self).to_representation(instance)
        rep['product'] = ProductSerializer(instance.product).data
        return rep


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    get_total_price = serializers.FloatField(source='get_total')
    get_tax_total_price = serializers.FloatField(source='get_tax_total')
    get_total_without_coupon_price = serializers.FloatField(source='get_total_without_coupon')
    get_coupon_total_price = serializers.FloatField(source='get_coupon_total')

    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(OrderSerializer, self).to_representation(instance)
        rep['cart'] = CartSerializer(instance.cart.all(), many=True).data
        return rep


# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
