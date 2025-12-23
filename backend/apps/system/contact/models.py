from django.db import models
# Import hàm làm sạch từ Core (Dùng chung cho cả hệ thống)
from apps.system.core.utils import sanitize_markdown

class ContactMessage(models.Model):
    name = models.CharField("Tên người gửi", max_length=100)
    email = models.EmailField("Email")
    
    # Nội dung tin nhắn (Cần được làm sạch để chống XSS)
    message = models.TextField("Nội dung")
    
    # Metadata (Hệ thống tự điền)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField("Trình duyệt", max_length=255, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField("Đã xem", default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Tin nhắn liên hệ"
        verbose_name_plural = "Tin nhắn liên hệ"

    def save(self, *args, **kwargs):
        # Vẫn giữ logic bảo mật quan trọng này
        self.message = sanitize_markdown(self.message)
        super().save(*args, **kwargs)

    def __str__(self):
        # Nếu bạn muốn hiện User Agent, đây là cách viết an toàn và rõ ràng:
        agent = self.user_agent[:30] + "..." if self.user_agent else "No Agent"
        return f"{self.name} - {self.email} ({agent})"