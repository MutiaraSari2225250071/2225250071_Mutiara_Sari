# 10 — Pengembangan Literasi Matematika

## 1. Mengapa Literasi Matematika?

**Literasi matematika** adalah kemampuan seseorang untuk **merumuskan, menerapkan, dan menafsirkan** matematika dalam berbagai konteks kehidupan nyata, termasuk bernalar secara matematis dan memakai konsep, prosedur, fakta, serta alat matematika untuk menjelaskan dan memprediksi fenomena (kerangka PISA, OECD). Di Indonesia, kemampuan serupa diukur sebagai **numerasi** dalam Asesmen Nasional (AKM).

Aritmetika Sosial adalah materi yang sangat cocok untuk literasi matematika karena konteksnya langsung ada di kehidupan siswa: promo di minimarket, struk belanja, harga di toko daring, uang jajan, dan jualan di pasar.

Hasil wawancara S01 juga mendukung arah ini:

| Temuan | Kaitan dengan literasi |
|---|---|
| K03, DS01: materi dianggap berguna untuk kehidupan sehari-hari | Motivasi konteks nyata sudah ada |
| GL01, DS04: simulasi belanja membantu | Pemodelan situasi nyata |
| GL02: membandingkan dengan harga awal untuk mengecek | Benih proses **menafsirkan dan mengevaluasi** |
| GL05: memakai pola soal sebelumnya pada konteks berbeda | Benih **transfer** ke konteks baru |
| IL04, IL05: soal cerita berbelit, salah memilih operasi | Kelemahan pada proses **merumuskan** (matematisasi) |
| GL04: belum pernah menjelaskan penyelesaian ke teman | Kemampuan **komunikasi dan argumentasi** belum terlatih |

> Wawancara S01 tidak menanyakan literasi matematika secara langsung. Pertanyaan tambahan untuk responden berikutnya ada di bagian 9.

## 2. Kerangka Acuan

### 2.1 Proses matematis (PISA) → nama di aplikasi

| Proses PISA | Arti | Nama di aplikasi | Fitur yang melatih |
|---|---|---|---|
| **Formulate** (merumuskan) | Mengubah situasi nyata menjadi masalah matematika | **Pahami & Ubah** | Pemecah Soal Cerita (F-10), Pilih Operasi (F-13), Baca Stimulus (F-60) |
| **Employ** (menerapkan) | Memakai konsep, fakta, dan prosedur untuk mendapat hasil | **Hitung** | Langkah bertahap, kalkulator bertahap (F-14) |
| **Interpret & Evaluate** (menafsirkan dan mengevaluasi) | Mengembalikan hasil ke konteks, menilai kewajaran, mengambil keputusan | **Cek & Putuskan** | Cek Kewajaran (F-16), Mana Lebih Hemat (F-62), Detektif Promo (F-63) |
| **Mathematical reasoning** (penalaran, inti PISA 2022) | Bernalar dan berargumen | **Beri Alasan** | Pilih/Tulis Alasan (F-64), Jelaskan ke Teman (F-24) |

### 2.2 Siklus pemodelan matematis di aplikasi

Ketiga proses tadi ditampilkan sebagai **siklus 4 langkah** yang selalu sama di setiap soal literasi. Bentuk yang tetap ini sekaligus mengurangi beban kognitif.

```
      ┌──────────────────────┐
      │ 1. PAHAMI SITUASI    │  Apa yang terjadi? Informasi apa yang penting?
      │    (dunia nyata)     │
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐
      │ 2. UBAH KE MATEMATIKA│  Diketahui – Ditanya – Rumus/operasi
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐
      │ 3. HITUNG            │  Langkah bertahap
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐
      │ 4. CEK & PUTUSKAN    │  Masuk akal? Apa artinya bagi situasi?
      │    (kembali ke dunia │  Keputusan apa yang diambil? Alasannya?
      │     nyata)           │──► kembali ke 1 jika tidak masuk akal
      └──────────────────────┘
```

