from django.db import models


# Create your models here.
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
