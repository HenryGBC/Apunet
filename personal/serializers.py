from rest_framework import serializers
from personal.models import Personal, Datos_Academicos, Familiar, Cuotas, Cargos, Deportes


class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields =  ('id',
                   'numero_agremiado',
                   'numero_cedula',
                   'primer_nombre',
                   'segundo_nombre',
                   'primer_apellido',
                   'segundo_apellido',
                   'fecha_nacimiento',
                   'estado_civil',
                   'sexo',
                   'direccion',
                   'telefono_habitacion',
                   'celular',
                   'email')

class DatosAcademicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datos_Academicos
        fields = (  'personal',
                    'profesion',
                    'especialidad',
                    'resolucion',
                    'departamento',
                    'telefono_trabajo',
                    'fecha_ingreso',
                    'fecha_retiro',
                    'condicion_uno',
                    'condicion_dos',
                    'condicion_tres',
                    'condicion_cuatro',
                    'fecha_jubilacion',
                    'fecha_cambio_dedicacion',
                    'fecha_ascenso',)


    def create(self, validated_data):
        personal = Personal.objects.get(pk=validated_data['personal'])
        validated_data['personal'] = personal
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        personal = Personal.objects.get(pk=validated_data['personal'])
        validated_data['personal'] = personal
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class FamiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Familiar
        fields =(   'id',
                    'personal',
                    'parentesco',
                    'carnet',
                    'cedula',
                    'apellidos',
                    'nombres',
                    'fecha_nacimiento',
                    'edad',
                    'telefono',
                    'trabajador_unet',
                    'ayuda_academica',
                    'nivel_educacion')


class CuotasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuotas
        fields = (  'personal',
                    'pago_mensual_apunet',
                    'pago_mensual_cercpu',
                    'pago_aportacion_cercpu',
                    'aporte_fapuv',
                    'aporte_prev_social',
                    'pagos_extraordinarios',
                  )

    def create(self, validated_data):
        personal = Personal.objects.get(pk=validated_data['personal'])
        validated_data['personal'] = personal
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        personal = Personal.objects.get(pk=validated_data['personal'])
        validated_data['personal'] = personal
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance




class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargos
        fields = ('id', 'personal', 'cargo', 'periodo')

class DeporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deportes
        fields = ('id', 'personal', 'evento', 'disciplina', 'premio')
