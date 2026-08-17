from rest_framework import viewsets
from .models import Consultant
from .serializers import ConsultantSerializer


class ConsultantViewSet(viewsets.ModelViewSet):
    queryset = Consultant.objects.all()
    serializer_class = ConsultantSerializer
