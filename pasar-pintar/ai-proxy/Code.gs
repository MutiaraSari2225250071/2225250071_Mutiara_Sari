/**
 * Pinta AI: perantara (Google Apps Script) antara aplikasi Pasar Pintar dan Google Gemini.
 *
 * Mengapa perlu perantara?
 *   Aplikasi berjalan di HP siswa dan kodenya bisa dilihat siapa saja. Jika API key ditaruh di aplikasi,
 *   orang lain bisa mencurinya. Skrip ini menyimpan API key di "Script Properties" akun Google pemilik,
 *   yang tidak terlihat oleh siapa pun yang membuka aplikasi.
 *
 * Pengaturan (Apps Script → Project Settings → Script Properties):
 *   GEMINI_API_KEY  (WAJIB)     API key dari aistudio.google.com (biasanya diawali AIza, tapi bisa juga awalan lain)
 *   MODEL           (opsional)  bawaan: gemini-2.5-flash
 *
 * Aturan AI ditulis di sini (di server), bukan di aplikasi, agar tidak bisa diubah dari HP siswa.
 * Panduan pemasangan lengkap: docs/14-integrasi-ai.md
 */

var MODEL_BAWAAN = 'gemini-2.5-flash';
var BATAS_PERMINTAAN = 200;   // untuk seluruh pengguna ...
var JENDELA_DETIK = 600;      // ... setiap 10 menit

var PROMPT = {
  petunjuk: 'Kamu adalah Pinta, maskot tas belanja yang ramah di aplikasi Pasar Pintar untuk siswa SMP kelas VII yang belajar Aritmetika Sosial (untung, rugi, persentase, diskon, pajak/PPN, bruto-neto-tara, bunga tunggal).\n' +
    'Aturan:\n' +
    '1. Jawab dalam Bahasa Indonesia yang sederhana, maksimal 3 kalimat pendek.\n' +
    '2. JANGAN PERNAH memberikan jawaban akhir soal. Jangan juga memberikan hasil hitungan langkah yang belum dikerjakan siswa. Beri petunjuk bertahap: ingatkan konsep atau rumus yang relevan, lalu akhiri dengan SATU pertanyaan pancingan.\n' +
    '3. Gunakan konteks soal (Diketahui, Ditanya, langkah). Nilai "benar" pada konteks hanya untuk kamu; jangan menyebutkannya.\n' +
    '4. Jika siswa bertanya apakah isiannya benar, katakan langkah mana yang sudah tepat dan mana yang perlu dicek lagi, tanpa menyebut angka yang benar.\n' +
    '5. Tulis rupiah dengan format Rp1.250.000. Jangan memakai tabel atau judul.\n' +
    '6. Jika pertanyaan tidak berhubungan dengan soal atau matematika, tolak dengan sopan dan ajak kembali ke soal.\n' +
    '7. Jangan meminta atau menyebut data pribadi.',
  kesalahan: 'Kamu adalah Pinta, maskot tas belanja yang ramah di aplikasi Pasar Pintar untuk siswa SMP kelas VII yang belajar Aritmetika Sosial.\n' +
    'Siswa sudah 2 kali salah mengerjakan soal ini, dan pembahasan lengkap sudah ditampilkan di layar.\n' +
    'Tugasmu: bandingkan isian siswa dengan nilai benar di setiap langkah, lalu jelaskan kemungkinan penyebab kesalahannya. Contoh penyebab: salah memilih operasi (menambah/mengurangi), membagi dengan harga jual padahal seharusnya harga beli, lupa atau kelebihan angka nol, menjawab besar potongan padahal yang ditanya harga akhir, memakai bunga setahun untuk beberapa bulan, memakai bruto padahal seharusnya neto.\n' +
    'Aturan:\n' +
    '1. Bahasa Indonesia yang sederhana, maksimal 4 kalimat pendek.\n' +
    '2. Mulai dengan menyebut langkah mana yang keliru dan kemungkinan penyebabnya.\n' +
    '3. Akhiri dengan satu tips singkat agar tidak terulang.\n' +
    '4. Nada menyemangati, jangan menyalahkan.\n' +
    '5. Tulis rupiah dengan format Rp1.250.000. Jangan memakai tabel atau judul.\n' +
    '6. Jika siswa tidak mengisi suatu langkah, katakan bahwa langkah itu belum diisi.'
};

