"use strict";

// =====================================
// MyPM Simulasi - Core
// Fasa 11.0 — gameState, utiliti, loading, menu, modal,
// simpan/muat, navigasi, kawalan masa
// =====================================

// =====================================
// GAMESTATE
// =====================================

const gameState = {
  versi: "1.1.0",
  fasa: "Fasa 11.0",
  tarikhMula: "1 Januari 2025",
  status: "loading",

  pemain: null,
  parti: null,
  kesukaran: null,
  paramKesukaran: null,
  kawasanPemain: null,
  kabinet: [],
  tpm: null,
  manifesto: [],

  masa: { hari: 0, bulan: 1, tahun: 1, penggalHari: 1825 },

  statistik: {
    kepuasanRakyat: 50,
    popularitiPM: 50,
    prestasiKerajaan: 50,
    pertumbuhanEkonomi: 0.0,
    inflasi: 0.0,
    pengangguran: 0.0
  },

  ekonomi: {
    hasil: 0, perbelanjaan: 0, baki: 0,
    hutang: 0, kdnk: 1800, inflasi: 0, pengangguran: 0
  },

  bajet: { tahunan: 350, danaKecemasan: 17.5 },
  bajetKementerian: {},

  parlimen: {
    kerajaan: 0, pembangkang: 0, bebas: 0,
    majoriti: 0, statusKerajaan: "belum",
    partiKerajaan: [], jumlahKerusiGabungan: 0
  },

  sejarahUndian: [],
  sejarahKabinet: [],
  laporanEkonomi: [],
  peristiwaEkonomiAktif: [],
  peristiwaEkonomiSemasa: null,

  metrik: {
    indeksKosSaraHidup: 50, aksesKesihatan: 55, kemahiranBelia: 50,
    indeksInfrastruktur: 55, indeksIntegriti: 50, aksesPerumahan: 48,
    keterjaminanMakanan: 52, indeksPKS: 50, indeksDigital: 50,
    persekitaranPerniagaan: 55
  },

  manifestoAktif: [],
  sejarahPeristiwa: [],
  peristiwaSemasa: null,
  manifestoDinilai: false,

  sejarahPR: [],
  keputusanPRSemasa: null,
  kerusiSemasa: null,
  pilihanrayaSedangBerjalan: false,
  penggalKe: 1,

  sentimenKumpulan: { B40: 50, M40: 50, T20: 50, Belia: 50, WargaEmas: 50 },
  sentimenMedia: {
    arusPerdana: "neutral", mediaSosial: "neutral",
    alternatif: "neutral", antarabangsa: "neutral"
  },

  beritaSemasa: [],
  sejarahKempen: [],
  kempenTerakhir: null,

  partiTersedia: [],
  mpTersedia: [],
  kawasanTersedia: [],
  calonTersedia: [],
  manifestoTersedia: [],
  kementerianTersedia: [],

  tetapan: { bahasa: "ms", tema: "premium", autoSave: true }
};

// =====================================
// UTILITI
// =====================================

function hadkan(nilai, min = 0, maks = 100) {
  return Math.max(min, Math.min(maks, nilai));
}

