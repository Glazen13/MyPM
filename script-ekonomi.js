"use strict";

// =====================================
// MyPM Simulasi - Ekonomi
// Fasa 11.0 — kementerian, bajet, ekonomi bulanan,
// trend, laporan, peristiwa ekonomi
// =====================================

// =====================================
// BAJET KEMENTERIAN
// =====================================

function inisialisasiBajetKementerian() {
  if (Object.keys(gameState.bajetKementerian).length > 0) return;
  const b = {
    K01: 45, K02: 30, K03: 18, K04: 22, K05: 8, K06: 35, K07: 20,
    K08: 38, K09: 15, K10: 18, K11: 12, K12: 10, K13: 15, K14: 12,
    K15: 6, K16: 8, K17: 10, K18: 5, K19: 6, K20: 8, K21: 5, K22: 6,
    K23: 5, K24: 4, K25: 3, K26: 3, K27: 4, K28: 4, K29: 4, K30: 3
  };
  DATA_KEMENTERIAN.forEach(k => {
    gameState.bajetKementerian[k.id] = b[k.id] || 5;
  });
}

function kiraBajetDiagihkan() {
  return Object.values(gameState.bajetKementerian).reduce((a, b) => a + b, 0);
}

function kiraPrestasiKementerian(id, nama) {
  const item = gameState.kabinet.find(k => k.kementerian === nama);
  const ms = item && item.mp ? kiraPrestasiMenteri(item.mp) : 40;
  const b = gameState.bajetKementerian[id] || 5;
  const bf = hadkan((b / 12) * 50, 0, 100);
  return hadkan(ms * 0.6 + bf * 0.4, 0, 100);
}

function kiraKesanEkonomi() {
  if (gameState.kabinet.length === 0) return 0;
  let j = 0;
  gameState.kabinet.forEach(item => {
    if (!item.mp) return;
    const sk = kiraPrestasiMenteri(item.mp);
    if (sk >= 80) j += 0.15;
    else if (sk >= 65) j += 0.08;
    else if (sk >= 50) j += 0.02;
    else if (sk >= 35) j -= 0.05;
    else j -= 0.12;
  });
  return hadkan(j, -3, 3);
}

function kemasKiniKesanEkonomi() {
  const k = kiraKesanEkonomi();
  gameState.statistik.pertumbuhanEkonomi =
    (4.2 * (gameState.paramKesukaran ? gameState.paramKesukaran.hasilEkonomi : 1)) + k;
}

// =====================================
// HALAMAN KEMENTERIAN
// =====================================

function paparHalamanKementerian() {
  setTeks("kementerianBajetTahunan", formatRM(gameState.bajet.tahunan));
  const d = kiraBajetDiagihkan();
  const pr = gameState.bajet.tahunan > 0 ? (d / gameState.bajet.tahunan) * 100 : 0;
  setTeks("kementerianBajetDiagih", formatRM(d));
  setTeks("kementerianBajetStatus", Math.round(pr) + "% daripada bajet");

  let jp = 0;
  DATA_KEMENTERIAN.forEach(k => { jp += kiraPrestasiKementerian(k.id, k.nama); });
  setTeks("kementerianPrestasiPurata", Math.round(jp / DATA_KEMENTERIAN.length));
  setTeks("kementerianKesanEkonomi", formatPeratus(kiraKesanEkonomi(), 2));
  setTeks("kementerianBilangan", DATA_KEMENTERIAN.length + " Kementerian");

  paparSenaraiKementerian();
}

