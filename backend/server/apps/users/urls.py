from django.urls import path, include
# from .views import UserDetail, UserList
from apps.users import views

# urlpatterns = [
#     path('', UserList.as_view()),
#     path('<int:pk>', UserDetail.as_view()),
# ]

urlpatterns = [
    path('', views.user_list),
    path('<int:pk>', views.user_detail)
]