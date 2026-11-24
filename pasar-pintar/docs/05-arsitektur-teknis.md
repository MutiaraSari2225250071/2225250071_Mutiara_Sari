# 05 — Arsitektur Teknis

## 1. Keputusan Utama

### 1.1 Dibuka di browser, dipasang tanpa toko aplikasi

| Cara memakai | Teknologi | Perlu Play Store / App Store? |
|---|---|---|
| Dibuka langsung di browser (HP, laptop, komputer lab) | Web app | ❌ Tidak |
| Dipasang ke layar utama HP Android/iPhone dan laptop dari browser, berjalan offline | **PWA** (*Progressive Web App*) | ❌ Tidak |
| Dipasang sebagai aplikasi Android (file **APK**) yang diunduh dari situs web/QR code | **Capacitor** → APK | ❌ Tidak (*sideload*) |

Cara pemasangan lengkap untuk siswa dan pengembang ada di [11-distribusi-dan-instalasi.md](11-distribusi-dan-instalasi.md).

### 1.2 Pembagian bahasa pemrograman: JavaScript dan Python

| Jenis data / tugas | Bahasa | Di mana berjalan |
|---|---|---|
| **Data umum**: tampilan, navigasi, materi, soal, generator soal, kunci jawaban, simulasi, stimulus literasi, progres siswa, rapor sederhana, ekspor CSV | **JavaScript** | Di perangkat siswa (browser/PWA/APK), offline |
| **Data statistik**: analisis data penelitian (deskriptif dan inferensial), N-Gain, uji normalitas, uji-t/Wilcoxon, validitas dan reliabilitas instrumen, skor SUS, beban kognitif (Paas, efisiensi instruksional), skor literasi per proses, kesepakatan antarpenilai, grafik dan tabel untuk laporan | **Python** | Di laptop peneliti, membaca CSV hasil ekspor aplikasi |

**Aturan penentu.** Jika ragu, tanyakan: *"Hasil ini dipakai siswa saat memakai aplikasi, atau dipakai peneliti/guru untuk analisis dan laporan?"*
- Dipakai siswa di aplikasi → **JavaScript**. Contoh: "Akurasimu 80%" di Rapor Saya cukup dihitung dengan pembagian sederhana, jadi termasuk data umum.
- Dipakai untuk analisis/laporan → **Python**. Contoh: rata-rata Paas seluruh kelas, N-Gain, uji-t.

**Penghubungnya adalah file CSV.** Aplikasi JavaScript mengekspor data ke CSV dengan format tetap (docs/06 bagian 3), lalu skrip Python membaca CSV tersebut. Kedua bagian tidak saling memanggil secara langsung, sehingga masing-masing bisa dikembangkan dan diuji terpisah.

```
 ┌────────────────────────────────┐        CSV         ┌──────────────────────────────┐
 │  APLIKASI SISWA (JavaScript)   │  ── ekspor ────►   │  ANALISIS STATISTIK (Python) │
 │  browser / PWA / APK, offline  │  jawaban.csv       │  laptop peneliti             │
 │  data umum                     │  skala_paas.csv    │  data statistik              │
 │                                │  jawaban_literasi  │  → tabel Excel, grafik PNG,  │
 │                                │  .csv, ...         │    dasbor peneliti           │
 └────────────────────────────────┘                    └──────────────────────────────┘
        ▲                                                         ▲
        │ data instrumen dari luar aplikasi                        │
        │ (pretest/posttest, angket, validasi ahli: Excel/Google Form) ──┘
```

### 1.3 Alternatif yang dipertimbangkan

| Opsi | Alasan tidak dipilih (versi 1) |
|---|---|
| Python berjalan di dalam aplikasi lewat **Pyodide** (WebAssembly) | Unduhan sangat besar (puluhan MB jika memakai pandas/scipy) dan lambat di HP RAM 2 GB. Siswa juga tidak butuh statistik inferensial di aplikasi |
| **Backend Python** (FastAPI/Flask) di server | Butuh server dan internet, sehingga aplikasi tidak bisa offline; ada biaya hosting; data anak keluar dari perangkat. Direncanakan untuk versi 2 (dasbor guru) |
| Seluruh aplikasi ditulis dengan Python (Kivy/BeeWare) | Dukungan web lemah, sulit dijadikan PWA |
| TypeScript | Lebih aman dari bug, tetapi Anda memilih JavaScript. Sebagai gantinya dipakai JSDoc dan ESLint untuk mengecek tipe secara ringan |

