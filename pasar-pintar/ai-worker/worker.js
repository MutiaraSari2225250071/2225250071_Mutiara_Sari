/**
 * Pinta AI: perantara (Cloudflare Worker) antara aplikasi Pasar Pintar dan API DeepSeek.
 *
 * Mengapa perlu perantara?
 *   Aplikasi berjalan di HP siswa dan kodenya bisa dilihat siapa saja. Jika API key ditaruh di aplikasi,
 *   orang lain bisa mencurinya. Worker ini menyimpan API key sebagai "secret" di Cloudflare.
 *
 * Pengaturan di dashboard Cloudflare (Settings → Variables and Secrets):
 *   DEEPSEEK_API_KEY  (Secret, WAJIB)    API key dari platform.deepseek.com
 *   ALLOWED_ORIGINS   (Text, opsional)   alamat yang boleh memakai worker, dipisah koma.
 *                                        Bawaan: https://mutiarasari2225250071.github.io
 *   MODEL             (Text, opsional)   bawaan: deepseek-chat
 *
 * Aturan AI ditulis di sini (di server), bukan di aplikasi, agar tidak bisa diubah dari HP siswa.
 */

const ASAL_BAWAAN = 'https://mutiarasari2225250071.github.io';
const BATAS_PERMINTAAN = 40;              // per alamat IP ...
const JENDELA_MS = 10 * 60 * 1000;        // ... setiap 10 menit
const jejak = new Map();

const PROMPT = {
  petunjuk: `Kamu adalah Pinta, maskot tas belanja yang ramah di aplikasi Pasar Pintar untuk siswa SMP kelas VII yang belajar Aritmetika Sosial (untung, rugi, persentase, diskon, pajak/PPN, bruto-neto-tara, bunga tunggal).
Aturan:
1. Jawab dalam Bahasa Indonesia yang sederhana, maksimal 3 kalimat pendek.
2. JANGAN PERNAH memberikan jawaban akhir soal. Jangan juga memberikan hasil hitungan langkah yang belum dikerjakan siswa. Beri petunjuk bertahap: ingatkan konsep atau rumus yang relevan, lalu akhiri dengan SATU pertanyaan pancingan.
3. Gunakan konteks soal (Diketahui, Ditanya, langkah). Nilai "benar" pada konteks hanya untuk kamu; jangan menyebutkannya.
4. Jika siswa bertanya apakah isiannya benar, katakan langkah mana yang sudah tepat dan mana yang perlu dicek lagi, tanpa menyebut angka yang benar.
5. Tulis rupiah dengan format Rp1.250.000. Jangan memakai tabel atau judul.
6. Jika pertanyaan tidak berhubungan dengan soal atau matematika, tolak dengan sopan dan ajak kembali ke soal.
7. Jangan meminta atau menyebut data pribadi.`,
  kesalahan: `Kamu adalah Pinta, maskot tas belanja yang ramah di aplikasi Pasar Pintar untuk siswa SMP kelas VII yang belajar Aritmetika Sosial.
Siswa sudah 2 kali salah mengerjakan soal ini, dan pembahasan lengkap sudah ditampilkan di layar.
Tugasmu: bandingkan isian siswa dengan nilai benar di setiap langkah, lalu jelaskan kemungkinan penyebab kesalahannya. Contoh penyebab: salah memilih operasi (menambah/mengurangi), membagi dengan harga jual padahal seharusnya harga beli, lupa atau kelebihan angka nol, menjawab besar potongan padahal yang ditanya harga akhir, memakai bunga setahun untuk beberapa bulan, memakai bruto padahal seharusnya neto.
Aturan:
1. Bahasa Indonesia yang sederhana, maksimal 4 kalimat pendek.
2. Mulai dengan menyebut langkah mana yang keliru dan kemungkinan penyebabnya.
3. Akhiri dengan satu tips singkat agar tidak terulang.
4. Nada menyemangati, jangan menyalahkan.
5. Tulis rupiah dengan format Rp1.250.000. Jangan memakai tabel atau judul.
6. Jika siswa tidak mengisi suatu langkah, katakan bahwa langkah itu belum diisi.`
};

