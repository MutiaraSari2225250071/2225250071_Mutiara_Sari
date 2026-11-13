# 01 — Riset Pengguna: Hasil Wawancara dan Implikasi Desain

## 1. Ringkasan Wawancara

| Atribut | Nilai |
|---|---|
| Kode responden | S01 |
| Kelas | VIII A |
| Tanggal | 6 November 2026 |
| Pewawancara | Mutiara Sari |
| Durasi | 25 menit, direkam dengan persetujuan narasumber |
| Materi | Aritmetika Sosial (dipelajari di kelas VII) |
| Artefak pemicu | LKPD Aritmetika Sosial kelas VII dari sumber lain (catatan asli responden hilang karena musibah; responden mengonfirmasi materinya sama) dan soal-soal latihan Aritmetika Sosial |
| Skema kode | **K** = konteks/ingatan, **IL** = beban intrinsik, **EL** = beban ekstrinsik, **GL** = beban germane, **DS** = saran desain |

## 2. Temuan per Kategori

### K — Konteks dan Ingatan Siswa

| Kode | Inti temuan |
|---|---|
| K01 | Siswa mengingat rumus *penjualan = pembelian + keuntungan*. Rumus dasar sudah melekat. |
| K02 | Pembelajaran memakai contoh praktik jual beli **mangga dan jambu**. Konteks konkret mudah diingat. |
| K03 | Materi yang diingat: harga jual/beli, untung–rugi, diskon. Dianggap berguna dalam kehidupan sehari-hari. |

**Kesimpulan:** Siswa punya *skema awal* (rumus dasar + konteks jual beli). Aplikasi dapat dibangun di atas skema ini dan tidak perlu mulai dari nol.

### IL — Beban Intrinsik (kerumitan materi)

| Kode | Inti temuan |
|---|---|
| IL01 | Menghitung **persentase** masih sulit dimengerti. |
| IL02 | Sering **tertukar** antara harga awal, besar diskon, dan harga setelah diskon. |
| IL03 | Prasyarat lemah: **perkalian, pembagian, pecahan**. |
| IL04 | Soal cerita berbelit dan **angka (uang) besar**. *(Catatan: sebagian ini termasuk beban ekstrinsik karena berkaitan dengan cara penyajian.)* |
| IL05 | Kadang **keliru memilih operasi hitung**. |

**Kesimpulan:** Interaktivitas elemen tinggi. Siswa harus sekaligus memegang beberapa nilai harga, persen, dan operasi di memori kerja. Persen dan prasyarat aritmetika adalah titik rawan utama.

### EL — Beban Ekstrinsik (cara penyajian)

| Kode | Inti temuan |
|---|---|
| EL01 | Contoh guru **pendek dengan angka kecil**, sedangkan soal buku berbeda tipe. Lompatan tingkat kesulitan terlalu jauh. |
| EL02 | Siswa **tidak** merasa terganggu karena harus bolak-balik membandingkan informasi. *(Split-attention tidak dilaporkan, tetapi tetap dicegah dalam desain.)* |
| EL03 | **Gambar beresolusi buruk** mengganggu pemahaman. |
| EL04 | Bagian **keuntungan** dirasa lebih sulit daripada diskon. |
| EL05 | Sulit menentukan **besar potongan harga** (terkait IL01). |

**Kesimpulan:** Penyajian bisa diperbaiki dengan transisi tingkat kesulitan yang mulus, visual yang tajam, dan bantuan khusus untuk topik keuntungan dan potongan.

### GL — Beban Germane (yang membantu pemahaman)

| Kode | Inti temuan |
|---|---|
| GL01 | **Simulasi belanja** membuat materi mudah dimengerti. |
| GL02 | Siswa **mengecek** hasil dengan membandingkan ke harga sebelum diskon. |
| GL03 | **Pembahasan setelah menjawab** membantu siswa akhirnya bisa mengerjakan sendiri. |
| GL04 | Siswa **belum pernah menjelaskan** penyelesaian ke teman. |
| GL05 | Siswa memakai **pola soal sebelumnya** dan template *diketahui–ditanya*; konteks berbeda, cara hitung mirip. |

**Kesimpulan:** Siswa sudah punya strategi metakognitif yang baik (pengecekan, pengenalan pola). Aplikasi perlu memperkuat strategi ini secara eksplisit. Penjelasan diri (*self-explanation*) belum terbiasa dan bisa dilatih.

### DS — Saran Desain dari Siswa

| Kode | Saran |
|---|---|
| DS01 | Contoh **simulasi belanja** karena akan diterapkan sehari-hari. |
| DS02 | Materi **pajak** perlu dijelaskan; materi **diskon** bisa langsung dicoba. |
| DS03 | **Jangan terlalu banyak tulisan** dan gambar tidak relevan; **instruksi singkat**. |
| DS04 | **Permainan simulasi belanja**: memilih barang dengan uang yang sudah ditentukan, menghitung diskon, menentukan untung/rugi. "Belajar sambil bermain." |

## 3. Matriks Temuan → Keputusan Desain

| Temuan | Prinsip CLT terkait | Keputusan desain | ID fitur PRD |
|---|---|---|---|
| IL01, EL05 | Mengelola beban intrinsik; *pre-training* | Modul persen bertahap; model batang visual; persen dipecah menjadi "per seratus" | F-12, F-15, M0 |
| IL02 | Mengurangi beban ekstrinsik; *signaling* | Label warna dan nama tetap untuk tiap jenis harga; umpan balik miskonsepsi | F-11, F-22 |
| IL03 | *Pre-training* | Modul pemanasan prasyarat dan rujukan otomatis saat salah hitung | M0, F-04 |
| IL04 | *Segmenting*; *signaling* | Pemecah Soal Cerita per kalimat; pemisah ribuan otomatis; kalkulator bertahap | F-10, F-14 |
| IL05 | *Worked example*; *self-explanation* | Langkah "Pilih Operasi" sebelum menghitung | F-13 |
| EL01 | *Sequencing* sederhana → kompleks | Angka naik bertahap dari kecil ke besar; contoh rumpang menjembatani contoh dan latihan | F-03, F-01 |
| EL02 | *Spatial contiguity* | Soal dan kotak jawaban selalu dalam satu layar (pencegahan) | NF, docs/04 |
| EL03 | Menghapus beban ekstrinsik | Semua ilustrasi SVG | NF-06 |
| EL04 | *Worked example* tambahan | Modul untung–rugi diberi lebih banyak contoh lengkap dan langkah | M1–M3 |
| GL01, DS01, DS04 | Konteks bermakna (germane) | Mode Pasar Pintar (simulasi belanja dan berjualan dengan anggaran) | F-30–F-33 |
| GL02 | Metakognisi | Langkah Cek Kewajaran | F-16 |
| GL03 | *Worked example*; umpan balik | Pembahasan bertahap setelah menjawab | F-21 |
| GL04 | *Self-explanation* | Fitur Jelaskan ke Teman (menyusun langkah) | F-24 |
| GL05 | Konstruksi skema; variabilitas | Template Diketahui–Ditanya; Soal Kembar dengan konteks berbeda | F-10, F-23 |
| DS02 | — | Modul pajak dengan kartu materi; diskon langsung latihan setelah 1 contoh | M5, M4 |
| DS03 | *Coherence principle* | Kartu ≤ 40 kata, instruksi ≤ 2 kalimat, tanpa dekorasi | F-02, NF-07 |

## 4. Keterbatasan dan Rekomendasi Riset Lanjutan

1. **Satu responden (n = 1).** Temuan bersifat eksploratif. Disarankan menambah 3–5 responden dengan kemampuan matematika berbeda (rendah, sedang, tinggi), lalu memperbarui matriks di atas.
2. **Artefak pengganti.** LKS asli hilang, sehingga dipakai LKPD pembanding. Catat hal ini sebagai keterbatasan di laporan.
3. **Ketidakkonsistenan kelas.** K01 menyebut "di kelas delapan" padahal materi kelas VII. Perlu dikonfirmasi ke responden.
4. **Kode IL04 sebagian EL.** Panjang soal cerita adalah masalah penyajian (EL), sedangkan besarnya angka menambah elemen yang diolah (IL). Pertimbangkan pengodean ganda atau diskusikan dengan pembimbing.
5. **Validasi kode.** Sebaiknya ada pengode kedua (teman sejawat/dosen) untuk mengecek reliabilitas pengodean.

## 5. Panduan Wawancara Lanjutan (usulan)

Untuk responden berikutnya, tambahkan pertanyaan:

- "Kalau melihat soal cerita panjang, apa yang pertama kamu lakukan?" (strategi membaca, IL04)
- "Coba jelaskan beda harga awal, potongan, dan harga bayar dengan kata-katamu." (cek miskonsepsi IL02)
- Tunjukkan prototipe kertas (*paper prototype*) layar Pemecah Soal dan Model Batang: "Apakah ini membantu atau membingungkan?"
- "HP apa yang kamu pakai? Apakah sering ada kuota internet?" (kebutuhan teknis)
