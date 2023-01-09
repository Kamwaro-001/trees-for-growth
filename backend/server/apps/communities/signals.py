from django.db.models.signals import post_save, post_delete
from django.db.models import F
from .models import Community, CommunityMembers
from apps.users.models import Notifications
from django.dispatch import receiver

from rest_framework.decorators import api_view

@api_view(['GET'])
def currentUser(request):
    return request.user

@receiver(post_delete, sender=Community)
def on_delete_update_members(sender, instance, **kwargs):
    CommunityMembers.objects.filter(member_to=instance.verif_code).delete()

@receiver(post_save, sender=Community, dispatch_uid="send_notification")
def send_notification(sender, instance, **kwargs):
    Notifications.objects.create(username=instance.created_by, title=f'Verification code for {instance.name} is {instance.verif_code}. Use it to invite members.')

@receiver(post_save, sender=CommunityMembers, dispatch_uid="update_members_count_add_notification")
def increment_members(sender, instance, **kwargs):
    Community.objects.filter(verif_code=instance.member_to).update(members_no=F('members_no') + 1)
    
    Notifications.objects.create(username=instance.user, title=f'You joined {instance.community}!')


@receiver(post_delete, sender=CommunityMembers)
def decrement_members(sender, instance, **kwargs):
    Community.objects.filter(verif_code=instance.member_to).update(members_no=F('members_no') - 1)
    
    Notifications.objects.create(username=instance.user, title=f'You left {instance.community}!')