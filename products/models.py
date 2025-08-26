from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.CharField(max_length=1000)
    image = models.CharField(max_length=2083)
    # stock = models.IntegerField()

class Offer(models.Model):
    code = models.CharField(max_length=11)
    description = models.CharField(max_length=255)
    discount = models.FloatField()



