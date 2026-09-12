import React from 'react';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <img 
        src="https://s3.ir-thr-at1.arvanstorage.ir/modiran-assets/modiran-logo.png" 
        alt="لوگوی مدیران - برنامه‌ریزی، مدیریت، موفقیت" 
        style={{ 
          height: '52px', 
          width: 'auto', 
          objectFit: 'contain',
          filter: 'brightness(1.1)' 
        }} 
        onError={(e) => {
          // در صورت قطعی اینترنت، نمایش نسخه رزرو
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;direction:rtl">
              <span style="color:#ffffff;font-weight:bold;font-size:20px">MODIRAN</span>
              <span style="color:#d4af37;font-weight:bold;font-size:18px">مدیران</span>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default Logo;