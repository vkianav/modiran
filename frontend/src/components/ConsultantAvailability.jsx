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
                    backgroundColor: "#112240",
                    borderRadius: "12px",
                    padding: "30px",
                }}
            >
                <h2
                    style={{
                        color: "#d4af37",
                        marginBottom: "15px",
                    }}
                >
                    زمان‌های در دسترس
                </h2>

                <p
                    style={{
                        color: "#8892b0",
                        margin: 0,
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
                backgroundColor: "#112240",
                borderRadius: "12px",
                padding: "30px",
            }}
        >
            <h2
                style={{
                    color: "#d4af37",
                    marginBottom: "10px",
                }}
            >
                زمان‌های در دسترس
            </h2>

            <p
                style={{
                    color: "#8892b0",
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
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "15px",
                }}
            >
                {availableTimes.map((availability) => (
                    <div
                        key={availability.id}
                        style={{
                            backgroundColor: "#0a192f",
                            border: "1px solid rgba(212,175,55,0.25)",
                            borderRadius: "10px",
                            padding: "18px",
                        }}
                    >
                        <div
                            style={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            {DAYS[availability.day_of_week]}
                        </div>

                        <div
                            style={{
                                color: "#ccd6f6",
                                fontSize: "15px",
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