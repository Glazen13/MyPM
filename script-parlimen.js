"use strict";

// =====================================
// MyPM Simulasi - Parlimen
// Fasa 11.0 — peta kerusi, undian RUU, senarai MP
// =====================================

// =====================================
// HALAMAN PARLIMEN
// =====================================

function dapatkanSenaraiMPParlimen() {
  const s = DATA_MP.map(mp => ({
    id: mp.id, nama: mp.nama, kawasan: mp.kawasan, negeri: mp.negeri,
    parti: mp.parti, umur: mp.umur, jenis: "AI"
  }));
  if (gameState.pemain && gameState.parti && gameState.kawasanPemain) {
    s.push({
      id: "PEMAIN",
      nama: gameState.pemain.gelaran
        ? gameState.pemain.gelaran + " " + gameState.pemain.nama
        : gameState.pemain.nama,
      kawasan: gameState.kawasanPemain.nama,
      negeri: gameState.kawasanPemain.negeri,
      parti: gameState.parti.id,
      umur: gameState.pemain.umur,
      jenis: "PEMAIN"
    });
  }
  return s;
}

function paparHalamanParlimen() {
  const p = kiraParlimen();
  setTeks("parlimenKerajaan", p.kerajaan);
  setTeks("parlimenPembangkang", p.pembangkang);
  setTeks("parlimenBebas", p.bebas);
  paparPetaKerusi();
  paparLegendaParlimen();
  paparSenaraiMPParlimen();
  paparSenaraiRUU();
  paparSejarahUndian();
}

// =====================================
// PETA KERUSI HEMICYCLE
// =====================================

function janaKedudukanHemicycle(jumlah) {
  const cx = 400, cy = 400, rD = 180, jB = 22, bil = 5;
  const jejari = [];
  for (let i = 0; i < bil; i++) jejari.push(rD + i * jB);

  const pL = jejari.map(r => Math.PI * r);
  const jL = pL.reduce((a, b) => a + b, 0);
  const bpb = pL.map(p => Math.round((p / jL) * jumlah));

  let js = bpb.reduce((a, b) => a + b, 0);
  let idx = bil - 1;
  while (js !== jumlah) {
    if (js < jumlah) { bpb[idx]++; js++; }
    else if (bpb[idx] > 1) { bpb[idx]--; js--; }
    idx = (idx - 1 + bil) % bil;
  }

  const k = [];
  for (let b = 0; b < bil; b++) {
    const r = jejari[b], n = bpb[b];
    const l = n > 1 ? Math.PI / (n - 1) : 0;
    for (let x = 0; x < n; x++) {
      const s = Math.PI - (x * l);
      k.push({ x: cx + r * Math.cos(s), y: cy - r * Math.sin(s) });
    }
  }
  return k;
}

