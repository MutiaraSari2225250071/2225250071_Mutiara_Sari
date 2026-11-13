# 07 — Roadmap dan Daftar Tugas

Roadmap ini disusun mengikuti model pengembangan **ADDIE** (*Analysis, Design, Development, Implementation, Evaluation*). Jika skripsi memakai model lain (4-D atau Plomp), tahapan bisa dipetakan ulang:

| ADDIE | 4-D (Thiagarajan) | Plomp |
|---|---|---|
| Analysis | Define | Preliminary research |
| Design | Design | Prototyping phase |
| Development | Develop | Prototyping phase |
| Implementation, Evaluation | Disseminate | Assessment phase |

> Perkiraan durasi di bawah adalah usulan untuk pengembang yang masih belajar, bekerja paruh waktu. Sesuaikan dengan jadwal akademik.

---

## Fase 0 — Analisis (sebagian sudah selesai)

- [x] Wawancara siswa S01 dan pengodean IL/EL/GL
- [x] Dokumen perencanaan (folder ini)
- [ ] Wawancara 3–5 siswa tambahan dan memperbarui `docs/01`
- [ ] Wawancara/observasi guru matematika (kebutuhan dan kurikulum sekolah)
- [ ] Analisis CP/TP resmi dan buku siswa yang dipakai sekolah
- [ ] Review dokumen perencanaan dengan dosen pembimbing

## Fase 1 — Desain (± 2 minggu)

- [ ] *Paper prototype* / Figma untuk 7 layar utama (docs/04 bagian 4)
- [ ] Uji *paper prototype* ke 1–2 siswa (5–10 menit per orang)
- [ ] Menulis konten M4 Diskon lengkap (sebagai modul percontohan)
- [ ] Menyusun instrumen: lembar validasi ahli materi, ahli media, angket kepraktisan, soal pretest–posttest
- [ ] Menyusun **tes literasi matematika** (kisi-kisi berbasis PISA/AKM) dan rubrik alasan (docs/08 bagian 2.4)
- [ ] Merancang 2 stimulus literasi untuk M4 sebagai percontohan

## Fase 2 — Pengembangan

### Milestone 1: Fondasi (± 1–2 minggu)
- [ ] Siapkan alat: Node.js LTS, Python 3.11+, Git, VS Code, Android Studio
- [ ] Buat folder `app/` dengan `npm create vite@latest app -- --template react` (**JavaScript**), pasang Tailwind, ESLint, Vitest
- [ ] Buat folder `analisis/` dengan `venv`, `requirements.txt`, pytest, ruff
- [ ] `.gitignore`: `node_modules`, `.venv`, `analisis/data/mentah`, `analisis/data/olahan`, `analisis/hasil`, `*.jks`
- [ ] Token warna dan font sesuai docs/04
- [ ] `app/src/lib/matematika` + unit test lengkap (diskon, untung-rugi, persen, pajak, format)
- [ ] Routing dan layout dasar *mobile first*: viewport, `dvh`, area aman, bilah navigasi bawah, tombol kembali (docs/13)
- [ ] Komponen `KeypadRupiah` (F-57) beserta test
- [ ] Atur Lighthouse Mobile dan anggaran ukuran bundle sejak awal
- [ ] **Deploy awal ke hosting** (Netlify/GitHub Pages) agar sejak awal bisa dicoba di browser HP

### Milestone 2: Modul Percontohan M4 Diskon (± 2–3 minggu)
- [ ] Komponen: `LabelHarga`, `BarModel`, `InputRupiah`, `TombolUtama`
- [ ] Kartu Istilah (F-02)
- [ ] Contoh Lengkap langkah demi langkah (F-01)
- [ ] Contoh Rumpang (F-01)
- [ ] Generator soal dari template (docs/03 bagian 4.2)
- [ ] Latihan: Pemecah Soal (F-10), Pilih Operasi (F-13), hitung, Cek Kewajaran (F-16)
- [ ] Umpan balik + miskonsepsi (F-20, F-22) + Pembahasan (F-21)
- [ ] Petunjuk 3 tingkat (F-15)
- [ ] Skala Paas (F-43)
- [ ] **Uji internal**: coba ke 1–2 siswa, catat masalah

### Milestone 3: Penyimpanan dan Rapor (± 1 minggu)
- [ ] Dexie: skema docs/06, onboarding (F-50)
- [ ] Simpan progres dan jawaban seketika (F-40); minta `navigator.storage.persist()`
- [ ] Lanjutkan dari posisi terakhir + cadangan/pulihkan JSON (F-59)
- [ ] Beberapa profil di satu HP (F-58)
- [ ] Rapor Saya (F-41)
- [ ] Ekspor CSV/JSON dengan PIN sesuai kontrak docs/06 bagian 3 (F-44)
- [ ] Buat data contoh (dummy) dari hasil ekspor untuk `analisis/data/contoh/`

### Milestone 4: Modul Lainnya (± 3–4 minggu)
- [ ] Konten dan template M0, M1, M2, M3, M5
- [ ] Aturan adaptif (docs/02 bagian 3) dan rujukan ke M0 (F-04)
- [ ] Soal Kembar (F-23), Jelaskan ke Teman (F-24)

### Milestone 4b: Literasi Matematika (± 2–3 minggu)
- [ ] Komponen `Stimulus` (label coret, brosur, struk, toko daring, catatan jualan) dalam SVG (F-60)
- [ ] Komponen `SiklusLiterasi` 4 langkah (F-61)
- [ ] Fungsi `bandingkanPenawaran` + `hargaPerSatuan` dengan unit test
- [ ] Mana Lebih Hemat? (F-62) dan Beri Alasan (F-64)
- [ ] Detektif Promo (F-63)
- [ ] Tag literasi di semua soal + validasi generator (F-66)
- [ ] Konten: 10 stimulus × 3 soal (L1–L3) untuk M1–M5
- [ ] Tabel `jawabanLiterasi` + ekspor CSV
- [ ] Rapor Literasi (F-67)

### Milestone 5: Pasar Pintar (± 2–3 minggu)
- [ ] Simulasi Belanja Level 1–3 (F-30, F-32)
- [ ] Simulasi Berjualan Level 1–3 (F-31)
- [ ] Skenario: warung buah, toko alat tulis, minimarket, kantin (F-33)
- [ ] Misi Literasi: Misi Anggaran, Misi Pedagang, Misi Koperasi (F-65)

### Milestone 6: PWA, APK, dan Distribusi Tanpa Toko Aplikasi (± 1–2 minggu)
- [ ] PWA: manifest, service worker, ikon biasa & *maskable*, meta tag iOS (NF-02)
- [ ] Tombol "Pasang Aplikasi" + panduan iOS (F-54)
- [ ] Pemberitahuan versi baru (F-56)
- [ ] Lighthouse: kategori PWA lulus
- [ ] Capacitor: `npx cap add android`, buat *keystore*, build **APK release bertanda tangan**
- [ ] Unggah APK ke GitHub Releases; halaman `/pasang` dengan tautan unduh dan QR code (F-55)
- [ ] Desain dan cetak brosur dengan QR code (docs/11 bagian 1)
- [ ] Uji instalasi: PWA di Android & iPhone, APK di HP Android kelas bawah, mode pesawat (NF-03, NF-04, NF-11)
- [ ] Plugin Capacitor: tombol kembali, status bar, splash, keyboard, haptics
- [ ] **Uji smartphone menyeluruh**: semua layar lolos Daftar Periksa docs/13 bagian 11; perbaiki temuan

### Milestone 7: Analisis Statistik dengan Python (± 2 minggu; bisa paralel sejak Milestone 3)
- [ ] `muat_data.py`: baca CSV ekspor + cek kolom & `versiSkema`
- [ ] Data contoh 30 siswa fiktif (aplikasi + instrumen)
- [ ] `instrumen.py`: validitas butir, Cronbach's alpha/KR-20, tingkat kesukaran, daya beda
- [ ] `validasi_ahli.py`, `kepraktisan.py` (termasuk SUS)
- [ ] `efektivitas.py`: N-Gain, Shapiro–Wilk, uji-t/Wilcoxon, ukuran efek
- [ ] `beban_kognitif.py`: Paas, efisiensi instruksional
- [ ] `literasi.py`: skor per proses, rubrik, Cohen's kappa
- [ ] `log_aplikasi.py`: miskonsepsi, penggunaan petunjuk
- [ ] `grafik.py` + `skrip/jalankan_semua.py` → tabel Excel dan grafik PNG
- [ ] Test pytest untuk semua rumus (hasil dicocokkan dengan Excel/SPSS)
- [ ] (Opsional) Dasbor Streamlit (F-46)

## Fase 3 — Validasi dan Revisi (± 2 minggu)

- [ ] Validasi ahli materi (dosen/guru matematika)
- [ ] Validasi ahli media (dosen TI/media pembelajaran)
- [ ] Revisi berdasarkan saran validator

## Fase 4 — Implementasi (Uji Coba)

- [ ] Izin sekolah dan persetujuan orang tua/wali
- [ ] Uji coba perorangan (*one-to-one*, 2–3 siswa)
- [ ] Uji coba kelompok kecil (5–8 siswa) → revisi
- [ ] Uji coba lapangan (1 kelas): pretest → pemakaian aplikasi → posttest + Paas + angket

## Fase 5 — Evaluasi dan Pelaporan

- [ ] Analisis data dengan skrip Python (docs/12) pada data asli
- [ ] Revisi akhir aplikasi
- [ ] Penulisan laporan/skripsi

---

## Cara Bekerja dengan Claude Code per Tugas

Contoh perintah untuk setiap tugas:

```
Kerjakan Milestone 1: buat fungsi di app/src/lib/matematika/diskon.js sesuai
docs/05 bagian 4.1, beserta unit test di app/tests/matematika/diskon.test.js.
Ikuti aturan di CLAUDE.md. Jelaskan kodenya dengan bahasa sederhana.
```

```
Kerjakan Milestone 7: buat fungsi hitung_n_gain di
analisis/pasar_pintar_analisis/efektivitas.py beserta test pytest.
Ini data statistik, jadi pakai Python sesuai CLAUDE.md.
```

```
Buat komponen BarModel (F-12) sesuai docs/04 bagian 2.1 dan 4.2.
Tunjukkan dulu rencananya sebelum menulis kode.
```

Centang tugas di file ini setiap kali selesai, agar progres terlihat.
