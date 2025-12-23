from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils import timezone
from django.template.defaultfilters import truncatechars

# Import hàm bảo mật từ Core App
from apps.system.core.utils import sanitize_markdown

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Nháp'),
        ('published', 'Đã xuất bản'),
    )

    title = models.CharField("Tiêu đề", max_length=255)
    
    # db_index=True: Tăng tốc độ tìm kiếm bài viết theo URL
    slug = models.SlugField(unique=True, blank=True, db_index=True)
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blog_posts")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    content = models.TextField("Nội dung (Markdown)")
    excerpt = models.TextField("Tóm tắt", blank=True, help_text="Tự động tạo từ nội dung nếu để trống")
    
    cover_image = models.ImageField(upload_to="blog/covers/", blank=True, null=True)
    
    # db_index=True: Tăng tốc độ lọc các bài đã published
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft', db_index=True)
    
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # 1. Automation: Tạo Slug từ Title
        if not self.slug:
            self.slug = slugify(self.title)

        # 2. Security: Vệ sinh nội dung Markdown (Chống XSS)
        # Sử dụng hàm từ Core để loại bỏ script độc hại trước khi lưu DB
        self.content = sanitize_markdown(self.content)
        
        # 3. Automation: Tự động tạo Excerpt
        if not self.excerpt and self.content:
            # Lấy 300 ký tự đầu tiên của nội dung đã làm sạch làm tóm tắt
            self.excerpt = truncatechars(self.content, 300)
        else:
            # Nếu có excerpt, cũng cần làm sạch nó
            self.excerpt = sanitize_markdown(self.excerpt)

        # 4. Automation: Set ngày xuất bản
        # Nếu trạng thái là Published mà chưa có ngày -> Set ngày hiện tại
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()

        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Bài viết"
        verbose_name_plural = "Bài viết"

    def __str__(self):
        return self.title