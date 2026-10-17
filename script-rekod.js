"use strict";

// =====================================
// MyPM Simulasi - Rekod Pemerintahan
// Fasa 11.0 — timeline keputusan, laporan penggal
// =====================================

// =====================================
// HALAMAN REKOD
// =====================================

function paparHalamanRekod() {
  if (gameState.status !== "permainan") return;

  setTeks("rekodUndian", gameState.sejarahUndian.length);
  setTeks("rekodKabinet", gameState.sejarahKabinet.length);
  setTeks("rekodPeristiwa", gameState.sejarahPeristiwa.length);
  setTeks("rekodKempen", gameState.sejarahKempen.length);
  setTeks("rekodPR", gameState.sejarahPR.length);
  setTeks("rekodHari", gameState.masa.hari);

  const semuaRekod = kumpulSemuaRekod();
  setTeks("rekodBilangan", semuaRekod.length + " rekod");

  paparTimelineRekod(semuaRekod);
}

// =====================================
// KUMPUL SEMUA REKOD
// =====================================

function kumpulSemuaRekod() {
  const semua = [];

  // 1. Mula penggal
  semua.push({
    jenis: "jenis-mula-penggal",
    ikon: "🏛",
    tajuk: "Penggal " + gameState.penggalKe + " Bermula",
    tarikh: kiraTarikh(1),
    hari: 1,
    meta: "Perdana Menteri: " + (gameState.pemain
      ? (gameState.pemain.gelaran
        ? gameState.pemain.gelaran + " " + gameState.pemain.nama
        : gameState.pemain.nama)
      : "—"),
    kesan: "Parti: " + (gameState.parti ? gameState.parti.singkatan : "—")
  });

  // 2. Undian parlimen
  gameState.sejarahUndian.forEach(u => {
    semua.push({
      jenis: u.lulus ? "jenis-undian-lulus" : "jenis-undian-tolak",
      ikon: "⚖",
      tajuk: "RUU: " + u.namaRUU,
      tarikh: u.tarikh,
      hari: u.hari,
      meta: "Kategori: " + u.kategori,
      kesan: (u.lulus ? "✅ Lulus" : "❌ Ditolak") +
        " — " + u.jumlahSetuju + " setuju, " + u.jumlahTolak + " tolak"
    });
  });

  // 3. Kabinet
  gameState.sejarahKabinet.forEach(k => {
    semua.push({
      jenis: k.jenis === "pecat" ? "jenis-kabinet-pecat" : "jenis-kabinet-lantik",
      ikon: k.jenis === "pecat" ? "✕" : "🔄",
      tajuk: k.jenis === "pecat"
        ? "Pecat: " + k.namaMenteri
        : "Lantik: " + k.namaMenteri,
      tarikh: k.tarikh,
      hari: k.hari,
      meta: "Portfolio: " + k.kementerian,
      kesan: k.jenis === "pecat"
        ? "Populariti −5, Prestasi −3"
        : "Kabinet dikemas kini"
    });
  });

  // 4. Peristiwa
  gameState.sejarahPeristiwa.forEach(p => {
    const kelas = p.jenisKesan === "positif" ? "jenis-peristiwa-pos"
      : p.jenisKesan === "negatif" ? "jenis-peristiwa-neg"
      : "jenis-peristiwa-neutral";

    semua.push({
      jenis: kelas,
      ikon: p.ikon || "⚡",
      tajuk: p.nama,
      tarikh: p.tarikh,
      hari: p.hari,
      meta: "Kategori: " + p.kategori,
      kesan: p.mesejFeedback
        ? "📢 " + p.mesejFeedback
        : "Pilihan: " + p.pilihan
    });
  });

  // 5. Kempen media
  gameState.sejarahKempen.forEach(k => {
    const jk = k.jumlahKesan || 0;
    const kelas = jk > 0 ? "jenis-kempen-pos"
      : jk < 0 ? "jenis-kempen-neg"
      : "jenis-peristiwa-neutral";

    semua.push({
      jenis: kelas,
      ikon: k.ikon || "📢",
      tajuk: "Kempen: " + k.nama,
      tarikh: k.tarikh,
      hari: k.hari,
      meta: "Komunikasi PM",
      kesan: "Kesan: " + (jk > 0 ? "+" : "") + jk.toFixed(1)
    });
  });

  // 6. Pilihan raya
  gameState.sejarahPR.forEach(pr => {
    semua.push({
      jenis: pr.menang ? "jenis-pr-menang" : "jenis-pr-kalah",
      ikon: "🗳",
      tajuk: "Pilihan Raya Ke-" + pr.penggalKe + " — " + (pr.menang ? "MENANG" : "KALAH"),
      tarikh: pr.tarikh,
      hari: pr.hari,
      meta: "Sebab: " + (pr.sebab || "—"),
      kesan: "Kerusi: " + pr.kerusiPemain +
        " • Kedudukan: #" + pr.kedudukanParti +
        " • Kawasan: " + (pr.menangKawasan ? "Menang" : "Kalah")
    });
  });

  // 7. Manifesto dinilai
  if (gameState.manifestoDinilai && gameState.manifestoAktif.length > 0) {
    gameState.manifestoAktif.forEach(m => {
      const kmj = kiraKemajuanManifesto(m);
      const berjaya = kmj >= 100;

      semua.push({
        jenis: berjaya ? "jenis-manifesto-berjaya" : "jenis-manifesto-gagal",
        ikon: berjaya ? "✅" : "❌",
        tajuk: "Manifesto: " + m.nama,
        tarikh: kiraTarikh(100),
        hari: 100,
        meta: "Dinilai pada hari 100",
        kesan: berjaya
          ? "Berjaya dicapai"
          : "Gagal mencapai sasaran (" + Math.round(kmj) + "%)"
      });
    });
  }

  // 8. Tamat penggal
  if (gameState.masa.hari >= 1825) {
    semua.push({
      jenis: "jenis-tamat-penggal",
      ikon: "🏁",
      tajuk: "Penggal " + gameState.penggalKe + " Tamat",
      tarikh: kiraTarikh(1825),
      hari: 1825,
      meta: "5 tahun selesai",
      kesan: "Pilihan raya akan dijalankan"
    });
  }

  semua.sort((a, b) => (b.hari || 0) - (a.hari || 0));
  return semua;
}

