from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics

from .models import *
from .serializers import *

# Create your views here.


class CommunityView(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Community.objects.all().order_by('-date_created', 'region')
    serializer_class = CommunitySerializer


class MembersView(viewsets.ModelViewSet):
    serializer_class = CommMembersSerializer
    queryset = CommunityMembers.objects.all()


class ActivitiesView(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = CommActivitiesSerializer
    queryset = CommunityActivities.objects.all()


class CurrentUserCommunities(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer

    def get_queryset(self):
        user = self.request.user
        return Community.objects.filter(created_by=user).order_by('-date_created', '-id')


class CurrentUserMembership(viewsets.ModelViewSet):
    serializer_class = CommMembersSerializer

    def get_queryset(self):
        user = self.request.user
        return CommunityMembers.objects.filter(user=user).order_by('-joining_date', '-id')


def getCommName(request):
    # name = Community.objects.all('name').values_list()
    communit = Community.objects.filter(verif_code='W9E9JUKJ').values()
    # communit = Community.objects.get(verif_code='4HTBTMTZ')
    # name = comm.values('name')
    # name = communit[0]['name']
    # name = communit.name
    # communit.members_no += 1
    return HttpResponse(communit)