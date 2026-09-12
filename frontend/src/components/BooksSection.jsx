const BooksSection = () => {
  const booksData = [
    {
      id: 1,
      title: 'راهنمای محرمانه بازاریابی اینترنتی',
      category: 'کتاب تخصصی',
      price: '۴۳,۰۰۰',
      offPrice: '۲۹,۰۰۰',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      badge: 'پرفروش'
    },
    {
      id: 2,
      title: 'کتاب نقشه راه توسعه فردی',
      category: 'توسعه فردی',
      price: '۱۹۷,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      badge: 'جدید'
    },
    {
      id: 3,
      title: 'راهنمای محرمانه نوشتن تیترهای فوق جذاب',
      category: 'کپی‌رایتینگ',
      price: '۳۹,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
      badge: null
    },
    {
      id: 4,
      title: 'کتاب چرا مدیریت زمان جواب نمی‌دهد؟',
      category: 'مدیریت و رهبری',
      price: '۱۷۹,۰۰۰',
      offPrice: null,
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
      badge: null
    }
  ];

  return (
    <section style={{ padding: '90px 20px', backgroundColor: '#0a192f', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '42px',
            fontWeight: 'bold',
            color: 'rgba(212, 175, 55, 0.05)',
            letterSpacing: '3px',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            OUR PUBLISHING
          </span>
          <h2 style={{ color: '#d4af37', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', position: 'relative' }}>
            انتشارات مدیران ایران
          </h2>
          <p style={{ color: '#8892b0', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            کتاب‌های منتشر شده توسط انتشارات «مدیران»، منبعی غنی از دانش و تجربه‌های مدیریتی هستند تا مدیران مهارت‌های خود را ارتقا دهند.
          </p>
          <div style={{ marginTop: '20px' }}>
            {/* اتصال به صفحه لیست کامل کتاب‌ها */}
            <Link to="/books" style={{
              backgroundColor: '#d4af37',
              color: '#0a192f',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '14px'
            }}>
              لیست کامل کتاب‌ها 📚
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {booksData.map((book) => (
            <div key={book.id} style={{
              backgroundColor: '#112240',
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              {book.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#d4af37',
                  color: '#0a192f',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 2
                }}>
                  {book.badge}
                </span>
              )}

              <div style={{ width: '100%', height: '240px', backgroundColor: '#1d2d50', overflow: 'hidden' }}>
                <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#d4af37', fontSize: '12px', fontWeight: '500' }}>{book.category}</span>
                  <h3 style={{ color: '#e6f1ff', fontSize: '15px', margin: '8px 0 16px 0', lineHeight: '1.5' }}>
                    {book.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {book.offPrice ? (
                      <>
                        <span style={{ color: '#8892b0', fontSize: '11px', textDecoration: 'line-through' }}>{book.price} تومان</span>
                        <span style={{ color: '#64ffda', fontSize: '15px', fontWeight: 'bold' }}>{book.offPrice} تومان</span>
                      </>
                    ) : (
                      <span style={{ color: '#d4af37', fontSize: '15px', fontWeight: 'bold' }}>{book.price} تومان</span>
                    )}
                  </div>
                  {/* اتصال به صفحه جزییات/خرید اثر */}
                  <Link to={`/books/${book.id}`} style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    خرید اثر
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};