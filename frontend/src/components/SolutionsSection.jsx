import React from "react";
import { Link } from "react-router-dom";

const solutions = [
  {
    id: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: "استقرار سیستم‌های ایزو (ISO)",
    description:
      "طراحی، استقرار و بهبود سیستم‌های مدیریتی و استانداردهای بین‌المللی متناسب با نیاز سازمان.",
    features: ["ISO 9001", "ISO 14001", "ISO 45001", "طراحی مستندات"],
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "عارضه‌یابی و راهکارهای ERP",
    description:
      "شناسایی چالش‌های سازمانی و ارائه راهکارهای عملی برای بهبود فرآیندها و یکپارچه‌سازی سیستم‌ها.",
    features: ["تحلیل فرآیندها", "عارضه‌یابی سازمان", "بهینه‌سازی فرآیند", "ERP"],
  },
  {
    id: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "سمینارها و دوره‌های آموزشی",
    description:
      "برگزاری دوره‌ها، کارگاه‌ها و سمینارهای تخصصی با حضور اساتید و مشاوران باتجربه.",
    features: ["دوره‌های مدیریتی", "کارگاه‌های تخصصی", "سمینار سازمانی", "آموزش مدیران"],
  },
];

function SolutionsSection() {
  return (
    <section id="solutions" className="solutions-section" dir="rtl">
      <div className="solutions-container">
        <div className="solutions-header">
          <span className="section-label">راهکارهای تخصصی</span>
          <h2>
            راهکارهایی برای <span>رشد و توسعه سازمان</span>
          </h2>
          <p>
            با کمک شبکه‌ای از مشاوران و متخصصان باتجربه، چالش‌های سازمان خود را شناسایی کرده و برای آن‌ها راهکارهای عملی و تخصصی دریافت کنید.
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution) => (
            <article className="solution-card" key={solution.id}>
              <div className="solution-icon">{solution.icon}</div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <div className="solution-features">
                {solution.features.map((feature) => (
                  <span key={feature}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </span>
                ))}
              </div>
              <Link to="/consultants" className="solution-link">
                مشاهده مشاوران
                <span>←</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;