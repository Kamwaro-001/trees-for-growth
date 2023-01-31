from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.shortcuts import render

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('apps.accounts.urls')),
    path('', include('apps.users.urls')),
    path('', include('apps.communities.urls')),
    # path('', TemplateView.as_view(template_name="index.html")),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
