from django import forms

from .models import Room


class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = {'no_of_room', 'check_in', 'check_out'}
        widgets = {
            'check_in': forms.DateInput(format=('%d/%m/%Y'), attrs={'class': 'form-control', 'placeholder': 'Select a Checkin date', 'type': 'date'}),
            'check_out': forms.DateInput(format=('%d/%m/%Y'), attrs={'class': 'form-control', 'placeholder': 'Select a CheckOut date', 'type': 'date'}),

        }
