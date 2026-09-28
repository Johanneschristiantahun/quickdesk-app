# PANDUAN PRESENTASI & CONTEKAN BEDAH KODE (E1 & E2)
> **Khusus untuk Kelompok 12: Ujian Tengah Semester (UTS) Week 7**  
> **Mata Kuliah: Web & Mobile Application Development (2026)**  
> **Aplikasi: QuickDesk (IT Support & Helpdesk Portal)**

---

## 🎯 BAGIAN 1: PEMBAGIAN TUGAS PRESENTASI TIM (Kriteria E1 - 5 Poin)
> **Syarat Mutlak Rubrik E1:**
> - Alur harus berurutan: *Problem ➔ Actors & Use Cases ➔ Activity Diagram ➔ UI ➔ Live Demo*.
> - **Semua anggota kelompok wajib berbicara** (*every member speaks*).
> - Presentasi tepat waktu (*on time*).

### Pembagian Peran Bicara (Durasi Total: ± 10–12 Menit)

#### 🗣️ Pembicara 1: Johannes Christian Tahun (No. 25) — 2.5 Menit
* **Topik**: Pembukaan, Latar Belakang Masalah (*Problem Statement*), dan Tujuan (*Goal*).
* **Naskah Singkat**:
  > *"Selamat pagi/siang Bapak Dosen dan rekan-rekan sekalian. Kami dari Kelompok 12 hari ini akan mempresentasikan proyek QuickDesk, yaitu portal internal pelaporan kendala IT kampus. Latar belakang kami mengangkat topik ini adalah karena pelaporan kendala IT di kampus sering kali tercecer jika hanya disampaikan lewat WhatsApp atau lisan. Akibatnya, mahasiswa tidak tahu status kendalanya dan tim IT kesulitan melacak antrean harian. Solusinya, kami membangun aplikasi web SPA berbasis React ini agar seluruh laporan tercatat rapi, terpusat, dan transparan."*

#### 🗣️ Pembicara 2: Aldrich Taqi Marvel (No. 5) — 2.5 Menit
* **Topik**: Aktor Sistem, Matriks Hak Akses (*Permission Matrix*), dan Use Case Diagram.
* **Naskah Singkat**:
  > *"Sistem QuickDesk memiliki 2 aktor utama dengan batasan akses yang jelas: Aktor pertama adalah Mahasiswa atau User yang bertujuan melaporkan kendala dan melihat riwayat tiket miliknya. Aktor kedua adalah IT Admin yang bertugas memantau seluruh metrik tiket kampus dan memperbarui status pengerjaan tiket. Hak akses ini kami tuangkan ke dalam Matriks Hak Akses dan Use Case Diagram yang terdiri dari 6 use case berbasis tugas operasional, bukan sekadar nama halaman web."*

#### 🗣️ Pembicara 3: Darren Christian Rapang (No. 11) — 2.5 Menit
* **Topik**: Dokumen Use Case Tertulis Formulir dan Activity Diagram.
* **Naskah Singkat**:
  > *"Pada use case utama kami, yaitu UC-03 Mengajukan Tiket Baru, kami merancang skenario sukses di mana user mengisi field formulir lalu sistem memvalidasi dan menyimpannya. Kami juga menyusun Alternative Flow untuk menangani jika ada field yang kosong atau kurang karakter. Alur ini divisualisasikan pada Activity Diagram kami, yang lengkap dengan percabangan 'Gagal Login' dan percabangan 'Gagal Validasi Formulir' menggunakan event preventDefault."*

#### 🗣️ Pembicara 4: Ivan Pratama (No. 21) — 2.5 Menit
* **Topik**: Desain UI (4 Prinsip), Arsitektur Komponen React, dan Deployment GitHub Pages.
* **Naskah Singkat**:
  > *"Desain antarmuka QuickDesk dirancang dengan mematuhi 4 prinsip desain: Visual Hierarchy, Spacing 8px, Konsistensi komponen, dan Kontras warna status badge. Dari segi kode, kami membagi proyek ke dalam folder modular: pages, components, data, dan context. Data disimpan terpusat di mockData.js. Aplikasi telah kami deploy di GitHub Pages menggunakan HashRouter dan Vite base relatif sehingga aman dari error 404 saat halaman di-refresh."*

---

### 🖥️ ALUR LIVE DEMO APLIKASI (Dipandu Bersama)

1. **Demo 1: Percobaan Gagal Login**
   - Ketik username sembarangan (misal: `hacker`) dan password salah ➔ Klik Masuk.
   - **Tunjukkan ke Dosen**: Muncul pesan error merah *"Username atau password salah!"*.
2. **Demo 2: Login sebagai Mahasiswa / User**
   - Klik tombol demo: `user` / `user123` ➔ Masuk ke Dashboard.
   - **Tunjukkan ke Dosen**: Menu di Navbar hanya menampilkan `Dashboard`, `+ Buat Tiket Baru`, dan `Tiket Saya`. Metrik dan tabel hanya menampilkan tiket milik akun Johannes.
3. **Demo 3: Form Input & Validasi Error**
   - Buka menu `+ Buat Tiket Baru`.
   - Langsung klik tombol "Kirim Laporan Tiket" dalam keadaan kosong!
   - **Tunjukkan ke Dosen**: Halaman TIDAK reload (karena `e.preventDefault()`), dan muncul teks error merah di bawah setiap field yang kosong.
4. **Demo 4: Submit Berhasil & Form Output (State Lifting)**
   - Isi form: Judul *"Mouse PC 03 Rusak Klik Kiri"*, Kategori *"Hardware"*, Prioritas *"High"*, Deskripsi *"Klik kiri mouse tidak berfungsi saat praktikum"*.
   - Klik "Kirim Laporan Tiket".
   - **Tunjukkan ke Dosen**: Aplikasi langsung berpindah ke halaman **Form Output (Riwayat Tiket)** dengan banner hijau sukses, dan tiket baru muncul di posisi paling atas lengkap dengan badge "Baru Ditambahkan"!
5. **Demo 5: Logout & Login sebagai IT Admin**
   - Klik tombol **Logout** di pojok kanan atas.
   - Login dengan akun `admin` / `admin123`.
   - **Tunjukkan ke Dosen**: Menu `+ Buat Tiket Baru` hilang (sesuai matriks izin). Dashboard menampilkan seluruh tiket kampus, dan Admin bisa mengubah status tiket dari *Open* menjadi *In Progress* atau *Resolved* secara live!
6. **Demo 6: Proteksi URL & 404**
   - Coba ketik URL ngawur di browser: `/#/halaman-ngawur` ➔ Muncul halaman **404 Not Found**.
   - Logout lalu coba akses langsung `/#/dashboard` ➔ Otomatis terlempar kembali ke `/login` (*Protected Route*).

---

## 🔍 BAGIAN 2: CONTEKAN BEDAH KODE INDIVIDU (Kriteria E2 - 10 Poin)
> **Syarat Mutlak Rubrik E2:**
> Dosen akan menunjuk baris kode secara acak ke masing-masing mahasiswa dan bertanya. Kamu harus bisa menjelaskan fungsi baris tersebut dan siap melakukan modifikasi kecil (*small live change*).

Berikut adalah daftar pertanyaan favorit dosen beserta contekan jawaban logisnya:

---

### 1. Pertanyaan: `useState` (State Lokal Komponen)
* **Letak File**: `src/pages/CreateTicketPage.jsx`
* **Baris Kode**:
  ```javascript
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    description: ''
  });
  ```
* **Pertanyaan Dosen**: *"Apa fungsi baris `useState` di atas, dan kenapa bentuknya objek?"*
* **Jawaban Kamu**:
  > *"Hook `useState` ini digunakan untuk menyimpan state reaktif data input formulir di memori komponen. Kami menggunakan bentuk objek agar seluruh field (judul, kategori, prioritas, dan deskripsi) dapat dikelola secara terpadu dalam satu state menggunakan controlled input pattern."*
* **Tantangan Live-Change**: *"Coba ubah default prioritasnya jadi 'Low'!"*
  * **Solusi**: Ubah saja `priority: 'Medium'` menjadi `priority: 'Low'`. Simpan file (`Ctrl + S`), lalu tunjukkan di browser dropdown prioritas langsung default ke Low!

---

### 2. Pertanyaan: `e.preventDefault()` (Event Handler)
* **Letak File**: `src/pages/CreateTicketPage.jsx`
* **Baris Kode**:
  ```javascript
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    ...
  };
  ```
* **Pertanyaan Dosen**: *"Kenapa harus ada `e.preventDefault()` pada `onSubmit`?"*
* **Jawaban Kamu**:
  > *"Di browser biasa, perilaku default dari tag `<form>` saat di-submit adalah mengirim request HTTP dan me-reload seluruh halaman. Di aplikasi React berbasis SPA (Single Page Application), kita memanggil `e.preventDefault()` untuk membatalkan reload tersebut, sehingga proses validasi dan penyimpanan state dapat berjalan mulus tanpa kehilangan data di memori."*

---

### 3. Pertanyaan: Looping `.map()` dan Atribut `key`
* **Letak File**: `src/components/TicketTable.jsx`
* **Baris Kode**:
  ```javascript
  {filteredTickets.map((ticket) => (
    <tr key={ticket.id} className="ticket-row">
      ...
    </tr>
  ))}
  ```
* **Pertanyaan Dosen**: *"Kenapa di dalam `.map()` harus ada atribut `key={ticket.id}`? Apa yang terjadi kalau dihapus?"*
* **Jawaban Kamu**:
  > *"React menggunakan atribut `key` unik untuk mengidentifikasi setiap elemen dalam daftar di Virtual DOM. Dengan adanya `key`, React dapat mendeteksi elemen mana yang bertambah, berubah, atau dihapus secara efisien tanpa harus merender ulang seluruh tabel. Jika dihapus, React akan memberikan peringatan warning di console dan performa rendering saat data berubah akan menurun."*
* **Tantangan Live-Change**: *"Coba ubah tampilan ID tiket jadi huruf kapital semua atau tambah tanda kurung!"*
  * **Solusi**: Di dalam `<td>`, ubah `{ticket.id}` menjadi `[{ticket.id}]`.

---

### 4. Pertanyaan: `props` & *Lifting State Up* (Kriteria B5 & C1)
* **Letak File**: `src/context/TicketContext.jsx` & `src/pages/DashboardPage.jsx`
* **Pertanyaan Dosen**: *"Bagaimana data tiket dari formulir bisa muncul di halaman Dashboard dan Riwayat Tiket tanpa database?"*
* **Jawaban Kamu**:
  > *"Kami menerapkan konsep **Lifting State Up** menggunakan React Context (`TicketContext`). State daftar tiket diletakkan di level atas (Provider). Saat formulir di `CreateTicketPage` di-submit, ia memanggil fungsi `addTicket()` yang disediakan oleh Context. Fungsi tersebut menambahkan tiket baru ke array state induk, sehingga halaman lain seperti `DashboardPage` dan `MyTicketsPage` yang mengonsumsi context tersebut otomatis menerima data terbaru."*

---

### 5. Pertanyaan: Proteksi Navigasi & React Router (Kriteria B2)
* **Letak File**: `src/components/ProtectedRoute.jsx` & `src/App.jsx`
* **Baris Kode**:
  ```javascript
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  ```
* **Pertanyaan Dosen**: *"Bagaimana cara sistem mengunci halaman dalam agar tidak bisa dibuka oleh user yang belum login?"*
* **Jawaban Kamu**:
  > *"Kami membuat komponen pembungkus bernama `ProtectedRoute`. Komponen ini memeriksa state `isAuthenticated` dari `AuthContext`. Jika nilainya false (belum login), komponen langsung mereturn `<Navigate to='/login' />` untuk me-redirect browser kembali ke halaman login. Hanya jika `isAuthenticated` bernilai true, komponen akan merender halaman aslinya (`children`)."*

---

### 6. Pertanyaan: Deployment & `HashRouter` (Kriteria D2)
* **Letak File**: `src/App.jsx` & `vite.config.js`
* **Pertanyaan Dosen**: *"Kenapa kalian memakai `HashRouter`, bukan `BrowserRouter`?"*
* **Jawaban Kamu**:
  > *"Karena kami men-deploy aplikasi ke **GitHub Pages**, yang merupakan server statis. Jika menggunakan `BrowserRouter`, saat halaman di-refresh (misalnya `/dashboard`), server GitHub Pages akan mencari file fisik `dashboard.html` yang tidak ada, sehingga menghasilkan error 404. Dengan `HashRouter`, navigasi menggunakan hash (misalnya `/#/dashboard`), di mana routing sepenuhnya ditangani di sisi klien oleh browser tanpa request baru ke server, sehingga di-refresh ribuan kali pun tidak akan pernah 404."*

---

## 🏆 KESIMPULAN PERSIAPAN PRESENTASI:
1. Jalankan web lokal dengan: `npm run dev` di folder `quickdesk-app`.
2. Buka tab presentasi: Siapkan dokumen Google Docs hasil Bagian A.
3. Kuasai 6 poin contekan bedah kode di atas.
4. Kamu dan tim Kelompok 12 sudah siap 100% meraih nilai **A / 100 + 5 Poin Bonus**!
