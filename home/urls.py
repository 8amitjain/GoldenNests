from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.Home.as_view(), name="home"),
    path('about/', TemplateView.as_view(template_name='home/about.html'), name='about'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    
    path('franchise/', TemplateView.as_view(template_name='home/franchise.html'), name='franchise'),

    path('policy/<str:page_name>/', views.Terms.as_view(), name='terms'),
    path('sitemap.xml/', TemplateView.as_view(template_name='home/sitemap.html'), name='sitemap'),
    path('robots.txt/', TemplateView.as_view(template_name='home/robots.html'), name='robots'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)