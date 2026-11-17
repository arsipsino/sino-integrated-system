# Database ownership map

| Domain | System of record | Integration policy |
|---|---|---|
| Arsip dokumen | Arsip/Purchasing Sheets + Drive | Tidak dipindahkan pada fase awal |
| Vendor dan purchasing | Arsip/Purchasing Sheets | ID stabil untuk referensi lintas modul |
| Kendaraan dan aset | GA ERP Sheets (perlu audit backend) | Tidak dipindahkan |
| Master barang dan stok | Kartu Stok Sheets | Saldo dihitung sesuai aturan sistem lama |
| Identitas dan sesi | Firebase Authentication + identity mapping | Terpisah dari database bisnis |

## Important
Nama sheet, kolom, ID, dan aturan transaksi harus dikonfirmasi dari backend lengkap sebelum adapter dibuat. Jangan menebak skema yang belum tersedia.
