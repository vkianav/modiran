import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IntroVideoSection from "./IntroVideoSection";
import DepartmentList from "./DepartmentList";

const useTypewriter = (text, speed = 40, startDelay = 500) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [text, speed, startDelay]);

  return displayedText;
};

const HeroSection = ({
  services = [],
  selectedServices = [],
  loadingServices = false,
  serviceError = null,
  toggleService,
  selectedServiceObjects = [],
  consultantsUrl = "/consultants",
}) => {
  const headlineText = "شبکه اختصاصی مشاوران ارشد\nمدیریت و توسعه کسب‌وکار";
  const typedHeadline = useTypewriter(headlineText, 40, 500);

  return (
    <section
      style={{
        padding: "10px 10px 20px",
        backgroundColor: "var(--bg-primary, #f8fafc)",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            whiteSpace: "pre-line",
            color: "var(--brand-blue-dark, #0b2545)",
            fontSize: "clamp(32px, 5vw, 54px)",
            lineHeight: "1.5",
            fontWeight: "800",
            marginBottom: "15px",
            fontFamily: "var(--font-family, inherit)",
          }}
        >
          {typedHeadline}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            maxWidth: "750px",
            margin: "0 auto 15px",
            color: "var(--text-secondary, #475569)",
            fontSize: "16px",
            lineHeight: "2",
            fontFamily: "var(--font-family, inherit)",
          }}
        >
          ارائه راهکارهای تخصصی در زمینه استقرار ISO، عارضه‌یابی سازمان، بهینه‌سازی فرآیندها (ERP) و برگزاری سمینارهای مدیریتی.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          <Link
            to="/consultants"
            style={{
              backgroundColor: "var(--accent-gold, #e7c03e)",
              color: "#0b2545",
              padding: "13px 28px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 14px rgba(212, 175, 55, 0.25)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
          >
            مشاهده اساتید و مشاوران
          </Link>

          <Link
            to="/success-stories"
            style={{
              border: "1px solid var(--brand-blue-cyan, #139a9c)",
              color: "var(--brand-blue-cyan, #139a9c)",
              backgroundColor: "transparent",
              padding: "12px 28px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            داستان‌های موفقیت
          </Link>
        </motion.div>

        {/* بخش ویدیوها و بنر */}
        <div style={{ marginBottom: "60px" }}>
          <IntroVideoSection />
        </div>

        {/* Service selection */}
        <div>
          <h2
            style={{
              color: "var(--brand-blue-dark, #0b2545)",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            به چه حوزه مشاوره‌ای نیاز دارید؟
          </h2>

          <p
            style={{
              color: "var(--text-secondary, #475569)",
              fontSize: "14px",
              marginBottom: "30px",
            }}
          >
            یک یا چند حوزه مورد نظر خود را انتخاب کنید
          </p>

          {/* دکمه‌های کادری (فیلتر کردن مشاوران) */}
          {loadingServices && (
            <p style={{ color: "var(--text-secondary, #475569)" }}>
              در حال دریافت حوزه‌های مشاوره...
            </p>
          )}

          {serviceError && (
            <p style={{ color: "#e53e3e", marginBottom: "20px" }}>
              {serviceError}
            </p>
          )}

          {!loadingServices && !serviceError && services.length === 0 && (
            <p style={{ color: "var(--text-secondary, #475569)" }}>
              حوزه‌ای برای نمایش وجود ندارد.
            </p>
          )}

          {!loadingServices && services.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "60px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {services.map((service) => {
                const isSelected = selectedServices.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "11px 18px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      backgroundColor: isSelected
                        ? "var(--brand-green, #d4af37)"
                        : "var(--bg-card, #e9d8d8)",
                      color: isSelected
                        ? "#ffffff"
                        : "var(--text-primary, #0f172a)",
                      fontWeight: isSelected ? "600" : "normal",
                      boxShadow: isSelected
                        ? "0 4px 12px rgba(19, 154, 156, 0.2)"
                        : "none",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {isSelected && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                    )}

                    {service.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected services */}
          {!loadingServices && selectedServiceObjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: "35px",
                padding: "20px",
                backgroundColor: "var(--bg-card, #ffffff)",
                border: "1px solid var(--border-color, #e2e8f0)",
                borderRadius: "12px",
                boxShadow: "var(--card-shadow, 0 4px 20px rgba(11, 37, 69, 0.06))",
              }}
            >
              <p
                style={{
                  color: "var(--text-primary, #0f172a)",
                  marginBottom: "15px",
                  fontSize: "15px",
                }}
              >
                مشاوران مورد نظر برای:{" "}
                <strong
                  style={{
                    color: "var(--brand-blue-cyan, #139a9c)",
                  }}
                >
                  {selectedServiceObjects
                    .map((service) => service.title)
                    .join("، ")}
                </strong>
              </p>

              <Link
                to={consultantsUrl}
                style={{
                  color: "var(--brand-blue-dark, #0b2545)",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                مشاهده مشاوران
                <span>←</span>
              </Link>
            </motion.div>
          )}
        </div>
        <DepartmentList />
      </div>
    </section>
  );
};

export default HeroSection;