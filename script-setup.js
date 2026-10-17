"use strict";

// =====================================
// MyPM Simulasi - Setup
// Fasa 11.0 — v5 (Gambar SPR Besar & Animasi)
// =====================================

// =====================================
// KESUKARAN
// =====================================

const PARAM_KESUKARAN = {
  mudah: { nama: "Mudah", hasilEkonomi: 1.2, tekananKrisis: 0.6, sokonganPolitik: 1.3, popularitiMula: 60, kepuasanMula: 60 },
  normal: { nama: "Normal", hasilEkonomi: 1.0, tekananKrisis: 1.0, sokonganPolitik: 1.0, popularitiMula: 50, kepuasanMula: 50 },
  sukar: { nama: "Sukar", hasilEkonomi: 0.85, tekananKrisis: 1.5, sokonganPolitik: 0.75, popularitiMula: 40, kepuasanMula: 40 }
};

function pilihKesukaran(tahap) {
  const param = PARAM_KESUKARAN[tahap];
  if (!param) return;
  gameState.kesukaran = tahap;
  gameState.paramKesukaran = param;
  const s = document.getElementById("skrinKesukaran");
  if (s) s.classList.add("hidden");
  tunjukSkrinParti();
}

function kembaliKeMenu() {
  const s = document.getElementById("skrinKesukaran");
  const m = document.getElementById("mainMenu");
  if (s) s.classList.add("hidden");
  if (m) m.classList.remove("hidden");
}

// =====================================
// PARTI
// =====================================

let partiDipilihSementara = null;

function warnaKategori(k) {
  return { nasional: "#3b82f6", agama: "#22c55e", wilayah: "#f59e0b", khusus: "#a855f7", masyarakat: "#06b6d4" }[k] || "#64748b";
}

function labelKategori(k) {
  return { nasional: "Nasional", agama: "Agama & Masyarakat", wilayah: "Wilayah", khusus: "Khusus", masyarakat: "Masyarakat" }[k] || k;
}

function tunjukSkrinParti() {
  const s1 = document.getElementById("skrinKesukaran");
  const s2 = document.getElementById("skrinParti");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
  paparSenaraiParti();
}

function paparSenaraiParti(tapis) {
  const panel = document.getElementById("senaraiPartiPilih");
  if (!panel) return;

  let senarai = DATA_PARTI;
  if (tapis && tapis !== "semua") {
    if (tapis === "agama") {
      senarai = DATA_PARTI.filter(p => p.kategori === "agama" || p.kategori === "masyarakat");
    } else {
      senarai = DATA_PARTI.filter(p => p.kategori === tapis);
    }
  }

  panel.innerHTML = senarai.map(p => {
    const w = p.warna || warnaKategori(p.kategori);
    const l = labelKategori(p.kategori);
    const c = partiDipilihSementara === p.id ? "dipilih" : "";
    return `
      <div class="kad-parti ${c}" onclick="pilihPartiKad('${p.id}')" data-parti="${p.id}">
        <div class="kad-parti-check">✓</div>
        <div class="kad-parti-header">
          <div class="kad-parti-logo" style="background:${w}">
            ${p.emoji ? p.emoji : p.singkatan}
          </div>
          <div class="kad-parti-nama">
            <h3>${escapeHTML(p.nama)}</h3>
            <small>${escapeHTML(p.singkatan)}</small>
          </div>
        </div>
        <p class="kad-parti-ideologi">${escapeHTML(p.ideologi)}</p>
        <span class="kad-parti-kategori">${escapeHTML(l)}</span>
      </div>
    `;
  }).join("");
}

function tapisParti(k) {
  document.querySelectorAll(".parti-tab").forEach(tab => {
    tab.classList.remove("active");
    if (tab.dataset.kategori === k) tab.classList.add("active");
  });
  paparSenaraiParti(k);
}

function pilihPartiKad(id) {
  partiDipilihSementara = id;
  document.querySelectorAll(".kad-parti").forEach(k => {
    k.classList.remove("dipilih");
    if (k.dataset.parti === id) k.classList.add("dipilih");
  });
}

function sahkanParti() {
  if (!partiDipilihSementara) {
    tunjukModal("Belum Pilih", "<p>Pilih parti dahulu.</p>");
    return;
  }
  const p = DATA_PARTI.find(x => x.id === partiDipilihSementara);
  if (!p) return;
  gameState.parti = p;
  tunjukSkrinProfil();
}

function kembaliKesukaran() {
  const s1 = document.getElementById("skrinParti");
  const s2 = document.getElementById("skrinKesukaran");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

// =====================================
// PROFIL PM
// =====================================

let gambarProfilBase64 = null;

function tunjukSkrinProfil() {
  const s1 = document.getElementById("skrinParti");
  const s2 = document.getElementById("skrinProfil");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  const n = document.getElementById("inputNama");
  if (n) setTimeout(() => n.focus(), 100);

  const b = document.getElementById("inputBio");
  if (b && !b.dataset.ls) {
    b.dataset.ls = "1";
    b.addEventListener("input", () => {
      const c = document.getElementById("bioCount");
      if (c) c.textContent = b.value.length;
    });
  }

  const inp = document.getElementById("inputGambar");
  if (inp && !inp.dataset.listener) {
    inp.dataset.listener = "1";
    inp.addEventListener("change", muatGambarProfil);
  }

  const btnBuang = document.getElementById("btnBuangGambar");
  if (btnBuang && !btnBuang.dataset.listener) {
    btnBuang.dataset.listener = "1";
    btnBuang.addEventListener("click", buangGambarProfil);
  }

  if (gambarProfilBase64) {
    paparGambarProfil(gambarProfilBase64);
  }
}

function paparGambarProfil(base64) {
  const p = document.getElementById("profilGambarPratonton");
  if (!p) return;
  p.style.setProperty("--gambar-profil", "url(" + base64 + ")");
  p.classList.add("ada-gambar");
  const ph = p.querySelector(".profil-gambar-placeholder");
  if (ph) ph.style.display = "none";
  const bb = document.getElementById("btnBuangGambar");
  if (bb) bb.style.display = "inline-block";
}

function muatGambarProfil(event) {
  const f = event.target.files[0];
  if (!f) return;

  if (f.size > 2 * 1024 * 1024) {
    tunjukModal("Terlalu Besar", "<p>Saiz fail melebihi 2MB.</p>");
    event.target.value = "";
    return;
  }

  const r = new FileReader();
  r.onload = (e) => {
    gambarProfilBase64 = e.target.result;
    paparGambarProfil(gambarProfilBase64);
  };
  r.onerror = () => {
    tunjukModal("Ralat", "<p>Gagal baca fail gambar.</p>");
  };
  r.readAsDataURL(f);
}

function buangGambarProfil() {
  gambarProfilBase64 = null;
  const p = document.getElementById("profilGambarPratonton");
  const b = document.getElementById("btnBuangGambar");
  const i = document.getElementById("inputGambar");
  if (p) {
    p.style.backgroundImage = "";
    p.style.removeProperty("--gambar-profil");
    p.classList.remove("ada-gambar");
    const ph = p.querySelector(".profil-gambar-placeholder");
    if (ph) ph.style.display = "block";
  }
  if (b) b.style.display = "none";
  if (i) i.value = "";
}

function sahkanProfil() {
  const g = document.getElementById("inputGelaran").value.trim();
  const n = document.getElementById("inputNama").value.trim();
  const u = parseInt(document.getElementById("inputUmur").value) || 45;
  const b = document.getElementById("inputBio").value.trim();

  if (!n) {
    tunjukModal("Nama Perlu", "<p>Masukkan nama.</p>");
    return;
  }
  if (n.length < 3) {
    tunjukModal("Nama Pendek", "<p>Min 3 aksara.</p>");
    return;
  }
  if (u < 30 || u > 80) {
    tunjukModal("Umur Salah", "<p>30–80 sahaja.</p>");
    return;
  }

  gameState.pemain = { gelaran: g, nama: n, umur: u, bio: b, gambar: gambarProfilBase64 };
  tunjukSkrinKawasan();
}

function kembaliParti() {
  const s1 = document.getElementById("skrinProfil");
  const s2 = document.getElementById("skrinParti");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

// =====================================
// KAWASAN
// =====================================

let kawasanDipilihSementara = null;

function tunjukSkrinKawasan() {
  const s1 = document.getElementById("skrinProfil");
  const s2 = document.getElementById("skrinKawasan");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
  isiTapisNegeri();
  paparSenaraiKawasan();
}

function isiTapisNegeri() {
  const d = document.getElementById("tapisNegeri");
  if (!d) return;
  const s = [...new Set(DATA_KAWASAN.map(k => k.negeri))].sort();
  d.innerHTML = '<option value="semua">Semua Negeri</option>' +
    s.map(n => '<option value="' + escapeHTML(n) + '">' + escapeHTML(n) + '</option>').join("");
}

function paparSenaraiKawasan(negeri, carian) {
  const panel = document.getElementById("senaraiKawasanPilih");
  if (!panel) return;

  let senarai = DATA_KAWASAN;
  if (negeri && negeri !== "semua") senarai = senarai.filter(k => k.negeri === negeri);
  if (carian) {
    const c = carian.toLowerCase();
    senarai = senarai.filter(k => k.nama.toLowerCase().includes(c));
  }

  setTeks("kawasanBilangan", DATA_KAWASAN.length);

  if (senarai.length === 0) {
    panel.innerHTML = "<p class='nota' style='text-align:center;padding:20px'>Tiada kawasan.</p>";
    return;
  }

  panel.innerHTML = senarai.map(k => {
    const c = kawasanDipilihSementara === k.id ? "dipilih" : "";
    return `
      <div class="kad-kawasan ${c}" onclick="pilihKawasanKad('${k.id}')" data-kawasan="${k.id}">
        <p class="kad-kawasan-nama">${escapeHTML(k.nama)}</p>
        <p class="kad-kawasan-negeri">${escapeHTML(k.negeri)}</p>
        <p class="kad-kawasan-mp">MP: ${escapeHTML(k.mp || "Tiada")}</p>
      </div>
    `;
  }).join("");
}

function cariKawasan() {
  const tapis = document.getElementById("tapisNegeri");
  const cari = document.getElementById("carianKawasan");
  paparSenaraiKawasan(tapis ? tapis.value : "semua", cari ? cari.value : "");
}

function tapisKawasanNegeri() { cariKawasan(); }

function pilihKawasanKad(id) {
  kawasanDipilihSementara = id;
  document.querySelectorAll(".kad-kawasan").forEach(k => {
    k.classList.remove("dipilih");
    if (k.dataset.kawasan === id) k.classList.add("dipilih");
  });
  const k = DATA_KAWASAN.find(x => x.id === id);
  setTeks("kawasanPilihan", k ? k.nama + " (" + k.negeri + ")" : "—");
}

function sahkanKawasan() {
  if (!kawasanDipilihSementara) {
    tunjukModal("Belum Pilih", "<p>Pilih kawasan dahulu.</p>");
    return;
  }
  const k = DATA_KAWASAN.find(x => x.id === kawasanDipilihSementara);
  if (!k) return;
  gameState.kawasanPemain = k;
  tunjukSkrinManifesto();
}

function kembaliProfil() {
  const s1 = document.getElementById("skrinKawasan");
  const s2 = document.getElementById("skrinProfil");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

// =====================================
// MANIFESTO & MENGIRA UNDI
// =====================================

let manifestoDipilih = [];

function tunjukSkrinManifesto() {
  const s1 = document.getElementById("skrinKawasan");
  const s2 = document.getElementById("skrinManifesto");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
  manifestoDipilih = [];
  paparSenaraiManifesto();
  kemasKiniButangManifesto();
}

function paparSenaraiManifesto() {
  const panel = document.getElementById("senaraiManifestoPilih");
  if (!panel) return;
  panel.innerHTML = DATA_MANIFESTO.map(m => {
    const c = manifestoDipilih.includes(m.id) ? "dipilih" : "";
    return `
      <div class="kad-manifesto ${c}" onclick="pilihManifestoKad('${m.id}')" data-manifesto="${m.id}">
        <div class="kad-manifesto-check">✓</div>
        <span class="kad-manifesto-kategori">${escapeHTML(m.kategori)}</span>
        <h3 class="kad-manifesto-nama">${escapeHTML(m.nama)}</h3>
        <p class="kad-manifesto-matlamat">${escapeHTML(m.matlamat)}</p>
        <div class="kad-manifesto-meta">
          <span>💰 RM ${m.kos}B</span>
          <span>📅 ${m.tempoh} hari</span>
        </div>
      </div>
    `;
  }).join("");
}

function pilihManifestoKad(id) {
  const i = manifestoDipilih.indexOf(id);
  if (i !== -1) {
    manifestoDipilih.splice(i, 1);
  } else {
    if (manifestoDipilih.length >= 5) {
      tunjukModal("Sudah 5", "<p>Maks 5.</p>");
      return;
    }
    manifestoDipilih.push(id);
  }
  document.querySelectorAll(".kad-manifesto").forEach(k => {
    k.classList.remove("dipilih");
    if (manifestoDipilih.includes(k.dataset.manifesto)) k.classList.add("dipilih");
  });
  kemasKiniButangManifesto();
}

function kemasKiniButangManifesto() {
  setTeks("manifestoBilangan", manifestoDipilih.length);
  const b = document.getElementById("btnSahkanManifesto");
  if (b) b.disabled = manifestoDipilih.length !== 5;
}

function sahkanManifesto() {
  console.log("▶ Butang Sahkan Manifesto ditekan");
  
  if (manifestoDipilih.length !== 5) {
    tunjukModal("Belum 5", "<p>Pilih tepat 5.</p>");
    return;
  }
  gameState.manifesto = manifestoDipilih.map(id => DATA_MANIFESTO.find(m => m.id === id));

  const s1 = document.getElementById("skrinManifesto");
  const s2 = document.getElementById("skrinMengiraUndi");
  
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  let progress = 0;
  const bar = document.getElementById("barMengira");
  const txtStatus = document.getElementById("statusMengira");
  const txtKawasan = document.getElementById("kiraKawasan");
  const txtKerusi = document.getElementById("kiraKerusi");
  const ikon = document.getElementById("meteraiIkon");

  const senaraiStatus = [
    "Menyemak kertas undi...",
    "Mengira undi kawasan bandar...",
    "Mengira undi kawasan luar bandar...",
    "Mengesahkan borang 14...",
    "Menerima keputusan dari Sabah & Sarawak...",
    "Menyusun data kerusi...",
    "Hampir selesai..."
  ];

  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress > 100) progress = 100;

    if (bar) bar.style.width = progress + "%";

    const idx = Math.floor((progress / 100) * senaraiStatus.length);
    if (txtStatus && senaraiStatus[idx]) {
      txtStatus.textContent = senaraiStatus[idx];
    }

    if (txtKawasan) {
      const ksw = Math.floor((progress / 100) * 222);
      txtKawasan.textContent = ksw + " / 222";
    }

    if (txtKerusi) {
      const krsi = Math.floor((progress / 100) * 70); 
      txtKerusi.textContent = krsi;
    }

    if (progress >= 100) {
      clearInterval(interval);
      if (txtStatus) txtStatus.textContent = "Keputusan Rasmi SPR!";
      
      // Animasi Selesai pada kotak gambar
      if (ikon) {
         ikon.src = "images/logo-spr-selesai.png";
         const kotak = ikon.closest('.gambar-mengira-kotak');
         if (kotak) kotak.classList.add("selesai");
         else ikon.classList.add("selesai");
      }
      
      setTimeout(() => {
        if (s2) s2.classList.add("hidden");
        if (typeof jalankanPRPertama === "function") {
          jalankanPRPertama();
        } else {
          console.error("❌ jalankanPRPertama TIDAK dijumpai!");
        }
      }, 1000);
    }
  }, 200);
}

