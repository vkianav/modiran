import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary, #f8fafc)',
      color: 'var(--text-primary, #0f172a)',
      borderTop: '1px solid var(--border-color, #e2e8f0)',
      paddingTop: '50px',
      direction: 'rtl',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
        
        {/* لوگوی مرکز بالای فوتر */}
        <div
          style={{
            position: "absolute",
            top: "-38px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "78px",
            height: "78px",
            background: "#fff",
            border: "2px solid #d4af37",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            zIndex: 10,
            overflow: "hidden"
          }}
        >
          <img
            src="/images/logo_circular.png"
            alt="logo"
            style={{
              width: "82%",
              height: "82%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* شبکه‌بندی ۴ ستونه فوتر */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          marginBottom: '40px',
          paddingTop: '20px'
        }}>
          
          {/* ستون اول: درباره و توانمندسازی */}
          <div>
            <h4 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              توانمندسازی رهبران، تحول کسب‌وکارها
            </h4>
            <p style={{ color: 'var(--text-secondary, #475569)', fontSize: '13.5px', lineHeight: '1.9', margin: 0 }}>
              ما با <strong style={{ color: 'var(--text-primary, #0f172a)' }}>آموزش‌های کاربردی</strong>، <strong style={{ color: 'var(--text-primary, #0f172a)' }}>جلسات مشاوره </strong>، بستر پویای شبکه مدیران ایران و انتشار <strong style={{ color: 'var(--text-primary, #0f172a)' }}>کتاب‌های تخصصی</strong>، مدیران را در مسیر رهبری مؤثر و تحول کسب‌وکارها همراهی می‌کنیم.
            </p>
          </div>

          {/* ستون دوم: دسترسی سریع */}
          <div>
            <h4 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              دسترسی سریع
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/books" style={{ color: 'var(--text-secondary, #475569)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                  فروشگاه محصولات
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary, #475569)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link to="/events" style={{ color: 'var(--text-secondary, #475569)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                  سمینارها و همایش‌ها
                </Link>
              </li>
              <li>
                <Link to="/success-stories" style={{ color: 'var(--text-secondary, #475569)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                  داستان‌های موفقیت
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون سوم: تماس با ما */}
          <div>
            <h4 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              تماس با ما
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary, #475569)', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span>
                <span style={{ direction: 'ltr' }}>037-45310455</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span>
                <span style={{ direction: 'ltr' }}>032-55952002</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✉️</span>
                <span style={{ direction: 'ltr' }}>modiranNet.com</span>
              </div>
            </div>
          </div>

          {/* ستون چهارم: مجوزها و نمادها */}
          <div>
            <h4 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              مجوزها و نمادها
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color, #e2e8f0)',
                borderRadius: '8px',
                padding: '8px',
                width: '85px',
                height: '85px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                <img src="https://trustseal.enamad.ir/logo.aspx" alt="اینماد" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color, #e2e8f0)',
                borderRadius: '8px',
                padding: '8px',
                width: '85px',
                height: '85px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                <img src="https://www.zarinpal.com/blog/wp-content/uploads/2021/04/ZarinPal-Logo.png" alt="زرین‌پال" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>

        </div>

        {/* آیکون‌های شبکه‌های اجتماعی */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          paddingBottom: '30px'
        }}>
          {['telegram', 'instagram', 'linkedin', 'youtube', 'whatsapp'].map((social) => (
            <a
              key={social}
              href={`#${social}`}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#0d9488',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'transform 0.2s, background-color 0.2s'
              }}
            >
              ★
            </a>
          ))}
        </div>

      </div>

      {/* بخش کپی‌رایت انتهای فوتر */}
      <div style={{
        backgroundColor: 'var(--bg-primary, #ffffff)',
        borderTop: '1px solid var(--border-color, #e2e8f0)',
        padding: '16px 20px',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-secondary, #475569)'
      }}>
        تمام حقوق مادی و معنوی این سایت متعلق به شرکت <strong style={{ color: 'var(--accent-gold, #d4af37)' }}>«modiran»</strong> می‌باشد.
      </div>
    </footer>
  );
};

export default Footer;