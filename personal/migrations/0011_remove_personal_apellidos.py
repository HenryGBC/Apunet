# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0010_auto_20150925_2252'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personal',
            name='apellidos',
        ),
    ]
