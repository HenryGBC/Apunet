# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0009_auto_20150923_0328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personal',
            name='nombres',
        ),
        migrations.AddField(
            model_name='personal',
            name='primer_apellido',
            field=models.CharField(default='non', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='personal',
            name='primer_nombre',
            field=models.CharField(default='nono', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='personal',
            name='segundo_apellido',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='personal',
            name='segundo_nombre',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
