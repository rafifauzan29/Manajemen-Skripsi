# 🎓 Sistem Manajemen Skripsi & Kolaborasi Akademik

Web app **fullstack berbasis Next.js** (React, TypeScript, Prisma, PostgreSQL) untuk memfasilitasi proses tugas akhir/skripsi secara digital — mulai dari pengajuan judul hingga sidang — melibatkan peran **mahasiswa**, **dosen pembimbing**, dan **admin kampus**.

---

## 🧩 Fitur Berdasarkan Role

### 👨‍🎓 Mahasiswa
#### 📌 Dasar
- Registrasi dan login
- Profil mahasiswa (NIM, nama, prodi, foto)
- Reset password
- Notifikasi real-time / email (balasan dosen, reminder deadline)

#### 📝 Manajemen Skripsi
- Pengajuan judul dan deskripsi awal
- Pilih dosen pembimbing
- Upload proposal & tiap bab (Bab 1–5) dalam PDF
- Catatan penjelas untuk revisi tiap upload
- Status revisi: Diterima / Ditolak / Revisi Ulang

#### 🔄 Tracking Progres
- Progress bar per bab
- Tanggal terakhir bimbingan
- Riwayat bimbingan (log, status, komentar)
- Timeline skripsi dari awal sampai sidang

#### 🧾 Dokumen & Cetak
- Unduh log bimbingan (PDF)
- Cetak LPJ otomatis (untuk tanda tangan)
- Cek plagiarisme (simulasi Turnitin)
- Upload final skripsi (versi digital & form pengesahan)

---

### 👨‍🏫 Dosen Pembimbing
#### 🔑 Akses & Dashboard
- Login dosen
- Lihat daftar mahasiswa bimbingan
- Notifikasi revisi baru dari mahasiswa

#### 📋 Manajemen Bimbingan
- Lihat detail skripsi mahasiswa (judul, komentar sebelumnya)
- Komentar revisi per bab
- Set status bab: Revisi / Diterima / Tolak
- Tandai bimbingan selesai
- Upload file feedback / template revisi

#### 🧾 Penilaian
- Input skor evaluasi awal
- Nilai akhir skripsi
- Cetak laporan bimbingan & penilaian (PDF)

---

### 🏛️ Admin Kampus
#### 🧑‍💼 Manajemen Data
- CRUD data mahasiswa & dosen
- Import data via Excel
- Reset password user
- Setup timeline (pengajuan, bimbingan, sidang)

#### 📈 Monitoring Skripsi
- Statistik status skripsi per bab
- Grafik kemajuan per jurusan/fakultas
- Daftar mahasiswa siap sidang
- Laporan aktivitas dosen

#### 🧾 Dokumen Administratif
- Export data ke Excel / PDF
- Rekap bimbingan
- Cetak form pengesahan otomatis

---

## 🔧 Fitur Teknis Tambahan

### 🔒 Autentikasi & Akses
- Role-based Access (admin, dosen, mahasiswa)
- Middleware proteksi halaman
- Akses file aman (hanya user terkait)

### 🌐 PWA Mode (Opsional)
- Bisa diinstal seperti mobile app
- Offline support untuk baca log

### 📤 Upload & Manajemen File
- Validasi upload (PDF, max 10MB)
- File viewer langsung (tanpa download)
- Rename file & histori versi

### 📊 Visualisasi
- Recharts/ApexCharts: statistik status, waktu bimbingan

### 📧 Notifikasi
- Email otomatis (Resend / Email.js)
- Toast UI notifications
- Reminder deadline (in-app & email)

### 📝 Log Aktivitas
- Semua aksi dicatat: upload, komentar, nilai
- Bisa dilacak oleh admin

---

## ⚙️ Teknologi Utama

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind, ShadCN UI |
| Backend | Next.js API Routes, Prisma ORM |
| Auth | NextAuth.js |
| Database | PostgreSQL |
| Upload | File API, Preview Viewer |
| Notifikasi | Resend / Email.js, Toast |
| PDF & Chart | jsPDF, html2canvas, Recharts |

---

## 📦 Instalasi & Jalankan Aplikasi

```bash
git clone https://github.com/username/manajemen-skripsi.git
cd manajemen-skripsi
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
