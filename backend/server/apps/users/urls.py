from django.urls import path, include
from rest_framework import routers

from apps.users import views
from apps.users.views import *

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename="users")
router.register('trees', TreeInfoViewSet, basename="trees")
router.register('contact', ContactViewSet, basename="contact")
router.register('notifications', NotificationsViewSet,
                basename="notifications")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/test/', views.currentUser),
    path('api/exampleview/', ExampleView.as_view()),
]
