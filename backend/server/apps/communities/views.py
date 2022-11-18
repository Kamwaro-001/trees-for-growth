from django.shortcuts import render

from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class CommunityView(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    
# class MembersView(viewsets.ModelViewSet):
#     serializer_class = CommMembersSerializer
#     queryset = CommunityMembers.objects.all()
    # TODO filter with community code
    # def perform_create(self, serializer):
    #     serializer.save()
    
class MembersView(viewsets.ModelViewSet):
    serializer_class = CommMembersSerializer
    queryset = CommunityMembers.objects.all()
    
class ActivitiesView(viewsets.ModelViewSet):
    serializer_class = CommActivitiesSerializer
    queryset = CommunityActivities.objects.all()

