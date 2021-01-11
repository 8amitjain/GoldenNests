import datetime
from menu.models import TableCount, TableView, TableTime


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
