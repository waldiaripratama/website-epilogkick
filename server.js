// Epilog Kick — Backend mini (tanpa coding harian)
// Cara pakai:
//   npm install
//   npm start            -> buka http://localhost:3000
//   Halaman admin: http://localhost:3000/admin.html  (password default: admin123)
// Deploy gratis: Render / Railway / Fly.io / VPS -> upload folder ini apa adanya.
//
// Fungsi:
// - Menyajikan index.html + admin.html + assets/
// - API katalog: GET/POST/DELETE /api/products (tersimpan di products.json)
// - API upload: POST /api/upload (simpan ke assets/uploads/, kembali URL publik)
// Semua pengunjung otomatis lihat update karena baca dari server.

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const DATA_FILE = path.join(__dirname, 'products.json');
const UPLOAD_DIR = path.join(__dirname, 'assets', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ---- helpers ----
function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeProducts(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
}

// Token super sederhana (bukan JWT, cukup untuk toko kecil).
// Login benar -> dapat token yang disimpan di memory.
const tokens = new Set();
function auth(req, res, next) {
  const t = (req.headers['x-admin-token'] || '').toString();
  if (t && tokens.has(t)) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// ---- API publik (dibaca semua pengunjung) ----
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

app.get('/api/config', (req, res) => {
  res.json({ serverMode: true, version: '1.1.0' });
});

// ---- Auth admin ----
app.post('/api/login', (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    const token = 'tok-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    tokens.add(token);
    return res.json({ ok: true, token });
  }
  return res.status(401).json({ error: 'Password salah' });
});

// ---- Upload file (admin saja) ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || '').toLowerCase() || '.jpg').slice(0, 5);
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
    cb(null, 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7) + safeExt);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
  fileFilter: (req, file, cb) => {
    if ((file.mimetype || '').startsWith('image/')) cb(null, true);
    else cb(new Error('Hanya file gambar yang boleh diupload'));
  },
});

app.post('/api/upload', auth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Upload gagal' });
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file' });
    const url = 'assets/uploads/' + req.file.filename;
    return res.json({ ok: true, url });
  });
});

// ---- CRUD produk (admin saja untuk tulis) ----
app.post('/api/products', auth, (req, res) => {
  const p = req.body || {};
  if (!p.name || !p.price) return res.status(400).json({ error: 'Nama + harga wajib' });
  const list = readProducts();
  const id = (p.id || ('p' + Date.now())).toString();
  const data = {
    id,
    name: String(p.name).slice(0, 120),
    price: Number(p.price) || 0,
    old: Number(p.old) || 0,
    cat: String(p.cat || 'Nike').slice(0, 40),
    img: String(p.img || '').slice(0, 2000),
    stock: Number(p.stock) || 0,
    desc: String(p.desc || '').slice(0, 2000),
    rating: Number(p.rating) || 4.8,
    sold: Number(p.sold) || 0,
  };
  const ix = list.findIndex((x) => x.id === id);
  if (ix >= 0) list[ix] = { ...list[ix], ...data };
  else list.unshift(data);
  writeProducts(list);
  res.json({ ok: true, product: data });
});

app.delete('/api/products/:id', auth, (req, res) => {
  const list = readProducts().filter((x) => x.id !== req.params.id);
  writeProducts(list);
  res.json({ ok: true });
});

// Hapus file upload yang tidak terpakai (opsional, admin saja)
app.delete('/api/upload', auth, (req, res) => {
  const url = (req.query.url || '').toString();
  if (!url.startsWith('assets/uploads/')) return res.status(400).json({ error: 'Bukan file upload' });
  const fp = path.join(__dirname, url);
  if (!fp.startsWith(UPLOAD_DIR)) return res.status(400).json({ error: 'Path tidak valid' });
  fs.unlink(fp, () => res.json({ ok: true }));
});

// ---- Static frontend ----
app.use(express.static(__dirname, { maxAge: '1h' }));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
  console.log(`✅ Epilog Kick jalan di http://localhost:${PORT}`);
  console.log(`   Admin: http://localhost:${PORT}/admin.html (password: ${ADMIN_PASSWORD === 'admin123' ? 'admin123' : '***'})`);
});
