import React, { useState } from "react";

const videosList = [
  {
    id: 1,
    title: "معرفی مجتمع آموزشی مدیران",
    duration: "۰۳:۱۶",
    aparatId: "B2Iv4",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQvn75MV3Ypr0XMbblvGKYhVEjS-uXq_BRr5CcazvIZHwGUgO2UuQEyA&s=10",
  },
];

const IntroVideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="intro-section" dir="rtl">
      <div className="intro-container">
        {/* بنر اصلی بالا */}
        <div className="intro-banner-card">
          <div className="intro-banner-content">
            <div className="intro-badge">پلتفرم جامع مدیریت و مشاوره</div>
            <h2>شبکه مشاوران ارشد مدیران</h2>
            <p className="intro-subtitle">
              برند برتر خدمات مشاوره، استقرار ERP و ISO
            </p>

            <div className="intro-socials">
              <a href="#instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#telegram" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="intro-banner-image">
            <img
              src="/images/modiran.png"
              alt="شبکه مشاوران مدیران"
              onError={(e) => {
                // اگر عکس محلی لود نشد، عکس پیش‌فرض قرار گیرد
                e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQvn75MV3Ypr0XMbblvGKYhVEjS-uXq_BRr5CcazvIZHwGUgO2UuQEyA&s=10";
              }}
            />
          </div>
        </div>

        {/* لیست ویدیوها */}
        <div className="intro-videos-grid">
          {videosList.map((video) => (
            <div key={video.id} className="intro-video-card">
              <span className="intro-video-duration">{video.duration}</span>

              {activeVideo === video.id ? (
                <div className="intro-video-player-wrapper">
                  <iframe
                    src={`https://www.aparat.com/video/video/embed/videohash/${video.aparatId}/vt/frame`}
                    allowFullScreen={true}
                    title={video.title}
                    className="intro-video-player"
                  />
                </div>
              ) : (
                <div
                  className="intro-video-poster"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <img src={video.poster} alt={video.title} />
                  <div className="intro-play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="intro-video-info">
                <h3>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroVideoSection;