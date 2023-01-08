from django.db.models.signals import post_save, post_delete, pre_save
from django.db.models import F
from .models import Community, CommunityMembers
from django.dispatch import receiver


@receiver(post_delete, sender=Community)
def on_delete_update_members(sender, instance, **kwargs):
    CommunityMembers.objects.filter(member_to=instance.verif_code).delete()


@receiver(post_save, sender=CommunityMembers, dispatch_uid="update_members_count")
def increment_members(sender, instance, **kwargs):
    Community.objects.filter(verif_code=instance.member_to).update(members_no=F('members_no') + 1)


@receiver(post_delete, sender=CommunityMembers)
def decrement_members(sender, instance, **kwargs):
    Community.objects.filter(verif_code=instance.member_to).update(members_no=F('members_no') - 1)