## 2. Tech Stack

### 2.1 Aplikasi siswa (JavaScript)

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| Bahasa | JavaScript (ES2022) + komentar **JSDoc** untuk tipe | Logika aplikasi |
| UI | React 18 (file `.jsx`) | Komponen antarmuka |
| Build | Vite | Server pengembangan dan build |
| Styling | Tailwind CSS | Token warna sesuai docs/04 |
| Routing | React Router | Navigasi antarlayar |
| State | Zustand | State global |
| Penyimpanan | Dexie.js (IndexedDB) | Database lokal, offline |
| PWA | vite-plugin-pwa (Workbox) | Bisa dipasang dari browser dan berjalan offline |
| APK Android | Capacitor + plugin `app`, `status-bar`, `splash-screen`, `keyboard`, `haptics` (opsional) | Membungkus web menjadi APK; menangani tombol kembali, status bar, keyboard, getaran (docs/13 bagian 10) |
| Kompatibilitas HP lama | `build.target` Vite / `@vitejs/plugin-legacy` (jika dibutuhkan setelah uji perangkat) | Agar berjalan di WebView Android 8 yang jarang diperbarui |
| Grafik | SVG langsung di React | Model batang, stimulus brosur/struk/grafik |
| Test | Vitest + Testing Library | Unit test |
| Kualitas | ESLint + Prettier | Gaya kode dan deteksi bug |
| Hosting | GitHub Pages / Netlify / Vercel (gratis, HTTPS) | PWA wajib memakai HTTPS |

### 2.2 Analisis statistik (Python)

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| Bahasa | Python 3.11+ | Analisis data |
| Lingkungan | `venv` + `requirements.txt` | Versi library terkunci |
| Data | pandas, numpy | Membaca CSV, mengolah tabel |
| Statistik | scipy, statsmodels, pingouin | Shapiro–Wilk, uji-t, Wilcoxon, Cronbach's alpha, Cohen's kappa, ukuran efek |
| Grafik | matplotlib | Grafik untuk laporan/skripsi |
| Laporan | openpyxl | Ekspor tabel ke Excel |
| Eksplorasi | Jupyter Notebook | Analisis interaktif, mudah dilampirkan |
| Dasbor (opsional) | Streamlit | Dasbor peneliti/guru yang dijalankan di laptop |
| Test | pytest | Memastikan rumus statistik benar |
| Kualitas | ruff | Gaya kode Python |

> Pakai versi stabil terbaru saat proyek dimulai, lalu kunci versinya di `package-lock.json` dan `requirements.txt`.

## 3. Struktur Folder

