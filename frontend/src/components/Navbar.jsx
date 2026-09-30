import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileAccordion = (section) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileSection(null);
  };

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
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
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

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'nowrap',
              position: 'relative'
            }}
          >
            <Link to="/" style={navItemStyle}>صفحه اصلی</Link>
            <span style={dividerStyle}>|</span>

            {/* Mega Menu */}
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

            {/* Dropdown 2 */}
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
                <div style={{ position: 'absolute', top: '100%', right: 0, paddingTop: '10px', zIndex: 9999 }}>
                  <div style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '8px 0', minWidth: '180px', border: '1px solid #e2e8f0' }}>
                    {dropdownMenus.marketServices.map((item, idx) => (
                      <Link key={idx} to={item.link} style={{ display: 'block', padding: '10px 16px', color: '#334155', textDecoration: 'none', fontSize: '13px' }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span style={dividerStyle}>|</span>

            {/* Dropdown 3 */}
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
                <div style={{ position: 'absolute', top: '100%', right: 0, paddingTop: '10px', zIndex: 9999 }}>
                  <div style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '8px 0', minWidth: '180px', border: '1px solid #e2e8f0' }}>
                    {dropdownMenus.eduServices.map((item, idx) => (
                      <Link key={idx} to={item.link} style={{ display: 'block', padding: '10px 16px', color: '#334155', textDecoration: 'none', fontSize: '13px' }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span style={dividerStyle}>|</span>

            {/* Dropdown 4 */}
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
                <div style={{ position: 'absolute', top: '100%', right: 0, paddingTop: '10px', zIndex: 9999 }}>
                  <div style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '8px 0', minWidth: '160px', border: '1px solid #e2e8f0' }}>
                    {dropdownMenus.news.map((item, idx) => (
                      <Link key={idx} to={item.link} style={{ display: 'block', padding: '10px 16px', color: '#334155', textDecoration: 'none', fontSize: '13px' }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span style={dividerStyle}>|</span>
            <Link to="/about" style={navItemStyle}>درباره ما</Link>
            <span style={dividerStyle}>|</span>
            <Link to="/contact" style={navItemStyle}>تماس با ما</Link>
          </nav>
        )}

        {/* Desktop Action Buttons */}
        {!isMobile && (
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
                fontWeight: 'bold'
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
                cursor: 'pointer'
              }}
            >
              درخواست مشاوره
            </button>
          </div>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#0a192f',
              padding: '8px'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '75px',
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: '#ffffff',
            zIndex: 999,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/"
              onClick={closeMobileMenu}
              style={{
                padding: '12px 0',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#0a192f',
                textDecoration: 'none',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              صفحه اصلی
            </Link>

            {/* Mobile Accordion 1: Mega Menu */}
            <div style={{ borderBottom: '1px solid #f1f5f9' }}>
              <button
                onClick={() => toggleMobileAccordion('courses')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#0a192f',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>دپارتمان‌های مشاوره</span>
                <span style={{ fontSize: '12px', color: '#c59b27' }}>
                  {expandedMobileSection === 'courses' ? '▲' : '▼'}
                </span>
              </button>

              {expandedMobileSection === 'courses' && (
                <div style={{ paddingRight: '12px', paddingBottom: '12px' }}>
                  {coursesMegaMenu.map((col, idx) => (
                    <div key={idx} style={{ marginBottom: '14px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#c59b27', marginBottom: '6px' }}>
                        {col.title}
                      </p>
                      {col.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={`/department/${item.slug}`}
                          onClick={closeMobileMenu}
                          style={{
                            display: 'block',
                            padding: '6px 0',
                            fontSize: '13px',
                            color: '#475569',
                            textDecoration: 'none'
                          }}
                        >
                          • {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion 2 */}
            <div style={{ borderBottom: '1px solid #f1f5f9' }}>
              <button
                onClick={() => toggleMobileAccordion('marketServices')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#0a192f',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>خدمات ویژه بازارکار</span>
                <span style={{ fontSize: '12px', color: '#c59b27' }}>
                  {expandedMobileSection === 'marketServices' ? '▲' : '▼'}
                </span>
              </button>

              {expandedMobileSection === 'marketServices' && (
                <div style={{ paddingRight: '12px', paddingBottom: '12px' }}>
                  {dropdownMenus.marketServices.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobileMenu}
                      style={{ display: 'block', padding: '6px 0', fontSize: '13px', color: '#475569', textDecoration: 'none' }}
                    >
                      • {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion 3 */}
            <div style={{ borderBottom: '1px solid #f1f5f9' }}>
              <button
                onClick={() => toggleMobileAccordion('eduServices')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#0a192f',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>خدمات آموزشی</span>
                <span style={{ fontSize: '12px', color: '#c59b27' }}>
                  {expandedMobileSection === 'eduServices' ? '▲' : '▼'}
                </span>
              </button>

              {expandedMobileSection === 'eduServices' && (
                <div style={{ paddingRight: '12px', paddingBottom: '12px' }}>
                  {dropdownMenus.eduServices.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobileMenu}
                      style={{ display: 'block', padding: '6px 0', fontSize: '13px', color: '#475569', textDecoration: 'none' }}
                    >
                      • {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion 4 */}
            <div style={{ borderBottom: '1px solid #f1f5f9' }}>
              <button
                onClick={() => toggleMobileAccordion('news')}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#0a192f',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>مدیران نیوز</span>
                <span style={{ fontSize: '12px', color: '#c59b27' }}>
                  {expandedMobileSection === 'news' ? '▲' : '▼'}
                </span>
              </button>

              {expandedMobileSection === 'news' && (
                <div style={{ paddingRight: '12px', paddingBottom: '12px' }}>
                  {dropdownMenus.news.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={closeMobileMenu}
                      style={{ display: 'block', padding: '6px 0', fontSize: '13px', color: '#475569', textDecoration: 'none' }}
                    >
                      • {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={closeMobileMenu}
              style={{
                padding: '12px 0',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#0a192f',
                textDecoration: 'none',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              درباره ما
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              style={{
                padding: '12px 0',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#0a192f',
                textDecoration: 'none',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              تماس با ما
            </Link>
          </div>

          {/* Mobile CTA Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
            <Link
              to="/auth"
              onClick={closeMobileMenu}
              style={{
                textAlign: 'center',
                border: '1px solid #0a192f',
                color: '#0a192f',
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              پنل کاربری
            </Link>

            <button
              onClick={() => {
                closeMobileMenu();
                onOpenModal();
              }}
              style={{
                backgroundColor: '#c59b27',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              درخواست مشاوره
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;