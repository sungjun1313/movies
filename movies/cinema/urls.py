from django.urls import path

from movies.cinema.views import (
    CinemaListAPIView,
    CinemaDetailAPIView,
)

app_name = "cinema"
urlpatterns = [
    path("", view=CinemaListAPIView.as_view(), name='list'),
    path("detail/<int:pk>/", view=CinemaDetailAPIView.as_view(), name="detail"),
]
