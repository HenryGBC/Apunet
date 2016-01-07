# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Personal',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('numero_agremiado', models.CharField(max_length=20)),
                ('numero_cedula', models.CharField(max_length=15)),
                ('Apellidos', models.CharField(max_length=100)),
                ('Nombres', models.CharField(max_length=100)),
                ('fecha_nacimiento', models.DateField()),
                ('estado_civil', models.CharField(max_length=20)),
                ('sexo', models.CharField(max_length=15)),
                ('direccion', models.CharField(max_length=200)),
                ('telefono_habitacion', models.CharField(max_length=15)),
                ('celular', models.CharField(max_length=15, null=True, blank=True)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Datos_Academicos',
            fields=[
                ('personal', models.OneToOneField(primary_key=True, serialize=False, to='personal.Personal')),
                ('profesion', models.CharField(max_length=100)),
                ('especialidad', models.CharField(max_length=100)),
                ('resolucion', models.CharField(max_length=50)),
                ('departamento', models.CharField(max_length=100)),
                ('telefono_trabajo', models.CharField(max_length=100)),
                ('fecha_ingreso', models.DateField()),
                ('fecha_retiro', models.DateField(null=True, blank=True)),
                ('condicion_uno', models.CharField(max_length=20)),
                ('condicion_dos', models.CharField(max_length=20, null=True, blank=True)),
                ('condicion_tres', models.CharField(max_length=20, null=True, blank=True)),
                ('condicion_cuatro', models.CharField(max_length=20, null=True, blank=True)),
                ('fecha_jubilacion', models.DateField(null=True, blank=True)),
                ('fecha_cambio_dedicacion', models.DateField(null=True, blank=True)),
                ('fecha_ascenso', models.DateField(null=True, blank=True)),
            ],
        ),
    ]
