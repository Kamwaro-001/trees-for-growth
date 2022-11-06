from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField(unique=True) 
    phonenumber = models.CharField("Phone number", unique=True, max_length=40)

    def __str__(self):
        return self.first_name