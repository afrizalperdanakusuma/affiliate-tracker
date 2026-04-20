# 🔧 QUICK FIX - GitHub Pages Blank/Empty

## ⚡ SOLUSI CEPAT (5 MENIT)

Jika aplikasi Anda blank di GitHub Pages, ikuti langkah ini:

### STEP 1: REBUILD PROJECT

```bash
cd affiliate-tracker
npm run build
```

Tunggu sampai selesai. Akan muncul folder `dist/`.

### STEP 2: PUSH BUILD FILES KE GITHUB

```bash
git add -A
git commit -m "Fix: Add production build files"
git push
```

### STEP 3: CONFIGURE GITHUB PAGES

1. Buka repository di GitHub.com
2. Klik **Settings**
3. Scroll ke bawah, cari **Pages**
4. Di bagian "Build and deployment":
   - **Source:** Pilih "**Deploy from a branch**"
   - **Branch:** Pilih **main** atau **master**
   - **Folder:** Pilih **/dist**
   - Klik **Save**

5. Tunggu 1-2 menit untuk build selesai
6. Buka: `https://USERNAME.github.io/affiliate-tracker`

### ✅ SELESAI!

Aplikasi seharusnya sudah tampil!

---

## 🔍 JIKA MASIH BLANK?

### Cek 1: Apakah build berhasil?

```bash
ls dist/
```

Harus ada file:
- `index.html`
- `assets/` folder
- `favicon.svg`

Jika tidak ada, build failed. Coba:
```bash
npm install
npm run build
```

### Cek 2: Apakah GitHub Pages settings benar?

1. Buka repository → Settings → Pages
2. Pastikan:
   - Source: "Deploy from a branch"
   - Branch: main
   - Folder: /dist
   - Status: "Your site is published at https://..."

### Cek 3: Buka browser console

1. Buka halaman GitHub Pages
2. Tekan F12 (Dev Tools)
3. Lihat tab "Console"
4. Ada error merah? Catat error message-nya

### Cek 4: Cek base path di vite.config.js

Edit `vite.config.js`:

```javascript
// Jika repo bernama "affiliate-tracker":
base: '/affiliate-tracker/'

// Jika repo adalah main account (username.github.io):
base: '/'
```

Kemudian rebuild:
```bash
npm run build
git add -A
git commit -m "Fix base path"
git push
```

---

## 🆘 COMMON ISSUES & SOLUTIONS

| Masalah | Penyebab | Solusi |
|---------|---------|--------|
| Blank page | Belum build | `npm run build` → push → wait 2 min |
| 404 Not Found | Folder dist/ tidak ada | Check dist/ exists & push |
| Assets not loading | Base path salah | Update vite.config.js `base` value |
| CSS/JS kosong | Build corrupted | `npm run build` ulang |
| Still blank after 5 min | GitHub Pages not processing | Refresh browser (Ctrl+Shift+R) |

---

## 📝 CHECKLIST

- [ ] `npm run build` berhasil (ada folder dist/)
- [ ] File `dist/index.html` tidak kosong
- [ ] Git push selesai
- [ ] GitHub Pages Settings done
- [ ] Branch dipilih: main
- [ ] Folder dipilih: /dist
- [ ] Tunggu 2 menit
- [ ] Refresh browser (Ctrl+Shift+R)
- [ ] Aplikasi tampil!

---

## ✨ RINGKASAN

**GitHub Pages perlu:**
1. **BUILD** (`npm run build`)
2. **PUSH** `dist/` folder ke GitHub
3. **CONFIGURE** Settings → Pages → /dist
4. **WAIT** 1-2 menit
5. **REFRESH** browser (Ctrl+Shift+R)

Done! ✅

---

Lebih detail? Baca: **GITHUB_PAGES_DEPLOY.md**