function paparPetaKerusi() {
  const svg = document.getElementById("petaKerusi");
  if (!svg) return;

  const s = dapatkanSenaraiMPParlimen();
  const gab = gameState.parlimen.partiKerajaan || [];
  const idP = gameState.parti ? gameState.parti.id : null;
  const mpP = s.find(mp => mp.jenis === "PEMAIN");
  const k = kiraKerusiSetiapParti();
  const sp = Object.keys(k).sort((a, b) => k[b] - k[a]);
  const pg = sp.filter(id => gab.includes(id) && id !== idP);
  const pp = sp.filter(id => !gab.includes(id) && id !== "Bebas");
  const pb = sp.filter(id => id === "Bebas");

  function mpP2(id) {
    return s.filter(mp => mp.parti === id && mp.jenis !== "PEMAIN");
  }

  const kiri = [];
  if (mpP) kiri.push(mpP);
  if (gameState.tpm && gameState.tpm.id) {
    const t = s.find(mp => mp.id === gameState.tpm.id);
    if (t && t.id !== (mpP && mpP.id)) kiri.push(t);
  }
  const idM = (gameState.kabinet || []).map(x => x.mp && x.mp.id).filter(Boolean);
  if (idP) {
    const mpp = s.filter(mp =>
      mp.parti === idP && mp.jenis !== "PEMAIN" &&
      mp.id !== (gameState.tpm && gameState.tpm.id));
    mpp.filter(mp => idM.includes(mp.id)).forEach(mp => kiri.push(mp));
    mpp.filter(mp => !idM.includes(mp.id)).forEach(mp => kiri.push(mp));
  }
  pg.forEach(id => mpP2(id).forEach(mp => kiri.push(mp)));

  const kanan = [];
  pp.forEach(id => mpP2(id).forEach(mp => kanan.push(mp)));
  pb.forEach(id => mpP2(id).forEach(mp => kanan.push(mp)));

  const ts = [];
  [...kiri].reverse().forEach(mp => ts.push(mp));
  kanan.forEach(mp => ts.push(mp));

  const ked = janaKedudukanHemicycle(ts.length);

  function wp(id) {
    const p = DATA_PARTI.find(x => x.id === id);
    return p ? (p.warna || warnaKategori(p.kategori)) : "#64748b";
  }

  let h = `<text x="400" y="30" text-anchor="middle" fill="#D4B46A" font-size="11" font-weight="700" letter-spacing="2">SPEAKER</text>`;
  ked.forEach((pos, i) => {
    const mp = ts[i];
    if (!mp) return;
    h += `<circle class="${mp.jenis === "PEMAIN" ? "kerusi pemain" : "kerusi"}" cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="8" fill="${wp(mp.parti)}"><title>${escapeHTML(mp.nama + " (" + mp.parti + ") — " + mp.kawasan)}</title></circle>`;
  });
  svg.innerHTML = h;
}

function paparLegendaParlimen() {
  const panel = document.getElementById("petaLegenda");
  if (!panel) return;
  const k = kiraKerusiSetiapParti();
  const id = Object.keys(k).sort((a, b) => k[b] - k[a]);
  panel.innerHTML = id.map(x => {
    const p = DATA_PARTI.find(y => y.id === x);
    const w = p ? (p.warna || warnaKategori(p.kategori)) : "#64748b";
    const n = p ? p.singkatan : x;
    return `
      <div class="peta-legenda-item">
        <span class="peta-legenda-warna" style="background:${w}"></span>
        <span class="peta-legenda-nama">${escapeHTML(n)}</span>
        <span class="peta-legenda-bilangan">${k[x]}</span>
      </div>
    `;
  }).join("");
}

function paparSenaraiMPParlimen() {
  const panel = document.getElementById("senaraiMPParlimen");
  if (!panel) return;
  const s = dapatkanSenaraiMPParlimen();
  setTeks("bilanganMPParlimen", s.length + " MP");
  panel.innerHTML = s.map(mp => `
    <div class="kad-mp-parlimen ${mp.jenis === "PEMAIN" ? "pemain" : ""}">
      <div>
        <p class="kad-mp-parlimen-nama">${escapeHTML(mp.nama)} ${mp.jenis === "PEMAIN" ? "⭐" : ""}</p>
        <p class="kad-mp-parlimen-meta">${escapeHTML(mp.kawasan)} • ${escapeHTML(mp.negeri)}</p>
      </div>
      <span class="kad-mp-parti">${escapeHTML(mp.parti)}</span>
    </div>
  `).join("");
}

// =====================================
// UNDIAN RUU
// =====================================

let ruuDipilihSementara = null;

