from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import routers

from apps.users import views
from apps.users.views import UserViewSet, TreeInfoViewSet, UserAddressViewSet, Profile, Home

router = routers.DefaultRouter()
# router.register('users', UserViewSet, basename="users")
router.register('trees', TreeInfoViewSet, basename="trees")

urlpatterns = [
    path('api/', include(router.urls)),
    # path('api/trees/', TreeInfoViewSet.as_view()),
    path('api/address/', UserAddressViewSet.as_view()),
    # path('', Home.as_view()),
    ####### TEMPLATES #######
    path('', views.homepage, name='homepage'), 
    path('communities/', views.communities, name='communities'), 
    path('userdashboard/', views.userDash, name='dashboard'),
    path('profile/', Profile.as_view()),
    path('login/', views.login, name='login'),
]
