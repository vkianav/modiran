import React from "react";

const ConsultantVideos = ({ videos = [] }) => {
    if (!videos.length) {
        return (
            <section
                style={{
                    marginTop: "40px",
                    padding: "30px",
                    backgroundColor: "rgba(10, 25, 47, 0.65)",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                    borderRadius: "14px",
                }}
            >
                <h2
                    style={{
                        color: "#d4af37",
                        fontSize: "22px",
                        marginBottom: "10px",
                        textAlign: "right",
                    }}
                >
                    ویدیوهای مشاور
                </h2>

                <p
                    style={{
                        color: "#9fb3c8",
                        fontSize: "15px",
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
                marginTop: "40px",
            }}
        >
            <h2
                style={{
                    color: "#d4af37",
                    fontSize: "24px",
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
                        "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={{
                            backgroundColor: "rgba(10, 25, 47, 0.75)",
                            border: "1px solid rgba(212, 175, 55, 0.25)",
                            borderRadius: "14px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Thumbnail */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "190px",
                                backgroundColor: "#081525",
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
                                        color: "#d4af37",
                                        fontSize: "45px",
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
                                    backgroundColor:
                                        "rgba(212, 175, 55, 0.95)",
                                    color: "#071525",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                    fontSize: "20px",
                                    paddingLeft: "3px",
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
                                    color: "#e6f1ff",
                                    fontSize: "18px",
                                    marginBottom: "10px",
                                    lineHeight: "1.6",
                                }}
                            >
                                {video.title}
                            </h3>

                            {video.description && (
                                <p
                                    style={{
                                        color: "#9fb3c8",
                                        fontSize: "14px",
                                        lineHeight: "1.8",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {video.description}
                                </p>
                            )}

                            {video.published_at && (
                                <span
                                    style={{
                                        color: "#71859a",
                                        fontSize: "13px",
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