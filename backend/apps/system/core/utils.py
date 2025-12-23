import bleach
from typing import Optional, List, Dict
from django.http import HttpRequest

# ==============================================================================
# 1. MARKDOWN SANITIZATION CONFIGURATION
# ==============================================================================
# Nguyên tắc "Zero Trust": Mặc định từ chối tất cả thẻ HTML trong Markdown.
# Markdown renderer ở frontend sẽ tự chuyển đổi cú pháp **bold**, # header... thành HTML an toàn.
ALLOWED_TAGS: List[str] = [] 
ALLOWED_ATTRIBUTES: Dict = {}

def sanitize_markdown(text: Optional[str]) -> str:
    """
    Vệ sinh văn bản đầu vào (input sanitization), loại bỏ hoàn toàn các thẻ HTML.
    
    Mục đích:
    - Ngăn chặn Stored XSS: Loại bỏ <script>, <iframe... ngay từ khi lưu vào DB.
    - Consistency: Đảm bảo nội dung hiển thị chỉ dựa trên cú pháp Markdown.
    """
    # 1. Fail-safe: Trả về chuỗi rỗng thay vì None để tránh lỗi render template/API
    if not text:
        return ""

    # 2. Bleach Clean:
    # strip=True: Xóa hẳn thẻ (vd: <script>alert()</script> -> alert()) thay vì escape.
    return bleach.clean(
        text,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        strip=True
    )

# ==============================================================================
# 2. NETWORK SECURITY UTILITIES
# ==============================================================================

def get_client_ip(request: HttpRequest) -> Optional[str]:
    """
    Lấy địa chỉ IP thực của client một cách an toàn (IP Spoofing Protection).
    
    Logic ưu tiên:
    1. Cloudflare (HTTP_CF_CONNECTING_IP): Header được CF xác thực, rất khó giả mạo.
    2. Nginx Real IP (HTTP_X_REAL_IP): Được cấu hình bởi Reverse Proxy nội bộ.
    3. Remote Addr: IP kết nối trực tiếp (Direct Connection).
    
    Lưu ý: 
    - BỎ QUA 'HTTP_X_FORWARDED_FOR' vì hacker có thể dễ dàng giả mạo header này 
      (gửi 'X-Forwarded-For: 1.2.3.4' giả). Trừ khi bạn có whitelist proxy tin cậy.
    """
    # 1. Priority 1: Cloudflare Proxy (Nếu sử dụng)
    cf_ip = request.META.get('HTTP_CF_CONNECTING_IP')
    if cf_ip:
        return cf_ip

    # 2. Priority 2: Nginx Reverse Proxy (Upstream Real IP)
    real_ip = request.META.get('HTTP_X_REAL_IP')
    if real_ip:
        return real_ip

    # 3. Fallback: Direct Connection (Docker/Dev Server)
    return request.META.get('REMOTE_ADDR')