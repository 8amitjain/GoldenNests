# Generated by Django 3.1.3 on 2021-10-10 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0002_auto_20211004_1704'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='roombooked',
            options={'ordering': ('-check_in',)},
        ),
        migrations.AddField(
            model_name='roombooked',
            name='seen',
            field=models.BooleanField(default=False),
        ),
    ]
