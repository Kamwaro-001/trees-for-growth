from django.urls import path, include

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    # path('login/', include('dj_rest_auth.login.urls'))
]