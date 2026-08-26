import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      company: "فولاد متین",
      category: "پیاده‌سازی ISO 9001 و ERP",
      result: "۴۵٪ افزایش بهره‌وری فرآیندها",
      description: "استقرار کامل سیستم جامع مدیریت کیفیت و یکپارچه‌سازی منابع سازمان در ۶ ماه.",
      tag: "صنعت فولاد"
    },
    {
      company: "داروسازی سینا",
      category: "بهینه‌سازی زنجیره تامین",
      result: "۳۰٪ کاهش هزینه‌های عملیاتی",
      description: "بازطراحی فرآیندهای انبارداری و توزیع با ضوابط بین‌المللی GMP.",
      tag: "دارویی"
    }
  ];

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37', fontSize: '28px', textAlign: 'center', marginBottom: '8px' }}>
          داستان‌های موفقیت مشتریان
        </h1>
        <p style={{ color: '#8892b0', textAlign: 'center', marginBottom: '40px' }}>
          نمونه پروژه‌های شاخص مشاوره و عارضه‌یابی سازمان‌ها
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {stories.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: '#112240', 
                border: '1px solid rgba(212, 175, 55, 0.3)', 
                borderRadius: '12px', 
                padding: '24px',
                boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)'
              }}
            >
              <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                {item.tag}
              </span>
              <h2 style={{ fontSize: '20px', marginTop: '16px', marginBottom: '8px', color: '#e6f1ff' }}>{item.company}</h2>
              <p style={{ fontSize: '14px', color: '#8892b0', marginBottom: '12px' }}>{item.category}</p>
              <p style={{ fontSize: '14px', color: '#ccd6f6', marginBottom: '20px', lineHeight: '1.6' }}>{item.description}</p>
              
              <div style={{ backgroundColor: '#0a192f', padding: '12px', borderRadius: '8px', borderRight: '4px solid #d4af37' }}>
                <span style={{ fontSize: '12px', color: '#8892b0', display: 'block' }}>نتیجه پروژه:</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#d4af37' }}>{item.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;