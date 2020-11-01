from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from. import views
urlpatterns = [
    path('', views.food_item, name='home'),

    path('menu/', views.menu_item, name='menu'),
    path('menu2/', views.menu_item_2, name='menu-2'),
    path('menu3/', views.menu_item_3, name='menu-3'),

    path('add-to-cart/<slug>/', views.add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<slug>/', views.remove_single_item_from_cart, name='remove-from-cart'),

    path('add-to-cart-menu/<slug>/', views.add_to_cart_menu, name='add-to-cart-menu'),
    path('remove-from-cart-menu/<slug>/', views.remove_single_item_from_cart_menu, name='remove-from-cart-menu'),

    path('add-to-cart-menu2/<slug>/', views.add_to_cart_menu2, name='add-to-cart-menu2'),
    path('remove-from-cart-menu2/<slug>/', views.remove_single_item_from_cart_menu2, name='remove-from-cart-menu2'),

    path('add-to-cart-menu3/<slug>/', views.add_to_cart_menu3, name='add-to-cart-menu3'),
    path('remove-from-cart-menu3/<slug>/', views.remove_single_item_from_cart_menu3, name='remove-from-cart-menu3'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


