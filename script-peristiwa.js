"use strict";

// =====================================
// MyPM Simulasi - Peristiwa
// Fasa 11.0 — peristiwa umum, pilihan, feedback,
// halaman peristiwa
// =====================================

// =====================================
// METRIK DARI STATISTIK
// =====================================

function kemasKiniMetrikDariStatistik() {
  const s = gameState.statistik;
  gameState.metrik.indeksKosSaraHidup = hadkan(100 - s.inflasi * 8);
  gameState.metrik.indeksIntegriti = hadkan(50 + (s.prestasiKerajaan - 50) * 0.5, 20, 95);
}

// =====================================
// SEMAK PERISTIWA MINGGUAN
// =====================================

function semakPeristiwaMingguan() {
  if (gameState.status !== "permainan") return false;
  if (gameState.peristiwaSemasa) return false;
  if (gameState.pilihanrayaSedangBerjalan) return false;

  if (Math.random() > 0.15) return false;

  const st = (gameState.statistik.prestasiKerajaan + gameState.statistik.popularitiPM) / 200;
  if (st > 0.7 && Math.random() > 0.5) return false;

  if (typeof pilihPeristiwaRawak !== "function") return false;

  const p = pilihPeristiwaRawak(gameState.sejarahPeristiwa);
  if (!p) return false;

  tunjukModalPeristiwa(p);
  return true;
}

// =====================================
// MODAL PERISTIWA
// =====================================

function tunjukModalPeristiwa(peristiwa) {
  if (!peristiwa) return;
  gameState.peristiwaSemasa = peristiwa;
  hentikanAuto();

  let h = `
    <div class="peristiwa-box">
      <div class="peristiwa-header">
        <span class="peristiwa-icon">${peristiwa.ikon}</span>
        <div class="peristiwa-tajuk">
          <p class="peristiwa-nama">${escapeHTML(peristiwa.nama)}</p>
          <p class="peristiwa-kategori">${escapeHTML(peristiwa.kategori)}</p>
        </div>
      </div>
      <p class="peristiwa-deskripsi">${escapeHTML(peristiwa.deskripsi)}</p>
      <div class="peristiwa-pilihan">
  `;

  (peristiwa.pilihan || []).forEach((p, i) => {
    let k = "neutral";
    if (p.kesan) {
      const j = (p.kesan.populariti || 0)
        + (p.kesan.pertumbuhan || 0)
        + (p.kesan.sokonganParlimen || 0);
      if (j > 0) k = "positif";
      else if (j < 0) k = "negatif";
    }
    h += `
      <button class="btn-peristiwa" onclick="pilihPeristiwa(${i})">
        <div class="btn-peristiwa-teks"><strong>${escapeHTML(p.teks)}</strong></div>
        <span class="btn-peristiwa-kesan ${k}">${escapeHTML(p.label || "Pilih")}</span>
      </button>
    `;
  });

  h += `</div></div>`;
  tunjukModal("Peristiwa", h);
}

// =====================================
// PILIH PERISTIWA
// =====================================

function pilihPeristiwa(i) {
  const pr = gameState.peristiwaSemasa;
  if (!pr) return;
  const p = pr.pilihan ? pr.pilihan[i] : null;
  if (!p) return;

  if (pr.kesanAsas) gunaKesanPeristiwa(pr.kesanAsas);
  if (p.kesan) gunaKesanPeristiwa(p.kesan);

  // Tentukan jenis kesan
  let jenis = "neutral";
  if (p.kesan) {
    const j = (p.kesan.populariti || 0)
      + (p.kesan.pertumbuhan || 0)
      + (p.kesan.sokonganParlimen || 0)
      + (p.kesan.kepuasan || 0);
    if (j > 0) jenis = "positif";
    else if (j < 0) jenis = "negatif";
  }

  // Ambil feedback
  let fb = null;
  if (typeof dapatkanFeedback === "function") {
    fb = dapatkanFeedback(pr.id, i);
  }
  if (!fb) {
    fb = { mesej: p.label ? p.label.toUpperCase() : "KEPUTUSAN", jenis };
  }

  // Simpan sejarah
  gameState.sejarahPeristiwa.push({
    id: pr.id,
    nama: pr.nama,
    kategori: pr.kategori,
    ikon: pr.ikon,
    pilihan: p.teks,
    labelKesan: p.label || "Neutral",
    mesejFeedback: fb.mesej,
    jenisKesan: jenis,
    kesan: p.kesan || {},
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari
  });

  // Had 50 rekod
  if (gameState.sejarahPeristiwa.length > 50) {
    gameState.sejarahPeristiwa = gameState.sejarahPeristiwa.slice(-50);
  }

  gameState.peristiwaSemasa = null;

  tunjukModalFeedback(fb, p, jenis);
  kemasKiniDashboard();
  kemasKiniMetrikDariStatistik();

  if (gameState.tetapan.autoSave) simpanPermainan(true);
  if (halamanSemasa === "rekod" && typeof paparHalamanRekod === "function") paparHalamanRekod();
}

