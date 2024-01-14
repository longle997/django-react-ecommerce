from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from ..serializers import UserSerializer
from ..models import *
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    user_serializer = UserSerializer(user, many=False)

    return Response(user_serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    user_serializer = UserSerializer(user, many=False)

    return Response(user_serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    user_serializer = UserSerializer(users, many=True)

    return Response(user_serializer.data)

@api_view(['POST'])
def post_user(request):
    payload = request.data
    try:
        user = User.objects.create(
            username=payload['username'],
            email=payload['email'],
            first_name=payload['first_name'],
            password=make_password(payload['password']),
        )
    except IntegrityError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    user_serializer = UserSerializer(user, many=False)
    return Response(user_serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def put_user(request):
    payload = request.data
    user = request.user
    user_serializer = UserSerializer(user, many=False)

    user.first_name = payload['first_name']
    user.username = payload['email']
    user.email = payload['email']

    if payload['password']:
        user.password = make_password(payload['password'])
    
    user.save()

    return Response(user_serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    target_delete_user = User.objects.get(id=pk)
    target_delete_user.delete()

    return Response("User was deleted", status=status.HTTP_200_OK)

@api_view(['PUT'])
def put_user_by_id(request, pk):
    target_update_user = User.objects.get(id=pk)
    payload = request.data

    target_update_user.first_name = payload['userName']
    target_update_user.username = payload['email']
    target_update_user.email = payload['email']
    target_update_user.is_staff = payload['isAdmin']
    
    target_update_user.save()
    
    user_serializer = UserSerializer(target_update_user, many=False)

    return Response(user_serializer.data)
