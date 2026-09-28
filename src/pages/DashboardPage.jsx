import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import StatCard from '../components/StatCard';
import TicketTable from '../components/TicketTable';
import { 
  Layers, 
  Clock, 
  Activity, 
  CheckCircle2, 
  PlusCircle, 
  ShieldCheck, 
  User as UserIcon 
} from 'lucide-react';
import '../styles/Dashboard.css';

export default function DashboardPage() {
  const { currentUser, isAdmin } = useAuth();
  const { tickets, updateTicketStatus } = useTickets();

  // Filter tiket sesuai hak akses (Admin melihat seluruh antrean kampus, User melihat tiket miliknya)
  const visibleTickets = isAdmin
    ? tickets
    : tickets.filter((t) => t.authorUsername === currentUser.username);

  // Perhitungan metrik kuantitatif
  const totalCount = visibleTickets.length;
  const openCount = visibleTickets.filter((t) => t.status === 'OPEN').length;
  const inProgressCount = visibleTickets.filter((t) => t.status === 'IN_PROGRESS').length;
  const resolvedCount = visibleTickets.filter((t) => t.status === 'RESOLVED').length;

  return (
    <div className="dashboard-container">
      {/* Header Halaman */}
      <div className="page-header-block">
        <div className="header-meta">
          <div className="header-badge-row">
            <span className="system-pill">
              {isAdmin ? (
                <>
                  <ShieldCheck size={12} strokeWidth={2.2} />
                  <span>MODE ADMINISTRATOR</span>
                </>
              ) : (
                <>
                  <UserIcon size={12} strokeWidth={2.2} />
                  <span>PORTAL PENGGUNA</span>
                </>
              )}
            </span>
          </div>
          <h1 className="page-heading">
            {isAdmin ? 'Pusat Operasional IT Helpdesk' : 'Dashboard Layanan Kendala IT'}
          </h1>
          <p className="page-subheading">
            {isAdmin
              ? 'Monitoring real-time antrean tiket kendala teknis dan pembaruan alokasi penanganan.'
              : 'Status pemantauan tiket laporan teknis yang Anda ajukan di dalam sistem.'}
          </p>
        </div>

        <div className="header-actions">
          {!isAdmin && (
            <Link to="/create-ticket" className="btn-action-primary">
              <PlusCircle size={15} strokeWidth={2} />
              <span>Ajukan Tiket Baru</span>
            </Link>
          )}
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <section className="metrics-grid" aria-label="Metrik Operasional">
        <StatCard
          title={isAdmin ? 'TOTAL TIKET KAMPUS' : 'TIKET DIAJUKAN'}
          value={totalCount}
          icon={<Layers size={18} strokeWidth={2} />}
          subtitle="Total catatan dalam sistem"
        />
        <StatCard
          title="STATUS OPEN"
          value={openCount}
          icon={<Clock size={18} strokeWidth={2} />}
          subtitle="Menunggu antrean teknisi"
        />
        <StatCard
          title="STATUS IN_PROGRESS"
          value={inProgressCount}
          icon={<Activity size={18} strokeWidth={2} />}
          subtitle="Sedang dalam proses perbaikan"
        />
        <StatCard
          title="STATUS RESOLVED"
          value={resolvedCount}
          icon={<CheckCircle2 size={18} strokeWidth={2} />}
          subtitle="Kendala tuntas diselesaikan"
        />
      </section>

      {/* Structured Operational Table Section */}
      <section className="table-card-section" aria-label="Daftar Antrean Tiket">
        <div className="table-card-header">
          <div>
            <h2 className="table-card-title">
              {isAdmin ? 'Antrean Seluruh Tiket Layanan' : 'Daftar Tiket Kendala Saya'}
            </h2>
            <p className="table-card-desc">
              Menampilkan {visibleTickets.length} rekaman data sesuai otorisasi akun.
            </p>
          </div>
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