function paparSenaraiKementerian() {
  const p = document.getElementById("senaraiKementerian");
  if (!p) return;

  p.innerHTML = DATA_KEMENTERIAN.map(k => {
    const sk = kiraPrestasiKementerian(k.id, k.nama);
    const th = kiraTahapPrestasi(sk);
    const lb = labelTahapPrestasi(th);
    const item = gameState.kabinet.find(x => x.kementerian === k.nama);
    const nm = item && item.mp ? item.mp.nama : "Tiada menteri";
    const b = gameState.bajetKementerian[k.id] || 5;

    return `
      <div class="kad-kementerian tahap-${th}">
        <div class="kad-kementerian-header">
          <div class="kad-kementerian-info">
            <p class="kad-kementerian-nama">${escapeHTML(k.nama)}</p>
            <p class="kad-kementerian-menteri">👤 ${escapeHTML(nm)}</p>
          </div>
          <span class="kad-kementerian-tahap ${th}">${lb}</span>
        </div>
        <div class="kad-kementerian-prestasi">
          <div class="kad-kementerian-prestasi-label"><span>Prestasi</span><strong>${Math.round(sk)}/100</strong></div>
          <div class="prestasi-track"><div class="prestasi-fill" style="width:${sk}%"></div></div>
        </div>
        <div class="kad-kementerian-bajet">
          <div class="kad-kementerian-bajet-header"><span>Bajet</span><span class="kad-kementerian-bajet-nilai">RM ${b.toFixed(1)}B</span></div>
          <input type="range" class="slider-bajet" min="1" max="60" step="0.5" value="${b}" oninput="ubahBajetKementerian('${k.id}', this.value)">
          <div class="kad-kementerian-bajet-info"><span>RM 1B</span><span>RM 60B</span></div>
        </div>
      </div>
    `;
  }).join("");
}

function ubahBajetKementerian(id, nilai) {
  gameState.bajetKementerian[id] = parseFloat(nilai);

  setTeks("kementerianBajetDiagih", formatRM(kiraBajetDiagihkan()));
  const p = gameState.bajet.tahunan > 0
    ? (kiraBajetDiagihkan() / gameState.bajet.tahunan) * 100
    : 0;
  setTeks("kementerianBajetStatus", Math.round(p) + "% daripada bajet");

  const panel = document.getElementById("senaraiKementerian");
  if (panel) {
    panel.querySelectorAll(".slider-bajet").forEach(s => {
      if (s.getAttribute("oninput") && s.getAttribute("oninput").includes(id)) {
        const kad = s.closest(".kad-kementerian");
        if (kad) {
          const kem = DATA_KEMENTERIAN.find(k => k.id === id);
          if (kem) {
            const sk = kiraPrestasiKementerian(kem.id, kem.nama);
            const fill = kad.querySelector(".prestasi-fill");
            const label = kad.querySelector(".kad-kementerian-prestasi-label strong");
            if (fill) fill.style.width = sk + "%";
            if (label) label.textContent = Math.round(sk) + "/100";
          }
        }
      }
    });
  }

  setTeks("kementerianKesanEkonomi", formatPeratus(kiraKesanEkonomi(), 2));
  if (halamanSemasa === "ekonomi") paparAgihanBajetHalamanEkonomi();
}

// =====================================
// HALAMAN EKONOMI
// =====================================

function paparHalamanEkonomi() {
  const e = gameState.ekonomi;
  const s = gameState.statistik;

  setTeks("ekoKdnk", formatRM(e.kdnk || 1800));
  const elT = document.getElementById("ekoKdnkTrend");
  if (elT) {
    elT.textContent = "Pertumbuhan " +
      (s.pertumbuhanEkonomi >= 0 ? "+" : "") +
      s.pertumbuhanEkonomi.toFixed(1) + "%";
  }

  setTeks("ekoHasil", formatRM(e.hasil));
  setTeks("ekoPerbelanjaan", formatRM(e.perbelanjaan));

  const baki = e.hasil - e.perbelanjaan;
  setTeks("ekoBaki", formatRM(baki));
  const elBS = document.getElementById("ekoBakiStatus");
  if (elBS) {
    if (baki > 5) {
      elBS.textContent = "Lebihan";
      elBS.style.color = "#4ade80";
    } else if (baki < -5) {
      elBS.textContent = "Defisit";
      elBS.style.color = "#fca5a5";
    } else {
      elBS.textContent = "Seimbang";
      elBS.style.color = "";
    }
  }

  setTeks("ekoHutang", formatRM(e.hutang));
  const n = e.kdnk > 0 ? (e.hutang / e.kdnk) * 100 : 0;
  const elN = document.getElementById("ekoHutangNisbah");
  if (elN) {
    elN.textContent = n.toFixed(1) + "% daripada KDNK";
    if (n >= 80) elN.style.color = "#fca5a5";
    else if (n >= 60) elN.style.color = "#fbbf24";
    else elN.style.color = "";
  }

  setTeks("ekoPertumbuhan", formatPeratus(s.pertumbuhanEkonomi));
  setTeks("ekoInflasi", formatPeratus(s.inflasi));
  setTeks("ekoPengangguran", formatPeratus(s.pengangguran));

  paparAmaranEkonomi(n);
  paparAgihanBajetHalamanEkonomi();
  paparTrendEkonomi();
  paparLaporanEkonomi();
}

