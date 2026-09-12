import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const coursesData = {
    '1': {
      title: 'دوره جامع هوش مصنوعی برای مدیران',
      instructor: 'دکتر ندا مقتدری / دکتر امین شاکری',
      price: '۱۵,۰۰۰,۰۰۰',
      type: 'دوره آنلاین کاربردی',
      duration: '۲۴ ساعت آموزش آنلاین',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description: 'این دوره با هدف آشنایی مدیران ارشد با ابزارهای کاربردی هوش مصنوعی در اتوماسیون، تحلیل داده‌های مالی و تصمیم‌گیری استراتژیک طراحی شده است.',
      topics: ['مقدمه‌ای بر هوش مصنوعی مولد', 'تحلیل کلان‌داده‌ها در مدیریت', 'اتوماسیون فرآیندهای سازمانی', 'مدیریت ریسک‌های تکنولوژی']
    },
    '2': {
      title: 'وبینار نقشه راه توسعه تفکر انتقادی',
      instructor: 'دکتر منا مناجاتی',
      price: 'رایگان',
      type: 'وبینار تخصصی',
      duration: '۲ ساعت',
      cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      description: 'آموزش تکنیک‌های حل مسئله و تفکر انتقادی برای اتخاذ تصمیمات استراتژیک در شرایط پیچیده اقتصادی.',
      topics: ['شناسایی خطاهای شناختی', 'چارچوب‌های مسئله‌یابی', 'مدل‌های تصمیم‌گیری']
    },
    '3': {
      title: 'مدیریت زمان و افزایش بهره‌وری سازمانی',
      instructor: 'تیم اساتید مدیران',
      price: '۱۷۹,۰۰۰',
      type: 'آموزش کاربردی',
      duration: '۸ ساعت',
      cover: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
      description: 'ارائه مدل‌های عملیاتی بهینه‌سازی زمان کارمندان و مدیران جهت حذف اتلاف‌های زمانی در پروژه‌ها.',
      topics: ['ماتریس اولویت‌بندی', 'کاهش جلسات بی‌نهایت', 'تمرکز عمیق کاری']
    },
    '4': {
      title: 'دوره آموزشی ایجاد ارتباط مؤثر در سازمان',
      instructor: 'استاد ارشد ارتباطات',
      price: '۷۵۰,۰۰۰',
      type: 'دوره ویدیویی',
      duration: '۱۲ ساعت',
      cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      description: 'روش‌های بهبود ارتباطات درون‌سازمانی، تعامل میان‌بخشی و هماهنگی موثر میان مدیران و تیم‌ها.',
      topics: ['زبان بدن در مدیریت', 'بازخورد مؤثر', 'مدیریت تعارض‌ها']
    }
  };

  const course = coursesData[id] || coursesData['1'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', padding: '100px 20px 60px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#64ffda', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            ← بازگشت به صفحه اصلی
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', backgroundColor: '#112240', padding: '36px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.25)', marginBottom: '40px' }}>
          <div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '260px' }}>
              <img src={course.cover} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: '20px', backgroundColor: '#0a192f', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', fontSize: '13px', color: '#8892b0' }}>
              <span>مدرس: <strong style={{ color: '#e6f1ff' }}>{course.instructor}</strong></span>
              <span>مدت زمان: <strong style={{ color: '#e6f1ff' }}>{course.duration}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ backgroundColor: 'rgba(100,255,218,0.1)', color: '#64ffda', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                {course.type}
              </span>
              <h1 style={{ color: '#e6f1ff', fontSize: '24px', fontWeight: 'bold', margin: '16px 0 12px' }}>
                {course.title}
              </h1>
              <p style={{ color: '#8892b0', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                {course.description}
              </p>

              <h3 style={{ color: '#d4af37', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>
                سرفصل‌های آموزشی دوره:
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#e6f1ff', fontSize: '14px', lineHeight: '2' }}>
                {course.topics.map((topic, idx) => (
                  <li key={idx}>✓ {topic}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8892b0', fontSize: '14px' }}>شهریه دوره:</span>
              <span style={{ color: course.price === 'رایگان' ? '#64ffda' : '#d4af37', fontSize: '22px', fontWeight: 'bold' }}>
                {course.price === 'رایگان' ? 'رایگان' : `${course.price} تومان`}
              </span>
            </div>
          </div>
        </div>

        {/* فرم ثبت‌نام */}
        <div style={{ backgroundColor: '#112240', padding: '36px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
          <h2 style={{ color: '#d4af37', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            فرم رزرو و ثبت‌نام در دوره
          </h2>
          <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '24px' }}>
            اطلاعات خود را جهت دریافت لینک ورود به دوره یا هماهنگی کلاس وارد نمایید.
          </p>

          {isSubmitted ? (
            <div style={{ backgroundColor: 'rgba(100, 255, 218, 0.1)', border: '1px solid #64ffda', borderRadius: '10px', padding: '24px', textAlign: 'center', color: '#64ffda' }}>
              ثبت‌نام شما با موفقیت انجام شد. لینک کلاس و اطلاعات ورود از طریق پیامک ارسال می‌شود.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#e6f1ff', fontSize: '13px', marginBottom: '8px' }}>نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  placeholder="علی رضایی"
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

              <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#0a192f',
                    padding: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  تکمیل و نهایی‌سازی ثبت‌نام
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;