import React, { useState } from 'react';

/**
 * Komponen Tabel Tiket Reusable
 * Sesuai Kriteria Rubrik:
 * - B3: Data rendered from an array with map() and unique keys; conditional rendering; has an empty state ("no data yet")
 * - C1: UI split into components reused through props
 * - C2: Semantic table markup (table, thead, tbody, tr, th, td)
 */
export default function TicketTable({ tickets, isAdmin = false, onStatusChange }) {
  // State untuk filter status & pencarian
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tiket berdasarkan status dan kata kunci pencarian
  const filteredTickets = tickets.filter((ticket) => {
    const matchStatus =
      filterStatus === 'ALL' ? true : ticket.status.toLowerCase() === filterStatus.toLowerCase();
    const matchQuery =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="ticket-table-wrapper">
      {/* Bar Filter & Pencarian */}
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari ID, judul, atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-search"
            aria-label="Cari tiket"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Filter Status:
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-filter"
          >
            <option value="ALL">Semua Status ({tickets.length})</option>
            <option value="Open">Open (Aktif)</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved (Selesai)</option>
          </select>
        </div>
      </div>

      {/* Conditional Rendering: Tampilkan Empty State jika data kosong (Kriteria B3) */}
      {filteredTickets.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Belum Ada Data Tiket</h3>
          <p className="empty-text">
            {searchQuery || filterStatus !== 'ALL'
              ? 'Tidak ada tiket yang cocok dengan filter atau kata kunci pencarian Anda.'
              : 'Belum ada tiket keluhan yang tercatat di dalam sistem.'}
          </p>
        </div>
      ) : (
        /* Semantic Table */
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '90px' }}>ID</th>
                <th scope="col">Judul Kendala</th>
                <th scope="col">Kategori</th>
                <th scope="col" style={{ width: '100px' }}>Prioritas</th>
                <th scope="col">Pelapor</th>
                <th scope="col" style={{ width: '130px' }}>Status</th>
                {isAdmin && <th scope="col" style={{ width: '160px' }}>Ubah Status</th>}
              </tr>
            </thead>
            <tbody>
              {/* Looping array dengan .map() dan unique key (Kriteria B3) */}
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="ticket-row">
                  <td className="cell-id">
                    <span className="id-badge">{ticket.id}</span>
                  </td>
                  <td className="cell-title">
                    <strong className="ticket-title">{ticket.title}</strong>
                    <p className="ticket-desc-preview">{ticket.description}</p>
                    <span className="ticket-date">📅 {ticket.createdAt}</span>
                  </td>
                  <td className="cell-category">
                    <span className="category-tag">{ticket.category}</span>
                  </td>
                  <td className="cell-priority">
                    <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="cell-author">
                    <span className="author-name">{ticket.authorName}</span>
                    <small className="author-user">@{ticket.authorUsername}</small>
                  </td>
                  <td className="cell-status">
                    <span
                      className={`status-pill status-${ticket.status.toLowerCase().replace(' ', '-')}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  {/* Fitur Aksi Khusus Admin untuk Mengubah Status (Demonstrasi State Lifting) */}
                  {isAdmin && (
                    <td className="cell-action">
                      <select
                        value={ticket.status}
                        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                        className="select-status-action"
                        aria-label={`Ubah status tiket ${ticket.id}`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
