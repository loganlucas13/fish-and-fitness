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

from fishing_backend.user_database import create_user, login_user
from fishing_backend.item_databases import (
    request_fishapedia_data,
    request_inventory,
    open_crate,
)
from fishing_backend.quest_distribution import (
    request_quest,
    accept_quest,
    request_update,
)

# NOTE:
##when you run the server, when you reach http://localhost:8000/
##add the path to the url you want to go to
##eg: http://localhost:8000/fish/ for fish data
urlpatterns = [
    # path('admin/', admin.site.urls),
    path("fish/get_data/", request_fishapedia_data),
    path("user/create/", create_user),
    path("user/login/", login_user),
    path("user/get_inventory/", request_inventory),
    path("user/open_crate/", open_crate),
    path("quest/grab/", request_quest),
    path("quest/accept/", accept_quest),
    path("quest/update/", request_update),
]
