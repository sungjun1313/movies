from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import filesizeformat
from django.conf import settings

from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from .models import User

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'profile_image',
            'username',
            'name',
            'email',
            'id',
            'date_joined',
            'last_login'
        )


class SignUpSerializer(RegisterSerializer):

    name = serializers.CharField(required=True, write_only=True)
    profile_image = serializers.ImageField(required=False, write_only=True)

    def validate_name(self, name):
        name = name
        if not name:
            raise serializers.ValidationError(_("이름은 필수항목입니다."))
        return name

    def validate_profile_image(self, profile_image):
        print('ccc')
        profile_image = profile_image
        if profile_image:
            content_type = profile_image.content_type.split('/')[0]#content-type(ex image/jpg)에서 image만 끄집어낸다
            if content_type in settings.CONTENT_TYPES:
                if int(profile_image.size) > int(settings.MAX_UPLOAD_SIZE):
                    raise serializers.ValidationError(_("%s 보다 큰 파일은 저장할 수 없습니다.") % (filesizeformat(settings.MAX_UPLOAD_SIZE)))
            else:
                raise serializers.ValidationError(_("이미지 파일만 저장할 수 있습니다."))
        return profile_image



    def get_cleaned_data(self):
        print(self.validated_data.get('name', ''))
        return {
            'name': self.validated_data.get('name', ''),
            'profile_image': self.validated_data.get('profile_image', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        print(self.cleaned_data)
        user.name = self.cleaned_data.get('name', '')
        user.profile_image = self.cleaned_data.get('profile_image', '')
        user.save()
        return user

class ChangeProfileSerializer(serializers.ModelSerializer):
    def validate_name(self, name):
        name = name
        if not name:
            raise serializers.ValidationError(_("이름은 필수항목입니다."))
        return name

    def validate_email(self, email):
        email = email
        if not email:
            raise serializers.ValidationError(_("이메일은 필수항목입니다."))
        users = User.objects.filter(email=email)
        if users:
            if self.instance not in users:
                raise serializers.ValidationError(_("이메일이 중복되었습니다"))
        return email


    def validate_profile_image(self, profile_image):
        print('ccc')
        profile_image = profile_image
        if profile_image:
            content_type = profile_image.content_type.split('/')[0]#content-type(ex image/jpg)에서 image만 끄집어낸다
            if content_type in settings.CONTENT_TYPES:
                if int(profile_image.size) > int(settings.MAX_UPLOAD_SIZE):
                    raise serializers.ValidationError(_("%s 보다 큰 파일은 저장할 수 없습니다.") % (filesizeformat(settings.MAX_UPLOAD_SIZE)))
            else:
                raise serializers.ValidationError(_("이미지 파일만 저장할 수 있습니다."))
        return profile_image

    class Meta:
        model = User
        fields = (
            'name',
            'email',
            'profile_image'
        )


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'profile_image',
            'id'
        )
        read_only_fields = (
            'username',
            'profile_image',
            'id'
        )
