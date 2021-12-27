from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from . import api

app_name = 'menu'

urlpatterns = [
    # Menu
    path('', views.MenuListView.as_view(), name='menu'),
    # Book Table
    path('book/table/', views.BookTableView.as_view(), name='book-table'),
    # path('confirmed/booked/table/list/', views.ConfirmBookedTableListView.as_view(), name='booked-table-list'),
    path('booked/table/list/', views.BookedTableListView.as_view(), name='booked-table-list'),

    # Remove Table from order
    path('table/remove/', views.RemoveTableOrder.as_view(), name='remove-table'),

    # Rest Api URL
    # Menu
    path('api/', api.ProductListAPI.as_view(), name='api-menu'),
    path('api/product/<int:pk>/', api.ProductAPI.as_view(), name='api-product'),
    path('api/product/list/', api.ProductListAPI.as_view(), name='api-product-list'),
    path('api/category/list/', api.CategoryListAPI.as_view(), name='api-category-list'),
    path('api/category/<int:pk>/', api.CategoryAPI.as_view(), name='api-category'),

    # Table
    path('api/table/view/list/', api.TableViewListAPI.as_view(), name='api-table-view-list'),
    path('api/table/view/<int:pk>/', api.TableViewAPI.as_view(), name='api-table-view'),

    path('api/table/people/count/list/', api.TableCountListAPI.as_view(), name='api-table-people-count-list'),
    path('api/table/people/count/<int:pk>/', api.TableCountAPI.as_view(), name='api-table-people-count'),

    path('api/table/time/list/', api.TableTimeListAPI.as_view(), name='api-table-time-list'),
    path('api/table/time/<int:pk>/', api.TableTimeAPI.as_view(), name='api-table-time'),

    # Book Table
    path('api/table/book/', api.BookTableAPI.as_view(), name='api-table-book'),

    # Remove Table
    path('api/table/remove/', api.RemoveTableOrderAPI.as_view(), name='api-table-book'),

    path('check/table/available/', views.check_table_available, name='check-table-available'),
    path('cancel/table/booking/', views.CancelTableBeforeDateTime.as_view(), name='cancel-table-booking'),

    path('table/booking/success/<int:pk>/', views.TableBookingSuccessView.as_view(), name='thanks-page'),


]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
