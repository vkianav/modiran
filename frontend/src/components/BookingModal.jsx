import React, { useEffect, useState } from "react";
import {
  createConsultationRequest,
  getConsultantServices,
  getConsultationChoices,
  getServices,
  registerForEvent,
} from "../services/api";

const BookingModal = ({ consultant, event, onClose }) => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loading, setLoading] = useState(false);

  const [industryOptions, setIndustryOptions] = useState([]);
  const [contactRoleOptions, setContactRoleOptions] = useState([]);

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    business_industry: "",
    contact_role: "",
    service: "",
    consultant_service: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingServices(true);
        const choicesResponse = await getConsultationChoices();
        setIndustryOptions(choicesResponse.data.business_industries);
        setContactRoleOptions(choicesResponse.data.contact_roles);

        if (!event) {
          if (consultant?.id) {
            const response = await getConsultantServices(consultant.id);
            setServices(response.data);
          } else {
            const response = await getServices();
            setServices(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching choices:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchData();
  }, [consultant, event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (event) {
        const eventData = {
          event_id: event.id,
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          business_industry: formData.business_industry,
          contact_role: formData.contact_role,
        };

        console.log("Sending Event Registration Payload:", eventData);
        await registerForEvent(eventData);
        alert("ثبت‌نام شما در رویداد با موفقیت انجام شد.");
      } else {
        let requestData = {
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          business_industry: formData.business_industry,
          contact_role: formData.contact_role,
          description: formData.description,
        };

        if (consultant) {
          if (!formData.consultant_service) {
            alert("لطفاً خدمت مورد نیاز را انتخاب کنید.");
            setLoading(false);
            return;
          }
          requestData.consultant_service = Number(formData.consultant_service);
          requestData.service = null;
        } else {
          if (!formData.service) {
            alert("لطفاً خدمت مورد نیاز را انتخاب کنید.");
            setLoading(false);
            return;
          }
          requestData.service = Number(formData.service);
          requestData.consultant_service = null;
        }

        console.log("Sending Consultation Payload:", requestData);
        await createConsultationRequest(requestData);
        alert("درخواست مشاوره شما با موفقیت ثبت شد.");
      }

      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("خطا در ثبت اطلاعات. لطفاً ورودی‌های خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        direction: "rtl",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--border-color, #e2e8f0)",
          borderRadius: "16px",
          padding: "28px 24px",
          maxWidth: "620px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          margin: "auto",
        }}
      >
        <button
          onClick={onClose}
          type="button"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            color: "var(--brand-blue-dark, #0b2545)",
            fontSize: "22px",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "6px",
            paddingTop: "4px",
          }}
        >
          {event ? "ثبت‌نام در رویداد" : consultant ? "درخواست جلسه با" : "درخواست مشاوره"}
        </h2>

        {event && (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "10px",
              padding: "12px 16px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <strong style={{ color: "var(--brand-blue-cyan, #139a9c)", fontSize: "15px" }}>
              {event.title}
            </strong>
          </div>
        )}

        {consultant && (
          <h3
            style={{
              color: "var(--brand-blue-cyan, #139a9c)",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {consultant.name}
          </h3>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Responsive Grid for Form Fields */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            <div>
              <label style={labelStyle}>نام و نام خانوادگی:</label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
                placeholder="نام و نام خانوادگی"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>نام سازمان / شرکت:</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                placeholder="نام شرکت یا سازمان"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>ایمیل:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>شماره تماس:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="09xxxxxxxxx"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>حوزه فعالیت:</label>
              <select
                name="business_industry"
                value={formData.business_industry}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">انتخاب حوزه فعالیت</option>
                {industryOptions.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>سمت درخواست‌دهنده:</label>
              <select
                name="contact_role"
                value={formData.contact_role}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">انتخاب سمت</option>
                {contactRoleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Dropdown for Services */}
            {!event && consultant && (
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>نوع خدمت مورد نیاز:</label>
                <select
                  name="consultant_service"
                  value={formData.consultant_service}
                  onChange={handleChange}
                  required
                  disabled={loadingServices}
                  style={inputStyle}
                >
                  <option value="">{loadingServices ? "در حال دریافت..." : "انتخاب خدمت"}</option>
                  {services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.service?.title || item.title || "بدون عنوان"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!event && !consultant && (
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>نوع خدمت مورد نیاز:</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={loadingServices}
                  style={inputStyle}
                >
                  <option value="">{loadingServices ? "در حال دریافت..." : "انتخاب خدمت"}</option>
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title || "بدون عنوان"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Conditional Textarea for Description */}
          {!event && (
            <div>
              <label style={labelStyle}>شرح نیاز:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                placeholder="توضیح دهید در چه زمینه‌ای به مشاوره نیاز دارید..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#94a3b8" : "var(--brand-blue-cyan, #139a9c)",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "15px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              boxShadow: loading ? "none" : "0 4px 12px rgba(19, 154, 156, 0.25)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "در حال ارسال..." : event ? "ثبت‌نام در رویداد" : "ثبت و ارسال درخواست"}
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
  display: "block",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none",
  transition: "all 0.2s ease",
};

export default BookingModal;