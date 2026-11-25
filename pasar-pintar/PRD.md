# PRD — Pasar Pintar: Aplikasi Belajar Aritmetika Sosial Berbasis Teori Beban Kognitif untuk Menumbuhkembangkan Literasi Matematika

| Atribut | Nilai |
|---|---|
| Versi dokumen | 0.3 (draf; ditambah literasi matematika, distribusi tanpa toko aplikasi, pembagian JavaScript–Python) |
| Tanggal | 12 November 2026 |
| Penyusun | Mutiara Sari (2225250071) |
| Status | Menunggu review dosen pembimbing |
| Platform | Dibuka di browser (web) dan dipasang tanpa Play Store/App Store: PWA (Android, iPhone, laptop) dan APK Android |
| Bahasa pemrograman | **JavaScript** untuk aplikasi dan data umum; **Python** untuk data statistik/analisis penelitian |
| Sasaran | Siswa SMP kelas VII (dan kelas VIII untuk remedial) |

---

## 1. Latar Belakang

Aritmetika Sosial (harga jual/beli, untung/rugi, persentase, diskon, pajak) adalah materi yang **paling dekat dengan kehidupan sehari-hari**. Meski begitu, siswa masih kesulitan saat mengerjakannya. Wawancara dengan responden S01 (lihat [docs/01-riset-pengguna.md](docs/01-riset-pengguna.md)) menemukan sumber kesulitan berikut, dikelompokkan menurut Teori Beban Kognitif:

| Jenis beban | Temuan utama | Kode |
|---|---|---|
| **Intrinsik (IL)**: kerumitan materi itu sendiri | Persentase sulit dipahami; tertukar antara harga awal, potongan, dan harga setelah diskon; prasyarat (perkalian, pembagian, pecahan) lemah; sering salah memilih operasi hitung | IL01–IL05 |
| **Ekstrinsik (EL)**: beban dari cara penyajian | Soal cerita berbelit dengan angka besar; contoh dari guru (pendek, angka kecil) berbeda jauh dengan soal di buku; gambar beresolusi buruk; bagian keuntungan dirasa paling sulit | IL04, EL01, EL03–EL05 |
| **Germane (GL)**: usaha yang membangun pemahaman | Simulasi belanja membantu; pembahasan setelah menjawab membantu; siswa memakai pola "diketahui–ditanya" dari soal sebelumnya; mengecek hasil dengan membandingkan ke harga awal | GL01–GL05 |

Siswa juga memberi saran langsung (DS01–DS04): **permainan simulasi belanja dengan uang yang sudah ditentukan**, tampilan sederhana, instruksi singkat, dan penjelasan materi pajak.

Selain menguasai prosedur hitung, siswa perlu **literasi matematika**: kemampuan merumuskan situasi nyata menjadi masalah matematika, menerapkan konsep, lalu menafsirkan dan mengevaluasi hasilnya untuk mengambil keputusan (kerangka PISA; di Indonesia diukur sebagai numerasi dalam AKM). Temuan IL04–IL05 (sulit mengubah soal cerita menjadi operasi hitung) dan GL04 (belum terbiasa menjelaskan jawaban) menunjukkan bahwa kemampuan merumuskan dan berargumen masih perlu dikembangkan. Sebaliknya, GL02 (mengecek hasil) dan GL05 (memakai pola pada konteks baru) adalah modal awal yang dapat diperkuat. Rincian ada di [docs/10-literasi-matematika.md](docs/10-literasi-matematika.md).

## 2. Pernyataan Masalah

> Siswa SMP kesulitan menyelesaikan soal Aritmetika Sosial. Penyebabnya bukan hanya materi yang kompleks (beban intrinsik), tetapi juga penyajian soal yang membebani memori kerja (beban ekstrinsik): soal cerita panjang, angka besar tanpa bantuan, istilah harga yang mirip, dan lompatan tingkat kesulitan yang terlalu jauh dari contoh ke latihan. Akibatnya, siswa belum mampu memakai Aritmetika Sosial untuk memahami dan memutuskan masalah nyata, seperti membandingkan promo, membaca struk, atau menentukan harga jual (literasi matematika).

