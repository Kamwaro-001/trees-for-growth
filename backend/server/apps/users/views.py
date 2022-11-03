from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import User

from .serializers import UserSerializer
    
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        
        # TODO change this to use email
        email = request.GET.get('email', None)
        if email is not None:
            users = users.filter(email__contains = email)
            
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer =UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])   
def user_detail(request, pk):
    try: 
        user = User.objects.get(pk=pk) 
        
        if request.method == 'GET': 
            user_serializer = UserSerializer(user) 
            return JsonResponse(user_serializer.data) 
        
        elif request.method == 'PUT': 
            user_data = JSONParser().parse(request) 
            user_serializer = UserSerializer(user, data=user_data) 
            if user_serializer.is_valid(): 
                user_serializer.save() 
                return JsonResponse(user_serializer.data) 
            return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE': 
            user.delete() 
            return JsonResponse({'message': 'The User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        
    except User.DoesNotExist: 
        return JsonResponse({'message': 'This user does not exist'}, status=status.HTTP_404_NOT_FOUND) 
    