from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/v1/projects/
    """
    queryset = Project.objects.filter(is_public=True).order_by('order', '-created_at')
    serializer_class = ProjectSerializer
    permission_classes = []