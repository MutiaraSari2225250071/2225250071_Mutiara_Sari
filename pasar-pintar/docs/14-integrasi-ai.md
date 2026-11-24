# 14 — Integrasi AI (Pinta AI dengan DeepSeek)

## 1. Fitur

| ID | Fitur | Di mana | Aturan |
|---|---|---|---|
| F-70 | **Tanya Pinta** | Tombol kuning di layar soal latihan (tahap Pahami, Pilih Operasi, Hitung) | Petunjuk bertahap, maksimal 3 kalimat, diakhiri satu pertanyaan pancingan. **Tidak memberi jawaban akhir.** Maksimal 5 pertanyaan per soal. Ada 3 pertanyaan cepat + kolom ketik (maks. 200 karakter) |
| F-71 | **Jelaskan kesalahanku** | Kartu di layar pembahasan, hanya jika siswa salah 2 kali | Pinta membandingkan isian siswa dengan nilai benar, menyebut langkah yang keliru dan kemungkinan penyebabnya, lalu memberi satu tips |

Hubungan dengan CLT: Tanya Pinta adalah *scaffolding* sesuai permintaan siswa (pengganti guru saat belajar mandiri, GL03). Jelaskan kesalahanku mendukung umpan balik miskonsepsi yang lebih personal. Agar tidak menambah beban ekstrinsik, jawaban AI dibatasi pendek dan panelnya bisa ditutup.

## 2. Arsitektur

```
HP siswa (aplikasi, GitHub Pages)
   │  POST {jenis, konteks soal, pertanyaan, riwayat ≤4, rahasia}
   ▼
Cloudflare Worker "pinta-ai"  (ai-worker/worker.js)
   • menyimpan DEEPSEEK_API_KEY sebagai Secret (tidak pernah ada di aplikasi/GitHub)
   • aturan AI (system prompt) ditulis di sini, tidak bisa diubah dari HP
   • hanya menerima permintaan dari alamat aplikasi (CORS + cek Origin)
   • batas 40 permintaan / 10 menit per alamat IP, jawaban maks. 250 token
   • lapisan pengaman: angka jawaban akhir disembunyikan ("…") jika AI menyebutnya
   ▼
API DeepSeek (model deepseek-chat)
```

- Fitur AI **hanya muncul** jika `AI_URL` di aplikasi sudah diisi dan aplikasi dibuka dari **versi web (GitHub Pages)**. Di link claude.ai, fitur ini tidak muncul.
- Jika tidak ada internet, Pinta menampilkan pesan. Bagian lain aplikasi tetap berjalan offline.

## 3. Privasi Anak

| Dikirim ke AI | Tidak pernah dikirim |
|---|---|
| Teks soal, Diketahui/Ditanya, rumus langkah, nilai benar, isian siswa, pertanyaan siswa (maks. 200 karakter), 4 pesan obrolan terakhir | Nama panggilan, kode siswa, rapor, skor Paas, data perangkat |

- Panel Tanya Pinta menampilkan pemberitahuan: "Pertanyaanmu dikirim ke layanan AI (DeepSeek) tanpa nama atau kode siswa."
- **Tambahkan di lembar persetujuan orang tua/wali**: aplikasi memiliki fitur AI opsional yang mengirim teks pertanyaan siswa (tanpa identitas) ke penyedia AI pihak ketiga.
- Ingatkan siswa agar tidak menulis data pribadi di kolom pertanyaan.

## 4. Langkah Pemasangan (dikerjakan pemilik akun)

> **Jangan pernah** menempel API key di aplikasi, di GitHub, atau di chat. API key hanya dimasukkan di dashboard Cloudflare sebagai **Secret**. Nama menu di dashboard bisa sedikit berbeda dari panduan ini.

### Langkah 1 — API key DeepSeek
1. Buka **platform.deepseek.com**, lalu daftar atau masuk.
2. Isi saldo (**Top up**). API DeepSeek berbayar per pemakaian.
3. Buka menu **API Keys** → **Create new API key**, beri nama `pasar-pintar`.
4. Salin kuncinya (diawali `sk-...`) dan simpan sementara di tempat aman. Kunci hanya ditampilkan sekali.

### Langkah 2 — Membuat Cloudflare Worker
1. Buka **dash.cloudflare.com**, lalu daftar gratis atau masuk.
2. Pilih **Workers & Pages** → **Create** → **Create Worker** (pilih template "Hello World").
3. Beri nama `pinta-ai`, lalu klik **Deploy**.
4. Klik **Edit code**, hapus semua isinya, lalu tempelkan seluruh isi file [`ai-worker/worker.js`](../ai-worker/worker.js). Klik **Deploy**.

### Langkah 3 — Memasukkan API key sebagai Secret
1. Di halaman worker `pinta-ai`, buka **Settings** → **Variables and Secrets** → **Add**.
2. Type: **Secret**, Name: `DEEPSEEK_API_KEY`, Value: tempel API key dari Langkah 1.
3. Klik **Deploy**/**Save**.

### Langkah 4 — Cek
1. Buka alamat worker di browser, misalnya `https://pinta-ai.<nama-akun>.workers.dev`.
2. Harus muncul: `{"status":"ok","pesan":"Pinta AI siap","apiKeyTerpasang":true}`.
3. Jika `apiKeyTerpasang` bernilai `false`, ulangi Langkah 3.

### Langkah 5 — Menyambungkan ke aplikasi
Kirim **alamat worker** (bukan API key) ke pengembang/Claude. Alamat itu diisikan ke `var AI_URL = '...'` di `prototipe/pasar-pintar.html`, lalu web dibangun ulang (`build-web.ps1`) dan di-push.

## 5. Variabel Worker (opsional)

| Nama | Jenis | Bawaan | Fungsi |
|---|---|---|---|
| `DEEPSEEK_API_KEY` | Secret | (wajib) | API key DeepSeek |
| `ALLOWED_ORIGINS` | Text | `https://mutiarasari2225250071.github.io` | Alamat yang boleh memakai worker (pisahkan dengan koma) |
| `MODEL` | Text | `deepseek-chat` | Nama model DeepSeek |

## 6. Pengujian yang Sudah Dilakukan (simulasi, tanpa API key asli)

- **Worker** (dengan DeepSeek palsu): cek kesehatan, permintaan dari situs lain ditolak (403), tanpa API key ditolak, API key dibaca dari Secret, aturan AI terpasang, mode jelaskan kesalahan, jawaban akhir rupiah dan persen disembunyikan, pesan jelas jika API key salah, batas 40 permintaan/10 menit, CORS.
- **Aplikasi** (dengan worker palsu): tombol Tanya Pinta, panel, status memuat, format jawaban, sisa pertanyaan, pertanyaan ketik sendiri, isi data terkirim, **nama siswa tidak terkirim**, pesan galat dan kuota dikembalikan, panel bisa ditutup, tombol hilang di layar pembahasan, Jelaskan kesalahanku, isian siswa ikut terkirim.
- **Belum diuji**: jawaban dari DeepSeek yang sebenarnya. Uji ini dilakukan setelah worker dipasang. Periksa kualitas petunjuk pada beberapa soal dari tiap modul.

## 7. Data Penelitian

`stats.ai` mencatat jumlah pemakaian **Tanya Pinta** (`tanya`) dan **Jelaskan kesalahanku** (`jelaskan`) per perangkat. Data ini dapat dikaitkan dengan skor Paas dan akurasi saat dianalisis dengan Python (docs/12).