## 3. Tujuan Produk

| # | Tujuan | Ukuran keberhasilan (target awal) |
|---|---|---|
| T1 | Menurunkan beban ekstrinsik saat mengerjakan soal | Skor beban mental (skala Paas 1–9) turun minimal 1 poin dibandingkan mengerjakan LKPD kertas |
| T2 | Mengelola beban intrinsik lewat urutan bertahap | ≥ 75% siswa menyelesaikan seluruh tahap *worked example → faded example → latihan mandiri* di modul Diskon |
| T3 | Meningkatkan beban germane (pemahaman) | Rata-rata *gain* ternormalisasi (N-Gain) pretest–posttest ≥ 0,3 (kategori sedang) |
| T4 | Aplikasi praktis dipakai | Skor angket kepraktisan ≥ 3,25 dari 4 (kategori praktis); skor SUS ≥ 68 |
| T5 | Isi aplikasi valid | Skor validasi ahli materi dan ahli media ≥ 3,25 dari 4 (kategori valid) |
| T6 | Menumbuhkembangkan literasi matematika | N-Gain tes literasi matematika (berbasis indikator PISA/AKM) ≥ 0,3; persentase benar pada proses **menafsirkan & mengevaluasi** naik dari pretest ke posttest |

> Angka target ini **usulan awal**. Sesuaikan dengan instrumen dan kriteria yang disetujui dosen pembimbing.

### Bukan tujuan (di luar cakupan versi 1)

- Bukan pengganti guru. Aplikasi ini dipakai sebagai pendamping.
- Tidak ada fitur chat, media sosial, atau papan peringkat antarsiswa (bisa memicu kecemasan dan beban ekstrinsik).
- Tidak ada pembayaran atau iklan.
- Belum mencakup seluruh materi SMP; hanya Aritmetika Sosial.
- Belum ada dasbor guru daring (direncanakan untuk versi 2).

## 4. Pengguna Sasaran

### Persona utama: "Siswa seperti S01"

- Kelas VII–VIII SMP, umur 12–14 tahun.
- Memakai HP Android kelas menengah ke bawah (RAM 2–4 GB), kuota internet terbatas.
- Hafal rumus dasar (*penjualan = pembelian + keuntungan*) tetapi bingung saat memakai rumus itu di soal cerita.
- Mudah kehilangan fokus jika tulisan terlalu banyak atau gambar tidak relevan.
- Belajar paling baik dengan contoh nyata (jual beli buah, belanja).
- Belum terbiasa menjelaskan jawabannya ke orang lain (GL04).

### Persona sekunder: Guru matematika

- Ingin siswa berlatih mandiri di rumah.
- Butuh bukti progres sederhana (versi 1: siswa menunjukkan layar "Rapor Saya"; versi 2: dasbor guru).

## 5. Ruang Lingkup Materi (Versi 1)

Mengacu pada Capaian Pembelajaran Fase D (Kurikulum Merdeka). Rincian ada di [docs/03-spesifikasi-konten.md](docs/03-spesifikasi-konten.md).

| Modul | Topik | Prioritas |
|---|---|---|
| M0 | Pemanasan prasyarat: perkalian dan pembagian bilangan besar, pecahan ↔ persen | Wajib (IL03) |
| M1 | Harga beli, harga jual, untung, rugi | Wajib |
| M2 | Persentase untung dan rugi | Wajib (IL01, EL04) |
| M3 | Menentukan harga beli/jual dari persentase | Wajib |
| M4 | Diskon (potongan harga) | Wajib (IL02, EL05) |
| M5 | Pajak (PPN) | Wajib (DS02) |
| M6 | Bruto, neto, tara | Opsional (versi 1.1) |
| M7 | Bunga tunggal | Opsional (versi 1.1) |
| TL | **Tantangan Literasi** di akhir setiap modul M1–M5 (stimulus autentik, level L1–L3) | Wajib (T6) |

