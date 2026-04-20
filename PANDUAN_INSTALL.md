# 📚 PANDUAN LENGKAP: Install Affiliate Tracker & Upload ke GitHub

## BAGIAN 1: PERSIAPAN FOLDER LOKAL

### Langkah 1: Download & Organize Files
1. Download folder `affiliate-tracker` yang sudah kami siapkan
2. Buat struktur folder seperti ini di komputer Anda:

```
C:\Users\YourName\Projects\affiliate-tracker\
├── public\
│   ├── index.html
│   └── favicon.svg
├── src\
│   ├── components\
│   │   ├── Dashboard.jsx
│   │   ├── Campaigns.jsx
│   │   ├── Import.jsx
│   │   ├── DataRaw.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── Icons.jsx
│   ├── hooks\
│   │   └── useData.js
│   ├── services\
│   │   ├── db.js
│   │   ├── csvParser.js
│   │   └── format.js
│   ├── styles\
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── node_modules\ (akan dibuat otomatis)
```

### Langkah 2: Install Node.js (Jika Belum)
1. Download dari https://nodejs.org/
2. Pilih versi LTS (Long Term Support)
3. Install dan centang "Add to PATH"
4. Verify dengan buka terminal/cmd:
   ```bash
   node --version
   npm --version
   ```

## BAGIAN 2: INSTALL DEPENDENCIES LOKAL

### Langkah 3: Install npm Packages
1. Buka terminal/cmd di folder `affiliate-tracker`
2. Jalankan:
   ```bash
   npm install
   ```
   Tunggu sampai selesai (2-5 menit tergantung kecepatan internet)

3. Setelah selesai, folder `node_modules` akan dibuat otomatis

### Langkah 4: Test Development Server
```bash
npm run dev
```
Browser otomatis membuka http://localhost:5173

Jika berhasil, aplikasi sudah siap! Tekan `Ctrl+C` untuk stop.

## BAGIAN 3: SETUP GIT LOKAL

### Langkah 5: Initialize Git
1. Di terminal folder `affiliate-tracker`, jalankan:
   ```bash
   git init
   ```

2. Configure git (first time only):
   ```bash
   git config --global user.name "Nama Anda"
   git config --global user.email "email@anda.com"
   ```

3. Add semua files:
   ```bash
   git add .
   ```

4. First commit:
   ```bash
   git commit -m "Initial commit: Affiliate tracker application"
   ```

## BAGIAN 4: BUAT REPOSITORY DI GITHUB

### Langkah 6: Create GitHub Repository
1. Login ke GitHub: https://github.com/login
2. Klik "+" di kanan atas → "New repository"
3. **PENTING**: Jangan centang "Initialize this repository with"
4. Isi:
   - Repository name: `affiliate-tracker`
   - Description: "Affiliate marketing campaign tracker dashboard"
   - Visibility: Public (agar bisa di-deploy) atau Private
   - Click "Create repository"

5. Copy URL repository (HTTPS):
   ```
   https://github.com/USERNAME/affiliate-tracker.git
   ```

## BAGIAN 5: PUSH KE GITHUB

### Langkah 7: Connect & Push
Di terminal folder `affiliate-tracker`:

1. Add remote:
   ```bash
   git remote add origin https://github.com/USERNAME/affiliate-tracker.git
   ```
   (Ganti USERNAME dengan username GitHub Anda)

2. Rename branch (untuk compatibility):
   ```bash
   git branch -M main
   ```

3. Push ke GitHub:
   ```bash
   git push -u origin main
   ```

4. GitHub akan minta login (jika belum):
   - Pilih "GitHub CLI" atau "Personal Access Token"
   - Atau gunakan "Generate new token" di GitHub

✅ Selesai! Cek di https://github.com/USERNAME/affiliate-tracker

## BAGIAN 6: WORKFLOW HARIAN

### Setiap Kali Edit File Lokal:

```bash
# 1. See status
git status

# 2. Add changes
git add .

# 3. Commit
git commit -m "Deskripsi perubahan"

# 4. Push ke GitHub
git push
```

### Jalankan Development Server:
```bash
npm run dev
```

### Build untuk Production:
```bash
npm run build
# Hasilnya di folder `dist/`
```

## BAGIAN 7: DEPLOY KE GITHUB PAGES (Optional)

Jika ingin host gratis di GitHub:

### Langkah 8: Setup GitHub Pages

1. Edit `package.json`, tambah di awal:
   ```json
   "homepage": "https://USERNAME.github.io/affiliate-tracker",
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts di `package.json`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Di GitHub:
   - Settings → Pages
   - Source: gh-pages branch
   - Tunggu 1-2 menit
   - Buka https://USERNAME.github.io/affiliate-tracker

## 📝 TROUBLESHOOTING

### Error: "npm: command not found"
- Node.js belum install atau PATH salah
- Re-install Node.js dan centang "Add to PATH"

### Error: "fatal: not a git repository"
- Pastikan Anda di folder project
- Run `git init` lagi

### Error: "authentication failed"
- Generate Personal Access Token di GitHub
- Settings → Developer settings → Personal access tokens

### Port 5173 sudah terpakai
- Jalankan: `npm run dev -- --port 3000`

### Build error
- Delete `node_modules` dan `package-lock.json`
- Run `npm install` lagi

## ✅ CHECKLIST FINAL

- [ ] Folder structure sesuai
- [ ] Node.js terinstall
- [ ] npm install berhasil
- [ ] npm run dev jalan
- [ ] Git init done
- [ ] GitHub repo dibuat
- [ ] git push ke GitHub berhasil
- [ ] Repository tampil di GitHub
- [ ] Bisa clone dari GitHub lagi

---

**Selesai!** Aplikasi Anda sudah online di GitHub! 🎉

Untuk kolaborasi atau backup, cukup push setiap ada perubahan:
```bash
git add .
git commit -m "Update message"
git push
```
