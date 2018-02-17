from django.shortcuts import render
from rest_framework.views import APIView,Response
from rest_framework import generics,status
from .models import data
from .serializers import dataSerializer
# Create your views here.
class dataView(generics.ListCreateAPIView):
    serializer_class=dataSerializer
    queryset = data.objects.all()
    
#communication between MicroController and Server
class MicroControllerComm(APIView):
    def get(self,request,speed,avgSpeed,distance,throttlePosition,format=None):
        reading = data.objects.create(speed = speed,avgSpeed=avgSpeed,distance=distance,throttlePosition=throttlePosition)
        reading.save()
        return Response(dataSerializer(reading).data, status=status.HTTP_200_OK)

#communication between Server and webpage/mobile view
class clientComm(APIView):
    def get(self,request):
        reading = data.objects.last()
        
        return Response(dataSerializer(reading).data, status=status.HTTP_200_OK)
