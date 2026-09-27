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
    <div style={{ backgroundColor: '#f8fafc', color: '#0b2545', minHeight: '85vh', padding: '50px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ color: '#0b2545', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
          داستان‌های موفقیت مشتریان
        </h1>
        <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '40px', fontSize: '15px' }}>
          نمونه پروژه‌های شاخص مشاوره و عارضه‌یابی سازمان‌ها
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {stories.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '25px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ backgroundColor: '#f1f5f9', color: '#0b2545', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
                  {item.tag}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '16px', marginBottom: '6px', color: '#0b2545' }}>
                  {item.company}
                </h2>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#139a9c', marginBottom: '12px' }}>
                  {item.category}
                </p>
                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '24px', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
              
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '10px', borderRight: '4px solid #d4af37', border: '1px solid #e2e8f0', borderRightWidth: '4px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '2px' }}>نتیجه پروژه:</span>
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