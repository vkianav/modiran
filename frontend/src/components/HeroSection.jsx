import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const useTypewriter = (
  text,
  speed = 40,
  startDelay = 500
) => {
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
  services,
  selectedServices,
  loadingServices,
  serviceError,
  toggleService,
  selectedServiceObjects,
  consultantsUrl,
}) => {
  const headlineText =
    "شبکه اختصاصی مشاوران ارشد\nمدیریت و توسعه کسب‌وکار";

  const typedHeadline = useTypewriter(
    headlineText,
    40,
    500
  );

  return (
    <section
      style={{
        padding: "100px 20px 80px",
        backgroundColor:
          "var(--bg-primary, #0a192f)",
        position: "relative",
        overflow: "hidden",
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
            color:
              "var(--text-primary, #ffffff)",
            fontSize: "clamp(32px, 5vw, 54px)",
            lineHeight: "1.5",
            fontWeight: "bold",
            marginBottom: "25px",
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
            margin: "0 auto 35px",
            color:
              "var(--text-secondary, #8892b0)",
            fontSize: "16px",
            lineHeight: "2",
          }}
        >
          ارائه راهکارهای تخصصی در زمینه استقرار ISO،
          عارضه‌یابی سازمان، بهینه‌سازی فرآیندها (ERP)
          و برگزاری سمینارهای مدیریتی.
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
            marginBottom: "70px",
          }}
        >
          <Link
            to="/consultants"
            style={{
              backgroundColor:
                "var(--accent-gold, #d4af37)",
              color: "#0a192f",
              padding: "13px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
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
              padding: "12px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            داستان‌های موفقیت
          </Link>
        </motion.div>

        {/* Service selection */}
        <div>
          <h2
            style={{
              color:
                "var(--text-primary, #ffffff)",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            به چه حوزه مشاوره‌ای نیاز دارید؟
          </h2>

          <p
            style={{
              color:
                "var(--text-secondary, #8892b0)",
              fontSize: "14px",
              marginBottom: "30px",
            }}
          >
            یک یا چند حوزه مورد نظر خود را انتخاب کنید
          </p>

          {loadingServices && (
            <p
              style={{
                color:
                  "var(--text-secondary, #8892b0)",
              }}
            >
              در حال دریافت حوزه‌های مشاوره...
            </p>
          )}

          {serviceError && (
            <p
              style={{
                color: "#e57373",
                marginBottom: "20px",
              }}
            >
              {serviceError}
            </p>
          )}

          {!loadingServices &&
            !serviceError &&
            services.length === 0 && (
              <p
                style={{
                  color:
                    "var(--text-secondary, #8892b0)",
                }}
              >
                حوزه‌ای برای نمایش وجود ندارد.
              </p>
            )}

          {!loadingServices &&
            services.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {services.map((service) => {
                  const isSelected =
                    selectedServices.includes(
                      service.id
                    );

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() =>
                        toggleService(service.id)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: `1px solid ${
                          isSelected
                            ? "var(--accent-gold, #d4af37)"
                            : "var(--border-color, rgba(212,175,55,0.2))"
                        }`,
                        backgroundColor: isSelected
                          ? "var(--accent-gold, #d4af37)"
                          : "transparent",
                        color: isSelected
                          ? "#0a192f"
                          : "var(--text-primary, #ffffff)",
                        transition:
                          "all 0.25s ease",
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
          {!loadingServices &&
            selectedServiceObjects.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                style={{
                  marginTop: "35px",
                  padding: "20px",
                  backgroundColor:
                    "var(--bg-secondary, #112240)",
                  border:
                    "1px solid var(--border-color, rgba(212,175,55,0.2))",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    color:
                      "var(--text-primary, #ffffff)",
                    marginBottom: "15px",
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
                      .map(
                        (service) =>
                          service.title
                      )
                      .join("، ")}
                  </strong>
                </p>

                <Link
                  to={consultantsUrl}
                  style={{
                    color:
                      "var(--accent-gold, #d4af37)",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  مشاهده مشاوران
                  <span
                    style={{
                      marginRight: "8px",
                    }}
                  >
                    ←
                  </span>
                </Link>
              </motion.div>
            )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;