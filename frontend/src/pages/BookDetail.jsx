import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const booksData = {
    '1': {
      title: 'راهنمای محرمانه بازاریابی اینترنتی',
      category: 'کتاب تخصصی',
      price: '۴۳,۰۰۰',
      offPrice: '۲۹,۰۰۰',
      author: 'تیم اساتید و مشاوران مدیران',
      pages: '۲۴۰ صفحه',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      description: 'این کتاب راهنمایی کاملاً کاربردی برای کسب‌وکارهای نوپا و مدیرانی است که قصد دارند سهم بازار خود را در فضای دیجیتال به شکل چشمگیری افزایش دهند. در این اثر با اصول بازاریابی محتوایی، استراتژی‌های جذب مشتری و بهینه‌سازی فروش آشنا می‌شوید.',
      chapters: [
        'فصل اول: زیرساخت‌های ورود به بازار آنلاین',
        'فصل دوم: قیچی فروش و قیف بازاریابی دیجیتال',
        'فصل سوم: اصول کپی‌رایتینگ و متقاعدسازی مشتری',
        'فصل چهارم: تحلیل داده‌ها و ارزیابی نرخ بازگشت سرمایه (ROI)'
      ]
    },
    '2': {
      title: 'کتاب نقشه راه توسعه فردی',
      category: 'توسعه فردی',
      price: '۱۹۷,۰۰۰',
      offPrice: null,
      author: 'دکتر امین شاکری',
      pages: '۳۱۰ صفحه',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      description: 'راهنمای گام‌به‌گام برای تنظیم اهداف شخصی، ارتقای انضباط فردی و مدیریت زمان ویژه مدیران و کارآفرینانی که به دنبال رشد مستمر هستند.',
      chapters: [
        'فصل اول: خودشناسی و عارضه‌یابی فردی',
        'فصل دوم: سیستم‌سازی عادات روزانه',
        'فصل سوم: تصمیم‌گیری در شرایط بحرانی'
      ]
    },
    '3': {
      title: 'راهنمای محرمانه نوشتن تیترهای فوق جذاب',
      category: 'کپی‌رایتینگ',
      price: '۳۹,۰۰۰',
      offPrice: null,
      author: 'استاد کپی‌رایتینگ مدیران',
      pages: '۱۵۰ صفحه',
      cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      description: 'مجموعه فرمول‌ها و تکنیک‌های روان‌شناختی برای نوشتن تیترهای تبلیغاتی و عنوان‌هایی که توجه مخاطب را در نگاه اول جلب می‌کنند.',
      chapters: [
        'فصل اول: روان‌شناسی توجه مخاطب',
        'فصل دوم: ۵۰ فرمول آماده برای تیترنویسی'
      ]
    },
    '4': {
      title: 'کتاب چرا مدیریت زمان جواب نمی‌دهد؟',
      category: 'مدیریت و رهبری',
      price: '۱۷۹,۰۰۰',
      offPrice: null,
      author: 'تیم تحقیقاتی مدیران',
      pages: '۲۰۰ صفحه',
      cover: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
      description: 'پاسخی علمی به مشکلات رایج مدیریت زمان و ارائه مدل‌های نوین تمرکز و مدیریت انرژی به جای مدیریت ساعات روز.',
      chapters: [
        'فصل اول: افسانه‌های مدیریت زمان',
        'فصل دوم: مدیریت انرژی و تمرکز عمیق'
      ]
    }
  };

  const book = booksData[id] || booksData['1'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0b2545', minHeight: '100vh', padding: '40px 20px 60px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* دکمه بازگشت */}
        <div style={{ marginBottom: '24px' }}>
          <Link to="/books" style={{ color: '#139a9c', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ← بازگشت به لیست کتاب‌ها
          </Link>
        </div>

        {/* بخش اصلی کارت کتاب */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px', backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '35px' }}>
          
          {/* تصویر کتاب */}
          <div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1', height: '360px' }}>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: '16px', backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: '#64748b' }}>
              <span>نویسنده: <strong style={{ color: '#0b2545' }}>{book.author}</strong></span>
              <span>تعداد صفحات: <strong style={{ color: '#0b2545' }}>{book.pages}</strong></span>
            </div>
          </div>

          {/* اطلاعات و توضیحات */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ backgroundColor: '#f1f5f9', color: '#0b2545', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                {book.category}
              </span>
              <h1 style={{ color: '#0b2545', fontSize: '22px', fontWeight: 'bold', margin: '14px 0 10px', lineHeight: '1.4' }}>
                {book.title}
              </h1>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
                {book.description}
              </p>

              <h3 style={{ color: '#0b2545', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>
                سرفصل‌های اصلی کتاب:
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#334155', fontSize: '13px', lineHeight: '2' }}>
                {book.chapters.map((chap, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#139a9c', fontWeight: 'bold' }}>✓</span> {chap}
                  </li>
                ))}
              </ul>
            </div>

            {/* قیمت */}
            <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>مبلغ قابل پرداخت:</span>
              <div style={{ textAlign: 'left' }}>
                {book.offPrice ? (
                  <>
                    <span style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'line-through', marginLeft: '8px' }}>{book.price} تومان</span>
                    <span style={{ color: '#d4af37', fontSize: '20px', fontWeight: 'bold' }}>{book.offPrice} تومان</span>
                  </>
                ) : (
                  <span style={{ color: '#d4af37', fontSize: '20px', fontWeight: 'bold' }}>{book.price} تومان</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* فرم ثبت سفارش */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ color: '#0b2545', fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>
            فرم سفارش و دریافت اثر
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
            مشخصات خود را وارد کنید تا همکاران ما برای ارسال فایل / نسخه چاپی با شما تماس بگیرند.
          </p>

          {isSubmitted ? (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '20px', textAlign: 'center', color: '#166534' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>سفارش شما با موفقیت ثبت شد 🎉</h3>
              <p style={{ fontSize: '13px', color: '#15803d' }}>کارشناسان ما به زودی جهت هماهنگی ارسال با شماره ثبت شده تماس خواهند گرفت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#475569', fontSize: '12px', marginBottom: '6px' }}>نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: علی محمدی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0b2545', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#475569', fontSize: '12px', marginBottom: '6px' }}>شماره موبایل *</label>
                <input
                  type="text"
                  required
                  placeholder="09123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0b2545', outline: 'none', fontSize: '13px', direction: 'ltr', textAlign: 'right', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', color: '#475569', fontSize: '12px', marginBottom: '6px' }}>آدرس جهت ارسال پستی (اختیاری)</label>
                <textarea
                  rows="3"
                  placeholder="آدرس دقیق پستی به همراه کد پستی..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0b2545', outline: 'none', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '6px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#0b2545',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  تکمیل سفارش و پرداخت آنلاین
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookDetail;