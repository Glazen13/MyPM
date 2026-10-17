"use strict";

// =====================================
// MyPM Simulasi - Media & Rakyat
// Fasa 11.0 — sentimen kumpulan, sumber media,
// alat komunikasi, kempen, berita
// =====================================

// =====================================
// DEFINISI KUMPULAN RAKYAT
// =====================================

const DEFINISI_KUMPULAN = {
  B40: {
    nama: "B40", penerangan: "Berpendapatan rendah",
    ikon: "👨‍👩‍👧",
    keutamaan: ["kos sara hidup", "bantuan sosial", "perumahan"],
    bobot: {
      inflasi: -0.8, pengangguran: -0.6,
      popularitiPM: 0.3, kepuasanRakyat: 0.5,
      hasil: 0.0, perbelanjaan: 0.2
    }
  },
  M40: {
    nama: "M40", penerangan: "Berpendapatan sederhana",
    ikon: "👨‍💼",
    keutamaan: ["pekerjaan", "cukai", "pendidikan"],
    bobot: {
      inflasi: -0.5, pengangguran: -0.8,
      popularitiPM: 0.4, kepuasanRakyat: 0.4,
      hasil: -0.3, perbelanjaan: 0.1
    }
  },
  T20: {
    nama: "T20", penerangan: "Berpendapatan tinggi",
    ikon: "💼",
    keutamaan: ["ekonomi", "pelaburan", "cukai"],
    bobot: {
      pertumbuhanEkonomi: 0.8, hasil: -0.5,
      popularitiPM: 0.3, kepuasanRakyat: 0.2,
      inflasi: -0.2, pengangguran: -0.2
    }
  },
  Belia: {
    nama: "Belia", penerangan: "Umur 18–40 tahun",
    ikon: "🧑‍🎓",
    keutamaan: ["pekerjaan", "perumahan", "pendidikan"],
    bobot: {
      pengangguran: -1.0, pertumbuhanEkonomi: 0.4,
      popularitiPM: 0.5, kepuasanRakyat: 0.3,
      inflasi: -0.3
    }
  },
  WargaEmas: {
    nama: "Warga Emas", penerangan: "Umur 60 tahun ke atas",
    ikon: "🧓",
    keutamaan: ["kesihatan", "pencen", "keselamatan"],
    bobot: {
      inflasi: -0.6, popularitiPM: 0.3,
      kepuasanRakyat: 0.4, hasil: 0.3,
      perbelanjaan: 0.4
    }
  }
};

// =====================================
// DEFINISI SUMBER MEDIA
// =====================================

const DEFINISI_MEDIA = {
  arusPerdana: {
    nama: "Media Arus Perdana", kategori: "Berita rasmi",
    ikon: "📺",
    deskripsi: "Laporan seimbang dari media arus perdana."
  },
  mediaSosial: {
    nama: "Media Sosial", kategori: "Viral & emosi",
    ikon: "📱",
    deskripsi: "Kandungan viral yang cepat tersebar."
  },
  alternatif: {
    nama: "Media Alternatif", kategori: "Kritikal",
    ikon: "📰",
    deskripsi: "Media bebas yang sering kritikal terhadap kerajaan."
  },
  antarabangsa: {
    nama: "Media Antarabangsa", kategori: "Perspektif luar",
    ikon: "🌏",
    deskripsi: "Pandangan dari luar negara."
  }
};

// =====================================
// DEFINISI ALAT KOMUNIKASI
// =====================================

const DEFINISI_ALAT_KOMUNIKASI = {
  sidangMedia: {
    nama: "Sidang Media", ikon: "🎤", sub: "Rasmi",
    deskripsi: "Sampaikan mesej secara rasmi. Kesan sederhana kepada semua.",
    kesan: { B40: 3, M40: 3, T20: 2, Belia: 1, WargaEmas: 2 },
    publisiti: "tinggi"
  },
  mediaSosial: {
    nama: "Media Sosial", ikon: "📱", sub: "Viral",
    deskripsi: "Capai golongan muda dan bandar.",
    kesan: { B40: 2, M40: 2, T20: 1, Belia: 6, WargaEmas: -1 },
    publisiti: "sederhana"
  },
  wawancara: {
    nama: "Wawancara Eksklusif", ikon: "📻", sub: "Mendalam",
    deskripsi: "Beri penjelasan mendalam tentang dasar.",
    kesan: { B40: 1, M40: 4, T20: 5, Belia: 3, WargaEmas: 2 },
    publisiti: "rendah"
  },
  diam: {
    nama: "Diam Sahaja", ikon: "🤐", sub: "Tidak respons",
    deskripsi: "Tidak beri kenyataan.",
    kesan: { B40: -1, M40: -1, T20: -1, Belia: -1, WargaEmas: -1 },
    publisiti: "tiada"
  }
};

// =====================================
// KIRA SENTIMEN KUMPULAN
// =====================================

function kiraSentimenKumpulan() {
  const s = gameState.statistik;
  const e = gameState.ekonomi;

  Object.keys(DEFINISI_KUMPULAN).forEach(id => {
    const k = DEFINISI_KUMPULAN[id];
    const b = k.bobot;

    // Ambil nilai semasa sebagai asas
    let n = gameState.sentimenKumpulan[id] !== undefined
      ? gameState.sentimenKumpulan[id]
      : 50;

    // Target berdasarkan statistik
    let target = 50;
    if (b.inflasi) target += s.inflasi * b.inflasi * 10;
    if (b.pengangguran) target += s.pengangguran * b.pengangguran * 10;
    if (b.pertumbuhanEkonomi) target += s.pertumbuhanEkonomi * b.pertumbuhanEkonomi * 5;
    if (b.popularitiPM) target += (s.popularitiPM - 50) * b.popularitiPM;
    if (b.kepuasanRakyat) target += (s.kepuasanRakyat - 50) * b.kepuasanRakyat;
    if (b.hasil && e.hasil > 300) target += (e.hasil - 300) * b.hasil * 0.02;
    if (b.perbelanjaan && e.perbelanjaan > 350) {
      target += (e.perbelanjaan - 350) * b.perbelanjaan * 0.02;
    }

    target += (Math.random() - 0.5) * 2;

    // Soft pull: 30% ke arah target, 70% kekal
    n = n * 0.7 + target * 0.3;
    gameState.sentimenKumpulan[id] = hadkan(n, 0, 100);
  });
}

function tahapKepuasan(n) {
  if (n >= 80) return "tinggi";
  if (n >= 65) return "baikk";
  if (n >= 50) return "sederhana";
  if (n >= 35) return "rendah";
  return "kritikal";
}

function labelTahapKepuasan(t) {
  return {
    tinggi: "Sangat Puas", baikk: "Puas",
    sederhana: "Sederhana", rendah: "Kurang Puas", kritikal: "Kecewa"
  }[t] || t;
}

// =====================================
// KIRA SENTIMEN MEDIA
// =====================================

function kiraSentimenMedia() {
  const s = gameState.statistik;

  // Arus perdana — ikut populariti PM
  if (s.popularitiPM >= 65) gameState.sentimenMedia.arusPerdana = "positif";
  else if (s.popularitiPM >= 45) gameState.sentimenMedia.arusPerdana = "neutral";
  else if (s.popularitiPM >= 30) gameState.sentimenMedia.arusPerdana = "negatif";
  else gameState.sentimenMedia.arusPerdana = "kritikal";

  // Media sosial — ikut kepuasan rakyat
  if (s.kepuasanRakyat >= 65) gameState.sentimenMedia.mediaSosial = "positif";
  else if (s.kepuasanRakyat >= 50) gameState.sentimenMedia.mediaSosial = "neutral";
  else if (s.kepuasanRakyat >= 35) gameState.sentimenMedia.mediaSosial = "negatif";
  else gameState.sentimenMedia.mediaSosial = "kritikal";

  // Alternatif — ikut integriti + prestasi
  const it = kiraIntegritiKabinet();
  if (it >= 75 && s.prestasiKerajaan >= 65) gameState.sentimenMedia.alternatif = "neutral";
  else if (it >= 60) gameState.sentimenMedia.alternatif = "negatif";
  else gameState.sentimenMedia.alternatif = "kritikal";

  // Antarabangsa — ikut pertumbuhan ekonomi
  if (s.pertumbuhanEkonomi >= 5) gameState.sentimenMedia.antarabangsa = "positif";
  else if (s.pertumbuhanEkonomi >= 3) gameState.sentimenMedia.antarabangsa = "neutral";
  else gameState.sentimenMedia.antarabangsa = "negatif";
}

