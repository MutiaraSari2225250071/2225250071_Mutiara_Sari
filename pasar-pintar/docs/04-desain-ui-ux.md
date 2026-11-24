# 04 — Desain UI/UX

## 1. Prinsip Tampilan (dari DS03 dan CLT)

1. **Satu layar, satu tugas.** Tiap layar hanya memuat satu kartu materi, satu langkah, atau satu soal.
2. **Sedikit kata.** Instruksi ≤ 2 kalimat; kartu materi ≤ 40 kata.
3. **Tanpa dekorasi.** Gambar hanya jika membantu memahami soal. Semua ilustrasi SVG (EL03).
4. **Konsisten.** Posisi tombol, warna, dan istilah sama di semua layar.
5. **Semua yang dibutuhkan terlihat.** Panel Diketahui–Ditanya dan kotak jawaban tampil bersamaan tanpa menggulir (*mobile first*: 360×640 dp).
6. **Ramah jari.** Area sentuh ≥ 48 dp; tombol utama di bagian bawah layar (mudah dijangkau ibu jari).
7. **Smartphone dulu.** Setiap layar dirancang untuk lebar 360 dp, lalu diperluas ke layar yang lebih besar. Panduan lengkap ada di [13-optimasi-smartphone.md](13-optimasi-smartphone.md).

## 2. Sistem Warna

### 2.1 Warna semantik harga (TETAP; tidak boleh dipakai untuk hal lain)

| Token | Arti | Warna (saran) | Ikon pendamping |
|---|---|---|---|
| `hargaAwal` | Harga awal / harga beli | Biru `#2563EB` | 🏷️ tag |
| `potongan` | Diskon / potongan | Oranye `#EA580C` | ✂️ gunting |
| `hargaAkhir` | Harga setelah diskon / harga bayar / harga jual | Hijau `#16A34A` | 💳 kartu |
| `untung` | Untung | Hijau tua `#15803D` | ⬆️ panah naik |
| `rugi` | Rugi | Merah `#DC2626` | ⬇️ panah turun |
| `pajak` | PPN | Ungu `#7C3AED` | 🧾 struk |

Warna **selalu** disertai teks label dan ikon, agar tetap dapat dipahami siswa buta warna.

> Catatan: "harga beli" (M1) dan "harga awal" (M4) memakai biru karena keduanya titik awal perhitungan. Pertimbangkan dengan ahli media apakah perlu dibedakan.

### 2.2 Warna antarmuka

| Token | Pakai untuk | Terang | Gelap |
|---|---|---|---|
| `bg` | Latar | `#F8FAFC` | `#0F172A` |
| `surface` | Kartu | `#FFFFFF` | `#1E293B` |
| `text` | Teks utama | `#0F172A` | `#F1F5F9` |
| `muted` | Teks sekunder | `#64748B` | `#94A3B8` |
| `primary` | Tombol utama | `#0F766E` (teal) | `#2DD4BF` |
| `benar` | Umpan balik benar | `#16A34A` + ikon ✓ | |
| `salah` | Umpan balik salah | `#B45309` (kuning tua, tidak merah agar tidak menakutkan) + ikon ! | |

### 2.3 Tipografi

- Font: **Nunito** atau **Inter** (Google Fonts; disimpan lokal untuk mode offline)
- Ukuran: isi 16 px (mode besar 18 px), judul 20–24 px, angka jawaban 24 px
- Angka memakai *tabular numbers* agar nominal sejajar

## 3. Peta Layar

```
Onboarding ─► Beranda ─┬─► Daftar Modul ─► Modul ─┬─► Kartu Istilah
                       │                          ├─► Contoh Lengkap
                       │                          ├─► Contoh Rumpang
                       │                          ├─► Latihan ─► Pembahasan
                       │                          ├─► Jelaskan ke Teman
                       │                          ├─► Tantangan Literasi (L1–L3)
                       │                          └─► Skala Usaha ─► Ringkasan
                       ├─► Pasar Pintar ─► Pilih Skenario ─► Misi ─► Struk ─► Skor
                       ├─► Rapor Saya ─► (PIN) Ekspor Data
                       ├─► Pasang Aplikasi (/pasang: tombol PWA, unduh APK, panduan iOS)
                       └─► Pengaturan
```

## 4. Wireframe Teks Layar Utama

### 4.1 Beranda

