from django.db import models

class ContactMessage(models.Model):
    name = models.CharField("Tên người gửi", max_length=100)
    email = models.EmailField("Email")
    message = models.TextField("Nội dung")
    
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField("Đã xem", default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Tin nhắn liên hệ"
        verbose_name_plural = "Tin nhắn liên hệ"

    def __str__(self):
        return f"{self.name} - {self.email}"