// =====================================
// HALAMAN MEDIA
// =====================================

function paparHalamanMedia() {
  kiraSentimenKumpulan();
  paparStatMedia();
  paparSenaraiKumpulanRakyat();
  paparSenaraiSumberMedia();
  paparSenaraiAlatKomunikasi();
  janaBeritaMedia();
  paparSenaraiBeritaMedia();
  paparSejarahKempenMedia();
}

function paparStatMedia() {
  const k = gameState.sentimenKumpulan;
  const j = Object.values(k).reduce((a, b) => a + b, 0);
  const p = j / Object.keys(k).length;

  setTeks("mediaKepuasanNasional", Math.round(p) + "%");
  const el = document.getElementById("mediaKepuasanTrend");
  if (el) {
    if (p >= 65) { el.textContent = "Tinggi"; el.style.color = "#4ade80"; }
    else if (p >= 50) { el.textContent = "Stabil"; el.style.color = ""; }
    else if (p >= 35) { el.textContent = "Menurun"; el.style.color = "#fbbf24"; }
    else { el.textContent = "Rendah"; el.style.color = "#fca5a5"; }
  }

  // Sentimen media keseluruhan
  const sk = { positif: 0, neutral: 0, negatif: 0, kritikal: 0 };
  Object.values(gameState.sentimenMedia).forEach(x => {
    sk[x] = (sk[x] || 0) + 1;
  });

  let su = "neutral";
  if (sk.positif > 2) su = "positif";
  else if (sk.kritikal > 0) su = "kritikal";
  else if (sk.negatif > 2) su = "negatif";

  const ls = {
    positif: "Positif", neutral: "Neutral",
    negatif: "Negatif", kritikal: "Kritikal"
  };

  setTeks("mediaSentimen", ls[su]);
  setTeks("mediaSentimenSub", sk.positif + " positif • " + sk.negatif + " negatif");

  // Isu utama
  const isu = tentukanIsuUtama();
  setTeks("mediaIsuUtama", isu.tajuk);
  setTeks("mediaIsuSub", isu.sub);

  // Kempen terakhir
  const kp = gameState.kempenTerakhir;
  if (kp) {
    setTeks("mediaKempenTerakhir", kp.nama);
    setTeks("mediaKempenSub", kp.tarikh);
  } else {
    setTeks("mediaKempenTerakhir", "—");
    setTeks("mediaKempenSub", "Belum ada");
  }
}

function tentukanIsuUtama() {
  const s = gameState.statistik;
  const e = gameState.ekonomi;
  const i = [];

  if (s.inflasi >= 5) {
    i.push({ sk: s.inflasi * 2, tajuk: "Harga Barang Naik", sub: "Inflasi " + s.inflasi.toFixed(1) + "%" });
  }
  if (s.pengangguran >= 5) {
    i.push({ sk: s.pengangguran * 2, tajuk: "Pengangguran Tinggi", sub: s.pengangguran.toFixed(1) + "%" });
  }
  if (e.kdnk > 0 && e.hutang / e.kdnk > 0.6) {
    i.push({ sk: 30, tajuk: "Hutang Negara", sub: Math.round(e.hutang / e.kdnk * 100) + "% KDNK" });
  }
  if (s.popularitiPM < 40) {
    i.push({ sk: 40, tajuk: "Kepercayaan Rakyat", sub: "Populariti rendah" });
  }

  if (i.length === 0) return { tajuk: "—", sub: "Tiada isu besar" };
  i.sort((a, b) => b.sk - a.sk);
  return i[0];
}

