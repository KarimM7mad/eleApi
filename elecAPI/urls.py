"""elecAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from myapp import views as v
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^neferaReadings/speed=(?P<speed>[0-9]+)/avgSpeed=(?P<avgSpeed>[0-9]+)/distance=(?P<distance>[0-9]+)/throttlePosition=(?P<throttlePosition>[0-9]+)/$', v.MicroControllerComm.as_view()),
    url(r'^lastNeferaReadings/$', v.clientComm.as_view()),
    #url(r'^data/', v.dataView.as_view()),
]


"""
 url(r'^transactionHistory/$', views.TransactionHisoryView.as_view()),
    url(r'^transactionHistory/(?P<pk>[0-9]+)/$', views.TransactionHistoryDetailView.as_view()),
"""