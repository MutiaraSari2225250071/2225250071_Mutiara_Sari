# 08 — Rencana Pengujian dan Evaluasi

Pengujian terbagi dua: **pengujian teknis** (apakah aplikasi berjalan benar) dan **pengujian pedagogis** (apakah aplikasi valid, praktis, dan efektif). Kerangka *valid–praktis–efektif* mengikuti Nieveen (1999), yang lazim dipakai dalam penelitian pengembangan.

## 1. Pengujian Teknis

### 1.1 Unit test JavaScript (otomatis, Vitest)

| Area | Contoh kasus uji |
|---|---|
| `potonganDiskon` | 80.000 & 20% → 16.000; diskon 0% → 0; diskon 100% → 80.000 |
| `hargaSetelahDiskon` | 120.000 & 25% → 90.000 |
| `diskonBertingkat` | 100.000, [20, 10] → 72.000 (bukan 70.000) |
| `untungAtauRugi` | HB 2.400.000, HJ 2.700.000 → untung 300.000; HB = HJ → impas |
| `persenUntungRugi` | HB 500.000, HJ 400.000 → 20 (rugi) |
| `hargaJualDariPersen` | HB 260.000, rugi 9% → 236.600 |
| `ppn` | 90.000 & 10% → 9.000 |
| `formatRupiah` | 1250000 → "Rp1.250.000"; 0 → "Rp0" |
| `parseRupiah` | "1.250.000" → 1250000; "Rp 1.250.000" → 1250000 |
| `bandingkanPenawaran` | 3 buku @12.000: diskon 30% → 25.200; beli 2 gratis 1 → 24.000; termurah = B |
| `hargaPerSatuan` | 3 bungkus ¼ kg @4.000 → Rp16.000 per kg |
| Generator | Untuk 1.000 seed acak di level 1: semua jawaban bilangan bulat; semua nilai positif; harga akhir < harga awal |
| Pemeriksa jawaban | Jawaban = potongan saat ditanya harga akhir → kode MK1 |

Target: **seluruh** fungsi `lib/matematika` dan `lib/generator` tercakup test.

### 1.1b Unit test Python (otomatis, pytest)

| Fungsi | Contoh kasus uji |
|---|---|
| `hitung_n_gain` | pre 40, post 70, maks 100 → 0,5 (sedang); pre = maks → ditangani tanpa pembagian nol |
| `skor_sus` | jawaban [5,1,5,1,5,1,5,1,5,1] → 100; semua 3 → 50 |
| `cronbach_alpha` | dataset contoh → hasil sama dengan SPSS/Excel (selisih < 0,001) |
| `efisiensi_instruksional` | z_skor 1, z_usaha −1 → √2 ≈ 1,414 |
| `uji_beda_berpasangan` | data normal → memilih uji-t; data tidak normal → memilih Wilcoxon |
| `kappa_cohen` | dua penilai identik → 1,0 |
| `muat_csv` | kolom hilang → error dengan pesan jelas; `versiSkema` beda → error |

### 1.1c Uji kontrak data (JavaScript → Python)

- [ ] Ekspor dari aplikasi dengan data uji → dibaca `muat_data.py` tanpa error
- [ ] Nilai desimal, waktu, dan boolean terbaca dengan tipe yang benar di pandas

### 1.2 Uji fungsional (manual, daftar periksa)

- [ ] Alur lengkap 1 modul dari kartu istilah sampai ringkasan
- [ ] Progres tersimpan setelah aplikasi ditutup dan dibuka lagi
- [ ] Aplikasi berjalan dalam mode pesawat (offline)
- [ ] Ekspor CSV terbuka dengan benar di Excel/Google Sheets
- [ ] Tombol kembali Android berperilaku wajar
- [ ] Keyboard numerik muncul di kolom angka
- [ ] Aplikasi terbuka di browser lewat QR code
- [ ] PWA bisa dipasang di Android (Chrome) dan iPhone (Safari), lalu berjalan dalam mode pesawat
- [ ] APK terpasang tanpa Play Store, dan pembaruan APK terpasang di atas versi lama tanpa menghapus progres

