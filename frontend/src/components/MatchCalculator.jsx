import React, { useState } from 'react';

export default function MatchCalculator() {
  const [industry, setIndustry] = useState('');
  const [need, setNeed] = useState('');
  const [score, setScore] = useState(null);

  const calculateFit = (e) => {
    e.preventDefault();
    if (!industry || !need) return;

    // الگوریتم ساده محاسبه درصد تناسب بر اساس داده‌های ورودی
    let calculated = 75;
    if (industry === 'pharma' || industry === 'auto') calculated += 15;
    if (need === 'erp' || need === 'iso') calculated += 9;

    setScore(Math.min(calculated, 98));
  };

  return (
    <div style={{ backgroundColor: '#1E293B', color: '#fff', padding: '1.5rem', borderRadius: '8px', marginTop: '1.5rem' }}>
      <h3 style={{ color: 'var(--accent-gold)', marginTop: 0 }}>📊 محاسبه هوشمند شاخص تناسب مشاور با سازمان شما</h3>
      <form onSubmit={calculateFit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>صنعت سازمان شما:</label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px' }} required>
            <option value="">انتخاب کنید...</option>
            <option value="pharma">صنایع دارویی و بهداشتی</option>
            <option value="auto">خودروسازی و قطعه‌سازی</option>
            <option value="food">صنایع غذایی</option>
            <option value="other">سایر صنایع</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>چالش اصلی شما:</label>
          <select value={need} onChange={(e) => setNeed(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px' }} required>
            <option value="">انتخاب کنید...</option>
            <option value="erp">استقرار ERP و یکپارچه‌سازی</option>
            <option value="iso">اخذ گواهینامه‌های ISO</option>
            <option value="finance">اصلاح ساختار مالی</option>
            <option value="hse">ضوابط ایمنی و HSE</option>
          </select>
        </div>

        <button type="submit" style={{ backgroundColor: 'var(--accent-gold)', color: '#0F172A', border: 'none', padding: '0.7rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          سنجش درصد تناسب
        </button>
      </form>

      {score !== null && (
        <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#334155', borderRadius: '6px', textAlign: 'center' }}>
          درصد تطابق این مشاور با مسئله شما: <strong style={{ color: '#4ADE80', fontSize: '1.2rem' }}>%{score}</strong>
        </div>
      )}
    </div>
  );
}