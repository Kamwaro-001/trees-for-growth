import secrets
import string

from django.db import models
from django.db.models import F
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver

Person = get_user_model()


def verification_code():
    return ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))

def onDelete(code):
    CommunityMembers.objects.filter(member_to=code).delete

class Community(models.Model):
    name = models.CharField("Community name", max_length=255)
    region = models.CharField("Region", max_length=30)
    created_by = models.CharField("Created by", max_length=20)
    date_created = models.DateField(auto_now_add=True)
    verif_code = models.CharField(
        "Verification code", max_length=9, unique=True)
    members_no = models.IntegerField("Number of members", default=0)

    def save(self, *args, **kwargs):
        setattr(self, 'verif_code', verification_code())
        setattr(self, 'members_no', 1)
        for field_name in ['name', 'region']:
            val = getattr(self, field_name, False)
            if val:
                setattr(self, field_name, val.capitalize())

        CommunityMembers.objects.create(user=getattr(self, 'created_by'), member_to=getattr(self, 'verif_code'), community=getattr(self, 'name'), community_owner=getattr(self, 'created_by'))
        
        super(Community, self).save(*args, **kwargs)
    
    class Meta:
        unique_together = ('name', 'region')

class CommunityMembers(models.Model):
    user = models.CharField("Member username", max_length=100)
    member_to = models.CharField("Member to", max_length=255)
    joining_date = models.DateField(auto_now_add=True)
    community = models.CharField("Community", max_length=255, default="Unknown")
    community_owner = models.CharField("Community created by", max_length=150, default="unknown")

    def save(self, *args, **kwargs):
        code = getattr(self, 'member_to')
        comm = getattr(self, 'community')
        name = Community.objects.filter(verif_code=code).values('name')
        communits = Community.objects.filter(verif_code=code).values('created_by')
        
        if comm == "Unknown":
            setattr(self, 'community', name[0]['name'])
            setattr(self, 'community_owner', communits[0]['created_by'])
        super(CommunityMembers, self).save(*args, **kwargs)

    class Meta:
        unique_together = ('user', 'community')


class CommunityActivities(models.Model):
    community_id = models.CharField("Community ID", max_length=255)
    activity_name = models.CharField("Activity name", max_length=255)
    activity_details = models.TextField("Activity details", blank=True)
    activity_date = models.DateField("Activity date", auto_now_add=True)
