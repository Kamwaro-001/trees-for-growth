from django.urls import path, include
from apps.users import views

urlpatterns = [
    path('', views.user_list),
    path('<int:pk>', views.user_detail)
]