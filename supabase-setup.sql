/* ==========================================================================
   EPILOG KICK — SETUP SUPABASE (jalankan 1x)
   --------------------------------------------------------------------------
   CARA PAKAI:
   1) Buka https://supabase.com → project kamu (epilogkick)
   2) Menu kiri → SQL Editor → New query
   3) Copy SELURUH isi file ini → paste → klik RUN (atau Ctrl+Enter)
   4) Kalau muncul error, paste ulang bagian yang gagal
   5) Buat akun admin:
        Authentication → Users → Add user
        - isi email + password (punya kamu, jangan dibagikan)
        - centang "Auto Confirm User" (supaya tidak perlu email konfirmasi)
   6) Masukkan email tadi ke `config.js` → `adminEmail`
   ========================================================================== */


/* --------------------------------------------------------------------------
   1) TABEL KATALOG PRODUK
   -------------------------------------------------------------------------- */
create table if not exists public.products (
  id     text primary key,
  name   text not null,
  price  integer default 0,
  old    integer default 0,
  cat    text default 'Nike',
  img    text default '',
  stock  integer default 0,
  "desc" text default '',
  rating numeric default 4.8,
  sold   integer default 0
);

create index if not exists products_cat_idx on public.products (cat);


/* --------------------------------------------------------------------------
   2) ROW LEVEL SECURITY (RLS)
   --------------------------------------------------------------------------
   - Pengunjung (anon) hanya boleh BACA  -> katalog selalu tampil di toko
   - Tulis / ubah / hapus produk HANYA untuk user yang sudah login
     (Supabase Auth). Kunci anon TIDAK bisa menulis tanpa sesi login,
     jadi although kuncinya ada di file publik, katalog tetap aman.
   -------------------------------------------------------------------------- */
alter table public.products enable row level security;

drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products
  for select to anon, authenticated using (true);

drop policy if exists "admin write products" on public.products;
create policy "admin write products" on public.products
  for all to authenticated using (true) with check (true);


/* --------------------------------------------------------------------------
   3) BUCKET FOTO PRODUK
   --------------------------------------------------------------------------
   - Bucket public -> foto bisa dibuka semua orang (toko butuh ini)
   - Upload / ubah / hapus file hanya untuk user login
   -------------------------------------------------------------------------- */
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists "admin update images" on storage.objects;
create policy "admin update images" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images') with check (bucket_id = 'product-images');

drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');


/* --------------------------------------------------------------------------
   4) ISI KATALOG AWAL (73 produk)
   --------------------------------------------------------------------------
   Aman dijalankan berulang (kalau produknya sudah ada, datanya di-update).
   Foto memakai path relatif "assets/uploads/..." -> dilayani Netlify
   (foto ikut ter-commit ke repo GitHub).
   -------------------------------------------------------------------------- */
