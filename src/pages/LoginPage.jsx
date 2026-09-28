import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Server, AlertCircle, ArrowRight, Lock, User as UserIcon } from 'lucide-react';
import '../styles/Form.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loginError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTarget = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Proses login
    const success = login(username, password);
    setIsSubmitting(false);

    if (success) {
      navigate(redirectTarget, { replace: true });
    }
  };

  return (
    <main className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Server size={22} strokeWidth={2.2} />
          </div>
          <h1 className="auth-title">QuickDesk Portal</h1>
          <p className="auth-subtitle">Sistem Manajemen Layanan &amp; Antrean Tiket IT</p>
        </div>

        {/* Error Notification */}
        {loginError && (
          <div className="alert-error" role="alert">
            <AlertCircle size={15} strokeWidth={2.2} className="alert-icon-svg" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-username" className="form-label">
              Username
            </label>
            <div className="input-with-icon">
              <UserIcon size={15} className="input-leading-icon" />
              <input
                id="login-username"
                type="text"
                className="form-input has-leading-icon"
                placeholder="Masukkan ID / username akun"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="input-with-icon">
              <Lock size={15} className="input-leading-icon" />
              <input
                id="login-password"
                type="password"
                className="form-input has-leading-icon"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary-block">
            <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Sistem'}</span>
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </form>

        {/* Subtitle Footnote Kredensial Resmi (Bukan Tombol Shortcut Pemalas) */}
        <div className="auth-footnote">
          <p className="footnote-title">Informasi Akun Otorisasi:</p>
          <ul className="footnote-list">
            <li>
              Administrator: <code>admin</code> / <code>admin123</code>
            </li>
            <li>
              User / Mahasiswa: <code>user</code> / <code>user123</code>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
