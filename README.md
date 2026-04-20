# Affiliate Tracker

Dashboard untuk tracking kampanye afiliasi dengan fitur import CSV dan visualisasi data real-time.

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/USERNAME/affiliate-tracker.git
cd affiliate-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development
```bash
npm run dev
```
Buka browser ke `http://localhost:5173`

### 4. Build untuk Production
```bash
npm run build
```

## 📁 Struktur Folder

```
affiliate-tracker/
├── public/                 # File statis
│   ├── index.html         # HTML utama
│   └── favicon.svg        # Icon aplikasi
│
├── src/                    # Source code
│   ├── components/        # React components
│   │   ├── Dashboard.jsx  # Halaman dashboard utama
│   │   ├── Campaigns.jsx  # Halaman kampanye
│   │   ├── Import.jsx     # Halaman import CSV
│   │   ├── DataRaw.jsx    # Halaman data mentah
│   │   ├── Sidebar.jsx    # Sidebar navigasi
│   │   ├── Topbar.jsx     # Top navigation bar
│   │   └── Icons.jsx      # Icon components
│   │
│   ├── hooks/             # Custom React hooks
│   │   └── useData.js     # Hook untuk data management
│   │
│   ├── services/          # Business logic & utilities
│   │   ├── db.js          # Database/localStorage logic
│   │   ├── csvParser.js   # CSV parsing utility
│   │   └── format.js      # Format/helper functions
│   │
│   ├── styles/            # CSS global
│   │   └── index.css      # Stylesheet utama
│   │
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point React
│
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
└── README.md             # Dokumentasi
```

## 📦 Dependencies

- **React 18.2** - UI framework
- **Vite 4.3** - Build tool & dev server

## 🔧 Commands

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview build production |

## 🌐 Deploy ke GitHub

### 1. Buat Repository di GitHub
- Buka https://github.com/new
- Nama: `affiliate-tracker`
- Pilih "Public" atau "Private"
- Jangan inisialisasi dengan README, .gitignore, atau license

### 2. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit: Affiliate tracker application"
git branch -M main
git remote add origin https://github.com/USERNAME/affiliate-tracker.git
git push -u origin main
```

### 3. Deploy ke GitHub Pages (Optional)
Tambahkan ke `package.json`:
```json
"homepage": "https://USERNAME.github.io/affiliate-tracker",
```

Tambahkan deploy script:
```json
"deploy": "npm run build && gh-pages -d dist"
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Kemudian deploy:
```bash
npm run deploy
```

## 📝 Setup Checklist

- [ ] Repository dibuat di GitHub
- [ ] Files disusun sesuai struktur folder
- [ ] `npm install` berhasil
- [ ] `npm run dev` berjalan tanpa error
- [ ] Database/localStorage working
- [ ] Import CSV functionality tested
- [ ] Siap untuk production

## 📧 Support

Jika ada pertanyaan atau error, buka issue di GitHub repository.

---

**Created:** 2024  
**License:** MIT
