from django import forms
from .models import BookTable


class BookTableForm(forms.ModelForm):

    class Meta:
        model = BookTable
        fields = ('name', 'email', 'phone_number', 'people_count', 'sitting_type', 'booked_for_date', 'booked_for_time')
