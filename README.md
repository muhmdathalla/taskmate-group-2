# TaskMate — Kelompok 2 (Divisi Front End ITC 2026/2027)

> **"Catat tugas. Tetapkan tenggat. Pantau selesai."**  
> Aplikasi Web Satu Halaman (Single-Page Application / SPA) untuk mencatat dan memantau tugas kuliah harian secara cepat, rapi, dan responsif dengan penyimpanan lokal (*localStorage*).

---

## 👥 Informasi Tim & Pembagian Tugas (Kelompok 2)

Proyek ini dikerjakan oleh **Kelompok 2** yang terdiri dari 3 anggota:

| No | Nama Anggota | Peran Utama | Fokus Tanggung Jawab & Modul |
|---|---|---|---|
| 1 | **Muhammad Athalla** | **Core State / Integrasi** | • Inisialisasi arsitektur proyek (Vite + React)<br>• Manajemen *Global State* di `App.jsx`<br>• Logika sinkronisasi & *persistence* `localStorage`<br>• Komponen Ringkasan (*Summary Dashboard*) statistik tugas<br>• Integrasi antarkomponen & *Responsive Layout Shell* |
| 2 | **Ridho Satrio** | **Form & Input Handler Specialist** | • Komponen `TaskForm.jsx`<br>• Alur tambah tugas baru (*Create*) & mode edit tugas (*Update*)<br>• Validasi ketat (judul, matkul, tenggat wajib, penanganan input spasi kosong)<br>• Fitur pembatalan edit (*Cancel edit*) & reset form<br>• Pengujian alur input formulir |
| 3 | **Rifani Juniarti** | **List, Card & Interaction Specialist** | • Komponen `TaskList.jsx` dan `TaskItem.jsx`<br>• Komponen filter & pencarian (`FilterBar.jsx`)<br>• Interaktivitas tugas: toggle status (Belum Selesai / Selesai)<br>• Modal / dialog konfirmasi hapus tugas (*Delete*)<br>• *Empty State UI* (petunjuk saat daftar tugas kosong/tidak ditemukan) |

---

## 🎯 Konsep & Gambaran Proyek

**TaskMate** adalah platform manajemen tugas akademik berbasis web yang dirancang khusus untuk mahasiswa. Fokus utama dari proyek ini adalah:
1. **Kecepatan & Kemudahan Penggunaan:** Antarmuka satu halaman (*single-page*) yang intuitif tanpa *page reload*.
2. **Penyimpanan Lokal Mandiri (*localStorage*):** Mahasiswa tidak perlu membuat akun atau login. Seluruh data tugas otomatis tersimpan di peramban masing-masing dan tetap tersimpan saat halaman dimuat ulang (*refresh*).
3. **Desain Responsif Penuh:** Tampilan dapat digunakan secara sempurna baik pada layar ponsel cerdas (*360px*) maupun monitor desktop (*1280px*) tanpa *horizontal scrolling*.

---

## 🛠️ Tech Stack & Alat Pengembangan

- **Framework / Library:** React.js (Functional Components + Hooks: `useState`, `useEffect`, `useMemo`)
- **Build Tool:** Vite
- **Bahasa:** JavaScript (ES6+)
- **Styling:** CSS3 (Modern Flexbox, CSS Grid, Media Queries, CSS Variables)
- **Icons:** Lucide-React / SVG Icons
- **Version Control:** Git & GitHub

---

## 📋 Daftar Fitur & Spesifikasi

### 8 Fitur Wajib:
1. **Tambah Tugas (Create):** Input nama/judul tugas, mata kuliah, tenggat waktu (wajib diisi), dan catatan tambahan (opsional).
2. **Daftar Tugas (Read):** Menampilkan daftar tugas dengan badge status, informasi mata kuliah, dan tenggat. Menampilkan pesan ramah jika daftar kosong (*Empty State*).
3. **Ubah & Hapus Tugas (Update & Delete):** Mengubah isi detail tugas serta membatalkan proses edit. Meminta konfirmasi dialog sebelum tugas dihapus permanen.
4. **Status Tugas (Toggle Status):** Mengubah status tugas antara *Belum Selesai* dan *Selesai*.
5. **Pencarian & Penyaringan (Search & Filter):** Pencarian judul tugas (*case-insensitive*) serta penyaringan berdasarkan status (*Semua*, *Belum Selesai*, *Selesai*).
6. **Ringkasan Data (Summary Card):** Menampilkan total tugas, jumlah tugas belum selesai, dan jumlah tugas selesai secara dinamis.
7. **Simpan Otomatis (Auto-Save Persistence):** Setiap perubahan otomatis tersimpan di `localStorage` peramban.
8. **Responsif Penuh:** Adaptif dari ukuran terkecil **360px** hingga resolusi monitor **1280px**.

---

