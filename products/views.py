from .models import Product
from django.shortcuts import render

# /products -> index 
# Uniform Resource Locator (Adress)


def index(request):
    products = Product.objects.all()
    return render(request,'index.html',
    {'products':products})


# def base(request):
#     return render(request,'base.html')

