# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0002_auto_20150919_1810'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cuotas',
            fields=[
                ('personal', models.OneToOneField(primary_key=True, serialize=False, to='personal.Personal')),
                ('pago_mensual_apunet', models.IntegerField()),
                ('pago_mensual_cercpu', models.IntegerField()),
                ('pago_aportacion_cercpu', models.IntegerField()),
                ('aporte_fapuv', models.IntegerField()),
                ('aporte_prev_social', models.IntegerField()),
                ('pagos_extraordianrios', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Familiar',
            fields=[
                ('personal', models.OneToOneField(primary_key=True, serialize=False, to='personal.Personal')),
                ('parentesco', models.CharField(max_length=100)),
                ('carnet', models.CharField(max_length=20)),
                ('cedula', models.CharField(max_length=15)),
                ('apellidos', models.CharField(max_length=100)),
                ('nombres', models.CharField(max_length=100)),
                ('fecha_nacimiento', models.DateField()),
                ('edad', models.IntegerField()),
                ('telefono', models.CharField(max_length=20)),
                ('trabajador_unet', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Ayuda',
            fields=[
                ('familiar', models.OneToOneField(primary_key=True, serialize=False, to='personal.Familiar')),
                ('nivel_educacion', models.CharField(max_length=50)),
            ],
        ),
    ]
