import razorpay
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, CreateView
from django.views.generic.list import ListView
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from datetime import datetime

from analytics.views import send_mail, send_sms, send_order_notification
from golden_nest.settings import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from .forms import RoomAddForm
from .models import RoomType, PeopleVariation, RoomBooked, ReviewRoom, Rooms, RoomPayment
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin


class RoomListView(ListView):
    model = Rooms
    template_name = 'room/room_list.html'

    def get_queryset(self):
        adult = self.request.GET.get('adult')
        child = self.request.GET.get('child')
        object_list = []
        if adult is not None:
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
        booking = RoomBooked.objects.filter(room_type=room, user=self.request.user, is_booked=False,
                                            is_confirmed=False).last()
        context['booking'] = booking
        return context

    def post(self, *args, **kwargs):
        check_in = datetime.strptime(
            self.request.POST.get('check_in'), "%Y-%m-%d")
        check_out = datetime.strptime(
            self.request.POST.get('check_out'), "%Y-%m-%d")
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
        room = RoomBooked.objects.create(user=user, room_type=room_type,
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
        pass


class BookedRoomListView(LoginRequiredMixin, ListView):
    model = RoomBooked
    template_name = 'room/booking.html'

    def get_queryset(self):
        queryset = self.model.objects.filter(
            user=self.request.user, is_booked=True, is_rejected=False)
        return queryset


class ConfirmedBookedRoomListView(LoginRequiredMixin, ListView):
    model = RoomBooked
    template_name = 'room/booking.html'

    def get_queryset(self):
        queryset = self.model.objects.filter(
            user=self.request.user, is_booked=True, is_confirmed=True, is_rejected=False)
        return queryset


class BookRoomAddView(CreateView):
    model = RoomBooked
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
        if not room_type:
            messages.warning(self.request, "Room not exist!")
            return redirect('room:list')
        if not room_type.stock_no > 0:
            messages.info(self.request, "Room not available, sorry for inconvenience")
            return redirect('room:list')

        # check_in = book_room.check_in
        # check_out = book_room.check_out
        # if check_in == check_out:
        #     messages.info(self.request, "Please select proper check in & check out date")
        #     return redirect('room:list')
        book_room_remain = book_room.check_out - book_room.check_in

        no_of_days = book_room_remain.days

        if (book_room.check_in - datetime.now().date()).days + 1 < 0:
            messages.info(self.request, "Please select proper check in date")
            return redirect('room:book', pk=pk)
        if not no_of_days > 0:
            messages.info(self.request, "Please select proper check out date")
            return redirect('room:book', pk=pk)
        book_room.room_type = room_type
        book_room.payment_method = "Sample Payment Method"
        book_room.no_of_days = no_of_days
        book_room.is_booked = False
        book_room.save()
        # return JsonResponse({ 'no_of_days': book_room.no_of_days, 'no_of_room': book_room.no_of_room,
        # 'total_of_one_night': book_room.get_total_one_night(), 'total': book_room.get_total() })
        return redirect("room:book", pk=pk)

    def form_invalid(self, form):
        return HttpResponse(form.errors.as_json())


class RoomBookingCancelView(LoginRequiredMixin, View):

    def post(self, *args, **kwargs):
        booking_id = self.request.POST.get('booking_id')
        redirect_url = self.request.META.get('HTTP_REFERER')
        if booking_id:
            booking = RoomBooked.objects.filter(id=int(booking_id)).last()
            if booking:
                booking.delete()
                messages.success(self.request, "Room Booking Cancelled")
                if redirect_url:
                    return redirect(redirect_url)
        return redirect('room:list')


class CancelRoomBookingBeforeCheckin(LoginRequiredMixin, View):

    def post(self, *args, **kwargs):
        id = self.request.POST.get('room_id')
        if not id:
            messages.warning(self.request, "Room not Found!")
            return redirect('room:booked-room-list')
        room = RoomBooked.objects.filter(id=int(id)).first()
        if not room:
            messages.warning(self.request, "Room not Found!")
            return redirect('room:booked-room-list')
        room.delete()
        messages.success(self.request, "Your booking is cancel")
        return redirect('room:booked-room-list')


class RoomBookingCheckoutView(LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        context = {}
        booking_id = self.request.GET.get('booking_id')
        if booking_id:
            booking = RoomBooked.objects.filter(id=int(booking_id)).last()
            if booking:
                room_type = booking.room_type
                if not room_type.stock_no > 0:
                    messages.info(self.request, "Room not available, sorry for inconvenience")
                order_amount = (booking.get_total() * 100)
                order_currency = "INR"
                user_name = self.request.user.name
                phone_number = self.request.user.phone_number
                notes = {
                    'User': user_name,
                    'Phone Number': phone_number,
                }
                client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
                payment = client.order.create(dict(amount=float(order_amount), currency=order_currency))
                context['key'] = RAZORPAY_KEY_ID
                context['booking_payment'] = booking
                context['payment'] = payment
                context['object'] = booking.room_type
                return render(self.request, 'room/room_detail.html', context)
        #         booking.save()
        #         messages.info(self.request, "Room booked Successfully")
        #
                # send_mail(self.request, booking.user, "Room booked successfully!")
        #         send_sms(self.request, "Room booked successfully!", booking.phone_number)
        return redirect('room:booked-room-list')


@method_decorator(csrf_exempt, name='dispatch')
class RazorPayRoomResponseView(View):
    def post(self, request, *args, **kwargs):
        payment_id = request.POST.get('razorpay_payment_id', '')
        razorpay_order_id = request.POST.get('razorpay_order_id', '')
        signature = request.POST.get('razorpay_signature', '')
        order_id = request.POST.get('order', '')
        booking = RoomBooked.objects.filter(id=int(order_id)).first()
        if booking:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }
            client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
            result = client.utility.verify_payment_signature(params_dict)
            if result is None:
                try:
                    order_amount = (booking.get_total() * 100)
                    order_currency = "INR"
                    captured_payment = client.payment.capture(payment_id, order_amount, {"currency": order_currency})
                    response = client.payment.fetch(payment_id)
                except:
                    response = client.payment.fetch(payment_id)
                    if response['status'] == 'authorized' or response['status'] == 'captured':
                        user = request.user
                        # Reduce stock and update order to ordered True
                        booking.is_booked = True
                        room_type = booking.room_type
                        # room_type.stock_no -= 1
                        room_type.save()
                        payment = RoomPayment()
                        payment.user = user
                        payment.amount = booking.get_total()
                        payment.order_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.payment_id = f'{user.id}_{timezone.datetime.now()}'
                        payment.amount_paid = int(response['amount']) / 100
                        payment.payment_method = response['method']
                        payment.razorpay_order_id = razorpay_order_id
                        payment.payment_id = payment_id
                        payment.signature = signature
                        payment.paid = True
                        payment.save()
                        booking.payment = payment
                        booking.payment_method = payment.payment_method
                        booking.save()

                        messages.success(self.request, "Room Booked!")
                        messages.success(self.request, "Success!")
                        messages.info(self.request, "Room booked Successfully.")
                        send_mail(self.request, booking.user, "You will be notify when your room booking is confirmed!")

                        admin_unconfirmed_table_url = reverse('analytics:not-confirmed-rooms-list')
                        admin_unconfirmed_table_url = self.request.build_absolute_uri(admin_unconfirmed_table_url)
                        msg = f"New Room is booked. Check Unconfirmed Room List:\n {admin_unconfirmed_table_url}"
                        send_order_notification(self.request, msg)

                        return redirect('room:room-booking-success', pk=booking.id)
            else:
                return HttpResponse("Signature mismatched")

class RoomBookingSuccessView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        order_id = self.kwargs.get('pk')
        booking = RoomBooked.objects.filter(id=int(order_id)).first()
        if booking and booking.is_booked:
            return render(self.request, 'room/booking_success.html')
        else:
            return redirect('room:booked-room-list')

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
    rooms = Rooms.objects.filter(id=id).first()
    booked_room = 0
    if rooms:
        room_booked = RoomBooked.objects.filter(room_type=rooms, is_booked=True, is_checked_out=False)
        if not room_booked:
            return JsonResponse({
                'status': 'true',
            })
        for room in room_booked:
            if room.check_in <= check_in <= room.check_out:
                booked_room += 1
            elif room.check_in <= check_out <= room.check_out:
                booked_room += 1
        if booked_room < rooms.stock_no:
            return JsonResponse({
                'status': 'true',
            })
        return JsonResponse({
            'status': 'false',
        })
