# CLAUDE.md

Panduan untuk Claude Code (dan asisten AI lain) saat bekerja di repositori ini. Baca file ini sebelum menulis atau mengubah kode.

## Tentang Proyek

**Pasar Pintar** adalah aplikasi belajar Aritmetika Sosial untuk siswa SMP kelas VII. Desainnya mengikuti **Teori Beban Kognitif (CLT)**, disusun dari wawancara siswa, dan bertujuan **menumbuhkembangkan literasi matematika** (merumuskan, menerapkan, menafsirkan; kerangka PISA/AKM).

Aplikasi **dibuka di browser** dan **dipasang tanpa Play Store/App Store**: sebagai PWA dari browser, atau sebagai APK Android yang diunduh langsung.

Pemilik proyek adalah mahasiswa S1 Pendidikan Matematika yang **masih belajar pemrograman**. Karena itu:

- Jelaskan setiap perubahan dengan bahasa sederhana (Bahasa Indonesia).
- Utamakan kode yang mudah dibaca daripada kode yang ringkas atau "pintar".
- Jangan menambah *library* baru tanpa menjelaskan alasannya dan meminta persetujuan.
- Kerjakan dalam langkah kecil; satu fitur atau satu perbaikan per perubahan.

## ATURAN UTAMA: Pembagian Bahasa Pemrograman

| Jenis data | Bahasa | Folder |
|---|---|---|
| **Data umum**: UI, navigasi, materi, soal, generator, kunci jawaban, simulasi, stimulus, progres, rapor siswa sederhana, ekspor CSV | **JavaScript** | `app/` |
| **Data statistik**: analisis penelitian (deskriptif, inferensial, N-Gain, uji-t/Wilcoxon, normalitas, validitas, reliabilitas, SUS, Paas, efisiensi, kappa, skor literasi kelas), grafik dan tabel laporan, dasbor peneliti | **Python** | `analisis/` |

- **Penentu jika ragu:** hasil dipakai **siswa saat memakai aplikasi** → JavaScript. Hasil dipakai **peneliti/guru untuk analisis atau laporan** → Python.
- Jangan menulis statistik inferensial atau analisis penelitian di JavaScript. Jangan menulis UI aplikasi siswa di Python.
- Jangan memasukkan Python ke dalam aplikasi siswa (tanpa Pyodide, tanpa backend Python di versi 1).
- **Penghubungnya file CSV** dengan format di [docs/06-model-data.md](docs/06-model-data.md) bagian 3. Jika kolom ekspor diubah di JavaScript, perbarui juga docs/06, `analisis/pasar_pintar_analisis/muat_data.py`, dan data contoh di `analisis/data/contoh/`, lalu naikkan `versiSkema`.

## Dokumen Acuan (Sumber Kebenaran)

| Pertanyaan | Lihat |
|---|---|
| Fitur apa yang harus dibuat dan prioritasnya? | [PRD.md](PRD.md) |
| Kenapa fitur ini ada? | [docs/01-riset-pengguna.md](docs/01-riset-pengguna.md) |
| Bagaimana alur belajarnya? | [docs/02-desain-pembelajaran.md](docs/02-desain-pembelajaran.md) |
| Format soal dan materi? | [docs/03-spesifikasi-konten.md](docs/03-spesifikasi-konten.md) |
| Tampilan dan warna? | [docs/04-desain-ui-ux.md](docs/04-desain-ui-ux.md) |
| Struktur kode dan stack? | [docs/05-arsitektur-teknis.md](docs/05-arsitektur-teknis.md) |
| Skema data dan format CSV? | [docs/06-model-data.md](docs/06-model-data.md) |
| Apa yang dikerjakan sekarang? | [docs/07-roadmap.md](docs/07-roadmap.md) |
| Soal literasi, stimulus, siklus 4 langkah? | [docs/10-literasi-matematika.md](docs/10-literasi-matematika.md) |
| PWA, APK, hosting, QR code? | [docs/11-distribusi-dan-instalasi.md](docs/11-distribusi-dan-instalasi.md) |
| Analisis statistik Python? | [docs/12-analisis-data-python.md](docs/12-analisis-data-python.md) |
| Agar berjalan baik di smartphone? | [docs/13-optimasi-smartphone.md](docs/13-optimasi-smartphone.md) |

Jika permintaan pengguna bertentangan dengan dokumen-dokumen ini, tanyakan dulu sebelum mengerjakan.

## Tech Stack

**JavaScript (`app/`):** React 18 (`.jsx`) · Vite · Tailwind CSS · React Router · Zustand · Dexie.js (IndexedDB) · vite-plugin-pwa · Capacitor (APK) · Vitest + Testing Library · ESLint + Prettier. Tipe data didokumentasikan dengan **JSDoc**.

**Python (`analisis/`):** Python 3.11+ · pandas · numpy · scipy · statsmodels · pingouin · matplotlib · openpyxl · Jupyter · Streamlit (opsional) · pytest · ruff.

