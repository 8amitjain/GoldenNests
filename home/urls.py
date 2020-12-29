from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.Home.as_view()),
    path('menu/', views.Contact.as_view(), name='menu'),
    path('contact/', views.Contact.as_view(), name='contact'),
]

