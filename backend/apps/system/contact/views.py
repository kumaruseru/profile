from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ContactMessage
from .serializers import ContactMessageSerializer

# Import hàm tiện ích bảo mật từ Core App
from apps.system.core.utils import get_client_ip

class ContactCreateView(generics.CreateAPIView):
    """
    API nhận form liên hệ từ khách (Public POST).
    Đã được nâng cấp để chống giả mạo IP (IP Spoofing) và thu thập Metadata.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # 1. Lấy IP an toàn:
        # Sử dụng hàm get_client_ip để tự động xử lý các header từ Cloudflare/Nginx.
        # Logic cũ (x_forwarded_for.split) đã bị loại bỏ vì không an toàn.
        ip = get_client_ip(self.request)
        
        # 2. Lấy User Agent:
        # Ghi lại trình duyệt/thiết bị của người gửi (ví dụ: Chrome, iPhone...)
        # Cắt ngắn chuỗi xuống 255 ký tự để tránh lỗi Database nếu hacker gửi chuỗi quá dài.
        user_agent = self.request.META.get('HTTP_USER_AGENT', '')[:255]

        # 3. Lưu vào Database:
        # Lưu ý: Đảm bảo Model ContactMessage của bạn đã có field 'user_agent'.
        # Nếu chưa, bạn chỉ cần dùng: serializer.save(ip_address=ip)
        serializer.save(ip_address=ip, user_agent=user_agent)