## 6. Kebutuhan Fungsional

Prioritas memakai metode MoSCoW: **M** = Must (wajib), **S** = Should (sebaiknya), **C** = Could (bisa), **W** = Won't (tidak di versi ini). Kolom "Dasar" menunjukkan kode wawancara yang menjadi alasan fitur.

### 6.1 Belajar Bertahap (Mode Belajar)

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-01 | Tiap modul mengikuti urutan **Contoh Lengkap (worked example) → Contoh Rumpang (faded example) → Latihan Mandiri** | M | GL03, GL05 |
| F-02 | Penjelasan materi dipecah menjadi kartu pendek (maksimal ±40 kata per kartu, satu ide per kartu) | M | DS03 |
| F-03 | Angka di soal dimulai dari nilai kecil dan bulat (misalnya Rp10.000), lalu naik bertahap ke nilai besar dan tidak bulat | M | EL01, IL04 |
| F-04 | Modul M0 (prasyarat) disarankan ketika siswa salah di langkah perkalian, pembagian, atau persen | S | IL03 |

### 6.2 Bantuan Mengerjakan Soal (Scaffolding)

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-10 | **Pemecah Soal Cerita**: soal cerita ditampilkan per kalimat. Siswa mengetuk informasi penting lalu memasukkannya ke kotak **Diketahui** dan **Ditanya** | M | IL04, GL05 |
| F-11 | **Label warna tetap** untuk jenis harga, konsisten di seluruh aplikasi: Harga Awal (biru), Potongan/Diskon (oranye), Harga Akhir (hijau), Untung (hijau tua), Rugi (merah) | M | IL02, EL05 |
| F-12 | **Model batang (bar model)** visual yang menunjukkan hubungan harga awal, potongan, dan harga akhir; panjang batang mengikuti nilai | M | IL01, IL02 |
| F-13 | **Langkah Pilih Operasi**: sebelum menghitung, siswa memilih operasi/rumus yang tepat dari 2–4 pilihan dan mendapat umpan balik | M | IL05 |
| F-14 | **Kalkulator bertahap** opsional untuk angka besar, menampilkan pemisah ribuan otomatis (Rp1.250.000) | S | IL04 |
| F-15 | **Petunjuk berjenjang** (maksimal 3 tingkat): petunjuk umum → rumus → langkah pertama dikerjakan | M | IL01, GL03 |
| F-16 | **Cek Kewajaran** setelah menjawab: "Harga setelah diskon harus lebih kecil dari harga awal. Apakah jawabanmu begitu?" | M | GL02 |

### 6.3 Umpan Balik dan Pembahasan

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-20 | Umpan balik langsung untuk setiap jawaban (benar/salah dan alasannya) | M | GL03 |
| F-21 | **Pembahasan langkah demi langkah** muncul setelah siswa menjawab, bisa dibuka satu langkah demi satu langkah | M | GL03 |
| F-22 | Umpan balik **spesifik terhadap miskonsepsi**: jika jawaban siswa sama dengan "besar potongan" padahal yang ditanya "harga setelah diskon", tampilkan pesan khusus | M | IL02 |
| F-23 | **Soal Kembar**: setelah pembahasan, muncul soal dengan konteks berbeda tetapi cara penyelesaian sama | S | GL05, EL01 |
| F-24 | **Jelaskan ke Teman**: siswa menyusun urutan langkah penyelesaian (drag & drop) atau memilih alasan, seolah menjelaskan ke teman | S | GL04 |

