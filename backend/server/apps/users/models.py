from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

Person = get_user_model()

class User(models.Model):
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    # TODO go through this part later
    email = models.EmailField(unique=True)
    created_by = models.ForeignKey(Person, on_delete=models.CASCADE)
    phonenumber = models.CharField("Phone number", unique=True, max_length=40)
    
class TreeInfo(models.Model):
    created_by = models.ForeignKey(Person, on_delete=models.CASCADE)
    tree_name = models.CharField("Tree name", max_length=255)
    files = models.FileField("Evidence")
    