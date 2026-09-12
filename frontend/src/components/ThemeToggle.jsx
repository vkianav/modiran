import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // خواندن وضعیت اولیه از localStorage یا پیش‌فرض روی تیره
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        position: 'fixed',
        bottom: '25px',
        left: '25px',
        zIndex: 9999,
        backgroundColor: isDark ? '#d4af37' : '#0a192f',
        color: isDark ? '#0a192f' : '#ffffff',
        border: 'none',
        borderRadius: '50px',
        padding: '10px 18px',
        fontWeight: 'bold',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
      }}
    >
      {isDark ? '☀️ حالت روشن' : '🌙 حالت تیره'}
    </button>
  );
};

export default ThemeToggle;