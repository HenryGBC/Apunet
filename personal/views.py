from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
from rest_framework.views import APIView
from personal.models import Personal, Datos_Academicos, Familiar, Cuotas, Cargos, Deportes
from personal.serializers import PersonalSerializer, DatosAcademicosSerializer, FamiliarSerializer, CuotasSerializer, \
    CargoSerializer, DeporteSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics

from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class SessionCsrfExemptAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening

#Pagination Personal And View of Personal
class SetPagination(PageNumberPagination):
    page_size = 50

class PersonalViewSet(viewsets.ModelViewSet):
    serializer_class = PersonalSerializer
    queryset = Personal.objects.all()
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)




#Create Datos Academicos

class DatosAcademicosCreate(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        serializer = DatosAcademicosSerializer(data=request.data)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Get/Put/delete  Datos Academicos Passing Pk from personal
class DatosAcademicosDetail(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            personal = Personal.objects.get(pk=pk)
            return Datos_Academicos.objects.get(personal=personal)
        except Datos_Academicos.DoesNotExist:Bu
            raise Http404

    def get(self, request, pk, format=None):
        datos = self.get_object(pk)
        serializer = DatosAcademicosSerializer(datos)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        datos = self.get_object(pk)
        serializer = DatosAcademicosSerializer(datos, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        datos = self.get_object(pk)
        datos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#Create Familiar for personal
class FamiliarCreate(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        serializer = FamiliarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#List of Familiares segun personal
class FamiliarList(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            personal = Personal.objects.get(pk=pk)
            familiares = Familiar.objects.filter(personal=personal)
            print familiares
            return familiares
        except Familiar.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        familiares = self.get_object(pk)
        print familiares
        serializer = FamiliarSerializer(familiares, many=True)
        return Response(serializer.data)

#Get/Put/delete Familiar

class FamiliarDetail(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            return Familiar.objects.get(pk=pk)
        except Familiar.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        familiar = self.get_object(pk)
        serializer = FamiliarSerializer(familiar)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        familiar = self.get_object(pk)
        serializer = FamiliarSerializer(familiar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        familiar = self.get_object(pk)
        familiar.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#CUotas


class CuotasCreate(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        serializer = CuotasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CuotasDetail(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            personal = Personal.objects.get(pk=pk)
            return Cuotas.objects.get(personal=personal)
        except Cuotas.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cuotas = self.get_object(pk)
        serializer = CuotasSerializer(cuotas)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cuotas = self.get_object(pk)
        serializer = CuotasSerializer(cuotas, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cuotas = self.get_object(pk)
        cuotas.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#Cargos

class CargoCreate(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        serializer = CargoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CargoList(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            personal = Personal.objects.get(pk=pk)
            cargos = Cargos.objects.filter(personal=personal)
            return cargos
        except Cargos.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cargos = self.get_object(pk)
        serializer = CargoSerializer(cargos, many=True)
        return Response(serializer.data)

#Get/Put/delete Cargos

class CargoDetail(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            return Cargos.objects.get(pk=pk)
        except Cargos.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        cargos = self.get_object(pk)
        serializer = CargoSerializer(cargos)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cargo = self.get_object(pk)
        serializer = CargoSerializer(cargo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cargo = self.get_object(pk)
        cargo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Deportes

class DeporteCreate(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def post(self, request, format=None):
        serializer = DeporteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeporteList(APIView):
    def get_object(self, pk):
        try:
            personal = Personal.objects.get(pk=pk)
            deportes = Deportes.objects.filter(personal=personal)
            return deportes
        except Deportes.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        deportes = self.get_object(pk)
        serializer = DeporteSerializer(deportes, many=True)
        return Response(serializer.data)

#Get/Put/delete Deporttes

class DeporteDetail(APIView):
    authentication_classes = (SessionCsrfExemptAuthentication, BasicAuthentication)
    def get_object(self, pk):
        try:
            return Deportes.objects.get(pk=pk)
        except Deportes.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        deportes = self.get_object(pk)
        serializer = DeporteSerializer(deportes)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        deporte = self.get_object(pk)
        serializer = DeporteSerializer(deporte, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        deporte = self.get_object(pk)
        deporte.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#Home

def home(request):
    template = "index.html"
    if request.method == 'POST':
        usuario = request.POST['username']
        clave = request.POST['password']
        print clave
        print usuario
        user = authenticate(username=usuario, password=clave)
        print user
        if user is not None:
            if user.is_active:
                print("User is valid, active and authenticated")
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                print("The password is valid, but the account has been disabled!")
        else:
            print("The username and password were incorrect.")
        return  render(request, template, locals())

    return  render(request, template, locals())

