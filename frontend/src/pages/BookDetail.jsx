import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // دیتابیس نمونه برای کتاب‌ها
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

  // انتخاب کتاب بر اساس ID یا انتخاب کتاب اول به عنوان دیفالت
  const book = booksData[id] || booksData['1'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', padding: '100px 20px 60px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* دکمه بازگشت */}
        <div style={{ marginBottom: '30px' }}>
          <Link to="/books" style={{ color: '#64ffda', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ← بازگشت به لیست کتاب‌ها
          </Link>
        </div>

        {/* بخش اصلی معرفی محصول */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', backgroundColor: '#112240', padding: '36px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.25)', marginBottom: '40px' }}>
          
          {/* تصویر کتاب */}
          <div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.3)', height: '380px' }}>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: '20px', backgroundColor: '#0a192f', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-around', fontSize: '13px', color: '#8892b0' }}>
              <span>نویسنده: <strong style={{ color: '#e6f1ff' }}>{book.author}</strong></span>
              <span>تعداد صفحات: <strong style={{ color: '#e6f1ff' }}>{book.pages}</strong></span>
            </div>
          </div>

          {/* اطلاعات و توضیحات کتاب */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ backgroundColor: 'rgba(212,175,55,0.1)', color: '#d4af37', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                {book.category}
              </span>
              <h1 style={{ color: '#e6f1ff', fontSize: '26px', fontWeight: 'bold', margin: '16px 0 12px', lineHeight: '1.4' }}>
                {book.title}
              </h1>
              <p style={{ color: '#8892b0', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                {book.description}
              </p>

              <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                سرفصل‌های اصلی کتاب:
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#e6f1ff', fontSize: '14px', lineHeight: '2' }}>
                {book.chapters.map((chap, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#64ffda' }}>✓</span> {chap}
                  </li>
                ))}
              </ul>
            </div>

            {/* قیمت */}
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#8892b0', fontSize: '14px' }}>مبلغ قابل پرداخت:</span>
              <div style={{ textAlign: 'left' }}>
                {book.offPrice ? (
                  <>
                    <span style={{ color: '#8892b0', fontSize: '13px', textDecoration: 'line-through', marginLeft: '10px' }}>{book.price} تومان</span>
                    <span style={{ color: '#64ffda', fontSize: '22px', fontWeight: 'bold' }}>{book.offPrice} تومان</span>
                  </>
                ) : (
                  <span style={{ color: '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>{book.price} تومان</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* فرم ثبت سفارش */}
        <div style={{ backgroundColor: '#112240', padding: '36px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
          <h2 style={{ color: '#d4af37', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            فرم سفارش و دریافت اثر
          </h2>
          <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '24px' }}>
            مشخصات خود را وارد کنید تا همکاران ما برای ارسال فایل / نسخه چاپی با شما تماس بگیرند.
          </p>

          {isSubmitted ? (
            <div style={{ backgroundColor: 'rgba(100, 255, 218, 0.1)', border: '1px solid #64ffda', borderRadius: '10px', padding: '24px', textAlign: 'center', color: '#64ffda' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>سفارش شما با موفقیت ثبت شد 🎉</h3>
              <p style={{ fontSize: '14px', color: '#e6f1ff' }}>کارشناسان ما به زودی جهت هماهنگی ارسال با شماره ثبت شده تماس خواهند گرفت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#e6f1ff', fontSize: '13px', marginBottom: '8px' }}>نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: علی محمدی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0a192f', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#ffffff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#e6f1ff', fontSize: '13px', marginBottom: '8px' }}>شماره موبایل *</label>
                <input
                  type="text"
                  required
                  placeholder="09123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0a192f', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#ffffff', outline: 'none', direction: 'ltr', textAlign: 'right' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', color: '#e6f1ff', fontSize: '13px', marginBottom: '8px' }}>آدرس جهت ارسال پستی (اختیاری)</label>
                <textarea
                  rows="3"
                  placeholder="آدرس دقیق پستی به همراه کد پستی..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0a192f', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#ffffff', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#0a192f',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '15px',
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