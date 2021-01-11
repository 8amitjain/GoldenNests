from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'order'

urlpatterns = [
    # Cart
    path('cart/', views.CartListView.as_view(), name='cart'),
    path('cart/add/<slug>/', views.add_to_cart, name='add-to-cart'),
    path('cart/remove/<pk>/', views.RemoveFromCart.as_view(), name='remove-from-cart'),
    path('cart/delete/<pk>/', views.DeleteCart.as_view(), name='delete-cart'),

    # Order
    path('list/', views.OrderListView.as_view(), name='list'),
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