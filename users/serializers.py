from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.core import exceptions
from django.core.validators import validate_email

from .models import (
    User
)

import django.contrib.auth.password_validation as validators


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'phone_number')


# # User Update Serializer
class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('name', 'phone_number')

    def validate_phone_number(self, value):
        user = self.context['request'].user
        if len(str(value)) != 10:
            raise serializers.ValidationError({"data": "Phone number is not valid."})
        return value

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.phone_number = validated_data['phone_number']
        # instance.email = validated_data['email']

        instance.save()

        return instance

# class UserUpdateSerializer(serializers.Serializer):
#     model = User
#     name = serializers.CharField(required=True)
#     phone_number = serializers.IntegerField(required=True)


# User Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'token', 'password', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}}

    # email and password validation
    def validate(self, validated_data):
        user = User(**validated_data)
        password = validated_data['password']
        email = validated_data['email']
        phone_number = validated_data['phone_number']
        errors = dict()

        try:
            validate_email(email)
        except exceptions.ValidationError as e:
            errors['email'] = f'{email} is not an valid email'

        try:
            if len(str(phone_number)) != 10:
                raise Exception
        except Exception as e:
            errors['phone_number'] = f'{phone_number} is not an valid phone_number'

        try:
            validators.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerializer, self).validate(validated_data)

    # Creating user and customer model here
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['password'],
            name=validated_data['name'],
            phone_number=validated_data['phone_number'],
            token=validated_data['token'],
            is_active=False
        )
        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password_conf = serializers.CharField(required=True)


