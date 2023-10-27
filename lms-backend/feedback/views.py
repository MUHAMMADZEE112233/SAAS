from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer


@api_view(['GET'])
def feedback_list(request):
    if request.method == 'GET':
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def create_feedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def feedback_detail(request, feedback_id):
    feedback = get_object_or_404(Feedback, pk=feedback_id)

    if request.method == 'GET':
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FeedbackSerializer(feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        feedback.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