```
┌────────────────────────────┐
│ Halo, Rani 👋               │
│                            │
│ ┌────────────────────────┐ │
│ │ 📘 Lanjut Belajar       │ │
│ │ M4 Diskon · 3/10 soal   │ │
│ │ [ Lanjutkan ]           │ │
│ └────────────────────────┘ │
│ ┌──────────┐ ┌──────────┐  │
│ │ 🛒 Pasar  │ │ 📊 Rapor  │  │
│ │  Pintar  │ │   Saya   │  │
│ └──────────┘ └──────────┘  │
└────────────────────────────┘
```

### 4.2 Contoh Lengkap (dibuka langkah demi langkah)

```
┌────────────────────────────┐
│ ← M4 Diskon   Contoh 1 dari 2│
├────────────────────────────┤
│ Harga sepatu Rp80.000.     │
│ Diskon 20%.                │
│ Berapa harga yang dibayar? │
│                            │
│ [🏷️ Harga Awal ████████████ ] Rp80.000
│ [💳 Bayar ██████████][✂️ ██] │
│                            │
│ Langkah 1  Potongan        │
│ 20% × Rp80.000 = Rp16.000  │
│                            │
│ Langkah 2  (tersembunyi)   │
├────────────────────────────┤
│      [ Langkah berikutnya ]│
└────────────────────────────┘
```

### 4.3 Latihan — Pemecah Soal Cerita

```
┌────────────────────────────┐
│ Soal 4/10            💡 Petunjuk│
├────────────────────────────┤
│ Ketuk angka yang penting:  │
│ ① Bu Sari membeli tas      │
│   seharga [Rp120.000].     │
│ ② Toko memberi diskon [25%].│
│ ③ Berapa yang dibayar?     │
├────────────────────────────┤
│ DIKETAHUI                  │
│ 🏷️ Harga Awal  Rp120.000   │
│ ✂️ Diskon      25%          │
│ DITANYA                    │
│ 💳 Harga Akhir  ?           │
├────────────────────────────┤
│                [ Lanjut ]  │
└────────────────────────────┘
```

### 4.4 Latihan — Pilih Operasi lalu Hitung

```
┌────────────────────────────┐
│ DIKETAHUI: 🏷️120.000 ✂️25% │  ← panel ringkas tetap terlihat
├────────────────────────────┤
│ Langkah 1: Hitung potongan │
│ 25% × Rp120.000 = Rp[_____]│
│                            │
│ Langkah 2: Harga akhir     │
│ Rp120.000 [ − ] Rp[_____]  │
│          = Rp[_____]       │
├────────────────────────────┤
│ [🧮]          [ Periksa ]  │
└────────────────────────────┘
```

Kolom angka otomatis menampilkan pemisah ribuan saat diketik (`90000` → `90.000`). Di smartphone, angka diisi dengan **Keypad Rupiah** dalam aplikasi (F-57) agar keyboard bawaan tidak menutupi soal (lihat [13-optimasi-smartphone.md](13-optimasi-smartphone.md) bagian 3).

### 4.5 Umpan Balik dan Cek Kewajaran

```
┌────────────────────────────┐
│ ! Belum tepat               │
│ Rp30.000 itu besar          │
│ potongannya. Yang ditanya   │
│ harga yang dibayar.         │
│                            │
│ 🔎 Cek: harga bayar harus   │
│ lebih kecil dari Rp120.000. │
├────────────────────────────┤
│ [Lihat pembahasan] [Coba lagi]│
└────────────────────────────┘
```

### 4.6 Pasar Pintar — Simulasi Belanja

```
┌────────────────────────────┐
│ 💰 Uangmu: Rp100.000         │
│ Misi: beli 2 barang, uang  │
│ tidak boleh kurang!        │
├────────────────────────────┤
│ [🎒 Tas    Rp60.000  -25%]  │
│ [📚 Buku   Rp20.000  -10%]  │
│ [✏️ Pensil Rp5.000       ]  │
├────────────────────────────┤
│ Keranjang: 🎒 📚            │
│           [ Ke Kasir → ]   │
└────────────────────────────┘
```

Di kasir siswa mengisi struk: harga setelah diskon tiap barang → subtotal → (Level 3: PPN) → total → kembalian.

### 4.7 Tantangan Literasi: Stimulus + Siklus 4 Langkah

```
┌────────────────────────────┐
│ Tantangan Literasi · L2     │
│ ①Pahami ②Ubah ③Hitung ④Cek │  ← penanda siklus, langkah aktif ditebalkan
├────────────────────────────┤
│ ┌── BROSUR (SVG) ────────┐ │
│ │ TOKO A    Diskon 30%   │ │  ← stimulus bisa diperbesar (pinch/ketuk)
│ │ TOKO B  Beli 2 Gratis 1│ │
│ │ Buku tulis Rp12.000    │ │
│ └────────────────────────┘ │
│ Kamu butuh 3 buku.          │
│ Toko mana yang lebih hemat? │
├────────────────────────────┤
│ Ketuk info yang kamu pakai. │
│            [ Lanjut ]       │
└────────────────────────────┘
```

