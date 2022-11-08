from rest_framework import serializers
from .models import User, TreeInfo, UserAddress


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
        
class TreeInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TreeInfo
        read_only_fields = (
            'id',
            'created_by',
        )
        fields = (
            'id',
            'created_by',
            'tree_name',
            'more_info',
            'files',
        )

class UserAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserAddress
        read_only_fields = (
            'created_by',
        )
        
        fields = (
            'created_by',
            'county',
            'town',
            'full_address',
        )