function escapeHTML(teks) {
  return String(teks).replace(/[&<>"']/g, a => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[a]);
}

function formatRM(b) {
  const n = Number(b);
  return "RM " + (isNaN(n) ? "0.0" : n.toFixed(1)) + "B";
}

function formatPeratus(n, d = 1) {
  const nilai = Number(n);
  return (isNaN(nilai) ? "0.0" : nilai.toFixed(d)) + "%";
}

function setTeks(id, teks) {
  const el = document.getElementById(id);
  if (el) el.textContent = teks;
}

function trendText(nilai) {
  if (nilai >= 65) return "Tinggi";
  if (nilai >= 50) return "Stabil";
  if (nilai >= 35) return "Menurun";
  return "Rendah";
}

function namaBulan(b) {
  return ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun",
    "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"][b - 1] || "?";
}

function kiraTarikh(hari) {
  const t = new Date(2025, 0, 1);
  const s = new Date(t);
  s.setDate(t.getDate() + (hari - 1));
  const b = ["Januari", "Februari", "Mac", "April", "Mei", "Jun",
    "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
  return s.getDate() + " " + b[s.getMonth()] + " " + s.getFullYear();
}

// =====================================
// LOADING SCREEN
// =====================================

const LANGKAH_LOADING = [
  { status: "Menyusun Landskap Politik...", peratus: 20 },
  { status: "Mengumpul Suara Rakyat...", peratus: 50 },
  { status: "Menyediakan Pentas...", peratus: 80 },
  { status: "Sedia.", peratus: 100 }
];

function jalankanLoading() {
  const bar = document.getElementById("loadingBar");
  const status = document.getElementById("loadingStatus");
  if (!bar || !status) return;

  let i = 0;
  function langkahSeterusnya() {
    if (i >= LANGKAH_LOADING.length) {
      document.body.classList.add("siap-loading");
      setTimeout(() => {
        document.body.classList.remove("siap-loading");
        tunjukMenu();
      }, 700);
      return;
    }
    const langkah = LANGKAH_LOADING[i];
    bar.style.width = langkah.peratus + "%";
    status.textContent = langkah.status;
    i++;
    setTimeout(langkahSeterusnya, 750);
  }
  langkahSeterusnya();
}

function tunjukMenu() {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainMenu = document.getElementById("mainMenu");
  if (loadingScreen) loadingScreen.classList.add("hidden");
  if (mainMenu) mainMenu.classList.remove("hidden");
  gameState.status = "menu";
  kemasKiniStatusSimpanan();
}

// =====================================
// MUAT DATA
// =====================================

function muatData() {
  try {
    if (typeof DATA_PARTI !== "undefined") {
      gameState.partiTersedia = DATA_PARTI;
      console.log("✅ Parti:", DATA_PARTI.length);
    }
    if (typeof DATA_MP !== "undefined") {
      gameState.mpTersedia = DATA_MP;
      console.log("✅ MP:", DATA_MP.length);
    }
    if (typeof DATA_KAWASAN !== "undefined") {
      gameState.kawasanTersedia = DATA_KAWASAN;
      console.log("✅ Kawasan:", DATA_KAWASAN.length);
    }
    if (typeof DATA_CALON !== "undefined") {
      gameState.calonTersedia = DATA_CALON;
      console.log("✅ Calon:", DATA_CALON.length);
    }
    if (typeof DATA_MANIFESTO !== "undefined") {
      gameState.manifestoTersedia = DATA_MANIFESTO;
      console.log("✅ Manifesto:", DATA_MANIFESTO.length);
    }
    if (typeof DATA_KEMENTERIAN !== "undefined") {
      gameState.kementerianTersedia = DATA_KEMENTERIAN;
      console.log("✅ Kementerian:", DATA_KEMENTERIAN.length);
    }
    if (typeof DATA_RUU !== "undefined") console.log("✅ RUU:", DATA_RUU.length);
    if (typeof DATA_PERISTIWA_EKONOMI !== "undefined") console.log("✅ Peristiwa ekonomi:", DATA_PERISTIWA_EKONOMI.length);
    if (typeof DATA_PERISTIWA !== "undefined") console.log("✅ Peristiwa umum:", DATA_PERISTIWA.length);
    if (typeof DATA_FEEDBACK !== "undefined") console.log("✅ Feedback:", Object.keys(DATA_FEEDBACK).length);
  } catch (error) {
    console.error("Ralat muat data:", error);
    const el = document.getElementById("loadingError");
    if (el) el.classList.remove("hidden");
  }
}

// =====================================
// MENU UTAMA
// =====================================

function menuMula() {
  const m = document.getElementById("mainMenu");
  if (m) m.classList.add("hidden");
  const s = document.getElementById("skrinKesukaran");
  if (s) s.classList.remove("hidden");
}

function menuPanduan() {
  tunjukModal("Panduan",
    "<h3>Selamat Datang</h3>" +
    "<p>Anda ialah <strong>Perdana Menteri Malaysia</strong>. Urus kerajaan selama <strong>5 tahun (1825 hari)</strong>.</p>" +
    "<h3>Perkara Utama</h3><ul>" +
    "<li><strong>Parlimen:</strong> 222 kerusi, majoriti 112</li>" +
    "<li><strong>Kabinet:</strong> 30 menteri</li>" +
    "<li><strong>Manifesto:</strong> 5 sasaran 100 hari</li>" +
    "<li><strong>Bajet:</strong> RM 350B tahunan</li>" +
    "<li><strong>Pilihan Raya:</strong> Setiap 5 tahun atau bila bubar</li>" +
    "</ul>");
}

function menuTetapan() {
  tunjukModal("Tetapan",
    "<p><strong>Versi:</strong> " + gameState.versi + " (" + gameState.fasa + ")</p>" +
    "<p><strong>Auto-save:</strong> " + (gameState.tetapan.autoSave ? "Aktif" : "Tidak Aktif") + "</p>");
}

function menuKredit() {
  tunjukModal("Kredit",
    "<h3>MyPM Simulasi</h3>" +
    "<p>Perjalanan Menjadi Perdana Menteri</p>" +
    "<h3>Versi</h3>" +
    "<p>" + gameState.versi + " — " + gameState.fasa + "</p>");
}

// =====================================
// MODAL
// =====================================

function tunjukModal(tajuk, kandungan) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalTitle || !modalBody) return;
  modalTitle.textContent = tajuk;
  modalBody.innerHTML = kandungan;
  modal.classList.remove("hidden");
}

function tutupModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.add("hidden");

  // Auto-proses PR kalau modal ditutup masa PR berjalan
  if (gameState.pilihanrayaSedangBerjalan && gameState.keputusanPRSemasa) {
    if (typeof prosesTamatPilihanRaya === "function") {
      prosesTamatPilihanRaya();
    }
  }
}

document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) tutupModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") tutupModal();
});

// =====================================
// SIMPAN & MUAT
// =====================================

const KUNCI_SIMPANAN = "mypm_simpanan_v3";
const VERSI_SIMPANAN = "11.0";

function simpanPermainan(senyap = false) {
  if (gameState.status !== "permainan") {
    if (!senyap) console.warn("Simpan gagal: bukan dalam permainan");
    return false;
  }
  try {
    const simpanan = {
      versi: VERSI_SIMPANAN,
      masaSimpan: new Date().toISOString(),
      tarikhSimpan: kiraTarikh(gameState.masa.hari),
      namaPM: gameState.pemain
        ? (gameState.pemain.gelaran
          ? gameState.pemain.gelaran + " " + gameState.pemain.nama
          : gameState.pemain.nama)
        : "Tanpa Nama",
      parti: gameState.parti ? gameState.parti.singkatan : "—",
      penggal: gameState.penggalKe || 1,
      hari: gameState.masa.hari,
      populariti: Math.round(gameState.statistik.popularitiPM),
      gameState: JSON.parse(JSON.stringify(gameState))
    };
    localStorage.setItem(KUNCI_SIMPANAN, JSON.stringify(simpanan));
    if (!senyap) tunjukTostSimpan("✅ Permainan disimpan");
    console.log("💾 Disimpan:", simpanan.namaPM);
    kemasKiniStatusSimpanan();
    return true;
  } catch (error) {
    console.error("Ralat simpan:", error);
    if (!senyap) tunjukModal("Ralat Simpan", "<p>Tidak dapat simpan.</p>");
    return false;
  }
}

function muatPermainan() {
  try {
    const data = localStorage.getItem(KUNCI_SIMPANAN);
    if (!data) {
      tunjukModal("Tiada Simpanan", "<p>Tiada simpanan.</p>");
      return false;
    }
    const simpanan = JSON.parse(data);
    if (!simpanan.gameState) {
      tunjukModal("Rosak", "<p>Struktur tidak sah.</p>");
      return false;
    }
    const baharu = simpanan.gameState;
    pastikanFieldGameState(baharu);

    Object.keys(gameState).forEach(k => { delete gameState[k]; });
    Object.keys(baharu).forEach(k => { gameState[k] = baharu[k]; });

    console.log("📂 Dimuat:", simpanan.namaPM);
    tunjukPermainanDimuat(simpanan);
    return true;
  } catch (error) {
    console.error("Ralat muat:", error);
    tunjukModal("Ralat Muat", "<p>Fail rosak.</p>");
    return false;
  }
}

function pastikanFieldGameState(gs) {
  if (!gs.statistik) gs.statistik = { kepuasanRakyat: 50, popularitiPM: 50, prestasiKerajaan: 50, pertumbuhanEkonomi: 0, inflasi: 0, pengangguran: 0 };
  if (!gs.ekonomi) gs.ekonomi = { hasil: 0, perbelanjaan: 0, baki: 0, hutang: 0, kdnk: 1800, inflasi: 0, pengangguran: 0 };
  if (!gs.bajet) gs.bajet = { tahunan: 350, danaKecemasan: 17.5 };
  if (!gs.bajetKementerian) gs.bajetKementerian = {};
  if (!gs.sejarahUndian) gs.sejarahUndian = [];
  if (!gs.sejarahKabinet) gs.sejarahKabinet = [];
  if (!gs.sejarahPeristiwa) gs.sejarahPeristiwa = [];
  if (!gs.sejarahPR) gs.sejarahPR = [];
  if (!gs.laporanEkonomi) gs.laporanEkonomi = [];
  if (!gs.manifestoAktif) gs.manifestoAktif = [];
  if (!gs.metrik) gs.metrik = {
    indeksKosSaraHidup: 50, aksesKesihatan: 55, kemahiranBelia: 50,
    indeksInfrastruktur: 55, indeksIntegriti: 50, aksesPerumahan: 48,
    keterjaminanMakanan: 52, indeksPKS: 50, indeksDigital: 50,
    persekitaranPerniagaan: 55
  };
  if (!gs.peristiwaEkonomiAktif) gs.peristiwaEkonomiAktif = [];
  if (!gs.penggalKe) gs.penggalKe = 1;
  if (gs.pilihanrayaSedangBerjalan === undefined) gs.pilihanrayaSedangBerjalan = false;
  if (gs.kerusiSemasa === undefined) gs.kerusiSemasa = null;
  if (gs.keputusanPRSemasa === undefined) gs.keputusanPRSemasa = null;
  if (gs.peristiwaSemasa === undefined) gs.peristiwaSemasa = null;
  if (gs.manifestoDinilai === undefined) gs.manifestoDinilai = false;
  if (!gs.tetapan) gs.tetapan = { bahasa: "ms", tema: "premium", autoSave: true };
  if (!gs.sentimenKumpulan) gs.sentimenKumpulan = { B40: 50, M40: 50, T20: 50, Belia: 50, WargaEmas: 50 };
  if (!gs.sentimenMedia) gs.sentimenMedia = { arusPerdana: "neutral", mediaSosial: "neutral", alternatif: "neutral", antarabangsa: "neutral" };
  if (!gs.beritaSemasa) gs.beritaSemasa = [];
  if (!gs.sejarahKempen) gs.sejarahKempen = [];
  if (gs.kempenTerakhir === undefined) gs.kempenTerakhir = null;
}

function tunjukPermainanDimuat(simpanan) {
  const m = document.getElementById("mainMenu");
  const a = document.getElementById("app");
  if (m) m.classList.add("hidden");
  if (a) a.classList.remove("hidden");
  gameState.status = "permainan";
  kemasKiniTopbarMasa();
  kemasKiniTopbarTajuk(halamanSemasa || "ringkasan");
  if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  if (typeof kemasKiniTopbarProfil === "function") kemasKiniTopbarProfil();
  if (halamanSemasa && halamanSemasa !== "ringkasan") tukarHalaman(halamanSemasa);
  tunjukModal("Permainan Dimuat",
    "<p><strong>" + escapeHTML(simpanan.namaPM) + "</strong></p>" +
    "<p>Parti: <strong>" + escapeHTML(simpanan.parti) + "</strong></p>" +
    "<p>Penggal " + simpanan.penggal + " • Hari " + simpanan.hari + "</p>");
}

function padamSimpanan() {
  try {
    localStorage.removeItem(KUNCI_SIMPANAN);
    kemasKiniStatusSimpanan();
    return true;
  } catch (e) { return false; }
}

function adaSimpanan() {
  try { return localStorage.getItem(KUNCI_SIMPANAN) !== null; }
  catch (e) { return false; }
}

function bacaSimpanan() {
  try {
    const data = localStorage.getItem(KUNCI_SIMPANAN);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) { return null; }
}

function tunjukTostSimpan(mesej) {
  const lama = document.querySelector(".auto-save-tost");
  if (lama) lama.remove();
  const tost = document.createElement("div");
  tost.className = "auto-save-tost";
  tost.innerHTML = "<span>" + escapeHTML(mesej) + "</span>";
  document.body.appendChild(tost);
  setTimeout(() => {
    tost.classList.add("tutup");
    setTimeout(() => tost.remove(), 300);
  }, 2000);
}

function formatMasaSimpan(isoString) {
  try {
    const t = new Date(isoString);
    const hari = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
    const bulan = ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun",
      "Jul", "Ogos", "Sep", "Okt", "Nov", "Dis"];
    const jam = String(t.getHours()).padStart(2, "0");
    const minit = String(t.getMinutes()).padStart(2, "0");
    return hari[t.getDay()] + ", " + t.getDate() + " " + bulan[t.getMonth()] +
      " " + t.getFullYear() + " — " + jam + ":" + minit;
  } catch (e) { return "—"; }
}

function kemasKiniStatusSimpanan() {
  const simpanan = bacaSimpanan();
  const btnSambung = document.getElementById("btnSambung");
  const btnMuat = document.getElementById("btnMuat");
  const txtSambung = document.getElementById("txtSambung");
  const txtMuat = document.getElementById("txtMuat");

  if (simpanan) {
    if (btnSambung) btnSambung.disabled = false;
    if (btnMuat) btnMuat.disabled = false;
    if (txtSambung) txtSambung.textContent = "Sambung: Penggal " + (simpanan.penggal || 1) + ", Hari " + (simpanan.hari || 0);
    if (txtMuat) txtMuat.textContent = (simpanan.namaPM || "Tanpa Nama") + " — Penggal " + (simpanan.penggal || 1);
  } else {
    if (btnSambung) btnSambung.disabled = true;
    if (btnMuat) btnMuat.disabled = true;
    if (txtSambung) txtSambung.textContent = "Tiada simpanan aktif";
    if (txtMuat) txtMuat.textContent = "Tiada rekod disimpan";
  }
}

function menuSambung() {
  const simpanan = bacaSimpanan();
  if (!simpanan) {
    tunjukModal("Tiada Simpanan", "<p>Tiada simpanan.</p>");
    return;
  }
  tunjukModal("Sambung Permainan", `
    <div class="simpanan-panel">
      <div class="simpanan-info">
        <p class="simpanan-info-tajuk">Simpanan Aktif</p>
        <div class="simpanan-info-baris"><span>Perdana Menteri</span><strong>${escapeHTML(simpanan.namaPM)}</strong></div>
        <div class="simpanan-info-baris"><span>Parti</span><strong>${escapeHTML(simpanan.parti)}</strong></div>
        <div class="simpanan-info-baris"><span>Penggal</span><strong>${simpanan.penggal}</strong></div>
        <div class="simpanan-info-baris"><span>Hari</span><strong>${simpanan.hari} / 1825</strong></div>
        <div class="simpanan-info-baris"><span>Tarikh</span><strong>${escapeHTML(simpanan.tarikhSimpan)}</strong></div>
        <div class="simpanan-info-baris"><span>Populariti PM</span><strong>${simpanan.populariti}%</strong></div>
        <div class="simpanan-info-baris"><span>Masa Disimpan</span><strong>${formatMasaSimpan(simpanan.masaSimpan)}</strong></div>
      </div>
      <div class="simpanan-aksi">
        <button class="btn-undi-batal" onclick="tutupModal()">Batal</button>
        <button class="btn-undi" onclick="sambungPermainan()">▶ Sambung</button>
      </div>
    </div>
  `);
}

