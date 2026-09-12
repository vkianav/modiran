import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(10, 25, 47, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        direction: 'rtl',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          height: '75px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* سمت راست: لوگو */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            whiteSpace: 'nowrap' 
          }}
        >
          <span style={{ color: '#d4af37', fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>MODIRAN</span>
          <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>مدیران</span>
        </Link>

        {/* وسط: منوی اصلی (در دسکتاپ) */}
        <nav 
          style={{ 
            display: 'flex', 
            gap: '24px', 
            alignItems: 'center',
            flexWrap: 'nowrap'
          }}
        >
          <Link to="/" style={{ color: '#e6f1ff', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
            صفحه اصلی
          </Link>
          <Link to="/about" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
            درباره ما
          </Link>
          <Link to="/consultants" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
            مشاوران ارشد
          </Link>
          <Link to="/events" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
            سمینارها
          </Link>
          <Link to="/success-stories" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
            داستان‌های موفقیت
          </Link>
        </nav>

        {/* سمت چپ: دکمه‌های اقدام (CTA) */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Link
            to="/auth"
            style={{
              border: '1px solid #d4af37',
              color: '#d4af37',
              padding: '8px 18px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            پنل کاربری
          </Link>

          <button
            onClick={onOpenModal}
            style={{
              backgroundColor: '#d4af37',
              color: '#0a192f',
              padding: '9px 18px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            درخواست مشاوره
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;