from django.contrib import admin

# Register your models here.
from personal.models import Personal, Datos_Academicos, Familiar, Cuotas, Cargos, Deportes

admin.site.register(Personal)
admin.site.register(Datos_Academicos)
admin.site.register(Familiar)
admin.site.register(Cuotas)
admin.site.register(Cargos)
admin.site.register(Deportes)