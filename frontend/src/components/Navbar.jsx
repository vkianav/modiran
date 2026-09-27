import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ساختار مگامنو همراه با slug مربوط به هر دپارتمان
const coursesMegaMenu = [
  {
    title: "خدمات مدیریتی و استراتژیک",
    items: [
      { label: "دپارتمان مدیریت و استراتژی", slug: "management" },
      { label: "دپارتمان منابع انسانی", slug: "hr" },
      { label: "دپارتمان بازاریابی و فروش", slug: "sales" },
    ],
  },
  {
    title: "فناوری و زیرساخت",
    items: [
      { label: "دپارتمان فناوری اطلاعات (IT)", slug: "it" },
      { label: "دپارتمان صنایع و ERP", slug: "erp" },
    ],
  },
  {
    title: "مالی و سیستم‌های کیفیت",
    items: [
      { label: "دپارتمان مالی و بازرگانی", slug: "finance" },
      { label: "دپارتمان استقرار ISO و کیفیت", slug: "iso" },
      { label: "دپارتمان حقوقی و قراردادها", slug: "legal" },
    ],
  },
];

const dropdownMenus = {
  marketServices: [
    { label: "استعلام مدرک", link: "/inquiry" },
    { label: "کلینیک کسب‌وکار", link: "/clinic" },
    { label: "استخدام در مدیران", link: "/careers" },
  ],
  eduServices: [
    { label: "درخواست مدرک", link: "/certificate-request" },
    { label: "جشنواره تخفیف مدیران", link: "/discounts" },
    { label: "اجاره فضای آموزشی", link: "/space-rental" },
  ],
  news: [
    { label: "مقالات آموزشی", link: "/articles" },
    { label: "خاطرات و تجربیات", link: "/stories" },
  ],
};

const Navbar = ({ onOpenModal }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dividerStyle = { color: 'rgba(10, 25, 47, 0.2)', fontWeight: '300', userSelect: 'none' };
  const navItemStyle = { 
    color: '#0a192f', 
    textDecoration: 'none', 
    fontSize: '13.5px', 
    fontWeight: '600', 
    transition: 'color 0.2s', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '4px',
    padding: '10px 0'
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        direction: 'rtl',
        boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          height: '75px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* لوگو */}
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
          <span style={{ color: '#c59b27', fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>MODIRAN</span>
          <span style={{ color: '#0a192f', fontSize: '18px', fontWeight: 'bold' }}>مدیران</span>
        </Link>

        {/* منوی اصلی */}
        <nav 
          style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'center',
            flexWrap: 'nowrap',
            position: 'relative'
          }}
        >
          {/* ۱. صفحه اصلی */}
          <Link to="/" style={navItemStyle}>
            صفحه اصلی
          </Link>

          <span style={dividerStyle}>|</span>

          {/* ۲. دپارتمان‌های تخصصی (Mega Menu) */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('courses')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div style={navItemStyle}>
              <span>دپارتمان‌های مشاوره</span>
              <span style={{ fontSize: '9px', color: '#c59b27' }}>▼</span>
            </div>

            {activeDropdown === 'courses' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '50%',
                  transform: 'translateX(50%)',
                  paddingTop: '10px',
                  zIndex: 9999
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))',
                    gap: '24px',
                    width: 'max-content',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {coursesMegaMenu.map((col, idx) => (
                    <div key={idx} style={{ textAlign: 'right' }}>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#0a192f',
                          marginBottom: '12px',
                          paddingBottom: '6px',
                          borderBottom: '2px solid #f1f5f9'
                        }}
                      >
                        {col.title}
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {col.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              to={`/department/${item.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              style={{
                                color: '#475569',
                                textDecoration: 'none',
                                fontSize: '13px',
                                transition: 'all 0.2s',
                                display: 'block',
                                padding: '4px 0'
                              }}
                              onMouseEnter={(e) => (e.target.style.color = '#c59b27')}
                              onMouseLeave={(e) => (e.target.style.color = '#475569')}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span style={dividerStyle}>|</span>

          {/* ۳. خدمات ویژه بازارکار */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('marketServices')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div style={navItemStyle}>
              <span>خدمات ویژه بازارکار</span>
              <span style={{ fontSize: '9px', color: '#c59b27' }}>▼</span>
            </div>

            {activeDropdown === 'marketServices' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '10px',
                  zIndex: 9999
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '8px 0',
                    minWidth: '180px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {dropdownMenus.marketServices.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        color: '#334155',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#0a192f';
                        e.target.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#334155';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span style={dividerStyle}>|</span>

          {/* ۴. خدمات آموزشی */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('eduServices')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div style={navItemStyle}>
              <span>خدمات آموزشی</span>
              <span style={{ fontSize: '9px', color: '#c59b27' }}>▼</span>
            </div>

            {activeDropdown === 'eduServices' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '10px',
                  zIndex: 9999
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '8px 0',
                    minWidth: '180px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {dropdownMenus.eduServices.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        color: '#334155',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#0a192f';
                        e.target.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#334155';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span style={dividerStyle}>|</span>

          {/* ۵. مدیران نیوز */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('news')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div style={navItemStyle}>
              <span>مدیران نیوز</span>
              <span style={{ fontSize: '9px', color: '#c59b27' }}>▼</span>
            </div>

            {activeDropdown === 'news' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '10px',
                  zIndex: 9999
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '8px 0',
                    minWidth: '160px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {dropdownMenus.news.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        color: '#334155',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#0a192f';
                        e.target.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#334155';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span style={dividerStyle}>|</span>

          {/* ۶. درباره ما */}
          <Link to="/about" style={navItemStyle}>
            درباره ما
          </Link>

          <span style={dividerStyle}>|</span>

          {/* ۷. تماس با ما */}
          <Link to="/contact" style={navItemStyle}>
            تماس با ما
          </Link>
        </nav>

        {/* دکمه‌های اقدام (CTA) */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Link
            to="/auth"
            style={{
              border: '1px solid #0a192f',
              color: '#0a192f',
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
              backgroundColor: '#c59b27',
              color: '#ffffff',
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