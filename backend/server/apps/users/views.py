# from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from django.db.models import F
from django.utils.timesince import timesince
from datetime import datetime

from rest_framework import viewsets, generics

from .models import *

from .serializers import *


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)


class TreeInfoViewSet(viewsets.ModelViewSet):

    serializer_class = TreeInfoSerializer
    queryset = TreeInfo.objects.all()

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)


class NotificationsViewSet(viewsets.ModelViewSet):

    serializer_class = NotificationsSerializer
    queryset = Notifications.objects.all().order_by('-id')

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        get_notif = Notifications.objects.all()
        for q in get_notif:
            q.save(update_fields=['time_sent'])
            
        return self.queryset.filter(username=self.request.user)


class ContactViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


@api_view(['GET'])
def currentUser(request):
    name = 'kamwaro'
    
    content = {
        'user': str(request.user),
        'auth': str(request.auth),
    }
    return Response(content)

class ExampleView(APIView):
    def get(self, request, format=None):
        User = get_user_model()
        user = User.objects.all()
        
        
        content = {
            'users': ''
        }
        
        for i in user:
            content['users'] += (str(i) + ', ')
        testing = {
            'all': content
        }
            
        return Response(testing)