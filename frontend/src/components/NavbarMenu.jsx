import React, { useState } from "react";
import { Link } from "react-router-dom";

// داده‌های مگا منو برای دوره‌های آموزشی
const coursesMegaMenu = [
  {
    title: "دوره‌های مهندسی",
    items: [
      "دپارتمان مکانیک",
      "دپارتمان عمران",
      "دپارتمان صنایع",
      "دپارتمان معماری",
      "دپارتمان برق",
      "دپارتمان کامپیوتر",
      "دپارتمان خودرو",
      "دپارتمان متالورژی",
      "دپارتمان رباتیک",
    ],
  },
  {
    title: "دوره‌های مهارتی",
    items: [
      "دپارتمان مالی و بازرگانی",
      "دپارتمان مدیریت و کسب‌وکار",
      "دپارتمان هنرهای دیجیتال",
      "دپارتمان طلا و جواهر",
      "دپارتمان مد و پوشاک",
      "دپارتمان زبان‌های خارجی",
      "دپارتمان خدمات تغذیه‌ای",
      "دپارتمان کودک و نوجوان",
      "دپارتمان تاسیسات و تهویه مطبوع",
      "دپارتمان تعمیرات لوازم خانگی",
      "دپارتمان انرژی",
      "دپارتمان خدمات آموزشی",
      "دپارتمان روانشناسی",
      "دپارتمان توسعه مهارت‌های فردی",
    ],
  },
  {
    title: "دوره‌های اختصاصی",
    items: ["تک دوره‌ای", "پودمانی", "دوره‌های سازمانی", "پک‌های آموزشی"],
  },
  {
    title: "رویدادهای آموزشی",
    items: [
      "کنفرانس P3.express",
      "کنفرانس OMIMO",
      "رویداد گپ",
      "ورکشاپ‌های آموزشی",
      "سمینارهای آموزشی",
      "وبینارهای آموزشی",
    ],
  },
];

// داده‌های منوهای دراپ‌داون معمولی
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

const NavbarMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary, #1e293b)",
        direction: "rtl",
        position: "relative",
      }}
    >
      {/* ۱. صفحه اصلی */}
      <Link
        to="/"
        style={{
          color: "inherit",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        صفحه اصلی
      </Link>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۲. دوره‌های آموزشی (Mega Menu) */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setActiveDropdown("courses")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <span>دوره‌های آموزشی</span>
          <span style={{ fontSize: "10px", marginTop: "2px" }}>▼</span>
        </div>

        {/* مگا منوی کشویی */}
        {activeDropdown === "courses" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "50%",
              transform: "translateX(50%)",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              borderRadius: "12px",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
              gap: "24px",
              zIndex: 1000,
              width: "max-content",
              border: "1px solid #e2e8f0",
            }}
          >
            {coursesMegaMenu.map((col, idx) => (
              <div key={idx} style={{ textAlign: "right" }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "var(--brand-blue-dark, #0b2545)",
                    marginBottom: "12px",
                    paddingBottom: "6px",
                    borderBottom: "2px solid #f1f5f9",
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to="#"
                        style={{
                          color: "#475569",
                          textDecoration: "none",
                          fontSize: "13px",
                          transition: "color 0.2s",
                          display: "block",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "var(--brand-blue-cyan, #139a9c)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "#475569")
                        }
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۳. خدمات ویژه بازارکار */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setActiveDropdown("marketServices")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <span>خدمات ویژه بازارکار</span>
          <span style={{ fontSize: "10px", marginTop: "2px" }}>▼</span>
        </div>

        {activeDropdown === "marketServices" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              padding: "10px 0",
              minWidth: "180px",
              zIndex: 1000,
              border: "1px solid #e2e8f0",
            }}
          >
            {dropdownMenus.marketServices.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  color: "#334155",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۴. خدمات آموزشی */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setActiveDropdown("eduServices")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <span>خدمات آموزشی</span>
          <span style={{ fontSize: "10px", marginTop: "2px" }}>▼</span>
        </div>

        {activeDropdown === "eduServices" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              padding: "10px 0",
              minWidth: "180px",
              zIndex: 1000,
              border: "1px solid #e2e8f0",
            }}
          >
            {dropdownMenus.eduServices.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  color: "#334155",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۵. اخبار / مجله */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setActiveDropdown("news")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <span>اخبار و مقالات</span>
          <span style={{ fontSize: "10px", marginTop: "2px" }}>▼</span>
        </div>

        {activeDropdown === "news" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              padding: "10px 0",
              minWidth: "160px",
              zIndex: 1000,
              border: "1px solid #e2e8f0",
            }}
          >
            {dropdownMenus.news.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  color: "#334155",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۶. درباره ما */}
      <Link
        to="/about"
        style={{
          color: "inherit",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        درباره ما
      </Link>

      <span style={{ color: "#cbd5e1", fontWeight: "300" }}>|</span>

      {/* ۷. تماس با ما */}
      <Link
        to="/contact"
        style={{
          color: "inherit",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        تماس با ما
      </Link>
    </nav>
  );
};

export default NavbarMenu;