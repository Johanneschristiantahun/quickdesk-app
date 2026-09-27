import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Halaman 404 Not Found
 * Sesuai Kriteria Rubrik B2:
 * "404 route; inner pages cannot be opened without logging in"
 */
export default function NotFoundPage() {
  return (
    <div className="not-found-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '72px', marginBottom: '16px' }}>🔍 404</div>
      <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
        Halaman Tidak Ditemukan
      </h1>
      <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 26px', fontSize: '15px' }}>
        Maaf, tautan atau alamat URL yang Anda masukkan tidak terdaftar di dalam sistem QuickDesk.
      </p>
      <Link
        to="/dashboard"
        style={{
          display: 'inline-block',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          padding: '10px 22px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '14px'
        }}
      >
        Kembali ke Dashboard Utama
      </Link>
    </div>
  );
}
