# from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

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
    queryset = Notifications.objects.all()

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(username=self.request.user)


class ContactViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


@api_view(['GET'])
def currentUser(request):
    # current_user = request.user
    # if request.user.is_authenticated:
    #     return HttpResponse("userid: " + str(current_user.id) + " username: " + str(current_user))
    # else:
    #     return HttpResponse("Not logged in")
    name = 'kamwaro'
    
    content = {
        'user': str(request.user),
        'auth': str(request.auth),
    }
    return Response(content)


# class ExampleView(APIView):

#     def get(self, request, format=None):
#         content = {
#             'user': str(request.user),
#             'auth': str(request.auth),
#         }
#         return Response(content)

class ExampleView(APIView):
    def get(self, request, format=None):
        User = get_user_model()
        user = User.objects.all()
        
        content = {
            'users': ''
        }
        for i in user:
            content['users'] += (str(i) + ', ')
        return Response(content)