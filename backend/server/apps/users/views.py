from django.shortcuts import render

from rest_framework import viewsets


from .models import User

from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)
