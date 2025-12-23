from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse
from .models import SiteConfiguration

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    # 1. Tùy chỉnh hiển thị form
    fieldsets = (
        ("Thông tin chung", {
            "fields": ("site_name", "footer_text", "maintenance_mode"),
            "description": "Các thiết lập cơ bản hiển thị trên toàn trang."
        }),
        ("SEO & Metadata", {
            "fields": ("site_description", "site_keywords"),
            "classes": ("collapse",), # Cho phép thu gọn nhóm này
        }),
        ("Media & Assets", {
            "fields": ("logo", "favicon", "og_image"),
        }),
    )

    # 2. Logic Singleton: Ẩn nút "Add" nếu đã có bản ghi
    def has_add_permission(self, request):
        # Nếu đã có data thì không cho thêm mới
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    # 3. Logic Singleton: Chặn xóa bản ghi
    def has_delete_permission(self, request, obj=None):
        # Không bao giờ cho phép xóa cấu hình hệ thống
        return False

    # 4. UX Nâng cao: Bỏ qua trang danh sách (List View)
    def changelist_view(self, request, extra_context=None):
        """
        Khi click vào menu 'Cấu hình hệ thống', 
        tự động chuyển hướng vào trang Sửa (Change View) của bản ghi đầu tiên.
        Nếu chưa có bản ghi nào -> Chuyển hướng vào trang Thêm mới (Add View).
        """
        config = self.model.objects.first()
        
        if config:
            # Nếu đã có config, redirect thẳng vào trang edit
            return redirect(
                reverse(
                    'admin:%s_%s_change' % (
                        self.model._meta.app_label, 
                        self.model._meta.model_name
                    ), 
                    args=(config.pk,)
                )
            )
        
        # Nếu chưa có, redirect vào trang add
        return redirect(
            reverse(
                'admin:%s_%s_add' % (
                    self.model._meta.app_label, 
                    self.model._meta.model_name
                )
            )
        )