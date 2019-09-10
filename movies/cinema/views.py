from django.db.models import Q


from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.serializers import ValidationError


from .models import Cinema, Review
from .serializers import CinemaListSerializer, CinemaDetailSerializer, ReviewSerializer


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
    #permission_classes = [AllowAny]#임시 django-debug 테스트용

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        #serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ReviewCreateAPIView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            existing_review = Review.objects.get(user__id=request.user.id, cinema__id=request.data['cinema_id'])
            #return Response(data={'detail': '이미 작성한 리뷰가 있습니다,'},status=status.HTTP_304_NOT_MODIFIED)
            raise ValidationError("이미 작성한 리뷰가 있습니다.")
        except Review.DoesNotExist:
            try:
                data = request.data
                cinema=Cinema.objects.get(id=data['cinema_id'])

                new_review = Review.objects.create(
                    user=request.user,
                    cinema=cinema,
                    grade=data['grade'],
                    body=data['body'],
                )

                serializer = ReviewSerializer(new_review, context={'request': request})
                return Response(data={"review":serializer.data, "avg":cinema.average_grade, "count":cinema.total_reviews}, status=status.HTTP_201_CREATED)
            except Cinema.DoesNotExist:
                raise ValidationError("존재하지 않은 게시글입니다.")


class ReviewUpdateAPIView(APIView):
    def put(self, request, review_id, *args, **kwargs):
        try:
            review = Review.objects.select_related('cinema').get(id=review_id)
            data = request.data
            if int(data['cinema_id']) != int(review.cinema.id) or int(request.user.id) != int(review.user.id):
                raise ValidationError("권한이 없습니다.")
            review.grade = data['grade']
            review.body = data['body']
            review.save()
            serializer = ReviewSerializer(review, context={'request': request})
            return Response(data={"review":serializer.data, "avg":review.cinema.average_grade, "count": review.cinema.total_reviews}, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            raise ValidationError("존재하지 않는 리뷰입니다.")


class ReviewDeleteAPIView(APIView):
    def delete(self, request, review_id, *args, **kwargs):
        try:
            review = Review.objects.select_related('cinema').get(id=review_id)
            data = request.data
            if int(data['cinema_id']) != int(review.cinema.id) or int(request.user.id) != int(review.user.id):
                raise ValidationError("권한이 없습니다.")
            review.delete()
            return Response(data={"avg":review.cinema.average_grade, "count":review.cinema.total_reviews},status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            raise ValidationError("존재하지 않는 리뷰입니다.")
