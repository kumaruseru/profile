from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

# Import hàm bảo mật từ Core App (đã tạo ở các bước trước)
from apps.system.core.utils import sanitize_markdown

User = get_user_model()

class UserProfile(models.Model):
    """
    Singleton Model: Chỉ cho phép tồn tại duy nhất 1 record.
    Đại diện cho "Bộ mặt" của portfolio (Header, About, CV).
    """
    # 1. Liên kết 1-1 với tài khoản Admin để quản lý quyền hạn
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    # 2. Thông tin định danh
    full_name = models.CharField("Họ và tên hiển thị", max_length=255, default="Nguyen Van A")
    headline = models.CharField("Chức danh", max_length=255, help_text="Vd: Senior Fullstack Developer")
    
    # Bio hỗ trợ Markdown -> Cần làm sạch để chống XSS
    bio = models.TextField("Giới thiệu ngắn (Bio)", blank=True)
    
    # 3. Media & Files
    avatar = models.ImageField("Ảnh đại diện", upload_to="personal/avatars/", blank=True, null=True)
    cv_pdf = models.FileField("File CV (PDF)", upload_to="personal/cvs/", blank=True, null=True, help_text="File PDF để user tải về")
    
    # 4. Thông tin liên hệ (Public)
    # Tách biệt email public và email đăng nhập hệ thống
    public_email = models.EmailField(
        "Email công việc (Public)", 
        blank=True, 
        help_text="Email hiển thị trên web. Để trống nếu muốn ẩn."
    )
    location = models.CharField("Địa điểm", max_length=255, blank=True, help_text="Vd: Ho Chi Minh City, Vietnam")
    
    # 5. Trạng thái (Flags)
    is_open_to_work = models.BooleanField("Đang tìm việc?", default=True)
    available_for_freelance = models.BooleanField("Nhận Freelance?", default=True)

    # 6. Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # A. Logic Singleton: Chặn tạo profile thứ 2
        # Nếu chưa có ID (tạo mới) VÀ đã tồn tại 1 bản ghi trong DB -> Báo lỗi
        if not self.pk and UserProfile.objects.exists():
            raise ValidationError('Hệ thống chỉ cho phép tồn tại duy nhất một Hồ sơ cá nhân.')

        # B. Security: Làm sạch Bio
        self.bio = sanitize_markdown(self.bio)

        super(UserProfile, self).save(*args, **kwargs)

    def __str__(self):
        return f"Profile: {self.full_name}"

    class Meta:
        verbose_name = "Hồ sơ cá nhân (Profile)"
        verbose_name_plural = "Hồ sơ cá nhân"


class SocialLink(models.Model):
    """
    Link mạng xã hội (Github, LinkedIn...).
    Render dưới dạng icon ở Footer hoặc Header.
    """
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'X (Twitter)'),
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('website', 'Website cá nhân'),
        ('other', 'Khác'),
    ]

    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="social_links")
    
    platform = models.CharField("Nền tảng", max_length=20, choices=PLATFORM_CHOICES, default='other')
    url = models.URLField("Đường dẫn (URL)")
    
    display_text = models.CharField("Tên hiển thị", max_length=50, blank=True, help_text="Vd: @nguyenvana")
    icon_class = models.CharField("Icon Class", max_length=50, blank=True, help_text="Class icon (vd: ri-github-fill hoặc fa-brands fa-github)")
    
    order = models.PositiveIntegerField("Thứ tự hiển thị", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Mạng xã hội"
        verbose_name_plural = "Mạng xã hội"

    def save(self, *args, **kwargs):
        # Làm sạch display_text phòng trường hợp hiển thị lên HTML
        if self.display_text:
            self.display_text = sanitize_markdown(self.display_text)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_platform_display()} - {self.url}"