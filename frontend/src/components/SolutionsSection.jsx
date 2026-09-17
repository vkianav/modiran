import React from "react";
import { Link } from "react-router-dom";

const solutions = [
    {
        id: 1,
        icon: "◎",
        title: "استقرار سیستم‌های ایزو (ISO)",
        description:
            "طراحی، استقرار و بهبود سیستم‌های مدیریتی و استانداردهای بین‌المللی متناسب با نیاز سازمان.",
        features: [
            "ISO 9001",
            "ISO 14001",
            "ISO 45001",
            "طراحی مستندات",
        ],
    },
    {
        id: 2,
        icon: "◇",
        title: "عارضه‌یابی و راهکارهای ERP",
        description:
            "شناسایی چالش‌های سازمانی و ارائه راهکارهای عملی برای بهبود فرآیندها و یکپارچه‌سازی سیستم‌ها.",
        features: [
            "تحلیل فرآیندها",
            "عارضه‌یابی سازمان",
            "بهینه‌سازی فرآیند",
            "ERP",
        ],
    },
    {
        id: 3,
        icon: "▣",
        title: "سمینارها و دوره‌های آموزشی",
        description:
            "برگزاری دوره‌ها، کارگاه‌ها و سمینارهای تخصصی با حضور اساتید و مشاوران باتجربه.",
        features: [
            "دوره‌های مدیریتی",
            "کارگاه‌های تخصصی",
            "سمینار سازمانی",
            "آموزش مدیران",
        ],
    },
];

function SolutionsSection() {
    return (
        <section
            id="solutions"
            className="solutions-section"
            dir="rtl"
        >
            <div className="solutions-container">

                <div className="solutions-header">
                    <span className="section-label">راهکارهای تخصصی</span>

                    <h2>
                        راهکارهایی برای
                        <span> رشد و توسعه سازمان</span>
                    </h2>

                    <p>
                        با کمک شبکه‌ای از مشاوران و متخصصان باتجربه، چالش‌های
                        سازمان خود را شناسایی کرده و برای آن‌ها راهکارهای عملی
                        و تخصصی دریافت کنید.
                    </p>
                </div>

                <div className="solutions-grid">
                    {solutions.map((solution) => (
                        <article
                            className="solution-card"
                            key={solution.id}
                        >
                            <div className="solution-icon">
                                {solution.icon}
                            </div>

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

                            <Link
                                to="/consultants"
                                className="solution-link"
                            >
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