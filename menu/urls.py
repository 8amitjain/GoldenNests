from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'menu'

urlpatterns = [
    path('', views.MenuListView.as_view(), name='menu'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

