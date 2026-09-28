import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

// Membuat Context untuk Autentikasi Pengguna
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State untuk menyimpan data akun yang sedang login (null jika belum login)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('quickdesk_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // State untuk menyimpan pesan error login
  const [loginError, setLoginError] = useState('');

  // Efek samping untuk sinkronisasi sesi ke localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('quickdesk_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('quickdesk_auth_user');
    }
  }, [currentUser]);

  /**
   * Fungsi Login: Memeriksa kredensial dari MOCK_USERS
   * @param {string} username
   * @param {string} password
   * @returns {boolean} true jika sukses, false jika gagal
   */
  const login = (username, password) => {
    setLoginError(''); // Reset pesan error sebelum cek
    const trimmedUser = username.trim().toLowerCase();
    
    // Cari user di dalam mock data
    const matched = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === trimmedUser && u.password === password
    );

    if (matched) {
      setCurrentUser(matched);
      setLoginError('');
      return true;
    } else {
      setLoginError('Kredensial tidak valid. Silakan periksa kembali username dan kata sandi Anda.');
      return false;
    }
  };

  /**
   * Fungsi Logout: Menghapus sesi akun yang aktif
   */
  const logout = () => {
    setCurrentUser(null);
    setLoginError('');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loginError,
        setLoginError,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook untuk mempermudah akses AuthContext di komponen manapun
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}
