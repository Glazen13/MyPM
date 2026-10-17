"use strict";

// =====================================
// MyPM Simulasi - Manifesto
// Fasa 11.0 — manifesto aktif, kemajuan,
// penilaian 100 hari
// =====================================

// =====================================
// INISIALISASI
// =====================================

function inisialisasiManifestoAktif() {
  if (!gameState.manifesto || gameState.manifesto.length === 0) return;

  gameState.manifestoAktif = gameState.manifesto.map(m => ({
    id: m.id,
    nama: m.nama,
    kategori: m.kategori,
    matlamat: m.matlamat,
    sasaran: m.sasaran || {},
    kos: m.kos,
    tempoh: m.tempoh || 100,
    kementerian: m.kementerian || [],
    ganjaranBerjaya: m.ganjaranBerjaya || {},
    akibatGagal: m.akibatGagal || {},
    status: "belum",
    hariMula: gameState.masa.hari
  }));

  gameState.manifestoDinilai = false;
}

// =====================================
// KIRA KEMAJUAN
// =====================================

function dapatkanNilaiMetrik(m) {
  if (!m) return 50;
  if (gameState.metrik[m] !== undefined) return gameState.metrik[m];

  // Fallback kalau metrik tak wujud
  if (m === "indeksKosSaraHidup") return hadkan(100 - gameState.statistik.inflasi * 8);
  if (m === "pengangguran") return hadkan(100 - gameState.statistik.pengangguran * 8);
  return 50;
}

function kiraKemajuanManifesto(m) {
  if (!m.sasaran || !m.sasaran.metrik) return 0;

  const d = m.sasaran.dari || 50;
  const k = m.sasaran.ke || 60;
  const s = dapatkanNilaiMetrik(m.sasaran.metrik);

  // Elak pembahagian dengan sifar
  if (k > d) {
    const beza = k - d;
    if (beza === 0) return 0;
    return hadkan(((s - d) / beza) * 100, 0, 100);
  }

  const beza = d - k;
  if (beza === 0) return 0;
  return hadkan(((d - s) / beza) * 100, 0, 100);
}

function kiraKemajuanPurataManifesto() {
  if (gameState.manifestoAktif.length === 0) return 0;
  return gameState.manifestoAktif.reduce((t, m) => t + kiraKemajuanManifesto(m), 0)
    / gameState.manifestoAktif.length;
}

// =====================================
// HALAMAN MANIFESTO
// =====================================

function paparHalamanManifesto() {
  if (gameState.manifestoAktif.length === 0) inisialisasiManifestoAktif();

  if (gameState.manifestoAktif.length === 0) {
    setTeks("manJumlah", 0);
    setTeks("manHariBilangan", "Hari 0 / 100");
    setTeks("manBerjaya", 0);
    setTeks("manGagal", 0);
    setTeks("manKemajuan", "0%");
    setTeks("manBilanganSenarai", "0 / 0");
    const panel = document.getElementById("senaraiManifestoAktif");
    if (panel) panel.innerHTML = "<p class='nota'>Belum ada manifesto.</p>";
    return;
  }

  const hs = Math.min(gameState.masa.hari, 100);
  const ph = (hs / 100) * 100;
  const bh = Math.max(0, 100 - hs);

  setTeks("manJumlah", gameState.manifestoAktif.length);
  setTeks("manHariBilangan", "Hari " + hs + " / 100");

  const b = document.getElementById("manTempohBar");
  if (b) b.style.width = ph + "%";

  const el = document.getElementById("manTempohStatus");
  if (el) {
    el.innerHTML = "Hari <strong>" + hs + "</strong> daripada 100 — " +
      (hs >= 100
        ? "<strong style='color:#D4B46A'>TEMPOH TAMAT</strong>"
        : bh + " hari berbaki");
  }

  let bj = 0, gg = 0;
  gameState.manifestoAktif.forEach(m => {
    const k = kiraKemajuanManifesto(m);
    if (hs >= 100) {
      if (k >= 100) {
        m.status = "berjaya";
        bj++;
      } else {
        m.status = "gagal";
        gg++;
      }
    } else {
      m.status = k > 10 ? "sedang" : "belum";
    }
  });

  setTeks("manBerjaya", bj);
  setTeks("manGagal", gg);

  const p = kiraKemajuanPurataManifesto();
  setTeks("manKemajuan", Math.round(p) + "%");

  const ek = document.getElementById("manKemajuanStatus");
  if (ek) {
    if (hs >= 100) ek.textContent = bj + " / " + gameState.manifestoAktif.length + " berjaya";
    else if (p >= 70) ek.textContent = "Baik";
    else if (p >= 40) ek.textContent = "Sederhana";
    else ek.textContent = "Perlu usaha";
  }

  setTeks("manBilanganSenarai", gameState.manifestoAktif.length + " / " + gameState.manifestoAktif.length);

  paparSenaraiManifestoAktif();
}

function paparSenaraiManifestoAktif() {
  const p = document.getElementById("senaraiManifestoAktif");
  if (!p) return;

  if (gameState.manifestoAktif.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada manifesto.</p>";
    return;
  }

  p.innerHTML = gameState.manifestoAktif.map(m => {
    const k = kiraKemajuanManifesto(m);
    const s = m.status || "belum";
    const lb = {
      berjaya: "Berjaya", gagal: "Gagal",
      sedang: "Sedang", belum: "Belum"
    }[s];
    const kp = s === "berjaya" ? "berjaya" : s === "gagal" ? "gagal" : "";
    const sa = m.sasaran || {};

    return `
      <div class="kad-manifesto-aktif status-${s}">
        <div class="kad-manifesto-aktif-header">
          <div class="kad-manifesto-aktif-info">
            <p class="kad-manifesto-aktif-nama">${escapeHTML(m.nama)}</p>
            <span class="kad-manifesto-aktif-kategori">${escapeHTML(m.kategori)}</span>
          </div>
          <span class="kad-manifesto-aktif-status ${s}">${lb}</span>
        </div>
        <p class="kad-manifesto-aktif-matlamat">${escapeHTML(m.matlamat)}</p>
        <div class="man-progress-wrap">
          <div class="man-progress-label"><span>Kemajuan</span><strong>${Math.round(k)}%</strong></div>
          <div class="man-progress-track"><div class="man-progress-fill ${kp}" style="width:${Math.min(k, 100)}%"></div></div>
        </div>
        <div class="man-sasaran">
          <span>🎯 <strong>${escapeHTML(sa.metrik || "—")}</strong></span>
          <span>📊 <strong>${sa.dari || "?"}</strong> → <strong>${sa.ke || "?"}</strong></span>
          <span>💰 RM ${m.kos}B</span>
        </div>
      </div>
    `;
  }).join("");
}

// =====================================
// SEMAK MANIFESTO 100 HARI
// =====================================

function semakManifestoSeratus() {
  if (gameState.status !== "permainan") return;
  if (gameState.manifestoDinilai) return;
  if (gameState.manifestoAktif.length === 0) return;
  if (gameState.masa.hari < 100) return;

  gameState.manifestoDinilai = true;

  let bj = 0, gg = 0;
  gameState.manifestoAktif.forEach(m => {
    const k = kiraKemajuanManifesto(m);

    if (k >= 100) {
      m.status = "berjaya";
      bj++;

      const g = m.ganjaranBerjaya || {};
      if (g.kepuasan) gameState.statistik.kepuasanRakyat = hadkan(gameState.statistik.kepuasanRakyat + g.kepuasan);
      if (g.populariti) gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM + g.populariti);
      if (g.ekonomi) gameState.statistik.pertumbuhanEkonomi += g.ekonomi;
      if (g.integriti) gameState.metrik.indeksIntegriti = hadkan(gameState.metrik.indeksIntegriti + g.integriti, 0, 100);
    } else {
      m.status = "gagal";
      gg++;

      const a = m.akibatGagal || {};
      if (a.kepuasan) gameState.statistik.kepuasanRakyat = hadkan(gameState.statistik.kepuasanRakyat + a.kepuasan);
      if (a.populariti) gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM + a.populariti);
      if (a.ekonomi) gameState.statistik.pertumbuhanEkonomi += a.ekonomi;
      if (a.integriti) gameState.metrik.indeksIntegriti = hadkan(gameState.metrik.indeksIntegriti + a.integriti, 0, 100);
    }
  });

  tunjukModal("Penilaian 100 Hari",
    "<h3>Keputusan Manifesto</h3>" +
    "<p><strong>" + bj + "</strong> berjaya.</p>" +
    "<p><strong>" + gg + "</strong> gagal.</p>");

  if (halamanSemasa === "manifesto") paparHalamanManifesto();
  kemasKiniDashboard();
}