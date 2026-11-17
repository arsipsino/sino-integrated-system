# Architecture Decision Record — SINO IMS

## Keputusan
- Pola: SSO + API Gateway, backend bisnis tetap modular/terpisah.
- Identity Provider: Firebase Authentication.
- Frontend portal: GitHub Pages.
- Database bisnis: tetap terpisah pada fase transisi.
- Penyimpanan dokumen: tetap pada Google Drive yang digunakan masing-masing sistem.

## Batas kepercayaan
Browser tidak dipercaya untuk menyatakan role atau permission. Firebase ID token harus diverifikasi oleh API Gateway. Gateway memetakan Firebase UID ke identitas PT SINO, lalu meneruskan assertion bertanda tangan ke backend. Secret assertion hanya berada di server/gateway dan backend.

## Rute target
- /api/auth/me
- /api/arsip/*
- /api/purchasing/*
- /api/ga/*
- /api/stok/*

## Kompatibilitas mundur
Endpoint lama dan login lama tetap aktif selama transisi. API adapter menerjemahkan kontrak baru ke format lama. Penonaktifan jalur lama memerlukan persetujuan dan hasil uji.
