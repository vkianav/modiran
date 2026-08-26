import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', direction: 'rtl' }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#d4af37', marginBottom: '20px', lineHeight: '1.4' }}>
          شبکه اختصاصی مشاوران ارشد مدیریت و توسعه کسب‌وکار
        </h1>
        <p style={{ fontSize: '18px', color: '#8892b0', marginBottom: '32px', lineHeight: '1.8' }}>
          ارائه راهکارهای تخصصی در زمینه استقرار ISO، عارضه‌یابی سازمان، بهینه‌سازی فرآیندها (ERP) و برگزاری سمینارهای مدیریتی.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link 
            to="/consultants" 
            style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}
          >
            مشاهده اساتید و مشاوران
          </Link>
          <Link 
            to="/success-stories" 
            style={{ border: '1px solid #d4af37', color: '#d4af37', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}
          >
            داستان‌های موفقیت
          </Link>
        </div>
      </section>

      {/* Solutions / Services Section */}
      <section id="solutions" style={{ padding: '60px 20px', backgroundColor: '#112240' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ color: '#d4af37', textAlign: 'center', fontSize: '26px', marginBottom: '40px' }}>
            راهکارها و خدمات تخصصی مدیران
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#0a192f', padding: '24px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '10px' }}>استقرار سیستم‌های ایزو (ISO)</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', lineHeight: '1.6' }}>مشاوره و پیاده‌سازی استانداردهای بین‌المللی کیفیت، ایمنی و محیط زیست.</p>
            </div>
            <div style={{ backgroundColor: '#0a192f', padding: '24px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '10px' }}>عارضه‌یابی و راهکارهای ERP</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', lineHeight: '1.6' }}>یکپارچه‌سازی منابع سازمان و بهینه‌سازی جریان‌های کاری جهت افزایش بهره‌وری.</p>
            </div>
            <div style={{ backgroundColor: '#0a192f', padding: '24px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.2)' }}>
              <h3 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '10px' }}>سمینارها و دوره‌های آموزشی</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', lineHeight: '1.6' }}>برگزاری همایش‌ها و کارگاه‌های تخصصی ارتقای مهارتی مدیران ارشد.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;