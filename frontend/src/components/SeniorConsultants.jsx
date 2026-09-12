import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SeniorConsultants.css';

const consultantsData = [
  {
    id: 1,
    name: 'سارینا امینی',
    role: 'مشاور ارشد استراتژی',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'آنا احمدی',
    role: 'مدیر ارشد مهندسی و تحلیل',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'کریم حداد',
    role: 'مشاور توسعه کسب‌وکار',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
  },
];

const SeniorConsultants = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (id) => {
    navigate(`/consultants/${id}`);
  };

  return (
    <section className="consultants-section">
      <div className="consultants-header">
        <span className="section-subtitle">MODIRAN NETWORK • {consultantsData.length} CONSULTANTS</span>
        <h2 className="section-title">مشاوران ارشد</h2>
      </div>

      <div className="swiper-container-wrapper">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ el: '.custom-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="consultants-swiper"
        >
          {consultantsData.map((consultant) => (
            <SwiperSlide key={consultant.id} className="consultant-card-slide">
              <div className="consultant-card" onClick={() => handleCardClick(consultant.id)}>
                <div className="card-image-wrapper">
                  <img src={consultant.image} alt={consultant.name} />
                  <div className="card-overlay" />
                </div>
                <div className="card-info">
                  <h3>{consultant.name}</h3>
                  <p>{consultant.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="controls-wrapper">
          <button className="swiper-button-prev-custom">‹</button>
          <div className="pagination-info">
            <span className="counter">
              0{activeIndex + 1} / 0{consultantsData.length}
            </span>
            <div className="custom-pagination" />
          </div>
          <button className="swiper-button-next-custom">›</button>
        </div>
      </div>
    </section>
  );
};

export default SeniorConsultants;