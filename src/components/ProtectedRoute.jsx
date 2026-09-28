import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Komponen Pembungkus Route Terproteksi (Route Guard)
 * Mencegah akses ke halaman internal tanpa status otentikasi aktif
 */
export default function ProtectedRoute({ children, adminOnly = false, userOnly = false }) {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Jika user belum login, lempar kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika rute khusus admin dan pengguna bukan admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika rute khusus user (pelapor) dan pengguna adalah admin
  if (userOnly && isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika lolos proteksi, tampilkan halaman yang diminta
  return children;
}
