import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Hook اختصاصی برای انیمیشن افزایش اعداد
function useAnimatedCounter(targetValue, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end)) return;

    const totalSteps = 60; // 60 فریم بر ثانیه
    const stepTime = duration / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue, duration, trigger]);

  return count;
}

// کامپوننت کارت آمار انیمیشنی
const StatCard = ({ targetNumber, prefix = '', suffix = '', label, isVisible }) => {
  const count = useAnimatedCounter(targetNumber, 2000, isVisible);

  return (
    <div
      style={{
        backgroundColor: '#112240',
        padding: '24px',
        borderRadius: '10px',
        textAlign: 'center',
        border: '1px solid rgba(212,175,55,0.2)'
      }}
    >
      <h3
        style={{
          color: '#d4af37',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '8px',
          direction: 'ltr',
          display: 'inline-block'
        }}
      >
        {prefix}{count}{suffix}
      </h3>
      <p style={{ color: '#e6f1ff', fontSize: '14px', margin: 0 }}>
        {label}
      </p>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // تشخیص قرار گرفتن کارت‌ها در دید کاربر جهت شروع انیمیشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const statsData = [
    { targetNumber: 50, prefix: '+', suffix: '', label: 'مشاور و استاد ارشد' },
    { targetNumber: 200, prefix: '+', suffix: '', label: 'پروژه موفق سازمانی' },
    { targetNumber: 15, prefix: '+', suffix: '', label: 'سال سابقه تخصصی' },
    { targetNumber: 100, prefix: '', suffix: '٪', label: 'تضمین کیفیت خدمات' },
  ];

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', direction: 'rtl', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* عنوان صفحه */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#d4af37', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            درباره شبکه مشاوران مدیران
          </h1>
          <p style={{ color: '#8892b0', fontSize: '16px', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto' }}>
            مرکز تخصصی مشاوره، پیاده‌سازی استانداردهای مدیریتی و توسعه زیرساخت‌های سازمان
          </p>
        </div>

        {/* متن معرفی و ماموریت */}
        <div style={{ backgroundColor: '#112240', padding: '35px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '40px' }}>
          <h2 style={{ color: '#e6f1ff', fontSize: '22px', marginBottom: '16px' }}>ماموریت ما</h2>
          <p style={{ color: '#8892b0', fontSize: '15px', lineHeight: '2', marginBottom: '20px' }}>
            پلتفرم «مدیران» با هدف ارتقای سطح مدیریتی و عملیاتی بنگاه‌های اقتصادی، کارخانجات و صنایع کشور شکل گرفته است. ما بستری یکپارچه فراهم کرده‌ایم تا صاحبان کسب‌وکار بتوانند به ارشدترین مشاوران و متخصصان حوزه‌های استقرار ISO، سامانه‌های ERP، مدیریت مالی، HSE و عارضه‌یابی سازمان دسترسی مستقیم داشته باشند.
          </p>
          <p style={{ color: '#8892b0', fontSize: '15px', lineHeight: '2' }}>
            رویکرد ما در مدیران بر پایه ارزیابی دقیق، ارائه راهکارهای علمی و عملیاتی و همراهی تا حصول نتیجه ملموس در ساختار سازمان‌ها استوار است.
          </p>
        </div>

        {/* کارت‌های آمار و دستاوردها (با انیمیشن شمارش) */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '50px'
          }}
        >
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              targetNumber={stat.targetNumber}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* دکمه اقدام */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/consultants"
            style={{
              backgroundColor: '#d4af37',
              color: '#0a192f',
              padding: '12px 30px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '15px',
              display: 'inline-block'
            }}
          >
            مشاهده مشاوران و اساتید
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;