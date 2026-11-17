// Isi dengan konfigurasi Web App dari Firebase Console.
// Konfigurasi web Firebase bukan private key. Jangan pernah memasukkan service-account JSON di frontend.
export const firebaseConfig = {
  apiKey: "ISI_API_KEY_FIREBASE",
  authDomain: "ISI_PROJECT_ID.firebaseapp.com",
  projectId: "ISI_PROJECT_ID",
  appId: "ISI_APP_ID"
};

export const firebaseReady = !Object.values(firebaseConfig).some(v =>
  String(v).startsWith("ISI_")
);
