import os
import uuid

from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver

def get_img_name(instance, filename):
    _, ext = os.path.splitext(filename)
    return '%s/%s%s' % (datetime.now().strftime('%Y/%m/%d'), str(uuid.uuid4()), ext)



class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("이름"), blank=True, max_length=255)
    profile_image = models.ImageField(_("프로필사진"), blank=True, null=True, upload_to=get_img_name)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    class Meta:
        ordering = ['-id']

@receiver(models.signals.pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = User.objects.get(pk=instance.pk).profile_image
    except User.DoesNotExist:
        return False
    new_file = instance.profile_image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)

@receiver(models.signals.post_delete, sender=User)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.profile_image:
        if os.path.isfile(instance.profile_image.path):
            os.remove(instance.profile_image.path)