## Perintah

```bash
# --- JavaScript ---
cd app
npm install
npm run dev            # http://localhost:5173
npm run build          # build produksi ke app/dist (PWA)
npm run preview
npm run test           # Vitest
npm run lint           # ESLint
npx cap sync android   # siapkan proyek Android untuk APK
npx cap open android

# --- Python ---
cd analisis
python -m venv .venv
.venv\Scripts\activate         # Windows; macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
pytest
ruff check .
python skrip/jalankan_semua.py --data data/contoh --keluaran hasil
```

Sebelum menyatakan pekerjaan selesai, jalankan test dan lint untuk bagian yang diubah (`npm run lint && npm run test` atau `ruff check . && pytest`), lalu laporkan hasilnya dengan jujur.

## Struktur Folder

```
app/                          # JavaScript – aplikasi siswa
  src/
    app/                      # routing, layout
    features/
      belajar/                # Mode Belajar
      literasi/               # Tantangan Literasi + stimulus/
      simulasi/               # Pasar Pintar
      rapor/                  # progres + ekspor CSV
      pasang/                 # tombol pasang PWA + halaman unduh APK
      onboarding/  pengaturan/  beranda/
    components/               # LabelHarga, BarModel, InputRupiah, Stimulus, ...
    lib/
      matematika/             # fungsi hitung murni (kunci jawaban)
      generator/  adaptif/  db/  ekspor/
    content/                  # JSON materi & soal, BUKAN kode
    types/skema.js            # JSDoc @typedef
  tests/
  android/                    # dibuat Capacitor
analisis/                     # Python – analisis statistik
  pasar_pintar_analisis/      # fungsi statistik murni
  notebooks/  skrip/  dasbor/
  data/contoh/                # data dummy (boleh commit)
  data/mentah/  data/olahan/  hasil/   # JANGAN commit
  tests/
```

## Aturan Wajib

### 1. Matematika harus benar (JavaScript)

- Semua nominal uang memakai **bilangan bulat rupiah**. Persen disimpan sebagai angka (`12.5` untuk 12,5%).
- Pembulatan hanya di langkah akhir dan harus dijelaskan di soal jika dipakai.
- Setiap fungsi di `app/src/lib/matematika/` **wajib punya unit test**, termasuk kasus batas (diskon 0%, diskon 100%, impas, rugi).
- Kunci jawaban **dihitung dari parameter** soal, bukan diketik manual.
- Rumus sesuai buku siswa kelas VII:
  - Untung = Harga Jual − Harga Beli; Rugi = Harga Beli − Harga Jual
  - % Untung = (Untung / Harga Beli) × 100%; % Rugi = (Rugi / Harga Beli) × 100%
  - Potongan = % Diskon × Harga Awal; Harga Setelah Diskon = Harga Awal − Potongan
  - PPN = % PPN × Harga Sebelum Pajak (setelah diskon)

### 2. Statistik harus benar (Python)

- Rumus statistik ditulis sebagai fungsi di `pasar_pintar_analisis/`; notebook hanya memanggil fungsi tersebut.
- Setiap fungsi statistik **wajib punya test pytest** dengan hasil yang sudah dicek manual/SPSS/Excel.
- Uji beda otomatis memilih uji-t berpasangan (data normal) atau Wilcoxon (tidak normal), dan melaporkan alasannya.
- Data mentah tidak boleh diubah; hasil olahan disimpan di `data/olahan/` dan `hasil/`.
- Python mengikuti PEP 8; nama fungsi Bahasa Indonesia *snake_case* (`hitung_n_gain`).

### 3. Prinsip beban kognitif dalam UI (jangan dilanggar)

- **Satu layar, satu tugas.**
- **Instruksi maksimal 2 kalimat**, kalimat maksimal 20 kata.
- **Label warna harga tetap** (docs/04): `hargaAwal` biru, `potongan` oranye, `hargaAkhir` hijau, `untung` hijau tua, `rugi` merah, `pajak` ungu. Warna **selalu** disertai teks label dan ikon.
- **Tanpa gambar dekoratif.** Ilustrasi dan stimulus memakai SVG.
- **Tanpa timer** di Mode Belajar.
- Informasi yang dibutuhkan untuk menjawab **terlihat bersamaan** dengan kotak jawaban.
- Angka rupiah selalu memakai `formatRupiah()` → `Rp1.250.000`.

### 4. Literasi matematika

- Setiap soal **wajib** punya tag `proses`, `levelKognitif`, dan `konteksLiterasi` (docs/06). Generator menolak soal tanpa tag.
- Siklus 4 langkah tetap: Pahami Situasi → Ubah ke Matematika → Hitung → Cek & Putuskan.
- Stimulus dibuat sebagai komponen SVG dari data JSON. Semua toko dan merek **fiktif**.
- Tantangan Literasi terbuka setelah Latihan Mandiri modul tersebut selesai.
- "Mana Lebih Hemat?" dan "Detektif Promo" dinilai dari **pilihan + alasan**, disimpan terpisah.

