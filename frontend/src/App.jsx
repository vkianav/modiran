import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Consultants from './pages/Consultants';
import SuccessStories from './pages/SuccessStories';
import Events from './pages/Events';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import BookDetail from './pages/BookDetail';
import CourseDetail from './pages/CourseDetail';
import BookingModal from './components/BookingModal';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer'; // ۱. اضافه شدن کامپوننت فوتر

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div 
        style={{ 
          backgroundColor: 'var(--bg-primary, #0a192f)', 
          minHeight: '100vh', 
          color: 'var(--text-primary, #ffffff)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <ThemeToggle />

        {/* بخش محتوای اصلی صفحات */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/consultants" element={<Consultants />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/events" element={<Events />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        {/* ۲. قرارگیری فوتر در انتهای تمام صفحات */}
        <Footer />

        {isModalOpen && <BookingModal consultant={null} onClose={() => setIsModalOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;