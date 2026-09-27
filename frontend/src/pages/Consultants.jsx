import React, { useEffect, useState } from "react";
import {
  getConsultants,
  getConsultantsBasedOnServices,
  getConsultantServices,
} from "../services/api";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedServiceIds = searchParams.getAll("service");

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        setError("");

        let response;
        if (selectedServiceIds.length > 0) {
          response = await getConsultantsBasedOnServices(selectedServiceIds);
        } else {
          response = await getConsultants();
        }

        const data = response.data;
        const consultantsData = Array.isArray(data) ? data : data?.results || [];

        const consultantsWithServices = await Promise.all(
          consultantsData.map(async (consultant) => {
            try {
              const servicesResponse = await getConsultantServices(consultant.id);
              const servicesData = servicesResponse.data;
              const services = Array.isArray(servicesData)
                ? servicesData
                : servicesData?.results || [];

              return {
                ...consultant,
                services,
              };
            } catch (serviceError) {
              console.error(
                `Error fetching services for consultant ${consultant.id}`,
                serviceError
              );
              return {
                ...consultant,
                services: [],
              };
            }
          })
        );

        setConsultants(consultantsWithServices);
      } catch (err) {
        console.error("Error fetching consultants:", err);
        setError("دریافت اطلاعات مشاوران با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, [selectedServiceIds.join(",")]);

  const clearFilters = () => {
    navigate("/consultants");
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#0b2545",
          fontSize: "16px",
          fontWeight: "bold",
          direction: "rtl",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #d4af37",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "16px",
          }}
        />
        در حال دریافت اطلاعات مشاوران...
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  if (error) {
    return (
      <div
        style={{
          minHeight: "80vh",
          backgroundColor: "#f8fafc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#e11d48",
          fontSize: "16px",
          direction: "rtl",
        }}
      >
        {error}
      </div>
    );
  }

  // ==========================================
  // PAGE CONTENT
  // ==========================================
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "50px 8%",
        direction: "rtl",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1 style={{ color: "#0b2545", fontSize: "32px", fontWeight: "bold", marginBottom: "12px" }}>
          مشاوران خبره
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "20px" }}>
          متخصص مورد نظر خود را بر اساس حوزه تخصص انتخاب کنید.
        </p>

        {selectedServiceIds.length > 0 && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "15px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              padding: "10px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ color: "#0b2545", fontSize: "14px", fontWeight: "bold" }}>
              فیلتر حوزه‌های انتخاب‌شده فعال است
            </span>
            <button
              onClick={clearFilters}
              style={{
                border: "none",
                background: "transparent",
                color: "#139a9c",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              حذف فیلتر
            </button>
          </div>
        )}
      </div>

      {/* NO CONSULTANTS */}
      {consultants.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
          <p style={{ fontSize: "17px", marginBottom: "20px" }}>
            مشاوری با حوزه‌های انتخاب‌شده پیدا نشد.
          </p>
          {selectedServiceIds.length > 0 && (
            <button
              onClick={clearFilters}
              style={{
                backgroundColor: "#d4af37",
                color: "#0b2545",
                border: "none",
                padding: "11px 25px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              مشاهده همه مشاوران
            </button>
          )}
        </div>
      )}

      {/* CONSULTANTS GRID */}
      {consultants.length > 0 && (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "25px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  boxSizing: "border-box",
                }}
              >
                {/* PROFILE */}
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                  <img
                    src={consultant.image_url || "/images/default-consultant.png"}
                    alt={consultant.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #139a9c",
                    }}
                  />
                  <div>
                    <h2 style={{ color: "#0b2545", fontSize: "18px", fontWeight: "bold", margin: "0 0 6px 0" }}>
                      {consultant.name}
                    </h2>
                    {consultant.is_verified && (
                      <span style={{ color: "#139a9c", fontSize: "13px", fontWeight: "bold" }}>
                        ✓ مشاور تأیید شده
                      </span>
                    )}
                  </div>
                </div>

                {/* SERVICES */}
                <div style={{ marginBottom: "15px", minHeight: "70px" }}>
                  <h3 style={{ color: "#0b2545", fontSize: "14px", fontWeight: "bold", margin: "0 0 10px 0" }}>
                    حوزه‌های تخصص
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {consultant.services?.length > 0 ? (
                      consultant.services.map((consultantService) => (
                        <span
                          key={consultantService.id}
                          style={{
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #cbd5e1",
                            color: "#0b2545",
                            padding: "4px 10px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {consultantService.service?.title}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                        حوزه تخصصی ثبت نشده است.
                      </span>
                    )}
                  </div>
                </div>

                {/* BIO */}
                <div style={{ minHeight: "65px", marginBottom: "15px" }}>
                  {consultant.bio && (
                    <p style={{ color: "#475569", fontSize: "13px", lineHeight: "1.7", margin: 0 }}>
                      {consultant.bio.length > 110
                        ? `${consultant.bio.substring(0, 110)}...`
                        : consultant.bio}
                    </p>
                  )}
                </div>

                {/* EXPERIENCE */}
                <div style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>
                  سابقه فعالیت:{" "}
                  <strong style={{ color: "#0b2545" }}>
                    {consultant.experience_years} سال
                  </strong>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/consultants/${consultant.id}`)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0b2545",
                    color: "#ffffff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "13px",
                    marginTop: "auto",
                  }}
                >
                  مشاهده پروفایل
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultants;