import { APP_CONFIG } from "../../config/app-config.js";
import { initializeAuth, signIn, signOut, observeAuth } from "./auth.js";
import { MODULES } from "../../modules/module-registry.js";

const $ = id => document.getElementById(id);
let currentUser = null;
let userProfile = null;
let stopAuthObserver = null;

function showLogin(message = "") {
  $("loginScreen").hidden = false;
  $("appShell").hidden = true;
  $("loginMessage").textContent = message;
}
function showApp() {
  $("loginScreen").hidden = true;
  $("appShell").hidden = false;
  renderProfile();
}
function renderProfile() {
  const name = userProfile?.name || currentUser?.displayName || currentUser?.email || "Pengguna";
  const role = userProfile?.role || "Akses belum dipetakan";
  $("userName").textContent = name;
  $("userRole").textContent = role;
  $("userAvatar").textContent = name.trim().charAt(0).toUpperCase();
  $("accountName").textContent = name;
  $("accountEmail").textContent = currentUser?.email || "";
  $("accountRole").textContent = role;
  $("accountAvatar").textContent = name.trim().charAt(0).toUpperCase();
}
async function loadIdentityProfile(user) {
  if (!APP_CONFIG.identityApiBase) {
    userProfile = { name: user.displayName || user.email, role: "Belum dipetakan", permissions: [] };
    return;
  }
  const token = await user.getIdToken();
  const response = await fetch(`${APP_CONFIG.identityApiBase.replace(/\/$/, "")}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`Identity service gagal (${response.status}).`);
  userProfile = await response.json();
}
function setActiveNav(page) {
  document.querySelectorAll(".nav-link").forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  $("breadcrumbTitle").textContent = page === "dashboard" ? "Dashboard Utama" : page === "account" ? "Akun & Akses" : MODULES[page]?.title || "Modul";
}
function showPage(page) {
  document.querySelectorAll(".page-view").forEach(view => view.hidden = true);
  setActiveNav(page);
  $("sidebar").classList.remove("open");
  if (page === "dashboard") { $("page-dashboard").hidden = false; return; }
  if (page === "account") { $("page-account").hidden = false; return; }
  const module = MODULES[page];
  if (!module) return;
  $("page-module").hidden = false;
  $("moduleTitle").textContent = module.title;
  $("moduleDescription").textContent = module.description;
  $("launchIcon").textContent = module.icon;
  $("launchTitle").textContent = module.title;
  const url = APP_CONFIG.modules[module.configKey];
  const link = $("launchButton");
  const status = $("launchStatus");
  if (url) {
    link.href = url;
    link.textContent = "Buka aplikasi " + module.title;
    link.classList.remove("disabled-link");
    link.setAttribute("aria-disabled", "false");
    status.textContent = "Alamat frontend telah dikonfigurasi. Aplikasi lama dibuka terpisah sampai SSO dan gateway selesai diintegrasikan.";
  } else {
    link.href = "#";
    link.textContent = "Alamat modul belum diatur";
    link.classList.add("disabled-link");
    link.setAttribute("aria-disabled", "true");
    status.textContent = "Portal utama sudah disiapkan. Isi URL frontend modul pada config/app-config.js setelah alamat deployment diverifikasi.";
  }
  $("launchDescription").textContent = url ? "Modul akan dibuka pada tab baru. Sesi SSO lintas aplikasi belum diaktifkan pada tahap portal awal." : "Alamat frontend modul belum dikonfigurasi.";
}
function bindUI() {
  $("yearLogin").textContent = new Date().getFullYear();
  $("todayLabel").textContent = new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date());
  document.querySelectorAll("[data-page]").forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.page)));
  $("mobileMenu").addEventListener("click", () => $("sidebar").classList.toggle("open"));
  $("logoutButton").addEventListener("click", async () => { try { await signOut(); } catch (e) { console.error(e); } });
  $("loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const button = $("loginButton");
    button.disabled = true; button.textContent = "Memverifikasi...";
    $("loginMessage").textContent = "";
    try {
      const user = await signIn($("email").value.trim(), $("password").value);
      currentUser = user;
      await loadIdentityProfile(user);
      showApp(); showPage("dashboard");
    } catch (error) {
      $("loginMessage").textContent = error.message || "Login gagal.";
    } finally {
      button.disabled = false; button.textContent = "Masuk ke SINO IMS";
    }
  });
}
async function start() {
  bindUI();
  try {
    const result = await initializeAuth();
    if (!result.configured) {
      showLogin("Firebase belum dikonfigurasi. Lengkapi config/firebase-config.js setelah membuat project Firebase.");
      $("loginButton").disabled = true;
      $("loginButton").textContent = "Menunggu konfigurasi Firebase";
      return;
    }
    stopAuthObserver = observeAuth(async user => {
      currentUser = user;
      if (!user) { userProfile = null; showLogin(); return; }
      try { await loadIdentityProfile(user); showApp(); showPage("dashboard"); }
      catch (error) { showLogin("Gagal memuat profil akses: " + error.message); }
    });
  } catch (error) {
    showLogin("Firebase tidak dapat diinisialisasi: " + error.message);
  }
}
start();
