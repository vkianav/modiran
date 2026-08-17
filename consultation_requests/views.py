from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import ConsultationRequest
from .serializers import ConsultationRequestSerializer


class ConsultationRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ConsultationRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ConsultationRequest.objects.filter(
            user=self.request.user
        ).select_related("service", "preferred_consultant")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