```
pasar-pintar/
├── PRD.md
├── CLAUDE.md
├── README.md
├── docs/
│
├── app/                         # ===== JAVASCRIPT: aplikasi siswa =====
│   ├── public/
│   │   ├── icons/               # ikon PWA & Android
│   │   ├── fonts/
│   │   └── manifest.webmanifest # dibuat otomatis oleh vite-plugin-pwa
│   ├── src/
│   │   ├── main.jsx
│   │   ├── app/                 # App.jsx, routes.jsx, Layout.jsx
│   │   ├── features/
│   │   │   ├── onboarding/
│   │   │   ├── beranda/
│   │   │   ├── belajar/         # KartuIstilah, ContohLengkap, ContohRumpang, Latihan,
│   │   │   │                    # PemecahSoal, PilihOperasi, Pembahasan, JelaskanKeTeman
│   │   │   ├── literasi/        # TantanganLiterasi, SiklusLiterasi, ManaLebihHemat,
│   │   │   │   └── stimulus/    # DetektifPromo; Brosur, Struk, LabelCoret, TokoDaring, TabelJualan
│   │   │   ├── simulasi/        # PilihSkenario, SimulasiBelanja, SimulasiBerjualan, Struk
│   │   │   ├── rapor/
│   │   │   ├── pasang/          # TombolPasang (PWA), halaman unduh APK
│   │   │   └── pengaturan/
│   │   ├── components/          # LabelHarga, BarModel, InputRupiah, Stimulus, ...
│   │   ├── lib/
│   │   │   ├── matematika/      # diskon.js, untungRugi.js, pajak.js, persen.js,
│   │   │   │                    # penawaran.js, format.js
│   │   │   ├── generator/       # buatSoal.js, acak.js
│   │   │   ├── adaptif/         # aturan.js
│   │   │   ├── db/              # schema.js, repo.js
│   │   │   └── ekspor/          # eksporCsv.js  ← kontrak data ke Python
│   │   ├── store/
│   │   ├── content/             # JSON: modul, istilah, contoh, template-soal, literasi, simulasi
│   │   ├── types/               # skema.js (JSDoc @typedef)
│   │   └── styles/
│   ├── tests/                   # Vitest
│   ├── android/                 # dibuat oleh Capacitor
│   ├── capacitor.config.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── analisis/                    # ===== PYTHON: analisis statistik =====
│   ├── data/
│   │   ├── mentah/              # CSV ekspor aplikasi + data instrumen (JANGAN di-commit)
│   │   ├── contoh/              # data dummy untuk latihan dan test (boleh di-commit)
│   │   └── olahan/              # hasil gabungan (JANGAN di-commit)
│   ├── pasar_pintar_analisis/   # paket Python
│   │   ├── __init__.py
│   │   ├── muat_data.py         # baca + cek kolom CSV sesuai docs/06
│   │   ├── deskriptif.py        # rata-rata, SD, frekuensi, kategori
│   │   ├── instrumen.py         # validitas butir, reliabilitas, kesukaran, daya beda
│   │   ├── validasi_ahli.py     # skor & kategori validitas
│   │   ├── kepraktisan.py       # angket + SUS
│   │   ├── efektivitas.py       # N-Gain, normalitas, uji-t / Wilcoxon, ukuran efek
│   │   ├── beban_kognitif.py    # Paas, efisiensi instruksional
│   │   ├── literasi.py          # skor per proses, rubrik, Cohen's kappa
│   │   ├── log_aplikasi.py      # miskonsepsi, penggunaan petunjuk
│   │   └── grafik.py            # gaya grafik seragam untuk laporan
│   ├── notebooks/               # 01_eksplorasi.ipynb, 02_efektivitas.ipynb, ...
│   ├── skrip/
│   │   └── jalankan_semua.py    # satu perintah → semua tabel & grafik
│   ├── dasbor/
│   │   └── app.py               # Streamlit (opsional)
│   ├── hasil/                   # tabel .xlsx dan grafik .png (JANGAN di-commit)
│   ├── tests/                   # pytest
│   ├── requirements.txt
│   └── pyproject.toml           # konfigurasi ruff & pytest
│
└── .gitignore                   # abaikan analisis/data/mentah, analisis/hasil, node_modules, .venv
```

## 4. Modul Inti JavaScript

### 4.1 `app/src/lib/matematika` (fungsi murni, wajib di-test)

```js
// Semua nominal dalam bilangan bulat rupiah.

/** @param {number} hargaAwal @param {number} persenDiskon @returns {number} */
export function potonganDiskon(hargaAwal, persenDiskon) {}

export function hargaSetelahDiskon(hargaAwal, persenDiskon) {}
export function diskonBertingkat(hargaAwal, daftarPersen) {}

/** @returns {{ jenis: 'untung'|'rugi'|'impas', nilai: number }} */
export function untungAtauRugi(hargaBeli, hargaJual) {}

export function persenUntungRugi(hargaBeli, hargaJual) {}
export function hargaJualDariPersen(hargaBeli, persen, jenis) {}
export function hargaBeliDariPersen(hargaJual, persen, jenis) {}
export function ppn(harga, persenPajak) {}
export function bandingkanPenawaran(daftarPenawaran) {}   // diskon %, beli X gratis Y, ongkir
export function hargaPerSatuan(harga, jumlah) {}
export function formatRupiah(n) {}    // 1250000 → "Rp1.250.000"
export function parseRupiah(s) {}     // "1.250.000" → 1250000
export function formatPersen(n) {}    // 12.5 → "12,5%"
```

Fungsi ini menghitung **kunci jawaban** untuk siswa, sehingga termasuk data umum (JavaScript), bukan statistik.

### 4.2 `lib/generator`, pemeriksa jawaban, `lib/adaptif`

- Generator: template JSON + *seed* → soal jadi beserta kuncinya
- Pemeriksa: membandingkan jawaban dengan kunci dan mendeteksi miskonsepsi
- Adaptif: aturan naik/turun level (docs/02 bagian 3), berupa aturan sederhana, bukan statistik

### 4.3 `lib/ekspor/eksporCsv.js` (kontrak data ke Python)

