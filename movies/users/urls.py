from django.urls import path

from movies.users.views import (
    user_redirect_view,
    user_update_view,
    user_detail_view,
    CustomRegisterView,
    ChangeProfileView
)

app_name = "users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("register/", CustomRegisterView.as_view(), name='register'),
    path("change/", ChangeProfileView.as_view(), name="change"),
    #path("<str:username>/", view=user_detail_view, name="detail"),
]
