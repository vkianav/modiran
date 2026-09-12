import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';

function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId;
    let currentIndex = 0;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayed(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function HeroSection() {
  const [selectedServices, setSelectedServices] = useState([]);
  const serviceOptions = ['مشاوره استراتژی', 'تحول دیجیتال', 'مدیریت مالی', 'بازاریابی و برندینگ'];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const { displayed, done } = useTypewriter('به شبکه مشاوران ارشد\nمدیران خوش آمدید', 45, 500);

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ffffff', padding: '120px 20px 60px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2', color: '#ffffff', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
            {displayed}
            {!done && <span style={{ display: 'inline-block', width: '3px', height: '1em', backgroundColor: '#d4af37', marginRight: '5px' }} />}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ color: '#8892b0', fontSize: '1.2rem', marginBottom: '40px' }}>
          ارتقای کسب‌وکار شما با برترین متخصصان و مشاوران مدیریت کشور.
        </motion.p>

        {/* Service Selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 style={{ fontSize: '1.3rem', color: '#d4af37', marginBottom: '15px' }}>به چه حوزه مشاوره‌ای نیاز دارید؟</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {serviceOptions.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '25px',
                    border: '1px solid #d4af37',
                    backgroundColor: isSelected ? '#d4af37' : 'transparent',
                    color: isSelected ? '#0a192f' : '#ffffff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{service}</span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          <AnimatePresence mode="wait">
            {selectedServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  backgroundColor: '#112240',
                  border: '1px solid #233554',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-[#d4af37]',
                  alignItems: 'center',
                  maxWidth: '600px'
                }}
              >
                <span style={{ color: '#e6f1ff', fontSize: '0.95rem' }}>
                  درخواست مشاوره در زمینه: <strong>{selectedServices.join('، ')}</strong>
                </span>
                <button style={{ backgroundColor: 'transparent', border: 'none', color: '#d4af37', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
                  ثبت درخواست <ArrowLeft size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}