from django.urls import path
from ..group_views import order_views

urlpatterns = [
    path('post-shipping-address', order_views.post_address, name='post_address'),
    path('post-order', order_views.post_order, name='post_order'),
    path('get-order/<str:pk>', order_views.get_order, name='get_order'),
    path('get-order/<str:pk>/pay', order_views.update_order_pay, name='update_order_pay'),
    path('get-order/<str:pk>/delivered', order_views.update_order_delivered, name='update_order_delivered'),
    path('get-orders', order_views.get_orders_list, name='get_orders_list'),
    path('get-all-orders', order_views.get_all_orders_list, name='get_all_orders_list'),
]
