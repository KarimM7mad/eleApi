from django.shortcuts import render
from rest_framework.views import APIView,Response
from rest_framework import generics,status
from .models import data
from .serializers import dataSerializer
# Create your views here.
class dataView(generics.ListCreateAPIView):
    serializer_class=dataSerializer
    queryset = data.objects.all()
    # pk_url_kwarg = 'pk'
# class datalistView(generics.ListAPIView):
# 	serializer_class=dataSerializer
# 	queryset = data.objects.all()


class showData(APIView):
    def get(self,request,speed,avgSpeed,distance,throttlePosition,format=None):
        reading =data.objects.create(speed = speed,avgSpeed=avgSpeed,distance=distance,throttlePosition=throttlePosition)
        reading.save()
        return Response(reading.data,status=status.HTTP_200_OK)  
