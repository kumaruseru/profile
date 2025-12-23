from rest_framework import serializers
from .models import SiteConfiguration

class SiteConfigurationSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    og_image_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteConfiguration
        fields = [
            'site_name', 'site_description', 'site_keywords',
            'logo_url', 'favicon_url', 'og_image_url',
            'maintenance_mode', 'footer_text'
        ]

    def get_logo_url(self, obj):
        return obj.logo.url if obj.logo else None

    def get_favicon_url(self, obj):
        return obj.favicon.url if obj.favicon else None

    def get_og_image_url(self, obj):
        return obj.og_image.url if obj.og_image else None