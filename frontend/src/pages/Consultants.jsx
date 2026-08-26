import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import BookingModal from "../components/BookingModal";
import { getConsultants, getServices } from "../services/api";

const Consultants = () => {
  const navigate = useNavigate();
  const [consultants, setConsultants] = useState([]);

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend search/filter values
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch consultants from Django
  useEffect(() => {
    fetchConsultants();
    fetchServices();
  }, [searchQuery, selectedSpecialty]);

  const fetchConsultants = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};

      // Search by name or title
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      // Filter by title/specialty
      if (selectedSpecialty) {
        params.title__icontains = selectedSpecialty; 
      }

      const response = await getConsultants(params);

      setConsultants(response.data);
    } catch (error) {
      console.error("Error fetching consultants:", error);

      setError("خطا در دریافت اطلاعات مشاوران");
      setConsultants([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  const handleBookConsultation = (consultant) => {
    setSelectedConsultant(consultant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsultant(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#0a192f",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "40px 20px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* Page Header */}
        <h1
          style={{
            color: "#d4af37",
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          شبکه مشاوران و اساتید ارشد
        </h1>

        <p
          style={{
            color: "#8892b0",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          ارتباط مستقیم با برترین متخصصان عارضه‌یابی و توسعه کسب‌وکار
        </p>


        {/* Search & Filter */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "32px",
            backgroundColor: "#112240",
            padding: "16px",
            borderRadius: "10px",
          }}
        >

          {/* Search */}
          <input
            type="text"
            placeholder="جستجوی نام یا تخصص مشاور..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #233554",
              backgroundColor: "#0a192f",
              color: "#fff",
            }}
          />


          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #233554",
              backgroundColor: "#0a192f",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="">همه تخصص‌ها</option>

            <option value="ERP">
              سیستم‌های ERP
            </option>

            <option value="ISO">
               ISO
            </option>

            <option value="مالی">
              مدیریت مالی و استراتژی
            </option>

            <option value="HSE">
              HSE
            </option>

            <option value="غذا و دارو">
              غذا و دارو
            </option>
          </select>

        </div>


        {/* Loading */}
        {loading && (
          <p
            style={{
              textAlign: "center",
              color: "#8892b0",
            }}
          >
            در حال بارگذاری اطلاعات مشاوران...
          </p>
        )}


        {/* Error */}
        {!loading && error && (
          <p
            style={{
              textAlign: "center",
              color: "#e74c3c",
            }}
          >
            {error}
          </p>
        )}


        {/* No Results */}
        {!loading && !error && consultants.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#8892b0",
            }}
          >
            مشاوری با این مشخصات پیدا نشد.
          </p>
        )}


        {/* Consultants */}
        {!loading && !error && consultants.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                style={{
                  backgroundColor: "#112240",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >

                {/* Consultant Image */}
                {consultant.image_url && (
                  <img
                    src={consultant.image_url}
                    alt={consultant.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "16px",
                    }}
                  />
                )}


                {/* Name */}
                <h3
                  style={{
                    fontSize: "18px",
                    color: "#e6f1ff",
                    margin: "0 0 8px 0",
                  }}
                >
                  {consultant.name}
                </h3>


                {/* Title */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#d4af37",
                    fontWeight: "bold",
                    margin: "8px 0",
                  }}
                >
                  {consultant.title}
                </p>


                {/* Experience */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    color: "#d4af37",
                    backgroundColor: "rgba(212,175,55,0.1)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    marginBottom: "12px",
                  }}
                >
                  {consultant.experience_years} سال سابقه
                </span>


                {/* Bio */}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#ccd6f6",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {consultant.bio}
                </p>


                {/* Consultation Button */}
                <button
                  onClick={() =>
                    handleBookConsultation(consultant)
                  }
                  style={{
                    width: "100%",
                    backgroundColor: "#d4af37",
                    color: "#0a192f",
                    padding: "10px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  درخواست جلسه مشاوره
                </button>
                <button
                  onClick={() => navigate(`/consultants/${consultant.id}`)}
                  style={{
                    width: "100%",
                    backgroundColor: "#d4af37",
                    color: "#0a192f",
                    padding: "10px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  مشاهده رزومه
                </button>

              </div>
            ))}
          </div>
        )}

      </div>


      {/* Consultation Modal */}
      {isModalOpen && selectedConsultant && (
        <BookingModal
          consultant={selectedConsultant}
          services={services}
          onClose={closeModal}
        />
      )}

    </div>
  );
};

export default Consultants;