// =====================================
// FEEDBACK MODAL
// =====================================

function tunjukModalFeedback(fb, p, jenis) {
  const t = {
    positif: "Keputusan Baik",
    negatif: "Keputusan Buruk",
    neutral: "Keputusan Diambil"
  }[fb.jenis] || "Keputusan";

  const ikon = fb.jenis === "positif" ? "✅"
    : fb.jenis === "negatif" ? "❌" : "⚖️";

  const k = p.kesan || {};
  const kt = [];
  if (k.populariti) kt.push("Populariti " + (k.populariti > 0 ? "+" : "") + k.populariti);
  if (k.kepuasan) kt.push("Kepuasan " + (k.kepuasan > 0 ? "+" : "") + k.kepuasan);
  if (k.pertumbuhan) kt.push("Ekonomi " + (k.pertumbuhan > 0 ? "+" : "") + k.pertumbuhan + "%");
  if (k.inflasi) kt.push("Inflasi " + (k.inflasi > 0 ? "+" : "") + k.inflasi + "%");
  if (k.hasil) kt.push("Hasil RM " + (k.hasil > 0 ? "+" : "") + k.hasil + "B");
  if (k.perbelanjaan) kt.push("Belanja RM " + (k.perbelanjaan > 0 ? "+" : "") + k.perbelanjaan + "B");

  const kh = kt.length > 0
    ? kt.map(x => "<li>" + escapeHTML(x) + "</li>").join("")
    : "<li>Tiada kesan langsung.</li>";

  tunjukModal(t, `
    <div class="feedback-box feedback-${fb.jenis}">
      <div class="feedback-ikon">${ikon}</div>
      <p class="feedback-mesej">${escapeHTML(fb.mesej)}</p>
      <p class="feedback-pilihan">Pilihan anda: <strong>${escapeHTML(p.teks)}</strong></p>
      <div class="feedback-kesan">
        <p class="feedback-kesan-tajuk">Kesan:</p>
        <ul class="feedback-kesan-senarai">${kh}</ul>
      </div>
      <div class="feedback-butang">
        <button class="btn-undi btn-feedback-teruskan" onclick="teruskanSelepasFeedback()">▶ Teruskan</button>
      </div>
    </div>
  `);
}

function teruskanSelepasFeedback() {
  const a = autoAktif;
  tutupModal();

  if (halamanSemasa === "peristiwa" && typeof paparHalamanPeristiwa === "function") {
    paparHalamanPeristiwa();
  }
  if (halamanSemasa === "manifesto" && typeof paparHalamanManifesto === "function") {
    paparHalamanManifesto();
  }
  kemasKiniDashboard();

  if (a) {
    setTimeout(() => {
      if (!autoAktif && gameState.status === "permainan") mulakanAuto();
    }, 500);
  }
}

// =====================================
// KESAN PERISTIWA
// =====================================

function gunaKesanPeristiwa(k) {
  if (!k) return;
  const s = gameState.statistik;
  const e = gameState.ekonomi;

  if (k.populariti) s.popularitiPM = hadkan(s.popularitiPM + k.populariti);
  if (k.kepuasan) s.kepuasanRakyat = hadkan(s.kepuasanRakyat + k.kepuasan);
  if (k.prestasiKerajaan) s.prestasiKerajaan = hadkan(s.prestasiKerajaan + k.prestasiKerajaan);
  if (k.pertumbuhan) s.pertumbuhanEkonomi += k.pertumbuhan;
  if (k.inflasi) s.inflasi = hadkan(s.inflasi + k.inflasi, 0, 15);
  if (k.pengangguran) s.pengangguran = hadkan(s.pengangguran + k.pengangguran, 0, 15);
  if (k.hasil) e.hasil = Math.max(0, e.hasil + k.hasil);
  if (k.perbelanjaan) e.perbelanjaan = Math.max(0, e.perbelanjaan + k.perbelanjaan);
  if (k.hutang) e.hutang = Math.max(0, e.hutang + k.hutang);
  if (k.sokonganParlimen) s.popularitiPM = hadkan(s.popularitiPM + k.sokonganParlimen * 0.3);

  // Kesan kepada kumpulan rakyat
  if (gameState.sentimenKumpulan) {
    const kp = k.populariti || 0;
    const kk = k.kepuasan || 0;
    const ki = k.inflasi || 0;
    const kpg = k.pengangguran || 0;

    if (ki) {
      gameState.sentimenKumpulan.B40 = hadkan(gameState.sentimenKumpulan.B40 - ki * 1.5);
      gameState.sentimenKumpulan.WargaEmas = hadkan(gameState.sentimenKumpulan.WargaEmas - ki * 1.2);
    }
    if (kpg) {
      gameState.sentimenKumpulan.Belia = hadkan(gameState.sentimenKumpulan.Belia - kpg * 1.8);
      gameState.sentimenKumpulan.M40 = hadkan(gameState.sentimenKumpulan.M40 - kpg * 1.2);
    }

    const ku = (kp + kk) * 0.5;
    if (ku !== 0) {
      gameState.sentimenKumpulan.B40 = hadkan(gameState.sentimenKumpulan.B40 + ku);
      gameState.sentimenKumpulan.M40 = hadkan(gameState.sentimenKumpulan.M40 + ku);
      gameState.sentimenKumpulan.T20 = hadkan(gameState.sentimenKumpulan.T20 + ku * 0.7);
      gameState.sentimenKumpulan.Belia = hadkan(gameState.sentimenKumpulan.Belia + ku);
      gameState.sentimenKumpulan.WargaEmas = hadkan(gameState.sentimenKumpulan.WargaEmas + ku * 0.8);
    }
  }
}

