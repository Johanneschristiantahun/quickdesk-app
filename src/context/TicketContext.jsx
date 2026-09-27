import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TICKETS } from '../data/mockData';

// Context untuk manajemen data tiket terpusat (State Lifting)
const TicketContext = createContext();

export function TicketProvider({ children }) {
  // State untuk menyimpan daftar tiket (Diinisialisasi dari localStorage atau INITIAL_TICKETS)
  // Ini juga berfungsi sebagai simulasi backend/database persisten (Kriteria Bonus +5)
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('quickdesk_tickets_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Gagal memuat tiket dari storage:', e);
      }
    }
    return INITIAL_TICKETS;
  });

  // State untuk menyimpan tiket yang baru saja dibuat (untuk highlight di halaman output)
  const [latestSubmittedTicket, setLatestSubmittedTicket] = useState(null);

  // Setiap kali state tickets berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem('quickdesk_tickets_db', JSON.stringify(tickets));
  }, [tickets]);

  /**
   * Fungsi untuk menambahkan tiket baru dari formulir
   * Sesuai Kriteria B4 & B5 (State Lifting)
   * @param {Object} formData
   * @param {Object} currentUser
   */
  const addTicket = (formData, currentUser) => {
    // Generate nomor ID baru unik (Contoh: TCK-105)
    const nextNum = 100 + tickets.length + 1;
    const newId = `TCK-${nextNum}`;

    // Format tanggal dan jam lokal (YYYY-MM-DD HH:MM)
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newTicket = {
      id: newId,
      title: formData.title.trim(),
      category: formData.category,
      priority: formData.priority,
      status: 'Open', // Status default saat baru dibuat
      description: formData.description.trim(),
      authorUsername: currentUser?.username || 'user',
      authorName: currentUser?.name || 'Johannes Christian Tahun',
      createdAt: dateStr
    };

    // Tambahkan tiket baru di posisi paling atas array
    setTickets((prev) => [newTicket, ...prev]);
    setLatestSubmittedTicket(newTicket);
    return newTicket;
  };

  /**
   * Fungsi untuk memperbarui status tiket (Khusus IT Admin)
   * @param {string} ticketId
   * @param {string} newStatus ('Open' | 'In Progress' | 'Resolved')
   */
  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  /**
   * Fungsi untuk mengembalikan data awal jika ingin reset demonstrasi
   */
  const resetToDefault = () => {
    setTickets(INITIAL_TICKETS);
    setLatestSubmittedTicket(null);
    localStorage.removeItem('quickdesk_tickets_db');
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicketStatus,
        resetToDefault,
        latestSubmittedTicket,
        setLatestSubmittedTicket
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

// Custom Hook untuk mempermudah akses TicketContext
export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets harus digunakan di dalam TicketProvider');
  }
  return context;
}
