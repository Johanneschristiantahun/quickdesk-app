import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import '../styles/Dashboard.css';

/**
 * Halaman Form Output (Riwayat & Hasil Pengajuan Tiket)
 * Sesuai Kriteria Rubrik B5:
 * - Submitted data appears on the output page/dashboard (state lifted to a parent)
 * - Multiple entries can be added and are neatly listed
 */
export default function MyTicketsPage() {
  const { currentUser, isAdmin } = useAuth();
  const { tickets, latestSubmittedTicket } = useTickets();
  const location = useLocation();

  // Ambil pesan sukses jika dialihkan dari CreateTicketPage
  const successMessage = location.state?.successMessage;

  // Filter tiket sesuai peran (Admin melihat semua, User melihat miliknya)
  const visibleTickets = isAdmin
    ? tickets
    : tickets.filter((t) => t.authorUsername === currentUser.username);

  return (
    <div className="output-page-container">
      {/* Breadcrumb Navigasi */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span className="separator">/</span>
        <span className="current">{isAdmin ? 'Semua Tiket Kampus' : 'Riwayat Tiket Saya'}</span>
      </nav>

      {/* Banner Sukses saat Baru Saja Submit Form (Kriteria B5) */}
      {successMessage && (
        <div className="alert-success-banner" role="status">
          <span className="success-icon">🎉</span>
          <div>
            <strong>Berhasil Tersimpan!</strong>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header Halaman Output */}
      <div className="output-header-bar">
        <div>
          <h1 className="page-title">
            {isAdmin ? '📋 Daftar Seluruh Tiket Layanan IT' : '📑 Riwayat Tiket Keluhan Saya'}
          </h1>
          <p className="page-subtitle">
            {isAdmin
              ? 'Menampilkan seluruh tiket laporan teknis yang masuk dari mahasiswa dan staf.'
              : 'Daftar seluruh laporan kendala yang telah Anda kirimkan ke sistem QuickDesk.'}
          </p>
        </div>

        {!isAdmin && (
          <Link to="/create-ticket" className="btn-create-ticket">
            + Ajukan Tiket Baru
          </Link>
        )}
      </div>

      {/* Daftar Tiket Output Form (Kriteria B5: Multiple entries neatly listed) */}
      {visibleTickets.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon">📂</div>
          <h3 className="empty-title">Belum Ada Tiket Terkirim</h3>
          <p className="empty-text">
            Anda belum pernah membuat laporan tiket keluhan. Silakan isi form pengajuan tiket baru.
          </p>
          {!isAdmin && (
            <Link to="/create-ticket" className="btn-create-ticket" style={{ marginTop: '14px' }}>
              Isi Formulir Tiket
            </Link>
          )}
        </div>
      ) : (
        <div className="ticket-cards-list">
          {visibleTickets.map((ticket, index) => {
            const isNewlyCreated = latestSubmittedTicket && latestSubmittedTicket.id === ticket.id;

            return (
              <article
                key={ticket.id}
                className={`output-ticket-card ${isNewlyCreated ? 'new-ticket-highlight' : ''}`}
                aria-labelledby={`ticket-title-${ticket.id}`}
              >
                {/* Header Kartu */}
                <div className="ticket-card-top">
                  <div className="ticket-card-meta">
                    <span className="id-badge">{ticket.id}</span>
                    {isNewlyCreated && (
                      <span className="badge-new-arrival">✨ Baru Ditambahkan</span>
                    )}
                    <span className="ticket-card-date">📅 {ticket.createdAt}</span>
                  </div>

                  <div className="ticket-badges-group">
                    <span
                      className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
                    >
                      Prioritas: {ticket.priority}
                    </span>
                    <span
                      className={`status-pill status-${ticket.status.toLowerCase().replace(' ', '-')}`}
                    >
                      Status: {ticket.status}
                    </span>
                  </div>
                </div>

                {/* Judul & Kategori */}
                <h2 id={`ticket-title-${ticket.id}`} className="ticket-card-title">
                  {ticket.title}
                </h2>
                <div className="ticket-category-row">
                  <span className="category-tag">🏷️ {ticket.category}</span>
                  <span className="ticket-reporter-info">
                    Dilaporkan oleh: <strong>{ticket.authorName}</strong> (@{ticket.authorUsername})
                  </span>
                </div>

                {/* Deskripsi Lengkap Masalah */}
                <div className="ticket-description-box">
                  <p className="ticket-desc-text">"{ticket.description}"</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
