from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import View, CreateView
from .models import Contact, TPP, UpcomingEvent
from menu.models import Product, Category

class Home(View):
    def get(self, *args, **kwargs):
        event = UpcomingEvent.objects.all()
        first_class = Product.objects.filter(first_class = True, is_active = True)
        category_list = Category.objects.filter(is_active=True)
        context = {
            'event' : event,
            'first_class' : first_class,
            'category' : category_list
        }
        return render(self.request, 'home/home.html', context)


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


class Terms(View):
    def get(self, *args, **kwargs):
        page_name = self.kwargs.get('page_name')
        tpp = TPP.objects.all().first()
        if page_name == 'terms-and-condition':
            tpp = tpp.tand_c
        elif page_name == 'shiping-policy':
            tpp = tpp.shipping_policy
        elif page_name == 'refund-policy':
            tpp = tpp.refund_policy
        elif page_name == 'return-policy':
            tpp = tpp.return_policy
        elif page_name == 'cancellation-policy':
            tpp = tpp.cancellation_policy
        elif page_name == 'privacy-policy':
            tpp = tpp.privacy_policy
        return render(self.request, 'home/terms_and_condition.html', {'tpp': tpp, 'page': page_name})