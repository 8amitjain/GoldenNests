from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.utils import timezone
from django.shortcuts import get_object_or_404

from menu.models import Product
from .models import Cart, Order
from .serializers import CartSerializer, OrderSerializer


class CartListAPI(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cart = Cart.objects.filter(user=self.request.user, ordered=False)
        return cart


class CartQuantityUpdateAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, cart_pk, qty):
        cart = Cart.objects.get(id=cart_pk)
        cart.quantity = qty
        cart.save()
        if qty == 0:
            order = Order.objects.get(ordered=False, cart=cart)
            order.cart.remove(cart)
            cart.delete()
        response = {
            'data': 'Cart Updated',
        }
        return Response(response, status=status.HTTP_200_OK)


class AddToCartAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        cart, created = Cart.objects.get_or_create(
            product=product,
            user=request.user,
            ordered=False,
            # size=size,
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if order.cart.filter(product=product).exists():
                if cart.quantity >= 10:
                    response = {
                        'data': "Maximum quantity added."
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    cart.quantity += 1
                    cart.save()
                    response = {
                        'data': "Quantity was updated."
                    }
                    return Response(response, status=status.HTTP_200_OK)
            else:
                order.cart.add(cart)
                order.save()
                response = {
                    'data': "Food Item was added to your cart.",
                }
                return Response(response, status=status.HTTP_200_OK)
        else:
            ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            order = Order.objects.create(
                user=request.user, ordered_date_time=ordered_date_time)
            ORN = f"ORN-{100000 + int(order.id)}"
            order.order_ref_number = ORN
            order.cart.add(cart)
            order.save()
            response = {
                'data': "Food Item was added to your cart.",
            }
            return Response(response, status=status.HTTP_200_OK)


class OrderListAPI(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        order = Order.objects.filter(user=self.request.user, ordered=True)
        return order


class OrderDetailAPI(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes =[permissions.IsAuthenticated]