### 5. Bisa dibuka di browser dan dipasang tanpa toko aplikasi

- Aplikasi harus tetap berfungsi penuh sebagai **web biasa** di browser. Jangan memakai fitur yang hanya tersedia di Capacitor/native tanpa alternatif web.
- Semua aset (font, ikon, JSON konten) harus masuk *precache* service worker agar berjalan offline.
- Semua path memakai path relatif / `import.meta.env.BASE_URL` agar bisa di-hosting di subfolder (GitHub Pages).
- Jangan menambah dependensi Google Play Services atau SDK yang mengharuskan instalasi lewat Play Store.

### 6. Smartphone adalah perangkat utama (mobile first)

Detail lengkap di docs/13. Ringkasnya:
- Tulis CSS untuk layar **360 dp lebih dulu**, lalu perluas dengan breakpoint Tailwind (`sm:`, `md:`). Tidak boleh ada gulir horizontal di lebar 320 dp.
- Pakai `100dvh` (bukan `100vh`) dan `env(safe-area-inset-*)`. Jangan pernah memakai `user-scalable=no`.
- Tombol utama menempel di bawah (zona ibu jari), ≥ 48 dp; tambahkan `touch-action: manipulation`.
- Kolom angka memakai komponen **`KeypadRupiah`**, bukan keyboard bawaan. Jika memakai keyboard bawaan: `inputmode` yang tepat dan ukuran huruf ≥ 16 px.
- Tidak ada interaksi yang hanya bisa dilakukan dengan *hover*, tekan lama, atau seret; seret-lepas wajib punya alternatif ketuk.
- Setiap jawaban disimpan **langsung** ke IndexedDB. Simpan posisi terakhir saat `visibilitychange`/`pagehide`.
- Tombol kembali harus bekerja (routing berbasis riwayat; event `backButton` Capacitor di APK).
- Muat halaman dan konten JSON per modul secara *lazy*. Animasi hanya `transform`/`opacity` dan hormati `prefers-reduced-motion`.
- Jangan memuat apa pun dari CDN luar saat aplikasi berjalan.
- Setiap layar baru wajib lolos Daftar Periksa Smartphone (docs/13 bagian 11) sebelum dianggap selesai.

### 7. Konten terpisah dari kode

- Soal, materi, stimulus, dan teks panjang ada di `app/src/content/*.json`.
- Jangan menulis teks soal langsung di dalam komponen React.

### 8. Privasi anak

- Jangan menambah pengumpulan data pribadi (email, nomor HP, foto, lokasi).
- Jangan menambah analitik pihak ketiga, iklan, atau SDK pelacak.
- Aplikasi tidak mengirim data ke internet. Data berpindah ke peneliti hanya lewat ekspor CSV manual.
- Jangan pernah meng-commit `analisis/data/mentah/`, `analisis/data/olahan/`, `analisis/hasil/`, atau file *keystore* APK.

### 9. Gaya kode JavaScript

- JavaScript modern (ES modules, `const`/`let`, *arrow function*). Tanpa TypeScript.
- Tambahkan komentar **JSDoc** (`@param`, `@returns`, `@typedef`) pada fungsi di `lib/` dan komponen bersama.
- Komponen berupa fungsi; satu komponen per file; nama file `PascalCase.jsx`.
- Nama fungsi dan variabel di JavaScript memakai **bahasa Indonesia camelCase** (`hargaSetelahDiskon`), sesuai istilah buku siswa. Teks yang dilihat siswa memakai Bahasa Indonesia.
- Komentar dalam Bahasa Indonesia, hanya jika menjelaskan *mengapa*.
- Area sentuh minimal 48×48 dp (`min-h-12 min-w-12`).

## Alur Kerja yang Diharapkan

1. Baca tugas di `docs/07-roadmap.md` dan ID fitur terkait di `PRD.md`.
2. Tentukan bahasanya dengan **aturan pembagian bahasa** di atas.
3. Untuk logika matematika (JS) atau statistik (Python): tulis test dulu, lalu implementasinya.
4. Untuk UI: cek wireframe di `docs/04-desain-ui-ux.md`.
5. Jalankan lint dan test.
6. Ringkas perubahan dalam Bahasa Indonesia, sebutkan ID fitur (misalnya "F-12 BarModel").
7. Commit hanya jika diminta. Pesan commit dalam Bahasa Indonesia, contoh: `Menambahkan fungsi N-Gain di analisis Python`.

## Hal yang Perlu Ditanyakan Dulu

- Menambah dependensi baru (npm atau pip)
- Mengubah skema data Dexie atau kolom CSV ekspor
- Mengubah warna label harga atau alur worked → faded → latihan
- Menambah fitur yang tidak ada di PRD
- Menambahkan server/backend atau pengiriman data ke internet