// =====================================
// HALAMAN PERISTIWA
// =====================================

function paparHalamanPeristiwa() {
  const s = gameState.sejarahPeristiwa;
  const j = s.length;
  const p = s.filter(x => x.jenisKesan === "positif").length;
  const n = s.filter(x => x.jenisKesan === "negatif").length;
  const k = j > 0 ? (p / j) * 100 : 0;

  setTeks("perBilangan", j);
  setTeks("perBaik", p);
  setTeks("perBuruk", n);
  setTeks("perKadar", Math.round(k) + "%");
  setTeks("perSejarahBilangan", j + " rekod");

  const el = document.getElementById("perAktifBilangan");
  if (el) el.textContent = gameState.peristiwaSemasa ? "1 aktif" : "0 aktif";

  paparPeristiwaAktif();
  paparSejarahPeristiwa();
}

function paparPeristiwaAktif() {
  const p = document.getElementById("senaraiPeristiwaAktif");
  if (!p) return;

  if (!gameState.peristiwaSemasa) {
    p.innerHTML = "<p class='nota'>Tiada peristiwa aktif.</p>";
    return;
  }

  const pe = gameState.peristiwaSemasa;
  let h = `
    <div class="kad-peristiwa-aktif">
      <div class="kad-peristiwa-aktif-ikon">${pe.ikon}</div>
      <div class="kad-peristiwa-aktif-info">
        <p class="kad-peristiwa-aktif-nama">${escapeHTML(pe.nama)}</p>
        <p class="kad-peristiwa-aktif-deskripsi">${escapeHTML(pe.deskripsi)}</p>
        <div class="kad-peristiwa-aktif-meta"><span>📂 ${escapeHTML(pe.kategori)}</span></div>
        <p class="nota" style="margin-top:10px">Sila pilih tindakan:</p>
        <div class="peristiwa-pilihan" style="margin-top:8px">
  `;

  (pe.pilihan || []).forEach((pl, i) => {
    let k = "neutral";
    if (pl.kesan) {
      const j = (pl.kesan.populariti || 0) + (pl.kesan.pertumbuhan || 0);
      if (j > 0) k = "positif";
      else if (j < 0) k = "negatif";
    }
    h += `
      <button class="btn-peristiwa" onclick="pilihPeristiwaDariSenarai(${i})">
        <div class="btn-peristiwa-teks"><strong>${escapeHTML(pl.teks)}</strong></div>
        <span class="btn-peristiwa-kesan ${k}">${escapeHTML(pl.label || "Pilih")}</span>
      </button>
    `;
  });

  h += `</div></div></div>`;
  p.innerHTML = h;
}

function pilihPeristiwaDariSenarai(i) { pilihPeristiwa(i); }

function paparSejarahPeristiwa() {
  const p = document.getElementById("sejarahPeristiwa");
  if (!p) return;

  if (gameState.sejarahPeristiwa.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada peristiwa.</p>";
    return;
  }

  p.innerHTML = [...gameState.sejarahPeristiwa].reverse().slice(0, 50).map(x => {
    const k = x.jenisKesan === "positif" ? "pos"
      : x.jenisKesan === "negatif" ? "neg" : "neutral";
    const kb = x.jenisKesan === "positif" ? "baik"
      : x.jenisKesan === "negatif" ? "buruk" : "neutral";
    const tb = x.jenisKesan === "positif" ? "Baik"
      : x.jenisKesan === "negatif" ? "Buruk" : "Neutral";

    return `
      <div class="kad-sejarah-peristiwa ${k}">
        <div class="kad-sejarah-peristiwa-ikon">${x.ikon}</div>
        <div class="kad-sejarah-peristiwa-info">
          <p class="kad-sejarah-peristiwa-nama">${escapeHTML(x.nama)}</p>
          <p class="kad-sejarah-peristiwa-meta">${escapeHTML(x.tarikh)} • ${escapeHTML(x.pilihan)}</p>
          ${x.mesejFeedback ? `<p class="kad-sejarah-peristiwa-kesan"><strong>${escapeHTML(x.mesejFeedback)}</strong></p>` : ""}
        </div>
        <span class="kad-sejarah-peristiwa-badge ${kb}">${tb}</span>
      </div>
    `;
  }).join("");
}