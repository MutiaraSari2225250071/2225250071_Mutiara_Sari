# 03 — Spesifikasi Konten: Materi dan Bank Soal

## 1. Acuan Kurikulum

**Kurikulum Merdeka, Fase D (kelas VII–IX), elemen Bilangan dan Aljabar.** Aritmetika Sosial biasanya ada di kelas VII sebagai penerapan rasio, persen, dan operasi bilangan dalam masalah sehari-hari.

> Sesuaikan rumusan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) dengan dokumen CP resmi terbaru dan modul ajar sekolah tempat penelitian.

### Tujuan Pembelajaran (usulan)

| Kode | Tujuan Pembelajaran | Modul |
|---|---|---|
| TP1 | Siswa dapat menentukan harga beli, harga jual, untung, dan rugi dalam masalah jual beli | M1 |
| TP2 | Siswa dapat menghitung persentase untung dan rugi terhadap harga beli | M2 |
| TP3 | Siswa dapat menentukan harga jual atau harga beli jika persentase untung/rugi diketahui | M3 |
| TP4 | Siswa dapat menghitung besar diskon dan harga setelah diskon | M4 |
| TP5 | Siswa dapat menghitung pajak (PPN) dan total harga yang dibayar | M5 |
| TP6 | Siswa dapat menyelesaikan masalah kontekstual yang menggabungkan diskon, pajak, dan untung/rugi | Simulasi |
| TP7 | Siswa dapat membaca informasi dari stimulus nyata (brosur, struk, tabel), membandingkan penawaran, dan mengambil keputusan beserta alasannya (literasi matematika) | Tantangan Literasi |

## 2. Peta Materi dan Prasyarat

```
M0 Prasyarat (perkalian/pembagian bilangan besar, pecahan ↔ desimal ↔ persen)
 │
 ├──► M1 Harga Beli, Harga Jual, Untung, Rugi
 │      └──► M2 Persentase Untung & Rugi
 │             └──► M3 Harga Jual/Beli dari Persentase
 │
 └──► M4 Diskon
        └──► M5 Pajak (PPN)
                 └──► Simulasi Belanja Level 3 (diskon + PPN)
M1–M3 ──► Simulasi Berjualan
```

## 3. Isi per Modul

### M0 — Pemanasan Prasyarat
- Perkalian dan pembagian dengan kelipatan 10, 100, 1.000 (misalnya 25.000 × 10 = 250.000)
- Pecahan → persen: 1/2 = 50%, 1/4 = 25%, 1/5 = 20%, 1/10 = 10%
- Persen dari bilangan: 10% dari 45.000, 25% dari 80.000
- Format: 10 soal kilat pilihan ganda/isian singkat, tanpa soal cerita.

### M1 — Harga Beli, Harga Jual, Untung, Rugi
- Kartu istilah: Harga Beli, Harga Jual, Untung (Laba), Rugi
- Rumus: Untung = HJ − HB (jika HJ > HB); Rugi = HB − HJ (jika HB > HJ)
- Konteks: warung buah (mangga, jambu), sesuai K02

### M2 — Persentase Untung dan Rugi
- % Untung = Untung / HB × 100%; % Rugi = Rugi / HB × 100%
- Penekanan: **pembaginya Harga Beli**
- Contoh lengkap ekstra (EL04)

### M3 — Menentukan Harga dari Persentase
- HJ = HB + (%U × HB) atau HJ = (100% + %U) × HB
- HJ = HB − (%R × HB) atau HJ = (100% − %R) × HB
- Mencari HB jika HJ dan % diketahui: HB = HJ / (100% + %U); ditempatkan di Level 3 karena lebih sulit

### M4 — Diskon
- Kartu istilah: Harga Awal, Diskon (%), Potongan (Rp), Harga Setelah Diskon
- Potongan = %D × Harga Awal; Harga Akhir = Harga Awal − Potongan
- Sesuai DS02: setelah 1 contoh lengkap, siswa langsung mencoba
- Pengayaan: diskon bertingkat (misalnya 20% + 10%), bukan 30%

