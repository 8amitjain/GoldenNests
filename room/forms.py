from django import forms

from .models import RoomBooked


class RoomAddForm(forms.ModelForm):
    class Meta:
        model = RoomBooked
        fields = ('name', 'phone_number', 'check_in', 'check_out', 'people_variation')