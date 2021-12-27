import datetime
from menu.models import TableCount, TableView, TableTime, BookTable
from order.models import Order, CancelOrder, OfflineOrder
from room.models import RoomBooked, ReviewRoom
from .models import Contact


def get_current_year_to_context(request):
    current_datetime = datetime.datetime.now()
    return {
        'current_year': current_datetime.year
    }


def get_reservation_data(request):
    people_count_list = TableCount.objects.all()
    sitting_area = TableView.objects.all()
    time_list = TableTime.objects.all()
    context = {
        'people_count_list': people_count_list,
        'sitting_area': sitting_area,
        'time_list': time_list,
    }
    return context


def get_notification(request):
    context = {}
    order_unseen = Order.objects.filter(ordered=True, seen=False).count()
    cancel_order_unseen = CancelOrder.objects.filter(is_seen=False).count()
    table_booking_to_confirmed = BookTable.objects.filter(is_booked=True, is_confirmed=False, is_rejected=False).count()
    room_booking_to_confirmed = RoomBooked.objects.filter(is_booked=True, is_confirmed=False, is_rejected=False).count()
    room_review = ReviewRoom.objects.filter(is_seen=False).count()
    unseen_contact = Contact.objects.filter(seen=False).count()
    offline_order_unseen = OfflineOrder.objects.filter(ordered=True, seen=False).count()
    context['order_unseen'] = order_unseen
    context['cancel_order_unseen'] = cancel_order_unseen 
    context['table_booking_to_confirmed'] = table_booking_to_confirmed 
    context['room_booking_to_confirmed'] = room_booking_to_confirmed
    context['room_review'] = room_review 
    context['unseen_contact'] = unseen_contact 
    context['offline_order'] = offline_order_unseen
    if order_unseen or cancel_order_unseen or table_booking_to_confirmed or room_booking_to_confirmed or room_review or unseen_contact or offline_order_unseen:
        context['show_notifications'] = True
    return context
