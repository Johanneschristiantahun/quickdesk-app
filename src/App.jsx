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

          {/* Rute Terproteksi: Dashboard (Kriteria B2 & B3) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Rute Terproteksi: Form Buat Tiket (Kriteria B2 & B4) */}
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute>
                <CreateTicketPage />
              </ProtectedRoute>
            }
          />

          {/* Rute Terproteksi: Form Output / Riwayat Tiket (Kriteria B2 & B5) */}
          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute>
                <MyTicketsPage />
              </ProtectedRoute>
            }
          />

          {/* Rute 404: Tangani URL yang tidak cocok (Kriteria B2) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer Semantik */}
      <Footer />
    </div>
  );
}

/**
 * Entry Point Utama Aplikasi
 * Menggunakan HashRouter untuk memastikan kompatibilitas penuh GitHub Pages tanpa 404 saat refresh (Kriteria D2)
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
