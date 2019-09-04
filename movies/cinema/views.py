from django.db.models import Q


from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from .models import Cinema, Review
from .serializers import CinemaListSerializer, CinemaDetailSerializer


# Create your views here.
"""
get /movies/ 또는 /movies/?page=1 또는 /movies/?page=1&search=마더
queryset이 없을 경우 count: 0, next: null, previous: null, results: []
queryset 있을 경우 results => average_grade 없는 경우 null
"""
class CinemaListAPIView(generics.ListAPIView):
    serializer_class = CinemaListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = Cinema.objects.filter(Q(title__icontains=search) | Q(director__icontains=search) | Q(actor__icontains=search)).distinct()
        else:
            queryset = Cinema.objects.all()
        return queryset

"""
get token 필요 /movies/detail/1/
"""
class CinemaDetailAPIView(generics.RetrieveAPIView):
    queryset = Cinema.objects.prefetch_related('cinema_reviews__user').all()#DB 최적화
    serializer_class = CinemaDetailSerializer
    permission_classes = [AllowAny]#임시 django-debug 테스트용

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        #serializer = self.get_serializer(instance, context={'request': request})
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
