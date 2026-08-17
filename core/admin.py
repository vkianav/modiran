from django.contrib import admin
from .models import Consultant, ServiceCategory, Event, ConsultationRequest

admin.site.register(Consultant)
admin.site.register(ServiceCategory)
admin.site.register(Event)
admin.site.register(ConsultationRequest)