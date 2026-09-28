import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { 
  CheckCircle2, 
  PlusCircle, 
  Calendar, 
  ChevronRight, 
  Inbox, 
  Tag, 
  User as UserIcon,
  Clock
} from 'lucide-react';
import '../styles/Dashboard.css';

export default function MyTicketsPage() {
  const { currentUser, isAdmin } = useAuth();
  const { tickets, latestSubmittedTicket } = useTickets();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const visibleTickets = isAdmin
    ? tickets
    : tickets.filter((t) => t.authorUsername === currentUser.username);

  return (
    <div className="output-page-container">
      {/* Semantic Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <ChevronRight size={13} className="breadcrumb-divider" />
        <span className="breadcrumb-current">{isAdmin ? 'Seluruh Antrean Tiket' : 'Riwayat Tiket'}</span>
      </nav>

      {/* Banner Notifikasi Sukses */}
      {successMessage && (
        <div className="alert-success-banner" role="status">
          <CheckCircle2 size={18} strokeWidth={2.2} className="success-icon-svg" />
          <div className="success-content">
            <strong className="success-title">Transaksi Formulir Sukses</strong>
            <p className="success-desc">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="page-header-block">
        <div>
          <h1 className="page-heading">
            {isAdmin ? 'Direktori Seluruh Tiket Layanan' : 'Riwayat Pengajuan Tiket Kendala'}
          </h1>
          <p className="page-subheading">
            {isAdmin
              ? 'Arsip komprehensif seluruh tiket kendala yang diajukan oleh pengguna sistem.'
              : 'Daftar tiket kendala yang telah Anda kirimkan ke tim operasional IT.'}
          </p>
        </div>

        {!isAdmin && (
          <Link to="/create-ticket" className="btn-action-primary">
            <PlusCircle size={15} strokeWidth={2} />
            <span>Ajukan Tiket Baru</span>
          </Link>
        )}
      </div>

      {/* Ticket Cards List */}
      {visibleTickets.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon-wrap">
            <Inbox size={28} strokeWidth={1.7} />
          </div>
          <h3 className="empty-title">Belum Ada Tiket Terdaftar</h3>
          <p className="empty-text">
            Anda belum memiliki riwayat pengajuan kendala. Silakan buat laporan kendala pertama Anda.
          </p>
          {!isAdmin && (
            <Link to="/create-ticket" className="btn-action-primary" style={{ marginTop: '16px' }}>
              <PlusCircle size={15} strokeWidth={2} />
              <span>Buka Formulir Tiket</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="ticket-cards-list">
          {visibleTickets.map((ticket) => {
            const isNewlyCreated = latestSubmittedTicket && latestSubmittedTicket.id === ticket.id;

            return (
              <article
                key={ticket.id}
                className={`ticket-record-card ${isNewlyCreated ? 'record-new-highlight' : ''}`}
                aria-labelledby={`ticket-title-${ticket.id}`}
              >
                {/* Header Metadata */}
                <div className="record-header">
                  <div className="record-id-group">
                    <code className="record-id">{ticket.id}</code>
                    {isNewlyCreated && (
                      <span className="tag-new-entry">BARU DITAMBAHKAN</span>
                    )}
                    <span className="record-timestamp">
                      <Calendar size={12} strokeWidth={2} />
                      <span>{ticket.createdAt}</span>
                    </span>
                  </div>

                  <div className="record-badges">
                    <span className={`badge-priority priority-${ticket.priority.toLowerCase()}`}>
                      URGENSI: {ticket.priority}
                    </span>
                    <span className={`badge-status status-${ticket.status.toLowerCase().replace('_', '-')}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>

                {/* Title & Category */}
                <h2 id={`ticket-title-${ticket.id}`} className="record-title">
                  {ticket.title}
                </h2>

                <div className="record-info-row">
                  <span className="record-category">
                    <Tag size={12} strokeWidth={2} />
                    <span>{ticket.category}</span>
                  </span>
                  <span className="record-author">
                    <UserIcon size={12} strokeWidth={2} />
                    <span>Pelapor: <strong>{ticket.authorName}</strong> ({ticket.authorUsername})</span>
                  </span>
                </div>

                {/* Description Body */}
                <div className="record-desc-box">
                  <p className="record-desc-text">{ticket.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
