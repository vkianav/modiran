import React from "react";
import { Link } from "react-router-dom";

const news = [
    {
        id: 1,
        title: "نقش تحول دیجیتال در آینده سازمان‌ها",
        category: "تحول دیجیتال",
        date: "۲۵ شهریور ۱۴۰۵",
        excerpt:
            "بررسی تأثیر فناوری‌های جدید بر فرآیندهای سازمانی و تصمیم‌گیری مدیران.",
    },
    {
        id: 2,
        title: "چگونه فرآیندهای سازمانی خود را بهبود دهیم؟",
        category: "مدیریت فرآیند",
        date: "۱۸ شهریور ۱۴۰۵",
        excerpt:
            "نگاهی به روش‌های شناسایی نقاط ضعف و بهینه‌سازی فرآیندهای کسب‌وکار.",
    },
    {
        id: 3,
        title: "اهمیت آموزش مستمر مدیران",
        category: "آموزش",
        date: "۱۰ شهریور ۱۴۰۵",
        excerpt:
            "چرا توسعه مهارت‌های مدیریتی باید بخشی از برنامه رشد هر سازمان باشد؟",
    },
];

function NewsSection() {
    return (
        <section
            id="news"
            className="news-section"
            dir="rtl"
        >
            <div className="news-container">

                <div className="news-header">
                    <div>
                        <span className="section-label">
                            دانش و بینش
                        </span>

                        <h2>
                            آخرین مطالب
                            <span> مدیران</span>
                        </h2>

                        <p>
                            مقالات، تحلیل‌ها و مطالب تخصصی در حوزه مدیریت
                            و توسعه کسب‌وکار.
                        </p>
                    </div>

                    <Link
                        to="/news"
                        className="section-more-link"
                    >
                        مشاهده همه مطالب
                        <span>←</span>
                    </Link>
                </div>

                <div className="news-grid">
                    {news.map((item) => (
                        <article
                            className="news-card"
                            key={item.id}
                        >
                            <div className="news-meta">
                                <span>{item.category}</span>
                                <span>{item.date}</span>
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.excerpt}</p>

                            <Link
                                to={`/news/${item.id}`}
                                className="news-link"
                            >
                                ادامه مطلب
                                <span>←</span>
                            </Link>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default NewsSection;