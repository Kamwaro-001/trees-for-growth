from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView

from .models import User, TreeInfo, UserAddress

from .serializers import UserSerializer, TreeInfoSerializer, UserAddressSerializer


from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

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

class UserAddressViewSet(ListCreateAPIView):
    
    serializer_class = UserAddressSerializer
    queryset = UserAddress.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user) 

class Profile(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'profile.html'

    def get(self, request):
        queryset = User.objects.all()
        return Response({'users': queryset})

class Home(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'base.html'

    def get(self, request):
        queryset = User.objects.all()
        return Response({'users': queryset})
    
def communities(request):
    template=loader.get_template('communities.html')
    return HttpResponse(template.render()) 
    
def userDash(request):
    template=loader.get_template('userdashboard.html')
    return HttpResponse(template.render()) 