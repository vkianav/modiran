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

  // ==========================================
  // GET SELECTED SERVICES FROM URL
  // ==========================================

  const selectedServiceIds =
    searchParams.getAll("service");

  /*
    Example URL:

    /consultants?service=2&service=5

    selectedServiceIds becomes:

    ["2", "5"]
  */

  // ==========================================
  // FETCH CONSULTANTS
  // ==========================================

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        // ======================================
        // IF SERVICES ARE SELECTED
        // ======================================

        if (selectedServiceIds.length > 0) {
          response =
            await getConsultantsBasedOnServices(
              selectedServiceIds
            );
        }

        // ======================================
        // OTHERWISE GET ALL CONSULTANTS
        // ======================================

        else {
          response = await getConsultants();
        }

        const data = response.data;

        /*
          Supports both:

          response.data = [...]

          and

          response.data = {
            results: [...]
          }
        */

        const consultantsData =
          Array.isArray(data)
            ? data
            : data?.results || [];

        // ======================================
        // GET SERVICES FOR EACH CONSULTANT
        // ======================================

        const consultantsWithServices =
          await Promise.all(
            consultantsData.map(
              async (consultant) => {
                try {
                  const servicesResponse =
                    await getConsultantServices(
                      consultant.id
                    );

                  const servicesData =
                    servicesResponse.data;

                  const services =
                    Array.isArray(
                      servicesData
                    )
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
              }
            )
          );

        setConsultants(
          consultantsWithServices
        );
      } catch (err) {
        console.error(
          "Error fetching consultants:",
          err
        );

        setError(
          "دریافت اطلاعات مشاوران با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, [selectedServiceIds.join(",")]);

  // ==========================================
  // CLEAR SERVICE FILTER
  // ==========================================

  const clearFilters = () => {
    navigate("/consultants");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a192f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
          fontSize: "16px",
          direction: "rtl",
        }}
      >
        در حال دریافت اطلاعات مشاوران...
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a192f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff6b6b",
          fontSize: "16px",
          direction: "rtl",
        }}
      >
        {error}
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      style={{
        backgroundColor: "#0a192f",
        minHeight: "100vh",
        padding: "60px 8%",
        direction: "rtl",
      }}
    >
      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
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
            marginBottom: "20px",
          }}
        >
          متخصص مورد نظر خود را بر اساس حوزه تخصص
          انتخاب کنید.
        </p>

        {/* ====================================
            ACTIVE FILTER
        ===================================== */}

        {selectedServiceIds.length > 0 && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "15px",
              backgroundColor: "#112240",
              border:
                "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "10px",
              padding: "12px 18px",
            }}
          >
            <span
              style={{
                color: "#d4af37",
                fontSize: "14px",
              }}
            >
              فیلتر حوزه‌های انتخاب‌شده فعال است
            </span>

            <button
              onClick={clearFilters}
              style={{
                border: "none",
                background: "transparent",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              حذف فیلتر
            </button>
          </div>
        )}
      </div>

      {/* ======================================
          NO CONSULTANTS
      ======================================= */}

      {consultants.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#9fb3c8",
          }}
        >
          <p
            style={{
              fontSize: "17px",
              marginBottom: "20px",
            }}
          >
            مشاوری با حوزه‌های انتخاب‌شده پیدا نشد.
          </p>

          {selectedServiceIds.length > 0 && (
            <button
              onClick={clearFilters}
              style={{
                backgroundColor: "#d4af37",
                color: "#0a192f",
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

      {/* ======================================
          CONSULTANTS GRID
      ======================================= */}

      {consultants.length > 0 && (
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "30px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "25px",
              alignItems: "stretch",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                style={{
                  backgroundColor: "#112240",
                  borderRadius: "16px",
                  padding: "25px",
                  border:
                    "1px solid rgba(212, 175, 55, 0.15)",

                  display: "flex",
                  flexDirection: "column",

                  minHeight: "420px",

                  boxSizing: "border-box",

                  transition:
                    "transform 0.2s ease",
                }}
              >
                {/* =================================
                    PROFILE
                ================================== */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",
                    minHeight: "75px",
                  }}
                >
                  {/* IMAGE */}

                  <img
                    src={
                      consultant.image_url ||
                      "/images/default-consultant.png"
                    }
                    alt={consultant.name}
                    style={{
                      width: "75px",
                      height: "75px",
                      minWidth: "75px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        "2px solid #d4af37",
                    }}
                  />

                  {/* NAME */}

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <h2
                      style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        margin:
                          "0 0 6px 0",
                        lineHeight: "1.4",
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

                {/* =================================
                    SERVICES
                ================================== */}

                <div
                  style={{
                    marginBottom: "15px",
                    minHeight: "100px",
                    maxHeight: "75px",
                    overflow: "hidden",
                  }}
                >
                  <h3
                    style={{
                      color: "#d4af37",
                      fontSize: "15px",
                      margin:
                        "0 0 12px 0",
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
                    {consultant.services?.length >
                      0 ? (
                      consultant.services.map(
                        (consultantService) => (
                          <span
                            key={
                              consultantService.id
                            }
                            style={{
                              backgroundColor:
                                "rgba(212, 175, 55, 0.1)",
                              border:
                                "1px solid rgba(212, 175, 55, 0.35)",
                              color: "#d4af37",
                              padding:
                                "6px 12px",
                              borderRadius:
                                "20px",
                              fontSize:
                                "13px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {
                              consultantService
                                .service
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

                {/* =================================
                    BIO
                ================================== */}

                <div
                  style={{
                    height: "75px",
                    marginBottom: "15px",
                    overflow: "hidden",
                  }}
                >
                  {consultant.bio && (
                    <p
                      style={{
                        color: "#9fb3c8",
                        fontSize: "14px",
                        lineHeight: "1.8",
                        margin: 0,
                      }}
                    >
                      {consultant.bio.length >
                        120
                        ? `${consultant.bio.substring(
                          0,
                          120
                        )}...`
                        : consultant.bio}
                    </p>
                  )}
                </div>

                {/* =================================
                    EXPERIENCE
                ================================== */}

                <div
                  style={{
                    color: "#9fb3c8",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  سابقه فعالیت:{" "}
                  <span
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    {
                      consultant.experience_years
                    }{" "}
                    سال
                  </span>
                </div>

                {/* =================================
                    PROFILE BUTTON
                ================================== */}

                <button
                  onClick={() =>
                    navigate(
                      `/consultants/${consultant.id}`
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor:
                      "#d4af37",
                    color: "#0a192f",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",

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