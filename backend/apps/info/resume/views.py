from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import WorkExperience, Education, SkillCategory
from .serializers import WorkExperienceSerializer, EducationSerializer, SkillCategorySerializer

class ResumeViewSet(viewsets.ViewSet):
    """
    Endpoint tổng hợp dữ liệu CV
    GET /api/v1/resume/
    """
    permission_classes = []

    def list(self, request):
        experience = WorkExperience.objects.all()
        education = Education.objects.all()
        skills = SkillCategory.objects.all().prefetch_related('skills')

        return Response({
            "experience": WorkExperienceSerializer(experience, many=True).data,
            "education": EducationSerializer(education, many=True).data,
            "skills": SkillCategorySerializer(skills, many=True).data
        })