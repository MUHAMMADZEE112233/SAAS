# students/models.py
from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    # Add more student-related fields (e.g., student ID, contact information, etc.)

    def __str__(self):
        return self.name
