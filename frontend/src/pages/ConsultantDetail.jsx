import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsultant, getConsultantServices } from "../services/api";
import BookingModal from "../components/BookingModal";
import ConsultantCertificates from "../components/ConsultantCertificates";
import ConsultantVideos from "../components/ConsultantVideos";
import ConsultantAvailability from "../components/ConsultantAvailability";
import "../styles/consultantDetail.css";

const ConsultantDetail = () => {
    const { id } = useParams();

    const [consultant, setConsultant] = useState(null);
    const [consultantServices, setConsultantServices] = useState([]);
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
            const [consultantResponse, servicesResponse] = await Promise.all([
                getConsultant(id),
                getConsultantServices(id),
            ]);

            setConsultant(consultantResponse.data);
            setConsultantServices(servicesResponse.data);
        } catch (error) {
            console.error("Error fetching consultant:", error);

            setError("مشاور مورد نظر پیدا نشد.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="cd-page cd-page--center">
                در حال بارگذاری اطلاعات مشاور...
            </div>
        );
    }

    if (error || !consultant) {
        return (
            <div className="cd-page cd-page--center cd-page--error">
                {error}
            </div>
        );
    }

    return (
        <div className="cd-page" dir="rtl">
            <div className="cd-container">

                {/* Main Profile */}
                <div className="cd-profile">

                    {/* Image */}
                    <div className="cd-photo-wrap">
                        {consultant.image_url ? (
                            <img
                                src={consultant.image_url}
                                alt={consultant.name}
                                className="cd-photo"
                            />
                        ) : (
                            <div className="cd-photo cd-photo--placeholder">
                                تصویر مشاور
                            </div>
                        )}
                    </div>

                    {/* Information */}
                    <div className="cd-info">
                        <h1 className="cd-name">{consultant.name}</h1>
                        <h2 className="cd-title">{consultant.title}</h2>

                        <div className="cd-verified">✓ مشاور تأیید شده مدیران</div>

                        {/* Experience */}
                        <div className="cd-stats">
                            <div className="cd-stat">
                                <strong>{consultant.experience_years}</strong>
                                <span>سال تجربه</span>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="cd-bio">{consultant.bio}</p>

                        {/* Button */}
                        <button
                            className="cd-cta"
                            onClick={() => setIsModalOpen(true)}
                        >
                            درخواست جلسه مشاوره
                        </button>
                    </div>
                </div>

                {/* Expertise */}
                <section className="cd-section">
                    <h2 className="cd-section-title">حوزه تخصص</h2>

                    <div className="cd-tags">
                        {consultantServices.length > 0 ? (
                            consultantServices.map((consultantService) => (
                                <span
                                    key={consultantService.id}
                                    className="expertise-tag cd-tag"
                                >
                                    {consultantService.service.title}
                                </span>
                            ))
                        ) : (
                            <span className="cd-empty">
                                حوزه تخصصی ثبت نشده است.
                            </span>
                        )}
                    </div>
                </section>

                {/* Biography */}
                <section className="cd-section">
                    <h2 className="cd-section-title">درباره مشاور</h2>
                    <p className="cd-about">{consultant.bio}</p>
                </section>

                {/* Availability */}
                <ConsultantAvailability
                    availabilities={consultant.availabilities || []}
                />

                {/* Certificates */}
                <ConsultantCertificates
                    certifications={consultant.certifications || []}
                />

                {/* Videos */}
                <ConsultantVideos videos={consultant.videos || []} />
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