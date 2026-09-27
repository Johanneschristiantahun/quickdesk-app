import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';

/**
 * Halaman Login Sistem
 * Sesuai Kriteria Rubrik B1:
 * - Hardcoded accounts for >= 2 roles ('admin' & 'user')
 * - Wrong login shows an error message
 * - Logged-in role drives menu & dashboard
 * - Logout works
 */
export default function LoginPage() {
  // State lokal input formulir (Controlled Components)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, loginError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Arahkan ke rute tujuan sebelumnya atau ke /dashboard
  const redirectTarget = location.state?.from?.pathname || '/dashboard';

  // Jika sudah login, langsung alihkan ke dashboard
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  // Handler Submit Formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman bawaan browser
    const success = login(username, password);
    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  // Helper untuk tombol cepat demo saat presentasi
  const handleQuickLogin = (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    login(demoUser, demoPass);
    navigate('/dashboard');
  };

  return (
    <main className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">Q</div>
          <h1 className="auth-title">QuickDesk</h1>
          <p className="auth-subtitle">Internal IT Support &amp; Helpdesk Portal</p>
        </div>

        {/* Notifikasi Error jika kredensial salah (Kriteria B1) */}
        {loginError && (
          <div className="alert-error" role="alert">
            <span className="alert-icon">⚠️</span>
            <span>{loginError}</span>
          </div>
        )}

        {/* Formulir Login Terkontrol */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-username" className="form-label">
              Username <span className="required-star">*</span>
            </label>
            <input
              id="login-username"
              type="text"
              className="form-input"
              placeholder="Contoh: admin atau user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password <span className="required-star">*</span>
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn-primary-block">
            Masuk ke Portal
          </button>
        </form>

        {/* Kotak Akun Demo Cepat untuk Kelancaran Presentasi */}
        <div className="demo-accounts-box">
          <p className="demo-box-title">💡 Akun Hardcoded Demo (Klik untuk Login Cepat):</p>
          <div className="demo-btn-group">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin', 'admin123')}
              className="btn-demo btn-demo-admin"
            >
              👑 Login sbg IT Admin (admin / admin123)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('user', 'user123')}
              className="btn-demo btn-demo-user"
            >
              👤 Login sbg User (user / user123)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
