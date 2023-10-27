# results/models.py
from django.db import models
from students.models import Student
from subjects.models import Subject


class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    result_feedback = models.TextField()
    # Add more fields if needed

    def __str__(self):
        return f"{self.student.name} - {self.subject.name}"