function kembaliKawasan() {
  const s1 = document.getElementById("skrinManifesto");
  const s2 = document.getElementById("skrinKawasan");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");
}

// =====================================
// PROLOG
// =====================================

let prologStepSemasa = 1;
let prologKerusi = 0;

function tunjukSkrinProlog() {
  const s1 = document.getElementById("skrinMengiraUndi");
  const s2 = document.getElementById("skrinProlog");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  prologStepSemasa = 1;
  const rekod = gameState.keputusanPRSemasa;
  prologKerusi = rekod ? rekod.kerusiPemain : 0;
  isiDataProlog();
  paparPrologStep(1);
}

function isiDataProlog() {
  const p = gameState.pemain;
  const parti = gameState.parti;
  if (!p || !parti) return;

  const nama = p.gelaran ? p.gelaran + " " + p.nama : p.nama;

  const berita = document.getElementById("prologBeritaIsi");
  if (berita) {
    berita.innerHTML = "Parti <strong>" + escapeHTML(parti.nama) + "</strong> menang <strong>" +
      prologKerusi + " kerusi</strong> dalam Pilihan Raya Umum ke-15.";
  }

  const sumpah = document.getElementById("prologSumpahTeks");
  if (sumpah) {
    sumpah.innerHTML = "Saya, <strong>" + escapeHTML(nama) + "</strong>, dengan ini mengangkat sumpah " +
      "bahawa saya akan dengan jujur dan setia menjalankan tugas-tugas saya sebagai Perdana Menteri Malaysia.";
  }
}

function paparPrologStep(n) {
  document.querySelectorAll(".prolog-step").forEach(el => {
    el.classList.add("hidden");
  });
  const step = document.querySelector('.prolog-step[data-step="' + n + '"]');
  if (step) {
    step.classList.remove("hidden");
    const gambar = step.querySelector(".prolog-gambar");
    if (gambar) {
      gambar.style.animation = "none";
      setTimeout(() => { gambar.style.animation = ""; }, 10);
    }
  }
}

function prologSeterusnya() {
  if (prologStepSemasa >= 3) {
    prologSelesai();
    return;
  }
  prologStepSemasa++;
  paparPrologStep(prologStepSemasa);
}

function prologSelesai() {
  const s = document.getElementById("skrinProlog");
  if (s) s.classList.add("hidden");
  
  if (typeof tunjukSkrinGabungan === "function") {
    tunjukSkrinGabungan();
  } else {
    console.warn("tunjukSkrinGabungan tidak dijumpai, fallback ke kabinet.");
    if (typeof tunjukSkrinKabinet === "function") tunjukSkrinKabinet();
  }
}

// =====================================
// DASHBOARD & PARLIMEN ASAS
// =====================================

function kiraKerusiSetiapParti() {
  if (gameState.kerusiSemasa) return { ...gameState.kerusiSemasa };
  const k = {};
  DATA_MP.forEach(mp => {
    if (!k[mp.parti]) k[mp.parti] = 0;
    k[mp.parti]++;
  });
  if (gameState.parti) {
    const id = gameState.parti.id;
    k[id] = (k[id] || 0) + 1;
  }
  return k;
}

