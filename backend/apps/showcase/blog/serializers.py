from rest_framework import serializers
from .models import Post, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug']

class PostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'cover_image', 'category', 'published_at']

    def get_cover_image(self, obj):
        return obj.cover_image.url if obj.cover_image else None

class PostDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    cover_image = serializers.SerializerMethodField()
    author_name = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_cover_image(self, obj):
        return obj.cover_image.url if obj.cover_image else None