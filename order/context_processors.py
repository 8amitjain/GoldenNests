from .models import Cart, Order


def cart_details(request):
    cart_count = 0
    cart_list = ''
    order = ''
    context = {}
    if request.user.is_authenticated:
        cart_list = Cart.objects.filter(ordered=False, user=request.user)
        order = Order.objects.filter(ordered=False, user=request.user).first()

        if cart_list:
            cart_count = cart_list.count()

    context['cart_count'] = cart_count
    context['cart_list'] = cart_list
    context['order'] = order
    return context