export default {
  async fetch(req, env) {
    const izin = (env.ALLOWED_ORIGINS || ASAL_BAWAAN).split(',').map(s => s.trim()).filter(Boolean);
    const asal = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': izin.includes(asal) ? asal : izin[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    // Cek kesehatan: buka alamat worker di browser untuk memastikan sudah benar
    if (req.method === 'GET') return json({ status: 'ok', pesan: 'Pinta AI siap', apiKeyTerpasang: !!env.DEEPSEEK_API_KEY }, 200, cors);
    if (req.method !== 'POST') return json({ galat: 'Metode tidak didukung.' }, 405, cors);
    if (!izin.includes(asal)) return json({ galat: 'Asal permintaan tidak diizinkan.' }, 403, cors);
    if (!env.DEEPSEEK_API_KEY) return json({ galat: 'API key belum diatur di Cloudflare.' }, 500, cors);
    if (terlaluSering(req.headers.get('CF-Connecting-IP') || 'tanpa-ip')) {
      return json({ galat: 'Pinta sedang istirahat sebentar karena banyak pertanyaan. Coba lagi beberapa menit lagi, ya.' }, 429, cors);
    }

    let data;
    try { data = await req.json(); } catch (e) { return json({ galat: 'Data tidak valid.' }, 400, cors); }
    const jenis = data.jenis === 'kesalahan' ? 'kesalahan' : 'petunjuk';
    const konteks = potong(JSON.stringify(data.konteks || {}), 3000);
    const pertanyaan = potong(String(data.pertanyaan || ''), 300);
    const riwayat = Array.isArray(data.riwayat) ? data.riwayat.slice(-4) : [];

    const messages = [{ role: 'system', content: PROMPT[jenis] }, { role: 'user', content: 'Konteks soal (JSON):\n' + konteks }];
    for (const r of riwayat) {
      if (!r || typeof r.isi !== 'string') continue;
      messages.push({ role: r.peran === 'assistant' ? 'assistant' : 'user', content: potong(r.isi, 500) });
    }
    messages.push({ role: 'user', content: jenis === 'petunjuk'
      ? 'Pertanyaan siswa: ' + (pertanyaan || 'Aku bingung, bantu aku mulai.')
      : 'Jelaskan kesalahanku pada soal ini.' });

    let hasil;
    try {
      const r = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.DEEPSEEK_API_KEY },
        body: JSON.stringify({ model: env.MODEL || 'deepseek-chat', messages, max_tokens: 250, temperature: 0.4 })
      });
      if (!r.ok) {
        const pesan = r.status === 401 ? 'API key DeepSeek tidak valid.' : (r.status === 402 ? 'Saldo DeepSeek habis.' : 'Layanan AI sedang bermasalah (' + r.status + ').');
        return json({ galat: pesan + ' Coba lagi nanti.' }, 502, cors);
      }
      hasil = await r.json();
    } catch (e) {
      return json({ galat: 'Layanan AI tidak bisa dihubungi. Coba lagi nanti.' }, 502, cors);
    }

    let teks = (((hasil.choices || [])[0] || {}).message || {}).content || '';
    teks = teks.trim();
    if (!teks) return json({ galat: 'Pinta belum menemukan jawaban. Coba tanya dengan kalimat lain.' }, 502, cors);
    if (jenis === 'petunjuk') teks = sembunyikanJawaban(teks, data.rahasia);
    return json({ jawab: teks }, 200, cors);
  }
};

function json(isi, status, headers) {
  return new Response(JSON.stringify(isi), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } });
}
function potong(s, n) { return s.length > n ? s.slice(0, n) : s; }
function terlaluSering(ip) {
  const kini = Date.now();
  const daftar = (jejak.get(ip) || []).filter(t => kini - t < JENDELA_MS);
  daftar.push(kini);
  jejak.set(ip, daftar);
  return daftar.length > BATAS_PERMINTAAN;
}
function grp(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function lolos(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
/* Lapisan pengaman: jika AI tetap menyebut jawaban akhir, angka itu disembunyikan */
function sembunyikanJawaban(teks, rahasia) {
  if (!Array.isArray(rahasia)) return teks;
  for (const n of rahasia) {
    if (typeof n !== 'number' || !isFinite(n)) continue;
    const bentuk = [];
    if (Number.isInteger(n) && n >= 1000) bentuk.push(grp(n), String(n));
    else {
      const k = String(n).replace('.', ',');
      bentuk.push(k + ' ?%', k + ' persen', k + ' kg', String(n) + ' ?%');
    }
    for (const b of bentuk) {
      const re = new RegExp('(Rp ?)?(?<![\\d.,])' + lolos(b).replace(' \\?', ' ?') + '(?![\\d])', 'gi');
      teks = teks.replace(re, '…');
    }
  }
  return teks;
}
