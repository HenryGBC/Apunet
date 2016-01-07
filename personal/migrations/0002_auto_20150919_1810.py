# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='personal',
            old_name='Apellidos',
            new_name='apellidos',
        ),
        migrations.RenameField(
            model_name='personal',
            old_name='Nombres',
            new_name='nombres',
        ),
    ]
