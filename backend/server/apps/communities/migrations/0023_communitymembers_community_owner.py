# Generated by Django 4.1.2 on 2023-01-12 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0022_alter_communitymembers_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='communitymembers',
            name='community_owner',
            field=models.CharField(default='unknown', max_length=150, verbose_name='Community created by'),
        ),
    ]
