from django.db import models
from django.contrib.auth import get_user_model

Person = get_user_model()

class Community(models.Model):
    # TODO remove the unique property and set it to check combination of name + region is unique
    name = models.CharField("Community name", max_length=255)
    region = models.CharField("Region", max_length=30)
    created_by = models.CharField("Created by", max_length=20)
    date_created = models.DateField(auto_now_add=True)
    # community_id = models.CharField("Community ID", max_length=100, unique=True)
    verif_code = models.CharField("Verification code", max_length=255)
    
    class Meta:
        unique_together = ('name', 'region')

class CommunityMembers(models.Model):
    user = models.CharField("Member username", max_length=100)
    member_to = models.CharField("Member to", max_length=255)
    joining_date = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'member_to')
     
class CommunityActivities(models.Model):
    # community_id = models.ForeignKey(Community.community_id, on_delete=models.CASCADE)
    community_id = models.CharField("Community ID", max_length=255)
    activity_name = models.CharField("Activity name", max_length=255)
    activity_details = models.TextField("Activity details", blank=True)
    activity_date = models.DateField("Activity date", auto_now_add=True)

    
