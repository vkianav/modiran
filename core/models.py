from django.db import models
from django.contrib.auth.models import User

# ۱. مدل استادان / مشاوران
class Consultant(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام و نام خانوادگی")
    title = models.CharField(max_length=150, verbose_name="عنوان شغلی / تخصص اصلی")
    bio = models.TextField(verbose_name="بیوگرافی و رزومه")
    experience_years = models.IntegerField(default=0, verbose_name="سابقه کار (سال)")
    image_url = models.URLField(blank=True, null=True, verbose_name="لینک عکس مشاور")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "مشاور"
        verbose_name_plural = "مشاوران"

# ۲. مدل دسته‌بندی خدمات (ERP، ایزو، عارضه‌یابی و...)
class ServiceCategory(models.Model):
    title = models.CharField(max_length=100, verbose_name="عنوان خدمت")
    description = models.TextField(verbose_name="توضیحات خدمت")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "خدمت"
        verbose_name_plural = "خدمات مشاوره"

# ۳. مدل سمینارها و کنفرانس‌ها
class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="عنوان سمینار / کنفرانس")
    consultant = models.ForeignKey(Consultant, on_delete=models.CASCADE, verbose_name="سخنران / مدرس")
    date_held = models.CharField(max_length=100, verbose_name="تاریخ برگزاری")
    description = models.TextField(verbose_name="توضیحات رویداد")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "رویداد / سمینار"
        verbose_name_plural = "سمینارها و کنفرانس‌ها"

# ۴. مدل درخواست مشاوره از طرف سازمان‌ها
class ConsultationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="کاربر درخواست‌دهنده")
    company_name = models.CharField(max_length=150, verbose_name="نام سازمان / شرکت")
    service = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, verbose_name="نوع خدمت مورد نیاز")
    preferred_consultant = models.ForeignKey(Consultant, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="مشاور پیشنهادی (اختیاری)")
    description = models.TextField(verbose_name="شرح نیاز و عارضه‌های سازمان")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت درخواست")

    def __str__(self):
        return f"درخواست {self.company_name} - {self.service.title}"

    class Meta:
        verbose_name = "درخواست مشاوره"
        verbose_name_plural = "درخواست‌های مشاوره"