// =====================================
// PAPAR TIMELINE
// =====================================

function paparTimelineRekod(senarai) {
  const panel = document.getElementById("senaraiRekodTimeline");
  if (!panel) return;

  if (senarai.length === 0) {
    panel.innerHTML = "<p class='nota'>Belum ada rekod. Keputusan anda akan muncul di sini.</p>";
    return;
  }

  let html = "";
  let hariSemasa = -1;

  senarai.forEach(r => {
    if (r.hari !== hariSemasa) {
      hariSemasa = r.hari;
      const tahun = Math.floor(hariSemasa / 365) + 1;
      const labelHari = "Hari " + hariSemasa + " • Tahun " + Math.min(tahun, 5);
      html += `<div class="rekod-pemisah">${escapeHTML(labelHari)}</div>`;
    }
    html += binaKadRekod(r);
  });

  panel.innerHTML = html;
}

function binaKadRekod(r) {
  const meta = [];
  if (r.meta) meta.push("<span>📌 " + escapeHTML(r.meta) + "</span>");

  let kesanHTML = "";
  if (r.kesan) {
    kesanHTML = "<p class='kad-rekod-kesan'>" + escapeHTML(r.kesan) + "</p>";
  }

  return `
    <div class="kad-rekod ${r.jenis}">
      <div class="kad-rekod-ikon">${r.ikon || "•"}</div>
      <div class="kad-rekod-info">
        <p class="kad-rekod-tajuk">${escapeHTML(r.tajuk)}</p>
        <div class="kad-rekod-meta">${meta.join("")}</div>
        ${kesanHTML}
      </div>
      <p class="kad-rekod-tarikh">${escapeHTML(r.tarikh || "")}</p>
    </div>
  `;
}

