from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# === IMPORT VIEWS TỪ CÁC APP ===
# 1. Info Apps
from apps.info.personal.views import UserProfileDetailView
from apps.info.resume.views import ResumeViewSet

# 2. Showcase Apps
from apps.showcase.projects.views import ProjectViewSet
from apps.showcase.blog.views import PostViewSet

# 3. System Apps
from apps.system.contact.views import ContactCreateView
from apps.system.core.views import SiteConfigurationView

# === ROUTER CONFIGURATION ===
# Dùng cho các ViewSet (Cung cấp list, detail, pagination tự động)
router = DefaultRouter()
router.register(r'resume', ResumeViewSet, basename='resume')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'blog', PostViewSet, basename='blog')

# === API URL PATTERNS ===
api_urlpatterns = [
    # A. Singleton Resources (Chỉ có 1 bản ghi duy nhất)
    path('profile/', UserProfileDetailView.as_view(), name='profile-detail'),
    path('config/', SiteConfigurationView.as_view(), name='site-config'),
    
    # B. Action Resources (Chức năng cụ thể)
    path('contact/', ContactCreateView.as_view(), name='contact-create'),

    # C. Collection Resources (Gộp các ViewSet từ Router)
    path('', include(router.urls)),
]

# === MAIN URL CONFIGURATION ===
urlpatterns = [
    # Trang quản trị Django Admin
    path('nghia/', admin.site.urls),
    
    # Gom nhóm API dưới prefix /api/v1/
    path('api/v1/', include(api_urlpatterns)),
]

# === STATIC/MEDIA SERVING (DEV MODE) ===
# Chỉ chạy khi DEBUG=True và KHÔNG dùng S3 (Lưu trên ổ cứng local)
if settings.DEBUG and not settings.USE_S3:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)