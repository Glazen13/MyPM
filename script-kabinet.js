"use strict";

// =====================================
// MyPM Simulasi - Kabinet
// Fasa 11.0 — v3 (Kerajaan/Pembangkang count + auto-pilih ikut gabungan)
// =====================================

let slotKabinet = [];

// =====================================
// SKRIN BENTUK KABINET
// =====================================

function tunjukSkrinKabinet() {
  const s1 = document.getElementById("skrinProlog");
  const s2 = document.getElementById("skrinKabinet");
  const s3 = document.getElementById("skrinGabungan"); // just in case
  
  if (s1) s1.classList.add("hidden");
  if (s3) s3.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  if (typeof DATA_MP === "undefined" || !Array.isArray(DATA_MP)) {
    console.error("DATA_MP tidak dimuatkan");
    tunjukModal("Ralat", "<p>Data MP tidak dimuatkan.</p>");
    return;
  }

  if (typeof kiraParlimen === "function") kiraParlimen();

  // Log bilangan MP setiap parti
  if (gameState.parti) {
    const idP = gameState.parti.id;
    const bilMP = DATA_MP.filter(mp => mp.parti === idP).length;
    console.log("MP parti pemain tersedia:", bilMP, "| Jumlah DATA_MP:", DATA_MP.length);
  }

  inisialisasiSlotKabinet();
  isiTapisMPParti();
  paparSenaraiMPKabinet();
  paparSlotKabinet();
  kemasKiniButangKabinet();
}

function inisialisasiSlotKabinet() {
  slotKabinet = DATA_KEMENTERIAN.map(k => ({
    idKementerian: k.id,
    namaKementerian: k.nama,
    idMP: null
  }));
  console.log("Slot kabinet diinisialisasi:", slotKabinet.length);
}

function isiTapisMPParti() {
  const d = document.getElementById("tapisMPParti");
  if (!d) return;
  const s = [...new Set(DATA_MP.map(mp => mp.parti))].sort();
  d.innerHTML = '<option value="semua">Semua Parti</option>' +
    s.map(p => '<option value="' + escapeHTML(p) + '">' + escapeHTML(p) + '</option>').join("");
}

function paparSenaraiMPKabinet(tapis, carian) {
  const panel = document.getElementById("senaraiMPKabinet");
  if (!panel) return;

  let senarai = DATA_MP;
  if (tapis && tapis !== "semua") senarai = senarai.filter(mp => mp.parti === tapis);
  if (carian) {
    const c = carian.toLowerCase();
    senarai = senarai.filter(mp =>
      mp.nama.toLowerCase().includes(c) || mp.kawasan.toLowerCase().includes(c));
  }

  // Kira bilangan
  const idP = gameState.parti ? gameState.parti.id : null;
  const gab = gameState.parlimen.partiKerajaan || [];
  const bilParti = idP ? DATA_MP.filter(mp => mp.parti === idP).length : 0;
  const bilGabungan = gab.length > 0
    ? DATA_MP.filter(mp => gab.includes(mp.parti) && mp.parti !== idP).length
    : 0;
  
  // Kerajaan = Parti anda + Gabungan
  const bilKerajaan = bilParti + bilGabungan;
  
  // Pembangkang = Jumlah keseluruhan - Kerajaan
  const bilPembangkang = DATA_MP.length - bilKerajaan;
  const bilLawan = bilPembangkang; 

  setTeks("kabinetBilanganMP", senarai.length);

  // Kemaskini info bar
  const el = document.getElementById("kabinetBilanganParti");
  if (el) {
    el.innerHTML = "Parti anda: <strong>" + bilParti + "</strong> • Gabungan: <strong>" +
      bilGabungan + "</strong> • Lawan: <strong>" + bilLawan + "</strong>";
  }

  // Tambah info Kerajaan/Pembangkang secara automatik kalau belum ada
  let elInfo2 = document.getElementById("kabinetInfoKerajaan");
  if (!elInfo2) {
    elInfo2 = document.createElement("p");
    elInfo2.id = "kabinetInfoKerajaan";
    elInfo2.className = "kabinet-info-bilangan";
    elInfo2.style.marginTop = "6px";
    elInfo2.style.color = "var(--ink-soft)";
    if (el && el.parentNode) {
      el.parentNode.appendChild(elInfo2);
    }
  }
  if (elInfo2) {
    elInfo2.innerHTML = "Kerajaan: <strong style='color: #10b981;'>" + bilKerajaan + "</strong> • Pembangkang: <strong style='color: var(--maroon);'>" + bilPembangkang + "</strong>";
  }

  // Papar kad MP
  panel.innerHTML = senarai.map(mp => {
    const d = slotKabinet.some(s => s.idMP === mp.id);
    const isPartiSaya = mp.parti === idP;
    const isGabungan = gab.includes(mp.parti) && !isPartiSaya;
    const isLawan = !isPartiSaya && !isGabungan;

    let kelas = "";
    if (isPartiSaya) kelas = "parti-saya";
    else if (isGabungan) kelas = "parti-gabungan";
    else if (isLawan) kelas = "parti-lawan";

    if (d) kelas += " dilantik";

    return `
      <div class="kad-mp ${kelas}" onclick="lantikMP('${mp.id}')">
        <div class="kad-mp-info">
          <p class="kad-mp-nama">${escapeHTML(mp.nama)}</p>
          <p class="kad-mp-meta">${escapeHTML(mp.kawasan)} • ${mp.umur} tahun</p>
        </div>
        <span class="kad-mp-parti">${escapeHTML(mp.parti)}</span>
      </div>
    `;
  }).join("");
}