### M5 — Pajak (PPN)
- Kartu materi: apa itu pajak, untuk apa pajak dipakai (DS02: "materi pajak perlu dijelaskan")
- PPN = %PPN × Harga; Total = Harga + PPN
- Urutan diskon lalu pajak: pajak dihitung dari harga **setelah** diskon
- Tarif: pakai **10%** untuk latihan dasar (mudah dihitung); tarif aktual yang berlaku saat penelitian sebagai pengayaan (cek peraturan terbaru)

### M6–M7 (Opsional, versi 1.1)
- Bruto, neto, tara
- Bunga tunggal tabungan dan pinjaman

## 4. Format Soal

### 4.1 Tipe soal

| Tipe | Kode | Dipakai untuk |
|---|---|---|
| Pilihan ganda | `pg` | Pilih operasi, konsep, M0 |
| Isian angka | `isian` | Jawaban rupiah/persen |
| Langkah bertahap | `bertahap` | Contoh rumpang dan latihan dengan Pemecah Soal |
| Menjodohkan | `jodoh` | Seperti LKPD bagian III (harga beli + % → harga jual) |
| Melengkapi tabel | `tabel` | Seperti LKPD bagian II (HB, HJ, U/R, %) |
| Menyusun langkah | `susun` | Jelaskan ke Teman (F-24) |
| PG kompleks | `pgKompleks` | Lebih dari satu jawaban benar (format AKM) |
| Benar/keliru + alasan | `klaim` | Detektif Promo (F-63) |
| Bandingkan & putuskan | `bandingkan` | Mana Lebih Hemat? (F-62) |
| Uraian singkat | `uraian` | Beri Alasan tertulis (F-64), dinilai dengan rubrik |

### 4.1a Tag literasi (wajib untuk setiap soal)

| Tag | Nilai |
|---|---|
| `proses` | `merumuskan`, `menerapkan`, `menafsirkan` (boleh lebih dari satu, per langkah) |
| `levelKognitif` | `pemahaman`, `penerapan`, `penalaran` |
| `konteksLiterasi` | `personal`, `sosialBudaya`, `saintifik` |
| `levelLiterasi` | `L1`, `L2`, `L3` (khusus Tantangan Literasi) |

Contoh dan jenis stimulus lengkap ada di [10-literasi-matematika.md](10-literasi-matematika.md).

### 4.2 Soal berbasis template (generator)

Agar soal bisa banyak dan kunci jawaban pasti benar, soal dibuat dari **template + parameter**. Contoh:

```json
{
  "id": "M4-L1-T01",
  "modul": "M4",
  "level": 1,
  "tipe": "bertahap",
  "konteks": "toko_alat_tulis",
  "template": "Harga sebuah tas Rp{hargaAwal}. Tas itu mendapat diskon {diskon}%. Berapa harga tas setelah diskon?",
  "parameter": {
    "hargaAwal": { "pilihan": [50000, 80000, 100000, 120000] },
    "diskon":    { "pilihan": [10, 20, 25, 50] }
  },
  "ditanya": "hargaAkhir",
  "langkah": [
    { "id": "pilihOperasi", "rumusBenar": "hargaAwal - potongan" },
    { "id": "potongan",   "hitung": "diskonRupiah(hargaAwal, diskon)", "label": "potongan" },
    { "id": "hargaAkhir", "hitung": "hargaSetelahDiskon(hargaAwal, diskon)", "label": "hargaAkhir" }
  ],
  "cekKewajaran": "hargaAkhir < hargaAwal",
  "miskonsepsi": [
    { "jikaJawaban": "potongan", "pesan": "Itu besar potongannya. Yang ditanya harga yang dibayar setelah diskon." },
    { "jikaJawaban": "hargaAwal + potongan", "pesan": "Setelah diskon harga jadi lebih murah, jadi harga awal dikurangi potongan." }
  ]
}
```

Aturan parameter per level:

