import React, { useEffect, useState } from "react";
import {
  createConsultationRequest,
  getConsultantServices,
  getConsultationChoices,
  getServices,
} from "../services/api";

const BookingModal = ({ consultant, onClose }) => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch choices + services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingServices(true);

        // Get business industries and contact roles
        const choicesResponse = await getConsultationChoices();

        setIndustryOptions(
          choicesResponse.data.business_industries
        );

        setContactRoleOptions(
          choicesResponse.data.contact_roles
        );

        // -----------------------------------------
        // SPECIFIC REQUEST
        // User selected a consultant
        // -----------------------------------------
        if (consultant?.id) {
          const response = await getConsultantServices(
            consultant.id
          );

          console.log(
            "Consultant services:",
            response.data
          );

          setServices(response.data);
        }

        // -----------------------------------------
        // GENERAL REQUEST
        // No consultant selected
        // Show ALL services
        // -----------------------------------------
        else {
          const response = await getServices();

          console.log(
            "All services:",
            response.data
          );

          setServices(response.data);
        }
      } catch (error) {
        console.error(
          "Error fetching booking data:",
          error
        );

        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchData();
  }, [consultant]);

  // Submit consultation request
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let requestData;
      // -----------------------------------------
      // SPECIFIC CONSULTANT REQUEST
      // -----------------------------------------
      if (consultant) {
        if (!formData.consultant_service) {
          alert("لطفاً خدمت مورد نیاز را انتخاب کنید.");
          setLoading(false);
          return;
        }

        requestData = {
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          business_industry: formData.business_industry,
          contact_role: formData.contact_role,
          description: formData.description,

          // Pure Specific Request: Send consultant service, clear out general service
          service: null,
          consultant_service: Number(formData.consultant_service),
        };
      }


      // -----------------------------------------
      // GENERAL REQUEST
      // -----------------------------------------
      else {
        if (!formData.service) {
          alert("لطفاً خدمت مورد نیاز را انتخاب کنید.");
          setLoading(false);
          return;
        }

        requestData = {
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,

          business_industry:
            formData.business_industry,

          contact_role:
            formData.contact_role,

          description: formData.description,
          // ServiceCategory ID
          service: Number(formData.service),

          // No consultant selected
          consultant_service: null,

        };
      }

      console.log(
        "Sending consultation request:",
        requestData
      );

      await createConsultationRequest(requestData);


      onClose();
    } catch (error) {
      console.error(
        "Consultation request error:",
        error
      );

      if (error.response?.data) {
        console.error(
          "Backend error:",
          error.response.data
        );
      }

      alert(
        "خطا در ثبت درخواست. لطفاً اطلاعات واردشده را بررسی کنید."
      );
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
        {/* Close button */}
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

        {/* Header */}
        <h2
          style={{
            color: "#d4af37",
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          {consultant
            ? "درخواست جلسه با"
            : "درخواست مشاوره"}
        </h2>

        {consultant && (
          <h3
            style={{
              color: "#e6f1ff",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            {consultant.name}
          </h3>
        )}

        {!consultant && (
          <p
            style={{
              color: "#8892b0",
              textAlign: "center",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            خدمت مورد نیاز خود را انتخاب کنید تا
            مناسب‌ترین مشاور توسط کارشناسان ما
            انتخاب شود.
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Contact Name */}
          <div>
            <label style={labelStyle}>
              نام و نام خانوادگی:
            </label>

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

          {/* Company */}
          <div>
            <label style={labelStyle}>
              نام سازمان / شرکت:
            </label>

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

          {/* Email */}
          <div>
            <label style={labelStyle}>
              ایمیل:
            </label>

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

          {/* Phone */}
          <div>
            <label style={labelStyle}>
              شماره تماس:
            </label>

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

          {/* Business Industry */}
          <div>
            <label style={labelStyle}>
              حوزه فعالیت:
            </label>

            <select
              name="business_industry"
              value={formData.business_industry}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">
                انتخاب حوزه فعالیت
              </option>

              {industryOptions.map((industry) => (
                <option
                  key={industry.value}
                  value={industry.value}
                >
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Role */}
          <div>
            <label style={labelStyle}>
              سمت درخواست‌دهنده:
            </label>

            <select
              name="contact_role"
              value={formData.contact_role}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">
                انتخاب سمت
              </option>

              {contactRoleOptions.map((role) => (
                <option
                  key={role.value}
                  value={role.value}
                >
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===================================== */}
          {/* SPECIFIC REQUEST - Consultant Service */}
          {/* ===================================== */}

          {consultant && (
            <div>
              <label style={labelStyle}>
                نوع خدمت مورد نیاز:
              </label>

              <select
                name="consultant_service"
                value={formData.consultant_service}
                onChange={handleChange}
                required
                disabled={loadingServices}
                style={inputStyle}
              >
                <option value="">
                  {loadingServices
                    ? "در حال دریافت خدمات..."
                    : "انتخاب خدمت"}
                </option>

                {services.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.service.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ===================================== */}
          {/* GENERAL REQUEST - All Services */}
          {/* ===================================== */}

          {!consultant && (
            <div>
              <label style={labelStyle}>
                نوع خدمت مورد نیاز:
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                disabled={loadingServices}
                style={inputStyle}
              >
                <option value="">
                  {loadingServices
                    ? "در حال دریافت خدمات..."
                    : "انتخاب خدمت"}
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label style={labelStyle}>
              شرح نیاز:
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="توضیح دهید در چه زمینه‌ای به مشاوره نیاز دارید..."
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading
                ? "#777"
                : "#d4af37",
              color: "#0a192f",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: "bold",
              border: "none",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              marginTop: "8px",
            }}
          >
            {loading
              ? "در حال ارسال..."
              : "ثبت و ارسال درخواست"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable styles
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