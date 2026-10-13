CARA PASANG SIMULATOR RAKYAT MALAYSIA (PWA)
====================================================

1. Simpan semua fail dalam folder yang sama:
   - index.html
   - style.css
   - script.js
   - manifest.json
   - service-worker.js

2. Buka index.html dalam browser (Chrome/Edge/Safari)

3. Untuk main luar talian:
   - Buka melalui pelayan tempatan (localhost) untuk service worker berfungsi
   - ATAU teruskan guna tanpa service worker (permainan tetap boleh dimainkan)

4. Untuk install ke telefon:
   - Buka dalam Chrome Android
   - Menu (⋮) → "Add to Home Screen" atau "Install App"
   - Untuk iOS Safari: Share → Add to Home Screen

NOTA PENTING:
- Service Worker HANYA berfungsi pada HTTPS atau localhost
- Jika buka index.html dengan double-click (file://), Service Worker
  tidak akan aktif, tetapi permainan tetap boleh dimainkan seperti biasa

MAIN LUAR TALIAN:
- Selepas buka sekali dalam talian, buka dalam talian lagi tidak diperlukan
- Service worker akan cache semua fail dan permainan boleh dimainkan offline
