# 02 — Desain Pembelajaran Berbasis Teori Beban Kognitif

## 1. Landasan Teori Singkat

Teori Beban Kognitif (Sweller, 1988; Sweller, van Merriënboer & Paas, 1998, 2019) menyatakan bahwa **memori kerja terbatas** (sekitar 4 ± 1 unsur informasi baru sekaligus). Beban pada memori kerja terdiri atas:

| Jenis | Pengertian | Strategi di aplikasi |
|---|---|---|
| **Intrinsik** | Ditentukan oleh kerumitan materi dan banyaknya elemen yang saling berkaitan | **Dikelola**: urutan sederhana → kompleks, *pre-training*, *segmenting* |
| **Ekstrinsik** | Ditimbulkan oleh cara penyajian yang kurang baik | **Dikurangi**: tampilan bersih, *signaling*, tanpa *split-attention* |
| **Germane** | Usaha mental yang dipakai untuk membangun skema | **Didorong**: *self-explanation*, variasi konteks, simulasi bermakna |

> Rujukan yang disarankan untuk bab kajian teori: Sweller, Ayres & Kalyuga (2011) *Cognitive Load Theory*; Mayer (2021) *Multimedia Learning* (3rd ed.); Paas (1992) tentang skala beban mental; Renkl & Atkinson (2003) tentang *faded worked examples*. Cek kembali detail sitasi dari sumber aslinya.

## 2. Efek-Efek CLT yang Diterapkan

| Efek / prinsip | Penjelasan | Wujud di aplikasi |
|---|---|---|
| *Worked example effect* | Siswa pemula belajar lebih baik dari contoh lengkap daripada langsung memecahkan soal | Setiap modul dibuka dengan Contoh Lengkap |
| *Completion / fading effect* | Langkah contoh dikurangi bertahap agar siswa beralih ke mandiri | Contoh Rumpang: 1 langkah kosong → 2 langkah kosong → semua kosong |
| *Expertise reversal effect* | Bantuan yang berguna bagi pemula bisa mengganggu siswa yang sudah mahir | Jika 3 soal berturut-turut benar tanpa petunjuk, bantuan otomatis dikurangi; siswa bisa melewati contoh |
| *Split-attention effect* | Informasi yang terpisah menambah beban | Soal, model batang, dan kotak jawaban dalam satu layar; label nilai langsung menempel di batang |
| *Redundancy effect* | Informasi berulang yang tidak perlu menambah beban | Tidak menampilkan teks dan narasi yang identik bersamaan |
| *Signaling* | Penanda visual membantu fokus | Warna dan label tetap untuk jenis harga; sorotan pada kata kunci soal |
| *Segmenting* | Materi dipecah menjadi bagian kecil | Kartu materi pendek; soal cerita per kalimat |
| *Pre-training* | Mengenalkan konsep/istilah kunci sebelum materi utama | Modul M0 prasyarat dan kartu istilah di awal tiap modul |
| *Coherence* | Membuang hal yang tidak relevan | Tanpa gambar dekoratif, tanpa musik latar di mode belajar |
| *Variability effect* | Variasi konteks membantu transfer setelah skema dasar terbentuk | Soal Kembar dengan konteks berbeda; skenario simulasi beragam |
| *Self-explanation* | Menjelaskan langkah memperkuat skema | Fitur Jelaskan ke Teman dan Pilih Operasi |

## 3. Alur Belajar dalam Satu Modul

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. KARTU ISTILAH (pre-training)       2–3 kartu, ≤ 40 kata per kartu  │
│    "Harga Awal adalah ..."  [label biru]                              │
├─────────────────────────────────────────────────────────────────────┤
│ 2. CONTOH LENGKAP (worked example)    2 contoh                        │
│    Semua langkah ditampilkan, dibuka satu per satu dengan tombol      │
│    "Langkah berikutnya". Disertai model batang.                       │
├─────────────────────────────────────────────────────────────────────┤
│ 3. CONTOH RUMPANG (faded example)     2–3 contoh                      │
│    Rumpang-1: langkah terakhir dikosongkan                            │
│    Rumpang-2: dua langkah terakhir dikosongkan                        │
├─────────────────────────────────────────────────────────────────────┤
│ 4. LATIHAN MANDIRI                    10 soal, kesulitan naik         │
│    Level 1: angka kecil & bulat, soal 1 kalimat                       │
│    Level 2: angka sedang, soal cerita 2–3 kalimat                     │
│    Level 3: angka besar/tidak bulat, soal cerita 3–5 kalimat, data    │
│             pengecoh                                                  │
│    Tiap soal: Pemecah Soal → Pilih Operasi → Hitung → Cek Kewajaran   │
│               → Umpan balik → Pembahasan → (Soal Kembar bila salah)   │
├─────────────────────────────────────────────────────────────────────┤
│ 5. JELASKAN KE TEMAN (self-explanation) 1 aktivitas                   │
├─────────────────────────────────────────────────────────────────────┤
│ 5b. TANTANGAN LITERASI (docs/10)      2 stimulus × 3 soal (L1–L3)     │
│    Stimulus autentik → Pahami → Ubah → Hitung → Cek & Putuskan        │
│    → Beri Alasan                                                      │
├─────────────────────────────────────────────────────────────────────┤
│ 6. SKALA USAHA (Paas 1–9)  →  RINGKASAN MODUL                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Aturan adaptif sederhana (tanpa AI)

| Kondisi | Tindakan |
|---|---|
| Salah 2× berturut-turut di level yang sama | Tampilkan 1 contoh lengkap tambahan, lalu Soal Kembar |
| Salah di langkah hitung (operasinya sudah benar) | Tawarkan latihan singkat M0 (prasyarat) |
| Benar 3× berturut-turut tanpa petunjuk | Naik level; langkah Pemecah Soal menjadi opsional (*fading* bantuan) |
| Jawaban sama dengan nilai antara (misalnya besar potongan) | Umpan balik miskonsepsi khusus (lihat docs/03 bagian 5) |

