import React, { useState } from 'react';

const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('videos');

  // نمونه داده‌های ویدیو و عکس
  const mediaData = {
    videos: [
      {
        id: 1,
        title: 'معرفی راهکارهای جامع استقرار ERP',
        author: 'دکتر علوی - مشاور ارشد',
        cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
        videoUrl: '#'
      },
      {
        id: 2,
        title: 'گزارش برگزاری سمینار رهبری سازمان',
        author: 'رویداد تیرماه ۱۴۰۵',
        cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
        videoUrl: '#'
      }
    ],
    photos: [
      {
        id: 1,
        title: 'جلسه عارضه‌یابی و پیاده‌سازی ISO',
        tag: 'پروژه صنعتی',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        title: 'کارگاه آموزشی مدیریت استراتژیک',
        tag: 'سمینار',
        img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 3,
        title: 'تقدیر از مدیران برتر سال',
        tag: 'همایش',
        img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80'
      }
    ]
  };

  return (
    <section style={{ padding: '70px 20px', backgroundColor: '#0a192f', color: '#ffffff', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* عنوان بخش */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#d4af37', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            رسانه و رویدادهای مدیران
          </h2>
          <p style={{ color: '#8892b0', fontSize: '15px' }}>
            نگاهی به ویدیوهای آموزشی، جلسات مشاوره و همایش‌های برگزار شده
          </p>
        </div>

        {/* دکمه‌های سوئیچ بین عکس و ویدیو */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTab('videos')}
            style={{
              padding: '10px 24px',
              borderRadius: '20px',
              border: '1px solid #d4af37',
              backgroundColor: activeTab === 'videos' ? '#d4af37' : 'transparent',
              color: activeTab === 'videos' ? '#0a192f' : '#e6f1ff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ویدیوها و مصاحبه‌ها
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            style={{
              padding: '10px 24px',
              borderRadius: '20px',
              border: '1px solid #d4af37',
              backgroundColor: activeTab === 'photos' ? '#d4af37' : 'transparent',
              color: activeTab === 'photos' ? '#0a192f' : '#e6f1ff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            گالری تصاویر
          </button>
        </div>

        {/* نمایش ویدیوها */}
        {activeTab === 'videos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {mediaData.videos.map((video) => (
              <div 
                key={video.id} 
                style={{ 
                  backgroundColor: '#112240', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(212,175,55,0.2)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img src={video.cover} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* آیکون پخش ویدیو */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(10, 25, 47, 0.4)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#d4af37', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a192f">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', color: '#e6f1ff', marginBottom: '8px' }}>{video.title}</h3>
                  <span style={{ fontSize: '13px', color: '#8892b0' }}>{video.author}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* نمایش تصاویر */}
        {activeTab === 'photos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {mediaData.photos.map((photo) => (
              <div 
                key={photo.id} 
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  backgroundColor: '#112240',
                  border: '1px solid rgba(212,175,55,0.15)'
                }}
              >
                <img src={photo.img} alt={photo.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '14px' }}>
                  <span style={{ fontSize: '11px', color: '#d4af37', backgroundColor: 'rgba(212,175,55,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {photo.tag}
                  </span>
                  <h4 style={{ fontSize: '15px', color: '#e6f1ff', marginTop: '8px' }}>{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MediaSection;