function kiraPartiKerajaan() {
  if (!gameState.parti) return [];
  const idP = gameState.parti.id;
  const k = kiraKerusiSetiapParti();
  const gabungan = [idP];
  let jumlah = k[idP] || 0;

  const lain = Object.keys(k).filter(id => id !== idP && id !== "Bebas");
  const kat = gameState.parti.kategori;

  lain.sort((a, b) => {
    const pA = DATA_PARTI.find(p => p.id === a);
    const pB = DATA_PARTI.find(p => p.id === b);
    const sA = pA && pA.kategori === kat ? 1 : 0;
    const sB = pB && pB.kategori === kat ? 1 : 0;
    if (sA !== sB) return sB - sA;
    return k[b] - k[a];
  });

  for (const id of lain) {
    if (jumlah >= 112) break;
    gabungan.push(id);
    jumlah += k[id];
  }

  gameState.parlimen.partiKerajaan = gabungan;
  gameState.parlimen.jumlahKerusiGabungan = jumlah;
  return gabungan;
}

function kiraParlimen() {
  const k = kiraKerusiSetiapParti();
  const gab = kiraPartiKerajaan();
  let kerajaan = 0, pembangkang = 0, bebas = 0;

  Object.keys(k).forEach(id => {
    if (id === "Bebas") bebas += k[id];
    else if (gab.includes(id)) kerajaan += k[id];
    else pembangkang += k[id];
  });

  gameState.parlimen = {
    ...gameState.parlimen,
    kerajaan, pembangkang, bebas,
    majoriti: kerajaan - pembangkang,
    statusKerajaan: kerajaan >= 112 ? "majoriti" : "tiada-majoriti"
  };
  return gameState.parlimen;
}

