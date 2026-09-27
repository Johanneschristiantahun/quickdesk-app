import React from 'react';

/**
 * Komponen Semantic Footer
 * Sesuai Kriteria Rubrik C2 (Semantic HTML)
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-brand">
            <strong>QuickDesk</strong> — Internal IT Support &amp; Helpdesk Portal
          </p>
          <p className="footer-course">
            Web &amp; Mobile Application Development · Week 7 Midterm Project (2026)
          </p>
        </div>
        <div className="footer-right">
          <p className="footer-team">
            <strong>Kelompok 12:</strong> Johannes Christian Tahun · Aldrich Taqi Marvel · Darren Christian Rapang · Ivan Pratama
          </p>
        </div>
      </div>
    </footer>
  );
}
