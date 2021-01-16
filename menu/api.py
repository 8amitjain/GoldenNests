from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.utils import timezone

from .models import Product, Category, TableCount, TableView, TableTime, BookTable, Table
from .serializers import ProductSerializer, CategorySerializer, TableTimeSerializer, TableCountSerializer,\
                         TableViewSerializer
from order.models import Order


class MenuListAPI(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class CategoryAPI(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class CategoryListAPI(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class TableCountAPI(generics.RetrieveAPIView):
    queryset = TableCount.objects.all()
    serializer_class = TableCountSerializer
    permission_classes = [permissions.AllowAny]


class TableCountListAPI(generics.ListAPIView):
    queryset = TableCount.objects.all()
    serializer_class = TableCountSerializer
    permission_classes = [permissions.AllowAny]


class TableViewAPI(generics.RetrieveAPIView):
    queryset = TableView.objects.all()
    serializer_class = TableViewSerializer
    permission_classes = [permissions.AllowAny]


class TableViewListAPI(generics.ListAPIView):
    queryset = TableView.objects.all()
    serializer_class = TableViewSerializer
    permission_classes = [permissions.AllowAny]


class TableTimeAPI(generics.RetrieveAPIView):
    queryset = TableTime.objects.all()
    serializer_class = TableTimeSerializer
    permission_classes = [permissions.AllowAny]


class TableTimeListAPI(generics.ListAPIView):
    queryset = TableTime.objects.all()
    serializer_class = TableTimeSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookTableAPI(views.APIView):

    def post(self, request, format=None):
        add_food = self.request.data['add_food']

        # Getting the booked tabled for given date and time
        book_table = BookTable.objects.filter(booked_for_date=request.data['booked_for_date'],
                                              booked_for_time=request.data['booked_for_time'], is_booked=True)

        # Get the non booked tabled for given date and time by filtering
        table_available = Table.objects.filter(
            people_count=request.data['people_count'], sitting_type=request.data['sitting_type']
        ).exclude(booktable__in=book_table)

        if table_available:
            people_count = TableCount.objects.get(id=request.data['people_count'])
            sitting_type = TableView.objects.get(id=request.data['sitting_type'])
            booked_for_time = TableTime.objects.get(id=request.data['booked_for_time'])
            book_table_obj = BookTable.objects.create(
                name=request.data['name'],
                email=request.data['email'],
                phone_number=request.data['phone_number'],
                people_count=people_count,
                sitting_type=sitting_type,
                booked_for_date=request.data['booked_for_date'],
                booked_for_time=booked_for_time,
                table=table_available.first()
            )

            # getting or creating a order
            order = Order.objects.filter(user=self.request.user, ordered=False).first()
            if order and order.table:
                data = {'data': 'Table already added to order'}
                return Response(data, status=status.HTTP_404_NOT_FOUND)
            if not order:
                ordered_date_time = timezone.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                order = Order.objects.create(
                    user=self.request.user, ordered_date_time=ordered_date_time)
                ORN = f"ORN-{100000 + int(order.id)}"
                order.order_ref_number = ORN
                order.save()

            book_table_obj.save()  # saving book table here for order
            order.table = book_table_obj
            order.save()
            if add_food == 'add_food':
                data = {'data': 'Table Booked, Add food to cart and continue checkout!'}
                return Response(data, status=status.HTTP_201_CREATED)
            else:
                if order.cart.all():
                    for cart in order.cart.all():
                        cart.delete()

                order.ordered = True
                order.save()

                table = order.table
                table.is_booked = True
                table.save()
                data = {'data': 'Table Booked'}
                return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'data': 'Table not available at the given time'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class RemoveTableOrderAPI(views.APIView):

    def get(self, request, format=None):
        order = Order.objects.filter(ordered=False, user=request.user).first()
        if not order:
            data = {'data': 'Order Does Not Exist'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        if order.table.is_booked is not True:
            BookTable.objects.get(id=order.table.id).delete()
            data = {'data': 'Table was removed form order.'}
            return Response(data, status=status.HTTP_200_OK)
        data = {'data': 'FORBIDDEN'}
        return Response(data, status=status.HTTP_403_FORBIDDEN)
