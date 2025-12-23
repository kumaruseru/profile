from rest_framework import viewsets
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Chỉ hiển thị bài viết đã Published
    """
    queryset = Post.objects.filter(status='published')
    permission_classes = []
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        return PostDetailSerializer