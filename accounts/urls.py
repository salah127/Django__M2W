from django.urls import path
from . import views


urlpatterns = [
    # use the signup function in accounts.views (keeps views in views.py)
    path("signup/", views.signup, name="signup"),
    path('signin/', views.signin, name="signin"),
    path('signout/', views.signout, name="signout"),
]