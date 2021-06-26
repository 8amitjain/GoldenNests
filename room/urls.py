from django.urls import path
from . import views

app_name = 'room'
urlpatterns = [
    path('list/', views.RoomListView.as_view(), name='list'),
    path('<int:pk>/book/', views.BookRoomView.as_view(), name='book'),

]