- Nama kolom, urutan, dan format **harus sama persis** dengan docs/06 bagian 3
- Pengodean UTF-8, pemisah koma, desimal memakai **titik** di CSV (agar mudah dibaca pandas). Koma desimal hanya dipakai di tampilan aplikasi
- Waktu dalam format ISO 8601
- Setiap perubahan kolom wajib dicatat di docs/06 dan menaikkan `versiSkema` di baris metadata

## 5. Modul Inti Python

| Modul | Fungsi utama | Keterangan |
|---|---|---|
| `muat_data.py` | `muat_csv(folder)`, `gabung_siswa()`, `cek_kolom()` | Gagal dengan pesan jelas jika kolom tidak sesuai kontrak |
| `deskriptif.py` | `ringkasan()`, `kategori_skor()` | Rata-rata, SD, min, maks, frekuensi |
| `instrumen.py` | `validitas_butir()`, `cronbach_alpha()`, `kr20()`, `tingkat_kesukaran()`, `daya_beda()` | Uji coba instrumen pretest/posttest |
| `validasi_ahli.py` | `skor_validasi()`, `kategori_validitas()` | Kriteria ≥ 3,25 valid (docs/08) |
| `kepraktisan.py` | `skor_angket()`, `skor_sus()` | SUS: butir ganjil (skor − 1), butir genap (5 − skor), jumlah × 2,5 |
| `efektivitas.py` | `n_gain()`, `kategori_n_gain()`, `uji_normalitas()`, `uji_beda_berpasangan()`, `ukuran_efek()` | Memilih uji-t atau Wilcoxon secara otomatis berdasarkan hasil uji normalitas |
| `beban_kognitif.py` | `ringkasan_paas()`, `efisiensi_instruksional()` | E = (z_skor − z_paas) / √2 |
| `literasi.py` | `skor_per_proses()`, `skor_rubrik()`, `kappa_cohen()` | Untuk T6 |
| `log_aplikasi.py` | `frekuensi_miskonsepsi()`, `penggunaan_petunjuk()` | Evaluasi konten |
| `grafik.py` | `simpan_grafik()` | Ukuran, font, dan warna seragam untuk laporan |

## 6. Build, Distribusi, dan Menjalankan Analisis

### JavaScript (aplikasi)
```bash
cd app
npm install
npm run dev                  # pengembangan di http://localhost:5173
npm run build                # hasil di app/dist → unggah ke hosting (PWA)
npx cap sync android         # siapkan proyek Android
# Android Studio → Build → Generate Signed APK → unggah APK ke situs/GitHub Releases
```

### Python (analisis)
```bash
cd analisis
python -m venv .venv
.venv\Scripts\activate       # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
pytest                       # cek rumus statistik
python skrip/jalankan_semua.py --data data/mentah --keluaran hasil
streamlit run dasbor/app.py  # opsional
```

## 7. Keamanan dan Privasi

- Aplikasi siswa tidak mengirim data ke internet. Data penelitian berpindah lewat ekspor CSV manual (misalnya dikirim ke peneliti lewat kabel/flashdisk/Drive pribadi peneliti)
- Ekspor dilindungi PIN peneliti
- Folder `analisis/data/mentah` dan `analisis/hasil` **tidak boleh** di-commit ke Git (masuk `.gitignore`)
- Data hanya memakai kode siswa (S01, S02, …)
- APK ditandatangani dengan *keystore* milik pengembang. Simpan *keystore* dan kata sandinya dengan aman, karena keduanya dibutuhkan untuk setiap pembaruan
- Izin Android minimal: tanpa kamera, lokasi, atau kontak

## 7b. Perantara AI (sudah dibuat)

Fitur Pinta AI memakai **Cloudflare Worker** (`ai-worker/worker.js`, JavaScript) sebagai perantara ke API DeepSeek. Worker ini menyimpan API key sebagai Secret, memegang aturan AI, membatasi asal permintaan dan jumlah permintaan, serta menyembunyikan jawaban akhir. Rincian ada di [14-integrasi-ai.md](14-integrasi-ai.md). Worker hanya meneruskan permintaan AI dan tidak menyimpan data siswa.

## 8. Rencana Versi 2

- Backend **Python (FastAPI)** + database (misalnya PostgreSQL/Supabase) untuk sinkronisasi progres dan dasbor guru daring. Statistik kelas tetap dihitung dengan Python, sesuai aturan pembagian bahasa
- Kode kelas dari guru
- Sinkronisasi hanya dengan persetujuan orang tua/sekolah
