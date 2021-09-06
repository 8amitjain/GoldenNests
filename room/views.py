from django.shortcuts import render, redirect
from django.views.generic import DetailView, CreateView
from django.views.generic.list import ListView
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from datetime import datetime
from .forms import RoomAddForm
from .models import RoomType, PeopleVariation, RoomBooked, ReviewRoom, Rooms
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin


class RoomListView(ListView):
    model = RoomType
    template_name = 'room/room_list.html'

    def get_queryset(self):
        adult = self.request.GET.get('adult')
        child = self.request.GET.get('child')
        object_list = []
        if adult != None:
            people_variation = PeopleVariation.objects.filter(
                no_of_adult=adult).filter(no_of_child=child)
            if people_variation:
                object_list = self.model.objects.filter(
                    people_variation=people_variation[0])

        else:
            object_list = self.model.objects.all()
        return object_list


class RoomDetailView(DetailView):
    model = Rooms
    template_name = "room/room_detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pk = self.kwargs.get('pk')
        room = Rooms.objects.get(id=pk)
        context['reviews'] = ReviewRoom.objects.filter(product=room).filter(is_published=True)
        booking = RoomBooked.objects.filter(room_type=room, user=self.request.user, is_booked=True,
                                            is_confirmed=False).last()
        context['booking'] = booking
        return context

    def post(self, *args, **kwargs):
        check_in = datetime.strptime(
            self.request.POST.get('check_in'), "%Y-%m-%d")
        check_out = datetime.strptime(
            self.request.POST.get('check_out'), "%Y-%m-%d")
        no_of_room = int(self.request.POST.get('no_of_room'))
        pk = self.kwargs.get('pk')
        room_type = get_object_or_404(RoomType, pk=pk)
        user = self.request.user if self.request.user.is_authenticated else None
        variation_id = self.request.POST.get('people_variation')
        people_variation = PeopleVariation.objects.get(id=int(variation_id))

        if room_type.people_variation.all() and not people_variation:
            messages.info(self.request, "Please select a variation")

        days = check_out - check_in
        no_of_days = days.days
        if (check_in - datetime.today()).days + 1 < 0:
            messages.info(self.request, "Please select proper check in date")
            return redirect('room:book', pk=pk)
        if not no_of_days > 0:
            messages.info(self.request, "Please select proper check out date")
            return redirect('room:book', pk=pk)
        room = RoomBooked.objects.create(user=user, room_type=room_type, no_of_room=no_of_room,
                                         check_in=check_in, check_out=check_out)
        room.payment_method = "Sample Payment Method"
        room.no_of_days = no_of_days
        room.is_booked = False
        room.save()
        messages.info(self.request, "Room booked Successfully")
        return JsonResponse({
            'no_of_days': room.no_of_days,
            'no_of_room': room.no_of_room, 'total_of_one_night': room.get_total_one_night(), 'total': room.get_total()
        })


class RoomBookingList(LoginRequiredMixin, ListView):
    model = RoomBooked
    paginate_by = 20
    template_name = 'room/booking.html'

    def get_queryset(self):
        queryset = self.model.objects.filter(
            user=self.request.user, is_booked=True)
        return queryset


class BookRoomAddView(CreateView):
    model = Rooms
    form_class = RoomAddForm
    template_name = 'room/room_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object'] = self.model.objects.get(id=self.kwargs.get('pk'))
        return context

    def form_valid(self, form):
        book_room = form.instance
        book_room.user = self.request.user
        pk = self.kwargs.get('pk')
        room_type = get_object_or_404(Rooms, pk=pk)
        days = book_room.check_out - book_room.check_in
        no_of_days = days.days
        if (book_room.check_in - datetime.now().date()).days + 1 < 0:
            messages.info(self.request, "Please select proper check in date")
            return redirect('room:book', pk=pk)
        if not no_of_days > 0:
            messages.info(self.request, "Please select proper check out date")
            return redirect('room:book', pk=pk)
        book_room.room_type = room_type
        book_room.payment_method = "Sample Payment Method"
        book_room.no_of_days = no_of_days
        book_room.is_booked = True
        book_room.save()
        messages.info(self.request, "Room booked Successfully")
        # return JsonResponse({
        #     'no_of_days': book_room.no_of_days,
        #     'no_of_room': book_room.no_of_room, 'total_of_one_night': book_room.get_total_one_night(), 'total': book_room.get_total()
        # })
        return redirect("room:book", pk=pk)


# Add review for Product
class ReviewAdd(LoginRequiredMixin, CreateView):
    model = ReviewRoom
    fields = ('review_description', 'rating',)

    # success_url = 'products:detail'

    def post(self, *args, **kwargs):
        pk = self.kwargs['pk']
        user = self.request.user
        room = Rooms.objects.get(id=pk)
        review = ReviewRoom.objects.filter(
            user=user).filter(product=room).first()
        if not review:
            review = ReviewRoom(user=user, product=room)
            review.review_description = self.request.POST['review_description']
            review.rating = self.request.POST['rating']
            review.save()
            messages.success(self.request, "Review Added Successfully.")
            return redirect('room:book', pk=pk)
        messages.warning(self.request, "Sorry, Review already Exist.")
        return redirect('room:book', pk=pk)


def check_room_available(request):
    id = request.GET.get('room_id')
    check_in = request.GET.get('check_in')
    check_out = request.GET.get('check_out')

    check_in = datetime.strptime(check_in, "%Y-%m-%d").date()
    check_out = datetime.strptime(check_out, "%Y-%m-%d").date()
    room = Rooms.objects.filter(id=id).first()
    if room:
        room_booked = RoomBooked.objects.filter(room_type=room, is_booked=True)
        for room in room_booked:
            if room.check_in < check_in < room.check_out:
                return JsonResponse({
                    'status': 'false',
                })
            elif room.check_in < check_out < room.check_out:
                return JsonResponse({
                    'status': 'false',
                })
        return JsonResponse({
            'status': 'true',
        })
