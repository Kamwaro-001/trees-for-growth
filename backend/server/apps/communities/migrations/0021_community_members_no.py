# Generated by Django 4.1.2 on 2023-01-07 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0020_alter_communitymembers_unique_together_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='members_no',
            field=models.IntegerField(default=0, verbose_name='Number of members'),
        ),
    ]
