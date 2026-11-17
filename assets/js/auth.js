import { firebaseConfig, firebaseReady } from "../../config/firebase-config.js";

let auth = null;
let authApi = null;

export async function initializeAuth() {
  if (!firebaseReady) return { configured: false };
  const appSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
  authApi = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
  const app = appSdk.initializeApp(firebaseConfig);
  auth = authApi.getAuth(app);
  return { configured: true, user: auth.currentUser };
}

export async function signIn(email, password) {
  if (!auth || !authApi) throw new Error("Firebase belum dikonfigurasi. Isi config/firebase-config.js terlebih dahulu.");
  const result = await authApi.signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signOut() {
  if (auth && authApi) await authApi.signOut(auth);
}

export function observeAuth(callback) {
  if (!auth || !authApi) return () => {};
  return authApi.onAuthStateChanged(auth, callback);
}

export async function getIdToken(user) {
  if (!user) throw new Error("Sesi pengguna tidak tersedia.");
  return user.getIdToken();
}
