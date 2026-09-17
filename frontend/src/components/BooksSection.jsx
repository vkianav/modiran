import React from "react";
import { Link } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "مدیریت استراتژیک",
    author: "مایکل پورتر",
    category: "مدیریت و استراتژی",
    description:
      "نگاهی کاربردی به استراتژی، رقابت و ایجاد مزیت رقابتی در سازمان‌ها.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "مدیریت در سازمان",
    author: "پیتر دراکر",
    category: "مدیریت",
    description:
      "اصول و مفاهیم مهم مدیریت برای مدیران و رهبران سازمانی.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "تفکر سیستمی",
    author: "پیتر سنگه",
    category: "توسعه سازمان",
    description:
      "چگونه سازمان‌ها می‌توانند با نگاه سیستمی عملکرد خود را بهبود دهند.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80",
  },
];

function BooksSection() {
  return (
    <section
      id="books"
      className="books-section"
      dir="rtl"
    >
      <div className="books-container">

        <div className="books-header">
          <div>
            <span className="section-label">
              کتابخانه مدیران
            </span>

            <h2>
              کتاب‌هایی برای
              <span> بهتر فکر کردن</span>
            </h2>

            <p>
              مجموعه‌ای از کتاب‌های منتخب در حوزه مدیریت،
              رهبری، کسب‌وکار و توسعه سازمانی.
            </p>
          </div>

          <Link
            to="/books"
            className="section-more-link"
          >
            مشاهده همه کتاب‌ها
            <span>←</span>
          </Link>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <article
              className="book-card"
              key={book.id}
            >
              <div className="book-image-wrapper">
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-image"
                />

                <span className="book-category">
                  {book.category}
                </span>
              </div>

              <div className="book-content">
                <h3>{book.title}</h3>

                <div className="book-author">
                  نویسنده: {book.author}
                </div>

                <p>{book.description}</p>

                <Link
                  to={`/books/${book.id}`}
                  className="book-link"
                >
                  مطالعه بیشتر
                  <span>←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BooksSection;