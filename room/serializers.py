from rest_framework import serializers
from .models import Rooms, RoomBooked


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(RoomSerializer, self).to_representation(instance)
        # rep['product'] = RoomSerializer(instance.product).data
        return rep


class RoomBookedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooked
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(RoomBookedSerializer, self).to_representation(instance)
        return rep