from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        read_only_fields = (
            'id',
            'created_by',
        )
        fields = (
            'id',
            'created_by',
            'first_name', 
            'last_name', 
            # TODO fix here after models
            'email', 
            'phonenumber'
            )