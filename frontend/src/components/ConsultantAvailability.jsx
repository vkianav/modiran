import React from "react";

const DAYS = {
    0: "شنبه",
    1: "یکشنبه",
    2: "دوشنبه",
    3: "سه‌شنبه",
    4: "چهارشنبه",
    5: "پنجشنبه",
    6: "جمعه",
};

const ConsultantAvailability = ({ availabilities = [] }) => {
    const availableTimes = availabilities.filter(
        (item) => item.is_available
    );

    if (!availableTimes.length) {
        return (
            <section
                style={{
                    marginTop: "25px",
                    backgroundColor: "var(--bg-card, #ffffff)",
                    borderRadius: "16px",
                    padding: "30px",
                    border: "1px solid var(--border-color, #e2e8f0)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                }}
            >
                <h2
                    style={{
                        color: "var(--brand-blue-dark, #0b2545)",
                        marginBottom: "15px",
                        fontSize: "20px",
                        fontWeight: "800",
                    }}
                >
                    زمان‌های در دسترس
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        margin: 0,
                        fontSize: "14px",
                    }}
                >
                    در حال حاضر زمان مشخصی برای مشاوره ثبت نشده است.
                </p>
            </section>
        );
    }

    return (
        <section
            style={{
                marginTop: "25px",
                backgroundColor: "var(--bg-card, #ffffff)",
                borderRadius: "16px",
                padding: "30px",
                border: "1px solid var(--border-color, #e2e8f0)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
            }}
        >
            <h2
                style={{
                    color: "var(--brand-blue-dark, #0b2545)",
                    marginBottom: "10px",
                    fontSize: "20px",
                    fontWeight: "800",
                }}
            >
                زمان‌های در دسترس
            </h2>

            <p
                style={{
                    color: "#64748b",
                    marginBottom: "25px",
                    fontSize: "14px",
                }}
            >
                زمان‌های زیر برای برگزاری جلسات مشاوره در دسترس هستند.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                }}
            >
                {availableTimes.map((availability) => (
                    <div
                        key={availability.id}
                        style={{
                            backgroundColor: "var(--bg-secondary, #f8fafc)",
                            border: "1px solid var(--border-color, #e2e8f0)",
                            borderRadius: "12px",
                            padding: "16px 20px",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div
                            style={{
                                color: "var(--brand-blue-cyan, #139a9c)",
                                fontWeight: "700",
                                fontSize: "15px",
                                marginBottom: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                            }}
                        >
                            <span
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--brand-blue-cyan, #139a9c)",
                                    display: "inline-block",
                                }}
                            />
                            {DAYS[availability.day_of_week]}
                        </div>

                        <div
                            style={{
                                color: "var(--brand-blue-dark, #0b2545)",
                                fontSize: "14px",
                                fontWeight: "600",
                            }}
                        >
                            {availability.start_time} تا{" "}
                            {availability.end_time}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ConsultantAvailability;