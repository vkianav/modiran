import React from "react";

const ConsultantCertificates = ({ certifications = [] }) => {
  if (!certifications.length) {
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
          گواهینامه‌ها و مدارک حرفه‌ای
        </h2>

        <p
          style={{
            color: "#9fb3c8",
            fontSize: "15px",
            textAlign: "right",
            margin: 0,
          }}
        >
          اطلاعاتی درباره گواهینامه‌های حرفه‌ای این مشاور ثبت نشده است.
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
        گواهینامه‌ها و مدارک حرفه‌ای
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {certifications.map((certificate) => (
          <div
            key={certificate.id}
            style={{
              backgroundColor: "rgba(10, 25, 47, 0.75)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "14px",
              padding: "22px",
              transition: "all 0.25s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "10px",
                backgroundColor:
                  "rgba(212, 175, 55, 0.1)",
                border:
                  "1px solid rgba(212, 175, 55, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af37",
                fontSize: "22px",
                marginBottom: "16px",
              }}
            >
              ✓
            </div>

            <h3
              style={{
                color: "#e6f1ff",
                fontSize: "18px",
                marginBottom: "10px",
                lineHeight: "1.6",
              }}
            >
              {certificate.title}
            </h3>

            <p
              style={{
                color: "#9fb3c8",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              صادرکننده:{" "}
              <span style={{ color: "#e6f1ff" }}>
                {certificate.issuer}
              </span>
            </p>

            {certificate.certificate_number && (
              <p
                style={{
                  color: "#9fb3c8",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                شماره گواهینامه:{" "}
                <span style={{ color: "#e6f1ff" }}>
                  {certificate.certificate_number}
                </span>
              </p>
            )}

            {certificate.issue_date && (
              <p
                style={{
                  color: "#9fb3c8",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                تاریخ صدور:{" "}
                <span style={{ color: "#e6f1ff" }}>
                  {certificate.issue_date}
                </span>
              </p>
            )}

            {certificate.document_url && (
              <a
                href={certificate.document_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "18px",
                  color: "#d4af37",
                  textDecoration: "none",
                  fontSize: "14px",
                  borderBottom:
                    "1px solid rgba(212,175,55,0.5)",
                  paddingBottom: "3px",
                }}
              >
                مشاهده مدرک ←
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultantCertificates;