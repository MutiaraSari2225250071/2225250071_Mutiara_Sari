# Pinta AI Worker

Perantara (Cloudflare Worker) antara aplikasi Pasar Pintar dan API DeepSeek.

- Kode: [worker.js](worker.js), untuk ditempel di dashboard Cloudflare
- Panduan pemasangan, aturan privasi, dan hasil uji: [docs/14-integrasi-ai.md](../docs/14-integrasi-ai.md)

**API key tidak boleh ditaruh di file mana pun di repositori ini.** API key hanya dimasukkan sebagai Secret `DEEPSEEK_API_KEY` di dashboard Cloudflare.
