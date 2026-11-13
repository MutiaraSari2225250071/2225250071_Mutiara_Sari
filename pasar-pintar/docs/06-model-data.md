# 06 — Model Data

Ada tiga jenis data:
1. **Konten** (statis, JSON di `app/src/content/`): modul, istilah, contoh, template soal, stimulus, skenario simulasi. → diolah **JavaScript** (data umum)
2. **Data pengguna** (dinamis, IndexedDB lewat Dexie): profil, progres, jawaban, skor Paas. → dikelola **JavaScript** (data umum)
3. **Data penelitian** (CSV hasil ekspor + data instrumen dari luar aplikasi). → dianalisis **Python** (data statistik), lihat docs/12

## 1. Skema Konten

> Notasi di bawah memakai gaya TypeScript **hanya sebagai dokumentasi** agar struktur data mudah dibaca. Di kode, aplikasi memakai **JavaScript**: skema ini ditulis sebagai JSDoc `@typedef` di `app/src/types/skema.js`, dan konten JSON diperiksa oleh fungsi validasi saat build/test.

```ts
type KodeModul = 'M0' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
type Level = 1 | 2 | 3;
type JenisNilai =
  | 'hargaAwal' | 'potongan' | 'hargaAkhir'
  | 'hargaBeli' | 'hargaJual' | 'untung' | 'rugi'
  | 'persenDiskon' | 'persenUntung' | 'persenRugi'
  | 'pajak' | 'total';

interface Modul {
  kode: KodeModul;
  judul: string;              // "Diskon"
  tujuan: string;             // TP
  prasyarat: KodeModul[];
  urutan: number;
}

interface KartuIstilah {
  id: string;
  modul: KodeModul;
  istilah: string;            // "Harga Awal"
  jenis?: JenisNilai;         // untuk warna label
  penjelasan: string;         // ≤ 40 kata
  contoh?: string;
}

interface Langkah {
  id: string;
  instruksi: string;          // "Hitung besar potongan"
  rumusTampil?: string;       // "Diskon × Harga Awal"
  hitung: string;             // nama fungsi lib/matematika + argumen
  label: JenisNilai;
  pilihanOperasi?: { teks: string; benar: boolean; umpanBalik: string }[];
}

interface ContohSoal {        // contoh lengkap / rumpang
  id: string;
  modul: KodeModul;
  jenis: 'lengkap' | 'rumpang';
  teks: string;
  nilai: Record<string, number>;
  langkah: Langkah[];
  langkahKosong?: string[];   // id langkah yang dikosongkan (rumpang)
}

interface TemplateSoal {
  id: string;                 // "M4-L1-T01"
  modul: KodeModul;
  level: Level;
  tipe: 'pg' | 'isian' | 'bertahap' | 'jodoh' | 'tabel' | 'susun';
  konteks: string;            // "warung_buah", "toko_alat_tulis", ...
  template: string;           // kalimat dengan {placeholder}
  parameter: Record<string, { pilihan?: number[]; min?: number; max?: number; kelipatan?: number }>;
  ditanya: JenisNilai;
  langkah: Langkah[];
  cekKewajaran?: string;      // ekspresi, misalnya "hargaAkhir < hargaAwal"
  miskonsepsi?: { kode: string; jikaJawaban: string; pesan: string }[];
  petunjuk: [string, string, string];  // 3 tingkat
  // --- tag literasi (wajib) ---
  proses: ProsesLiterasi[];
  levelKognitif: 'pemahaman' | 'penerapan' | 'penalaran';
  konteksLiterasi: 'personal' | 'sosialBudaya' | 'saintifik';
}

type ProsesLiterasi = 'merumuskan' | 'menerapkan' | 'menafsirkan';

interface Stimulus {
  id: string;
  jenis: 'labelCoret' | 'brosur' | 'struk' | 'tokoDaring' | 'catatanJualan' | 'grafik' | 'daftarHarga';
  judul: string;                       // nama toko fiktif
  data: Record<string, unknown>;       // isi stimulus, dirender oleh komponen SVG sesuai jenis
  infoRelevan: string[];               // id informasi yang dibutuhkan
  infoPengecoh: string[];              // id informasi yang tidak dibutuhkan
}

interface SoalLiterasi {
  id: string;                          // "TL-M4-S01-L2"
  modul: KodeModul;
  stimulusId: string;
  levelLiterasi: 'L1' | 'L2' | 'L3';
  tipe: 'isian' | 'pg' | 'pgKompleks' | 'klaim' | 'bandingkan' | 'uraian';
  pertanyaan: string;
  langkahSiklus: { pahami?: Langkah[]; ubah?: Langkah[]; hitung?: Langkah[]; cek?: Langkah[] };
  kunci: number | string | string[];
  pilihanAlasan?: { teks: string; benar: boolean }[];
  contohAlasanBaik?: string;           // untuk penilaian diri pada uraian
  proses: ProsesLiterasi[];
  levelKognitif: 'pemahaman' | 'penerapan' | 'penalaran';
  konteksLiterasi: 'personal' | 'sosialBudaya' | 'saintifik';
}

interface SoalJadi {          // hasil generator
  idTemplate: string;
  seed: number;
  teks: string;
  kalimat: string[];          // untuk Pemecah Soal
  nilai: Record<string, number>;   // parameter + semua nilai antara
  kunci: number;
  langkah: Langkah[];
}

interface SkenarioSimulasi {
  id: string;
  mode: 'belanja' | 'berjualan';
  level: Level;
  judul: string;              // "Belanja Alat Tulis"
  anggaran?: number;
  barang: { id: string; nama: string; ikon: string; harga: number; diskon?: number }[];
  pakaiPajak?: boolean;
  misi: string;               // ≤ 2 kalimat
}
```

