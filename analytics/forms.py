from django import forms
from menu.models import BookTable, Table, TableTime
from room.models import RoomBooked, Rooms


class AdminTableBookForm(forms.ModelForm):
    class Meta:
        model = BookTable
        fields = ['table', 'name', 'email', 'phone_number', 'people_count', 'sitting_type', 'booked_for_time',
                  'booked_for_date',
                  ]
        widgets = {
            'booked_for_date': forms.DateInput(format='%d-%m-%Y',
                                               attrs={'class': 'form-control', 'placeholder': 'Select a date',
                                                      'type': 'date'}),
            'booked_for_time': forms.DateInput(format='%H:%M:%S',
                                               attrs={'class': 'form-control', 'placeholder': 'Select a Time',
                                                      'type': 'time'}),
        }


class AdminRoomBookForm(forms.ModelForm):
    class Meta:
        model = RoomBooked
        fields = ('name', 'phone_number', 'room_type', 'check_in', 'check_out')
        widgets = {
            'check_in': forms.DateInput(format='%d-%m-%Y',
                                        attrs={'class': 'form-control', 'placeholder': 'Select a date',
                                               'type': 'date'}),
            'check_out': forms.DateInput(format='%d-%m-%Y',
                                         attrs={'class': 'form-control', 'placeholder': 'Select a date',
                                                'type': 'date'}),
        }


class TableCreateForm(forms.ModelForm):
    class Meta:
        model = Table
        exclude = ['slug','date_added','qr_code']

class RoomsCreateForm(forms.ModelForm):
    class Meta:
        model = Rooms
        fields = '__all__'