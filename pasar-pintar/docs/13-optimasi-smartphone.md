# 13 — Optimasi untuk Smartphone

Smartphone adalah **perangkat utama** siswa. Semua keputusan desain dan teknis dimulai dari HP Android kelas bawah, lalu diperluas ke perangkat yang lebih besar (*mobile first*). Dokumen ini berlaku untuk ketiga cara pakai: browser, PWA, dan APK.

## 1. Perangkat Sasaran

| Kategori | Spesifikasi acuan | Prioritas |
|---|---|---|
| **Android kelas bawah** (acuan utama) | RAM 2 GB, Android 8–10, layar 5–6 inci (360×640 dp hingga 360×780 dp), CPU 4–8 inti lambat, Chrome/WebView mungkin belum diperbarui | Wajib lancar |
| Android kelas menengah | RAM 4–6 GB, Android 11+, layar 393–412 dp, layar berponi/*punch-hole*, navigasi gestur | Wajib |
| iPhone | iPhone SE (375×667) hingga iPhone terbaru (393–430 dp), Safari | Wajib berfungsi |
| Layar sangat kecil | Lebar 320 dp | Tetap bisa dipakai, tanpa gulir horizontal |
| Tablet / laptop | ≥ 768 dp | Tampilan dilebarkan maksimal 640 px di tengah layar |

**Anggaran kinerja (performance budget):**

| Ukuran | Target |
|---|---|
| JavaScript awal (gzip) | ≤ 200 KB |
| Total unduhan pertama | ≤ 2 MB |
| Tampil pertama (FCP) di 3G lambat | < 3 detik |
| Bisa disentuh (TTI) di HP kelas bawah | < 5 detik |
| Lighthouse Mobile: Performance / Accessibility / Best Practices | ≥ 90 / ≥ 95 / ≥ 90 |
| Respons ketukan | < 100 ms; animasi 60 fps |
| Ukuran APK | < 30 MB |
| Pemakaian memori | < 150 MB saat berjalan |

## 2. Tata Letak

### 2.1 Viewport dan area aman

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0F766E">
```

- **Jangan menonaktifkan zoom** (`user-scalable=no` dilarang) karena dibutuhkan siswa yang penglihatannya kurang.
- Gunakan `env(safe-area-inset-top/bottom/left/right)` agar konten tidak tertutup poni, *punch-hole*, atau garis navigasi gestur.
- Tinggi layar penuh memakai `100dvh`, bukan `100vh`, karena bilah alamat browser HP muncul dan hilang.

### 2.2 Struktur satu layar

```
┌────────────────────────────┐ ← safe-area-inset-top
│ Header ringkas (48 dp)      │   judul + tombol kembali + petunjuk
├────────────────────────────┤
│ Panel Diketahui (lipat)     │   menempel di atas (sticky), bisa diciutkan
├────────────────────────────┤
│                            │
│ Konten (bisa digulir)       │   satu tugas per layar
│                            │
├────────────────────────────┤
│ Tombol utama (56 dp)        │   menempel di bawah, zona ibu jari
└────────────────────────────┘ ← safe-area-inset-bottom
```

- Lebar konten: 100% dengan *padding* 16 px; di tablet/laptop maksimal 640 px di tengah.
- **Tidak boleh ada gulir horizontal** di lebar 320 dp. Tabel lebar (misalnya struk atau tabel LKPD) diubah menjadi kartu bertumpuk, atau diberi gulir horizontal **di dalam kartu itu saja**.
- Orientasi utama **potret**. Lanskap tetap didukung: panel Diketahui pindah ke kolom kiri dan konten ke kolom kanan.

### 2.3 Zona ibu jari

Tombol yang sering dipakai (Lanjut, Periksa, Pilihan jawaban) diletakkan di **sepertiga bawah layar**. Tombol yang jarang dipakai (Pengaturan, Keluar) diletakkan di atas.

## 3. Input Angka di Layar Sentuh

Masalah utama di HP: **keyboard bawaan menutupi setengah layar**, sehingga soal dan panel Diketahui tidak terlihat saat siswa mengetik. Ini memicu *split-attention* (bolak-balik menggulir) yang bertentangan dengan prinsip CLT.

### 3.1 Solusi utama: Keypad Rupiah dalam aplikasi (F-57)

```
┌────────────────────────────┐
│ DIKETAHUI: 🏷️120.000 ✂️25% │  ← tetap terlihat
│ 25% × Rp120.000 = Rp[30.000]│  ← kolom aktif
├────────────────────────────┤
│  [ 1 ]   [ 2 ]   [ 3 ]      │
│  [ 4 ]   [ 5 ]   [ 6 ]      │
│  [ 7 ]   [ 8 ]   [ 9 ]      │
│  [000]   [ 0 ]   [ ⌫ ]      │
│  [ , ]           [Periksa ✓]│
└────────────────────────────┘
```

- Tinggi keypad ± 40% layar, lebih pendek dari keyboard bawaan. Posisinya bisa diatur agar soal tetap terlihat.
- Tombol **000** mempercepat mengetik nominal besar dan mengurangi salah jumlah nol (IL04, miskonsepsi MK7).
- Tombol **,** hanya muncul di kolom persen.
- Format ribuan tampil langsung saat mengetik: `120000` → `120.000`.
- Tiap tombol ≥ 56×56 dp dengan getaran pendek (*haptic*) jika perangkat mendukung.
- Keyboard bawaan tidak muncul (`inputmode="none"` pada kolom yang memakai keypad).

### 3.2 Jika memakai keyboard bawaan (cadangan / kolom teks)

- Kolom angka: `inputmode="numeric"`; kolom persen: `inputmode="decimal"`.
- `autocomplete="off"`, `autocorrect="off"`, `autocapitalize="off"`, `spellcheck="false"`.
- `enterkeyhint="next"` agar tombol Enter berpindah ke kolom berikutnya, lalu `"done"` di kolom terakhir.
- Ukuran huruf kolom isian **minimal 16 px** agar Safari iPhone tidak otomatis memperbesar halaman.
- Saat kolom aktif, gulirkan kolom ke area yang terlihat (`scrollIntoView` + `visualViewport`), dan ciutkan panel Diketahui menjadi satu baris ringkas.
- Kolom alasan tertulis (F-64) memakai keyboard bawaan, dengan batas 2 kalimat dan penghitung karakter.

## 4. Interaksi Sentuh

| Aturan | Rincian |
|---|---|
| Area sentuh | ≥ 48×48 dp; jarak antartombol ≥ 8 dp |
| Tanpa *hover* | Tidak ada informasi yang hanya muncul saat kursor diarahkan |
| Tanpa tekan lama | Semua aksi cukup dengan satu ketukan |
| Seret & lepas | **Selalu ada alternatif ketuk**: ketuk item lalu ketuk tujuannya. Berlaku untuk menjodohkan, menyusun langkah, dan keranjang belanja |
| Cegah zoom ketuk ganda | `touch-action: manipulation` pada tombol |
| Gestur | Geser kiri/kanan **tidak** dipakai untuk pindah soal (sering tidak sengaja); gunakan tombol |
| Umpan balik | Tombol berubah warna saat ditekan; getaran pendek (≤ 20 ms) untuk benar/salah, bisa dimatikan di Pengaturan |
| Stimulus literasi | Ketuk untuk membuka layar penuh; cubit (*pinch*) untuk memperbesar; teks dalam SVG minimal setara 14 px |

## 5. Navigasi dan Tombol Kembali

- Routing memakai riwayat browser sehingga **tombol kembali** Android, gestur kembali iPhone, dan tombol back browser semuanya bekerja.
- APK (Capacitor): tangani event tombol kembali. Di Beranda, tekan dua kali untuk keluar ("Tekan sekali lagi untuk keluar").
- Saat siswa sedang mengerjakan soal lalu menekan kembali, tampilkan konfirmasi: "Keluar dari latihan? Jawabanmu sudah tersimpan." Progres **tidak pernah hilang**.
- Navigasi utama berupa **bilah bawah** (Beranda, Belajar, Pasar, Rapor) dengan ikon + label.

## 6. Data Aman Saat HP Dipakai Sehari-hari

HP siswa sering terganggu: ada telepon masuk, aplikasi ditutup paksa, baterai habis, layar mati, atau HP dipakai bergantian dengan saudara.

| Situasi | Penanganan |
|---|---|
| Aplikasi ditutup / masuk latar belakang | Setiap jawaban **langsung** disimpan ke IndexedDB saat diperiksa. Posisi terakhir (modul, langkah, soal + *seed*) disimpan saat `visibilitychange` / `pagehide` / event `pause` Capacitor |
| Dibuka kembali | Aplikasi menawarkan "Lanjutkan dari Soal 4 M4 Diskon?" |
| Penyimpanan dihapus browser saat memori penuh | Panggil `navigator.storage.persist()` untuk meminta penyimpanan permanen. Tampilkan peringatan jika ditolak |
| iPhone tidak memasang PWA | Safari dapat menghapus data situs yang lama tidak dibuka. Anjurkan memasang ke Layar Utama, dan ingatkan peneliti untuk mengekspor data secara berkala |
| HP dipakai bergantian | **Beberapa profil di satu HP** (F-58): pilih nama panggilan saat membuka aplikasi; data tiap profil terpisah |
| Penyimpanan HP hampir penuh | Data aplikasi kecil (< 5 MB per siswa). Tampilkan pesan jelas jika penyimpanan gagal |
| Cadangan | Rapor Saya → "Simpan cadangan" (file JSON) dan "Pulihkan cadangan" |

## 7. Kinerja di HP Kelas Bawah

- **Pecah kode per halaman** (`React.lazy` + `Suspense`): Mode Belajar, Pasar Pintar, dan Rapor dimuat terpisah.
- **Konten JSON dimuat per modul**, bukan sekaligus.
- **Font**: pakai font sistem, atau satu font WOFF2 yang di-*subset* (hanya huruf Latin) dan di-*host* sendiri, dengan `font-display: swap`.
- **SVG** dioptimalkan (SVGO); ilustrasi berulang memakai `<symbol>`/`<use>`.
- **Tanpa gambar raster besar.** Ikon aplikasi adalah satu-satunya PNG.
- **Animasi** hanya memakai `transform` dan `opacity`, maksimal 300 ms, dan dimatikan jika `prefers-reduced-motion` aktif.
- **Tanpa library animasi berat**, tanpa *polling*, dan tanpa proses latar belakang (hemat baterai dan kuota).
- Daftar panjang (misalnya riwayat jawaban di Rapor) ditampilkan bertahap ("Muat lagi").
- **Kompatibilitas WebView lama** (Android 8 yang Chrome/WebView-nya jarang diperbarui): atur `build.target` Vite ke target yang lebih lama, atau gunakan `@vitejs/plugin-legacy` setelah diuji di perangkat nyata. Tampilkan pesan "Perbarui Android System WebView/Chrome" jika fitur penting tidak didukung.

## 8. Jaringan dan Kuota

- **Offline first**: setelah dibuka pertama kali atau dipasang, semua fitur berjalan tanpa internet.
- Tidak ada pemanggilan ke server atau CDN luar saat aplikasi berjalan (font dan library di-*bundle*).
- Pembaruan PWA diunduh di latar belakang hanya saat online, lalu diterapkan setelah siswa menekan "Muat ulang".
- Halaman /pasang menampilkan ukuran unduhan APK agar siswa tahu kuota yang dibutuhkan.

## 9. Tampilan Layar

- **Kontras tinggi** (≥ 4,5:1, judul ≥ 3:1) supaya tetap terbaca di bawah sinar matahari.
- **Mode gelap** mengikuti pengaturan HP (`prefers-color-scheme`), dengan pilihan manual di Pengaturan. Warna label harga disesuaikan agar tetap kontras di mode gelap.
- Ukuran huruf memakai `rem` sehingga mengikuti **pengaturan ukuran huruf sistem**. Tata letak diuji hingga skala huruf 130%.
- Status bar berwarna sesuai tema (`theme-color`; plugin Status Bar di APK).
- Layar pembuka (*splash screen*) sederhana, maksimal 1 detik.

## 10. Hal Khusus per Platform

| Platform | Perhatian |
|---|---|
| Android – Chrome (PWA) | Event `beforeinstallprompt` untuk tombol Pasang; ikon *maskable* |
| Android – APK (Capacitor) | Plugin: `@capacitor/app` (tombol kembali, status aktif/latar), `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/keyboard` (mode resize), `@capacitor/haptics` (opsional). `minSdkVersion` 26 (Android 8). `windowSoftInputMode="adjustResize"`. Izin minimal |
| iPhone – Safari (PWA) | Tidak ada `beforeinstallprompt`, jadi tampilkan panduan; `apple-touch-icon`; `apple-mobile-web-app-capable`; area aman; `navigator.vibrate` tidak didukung (tidak masalah) |
| Browser biasa (tidak dipasang) | Semua fitur tetap berjalan; bilah alamat diperhitungkan memakai `dvh` |

## 11. Daftar Periksa Smartphone (Definition of Done tiap layar)

- [ ] Rapi di lebar 320, 360, 375, 393, dan 412 dp, potret dan lanskap
- [ ] Tidak ada gulir horizontal
- [ ] Tombol utama di zona ibu jari, area sentuh ≥ 48 dp
- [ ] Soal, panel Diketahui, dan kolom jawaban terlihat bersamaan saat keypad terbuka
- [ ] Tombol kembali Android/iPhone berperilaku benar
- [ ] Progres tetap ada setelah aplikasi ditutup paksa lalu dibuka lagi
- [ ] Berjalan dalam mode pesawat
- [ ] Terbaca dengan skala huruf sistem 130% dan dalam mode gelap
- [ ] Lighthouse Mobile memenuhi target bagian 1
- [ ] Sudah dicoba di **HP Android kelas bawah sungguhan**, bukan hanya emulator