Stimulus tetap terlihat (menempel/terlipat di atas) selama keempat langkah agar tidak terjadi *split-attention*.

### 4.8 Mana Lebih Hemat? (langkah Cek & Putuskan)

```
┌────────────────────────────┐
│ ④ Cek & Putuskan            │
│ Toko A  Rp25.200            │
│ Toko B  Rp24.000            │
│                            │
│ Aku memilih:  (A)  (●B)     │
│ Alasanku:                   │
│ (●) Total bayar di B lebih  │
│     kecil                   │
│ ( ) Diskon A lebih besar    │
│ ( ) B memberi barang gratis │
├────────────────────────────┤
│                [ Periksa ]  │
└────────────────────────────┘
```

### 4.9 Skala Usaha (Paas)

```
┌────────────────────────────┐
│ Seberapa besar usahamu     │
│ mengerjakan soal tadi?     │
│                            │
│ 1  2  3  4  5  6  7  8  9  │
│ ○  ○  ○  ○  ●  ○  ○  ○  ○  │
│ sangat        sangat       │
│ ringan        berat        │
├────────────────────────────┤
│                [ Kirim ]   │
└────────────────────────────┘
```

## 5. Komponen Bersama

| Komponen | Fungsi |
|---|---|
| `LabelHarga` | Lencana warna + ikon + teks untuk jenis harga |
| `BarModel` | Model batang proporsional (SVG) untuk diskon/untung/rugi |
| `InputRupiah` | Kolom angka dengan format ribuan otomatis dan keyboard numerik |
| `InputPersen` | Kolom persen dengan koma desimal |
| `PanelDiketahui` | Ringkasan Diketahui–Ditanya yang menempel di atas |
| `KalimatSoal` | Kalimat soal yang bisa diketuk |
| `LangkahBertahap` | Menampilkan langkah satu per satu |
| `KotakPetunjuk` | Petunjuk 3 tingkat |
| `UmpanBalik` | Panel benar/salah + pesan miskonsepsi |
| `SkalaPaas` | Skala 1–9 |
| `TombolUtama` | Tombol bawah layar, ≥ 48 dp |
| `KeypadRupiah` | Keypad angka dalam aplikasi dengan tombol 000, ⌫, dan koma (F-57) |
| `BilahNavigasiBawah` | Navigasi utama di bawah layar: Beranda, Belajar, Pasar, Rapor |
| `PilihProfil` | Memilih/menambah profil di HP yang dipakai bergantian (F-58) |
| `Stimulus` | Penampil stimulus SVG (brosur, struk, label coret, toko daring, tabel, grafik) dari data JSON; bisa diperbesar |
| `SiklusLiterasi` | Penanda 4 langkah: Pahami → Ubah → Hitung → Cek & Putuskan |
| `PilihAlasan` | Pilihan alasan / kalimat rumpang / kolom alasan singkat (F-64) |
| `KartuBanding` | Menampilkan 2–3 penawaran berdampingan untuk Mana Lebih Hemat? |
| `RaporLiterasi` | Indikator kekuatan per proses (F-67) |

## 6. Mikro-copy (gaya bahasa)

- Sapa dengan "kamu". Kalimat aktif dan pendek.
- Saat salah: dorong, bukan menyalahkan. "Hampir! Cek lagi langkah 1." Hindari "Salah!" dengan warna merah besar.
- Saat benar: spesifik. "Tepat! Kamu mengurangi harga awal dengan potongan."
- Istilah tetap: selalu "Harga Awal", jangan berganti-ganti dengan "harga semula" atau "harga mula-mula". Sinonim cukup dijelaskan sekali di kartu istilah.

## 7. Aksesibilitas

- Kontras teks ≥ 4,5:1 (WCAG AA)
- Mendukung pengaturan ukuran huruf
- Semua ikon punya `aria-label`
- Fokus keyboard terlihat (untuk versi web)
- Tidak ada konten yang berkedip

## 8. Ilustrasi, Maskot, dan Animasi (v0.4)

Tujuannya membuat aplikasi lebih menarik **tanpa menambah beban ekstrinsik** (DS03, EL03).

