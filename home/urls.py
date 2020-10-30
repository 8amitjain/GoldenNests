from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from. import views
urlpatterns = [
    path('', views.food_item, name='home'),
    path('add-to-cart/<slug>/', views.add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<slug>/', views.remove_single_item_from_cart, name='remove-from-cart'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


