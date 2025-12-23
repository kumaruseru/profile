from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileDetailView(APIView):
    """
    API trả về thông tin profile duy nhất (Singleton)
    Endpoint: GET /api/v1/profile/
    """
    permission_classes = [] # Public Access

    def get(self, request):
        profile = UserProfile.objects.first()
        if not profile:
            return Response({"error": "Profile not found"}, status=404)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)