function paparAmaranEkonomi(n) {
  const p = document.getElementById("ekoAmaran");
  if (!p) return;
  const st = gameState.statistik;
  const a = [];

  if (n >= 80) a.push({ kelas: "bahaya", ikon: "🚨", tajuk: "Hutang Kritikal", teks: n.toFixed(1) + "% melebihi 80%." });
  else if (n >= 60) a.push({ kelas: "amaran", ikon: "⚠️", tajuk: "Hutang Tinggi", teks: n.toFixed(1) + "% melebihi 60%." });

  if (st.inflasi >= 6) a.push({ kelas: "bahaya", ikon: "🔥", tajuk: "Inflasi Sangat Tinggi", teks: st.inflasi.toFixed(1) + "%." });
  else if (st.inflasi >= 4) a.push({ kelas: "amaran", ikon: "🔥", tajuk: "Inflasi Meningkat", teks: st.inflasi.toFixed(1) + "%." });

  if (a.length === 0) {
    p.classList.add("hidden");
    p.innerHTML = "";
    return;
  }

  p.classList.remove("hidden");
  p.innerHTML = a.map(x => `
    <div class="amaran-eko ${x.kelas}" style="margin-bottom:10px">
      <span class="amaran-eko-icon">${x.ikon}</span>
      <div class="amaran-eko-teks"><strong>${escapeHTML(x.tajuk)}</strong>${escapeHTML(x.teks)}</div>
    </div>
  `).join("");
}

function paparAgihanBajetHalamanEkonomi() {
  const d = kiraBajetDiagihkan();
  const j = gameState.bajet.tahunan;
  const p = j > 0 ? (d / j) * 100 : 0;

  setTeks("ekoBajetJumlah", formatRM(j));
  setTeks("ekoBajetDiagih", formatRM(d));
  setTeks("ekoBajetBaki", formatRM(j - d));
  setTeks("ekoBajetBilangan", formatRM(j));

  const b = document.getElementById("ekoBajetBar");
  if (b) b.style.width = Math.min(p, 100) + "%";

  const el = document.getElementById("ekoBajetStatus");
  if (el) {
    el.innerHTML = "<span id='ekoBajetPeratus'>" + Math.round(p) +
      "%</span> daripada bajet tahunan telah diagihkan";
  }
}

function paparTrendEkonomi() {
  const p = document.getElementById("ekoTrendChart");
  if (!p) return;
  setTeks("ekoTrendBilangan", gameState.laporanEkonomi.length + " rekod");

  if (gameState.laporanEkonomi.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada data.</p>";
    return;
  }

  const t = gameState.laporanEkonomi.slice(-6);
  const m = Math.max(1, ...t.map(r => Math.abs(r.pertumbuhan || 0)));

  p.innerHTML = t.map(r => {
    const pt = r.pertumbuhan || 0;
    const tinggi = Math.max(4, (Math.abs(pt) / m) * 90);
    return `
      <div class="trend-bar-item">
        <span class="trend-bar-nilai">${pt.toFixed(1)}%</span>
        <div class="trend-bar-wrap"><div class="trend-bar ${pt < 0 ? 'negatif' : ''}" style="height:${tinggi}px"></div></div>
        <span class="trend-bar-label">${escapeHTML(r.bulanLabel || "")}</span>
      </div>
    `;
  }).join("");
}

