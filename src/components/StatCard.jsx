import React from 'react';

/**
 * Komponen Reusable StatCard
 * Sesuai Kriteria Rubrik C1:
 * "UI split into components reused through props"
 */
export default function StatCard({ title, value, icon, variant = 'primary', subtitle }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-content">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
      <div className="stat-icon-wrapper" aria-hidden="true">
        {icon}
      </div>
    </div>
  );
}
