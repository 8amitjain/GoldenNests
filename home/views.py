from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import View, CreateView
from .models import Contact

class Home(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'home/home.html')


class ContactView(CreateView):
    model = Contact
    fields = ['name', 'email', 'mobile', 'description']
    template_name = "home/contact.html"
    success_url = '/contact/'

    def form_valid(self, form):
        phone_number = form.cleaned_data['mobile']
        if len(str(phone_number)) != 10:
            messages.warning(self.request, 'Invalid mobile number')
            return redirect('home:contact')
        messages.success(self.request, "Message submitted, We will get back to you soon!")
        return super().form_valid(form)