/* Cek kesehatan: buka alamat Web App di browser. Isi kunci TIDAK ditampilkan. */
function doGet() {
  var kunci = ambilKunci();
  var valid = kunciValid(kunci);
  return balas({
    status: valid ? 'ok' : 'belum siap',
    pesan: valid ? 'Pinta AI siap memakai Google Gemini' : (!kunci ? 'Isi GEMINI_API_KEY di Project Settings → Script Properties.' : (/^gen-lang-client/i.test(kunci) ? 'Yang diisi adalah ID proyek, bukan API key. Salin kuncinya dengan tombol Copy di daftar API keys.' : 'GEMINI_API_KEY terlalu pendek atau berisi karakter aneh, periksa lagi.')),
    penyedia: 'Google Gemini',
    model: ambilModel(),
    kunciGemini: !kunci ? 'kosong' : (valid ? 'terisi (' + kunci.length + ' karakter)' : 'format salah')
  });
}

function doPost(e) {
  var kunci = ambilKunci();
  if (!kunciValid(kunci)) return balas({ galat: 'Layanan AI belum diatur. Coba lagi nanti.' });
  if (terlaluSering()) return balas({ galat: 'Pinta sedang istirahat sebentar karena banyak pertanyaan. Coba lagi beberapa menit lagi, ya.' });

  var data;
  try { data = JSON.parse((e && e.postData && e.postData.contents) || ''); } catch (err) { return balas({ galat: 'Data tidak valid.' }); }
  var jenis = data.jenis === 'kesalahan' ? 'kesalahan' : 'petunjuk';
  var konteks = potong(JSON.stringify(data.konteks || {}), 3000);
  var pertanyaan = potong(String(data.pertanyaan || ''), 300);
  var riwayat = Array.isArray(data.riwayat) ? data.riwayat.slice(-4) : [];

  // Gemini memakai peran "user" dan "model"
  var contents = [{ role: 'user', parts: [{ text: 'Konteks soal (JSON):\n' + konteks }] }];
  for (var i = 0; i < riwayat.length; i++) {
    var r = riwayat[i];
    if (!r || typeof r.isi !== 'string') continue;
    tambahPesan(contents, r.peran === 'assistant' ? 'model' : 'user', potong(r.isi, 500));
  }
  tambahPesan(contents, 'user', jenis === 'petunjuk'
    ? 'Pertanyaan siswa: ' + (pertanyaan || 'Aku bingung, bantu aku mulai.')
    : 'Jelaskan kesalahanku pada soal ini.');

  var model = ambilModel();
  var setelan = { maxOutputTokens: 300, temperature: 0.4 };
  if (/2\.5-flash/.test(model)) setelan.thinkingConfig = { thinkingBudget: 0 };   // jawab langsung, tanpa "berpikir" yang memakan jatah token

  var teks = '';
  try {
    var res = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'x-goog-api-key': kunci },
      payload: JSON.stringify({ systemInstruction: { parts: [{ text: PROMPT[jenis] }] }, contents: contents, generationConfig: setelan }),
      muteHttpExceptions: true
    });
    var kode = res.getResponseCode();
    var isi = res.getContentText();
    if (kode !== 200) {
      var pesan = 'Layanan AI sedang bermasalah (' + kode + ').';
      if (/API_KEY_INVALID|API key not valid/i.test(isi)) pesan = 'API key Gemini tidak valid.';
      else if (kode === 429) pesan = 'Jatah AI gratis sudah habis.';
      else if (kode === 404) pesan = 'Model AI tidak ditemukan.';
      return balas({ galat: pesan + ' Coba lagi nanti.' });
    }
    var hasil = JSON.parse(isi);
    var kandidat = (hasil.candidates || [])[0] || {};
    var bagian = (kandidat.content && kandidat.content.parts) || [];
    for (var j = 0; j < bagian.length; j++) if (bagian[j].text && !bagian[j].thought) teks += bagian[j].text;
  } catch (err) {
    return balas({ galat: 'Layanan AI tidak bisa dihubungi. Coba lagi nanti.' });
  }
  teks = String(teks).trim();
  if (!teks) return balas({ galat: 'Pinta belum menemukan jawaban. Coba tanya dengan kalimat lain.' });
  if (jenis === 'petunjuk') teks = sembunyikanJawaban(teks, data.rahasia);
  return balas({ jawab: teks });
}

