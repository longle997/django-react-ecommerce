from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..serializers import ShippingAddressSerializer, OrderSerializer
from ..models import *
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
def post_address(request):
    serializer = ShippingAddressSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_order(request):
    user = request.user
    data = request.data
    # (0) check if order is empty => return 400 error status
    # (1) create order
    order_rec = Order.objects.create(
        user = user,
        paymentMethod = data['paymentMethod'],
        taxPrice = data['taxPrice'],
        shippingPrice = data['shippingPrice'],
        totalPrice = data['totalCost']
    )
    # (2) create shipping address

    shipping_address = ShippingAddress.objects.create(
        order = order_rec,
        address = data['shippingAddress']['address'],
        city = data['shippingAddress']['city'],
        postalCode = data['shippingAddress']['postalCode'],
        country = data['shippingAddress']['country'],
        shippingPrice = data['shippingPrice']
    )
    # (3) create order items
    for item in data['orderItems']:
        product_rec = Product.objects.get(_id=item['product'])

        order_items = OrderItem.objects.create(
            product = product_rec,
            order = order_rec,
            name = item['name'],
            qty = item['qty'],
            price = item['price'],
            image = product_rec.image.url
        )
        # (4) update product count in stock
        product_rec.countInStock -= int(item['qty'])
        product_rec.save()

    serializer = OrderSerializer(order_rec)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("You are not allow to access this order!", status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response("Order is not exist!", status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_pay(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    try:
        if order.user == user:
            order.isPaid = True
            order.paidAt = datetime.now()
            order.save()
            return Response("Order is paid", status=status.HTTP_200_OK)
        else:
            return Response("You are not allow to access this order!", status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response("Order is not exist!", status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_delivered(request, pk):
    order = Order.objects.get(_id=pk)
    try:
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()
        return Response("Order is delivered", status=status.HTTP_200_OK)
    except:
        return Response("Order is not exist!", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders_list(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many='True')
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_orders_list(request):
    orders = Order.objects.filter().order_by('-createAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
