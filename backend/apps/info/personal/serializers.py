from rest_framework import serializers
from .models import UserProfile, SocialLink

class SocialLinkSerializer(serializers.ModelSerializer):
    """
    Serializer cho mạng xã hội.
    Chỉ lấy các trường cần thiết để hiển thị icon và link.
    """
    # Lấy tên hiển thị của platform (Vd: 'github' -> 'GitHub')
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)

    class Meta:
        model = SocialLink
        fields = ['platform', 'platform_display', 'url', 'display_text', 'icon_class', 'order']


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer cho Profile cá nhân.
    Tự động xử lý Absolute URL và bảo mật Email.
    """
    social_links = SocialLinkSerializer(many=True, read_only=True)
    
    # 1. Xử lý Media URL: Trả về Full URL (http://domain/media/...) thay vì relative path
    avatar_url = serializers.SerializerMethodField()
    cv_pdf_url = serializers.SerializerMethodField()
    
    # 2. Xử lý Email: Map từ 'public_email' trong DB sang key 'email' trong JSON
    # Nếu public_email trống, field này sẽ là "" hoặc null (tuỳ setting), bảo mật email gốc.
    email = serializers.CharField(source='public_email', read_only=True)

    class Meta:
        model = UserProfile
        # Chỉ liệt kê các fields an toàn (Whitelist)
        fields = [
            'full_name', 
            'headline', 
            'bio', 
            'avatar_url', 
            'cv_pdf_url', 
            'email',         # Đây là public_email đã map
            'location', 
            'is_open_to_work', 
            'available_for_freelance',
            'social_links'
        ]

    def get_avatar_url(self, obj):
        """
        Trả về đường dẫn tuyệt đối cho ảnh đại diện.
        Hỗ trợ cả trường hợp chạy Local (localhost) lẫn S3/Cloudflare.
        """
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def get_cv_pdf_url(self, obj):
        """
        Trả về đường dẫn tuyệt đối cho file CV.
        """
        if obj.cv_pdf:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cv_pdf.url)
            return obj.cv_pdf.url
        return None