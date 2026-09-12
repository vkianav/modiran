import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getConsultantsBasedOnServices } from '../services/api';

// Hook اختصاصی Typewriter
function useTypewriter(text, speed = 40, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId;
    let currentIndex = 0;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayed(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const HeroSection = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");

  // =========================
  // GET SERVICES FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError("");

        const response = await getServices();

        const data = response.data;

        // Supports:
        // response.data = [...]
        // response.data = { results: [...] }
        const serviceList = Array.isArray(data)
          ? data
          : data?.results || [];

        setServices(serviceList);
      } catch (error) {
        console.error("Error loading services:", error);
        setServiceError("خطا در دریافت حوزه‌های مشاوره.");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // =========================
  // SELECT / UNSELECT SERVICE
  // =========================
  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // =========================
  // SELECTED SERVICE OBJECTS
  // =========================
  const selectedServiceObjects = services.filter((service) =>
    selectedServices.includes(service.id)
  );

  // =========================
  // CONSULTANTS URL
  // =========================
  //
  // Example:
  //
  // /consultants?service=2&service=5
  //
  // This matches your Django backend:
  //
  // /api/consultants/?service=2&service=5
  //
  const consultantsUrl = (() => {
    if (selectedServices.length === 0) {
      return "/consultants";
    }

    const params = new URLSearchParams();

    selectedServices.forEach((serviceId) => {
      params.append("service", serviceId);
    });

    return `/consultants?${params.toString()}`;
  })();

  // =========================
  // HERO TYPEWRITER
  // =========================
  const headlineText =
    "شبکه اختصاصی مشاوران ارشد\nمدیریت و توسعه کسب‌وکار";

  const { displayed, done } = useTypewriter(
    headlineText,
    40,
    500
  );

  return (
    <section
      style={{
        padding: "90px 20px 70px",
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* =========================
          HERO TITLE
      ========================== */}
      <div>
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            color: "var(--accent-gold, #d4af37)",
            marginBottom: "20px",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
          }}
        >
          {displayed}

          {!done && (
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "1em",
                backgroundColor:
                  "var(--accent-gold, #d4af37)",
                marginRight: "6px",
                verticalAlign: "middle",
              }}
            />
          )}
        </h1>
      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <div>
        <p
          style={{
            fontSize: "17px",
            color: "var(--text-secondary, #8892b0)",
            marginBottom: "36px",
            lineHeight: "1.8",
            maxWidth: "750px",
            margin: "0 auto 36px",
          }}
        >
          ارائه راهکارهای تخصصی در زمینه استقرار ISO،
          عارضه‌یابی سازمان، بهینه‌سازی فرآیندها (ERP)
          و برگزاری سمینارهای مدیریتی.
        </p>
      </div>

      {/* =========================
          MAIN BUTTONS
      ========================== */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "65px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/consultants"
          style={{
            backgroundColor:
              "var(--accent-gold, #d4af37)",
            color:
              "var(--accent-gold-text, #0a192f)",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          مشاهده اساتید و مشاوران
        </Link>

        <Link
          to="/success-stories"
          style={{
            border:
              "1px solid var(--accent-gold, #d4af37)",
            color:
              "var(--accent-gold, #d4af37)",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          داستان‌های موفقیت
        </Link>
      </div>

      {/* =========================
          SERVICE FILTER
      ========================== */}
      <div
        style={{
          borderTop:
            "1px solid var(--border-color, rgba(212,175,55,0.15))",
          paddingTop: "40px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color:
              "var(--text-primary, #e6f1ff)",
            marginBottom: "8px",
          }}
        >
          به چه حوزه مشاوره‌ای نیاز دارید؟
        </h3>

        <p
          style={{
            fontSize: "14px",
            color:
              "var(--text-secondary, #8892b0)",
            marginBottom: "24px",
          }}
        >
          یک یا چند حوزه مورد نظر خود را انتخاب کنید
        </p>

        {/* =========================
            LOADING
        ========================== */}
        {loadingServices && (
          <p
            style={{
              color:
                "var(--text-secondary, #8892b0)",
              fontSize: "14px",
            }}
          >
            در حال دریافت حوزه‌های مشاوره...
          </p>
        )}

        {/* =========================
            ERROR
        ========================== */}
        {!loadingServices && serviceError && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
            }}
          >
            {serviceError}
          </p>
        )}

        {/* =========================
            SERVICES
        ========================== */}
        {!loadingServices &&
          !serviceError &&
          services.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              {services.map((service) => {
                const isSelected =
                  selectedServices.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() =>
                      toggleService(service.id)
                    }
                    style={{
                      padding: "10px 22px",
                      borderRadius: "25px",
                      border:
                        "1px solid var(--accent-gold, #d4af37)",
                      backgroundColor: isSelected
                        ? "var(--accent-gold, #d4af37)"
                        : "transparent",
                      color: isSelected
                        ? "var(--accent-gold-text, #0a192f)"
                        : "var(--text-primary, #e6f1ff)",
                      fontWeight: "500",
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span>{service.title}</span>

                    {isSelected && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        {/* =========================
            NO SERVICES
        ========================== */}
        {!loadingServices &&
          !serviceError &&
          services.length === 0 && (
            <p
              style={{
                color:
                  "var(--text-secondary, #8892b0)",
                fontSize: "14px",
              }}
            >
              حوزه‌ای برای نمایش وجود ندارد.
            </p>
          )}

        {/* =========================
            SELECTED SERVICES
        ========================== */}
        {selectedServices.length === 0 ? (
          <p
            style={{
              fontStyle: "italic",
              fontSize: "13px",
              color:
                "var(--text-secondary, #8892b0)",
              opacity: 0.7,
            }}
          >
            جهت مشاهده مشاوران مرتبط، یکی از حوزه‌های بالا
            را انتخاب کنید.
          </p>
        ) : (
          <div
            style={{
              backgroundColor:
                "var(--bg-secondary, #112240)",
              border:
                "1px solid var(--border-color, rgba(212,175,55,0.3))",
              borderRadius: "12px",
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              maxWidth: "650px",
              margin: "0 auto",
              transition: "all 0.3s ease",
            }}
          >
            {/* =========================
                SELECTED SERVICE NAMES
            ========================== */}
            <span
              style={{
                fontSize: "14px",
                color:
                  "var(--text-primary, #e6f1ff)",
                textAlign: "right",
                lineHeight: "1.8",
              }}
            >
              مشاوران مورد نظر برای:{" "}
              <strong
                style={{
                  color:
                    "var(--accent-gold, #d4af37)",
                }}
              >
                {selectedServiceObjects
                  .map((service) => service.title)
                  .join("، ")}
              </strong>
            </span>

            {/* =========================
                FILTERED CONSULTANTS LINK
            ========================== */}
            <Link
              to={consultantsUrl}
              style={{
                color:
                  "var(--accent-gold, #d4af37)",
                fontWeight: "bold",
                fontSize: "13px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              <span>مشاهده مشاوران</span>

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="19"
                  y1="12"
                  x2="5"
                  y2="12"
                />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// بخش انتشارات و کتاب‌ها
const BooksSection = () => {
  const booksData = [
    {
      id: 1,
      title: 'راهنمای محرمانه بازاریابی اینترنتی',
      category: 'کتاب تخصصی',
      price: '۴۳,۰۰۰',
      offPrice: '۲۹,۰۰۰',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      badge: 'پرفروش'
    },
    {
      id: 2,
      title: 'کتاب نقشه راه توسعه فردی',
      category: 'توسعه فردی',
      price: '۱۹۷,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      badge: 'جدید'
    },
    {
      id: 3,
      title: 'راهنمای محرمانه نوشتن تیترهای فوق جذاب',
      category: 'کپی‌رایتینگ',
      price: '۳۹,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
      badge: null
    },
    {
      id: 4,
      title: 'کتاب چرا مدیریت زمان جواب نمی‌دهد؟',
      category: 'مدیریت و رهبری',
      price: '۱۷۹,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
      badge: null
    }
  ];

  return (
    <section style={{ padding: '90px 20px', backgroundColor: 'var(--bg-primary, #0a192f)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '42px',
            fontWeight: 'bold',
            color: 'var(--border-color, rgba(212, 175, 55, 0.1))',
            letterSpacing: '3px',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            OUR PUBLISHING
          </span>
          <h2 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', position: 'relative' }}>
            انتشارات مدیران ایران
          </h2>
          <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            کتاب‌های منتشر شده توسط انتشارات «مدیران»، منبعی غنی از دانش و تجربه‌های مدیریتی هستند تا مدیران مهارت‌های خود را ارتقا دهند.
          </p>
          
          <div style={{ marginTop: '20px' }}>
            <Link to="/books" style={{
              backgroundColor: 'var(--accent-gold, #d4af37)',
              color: 'var(--accent-gold-text, #0a192f)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              لیست کامل کتاب‌ها 📚
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {booksData.map((book) => (
            <div key={book.id} style={{
              backgroundColor: 'var(--bg-secondary, #112240)',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(212, 175, 55, 0.2))',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              {book.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'var(--accent-gold, #d4af37)',
                  color: 'var(--accent-gold-text, #0a192f)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  {book.badge}
                </span>
              )}

              <div style={{ width: '100%', height: '240px', backgroundColor: 'var(--input-bg, #1d2d50)', overflow: 'hidden' }}>
                <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '12px', fontWeight: '500' }}>{book.category}</span>
                  <h3 style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '15px', margin: '8px 0 16px 0', lineHeight: '1.5' }}>
                    {book.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.05))' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {book.offPrice ? (
                      <>
                        <span style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '11px', textDecoration: 'line-through' }}>{book.price} تومان</span>
                        <span style={{ color: '#10b981', fontSize: '15px', fontWeight: 'bold' }}>{book.offPrice} تومان</span>
                      </>
                    ) : (
                      <span style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '15px', fontWeight: 'bold' }}>{book.price} تومان</span>
                    )}
                  </div>
                  
                  <Link to={`/books/${book.id}`} style={{
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent-gold, #d4af37)',
                    color: 'var(--accent-gold, #d4af37)',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}>
                    خرید اثر
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// بخش دوره‌های آنلاین همراه با مدال ثبت‌نام
const CoursesSection = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const coursesData = [
    {
      id: 1,
      title: 'دوره جامع هوش مصنوعی برای مدیران',
      instructor: 'دکتر ندا مقتدری / دکتر امین شاکری',
      price: '۱۵,۰۰۰,۰۰۰',
      type: 'دوره آنلاین کاربردی',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      badge: 'ویژه مدیران'
    },
    {
      id: 2,
      title: 'وبینار نقشه راه توسعه تفکر انتقادی',
      instructor: 'دکتر منا مناجاتی',
      price: 'رایگان',
      type: 'وبینار تخصصی',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      badge: 'وبینار'
    },
    {
      id: 3,
      title: 'مدیریت زمان و افزایش بهره‌وری سازمانی',
      instructor: 'تیم اساتید مدیران',
      price: '۱۷۹,۰۰۰',
      type: 'آموزش کاربردی',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
      badge: null
    },
    {
      id: 4,
      title: 'دوره آموزشی ایجاد ارتباط مؤثر در سازمان',
      instructor: 'استاد ارشد ارتباطات',
      price: '۷۵۰,۰۰۰',
      type: 'دوره ویدیویی',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      badge: 'جدید'
    }
  ];

  const handleOpenRegisterModal = (course) => {
    setSelectedCourse(course);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setFormData({ name: '', phone: '', email: '' });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2500);
  };

  return (
    <section style={{ padding: '90px 20px', backgroundColor: 'var(--bg-secondary, #112240)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '42px',
            fontWeight: 'bold',
            color: 'var(--border-color, rgba(212, 175, 55, 0.1))',
            letterSpacing: '3px',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            ONLINE COURSES
          </span>
          <h2 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', position: 'relative' }}>
            دوره‌های آنلاین مدیران ایران
          </h2>
          <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            با دوره‌های آنلاین مدیران، مهارت‌های مدیریتی، بازاریابی و رهبری را در هر زمان و هر مکان بیاموزید.
          </p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/events" style={{
              backgroundColor: 'var(--accent-gold, #d4af37)',
              color: 'var(--accent-gold-text, #0a192f)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              مشاهده همه دوره‌ها 💻
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {coursesData.map((course) => (
            <div key={course.id} style={{
              backgroundColor: 'var(--bg-primary, #0a192f)',
              borderRadius: '12px',
              border: '1px solid var(--border-color, rgba(212, 175, 55, 0.2))',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
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

              <div style={{ width: '100%', height: '170px', overflow: 'hidden' }}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#10b981', fontSize: '12px' }}>{course.type}</span>
                  <h3 style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '15px', margin: '8px 0', lineHeight: '1.5' }}>
                    {course.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '12px', marginBottom: '16px' }}>
                    مدرس: {course.instructor}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.05))' }}>
                  <span style={{ color: course.price === 'رایگان' ? '#10b981' : 'var(--accent-gold, #d4af37)', fontSize: '14px', fontWeight: 'bold' }}>
                    {course.price === 'رایگان' ? 'رایگان' : `${course.price} تومان`}
                  </span>

                  <button 
                    onClick={() => handleOpenRegisterModal(course)}
                    style={{
                      backgroundColor: 'var(--accent-gold, #d4af37)',
                      color: 'var(--accent-gold-text, #0a192f)',
                      padding: '7px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ثبت‌نام دوره
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* مدال تعاملی ثبت‌نام */}
        {selectedCourse && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-secondary, #112240)',
              border: '1px solid var(--border-color, rgba(212, 175, 55, 0.4))',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '480px',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <button 
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary, #8892b0)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>

              <h3 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                ثبت‌نام در دوره
              </h3>
              <p style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '14px', marginBottom: '20px' }}>
                {selectedCourse.title}
              </p>

              {isSubmitted ? (
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  padding: '16px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px'
                }}>
                  ثبت‌نام شما با موفقیت انجام شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary, #8892b0)', fontSize: '13px', marginBottom: '6px' }}>نام و نام خانوادگی *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--input-bg, #0a192f)',
                        border: '1px solid var(--border-color, rgba(212,175,55,0.3))',
                        borderRadius: '8px',
                        color: 'var(--text-primary, #ffffff)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary, #8892b0)', fontSize: '13px', marginBottom: '6px' }}>شماره همراه *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09123456789"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--input-bg, #0a192f)',
                        border: '1px solid var(--border-color, rgba(212,175,55,0.3))',
                        borderRadius: '8px',
                        color: 'var(--text-primary, #ffffff)',
                        fontSize: '14px',
                        outline: 'none',
                        direction: 'ltr',
                        textAlign: 'right'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary, #8892b0)', fontSize: '13px', marginBottom: '6px' }}>ایمیل (اختیاری)</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--input-bg, #0a192f)',
                        border: '1px solid var(--border-color, rgba(212,175,55,0.3))',
                        borderRadius: '8px',
                        color: 'var(--text-primary, #ffffff)',
                        fontSize: '14px',
                        outline: 'none',
                        direction: 'ltr',
                        textAlign: 'right'
                      }}
                    />
                  </div>

                  <button 
                    type="submit"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--accent-gold, #d4af37)',
                      color: 'var(--accent-gold-text, #0a192f)',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    تأیید و ثبت‌نام (مبلغ: {selectedCourse.price === 'رایگان' ? 'رایگان' : `${selectedCourse.price} تومان`})
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// جدیدترین اخبار
const NewsSection = () => {
  const newsList = [
    {
      id: 1,
      title: 'انتشار ویرایش جدید استاندارد سیستم‌های مدیریت کیفیت',
      category: 'استانداردها',
      date: '۲۰ شهریور ۱۴۰۵',
      summary: 'بررسی تغییرات کلیدی در دستورالعمل ممیزی سازمان‌ها و نحوه انطباق با الزامات جدید بین‌المللی.'
    },
    {
      id: 2,
      title: 'برگزاری دوره تخصصی پیاده‌سازی سیستم‌های ERP هوشمند',
      category: 'آموزش',
      date: '۱۵ شهریور ۱۴۰۵',
      summary: 'ثبت‌نام کارگاه عملی بهینه‌سازی منابع سازمانی با حضور اساتید و مشاوران ارشد صنعت آغاز شد.'
    },
    {
      id: 3,
      title: 'نقش عارضه‌یابی ساختاری در بقای بنگاه‌های اقتصادی',
      category: 'مقالات',
      date: '۰۸ شهریور ۱۴۰۵',
      summary: 'تحلیل راهکارهای افزایش بهره‌وری و کاهش هزینه‌های عملیاتی در سازمان‌های متوسط و بزرگ.'
    }
  ];

  return (
    <section style={{ padding: '100px 20px', backgroundColor: 'var(--bg-primary, #0a192f)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '45px' }}>
          <div>
            <h2 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
              جدیدترین اخبار و مقالات
            </h2>
            <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '15px' }}>
              آخرین رویدادها، اطلاعیه‌ها و مقالات حوزه مدیریت و مشاوره
            </p>
          </div>
          <Link 
            to="/events" 
            style={{ 
              color: 'var(--accent-gold, #d4af37)', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            آرشیو اخبار
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {newsList.map((news) => (
            <article 
              key={news.id}
              style={{
                backgroundColor: 'var(--bg-secondary, #112240)',
                borderRadius: '12px',
                padding: '28px',
                border: '1px solid var(--border-color, rgba(212,175,55,0.15))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-gold, #d4af37)', backgroundColor: 'var(--border-color, rgba(212,175,55,0.1))', padding: '4px 12px', borderRadius: '12px' }}>
                    {news.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary, #8892b0)' }}>
                    {news.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', color: 'var(--text-primary, #e6f1ff)', fontWeight: 'bold', marginBottom: '14px', lineHeight: '1.5' }}>
                  {news.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary, #8892b0)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {news.summary}
                </p>
              </div>

              <Link 
                to={`/events/${news.id}`} 
                style={{ 
                  color: '#10b981', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ادامه مطلب
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// رسانه و گالری
const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('videos');

  const mediaData = {
    videos: [
      {
        id: 1,
        title: 'استراتژی‌های یکپارچه‌سازی سازمان با ERP',
        author: 'دکتر محمدی - مشاور ارشد سیستم‌ها',
        cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        title: 'گزارش ویدیویی سمینار رهبری سازمان و استقرار ISO',
        author: 'رویداد تیرماه ۱۴۰۵',
        cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
      }
    ],
    photos: [
      {
        id: 1,
        title: 'جلسه عارضه‌یابی و پایش فرآیند در کارخانه صنعتی',
        tag: 'پروژه عملیاتی',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        title: 'کارگاه آموزش تخصصی ممیزی داخلی ISO 9001',
        tag: 'سمینار',
        img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 3,
        title: 'نشست هم‌اندیشی مدیران ارشد صنایع کشور',
        tag: 'همایش',
        img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80'
      }
    ]
  };

  return (
    <section style={{ padding: '100px 20px', backgroundColor: 'var(--bg-secondary, #112240)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            رسانه و رویدادهای مدیران
          </h2>
          <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '15px' }}>
            نگاهی به جلسات مشاوره، سمینارها و ویدیوهای آموزشی شبکه مشاوران
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '45px' }}>
          <button
            onClick={() => setActiveTab('videos')}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: '1px solid var(--accent-gold, #d4af37)',
              backgroundColor: activeTab === 'videos' ? 'var(--accent-gold, #d4af37)' : 'transparent',
              color: activeTab === 'videos' ? 'var(--accent-gold-text, #0a192f)' : 'var(--text-primary, #e6f1ff)',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ویدیوها و مصاحبه‌ها
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: '1px solid var(--accent-gold, #d4af37)',
              backgroundColor: activeTab === 'photos' ? 'var(--accent-gold, #d4af37)' : 'transparent',
              color: activeTab === 'photos' ? 'var(--accent-gold-text, #0a192f)' : 'var(--text-primary, #e6f1ff)',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            گالری تصاویر
          </button>
        </div>

        {activeTab === 'videos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {mediaData.videos.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: 'var(--bg-primary, #0a192f)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-color, rgba(212,175,55,0.2))' 
                }}
              >
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(10, 25, 47, 0.45)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--accent-gold, #d4af37)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--accent-gold-text, #0a192f)">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--text-primary, #e6f1ff)', marginBottom: '8px', lineHeight: '1.5' }}>{item.title}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary, #8892b0)' }}>{item.author}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'photos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {mediaData.photos.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: 'var(--bg-primary, #0a192f)', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-color, rgba(212,175,55,0.15))' 
                }}
              >
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '18px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent-gold, #d4af37)', backgroundColor: 'var(--border-color, rgba(212,175,55,0.1))', padding: '3px 10px', borderRadius: '4px' }}>
                    {item.tag}
                  </span>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-primary, #e6f1ff)', marginTop: '10px', lineHeight: '1.5' }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// انتقادات و پیشنهادات
const FeedbackSection = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '', type: 'پیشنهاد', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.message.trim()) {
      setSubmitted(true);
      setFormData({ name: '', mobile: '', type: 'پیشنهاد', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section style={{ padding: '100px 20px', backgroundColor: 'var(--bg-primary, #0a192f)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: 'var(--accent-gold, #d4af37)', fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
            انتقادات و پیشنهادات
          </h2>
          <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '15px' }}>
            دیدگاه‌ها و نظرات شما به ما در ارتقای کیفیت خدمات شبکه مدیران کمک می‌کند
          </p>
        </div>

        {submitted ? (
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '10px', padding: '24px', textAlign: 'center', color: '#10b981', fontSize: '15px' }}>
            پیام شما با موفقیت ثبت شد. از اینکه دیدگاه خود را با ما در میان گذاشتید سپاسگزاریم.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--bg-secondary, #112240)', padding: '36px', borderRadius: '14px', border: '1px solid var(--border-color, rgba(212,175,55,0.2))' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary, #e6f1ff)', marginBottom: '8px' }}>نام و نام خانوادگی (اختیاری)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--input-bg, #0a192f)', border: '1px solid var(--border-color, rgba(212,175,55,0.3))', color: 'var(--text-primary, #ffffff)', outline: 'none', fontSize: '14px' }} 
                  placeholder="مثال: علی حسینی"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary, #e6f1ff)', marginBottom: '8px' }}>شماره تماس (اختیاری)</label>
                <input 
                  type="text" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--input-bg, #0a192f)', border: '1px solid var(--border-color, rgba(212,175,55,0.3))', color: 'var(--text-primary, #ffffff)', outline: 'none', fontSize: '14px', direction: 'ltr', textAlign: 'right' }} 
                  placeholder="09123456789"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary, #e6f1ff)', marginBottom: '8px' }}>نوع پیام</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--input-bg, #0a192f)', border: '1px solid var(--border-color, rgba(212,175,55,0.3))', color: 'var(--text-primary, #ffffff)', outline: 'none', fontSize: '14px' }}
              >
                <option value="پیشنهاد">پیشنهاد</option>
                <option value="انتقاد">انتقاد</option>
                <option value="گزارش مشکل">گزارش مشکل سامانه</option>
              </select>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary, #e6f1ff)', marginBottom: '8px' }}>متن پیام *</label>
              <textarea 
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: 'var(--input-bg, #0a192f)', border: '1px solid var(--border-color, rgba(212,175,55,0.3))', color: 'var(--text-primary, #ffffff)', outline: 'none', fontSize: '14px', resize: 'vertical' }}
                placeholder="توضیحات خود را بنویسید..."
              />
            </div>

            <button 
              type="submit" 
              style={{ backgroundColor: 'var(--accent-gold, #d4af37)', color: 'var(--accent-gold-text, #0a192f)', padding: '14px 28px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', width: '100%', transition: 'all 0.3s ease' }}
            >
              ارسال پیام
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

// کامپوننت اصلی
const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary, #0a192f)', color: 'var(--text-primary, #ffffff)', minHeight: '100vh', direction: 'rtl', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <HeroSection />

      {/* بخش راهکارها */}
      <section id="solutions" style={{ padding: '100px 20px', backgroundColor: 'var(--bg-secondary, #112240)', borderTop: '1px solid var(--border-color, rgba(212,175,55,0.15))' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--accent-gold, #d4af37)', textAlign: 'center', fontSize: '28px', marginBottom: '50px', fontWeight: 'bold' }}>
            راهکارها و خدمات تخصصی مدیران
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ backgroundColor: 'var(--bg-primary, #0a192f)', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(212,175,55,0.2))' }}>
              <h3 style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '19px', marginBottom: '12px', fontWeight: 'bold' }}>استقرار سیستم‌های ایزو (ISO)</h3>
              <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '14px', lineHeight: '1.7' }}>مشاوره و پیاده‌سازی استانداردهای بین‌المللی کیفیت، ایمنی و محیط زیست.</p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-primary, #0a192f)', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(212,175,55,0.2))' }}>
              <h3 style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '19px', marginBottom: '12px', fontWeight: 'bold' }}>عارضه‌یابی و راهکارهای ERP</h3>
              <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '14px', lineHeight: '1.7' }}>یکپارچه‌سازی منابع سازمان و بهینه‌سازی جریان‌های کاری جهت افزایش بهره‌وری.</p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-primary, #0a192f)', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(212,175,55,0.2))' }}>
              <h3 style={{ color: 'var(--text-primary, #e6f1ff)', fontSize: '19px', marginBottom: '12px', fontWeight: 'bold' }}>سمینارها و دوره‌های آموزشی</h3>
              <p style={{ color: 'var(--text-secondary, #8892b0)', fontSize: '14px', lineHeight: '1.7' }}>برگزاری همایش‌ها و کارگاه‌های تخصصی ارتقای مهارتی مدیران ارشد.</p>
            </div>
          </div>
        </div>
      </section>

      <BooksSection />
      <CoursesSection />
      <NewsSection />
      <MediaSection />
      <FeedbackSection />
    </div>
  );
};

export default Home;