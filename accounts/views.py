from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.conf import settings


signin_page = 'registration/signin.html'
home_page = 'registration/home.html'


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created. Please sign in.')
            return redirect('signin')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})


# Optional class-based sign up view (kept for flexibility):


class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('signin')
    template_name = 'registration/signup.html'

def signin(request):
    if request.method == "POST":
        username = request.POST.get('username', False)
        password = request.POST.get('password', False)
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            return HttpResponseRedirect( settings.LOGIN_REDIRECT_URL )
    return render(request, signin_page)


def signout(request):
    logout(request)
    return redirect('/')




