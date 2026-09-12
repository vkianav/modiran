import React from 'react';

const coursesData = [
  {
    id: 1,
    title: 'دوره جامع هوش مصنوعی برای مدیران',
    instructor: 'دکتر ندا مقتدری / دکتر امین شاکری',
    price: '۱۵,۰۰۰,۰۰۰',
    type: 'دوره آنلاین کاربردی',
    image: 'https://via.placeholder.com/300x200/112240/d4af37?text=هوش+مصنوعی+مدیران',
    badge: 'تخفیف محدود'
  },
  {
    id: 2,
    title: 'وبینار نقشه راه توسعه تفکر انتقادی',
    instructor: 'دکتر منا مناجاتی',
    price: 'رایگان',
    type: 'وبینار تخصصی',
    image: 'https://via.placeholder.com/300x200/112240/d4af37?text=تفکر+انتقادی',
    badge: 'وبینار'
  },
  {
    id: 3,
    title: 'کتاب و دوره مدیریت زمان کارآمد',
    instructor: 'تیم اساتید مدیران',
    price: '۱۷۹,۰۰۰',
    type: 'آموزش ترکیبی',
    image: 'https://via.placeholder.com/300x200/112240/d4af37?text=مدیریت+زمان',
    badge: null
  },
  {
    id: 4,
    title: 'دوره آموزشی ایجاد ارتباط مؤثر در سازمان',
    instructor: 'استاد ارشد ارتباطات',
    price: '۷۵۰,۰۰۰',
    type: 'دوره ویدیویی',
    image: 'https://via.placeholder.com/300x200/112240/d4af37?text=ارتباط+موثر',
    badge: 'جدید'
  }
];

const CoursesSection = () => {
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#0a192f', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* هدر بخش */}
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'rgba(212, 175, 55, 0.05)',
            letterSpacing: '4px',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            ONLINE COURSES
          </span>
          <h2 style={{ color: '#d4af37', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', position: 'relative' }}>
            دوره‌های آنلاین مدیران
          </h2>
          <p style={{ color: '#8892b0', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            با دوره‌های آنلاین مدیران، مهارت‌های مدیریتی، بازاریابی و رهبری را در هر زمان و هر مکان بیاموزید.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button style={{
              backgroundColor: '#d4af37',
              color: '#0a192f',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              مشاهده همه دوره‌ها 💻
            </button>
          </div>
        </div>

        {/* کارت‌های دوره‌ها */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {coursesData.map((course) => (
            <div key={course.id} style={{
              backgroundColor: '#112240',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              {/* نشان دوره */}
              {course.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#e63946',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  {course.badge}
                </span>
              )}

              {/* پوستر دوره */}
              <div style={{ width: '100%', height: '180px', backgroundColor: '#1d2d50', overflow: 'hidden' }}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* محتوا */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#64ffda', fontSize: '12px' }}>{course.type}</span>
                  <h3 style={{ color: '#e6f1ff', fontSize: '16px', margin: '8px 0', lineHeight: '1.5' }}>
                    {course.title}
                  </h3>
                  <p style={{ color: '#8892b0', fontSize: '13px', marginBottom: '16px' }}>
                    مدرس: {course.instructor}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: course.price === 'رایگان' ? '#64ffda' : '#d4af37', fontSize: '15px', fontWeight: 'bold' }}>
                    {course.price === 'رایگان' ? 'رایگان' : `${course.price} تومان`}
                  </span>
                  <button style={{
                    backgroundColor: '#d4af37',
                    color: '#0a192f',
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    ثبت‌نام دوره
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoursesSection;