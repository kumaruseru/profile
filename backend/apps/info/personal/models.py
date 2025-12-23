from django.db import models
from django.core.exceptions import ValidationError

class UserProfile(models.Model):
    """
    Singleton Model: Chỉ cho phép tồn tại duy nhất 1 record cho chính chủ.
    Chứa thông tin Header, About, và File CV gốc.
    """
    # Thông tin định danh
    full_name = models.CharField("Họ và tên", max_length=255, default="Nguyen Van A")
    headline = models.CharField("Chức danh", max_length=255, help_text="Vd: Fullstack Developer & Security Researcher")
    bio = models.TextField("Giới thiệu ngắn (Bio)", blank=True)
    
    # Media & Files
    avatar = models.ImageField("Ảnh đại diện", upload_to="personal/avatar/")
    cv_pdf = models.FileField("File CV (PDF)", upload_to="personal/cv/", blank=True, help_text="File PDF để user tải về")
    
    # Thông tin liên hệ hiển thị (Contact Card)
    email = models.EmailField("Email liên hệ public")
    location = models.CharField("Địa điểm", max_length=255, help_text="Vd: Ho Chi Minh City, Vietnam")
    
    # Trạng thái
    is_open_to_work = models.BooleanField("Đang tìm việc?", default=True)
    available_for_freelance = models.BooleanField("Nhận Freelance?", default=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Đảm bảo chỉ có 1 profile duy nhất
        if not self.pk and UserProfile.objects.exists():
            raise ValidationError('Chỉ được phép tạo một User Profile duy nhất.')
        return super(UserProfile, self).save(*args, **kwargs)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Hồ sơ cá nhân (Profile)"
        verbose_name_plural = "Hồ sơ cá nhân"


class SocialLink(models.Model):
    """
    Dùng cho component GithubCard, Linkedin, v.v.
    """
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'X (Twitter)'),
        ('facebook', 'Facebook'),
        ('website', 'Personal Website'),
        ('other', 'Khác'),
    ]

    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="social_links")
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, default='other')
    url = models.URLField("Link Profile")
    display_text = models.CharField("Tên hiển thị", max_length=50, blank=True, help_text="Vd: @nguyenvana")
    icon_class = models.CharField("Icon Class", max_length=50, blank=True, help_text="Class icon (vd: ri-github-fill) nếu dùng RemixIcon")
    order = models.PositiveIntegerField("Thứ tự", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Mạng xã hội"
        verbose_name_plural = "Mạng xã hội"

    def __str__(self):
        return f"{self.get_platform_display()} - {self.url}"