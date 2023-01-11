from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timesince import timesince
import pandas as pd
import datetime
from django.utils.timezone import now


# Create your models here.

Person = get_user_model()


class User(models.Model):
    first_name = models.CharField(
        "First name", max_length=255, default="unknown")
    last_name = models.CharField(
        "Last name", max_length=255, default="unknown")
    email = models.EmailField(unique=True)
    username = models.ForeignKey(Person, on_delete=models.CASCADE)
    phonenumber = models.CharField("Phone number", unique=True, max_length=40)
    county = models.CharField("County", max_length=50, default="unknown")
    town = models.CharField("Town", max_length=50, default="unknown")

    def save(self, *args, **kwargs):
        for field_name in ['first_name', 'last_name', 'county', 'town']:
            val = getattr(self, field_name, False)
            if val:
                setattr(self, field_name, val.capitalize())
        super(User, self).save(*args, **kwargs)


class TreeInfo(models.Model):
    username = models.ForeignKey(Person, on_delete=models.CASCADE)
    tree_name = models.CharField("Tree name", max_length=255)
    more_info = models.TextField(
        "Additional information", default="No additional information given", max_length=255, null=True)
    files = models.FileField("Evidence", null=True)

    def save(self, *args, **kwargs):
        for field_name in ['tree_name', 'more_info']:
            val = getattr(self, field_name, False)
            if val:
                setattr(self, field_name, val.capitalize())
        super(TreeInfo, self).save(*args, **kwargs)


class Contact(models.Model):
    name = models.CharField("Your Name", max_length=100)
    date = models.DateField("Date", auto_now_add=True)
    email = models.CharField("Your Email", max_length=100)
    subject = models.CharField("Subject", max_length=100)
    message = models.TextField("Message", max_length=255)

    def save(self, *args, **kwargs):
        for field_name in ['name', 'subject', 'message']:
            val = getattr(self, field_name, False)
            if val:
                setattr(self, field_name, val.capitalize())
        super(Contact, self).save(*args, **kwargs)


def get_time():
    timestamp = pd.Timestamp(datetime.datetime(2023, 1, 9))
    curr = timestamp.today()
    time = f'{curr.day_name()}, {curr.date()} at {curr.time().strftime("%H:%M:%S")}'
    return time


status_choices = (
    ('unread', 'unread'),
    ('read', 'read')
)


class Notifications(models.Model):
    username = models.CharField("Username", max_length=255)
    title = models.CharField("Notification Title", max_length=255)
    status = models.CharField("Status", max_length=255,
                              choices=status_choices, default=status_choices[0][0])
    when = models.DateTimeField(default=now())
    time_sent = models.CharField("Time sent", max_length=150)

    def save(self, *args, **kwargs):
        # setattr(self, 'time_sent', get_time())
        
        # if self.when:
        setattr(self, 'time_sent', timesince(self.when))
        # else:
        #     setattr(self, 'time_sent', '')

        super(Notifications, self).save(*args, **kwargs)
