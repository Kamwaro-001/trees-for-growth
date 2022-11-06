from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.users import views
from apps.users.views import UserViewSet, TreeInfoViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename="users")

urlpatterns = [
    path('', include(router.urls)),
    path('trees/', TreeInfoViewSet.as_view())
]
