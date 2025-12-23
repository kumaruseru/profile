from django.db import models
from django.utils.text import slugify

class ProjectTag(models.Model):
    """
    Tag công nghệ riêng cho dự án (Vd: React, Django, Rust)
    Tách biệt với Skill ở phần Resume để tránh phụ thuộc chéo.
    """
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=20, default="blue", help_text="Màu hiển thị trên badge (blue, green, red...)")

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField("Tên dự án", max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    
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
    
    # Metadata
    is_featured = models.BooleanField("Nổi bật", default=False, help_text="Ghim lên trang chủ")
    is_public = models.BooleanField("Công khai", default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Dự án (Product)"
        verbose_name_plural = "Dự án (Product)"

    def __str__(self):
        return self.title