function kemasKiniDashboard() {
  if (gameState.status !== "permainan") return;
  const parlimen = kiraParlimen();

  setTeks("statSokongan", parlimen.kerajaan + " / 222");
  setTeks("statMajoriti", "Majoriti mudah: 112 • Semasa: " + parlimen.majoriti);

  const stat = gameState.statistik;
  setTeks("statKepuasan", Math.round(stat.kepuasanRakyat) + "%");
  setTeks("statKepuasanTrend", trendText(stat.kepuasanRakyat));
  setTeks("statPopulariti", Math.round(stat.popularitiPM) + "%");
  setTeks("statPopularitiTrend", trendText(stat.popularitiPM));
  setTeks("statPrestasi", Math.round(stat.prestasiKerajaan));
  setTeks("statPertumbuhan", formatPeratus(stat.pertumbuhanEkonomi));
  setTeks("statInflasi", formatPeratus(stat.inflasi));
  setTeks("statPengangguran", formatPeratus(stat.pengangguran));
  setTeks("statHasil", formatRM(gameState.ekonomi.hasil));
  setTeks("statHutang", formatRM(gameState.ekonomi.hutang));
  setTeks("statBajet", formatRM(gameState.bajet.tahunan));
  setTeks("statDanaKecemasan", formatRM(gameState.bajet.danaKecemasan));
  setTeks("statBakiHari", Math.max(0, 1825 - gameState.masa.hari));

  if (typeof kiraSentimenKumpulan === "function" && gameState.sentimenKumpulan) {
    kiraSentimenKumpulan();
    const nilai = Object.values(gameState.sentimenKumpulan);
    if (nilai.length > 0) {
      const purata = nilai.reduce((a, b) => a + b, 0) / nilai.length;
      gameState.statistik.kepuasanRakyat = hadkan(
        gameState.statistik.kepuasanRakyat * 0.7 + purata * 0.3, 0, 100
      );
    }
  }
}

function masukPejabatPM() {
  gameState.status = "permainan";
  gameState.masa.hari = 1;

  const param = gameState.paramKesukaran || PARAM_KESUKARAN.normal;
  gameState.statistik.kepuasanRakyat = param.kepuasanMula;
  gameState.statistik.popularitiPM = param.popularitiMula;
  gameState.statistik.prestasiKerajaan = 50;

  gameState.ekonomi = {
    hasil: 320, perbelanjaan: 350, baki: -30,
    hutang: 1500, kdnk: 1800, inflasi: 0, pengangguran: 0
  };

  gameState.statistik.pertumbuhanEkonomi = 4.2 * param.hasilEkonomi;
  gameState.statistik.inflasi = 2.5 / param.hasilEkonomi;
  gameState.statistik.pengangguran = 3.5 / param.sokonganPolitik;

  const jumlahKosManifesto = (gameState.manifesto || []).reduce((t, m) => t + (m.kos || 0), 0);
  gameState.bajet.tahunan = Math.max(100, 350 - jumlahKosManifesto);
  gameState.bajet.danaKecemasan = gameState.bajet.tahunan * 0.05;

  if (typeof inisialisasiBajetKementerian === "function") inisialisasiBajetKementerian();
  if (typeof inisialisasiManifestoAktif === "function") inisialisasiManifestoAktif();

  if (!gameState.sentimenKumpulan) {
    gameState.sentimenKumpulan = { B40: 50, M40: 50, T20: 50, Belia: 50, WargaEmas: 50 };
  }
  if (!gameState.sentimenMedia) {
    gameState.sentimenMedia = { arusPerdana: "neutral", mediaSosial: "neutral", alternatif: "neutral", antarabangsa: "neutral" };
  }
  if (!gameState.beritaSemasa) gameState.beritaSemasa = [];
  if (!gameState.sejarahKempen) gameState.sejarahKempen = [];
  if (!gameState.kempenTerakhir) gameState.kempenTerakhir = null;

  if (typeof janaBeritaMedia === "function") janaBeritaMedia();

  const s = document.getElementById("skrinPelantikan");
  if (s) s.classList.add("hidden");
  const a = document.getElementById("app");
  if (a) a.classList.remove("hidden");

  kemasKiniTopbarMasa();
  kemasKiniTopbarTajuk("ringkasan");
  kemasKiniDashboard();
  kemasKiniTopbarProfil();

  if (gameState.tetapan.autoSave) simpanPermainan(true);

  setTimeout(() => {
    const n = gameState.pemain.gelaran ? gameState.pemain.gelaran + " " + gameState.pemain.nama : gameState.pemain.nama;
    tunjukModal("Selamat Datang, " + n,
      "<p>Anda kini <strong>Perdana Menteri Malaysia</strong>.</p>" +
      "<p>Penggal 5 tahun (1825 hari) bermula.</p>");
  }, 300);
}