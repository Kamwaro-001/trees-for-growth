# Generated by Django 4.1.2 on 2022-12-03 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_user_county_user_full_address_user_town_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_address',
        ),
    ]