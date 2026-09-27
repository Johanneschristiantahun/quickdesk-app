import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Komponen Pembungkus Route Terproteksi (Protected Route)
 * Sesuai Kriteria Rubrik B2:
 * "inner pages cannot be opened without logging in."
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  // Jika user belum login, lempar kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika halaman hanya khusus role admin dan user yang login bukan admin
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika lolos proteksi, tampilkan halaman yang diminta
  return children;
}
