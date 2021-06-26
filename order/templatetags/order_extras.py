from django import template
from menu.models import Product
from order.models import Cart

register = template.Library()


@register.simple_tag
def cart_quantity(request, pk):
    product = Product.objects.get(pk=pk)
    user = request.user if request.user.is_authenticated else None
    cart = Cart.objects.filter(user=user, ordered=False, product=product).first()
    return cart.quantity if cart else 0