function paparSenaraiRUU() {
  const panel = document.getElementById("senaraiRUU");
  if (!panel) return;
  if (typeof DATA_RUU === "undefined") {
    panel.innerHTML = "<p class='nota'>Tiada RUU.</p>";
    return;
  }

  function st(id) {
    const r = gameState.sejarahUndian.find(x => x.idRUU === id);
    if (!r) return { kelas: "belum", teks: "Belum diundi" };
    return r.lulus
      ? { kelas: "lulus", teks: "Lulus" }
      : { kelas: "tolak", teks: "Ditolak" };
  }

  panel.innerHTML = DATA_RUU.map(r => {
    const c = ruuDipilihSementara === r.id ? "dipilih" : "";
    const s = st(r.id);
    return `
      <div class="kad-ruu ${c}" onclick="pilihRUU('${r.id}')" data-ruu="${r.id}">
        <span class="kad-ruu-kategori">${escapeHTML(r.kategori)}</span>
        <p class="kad-ruu-nama">${escapeHTML(r.nama)}</p>
        <p class="kad-ruu-kesan">${escapeHTML(r.kesan)}</p>
        <span class="kad-ruu-status ${s.kelas}">${escapeHTML(s.teks)}</span>
      </div>
    `;
  }).join("");

  setTeks("undianBilangan", gameState.sejarahUndian.length + " rekod");
}

function pilihRUU(id) {
  if (gameState.status !== "permainan") return;
  const ruu = DATA_RUU.find(r => r.id === id);
  if (!ruu) return;
  if (gameState.sejarahUndian.find(r => r.idRUU === id)) {
    tunjukModal("Sudah Diundi", "<p>RUU ini sudah diundi.</p>");
    return;
  }
  ruuDipilihSementara = id;
  paparSenaraiRUU();
  paparRamalanUndian(ruu);
}

function paparRamalanUndian(ruu) {
  const panel = document.getElementById("undianKeputusan");
  if (!panel) return;
  const r = kiraRamalanUndian(ruu);
  panel.innerHTML = `
    <div class="ruu-info">
      <span class="ruu-info-kategori">${escapeHTML(ruu.kategori)}</span>
      <h4 class="ruu-info-nama">${escapeHTML(ruu.nama)}</h4>
      <p class="ruu-info-deskripsi">${escapeHTML(ruu.deskripsi)}</p>
      <div class="ruu-info-ramalan">Kerajaan: <strong>${r.kerajaanAnggar}</strong> • Pembangkang: <strong>${r.pembangkangAnggar}</strong> • Bebas: <strong>${r.bebasAnggar}</strong><br>Jumlah: <strong>${r.jumlahSetuju}</strong> / 222</div>
    </div>
    <div class="undian-butang">
      <button class="btn-undi-batal" onclick="batalPilihRUU()">Batal</button>
      <button class="btn-undi" onclick="jalankanUndian()">🏛 Hantar ke Undian</button>
    </div>
  `;
}

function batalPilihRUU() {
  ruuDipilihSementara = null;
  paparSenaraiRUU();
  const p = document.getElementById("undianKeputusan");
  if (p) {
    p.innerHTML = `<div class="undian-kosong"><p>Pilih satu RUU di kiri.</p></div>`;
  }
}

function kiraRamalanUndian(ruu) {
  const k = kiraKerusiSetiapParti();
  const gab = gameState.parlimen.partiKerajaan || [];
  let kj = 0, pj = 0, bj = 0;

  Object.keys(k).forEach(id => {
    if (id === "Bebas") bj += k[id];
    else if (gab.includes(id)) kj += k[id];
    else pj += k[id];
  });

  const ka = Math.round(kj * (ruu.sokonganKerajaanAsas || 0.5));
  const pa = Math.round(pj * (ruu.sokonganPembangkangAsas || 0.5));
  const ba = Math.round(bj * (ruu.sokonganBebasAsas || 0.5));

  return {
    kerajaanAnggar: ka,
    pembangkangAnggar: pa,
    bebasAnggar: ba,
    jumlahSetuju: ka + pa + ba
  };
}

