from django.urls import path
from . import views

app_name = 'room'
urlpatterns = [
    path('list/', views.RoomListView.as_view(), name='list'),
    path('<int:pk>/', views.RoomDetailView.as_view(), name='book'),
    path('<int:pk>/booked/', views.BookRoomAddView.as_view(), name='book-room'),

    # Review
    path('<int:pk>/review/add', views.ReviewAdd.as_view(), name='review-add'),

    #Booking
    path('booking/', views.RoomBookingList.as_view(), name='booking-list'),

    path('check/room/available/', views.check_room_available, name='check-room-available'),

]
