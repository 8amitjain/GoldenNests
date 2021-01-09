from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('menu/', include('menu.urls', namespace='menu')),
    path('order/', include('order.urls', namespace='order')),
    path('', include('home.urls', namespace='home')),
]

