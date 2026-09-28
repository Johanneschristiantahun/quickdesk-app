import React from 'react';

/**
 * Reusable Metric StatCard Component
 * Enterprise design: High data density, crisp typography, clean SVG monochrome icon.
 */
export default function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-card-inner">
        <div className="stat-card-header">
          <span className="stat-title">{title}</span>
          <div className="stat-icon-wrapper" aria-hidden="true">
            {icon}
          </div>
        </div>
        <div className="stat-value-row">
          <span className="stat-value">{value}</span>
        </div>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}