### 2.3 Kerangka AKM Numerasi

| Dimensi | Kategori | Penerapan di aplikasi |
|---|---|---|
| Konten | Bilangan; Aljabar; Pengukuran & Geometri; Data & Ketidakpastian | Utama: **Bilangan** (persen, rasio, operasi). Pendukung: **Aljabar** (hubungan HB–HJ–untung) dan **Data** (membaca tabel/grafik penjualan) |
| Level kognitif | Pemahaman; Penerapan; Penalaran | Setiap soal diberi tag level kognitif |
| Konteks | Personal; Sosial budaya; Saintifik | Personal: uang jajan, belanja. Sosial budaya: pasar tradisional, koperasi sekolah, pajak untuk fasilitas umum. Saintifik: jarang (misalnya data harga) |
| Bentuk soal | PG, PG kompleks, menjodohkan, isian, uraian | Semua bentuk tersedia (docs/03) |

> Kebijakan asesmen nasional bisa berubah. Cek dokumen kerangka asesmen terbaru dari Kemendikdasmen/BSKAP sebelum menyusun instrumen.

### 2.4 Kemampuan dasar matematis (fundamental capabilities, PISA 2012)

| Kemampuan | Contoh indikator di Aritmetika Sosial | Fitur |
|---|---|---|
| Komunikasi | Menjelaskan keputusan belanja dengan kalimat sendiri | F-64, F-24 |
| Matematisasi | Mengubah promo "beli 2 gratis 1" menjadi persen diskon | F-62, F-10 |
| Representasi | Membaca/membuat model batang, tabel harga, struk | F-12, F-32, F-60 |
| Penalaran & argumen | Menilai klaim "diskon 50% + 20% = 70%" | F-63 |
| Merancang strategi | Memilih kombinasi barang agar sesuai anggaran | F-30 |
| Bahasa simbol, formal, teknis | Memakai rumus %U = U/HB × 100% | Mode Belajar |
| Menggunakan alat matematika | Memakai kalkulator dengan tepat dan mengecek hasilnya | F-14, F-16 |

## 3. Menyelaraskan Literasi dengan Teori Beban Kognitif

Soal literasi memiliki **interaktivitas elemen tinggi**: stimulus panjang, informasi yang tidak relevan, dan keputusan terbuka. Jika diberikan terlalu awal, soal seperti ini justru membebani siswa (bertentangan dengan IL04 dan DS03). Karena itu ada empat aturan:

| Aturan | Penjelasan |
|---|---|
| **Skema dulu, literasi kemudian** | Soal literasi muncul setelah siswa menyelesaikan Latihan Mandiri suatu modul. Ini menjadi tahap **Tantangan Literasi** |
| **Kerumitan stimulus naik bertahap** | Level L1: stimulus 1 informasi, semua relevan. L2: 2–3 informasi, 1 pengecoh. L3: stimulus autentik lengkap (brosur/struk asli), beberapa pengecoh, keputusan terbuka |
| **Memilah informasi adalah keterampilan yang dilatih** | Di L1–L2, siswa dipandu menandai informasi yang dipakai dan yang tidak dipakai. Di L3, panduan ini dihilangkan (*fading*) |
| **Stimulus visual, bukan tulisan panjang** | Stimulus dibuat dalam bentuk visual (brosur, struk, label harga, tabel) berformat SVG yang tajam (EL03), sehingga teks panjang tidak diperlukan (DS03) |

## 4. Jenis Aktivitas Literasi

### 4.1 Baca Stimulus Autentik (F-60)

Siswa membaca bentuk informasi nyata, bukan soal cerita biasa:

