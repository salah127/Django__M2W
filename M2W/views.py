from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime




def base(request):
    return render(request,'base.html')


def home(request):
    return render(request,'registration/home.html')


def about(request):
    context = {
        'current_date': datetime.now().strftime('%d %B %Y')
    }
    return render(request, 'about.html', context)

