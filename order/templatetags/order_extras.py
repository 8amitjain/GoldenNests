from django import template
from menu.models import Product
from order.models import Cart

register = template.Library()


@register.simple_tag
def cart_quantity(request, pk):
    product = Product.objects.get(pk=pk)
    cart = Cart.objects.filter(user=request.user, ordered=False, product=product).first()
    return cart.quantity if cart else 0
