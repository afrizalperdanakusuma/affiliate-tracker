import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  // Untuk GitHub Pages - sesuaikan dengan nama repository Anda
  // Jika repo bernama "affiliate-tracker", gunakan: base: '/affiliate-tracker/'
  // Jika repo adalah main account (username.github.io), gunakan: base: '/'
  base: '/'
})
