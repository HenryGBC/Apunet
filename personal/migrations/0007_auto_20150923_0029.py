# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20150922_2317'),
    ]

    operations = [
        migrations.AddField(
            model_name='familiar',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, default=1, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='familiar',
            name='personal',
            field=models.ForeignKey(to='personal.Personal'),
        ),
    ]
