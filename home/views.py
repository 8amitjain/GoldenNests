from django.shortcuts import render
from django.views.generic import View


class Home(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'home/index.html')


class Contact(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'home/contact.html')

