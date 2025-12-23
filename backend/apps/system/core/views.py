from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Import Models & Serializers của Core
from .models import SiteConfiguration
from .serializers import SiteConfigurationSerializer

# Import Models & Serializers từ các App khác (để gom data cho trang chủ)
from apps.info.personal.models import UserProfile
from apps.info.personal.serializers import UserProfileSerializer
from apps.info.resume.models import WorkExperience, Education, SkillCategory
from apps.info.resume.serializers import WorkExperienceSerializer, EducationSerializer, SkillCategorySerializer
from apps.showcase.projects.models import Project
from apps.showcase.projects.serializers import ProjectSerializer

# ==========================================
# 1. API: Site Configuration (Singleton)
# ==========================================
class SiteConfigurationView(APIView):
    """
    API trả về cấu hình toàn trang (Footer, Maintenance Mode...)
    Endpoint: GET /api/v1/config/
    """
    permission_classes = [AllowAny]

    def get(self, request):
        config = SiteConfiguration.objects.first()
        if not config:
            # Trả về dữ liệu mặc định nếu chưa setup trong Admin
            return Response({
                "site_name": "My Portfolio",
                "maintenance_mode": False,
                "footer_text": "Please configure site in Admin Panel"
            })
        serializer = SiteConfigurationSerializer(config)
        return Response(serializer.data)

# ==========================================
# 2. API: Portfolio Home (Aggregation)
# ==========================================
@api_view(['GET'])
@permission_classes([AllowAny])
def portfolio_home_api(request):
    """
    API tổng hợp trả về TOÀN BỘ dữ liệu cho trang Home.
    Endpoint: GET /api/v1/home-data/
    """
    # 1. Lấy Config
    config = SiteConfiguration.objects.first()
    
    # 2. Lấy Profile
    profile = UserProfile.objects.first()

    # 3. Lấy Resume Data
    experiences = WorkExperience.objects.all().order_by('-is_current', '-start_date')[:5]
    educations = Education.objects.all().order_by('-start_date')
    skills = SkillCategory.objects.all()

    # 4. Lấy Projects (Chỉ lấy các dự án public)
    projects = Project.objects.filter(is_public=True).order_by('order', '-created_at')[:6]

    # --- Serialize Data ---
    data = {
        "config": SiteConfigurationSerializer(config).data if config else None,
        "profile": UserProfileSerializer(profile, context={'request': request}).data if profile else None,
        "resume": {
            "experience": WorkExperienceSerializer(experiences, many=True).data,
            "education": EducationSerializer(educations, many=True).data,
            "skills": SkillCategorySerializer(skills, many=True).data,
        },
        "projects": ProjectSerializer(projects, many=True).data
    }

    return Response(data)