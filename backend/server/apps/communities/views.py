from django.shortcuts import render

from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class CommunityView(viewsets.ModelViewSet):
    authentication_classes = [] 
    permission_classes = [] 
    
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    
class MembersView(viewsets.ModelViewSet):
    serializer_class = CommMembersSerializer
    queryset = CommunityMembers.objects.all()
    
class ActivitiesView(viewsets.ModelViewSet):
    authentication_classes = [] 
    permission_classes = [] 
    serializer_class = CommActivitiesSerializer
    queryset = CommunityActivities.objects.all()