function sambungPermainan() {
  tutupModal();
  setTimeout(() => muatPermainan(), 300);
}

function menuMuat() {
  const simpanan = bacaSimpanan();
  if (!simpanan) {
    tunjukModal("Tiada Rekod", "<p>Tiada rekod disimpan.</p>");
    return;
  }
  tunjukModal("Muatkan Rekod", `
    <div class="simpanan-panel">
      <div class="simpanan-info">
        <p class="simpanan-info-tajuk">Rekod Disimpan</p>
        <div class="simpanan-info-baris"><span>Perdana Menteri</span><strong>${escapeHTML(simpanan.namaPM)}</strong></div>
        <div class="simpanan-info-baris"><span>Parti</span><strong>${escapeHTML(simpanan.parti)}</strong></div>
        <div class="simpanan-info-baris"><span>Penggal</span><strong>${simpanan.penggal}</strong></div>
        <div class="simpanan-info-baris"><span>Hari</span><strong>${simpanan.hari} / 1825</strong></div>
        <div class="simpanan-info-baris"><span>Masa Disimpan</span><strong>${formatMasaSimpan(simpanan.masaSimpan)}</strong></div>
      </div>
      <div class="simpanan-aksi">
        <button class="btn-undi-batal" onclick="padamSimpananDanTutup()">🗑️ Padam</button>
        <button class="btn-undi" onclick="sambungPermainan()">📂 Muat</button>
      </div>
    </div>
  `);
}

function padamSimpananDanTutup() {
  tunjukModal("Padam Simpanan",
    "<p>Padam simpanan ini secara kekal?</p>" +
    "<div style='display:flex;gap:10px;margin-top:16px;justify-content:flex-end'>" +
    "<button class='btn-undi-batal' onclick='tutupModal()'>Batal</button>" +
    "<button class='btn-undi' onclick='sahkanPadamSimpanan()'>Padam</button></div>");
}

function sahkanPadamSimpanan() {
  padamSimpanan();
  tutupModal();
  tunjukTostSimpan("🗑️ Dipadam");
}

function menuSimpan() {
  if (gameState.status !== "permainan") {
    tunjukModal("Tiada Permainan", "<p>Mulakan dahulu.</p>");
    return;
  }
  const lama = bacaSimpanan();
  let html = "";
  if (lama) {
    html += `<div class="simpanan-info" style="margin-bottom:14px">
      <p class="simpanan-info-tajuk">⚠️ Akan Ditulis Ganti</p>
      <div class="simpanan-info-baris"><span>Simpanan lama</span><strong>${escapeHTML(lama.namaPM)}</strong></div>
      <div class="simpanan-info-baris"><span>Penggal / Hari</span><strong>${lama.penggal} / Hari ${lama.hari}</strong></div>
    </div>`;
  }
  html += `<div class="simpanan-aksi">
    <button class="btn-undi-batal" onclick="tutupModal()">Batal</button>
    <button class="btn-undi" onclick="sahkanSimpanManual()">💾 Simpan</button>
  </div>`;
  tunjukModal("Simpan Permainan", html);
}

function sahkanSimpanManual() {
  tutupModal();
  simpanPermainan(false);
}

// =====================================
// NAVIGASI HALAMAN
// =====================================

let halamanSemasa = "ringkasan";
let autoAktif = false;
let autoInterval = null;

