import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userToken', 'fake-jwt-token');
    localStorage.setItem('userName', formData.name || 'کاربر مدیران');
    alert(isLogin ? 'ورود موفقیت‌آمیز بود' : 'ثبت‌نام با موفقیت انجام شد');
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0b2545', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', direction: 'rtl' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', width: '100%', maxWidth: '420px', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#0b2545', textAlign: 'center', marginBottom: '24px', fontSize: '22px', fontWeight: 'bold' }}>
          {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام در مدیران'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <>
              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>نام و نام خانوادگی:</label>
                <input type="text" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0b2545', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>شماره همراه:</label>
                <input type="tel" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0b2545', fontSize: '13px', boxSizing: 'border-box', outline: 'none', direction: 'ltr', textAlign: 'right' }} />
              </div>
            </>
          )}

          <div>
            <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>ایمیل:</label>
            <input type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0b2545', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '4px' }}>رمز عبور:</label>
            <input type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0b2545', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <button type="submit" style={{ backgroundColor: '#d4af37', color: '#0b2545', padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '14px' }}>
            {isLogin ? 'ورود' : 'ثبت‌نام'}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} style={{ color: '#139a9c', fontSize: '13px', textAlign: 'center', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isLogin ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ ورود'}
        </p>
      </div>
    </div>
  );
};

export default Auth;