from django.urls import path, include
from rest_framework import routers

from apps.users import views
from apps.users.views import UserViewSet, TreeInfoViewSet, ContactViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename="users")
router.register('trees', TreeInfoViewSet, basename="trees")
router.register('contact', ContactViewSet, basename="contact")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/test/',views.currentUser)
]
