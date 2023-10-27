from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_list, name='student-list'),
    path('create/', views.create_student, name='create-student'),
    path('<int:student_id>/', views.student_detail, name='student-detail'),
]
