from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

Person = get_user_model()

class User(models.Model):
    first_name = models.CharField("First name", max_length=255, default="unknown")
    last_name = models.CharField("Last name", max_length=255, default="unknown")
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
    
class Contact(models.Model):
    name = models.CharField("Your Name", max_length=100)
    date = models.DateField("Date", auto_now_add=True)
    email = models.CharField("Your Email", max_length=100)
    subject = models.CharField("Subject", max_length=100)
    message = models.TextField("Message", max_length=255)
