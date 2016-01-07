# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0011_remove_personal_apellidos'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cuotas',
            old_name='pagos_extraordianrios',
            new_name='pagos_extraordinarios',
        ),
    ]