## 4. Strategi Bantuan (Scaffolding) per Kesulitan

### 4.1 Persentase (IL01, EL05)

Urutan konsep:
1. Persen = "per seratus" → visual 100 kotak (grid 10×10).
2. 10% = 1/10, 50% = 1/2, 25% = 1/4 → **persen patokan**.
3. Strategi "pecah persen": 15% = 10% + 5% (5% = setengah dari 10%).
4. Rumus umum: (persen / 100) × nilai.

### 4.2 Membedakan jenis harga (IL02)

- Warna dan label tetap: **Harga Awal** (biru) · **Potongan** (oranye) · **Harga Akhir** (hijau).
- Model batang:

```
Harga Awal  ████████████████████████████████  Rp80.000
            ├──────── Harga Akhir ────────┤├Potongan┤
            ██████████████████████████████ ░░░░░░░░
                    Rp64.000                Rp16.000 (20%)
```

- Pertanyaan pemeriksa: "Yang ditanya **berapa yang dibayar** atau **berapa yang dihemat**?"

### 4.3 Soal cerita panjang (IL04)

Pemecah Soal Cerita:
1. Soal ditampilkan per kalimat.
2. Siswa mengetuk angka/informasi penting, lalu memilih labelnya (Harga Awal / Diskon / ...).
3. Informasi masuk ke panel **Diketahui** yang tetap terlihat.
4. Siswa memilih **Ditanya** dari pilihan.
5. Panel Diketahui–Ditanya tetap terlihat saat menghitung (mencegah *split-attention*).

### 4.4 Memilih operasi (IL05)

Sebelum mengisi angka, siswa memilih rumus:

```
Untuk mencari HARGA AKHIR, rumus mana yang tepat?
( ) Harga Awal + Potongan
(•) Harga Awal − Potongan
( ) Potongan − Harga Awal
```

Jika salah: "Setelah diskon, harga menjadi lebih **murah**. Jadi, harga awal perlu **dikurangi**."

### 4.5 Keuntungan dan persentase untung (EL04)

- Gunakan cerita berjualan buah (K02) sebagai konteks utama.
- Tekankan **dasar persen adalah Harga Beli** (miskonsepsi umum: membagi dengan harga jual).
- Tambahkan 1 contoh lengkap ekstra dibandingkan modul lain.

### 4.6 Pengecekan (GL02)

Cek Kewajaran otomatis setelah menjawab:
- Diskon: harga akhir < harga awal? potongan < harga awal?
- Untung: harga jual > harga beli?
- Pajak: total > harga sebelum pajak?

## 5. Mode Pasar Pintar (Simulasi)

Simulasi ditempatkan **setelah** siswa menguasai skema dasar di Mode Belajar, karena simulasi punya banyak elemen (anggaran, beberapa barang, diskon berbeda) dan bisa membebani pemula.

| Level | Simulasi Belanja | Simulasi Berjualan |
|---|---|---|
| 1 | 1 barang, diskon 10%/50%, anggaran cukup | Beli 1 jenis buah, jual dengan harga ditentukan, hitung untung/rugi |
| 2 | 2–3 barang, diskon berbeda, cek anggaran | Tentukan harga jual sendiri agar untung tertentu (Rp) |
| 3 | 3–5 barang, diskon + PPN, struk lengkap | Target persentase untung; sebagian buah busuk (rugi) seperti soal LKPD |

**Batas elemen game** (agar tidak menjadi beban ekstrinsik): tanpa musik saat menghitung, animasi ≤ 0,5 detik, tanpa timer di Level 1–2, dan pesan kesalahan yang mendidik (bukan sekadar "Game Over").

## 6. Hubungan Desain CLT dengan Literasi Matematika

Latihan dalam Mode Belajar sudah memuat siklus literasi dalam bentuk yang dipandu. Tantangan Literasi lalu mengurangi panduan itu secara bertahap:

| Langkah latihan | Proses literasi (PISA) | Di Tantangan Literasi |
|---|---|---|
| Pemecah Soal Cerita (Diketahui–Ditanya) | Merumuskan | Siswa memilah sendiri informasi relevan dari stimulus autentik |
| Pilih Operasi | Merumuskan | Tanpa pilihan di L3; siswa menentukan sendiri |
| Hitung bertahap | Menerapkan | Langkah tidak dipecah di L3 |
| Cek Kewajaran | Menafsirkan & mengevaluasi | Ditambah keputusan ("toko mana yang dipilih?") |
| Jelaskan ke Teman | Penalaran & komunikasi | Beri Alasan untuk setiap keputusan |

Jadi, CLT dan literasi tidak bertentangan. CLT memastikan skema terbentuk lebih dulu dengan beban yang terkendali, lalu literasi melatih **transfer** skema itu ke situasi nyata yang lebih kompleks (*variability effect*). Rincian ada di [10-literasi-matematika.md](10-literasi-matematika.md).

## 7. Pengukuran Beban Kognitif di Aplikasi

- **Skala Paas (1–9)** setelah setiap set latihan:
  "Seberapa besar usaha yang kamu keluarkan untuk mengerjakan soal tadi?"
  1 = sangat-sangat kecil … 9 = sangat-sangat besar.
- Data yang dicatat per soal: waktu pengerjaan, jumlah petunjuk dibuka, benar/salah per langkah, jawaban yang diberikan.
- Opsional untuk penelitian: kuesioner tiga jenis beban (misalnya instrumen Leppink dkk., 2013) diberikan di luar aplikasi (kertas atau Google Form) setelah uji coba.