| Jenis stimulus | Contoh | Modul |
|---|---|---|
| Label harga coret | ~~Rp150.000~~ Rp105.000 | M4 |
| Brosur promo minimarket | "Diskon 25%", "Beli 2 Gratis 1", "Hemat Rp5.000" | M4 |
| Struk belanja | Subtotal, diskon, PPN, total, tunai, kembalian | M4, M5 |
| Halaman toko daring | Harga, voucher, ongkos kirim, gratis ongkir minimal belanja | M4, M5 |
| Catatan jualan pedagang | Tabel modal, penjualan per hari, sisa barang | M1–M3 |
| Grafik penjualan sederhana | Diagram batang penjualan buah selama seminggu | M1–M2 |
| Daftar harga grosir vs eceran | Harga per lusin vs per buah | M1, M3 |

Semua stimulus dibuat sendiri (fiktif). Jangan memakai logo atau merek toko asli.

### 4.2 Mana Lebih Hemat? (F-62): membandingkan dan memutuskan

Contoh tugas:
- Toko A: diskon 30%. Toko B: beli 2 gratis 1. Kamu butuh 3 buku seharga Rp12.000 per buku. Pilih toko yang mana?
- Kemasan 1 kg Rp18.000 atau 3 bungkus ¼ kg Rp4.000 per bungkus. Mana yang harga per kg-nya lebih murah?
- Belanja daring Rp95.000 dengan ongkir Rp15.000, atau tambah barang Rp8.000 agar gratis ongkir (minimal belanja Rp100.000)?

Jawaban terdiri atas **pilihan + alasan**. Skor penuh hanya jika alasannya benar.

### 4.3 Detektif Promo (F-63): mengevaluasi klaim

Siswa menilai apakah suatu pernyataan **benar atau keliru** dan memilih alasannya:
- "Diskon 50% + 20% berarti diskon 70%." → Keliru; diskon totalnya 60%.
- "Harga naik 10% lalu turun 10%, berarti harga kembali seperti semula." → Keliru.
- "Pedagang menjual rugi karena harga jualnya lebih murah daripada harga di toko lain." → Keliru; rugi dibandingkan dengan harga beli, bukan harga toko lain.
- "Kenapa minimarket menulis Rp9.900, bukan Rp10.000?" (diskusi, tanpa kunci tunggal)

### 4.4 Beri Alasan (F-64): komunikasi matematis

- Level awal: **memilih alasan** dari 3 pilihan (beban rendah)
- Level menengah: **melengkapi kalimat alasan** ("Toko A lebih hemat karena ... lebih kecil dari ...")
- Level lanjut: **menulis alasan singkat** (maksimal 2 kalimat). Di versi 1 alasan ini tidak dinilai otomatis; siswa menilai sendiri dengan contoh alasan yang baik, dan peneliti/guru dapat menilainya dari data ekspor memakai rubrik di docs/08

### 4.5 Misi Literasi di Pasar Pintar (F-65)

Simulasi diperluas dengan keputusan terbuka:
- **Misi Anggaran**: "Uangmu Rp50.000 untuk perlengkapan sekolah. Beli sebanyak mungkin barang wajib dan sisakan minimal Rp5.000." (merancang strategi)
- **Misi Pedagang**: "Kamu punya modal Rp200.000 untuk berjualan di bazar sekolah. Tentukan barang dan harga jual agar untung minimal 20%, tetapi harga tetap bersaing." (pemodelan terbuka, beberapa jawaban benar)
- **Misi Koperasi**: membaca catatan penjualan seminggu dan memutuskan barang mana yang perlu ditambah stoknya (membaca data)

### 4.6 Literasi Finansial Ringan (pengayaan)

Konteks yang dekat dengan siswa SMP: mengatur uang jajan, menabung untuk membeli barang, kebutuhan vs keinginan, membandingkan harga sebelum membeli. Bagian ini memperkuat konteks **personal** dan termasuk pengayaan (prioritas *Could*).

## 5. Level Tantangan Literasi

