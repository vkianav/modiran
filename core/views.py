from django.shortcuts import render
from .models import Consultant, ServiceCategory, Event

def home_page(request):
    consultants = Consultant.objects.all()
    services = ServiceCategory.objects.all()
    events = Event.objects.all()
    
    context = {
        'consultants': consultants,
        'services': services,
        'events': events,
    }
    return render(request, 'core/index.html', context)