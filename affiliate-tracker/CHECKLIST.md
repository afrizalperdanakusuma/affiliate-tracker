# ✅ CHECKLIST LENGKAP

## PHASE 1: DOWNLOAD & SETUP LOKAL ☑️
- [ ] Download folder `affiliate-tracker`
- [ ] Extract di folder Projects Anda
- [ ] Download & install Node.js dari nodejs.org
- [ ] Verify: `node --version` dan `npm --version` di terminal

## PHASE 2: INSTALL DEPENDENCIES ☑️
- [ ] Buka Terminal/CMD di folder `affiliate-tracker`
- [ ] Run: `npm install`
- [ ] Tunggu selesai (tidak ada error)
- [ ] Folder `node_modules` terbuat

## PHASE 3: TEST LOKAL ☑️
- [ ] Run: `npm run dev`
- [ ] Browser buka http://localhost:5173
- [ ] Aplikasi tampil dengan benar
- [ ] Tidak ada error di console
- [ ] Stop server: Ctrl+C

## PHASE 4: SETUP GIT LOKAL ☑️
- [ ] Run: `git init`
- [ ] Run: `git config --global user.name "Nama Anda"`
- [ ] Run: `git config --global user.email "email@anda.com"`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit: Affiliate tracker"`

## PHASE 5: SETUP GITHUB ☑️
- [ ] Login ke GitHub (atau buat akun baru)
- [ ] Buat repository baru: `affiliate-tracker`
- [ ] Pilih visibility: Public
- [ ] ⚠️ JANGAN initialize dengan apapun
- [ ] Copy HTTPS URL repository

## PHASE 6: PUSH KE GITHUB ☑️
- [ ] Run: `git remote add origin [URL repository]`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] Login ke GitHub (kalau diminta)
- [ ] Refresh halaman GitHub repository
- [ ] Files muncul di GitHub? ✅

## PHASE 7: VERIFIKASI ☑️
- [ ] Buka https://github.com/USERNAME/affiliate-tracker
- [ ] Semua files ada?
- [ ] README.md tampil?
- [ ] Folder structure terlihat?
- [ ] Bisa klik files dan lihat code?

## DAILY WORKFLOW (SETIAP HARI) ☑️
- [ ] Edit files lokal sesuai kebutuhan
- [ ] Run: `npm run dev` untuk test
- [ ] Ketika selesai, run: `git add .`
- [ ] Run: `git commit -m "Pesan perubahan"`
- [ ] Run: `git push`
- [ ] Verify di GitHub

## SIAP PRODUCTION ☑️
- [ ] Run: `npm run build`
- [ ] Folder `dist/` terbuat
- [ ] Hasil build bisa di-deploy

## OPTIONAL: GITHUB PAGES ☑️
- [ ] Install: `npm install --save-dev gh-pages`
- [ ] Edit `package.json`, tambah homepage
- [ ] Add deploy script
- [ ] Run: `npm run deploy`
- [ ] Verify di: https://USERNAME.github.io/affiliate-tracker

---

## DOKUMENTASI
- 📖 Lengkap: `PANDUAN_INSTALL.md`
- ⚡ Singkat: `SETUP_SUMMARY.txt`
- 💻 Git Commands: `GIT_COMMANDS.md`
- 🎯 Project Info: `README.md`

## FILE YANG HARUS ADA SETELAH SETUP
```
✅ affiliate-tracker/
   ✅ public/index.html
   ✅ public/favicon.svg
   ✅ src/App.jsx
   ✅ src/main.jsx
   ✅ src/components/ (7 files)
   ✅ src/hooks/useData.js
   ✅ src/services/ (3 files)
   ✅ src/styles/index.css
   ✅ package.json
   ✅ vite.config.js
   ✅ .gitignore
   ✅ README.md
   ❌ node_modules/ (dibuat saat npm install)
   ❌ dist/ (dibuat saat npm run build)
   ❌ .git/ (dibuat saat git init)
```

---

**Status**: [ ] Semua checklist selesai ✅
**Tanggal Selesai**: _______________
**Keterangan**: ___________________________
