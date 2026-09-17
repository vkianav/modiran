import React, { useState } from "react";

const feedbacks = [
    {
        id: 1,
        name: "مدیر یک شرکت تولیدی",
        role: "مدیرعامل",
        text:
            "مشاوره‌ای که دریافت کردیم به ما کمک کرد مشکلات اصلی فرآیندهای سازمان را بهتر شناسایی کنیم و برای بهبود آن‌ها برنامه مشخصی داشته باشیم.",
    },
    {
        id: 2,
        name: "مدیر منابع انسانی",
        role: "مدیر منابع انسانی",
        text:
            "تجربه همکاری با مشاوران بسیار خوب بود. مهم‌ترین نکته برای ما، ارائه راهکارهای عملی و قابل اجرا برای سازمان بود.",
    },
    {
        id: 3,
        name: "مدیر یک مجموعه خدماتی",
        role: "مدیرعامل",
        text:
            "فرآیند انتخاب مشاور برای ما ساده و شفاف بود و توانستیم فرد متخصص متناسب با نیاز سازمان خود را پیدا کنیم.",
    },
];

function FeedbackSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeFeedback = feedbacks[activeIndex];

    const nextFeedback = () => {
        setActiveIndex(
            (prev) => (prev + 1) % feedbacks.length
        );
    };

    const previousFeedback = () => {
        setActiveIndex(
            (prev) =>
                (prev - 1 + feedbacks.length) %
                feedbacks.length
        );
    };

    return (
        <section
            id="feedback"
            className="feedback-section"
            dir="rtl"
        >
            <div className="feedback-container">

                <div className="feedback-header">
                    <span className="section-label">
                        تجربه مشتریان
                    </span>

                    <h2>
                        تجربه کسانی که با
                        <span> مدیران</span> همراه شده‌اند
                    </h2>

                    <p>
                        بخشی از تجربه مدیران و سازمان‌هایی که برای حل
                        مسائل خود از خدمات مشاوره‌ای استفاده کرده‌اند.
                    </p>
                </div>

                <div className="feedback-card">

                    <div className="quote-icon">
                        “
                    </div>

                    <div className="feedback-content">
                        <p className="feedback-text">
                            {activeFeedback.text}
                        </p>

                        <div className="feedback-person">
                            <div className="person-avatar">
                                {activeFeedback.name.charAt(0)}
                            </div>

                            <div>
                                <h3>{activeFeedback.name}</h3>
                                <span>{activeFeedback.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="feedback-controls">
                        <button
                            type="button"
                            onClick={previousFeedback}
                            aria-label="نظر قبلی"
                        >
                            →
                        </button>

                        <span>
                            {activeIndex + 1} / {feedbacks.length}
                        </span>

                        <button
                            type="button"
                            onClick={nextFeedback}
                            aria-label="نظر بعدی"
                        >
                            ←
                        </button>
                    </div>

                </div>

                <div className="feedback-dots">
                    {feedbacks.map((feedback, index) => (
                        <button
                            key={feedback.id}
                            type="button"
                            className={
                                index === activeIndex
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setActiveIndex(index)}
                            aria-label={`نظر ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default FeedbackSection;