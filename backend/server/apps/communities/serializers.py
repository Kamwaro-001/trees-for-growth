from rest_framework import serializers

from .models import *

class CommunitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Community
        read_only_fields = (
            'id',
            'date_created',
            'verif_code',
            'members_no'
        )
        fields = (
            'id',
            'name',
            'region',
            'created_by',
            'date_created',
            'verif_code',
            'members_no'
        )


class CommMembersSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CommunityMembers
        read_only_fields = (
            'id',
            'joining_date',
            'community',
            'community_owner'
        )
        fields = (
            'id',
            'user',
            'member_to',
            'joining_date',
            'community',
            'community_owner'
        )
        
class CommActivitiesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CommunityActivities
        read_only_fields = (
            'id',
            'community_id',
            'activity_date'
        )
        fields = (
            'id',
            'activity_name',
            'activity_details',
            'activity_date',
            'community_id'
        )

