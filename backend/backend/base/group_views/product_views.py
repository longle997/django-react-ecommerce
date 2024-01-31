from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..serializers import ProductSerializer, ReviewSerializer
from ..models import *
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


@api_view(['GET'])
def get_products(request):
    key_word = request.GET.get('keyWord')
    if key_word:
        products = Product.objects.filter(name__icontains=key_word)
    else:
        products = Product.objects.all()
    
    page = request.query_params.get('page')
    paginator = Paginator(products, 2)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
        page = None
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if not page:
        page = 1
    
    page = int(page)

    products_serializer = ProductSerializer(products, many=True) if products else None        
    
    if products_serializer and products_serializer.data:
        return Response({'products': products_serializer.data, 'page': page, 'pages': paginator.num_pages})
    else:
        return Response({'products': [], 'page': 1, 'pages': 1})

@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    product_serializer = ProductSerializer(product, many=False)

    return Response(product_serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def post_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    target_product = Product.objects.get(_id=pk)
    target_product.delete()
    return Response("Product was deleted", status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def put_product(request, pk):
    product = Product.objects.get(_id=pk)

    payload = request.data

    product.name = payload['name']
    product.price = payload['price']
    product.brand = payload['brand']
    product.category = payload['category']
    product.countInStock = payload['countInStock']
    product.description = payload['description']
    product.rating = payload['rating']

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def upload_image(request):
    data = request.data
    product = Product.objects.get(_id=data['product_id'])

    product.image = request.FILES.get('image')
    product.save()
    product_serializer = ProductSerializer(product, many=False)

    return Response(product_serializer.data['image'])

@api_view(['POST'])
def create_product_review(request, pk):
    data = request.data
    user = request.user
    product = Product.objects.get(_id=pk)

    #1 - validate is the review exists
    try:
        is_review_exists = Review.objects.get(user=user, product=product)
    except Review.DoesNotExist:
        is_review_exists = None
    # is_review_exists = Product.review_set.get(user=user).exists()
    if is_review_exists:
        return Response('You already write a review for this product!', status=status.HTTP_400_BAD_REQUEST)
    #2 - validate is the rating is 0
    elif data.get('rating') == 0:
        return Response('Rating for a review must be larger than zero!', status=status.HTTP_400_BAD_REQUEST)
    #3 - create review - update number of review and rating
    review = Review.objects.create(
        product=product,
        rating=data.get('rating'),
        user=user,
        name=user.first_name,
        comment=data.get('comment')
    )

    reviews = Review.objects.filter(product=product)
    product.numReview = len(reviews)

    rating = 0
    for review in reviews:
        rating += review.rating
    
    product.rating = rating / len(reviews)
    product.save()

    return Response('Product has been reviewed', status=status.HTTP_200_OK)

@api_view(['GET'])
def get_product_review(request, pk):
    product = Product.objects.get(_id=pk)
    reviews = Review.objects.filter(product=product)

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
