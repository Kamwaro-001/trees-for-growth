from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
# router.register('communities', CommunityView, basename="communities")
router.register('members', MembersView, basename="members")
router.register('activities', ActivitiesView, basename="activities")
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/communities/', CommunityView.as_view({'get': 'list'})),
]