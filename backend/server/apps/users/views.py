from django.shortcuts import render
from rest_framework.authtoken.models import Token

from django.http import HttpResponse
from django.template import loader

########### ADDING A USER -TRY- ###########
from django.http import JsonResponse
from django.contrib.auth import get_user
from requests import request

from rest_framework import viewsets

from .models import User, TreeInfo

from .serializers import UserSerializer, TreeInfoSerializer

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


# class UserAddressViewSet(viewsets.ModelViewSet):

#     serializer_class = UserAddressSerializer
#     queryset = UserAddress.objects.all()

#     def perform_create(self, serializer):
#         serializer.save(username=self.request.user)

#     def get_queryset(self):
#         return self.queryset.filter(username=self.request.user)

# def get_user_by_token(token):
#  user_id = Token.objects.get(key=request.auth.key).user_id
#  user = Users.object.get(id =user_id)
#  return JsonResponse({"user": user.id})


def currentUser(request):
    current_user = request.user
    if request.user.is_authenticated:
        return HttpResponse("user: " + str(current_user))
    else:
        return HttpResponse("Not logged in")
        
# class MyCommunities()
###########################################


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
    template = loader.get_template('userdashboard.html')
    return HttpResponse(template.render())


@csrf_exempt
def login(response):
    return render(response, 'login.html', {})
