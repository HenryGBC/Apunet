# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0003_ayuda_cuotas_familiar'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cargos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cargo', models.CharField(max_length=100)),
                ('periodo', models.CharField(max_length=20)),
                ('personal', models.ForeignKey(to='personal.Personal')),
            ],
        ),
        migrations.CreateModel(
            name='Deportes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('evento', models.CharField(max_length=100)),
                ('disciplina', models.CharField(max_length=100)),
                ('premio', models.CharField(max_length=100)),
                ('personal', models.ForeignKey(to='personal.Personal')),
            ],
        ),
    ]
