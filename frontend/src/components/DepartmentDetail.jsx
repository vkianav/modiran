import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const departmentsData = {
  management: {
    title: "دپارتمان مدیریت و استراتژی",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی دپارتمان مدیریت",
        heading: "آموزش‌های پودمانی دپارتمان مدیریت",
        cards: [
          { id: 1, title: "مدرسه استراتژی و رهبری", icon: "🏢" },
          { id: 2, title: "مدیریت تغییر و تحول سازمانی", icon: "🔄" },
          { id: 3, title: "تفکر استراتژیک در کسب‌وکار", icon: "💡" },
          { id: 4, title: "ارزیابی عملکرد و KPI", icon: "🎯" },
          { id: 5, title: "مدیریت ریسک‌های سازمانی", icon: "🛡️" },
          { id: 6, title: "رهبری تیم‌های کاری", icon: "👥" },
        ],
      },
      {
        id: "single",
        sidebarTitle: "آموزش‌های تک دوره‌ای دپارتمان مدیریت",
        heading: "آموزش‌های تک دوره‌ای دپارتمان مدیریت",
        cards: [
          { id: 101, title: "دوره فشرده تفکر سیستمی", icon: "🧠" },
          { id: 102, title: "کارگاه تصمیم‌گیری مدیریتی", icon: "⚖️" },
          { id: 103, title: "مدیریت جلسات اثربخش", icon: "📅" },
          { id: 104, title: "اصول و فنون مذاکره ارشد", icon: "🤝" },
        ],
      },
      {
        id: "other",
        sidebarTitle: "سایر دوره‌های دپارتمان مدیریت",
        heading: "سایر دوره‌های دپارتمان مدیریت",
        cards: [
          { id: 201, title: "سمینار آینده‌پژوهی کسب‌وکار", icon: "🔮" },
          { id: 202, title: "مدیریت هوش هیجانی (EQ)", icon: "❤️" },
          { id: 203, title: "اخلاق حرفه‌ای در مدیریت", icon: "✨" },
        ],
      },
      {
        id: "download",
        sidebarTitle: "دانلود برنامه کلی دپارتمان",
        heading: "دانلود برنامه کلی دپارتمان",
        isDownload: true,
        content: {
          title: "دفترچه راهنمای جامع دپارتمان مدیریت",
          description: "جهت دریافت پکیج کامل سرفصل‌ها و تقویم آموزشی دپارتمان مدیریت، فایل زیر را دریافت کنید.",
          fileSize: "2.4 مگابایت",
        },
      },
    ],
  },
  hr: {
    title: "دپارتمان منابع انسانی",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی منابع انسانی",
        heading: "آموزش‌های پودمانی منابع انسانی",
        cards: [
          { id: 1, title: "مدیریت منابع انسانی پیشرفته", icon: "👥" },
          { id: 2, title: "مصاحبه و جذب استعدادها", icon: "🔍" },
          { id: 3, title: "طراحی سیستم جبران خدمت", icon: "💳" },
          { id: 4, title: "مدیریت فرهنگ سازمانی", icon: "🌱" },
        ],
      },
      {
        id: "practical",
        sidebarTitle: "کارگاه‌های عملی مدیریت افراد",
        heading: "کارگاه‌های عملی مدیریت افراد",
        cards: [
          { id: 101, title: "تکنیک‌های انگیزش کارکنان", icon: "🚀" },
          { id: 102, title: "ارزیابی ۳۶۰ درجه عملکرد", icon: "📊" },
          { id: 103, title: "مدیریت تعارضات درون‌سازمانی", icon: "⚡" },
        ],
      },
      {
        id: "retention",
        sidebarTitle: "جذب و نگه‌داشت نیرو",
        heading: "جذب و نگه‌داشت نیرو و برندسازی کارفرمایی",
        cards: [
          { id: 201, title: "برندسازی کارفرمایی (Employer Branding)", icon: "🌟" },
          { id: 202, title: "راهکارهای کاهش نرخ ریزش نیرو", icon: "🛡️" },
          { id: 203, title: "طراحی مسیر شغلی کارکنان", icon: "📈" },
        ],
      },
    ],
  },
  sales: {
    title: "دپارتمان بازاریابی و فروش",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی بازاریابی",
        heading: "آموزش‌های پودمانی بازاریابی و فروش",
        cards: [
          { id: 1, title: "مدیریت استراتژیک بازاریابی", icon: "📢" },
          { id: 2, title: "تکنیک‌های حرفه‌ای فروش و مذاکره", icon: "🤝" },
          { id: 3, title: "استراتژی‌های قیمت‌گذاری", icon: "🏷️" },
          { id: 4, title: "مدیریت ارتباط با مشتری (CRM)", icon: "📞" },
        ],
      },
      {
        id: "inperson",
        sidebarTitle: "تکنیک‌های فروش حضوری و تلفنی",
        heading: "تکنیک‌های پیشرفته فروش حضوری و تلفنی",
        cards: [
          { id: 101, title: "روانشناسی مشتری و متقاعدسازی", icon: "🧠" },
          { id: 102, title: "مدیریت اعتراضات مشتری در فروش", icon: "🛡️" },
          { id: 103, title: "قیف فروش و تبدیل سرنخ", icon: "🔻" },
        ],
      },
      {
        id: "digital",
        sidebarTitle: "دیجیتال مارکتینگ",
        heading: "دیجیتال مارکتینگ و بازاریابی محتوایی",
        cards: [
          { id: 201, title: "سئو و بهینه‌سازی وب‌سایت", icon: "🌐" },
          { id: 202, title: "تبلیغات کلیکی و کمپین‌های دیجیتال", icon: "🎯" },
          { id: 203, title: "بازاریابی شبکه‌های اجتماعی", icon: "📱" },
        ],
      },
    ],
  },
  it: {
    title: "دپارتمان فناوری اطلاعات (IT)",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی دپارتمان IT",
        heading: "آموزش‌های پودمانی دپارتمان فناوری اطلاعات",
        cards: [
          { id: 1, title: "امنیت شبکه و داده‌ها", icon: "🔒" },
          { id: 2, title: "تحول دیجیتال در سازمان", icon: "💻" },
          { id: 3, title: "معماری نرم‌افزار و زیرساخت", icon: "🖥️" },
          { id: 4, title: "هوش مصنوعی در مدیریت", icon: "🤖" },
        ],
      },
      {
        id: "security",
        sidebarTitle: "امنیت و زیرساخت",
        heading: "امنیت شبکه و زیرساخت‌های سازمانی",
        cards: [
          { id: 101, title: "مدیریت سرور و خدمات ابری", icon: "☁️" },
          { id: 102, title: "پشتیبان‌گیری و بازیابی اطلاعات", icon: "💾" },
          { id: 103, title: "امنیت سایبری پیشرفته", icon: "🛡️" },
        ],
      },
      {
        id: "ai",
        sidebarTitle: "هوش مصنوعی و داده",
        heading: "هوش مصنوعی و تحلیل داده‌های کلان",
        cards: [
          { id: 201, title: "علم داده (Data Science) در کسب‌وکار", icon: "📊" },
          { id: 202, title: "هوش تجاری (BI) و داشبوردهای مدیریتی", icon: "📈" },
          { id: 203, title: "کاربرد ابزارهای هوش مصنوعی مولد", icon: "✨" },
        ],
      },
    ],
  },
  erp: {
    title: "دپارتمان صنایع و ERP",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی دپارتمان ERP",
        heading: "آموزش‌های پودمانی دپارتمان صنایع و ERP",
        cards: [
          { id: 1, title: "پیاده‌سازی ERP در سازمان", icon: "⚙️" },
          { id: 2, title: "مدیریت زنجیره تامین (SCM)", icon: "📦" },
          { id: 3, title: "برنامه‌ریزی تولید و انبارداری", icon: "🏭" },
          { id: 4, title: "مدیریت فرآیندهای کسب‌وکار (BPMN)", icon: "🔀" },
        ],
      },
      {
        id: "single",
        sidebarTitle: "آموزش‌های تک دوره‌ای دپارتمان ERP",
        heading: "آموزش‌های تک دوره‌ای و کارگاهی ERP",
        cards: [
          { id: 101, title: "تحلیل و مدلسازی فرآیندها", icon: "📐" },
          { id: 102, title: "مدیریت موجودی انبار پیشرفته", icon: "📦" },
          { id: 103, title: "کنترل کیفیت آماری (SPC)", icon: "📊" },
        ],
      },
      {
        id: "other",
        sidebarTitle: "سایر دوره‌های دپارتمان ERP",
        heading: "سایر دوره‌های تخصصی صنایع و بهره‌وری",
        cards: [
          { id: 201, title: "مدیریت ناب (Lean Manufacturing)", icon: "⚡" },
          { id: 202, title: "سیستم نگهداری و تعمیرات (TPM)", icon: "🛠️" },
        ],
      },
    ],
  },
  finance: {
    title: "دپارتمان مالی و بازرگانی",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی مالی",
        heading: "آموزش‌های پودمانی دپارتمان مالی و بازرگانی",
        cards: [
          { id: 1, title: "مدیریت مالی برای مدیران غیرمالی", icon: "💰" },
          { id: 2, title: "تحلیل صورت‌های مالی", icon: "📉" },
          { id: 3, title: "مدیریت بودجه و کنترل هزینه‌ها", icon: "📊" },
          { id: 4, title: "قوانین مالیاتی و اظهارنامه", icon: "📝" },
        ],
      },
      {
        id: "investment",
        sidebarTitle: "مدیریت سرمایه‌گذاری و بودجه",
        heading: "مدیریت سرمایه‌گذاری، تامین مالی و بودجه‌ریزی",
        cards: [
          { id: 101, title: "ارزیابی توجیه اقتصادی پروژه‌ها (COMFAR)", icon: "📈" },
          { id: 102, title: "مدیریت جریان نقدینگی (Cash Flow)", icon: "💵" },
          { id: 103, title: "تامین مالی از بازار سرمایه", icon: "🏢" },
        ],
      },
      {
        id: "tax",
        sidebarTitle: "قوانین مالیاتی و بیمه",
        heading: "قوانین مالیاتی، ارزش افزوده و بیمه تامین اجتماعی",
        cards: [
          { id: 201, title: "قوانین جدید مالیات‌های مستقیم", icon: "⚖️" },
          { id: 202, title: "آیین‌نامه تحریر دفاتر قانونی", icon: "📚" },
          { id: 203, title: "دفاع مالیاتی و حل اختلافات", icon: "🏛️" },
        ],
      },
    ],
  },
  iso: {
    title: "دپارتمان استقرار ISO و کیفیت",
    sections: [
      {
        id: "podmani",
        sidebarTitle: "آموزش‌های پودمانی دپارتمان ISO",
        heading: "آموزش‌های پودمانی دپارتمان استقرار ISO و کیفیت",
        cards: [
          { id: 1, title: "پیاده‌سازی ISO 9001:2015", icon: "🥇" },
          { id: 2, title: "سرممسی و ممیزی داخلی", icon: "📋" },
          { id: 3, title: "مدیریت ایمنی و بهداشت (HSE)", icon: "🤿" },
          { id: 4, title: "مدیریت کیفیت جامع (TQM)", icon: "⭐" },
        ],
      },
      {
        id: "standards",
        sidebarTitle: "ممیزی و استانداردها",
        heading: "استانداردهای بین‌المللی و ممیزی پیشرفته",
        cards: [
          { id: 101, title: "ISO 14001 (سیستم مدیریت زیست‌محیطی)", icon: "🌍" },
          { id: 102, title: "ISO 45001 (ایمنی و بهداشت حرفه‌ای)", icon: "🛡️" },
          { id: 103, title: "ممیزی تخصصی سیستم‌های کیفیت", icon: "🔍" },
        ],
      },
      {
        id: "hse",
        sidebarTitle: "ایمنی و بهداشت (HSE)",
        heading: "مدیریت ایمنی، بهداشت شغلی و محیط زیست (HSE)",
        cards: [
          { id: 201, title: "شناسایی خطرات و ارزیابی ریسک (HAZOP)", icon: "⚠️" },
          { id: 202, title: "مدیریت پسماند و بحران‌های صنعتی", icon: "♻️" },
        ],
      },
    ],
  },
  legal: {
    title: "دپارتمان حقوقی و قراردادها",
    sections: [
      {
        id: "business-law",
        sidebarTitle: "حقوق کسب‌وکار و شرکت‌ها",
        heading: "حقوق کسب‌وکار و شرکت‌ها",
        cards: [
          { id: 1, title: "حقوق کسب‌وکار و تجاری", icon: "⚖️" },
          { id: 2, title: "اصول نگارش و تنظیم قراردادها", icon: "📜" },
          { id: 3, title: "قوانین کار و تامین اجتماعی", icon: "🏛️" },
          { id: 4, title: "مالکیت فکری و ثبت برند", icon: "🛡️" },
        ],
      },
      {
        id: "contracts",
        sidebarTitle: "تنظیم قراردادهای تجاری",
        heading: "تنظیم قراردادهای تجاری",
        cards: [
          { id: 101, title: "قراردادهای عدم افشا (NDA)", icon: "🔒" },
          { id: 102, title: "قراردادهای مشارکت و استارتاپی", icon: "🤝" },
          { id: 103, title: "قراردادهای بین‌المللی و بازرگانی", icon: "🌐" },
          { id: 104, title: "چک‌لیست و ممیزی قراردادها", icon: "📋" },
        ],
      },
      {
        id: "disputes",
        sidebarTitle: "دعاوی کارگری و کارفرمایی",
        heading: "دعاوی کارگری و کارفرمایی",
        cards: [
          { id: 201, title: "تنظیم لایحه دفاعیه اداره کار", icon: "📑" },
          { id: 202, title: "مدیریت قراردادهای کار و پرسنلی", icon: "👔" },
          { id: 203, title: "مشاوره جرائم و حسابرسی تامین اجتماعی", icon: "🏛️" },
          { id: 204, title: "داوری و حل اختلاف کارگاهی", icon: "🔨" },
        ],
      },
    ],
  },
};

const DepartmentDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); // افزوده شد برای مسیردهی بر اساس ID دوره

  // گرفتن کلید مربوط به دپارتمان از روی URL یا پیش‌فرض مدیریت
  const deptKey = slug ? slug.toLowerCase() : "management";
  const dept = departmentsData[deptKey];

  // نگه داشتن شناسه بخش فعال
  const [activeSectionId, setActiveSectionId] = useState("");

  // با تغییر صفحه و slug، بخش اول همان دپارتمان به حالت فعال برگردد
  useEffect(() => {
    if (dept && dept.sections && dept.sections.length > 0) {
      setActiveSectionId(dept.sections[0].id);
    }
  }, [slug]);

  if (!dept) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", direction: "rtl" }}>
        <h2>اطلاعات این دپارتمان هنوز ثبت نشده است.</h2>
        <Link to="/" style={{ color: "#139a9c", marginTop: "15px", display: "inline-block" }}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const currentSection =
    dept.sections.find((sec) => sec.id === activeSectionId) || dept.sections[0];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px",
        direction: "rtl",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "var(--text-primary, #0b2545)",
          fontWeight: "bold",
        }}
      >
        {dept.title}
      </h1>

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* سایدبار سمت راست */}
        <div
          style={{
            flex: "0 0 280px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {dept.sections.map((sec, index) => {
            const isActive = sec.id === currentSection.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSectionId(sec.id)}
                style={{
                  width: "100%",
                  textAlign: "right",
                  padding: "16px 18px",
                  fontSize: "13px",
                  border: "none",
                  borderBottom:
                    index !== dept.sections.length - 1
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "none",
                  backgroundColor: isActive ? "rgba(19, 154, 156, 0.15)" : "transparent",
                  color: isActive ? "#139a9c" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderRight: isActive
                    ? "4px solid #139a9c"
                    : "4px solid transparent",
                }}
              >
                {sec.sidebarTitle}
              </button>
            );
          })}
        </div>

        {/* بخش اصلی محتوای کارت‌ها */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "24px",
              color: "var(--text-primary, #ffffff)",
              fontWeight: "700",
            }}
          >
            {currentSection.heading}
          </h2>

          {!currentSection.isDownload ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "20px",
              }}
            >
              {currentSection.cards && currentSection.cards.length > 0 ? (
                currentSection.cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => navigate(`/courses/${card.id}`)} // انتقال کاربر به صفحه جزئیات دوره
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "24px 16px",
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.03)";
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                      {card.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "var(--text-primary, #ffffff)",
                        lineHeight: "1.5",
                      }}
                    >
                      {card.title}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8" }}>موردی برای نمایش وجود ندارد.</p>
              )}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "8px" }}>
                  {currentSection.content?.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                  {currentSection.content?.description}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#139a9c",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                📥 دریافت فایل ({currentSection.content?.fileSize})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;