### 6.4 Mode Simulasi: Pasar Pintar

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-30 | **Simulasi Belanja**: siswa mendapat anggaran (misalnya Rp100.000), memilih barang berlabel diskon, menghitung harga bayar, dan tidak boleh melebihi anggaran | M | GL01, DS01, DS04 |
| F-31 | **Simulasi Berjualan**: siswa membeli stok dari grosir (harga beli), menentukan harga jual, lalu menghitung untung/rugi dan persentasenya | M | K02, EL04, DS04 |
| F-32 | **Struk Belanja**: di akhir simulasi siswa melengkapi struk (subtotal, diskon, PPN, total) | S | DS02 |
| F-33 | Skenario simulasi bertema dekat dengan siswa: warung buah (mangga, jambu), toko alat tulis, minimarket, kantin sekolah | M | K02 |
| F-34 | Level simulasi terbuka bertahap setelah modul terkait selesai | S | — |

### 6.5 Progres dan Motivasi

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-40 | Progres tersimpan di perangkat dan tetap ada tanpa internet | M | — |
| F-41 | Halaman **Rapor Saya**: modul selesai, akurasi per topik, topik yang perlu diulang | M | — |
| F-42 | Lencana sederhana (misalnya "Ahli Diskon") tanpa papan peringkat | C | — |
| F-43 | **Pengukuran beban kognitif** (skala Paas 1–9: "Seberapa besar usaha yang kamu keluarkan?") muncul setelah setiap set latihan, untuk keperluan penelitian | M | Penelitian |
| F-44 | Ekspor data progres, jawaban, dan skor Paas ke file CSV/JSON dengan format tetap, untuk dianalisis dengan **Python** oleh peneliti (docs/12) | M | Penelitian |
| F-45 | **Analisis statistik penelitian dengan Python**: uji instrumen, validasi ahli, kepraktisan & SUS, N-Gain, uji normalitas, uji-t/Wilcoxon, beban kognitif & efisiensi, skor literasi per proses; keluaran tabel Excel dan grafik | M | Penelitian |
| F-46 | Dasbor peneliti (Streamlit, dijalankan lokal di laptop) | C | Penelitian |

### 6.6 Literasi Matematika

Kerangka dan contoh lengkap ada di [docs/10-literasi-matematika.md](docs/10-literasi-matematika.md).

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-60 | **Baca Stimulus Autentik**: soal literasi memakai stimulus visual fiktif (label harga coret, brosur promo, struk, halaman toko daring, catatan jualan, grafik penjualan) dalam format SVG | M | K03, EL03, T6 |
| F-61 | **Siklus 4 langkah** ditampilkan konsisten di setiap soal literasi: Pahami Situasi → Ubah ke Matematika → Hitung → Cek & Putuskan | M | IL04, GL02 |
| F-62 | **Mana Lebih Hemat?**: membandingkan dua penawaran atau lebih (diskon vs beli 2 gratis 1, kemasan besar vs kecil, ongkir vs gratis ongkir) lalu memutuskan dengan alasan | M | DS04, T6 |
| F-63 | **Detektif Promo**: menilai klaim benar/keliru (misalnya "diskon 50% + 20% = 70%") beserta alasannya | S | GL02, T6 |
| F-64 | **Beri Alasan** bertahap: memilih alasan → melengkapi kalimat alasan → menulis alasan singkat | M | GL04 |
| F-65 | **Misi Literasi** di Pasar Pintar dengan keputusan terbuka (Misi Anggaran, Misi Pedagang, Misi Koperasi) | S | GL01, DS04 |
| F-66 | Setiap soal diberi tag **proses** (merumuskan/menerapkan/menafsirkan), **level kognitif** AKM (pemahaman/penerapan/penalaran), dan **konteks** (personal/sosial budaya/saintifik) | M | Penelitian |
| F-67 | **Rapor Literasi**: kekuatan per proses dalam bahasa sederhana, tanpa perbandingan antarsiswa | S | T6 |
| F-68 | Pengayaan literasi finansial ringan (uang jajan, menabung, kebutuhan vs keinginan) | C | — |

**Aturan penting:** soal literasi baru muncul setelah siswa menyelesaikan Latihan Mandiri suatu modul, dan kerumitan stimulus naik bertahap. Tujuannya agar literasi tidak menambah beban kognitif berlebih pada pemula (lihat docs/10 bagian 3).

### 6.6b Asisten AI (Pinta AI, Google Gemini)

Rincian, arsitektur, privasi, dan panduan pemasangan ada di [docs/14-integrasi-ai.md](docs/14-integrasi-ai.md).

| ID | Kebutuhan | Prioritas | Dasar |
|---|---|---|---|
| F-70 | **Tanya Pinta**: petunjuk bertahap dari AI di layar soal, tanpa memberi jawaban akhir, maks. 5 pertanyaan per soal | S | GL03, IL05 |
| F-71 | **Jelaskan kesalahanku**: setelah 2 kali salah, AI menjelaskan langkah yang keliru dan penyebabnya | S | IL02, F-22 |
| NF-15 | API key hanya di Script Properties Google Apps Script (perantara). Tidak ada identitas siswa yang dikirim ke AI. Fitur AI opsional dan aplikasi tetap berjalan tanpa AI/internet | M | NF-08 |

### 6.7 Akun dan Pengaturan

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-50 | Masuk tanpa akun: cukup isi nama panggilan dan kode siswa (tanpa email/nomor HP) | M |
| F-51 | Pengaturan ukuran huruf (normal/besar) | S |
| F-52 | Mode suara (soal dibacakan, *text-to-speech*) | C |
| F-53 | Akun daring dan sinkronisasi ke dasbor guru | W (versi 2) |
| F-54 | Tombol **"Pasang Aplikasi"** (PWA) di Beranda/Pengaturan; untuk iPhone tampil panduan bergambar "Bagikan → Tambahkan ke Layar Utama" | M |
| F-55 | Halaman **/pasang**: panduan instalasi, tautan unduh APK beserta versi dan ukuran file, serta QR code untuk brosur | M |
| F-56 | Pemberitahuan "Versi baru tersedia" + tombol Muat ulang (pembaruan PWA) | S |
| F-57 | **Keypad Rupiah** dalam aplikasi (tombol 000, koma untuk persen, format ribuan langsung) agar keyboard bawaan HP tidak menutupi soal | M |
| F-58 | **Beberapa profil di satu HP** (HP dipakai bergantian dengan saudara), data tiap profil terpisah | S |
| F-59 | Lanjutkan dari posisi terakhir, serta simpan & pulihkan cadangan progres (file JSON) | M |

### 6.8 Distribusi dan Pembagian Bahasa

- Aplikasi dapat **dibuka di browser** dari alamat web/QR code di brosur dan **dipasang tanpa Play Store/App Store** (rincian di [docs/11-distribusi-dan-instalasi.md](docs/11-distribusi-dan-instalasi.md)).
- **JavaScript** dipakai untuk aplikasi siswa dan semua **data umum**. **Python** dipakai untuk semua **data statistik** (analisis penelitian). Keduanya terhubung lewat file CSV ekspor (rincian di [docs/05-arsitektur-teknis.md](docs/05-arsitektur-teknis.md) bagian 1.2 dan [docs/12-analisis-data-python.md](docs/12-analisis-data-python.md)).

## 7. Kebutuhan Non-Fungsional

| ID | Kategori | Kebutuhan |
|---|---|---|
| NF-01 | Platform | Berjalan di browser modern (Chrome, Edge, Firefox, Safari); dapat dipasang sebagai PWA di Android, iOS/iPadOS, Windows, macOS; APK untuk Android 8.0 (API 26) ke atas |
| NF-11 | Distribusi | Tidak bergantung pada Google Play Store atau Apple App Store. Web di-hosting dengan HTTPS; APK ditandatangani dan diunduh dari situs/GitHub Releases |
| NF-12 | Bahasa pemrograman | Aplikasi: JavaScript (React). Analisis statistik: Python. Tidak ada kode Python yang berjalan di perangkat siswa |
| NF-02 | Offline | Seluruh materi dan soal bisa dipakai tanpa internet setelah unduhan/instalasi pertama |
| NF-03 | Performa | JavaScript awal ≤ 200 KB (gzip); unduhan pertama ≤ 2 MB; tampil pertama < 3 detik di 3G lambat; Lighthouse Mobile Performance ≥ 90; ukuran APK < 30 MB (rincian di [docs/13-optimasi-smartphone.md](docs/13-optimasi-smartphone.md)) |
| NF-04 | Perangkat | **Smartphone adalah perangkat utama (mobile first).** Lancar di HP Android RAM 2 GB; rapi di lebar layar 320–430 dp, potret dan lanskap; mendukung area aman (poni, navigasi gestur) |
| NF-13 | Input di HP | Keypad dalam aplikasi untuk angka; soal dan kolom jawaban tetap terlihat saat mengetik; semua seret-lepas punya alternatif ketuk |
| NF-14 | Ketahanan data | Jawaban tersimpan seketika; progres tidak hilang saat aplikasi ditutup paksa, ada telepon masuk, atau baterai habis; tombol kembali Android/iPhone berperilaku wajar |
| NF-05 | Aksesibilitas | Kontras warna memenuhi WCAG 2.1 AA; warna tidak menjadi satu-satunya pembeda (label warna selalu disertai teks/ikon); area sentuh ≥ 48×48 dp |
| NF-06 | Gambar | Semua ilustrasi berformat vektor (SVG) agar tidak pecah di layar mana pun (EL03) |
| NF-07 | Bahasa | Bahasa Indonesia baku yang sederhana, kalimat ≤ 20 kata, instruksi ≤ 2 kalimat (DS03) |
| NF-08 | Privasi | Tidak mengumpulkan data pribadi anak (nama lengkap, foto, lokasi, kontak). Data penelitian memakai kode siswa. Ada lembar persetujuan orang tua/wali sebelum uji coba |
| NF-09 | Format angka | Format rupiah Indonesia: `Rp1.250.000`; desimal memakai koma: `12,5%` |
| NF-10 | Pemeliharaan | Soal disimpan sebagai data (JSON), terpisah dari kode, sehingga soal bisa ditambah tanpa mengubah kode |

## 8. Alur Pengguna Utama

```
Buka aplikasi
  └─ (pertama kali) Isi nama panggilan + kode siswa
       └─ Beranda
            ├─ Mode Belajar → Pilih Modul → Kartu materi → Contoh Lengkap → Contoh Rumpang
            │                → Latihan (Pemecah Soal → Pilih Operasi → Hitung → Cek Kewajaran → Pembahasan)
            │                → Tantangan Literasi (Stimulus → Pahami → Ubah → Hitung → Cek & Putuskan → Beri Alasan)
            │                → Skala Usaha (Paas) → Ringkasan modul
            ├─ Mode Pasar Pintar → Pilih skenario (Belanja / Berjualan / Misi Literasi) → Selesaikan misi → Struk → Skor
            └─ Rapor Saya → Progres modul + Rapor Literasi → Ekspor data (khusus peneliti, dilindungi PIN)
```

## 9. Kriteria Rilis Versi 1 (MVP)

- [ ] Modul M0–M5 lengkap, masing-masing minimal 2 contoh lengkap, 2 contoh rumpang, dan 10 soal latihan
- [ ] Simulasi Belanja (3 level) dan Simulasi Berjualan (3 level)
- [ ] Tantangan Literasi untuk M1–M5, masing-masing minimal 2 stimulus dengan 3 soal (L1–L3)
- [ ] Fitur F-01, F-02, F-03, F-10–F-13, F-15, F-16, F-20–F-22, F-30, F-31, F-33, F-40, F-41, F-43, F-44, F-50, F-60, F-61, F-62, F-64, F-66 berjalan
- [ ] Lolos uji di 1 HP Android kelas bawah dan 2 browser
- [ ] Semua layar lolos Daftar Periksa Smartphone (docs/13 bagian 11) di HP Android kelas bawah, HP Android menengah, dan iPhone
- [ ] Versi web aktif di alamat HTTPS; PWA terpasang dan berjalan offline di Android dan iPhone; APK terpasang tanpa Play Store
- [ ] QR code dan brosur panduan instalasi siap
- [ ] Skrip analisis Python berjalan pada data contoh dan lolos pytest (F-45)
- [ ] Divalidasi ahli materi dan ahli media
- [ ] Uji coba kelompok kecil (5–8 siswa) selesai dan revisi diterapkan

## 10. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Temuan wawancara hanya dari 1 responden (n = 1), kurang mewakili | Fitur bisa tidak cocok untuk siswa lain | Wawancara 3–5 siswa tambahan dari tingkat kemampuan berbeda; uji coba kelompok kecil |
| Elemen game justru menambah beban ekstrinsik | Siswa sibuk dengan game, bukan dengan matematika | Animasi seperlunya, tanpa timer di mode belajar, tanpa elemen dekoratif yang tidak relevan (DS03) |
| Kemampuan pemrograman pengembang terbatas | Proyek molor | Stack sederhana (lihat docs/05), MVP kecil, dibantu Claude Code dengan panduan di CLAUDE.md |
| Kesalahan kunci jawaban | Siswa belajar hal yang salah | Kunci jawaban dihitung otomatis dari parameter soal dan diuji dengan unit test; divalidasi ahli materi |
| HP siswa tidak mendukung | Tidak bisa dipakai | PWA sebagai alternatif tanpa instalasi; target Android 8+ |
| Siswa ragu memasang APK karena peringatan "sumber tidak dikenal"/Play Protect | APK tidak terpasang | Utamakan PWA; panduan bergambar di halaman /pasang; APK hanya sebagai cadangan |
| Keystore APK hilang | Pembaruan APK tidak bisa dipasang di atas versi lama | Cadangkan keystore dan kata sandinya di dua tempat aman, di luar Git |
| Format CSV dari JavaScript tidak cocok dengan skrip Python | Analisis gagal atau salah | Kontrak kolom di docs/06; `muat_data.py` memeriksa kolom; data contoh diuji pytest |
| Harus menguasai dua bahasa | Beban belajar pengembang | Python hanya untuk analisis (lanjutan dari mata kuliah Algoritma Pemrograman); JavaScript untuk aplikasi; dibantu Claude Code |
| Soal literasi (stimulus panjang, pengecoh) bertentangan dengan prinsip beban kognitif dan DS03 | Siswa kewalahan | Literasi ditempatkan setelah skema terbentuk; stimulus visual; level L1→L3; bantuan memilah informasi dikurangi bertahap |
| Alasan tertulis siswa sulit dinilai otomatis | Data argumentasi tidak lengkap | Versi 1: alasan pilihan ganda/melengkapi dinilai otomatis; alasan tertulis dinilai peneliti dengan rubrik dari data ekspor |

## 11. Pertanyaan Terbuka

1. Apakah uji coba memakai desain *one-group pretest–posttest* atau ada kelas kontrol? (Menentukan instrumen di docs/08)
2. Model pengembangan apa yang dipakai di skripsi: ADDIE, 4-D, atau Plomp? (Menentukan susunan roadmap)
3. Apakah sekolah mengizinkan HP di kelas, atau aplikasi dipakai di rumah?
4. Tarif PPN yang dipakai di soal: mengikuti aturan terbaru saat penelitian (cek peraturan yang berlaku) atau angka bulat (10%) agar mudah dihitung? Saran: pakai 10% untuk latihan dasar dan tarif aktual sebagai pengayaan.
5. Literasi matematika diposisikan sebagai **tujuan utama** penelitian (variabel terikat) atau **tujuan pendamping**? Jawabannya menentukan instrumen tes literasi dan judul skripsi.
6. Acuan indikator literasi: PISA, AKM numerasi, atau gabungan keduanya?
7. Catatan di laporan: K01 menyebut "di kelas delapan", padahal materi Aritmetika Sosial dipelajari di kelas VII. Perlu dikonfirmasi apakah siswa salah ingat atau materi diulang di kelas VIII.
