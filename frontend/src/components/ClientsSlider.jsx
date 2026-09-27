import React, { useRef } from "react";

// داده‌های نمونه لوگوی مشتریان (مسیر تصویر لوگوها را متناسب با پروژه خود جایگزین کنید)
const clients = [
  { id: 1, name: "شرکت ملی پالایش و پخش فرآورده‌های نفتی ایران", logo: "/assets/images/clients/niordc.png" },
  { id: 2, name: "نیروکلر", logo: "/assets/images/clients/chloor.png" },
  { id: 3, name: "شرکت بهسازان صنایع خاورمیانه", logo: "/assets/images/clients/behsazan.png" },
  { id: 4, name: "شرکت فراتجهیز آرمان پژوه", logo: "/assets/images/clients/faratjhiz.png" },
  { id: 5, name: "مشتری جدید ۱", logo: "/assets/images/clients/client5.png" },
  { id: 6, name: "مشتری جدید ۲", logo: "/assets/images/clients/client6.png" },
];

const ClientsSlider = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: "100%", padding: "50px 20px", textAlign: "center" }}>
      {/* تیتر بخش */}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "800",
          color: "var(--brand-blue-dark, #0b2545)",
          marginBottom: "35px",
        }}
      >
        مشتریانی که به ما اعتماد کردند...
      </h2>

      {/* کانتینر اسلایدر و فلش‌ها */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          gap: "12px",
        }}
      >
        {/* دکمه راست */}
        <button
          onClick={() => handleScroll("right")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--brand-blue-cyan, #139a9c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            zIndex: 2,
          }}
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* لیست اسکرول‌پذیر لوگوها */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "10px 0",
            width: "100%",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
          className="hide-scrollbar"
        >
          {clients.map((client) => (
            <div
              key={client.id}
              style={{
                flex: "0 0 auto",
                width: "180px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                filter: "grayscale(20%)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(20%)")}
            >
              <img
                src={client.logo}
                alt={client.name}
                title={client.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  // متنی جایگزین در صورت عدم وجود فایل تصویر
                  e.target.style.display = "none";
                  e.target.parentNode.innerText = client.name;
                }}
              />
            </div>
          ))}
        </div>

        {/* دکمه چپ */}
        <button
          onClick={() => handleScroll("left")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--brand-blue-cyan, #139a9c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            zIndex: 2,
          }}
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClientsSlider;