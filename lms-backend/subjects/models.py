# subjects/models.py
from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=100)
    # Add more fields specific to subjects if needed

    def __str__(self):
        return self.name
