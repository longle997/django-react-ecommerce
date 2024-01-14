from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import ProductSerializer, UserSerializer, MyTokenObtainPairSerializer
from .models import *
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError

@api_view(['GET'])
# Create your views here.
def get_routes(request):
    return Response('Hello')

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    products_serializer = ProductSerializer(products, many=True)
    if products_serializer.data:
        return Response(products_serializer.data)
    
    return Response("There are no products!")

@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    product_serializer = ProductSerializer(product, many=False)

    return Response(product_serializer.data)

@api_view(['POST'])
def post_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user(request):
    user = request.user
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
            password=make_password(payload['password']),
        )
    except IntegrityError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    user_serializer = UserSerializer(user, many=False)
    return Response(user_serializer.data, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = MyTokenObtainPairSerializer
