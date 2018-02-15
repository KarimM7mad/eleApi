from rest_framework import serializers
from .models import data

class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields =  ('speed','avgSpeed','distance','throttlePosition',)
