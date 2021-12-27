from django.urls import path
from . import views

app_name = 'room'
urlpatterns = [
    path('list/', views.RoomListView.as_view(), name='list'),
    path('<int:pk>/', views.RoomDetailView.as_view(), name='book'),
    path('<int:pk>/booked/', views.BookRoomAddView.as_view(), name='book-room'),

    # Review
    path('<int:pk>/review/add', views.ReviewAdd.as_view(), name='review-add'),

    # Booking
    path('booking/', views.RoomBookingList.as_view(), name='booking-list'),

    path('check/room/available/', views.check_room_available, name='check-room-available'),

    path('booking/cancel/', views.RoomBookingCancelView.as_view(), name='room-cancel-booking'),
    path('booking/checkout/', views.RoomBookingCheckoutView.as_view(), name='room-booking-checkout'),
    path('booking/success/<int:pk>/', views.RoomBookingSuccessView.as_view(), name='room-booking-success'),
    path('booked/room/list/', views.BookedRoomListView.as_view(), name='booked-room-list'),
    path('confirmed/booked/room/list/', views.ConfirmedBookedRoomListView.as_view(), name='confirmed-booked-room-list'),
    path('cancel/booking/', views.CancelRoomBookingBeforeCheckin.as_view(), name='cancel-room-booking'),
    path('booking/razorpay/response/', views.RazorPayRoomResponseView.as_view(), name='room-payment-response'),

]
