import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenModal }) => {
  // خواندن مستقیم وضعیت ورود از localStorage برای جلوگیری از خطای ReferenceError
  const isLoggedIn = !!localStorage.getItem('userToken');

  return (
    <nav style={{ backgroundColor: '#0a192f', borderBottom: '1px solid rgba(212,175,55,0.2)', padding: '16px 32px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* لوگو */}
        <Link to="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', textDecoration: 'none' }}>
          MODIRAN <span style={{ fontSize: '13px', color: '#8892b0', fontWeight: 'normal' }}>| شبکه مشاوران ارشد</span>
        </Link>

        {/* لینک‌های منو */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#e6f1ff', textDecoration: 'none', fontSize: '14px' }}>صفحه اصلی</Link>
          <a href="/#solutions" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>راهکارها</a>
          <Link to="/consultants" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>مشاوران ارشد</Link>
          <Link to="/events" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>سمینارها</Link>
          <Link to="/success-stories" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>داستان‌های موفقیت</Link>
        </div>

        {/* دکمه‌های سمت چپ */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link 
            to={isLoggedIn ? "/dashboard" : "/auth"} 
            style={{ border: '1px solid #d4af37', color: '#d4af37', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}
          >
            {isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت‌نام'}
          </Link>

          <button 
            onClick={onOpenModal}
            style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '13px' }}
          >
            درخواست مشاوره
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;