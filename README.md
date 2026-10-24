# EPILOGKICK — Website Penjualan Sneakers 👟

Brand: **EpilogKick**
No. WhatsApp pemesanan: **083139592869** → https://wa.me/6283139592869

Website statis ( hosting: **Netlify**) + data katalog & foto (**Supabase**).
Auto deploy: `git push` ke GitHub → Netlify rebuild otomatis.

---

## 🚀 Deploy Online (paling penting)

| #(mu) | Apa | Di mana |
|---|---|---|
| 1 | **Jalankan SQL** | Supabase → SQL Editor → paste `supabase-setup.sql` → **RUN** |
| 2 | **Buat akun admin** | Supabase → Authentication → Users → **Add user** (centang *Auto Confirm User*) |
| 3 | **Isi config** | `config.js` → `adminEmail` = email akun admin tadi |
| 4 | **Push** | `git add -A && git commit -m "deploy" && git push` |
| 5 | **Deploy** | Netlify rebuild otomatis (~40 detik) |
| 6 | **Cek** | Buka `/admin.html` di situs live → login → ubah produk → **langsung tampil di toko** ✅ |

> `supabase-setup.sql` sudah berisi tabel + bucket foto + **73 produk** siap pakai.
> Kunci `anon` di `config.js` memang aman dipublikasikan (read-only, RLS protecting).

### Yang bisa dilakukan tiap hari (tanpa coding)
1. Buka `https://<situs-kamu>.netlify.app/admin.html` dari HP
2. Login (email + password akun admin)
3. Klik kotak foto → pilih gambar → tunggu **"✅ Terupload"** → isi Nama + Harga → **SIMPAN**
4. Katalog **langsung berubah** untuk semua pengunjung ✅ (tidak perlu push/deploy)

### Alur auto deploy
```
kamu edit kode  →  git push  →  Netlify rebuild otomatis  →  live (~40 detik)
kamu edit produk di admin.html  →  langsung live (tanpa push)
```

---

## 💻 Jalankan di Laptop (opsional, untuk development)

```bash
cd ~/epilog-kick-website
npm install
npm start
# toko:  http://localhost:3000
# admin: http://localhost:3000/admin.html
```

- **Mode Server** (`npm start`): backend Express `server.js` aktif → katalog & foto disimpan di
  `products.json` + `assets/uploads/` (mode ini hanya untuk development).
- **Mode Online** (produksi): `config.js` terisi → katalog dibaca dari Supabase.
  Login admin memakai **email + password** akun Supabase (mode server/lokal tetap pakai `admin123`).

---

## 📁 Struktur Penting

| File | Fungsi |
|---|---|
| `config.js` | Konfigurasi online: URL Supabase, anon key, email admin. **Jangan** taruh password / service_role key di sini |
| `supabase-setup.sql` | SQL setup Supabase (tabel + bucket + 73 produk). Jalankan 1x di SQL Editor |
| `products.json` | Katalog 73 produk (dipakai juga sebagai seed & fallback lokal) |
| `assets/uploads/` | Foto produk. **Ikut ter-commit ke GitHub** supaya ter-deploy ke Netlify |
| `admin.html` | Halaman admin: upload foto + kelola produk (online via Supabase) |
| `server.js` | Backend Express untuk `npm start` (lokal/VPS) — tidak dipakai di Netlify |
| `netlify.toml` | Setting build & cache Netlify (tanpa build command) |
| `scripts/setup-supabase.mjs` | Setup Supabase otomatis (SQL + akun admin) + verifikasi. Jalankan: `SUPABASE_PAT=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/setup-supabase.mjs` |

## 🔒 Keamanan

- Pengunjung (anon) hanya bisa **membaca** katalog.
- Mengubah produk & upload foto **harus login** (Supabase Auth) → RLS menolak tanpa sesi.
- Jangan pernah menaruh `service_role` key di repo (itu bypass semua aturan).

---

## 🔗 Link WhatsApp (sudah terpasang)
- Tombol mengambang 💬 kanan bawah → chat `6283139592869`
- Tombol `CHAT WHATSAPP` di section Tentang
- Setiap kartu produk ada tombol `💬 Pesan via WA` → otomatis kirim nama + harga produk ke WA
- Popup detail produk ada tombol `PESAN VIA WHATSAPP — 0831-3959-2869`
- Checkout → tombol `BUAT PESANAN` otomatis buka WA dengan rincian order lengkap

Ganti nomor WA: edit `WA_ADMIN` di `app.js` (format 62, tanpa +/spasi).

---

## ✨ Fitur
- Hero + Drop countdown + Marquee
- Katalog 73 produk, filter kategori, search, sort harga
- Detail produk + size EU 39-45 + qty + stok
- Keranjang + voucher `EPILOG10` (10%) & `HEMAT15` (15%)
- Free ongkir min. Rp 500rb
- Checkout → simpan pesanan + kirim ke WhatsApp
- Admin: kelola produk & pesanan, export/reset
- Responsif HP & laptop
