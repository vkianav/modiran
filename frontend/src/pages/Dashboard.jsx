import React, { useState } from 'react';

const Dashboard = () => {
  const userName = localStorage.getItem('userName') || 'کاربر محترم';
  const [payments, setPayments] = useState([
    { id: 101, title: 'مشاوره استقرار ERP', amount: '۲,۵۰۰,۰۰۰ تومان', status: 'پرداخت شده' },
    { id: 102, title: 'رزرو سمینار مدیریت کیفیت', amount: '۵۰۰,۰۰۰ تومان', status: 'در انتظار پرداخت' }
  ]);

  const handlePay = (id) => {
    alert('در حال انتقال به درگاه پرداخت بانک (زرین‌پال / سامان‌کیش)...');
    setTimeout(() => {
      setPayments(payments.map(p => p.id === id ? { ...p, status: 'پرداخت شده' } : p));
      alert('پرداخت با موفقیت انجام شد و وضعیت جلسه تایید گردید.');
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#fff', minHeight: '90vh', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* هدر پنل */}
        <div style={{ backgroundColor: '#112240', padding: '24px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.3)', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#d4af37', fontSize: '22px', margin: 0 }}>خوش آمدید، {userName}</h1>
            <p style={{ color: '#8892b0', fontSize: '13px', margin: '4px 0 0 0' }}>مدیریت جلسات مشاوره و فاکتورها</p>
          </div>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} style={{ backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            خروج
          </button>
        </div>

        {/* بخش فاکتورها و درگاه پرداخت */}
        <h3 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '16px' }}>💳 وضعیت مالی و درخواست‌ها</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {payments.map(item => (
            <div key={item.id} style={{ backgroundColor: '#112240', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#e6f1ff' }}>{item.title}</h4>
                <span style={{ fontSize: '13px', color: '#8892b0' }}>مبلغ: {item.amount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', backgroundColor: item.status === 'پرداخت شده' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: item.status === 'پرداخت شده' ? '#10b981' : '#ef4444' }}>
                  {item.status}
                </span>
                {item.status !== 'پرداخت شده' && (
                  <button onClick={() => handlePay(item.id)} style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                    پرداخت آنلاین
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;