function jalankanUndian() {
  if (!ruuDipilihSementara) return;
  const ruu = DATA_RUU.find(r => r.id === ruuDipilihSementara);
  if (!ruu) return;

  const kep = kiraUndianSebenar(ruu);
  const lulus = kep.jumlahSetuju >= 112;

  gameState.sejarahUndian.push({
    idRUU: ruu.id,
    namaRUU: ruu.nama,
    kategori: ruu.kategori,
    lulus,
    jumlahSetuju: kep.jumlahSetuju,
    jumlahTolak: 222 - kep.jumlahSetuju,
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari
  });

  if (lulus) {
    gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM + 1);
    gameState.statistik.prestasiKerajaan = hadkan(gameState.statistik.prestasiKerajaan + 2);
    if (ruu.isuPanas) gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM - 2);
  } else {
    gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM - 2);
    gameState.statistik.prestasiKerajaan = hadkan(gameState.statistik.prestasiKerajaan - 2);
    if (ruu.isuPanas) gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM - 1);
  }

  paparKeputusanUndian(ruu, kep, lulus);
  paparSejarahUndian();
  ruuDipilihSementara = null;
  paparSenaraiRUU();
  kemasKiniDashboard();
  if (gameState.tetapan.autoSave) simpanPermainan(true);
}

function kiraUndianSebenar(ruu) {
  const k = kiraKerusiSetiapParti();
  const gab = gameState.parlimen.partiKerajaan || [];
  let kj = 0, pj = 0, bj = 0;

  Object.keys(k).forEach(id => {
    if (id === "Bebas") bj += k[id];
    else if (gab.includes(id)) kj += k[id];
    else pj += k[id];
  });

  function u(j, kb) {
    let s = 0;
    for (let i = 0; i < j; i++) {
      if (Math.random() < (kb || 0.5) + (Math.random() - 0.5) * 0.15) s++;
    }
    return s;
  }

  const ks = u(kj, ruu.sokonganKerajaanAsas);
  const ps = u(pj, ruu.sokonganPembangkangAsas);
  const bs = u(bj, ruu.sokonganBebasAsas);

  return {
    kerajaanSetuju: ks,
    pembangkangSetuju: ps,
    bebasSetuju: bs,
    jumlahSetuju: ks + ps + bs,
    jumlahTolak: 222 - ks - ps - bs
  };
}

function paparKeputusanUndian(ruu, kep, lulus) {
  const p = document.getElementById("undianKeputusan");
  if (!p) return;
  const c = lulus ? "lulus" : "tolak";
  const t = lulus ? "LULUS" : "DITOLAK";
  p.innerHTML = `
    <div class="ruu-info">
      <span class="ruu-info-kategori">${escapeHTML(ruu.kategori)}</span>
      <h4 class="ruu-info-nama">${escapeHTML(ruu.nama)}</h4>
    </div>
    <div class="undi-status ${c}">
      <p class="undi-status-tajuk">${t}</p>
      <p class="undi-status-sub">${kep.jumlahSetuju} setuju • ${kep.jumlahTolak} tolak</p>
    </div>
    <div class="undian-butang">
      <button class="btn-undi-batal" onclick="batalPilihRUU()">Tutup</button>
    </div>
  `;
}

function paparSejarahUndian() {
  const p = document.getElementById("undianSejarah");
  if (!p) return;
  if (gameState.sejarahUndian.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada undian.</p>";
    return;
  }
  p.innerHTML = [...gameState.sejarahUndian].reverse().map(r => `
    <div class="kad-sejarah-undian ${r.lulus ? "lulus" : "tolak"}">
      <div class="kad-sejarah-info">
        <p class="kad-sejarah-nama">${escapeHTML(r.namaRUU)}</p>
        <p class="kad-sejarah-meta">${escapeHTML(r.tarikh)} • ${r.jumlahSetuju}/${r.jumlahTolak}</p>
      </div>
      <span class="kad-sejarah-keputusan ${r.lulus ? "lulus" : "tolak"}">${r.lulus ? "Lulus" : "Tolak"}</span>
    </div>
  `).join("");
}