// =====================================
// JANA LAPORAN PENGGAL
// =====================================

function janaLaporanPenggal() {
  if (gameState.status !== "permainan") {
    tunjukModal("Belum Bermula", "<p>Mulakan permainan dahulu.</p>");
    return;
  }

  const stat = gameState.statistik;
  const eko = gameState.ekonomi;
  const mp = gameState.pemain;

  // Statistik undian
  const jumlahUndian = gameState.sejarahUndian.length;
  const undianLulus = gameState.sejarahUndian.filter(u => u.lulus).length;
  const undianTolak = jumlahUndian - undianLulus;

  // Statistik kabinet
  const jumlahKabinet = gameState.sejarahKabinet.length;
  const jumlahPecat = gameState.sejarahKabinet.filter(k => k.jenis === "pecat").length;
  const jumlahLantik = jumlahKabinet - jumlahPecat;

  // Statistik peristiwa
  const jumlahPeristiwa = gameState.sejarahPeristiwa.length;
  const peristiwaPos = gameState.sejarahPeristiwa.filter(p => p.jenisKesan === "positif").length;
  const peristiwaNeg = gameState.sejarahPeristiwa.filter(p => p.jenisKesan === "negatif").length;

  // Kempen & PR
  const jumlahKempen = gameState.sejarahKempen.length;
  const jumlahPR = gameState.sejarahPR.length;

  // Manifesto
  let manBerjaya = 0, manGagal = 0, manBelum = 0;
  gameState.manifestoAktif.forEach(m => {
    const kmj = kiraKemajuanManifesto(m);
    if (kmj >= 100) manBerjaya++;
    else if (gameState.manifestoDinilai) manGagal++;
    else manBelum++;
  });

  // Sentimen kumpulan
  const kumpulan = gameState.sentimenKumpulan;
  const purataKumpulan = Object.values(kumpulan).reduce((a, b) => a + b, 0)
    / Object.keys(kumpulan).length;

  // Nama PM
  const nama = mp
    ? (mp.gelaran ? mp.gelaran + " " + mp.nama : mp.nama)
    : "Tanpa Nama";

  const parti = gameState.parti ? gameState.parti.nama : "—";
  const kawasan = gameState.kawasanPemain ? gameState.kawasanPemain.nama : "—";

  const kelasPertumbuhan = stat.pertumbuhanEkonomi >= 0 ? "naik" : "turun";

  const html = `
    <div class="laporan-penggal">
      <div class="laporan-penggal-header">
        <p class="laporan-penggal-jatah">LAPORAN</p>
        <h2 class="laporan-penggal-tajuk">Laporan Penggal ${gameState.penggalKe}</h2>
        <p class="laporan-penggal-sub">${escapeHTML(nama)} • ${escapeHTML(parti)}</p>
        <p class="laporan-penggal-sub">Hari ${gameState.masa.hari} daripada 1825</p>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">🏛 Identiti Pemerintahan</p>
        <div class="laporan-penggal-baris"><span>Perdana Menteri</span><strong>${escapeHTML(nama)}</strong></div>
        <div class="laporan-penggal-baris"><span>Parti</span><strong>${escapeHTML(parti)}</strong></div>
        <div class="laporan-penggal-baris"><span>Kawasan</span><strong>${escapeHTML(kawasan)}</strong></div>
        <div class="laporan-penggal-baris"><span>TPM</span><strong>${escapeHTML(gameState.tpm ? gameState.tpm.nama : "—")}</strong></div>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">📊 Prestasi Akhir</p>
        <div class="laporan-penggal-baris"><span>Populariti PM</span><strong>${Math.round(stat.popularitiPM)}%</strong></div>
        <div class="laporan-penggal-baris"><span>Kepuasan Rakyat</span><strong>${Math.round(stat.kepuasanRakyat)}%</strong></div>
        <div class="laporan-penggal-baris"><span>Prestasi Kerajaan</span><strong>${Math.round(stat.prestasiKerajaan)}</strong></div>
        <div class="laporan-penggal-baris"><span>Pertumbuhan Ekonomi</span><strong class="${kelasPertumbuhan}">${formatPeratus(stat.pertumbuhanEkonomi)}</strong></div>
        <div class="laporan-penggal-baris"><span>Inflasi</span><strong>${formatPeratus(stat.inflasi)}</strong></div>
        <div class="laporan-penggal-baris"><span>Pengangguran</span><strong>${formatPeratus(stat.pengangguran)}</strong></div>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">💰 Kewangan Negara</p>
        <div class="laporan-penggal-baris"><span>KDNK</span><strong>${formatRM(eko.kdnk)}</strong></div>
        <div class="laporan-penggal-baris"><span>Hasil Kerajaan</span><strong>${formatRM(eko.hasil)}</strong></div>
        <div class="laporan-penggal-baris"><span>Perbelanjaan</span><strong>${formatRM(eko.perbelanjaan)}</strong></div>
        <div class="laporan-penggal-baris"><span>Hutang Negara</span><strong>${formatRM(eko.hutang)}</strong></div>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">🗳 Prestasi Politik</p>
        <div class="laporan-penggal-baris"><span>Undian Parlimen</span><strong>${jumlahUndian} (${undianLulus} lulus, ${undianTolak} tolak)</strong></div>
        <div class="laporan-penggal-baris"><span>Tindakan Kabinet</span><strong>${jumlahKabinet} (${jumlahLantik} lantik, ${jumlahPecat} pecat)</strong></div>
        <div class="laporan-penggal-baris"><span>Pilihan Raya</span><strong>${jumlahPR}</strong></div>
        <div class="laporan-penggal-baris"><span>Peristiwa Ditangani</span><strong>${jumlahPeristiwa} (${peristiwaPos} positif, ${peristiwaNeg} negatif)</strong></div>
        <div class="laporan-penggal-baris"><span>Kempen Komunikasi</span><strong>${jumlahKempen}</strong></div>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">📋 Manifesto 100 Hari</p>
        <div class="laporan-penggal-baris"><span>Berjaya</span><strong style="color:#4ade80">${manBerjaya}</strong></div>
        <div class="laporan-penggal-baris"><span>Gagal</span><strong style="color:#fca5a5">${manGagal}</strong></div>
        <div class="laporan-penggal-baris"><span>Masih Berjalan</span><strong>${manBelum}</strong></div>
        <div class="laporan-penggal-pencapaian" style="margin-top:10px">
          ${gameState.manifestoAktif.map(m => {
            const kmj = kiraKemajuanManifesto(m);
            const status = kmj >= 100
              ? "✅ Berjaya"
              : gameState.manifestoDinilai
                ? "❌ Gagal"
                : "⏳ Berjalan";
            return `<div class="laporan-penggal-pencapaian-item"><strong>${escapeHTML(m.nama)}</strong> — ${status} (${Math.round(kmj)}%)</div>`;
          }).join("")}
        </div>
      </div>

      <div class="laporan-penggal-seksyen">
        <p class="laporan-penggal-tajuk-seksyen">👥 Sentimen Kumpulan Rakyat</p>
        <div class="laporan-penggal-baris"><span>Purata Kepuasan</span><strong>${Math.round(purataKumpulan)}%</strong></div>
        ${Object.keys(DEFINISI_KUMPULAN).map(id => {
          const k = DEFINISI_KUMPULAN[id];
          const nilai = gameState.sentimenKumpulan[id] || 50;
          const tahap = tahapKepuasan(nilai);
          return `<div class="laporan-penggal-baris"><span>${k.ikon} ${escapeHTML(k.nama)}</span><strong>${Math.round(nilai)} (${labelTahapKepuasan(tahap)})</strong></div>`;
        }).join("")}
      </div>

      <div class="laporan-penggal-aksi">
        <button class="btn-undi-batal" onclick="tutupModal()">Tutup</button>
      </div>
    </div>
  `;

  tunjukModal("Laporan Penggal " + gameState.penggalKe, html);
  if (gameState.tetapan.autoSave) simpanPermainan(true);
}