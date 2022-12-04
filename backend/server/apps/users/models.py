from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

Person = get_user_model()

class User(models.Model):
    first_name = models.CharField("First name", max_length=255, default="unknown")
    last_name = models.CharField("Last name", max_length=255, default="unknown")
    # TODO go through this part later
    email = models.EmailField(unique=True)
    username = models.ForeignKey(Person, on_delete=models.CASCADE)
    phonenumber = models.CharField("Phone number", unique=True, max_length=40)
    county = models.CharField("County", max_length=50, default="unknown")
    town = models.CharField("Town", max_length=50, default="unknown")
    
class TreeInfo(models.Model):
    username = models.ForeignKey(Person, on_delete=models.CASCADE)
    tree_name = models.CharField("Tree name", max_length=255)
    more_info = models.TextField("Additional information", default="", max_length=255)
    files = models.FileField("Evidence", null=True)
    
# class UserAddress(models.Model):
#     username = models.ForeignKey(Person, on_delete=models.CASCADE)
#     county = models.CharField("County", max_length=50)
#     town = models.CharField("Town", max_length=50)
#     full_address = models.CharField("Full Address", max_length=255)
    