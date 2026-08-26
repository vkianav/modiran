import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ذخیره توکن احراز هویت در LocalStorage
    localStorage.setItem('userToken', 'fake-jwt-token');
    localStorage.setItem('userName', formData.name || 'کاربر مدیران');
    alert(isLogin ? 'ورود موفقیت‌آمیز بود' : 'ثبت‌نام با موفقیت انجام شد');
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#fff', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', direction: 'rtl' }}>
      <div style={{ backgroundColor: '#112240', padding: '32px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.3)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '24px' }}>
          {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام در مدیران'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <>
              <div>
                <label style={{ fontSize: '12px', color: '#8892b0' }}>نام و نام خانوادگی:</label>
                <input type="text" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #233554', backgroundColor: '#0a192f', color: '#fff', marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#8892b0' }}>شماره همراه:</label>
                <input type="tel" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #233554', backgroundColor: '#0a192f', color: '#fff', marginTop: '4px' }} />
              </div>
            </>
          )}

          <div>
            <label style={{ fontSize: '12px', color: '#8892b0' }}>ایمیل:</label>
            <input type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #233554', backgroundColor: '#0a192f', color: '#fff', marginTop: '4px' }} />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#8892b0' }}>رمز عبور:</label>
            <input type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #233554', backgroundColor: '#0a192f', color: '#fff', marginTop: '4px' }} />
          </div>

          <button type="submit" style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '12px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
            {isLogin ? 'ورود' : 'ثبت‌نام'}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} style={{ color: '#8892b0', fontSize: '13px', textAlign: 'center', marginTop: '16px', cursor: 'pointer' }}>
          {isLogin ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ ورود'}
        </p>
      </div>
    </div>
  );
};

export default Auth;