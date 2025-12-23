from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

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
    slug = models.SlugField(unique=True, blank=True)
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blog_posts")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    content = models.TextField("Nội dung (Markdown)")
    excerpt = models.TextField("Tóm tắt", blank=True, help_text="SEO Description")
    
    cover_image = models.ImageField(upload_to="blog/covers/", blank=True, null=True)
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-published_at']
        verbose_name = "Bài viết"
        verbose_name_plural = "Bài viết"

    def __str__(self):
        return self.title