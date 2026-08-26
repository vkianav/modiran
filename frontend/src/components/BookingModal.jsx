import React, { useState } from "react";
import { createConsultationRequest } from "../services/api";

const BookingModal = ({ consultant, services = [], onClose }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consultant) {
      alert("لطفاً یک مشاور انتخاب کنید.");
      return;
    }

    if (!formData.service) {
      alert("لطفاً نوع خدمت مورد نیاز را انتخاب کنید.");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        company_name: formData.company_name,
        contact_name: formData.contact_name,
        email: formData.email,
        phone: formData.phone,
        service: Number(formData.service),
        consultant: consultant.id,
        description: formData.description,
      };

      console.log("Sending consultation request:", requestData);

      await createConsultationRequest(requestData);

      alert(
        `درخواست شما برای ${consultant.name} با موفقیت ثبت شد.`
      );

      onClose();

    } catch (error) {
      console.error("Consultation request error:", error);

      if (error.response?.data) {
        console.error("Backend error:", error.response.data);
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

        {/* Consultant */}
        <h2
          style={{
            color: "#d4af37",
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          درخواست جلسه با
        </h2>

        <h3
          style={{
            color: "#e6f1ff",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {consultant?.name}
        </h3>

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
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
              نام و نام خانوادگی:
            </label>

            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
              placeholder="نام و نام خانوادگی"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#0a192f",
                color: "#fff",
              }}
            />
          </div>

          {/* Company */}
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
              نام سازمان / شرکت:
            </label>

            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              placeholder="نام شرکت یا سازمان"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#0a192f",
                color: "#fff",
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
              ایمیل:
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#0a192f",
                color: "#fff",
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
              شماره تماس:
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="09xxxxxxxxx"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#0a192f",
                color: "#fff",
              }}
            />
          </div>

          {/* Service */}
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
              نوع خدمت مورد نیاز:
            </label>

            <input
              type="text"
              value={consultant?.title || ""}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#1a2f4d",
                color: "#d4af37",
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "#8892b0",
                display: "block",
                marginBottom: "4px",
              }}
            >
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
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #233554",
                backgroundColor: "#0a192f",
                color: "#fff",
                resize: "vertical",
              }}
            />
          </div>

          {/* Submit */}
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
            {loading
              ? "در حال ارسال..."
              : "ثبت و ارسال درخواست"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;