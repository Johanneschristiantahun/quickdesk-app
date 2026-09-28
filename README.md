# QuickDesk — Internal IT Support & Helpdesk Portal
> **Proyek Ujian Tengah Semester (UTS) Week 7**  
> Mata Kuliah: **Web & Mobile Application Development** (Tahun Akademik 2026)  
> **Kelompok 12**

---

## 👥 Anggota Kelompok 12
1. **Johannes Christian Tahun** (No. 25)
2. **Aldrich Taqi Marvel** (No. 5)
3. **Darren Christian Rapang** (No. 11)
4. **Ivan Pratama** (No. 21)

---

## 📌 Deskripsi & Cakupan Proyek

### Apa yang Dilakukan oleh Aplikasi Ini (*What the app does*):
* **Autentikasi Berbasis Peran (*Role-Based Authentication*)**: Mendukung minimal 2 peran dengan hak akses berbeda:
  * `IT Admin`: Mengelola seluruh tiket masuk dari berbagai unit/gedung kampus, melihat metrik global, dan memperbarui status penanganan (*Open*, *In Progress*, *Resolved*).
  * `Employee / User`: Mengajukan tiket kendala teknis baru, melihat status tiket pribadi, dan meninjau bukti pengajuan tiket.
* **Formulir Pengajuan Terkendali (*Controlled Form*)**:
  * Input Judul Kendala, Kategori (Hardware, Software, Network, Akun), Tingkat Urgensi (Low, Medium, High), dan Rincian Deskripsi Masalah.
  * Validasi komprehensif di sisi klien dengan pesan error spesifik berwarna merah.
  * Mencegah reload halaman browser melalui `e.preventDefault()`.
* **State Lifting & Manajemen Data Terpusat (*Form Output*)**:
  * Tiket yang baru saja di-submit langsung bertambah ke daftar tiket dan otomatis tersimpan di state induk (`TicketContext`).
  * Sesi login dan data tiket tersimpan secara persisten menggunakan `localStorage` API bridge (*Bonus Feature +5 Poin*).
* **Navigasi Dinamis & Proteksi Rute (*Protected Routes*)**:
  * Menggunakan `react-router-dom` dengan `HashRouter` untuk menjamin **tidak ada error 404 saat F5 / Refresh di GitHub Pages**.
  * Halaman dalam (`/dashboard`, `/create-ticket`, `/my-tickets`) tidak dapat dibuka oleh tamu yang belum login.
  * Menu navigasi menyesuaikan role pengguna sesuai Matriks Hak Akses (*Permission Matrix*).
  * Rute penanganan 404 (*Not Found*) jika pengguna memasukkan URL yang tidak terdaftar.
* **Tampilan Responsif & Semantik**:
  * Menggunakan tag semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<table>`, `<footer>`).
  * Tata letak berbasis Flexbox dan CSS Grid yang adaptif dari layar smartphone (~375px) hingga layar desktop.

### Apa yang Tidak Dilakukan oleh Aplikasi Ini (*What the app does not do*):
* Aplikasi ini tidak menggunakan database cloud eksternal (seperti MongoDB, Firebase, atau MySQL backend). Seluruh data dikelola secara lokal pada memori React dan disinkronisasi melalui `localStorage` (*sesuai panduan dosen: data hardcoded/mock data*).
* Aplikasi ini tidak memiliki fitur pembayaran atau gateway finansial karena difokuskan murni untuk operasional internal helpdesk kampus.

---

## 🔑 Akun Demo Hardcoded (Untuk Pengujian & Presentasi)

| Username | Password | Role / Peran | Nama Pengguna | Hak Akses Utama |
| :--- | :--- | :--- | :--- | :--- |
| **`admin`** | `admin123` | **`admin`** (IT Admin) | Budi Santoso, S.Kom | Melihat seluruh tiket kampus, mengubah status pengerjaan tiket |
| **`user`** | `user123` | **`user`** (Mahasiswa) | Johannes Christian Tahun | Mengajukan tiket baru, melihat riwayat tiket miliknya |
| **`aldrich`** | `user123` | **`user`** (Mahasiswa) | Aldrich Taqi Marvel | Mengajukan tiket baru, melihat riwayat tiket miliknya |

---

## 🛠️ Arsitektur & Struktur Folder Komponen
Sesuai kriteria Rubrik C1 (React component structure & modularity):

```
quickdesk-app/
├── index.html                   # Entry point HTML dengan meta responsif & judul
├── vite.config.js               # Konfigurasi Vite dengan base: './' untuk GitHub Pages
├── package.json                 # Konfigurasi dependensi (React, React-Router-DOM)
├── src/
│   ├── main.jsx                 # Mount aplikasi React DOM
│   ├── App.jsx                  # HashRouter, Route, dan ProtectedRoute
│   ├── index.css                # CSS Reset & Google Fonts
│   ├── data/
│   │   └── mockData.js          # Sumber data tunggal terpusat (Akun, Tiket, Kategori)
│   ├── context/
│   │   ├── AuthContext.jsx      # Manajemen sesi login & role pengguna
│   │   └── TicketContext.jsx    # Manajemen state tiket terpusat (State Lifting)
│   ├── components/
│   │   ├── Navbar.jsx           # Semantic header/nav & menu per role
│   │   ├── StatCard.jsx         # Komponen metrik ringkasan reusable (Props)
│   │   ├── TicketTable.jsx      # Komponen tabel tiket (map, keys, empty state)
│   │   ├── ProtectedRoute.jsx   # Pembungkus otorisasi rute
│   │   └── Footer.jsx           # Semantic footer identitas kelompok
│   ├── pages/
│   │   ├── LoginPage.jsx        # Halaman Login (Kriteria B1)
│   │   ├── DashboardPage.jsx    # Halaman Dashboard (Kriteria B3)
│   │   ├── CreateTicketPage.jsx # Halaman Formulir Input (Kriteria B4)
│   │   ├── MyTicketsPage.jsx    # Halaman Form Output (Kriteria B5)
│   │   └── NotFoundPage.jsx     # Halaman 404 Not Found (Kriteria B2)
│   └── styles/
│       ├── App.css              # Tata letak aplikasi & footer
│       ├── Navbar.css           # Gaya navigasi responsif
│       ├── Dashboard.css        # Tata letak grid metrik & tabel data
│       └── Form.css             # Gaya formulir, input fokus, & error
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone <URL_REPO_GITHUB_KELOMPOK_12>
   cd quickdesk-app
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser pada alamat yang tertera di terminal (biasanya `http://localhost:5173/`).

4. **Build untuk deployment:**
   ```bash
   npm run build
   ```
   Hasil build siap saji tersimpan pada folder `dist/`.

---

## 🌐 Deployment (GitHub Pages)
Proyek ini dikonfigurasi untuk berjalan di **GitHub Pages** menggunakan `HashRouter`:
* URL tidak akan mengembalikan pesan 404 saat halaman di-refresh (*F5 Safe*).
* Nilai `base: './'` pada `vite.config.js` menjamin seluruh file aset CSS dan JS termuat dengan path relatif yang valid.
