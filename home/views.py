from django.shortcuts import render
from django.views.generic import View
from .models import TPP


class Home(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'home/index.html')


class Contact(View):
    def get(self, *args, **kwargs):
        return render(self.request, 'home/contact.html')


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