function paparSenaraiKumpulanRakyat() {
  const p = document.getElementById("senaraiKumpulanRakyat");
  if (!p) return;

  p.innerHTML = Object.keys(DEFINISI_KUMPULAN).map(id => {
    const k = DEFINISI_KUMPULAN[id];
    const n = gameState.sentimenKumpulan[id] || 50;
    const t = tahapKepuasan(n);
    const ks = t === "baikk" ? "baikk" : t;

    return `
      <div class="kad-kumpulan-rakyat tahap-${t}">
        <div class="kad-kumpulan-header">
          <div class="kad-kumpulan-info">
            <p class="kad-kumpulan-nama">${k.ikon} ${escapeHTML(k.nama)}</p>
            <p class="kad-kumpulan-penerangan">${escapeHTML(k.penerangan)}</p>
          </div>
          <span class="kad-kumpulan-skor ${ks}">${Math.round(n)}</span>
        </div>
        <div class="kad-kumpulan-bar-wrap">
          <div class="kad-kumpulan-bar-track"><div class="kad-kumpulan-bar-fill ${ks}" style="width:${n}%"></div></div>
        </div>
        <p class="kad-kumpulan-keutamaan"><strong>${labelTahapKepuasan(t)}</strong> — ${k.keutamaan.join(", ")}</p>
      </div>
    `;
  }).join("");
}

function paparSenaraiSumberMedia() {
  const p = document.getElementById("senaraiSumberMedia");
  if (!p) return;
  kiraSentimenMedia();

  p.innerHTML = Object.keys(DEFINISI_MEDIA).map(id => {
    const m = DEFINISI_MEDIA[id];
    const s = gameState.sentimenMedia[id] || "neutral";
    const ls = {
      positif: "Positif", neutral: "Neutral",
      negatif: "Negatif", kritikal: "Kritikal"
    };

    return `
      <div class="kad-sumber-media sentimen-${s}">
        <div class="kad-sumber-header">
          <div class="kad-sumber-ikon">${m.ikon}</div>
          <div class="kad-sumber-info">
            <p class="kad-sumber-nama">${escapeHTML(m.nama)}</p>
            <p class="kad-sumber-kategori">${escapeHTML(m.kategori)}</p>
          </div>
          <span class="kad-sumber-sentimen ${s}">${ls[s]}</span>
        </div>
        <p class="kad-sumber-deskripsi">${escapeHTML(m.deskripsi)}</p>
      </div>
    `;
  }).join("");
}

function paparSenaraiAlatKomunikasi() {
  const p = document.getElementById("senaraiAlatKomunikasi");
  if (!p) return;

  p.innerHTML = Object.keys(DEFINISI_ALAT_KOMUNIKASI).map(id => {
    const a = DEFINISI_ALAT_KOMUNIKASI[id];
    const j = Object.values(a.kesan).reduce((x, y) => x + y, 0);
    const k = j > 0 ? "positif" : j < 0 ? "negatif" : "neutral";

    return `
      <button class="kad-alat-komunikasi" onclick="bukaKempenMedia('${id}')">
        <div class="kad-alat-header">
          <div class="kad-alat-ikon">${a.ikon}</div>
          <div>
            <p class="kad-alat-nama">${escapeHTML(a.nama)}</p>
            <p class="kad-alat-sub">${escapeHTML(a.sub)}</p>
          </div>
        </div>
        <p class="kad-alat-deskripsi">${escapeHTML(a.deskripsi)}</p>
        <div class="kad-alat-kesan">
          <span class="kad-alat-kesan-tag ${k}">${j > 0 ? "Kesan positif" : j < 0 ? "Kesan negatif" : "Neutral"}</span>
        </div>
      </button>
    `;
  }).join("");
}

// =====================================
// KEMPEN MEDIA
// =====================================

function bukaKempenMedia(id) {
  const a = DEFINISI_ALAT_KOMUNIKASI[id];
  if (!a) return;

  const kh = Object.keys(a.kesan).map(idK => {
    const k = DEFINISI_KUMPULAN[idK];
    const n = a.kesan[idK];
    const kl = n > 0 ? "naik" : n < 0 ? "turun" : "";
    return "<li>" + k.ikon + " " + escapeHTML(k.nama) +
      ": <strong class='" + kl + "'>" + (n > 0 ? "+" : "") + n + "</strong></li>";
  }).join("");

  tunjukModal("Kempen Komunikasi", `
    <div class="kempen-preview-box">
      <div class="kempen-preview-header">
        <span class="kempen-preview-ikon">${a.ikon}</span>
        <div class="kempen-preview-tajuk">
          <p class="kempen-preview-nama">${escapeHTML(a.nama)}</p>
          <p class="kempen-preview-kategori">${escapeHTML(a.sub)} • Publisiti: ${escapeHTML(a.publisiti)}</p>
        </div>
      </div>
      <p class="kempen-preview-deskripsi">${escapeHTML(a.deskripsi)}</p>
      <div class="kempen-preview-kesan">
        <strong>Kesan:</strong>
        <ul style="list-style:none;padding:8px 0 0 0;margin:0">${kh}</ul>
      </div>
      <div class="kempen-preview-butang">
        <button class="btn-undi-batal" onclick="tutupModal()">Batal</button>
        <button class="btn-undi" onclick="jalankanKempenMedia('${id}')">📢 Jalankan Kempen</button>
      </div>
    </div>
  `);
}

