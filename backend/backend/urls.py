from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# === 1. IMPORT VIEWS TỪ CÁC APP ===
# Apps: Personal, Resume, Projects, Blog, Contact, Core
from apps.info.personal.views import UserProfileDetailView
from apps.info.resume.views import ResumeViewSet
from apps.showcase.projects.views import ProjectViewSet
from apps.showcase.blog.views import PostViewSet
from apps.system.contact.views import ContactCreateView
from apps.system.core.views import SiteConfigurationView, portfolio_home_api

# === 2. ROUTER CONFIGURATION (Tự động tạo URL CRUD) ===
router = DefaultRouter()

# URL: /api/resume/
router.register(r'resume', ResumeViewSet, basename='resume')

# URL: /api/projects/
router.register(r'projects', ProjectViewSet, basename='projects')

# URL: /api/blog/posts/ 
# Lưu ý: Frontend đang gọi /blog/posts/ nên ta register đường dẫn này
router.register(r'blog/posts', PostViewSet, basename='blog-posts')

# === 3. API URL PATTERNS ===
api_urlpatterns = [
    # --- Custom Endpoints (API Tổng hợp & Đơn lẻ) ---
    
    # 1. API Tổng hợp cho Home Page (Quan trọng: Fix lỗi 404 trang chủ)
    path('portfolio/home/', portfolio_home_api, name='portfolio-home'),

    # 2. Các API Config & Profile (Singleton)
    path('config/', SiteConfigurationView.as_view(), name='site-config'),
    path('profile/', UserProfileDetailView.as_view(), name='profile-detail'),
    
    # 3. API Gửi form liên hệ
    path('contact/', ContactCreateView.as_view(), name='contact-create'),

    # --- Router Includes ---
    # Bao gồm các URL từ router (resume, projects, blog)
    path('', include(router.urls)),
]

# === 4. MAIN URL CONFIGURATION ===
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Prefix 'api/' cho toàn bộ endpoints
    # Ví dụ kết quả: http://localhost:8000/api/portfolio/home/
    path('api/', include(api_urlpatterns)),
]

# === 5. STATIC & MEDIA FILES (Chỉ chạy ở chế độ DEBUG) ===
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)