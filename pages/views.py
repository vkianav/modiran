from django.shortcuts import render

from consultants.models import Consultant
from services.models import ServiceCategory
from events.models import Event


def home(request):
    services = ServiceCategory.objects.all()
    consultants = Consultant.objects.all()
    events = Event.objects.select_related("consultant").all()

    context = {
        "services": services,
        "consultants": consultants,
        "events": events,
    }

    return render(request, "index.html", context)
