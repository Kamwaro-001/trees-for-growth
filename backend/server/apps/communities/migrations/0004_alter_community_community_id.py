# Generated by Django 4.1.2 on 2022-11-25 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0003_alter_communitymembers_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='community_id',
            field=models.CharField(max_length=100, unique=True, verbose_name='Community ID'),
        ),
    ]
