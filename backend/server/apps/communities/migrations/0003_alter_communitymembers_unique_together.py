# Generated by Django 4.1.2 on 2022-11-25 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0002_alter_community_name'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='communitymembers',
            unique_together={('user', 'member_to')},
        ),
    ]