function paparLaporanEkonomi() {
  const p = document.getElementById("ekoLaporanSenarai");
  if (!p) return;
  setTeks("ekoLaporanBilangan", gameState.laporanEkonomi.length + " laporan");

  if (gameState.laporanEkonomi.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada laporan.</p>";
    return;
  }

  p.innerHTML = [...gameState.laporanEkonomi].reverse().slice(0, 24).map(r => {
    const pt = r.pertumbuhan || 0;
    const k = pt >= 0 ? "pos" : "neg";
    const kb = pt >= 2 ? "baik" : pt >= 0 ? "sederhana" : "buruk";
    const tb = pt >= 2 ? "Kukuh" : pt >= 0 ? "Sederhana" : "Merosot";

    return `
      <div class="kad-laporan-eko ${k}">
        <div class="kad-laporan-eko-info">
          <p class="kad-laporan-eko-tajuk">${escapeHTML(r.bulanLabel)} ${r.tahun || ""}</p>
          <div class="kad-laporan-eko-meta">
            <span>📊 KDNK: <strong class="${pt >= 0 ? 'naik' : 'turun'}">${pt >= 0 ? "+" : ""}${pt.toFixed(1)}%</strong></span>
            <span>🔥 Inflasi: <strong>${(r.inflasi || 0).toFixed(1)}%</strong></span>
            <span>💰 Hasil: <strong>${formatRM(r.hasil || 0)}</strong></span>
          </div>
        </div>
        <span class="kad-laporan-eko-badge ${kb}">${tb}</span>
      </div>
    `;
  }).join("");
}

// =====================================
// KIRA EKONOMI BULANAN
// =====================================

function kiraEkonomiBulanan() {
  const e = gameState.ekonomi;
  const s = gameState.statistik;

  const hb = e.kdnk * 0.175 / 12;
  const bb = gameState.bajet.tahunan / 12;
  const pb = bb * (0.85 + (kiraPrestasiKabinet() / 100) * 0.3);

  const km = kiraKesanEkonomi();
  const n = e.kdnk > 0 ? (e.hutang / e.kdnk) * 100 : 0;
  const ph = n > 80 ? -0.8 : n > 60 ? -0.3 : 0;

  const pt = (4.2 * (gameState.paramKesukaran ? gameState.paramKesukaran.hasilEkonomi : 1))
    + km + ph + (Math.random() - 0.5) * 0.6;

  const pbj = gameState.bajet.tahunan > 0
    ? (kiraBajetDiagihkan() / gameState.bajet.tahunan) * 100
    : 0;

  const inf = 2.5
    + (pbj > 100 ? 0.6 : pbj > 90 ? 0.2 : 0)
    + (Math.random() - 0.5) * 0.5;

  const peng = 3.5 - (pt - 4.2) * 0.3 + (Math.random() - 0.5) * 0.2;
  const def = pb - hb;
  const hut = e.hutang + Math.max(0, def);
  const kn = e.kdnk * (1 + pt / 100 / 4);

  let kp = 0;
  if (inf >= 6) kp -= 2;
  else if (inf >= 4) kp -= 1;
  if (peng >= 6) kp -= 2;
  else if (peng >= 4.5) kp -= 1;
  if (pt >= 5) kp += 1;
  if (pt < 2) kp -= 1;

  let kk = 0;
  if (inf >= 5) kk -= 2;
  else if (inf >= 3.5) kk -= 1;
  if (pt >= 5) kk += 1;

  e.hasil = hb;
  e.perbelanjaan = pb;
  e.baki = hb - pb;
  e.hutang = hut;
  e.kdnk = kn;
  s.pertumbuhanEkonomi = pt;
  s.inflasi = inf;
  s.pengangguran = peng;
  s.popularitiPM = hadkan(s.popularitiPM + kp);
  s.kepuasanRakyat = hadkan(s.kepuasanRakyat + kk);

  gameState.laporanEkonomi.push({
    bulan: gameState.masa.bulan,
    tahun: Math.floor(gameState.masa.hari / 365) + 1,
    bulanLabel: namaBulan(gameState.masa.bulan),
    hari: gameState.masa.hari,
    hasil: hb,
    perbelanjaan: pb,
    hutang: hut,
    kdnk: kn,
    pertumbuhan: pt,
    inflasi: inf,
    pengangguran: peng
  });
}

