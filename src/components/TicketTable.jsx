import React, { useState } from 'react';
import { 
  Search, 
  Inbox, 
  Calendar, 
  Filter, 
  ArrowUpDown, 
  User as UserIcon,
  Tag
} from 'lucide-react';
import { TICKET_CATEGORIES } from '../data/mockData';

export default function TicketTable({ tickets, isAdmin = false, onStatusChange }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tiket multi-kriteria secara fungsional
  const filteredTickets = tickets.filter((ticket) => {
    const matchStatus =
      filterStatus === 'ALL' || ticket.status === filterStatus;
    const matchCategory =
      filterCategory === 'ALL' || ticket.category === filterCategory;
    const matchPriority =
      filterPriority === 'ALL' || ticket.priority === filterPriority;
    const matchQuery =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchCategory && matchPriority && matchQuery;
  });

  return (
    <div className="ticket-table-container">
      {/* Functional Filter Toolbar */}
      <div className="table-toolbar">
        <div className="search-field-wrapper">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Cari ID tiket, judul, deskripsi, atau pelapor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Cari tiket"
          />
        </div>

        <div className="filter-controls-group">
          {/* Filter Status */}
          <div className="select-wrapper">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
              aria-label="Filter Status"
            >
              <option value="ALL">Status: Semua</option>
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          {/* Filter Kategori */}
          <div className="select-wrapper">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
              aria-label="Filter Kategori"
            >
              <option value="ALL">Kategori: Semua</option>
              {TICKET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Prioritas */}
          <div className="select-wrapper">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="filter-select"
              aria-label="Filter Prioritas"
            >
              <option value="ALL">Urgensi: Semua</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Semantic Table or Functional Empty State */}
      {filteredTickets.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon-wrap">
            <Inbox size={28} strokeWidth={1.7} />
          </div>
          <h3 className="empty-title">Tidak Ada Tiket Ditemukan</h3>
          <p className="empty-text">
            {searchQuery || filterStatus !== 'ALL' || filterCategory !== 'ALL' || filterPriority !== 'ALL'
              ? 'Tidak ada tiket yang sesuai dengan parameter filter atau pencarian Anda.'
              : 'Belum ada tiket yang terdaftar dalam antrean sistem.'}
          </p>
        </div>
      ) : (
        <div className="table-scroll-container">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '95px' }}>ID Tiket</th>
                <th scope="col">Rincian Kendala</th>
                <th scope="col" style={{ width: '130px' }}>Kategori</th>
                <th scope="col" style={{ width: '100px' }}>Urgensi</th>
                <th scope="col" style={{ width: '180px' }}>Pelapor</th>
                <th scope="col" style={{ width: '130px' }}>Status</th>
                {isAdmin && <th scope="col" style={{ width: '150px' }}>Alokasi Status</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="data-row">
                  <td className="cell-id">
                    <code className="ticket-id-code">{ticket.id}</code>
                  </td>
                  <td className="cell-details">
                    <span className="row-title">{ticket.title}</span>
                    <p className="row-desc">{ticket.description}</p>
                    <div className="row-meta">
                      <Calendar size={11} strokeWidth={2} />
                      <span>{ticket.createdAt}</span>
                    </div>
                  </td>
                  <td className="cell-category">
                    <span className="category-pill">{ticket.category}</span>
                  </td>
                  <td className="cell-priority">
                    <span className={`badge-priority priority-${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="cell-reporter">
                    <span className="reporter-name">{ticket.authorName}</span>
                    <span className="reporter-dept">ID: {ticket.authorUsername}</span>
                  </td>
                  <td className="cell-status">
                    <span className={`badge-status status-${ticket.status.toLowerCase().replace('_', '-')}`}>
                      {ticket.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="cell-actions">
                      <select
                        value={ticket.status}
                        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                        className="status-action-select"
                        aria-label={`Ubah status ${ticket.id}`}
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
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