## 🏛️ Desain Arsitektur Komponen & Struktur Data

### 1. Struktur Komponen (Hierarki)
```text
src/
├── assets/             # Aset gambar / ikon / font
├── components/
│   ├── Header.jsx      # Judul aplikasi & slogan
│   ├── Summary.jsx     # Statistik ringkasan tugas (Total, Pending, Completed)
│   ├── TaskForm.jsx    # Form penambahan dan pengeditan tugas
│   ├── FilterBar.jsx   # Pencarian teks & dropdown/tab filter status
│   ├── TaskList.jsx    # Kontainer daftar kartu tugas & empty state
│   ├── TaskItem.jsx    # Kartu detail per tugas (tombol ceklis, edit, hapus)
│   └── ConfirmModal.jsx# Dialog modal konfirmasi sebelum menghapus tugas
├── styles/             # Berkas styling CSS modular / terstruktur
├── App.jsx             # State utama, fungsi CRUD, sinkronisasi localStorage
└── main.jsx            # Entry point React Vite
```

### 2. Bentuk Struktur Data Tugas (`Task Object`)
```javascript
{
  id: "task-1711234567890",         // Unique identifier (timestamp / crypto.randomUUID)
  title: "Tugas Proyek ITC",        // String (Wajib)
  course: "Pemrograman Web",       // String (Wajib)
  deadline: "2026-10-05T23:59",    // String / Date format (Wajib)
  notes: "Kerjakan modul form",     // String (Opsional)
  completed: false,                 // Boolean: true (Selesai) | false (Belum Selesai)
  createdAt: "2026-09-28T19:00:00"  // ISO Date string
}
```

---

## 🚀 Panduan Menjalankan Proyek (Langkah Pengembangan)

### Prasyarat
- Node.js (versi 18.x atau yang lebih baru)
- npm / yarn / pnpm

### Langkah Instalasi
```bash
# 1. Clone repository
git clone https://github.com/muhmdathalla/taskmate-group-2.git

# 2. Masuk ke direktori proyek
cd taskmate-group-2

# 3. Install seluruh dependensi
npm install

# 4. Jalankan server pengembangan lokal
npm run dev

# 5. Buka di browser
# http://localhost:5173
```

---

## 🧪 Checklist Pengujian Mandiri (*Quality Assurance*)

Sebelum rilis dan pengumpulan, seluruh anggota tim wajib menguji aspek berikut:

- [ ] **Validasi Input:** Form menolak data kosong atau hanya berupa spasi pada field wajib (Judul, Matkul, Deadline).
- [ ] **Alur Edit:** Data yang dipilih masuk kembali ke formulir; tombol batal edit berfungsi mengembalikan ke mode tambah.
- [ ] **Konfirmasi Hapus:** Menghapus tugas memunculkan konfirmasi; pembatalan tidak menghapus data.
- [ ] **Filter & Search:** Mengetik kata kunci judul memfilter tugas tanpa mempermasalahkan huruf kapital/kecil (*case-insensitive*).
- [ ] **Empty State:** Muncul tampilan informasi yang tepat saat tidak ada tugas sama sekali maupun saat hasil pencarian nihil.
- [ ] **Persistensi localStorage:** Data baru, edit, hapus, maupun toggle status tetap bertahan saat browser di-*refresh*.
- [ ] **Cek Responsif:** Tidak terjadi scroll horizontal pada resolusi 360px (mobile) maupun 1280px (desktop).
- [ ] **Bebas Error Console:** Tidak ada pesan merah (error/warning kunci `key` unik) pada DevTools Console.

---

## 🌿 Alur Kolaborasi Git (Git Workflow)

1. **Branch Utama:** `main` (hanya untuk kode stabil yang siap dinilai).
2. **Branch Fitur:** Setiap anggota membuat branch sesuai tugas:
   - `feat/state-summary-storage` (Athalla)
   - `feat/task-form-validation` (Ridho)
   - `feat/task-list-filter-ui` (Rifani)
3. **Commit Message:** Menggunakan pesan yang jelas dan deskriptif, contoh:
   - `feat: implementasi validasi input dan mode edit TaskForm`
   - `feat: integrasi filter status dan case-insensitive search`
   - `fix: sinkronisasi status ke localStorage saat reload`
4. **Code Review:** Penggabungan (*merge*) ke `main` dilakukan melalui Pull Request (PR) setelah dicek bersama.

---

## 💡 Transparansi & Catatan Pengembangan

- Sesuai dengan instruksi rubrik ITC Front End 2026/2027, proyek ini didokumentasikan secara transparan.
- Penggunaan referensi dokumentasi React, Vite, serta asistensi AI digunakan untuk brainstorming struktur kode, perencanaan arsitektur, dan perumusan checklist pengujian. Seluruh implementasi kode dipahami dan divalidasi oleh seluruh anggota kelompok.
