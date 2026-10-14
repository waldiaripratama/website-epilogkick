# EPILOGKICK — Website Penjualan Sneakers 👟

Brand: **EpilogKick**
Lokasi: `/Users/user/epilog-kick-website/`
No. WhatsApp pemesanan: **083139592869** → https://wa.me/6283139592869

## Cara Jalankan (Online — bisa upload tanpa coding) ✅
```bash
cd ~/epilog-kick-website
npm install
npm start
# buka toko:  http://localhost:3000
# buka admin: http://localhost:3000/admin.html  (password: admin123)
```
Cara harian (tanpa coding): buka `admin.html` → login → klik kotak foto → pilih gambar dari HP/Laptop → tunggu `✅ Terupload` → isi Nama + Harga → SIMPAN. Katalog di semua pengunjung langsung terupdate.

Cara lama (statis, tanpa server) tetap bisa: double-klik `index.html` atau `python3 -m http.server 8000`. Tapi upload hanya tersimpan di browser itu (badge 📴 LOKAL).

## Link WhatsApp (sudah terpasang)
- Tombol mengambang 💬 kanan bawah → chat `6283139592869`
- Tombol `CHAT WHATSAPP` di section Tentang
- Setiap kartu produk ada tombol `💬 Pesan via WA` → otomatis kirim nama + harga produk ke WA
- Popup detail produk ada tombol `PESAN VIA WHATSAPP — 0831-3959-2869`
- Checkout → tombol `BUAT PESANAN` otomatis buka WA dengan rincian order lengkap

Ganti nomor WA: edit `WA_ADMIN` di `app.js` (format 62, tanpa +/spasi).

## Katalog Sepatu — Cara Ubah Gambar / Produk

### Opsi A: Halaman Admin `admin.html` — ONLINE (disarankan, tanpa coding harian) ✅
1. Jalankan sekali: `npm install && npm start` (di laptop/VPS/Render/Railway). Atau deploy folder ini apa adanya ke Render/Railway/Fly/VPS.
2. Buka `/admin.html` → login `admin123` → badge `🌐 SERVER ONLINE`.
3. Klik kotak foto / seret gambar (JPG/PNG/WEBP, maks 5MB) → tunggu `✅ Terupload` → SIMPAN. Foto tersimpan di `assets/uploads/` + data di `products.json`, langsung tampil di semua pengunjung.
4. Ganti password: set env `ADMIN_PASSWORD` sebelum `npm start`.

### Opsi B: Admin Modal + Supabase — ONLINE via hosting statis
1. Setup sekali: Supabase gratis → RUN SQL dari tab **🌐 ONLINE** → tempel URL + anon key ke `app.js` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) → upload folder ke hosting (Netlify/Vercel/dll) → di Admin klik **UPLOAD SEMUA PRODUK → ONLINE** sekali.
2. Harian: tab PRODUK → `Choose File` → tunggu `✅ Sudah online` → SIMPAN. Badge `🌐 ONLINE` = global.

### Opsi C: Mode LOKAL (tanpa setup)
1. Buka `admin.html` / ikon ⚙️ → password `admin123`
2. Isi Nama, Harga, Kategori, Stok, Deskripsi + upload foto
3. Klik SIMPAN. Catatan: badge 📴 LOKAL = hanya tampil di browser itu.

### Opsi B: Edit file products.json
File `products.json` berisi 12 produk contoh. Ubah field `name`, `price`, `img`, `stock`, dll lalu refresh.
Kalau tidak berubah, klik Reset di Admin Panel (karena localStorage menimpa file).

### Opsi C: Folder assets/
Taruh foto di `assets/nama-sepatu.jpg`, lalu di Admin isi URL gambar dengan `assets/nama-sepatu.jpg`.
Lihat panduan lengkap di `assets/README.md`.

## Fitur
- Hero + Drop countdown + Marquee
- Katalog 12 produk, filter kategori, search, sort harga
- Detail produk + size EU 39-45 + qty + stok
- Keranjang + voucher `EPILOG10` (10%) & `HEMAT15` (15%)
- Free ongkir min. Rp 500rb
- Checkout → simpan pesanan + kirim ke WhatsApp
- Admin: kelola produk & pesanan, export/reset
- Responsif HP & laptop
