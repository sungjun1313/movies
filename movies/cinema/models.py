import os
import uuid

from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver
from django.db.models import Avg

from movies.users.models import User

def get_img_name(instance, filename):
    _, ext = os.path.splitext(filename)
    return '%s/%s%s' % (datetime.now().strftime('%Y/%m/%d'), str(uuid.uuid4()), ext)

class Cinema(models.Model):
    poster_image = models.ImageField(verbose_name=_('포스터'), upload_to=get_img_name, blank=True, null=True)
    title = models.CharField(verbose_name=_("제목"), max_length=100)
    release = models.DateField(verbose_name=_("개봉날짜"))
    director = models.CharField(verbose_name=_("감독"), max_length=100)
    actor = models.CharField(verbose_name=_("주연"), max_length=200)
    story = models.TextField(verbose_name=_("줄거리"), max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{title}-{director}'.format(title=self.title, director=self.director)

    @property
    def average_grade(self):
        avg = self.cinema_reviews.aggregate(Avg('grade'))['grade__avg']
        if avg:
            return round(avg, 2)
        return 0

    @property
    def total_reviews(self):
        return self.cinema_reviews.count()

    class Meta:
        ordering = ['-id']


class Review(models.Model):
    user = models.ForeignKey(User, verbose_name=_('유저'),on_delete=models.CASCADE, related_name='user_reviews')
    cinema = models.ForeignKey(Cinema, verbose_name=_('영화'), on_delete=models.CASCADE, related_name='cinema_reviews')
    grade = models.IntegerField(verbose_name=_('평점'))
    body = models.TextField(verbose_name=_("후기"), max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{name}-{title}'.format(name=self.user.username, title=self.cinema.title)

    class Meta:
        ordering = ['-id']

@receiver(models.signals.post_delete, sender=Cinema)
def auto_delete_file(sender, instance, **kwargs):
    if instance.poster_image:
        instance.poster_image.delete(save=False)


@receiver(models.signals.pre_save, sender=Cinema)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = Cinema.objects.get(pk=instance.pk).poster_image
    except Cinema.DoesNotExist:
        return False

    new_file = instance.poster_image
    if not old_file == new_file:
        old_file.delete(save=False)

