import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '90px 20px', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#475569', marginBottom: '16px' }}>
        <AlertTriangle size={32} strokeWidth={1.8} />
      </div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
        404 — Halaman Tidak Ditemukan
      </h1>
      <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.5, marginBottom: '22px' }}>
        Alamat URL yang Anda tuju tidak terdaftar pada rute sistem QuickDesk atau telah dipindahkan.
      </p>
      <Link
        to="/dashboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '13px',
          border: '1px solid #0f172a'
        }}
      >
        <ArrowLeft size={14} />
        <span>Kembali ke Dashboard</span>
      </Link>
    </div>
  );
}