| Unsur | Aturan |
|---|---|
| Ilustrasi | Hanya gambar yang berhubungan dengan isi: ikon tiap modul (persen, mangga, grafik naik, label harga, diskon, struk, timbangan, celengan) dan barang di Pasar Pintar. Semua SVG agar tajam |
| Warna modul | Setiap modul punya warna pastel sendiri (dari satu rumus HSL, mengikuti mode terang/gelap). Warna label harga (docs/04 bagian 2.1) **tidak berubah** |
| Aksen | Hijau toska (utama) dan kuning matahari (tombol pada kartu utama, bilah kemajuan, bintang) |
| Maskot "Pinta" | Tas belanja tersenyum. Hanya muncul di sambutan, Beranda, kotak umpan balik (senang atau berpikir), dan ringkasan. **Tidak muncul di soal** |
| Animasi | Pendek (≤ 0,6 detik): layar masuk, umpan balik muncul (salah: bergoyang pelan), model batang tumbuh, bintang muncul. Animasi diputar hanya saat layar berganti, bukan setiap kali tombol ditekan |
| Perayaan | Konfeti hanya saat modul, tantangan literasi, atau misi selesai |
| Kendali siswa | Saklar "Animasi dan efek perayaan" di Rapor Saya. Otomatis mati jika HP memakai pengaturan "kurangi gerakan" |

## 9. Aturan Pilihan Ganda (v0.4.1)

Agar pilihan ganda benar-benar menguji pemahaman, bukan menebak dengan mengetuk satu per satu:

1. **Pilih dulu.** Pilihan yang diketuk hanya tersorot netral, tanpa warna benar atau salah.
2. **Tekan "Periksa".** Benar atau salah beserta alasannya baru muncul setelah itu.
3. **Maksimal 2 kali.** Jika salah, siswa harus mengganti pilihan sebelum bisa memeriksa lagi. Setelah 2 kali salah, jawaban yang tepat ditandai hijau beserta penjelasannya, lalu siswa boleh lanjut.
4. **Dicatat.** Hasil percobaan pertama setiap pilihan ganda disimpan (`stats.pg`) dan ditampilkan di Rapor sebagai "Pilihan ganda benar di percobaan pertama".

Berlaku untuk: Apa yang ditanya, Pilih operasi, Cek kewajaran (1 kali periksa), keputusan misi berjualan, serta langkah Ubah dan Putuskan (pilihan + alasan) di Tantangan Literasi.

## 10. Musik Latar dan Efek Suara (v0.5)

Semua suara dibuat langsung dengan **Web Audio API** (tanpa file audio): ringan, tetap offline, dan bebas masalah hak cipta.

| Unsur | Aturan |
|---|---|
| Musik latar (v0.5.1, gaya *relaxing/ambient*) | Pad hangat (gelombang sinus) yang muncul dan menghilang perlahan, akor Cmaj7–Am7–Fmaj7–G6, sekitar 4,2 detik per akor, dengan denting lembut yang jarang seperti lonceng angin. Diredam dengan filter *low-pass* dan diberi gema halus agar tidak nyaring. Mulai setelah sentuhan pertama karena aturan browser |
| Volume menyesuaikan | Volume normal di menu. **Dikecilkan otomatis** saat siswa mengerjakan soal latihan, contoh rumpang, Tantangan Literasi, atau kasir/hitung di Pasar Pintar |
| Efek suara | Semua memakai sinus yang diredam: "pop" lembut bernada rendah (semua tombol), "tik" sangat pelan (keypad), dua denting lembut (benar), nada rendah yang turun perlahan (salah), empat denting pelan (modul/tantangan/misi selesai) |
| Hemat baterai | Suara berhenti saat aplikasi ditutup atau layar HP mati, dan lanjut saat dibuka lagi |
| Kendali | Tombol speaker di Beranda, serta saklar **Musik latar** dan **Efek suara tombol** di Rapor Saya, masing-masing dengan **slider volume** (bawaan: musik 70%, efek 80%). Pilihan tersimpan di HP |
| Kejelasan di HP (v0.5.2) | Volume dinaikkan dan memakai *compressor* agar jelas tanpa pecah. Nada bas dinaikkan satu oktaf karena speaker HP tidak bisa memutar nada sangat rendah. Saat mengerjakan soal, musik dikecilkan menjadi separuh, tidak sampai hampir hilang |

> Catatan penelitian: pengaruh musik latar terhadap beban kognitif masih beragam dalam penelitian. Saat uji coba, catat pengaturan musik siswa dan pertimbangkan membandingkan skor Paas antara kelompok yang menyalakan dan mematikan musik.
