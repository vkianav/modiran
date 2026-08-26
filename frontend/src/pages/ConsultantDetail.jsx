import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import { getConsultant } from "../services/api";

const ConsultantDetail = () => {
    const { id } = useParams();

    const [consultant, setConsultant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchConsultant();
    }, [id]);

    const fetchConsultant = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getConsultant(id);

            setConsultant(response.data);
        } catch (error) {
            console.error("Error fetching consultant:", error);

            setError("مشاور مورد نظر پیدا نشد.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    backgroundColor: "#0a192f",
                    color: "#8892b0",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                در حال بارگذاری اطلاعات مشاور...
            </div>
        );
    }

    if (error || !consultant) {
        return (
            <div
                style={{
                    backgroundColor: "#0a192f",
                    color: "#e74c3c",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    direction: "rtl",
                }}
            >
                {error}
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: "#0a192f",
                color: "#ffffff",
                minHeight: "100vh",
                padding: "50px 20px",
                direction: "rtl",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >

                {/* Main Profile */}
                <div
                    style={{
                        backgroundColor: "#112240",
                        borderRadius: "16px",
                        border: "1px solid rgba(212,175,55,0.3)",
                        padding: "35px",
                        display: "grid",
                        gridTemplateColumns: "300px 1fr",
                        gap: "40px",
                        alignItems: "start",
                    }}
                >

                    {/* Image */}
                    <div>
                        {consultant.image_url ? (
                            <img
                                src={consultant.image_url}
                                alt={consultant.name}
                                style={{
                                    width: "100%",
                                    height: "330px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "330px",
                                    borderRadius: "12px",
                                    backgroundColor: "#233554",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#8892b0",
                                }}
                            >
                                تصویر مشاور
                            </div>
                        )}
                    </div>

                    {/* Information */}
                    <div>

                        <h1
                            style={{
                                color: "#d4af37",
                                fontSize: "30px",
                                marginBottom: "10px",
                            }}
                        >
                            {consultant.name}
                        </h1>

                        <h2
                            style={{
                                color: "#e6f1ff",
                                fontSize: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            {consultant.title}
                        </h2>

                        <div
                            style={{
                                display: "inline-block",
                                backgroundColor: "rgba(212,175,55,0.1)",
                                border: "1px solid #d4af37",
                                color: "#d4af37",
                                padding: "7px 14px",
                                borderRadius: "20px",
                                marginBottom: "25px",
                            }}
                        >
                            ✓ مشاور تأیید شده مدیران
                        </div>

                        {/* Experience */}
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                marginBottom: "25px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#0a192f",
                                    padding: "15px 25px",
                                    borderRadius: "8px",
                                }}
                            >
                                <strong
                                    style={{
                                        color: "#d4af37",
                                        fontSize: "22px",
                                    }}
                                >
                                    {consultant.experience_years}
                                </strong>

                                <div
                                    style={{
                                        color: "#8892b0",
                                        fontSize: "13px",
                                    }}
                                >
                                    سال تجربه
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <p
                            style={{
                                color: "#ccd6f6",
                                lineHeight: "2",
                                fontSize: "15px",
                                marginBottom: "30px",
                            }}
                        >
                            {consultant.bio}
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                backgroundColor: "#d4af37",
                                color: "#0a192f",
                                border: "none",
                                borderRadius: "7px",
                                padding: "13px 30px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: "15px",
                            }}
                        >
                            درخواست جلسه مشاوره
                        </button>

                    </div>
                </div>

                {/* Expertise */}
                <section
                    style={{
                        marginTop: "40px",
                        backgroundColor: "#112240",
                        borderRadius: "12px",
                        padding: "30px",
                    }}
                >
                    <h2
                        style={{
                            color: "#d4af37",
                            marginBottom: "20px",
                        }}
                    >
                        حوزه تخصص
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span className="expertise-tag">
                            {consultant.title}
                        </span>
                    </div>
                </section>

                {/* Biography */}
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
                        درباره مشاور
                    </h2>

                    <p
                        style={{
                            color: "#ccd6f6",
                            lineHeight: "2",
                        }}
                    >
                        {consultant.bio}
                    </p>
                </section>

            </div>

            {/* Booking */}
            {isModalOpen && (
                <BookingModal
                    consultant={consultant}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ConsultantDetail;