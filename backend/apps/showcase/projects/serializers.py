from rest_framework import serializers
from .models import Project, ProjectTag

class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ['name', 'color']

class ProjectSerializer(serializers.ModelSerializer):
    tags = ProjectTagSerializer(many=True, read_only=True)
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 
            'thumbnail_url', 'demo_url', 'repo_url', 
            'tags', 'is_featured', 'created_at'
        ]

    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            return obj.thumbnail.url
        return None