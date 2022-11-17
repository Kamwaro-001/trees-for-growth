from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView

from .utils import EnablePartialUpdateMixin
from .models import User, TreeInfo, UserAddress

from .serializers import UserSerializer, TreeInfoSerializer, UserAddressSerializer

from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt


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

class UserAddressViewSet(viewsets.ModelViewSet):
    
    serializer_class = UserAddressSerializer
    queryset = UserAddress.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(username=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(username=self.request.user) 

############################################

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
    
def homepage(response):
    # template=loader.get_template('homepage.html')
    # return HttpResponse(template.render())
    return render(response, 'homepage.html', {}) 
    
def communities(response):
    # template=loader.get_template('communities.html')
    # return HttpResponse(template.render())
    return render(response, 'communities.html', {})
    
def userDash(request):
    template=loader.get_template('userdashboard.html')
    return HttpResponse(template.render()) 

@csrf_exempt
def login(response):
    return render(response, 'login.html', {})