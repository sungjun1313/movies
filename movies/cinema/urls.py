from django.urls import path

from movies.cinema.views import (
    CinemaListAPIView,
    CinemaDetailAPIView,
    ReviewCreateAPIView,
    ReviewUpdateAPIView,
    ReviewDeleteAPIView,
)

app_name = "cinema"
urlpatterns = [
    path("", view=CinemaListAPIView.as_view(), name='list'),
    path("detail/<int:pk>/", view=CinemaDetailAPIView.as_view(), name="detail"),
    path("create/review/", view=ReviewCreateAPIView.as_view(), name="create"),
    path("update/review/<int:review_id>/", view=ReviewUpdateAPIView.as_view(), name='update'),
    path("delete/review/<int:review_id>/", view=ReviewDeleteAPIView.as_view(), name='delete'),
]
