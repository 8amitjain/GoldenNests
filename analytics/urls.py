from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from . import views

app_name = 'analytics'

urlpatterns = [
    path('menu/',views.ProductListView.as_view(), name="menu-list"),
    path('menu/add/',views.ProductAddView.as_view(), name="menu-add"),
    path('menu/update/<int:pk>/',views.ProductUpdateView.as_view(), name="menu-update"),
    path('menu/delete/<int:pk>/',views.ProductDeleteView.as_view(), name="menu-delete"),

    path('category/',views.CategoryListView.as_view(), name="category-list"),
    path('category/add/',views.CategoryAddView.as_view(), name="category-add"),
    path('category/update/<int:pk>/',views.CategoryUpdateView.as_view(), name="category-update"),
    path('category/delete/<int:pk>/',views.CategoryDeleteView.as_view(), name="category-delete"),

    path('coupon/',views.CouponListView.as_view(), name="coupon-list"),
    path('coupon/add/',views.CouponAddView.as_view(), name="coupon-add"),
    path('coupon/update/<int:pk>/',views.CouponUpdateView.as_view(), name="coupon-update"),
    path('coupon/delete/<int:pk>/',views.CouponDeleteView.as_view(), name="coupon-delete"),

    path('contact/',views.ContactListView.as_view(), name="contact"),

    # Orders
    path('order/', views.OrderListView.as_view(), name='order-list'),
    path('order/detail/<int:pk>/',
         views.OrderDetailView.as_view(), name='order-detail'),
    path('order/update/<int:pk>/<str:order_status>/',
         views.OrderStatusUpdateView.as_view(), name='order-update'),
    path('order/seen/<int:pk>/',
         views.OrderSeenUpdateView.as_view(), name='order-seen'),

    #TableReservation
    path('reservations/', views.TableReserveListView.as_view(), name='table-reservation-list'),

    #Room
    path('room/', views.BookedRoomListView.as_view(), name='booked-room-list'),
    path('room/detail/<int:pk>/',
         views.RoomDetailView.as_view(), name='room-detail'),

    path('room/not/confirmed/list/', views.NotConfirmRoomBookingList.as_view(), name='not-confirmed-rooms-list'),
    path('room/confirm/<int:pk>/', views.ConfirmRoomBooking.as_view(), name='confirm-room-booking'),

    path('table/not/confirmed/list/', views.NotConfirmTableReservationList.as_view(), name='not-confirmed-table-list'),
    path('table/confirm/<int:pk>/', views.ConfirmTableReservation.as_view(), name='confirm-table-booking'),

#RoomReview
    path('review/list/', views.ReviewListView.as_view(), name='review-list'),
    path('review/approve/<int:pk>/', views.ReviewApproveView.as_view(), name='review_approve'),
    path('review/seen/<int:pk>/',
         views.ReviewSeenUpdateView.as_view(), name='review-seen'),

    path('book/table/', views.BookTableAdmin.as_view(), name='admin-book-table'),
    path('check/book/table/', views.check_table_available, name='admin-check-table-available'),


]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)