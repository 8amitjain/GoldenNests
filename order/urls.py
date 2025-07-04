from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from . import api

app_name = 'order'

urlpatterns = [
    # Cart
    path('cart/', views.CartListView.as_view(), name='cart'),
    path('qr/cart/', views.OfflineCartListView.as_view(), name='cart-qr-code'),
    path('cart/add/<int:pk>/', views.AddtoCart.as_view(), name='add-to-cart'),
    path('qr/cart/add/', views.AddtoCartQR.as_view(), name='add-to-cart-qr-code'),
    path('cart/remove/<pk>/', views.RemoveFromCart.as_view(),
         name='remove-from-cart'),
    path('cart/delete/<pk>/', views.DeleteCart.as_view(), name='delete-cart'),
    path('delete/complete/cart/', views.RemoveAllCart.as_view(), name='delete-all-cart'),
    path('qr/cart/delete/<pk>/', views.DeleteTableCart.as_view(), name='delete-cart-qr-code'),
    path('qr/delete/complete/cart/', views.RemoveAllTableCart.as_view(), name='delete-all-cart-qr-code'),

    # Order
    path('list/', views.OrderListView.as_view(), name='list'),
    path('detail/<int:pk>/', views.OrderDetailView.as_view(), name='detail'),

    # Order Return
    path('cancel/<int:pk>/', views.CancelOrderView.as_view(), name='cancel'),

    # Checkout
    path('coupon/', views.CheckoutCoupon.as_view(), name='coupon'),
    path('coupon/remove/', views.CheckoutCouponRemove.as_view(), name='coupon-remove'),

    # Payment
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('qr/checkout/', views.OfflineCheckoutView.as_view(), name='checkout-qr-code'),
    # path('payment/', views.PaymentView.as_view(), name='payment'),
    path('razorpay/response/', views.RazorPayResponseView.as_view(), name='payment-response'),

    # Rest Api
    # Cart
    path('api/cart/', api.CartListAPI.as_view(), name='api-cart'),
    path('api/add_to_cart/<slug>/', api.AddToCartAPI.as_view(), name='api-cart'),
    path('api/cart/<int:cart_pk>/<int:qty>/',
         api.CartQuantityUpdateAPI.as_view(), name='api-cart-qty-update'),
    path('api/cart/total/<int:pk>/',
         api.CartTotalAPI.as_view(), name='api-cart-total'),
    path('api/cart/detail/<int:pk>/',
         api.CartDetailAPI.as_view(), name='api-cart-detail'),

    # Order
    path('api/list/', api.OrderListAPI.as_view(), name='api-list'),
    path('api/detail/<int:pk>/', api.OrderDetailAPI.as_view(), name='api-detail'),
    path('api/order/total/'
         ''
         ''
         '/', api.OrderTotalAPI.as_view(), name='api-total'),

    # Cancel Order
    path('api/cancel/<int:pk>/', api.CancelOrderAPI.as_view(),
         name='api-cancel-order'),
    # Cancel Reason
    path('api/cancel/reason/', api.OrderCancelReasonAPI.as_view(),
         name='api-cancel-reason'),

    # Coupon
    path('api/coupon/', api.AddCouponOrderAPI.as_view(), name='api-coupon-order'),

    # Checkout
    path('api/checkout/', api.CheckoutAPI.as_view(), name='api-checkout'),
    path('api/payment/<int:pk>/', api.PaymentDetailAPI.as_view(),
         name='api-payment-detail'),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)