function cariMPKabinet() {
  const t = document.getElementById("tapisMPParti");
  const c = document.getElementById("carianMP");
  paparSenaraiMPKabinet(t ? t.value : "semua", c ? c.value : "");
}

function tapisMPKabinet() { cariMPKabinet(); }

function lantikMP(id) {
  if (slotKabinet.some(s => s.idMP === id)) {
    tunjukModal("Sudah", "<p>MP sudah dilantik.</p>");
    return;
  }
  const k = slotKabinet.find(s => s.idMP === null);
  if (!k) {
    tunjukModal("Penuh", "<p>30 kementerian penuh.</p>");
    return;
  }
  k.idMP = id;
  paparSlotKabinet();
  cariMPKabinet();
  kemasKiniButangKabinet();
}

function buangMP(idKem) {
  const s = slotKabinet.find(x => x.idKementerian === idKem);
  if (!s) return;
  s.idMP = null;
  paparSlotKabinet();
  cariMPKabinet();
  kemasKiniButangKabinet();
}

function paparSlotKabinet() {
  const panel = document.getElementById("senaraiSlotKabinet");
  if (!panel) return;
  panel.innerHTML = slotKabinet.map(s => {
    const mp = s.idMP ? DATA_MP.find(m => m.id === s.idMP) : null;
    return `
      <div class="slot-kementerian ${mp ? 'diisi' : ''}">
        <span class="slot-nama-kem">${escapeHTML(s.namaKementerian)}</span>
        ${mp
          ? '<span class="slot-mp">' + escapeHTML(mp.nama) + '</span>' +
            '<button class="slot-buang" onclick="buangMP(\'' + s.idKementerian + '\')">✕</button>'
          : '<span class="slot-kosong">Kosong</span>'}
      </div>
    `;
  }).join("");
}

function kemasKiniButangKabinet() {
  const d = slotKabinet.filter(s => s.idMP !== null).length;
  setTeks("kabinetBilangan", d + " / 30");
  const b = document.getElementById("btnSahkanKabinet");
  if (b) b.disabled = d !== 30;
}

function sahkanKabinet() {
  if (slotKabinet.filter(s => s.idMP !== null).length !== 30) {
    tunjukModal("Belum", "<p>Isi 30 kementerian.</p>");
    return;
  }
  gameState.kabinet = slotKabinet.map(s => ({
    kementerian: s.namaKementerian,
    mp: DATA_MP.find(m => m.id === s.idMP)
  }));
  tunjukSkrinTPM();
}

