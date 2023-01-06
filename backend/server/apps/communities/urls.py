from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('communities', CommunityView, basename="communities")
router.register('members', MembersView, basename="members")
router.register('activities', ActivitiesView, basename="activities")
router.register('mycommunities', CurrentUserCommunities, basename="mycommunities")
router.register('mymembership', CurrentUserMembership, basename="mymembership")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/testing/', getCommName)
]
