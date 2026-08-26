import React, { useState } from 'react';
import MatchCalculator from '../components/MatchCalculator';
import BookingModal from '../components/BookingModal';

export default function ConsultantProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consultant = {
    name: "دکتر مسعود احمدی",
    title: "مشاور ارشد استقرار ERP و تحول دیجیتال",
    isVerified: true,
    experienceYears: 22,
    projectsCount: 140,
    companiesCount: 45,
    responseTime: "کمتر از ۱۲ ساعت",
    bio: "دارای دکترای مدیریت صنعتی با بیش از دو دهه سابقه عارضه‌یابی و پیاده‌سازی سیستم‌های یکپارچه منابع سازمان (ERP) در صنایع دارویی، غذایی و خودروسازی.",
    skills: ["استقرار ERP", "اخذ ISO 9001", "عارضه‌یابی مالی", "مدیریت زنجیره تأمین"],
    industries: ["صنایع دارویی", "صنایع غذایی", "خودروسازی و قطعه‌سازی"],
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', borderTop: '6px solid var(--accent-gold)' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '130px', height: '130px', borderRadius: '50%', backgroundColor: '#CBD5E1', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              👤
            </div>
            {consultant.isVerified && (
              <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                ✓ مشاور تأییدشده مدیران
              </span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ color: 'var(--primary-navy)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{consultant.name}</h1>
            <p style={{ color: '#D4AF37', fontWeight: 'bold', marginBottom: '1rem' }}>{consultant.title}</p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>{consultant.bio}</p>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'var(--primary-navy)', color: '#fff', padding: '0.7rem 1.4rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                درخواست جلسه مشاوره
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* محاسبه‌گر شاخص تناسب */}
      <MatchCalculator />

      {/* مدال ثبت درخواست */}
      {isModalOpen && (
        <BookingModal consultantName={consultant.name} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}