function kembaliManifesto() {
  const s1 = document.getElementById("skrinKabinet");
  // Kembali ke gabungan jika ada, kalau tak ke manifesto
  const s2 = document.getElementById("skrinGabungan") || document.getElementById("skrinManifesto");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

function autoPilihKabinet() {
  const idP = gameState.parti ? gameState.parti.id : null;
  const gab = gameState.parlimen.partiKerajaan || [];

  const mpParti = [];
  const mpGabungan = [];
  const mpLain = [];

  DATA_MP.forEach(mp => {
    const sk = (mp.prestasi || 0) * 0.35
             + (mp.populariti || 0) * 0.25
             + (mp.integriti || 0) * 0.25
             + (mp.rundingan || 0) * 0.15;

    const item = { mp, sk };

    if (mp.parti === idP) {
      mpParti.push(item);
    } else if (gab.includes(mp.parti)) {
      mpGabungan.push(item);
    } else {
      mpLain.push(item);
    }
  });

  mpParti.sort((a, b) => b.sk - a.sk);
  mpGabungan.sort((a, b) => b.sk - a.sk);
  mpLain.sort((a, b) => b.sk - a.sk);

  const senaraiAkhir = [
    ...mpParti,
    ...mpGabungan,
    ...mpLain
  ];

  slotKabinet.forEach((slot, i) => {
    slot.idMP = senaraiAkhir[i] ? senaraiAkhir[i].mp.id : null;
  });

  const bilParti = Math.min(mpParti.length, 30);
  const bilGabungan = Math.min(mpGabungan.length, 30 - bilParti);
  const bilLain = Math.max(0, 30 - bilParti - bilGabungan);

  console.log("Auto-pilih:", {
    partiPemain: bilParti,
    gabungan: bilGabungan,
    lain: bilLain
  });

  paparSlotKabinet();
  cariMPKabinet();
  kemasKiniButangKabinet();
}

function kosongkanKabinet() {
  slotKabinet.forEach(s => { s.idMP = null; });
  paparSlotKabinet();
  cariMPKabinet();
  kemasKiniButangKabinet();
}

// =====================================
// SKRIN PILIH TPM
// =====================================

let tpmDipilihSementara = null;

function tunjukSkrinTPM() {
  const s1 = document.getElementById("skrinKabinet");
  const s2 = document.getElementById("skrinTPM");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
  tpmDipilihSementara = null;
  paparSenaraiTPM();
  kemasKiniButangTPM();
}

function paparSenaraiTPM() {
  const panel = document.getElementById("senaraiTPMPilih");
  if (!panel) return;
  const senarai = slotKabinet
    .filter(s => s.idMP !== null)
    .map(s => ({
      mp: DATA_MP.find(m => m.id === s.idMP),
      kementerian: s.namaKementerian
    }))
    .filter(x => x.mp);

  panel.innerHTML = senarai.map(item => {
    const c = tpmDipilihSementara === item.mp.id ? "dipilih" : "";
    return `
      <div class="kad-tpm ${c}" onclick="pilihTPMKad('${item.mp.id}')" data-tpm="${item.mp.id}">
        <div class="kad-tpm-check">✓</div>
        <p class="kad-tpm-nama">${escapeHTML(item.mp.nama)}</p>
        <p class="kad-tpm-kem">${escapeHTML(item.kementerian)}</p>
        <div class="kad-tpm-meta">
          <span>🎯 ${item.mp.prestasi || 0}</span>
          <span>⭐ ${item.mp.populariti || 0}</span>
          <span>💎 ${item.mp.integriti || 0}</span>
        </div>
      </div>
    `;
  }).join("");
}

function pilihTPMKad(id) {
  tpmDipilihSementara = id;
  document.querySelectorAll(".kad-tpm").forEach(k => {
    k.classList.remove("dipilih");
    if (k.dataset.tpm === id) k.classList.add("dipilih");
  });
  const mp = DATA_MP.find(m => m.id === id);
  setTeks("tpmPilihan", mp ? mp.nama : "—");
  kemasKiniButangTPM();
}

function kemasKiniButangTPM() {
  const b = document.getElementById("btnSahkanTPM");
  if (b) b.disabled = tpmDipilihSementara === null;
}

function sahkanTPM() {
  if (!tpmDipilihSementara) {
    tunjukModal("Belum", "<p>Pilih TPM.</p>");
    return;
  }
  gameState.tpm = DATA_MP.find(m => m.id === tpmDipilihSementara);
  tunjukSkrinPelantikan();
}

function kembaliKabinet() {
  const s1 = document.getElementById("skrinTPM");
  const s2 = document.getElementById("skrinKabinet");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

// =====================================
// SKRIN PELANTIKAN
// =====================================

function tunjukSkrinPelantikan() {
  const s1 = document.getElementById("skrinTPM");
  const s2 = document.getElementById("skrinPelantikan");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
  paparPelantikan();
}

function paparPelantikan() {
  const p = gameState.pemain;
  const parti = gameState.parti;
  const kawasan = gameState.kawasanPemain;
  const tpm = gameState.tpm;
  const kesukaran = gameState.paramKesukaran;

  const profil = document.getElementById("pelantikanProfil");
  if (profil && p) {
    const n = p.gelaran ? p.gelaran + " " + p.nama : p.nama;
    const fs = p.gambar ? 'style="background-image:url(' + p.gambar + ')"' : '';
    profil.innerHTML = `
      <div class="pelantikan-foto" ${fs}>${p.gambar ? "" : "👤"}</div>
      <div class="pelantikan-info">
        <p class="pelantikan-jawatan">Perdana Menteri Malaysia</p>
        <h2 class="pelantikan-nama">${escapeHTML(n)}</h2>
        <p class="pelantikan-bio">${escapeHTML(p.bio || "Bersedia memimpin.")}</p>
      </div>
    `;
  }

  const grid = document.getElementById("pelantikanGrid");
  if (grid && parti && kawasan && tpm && kesukaran) {
    const kos = gameState.manifesto.reduce((t, m) => t + (m.kos || 0), 0);
    grid.innerHTML = `
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">Parti</p><p class="pelantikan-kad-nilai">${escapeHTML(parti.nama)}</p><p class="pelantikan-kad-sub">${escapeHTML(parti.singkatan)}</p></div>
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">Kawasan</p><p class="pelantikan-kad-nilai">${escapeHTML(kawasan.nama)}</p><p class="pelantikan-kad-sub">${escapeHTML(kawasan.negeri)}</p></div>
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">TPM</p><p class="pelantikan-kad-nilai">${escapeHTML(tpm.nama)}</p><p class="pelantikan-kad-sub">${escapeHTML(tpm.parti)}</p></div>
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">Kabinet</p><p class="pelantikan-kad-nilai">30 Menteri</p><p class="pelantikan-kad-sub">Semua portfolio</p></div>
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">Bajet Manifesto</p><p class="pelantikan-kad-nilai">RM ${kos}B</p><p class="pelantikan-kad-sub">5 manifesto</p></div>
      <div class="pelantikan-kad"><p class="pelantikan-kad-label">Kesukaran</p><p class="pelantikan-kad-nilai">${escapeHTML(kesukaran.nama)}</p><p class="pelantikan-kad-sub">5 tahun • 1825 hari</p></div>
    `;
  }

  const mel = document.getElementById("pelantikanManifesto");
  if (mel) {
    mel.innerHTML = "<h3>5 Manifesto 100 Hari</h3><ul>" +
      gameState.manifesto.map(m => "<li>" + escapeHTML(m.nama) + "</li>").join("") +
      "</ul>";
  }
}

// =====================================
// PRESTASI KABINET
// =====================================

function kiraTahapPrestasi(s) {
  if (s >= 80) return "cemerlang";
  if (s >= 65) return "baik";
  if (s >= 50) return "sederhana";
  if (s >= 35) return "lemah";
  return "gagal";
}

function labelTahapPrestasi(t) {
  return {
    cemerlang: "Cemerlang", baik: "Baik",
    sederhana: "Sederhana", lemah: "Lemah", gagal: "Gagal"
  }[t] || t;
}

function kiraPrestasiMenteri(mp) {
  if (!mp) return 0;
  return (mp.prestasi || 0) * 0.35
       + (mp.populariti || 0) * 0.25
       + (mp.integriti || 0) * 0.25
       + (mp.rundingan || 0) * 0.15;
}

function kiraPrestasiKabinet() {
  if (gameState.kabinet.length === 0) return 0;
  return gameState.kabinet.reduce((t, i) => t + kiraPrestasiMenteri(i.mp), 0) / gameState.kabinet.length;
}

function kiraPopularitiKabinet() {
  if (gameState.kabinet.length === 0) return 0;
  return gameState.kabinet.reduce((t, i) => t + ((i.mp && i.mp.populariti) || 0), 0) / gameState.kabinet.length;
}

function kiraIntegritiKabinet() {
  if (gameState.kabinet.length === 0) return 50;
  return gameState.kabinet.reduce((t, i) => t + ((i.mp && i.mp.integriti) || 0), 0) / gameState.kabinet.length;
}

// =====================================
// HALAMAN KABINET
// =====================================

function paparHalamanKabinet() {
  if (gameState.kabinet.length === 0) return;

  const pr = kiraPrestasiKabinet();
  const po = kiraPopularitiKabinet();
  const it = kiraIntegritiKabinet();

  setTeks("kabinetJumlah", gameState.kabinet.length);
  setTeks("kabinetPrestasi", Math.round(pr));
  setTeks("kabinetPrestasiStatus", labelTahapPrestasi(kiraTahapPrestasi(pr)));
  setTeks("kabinetPopulariti", Math.round(po) + "%");
  setTeks("kabinetIntegriti", Math.round(it) + "%");
  setTeks("kabinetBilanganMenteri", gameState.kabinet.length + " Menteri");

  paparSenaraiMenteri();
  paparSejarahKabinet();
}

function paparSenaraiMenteri() {
  const p = document.getElementById("senaraiMenteriKabinet");
  if (!p) return;
  if (gameState.kabinet.length === 0) {
    p.innerHTML = "<p class='nota'>Belum dibentuk.</p>";
    return;
  }

  p.innerHTML = gameState.kabinet.map((item, i) => {
    const mp = item.mp;
    if (!mp) return "";
    const sk = kiraPrestasiMenteri(mp);
    const th = kiraTahapPrestasi(sk);
    const lb = labelTahapPrestasi(th);

    function kn(v) {
      return v >= 65 ? "tinggi" : v >= 50 ? "sederhana" : "rendah";
    }

    return `
      <div class="kad-menteri tahap-${th}">
        <div class="kad-menteri-header">
          <div class="kad-menteri-info">
            <p class="kad-menteri-nama">${escapeHTML(mp.nama)}</p>
            <p class="kad-menteri-portfolio">${escapeHTML(item.kementerian)}</p>
            <p class="kad-menteri-meta">${escapeHTML(mp.parti)} • ${escapeHTML(mp.kawasan)}</p>
          </div>
          <span class="kad-menteri-tahap ${th}">${lb}</span>
        </div>
        <div class="kad-menteri-stat">
          <div class="kad-menteri-stat-item"><span class="kad-menteri-stat-label">Prestasi</span><span class="kad-menteri-stat-nilai ${kn(mp.prestasi || 0)}">${mp.prestasi || 0}</span></div>
          <div class="kad-menteri-stat-item"><span class="kad-menteri-stat-label">Populari</span><span class="kad-menteri-stat-nilai ${kn(mp.populariti || 0)}">${mp.populariti || 0}</span></div>
          <div class="kad-menteri-stat-item"><span class="kad-menteri-stat-label">Integriti</span><span class="kad-menteri-stat-nilai ${kn(mp.integriti || 0)}">${mp.integriti || 0}</span></div>
          <div class="kad-menteri-stat-item"><span class="kad-menteri-stat-label">Rundingan</span><span class="kad-menteri-stat-nilai ${kn(mp.rundingan || 0)}">${mp.rundingan || 0}</span></div>
        </div>
        <div class="kad-menteri-aksi">
          <button class="btn-menteri" onclick="bukaModalTukarMenteri(${i})">🔄 Tukar</button>
          <button class="btn-menteri btn-pecat" onclick="pecatMenteri(${i})">✕ Pecat</button>
        </div>
      </div>
    `;
  }).join("");
}

function paparSejarahKabinet() {
  const p = document.getElementById("kabinetSejarah");
  if (!p) return;
  setTeks("kabinetSejarahBilangan", gameState.sejarahKabinet.length + " rekod");
  if (gameState.sejarahKabinet.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada.</p>";
    return;
  }

  p.innerHTML = [...gameState.sejarahKabinet].reverse().map(r => `
    <div class="kad-sejarah-kabinet ${r.jenis === "pecat" ? "tindakan-pecat" : "tindakan-lantik"}">
      <div class="kad-sejarah-kabinet-info">
        <p class="kad-sejarah-kabinet-nama">${escapeHTML(r.namaMenteri)}</p>
        <p class="kad-sejarah-kabinet-meta">${escapeHTML(r.kementerian)} • ${escapeHTML(r.tarikh)}</p>
      </div>
      <span class="kad-sejarah-kabinet-jenis ${r.jenis === "pecat" ? "pecat" : "lantik"}">${r.jenis === "pecat" ? "Pecat" : "Lantik"}</span>
    </div>
  `).join("");
}

// =====================================
// TUKAR & PECAT MENTERI
// =====================================

function bukaModalTukarMenteri(i) {
  const item = gameState.kabinet[i];
  if (!item) return;
  const idS = gameState.kabinet.map(k => k.mp && k.mp.id).filter(Boolean);
  const calon = DATA_MP
    .filter(mp => !idS.includes(mp.id))
    .map(mp => ({ mp, sk: kiraPrestasiMenteri(mp) }))
    .sort((a, b) => b.sk - a.sk)
    .slice(0, 50);

  tunjukModal("Tukar Menteri", `
    <p>Portfolio: <strong>${escapeHTML(item.kementerian)}</strong></p>
    <p>Semasa: <strong>${escapeHTML(item.mp ? item.mp.nama : "Tiada")}</strong></p>
    <div class="senarai-ganti-menteri">
      ${calon.map(c => `
        <div class="kad-ganti-menteri" onclick="tukarMenteri(${i}, '${c.mp.id}')">
          <div class="kad-ganti-menteri-info">
            <p class="kad-ganti-menteri-nama">${escapeHTML(c.mp.nama)}</p>
            <p class="kad-ganti-menteri-meta">${escapeHTML(c.mp.parti)} • ${escapeHTML(c.mp.kawasan)}</p>
          </div>
          <span class="kad-ganti-menteri-skor">${Math.round(c.sk)}</span>
        </div>
      `).join("")}
    </div>
  `);
}

function tukarMenteri(i, idB) {
  const item = gameState.kabinet[i];
  if (!item) return;
  const mpB = DATA_MP.find(m => m.id === idB);
  if (!mpB) return;
  const l = item.mp ? item.mp.nama : "Tiada";
  item.mp = mpB;
  gameState.sejarahKabinet.push({
    jenis: "lantik",
    namaMenteri: mpB.nama + " (ganti " + l + ")",
    kementerian: item.kementerian,
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari
  });
  tutupModal();
  paparHalamanKabinet();
  if (typeof kemasKiniKesanEkonomi === "function") kemasKiniKesanEkonomi();
}

function pecatMenteri(i) {
  const item = gameState.kabinet[i];
  if (!item || !item.mp) return;
  const mp = item.mp;
  tunjukModal("Pecat Menteri",
    `<p>Pecat <strong>${escapeHTML(mp.nama)}</strong> dari <strong>${escapeHTML(item.kementerian)}</strong>?</p>` +
    `<p class="nota">Populariti −5, Prestasi −3</p>` +
    `<div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end">` +
    `<button class="btn-undi-batal" onclick="tutupModal()">Batal</button>` +
    `<button class="btn-undi" onclick="sahkanPecatMenteri(${i})">Pecat</button></div>`);
}

function sahkanPecatMenteri(i) {
  const item = gameState.kabinet[i];
  if (!item || !item.mp) return;
  const mp = item.mp;
  gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM - 5);
  gameState.statistik.prestasiKerajaan = hadkan(gameState.statistik.prestasiKerajaan - 3);
  gameState.sejarahKabinet.push({
    jenis: "pecat",
    namaMenteri: mp.nama,
    kementerian: item.kementerian,
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari
  });
  item.mp = null;
  tutupModal();
  paparHalamanKabinet();
  if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  if (typeof kemasKiniKesanEkonomi === "function") kemasKiniKesanEkonomi();
  if (halamanSemasa === "rekod" && typeof paparHalamanRekod === "function") paparHalamanRekod();
}

// =====================================
// LOG
// =====================================

console.log("✅ script-kabinet.js v3 dimuatkan (info kerajaan/pembangkang)");