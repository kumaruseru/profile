from rest_framework import serializers
from .models import UserProfile, SocialLink

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['platform', 'url', 'display_text', 'icon_class', 'order']

class UserProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)
    avatar_url = serializers.SerializerMethodField()
    cv_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'full_name', 'headline', 'bio', 
            'avatar_url', 'cv_pdf_url', 
            'email', 'location', 
            'is_open_to_work', 'available_for_freelance',
            'social_links'
        ]

    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None

    def get_cv_pdf_url(self, obj):
        if obj.cv_pdf:
            return obj.cv_pdf.url
        return None