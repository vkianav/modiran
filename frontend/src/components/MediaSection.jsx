import React, { useState } from "react";

const mediaData = {
  videos: [
    {
      id: 1,
      title: "معرفی راهکارهای جامع استقرار ERP",
      author: "دکتر علوی - مشاور ارشد",
      cover:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "گزارش برگزاری سمینار رهبری سازمان",
      author: "رویداد تیرماه ۱۴۰۵",
      cover:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    },
  ],
  photos: [
    {
      id: 1,
      title: "جلسه عارضه‌یابی و پیاده‌سازی ISO",
      tag: "پروژه صنعتی",
      img:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "کارگاه آموزشی مدیریت استراتژیک",
      tag: "سمینار",
      img:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "تقدیر از مدیران برتر سال",
      tag: "همایش",
      img:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    },
  ],
};

const MediaSection = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <section id="media" className="media-section" dir="rtl">
      <div className="media-container">
        <div className="media-header">
          <span className="section-label">رسانه و گالری</span>
          <h2>
            رسانه و <span>رویدادهای مدیران</span>
          </h2>
          <p>نگاهی به ویدیوهای آموزشی، جلسات مشاوره و همایش‌های برگزار شده</p>
        </div>

        <div className="media-tabs">
          <button
            className={`media-tab-btn ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            ویدیوها و مصاحبه‌ها
          </button>
          <button
            className={`media-tab-btn ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            گالری تصاویر
          </button>
        </div>

        {activeTab === "videos" && (
          <div className="media-grid">
            {mediaData.videos.map((video) => (
              <article key={video.id} className="media-card">
                <div className="media-thumb-wrapper">
                  <img src={video.cover} alt={video.title} className="media-thumb" />
                  <div className="play-overlay">
                    <div className="play-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="media-card-content">
                  <h3>{video.title}</h3>
                  <span className="media-author">{video.author}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "photos" && (
          <div className="media-grid">
            {mediaData.photos.map((photo) => (
              <article key={photo.id} className="media-card">
                <div className="media-thumb-wrapper">
                  <img src={photo.img} alt={photo.title} className="media-thumb" />
                </div>
                <div className="media-card-content">
                  <span className="media-tag">{photo.tag}</span>
                  <h3>{photo.title}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;