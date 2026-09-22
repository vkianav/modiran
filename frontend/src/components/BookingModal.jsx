import React, { useEffect, useState } from "react";
import {
  createConsultationRequest,
  getConsultantServices,
  getConsultationChoices,
  getServices,
  registerForEvent, // Import new API function
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
        // --- EVENT REGISTRATION PATH ---
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
        // --- CONSULTATION REQUEST PATH ---
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
        backgroundColor: "rgba(10, 25, 47, 0.85)",
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
          backgroundColor: "#112240",
          border: "1px solid #d4af37",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "500px",
          width: "100%",
          position: "relative",
          margin: "20px 0",
        }}
      >
        <button
          onClick={onClose}
          type="button"
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "none",
            border: "none",
            color: "#8892b0",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ color: "#d4af37", fontSize: "20px", textAlign: "center", marginBottom: "8px" }}>
          {event ? "ثبت‌نام در رویداد" : consultant ? "درخواست جلسه با" : "درخواست مشاوره"}
        </h2>

        {event && (
          <div
            style={{
              backgroundColor: "#0a192f",
              border: "1px solid #233554",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <strong style={{ color: "#64ffda", fontSize: "16px" }}>{event.title}</strong>
          </div>
        )}

        {consultant && (
          <h3 style={{ color: "#e6f1ff", textAlign: "center", marginBottom: "24px" }}>
            {consultant.name}
          </h3>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
            <div>
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
            <div>
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

          {/* Conditional Textarea for Description */}
          {!event && (
            <div>
              <label style={labelStyle}>شرح نیاز:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="توضیح دهید در چه زمینه‌ای به مشاوره نیاز دارید..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#777" : "#d4af37",
              color: "#0a192f",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: "bold",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px",
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
  color: "#8892b0",
  display: "block",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #233554",
  backgroundColor: "#0a192f",
  color: "#fff",
  boxSizing: "border-box",
};

export default BookingModal;