### 1.3 Uji perangkat (smartphone sebagai prioritas)

| Perangkat | Cara pakai yang diuji | Target |
|---|---|---|
| HP Android RAM 2 GB, Android 8–10 (**wajib perangkat nyata**) | Browser, PWA, APK | Lancar, tidak *force close*, Lighthouse Mobile ≥ 90 |
| HP Android RAM 4 GB+, Android 12+, layar berponi, navigasi gestur | PWA, APK | Lancar, area aman benar |
| iPhone (Safari) | Browser, PWA | Semua fitur berjalan; zoom input tidak terjadi |
| Lebar 320 dp (emulasi DevTools) | Browser | Tanpa gulir horizontal |
| Tablet / laptop (Chrome, Edge) | Browser, PWA | Tampilan rapi di tengah (maks 640 px) |

**Alat:** Chrome DevTools (*device mode* + CPU 4× lebih lambat + jaringan "Slow 3G"), Lighthouse Mobile, `chrome://inspect` untuk debugging HP Android lewat kabel USB.

**Skenario khusus smartphone:**
- [ ] Ketik jawaban dengan Keypad Rupiah: soal dan panel Diketahui tetap terlihat
- [ ] Ada telepon masuk / pindah aplikasi di tengah soal → kembali ke soal yang sama
- [ ] Aplikasi ditutup paksa dari daftar aplikasi terbaru → progres tetap ada
- [ ] Tombol/gestur kembali di setiap layar
- [ ] Putar layar ke lanskap di tengah soal → jawaban tidak hilang
- [ ] Skala huruf sistem 130% dan mode gelap
- [ ] Dua profil di satu HP → data tidak tercampur

### 1.4 Uji kegunaan (usability)

- **Think-aloud** dengan 3–5 siswa: siswa diminta menyelesaikan 3 tugas sambil menyuarakan pikirannya.
- **SUS (System Usability Scale)**, 10 butir, dalam Bahasa Indonesia yang disederhanakan untuk siswa SMP. Target ≥ 68.

## 2. Pengujian Pedagogis

> Semua analisis statistik pada bagian 2 dikerjakan dengan **Python** (folder `analisis/`, lihat docs/12).

### 2.1 Kevalidan

| Validator | Aspek yang dinilai | Instrumen |
|---|---|---|
| Ahli materi (dosen pendidikan matematika / guru) | Kesesuaian dengan CP/TP, kebenaran konsep, kesesuaian soal dengan level, bahasa | Lembar validasi skala Likert 1–4 |
| Ahli media (dosen media/TI) | Tampilan, navigasi, keterbacaan, konsistensi, penerapan prinsip CLT/multimedia | Lembar validasi skala Likert 1–4 |

Kriteria (usulan): rata-rata ≥ 3,25 valid; 2,5–3,24 cukup valid (revisi); < 2,5 tidak valid.

### 2.2 Kepraktisan

- Angket respons siswa (kemudahan, kemenarikan, kebermanfaatan); skala 1–4
- Angket respons guru
- SUS
- Catatan observasi keterlaksanaan

### 2.3 Keefektifan

| Data | Instrumen | Analisis |
|---|---|---|
| Hasil belajar | Pretest & posttest (soal setara, sudah divalidasi dan diuji reliabilitasnya) | N-Gain; uji-t berpasangan (atau Wilcoxon jika tidak normal) |
| Beban kognitif | Skala Paas (di aplikasi) + kuesioner tiga jenis beban (opsional, Leppink dkk., 2013) | Statistik deskriptif; bandingkan dengan pengerjaan LKPD kertas |
| Efisiensi instruksional | Gabungan skor posttest dan Paas | Rumus Paas & van Merriënboer (1993) |
| Proses | Log aplikasi (docs/06) | Frekuensi miskonsepsi, penggunaan petunjuk |
| Literasi matematika | Tes literasi matematika (pretest & posttest, bagian 2.4) | N-Gain total dan per proses; uji-t berpasangan / Wilcoxon |
| Literasi (proses) | Log `jawabanLiterasi` | Skor per proses, kualitas alasan |

