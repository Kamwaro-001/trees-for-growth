from django.shortcuts import render
from django.http import HttpResponse
# from django.contrib.auth.models import User

from rest_framework import viewsets

from .models import User, TreeInfo, Contact

from .serializers import UserSerializer, TreeInfoSerializer, ContactSerializer


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


class ContactViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


def currentUser(request):
    current_user = request.user
    if request.user.is_authenticated:
        return HttpResponse("userid: " + str(current_user.id) + " username: " + str(current_user))
    else:
        return HttpResponse("Not logged in")
        