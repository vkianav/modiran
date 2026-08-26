import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Consultants from './pages/Consultants';
import SuccessStories from './pages/SuccessStories';
import Events from './pages/Events';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import BookingModal from './components/BookingModal';
import ConsultantDetail from './pages/ConsultantDetail';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // بررسی وضعیت ورود کاربر
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div style={{ backgroundColor: '#0a192f', minHeight: '100vh', color: '#ffffff' }}>
        <Navbar onOpenModal={() => setIsModalOpen(true)} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route
            path="/consultants/:id"
            element={<ConsultantDetail />}
          />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/events" element={<Events />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {isModalOpen && <BookingModal consultant={null} onClose={() => setIsModalOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;