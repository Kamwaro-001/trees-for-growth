# Generated by Django 4.1.2 on 2022-12-02 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0002_alter_community_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='community',
            unique_together={('name', 'region')},
        ),
        migrations.RemoveField(
            model_name='community',
            name='community_id',
        ),
    ]
