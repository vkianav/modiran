import React from "react";

const ConsultantCertificates = ({ certifications = [] }) => {
  if (!certifications.length) {
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
          گواهینامه‌ها و مدارک حرفه‌ای
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
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
              backgroundColor: "var(--bg-secondary, #f8fafc)",
              border: "1px solid var(--border-color, #e2e8f0)",
              borderRadius: "12px",
              padding: "22px",
              transition: "all 0.25s ease",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "rgba(19, 154, 156, 0.1)",
                border: "1px solid rgba(19, 154, 156, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--brand-blue-cyan, #139a9c)",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              ✓
            </div>

            <h3
              style={{
                color: "var(--brand-blue-dark, #0b2545)",
                fontSize: "17px",
                fontWeight: "700",
                marginBottom: "12px",
                lineHeight: "1.6",
              }}
            >
              {certificate.title}
            </h3>

            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              صادرکننده:{" "}
              <span style={{ color: "var(--brand-blue-dark, #0b2545)", fontWeight: "600" }}>
                {certificate.issuer}
              </span>
            </p>

            {certificate.certificate_number && (
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                شماره گواهینامه:{" "}
                <span style={{ color: "var(--brand-blue-dark, #0b2545)", fontWeight: "600" }}>
                  {certificate.certificate_number}
                </span>
              </p>
            )}

            {certificate.issue_date && (
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                تاریخ صدور:{" "}
                <span style={{ color: "var(--brand-blue-dark, #0b2545)", fontWeight: "600" }}>
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
                  color: "var(--brand-blue-cyan, #139a9c)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderBottom: "1px solid rgba(19, 154, 156, 0.4)",
                  paddingBottom: "2px",
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