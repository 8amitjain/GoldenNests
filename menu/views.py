from django.views.generic.list import ListView

from .models import Product, Category


# Food Item
# Show all Food Item
class MenuListView(ListView):
    model = Product
    paginate_by = 50
    template_name = 'menu/menu.html'
    # object_list variable name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        category_list = Category.objects.filter(is_active=True)

        context['category_list'] = category_list
        return context

    def get_queryset(self):
        queryset = self.model.objects.filter(is_active=True)
        return queryset

