# 🚀 QUICK REFERENCE - GitHub & Git Commands

## SETUP PERTAMA KALI (One Time)

```bash
# 1. Di folder project
git init

# 2. Setup identitas (jika first time)
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"

# 3. Add semua files
git add .

# 4. First commit
git commit -m "Initial commit: Affiliate tracker"

# 5. Connect ke GitHub (copy dari GitHub repository)
git remote add origin https://github.com/USERNAME/affiliate-tracker.git

# 6. Rename branch
git branch -M main

# 7. Push pertama kali
git push -u origin main
```

## WORKFLOW HARIAN (Setiap Edit)

```bash
# Lihat file yang berubah
git status

# Add semua changes
git add .

# Commit dengan message
git commit -m "Deskripsi perubahan"

# Push ke GitHub
git push
```

## PERINTAH PENTING

| Perintah | Fungsi |
|----------|--------|
| `git status` | Lihat file yang berubah |
| `git add .` | Add semua file |
| `git add nama-file` | Add file tertentu |
| `git commit -m "pesan"` | Commit dengan pesan |
| `git push` | Push ke GitHub |
| `git pull` | Pull dari GitHub |
| `git log` | Lihat history commits |
| `git branch` | Lihat branch |
| `git checkout -b nama-branch` | Buat branch baru |

## NPM COMMANDS

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## COMMIT MESSAGE CONVENTIONS

Gunakan pesan yang jelas dan deskriptif:

```
❌ Salah:
git commit -m "fix"
git commit -m "update"

✅ Benar:
git commit -m "Add CSV import functionality"
git commit -m "Fix dashboard chart display"
git commit -m "Update campaign filter logic"
```

## TROUBLESHOOTING CEPAT

### Lupa push commit
```bash
git push
```

### Ubah commit terakhir
```bash
git commit --amend -m "pesan baru"
git push --force-with-lease
```

### Batalkan perubahan
```bash
git checkout -- nama-file
```

### Lihat perubahan sebelum commit
```bash
git diff
```

## REPOSITORY STATS

Lihat di GitHub:
- Commits → History semua perubahan
- Code → File structure & latest code
- Issues → Bug reports & tasks
- Pull Requests → Review & merge code

---

💡 **Tip:** Commit sering dengan pesan yang jelas = history yang bagus!
