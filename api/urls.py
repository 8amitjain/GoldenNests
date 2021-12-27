from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from . import views
app_name = 'api'

urlpatterns = [

    # API
    path('', views.ProductListAPI.as_view(), name='api-menu'),
    path('product/<int:pk>/', views.ProductAPI.as_view(), name='api-product'),
    path('product/list/', views.ProductListAPI.as_view(), name='api-product-list'),
    path('category/list/', views.CategoryListAPI.as_view(), name='api-category-list'),
    path('category/<int:pk>/', views.CategoryAPI.as_view(), name='api-category'),

    # Table
    path('table/view/list/', views.TableViewListAPI.as_view(), name='api-table-view-list'),
    path('table/view/<int:pk>/', views.TableViewAPI.as_view(), name='api-table-view'),

    path('table/people/count/list/', views.TableCountListAPI.as_view(), name='api-table-people-count-list'),
    path('table/people/count/<int:pk>/', views.TableCountAPI.as_view(), name='api-table-people-count'),

    path('table/time/list/', views.TableTimeListAPI.as_view(), name='api-table-time-list'),
    path('table/time/<int:pk>/', views.TableTimeAPI.as_view(), name='api-table-time'),

    # Book Table
    path('table/book/', views.BookTableAPI.as_view(), name='api-table-book'),
    path('booked/table/list/', views.BookedTableListAPIView.as_view(), name='api-book-table-list'),

    # Remove Table
    path('table/remove/', views.RemoveTableOrderAPI.as_view(), name='api-table-remove'),


    # Order API
    path('cart/', views.CartListAPI.as_view(), name='api-cart-list'),
    path('add_to_cart/<slug>/', views.AddToCartAPI.as_view(), name='api-add-to-cart'),
    path('cart/<int:cart_pk>/<int:qty>/',
         views.CartQuantityUpdateAPI.as_view(), name='api-cart-qty-update'),
    path('cart/total/<int:pk>/',
         views.CartTotalAPI.as_view(), name='api-cart-total'),
    path('cart/detail/<int:pk>/',
         views.CartDetailAPI.as_view(), name='api-cart-detail'),

    # Order
    path('list/', views.OrderListAPI.as_view(), name='api-list'),
    path('detail/<int:pk>/', views.OrderDetailAPI.as_view(), name='api-detail'),
    path('order/total/', views.OrderTotalAPI.as_view(), name='api-total'),

    # Cancel Order
    path('cancel/<int:pk>/', views.CancelOrderAPI.as_view(),
         name='api-cancel-order'),
    # Cancel Reason
    path('cancel/reason/', views.OrderCancelReasonAPI.as_view(),
         name='api-cancel-reason'),

    # Coupon
    path('coupon/', views.AddCouponOrderAPI.as_view(), name='api-coupon-order'),

    # Checkout
    path('checkout/', views.CheckoutAPI.as_view(), name='api-checkout'),
    path('payment/<int:pk>/', views.PaymentDetailAPI.as_view(),
         name='api-payment-detail'),

    path('register/', views.RegisterAPI.as_view(), name='api-register'),
    path('login/', views.LoginAPI.as_view(), name='api-login'),

    # Update
    path('user/update/', views.UpdateUpdateAPI.as_view(), name='api-update'),

    # Username Verification
    path('resend-confirmation/<str:email>/', views.ResendEmailConfirmationAPI.as_view(),
         name='api-resend-username-confirmation'),

    # Password
    path('password/change/', views.ChangePasswordAPI.as_view(), name='api-password-change'),
    path('password/reset/', include('django_rest_passwordreset.urls', namespace='api-password-reset')),



    path('order/response/', views.RazorPayResponseView.as_view(), name='api-order-payment-response'),


    path('room/booked/<int:pk>/', views.BookRoomAPI.as_view(), name='api-book-room'),
    path('room/list/', views.RoomListAPI.as_view(), name='api-room-list'),
    path('room/response/', views.PaymentAPIView.as_view(), name='api-payment-response'),
    path('room/booked/list/', views.BookedRoomListViewAPI.as_view(), name='api-booked-room-list'),
    path('room/confirmed/booked/list/', views.ConfirmedBookRoomListView.as_view(), name='api-confirmed-book-room-list'),


]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)