from django.urls import path
from ..group_views import user_views as views


urlpatterns = [
    path('get-user-profile', views.get_user, name='get_user_profile'),
    path('get-users', views.get_users, name='get_users'),
    path('register-user', views.post_user, name='register_user'),
    path('update-user-profile', views.put_user, name='update_user'),
    path('delete-user/<str:pk>', views.delete_user, name='delete_user'),
    path('get-user/<str:pk>', views.get_user_by_id, name='get_user_by_id'),
    path('update-user-by-id/<str:pk>', views.put_user_by_id, name='update_user_by_id')
]
