from django.shortcuts import render, redirect
from .models import RoomType, PeopleVariation, Room, RoomCart
from django.views.generic.list import ListView
from django.views import View
from .forms import RoomForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from datetime import datetime
class RoomListView(ListView):
    model = RoomType
    template_name = 'room/select_room.html'

    def get_queryset(self):
        adult = self.request.GET.get('adult')
        child = self.request.GET.get('child')
        object_list = []
        if adult != None:
            people_variation = PeopleVariation.objects.filter(no_of_adult=adult).filter(no_of_child=child)
            if people_variation:
                object_list = self.model.objects.filter(people_variation = people_variation[0])
            
        else:
            object_list = self.model.objects.all()
        return object_list
    
class BookRoomView(View):
    
    def get(self, *args, **kwargs):
        context = {}
        context['room_type'] = RoomType.objects.filter(id = self.kwargs.get('pk')).first()
        return render(self.request, 'room/book_room.html', context)

    def post(self, *args, **kwargs):
        check_in = datetime.strptime(self.request.POST.get('check_in'), "%Y-%m-%d")
        check_out = datetime.strptime(self.request.POST.get('check_out'), "%Y-%m-%d")
        no_of_room = int(self.request.POST.get('no_of_room'))
        pk = self.kwargs.get('pk')
        room_type = get_object_or_404(RoomType, pk=pk)
        user = self.request.user if self.request.user.is_authenticated else None
        variation_id = self.request.POST.get('people_variation')
        people_variation = PeopleVariation.objects.get(id = int(variation_id))

        if room_type.people_variation.all() and not people_variation:
            messages.info(self.request, "Please select a variation")
        if not room_type.is_available():
            messages.info(self.request, "All rooms are full")
        
        days = check_out - check_in
        no_of_days = days.days
        if (check_in - datetime.today()).days < 0:
            messages.info(self.request, "Please select proper check in date")
            return redirect('room:book', pk = pk)
        if not no_of_days > 0:
            messages.info(self.request, "Please select proper check out date")
            return redirect('room:book', pk = pk)
        room_cart, created = RoomCart.objects.get_or_create(user = user, room_type=room_type, people_variation = people_variation, no_of_rooms =no_of_room)
        room_cart.save()
        room = Room.objects.create(user = user, room_cart = room_cart, no_of_room=no_of_room,
                                check_in=check_in, check_out=check_out)
        room.payment_method = "Sample Payment Method"
        room.no_of_days = no_of_days
        room.is_booked = True
        room.save()
        messages.info(self.request, "Room booked Successfully")
        return JsonResponse({
            'no_of_days':room.no_of_days,'no_of_room':room.no_of_room, 'total_of_one_night': room.room_cart.get_total_one_night(),'total': room.get_full_total()
        })
        

        
    