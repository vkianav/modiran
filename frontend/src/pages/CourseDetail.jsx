import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [openFaq, setOpenFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // نمونه داده دوره
  const courseData = {
    title: "دوره جامع و تخصصی مدیریت و رهبری سازمانی",
    category: "دپارتمان مدیریت",
    description: "دوره جامع کاربردی برای یادگیری مهارت‌های مورد نیاز صنعت و بازار کار. آموزش نرم‌افزارهای تخصصی، تکنیک‌های رهبری و ساختاردهی سازمان جهت ورود به بازار کار.",
    phoneNumber: "02188888888",
    groups: [
      { id: 1, name: "گروه ۱", startDate: "۱۶ مهر", days: "پنج‌شنبه ها", hours: "۱۵ الی ۱۸", price: "۹۶,۵۰۰,۰۰۰ ریال", conditions: "نقد و اقساط" },
      { id: 2, name: "گروه ۲", startDate: "۲۶ آبان", days: "سه شنبه ها", hours: "۱۸ الی ۲۱", price: "۹۶,۵۰۰,۰۰۰ ریال", conditions: "نقد و اقساط" }
    ],
    skills: [
      "طراحی قطعات و مجموعه‌های مدیریتی",
      "کار با نرم‌افزارهای تحلیلی و مدیریتی",
      "تحلیل برنامه‌ریزی استراتژیک",
      "ارزیابی و انگیزش پرسنل",
      "تکنیک‌های مذاکره و متقاعدسازی"
    ],
    audience: [
      "دانشجویان و فارغ‌التحصیلان مدیریت و صنایع",
      "مدیران ارشد و میانی سازمان‌ها",
      "مهندسان و سرپرستان اجرایی",
      "علاقه‌مندان به ارتقای مهارت‌های فردی"
    ],
    syllabi: [
      "مبانی و اصول مدیریت استراتژیک",
      "تفکر سیستمی و تصمیم‌گیری مدیریتی",
      "رهبری و مدیریت تغییر در سازمان",
      "اصول و فنون مذاکره پیشرفته",
      "کارگاه عملی بررسی کیس‌استادی‌های واقعی"
    ],
    faqs: [
      { q: "این دوره برای چه کسانی مناسب است؟", a: "این دوره برای تمامی مدیران، کارشناسان ارشد و دانشجویانی که قصد ورود به بازار کار مدیریتی را دارند مناسب است." },
      { q: "آیا مدرک این دوره معتبر و قابل ترجمه است؟", a: "بله، مدرک اعطایی دارای تاییدیه رسمی بوده و قابلیت ترجمه جهت ارائه به سازمان‌ها را دارد." },
      { q: "شرایط پرداخت اقساطی به چه صورت است؟", a: "امکان پرداخت شهریه در ۲ الی ۴ قسط در طول دوره فراهم می‌باشد." }
    ]
  };

  const tabs = [
    { id: 'info', label: 'اطلاعات برگزاری دوره', icon: 'ℹ️' },
    { id: 'intro', label: 'معرفی دوره', icon: '📖' },
    { id: 'syllabus', label: 'سرفصل‌ها', icon: '📋' },
    { id: 'audience', label: 'مخاطبان و مهارت‌ها', icon: '👥' },
    { id: 'teacher', label: 'مدرس', icon: '👨‍🏫' },
    { id: 'certificates', label: 'مدارک و گواهی‌نامه‌ها', icon: '🏅' },
    { id: 'faq', label: 'سوالات پرتکرار', icon: '❓' },
  ];

  // اکشن تماس با کارشناس
  const handleContactExpert = () => {
    window.location.href = `tel:${courseData.phoneNumber}`;
  };

  // اکشن باز کردن مدال ثبت‌نام
  const handleOpenRegister = (groupName = null) => {
    setSelectedGroup(groupName);
    setIsModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', direction: 'rtl' }}>
      
      {/* نوار مسیر (Breadcrumb) */}
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>خانه</Link> {' > '}
        <Link to="/department/management" style={{ color: '#64748b', textDecoration: 'none' }}>دوره‌ها</Link> {' > '}
        <span style={{ color: '#139a9c', fontWeight: 'bold' }}>{courseData.title}</span>
      </div>

      {/* هدر دوره */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#0f172a' }}>{courseData.title}</h1>
        <p style={{ color: '#139a9c', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>{courseData.category}</p>
        <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.8', maxWidth: '900px' }}>{courseData.description}</p>
        
        <div style={{ display: 'flex', gap: '15px', marginTop: '25px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handleOpenRegister()}
            style={{ backgroundColor: '#139a9c', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            پیش ثبت‌نام دوره ←
          </button>
          <button 
            onClick={handleContactExpert}
            style={{ backgroundColor: '#fff', color: '#139a9c', border: '2px solid #139a9c', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            تماس با کارشناس دوره 📞
          </button>
        </div>
      </div>

      {/* تب‌های بالای صفحه */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px', borderBottom: '2px solid #e2e8f0' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#139a9c' : '#f1f5f9',
              color: activeTab === tab.id ? '#ffffff' : '#475569',
              fontWeight: activeTab === tab.id ? 'bold' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <div>
        {/* تب اطلاعات برگزاری */}
        {activeTab === 'info' && (
          <div>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#0f172a' }}>گروه‌های در حال ثبت‌نام</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {courseData.groups.map((group) => (
                <div key={group.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px', color: '#139a9c', fontWeight: 'bold' }}>{group.name}</h3>
                  <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#334155' }}>
                    <div>📅 <strong style={{ color: '#0f172a' }}>تاریخ شروع:</strong> {group.startDate}</div>
                    <div>📆 <strong style={{ color: '#0f172a' }}>روزهای برگزاری:</strong> {group.days}</div>
                    <div>⏰ <strong style={{ color: '#0f172a' }}>ساعت آموزش:</strong> {group.hours}</div>
                    <div>💳 <strong style={{ color: '#0f172a' }}>شهریه دوره:</strong> {group.price}</div>
                    <div>📝 <strong style={{ color: '#0f172a' }}>شرایط پرداخت:</strong> {group.conditions}</div>
                  </div>
                  <button 
                    onClick={() => handleOpenRegister(group.name)}
                    style={{ width: '100%', marginTop: '20px', backgroundColor: '#139a9c', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    پیش ثبت‌نام {group.name} ←
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تب معرفی دوره */}
        {activeTab === 'intro' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px', lineHeight: '2', color: '#334155' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '15px' }}>معرفی جامع دوره</h3>
            <p>این دوره با هدف ارتقای دانش کاربردی و مهارتی شرکت‌کنندگان طراحی شده است. در طول دوره علاوه بر مفاهیم نظری، پروژه‌های عملی و کارگاهی متعدد جهت آمادگی برای ورود مستقیم به بازار کار اجرا خواهد شد.</p>
          </div>
        )}

        {/* تب سرفصل‌ها */}
        {activeTab === 'syllabus' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {courseData.syllabi.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '16px 20px', borderRadius: '10px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span style={{ backgroundColor: 'rgba(19, 154, 156, 0.1)', color: '#139a9c', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                  ۰{index + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* تب مخاطبان و مهارت‌ها */}
        {activeTab === 'audience' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', color: '#139a9c', marginBottom: '15px', fontWeight: 'bold' }}>در این دوره چه مهارت‌هایی کسب می‌کنید؟</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#334155' }}>
                {courseData.skills.map((skill, i) => (
                  <li key={i}>🔸 {skill}</li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', color: '#139a9c', marginBottom: '15px', fontWeight: 'bold' }}>این دوره مناسب چه کسانی است؟</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#334155' }}>
                {courseData.audience.map((item, i) => (
                  <li key={i}>🔹 {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* تب مدرس */}
        {activeTab === 'teacher' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '10px' }}>گروه اساتید و مدرسین برتر</h3>
            <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.8' }}>این دوره توسط برترین اساتید حوزه صنعت و مدیریت با سابقه تدریس و مشاوره در سازمان‌های بزرگ ارائه می‌گردد.</p>
          </div>
        )}

        {/* تب مدارک */}
        {activeTab === 'certificates' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '15px' }}>مدارک و گواهینامه‌های دوره</h3>
            <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.8' }}>
              پس از اتمام موفقیت‌آمیز دوره و قبولی در ارزیابی پایانی، مدرک معتبر و قابل ترجمه رسمی اعطا خواهد شد.
            </p>
          </div>
        )}

        {/* تب سوالات پرتکرار */}
        {activeTab === 'faq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {courseData.faqs.map((faq, index) => (
              <div key={index} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{ width: '100%', padding: '16px 20px', textAlign: 'right', background: 'none', border: 'none', color: '#0f172a', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === index ? '▲' : '▼'}</span>
                </button>
                {openFaq === index && (
                  <div style={{ padding: '0 20px 16px 20px', color: '#475569', fontSize: '14px', lineHeight: '1.8', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* مدال فرم پیش ثبت‌نام */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', width: '90%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '15px', color: '#0f172a' }}>فرم پیش ثبت‌نام دوره</h3>
            {selectedGroup && <p style={{ color: '#139a9c', fontSize: '13px', marginBottom: '15px' }}>انتخاب شده: {selectedGroup}</p>}
            <form onSubmit={(e) => { e.preventDefault(); alert('درخواست ثبت‌نام شما با موفقیت ثبت شد.'); setIsModalOpen(false); }}>
              <input type="text" placeholder="نام و نام خانوادگی" required style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              <input type="tel" placeholder="شماره موبایل" required style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, backgroundColor: '#139a9c', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>تایید و ارسال</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>انصراف</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseDetail;