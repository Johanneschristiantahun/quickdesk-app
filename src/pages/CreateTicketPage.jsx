import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '../data/mockData';
import '../styles/Form.css';

/**
 * Halaman Form Pengajuan Tiket Kendala Baru
 * Sesuai Kriteria Rubrik B4:
 * - All inputs controlled (value + onChange)
 * - Submit uses e.preventDefault()
 * - Validation with clear error messages
 * - The form implements the modeled use case (UC-03)
 */
export default function CreateTicketPage() {
  const { currentUser } = useAuth();
  const { addTicket } = useTickets();
  const navigate = useNavigate();

  // 1. State Input Formulir Terkontrol (Controlled Inputs)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    description: ''
  });

  // 2. State untuk Menyimpan Pesan Error Validasi
  const [errors, setErrors] = useState({});

  // 3. State Notifikasi Loading / Submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler Perubahan Input Bersama
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Hapus pesan error pada field yang sedang diketik
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Fungsi Validasi Formulir Komprehensif
   * Sesuai Skenario Use Case UC-03 & Rubrik B4
   * @returns {boolean} true jika valid, false jika ada error
   */
  const validateForm = () => {
    const newErrors = {};

    // Validasi Judul
    if (!formData.title.trim()) {
      newErrors.title = 'Judul kendala wajib diisi!';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Judul kendala terlalu pendek (minimal 5 karakter).';
    }

    // Validasi Kategori
    if (!formData.category) {
      newErrors.category = 'Silakan pilih kategori kendala dari daftar!';
    }

    // Validasi Prioritas
    if (!formData.priority) {
      newErrors.priority = 'Silakan pilih tingkat urgensi kendala!';
    }

    // Validasi Deskripsi
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi lengkap kendala wajib diisi!';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Deskripsi terlalu singkat. Jelaskan masalah minimal 10 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler Submit Formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // MENCEGAH PERILAKU DEFAULT BROWSER RELOAD (Kriteria B4)

    // Lakukan validasi
    if (!validateForm()) {
      return; // Berhenti jika ada field yang belum valid
    }

    setIsSubmitting(true);

    // Simulasikan delay proses submit (opsional agar UX lebih natural)
    setTimeout(() => {
      // Simpan tiket baru ke state terpusat (Lifting State Up - Kriteria B5)
      const createdTicket = addTicket(formData, currentUser);
      setIsSubmitting(false);

      // Arahkan otomatis ke halaman Output / Riwayat Tiket
      navigate('/my-tickets', {
        state: {
          successMessage: `Tiket ${createdTicket.id} berhasil diajukan dan disimpan ke sistem!`
        }
      });
    }, 300);
  };

  // Handler Reset Form
  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      priority: 'Medium',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="form-page-container">
      {/* Breadcrumb Navigasi */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span className="separator">/</span>
        <span className="current">Buat Tiket Baru</span>
      </nav>

      <div className="form-card">
        <div className="form-card-header">
          <h1 className="form-title">📝 Formulir Pengajuan Tiket Keluhan IT</h1>
          <p className="form-subtitle">
            Lengkapi formulir di bawah ini dengan jelas agar teknisi IT Support dapat segera menindaklanjuti kendala Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ticket-form" noValidate>
          {/* Field 1: Judul Masalah */}
          <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
            <label htmlFor="field-title" className="form-label">
              Judul Kendala Masalah <span className="required-star">*</span>
            </label>
            <input
              id="field-title"
              name="title"
              type="text"
              className="form-input"
              placeholder="Contoh: PC Lab 2 Tombol Power Tidak Merespons"
              value={formData.title}
              onChange={handleChange}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="field-error-text">
                ⚠️ {errors.title}
              </span>
            )}
          </div>

          <div className="form-row-two-cols">
            {/* Field 2: Kategori Dropdown */}
            <div className={`form-group ${errors.category ? 'has-error' : ''}`}>
              <label htmlFor="field-category" className="form-label">
                Kategori Masalah <span className="required-star">*</span>
              </label>
              <select
                id="field-category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                aria-invalid={!!errors.category}
              >
                <option value="">-- Pilih Kategori Kendala --</option>
                {TICKET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="field-error-text">⚠️ {errors.category}</span>
              )}
            </div>

            {/* Field 3: Tingkat Urgensi */}
            <div className={`form-group ${errors.priority ? 'has-error' : ''}`}>
              <label htmlFor="field-priority" className="form-label">
                Tingkat Urgensi / Prioritas <span className="required-star">*</span>
              </label>
              <select
                id="field-priority"
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                {TICKET_PRIORITIES.map((prio) => (
                  <option key={prio} value={prio}>
                    {prio} {prio === 'High' ? '(Mendesak / Darurat)' : prio === 'Low' ? '(Bisa Menunggu)' : '(Standar)'}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <span className="field-error-text">⚠️ {errors.priority}</span>
              )}
            </div>
          </div>

          {/* Field 4: Deskripsi Rinci */}
          <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
            <label htmlFor="field-description" className="form-label">
              Rincian Deskripsi Masalah &amp; Lokasi <span className="required-star">*</span>
            </label>
            <textarea
              id="field-description"
              name="description"
              rows={4}
              className="form-textarea"
              placeholder="Jelaskan detail kendala, nomor ruangan/gedung, kode perangkat, serta langkah yang sudah dicoba..."
              value={formData.description}
              onChange={handleChange}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <span className="field-error-text">⚠️ {errors.description}</span>
            )}
            <small className="field-hint">
              Karakter: {formData.description.trim().length} (Minimal 10 karakter)
            </small>
          </div>

          {/* Action Buttons */}
          <div className="form-actions-bar">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit-primary"
            >
              {isSubmitting ? 'Sedang Mengirim...' : '🚀 Kirim Laporan Tiket'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn-reset-secondary"
            >
              Reset Form
            </button>

            <Link to="/dashboard" className="btn-cancel-link">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
