import React from "react";

const ConsultantVideos = ({ videos = [] }) => {
    if (!videos.length) {
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
                        fontSize: "20px",
                        fontWeight: "800",
                        marginBottom: "10px",
                        textAlign: "right",
                    }}
                >
                    ویدیوهای مشاور
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        fontSize: "14px",
                        textAlign: "right",
                        margin: 0,
                    }}
                >
                    هنوز ویدیویی برای این مشاور ثبت نشده است.
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
                    fontSize: "20px",
                    fontWeight: "800",
                    marginBottom: "20px",
                    textAlign: "right",
                }}
            >
                ویدیوهای مشاور
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                }}
            >
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={{
                            backgroundColor: "var(--bg-secondary, #f8fafc)",
                            border: "1px solid var(--border-color, #e2e8f0)",
                            borderRadius: "12px",
                            overflow: "hidden",
                            transition: "all 0.25s ease",
                        }}
                    >
                        {/* Thumbnail Container */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "190px",
                                backgroundColor: "#e2e8f0",
                            }}
                        >
                            {video.thumbnail_url ? (
                                <img
                                    src={video.thumbnail_url}
                                    alt={video.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--brand-blue-cyan, #139a9c)",
                                        fontSize: "40px",
                                    }}
                                >
                                    ▶
                                </div>
                            )}

                            {/* Play button */}
                            <a
                                href={video.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--brand-blue-cyan, #139a9c)",
                                    color: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                    fontSize: "18px",
                                    boxShadow: "0 4px 12px rgba(19, 154, 156, 0.4)",
                                    transition: "transform 0.2s ease",
                                }}
                            >
                                ▶
                            </a>
                        </div>

                        {/* Content */}
                        <div
                            style={{
                                padding: "20px",
                                textAlign: "right",
                            }}
                        >
                            <h3
                                style={{
                                    color: "var(--brand-blue-dark, #0b2545)",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    marginBottom: "10px",
                                    lineHeight: "1.6",
                                }}
                            >
                                {video.title}
                            </h3>

                            {video.description && (
                                <p
                                    style={{
                                        color: "#64748b",
                                        fontSize: "14px",
                                        lineHeight: "1.7",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {video.description}
                                </p>
                            )}

                            {video.published_at && (
                                <span
                                    style={{
                                        color: "#94a3b8",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {new Date(
                                        video.published_at
                                    ).toLocaleDateString("fa-IR")}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ConsultantVideos;