from django.db import models

# Create your models here.
class data(models.Model):
    speed = models.IntegerField()
    avgSpeed = models.IntegerField()
    distance = models.IntegerField()
    throttlePosition = models.IntegerField()

    def __str__(self):
        return "{\"speed\":"+ str(self.speed)+",\"avgSpeed\":"+str(self.avgSpeed)+",\"distance\":"+str(self.distance)+",\"throttlePosition\":"+str(self.throttlePosition)+"}"
                
