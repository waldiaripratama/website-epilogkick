# EPILOGKICK — Website Penjualan Sneakers 👟

Brand: **EpilogKick**
Lokasi: `/Users/user/epilog-kick-website/`
No. WhatsApp pemesanan: **083139592869** → https://wa.me/6283139592869

## Cara Jalankan
Double-klik `index.html` langsung jalan, atau:
```bash
cd ~/epilog-kick-website
python3 -m http.server 8000
# buka http://localhost:8000
```

## Link WhatsApp (sudah terpasang)
- Tombol mengambang 💬 kanan bawah → chat `6283139592869`
- Tombol `CHAT WHATSAPP` di section Tentang
- Setiap kartu produk ada tombol `💬 Pesan via WA` → otomatis kirim nama + harga produk ke WA
- Popup detail produk ada tombol `PESAN VIA WHATSAPP — 0831-3959-2869`
- Checkout → tombol `BUAT PESANAN` otomatis buka WA dengan rincian order lengkap

Ganti nomor WA: edit `WA_ADMIN` di `app.js` (format 62, tanpa +/spasi).

## Katalog Sepatu — Cara Ubah Gambar / Produk

### Opsi A: Admin Panel (tanpa coding) — Recommended
1. Klik ikon ⚙️ di navbar → password `admin123`
2. Tab PRODUK → isi Nama, Harga, Kategori, Stok, Deskripsi
3. Gambar: pilih salah satu:
   - Paste URL gambar ke kolom `URL gambar`, ATAU
   - Klik `Choose File` → upload foto dari HP/Laptop (preview otomatis)
4. Klik SIMPAN. Untuk ubah: klik Edit → ganti → SIMPAN. Hapus: klik Hapus.
5. Data tersimpan di browser (localStorage). Tombol Export untuk backup `epilogkick-data.json`.

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
