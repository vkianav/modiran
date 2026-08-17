from rest_framework.routers import DefaultRouter
from .views import ConsultantViewSet

router = DefaultRouter()

router.register(r"consultants", ConsultantViewSet, basename="consultant")

urlpatterns = router.urls
