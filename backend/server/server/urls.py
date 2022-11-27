from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('apps.accounts.urls')),
    path('', include('apps.users.urls')),
    path('', include('apps.communities.urls')), 
    
]
