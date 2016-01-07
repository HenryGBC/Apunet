# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0005_auto_20150922_0329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datos_academicos',
            name='personal',
            field=models.OneToOneField(primary_key=True, serialize=False, to='personal.Personal'),
        ),
    ]
