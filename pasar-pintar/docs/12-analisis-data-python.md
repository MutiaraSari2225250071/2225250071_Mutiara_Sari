# 12 — Analisis Data Statistik dengan Python

Sesuai aturan pembagian bahasa (docs/05 bagian 1.2), **semua data statistik diolah dengan Python** di folder `analisis/`. Aplikasi JavaScript hanya mengumpulkan dan mengekspor data mentah.

## 1. Alur Data

```
[Aplikasi siswa: JavaScript]                    [Di luar aplikasi]
  Rapor Saya → Ekspor (PIN)                      Pretest & posttest (kertas/Google Form)
  pasar-pintar_S01_2026-12-01_*.csv              Angket kepraktisan & SUS
           │                                     Lembar validasi ahli
           │                                     Kuesioner beban kognitif (opsional)
           ▼                                              │
  analisis/data/mentah/aplikasi/               analisis/data/mentah/instrumen/
           └──────────────┬───────────────────────────────┘
                          ▼
            muat_data.py  (baca + cek kolom)
                          ▼
            data/olahan/dataset_gabungan.csv
                          ▼
   ┌─────────┬────────────┬────────────┬──────────────┬────────────┐
   instrumen  validasi_ahli kepraktisan  efektivitas    beban_kognitif  literasi
   ▼                                                                    ▼
            hasil/tabel_*.xlsx   hasil/grafik_*.png   (dasbor Streamlit)
```

## 2. Format Data Instrumen (di luar aplikasi)

Simpan sebagai CSV/Excel di `analisis/data/mentah/instrumen/` dengan kolom tetap:

| File | Kolom |
|---|---|
| `pretest.csv`, `posttest.csv` | `kodeSiswa, butir_1, butir_2, …, butir_n` (skor per butir) |
| `tes_literasi_pre.csv`, `tes_literasi_post.csv` | `kodeSiswa, butir_1…butir_n` + file `kisi_literasi.csv`: `butir, proses, levelKognitif, konteks, skorMaks` |
| `rubrik_alasan.csv` | `kodeSiswa, idSoal, penilai, skor` (dua penilai untuk menghitung kappa) |
| `validasi_ahli.csv` | `validator, jenis (materi/media), aspek, butir, skor` |
| `angket_siswa.csv` | `kodeSiswa, butir_1…butir_n` |
| `sus.csv` | `kodeSiswa, q1…q10` (skala 1–5) |
| `kuesioner_beban.csv` (opsional) | `kodeSiswa, butir_1…butir_n` + pemetaan butir ke IL/EL/GL |

Data dari Google Form diunduh sebagai CSV, lalu nama kolomnya disesuaikan dengan tabel di atas.

## 3. Analisis yang Dilakukan

| Tujuan PRD | Analisis | Modul Python | Keluaran |
|---|---|---|---|
| Uji instrumen | Validitas butir (korelasi *product moment*/*point-biserial*), reliabilitas (Cronbach's alpha / KR-20), tingkat kesukaran, daya beda | `instrumen.py` | `tabel_uji_instrumen.xlsx` |
| T5 Kevalidan | Rata-rata skor per aspek dan total, kategori validitas | `validasi_ahli.py` | `tabel_validasi.xlsx`, grafik batang per aspek |
| T4 Kepraktisan | Rata-rata angket, kategori kepraktisan, skor SUS | `kepraktisan.py` | `tabel_kepraktisan.xlsx` |
| T3 Hasil belajar | Statistik deskriptif, N-Gain (kategori tinggi ≥ 0,7; sedang 0,3–0,7; rendah < 0,3), uji normalitas Shapiro–Wilk, uji-t berpasangan atau Wilcoxon, ukuran efek | `efektivitas.py` | `tabel_efektivitas.xlsx`, boxplot pre–post |
| T1 Beban kognitif | Rata-rata Paas per modul dan per level, efisiensi instruksional, perbandingan dengan LKPD kertas (jika ada) | `beban_kognitif.py` | `tabel_paas.xlsx`, grafik efisiensi |
| T6 Literasi | N-Gain tes literasi total dan per proses, skor per proses dari log aplikasi, kualitas alasan, Cohen's kappa rubrik | `literasi.py` | `tabel_literasi.xlsx`, grafik radar/batang per proses |
| T2 + evaluasi konten | Tingkat penyelesaian tahap, frekuensi miskonsepsi, penggunaan petunjuk | `log_aplikasi.py` | `tabel_log.xlsx` |

### Rumus penting (diimplementasikan dan diuji dengan pytest)

| Ukuran | Rumus |
|---|---|
| N-Gain (Hake) | g = (post − pre) / (skor maks − pre) |
| Skor SUS | [Σ(skor butir ganjil − 1) + Σ(5 − skor butir genap)] × 2,5 |
| Efisiensi instruksional (Paas & van Merriënboer, 1993) | E = (z_skor − z_usaha) / √2 |
| Cronbach's alpha | α = (k / (k − 1)) × (1 − Σσ²_butir / σ²_total) |
| Kategori validitas/kepraktisan | ≥ 3,25 valid/praktis; 2,50–3,24 cukup; < 2,50 kurang (usulan, sesuaikan dengan pembimbing) |

## 4. Aturan Kode Python

- Fungsi statistik ditulis sebagai **fungsi murni** di paket `pasar_pintar_analisis/`. Notebook hanya memanggil fungsi, tidak menulis ulang rumus.
- Setiap rumus memiliki **test pytest** dengan data contoh yang hasilnya sudah dihitung manual atau dicocokkan dengan SPSS/Excel.
- `muat_data.py` memeriksa nama kolom dan versi skema CSV. Jika tidak cocok, program berhenti dengan pesan yang jelas, misalnya *"Kolom 'durasiMs' tidak ditemukan di jawaban.csv"*.
- Data mentah tidak pernah diubah. Semua hasil olahan disimpan di `data/olahan/` dan `hasil/`.
- Grafik memakai gaya seragam (`grafik.py`) dan disimpan sebagai PNG 300 dpi agar siap dimasukkan ke skripsi.
- Nama fungsi dan variabel dalam Bahasa Indonesia *snake_case* (`hitung_n_gain`), mengikuti istilah di skripsi.

## 5. Data Contoh (Dummy)

Folder `analisis/data/contoh/` berisi data palsu (misalnya 30 siswa fiktif) dengan format persis sama. Gunanya:
- Mengembangkan dan menguji skrip sebelum data asli tersedia
- Menjadi data test pytest
- Aman di-commit ke Git karena bukan data siswa sungguhan

## 6. Dasbor Peneliti (opsional, Streamlit)

Dasbor dijalankan di laptop peneliti (`streamlit run dasbor/app.py`) dan tidak dipublikasikan ke internet. Isinya:
- Unggah folder CSV hasil ekspor
- Ringkasan kelas: rata-rata Paas, akurasi per modul, skor literasi per proses
- Grafik pre–post dan N-Gain per siswa (memakai kode siswa)
- Tombol unduh tabel Excel

## 7. Perintah Cepat

```bash
cd analisis
.venv\Scripts\activate
pytest                                                   # cek rumus
python skrip/jalankan_semua.py --data data/contoh --keluaran hasil   # coba dengan data dummy
python skrip/jalankan_semua.py --data data/mentah --keluaran hasil   # data asli
jupyter notebook notebooks/                              # analisis interaktif
```
