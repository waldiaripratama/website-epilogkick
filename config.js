/* ==========================================================================
   EPILOG KICK — KONFIGURASI ONLINE
   --------------------------------------------------------------------------
   File ini AMAN dipublikasikan ke publik (kunci "anon" memang public by
   design, aksesnya dibatasi RLS di Supabase).

   ⚠️ JANGAN pernah menaruh di sini:
      - password admin
      - service_role key (rahasia, bisa读写 semua data & bypass RLS)

   Cara pakai:
   1) Jalankan `supabase-setup.sql` di Supabase → SQL Editor → RUN
   2) Isi data di bawah ini
   3) Push ke GitHub → Netlify auto deploy
   ========================================================================== */
window.EPILOG_CONFIG = {
  /* --- Supabase project --- */
  supabaseUrl: 'https://spozxvfnxznaithnrlal.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwb3p4dmZueHpuYWl0aG5ybGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTc5ODAsImV4cCI6MjEwNzU3Mzk4MH0.rOEimAosbW39VMt_sGL97JTbY7g8_qBQtYkgOQHbQXw',

  /* --- Akun admin (Supabase Auth) ---
     Hanya email yang disimpan di sini (email bukan rahasia).
     Password diketik sendiri di halaman admin.
     Cara buat akun: Supabase → Authentication → Users → Add user
                     (centang "Auto Confirm User") */
  adminEmail: 'ganti-dengan-email-admin@epilogkick.com',

  /* --- Bucket storage untuk foto produk --- */
  storageBucket: 'product-images',
};
