# Migration Log

## 2026-11-17 — Portal foundation
- Keputusan: SSO + API Gateway.
- Identity Provider: Firebase Authentication (belum dikonfigurasi).
- Hosting: GitHub Pages.
- Database bisnis: tetap terpisah.
- Dibuat: portal shell, dashboard, navigasi, halaman modul, halaman akun, Firebase auth scaffold, dokumentasi.
- Belum dilakukan: deploy, konfigurasi Firebase, API Gateway, koneksi ke backend bisnis.
- Risiko yang ditahan: tidak mengubah API, database, transaksi, atau file Drive lama.

## Required before module integration
- URL frontend Arsip yang aktif.
- URL frontend GA ERP yang aktif.
- URL frontend Kartu Stok yang aktif.
- Backend GA ERP lengkap.
- Struktur sheet dan aturan permission masing-masing backend.
