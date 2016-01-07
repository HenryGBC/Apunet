from django.db import models

# Create your models here.


class Personal(models.Model):
    numero_agremiado = models.CharField(max_length=20)
    numero_cedula = models.CharField(max_length=15)
    primer_nombre = models.CharField(max_length=20)
    segundo_nombre = models.CharField(max_length=20, blank=True, null=True)
    primer_apellido = models.CharField(max_length=20)
    segundo_apellido = models.CharField(max_length=20, blank=True, null=True)
    fecha_nacimiento = models.DateField()
    estado_civil = models.CharField(max_length=20)
    sexo = models.CharField(max_length=15)
    direccion = models.CharField(max_length=200)
    telefono_habitacion = models.CharField(max_length=15)
    celular = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField()

    def __str__(self):
        return self.numero_cedula

class Datos_Academicos(models.Model):
    personal = models.OneToOneField(Personal, primary_key=True)
    profesion = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    resolucion = models.CharField(max_length=50)
    departamento = models.CharField(max_length=100)
    telefono_trabajo = models.CharField(max_length=100)
    fecha_ingreso = models.DateField()
    fecha_retiro = models.DateField(blank=True, null=True)
    condicion_uno = models.CharField(max_length=20)
    condicion_dos= models.CharField(max_length=20, blank=True, null=True)
    condicion_tres = models.CharField(max_length=20, blank=True, null=True)
    condicion_cuatro = models.CharField(max_length=20, blank=True, null=True)
    fecha_jubilacion = models.DateField(blank=True, null=True)
    fecha_cambio_dedicacion = models.DateField(blank=True, null=True)
    fecha_ascenso= models.DateField(blank=True, null=True)


    def __str__(self):
        return  self.personal.primer_nombre

class Familiar(models.Model):
    personal = models.ForeignKey(Personal)
    parentesco = models.CharField(max_length=100)
    carnet = models.CharField(max_length=20)
    cedula = models.CharField(max_length=15)
    apellidos = models.CharField(max_length=100)
    nombres = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    edad = models.IntegerField()
    telefono = models.CharField(max_length=20)
    trabajador_unet= models.BooleanField()
    ayuda_academica = models.BooleanField()
    nivel_educacion = models.CharField(max_length=50, blank=True, null=True)


    def __str__(self):
        return self.nombres



class Cuotas(models.Model):
    personal = models.OneToOneField(Personal, primary_key=True)
    pago_mensual_apunet = models.FloatField()
    pago_mensual_cercpu = models.FloatField()
    pago_aportacion_cercpu = models.FloatField()
    aporte_fapuv = models.FloatField()
    aporte_prev_social = models.FloatField()
    pagos_extraordinarios = models.FloatField()

    def __str__(self):
        return self.personal.primer_nombre

class Cargos(models.Model):
    personal = models.ForeignKey(Personal)
    cargo = models.CharField(max_length=100)
    periodo = models.CharField(max_length=20)

    def __str__(self):
        return self.personal.primer_nombre

class Deportes(models.Model):
    personal = models.ForeignKey(Personal)
    evento = models.CharField(max_length=100)
    disciplina= models.CharField(max_length=100)
    premio = models.CharField(max_length=100)

    def __str__(self):
        return self.personal.primer_nombre