function jalankanKempenMedia(id) {
  const a = DEFINISI_ALAT_KOMUNIKASI[id];
  if (!a) return;

  // Kesan kepada kumpulan
  Object.keys(a.kesan).forEach(idK => {
    gameState.sentimenKumpulan[idK] = hadkan(
      gameState.sentimenKumpulan[idK] + a.kesan[idK]
    );
  });

  // Kesan kepada populariti
  const jk = Object.values(a.kesan).reduce((x, y) => x + y, 0) / 5;
  gameState.statistik.popularitiPM = hadkan(
    gameState.statistik.popularitiPM + jk * 0.3
  );

  // Selaraskan kepuasan rakyat
  const pk = Object.values(gameState.sentimenKumpulan).reduce((x, y) => x + y, 0) / 5;
  gameState.statistik.kepuasanRakyat = hadkan(
    gameState.statistik.kepuasanRakyat +
    (pk - gameState.statistik.kepuasanRakyat) * 0.3
  );

  // Simpan rekod
  const rekod = {
    idAlat: id,
    nama: a.nama,
    ikon: a.ikon,
    kesan: { ...a.kesan },
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari,
    jumlahKesan: jk
  };
  gameState.sejarahKempen.push(rekod);
  gameState.kempenTerakhir = rekod;

  if (gameState.sejarahKempen.length > 30) {
    gameState.sejarahKempen = gameState.sejarahKempen.slice(-30);
  }

  tutupModal();
  if (gameState.tetapan.autoSave) simpanPermainan(true);

  if (halamanSemasa === "media") paparHalamanMedia();
  if (halamanSemasa === "rekod" && typeof paparHalamanRekod === "function") paparHalamanRekod();
  kemasKiniDashboard();
  tunjukTostSimpan("📢 " + a.nama);
}

function paparSejarahKempenMedia() {
  const p = document.getElementById("sejarahKempenMedia");
  if (!p) return;
  setTeks("mediaSejarahBilangan", gameState.sejarahKempen.length + " rekod");

  if (gameState.sejarahKempen.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada kempen.</p>";
    return;
  }

  p.innerHTML = [...gameState.sejarahKempen].reverse().map(k => {
    const jk = k.jumlahKesan || 0;
    const kl = jk > 0 ? "berjaya" : jk < 0 ? "gagal" : "";
    const kt = Object.keys(k.kesan || {}).map(idK => {
      const def = DEFINISI_KUMPULAN[idK];
      const nama = def ? def.nama : idK;
      return nama + " " + ((k.kesan[idK] || 0) > 0 ? "+" : "") + (k.kesan[idK] || 0);
    }).join(" • ");

    return `
      <div class="kad-sejarah-kempen ${kl}">
        <div class="kad-sejarah-kempen-info">
          <p class="kad-sejarah-kempen-tajuk">${k.ikon || "📢"} ${escapeHTML(k.nama || "Kempen")}</p>
          <p class="kad-sejarah-kempen-meta">${escapeHTML(k.tarikh || "")}</p>
          <p class="kad-sejarah-kempen-kesan">${escapeHTML(kt)}</p>
        </div>
      </div>
    `;
  }).join("");
}

// =====================================
// BERITA SEMASA
// =====================================

