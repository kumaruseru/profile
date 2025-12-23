from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteConfiguration
from .serializers import SiteConfigurationSerializer

class SiteConfigurationView(APIView):
    """
    GET /api/v1/config/
    Luôn trả về object cấu hình đầu tiên.
    """
    permission_classes = [] # Public access

    def get(self, request):
        config = SiteConfiguration.objects.first()
        if not config:
            # Nếu chưa có config, trả về default data
            return Response({
                "site_name": "My Portfolio",
                "maintenance_mode": False,
                "footer_text": "Please configure site in Admin Panel"
            })
        
        serializer = SiteConfigurationSerializer(config)
        return Response(serializer.data)