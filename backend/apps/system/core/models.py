from django.db import models
from django.core.exceptions import ValidationError

class SiteConfiguration(models.Model):
    """
    Singleton Model: Chỉ cho phép 1 dòng dữ liệu duy nhất.
    Dùng để cấu hình các thông số toàn trang.
    """
    site_name = models.CharField("Tên Website", max_length=255, default="My Portfolio")
    site_description = models.TextField("Mô tả SEO mặc định", blank=True)
    site_keywords = models.CharField("Keywords SEO", max_length=500, blank=True, help_text="Ngăn cách bằng dấu phẩy")
    
    # Media assets
    logo = models.ImageField("Logo Website", upload_to="core/assets/", blank=True, null=True)
    favicon = models.ImageField("Favicon", upload_to="core/assets/", blank=True, null=True)
    og_image = models.ImageField("Ảnh chia sẻ MXH (OG Image)", upload_to="core/assets/", blank=True, null=True)
    
    # System Settings
    maintenance_mode = models.BooleanField("Chế độ bảo trì", default=False, help_text="Nếu bật, Frontend sẽ hiển thị trang bảo trì.")
    
    # Footer Info
    footer_text = models.CharField("Footer Text", max_length=255, blank=True, default="© 2024 Built with Django & Remix.")

    def save(self, *args, **kwargs):
        # Đảm bảo chỉ có 1 row
        if not self.pk and SiteConfiguration.objects.exists():
            raise ValidationError('Chỉ được phép tồn tại một cấu hình hệ thống duy nhất.')
        return super(SiteConfiguration, self).save(*args, **kwargs)

    def __str__(self):
        return "Cấu hình Website (Main Settings)"

    class Meta:
        verbose_name = "Cấu hình hệ thống"
        verbose_name_plural = "Cấu hình hệ thống"