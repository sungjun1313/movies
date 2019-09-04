from rest_framework import serializers


from .models import Cinema, Review
from movies.users.serializers import BasicUserSerializer


class InputReviewSerializer(serializers.ModelSerializer):
    #나머지 필드는 save(user=user, cinema=cinema)
    class Meta:
        model = Review
        fields = (
            'grade',
        )




class ReviewSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)
    #isMine = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = (
            'id',
            'user',
            'cinema',
            'grade',
            #'isMine',
            'created',
            'modified'
        )

    """
    id로 비교하는 것이 낫다.
    def get_isMine(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj.id == request.user.id:
                return True
        return False
    """

#Listview에서는 prefetch 안 써도 됨
class CinemaListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cinema
        fields = (
            'poster_image',
            'title',
            'release',
            'director',
            'actor',
            'average_grade',
            'id',
        )

class CinemaDetailSerializer(serializers.ModelSerializer):

    cinema_reviews = ReviewSerializer(many=True, read_only=True)
    #cinema_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Cinema
        fields = (
            'id',
            'poster_image',
            'title',
            'release',
            'director',
            'actor',
            'average_grade',
            'cinema_reviews'
        )

    """
    def __init__(self, *args, **kwargs):
        super(CinemaDetailSerializer, self).__init__(*args, **kwargs)
        if self.context['request']:
            self.request = self.context['request']
    """