/* ---------- pembantu ---------- */
function balas(isi) {
  return ContentService.createTextOutput(JSON.stringify(isi)).setMimeType(ContentService.MimeType.JSON);
}
function ambilKunci() { return bersihkanKunci(PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY')); }
function ambilModel() { return PropertiesService.getScriptProperties().getProperty('MODEL') || MODEL_BAWAAN; }
/* Bentuk kunci bisa berubah, jadi hanya dicek panjang dan karakternya. Benar tidaknya kunci ditentukan oleh Gemini. */
function kunciValid(k) { return /^[0-9A-Za-z._\-]{20,}$/.test(k) && !/^gen-lang-client/i.test(k); }
/* Gemini menolak dua pesan berurutan dengan peran yang sama, jadi pesan seperti itu digabung */
function tambahPesan(contents, peran, teks) {
  var akhir = contents[contents.length - 1];
  if (akhir && akhir.role === peran) akhir.parts[0].text += '\n' + teks;
  else contents.push({ role: peran, parts: [{ text: teks }] });
}
function potong(s, n) { return s.length > n ? s.slice(0, n) : s; }
/* Membuang spasi, baris baru, tanda kutip yang tidak sengaja ikut tertempel */
function bersihkanKunci(k) {
  var s = String(k || '').trim();
  for (var i = 0; i < 3; i++) s = s.replace(/^["'`]+|["'`]+$/g, '').trim();
  return s.replace(/\s+/g, '');
}
/* Apps Script tidak bisa melihat alamat IP, jadi batasnya dihitung untuk semua pengguna sekaligus */
function terlaluSering() {
  var cache = CacheService.getScriptCache();
  var lock = LockService.getScriptLock();
  try { lock.waitLock(3000); } catch (e) { return false; }
  try {
    var slot = 'hitung-' + Math.floor(Date.now() / (JENDELA_DETIK * 1000));
    var n = Number(cache.get(slot) || 0) + 1;
    cache.put(slot, String(n), JENDELA_DETIK);
    return n > BATAS_PERMINTAAN;
  } finally { lock.releaseLock(); }
}
function grp(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function lolos(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
/* Lapisan pengaman: jika AI tetap menyebut jawaban akhir, angka itu disembunyikan */
function sembunyikanJawaban(teks, rahasia) {
  if (!Array.isArray(rahasia)) return teks;
  for (var i = 0; i < rahasia.length; i++) {
    var n = rahasia[i];
    if (typeof n !== 'number' || !isFinite(n)) continue;
    var bentuk = [];
    if (Math.floor(n) === n && n >= 1000) bentuk.push(grp(n), String(n));
    else {
      var k = String(n).replace('.', ',');
      bentuk.push(k + ' ?%', k + ' persen', k + ' kg', String(n) + ' ?%');
    }
    for (var b = 0; b < bentuk.length; b++) {
      var re = new RegExp('(Rp ?)?(?<![\\d.,])' + lolos(bentuk[b]).replace(' \\?', ' ?') + '(?![\\d])', 'gi');
      teks = teks.replace(re, '…');
    }
  }
  return teks;
}
