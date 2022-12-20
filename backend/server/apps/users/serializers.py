from rest_framework import serializers
from .models import User, TreeInfo, Contact


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