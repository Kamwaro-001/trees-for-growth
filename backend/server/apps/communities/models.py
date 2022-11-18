from django.db import models

class Community(models.Model):
    name = models.CharField("Community name", max_length=255)
    created_by = models.CharField("Created by", max_length=255)
    date_created = models.DateField(auto_now_add=True)
    community_id = models.CharField("Community ID", max_length=100)
    verif_code = models.CharField("Verification code", max_length=255)

class CommunityMembers(models.Model):
    user = models.CharField("Member username", max_length=100)
    member_to = models.CharField("Member to", max_length=255)
    joining_date = models.DateField(auto_now_add=True)
    
class CommunityActivities(models.Model):
    # community_id = models.ForeignKey(Community.community_id, on_delete=models.CASCADE)
    community_id = models.CharField("Community ID", max_length=255)
    activity_name = models.CharField("Activity name", max_length=255)
    activity_details = models.TextField("Activity details", blank=True)
    activity_date = models.DateField("Activity date", auto_now_add=True)

    