## 2. Skema Database Lokal (Dexie / IndexedDB)

```js
// app/src/lib/db/schema.js
db.version(1).stores({
  profil:       'id',                                   // satu baris
  progresModul: 'modul',
  jawaban:      '++id, sesiId, modul, idTemplate, waktu',
  sesi:         'id, modul, mulai',
  skalaPaas:    '++id, sesiId, modul, waktu',
  jawabanLiterasi: '++id, sesiId, idSoal, levelLiterasi, waktu',
  simulasi:     '++id, skenarioId, waktu',
  pengaturan:   'kunci',
});
```

| Tabel | Kolom | Keterangan |
|---|---|---|
| `profil` | `id`, `namaPanggilan`, `kodeSiswa`, `kelas`, `dibuat` | Tanpa data pribadi lain |
| `progresModul` | `modul`, `tahap` (`istilah`/`contoh`/`rumpang`/`latihan`/`selesai`), `level`, `benarBeruntun`, `akurasi`, `diperbarui` | Satu baris per modul |
| `sesi` | `id`, `modul`, `jenis` (`belajar`/`simulasi`), `mulai`, `selesai` | Satu sesi = satu set latihan |
| `jawaban` | `id`, `sesiId`, `modul`, `idTemplate`, `seed`, `level`, `langkahId`, `jawabanSiswa`, `kunci`, `benar`, `kodeMiskonsepsi`, `petunjukDibuka` (0–3), `durasiMs`, `waktu` | Satu baris per langkah yang dijawab |
| `skalaPaas` | `id`, `sesiId`, `modul`, `nilai` (1–9), `waktu` | F-43 |
| `jawabanLiterasi` | `id`, `sesiId`, `idSoal`, `levelLiterasi`, `langkahSiklus`, `proses`, `levelKognitif`, `jawabanSiswa`, `benarJawaban`, `alasanDipilih`, `alasanTeks`, `benarAlasan`, `infoDitandai` (array), `skorRubrik` (diisi peneliti), `durasiMs`, `waktu` | F-60–F-66 |
| `simulasi` | `id`, `skenarioId`, `level`, `skor`, `kesalahan` (array), `durasiMs`, `waktu` | |
| `pengaturan` | `kunci`, `nilai` | `ukuranHuruf`, `tema`, `pinPenelitiHash` |

Setiap perubahan skema **wajib** menaikkan `db.version(n)` dan menyertakan fungsi migrasi.

## 3. Format Ekspor Data Penelitian (F-44): Kontrak JavaScript → Python

File ini adalah **kontrak** antara aplikasi (JavaScript) dan analisis (Python). JavaScript menulis CSV, Python membacanya. Jika kolom berubah, ubah keduanya bersamaan dan naikkan `versiSkema`.

Aturan format:
- File CSV, satu file per tabel, nama file `pasar-pintar_<kodeSiswa>_<tanggal>_<tabel>.csv`
- UTF-8, pemisah **koma**, desimal memakai **titik** (`12.5`), boolean ditulis `1`/`0`
- Waktu dalam ISO 8601 (`2026-12-01T09:12:03`)
- Satu file tambahan `metadata.json`: `{ "versiSkema": 1, "versiAplikasi": "1.0.0", "kodeSiswa": "S01", "diekspor": "..." }`
- Tabel yang diekspor: `jawaban`, `jawaban_literasi`, `skala_paas`, `progres_modul`, `sesi`, `simulasi`

Contoh `jawaban.csv`:

```csv
kodeSiswa,sesiId,modul,idTemplate,level,langkahId,jawabanSiswa,kunci,benar,kodeMiskonsepsi,petunjukDibuka,durasiMs,waktu
S01,ses-001,M4,M4-L1-T01,1,potongan,20000,20000,1,,0,18450,2026-12-01T09:12:03
S01,ses-001,M4,M4-L1-T01,1,hargaAkhir,20000,60000,0,MK1,1,25110,2026-12-01T09:12:30
```

Contoh `skala_paas.csv`:

```csv
kodeSiswa,sesiId,modul,nilai,waktu
S01,ses-001,M4,5,2026-12-01T09:20:11
```

Ekspor juga tersedia dalam format JSON (satu file berisi semua tabel) untuk cadangan.

## 4. Indikator yang Bisa Dihitung dari Data

Kolom **Bahasa** mengikuti aturan pembagian: indikator untuk siswa di aplikasi dihitung JavaScript, sedangkan analisis penelitian dihitung Python.

| Indikator | Rumus | Untuk | Bahasa |
|---|---|---|---|
| Akurasi per modul (milik 1 siswa) | benar / total langkah | Rapor Saya | JavaScript |
| Skor literasi per proses (milik 1 siswa) | benar / total per `proses` | Rapor Literasi (F-67) | JavaScript |
| Akurasi per modul (kelas) | statistik deskriptif | Analisis | Python |
| Rata-rata Paas per modul | mean, SD | Beban kognitif (T1) | Python |
| Efisiensi instruksional | (z_skor − z_paas) / √2 (Paas & van Merriënboer, 1993) | Analisis penelitian | Python |
| Frekuensi miskonsepsi | jumlah per kode MK | Evaluasi konten | Python |
| Ketergantungan petunjuk | rata-rata `petunjukDibuka` | Evaluasi *scaffolding* | Python |
| Skor literasi per proses (kelas) | rata-rata, N-Gain per proses | T6 | Python |
| Ketepatan memilah informasi | info relevan ditandai − info pengecoh ditandai | Indikator merumuskan | Python |
| Kualitas alasan | % `benarAlasan`; rata-rata `skorRubrik`; Cohen's kappa | Indikator penalaran | Python |
