from django.urls import path
from . import views


urlpatterns = [
    path('', views.feedback_list, name='feedback-list'),
    path('create/', views.create_feedback, name='create-feedback'),
    path('<int:feedback_id>/', views.feedback_detail, name='feedback-detail'),
]
