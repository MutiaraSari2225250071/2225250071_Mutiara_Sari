# 14 — Integrasi AI (Pinta AI dengan Google Gemini)

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
Google Apps Script Web App "pinta-ai"  (ai-proxy/Code.gs)
   • menyimpan GEMINI_API_KEY di Script Properties (tidak pernah ada di aplikasi/GitHub)
   • aturan AI (system prompt) ditulis di sini, tidak bisa diubah dari HP
   • batas 200 permintaan / 10 menit untuk seluruh pengguna, jawaban maks. 300 token
   • lapisan pengaman: angka jawaban akhir disembunyikan ("…") jika AI menyebutnya
   ▼
API Google Gemini (model Flash stabil terbaru, dipilih otomatis)
```

- Mengapa perlu perantara? Aplikasi adalah halaman web statis, dan kodenya bisa dibaca siapa saja. API key yang ditaruh di aplikasi akan mudah dicuri dan dipakai orang lain atas nama akun Anda.
- Aplikasi mengirim data dengan `Content-Type: text/plain` agar browser tidak memerlukan izin CORS tambahan. Apps Script selalu membalas dengan status 200, jadi galat dikirim sebagai `{"galat": "..."}`.
- Fitur AI **hanya muncul** jika `AI_URL` di aplikasi sudah diisi dan aplikasi dibuka dari **versi web (GitHub Pages)**. Di link claude.ai, fitur ini tidak muncul.
- Jika tidak ada internet, Pinta menampilkan pesan. Bagian lain aplikasi tetap berjalan offline.
- Keterbatasan: Apps Script tidak dapat memeriksa alamat asal permintaan atau alamat IP. Jadi siapa pun yang tahu alamat Web App bisa memakainya, tetapi hanya dengan aturan Pinta, pertanyaan maksimal 300 karakter, dan batas 200 permintaan per 10 menit.

## 3. Privasi Anak

| Dikirim ke AI | Tidak pernah dikirim |
|---|---|
| Teks soal, Diketahui/Ditanya, rumus langkah, nilai benar, isian siswa, pertanyaan siswa (maks. 200 karakter), 4 pesan obrolan terakhir | Nama panggilan, kode siswa, rapor, skor Paas, data perangkat |

- Panel Tanya Pinta menampilkan pemberitahuan: "Pertanyaanmu dikirim ke layanan AI (Google Gemini) tanpa nama atau kode siswa."
- **Catatan jatah gratis Gemini:** pada paket gratis, Google dapat memakai isi permintaan untuk meningkatkan layanannya. Karena itu nama dan kode siswa tidak pernah dikirim. Jika ingin data tidak dipakai Google, aktifkan penagihan (*billing*) di Google AI Studio.
- **Tambahkan di lembar persetujuan orang tua/wali**: aplikasi memiliki fitur AI opsional yang mengirim teks pertanyaan siswa (tanpa identitas) ke penyedia AI pihak ketiga (Google).
- Ingatkan siswa agar tidak menulis data pribadi di kolom pertanyaan.

## 4. Langkah Pemasangan (dikerjakan pemilik akun Google)

> **Jangan pernah** menempel API key di aplikasi, di GitHub, atau di chat. API key hanya dimasukkan di **Script Properties**. Nama menu bisa sedikit berbeda dari panduan ini.

### Langkah 1 — API key Gemini
1. Buka **aistudio.google.com** dan masuk dengan akun Google.
2. Klik **Get API key** → **Create API key**.
3. Di daftar **API keys**, klik tombol **Copy** di baris kunci. Kunci biasanya diawali `AIza`, tetapi Google kadang memberi awalan lain, dan itu tidak apa-apa. **Jangan** menyalin ID proyek (`gen-lang-client-...`) atau nama kunci.

### Langkah 2 — Membuat Apps Script
1. Buka **script.google.com** → **New project**. Ganti nama proyek menjadi `pinta-ai`.
2. Hapus semua isi `Code.gs`, lalu tempel seluruh isi file [`ai-proxy/Code.gs`](../ai-proxy/Code.gs). Klik ikon **Save**.

### Langkah 3 — Memasukkan API key
1. Klik ikon roda gigi **Project Settings** (menu kiri).
2. Gulir ke **Script Properties** → **Add script property**.
3. Property: `GEMINI_API_KEY`, Value: tempel API key dari Langkah 1. Klik **Save script properties**.

### Langkah 4 — Menerbitkan sebagai Web App
1. Klik **Deploy** → **New deployment** → ikon roda gigi → pilih **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Klik **Deploy**. Google meminta izin (**Authorize access**): pilih akun Anda. Jika muncul "Google hasn't verified this app", klik **Advanced** → **Go to pinta-ai (unsafe)** → **Allow**. Peringatan ini muncul karena skrip buatan sendiri, bukan karena berbahaya. Izin yang diminta hanya untuk menghubungi layanan luar (Gemini).
4. Salin **Web app URL** (bentuknya `https://script.google.com/macros/s/.../exec`).

### Langkah 5 — Cek
1. Buka Web app URL di browser.
2. Harus muncul `"status":"ok"` dan `"pesan":"Pinta AI siap memakai Google Gemini"`. Isi kunci tidak pernah ditampilkan.

### Langkah 6 — Menyambungkan ke aplikasi
Kirim **Web app URL** (bukan API key) ke pengembang/Claude. Alamat itu diisikan ke `var AI_URL = '...'` di `prototipe/pasar-pintar.html`, lalu web dibangun ulang (`build-web.ps1`) dan di-push.

### Jika `Code.gs` diubah
Klik **Deploy** → **Manage deployments** → ikon pensil → Version: **New version** → **Deploy**. Dengan cara ini alamat Web App tetap sama.

## 5. Script Properties

| Nama | Bawaan | Fungsi |
|---|---|---|
| `GEMINI_API_KEY` | (wajib) | API key Gemini dari Google AI Studio |
| `MODEL` | (kosong = otomatis) | Nama model Gemini tertentu. Jika kosong, perantara memakai model Gemini Flash **stabil** terbaru yang tersedia untuk API key Anda, dan otomatis pindah jika model itu dipensiunkan Google. Model yang dipakai tampil di cek kesehatan |

## 6. Pengujian

- **Perantara** (dengan Gemini tiruan): cek kesehatan, tanpa kunci ditolak, kunci dibaca dari Script Properties, aturan AI terpasang, mode jelaskan kesalahan, peran obrolan dikonversi ke format Gemini, jawaban akhir rupiah dan persen disembunyikan, pesan jelas jika API key salah atau jatah habis, batas permintaan.
- **Aplikasi** (dengan perantara tiruan): tombol Tanya Pinta, panel, status memuat, format jawaban, sisa pertanyaan, pertanyaan ketik sendiri, isi data terkirim, **nama siswa tidak terkirim**, pesan galat dan kuota ditampilkan, panel bisa ditutup, tombol hilang di layar pembahasan, Jelaskan kesalahanku, isian siswa ikut terkirim.
- **Belum diuji**: jawaban dari Gemini yang sebenarnya. Uji ini dilakukan setelah perantara dipasang. Periksa kualitas petunjuk pada beberapa soal dari tiap modul.

## 7. Data Penelitian

`stats.ai` mencatat jumlah pemakaian **Tanya Pinta** (`tanya`) dan **Jelaskan kesalahanku** (`jelaskan`) per perangkat. Data ini dapat dikaitkan dengan skor Paas dan akurasi saat dianalisis dengan Python (docs/12).
