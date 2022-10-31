from dj_rest_auth.views import (LoginView, LogoutView, PasswordChangeView, UserDetailsView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# class APIUserDetailsView(UserDetailsView):
    

class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class APILoginView(LoginView):
    pass

class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]
    