function semakSempadanBulan() {
  if (gameState.status !== "permainan") return;

  const tarikh = new Date(2025, 0, 1);
  tarikh.setDate(tarikh.getDate() + (gameState.masa.hari - 1));
  const bulanSemasa = tarikh.getMonth() + 1;
  const tahunSemasa = tarikh.getFullYear() - 2025 + 1;

  if (bulanSemasa !== gameState.masa.bulan || tahunSemasa !== gameState.masa.tahun) {
    gameState.masa.bulan = bulanSemasa;
    gameState.masa.tahun = tahunSemasa;
    kiraEkonomiBulanan();

    if (Math.random() < 0.25) {
      const p = (typeof pilihPeristiwaEkonomiRawak === "function")
        ? pilihPeristiwaEkonomiRawak()
        : null;
      if (p) tunjukModalPeristiwaEkonomi(p);
    }

    if (halamanSemasa === "ekonomi") paparHalamanEkonomi();
  }
}

// =====================================
// PERISTIWA EKONOMI
// =====================================

function tunjukModalPeristiwaEkonomi(peristiwa) {
  if (!peristiwa) return;
  gameState.peristiwaEkonomiAktif.push(peristiwa);

  let h = `
    <div class="peristiwa-eko-box">
      <div class="peristiwa-eko-header">
        <span class="peristiwa-eko-icon">${peristiwa.ikon}</span>
        <div class="peristiwa-eko-tajuk">
          <p class="peristiwa-eko-nama">${escapeHTML(peristiwa.nama)}</p>
          <p class="peristiwa-eko-kategori">${escapeHTML(peristiwa.kategori)}</p>
        </div>
      </div>
      <p class="peristiwa-eko-deskripsi">${escapeHTML(peristiwa.deskripsi)}</p>
      <div class="peristiwa-eko-pilihan">
  `;

  (peristiwa.pilihan || []).forEach((p, i) => {
    let k = "neutral";
    if (p.kesan) {
      const j = (p.kesan.populariti || 0) + (p.kesan.pertumbuhan || 0);
      if (j > 0) k = "positif";
      else if (j < 0) k = "negatif";
    }
    h += `
      <button class="btn-peristiwa-eko" onclick="pilihPeristiwaEkonomi(${i})">
        <div class="btn-peristiwa-teks"><strong>${escapeHTML(p.teks)}</strong></div>
        <span class="btn-peristiwa-kesan ${k}">${escapeHTML(p.label || "Pilih")}</span>
      </button>
    `;
  });

  h += `</div></div>`;
  gameState.peristiwaEkonomiSemasa = peristiwa;
  tunjukModal("Peristiwa Ekonomi", h);
}

function pilihPeristiwaEkonomi(i) {
  const pr = gameState.peristiwaEkonomiSemasa;
  if (!pr) return;
  const p = pr.pilihan ? pr.pilihan[i] : null;
  if (!p) return;

  if (pr.kesanAsas) gunaKesanEkonomi(pr.kesanAsas);
  if (p.kesan) gunaKesanEkonomi(p.kesan);

  gameState.peristiwaEkonomiSemasa = null;
  gameState.peristiwaEkonomiAktif = gameState.peristiwaEkonomiAktif.filter(x => x.id !== pr.id);
  tutupModal();
  if (halamanSemasa === "ekonomi") paparHalamanEkonomi();
  kemasKiniDashboard();
}

function gunaKesanEkonomi(k) {
  const e = gameState.ekonomi;
  const s = gameState.statistik;

  if (k.inflasi) s.inflasi = hadkan(s.inflasi + k.inflasi, 0, 15);
  if (k.hasil) e.hasil = Math.max(0, e.hasil + k.hasil);
  if (k.perbelanjaan) e.perbelanjaan = Math.max(0, e.perbelanjaan + k.perbelanjaan);
  if (k.hutang) e.hutang = Math.max(0, e.hutang + k.hutang);
  if (k.populariti) s.popularitiPM = hadkan(s.popularitiPM + k.populariti);
  if (k.kepuasan) s.kepuasanRakyat = hadkan(s.kepuasanRakyat + k.kepuasan);
  if (k.pertumbuhan) s.pertumbuhanEkonomi += k.pertumbuhan;
  if (k.pengangguran) s.pengangguran = hadkan(s.pengangguran + k.pengangguran, 0, 15);
}