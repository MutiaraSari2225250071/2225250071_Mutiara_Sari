# 11 — Distribusi dan Instalasi (Tanpa Play Store / App Store)

Aplikasi dapat dipakai dengan tiga cara. Ketiganya **tidak** memerlukan Google Play Store atau Apple App Store.

| Cara | Untuk | Offline? | Ukuran | Perlu izin khusus? |
|---|---|---|---|---|
| **A. Buka di browser** | Semua perangkat (HP, laptop, komputer lab) | Setelah dibuka pertama kali, ya | — | Tidak |
| **B. Pasang PWA dari browser** (direkomendasikan) | Android, iPhone/iPad, Windows, macOS, Chromebook | Ya | ± 2–5 MB | Tidak |
| **C. Pasang file APK** | Android | Ya | < 30 MB | Ya: izinkan "Instal aplikasi tidak dikenal" |

Rekomendasi untuk uji coba di sekolah: **utamakan cara B (PWA)** karena paling mudah, ringan, dan berjalan di semua HP. Siapkan **cara C (APK)** sebagai cadangan untuk siswa yang ingin ikon aplikasi Android biasa atau browsernya kurang mendukung PWA.

## 1. Alamat dan QR Code

- Aplikasi di-hosting di alamat HTTPS, misalnya `https://<nama-akun>.github.io/pasar-pintar/` atau `https://pasar-pintar.netlify.app` (nama sesuai akun yang dibuat).
- Buat **QR code** yang berisi alamat tersebut, lalu cetak di **brosur/poster/LKPD**. Siswa cukup memindai QR dengan kamera HP untuk membuka aplikasi.
- Halaman `/pasang` di aplikasi berisi panduan pemasangan bergambar, tombol "Pasang Aplikasi" (PWA), dan tautan unduh APK.

### Isi brosur (usulan)

```
┌─────────────────────────────────────┐
│   🛒 PASAR PINTAR                    │
│   Belajar Aritmetika Sosial          │
│   sambil belanja & berjualan         │
│                                     │
│   ┌─────────┐  1. Pindai QR ini     │
│   │ ▓▓ QR ▓▓│  2. Ketuk "Pasang"    │
│   │ ▓▓▓▓▓▓▓ │  3. Buka dari layar   │
│   └─────────┘     utama HP          │
│                                     │
│   Bisa dipakai tanpa internet       │
│   setelah dipasang.                 │
│   Alamat: pasar-pintar.netlify.app  │
└─────────────────────────────────────┘
```

## 2. Panduan untuk Siswa

### A. Membuka di browser
1. Pindai QR code atau ketik alamat aplikasi di Chrome/Safari/Edge.
2. Aplikasi langsung bisa dipakai.

### B. Memasang PWA

**Android (Chrome)**
1. Buka alamat aplikasi di Chrome.
2. Ketuk tombol **"Pasang Aplikasi"** di aplikasi, atau menu ⋮ → **"Instal aplikasi" / "Tambahkan ke layar utama"**.
3. Ikon Pasar Pintar muncul di layar utama.

**iPhone/iPad (Safari)**
1. Buka alamat aplikasi di **Safari** (bukan browser lain).
2. Ketuk tombol **Bagikan** (kotak dengan panah ke atas) → **"Tambahkan ke Layar Utama"**.
3. Ketuk **Tambah**.

**Laptop/komputer (Chrome/Edge)**
1. Buka alamat aplikasi.
2. Klik ikon **Pasang** (⊕) di ujung kanan kolom alamat.

### C. Memasang APK (Android)
1. Buka halaman `/pasang` atau pindai QR APK, lalu ketuk **"Unduh APK"**.
2. Buka file yang terunduh. Jika muncul peringatan, ketuk **Setelan** → aktifkan **"Izinkan dari sumber ini"**.
3. Ketuk **Instal**.
4. Jika Google Play Protect menampilkan peringatan "aplikasi tidak dikenal", pilih **"Tetap instal"**. Peringatan ini wajar untuk aplikasi di luar Play Store.

> iPhone **tidak bisa** memasang APK. Pengguna iPhone memakai cara B.

### Memperbarui aplikasi
- **PWA:** otomatis. Saat ada versi baru, aplikasi menampilkan pesan "Versi baru tersedia" dan tombol **Muat ulang**.
- **APK:** unduh APK versi terbaru dari halaman `/pasang` lalu pasang di atas versi lama. Progres tetap tersimpan selama APK ditandatangani dengan *keystore* yang sama.

## 3. Panduan untuk Pengembang

### 3.1 Syarat PWA agar bisa dipasang
- [ ] Di-hosting dengan **HTTPS**
- [ ] `manifest.webmanifest` berisi `name`, `short_name`, `start_url`, `display: "standalone"`, `theme_color`, `background_color`, dan ikon 192×192 & 512×512 (plus ikon *maskable*)
- [ ] *Service worker* menyimpan (*precache*) semua file aplikasi, font, dan konten JSON untuk mode offline
- [ ] Ikon `apple-touch-icon` dan meta tag untuk iOS
- [ ] Diuji dengan Lighthouse (Chrome DevTools) → kategori PWA lulus

### 3.2 Tombol "Pasang Aplikasi" (F-54)
- Android/desktop: tangkap event `beforeinstallprompt`, lalu tampilkan tombol yang memanggil `prompt()`
- iOS: event tersebut tidak tersedia, jadi tampilkan panduan bergambar "Bagikan → Tambahkan ke Layar Utama"
- Sembunyikan tombol jika aplikasi sudah berjalan dalam mode terpasang (`display-mode: standalone`)

### 3.3 Hosting web (pilih salah satu, gratis)

| Layanan | Cara singkat |
|---|---|
| GitHub Pages | Push repo → GitHub Actions menjalankan `npm run build` → publikasi folder `app/dist` (atur `base` di `vite.config.js`) |
| Netlify | Hubungkan repo → *build command* `npm run build`, *base directory* `app`, *publish* `app/dist` |
| Vercel | Sama seperti Netlify |

### 3.4 Membuat APK
```bash
cd app
npm run build
npx cap add android          # sekali saja
npx cap sync android
npx cap open android
```
Di Android Studio: **Build → Generate Signed App Bundle or APK → APK** → buat atau pilih *keystore* → varian **release**.

- Simpan file *keystore* (`.jks`) dan kata sandinya di tempat aman, **di luar Git**. Tanpa keystore yang sama, pembaruan APK tidak bisa dipasang di atas versi lama.
- Beri nama file sesuai versi: `pasar-pintar-v1.0.0.apk`.
- Unggah ke **GitHub Releases** (direkomendasikan) atau ke folder `app/public/unduh/` agar ikut ter-hosting. Tautkan dari halaman `/pasang`.
- Cantumkan ukuran file dan *checksum* SHA-256 di halaman unduh, agar file mudah diverifikasi.

### 3.5 Penomoran versi
Gunakan format `MAYOR.MINOR.PATCH` (misalnya `1.2.0`). Samakan nomor versi di `package.json`, `versionName` Android, dan halaman `/pasang`. Naikkan `versionCode` Android setiap merilis APK baru.

## 4. Daftar Periksa Sebelum Uji Coba di Sekolah

- [ ] Alamat web aktif dan QR code sudah diuji di 3 HP berbeda
- [ ] PWA terpasang dan berjalan dalam **mode pesawat** di Android dan iPhone
- [ ] APK terpasang di HP Android kelas bawah (Android 8+)
- [ ] Brosur/poster panduan dicetak
- [ ] Rencana cadangan jika Wi-Fi sekolah lemah: siapkan APK di flashdisk/laptop, atau minta siswa memasang PWA di rumah sehari sebelumnya
- [ ] Cara ekspor data ke peneliti sudah diuji (docs/12)
