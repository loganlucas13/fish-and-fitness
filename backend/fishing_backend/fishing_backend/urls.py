"""
URL configuration for fishing_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path
from fishing_backend.fish_collection import fishmain
from fishing_backend.fish_collection import usermain

#NOTE:
##when you run the server, when you reach http://localhost:8000/
##add the path to the url you want to go to
##eg: http://localhost:8000/fish/ for fish data
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('fish/', fishmain), 
    path('user/', usermain),
]
