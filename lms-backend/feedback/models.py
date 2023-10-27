# feedback/models.py
from django.db import models
from results.models import Result


class Feedback(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    text = models.TextField()
    # Add more fields for feedback analysis if needed

    def __str__(self):
        return f"Feedback for {self.result}"
