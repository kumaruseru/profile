from django.db import models
from django.utils.text import slugify

# Import hàm bảo mật từ Core App
from apps.system.core.utils import sanitize_markdown

class ProjectTag(models.Model):
    """
    Tag công nghệ riêng cho dự án (Vd: React, Django, Rust)
    """
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=20, default="blue", help_text="Màu hiển thị trên badge (blue, green, red...)")

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField("Tên dự án", max_length=255)
    
    # db_index=True: Tăng tốc độ truy vấn chi tiết dự án theo URL
    slug = models.SlugField(unique=True, blank=True, db_index=True)
    
    # Nội dung
    short_description = models.CharField("Mô tả ngắn", max_length=500, help_text="Hiện ở Card bên ngoài")
    full_description = models.TextField("Mô tả chi tiết", blank=True, help_text="Hỗ trợ Markdown")
    
    # Media
    thumbnail = models.ImageField("Ảnh thumbnail", upload_to="projects/thumbnails/")
    cover_image = models.ImageField("Ảnh bìa chi tiết", upload_to="projects/covers/", blank=True, null=True)
    
    # Links
    demo_url = models.URLField("Live Demo", blank=True)
    repo_url = models.URLField("GitHub Repo", blank=True)
    
    # Relations
    tags = models.ManyToManyField(ProjectTag, related_name="projects", blank=True)
    
    # Metadata - Đánh index cho các cờ hay dùng để lọc
    is_featured = models.BooleanField("Nổi bật", default=False, db_index=True, help_text="Ghim lên trang chủ")
    is_public = models.BooleanField("Công khai", default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # 1. Automation: Tạo Slug
        if not self.slug:
            self.slug = slugify(self.title)

        # 2. Security: Làm sạch nội dung Markdown (Chống XSS)
        # Vì short_description hiện ra ngoài Card, cũng cần làm sạch để tránh vỡ giao diện
        self.short_description = sanitize_markdown(self.short_description)
        self.full_description = sanitize_markdown(self.full_description)

        super().save(*args, **kwargs)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Dự án (Product)"
        verbose_name_plural = "Dự án (Product)"

    def __str__(self):
        return self.title