from rest_framework import serializers

from .models import ConsultationRequest


class ConsultationRequestSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source="service.title", read_only=True)

    consultant_name = serializers.CharField(
        source="preferred_consultant.name", read_only=True, allow_null=True
    )

    class Meta:
        model = ConsultationRequest

        fields = [
            "id",
            "company_name",
            "service",
            "service_title",
            "preferred_consultant",
            "consultant_name",
            "description",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "service_title",
            "consultant_name",
        ]
