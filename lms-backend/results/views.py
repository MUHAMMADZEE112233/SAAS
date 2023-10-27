from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Result
from .serializers import ResultSerializer

@api_view(['GET'])
def result_list(request):
    if request.method == 'GET':
        results = Result.objects.all()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def create_result(request):
    if request.method == 'POST':
        serializer = ResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def result_detail(request, result_id):
    result = get_object_or_404(Result, pk=result_id)

    if request.method == 'GET':
        serializer = ResultSerializer(result)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ResultSerializer(result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
