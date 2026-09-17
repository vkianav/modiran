import React from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "مدیریت استراتژیک کسب‌وکار",
    instructor: "استاد و مشاور ارشد مدیران",
    duration: "۱۲ ساعت",
    type: "آنلاین",
    level: "متوسط",
  },
  {
    id: 2,
    title: "اصول مدیریت و رهبری سازمان",
    instructor: "اساتید مدیریت و توسعه سازمان",
    duration: "۸ ساعت",
    type: "آنلاین",
    level: "مقدماتی",
  },
  {
    id: 3,
    title: "بهبود فرآیندهای سازمانی",
    instructor: "مشاوران ارشد فرآیند و ERP",
    duration: "۱۰ ساعت",
    type: "حضوری",
    level: "پیشرفته",
  },
];

function CoursesSection() {
  return (
    <section
      id="courses"
      className="courses-section"
      dir="rtl"
    >
      <div className="courses-container">

        <div className="courses-header">
          <div>
            <span className="section-label">
              آموزش و توسعه
            </span>

            <h2>
              مهارت‌هایی برای
              <span> مدیران آینده</span>
            </h2>

            <p>
              دوره‌های آموزشی تخصصی برای مدیران، کارشناسان
              و علاقه‌مندان به توسعه کسب‌وکار.
            </p>
          </div>

          <Link
            to="/courses"
            className="section-more-link"
          >
            مشاهده همه دوره‌ها
            <span>←</span>
          </Link>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <article
              className="course-card"
              key={course.id}
            >
              <div className="course-top">
                <span className="course-type">
                  {course.type}
                </span>

                <span className="course-level">
                  {course.level}
                </span>
              </div>

              <div className="course-icon">
                ▣
              </div>

              <h3>{course.title}</h3>

              <p className="course-instructor">
                {course.instructor}
              </p>

              <div className="course-info">
                <div>
                  <span>مدت دوره</span>
                  <strong>{course.duration}</strong>
                </div>

                <div>
                  <span>فرمت</span>
                  <strong>{course.type}</strong>
                </div>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="course-button"
              >
                مشاهده دوره
                <span>←</span>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CoursesSection;