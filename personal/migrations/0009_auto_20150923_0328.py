# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0008_auto_20150923_0251'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ayuda',
            name='familiar',
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='aporte_fapuv',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='aporte_prev_social',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='pago_aportacion_cercpu',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='pago_mensual_apunet',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='pago_mensual_cercpu',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='cuotas',
            name='pagos_extraordianrios',
            field=models.FloatField(),
        ),
        migrations.DeleteModel(
            name='Ayuda',
        ),
    ]
