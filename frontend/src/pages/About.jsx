import React, { useState, useEffect, useRef } from "react";

// کامپوننت اختصاصی برای انیمیشن شمارش روان اعداد
const CounterItem = ({ targetValue, label, prefix = "+", duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // فرمول Easing برای حرکت نرم و طبیعی اعداد
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            
            setCount(Math.floor(easeOutQuad * targetValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [targetValue, duration, hasAnimated]);

  return (
    <div ref={counterRef} style={{ padding: "10px" }}>
      <div 
        style={{ 
          fontSize: "36px", 
          fontWeight: "800", 
          color: "#d4af37", // رنگ طلایی ویژه تم مدیران
          marginBottom: "8px", 
          direction: "ltr",
          display: "inline-block"
        }}
      >
        {prefix}{count.toLocaleString("fa-IR")}
      </div>
      <div style={{ fontSize: "14px", color: "#334155", fontWeight: "600" }}>{label}</div>
    </div>
  );
};

const AboutUs = () => {
  // ۱. آمار کلیدی شبکه مدیران
  const stats = [
    { targetValue: 100, label: "دوره آموزشی و مشاوره تخصصی" },
    { targetValue: 600, label: "پروژه عارضه‌یابی و استقرار ISO/ERP" },
    { targetValue: 3000, label: "مدیر و فراگیر آموزش‌دیده" },
    { targetValue: 5000, label: "ساعت مشاوره مدیریت و استراتژی" },
  ];

  // ۲. گام‌های مسیر رشد در شبکه مدیران
  const steps = [
    {
      step: "۱",
      title: "دریافت مشاوره رایگان",
      desc: "جهت تحلیل نیازهای مدیریتی و سازمانی خود به صورت تلفنی یا حضوری با کارشناسان ارشد ما ارتباط بگیرید.",
      icon: "💬",
    },
    {
      step: "۲",
      title: "شرکت در دوره‌ها و پودمان‌ها",
      desc: "پس از تعیین مسیر شغلی یا سازمانی، در دوره‌های تخصصی زیر نظر برترین اساتید صنعت ثبت‌نام نمایید.",
      icon: "🎓",
    },
    {
      step: "۳",
      title: "دریافت مدارک معتبر",
      desc: "پس از پایان دوره و ارزیابی عملی، گواهی‌نامه تخصصی و معتبر قابل ارائه به سازمان‌ها را دریافت کنید.",
      icon: "📜",
    },
    {
      step: "۴",
      title: "ورود به شبکه مشاوران و بازار کار",
      desc: "به شبکه فعال مدیران ارشد پیوسته و از فرصت‌های پروژه‌ای، ارتقای شغلی و جذب در صنایع بهره‌مند شوید.",
      icon: "🚀",
    },
  ];

  // ۳. اعضای تیم و مدیران ارشد
  const teamMembers = [
    { name: "دکتر مهدی موحدنیا", role: "مدیرعامل و مشاور ارشد استراتژی" },
    { name: "مهندس مهدی حسینی", role: "عضو هیئت مدیره و مدیر دپارتمان ERP" },
    { name: "مهندس محمد نخودیان", role: "مدیر دپارتمان فناوری اطلاعات و IT" },
    { name: "مهندس سارا صادقی کیا", role: "مدیر ارشد مالی و حسابداری" },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", direction: "rtl", fontFamily: "inherit" }}>
      
      {/* 🟢 بخش اول: هدر و معرفی جامع */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "40px 30px",
          marginBottom: "40px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          display: "flex",
          gap: "30px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 350px", textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "2px dashed #cbd5e1",
              borderRadius: "16px",
              padding: "30px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>🏆📜</div>
            <h4 style={{ color: "#0f172a", margin: "5px 0", fontSize: "16px", fontWeight: "bold" }}>
              افتخارات و گواهی‌نامه‌های ملی
            </h4>
            <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
              دارای مجوزهای رسمی مشاوره مدیریت، ISO و تحول دیجیتال
            </p>
          </div>
        </div>

        <div style={{ flex: "2 1 500px" }}>
          <h1 style={{ color: "#0f172a", fontSize: "26px", fontWeight: "bold", marginBottom: "15px" }}>
            به شبکه مشاوران ارشد کسب‌وکار <span style={{ color: "#d4af37" }}>«مدیران»</span> خوش آمدید
          </h1>
          <p style={{ color: "#139a9c", fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>
            توانمندسازی رهبران، تحول کسب‌وکارها و توسعه سرمایه‌های انسانی
          </p>
          <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.9", textAlign: "justify" }}>
            شبکه مشاوران ارشد کسب‌وکار «مدیران» با هدف حلقه‌ اتصال میان دانش روز مدیریت، فناوری و نیازهای واقعی صنعت کشور آغاز به کار کرده است. ما با بهره‌گیری از خبره‌ترین اساتید، مشاوران صنعتی و متخصصان اجرا، پکیج‌های جامع آموزشی و عارضه‌یابی را در حوزه‌های استراتژی، منابع انسانی، ERP، ISO، مالی و IT ارائه می‌دهیم تا چرخه رشد و توسعه پایدار سازمان‌ها محقق گردد.
          </p>
        </div>
      </div>

      {/* 🟢 بخش دوم: چرا مدیران را انتخاب کنیم؟ */}
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ textAlign: "center", color: "#0f172a", fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          چرا مدیران را برای رشد و توسعه انتخاب کنیم؟
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "13px", marginBottom: "35px" }}>
          ارائه خدمات یکپارچه آموزش، مشاوره و استقرار در صنایع
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ textAlign: "center", fontSize: "36px", marginBottom: "10px" }}>🏢</div>
            <h3 style={{ textAlign: "center", color: "#0f172a", fontSize: "17px", fontWeight: "bold", marginBottom: "15px" }}>امکانات و زیرساخت‌ها</h3>
            <ul style={{ color: "#334155", fontSize: "13px", lineHeight: "2", paddingRight: "18px", margin: 0 }}>
              <li>برگزاری دوره‌ها به صورت حضوری، آنلاین و هیبریدی</li>
              <li>استودیو تخصصی ضبط محتوا و کارگاه‌های عملی</li>
              <li>سالن‌های مجهز جهت برگزاری کلینیک‌های عارضه‌یابی</li>
              <li>اتاق‌های مذاکره و مشاوره اختصاصی مدیران ارشد</li>
            </ul>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ textAlign: "center", fontSize: "36px", marginBottom: "10px" }}>📊</div>
            <h3 style={{ textAlign: "center", color: "#0f172a", fontSize: "17px", fontWeight: "bold", marginBottom: "15px" }}>دپارتمان‌های تخصصی</h3>
            <ul style={{ color: "#334155", fontSize: "13px", lineHeight: "2", paddingRight: "18px", margin: 0 }}>
              <li>دپارتمان مدیریت استراتژیک و رهبری</li>
              <li>دپارتمان صنایع، فرایندها و ERP</li>
              <li>دپارتمان استقرار ISO و سیستم‌های کیفیت</li>
              <li>دپارتمان مالی، بازرگانی و حقوق کسب‌وکار</li>
            </ul>
          </div>

          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ textAlign: "center", fontSize: "36px", marginBottom: "10px" }}>⭐️</div>
            <h3 style={{ textAlign: "center", color: "#0f172a", fontSize: "17px", fontWeight: "bold", marginBottom: "15px" }}>مزایای رقابتی مدیران</h3>
            <ul style={{ color: "#334155", fontSize: "13px", lineHeight: "2", paddingRight: "18px", margin: 0 }}>
              <li>بکارگیری مشاوران رتبه یک و اساتید با تجربه صنعتی</li>
              <li>آموزش‌های سناریومحور مبتنی بر کیس‌استادی‌های واقعی</li>
              <li>اعطای مدارک معتبر و قابل ترجمه رسمی</li>
              <li>پشتیبانی و عارضه‌یابی رایگان پس از اتمام دوره</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🟢 بخش سوم: آمار با کادر روشن و انیمیشن شمارنده اعداد */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "35px 20px",
          marginBottom: "50px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", textAlign: "center" }}>
          {stats.map((item, index) => (
            <CounterItem
              key={index}
              targetValue={item.targetValue}
              label={item.label}
              duration={2500}
            />
          ))}
        </div>
      </div>

      {/* 🟢 بخش چهارم: مسیر رشد */}
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ textAlign: "center", color: "#0f172a", fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          مسیر رشد در شبکه مدیران
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "13px", marginBottom: "35px" }}>
          سفر یادگیری و تحول سازمان خود را از همین امروز شروع کنید
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
          {steps.map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#139a9c",
                  color: "#ffffff",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px auto",
                  fontSize: "14px",
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
              <h4 style={{ color: "#0f172a", fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                {item.title}
              </h4>
              <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 بخش پنجم: اعضای تیم */}
      <div>
        <h2 style={{ textAlign: "center", color: "#0f172a", fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
          اعضای تیم و مشاوران ارشد مدیران
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "13px", marginBottom: "35px" }}>
          جامعه‌ای متشکل از برترین متخصصان و اساتید صنعت
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  margin: "0 auto 15px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  color: "#94a3b8",
                  border: "2px solid #139a9c",
                }}
              >
                👤
              </div>
              <h4 style={{ color: "#0f172a", fontSize: "15px", fontWeight: "bold", marginBottom: "6px" }}>
                {member.name}
              </h4>
              <p style={{ color: "#139a9c", fontSize: "12px", margin: 0, fontWeight: "500" }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutUs;