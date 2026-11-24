# Pasar Pintar — Aplikasi Belajar Aritmetika Sosial (SMP)

> Nama kerja (*working title*): **Pasar Pintar**. Nama ini boleh diganti.

Aplikasi belajar matematika materi **Aritmetika Sosial** (kelas VII SMP) yang **dibuka di browser** dan **dapat dipasang tanpa Play Store/App Store**, baik sebagai PWA (Android, iPhone, laptop) maupun sebagai file APK Android. Desainnya mengikuti **Teori Beban Kognitif** (*Cognitive Load Theory*, CLT) dan disusun dari hasil wawancara siswa (kode responden **S01**, kelas VIII A, 6 November 2026).

Inti aplikasinya adalah **simulasi belanja dan berjualan**: siswa membeli barang dengan anggaran tertentu, menghitung diskon dan pajak, lalu berjualan dan menghitung untung/rugi. Semua dibantu langkah-langkah bertahap (*scaffolding*) yang mengurangi beban kognitif.

Aplikasi ini juga bertujuan **menumbuhkembangkan literasi matematika**. Siswa dilatih membaca brosur promo, struk, dan catatan jualan, membandingkan penawaran, lalu mengambil keputusan beserta alasannya melalui siklus **Pahami → Ubah → Hitung → Cek & Putuskan** (kerangka PISA/AKM).

## Bahasa Pemrograman

| Jenis data | Bahasa | Folder |
|---|---|---|
| Data umum (aplikasi siswa, materi, soal, simulasi, progres) | **JavaScript** (React) | `app/` |
| Data statistik (analisis penelitian, uji statistik, grafik laporan) | **Python** (pandas, scipy) | `analisis/` |

Keduanya terhubung lewat file CSV yang diekspor dari aplikasi.

## Struktur Dokumen Perencanaan

| File | Isi | Dibaca oleh |
|---|---|---|
| [PRD.md](PRD.md) | Product Requirements Document: masalah, tujuan, pengguna, fitur, kriteria keberhasilan | Semua |
| [CLAUDE.md](CLAUDE.md) | Panduan untuk Claude Code / asisten AI saat menulis kode proyek ini | AI & developer |
| [docs/01-riset-pengguna.md](docs/01-riset-pengguna.md) | Ringkasan wawancara S01 dan pemetaannya ke kebutuhan desain | Peneliti, desainer |
| [docs/02-desain-pembelajaran.md](docs/02-desain-pembelajaran.md) | Prinsip CLT, alur belajar, strategi *scaffolding* | Peneliti, desainer konten |
| [docs/03-spesifikasi-konten.md](docs/03-spesifikasi-konten.md) | Capaian pembelajaran, peta materi, format dan contoh bank soal | Desainer konten |
| [docs/04-desain-ui-ux.md](docs/04-desain-ui-ux.md) | Prinsip tampilan, layar-layar utama, *wireframe* teks | Desainer, developer |
| [docs/05-arsitektur-teknis.md](docs/05-arsitektur-teknis.md) | *Tech stack*, struktur folder, alur build web & Android | Developer |
| [docs/06-model-data.md](docs/06-model-data.md) | Skema data soal, progres, dan penyimpanan lokal | Developer |
| [docs/07-roadmap.md](docs/07-roadmap.md) | Tahapan pengerjaan (milestone) dan daftar tugas | Semua |
| [docs/08-rencana-pengujian.md](docs/08-rencana-pengujian.md) | Pengujian teknis + uji coba ke siswa (validasi ahli, kepraktisan, keefektifan) | Peneliti, developer |
| [docs/09-glosarium.md](docs/09-glosarium.md) | Istilah matematika, pedagogi, dan teknis | Semua |
| [docs/10-literasi-matematika.md](docs/10-literasi-matematika.md) | Kerangka literasi (PISA/AKM), siklus pemodelan, jenis aktivitas, level L1–L3, indikator dan rapor literasi | Peneliti, desainer konten |
| [docs/11-distribusi-dan-instalasi.md](docs/11-distribusi-dan-instalasi.md) | Membuka di browser, memasang PWA & APK tanpa toko aplikasi, hosting, QR code dan brosur | Developer, guru, siswa |
| [docs/12-analisis-data-python.md](docs/12-analisis-data-python.md) | Alur data, format instrumen, analisis statistik dengan Python, rumus, dan aturan kode | Peneliti, developer |
| [docs/14-integrasi-ai.md](docs/14-integrasi-ai.md) | Fitur AI Tanya Pinta dan Jelaskan kesalahanku (DeepSeek lewat Cloudflare Worker), privasi, panduan pemasangan API key | Developer, peneliti |
| [docs/13-optimasi-smartphone.md](docs/13-optimasi-smartphone.md) | Perangkat sasaran, anggaran kinerja, tata letak, Keypad Rupiah, interaksi sentuh, keamanan data, daftar periksa smartphone | Developer, desainer |

## Urutan Membaca yang Disarankan

1. `PRD.md` untuk gambaran besar.
2. `docs/01-riset-pengguna.md` untuk alasan di balik tiap fitur.
3. `docs/02` → `docs/04` untuk desain.
4. `docs/05` → `docs/07` sebelum mulai menulis kode.
5. `CLAUDE.md` setiap kali bekerja dengan asisten AI.

## Status

- [x] Wawancara siswa (S01) dan pengodean IL/EL/GL
- [x] Dokumen perencanaan
- [ ] Validasi dokumen perencanaan oleh dosen pembimbing
- [ ] Wawancara tambahan (disarankan 3–5 siswa lagi)
- [ ] Prototipe (Milestone 1)

## Penyusun

Mutiara Sari (2225250071), S1 Pendidikan Matematika.