Desain usulan: *one-group pretest–posttest*. Jika memungkinkan, gunakan kelompok pembanding yang belajar dengan LKPD kertas, agar klaim "mengurangi beban ekstrinsik" lebih kuat.

### 2.4 Instrumen Tes Literasi Matematika

**Kisi-kisi (usulan, 10–12 butir, 60–80 menit):**

| Proses | Level kognitif | Konteks | Jumlah butir | Bentuk |
|---|---|---|---|---|
| Merumuskan | Pemahaman–Penerapan | Personal, sosial budaya | 3–4 | PG kompleks, isian |
| Menerapkan | Penerapan | Personal, sosial budaya | 3–4 | Isian, menjodohkan |
| Menafsirkan & mengevaluasi | Penalaran | Personal, sosial budaya | 4 | Benar/keliru + alasan, uraian |

- Setiap butir memakai stimulus (brosur, struk, tabel) yang **berbeda** dari stimulus di aplikasi, agar yang diukur adalah transfer, bukan hafalan.
- Pretest dan posttest dibuat paralel (setara), divalidasi ahli, dan diuji coba untuk validitas butir, reliabilitas (Cronbach's alpha/KR-20), tingkat kesukaran, dan daya beda.
- Kategori hasil dapat mengacu pada level AKM (Perlu Intervensi Khusus, Dasar, Cakap, Mahir) atau rentang skor yang disepakati pembimbing.

**Rubrik alasan (uraian) — skor 0–3:**

| Skor | Kriteria |
|---|---|
| 3 | Keputusan benar, alasan memakai perhitungan yang benar dan mengaitkannya dengan konteks |
| 2 | Keputusan benar, alasan benar tetapi kurang lengkap (tanpa perhitungan atau tanpa kaitan konteks) |
| 1 | Keputusan benar tanpa alasan yang tepat, atau alasan masuk akal tetapi keputusan salah karena salah hitung |
| 0 | Tidak menjawab atau keputusan dan alasan keliru |

Disarankan memakai dua penilai dan menghitung kesepakatan antarpenilai (misalnya Cohen's kappa).

## 3. Tahapan Uji Coba

```
Validasi ahli ─► Revisi I ─► Uji perorangan (2–3 siswa) ─► Revisi II
             ─► Uji kelompok kecil (5–8 siswa) ─► Revisi III
             ─► Uji lapangan (1 kelas) ─► Analisis ─► Produk akhir
```

Pilih siswa uji perorangan dan kelompok kecil dengan kemampuan beragam (rendah, sedang, tinggi) berdasarkan rekomendasi guru.

## 4. Etika Penelitian

- Izin dari sekolah dan persetujuan tertulis orang tua/wali (*informed consent*) serta persetujuan siswa (*assent*)
- Data memakai kode siswa (S01, S02, …), bukan nama
- Rekaman dan foto disimpan aman; wajah siswa disamarkan jika dimuat di laporan
- Siswa boleh berhenti kapan saja tanpa konsekuensi
- Aplikasi tidak memengaruhi nilai rapor sekolah siswa

## 5. Kriteria Lolos Rilis

| Kriteria | Target |
|---|---|
| Unit test JavaScript (Vitest) dan Python (pytest) | 100% lulus |
| Instalasi tanpa toko aplikasi | PWA dan APK terpasang di perangkat uji |
| Bug kritis (salah hitung, *crash*, progres hilang) | 0 |
| Validasi ahli | ≥ 3,25 (valid) |
| SUS kelompok kecil | ≥ 68 |
| Kepraktisan | ≥ 3,25 (praktis) |
