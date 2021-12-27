from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from . import views

app_name = 'analytics'

urlpatterns = [
    
    path('', views.Overview.as_view(), name="dashboard"),

    path('menu/', views.ProductListView.as_view(), name="menu-list"),
    path('menu/add/', views.ProductAddView.as_view(), name="menu-add"),
    path('menu/update/<int:pk>/',
         views.ProductUpdateView.as_view(), name="menu-update"),
    path('menu/delete/<int:pk>/',
         views.ProductDeleteView.as_view(), name="menu-delete"),

    path('category/', views.CategoryListView.as_view(), name="category-list"),
    path('category/add/', views.CategoryAddView.as_view(), name="category-add"),
    path('category/update/<int:pk>/',
         views.CategoryUpdateView.as_view(), name="category-update"),
    path('category/delete/<int:pk>/',
         views.CategoryDeleteView.as_view(), name="category-delete"),

    path('coupon/', views.CouponListView.as_view(), name="coupon-list"),
    path('coupon/add/', views.CouponAddView.as_view(), name="coupon-add"),
    path('coupon/update/<int:pk>/',
         views.CouponUpdateView.as_view(), name="coupon-update"),
    path('coupon/delete/<int:pk>/',
         views.CouponDeleteView.as_view(), name="coupon-delete"),

    path('contact/', views.ContactListView.as_view(), name="contact"),
    path('contact/seen/<int:pk>/',
         views.ContactSeenUpdateView.as_view(), name='contact-seen'),
    path('contact/delete/<int:pk>/', views.ContactDeleteView.as_view(), name='contact-delete'),
    # Orders
    path('order/', views.OrderListView.as_view(), name='order-list'),
    path('order/detail/<int:pk>/',
         views.OrderDetailView.as_view(), name='order-detail'),
    path('order/update/<int:pk>/<str:order_status>/',
         views.OrderStatusUpdateView.as_view(), name='order-update'),
    path('order/seen/<int:pk>/',
         views.OrderSeenUpdateView.as_view(), name='order-seen'),

    # OfflineOrders
    path('offline/order/', views.OfflineOrderListView.as_view(), name='offline-order-list'),
    path('offline/order/detail/<int:pk>/',
         views.OfflineOrderDetailView.as_view(), name='offline-order-detail'),
    path('offline/order/update/<int:pk>/<str:order_status>/',
         views.OfflineOrderStatusUpdateView.as_view(), name='offline-order-update'),
    path('offline/order/seen/<int:pk>/',
         views.OfflineOrderSeenUpdateView.as_view(), name='offline-order-seen'),

    # TableReservation
    path('reservations/', views.TableReserveListView.as_view(),
         name='table-reservation-list'),
    path('table/seen/<int:pk>/',
         views.TableReservationSeenUpdateView.as_view(), name='table-seen-update'),
    path('room/seen/<int:pk>/',
         views.RoomSeenUpdateView.as_view(), name='room-seen-update'),

    # Room
    path('room/list/', views.BookedRoomListView.as_view(), name='booked-room-list'),
    path('room/detail/<int:pk>/',
         views.RoomDetailView.as_view(), name='room-detail'),
    path('room/checkout/done/<int:pk>/', views.RoomCheckout.as_view(), name='room-checkout-done'),

    path('room/not/confirmed/list/', views.NotConfirmRoomBookingList.as_view(),
         name='not-confirmed-rooms-list'),
    path('room/confirm/<int:pk>/', views.ConfirmRoomBooking.as_view(),
         name='confirm-room-booking'),

    path('table/not/confirmed/list/', views.NotConfirmTableReservationList.as_view(),
         name='not-confirmed-table-list'),
    path('table/confirm/<int:pk>/', views.ConfirmTableReservation.as_view(),
         name='confirm-table-booking'),

    # RoomReview
    path('review/list/', views.ReviewListView.as_view(), name='review-list'),
    path('review/approve/<int:pk>/',
         views.ReviewApproveView.as_view(), name='review_approve'),
    path('review/seen/<int:pk>/',
         views.ReviewSeenUpdateView.as_view(), name='review-seen'),
    path('review/delete/<int:pk>/', views.ReviewDeleteView.as_view(), name='review-delete'),

    path('book/table/', views.BookTableAdmin.as_view(), name='admin-book-table'),
    path('check/book/table/', views.check_table_available,
         name='admin-check-table-available'),

    path('book/room/', views.BookRoomAdmin.as_view(), name='admin-book-room'),
    path('check/room/available/', views.check_room_available,
         name='admin-check-room-available'),

    path('overview/', views.Overview.as_view(), name='overview'),
    path('cancel/table/<int:pk>/', views.RejectTableReservation.as_view(), name='reject-table-reservation'),
    path('cancel/room/<int:pk>/', views.RejectRoomBooking.as_view(), name='reject-room-booking'),

    path('generate/qr/<int:pk>/', views.GenerateQrCodeView.as_view(), name='generate-qr'),

    path('ajax_notification/', views.NotificationCheck.as_view(), name="ajax-notification"),

    path('table/list/', views.TableListView.as_view(), name='table-list'),
    path('table/create/', views.TableCreateView.as_view(), name='table-create'),
    path('table/detail/<int:pk>/', views.TableDetailView.as_view(), name='table-detail'),
    path('table/update/<int:pk>/', views.TableUpdateView.as_view(), name='table-update'),
    path('table/delete/<int:pk>/', views.TableDeleteView.as_view(), name='table-delete'),


    path('rooms/list/', views.RoomsListView.as_view(), name='rooms-list'),
    path('rooms/create/', views.RoomsCreateView.as_view(), name='rooms-create'),
    path('rooms/detail/<int:pk>/', views.RoomsDetailView.as_view(), name='rooms-detail'),
    path('rooms/update/<int:pk>/', views.RoomsUpdateView.as_view(), name='rooms-update'),
    path('rooms/delete/<int:pk>/', views.RoomsDeleteView.as_view(), name='rooms-delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)