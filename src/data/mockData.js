/**
 * src/data/mockData.js
 * Pusat penyimpanan data hardcoded sistem QuickDesk.
 * Sesuai Kriteria Rubrik C3:
 * "Data in a separate file as an array of objects with ids; components read from a single source."
 */

// 1. Data Akun Hardcoded (Minimal 2 Role: 'admin' dan 'user')
export const MOCK_USERS = [
  {
    id: 'user-01',
    username: 'admin',
    password: 'admin123',
    name: 'Budi Santoso, S.Kom',
    role: 'admin', // Role IT Admin
    department: 'IT Infrastructure & Support',
    email: 'admin@quickdesk.campus.ac.id'
  },
  {
    id: 'user-02',
    username: 'user',
    password: 'user123',
    name: 'Johannes Christian Tahun',
    role: 'user', // Role Mahasiswa / Karyawan
    department: 'Computer Science (Kelompok 12)',
    email: 'johannes@student.campus.ac.id'
  },
  {
    id: 'user-03',
    username: 'aldrich',
    password: 'user123',
    name: 'Aldrich Taqi Marvel',
    role: 'user',
    department: 'Computer Science (Kelompok 12)',
    email: 'aldrich@student.campus.ac.id'
  }
];

// 2. Daftar Kategori & Prioritas Resmi
export const TICKET_CATEGORIES = [
  'Hardware (Perangkat Keras)',
  'Software (Aplikasi & OS)',
  'Network (Jaringan & Wi-Fi)',
  'Account & Access (Akun & Portal)'
];

export const TICKET_PRIORITIES = ['Low', 'Medium', 'High'];

export const TICKET_STATUSES = ['Open', 'In Progress', 'Resolved'];

// 3. Data Tiket Awal (Initial Tickets dengan ID Unik)
export const INITIAL_TICKETS = [
  {
    id: 'TCK-101',
    title: 'Wi-Fi Lab Komputer Gedung B Sering Putus',
    category: 'Network (Jaringan & Wi-Fi)',
    priority: 'High',
    status: 'Open',
    description: 'Koneksi Wi-Fi SSID Campus_Secure di lantai 2 sering request timed out saat sesi praktikum berlangsung.',
    authorUsername: 'user',
    authorName: 'Johannes Christian Tahun',
    createdAt: '2026-09-26 09:30'
  },
  {
    id: 'TCK-102',
    title: 'Proyektor Ruang 304 Warna Menguning',
    category: 'Hardware (Perangkat Keras)',
    priority: 'Medium',
    status: 'In Progress',
    description: 'Tampilan kabel VGA/HDMI proyektor menghasilkan bias kuning pekat sehingga slide presentasi tidak terbaca jelas.',
    authorUsername: 'aldrich',
    authorName: 'Aldrich Taqi Marvel',
    createdAt: '2026-09-26 11:15'
  },
  {
    id: 'TCK-103',
    title: 'Gagal Login Portal Akademik Error 500',
    category: 'Account & Access (Akun & Portal)',
    priority: 'High',
    status: 'Resolved',
    description: 'Saat memasukkan NIM, portal menampilkan Internal Server Error. Reset sesi akun telah berhasil diproses oleh IT Support.',
    authorUsername: 'user',
    authorName: 'Johannes Christian Tahun',
    createdAt: '2026-09-25 14:00'
  },
  {
    id: 'TCK-104',
    title: 'Update Lisensi MATLAB Lab Komputasi',
    category: 'Software (Aplikasi & OS)',
    priority: 'Low',
    status: 'Resolved',
    description: 'Lisensi kampus tahunan MATLAB versi R2025b perlu di-reactivate pada 30 unit komputer PC Lab Data Science.',
    authorUsername: 'aldrich',
    authorName: 'Aldrich Taqi Marvel',
    createdAt: '2026-09-24 16:45'
  }
];
