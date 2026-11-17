# Referensi sumber sistem SINO

Referensi yang diberikan pengguna:

- Google Apps Script Editor (referensi administrasi proyek):
  https://script.google.com/u/5/home/projects/1aU4C-5WrQ9dsuT4k0XWGLuUI348MHRN-xu6qs5542sFGkKMMC6hjmmhM/edit
- Google Drive (halaman beranda akun):
  https://drive.google.com/drive/u/5/home

## Penting — bukan endpoint integrasi

Kedua URL di atas adalah tautan halaman editor/beranda yang memerlukan sesi akun Google. Keduanya bukan URL Web App API dan bukan tautan folder penyimpanan tertentu.

Jangan masukkan URL editor Apps Script ke `config/app-config.js` sebagai endpoint API. Jangan masukkan URL Drive beranda sebagai `ROOT_FOLDER_ID` atau folder arsip.

Sebelum menghubungkan portal:
1. Dari Apps Script, buka Deploy > Manage deployments, lalu salin URL Web App yang berakhiran `/exec` untuk endpoint yang memang dipublikasikan.
2. Untuk audit kode, unduh project Apps Script sebagai arsip atau salin seluruh file `.gs` ke chat/proyek.
3. Untuk folder dokumen, buka folder Drive spesifik yang dipakai aplikasi, lalu bagikan tautan folder atau ID folder. Jangan gunakan halaman Drive beranda.
4. Verifikasi akses dan struktur sheet/backend sebelum membuat adapter.

## Status

URL editor dan Drive beranda disimpan sebagai referensi dokumentasi saja. Belum ada koneksi backend, pembacaan file Drive, atau perubahan data yang dilakukan.
