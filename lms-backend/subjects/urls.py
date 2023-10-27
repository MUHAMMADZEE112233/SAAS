from django.urls import path
from . import views

urlpatterns = [
    path('', views.subject_list, name='subject-list'),
    path('create/', views.create_subject, name='create-subject'),
    path('<int:subject_id>/', views.subject_detail, name='subject-detail'),
]
