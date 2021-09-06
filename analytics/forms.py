from django import forms
from menu.models import BookTable, Table, TableTime


class AdminTableBookForm(forms.ModelForm):
    class Meta:
        model = BookTable
        fields = ['table', 'name', 'email', 'phone_number', 'people_count', 'sitting_type', 'booked_for_time',
                  'booked_for_date',
                  ]
        widgets = {
            'booked_for_date': forms.DateInput(format=('%d-%m-%Y'),
                                             attrs={'class': 'form-control', 'placeholder': 'Select a date',
                                                    'type': 'date'}),
        }
