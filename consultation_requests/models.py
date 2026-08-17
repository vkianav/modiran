from django.db import models
from django.conf import settings

from consultants.models import Consultant
from services.models import ServiceCategory


class ConsultationRequest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="consultation_requests",
        verbose_name="کاربر درخواست‌دهنده",
    )

    company_name = models.CharField(max_length=150, verbose_name="نام سازمان / شرکت")

    service = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="consultation_requests",
        verbose_name="نوع خدمت مورد نیاز",
    )

    preferred_consultant = models.ForeignKey(
        Consultant,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="consultation_requests",
        verbose_name="مشاور پیشنهادی",
    )

    description = models.TextField(verbose_name="شرح نیاز و عارضه‌های سازمان")

    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="تاریخ ثبت درخواست"
    )

    def __str__(self):
        return f"درخواست {self.company_name} - {self.service.title}"

    class Meta:
        verbose_name = "درخواست مشاوره"
        verbose_name_plural = "درخواست‌های مشاوره"
