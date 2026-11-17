// Konfigurasi portal. Isi URL frontend setelah alamat deployment masing-masing diverifikasi.
// Jangan isi dengan URL endpoint Apps Script; yang dibutuhkan di sini adalah URL frontend.
export const APP_CONFIG = {
  identityApiBase: "", // contoh: https://sino-api.example.workers.dev
  modules: {
    arsip: "",
    purchasing: "", // dapat memakai frontend Arsip yang sama jika memang satu aplikasi
    ga: "",
    stok: ""
  }
};
