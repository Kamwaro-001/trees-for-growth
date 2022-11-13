from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.users import views
from apps.users.views import UserViewSet, TreeInfoViewSet, UserAddressViewSet, Profile, Home

router = DefaultRouter()
router.register('users', UserViewSet, basename="users")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/trees/', TreeInfoViewSet.as_view()),
    path('api/address/', UserAddressViewSet.as_view()),
    # path('', views.hello, name='base'),
    path('', Home.as_view()),
    path('profile/', Profile.as_view()), 
]
