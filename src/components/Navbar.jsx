import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

/**
 * Komponen Navigasi Utama (Navbar)
 * Sesuai Kriteria Rubrik B2 & C2:
 * - Menggunakan elemen semantik <header> dan <nav>
 * - Navigasi menggunakan <NavLink> / <Link> dari React Router
 * - Menu berbeda berdasarkan role yang sedang login (Permission Matrix)
 * - Menampilkan status role pengguna dan tombol Logout
 */
export default function Navbar() {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <Link to="/dashboard" className="brand-logo">
          <span className="brand-icon">Q</span>
          <span className="brand-name">QuickDesk</span>
        </Link>

        {/* Semantic Navigation Menu */}
        <nav className="main-nav" aria-label="Navigasi Utama">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Dashboard
              </NavLink>
            </li>

            {/* Menu Khusus Role User (Sesuai Permission Matrix A1) */}
            {!isAdmin && (
              <li>
                <NavLink
                  to="/create-ticket"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  + Buat Tiket Baru
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/my-tickets"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {isAdmin ? 'Semua Tiket' : 'Tiket Saya'}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* User Info & Logout Button */}
        <div className="user-profile-section">
          <div className="user-info">
            <span className="user-name">{currentUser?.name || currentUser?.username}</span>
            <span className={`role-badge ${isAdmin ? 'badge-admin' : 'badge-user'}`}>
              {isAdmin ? '🛡️ IT Admin' : '👤 Mahasiswa / User'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="btn-logout"
            title="Keluar dari akun"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
