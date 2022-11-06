from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView

from .models import User, TreeInfo

from .serializers import UserSerializer, TreeInfoSerializer

class UserViewSet(viewsets.ModelViewSet):
    
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)

class TreeInfoViewSet(ListCreateAPIView):
    
    serializer_class = TreeInfoSerializer
    queryset = TreeInfo.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)
    