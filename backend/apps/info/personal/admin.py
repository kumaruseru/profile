from django.contrib import admin
from .models import UserProfile, SocialLink

class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [SocialLinkInline]
    list_display = ('full_name', 'headline', 'location', 'is_open_to_work')
    
    # Ẩn nút Add nếu đã có 1 profile để giữ tính Singleton
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)