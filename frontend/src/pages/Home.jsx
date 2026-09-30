import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import SolutionsSection from "../components/SolutionsSection";
import BooksSection from "../components/BooksSection";
import CoursesSection from "../components/CoursesSection";
import NewsSection from "../components/NewsSection";
import MediaSection from "../components/MediaSection";
import FeedbackSection from "../components/FeedbackSection";
import ClientsSlider from "../components/ClientsSlider";
import "../styles/homeSections.css";
import { getServices } from "../services/api";

// نگاشت عنوان دپارتمان‌ها به اسلاگ صفحات جزییات
const departmentSlugMap = {
  "مدیریت و استراتژی": "management",
  "دپارتمان مدیریت و استراتژی": "management",
  "مالی و بازرگانی": "finance",
  "دپارتمان مالی و بازرگانی": "finance",
  "صنایع و ERP": "erp",
  "دپارتمان صنایع و ERP": "erp",
  "فناوری اطلاعات": "it",
  "دپارتمان فناوری اطلاعات (IT)": "it",
  "منابع انسانی": "hr",
  "دپارتمان منابع انسانی": "hr",
  "بازاریابی و فروش": "sales",
  "دپارتمان بازاریابی و فروش": "sales",
  "استقرار ISO و کیفیت": "iso",
  "دپارتمان استقرار ISO و کیفیت": "iso",
  "حقوقی و قراردادها": "legal",
  "دپارتمان حقوقی و قراردادها": "legal",
};

const Home = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError("");

        const response = await getServices();

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServiceError("خطا در دریافت حوزه‌های مشاوره.");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // ۱. تابع برای انتقال به صفحه جزییات دپارتمان (مخصوص آیکون‌های شکل‌دار)
  const handleDepartmentClick = (departmentName) => {
    const slug = departmentSlugMap[departmentName] || "management";
    navigate(`/department/${slug}`);
  };

  // ۲. تابع انتخاب خدمات برای فیلتر کردن مشاوران (مخصوص دکمه‌های کادری)
  const toggleService = (serviceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const selectedServiceObjects = services.filter((service) =>
    selectedServices.includes(service.id)
  );

  const consultantsUrl =
    selectedServices.length === 0
      ? "/consultants"
      : `/consultants?${selectedServices
          .map((id) => `service=${id}`)
          .join("&")}`;

  return (
    
    <div
      style={{
        backgroundColor: "var(--bg-primary, #0a192f)",
        color: "var(--text-primary, #ffffff)",
        minHeight: "100vh",
        direction: "rtl",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >

      {/* Hero Section */}
      <HeroSection
        services={services}
        selectedServices={selectedServices}
        loadingServices={loadingServices}
        serviceError={serviceError}
        toggleService={toggleService}
        onDepartmentClick={handleDepartmentClick} // ارسال پروپ هدایت دپارتمان به هیرو
        selectedServiceObjects={selectedServiceObjects}
        consultantsUrl={consultantsUrl}
      />

      {/* Solutions */}
      <SolutionsSection />

      {/* سایر بخش‌های صفحه اصلی */}
      <BooksSection />
      <CoursesSection />
      <NewsSection />
      <FeedbackSection />

      {/* اسلایدر مشتریان */}
      <ClientsSlider />
    </div>
  );
};

export default Home;