/**
 * src/data/mockData.js
 * Mock data untuk sistem QuickDesk IT Helpdesk.
 */

export const MOCK_USERS = [
  {
    id: 'usr_admin',
    username: 'admin',
    password: 'admin123',
    name: 'Budi Santoso',
    role: 'admin',
    department: 'IT Infrastructure & Operations',
    email: 'budi.santoso@campus.ac.id'
  },
  {
    id: 'usr_user_1',
    username: 'user',
    password: 'user123',
    name: 'Johannes Christian Tahun',
    role: 'user',
    department: 'Computer Science',
    email: 'johannes.tahun@student.campus.ac.id'
  },
  {
    id: 'usr_user_2',
    username: 'aldrich',
    password: 'user123',
    name: 'Aldrich Taqi Marvel',
    role: 'user',
    department: 'Computer Science',
    email: 'aldrich.marvel@student.campus.ac.id'
  }
];

export const TICKET_CATEGORIES = [
  'Hardware',
  'Software',
  'Network',
  'Access & Account'
];

export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

export const TICKET_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

export const INITIAL_TICKETS = [
  {
    id: 'TCK-101',
    title: 'Koneksi Wi-Fi SSID Campus_Secure Sering Request Timeout',
    category: 'Network',
    priority: 'HIGH',
    status: 'OPEN',
    description: 'Koneksi nirkabel pada Access Point lantai 2 Gedung B mengalami packet loss di atas 45% saat sesi perkuliahan berlangsung.',
    authorUsername: 'user',
    authorName: 'Johannes Christian Tahun',
    createdAt: '2026-09-26 09:30'
  },
  {
    id: 'TCK-102',
    title: 'Proyektor Ruang 304 Mengalami Distorsi Warna Lampu',
    category: 'Hardware',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    description: 'Output proyeksi menghasilkan bias kuning pekat melalui port HDMI maupun VGA. Perlu pengecekan kabel atau penggantian unit lampu proyektor.',
    authorUsername: 'aldrich',
    authorName: 'Aldrich Taqi Marvel',
    createdAt: '2026-09-26 11:15'
  },
  {
    id: 'TCK-103',
    title: 'Kegagalan Sinkronisasi Autentikasi Portal Akademik (HTTP 500)',
    category: 'Access & Account',
    priority: 'HIGH',
    status: 'RESOLVED',
    description: 'Sesi login mahasiswa terputus akibat kendala cache token JWT. Layanan IAM server telah di-restart dan sesi pengguna dipulihkan.',
    authorUsername: 'user',
    authorName: 'Johannes Christian Tahun',
    createdAt: '2026-09-25 14:00'
  },
  {
    id: 'TCK-104',
    title: 'Aktivasi Lisensi MATLAB R2025b di PC Lab Komputasi',
    category: 'Software',
    priority: 'LOW',
    status: 'RESOLVED',
    description: 'Pembaruan file lisensi jaringan tahunan untuk 30 workstation di Lab Sains Data telah berhasil didistribusikan via group policy.',
    authorUsername: 'aldrich',
    authorName: 'Aldrich Taqi Marvel',
    createdAt: '2026-09-24 16:45'
  },
  {
    id: 'TCK-105',
    title: 'Workstation PC 08 Lab 1 Mengalami Kernel Panic saat Boot',
    category: 'Hardware',
    priority: 'HIGH',
    status: 'OPEN',
    description: 'Perangkat PC 08 mengalami freeze saat inisialisasi BIOS. Indikasi kendala pada modul RAM slot 2 atau thermal throttling.',
    authorUsername: 'user',
    authorName: 'Johannes Christian Tahun',
    createdAt: '2026-09-27 08:20'
  }
];