| Level | Nominal | Persen | Panjang soal |
|---|---|---|---|
| 1 | Kelipatan Rp10.000, ≤ Rp100.000 | 10, 20, 25, 50 | 1–2 kalimat |
| 2 | Kelipatan Rp5.000/Rp1.000, ≤ Rp500.000 | 5, 15, 30, 40 | 2–3 kalimat |
| 3 | Bebas (kelipatan Rp100), hingga jutaan | Termasuk 12,5; 7,5; diskon bertingkat | 3–5 kalimat, ada informasi pengecoh |

Semua hasil perhitungan level 1–2 harus berupa bilangan bulat rupiah (generator menolak kombinasi parameter yang menghasilkan pecahan).

## 5. Katalog Miskonsepsi (untuk umpan balik F-22)

| Kode | Miskonsepsi | Deteksi | Pesan umpan balik |
|---|---|---|---|
| MK1 | Menjawab besar potongan ketika ditanya harga akhir | jawaban = potongan | "Itu potongannya. Yang ditanya harga yang dibayar." |
| MK2 | Menjumlahkan potongan ke harga awal | jawaban = awal + potongan | "Diskon membuat harga lebih murah, jadi dikurangi." |
| MK3 | Persen untung dibagi harga jual | jawaban = U/HJ×100 | "Persen untung selalu dibandingkan dengan harga beli." |
| MK4 | Diskon bertingkat dijumlahkan (20% + 10% = 30%) | jawaban = diskon gabungan | "Diskon kedua dihitung dari harga setelah diskon pertama." |
| MK5 | Pajak dihitung dari harga sebelum diskon | jawaban memakai harga awal | "Pajak dihitung dari harga setelah diskon." |
| MK6 | Tertukar untung dan rugi | tanda/jenis salah | "Bandingkan: harga jual lebih besar atau lebih kecil dari harga beli?" |
| MK7 | Salah menempatkan nol (angka besar) | jawaban = benar × 10ⁿ | "Hampir benar! Cek lagi banyak angka nolnya." |

## 6. Contoh Soal Diadaptasi dari LKPD Referensi

1. **(M1, Level 2)** Anik membeli 3 kodi kemeja batik seharga Rp2.400.000. Ia menjual kemeja itu dengan harga Rp45.000 per buah. Berapa untung atau rugi Anik? *(1 kodi = 20 buah. Jawaban: untung Rp300.000.)*
2. **(M1, Level 3)** Pedagang membeli 20 kg salak seharga Rp140.000. Setengahnya laku Rp8.000/kg, seperempatnya laku Rp5.000/kg, sisanya busuk. Berapa ruginya? *(Jawaban: rugi Rp35.000.)*
3. **(M2, Level 2)** Andika membeli 50 kg apel seharga Rp500.000 dan menjualnya Rp8.000/kg. Berapa persen ruginya? *(Jawaban: 20%.)*

> Soal-soal ini perlu ditulis ulang dengan kalimat sendiri. Jika dikutip, cantumkan sumber LKPD aslinya.

## 7. Jumlah Konten Minimum Versi 1

| Modul | Kartu istilah | Contoh lengkap | Contoh rumpang | Template latihan |
|---|---|---|---|---|
| M0 | 2 | 1 | 1 | 5 |
| M1 | 3 | 2 | 2 | 6 |
| M2 | 2 | 3 | 2 | 6 |
| M3 | 2 | 2 | 2 | 6 |
| M4 | 3 | 1 | 2 | 6 |
| M5 | 3 | 2 | 2 | 5 |
| **Total** | **15** | **11** | **11** | **34** |

Tambahan untuk **Tantangan Literasi**: minimal 2 stimulus per modul M1–M5 (total 10 stimulus), masing-masing dengan 3 soal berjenjang L1–L3 (total 30 soal literasi). Sebarannya mencakup ketiga proses dan ketiga level kognitif, dengan minimal 1/3 soal pada proses **menafsirkan**.

Setiap template menghasilkan banyak variasi soal, sehingga 10 soal per modul tidak akan berulang persis.
