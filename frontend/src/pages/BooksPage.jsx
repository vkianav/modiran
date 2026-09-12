import React from 'react';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const booksData = [
    { id: 1, title: 'راهنمای محرمانه بازاریابی اینترنتی', category: 'کتاب تخصصی', price: '۲۹,۰۰۰', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'کتاب نقشه راه توسعه فردی', category: 'توسعه فردی', price: '۱۹۷,۰۰۰', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'راهنمای محرمانه نوشتن تیترهای فوق جذاب', category: 'کپی‌رایتینگ', price: '۳۹,۰۰۰', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'کتاب چرا مدیریت زمان جواب نمی‌دهد؟', category: 'مدیریت و رهبری', price: '۱۷۹,۰۰۰', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', minHeight: '100vh', padding: '100px 20px 60px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#d4af37', fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
            فروشگاه و انتشارات مدیران
          </h1>
          <p style={{ color: '#8892b0', fontSize: '16px' }}>
            مجموعه جامع کتاب‌ها و دستنامه‌های تخصصی حوزه مدیریت، رهبری و کسب‌وکار
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {booksData.map((book) => (
            <div key={book.id} style={{ backgroundColor: '#112240', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)', overflow: 'hidden' }}>
              <img src={book.image} alt={book.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span style={{ color: '#d4af37', fontSize: '12px' }}>{book.category}</span>
                <h3 style={{ color: '#e6f1ff', fontSize: '16px', margin: '8px 0 16px' }}>{book.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', fontWeight: 'bold' }}>{book.price} تومان</span>
                  <Link to={`/books/${book.id}`} style={{ backgroundColor: '#d4af37', color: '#0a192f', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                    مشاهده اثر
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;