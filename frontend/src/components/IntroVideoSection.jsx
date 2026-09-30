import React, { useState } from "react";

const videosList = [
  {
    id: 1,
    title: "معرفی مجتمع آموزشی مدیران",
    aparatId: "B2Iv4",
  },
  {
    id: 2,
    title: "معرفی حوزه‌های فعالیت شبکه مشاوران مدیران",
    aparatId: "s2001q3", // replace with second video ID
  },
];

const IntroVideoSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add your search action or navigation logic here
      console.log("Searching for service:", searchQuery);
    }
  };

  return (
    <section className="intro-video-section" dir="rtl">
      <div className="intro-video-container">
        {/* بنر اصلی بالا */}
        <div className="intro-banner-card">
          <div className="intro-banner-content">
            <div className="intro-badge">پلتفرم جامع مدیریت و مشاوره</div>
            <h2 className="intro-subtitle">
              برند برتر خدمات مشاوره، استقرار ERP و ISO
            </h2>

            {/* فرم جستجوی خدمات */}
            <form className="intro-search-form" onSubmit={handleSearchSubmit}>
              <div className="intro-search-input-wrapper">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="جستجوی خدمات، دوره‌ها یا مشاوره..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="intro-search-input"
                />
              </div>
              <button type="submit" className="intro-search-button">
                جستجو
              </button>
            </form>

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

          <div className="intro-banner-image-wrapper">
            <img
              src="/images/modiran_group.webp"
              alt="شبکه مشاوران مدیران"
              className="intro-banner-img"
            />
          </div>
        </div>

        {/* لیست ویدیوها */}
        <div className="intro-videos-grid">
          {videosList.map((video) => (
            <div key={video.id} className="intro-video-card">
              {video.duration && <span className="intro-video-duration">{video.duration}</span>}

              <div className="intro-video-player-wrapper">
                <iframe
                  src={`https://www.aparat.com/video/video/embed/videohash/${video.aparatId}/vt/frame`}
                  allowFullScreen={true}
                  title={video.title}
                  className="intro-video-player"
                />
              </div>

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