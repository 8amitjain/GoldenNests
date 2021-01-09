from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'order'

urlpatterns = [
    # Cart
    path('cart/', views.CartListView.as_view(), name='cart'),  # TD
    path('cart/add/<slug>/', views.add_to_cart, name='add-to-cart'),  # TD
    path('cart/remove/<pk>/', views.remove_product_from_cart, name='remove-from-cart'),  # TD
    path('cart/delete/<pk>/', views.delete_cart, name='delete-cart'),  # TD

    # Order
    path('list/', views.OrderListView.as_view(), name='order-list'),
    path('detail/<int:pk>/', views.OrderDetailView.as_view(), name='detail'),

    # Order Return
    path('mini/cancel/<int:pk>/', views.CancelMiniOrderView.as_view(), name='mini-cancel'),

    # Payment
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    # path('payment/', views.PaymentView.as_view(), name='payment'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)