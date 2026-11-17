# SINO Integrated Management System (SINO IMS)

Portal frontend awal untuk menyatukan akses ke:
1. Arsip Dokumen & Purchasing
2. GA ERP
3. Kartu Stok

## Status implementasi
- Portal shell, navigasi, halaman dashboard, halaman modul, dan halaman akun: tersedia.
- Firebase Authentication: kerangka integrasi tersedia, menunggu konfigurasi project.
- Identity service / API Gateway: belum dibuat atau di-deploy.
- Koneksi ke backend bisnis: belum diaktifkan.
- Database bisnis: tetap terpisah.

## Menjalankan di GitHub Pages
1. Buat repository GitHub baru, misalnya `SINO-INTEGRATED-MANAGEMENT`.
2. Upload seluruh isi folder project ini ke root repository.
3. Buka Settings > Pages, pilih Deploy from a branch, branch `main`, folder `/root`.
4. Aktifkan Firebase Authentication Email/Password pada Firebase Console.
5. Daftarkan Web App Firebase dan isi `config/firebase-config.js`.
6. Isi URL frontend terverifikasi pada `config/app-config.js`.
7. Jangan mengisi URL Apps Script backend ke `modules`; yang diperlukan adalah URL frontend aplikasi.

## Firebase
Buat project Firebase baru, tambahkan Web App, aktifkan Authentication > Sign-in method > Email/Password. Jangan mengaktifkan pendaftaran publik jika akun harus dibuat administrator. Konfigurasi frontend bukan private key; jangan pernah memasukkan service account JSON atau private key server ke repository.

## Catatan keamanan
- Login Firebase saja belum berarti SSO untuk backend lama.
- Sebelum data bisnis dibuka melalui portal, deploy API Gateway/Identity Service yang memverifikasi Firebase ID token.
- Backend masing-masing wajib memeriksa identitas dan permission server-side.
- Jangan mengandalkan penyembunyian menu pada frontend.
- Jangan menghapus login lama sampai jalur SSO baru lulus uji.
- Jangan ubah sheet, struktur transaksi, atau file Drive pada fase portal.

## URL aplikasi
Alamat frontend Arsip, GA ERP, dan Kartu Stok belum dapat ditentukan hanya dari URL Apps Script. Isi setelah URL GitHub Pages masing-masing diketahui dan diuji.

## Referensi Google yang diberikan
Tautan editor Apps Script dan halaman beranda Drive dicatat pada `documentation/SOURCE-REFERENCES.md` sebagai referensi administrasi. Keduanya bukan URL endpoint API atau folder Drive khusus, sehingga tidak digunakan sebagai endpoint runtime.
