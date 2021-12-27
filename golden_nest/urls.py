from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('letsmanagestuff/', admin.site.urls),
    path('user/', include('users.urls')),
    path('api/', include('api.urls')),
    path('menu/', include('menu.urls', namespace='menu')),
    path('order/', include('order.urls', namespace='order')),
    path('room/', include('room.urls', namespace='room')),
    path('analytics/', include('analytics.urls', namespace='analytics')),
    path('', include('home.urls', namespace='home')),
]

