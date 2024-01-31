from django.urls import path
from ..group_views import product_views as views


urlpatterns = [
    path("", views.get_products, name="products"),
    path("get-product/<str:pk>", views.get_product, name="product"),
    path("update-product/add-product", views.post_product, name="post_product"),
    path("delete-product/<str:pk>", views.delete_product, name="delete_product"),
    path("update-product-by-id/<str:pk>", views.put_product, name="put_product"),
    path("update-product/image-upload", views.upload_image, name="upload_image"),
    path("update-product/<str:pk>/review", views.create_product_review, name="create_product_review"),
    path("get-product-review/<str:pk>", views.get_product_review, name="get_product_review")
]