| Level | Stimulus | Proses dominan | Bantuan |
|---|---|---|---|
| **L1 — Kenali** | 1 stimulus sederhana, semua informasi relevan | Merumuskan + menerapkan | Siklus 4 langkah lengkap, informasi penting disorot |
| **L2 — Pilih** | 2–3 informasi, ada 1 pengecoh | Merumuskan + menafsirkan | Siswa menandai sendiri informasi yang dipakai; petunjuk tersedia |
| **L3 — Putuskan** | Stimulus autentik lengkap, beberapa pengecoh, keputusan terbuka | Menafsirkan, mengevaluasi, bernalar | Siklus hanya ditampilkan sebagai pengingat; siswa memberi alasan |

## 6. Contoh Soal Literasi Lengkap (M4–M5, Level L2)

**Stimulus (struk SVG):**

```
   TOKO SERBA ADA "MAJU"           (fiktif)
   ---------------------------------
   Sepatu olahraga      Rp250.000
   Diskon 20%          -Rp 50.000
   Kaos kaki            Rp 20.000
   ---------------------------------
   Subtotal             Rp220.000
   PPN 10%              Rp 22.000
   TOTAL                Rp242.000
   Tunai                Rp300.000
   Kembali              Rp 58.000
```

**Soal:**
1. *(Pemahaman)* Berapa harga sepatu setelah diskon? → Rp200.000
2. *(Penerapan)* Jika diskon sepatu 30%, berapa total yang harus dibayar? → (175.000 + 20.000) × 110% = Rp214.500
3. *(Penalaran, benar/keliru + alasan)* Rani berkata: "Karena ada PPN, diskon 20% jadi tidak ada artinya." Benar atau keliru? Alasannya? → Keliru. Tanpa diskon, totalnya (250.000 + 20.000) × 110% = Rp297.000, jadi Rani tetap hemat Rp55.000.

Tag: konten Bilangan · konteks Personal · proses Merumuskan/Menerapkan/Menafsirkan · level kognitif Pemahaman → Penalaran.

## 7. Indikator dan Pengukuran Literasi Matematika

| Indikator | Bukti di aplikasi | Data (docs/06) |
|---|---|---|
| Merumuskan situasi secara matematis | Benar di langkah Pemecah Soal dan Pilih Operasi pada soal literasi | `jawaban` dengan `proses = merumuskan` |
| Menerapkan konsep dan prosedur | Benar di langkah hitung | `proses = menerapkan` |
| Menafsirkan dan mengevaluasi hasil | Benar di Cek & Putuskan, Mana Lebih Hemat, Detektif Promo | `proses = menafsirkan` |
| Bernalar dan berargumen | Alasan yang dipilih/ditulis | `alasanSiswa`, skor rubrik |
| Memilah informasi relevan | Ketepatan menandai informasi pengecoh | `infoDitandai` |

Instrumen tes literasi (pretest–posttest) dan rubrik penilaian ada di docs/08 bagian 2.4.

## 8. Rapor Literasi (F-67)

Selain akurasi per modul, Rapor Saya menampilkan kekuatan siswa per proses dalam bahasa sederhana:

```
Kemampuan Literasimu
Pahami & Ubah     ●●●●○   Bagus!
Hitung            ●●●●●   Hebat!
Cek & Putuskan    ●●○○○   Ayo berlatih "Mana Lebih Hemat?"
Beri Alasan       ●●●○○
```

Tidak ada perbandingan dengan siswa lain.

## 9. Pertanyaan Wawancara Tambahan tentang Literasi

- "Pernahkah kamu memakai hitungan diskon atau untung-rugi di luar sekolah? Ceritakan."
- Tunjukkan brosur promo fiktif: "Kalau kamu belanja di sini, apa yang pertama kamu perhatikan?"
- "Diskon 30% atau beli 2 gratis 1, mana yang menurutmu lebih untung? Kenapa?"
- "Kalau hasil hitunganmu Rp2.000.000 untuk harga sebuah pensil, apa yang kamu lakukan?" (kebiasaan mengecek kewajaran)
- "Pernahkah kamu diminta menjelaskan alasan jawabanmu? Sulit atau mudah?"