insert into public.products (id, name, price, old, cat, img, stock, "desc", rating, sold) values
  ('epk-nike-air-max-tn-thermoractive-blue', 'Nike Air Max Tn Thermoractive Blue', 550000, 0, 'Nike', 'assets/uploads/nike-air-max-tn-thermoractive-blue.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-air-max-tn-thermoractive-green', 'Nike Air Max Tn Thermoractive Green', 550000, 0, 'Nike', 'assets/uploads/nike-air-max-tn-thermoractive-green.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-air-max-tn-thermoractive-purple', 'Nike Air Max Tn Thermoractive Purple', 550000, 0, 'Nike', 'assets/uploads/nike-air-max-tn-thermoractive-purple.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-air-max-tn-thermoractive-red', 'Nike Air Max Tn Thermoractive Red', 550000, 0, 'Nike', 'assets/uploads/nike-air-max-tn-thermoractive-red.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-p-6000-premium-anthracite-smoke-grey-men', 'Nike P-6000 Premium Anthracite Smoke Grey Men', 550000, 0, 'Nike', 'assets/uploads/nike-p-6000-premium-anthracite-smoke-grey-men.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-p6000-white-elemental-pink-metallic-silver', 'Nike P6000 White Elemental Pink Metallic Silver', 550000, 0, 'Nike', 'assets/uploads/nike-p6000-white-elemental-pink-metallic-silver.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-p-6000-metallic-silver-aegean-storm-product', 'Nike-P-6000-Metallic-Silver-Aegean-Storm-Product', 550000, 0, 'Nike', 'assets/uploads/nike-p-6000-metallic-silver-aegean-storm-product.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-black-mauve-mist', 'Puma Speedcat Ballet Black Mauve Mist', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-black-mauve-mist.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-lace-beige', 'Puma Speedcat Ballet Lace Beige', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-lace-beige.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-lace-black', 'Puma Speedcat Ballet Lace Black', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-lace-black.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-laces-silver-black', 'Puma Speedcat Ballet Laces Silver Black', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-laces-silver-black.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-whisp-of-pink', 'Puma Speedcat Ballet Whisp of Pink', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-whisp-of-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-coffee-brown-haute-sneakers', 'Puma Speedcat Coffee Brown Haute Sneakers', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-coffee-brown-haute-sneakers.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-og-black-mauve-mist', 'Puma Speedcat OG Black Mauve Mist', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-og-black-mauve-mist.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-og-red-leather-white', 'Puma Speedcat OG Red Leather White', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-og-red-leather-white.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-og-white-pink', 'Puma Speedcat OG White Pink', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-og-white-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-og-x-sparco-navy-white', 'Puma Speedcat OG X Sparco Navy White', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-og-x-sparco-navy-white.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ttf-prairie-tan-frosted-ivory', 'Puma Speedcat TTF Prairie Tan Frosted Ivory', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ttf-prairie-tan-frosted-ivory.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-ballet-ruby-shimmer-womens', 'Puma-Speedcat-Ballet-Ruby-Shimmer-Womens', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-ballet-ruby-shimmer-womens.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-amsterdam', 'Adidas Amsterdam', 550000, 0, 'Adidas', 'assets/uploads/adidas-amsterdam.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-blackburn', 'Adidas Blackburn', 550000, 0, 'Adidas', 'assets/uploads/adidas-blackburn.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-aluminum-black', 'adidas handball spezial - ''Aluminum Black''', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-aluminum-black.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-collegiate-navy', 'adidas handball spezial - Collegiate Navy', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-collegiate-navy.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-carbon-core-black', 'Adidas Handball Spezial - Carbon Core Black', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-carbon-core-black.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-coreblack-white-cloud', 'Adidas Handball Spezial - Coreblack White Cloud', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-coreblack-white-cloud.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-green-burgundy-gum', 'Adidas Handball Spezial - Green Burgundy Gum', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-green-burgundy-gum.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-grey-navy', 'Adidas Handball Spezial - Grey Navy', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-grey-navy.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-light-blue', 'Adidas Handball Spezial - Light Blue', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-light-blue.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-maroon', 'Adidas Handball Spezial - Maroon', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-maroon.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-night-indigo', 'Adidas Handball Spezial - Night Indigo', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-night-indigo.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-pink', 'Adidas Handball Spezial - Pink', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-handball-spezial-violet-gum', 'Adidas Handball Spezial - Violet Gum', 550000, 0, 'Adidas', 'assets/uploads/adidas-handball-spezial-violet-gum.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-liverpool-green', 'Adidas Liverpool Green', 550000, 0, 'Adidas', 'assets/uploads/adidas-liverpool-green.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-liverpool-orange', 'Adidas Liverpool Orange', 550000, 0, 'Adidas', 'assets/uploads/adidas-liverpool-orange.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-liverpool-orange-2', 'Adidas Liverpool Orange', 550000, 0, 'Adidas', 'assets/uploads/adidas-liverpool-orange-2.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-96-core-black-better-scarlet', 'Adidas London 96 Core Black Better Scarlet', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-96-core-black-better-scarlet.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-96-cre-black-better-scarlet', 'Adidas London 96 Cre Black Better Scarlet', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-96-cre-black-better-scarlet.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-blue-red', 'Adidas London Blue Red', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-blue-red.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-blue-red-2', 'Adidas London Blue Red', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-blue-red-2.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-brown-yellow', 'Adidas London Brown Yellow', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-brown-yellow.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-brown-yellow-2', 'Adidas London Brown Yellow', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-brown-yellow-2.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-green-pink', 'Adidas London Green Pink', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-green-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-light-blue-orange', 'Adidas London Light Blue Orange', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-light-blue-orange.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-london-light-blue-orange-2', 'Adidas London Light Blue Orange', 550000, 0, 'Adidas', 'assets/uploads/adidas-london-light-blue-orange-2.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-samba-night-indigo', 'Adidas Samba - Night Indigo', 550000, 0, 'Adidas', 'assets/uploads/adidas-samba-night-indigo.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-samba-white-wonder-mauve', 'Adidas Samba - White Wonder Mauve', 550000, 0, 'Adidas', 'assets/uploads/adidas-samba-white-wonder-mauve.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-samba-maryjane-cloud-white-pink', 'Adidas Samba Maryjane - Cloud White Pink', 550000, 0, 'Adidas', 'assets/uploads/adidas-samba-maryjane-cloud-white-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-samba-maryjane-red', 'Adidas Samba Maryjane - Red', 550000, 0, 'Adidas', 'assets/uploads/adidas-samba-maryjane-red.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-superstar-ii-black', 'adidas superstar II - black', 550000, 0, 'Adidas', 'assets/uploads/adidas-superstar-ii-black.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-superstar-ii-white', 'adidas superstar II - white', 550000, 0, 'Adidas', 'assets/uploads/adidas-superstar-ii-white.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-adidas-tobacco-dark-blue', 'adidas tobacco - Dark Blue', 550000, 0, 'Adidas', 'assets/uploads/adidas-tobacco-dark-blue.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-p-6000-iron-grey-metallic-silver', 'Nike P 6000 Iron Grey Metallic Silver', 550000, 0, 'Nike', 'assets/uploads/nike-p-6000-iron-grey-metallic-silver.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-nike-p-6000-phantom-baroque-brown', 'Nike P 6000 Phantom Baroque Brown', 550000, 0, 'Nike', 'assets/uploads/nike-p-6000-phantom-baroque-brown.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-coklat', 'Puma Speedcat Coklat', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-coklat.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-cream', 'Puma Speedcat Cream', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-cream.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-hitam-pink', 'Puma Speedcat Hitam Pink', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-hitam-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-merah', 'Puma Speedcat Merah', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-merah.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-metalik-hitam', 'Puma Speedcat Metalik Hitam', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-metalik-hitam.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-navy', 'Puma Speedcat Navy', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-navy.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('epk-puma-speedcat-pink', 'Puma Speedcat Pink', 550000, 0, 'Puma', 'assets/uploads/puma-speedcat-pink.jpg', 10, 'Sneakers original 100%, BNIB. Stok terbatas — chat WhatsApp untuk cek size ready.', 4.8, 0),
  ('p1792004907167', 'puma speedcat', 550000, 0, 'Puma', 'assets/uploads/p-mv8hga1r-yanyh.jpg', 10, 'Sneakers original 100%, BNIB.', 4.8, 0),
  ('p1', 'Epilog Velocity "Infrared"', 550000, 0, 'Nike', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop', 12, 'Siluet lari dengan cushioning responsif dan colorway infrared yang jadi incaran.', 4.9, 2300),
  ('p2', 'Jordan 1 Mid "Panda Black"', 550000, 0, 'Jordan', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80&auto=format&fit=crop', 8, 'Ikon abadi. Kulit premium hitam-putih, BNIB + extra laces.', 5, 1800),
  ('p3', 'Dunk Low "Street White"', 550000, 0, 'Nike', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop', 15, 'Clean, versatile, gampang di-mix.', 4.8, 3100),
  ('p4', 'Epilog Runner "Volt Strike"', 550000, 0, 'Adidas', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop', 20, 'Runner ringan, cocok buat lari 5K maupun daily beater.', 4.7, 1200),
  ('p5', 'Classic Old Skool "Concrete"', 550000, 0, 'Vans', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80&auto=format&fit=crop', 25, 'Skate classic, kanvas durable + waffle sole.', 4.8, 4200),
  ('p6', 'NB 530 "Silver Beige"', 550000, 0, 'New Balance', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&auto=format&fit=crop', 10, 'Retro runner paling hype, ABZORB cushioning empuk.', 4.9, 2600),
  ('p7', 'Epilog Court "Lemon Haze"', 550000, 0, 'Limited', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format&fit=crop', 6, 'Drop terbatas, cuma 200 pasang se-Indonesia.', 4.9, 800),
  ('p8', 'Air Zoom "Night Black"', 550000, 0, 'Nike', 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80&auto=format&fit=crop', 9, 'Full black stealth mode, water-repellent upper.', 4.7, 950),
  ('p9', 'Superstar "Vintage White"', 550000, 0, 'Adidas', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80&auto=format&fit=crop', 18, 'Shell-toe legend sejak 1969.', 4.6, 1500),
  ('p10', 'Epilog Knit "Cloud Grey"', 550000, 0, 'New Balance', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80&auto=format&fit=crop', 14, 'Knit ringan seperti kaos kaki.', 4.8, 1100),
  ('p11', 'RS-X "Bubblegum"', 550000, 0, 'Puma', 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80&auto=format&fit=crop', 11, 'Chunky sneakers warna berani.', 4.5, 700),
  ('p12', 'Blazer "Retro High"', 550000, 0, 'Limited', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80&auto=format&fit=crop', 5, 'High-cut retro basketball.', 5, 600)
on conflict (id) do update set name = excluded.name, price = excluded.price, old = excluded.old, cat = excluded.cat, img = excluded.img, stock = excluded.stock, "desc" = excluded."desc", rating = excluded.rating, sold = excluded.sold;

/* Selesai. Cek:  SELECT count(*) FROM public.products
  */
