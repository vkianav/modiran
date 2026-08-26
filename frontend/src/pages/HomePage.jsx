import React from 'react';

export default function HomePage() {
  const solutions = [
    { id: 1, title: 'استقرار ERP', desc: 'یکپارچه‌سازی فرآیندها و کاهش زمان گزارش‌دهی مدیریتی' },
    { id: 2, title: 'اخذ ISO', desc: 'استانداردسازی عملیات و گواهینامه‌های بین‌المللی کیفیت' },
    { id: 3, title: 'مجوز غذا و دارو', desc: 'تسهیل امور رگولاتوری و استانداردهای بهداشتی' },
    { id: 4, title: 'ایمنی و HSE', desc: 'استقرار ضوابط سلامت، ایمنی و محیط زیست صنعتی' },
    { id: 5, title: 'ارزیابی عملکرد', desc: 'طراحی سیستم‌های انگیزش و ارزیابی کمّی پرسنل' },
    { id: 6, title: 'عارضه‌یابی مالی', desc: 'اصلاح ساختارهای مالی، بهای تمام‌شده و حسابداری' },
  ];

  return (
    <div>
      {/* بخش قهرمان (Hero) */}
      <section style={{ backgroundColor: 'var(--primary-navy)', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>شبکه مشاوران ارشد کسب‌وکار ایران</h1>
        <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '2rem' }}>حل مسائل پیچیده سازمان شما، با برترین متخصصان صنایع</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--primary-navy)', padding: '0.8rem 1.8rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>درخواست مشاوره</button>
          <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', padding: '0.8rem 1.8rem', borderRadius: '4px', cursor: 'pointer' }}>مشاهده متخصصان</button>
        </div>
      </section>

      {/* نوار اعتماد */}
      <section style={{ display: 'flex', justifyContent: 'space-around', padding: '1.5rem', backgroundColor: '#fff', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div><strong>+۵۰</strong><br/><small>مشاور تاییدشده</small></div>
        <div><strong>+۲۰۰</strong><br/><small>پروژه موفق</small></div>
        <div><strong>+۱۲۰</strong><br/><small>صنعت پوشش‌داده‌شده</small></div>
      </section>

      {/* بخش راهکارها */}
      <section style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>امروز به دنبال چه راهکاری هستید؟</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {solutions.map((item) => (
            <div key={item.id} style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', borderRight: '4px solid var(--accent-gold)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3>{item.title}</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}