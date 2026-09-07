import React, { useEffect, useState } from "react";
import { getConsultants, getConsultantServices } from "../services/api";
import { useNavigate } from "react-router-dom";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all consultants
        const response = await getConsultants();

        const consultantsData = response.data;

        // Get services for every consultant
        const consultantsWithServices = await Promise.all(
          consultantsData.map(async (consultant) => {
            try {
              const servicesResponse =
                await getConsultantServices(consultant.id);

              return {
                ...consultant,
                services: servicesResponse.data,
              };
            } catch (err) {
              console.error(
                `Error fetching services for consultant ${consultant.id}`,
                err
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
        console.error(err);
        setError("دریافت اطلاعات مشاوران با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px",
          color: "#d4af37",
        }}
      >
        در حال دریافت اطلاعات مشاوران...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px",
          color: "#ff6b6b",
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
        minHeight: "100vh",
        padding: "60px 8%",
        direction: "rtl",
      }}
    >
      {/* Page title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            color: "#d4af37",
            fontSize: "36px",
            marginBottom: "15px",
          }}
        >
          مشاوران خبره
        </h1>

        <p
          style={{
            color: "#9fb3c8",
            fontSize: "16px",
          }}
        >
          متخصص مورد نظر خود را بر اساس حوزه تخصص انتخاب کنید.
        </p>
      </div>

      {/* Consultants */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {consultants.map((consultant) => (
          <div
            key={consultant.id}
            style={{
              backgroundColor: "#112240",
              borderRadius: "16px",
              padding: "25px",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              transition: "transform 0.2s ease",
            }}
          >
            {/* Profile */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              {/* Image */}
              <img
                src={
                  consultant.image_url ||
                  "/images/default-consultant.png"
                }
                alt={consultant.name}
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #d4af37",
                }}
              />

              {/* Name */}
              <div>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "20px",
                    margin: "0 0 6px 0",
                  }}
                >
                  {consultant.name}
                </h2>

                {consultant.is_verified && (
                  <span
                    style={{
                      color: "#d4af37",
                      fontSize: "13px",
                    }}
                  >
                    ✓ مشاور تأیید شده
                  </span>
                )}
              </div>
            </div>

            {/* Services */}
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  color: "#d4af37",
                  fontSize: "15px",
                  marginBottom: "12px",
                }}
              >
                حوزه‌های تخصص
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {consultant.services?.length > 0 ? (
                  consultant.services.map(
                    (consultantService) => (
                      <span
                        key={consultantService.id}
                        style={{
                          backgroundColor:
                            "rgba(212, 175, 55, 0.1)",
                          border: "1px solid rgba(212, 175, 55, 0.35)",
                          color: "#d4af37",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {
                          consultantService.service
                            ?.title
                        }
                      </span>
                    )
                  )
                ) : (
                  <span
                    style={{
                      color: "#718096",
                      fontSize: "13px",
                    }}
                  >
                    حوزه تخصصی ثبت نشده است.
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {consultant.bio && (
              <p
                style={{
                  color: "#9fb3c8",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                {consultant.bio.length > 120
                  ? `${consultant.bio.substring(0, 120)}...`
                  : consultant.bio}
              </p>
            )}

            {/* Experience */}
            <div
              style={{
                color: "#9fb3c8",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              سابقه فعالیت:{" "}
              <span style={{ color: "#ffffff" }}>
                {consultant.experience_years} سال
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() =>
                navigate(`/consultants/${consultant.id}`)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#d4af37",
                color: "#0a192f",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              مشاهده پروفایل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultants;