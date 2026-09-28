import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Server, 
  LayoutDashboard, 
  PlusCircle, 
  ListFilter, 
  ShieldCheck, 
  User, 
  LogOut 
} from 'lucide-react';
import '../styles/Navbar.css';

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
        {/* Brand System Logo */}
        <Link to="/dashboard" className="brand-logo" aria-label="QuickDesk Home">
          <span className="brand-icon">
            <Server size={18} strokeWidth={2.2} />
          </span>
          <div className="brand-text-block">
            <span className="brand-name">QuickDesk</span>
            <span className="brand-sub">IT Helpdesk Portal</span>
          </div>
        </Link>

        {/* Semantic Navigation Menu */}
        <nav className="main-nav" aria-label="Navigasi Utama">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <LayoutDashboard size={15} strokeWidth={2} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {!isAdmin && (
              <li>
                <NavLink
                  to="/create-ticket"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <PlusCircle size={15} strokeWidth={2} />
                  <span>Buat Tiket</span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/my-tickets"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <ListFilter size={15} strokeWidth={2} />
                <span>{isAdmin ? 'Semua Tiket' : 'Tiket Saya'}</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* User Identity & Logout Button */}
        <div className="user-profile-section">
          <div className="user-info">
            <span className="user-name">{currentUser?.name || currentUser?.username}</span>
            <div className={`role-pill ${isAdmin ? 'role-admin' : 'role-user'}`}>
              {isAdmin ? (
                <>
                  <ShieldCheck size={12} strokeWidth={2.2} />
                  <span>IT ADMIN</span>
                </>
              ) : (
                <>
                  <User size={12} strokeWidth={2.2} />
                  <span>USER</span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="btn-logout"
            title="Keluar dari sesi"
          >
            <LogOut size={14} strokeWidth={2} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
