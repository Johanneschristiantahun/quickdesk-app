import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import StatCard from '../components/StatCard';
import TicketTable from '../components/TicketTable';
import '../styles/Dashboard.css';

/**
 * Halaman Dashboard Utama
 * Sesuai Kriteria Rubrik:
 * - B3: Content differs per role; data rendered from an array with map() and unique keys; conditional rendering; has an empty state ("no data yet")
 * - C1: Modular component usage (StatCard, TicketTable) via props
 */
export default function DashboardPage() {
  const { currentUser, isAdmin } = useAuth();
  const { tickets, updateTicketStatus, resetToDefault } = useTickets();

  // Tentukan tiket yang ditampilkan berdasarkan role (Kriteria B3: Differs per role)
  // IT Admin melihat semua tiket kampus, User melihat tiket miliknya sendiri
  const visibleTickets = isAdmin
    ? tickets
    : tickets.filter((t) => t.authorUsername === currentUser.username);

  // Perhitungan metrik ringkasan
  const totalCount = visibleTickets.length;
  const openCount = visibleTickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = visibleTickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = visibleTickets.filter((t) => t.status === 'Resolved').length;

  return (
    <div className="dashboard-page">
      {/* Header Halaman */}
      <div className="dashboard-header-bar">
        <div>
          <h1 className="page-title">
            {isAdmin ? '🛡️ Dashboard Operasional IT Admin' : `👋 Selamat Datang, ${currentUser.name}`}
          </h1>
          <p className="page-subtitle">
            {isAdmin
              ? 'Pantau antrean seluruh laporan kendala teknis kampus dan perbarui status penanganannya.'
              : 'Pantau status tiket perbaikan IT yang telah Anda ajukan.'}
          </p>
        </div>

        <div className="dashboard-actions">
          {/* Tombol Buat Tiket untuk Role User */}
          {!isAdmin && (
            <Link to="/create-ticket" className="btn-create-ticket">
              + Ajukan Tiket Baru
            </Link>
          )}

          {/* Tombol Reset Data Demo (Fitur Tambahan untuk Presentasi) */}
          <button
            type="button"
            onClick={resetToDefault}
            className="btn-reset-data"
            title="Kembalikan data tiket ke kondisi default"
          >
            🔄 Reset Data Demo
          </button>
        </div>
      </div>

      {/* Grid Kartu Metrik Statistik (Reusable StatCard Props) */}
      <section className="stat-cards-grid" aria-label="Ringkasan Statistik">
        <StatCard
          title={isAdmin ? 'TOTAL TIKET KAMPUS' : 'TOTAL TIKET SAYA'}
          value={totalCount}
          icon="📊"
          variant="primary"
          subtitle="Semua laporan tercatat"
        />
        <StatCard
          title="MENUNGGU (OPEN)"
          value={openCount}
          icon="⏳"
          variant="warning"
          subtitle="Belum ditangani teknisi"
        />
        <StatCard
          title="SEDANG DIKERJAKAN"
          value={inProgressCount}
          icon="🛠️"
          variant="info"
          subtitle="Teknisi sedang proses"
        />
        <StatCard
          title="SUDAH SELESAI"
          value={resolvedCount}
          icon="✅"
          variant="success"
          subtitle="Kendala tuntas diselesaikan"
        />
      </section>

      {/* Tabel Data Tiket dengan Filter, Pencarian, & Empty State */}
      <section className="tickets-section">
        <div className="section-header">
          <h2 className="section-title">
            {isAdmin ? 'Daftar Seluruh Tiket Masuk' : 'Daftar Tiket Keluhan Saya'}
          </h2>
          <span className="ticket-counter">Menampilkan {visibleTickets.length} tiket</span>
        </div>

        <TicketTable
          tickets={visibleTickets}
          isAdmin={isAdmin}
          onStatusChange={updateTicketStatus}
        />
      </section>
    </div>
  );
}
