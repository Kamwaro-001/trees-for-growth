from rest_framework import serializers
from .models import User, TreeInfo, Contact, Notifications


# from django.contrib.auth.models import User

class User2Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        read_only_fields = (
            'id',
            'username',
        )
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phonenumber',
            'county',
            'town',
        )


class TreeInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TreeInfo
        read_only_fields = (
            'id',
            'username',
        )
        fields = (
            'id',
            'username',
            'tree_name',
            'more_info',
            'files',
        )


class NotificationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notifications
        read_only_fields = (
            'id',
            'username',
            'time_sent',
            'when'
        )
        fields = (
            'id',
            'username',
            'title',
            'status',
            'time_sent',
            'when'
        )


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        read_only_fields = (
            'id',
            'date',
        )
        fields = (
            'id',
            'date',
            'name',
            'email',
            'subject',
            'message',
        )
