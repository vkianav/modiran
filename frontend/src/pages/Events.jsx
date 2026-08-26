import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal';
import { getEvents } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (err) {
      setEvents([
        { id: 1, title: "سمینار تخصصی راهکارهای استقرار ERP در سازمان‌های تولیدی", date: "۱۴۰۳/۰۶/۱۵", lecturer: "دکتر مسعود احمدی", capacity: 30 },
        { id: 2, title: "کارگاه آموزشی الزامات ISO 9001:2015", date: "۱۴۰۳/۰۶/۲۸", lecturer: "مهندس سارا کریمی", capacity: 25 }
      ]);
    }
  };

  const handleRegister = (eventItem) => {
    setSelectedEvent({ name: `شرکت در ${eventItem.title}` });
    setIsModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37', fontSize: '28px', textAlign: 'center', marginBottom: '8px' }}>
          سمینارها و دوره‌های آموزشی مدیریتی
        </h1>
        <p style={{ color: '#8892b0', textAlign: 'center', marginBottom: '40px' }}>
          ثبت‌نام در کارگاه‌های تخصصی ارتقای دانش مدیران ارشد
        </p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {events.map((ev) => (
            <div key={ev.id} style={{ backgroundColor: '#112240', padding: '24px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '8px' }}>{ev.title}</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#8892b0' }}>
                  <span>📅 تاریخ: {ev.date}</span>
                  <span>👨‍🏫 مدرس: {ev.lecturer}</span>
                  <span>👥 ظرفیت: {ev.capacity} نفر</span>
                </div>
              </div>
              <button 
                onClick={() => handleRegister(ev)}
                style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
              >
                ثبت‌نام در سمینار
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <BookingModal consultant={selectedEvent} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Events;