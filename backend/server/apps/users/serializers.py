from rest_framework import serializers
from .models import User, TreeInfo


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
            # TODO fix here after models
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

# class UserAddressSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = UserAddress
#         read_only_fields = (
#             'id',
#             'username',
#         )
        
#         fields = (
#             'id',
#             'username',
#             'county',
#             'town',
#             'full_address',
#         )