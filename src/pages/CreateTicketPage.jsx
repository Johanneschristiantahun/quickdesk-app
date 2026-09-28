import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '../data/mockData';
import { FilePlus, AlertCircle, ChevronRight, Check } from 'lucide-react';
import '../styles/Form.css';

export default function CreateTicketPage() {
  const { currentUser } = useAuth();
  const { addTicket } = useTickets();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'MEDIUM',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul kendala wajib diisi.';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Judul terlalu pendek (minimal 5 karakter).';
    }

    if (!formData.category) {
      newErrors.category = 'Silakan tentukan kategori kendala.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Silakan tentukan tingkat urgensi.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi teknis kendala wajib diisi.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter untuk kejelasan teknisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const createdTicket = addTicket(formData, currentUser);
      setIsSubmitting(false);

      navigate('/my-tickets', {
        state: {
          successMessage: `Tiket ${createdTicket.id} berhasil dicatat dalam antrean penanganan sistem.`
        }
      });
    }, 250);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      priority: 'MEDIUM',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="form-page-container">
      {/* Semantic Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <ChevronRight size={13} className="breadcrumb-divider" />
        <span className="breadcrumb-current">Pengajuan Tiket</span>
      </nav>

      <div className="form-card-container">
        <div className="form-card-header">
          <div className="form-header-title-row">
            <div className="form-icon-badge">
              <FilePlus size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="form-heading">Formulir Pengajuan Tiket Kendala</h1>
              <p className="form-subheading">
                Lengkapi rincian kendala teknis berikut dengan jelas untuk proses tindak lanjut oleh tim operasional IT.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ticket-form" noValidate>
          {/* Field 1: Judul Kendala */}
          <div className={`form-field ${errors.title ? 'field-error' : ''}`}>
            <label htmlFor="ticket-title" className="field-label">
              Judul Kendala Masalah <span className="mark-required">*</span>
            </label>
            <input
              id="ticket-title"
              name="title"
              type="text"
              className="field-input"
              placeholder="Contoh: Workstation PC 04 Mengalami Layar Bergaris"
              value={formData.title}
              onChange={handleChange}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'error-title' : undefined}
            />
            {errors.title && (
              <span id="error-title" className="error-message">
                <AlertCircle size={13} strokeWidth={2} />
                <span>{errors.title}</span>
              </span>
            )}
          </div>

          <div className="form-two-columns">
            {/* Field 2: Kategori */}
            <div className={`form-field ${errors.category ? 'field-error' : ''}`}>
              <label htmlFor="ticket-category" className="field-label">
                Kategori Masalah <span className="mark-required">*</span>
              </label>
              <select
                id="ticket-category"
                name="category"
                className="field-select"
                value={formData.category}
                onChange={handleChange}
                aria-invalid={!!errors.category}
              >
                <option value="">-- Pilih Kategori --</option>
                {TICKET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-message">
                  <AlertCircle size={13} strokeWidth={2} />
                  <span>{errors.category}</span>
                </span>
              )}
            </div>

            {/* Field 3: Urgensi */}
            <div className={`form-field ${errors.priority ? 'field-error' : ''}`}>
              <label htmlFor="ticket-priority" className="field-label">
                Tingkat Urgensi <span className="mark-required">*</span>
              </label>
              <select
                id="ticket-priority"
                name="priority"
                className="field-select"
                value={formData.priority}
                onChange={handleChange}
              >
                {TICKET_PRIORITIES.map((prio) => (
                  <option key={prio} value={prio}>
                    {prio} {prio === 'HIGH' ? '(Kritis / Menghentikan Operasional)' : prio === 'LOW' ? '(Bisa Dijadwalkan)' : '(Standar Operasional)'}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <span className="error-message">
                  <AlertCircle size={13} strokeWidth={2} />
                  <span>{errors.priority}</span>
                </span>
              )}
            </div>
          </div>

          {/* Field 4: Deskripsi Teknis */}
          <div className={`form-field ${errors.description ? 'field-error' : ''}`}>
            <label htmlFor="ticket-description" className="field-label">
              Rincian Deskripsi Masalah &amp; Lokasi <span className="mark-required">*</span>
            </label>
            <textarea
              id="ticket-description"
              name="description"
              rows={4}
              className="field-textarea"
              placeholder="Deskripsikan ruangan/gedung, kode perangkat, serta langkah percobaan pemecahan masalah yang telah dilakukan..."
              value={formData.description}
              onChange={handleChange}
              aria-invalid={!!errors.description}
            />
            {errors.description ? (
              <span className="error-message">
                <AlertCircle size={13} strokeWidth={2} />
                <span>{errors.description}</span>
              </span>
            ) : (
              <span className="field-helper">
                Panjang karakter: {formData.description.trim().length} (Minimal 10 karakter)
              </span>
            )}
          </div>

          {/* Action Button Row */}
          <div className="form-action-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit-action"
            >
              <Check size={15} strokeWidth={2.2} />
              <span>{isSubmitting ? 'Merekam Tiket...' : 'Simpan & Ajukan Tiket'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary-action"
            >
              Reset Isian
            </button>

            <Link to="/dashboard" className="btn-cancel-action">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
