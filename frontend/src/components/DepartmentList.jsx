import React from "react";
import { Link } from "react-router-dom";

// لیست دپارتمان‌ها با حفظ دقیق name و slug شما و متصل به آیکون‌های تصویری
export const departmentsList = [
    {
        name: "دپارتمان مدیریت و استراتژی",
        slug: "management",
        icon: "/images/departments/management.png", // آیکون استراتژی و برنامه‌ریزی

    },
    {
        name: "دپارتمان مالی و بازرگانی",
        slug: "finance",
        icon: "/images/departments/finance.png", // آیکون امور مالی

    },
    {
        name: "دپارتمان صنایع و ERP",
        slug: "erp",
        icon: "/images/departments/erp.png", // آیکون عملیات و تولید

    },
    {
        name: "دپارتمان فناوری اطلاعات (IT)",
        slug: "it",
        icon: "/images/departments/IT.png", // آیکون فناوری اطلاعات

    },
    {
        name: "دپارتمان منابع انسانی",
        slug: "hr",
        icon: "/images/departments/hr.png", // آیکون منابع انسانی

    },
    {
        name: "دپارتمان بازاریابی و فروش",
        slug: "sales",
        icon: "/images/departments/marketing.png", // آیکون بازاریابی و فروش

    },
    {
        name: "دپارتمان استقرار ISO و کیفیت",
        slug: "iso",
        icon: "/images/departments/business.png", // آیکون توسعه کسب‌وبار / مدیرعامل

    },
    {
        name: "دپارتمان حقوقی و قراردادها",
        slug: "legal",
        icon: "/images/departments/legal.png", // آیکون حقوقی و قراردادها

    },
];

const DepartmentList = () => {
    return (
        <div
            className="departments-section-wrapper"
            style={{
                position: "relative",
                borderRadius: "28px",
                padding: "50px 32px",
                margin: "40px 0",
                overflow: "hidden",
                background: `
          radial-gradient(circle at 15% 20%, rgba(19, 154, 156, 0.15) 0%, transparent 45%),
          radial-gradient(circle at 85% 80%, rgba(11, 37, 69, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)
        `,
                border: "1px solid rgba(19, 154, 156, 0.2)",
                boxShadow: "0 20px 40px -15px rgba(11, 37, 69, 0.07)",
            }}
        >
            {/* الگوی پس‌زمینه نقطه‌ای */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(var(--brand-blue-cyan, #139a9c) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                    opacity: 0.08,
                    pointerEvents: "none",
                }}
            />

            {/* هدر بخش */}
            <div style={{ textAlign: "center", marginBottom: "36px", position: "relative", zIndex: 1 }}>
                <span
                    style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        backgroundColor: "rgba(19, 154, 156, 0.1)",
                        color: "var(--brand-blue-cyan, #139a9c)",
                        fontSize: "13px",
                        fontWeight: "700",
                        marginBottom: "12px",
                        letterSpacing: "0.5px",
                    }}
                >
                    دسترسی سریع
                </span>
                <h3
                    style={{
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "var(--brand-blue-dark, #0b2545)",
                        marginBottom: "10px",
                    }}
                >
                    دپارتمان‌های تخصصی
                </h3>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#64748b",
                        margin: "0 auto",
                        maxWidth: "500px",
                        lineHeight: "1.6",
                    }}
                >
                    جهت مشاهده خدمات، مشاوران و اطلاعات هر دپارتمان، بخش مورد نظر را انتخاب کنید
                </p>
            </div>

            {/* شبکه دپارتمان‌ها */}
            <div
                className="departments-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                    maxWidth: "860px",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {departmentsList.map((dept, index) => (
                    <Link
                        key={index}
                        to={`/department/${dept.slug}`}
                        style={{
                            textDecoration: "none",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "16px",
                            padding: "18px 22px",
                            borderRadius: "20px",
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(226, 232, 240, 0.8)",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.backgroundColor = "#ffffff";
                            e.currentTarget.style.borderColor = dept.accentColor || "var(--brand-blue-cyan, #139a9c)";
                            e.currentTarget.style.boxShadow = `0 12px 28px ${dept.accentColor ? `${dept.accentColor}30` : "rgba(19, 154, 156, 0.2)"
                                }`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
                            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.03)";
                        }}
                    >
                        {/* تصویر آیکون با ابعاد متناسب */}
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                overflow: "hidden",
                                backgroundColor: dept.accentColor ? `${dept.accentColor}10` : "rgba(19, 154, 156, 0.1)",
                            }}
                        >
                            <img
                                src={dept.icon}
                                alt={dept.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "700",
                                    textAlign: "right",
                                    color: "var(--brand-blue-dark, #0b2545)",
                                    lineHeight: "1.4",
                                }}
                            >
                                {dept.name}
                            </span>
                            <span style={{ fontSize: "12px", color: "var(--brand-blue-cyan, #139a9c)", fontWeight: "500" }}>
                                مشاهده جزییات ←
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DepartmentList;