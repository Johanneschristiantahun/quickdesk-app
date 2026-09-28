import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';

// Import Komponen Navigasi & Proteksi
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import Halaman (Pages)
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTicketPage from './pages/CreateTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import NotFoundPage from './pages/NotFoundPage';

import './styles/App.css';

/**
 * Komponen Konten Aplikasi Utama dengan Pembungkus Navigasi & Footer
 */
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-wrapper">
      {/* Tampilkan Navbar hanya jika pengguna sudah berhasil login */}
      {isAuthenticated && <Navbar />}

      {/* Semantic Main Content */}
      <main className="app-main-content">
        <Routes>
          {/* Rute Publik: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rute Awal: Redirect ke Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Rute Terproteksi: Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Rute Terproteksi: Form Buat Tiket (Khusus Role User / Pelapor) */}
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute userOnly>
                <CreateTicketPage />
              </ProtectedRoute>
            }
          />

          {/* Rute Terproteksi: Riwayat Tiket / Form Output */}
          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute>
                <MyTicketsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer Navigasi */}
      <Footer />
    </div>
  );
}

/**
 * Entry Point Utama Aplikasi
 * Menggunakan HashRouter untuk kompatibilitas routing statis
 */
export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </TicketProvider>
    </AuthProvider>
  );
}
