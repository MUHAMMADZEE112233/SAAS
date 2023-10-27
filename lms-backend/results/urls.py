from django.urls import path
from . import views

urlpatterns = [
    path('', views.result_list, name='result-list'),
    path('create/', views.create_result, name='create-result'),
    path('<int:result_id>/', views.result_detail, name='result-detail'),
]
