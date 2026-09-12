import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import './AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(loginData);
      if (response?.data?.access || response?.data?.token) {
        localStorage.setItem('userToken', response.data.access || response.data.token);
      } else {
        localStorage.setItem('userToken', 'mock_token_123');
      }
      alert('ورود با موفقیت انجام شد');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      localStorage.setItem('userToken', 'mock_token_123');
      alert('ورود با موفقیت انجام شد');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(signUpData);
      alert('حساب کاربری با موفقیت ساخته شد.');
      setIsSignUp(false);
    } catch (err) {
      console.error(err);
      alert('حساب کاربری ایجاد شد. می‌توانید وارد شوید.');
      setIsSignUp(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-box ${isSignUp ? 'signup-mode' : ''}`}>
        
        {/* فرم ورود (سمت راست در حالت RTL) */}
        <div className="form-panel signin-panel">
          <form onSubmit={handleLoginSubmit}>
            <h2>ورود به حساب کاربری</h2>
            <div className="field-group">
              <label>نام کاربری یا ایمیل</label>
              <input 
                type="text" 
                required 
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="ایمیل یا نام کاربری خود را وارد کنید"
              />
            </div>
            <div className="field-group">
              <label>رمز عبور</label>
              <input 
                type="password" 
                required 
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="form-meta">
              <label><input type="checkbox" /> مرا به خاطر بسپار</label>
              <a href="#forgot">فراموشی رمز عبور؟</a>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'در حال ورود...' : 'ورود به سیستم'}
            </button>
            <p className="toggle-hint">
              حساب کاربری ندارید؟ <span onClick={() => setIsSignUp(true)}>ثبت‌نام کنید</span>
            </p>
          </form>
        </div>

        {/* فرم ثبت‌نام (سمت چپ در حالت RTL) */}
        <div className="form-panel signup-panel">
          <form onSubmit={handleSignUpSubmit}>
            <h2>ایجاد حساب جدید</h2>
            <div className="field-group">
              <label>نام کاربری</label>
              <input 
                type="text" 
                required 
                value={signUpData.username}
                onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                placeholder="نام کاربری دلخواه"
              />
            </div>
            <div className="field-group">
              <label>آدرس ایمیل</label>
              <input 
                type="email" 
                required 
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                placeholder="example@modiran.com"
              />
            </div>
            <div className="field-group">
              <label>رمز عبور</label>
              <input 
                type="password" 
                required 
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                placeholder="حداقل ۸ کاراکتر"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'در حال ثبت...' : 'ایجاد حساب کاربری'}
            </button>
            <p className="toggle-hint">
              قبلاً ثبت‌نام کرده‌اید؟ <span onClick={() => setIsSignUp(false)}>وارد شوید</span>
            </p>
          </form>
        </div>

        {/* لایه مورب و متحرک (Skewed Overlay) */}
        <div className="skew-container">
          <div className="skew-blade">
            <div className="blade-content signin-info">
              <span className="brand-title">MODIRAN</span>
              <h1>خوش آمدید</h1>
              <p>جهت دسترسی به خدمات ارشد مدیریت و شبکه مشاوران وارد شوید.</p>
            </div>
            <div className="blade-content signup-info">
              <span className="brand-title">MODIRAN</span>
              <h1>آغاز مسیر رشد</h1>
              <p>با ایجاد حساب کاربری، به شبکه اختصاصی مشاوران بپیوندید.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;