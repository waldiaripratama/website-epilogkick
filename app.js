const DEFAULT_PRODUCTS = [
  {id:'p1', name:'Epilog Velocity "Infrared"', cat:'Nike', price:1899000, old:2299000, stock:12, rating:4.9, sold:2300, img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop', desc:'Siluet lari dengan cushioning responsif dan colorway infrared yang jadi incaran. Nyaman buat harian, garang buat nongkrong.'},
  {id:'p2', name:'Jordan 1 Mid "Panda Black"', cat:'Jordan', price:2199000, old:2599000, stock:8, rating:5.0, sold:1800, img:'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80&auto=format&fit=crop', desc:'Ikon abadi. Kulit premium hitam-putih yang masuk ke semua outfit. BNIB + extra laces.'},
  {id:'p3', name:'Dunk Low "Street White"', cat:'Nike', price:1749000, old:0, stock:15, rating:4.8, sold:3100, img:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop', desc:'Sneakers sejuta umat yang tidak pernah salah. Clean, versatile, gampang di-mix.'},
  {id:'p4', name:'Epilog Runner "Volt Strike"', cat:'Adidas', price:1499000, old:1899000, stock:20, rating:4.7, sold:1200, img:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop', desc:'Runner ringan dengan boost-like foam. Cocok buat lari 5K maupun daily beater.'},
  {id:'p5', name:'Classic Old Skool "Concrete"', cat:'Vans', price:1099000, old:0, stock:25, rating:4.8, sold:4200, img:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80&auto=format&fit=crop', desc:'Skate classic yang tidak lekang waktu. Kanvas durable + waffle sole lengket.'},
  {id:'p6', name:'NB 530 "Silver Beige"', cat:'New Balance', price:1699000, old:1999000, stock:10, rating:4.9, sold:2600, img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&auto=format&fit=crop', desc:'Retro runner paling hype 2025-2026. Mesh breathable, ABZORB cushioning empuk.'},
  {id:'p7', name:'Epilog Court "Lemon Haze"', cat:'Limited', price:1399000, old:0, stock:6, rating:4.9, sold:800, img:'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format&fit=crop', desc:'Drop terbatas Concrete Jungle. Cuma 200 pasang se-Indonesia. Numbered box.'},
  {id:'p8', name:'Air Zoom "Night Black"', cat:'Nike', price:1999000, old:0, stock:9, rating:4.7, sold:950, img:'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80&auto=format&fit=crop', desc:'Full black stealth mode. Favorit anak motor & streetwear. Water-repellent upper.'},
  {id:'p9', name:'Superstar "Vintage White"', cat:'Adidas', price:1299000, old:1599000, stock:18, rating:4.6, sold:1500, img:'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80&auto=format&fit=crop', desc:'Shell-toe legend sejak 1969. Kulit halus, cocok buat smart-casual.'},
  {id:'p10', name:'Epilog Knit "Cloud Grey"', cat:'New Balance', price:1599000, old:0, stock:14, rating:4.8, sold:1100, img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80&auto=format&fit=crop', desc:'Knit ringan seperti kaos kaki. Paling nyaman buat seharian jalan.'},
  {id:'p11', name:'RS-X "Bubblegum"', cat:'Puma', price:1349000, old:1699000, stock:11, rating:4.5, sold:700, img:'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80&auto=format&fit=crop', desc:'Chunky sneakers dengan warna berani. Statement piece buat outfit simpel.'},
  {id:'p12', name:'Blazer "Retro High"', cat:'Limited', price:1849000, old:2199000, stock:5, rating:5.0, sold:600, img:'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80&auto=format&fit=crop', desc:'High-cut retro basketball. Exposed foam + vintage swoosh. Auto naik level.'},
];
const SIZES = [39,40,41,42,43,44,45];
const CATS = ['Semua','Nike','Jordan','Adidas','New Balance','Vans','Puma','Limited'];
const ONGKIR = {bandung:15000, jabodetabek:25000, jawa:35000, luar:60000};
const WA_ADMIN = '6283139592869'; // 083139592869
const WA_DISPLAY = '0831-3959-2869';

// ===== MODE ONLINE (Supabase) — sekali setting via tab ONLINE, tanpa coding =====
// Kalau cfg kosong -> mode LOKAL (localStorage saja, upload hanya tampil di browser ini).
// Kalau cfg terisi & valid -> produk + gambar tersimpan online, tampil di semua pengunjung.
// ===== MODE ONLINE (Supabase) — CARA PALING SEDERHANA =====
// Tempel 2 baris ini SEKALI, upload folder ke hosting SEKALI, selesai.
// Sehari-hari admin tinggal: Choose File → SIMPAN (tanpa coding, tampil semua pengunjung).
// Kunci anon BOLEH publik (akses dibatasi RLS di SQL). Jangan taruh service_role key di sini!
const SUPABASE_URL = ''; // contoh: 'https://xxxx.supabase.co'
const SUPABASE_ANON_KEY = ''; // contoh: 'eyJhbGciOi...'
const CLOUD_CFG_KEY = 'epilog_cloud_cfg'; // override lokal (untuk tes tanpa edit code)
// Config efektif = override lokal (tab ONLINE) kalau ada, kalau tidak pakai bawaan code.
// Ini yang bikin PENGUNJUNG ikut baca data online tanpa perlu setting apa pun.
function cloudCreds(){
  const local = load(CLOUD_CFG_KEY, {url:'', key:''});
  const url = ((local && local.url) || SUPABASE_URL || '').trim().replace(/\/$/,'');
  const key = ((local && local.key) || SUPABASE_ANON_KEY || '').trim();
  return {url, key, fromLocal: !!(local && local.url && local.key)};
}
let cloudCfg = load(CLOUD_CFG_KEY, {url:'', key:''});
let sb = null;
let cloudMode = false; // true = online aktif
function getSb(){
  if(sb) return sb;
  const {url, key} = cloudCreds();
  if(!url || !key) return null;
  if(!window.supabase){ toast('Library online belum termuat, cek internet 🙏'); return null; }
  sb = window.supabase.createClient(url, key);
  return sb;
}
function isCloud(){ return cloudMode && !!getSb(); }
function setUploadState(msg){
  const el = document.getElementById('uploadState');
  if(el) el.textContent = msg || '';
}
function refreshCloudStatus(){
  const {url, fromLocal} = cloudCreds();
  const badge = document.getElementById('cloudBadge');
  const st = document.getElementById('cloudStatus');
  const st2 = document.getElementById('cloudStatus2');
  const hint = document.getElementById('uploadModeHint');
  const online = serverMode || cloudMode;
  const label = serverMode ? 'SERVER ONLINE' : (cloudMode ? 'SUPABASE ONLINE' : 'LOKAL');
  if(badge) badge.textContent = serverMode ? '🌐 SERVER ONLINE' : (cloudMode ? '🌐 ONLINE' : '📴 LOKAL');
  if(badge) badge.style.color = online ? '#ccff00' : '#888';
  if(st) st.textContent = serverMode
    ? '✅ Server aktif — upload via admin.html tampil semua pengunjung otomatis.'
    : (cloudMode
      ? '✅ Online aktif (' + (fromLocal ? 'dari setting tab ini' : 'dari code app.js — berlaku semua pengunjung') + ')'
      : (url ? '⏳ URL terisi tapi belum tersambung. Klik TES KONEKSI.' : '📴 Belum online. Cara termudah: buka admin.html via server (npm start) — tanpa setting API. Alternatif: isi Supabase di bawah.'));
  if(st2) st2.textContent = serverMode ? '(aktif via server ✅)' : (cloudMode ? '(aktif ✅)' : '(belum aktif — masih lokal)');
  if(hint) hint.textContent = serverMode ? 'SERVER ONLINE ✅' : (cloudMode ? 'ONLINE ✅' : 'LOKAL');
  const u = document.getElementById('cfgUrl'); if(u && !u.value) u.value = (load(CLOUD_CFG_KEY,{url:'',key:''}).url||'');
  const k = document.getElementById('cfgKey'); if(k && !k.value) k.value = (load(CLOUD_CFG_KEY,{url:'',key:''}).key||'');
}
async function cloudFetchProducts(){
  const c = getSb(); if(!c) throw new Error('Belum dikonfigurasi');
  const {data, error} = await c.from('products').select('*');
  if(error) throw error;
  return data || [];
}
async function cloudUpsertProduct(p){
  const c = getSb(); if(!c) return;
  const {error} = await c.from('products').upsert(p);
  if(error) throw error;
}
async function cloudDeleteProduct(id){
  const c = getSb(); if(!c) return;
  const {error} = await c.from('products').delete().eq('id', id);
  if(error) throw error;
}
// Upload blob gambar -> Storage public -> kembalikan URL publik
async function cloudUploadImage(blob, filename){
  const c = getSb(); if(!c) throw new Error('Belum dikonfigurasi');
  const path = filename || ('p-' + Date.now() + '.jpg');
  const {error} = await c.storage.from('product-images').upload(path, blob, {contentType:'image/jpeg', upsert:true});
  if(error) throw error;
  const {data} = c.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}
async function initCloud(){
  refreshCloudStatus();
  const {url, key} = cloudCreds();
  if(!(url && key)) return; // masih lokal murni — pengunjung lihat cache/default, tidak error
  try{
    getSb();
    const remote = await cloudFetchProducts();
    if(remote.length){
      products = remote;
      save('epilog_products', products);
      renderProducts(); renderAdmin();
    }
    cloudMode = true;
  }catch(e){
    console.warn('cloud init gagal:', e);
    cloudMode = false;
  }
  refreshCloudStatus();
}
function saveCloudCfg(){
  const url = (document.getElementById('cfgUrl').value||'').trim().replace(/\/$/,'');
  const key = (document.getElementById('cfgKey').value||'').trim();
  if(!url || !key) return toast('Isi URL + Anon Key dulu 🙏');
  cloudCfg = {url, key};
  save(CLOUD_CFG_KEY, cloudCfg);
  sb = null; cloudMode = false;
  refreshCloudStatus();
  toast('Menyambungkan... ⏳');
  initCloud().then(()=>{ if(cloudMode) toast('Online aktif! ✅'); else toast('Gagal konek, cek URL/Key + SQL 🙏'); });
}
async function testCloud(){
  try{
    const c = getSb(); if(!c) return toast('Isi URL + Key dulu 🙏');
    const n = (await cloudFetchProducts()).length;
    cloudMode = true; refreshCloudStatus();
    toast(`Tersambung! ${n} produk online ✅`);
  }catch(e){ console.warn(e); toast('Gagal: ' + (e.message||e) + ' 🙏'); }
}
function disconnectCloud(){
  if(!confirm('Putuskan mode online? Katalog kembali lokal.')) return;
  cloudCfg = {url:'', key:''};
  save(CLOUD_CFG_KEY, cloudCfg);
  sb = null; cloudMode = false;
  refreshCloudStatus();
  toast('Kembali ke mode lokal 📴');
}
async function pushLocalToCloud(){
  try{
    if(!getSb()) return toast('Isi URL + Key dulu 🙏');
    if(!products.length) return toast('Tidak ada produk lokal!');
    toast('Mengupload ' + products.length + ' produk... ⏳');
    for(const p of products) await cloudUpsertProduct(p);
    cloudMode = true; refreshCloudStatus();
    toast('Semua produk sudah online! ✅');
  }catch(e){ console.warn(e); toast('Gagal upload: ' + (e.message||e) + ' 🙏'); }
}
function copyCloudSql(){
  const t = document.getElementById('cloudSql')?.textContent || '';
  navigator.clipboard?.writeText(t).then(()=>toast('SQL tercopy! Paste di Supabase ✅')).catch(()=>toast('Gagal copy, blok manual 🙏'));
}

// ===== MODE SERVER (backend sendiri — upload online tanpa coding harian) =====
// Kalau website dijalankan via `npm start` / Render / Railway / VPS,
// katalog dibaca dari GET /api/products sehingga semua pengunjung
// otomatis lihat update dari halaman admin.html. Tanpa API key.
// Kalau dibuka via file:// / hosting statis biasa -> otomatis fallback lokal/Supabase.
let serverMode = false;
function adminToken(){ return localStorage.getItem('epilog_admin_token') || ''; }
async function serverFetchProducts(){
  for(const u of ['api/products', '/api/products']){
    try{
      const r = await fetch(u, {cache:'no-store'});
      if(r.ok){ const j = await r.json(); if(Array.isArray(j)) return j; }
    }catch{}
  }
  throw new Error('no-server');
}
async function serverSaveProduct(p){
  const t = adminToken();
  if(!t) return false; // belum login via admin.html -> skip, jangan blokir
  for(const u of ['api/products', '/api/products']){
    try{
      const r = await fetch(u, {method:'POST', headers:{'Content-Type':'application/json','x-admin-token':t}, body: JSON.stringify(p)});
      if(r.ok) return true;
    }catch{}
  }
  return false;
}
async function serverDeleteProduct(id){
  const t = adminToken();
  if(!t) return false;
  for(const u of ['api/products/' + encodeURIComponent(id), '/api/products/' + encodeURIComponent(id)]){
    try{ const r = await fetch(u, {method:'DELETE', headers:{'x-admin-token':t}}); if(r.ok) return true; }catch{}
  }
  return false;
}
async function serverUploadImage(blob){
  const t = adminToken();
  if(!t) throw new Error('belum-login-server');
  const fd = new FormData();
  fd.append('file', blob, 'foto.jpg');
  for(const u of ['api/upload', '/api/upload']){
    try{
      const r = await fetch(u, {method:'POST', headers:{'x-admin-token':t}, body: fd});
      const j = await r.json();
      if(r.ok && j.url) return j.url;
    }catch{}
  }
  throw new Error('upload-server-gagal');
}
async function initServer(){
  try{
    const remote = await serverFetchProducts();
    if(remote.length){
      products = remote;
      try{ localStorage.setItem('epilog_products', JSON.stringify(products)); }catch{}
      renderProducts(); renderAdmin();
    }
    serverMode = true;
  }catch{ serverMode = false; }
  refreshCloudStatus();
  return serverMode;
}

let products = load('epilog_products', DEFAULT_PRODUCTS);
let cart = load('epilog_cart', []); // {id,size,qty}
let orders = load('epilog_orders', []);
let voucherDisc = 0;
let curFilter = 'Semua', curSearch='', curSort='featured';
let modalId=null, modalSize=null, modalQty=1;

function load(k, fb){ try{const v=JSON.parse(localStorage.getItem(k)); return v??fb}catch{return fb} }
function save(k,v){
  try{ localStorage.setItem(k, JSON.stringify(v)); return true }
  catch(e){
    console.warn('save gagal:', k, e);
    const quota = e && (e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED' || (''+e).includes('Quota'));
    if(quota) toast('Penyimpanan penuh! Gambar terlalu besar. Kompres <500KB atau pakai URL / assets/ 🙏');
    else toast('Gagal menyimpan! 🙏');
    return false;
  }
}
function rp(n){ return 'Rp ' + n.toLocaleString('id-ID') }

function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove('show'),2200) }

// RENDER
function renderCats(){
  document.getElementById('catPills').innerHTML = CATS.map(c=>`<button class="${c===curFilter?'active':''}" onclick="setFilter('${c}')">${c}</button>`).join('');
}
function filtered(){
  let list=[...products];
  if(curFilter!=='Semua') list=list.filter(p=>p.cat===curFilter);
  if(curSearch) list=list.filter(p=>p.name.toLowerCase().includes(curSearch.toLowerCase()));
  if(curSort==='low') list.sort((a,b)=>a.price-b.price);
  if(curSort==='high') list.sort((a,b)=>b.price-a.price);
  if(curSort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}
function renderProducts(){
  renderCats();
  const list=filtered();
  document.getElementById('resultInfo').textContent=`Menampilkan ${list.length} produk${curFilter!=='Semua'?' • '+curFilter:''}`;
  document.getElementById('statProduct').textContent=products.length+'+';
  document.getElementById('productGrid').innerHTML = list.length? list.map(p=>{
    const disc = p.old? Math.round((1-p.price/p.old)*100):0;
    const habis = p.stock<=0;
    return `<div class="card" onclick="openProduct('${p.id}')">
      ${habis?'<div class="badge-habis">HABIS</div>':(p.cat==='Limited'||disc>15?'<div class="badge-limited">LIMITED 🔥</div>':'')}
      <img src="${p.img}" loading="lazy" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop'">
      <div class="card-body">
        <div class="card-cat">${p.cat.toUpperCase()} • ★ ${p.rating} (${(p.sold/1000).toFixed(1)}k)</div>
        <h3>${p.name}</h3>
        <div class="card-price"><b>${rp(p.price)}</b>${p.old?`<s>${rp(p.old)}</s><span class="disc">-${disc}%</span>`:''}</div>
        <div class="card-foot">
          <button class="mini-btn light" onclick="event.stopPropagation();openProduct('${p.id}')">DETAIL</button>
          <button class="mini-btn dark" ${habis?'disabled style="opacity:.4"':''} onclick="event.stopPropagation();quickAdd('${p.id}')">+ KERANJANG</button>
        </div>
        <button class="wa-card-btn" ${habis?'disabled style="opacity:.4"':''} onclick="event.stopPropagation();orderWa('${p.id}')">💬 Pesan via WA</button>
      </div></div>`;
  }).join('') : `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#888">Tidak ada produk ditemukan. <button class="btn btn-ghost" onclick="resetFilter()">Reset Filter</button></div>`;
}
function setFilter(c){curFilter=c;renderProducts()}
function onSearch(v){curSearch=v;renderProducts()}
function onSort(v){curSort=v;renderProducts()}
function resetFilter(){curFilter='Semua';curSearch='';document.getElementById('navSearch').value='';renderProducts()}

// PRODUCT MODAL
function openProduct(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  modalId=id; modalSize=null; modalQty=1;
  document.getElementById('mImg').src=p.img;
  document.getElementById('mCat').textContent=p.cat.toUpperCase()+' • TERJUAL '+p.sold.toLocaleString('id-ID');
  document.getElementById('mName').textContent=p.name;
  document.getElementById('mRating').textContent=`★ ${p.rating} • ${p.sold.toLocaleString('id-ID')} terjual • ${p.stock>0?'Stok '+p.stock:'Stok habis'}`;
  document.getElementById('mPrice').textContent=rp(p.price);
  document.getElementById('mOld').textContent=p.old?rp(p.old):'';
  document.getElementById('mDisc').textContent=p.old?`-${Math.round((1-p.price/p.old)*100)}%`:'';
  document.getElementById('mDesc').textContent=p.desc||'';
  document.getElementById('mQty').textContent='1';
  document.getElementById('mStock').textContent=p.stock>0?`Sisa ${p.stock} pasang`:'Habis — restock segera';
  document.getElementById('mSizes').innerHTML=SIZES.map(s=>`<button onclick="pickSize(${s},this)" ${p.stock<=0?'disabled class="low"':''}>EU ${s}</button>`).join('');
  document.getElementById('productModalBg').classList.add('show');
  document.getElementById('productModal').classList.add('show');
}
function closeProduct(){document.getElementById('productModalBg').classList.remove('show');document.getElementById('productModal').classList.remove('show')}
function pickSize(s,el){modalSize=s;document.querySelectorAll('#mSizes button').forEach(b=>b.classList.remove('sel'));el.classList.add('sel')}
function chQty(d){modalQty=Math.max(1,Math.min(5,modalQty+d));document.getElementById('mQty').textContent=modalQty}
function quickAdd(id){
  const p=products.find(x=>x.id===id);
  if(!p||p.stock<=0) return toast('Stok habis!');
  const size=42;
  addToCart(id,size,1);
}
function addFromModal(){
  if(!modalSize) return toast('Pilih size dulu, bro! 👟');
  addToCart(modalId,modalSize,modalQty);
  closeProduct();
}
function buyNow(){
  if(!modalSize) return toast('Pilih size dulu!');
  addToCart(modalId,modalSize,modalQty,true);
  closeProduct();
}
function addToCart(id,size,qty,silent){
  const p=products.find(x=>x.id===id);
  const ex=cart.find(c=>c.id===id&&c.size===size);
  const curQty=ex?ex.qty:0;
  if(curQty+qty>p.stock) return toast(`Stok cuma ${p.stock}!`);
  if(ex) ex.qty+=qty; else cart.push({id,size,qty});
  save('epilog_cart',cart); renderCart();
  if(!silent) toast('Masuk keranjang! 🛒');
  if(silent) toggleCart(true); else toggleCart(true);
}

// CART
function toggleCart(open){
  document.getElementById('cartDrawer').classList.toggle('open',open);
  document.getElementById('cartOverlay').classList.toggle('show',open);
}
function toggleMobile(){document.getElementById('mobileMenu').classList.toggle('show')}
function cartTotals(){
  let sub=cart.reduce((s,c)=>{const p=products.find(x=>x.id===c.id);return s+(p?p.price*c.qty:0)},0);
  let ong = cart.length? ONGKIR[document.getElementById('fKota')?.value||'bandung'] : 0;
  if(sub>=500000) ong=0;
  let disc = Math.round(sub*voucherDisc);
  return {sub,ong,disc,total:sub+ong-disc};
}
function renderCart(){
  const n=cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cartCount').textContent=n;
  document.getElementById('cartCount2').textContent=n;
  const box=document.getElementById('cartItems');
  if(!cart.length){box.innerHTML=`<div class="cart-empty">🛒<br><br>Keranjang masih kosong.<br><a href="#shop" onclick="toggleCart(false)" style="color:#ccff00;font-weight:800">GAS BELANJA →</a></div>`}
  else box.innerHTML=cart.map((c,i)=>{
    const p=products.find(x=>x.id===c.id); if(!p) return '';
    return `<div class="c-item"><img src="${p.img}"><div><b>${p.name}</b><small>EU ${c.size} • ${rp(p.price)}</small><div class="c-qty"><button onclick="cQty(${i},-1)">−</button><span>${c.qty}</span><button onclick="cQty(${i},1)">+</button><button class="c-del" onclick="cDel(${i})">🗑️</button></div></div></div>`;
  }).join('');
  const t=cartTotals();
  document.getElementById('cartSubtotal').textContent=rp(t.sub);
  document.getElementById('cartOngkir').textContent=t.ong===0?(cart.length?'GRATIS':'Rp 0'):rp(t.ong);
  document.getElementById('cartDiskon').textContent='- '+rp(t.disc);
  document.getElementById('cartTotal').textContent=rp(t.total);
}
function cQty(i,d){
  const p=products.find(x=>x.id===cart[i].id);
  const nq=cart[i].qty+d;
  if(nq<1) return cDel(i);
  if(nq>p.stock) return toast(`Maksimal ${p.stock}!`);
  cart[i].qty=nq; save('epilog_cart',cart); renderCart();
}
function cDel(i){cart.splice(i,1);save('epilog_cart',cart);renderCart()}
function applyVoucher(){
  const v=document.getElementById('voucher').value.trim().toUpperCase();
  if(v==='EPILOG10'){voucherDisc=0.10;toast('Voucher 10% aktif! 🎉')}
  else if(v==='HEMAT15'){voucherDisc=0.15;toast('Voucher 15% aktif! 🔥')}
  else if(v===''){voucherDisc=0}
  else return toast('Kode tidak valid. Coba EPILOG10');
  renderCart();
}
function calcOngkir(){renderCart()}

// CHECKOUT
function openCheckout(){
  if(!cart.length) return toast('Keranjang kosong!');
  toggleCart(false);
  const t=cartTotals();
  document.getElementById('coItems').innerHTML=cart.map(c=>{
    const p=products.find(x=>x.id===c.id);
    return `<div class="row"><span>${p.name} (EU ${c.size}) x${c.qty}</span><b>${rp(p.price*c.qty)}</b></div>`;
  }).join('')+`<div class="row"><span>Ongkir ${t.ong===0?'(GRATIS)':''}</span><b>${rp(t.ong)}</b></div>${t.disc?`<div class="row"><span>Diskon</span><b>- ${rp(t.disc)}</b></div>`:''}`;
  document.getElementById('coTotal').textContent=rp(t.total);
  document.getElementById('checkoutBg').classList.add('show');
  document.getElementById('checkoutModal').classList.add('show');
}
function closeCheckout(){document.getElementById('checkoutBg').classList.remove('show');document.getElementById('checkoutModal').classList.remove('show')}
function submitOrder(e){
  e.preventDefault();
  const t=cartTotals();
  const order={
    id:'EPK-'+Date.now().toString().slice(-6),
    nama:document.getElementById('fNama').value,
    wa:document.getElementById('fWa').value,
    alamat:document.getElementById('fAlamat').value,
    kota:document.getElementById('fKota').value,
    bayar:document.getElementById('fBayar').value,
    items:cart.map(c=>{const p=products.find(x=>x.id===c.id);return {...c,name:p.name,price:p.price}}),
    total:t.total, status:'proses', date:new Date().toLocaleString('id-ID')
  };
  // kurangi stok
  order.items.forEach(it=>{const p=products.find(x=>x.id===it.id); if(p){p.stock=Math.max(0,p.stock-it.qty); p.sold+=it.qty}});
  save('epilog_products',products);
  // sync stok ke online (best-effort)
  if(isCloud()){
    order.items.forEach(it=>{
      const p = products.find(x=>x.id===it.id);
      if(p) cloudUpsertProduct(p).catch(e=>console.warn('sync stok gagal:', e));
    });
  }
  orders.unshift(order); save('epilog_orders',orders);
  cart=[]; save('epilog_cart',cart); renderCart(); renderProducts(); renderAdmin();
  closeCheckout();
  window.open(waCheckoutLink(order),'_blank');
  toast(`Pesanan ${order.id} berhasil! Cek WhatsApp ya ✅`);
  e.target.reset();
}

// NEWS & FAQ
function subscribe(e){e.preventDefault();toast('Siap! Kamu masuk list early drop 🎉');document.getElementById('newsEmail').value=''}
function openFaq(e){e.preventDefault();toast('Hubungi CS via WhatsApp untuk info lengkap 🙏')}

// PESAN LANGSUNG VIA WHATSAPP 083139592869
function orderWa(id, size){
  const p = products.find(x=>x.id===id); if(!p) return;
  const s = size || modalSize || 42;
  const msg = `Halo EpilogKick! Saya mau pesan:%0A%0A👟 *${encodeURIComponent(p.name)}*%0ASize EU: ${s}%0AHarga: ${rp(p.price)}%0A%0AApakah stok masih ready?`;
  // bangun pesan tanpa double-encode untuk readability
  const raw = `Halo EpilogKick! Saya mau pesan:\n\n👟 *${p.name}*\nSize EU: ${s}\nHarga: ${rp(p.price)}\n\nApakah stok masih ready?`;
  window.open(`https://wa.me/${WA_ADMIN}?text=${encodeURIComponent(raw)}`,'_blank');
}
function waCheckoutLink(order){
  const raw = `Halo EpilogKick! Saya ${order.nama} mau order ${order.id} total ${rp(order.total)} (${order.bayar}). Alamat: ${order.alamat}`;
  return `https://wa.me/${WA_ADMIN}?text=${encodeURIComponent(raw)}`;
}
// Upload gambar: dikompres dulu (max 800px), lalu:
// - Mode ONLINE: diupload ke Supabase Storage -> dapat URL publik (tampil semua pengunjung)
// - Mode LOKAL: disimpan sebagai dataURL di localStorage (hanya browser ini)
let imgReady = true;
let pendingBlob = null; // blob terkompres siap upload (dipakai mode online saat SIMPAN)
function compressImage(img){
  const MAX = 800;
  let w = img.width, h = img.height;
  const scale = Math.min(1, MAX / Math.max(w, h));
  w = Math.max(1, Math.round(w * scale)); h = Math.max(1, Math.round(h * scale));
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  cv.getContext('2d').drawImage(img, 0, 0, w, h);
  return cv;
}
function canvasToBlob(cv, q){
  return new Promise(res => cv.toBlob(b => res(b), 'image/jpeg', q));
}
function handleImgFile(input){
  const f = input.files && input.files[0]; if(!f) return;
  if(!f.type.startsWith('image/')){ toast('File harus gambar 🙏'); input.value=''; return; }
  if(f.size > 2.5*1024*1024) { toast('Maks 2.5MB ya, kompres dulu 🙏'); input.value=''; return; }
  imgReady = false; pendingBlob = null;
  setUploadState('⏳ Memproses gambar...');
  const r = new FileReader();
  r.onload = e => {
    const img = new Image();
    img.onload = async () => {
      try{
        const cv = compressImage(img);
        let q = 0.82;
        let blob = await canvasToBlob(cv, q);
        // Kalau masih > ~700KB, kompres ulang lebih agresif
        if(blob && blob.size > 700000){
          blob = await canvasToBlob(cv, 0.65);
        }
        if(!blob) throw new Error('kompres gagal');
        pendingBlob = blob;
        const localUrl = URL.createObjectURL(blob);
        document.getElementById('pImg').value = ''; // dikosongkan dulu, diisi URL online / dataURL setelahnya
        const pv = document.getElementById('pPreview');
        if(pv){ pv.src = localUrl; pv.style.display='block'; }
        if(serverMode && adminToken()){
          try{
            setUploadState('⏳ Mengupload ke server...');
            const url = await serverUploadImage(blob);
            document.getElementById('pImg').value = url;
            if(pv){ pv.src = url; }
            setUploadState('✅ Sudah online — tampil semua pengunjung');
            toast('Gambar online! Klik SIMPAN PRODUK ✅');
          }catch(err){
            console.warn('upload server gagal:', err);
            if((''+err.message).includes('belum-login')){ setUploadState('⚠️ Buka admin.html & login dulu agar online (tersimpan lokal sementara)'); }
            else setUploadState('⚠️ Upload server gagal, tersimpan lokal dulu');
            const dataUrl = cv.toDataURL('image/jpeg', 0.72);
            document.getElementById('pImg').value = dataUrl;
          }
        } else if(isCloud()){
          try{
            setUploadState('⏳ Mengupload online...');
            const url = await cloudUploadImage(blob);
            document.getElementById('pImg').value = url;
            if(pv){ pv.src = url; }
            setUploadState('✅ Sudah online — tampil semua pengunjung');
            toast('Gambar online! Klik SIMPAN PRODUK ✅');
          }catch(err){
            console.warn('upload online gagal, fallback lokal:', err);
            // fallback: pakai dataURL lokal agar tidak blocking
            const dataUrl = cv.toDataURL('image/jpeg', 0.72);
            document.getElementById('pImg').value = dataUrl;
            setUploadState('⚠️ Upload online gagal, tersimpan lokal dulu');
            toast('Net gangguan — tersimpan lokal dulu ⚠️');
          }
        } else {
          // mode lokal: simpan dataURL terkompres
          const dataUrl = cv.toDataURL('image/jpeg', blob.size > 700000 ? 0.65 : 0.82);
          document.getElementById('pImg').value = dataUrl;
          setUploadState('📴 Mode lokal — hanya tampil di browser ini (aktifkan tab ONLINE)');
          toast('Gambar siap! Klik SIMPAN PRODUK ✅');
        }
      }catch(err){
        console.warn('kompres gagal, pakai file asli:', err);
        document.getElementById('pImg').value = e.target.result;
        const pv = document.getElementById('pPreview');
        if(pv){ pv.src = e.target.result; pv.style.display='block'; }
        setUploadState('');
        toast('Gambar siap! Klik SIMPAN PRODUK ✅');
      }
      imgReady = true;
    };
    img.onerror = () => {
      document.getElementById('pImg').value = e.target.result;
      const pv = document.getElementById('pPreview');
      if(pv){ pv.src = e.target.result; pv.style.display='block'; }
      imgReady = true; setUploadState('');
      toast('Gambar siap! Klik SIMPAN PRODUK ✅');
    };
    img.src = e.target.result;
  };
  r.onerror = () => { imgReady = true; setUploadState(''); toast('Gagal baca file 🙏'); };
  r.readAsDataURL(f);
}
// Preview live saat user paste URL / path assets/ manual
function syncPreviewFromUrl(){
  const v = (document.getElementById('pImg').value||'').trim();
  const pv = document.getElementById('pPreview');
  if(!pv) return;
  if(v){ pv.src = v; pv.style.display='block'; }
  else {
    // kalau input dikosongkan saat edit, jangan hilangkan preview lama
    const hasFile = document.getElementById('pFile')?.files?.length;
    if(!hasFile && !document.getElementById('pId').value){ pv.src=''; pv.style.display='none'; }
  }
}

// ADMIN
function toggleAdmin(force){
  const m=document.getElementById('adminModal'), bg=document.getElementById('adminBg');
  const show = force!==undefined?force:!m.classList.contains('show');
  m.classList.toggle('show',show); bg.classList.toggle('show',show);
  if(show) renderAdmin();
}
function adminLogin(e){
  e.preventDefault();
  if(document.getElementById('adminPass').value==='admin123'){
    localStorage.setItem('epilog_admin','1'); renderAdmin(); toast('Welcome, Admin! 👑');
  } else toast('Password salah!');
}
function adminLogout(){localStorage.removeItem('epilog_admin');renderAdmin()}
function isAdmin(){return localStorage.getItem('epilog_admin')==='1'}
function adminTab(t,el){
  document.querySelectorAll('.admin-tabs button').forEach(b=>b.classList.remove('active')); el.classList.add('active');
  document.getElementById('tabProduk').style.display=t==='produk'?'block':'none';
  document.getElementById('tabOrder').style.display=t==='order'?'block':'none';
  document.getElementById('tabOnline').style.display=t==='online'?'block':'none';
  if(t==='online') refreshCloudStatus();
}
function renderAdmin(){
  document.getElementById('adminLogin').style.display=isAdmin()?'none':'block';
  document.getElementById('adminPanel').style.display=isAdmin()?'block':'none';
  document.getElementById('orderCount').textContent=orders.length;
  refreshCloudStatus();
  if(!isAdmin()) return;
  document.getElementById('adminList').innerHTML=products.map(p=>`<div class="a-row"><img src="${p.img}" onerror="this.src='https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop'"><div class="grow"><b>${p.name}</b><br><small>${p.cat} • ${rp(p.price)} • Stok ${p.stock}</small></div><button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button><button class="btn-del" onclick="delProduct('${p.id}')">Hapus</button></div>`).join('');
  document.getElementById('orderList').innerHTML=orders.length?orders.map((o,i)=>`<div class="a-row"><div class="grow"><b>${o.id} — ${o.nama}</b><br><small>${o.date} • ${o.items.map(x=>x.name+' EU'+x.size+' x'+x.qty).join(', ')}<br>Total ${rp(o.total)} • ${o.bayar} • ${o.wa}</small><br><span class="status ${o.status}">${o.status.toUpperCase()}</span></div><button class="btn-edit" onclick="orderStatus(${i})">Ubah Status</button><button class="btn-del" onclick="delOrder(${i})">Hapus</button></div>`).join(''):'<p style="color:#888">Belum ada pesanan.</p>';
}
async function saveProduct(e){
  e.preventDefault();
  if(!imgReady) return toast('Tunggu gambar selesai diproses... ⏳');
  const id=document.getElementById('pId').value||'p'+Date.now();
  const ix=products.findIndex(p=>p.id===id);
  const filePicked = document.getElementById('pFile')?.files?.length > 0;
  let imgVal=(document.getElementById('pImg').value||'').trim();
  // Mode online: kalau user pilih file tapi URL belum jadi (upload gagal di tengah), coba upload ulang saat SIMPAN
  if(!imgVal && filePicked && serverMode && pendingBlob && adminToken()){
    try{
      toast('Mengupload gambar... ⏳');
      imgVal = await serverUploadImage(pendingBlob);
      document.getElementById('pImg').value = imgVal;
    }catch(err){ console.warn(err); return toast('Upload server gagal — login via admin.html dulu 🙏'); }
  }
  if(!imgVal && filePicked && isCloud() && pendingBlob){
    try{
      toast('Mengupload gambar... ⏳');
      imgVal = await cloudUploadImage(pendingBlob);
      document.getElementById('pImg').value = imgVal;
    }catch(err){ console.warn(err); return toast('Upload gambar gagal, coba lagi 🙏'); }
  }
  if(!imgVal && filePicked) return toast('Tunggu gambar selesai diproses... ⏳');
  // Edit tanpa upload ulang: pertahankan gambar lama (jangan tertimpa fallback)
  if(!imgVal && ix>=0) imgVal = products[ix].img;
  if(!imgVal) imgVal = `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&auto=format&fit=crop`;
  // Mode lokal: tolak dataURL raksasa agar tidak merusak localStorage
  if(!isCloud() && imgVal.startsWith('data:') && imgVal.length > 900000){
    return toast('Gambar masih kebesaran. Aktifkan tab ONLINE atau pakai gambar lebih kecil 🙏');
  }
  const prev = ix>=0 ? products[ix] : null;
  const data={
    id,
    name:document.getElementById('pName').value,
    price:+document.getElementById('pPrice').value,
    old:+document.getElementById('pOld').value||0,
    cat:document.getElementById('pCat').value,
    img:imgVal,
    stock:+document.getElementById('pStock').value||0,
    desc:document.getElementById('pDesc').value||'Sneakers original 100%, BNIB, free legit check.',
    rating:prev?.rating||4.8, sold:prev?.sold||0
  };
  if(ix>=0) products[ix]={...products[ix],...data}; else products.unshift(data);
  if(!save('epilog_products',products)) return; // gagal (quota penuh) -> jangan render/clear
  renderProducts(); renderAdmin(); clearForm();
  const onlineNow = serverMode || isCloud();
  toast(serverMode ? 'Produk online via server! Tampil semua pengunjung ✅' : (isCloud() ? 'Produk online! Tampil semua pengunjung ✅' : 'Produk tersimpan lokal! ✅ (buka admin.html via server agar global)'));
  // sinkron ke server (kalau login via admin.html)
  if(serverMode){
    try{ const ok = await serverSaveProduct(data); if(!ok && adminToken()) toast('Tersimpan lokal, sync server gagal 🙏'); }
    catch(err){ console.warn(err); }
  }
  // sinkron ke cloud (non-blocking, tapi laporkan gagal)
  if(isCloud()){
    try{ await cloudUpsertProduct(data); }
    catch(err){ console.warn(err); toast('Tersimpan lokal, sync online gagal 🙏'); }
  }
}
function editProduct(id){
  const p=products.find(x=>x.id===id);
  document.getElementById('pId').value=p.id;
  document.getElementById('pName').value=p.name;
  document.getElementById('pPrice').value=p.price;
  document.getElementById('pOld').value=p.old||'';
  document.getElementById('pCat').value=p.cat;
  document.getElementById('pImg').value=p.img.startsWith('data:')?'':p.img;
  document.getElementById('pStock').value=p.stock;
  document.getElementById('pDesc').value=p.desc;
  const f=document.getElementById('pFile'); if(f) f.value='';
  imgReady = true; pendingBlob = null; setUploadState('');
  const pv=document.getElementById('pPreview');
  if(pv){pv.src=p.img;pv.style.display='block';}
  window.scrollTo(0,0);
  toast('Edit mode: ubah lalu SIMPAN ✅');
}
async function delProduct(id){
  if(!confirm('Hapus produk?')) return;
  products=products.filter(p=>p.id!==id);
  save('epilog_products',products);renderProducts();renderAdmin();
  if(serverMode){
    try{ const ok = await serverDeleteProduct(id); if(ok) toast('Terhapus dari server juga ✅'); }
    catch(err){ console.warn(err); }
  }
  if(isCloud()){
    try{ await cloudDeleteProduct(id); toast('Terhapus online juga ✅'); }
    catch(err){ console.warn(err); toast('Terhapus lokal, sync online gagal 🙏'); }
  }
}
function clearForm(){['pId','pName','pPrice','pOld','pImg','pDesc'].forEach(i=>document.getElementById(i).value='');document.getElementById('pStock').value=10;const f=document.getElementById('pFile');if(f)f.value='';const pv=document.getElementById('pPreview');if(pv){pv.src='';pv.style.display='none';} imgReady=true; pendingBlob=null; setUploadState('');}
function orderStatus(i){orders[i].status=orders[i].status==='proses'?'selesai':'proses';save('epilog_orders',orders);renderAdmin()}
function delOrder(i){if(confirm('Hapus pesanan?')){orders.splice(i,1);save('epilog_orders',orders);renderAdmin()}}
function exportData(){
  const blob=new Blob([JSON.stringify({products,orders},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='epilogkick-data.json';a.click();
}
function resetData(){
  if(!confirm('Reset ke data awal?')) return;
  products=[...DEFAULT_PRODUCTS];orders=[];cart=[];save('epilog_products',products);save('epilog_orders',orders);save('epilog_cart',cart);
  renderProducts();renderCart();renderAdmin();
  if(isCloud() && confirm('Hapus juga data ONLINE dan kembalikan ke awal?')) pushLocalToCloud();
}

// countdown dummy
function tick(){
  const el=document.getElementById('countdown'); if(!el) return;
  let t = (2*86400+14*3600+33*60+10) - Math.floor(Date.now()/1000)%86400;
  const d=String(Math.floor(t/86400)).padStart(2,'0'),h=String(Math.floor(t%86400/3600)).padStart(2,'0'),m=String(Math.floor(t%3600/60)).padStart(2,'0'),s=String(t%60).padStart(2,'0');
  el.textContent=`${d} : ${h} : ${m} : ${s}`;
}
setInterval(tick,1000);

// init (server dulu agar katalog update global, lalu fallback cloud/lokal)
renderProducts(); renderCart(); tick(); refreshCloudStatus();
initServer().then(()=>{ renderProducts(); renderAdmin(); initCloud(); });
