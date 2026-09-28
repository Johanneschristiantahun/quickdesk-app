import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TICKETS } from '../data/mockData';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('quickdesk_tickets_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stored tickets:', e);
      }
    }
    return INITIAL_TICKETS;
  });

  const [latestSubmittedTicket, setLatestSubmittedTicket] = useState(null);

  useEffect(() => {
    localStorage.setItem('quickdesk_tickets_db', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (formData, currentUser) => {
    const nextNum = 100 + tickets.length + 1;
    const newId = `TCK-${nextNum}`;

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
      priority: formData.priority.toUpperCase(),
      status: 'OPEN',
      description: formData.description.trim(),
      authorUsername: currentUser?.username || 'user',
      authorName: currentUser?.name || 'Johannes Christian Tahun',
      createdAt: dateStr
    };

    setTickets((prev) => [newTicket, ...prev]);
    setLatestSubmittedTicket(newTicket);
    return newTicket;
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus.toUpperCase() } : t))
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicketStatus,
        latestSubmittedTicket,
        setLatestSubmittedTicket
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
}