function janaBeritaMedia() {
  if (gameState.masa.hari % 7 !== 0) return;

  const b = [];
  const s = gameState.statistik;
  const e = gameState.ekonomi;

  if (s.inflasi >= 5) {
    b.push({ ikon: "🔥", jenis: "negatif", tajuk: "Harga Barang Meningkat", sumber: "Media Arus Perdana", isi: "Inflasi " + s.inflasi.toFixed(1) + "%." });
  } else if (s.inflasi <= 2) {
    b.push({ ikon: "✅", jenis: "positif", tajuk: "Harga Stabil", sumber: "Media Arus Perdana", isi: "Inflasi " + s.inflasi.toFixed(1) + "%." });
  }

  if (s.pertumbuhanEkonomi >= 5) {
    b.push({ ikon: "📈", jenis: "positif", tajuk: "Ekonomi Berkembang", sumber: "Media Antarabangsa", isi: "KDNK " + s.pertumbuhanEkonomi.toFixed(1) + "%." });
  } else if (s.pertumbuhanEkonomi < 2) {
    b.push({ ikon: "📉", jenis: "negatif", tajuk: "Ekonomi Perlahan", sumber: "Media Antarabangsa", isi: "Pertumbuhan " + s.pertumbuhanEkonomi.toFixed(1) + "%." });
  }

  if (s.pengangguran >= 5) {
    b.push({ ikon: "👔", jenis: "negatif", tajuk: "Pengangguran Meningkat", sumber: "Media Sosial", isi: "Pengangguran " + s.pengangguran.toFixed(1) + "%." });
  }

  if (s.popularitiPM >= 65) {
    b.push({ ikon: "⭐", jenis: "positif", tajuk: "PM Dipuji", sumber: "Media Sosial", isi: "Populariti " + Math.round(s.popularitiPM) + "%." });
  } else if (s.popularitiPM <= 35) {
    b.push({ ikon: "⚠️", jenis: "negatif", tajuk: "Kepercayaan Menurun", sumber: "Media Alternatif", isi: "Populariti " + Math.round(s.popularitiPM) + "%." });
  }

  const it = kiraIntegritiKabinet();
  if (it >= 80) {
    b.push({ ikon: "💎", jenis: "positif", tajuk: "Integriti Dipuji", sumber: "Media Alternatif", isi: "Skor " + Math.round(it) + "%." });
  } else if (it <= 50) {
    b.push({ ikon: "🚨", jenis: "negatif", tajuk: "Dakwaan Salah Guna", sumber: "Media Alternatif", isi: "Skor " + Math.round(it) + "%." });
  }

  const nh = e.kdnk > 0 ? (e.hutang / e.kdnk) * 100 : 0;
  if (nh >= 60) {
    b.push({ ikon: "💰", jenis: "negatif", tajuk: "Hutang Membimbangkan", sumber: "Media Arus Perdana", isi: "Nisbah " + nh.toFixed(1) + "%." });
  }

  if (b.length === 0) {
    b.push({ ikon: "📰", jenis: "neutral", tajuk: "Keadaan Terkawal", sumber: "Media Arus Perdana", isi: "Tiada isu besar." });
  }

  b.forEach(x => {
    x.tarikh = kiraTarikh(gameState.masa.hari);
    x.hari = gameState.masa.hari;
    gameState.beritaSemasa.unshift(x);
  });

  if (gameState.beritaSemasa.length > 20) {
    gameState.beritaSemasa = gameState.beritaSemasa.slice(0, 20);
  }
}

function paparSenaraiBeritaMedia() {
  const p = document.getElementById("senaraiBeritaMedia");
  if (!p) return;
  setTeks("mediaBeritaBilangan", gameState.beritaSemasa.length + " berita");

  if (gameState.beritaSemasa.length === 0) {
    p.innerHTML = "<p class='nota'>Belum ada berita.</p>";
    return;
  }

  p.innerHTML = gameState.beritaSemasa.map(b => `
    <div class="kad-berita-media jenis-${b.jenis}">
      <div class="kad-berita-ikon">${b.ikon}</div>
      <div class="kad-berita-info">
        <p class="kad-berita-sumber">${escapeHTML(b.sumber)}</p>
        <p class="kad-berita-tajuk">${escapeHTML(b.tajuk)}</p>
        <p class="kad-berita-isi">${escapeHTML(b.isi)}</p>
        <p class="kad-berita-tarikh">${escapeHTML(b.tarikh)}</p>
      </div>
    </div>
  `).join("");
}