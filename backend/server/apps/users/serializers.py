from rest_framework import serializers
from .models import User, TreeInfo


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
            'files',
        )