function tukarHalaman(namaHalaman) {
  halamanSemasa = namaHalaman;
  document.querySelectorAll(".halaman").forEach(h => h.classList.remove("active"));
  const halamanBaru = document.getElementById("halaman-" + namaHalaman);
  if (halamanBaru) halamanBaru.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  const navAktif = document.querySelector('.nav-item[data-halaman="' + namaHalaman + '"]');
  if (navAktif) navAktif.classList.add("active");

  kemasKiniTopbarTajuk(namaHalaman);

  const sidebar = document.getElementById("sidebar");
  if (sidebar && window.innerWidth <= 600) sidebar.classList.remove("terbuka");

  // Panggil fungsi papar setiap modul (kalau ada)
  if (namaHalaman === "parlimen" && typeof paparHalamanParlimen === "function") paparHalamanParlimen();
  else if (namaHalaman === "ringkasan" && typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  else if (namaHalaman === "kabinet" && typeof paparHalamanKabinet === "function") paparHalamanKabinet();
  else if (namaHalaman === "kementerian" && typeof paparHalamanKementerian === "function") paparHalamanKementerian();
  else if (namaHalaman === "ekonomi" && typeof paparHalamanEkonomi === "function") paparHalamanEkonomi();
  else if (namaHalaman === "manifesto" && typeof paparHalamanManifesto === "function") paparHalamanManifesto();
  else if (namaHalaman === "peristiwa" && typeof paparHalamanPeristiwa === "function") paparHalamanPeristiwa();
  else if (namaHalaman === "media" && typeof paparHalamanMedia === "function") paparHalamanMedia();
  else if (namaHalaman === "pilihanraya" && typeof paparHalamanPilihanRaya === "function") paparHalamanPilihanRaya();
  else if (namaHalaman === "rekod" && typeof paparHalamanRekod === "function") paparHalamanRekod();
}

function kemasKiniTopbarTajuk(namaHalaman) {
  const tajuk = {
    ringkasan: { h: "Pejabat Perdana Menteri", s: "Ringkasan negara" },
    parlimen: { h: "Parlimen", s: "Dewan Rakyat — 222 kerusi" },
    kabinet: { h: "Kabinet", s: "30 Menteri" },
    kementerian: { h: "Kementerian", s: "Prestasi dan bajet" },
    ekonomi: { h: "Ekonomi & Bajet", s: "Kewangan negara" },
    manifesto: { h: "Manifesto 100 Hari", s: "5 sasaran utama" },
    peristiwa: { h: "Peristiwa", s: "Keputusan & krisis" },
    media: { h: "Media & Rakyat", s: "Persepsi awam" },
    pilihanraya: { h: "Pilihan Raya", s: "Keputusan & pembentukan kerajaan" },
    rekod: { h: "Rekod Pemerintahan", s: "Sejarah & legasi" },
    tetapan: { h: "Tetapan", s: "Konfigurasi permainan" }
  };
  const info = tajuk[namaHalaman];
  if (!info) return;
  setTeks("topbarTajuk", info.h);
  setTeks("topbarSub", info.s);
}

function togleMenuSisi() {
  const s = document.getElementById("sidebar");
  if (s) s.classList.toggle("terbuka");
}

// =====================================
// TOPBAR MASA
// =====================================

function kemasKiniTopbarMasa() {
  setTeks("topbarHari", gameState.masa.hari + " / 1825");
  const elP = document.getElementById("topbarPenggal");
  if (elP) {
    const t = Math.floor(gameState.masa.hari / 365) + 1;
    elP.textContent = "Tahun " + Math.min(t, 5);
  }
  setTeks("topbarTarikh", kiraTarikh(gameState.masa.hari));
}

// =====================================
// KAWALAN MASA
// =====================================

function majukanMasa(bilanganHari) {
  if (gameState.status !== "permainan") {
    tunjukModal("Belum Bermula", "<p>Mulakan dahulu.</p>");
    return;
  }
  if (gameState.peristiwaSemasa) {
    tunjukModal("Peristiwa Menunggu", "<p>Selesaikan dahulu.</p>");
    return;
  }
  if (gameState.pilihanrayaSedangBerjalan) {
    tunjukModal("PR Berjalan", "<p>Selesaikan dahulu.</p>");
    return;
  }

  for (let i = 0; i < bilanganHari; i++) {
    gameState.masa.hari++;
    if (gameState.masa.hari >= 1825) {
      gameState.masa.hari = 1825;
      hentikanAuto();
      kemasKiniTopbarMasa();
      if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
      if (typeof semakTamatPenggal === "function") semakTamatPenggal();
      return;
    }
    if (gameState.masa.hari % 7 === 0) {
      let berhenti = false;
      if (typeof semakPeristiwaMingguan === "function") {
        berhenti = semakPeristiwaMingguan();
      }
      if (berhenti) break;
      if (typeof janaBeritaMedia === "function") janaBeritaMedia();
      if (typeof kiraSentimenKumpulan === "function") kiraSentimenKumpulan();
      if (gameState.tetapan.autoSave) simpanPermainan(true);
    }
  }

  kemasKiniTopbarMasa();
  if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  if (typeof kemasKiniMetrikDariStatistik === "function") kemasKiniMetrikDariStatistik();
  if (typeof semakSempadanBulan === "function") semakSempadanBulan();
  if (typeof semakManifestoSeratus === "function") semakManifestoSeratus();
  if (halamanSemasa === "rekod" && typeof paparHalamanRekod === "function") paparHalamanRekod();
}

function togleAuto() {
  if (gameState.status !== "permainan") {
    tunjukModal("Belum Bermula", "<p>Mulakan dahulu.</p>");
    return;
  }
  if (autoAktif) hentikanAuto();
  else mulakanAuto();
}

function mulakanAuto() {
  autoAktif = true;
  const b = document.getElementById("btnAuto");
  const t = document.getElementById("txtAuto");
  const s = document.getElementById("statusMasa");
  if (b) b.classList.add("aktif");
  if (t) t.textContent = "⏸ Auto";
  if (s) s.textContent = "Auto sedang berjalan.";

  autoInterval = setInterval(() => {
    if (gameState.peristiwaSemasa || gameState.pilihanrayaSedangBerjalan) {
      hentikanAuto();
      return;
    }
    majukanMasa(1);
  }, 1000);
}

function hentikanAuto() {
  autoAktif = false;
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
  const b = document.getElementById("btnAuto");
  const t = document.getElementById("txtAuto");
  const s = document.getElementById("statusMasa");
  if (b) b.classList.remove("aktif");
  if (t) t.textContent = "▶ Auto";
  if (s) s.textContent = "Auto akan memajukan 1 hari setiap 1 saat.";
}

// =====================================
// TOPBAR PROFIL & NOTIFIKASI
// =====================================

function menuNotifikasi() {
  tunjukModal("Notifikasi", "<p>Tiada notifikasi.</p>");
}

function menuProfil() {
  const p = gameState.pemain;
  if (!p) {
    tunjukModal("Profil", "<p>Belum ditetapkan.</p>");
    return;
  }
  const nama = p.gelaran ? p.gelaran + " " + p.nama : p.nama;
  const gambarHTML = p.gambar
    ? `<img src="${p.gambar}" alt="Foto" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--ink);display:block;margin:0 auto 12px;">`
    : `<div style="width:80px;height:80px;border-radius:50%;background:var(--paper-dark);border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 12px;">👤</div>`;

  tunjukModal("Profil Perdana Menteri",
    gambarHTML +
    "<p><strong>Nama:</strong> " + escapeHTML(nama) + "</p>" +
    "<p><strong>Parti:</strong> " + escapeHTML(gameState.parti ? gameState.parti.nama : "—") + "</p>" +
    "<p><strong>Kawasan:</strong> " + escapeHTML(gameState.kawasanPemain ? gameState.kawasanPemain.nama : "—") + "</p>");
}

function kemasKiniTopbarProfil() {
  const p = gameState.pemain;
  const el = document.getElementById("topbarProfilGambar");
  if (!el) return;
  if (p && p.gambar) {
    el.innerHTML = `<img src="${p.gambar}" alt="Profil" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
    el.style.padding = "0";
    el.style.overflow = "hidden";
  } else {
    el.textContent = "👤";
  }
}

// =====================================
// AUTO-SAVE HANDLER
// =====================================

window.addEventListener("beforeunload", () => {
  if (gameState.status === "permainan" && gameState.tetapan.autoSave) {
    simpanPermainan(true);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && gameState.status === "permainan" && gameState.tetapan.autoSave) {
    simpanPermainan(true);
  }
});

// =====================================
// EXPORT KE WINDOW (untuk debugging)
// =====================================

window.gameState = gameState;