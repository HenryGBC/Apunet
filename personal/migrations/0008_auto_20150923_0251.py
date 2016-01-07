# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0007_auto_20150923_0029'),
    ]

    operations = [
        migrations.AddField(
            model_name='familiar',
            name='ayuda_academica',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='familiar',
            name='nivel_educacion',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
