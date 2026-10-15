"use strict";

// =====================================
// MyPM SIMULASI - SISTEM NEGARA
// =====================================

// 1. STATISTIK NEGARA
let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

let kdnk = 1.8;
let inflasi = 2.5;
let pengangguran = 3.5;
let hutang = 1.2;

// 2. KOMPOSISI PARLIMEN
const kerusiKerajaan = 120;
const kerusiPembangkang = 92;
const jumlahKerusi = 222;
const majoritiMudah = 112;

const ahliBebas = [
  { id: 1, nama: "Ahli Parlimen Bebas 1", personaliti: "Mesra pembangunan", keutamaan: "pembangunan", status: "neutral" },
  { id: 2, nama: "Ahli Parlimen Bebas 2", personaliti: "Mementingkan reformasi", keutamaan: "dasar", status: "neutral" },
  { id: 3, nama: "Ahli Parlimen Bebas 3", personaliti: "Berhati-hati", keutamaan: "belanjawan", status: "neutral" },
  { id: 4, nama: "Ahli Parlimen Bebas 4", personaliti: "Mesra rakyat", keutamaan: "pembangunan", status: "neutral" },
  { id: 5, nama: "Ahli Parlimen Bebas 5", personaliti: "Pencinta reformasi", keutamaan: "dasar", status: "neutral" },
  { id: 6, nama: "Ahli Parlimen Bebas 6", personaliti: "Mementingkan kewangan", keutamaan: "belanjawan", status: "neutral" },
  { id: 7, nama: "Ahli Parlimen Bebas 7", personaliti: "Pragmatik", keutamaan: "pembangunan", status: "neutral" },
  { id: 8, nama: "Ahli Parlimen Bebas 8", personaliti: "Tegas tentang dasar", keutamaan: "dasar", status: "neutral" },
  { id: 9, nama: "Ahli Parlimen Bebas 9", personaliti: "Sangat berhati-hati", keutamaan: "belanjawan", status: "neutral" },
  { id: 10, nama: "Ahli Parlimen Bebas 10", personaliti: "Suka berunding", keutamaan: "pembangunan", status: "neutral" }
];

const tawaran = {
  pembangunan: {
    nama: "Pembangunan kawasan",
    penerangan: "Komitmen projek infrastruktur untuk kawasan beliau."
  },
  dasar: {
    nama: "Komitmen dasar",
    penerangan: "Komitmen untuk meneliti cadangan dasar beliau."
  },
  belanjawan: {
    nama: "Sokongan belanjawan",
    penerangan: "Komitmen mempertimbangkan keperluan kawasan melalui proses belanjawan."
  }
};

// 3. SISTEM UNDIAN
let sejarahUndian = [];
let nomborUndian = 0;
const hadSejarahUndian = 20;

function undiAhliBebas(ahli, jenisUsul) {
  if (ahli.status === "menyokong") return "menyokong";
  if (ahli.status === "menolak") return "menentang";

  const sepadan = ahli.keutamaan === jenisUsul;
  const peluangSokong = sepadan ? 0.65 : 0.35;
  const rawak = Math.random();

  if (rawak < peluangSokong) return "menyokong";
  if (rawak < peluangSokong + 0.25) return "berkecuali";
  return "menentang";
}

function jalankanUndian() {
  const namaUsul = document.getElementById("namaUsul");
  const jenisUsul = document.getElementById("jenisUsul");
  const hasilUndian = document.getElementById("hasilUndian");

  if (!namaUsul || !jenisUsul || !hasilUndian) {
    alert("Panel undian belum tersedia.");
    return;
  }

  const nama = namaUsul.value.trim();
  const jenis = jenisUsul.value;

  if (!nama) {
    alert("Sila masukkan nama usul terlebih dahulu.");
    namaUsul.focus();
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(tawaran, jenis)) {
    alert("Jenis usul tidak sah.");
    return;
  }

  const undiBebas = { menyokong: 0, menentang: 0, berkecuali: 0 };

  ahliBebas.forEach(ahli => {
    undiBebas[undiAhliBebas(ahli, jenis)]++;
  });

  const jumlahSokong = kerusiKerajaan + undiBebas.menyokong;
  const jumlahTolak = kerusiPembangkang + undiBebas.menentang;
  const jumlahBerkecuali = undiBebas.berkecuali;

  const lulus = jumlahSokong >= majoritiMudah;

  nomborUndian++;

  const keputusan = {
    nombor: nomborUndian,
    nama: nama,
    jenis: jenis,
    sokong: jumlahSokong,
    tolak: jumlahTolak,
    berkecuali: jumlahBerkecuali,
    lulus: lulus,
    masa: new Date().toLocaleString("ms-MY")
  };

  sejarahUndian.unshift(keputusan);

  if (sejarahUndian.length > hadSejarahUndian) {
    sejarahUndian = sejarahUndian.slice(0, hadSejarahUndian);
  }

  if (lulus) {
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    kestabilan = hadkan(kestabilan - 4);
    populariti = hadkan(populariti - 2);
  }

  kemasKiniPaparan();

  hasilUndian.innerHTML = `
    <div class="stat hasil">
      <h3>Keputusan Undian #${keputusan.nombor}</h3>
      <p><strong>Usul:</strong> ${escapeHTML(nama)}</p>
      <p><strong>Kategori:</strong> ${escapeHTML(tawaran[jenis].nama)}</p>
      <p class="keputusan-${lulus ? "lulus" : "tolak"}">
        ${lulus ? "USUL DILULUSKAN" : "USUL DITOLAK"}
      </p>
      <p>Undi menyokong: ${jumlahSokong}</p>
      <p>Undi menentang: ${jumlahTolak}</p>
      <p>Undi berkecuali: ${jumlahBerkecuali}</p>
      <p>Majoriti diperlukan: ${majoritiMudah}</p>
      <p>${lulus
        ? "Kerajaan berjaya meluluskan usul."
        : "Kerajaan gagal mendapatkan sokongan mencukupi."}</p>
    </div>
  `;

  kemasKiniSejarahUndian();
  namaUsul.value = "";
  namaUsul.focus();
}

function escapeHTML(teks) {
  return String(teks).replace(/[&<>"']/g, aksara => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[aksara]);
}

function kemasKiniSejarahUndian() {
  const paparan = document.getElementById("sejarahUndian");
  if (!paparan) return;

  if (sejarahUndian.length === 0) {
    paparan.innerHTML = "<p>Belum ada rekod undian.</p>";
    return;
  }

  paparan.innerHTML = sejarahUndian.map(item => `
    <div class="stat sejarah">
      <h3>Undian #${item.nombor}: ${escapeHTML(item.nama)}</h3>
      <p class="keputusan-${item.lulus ? "lulus" : "tolak"}">
        ${item.lulus ? "Diluluskan" : "Ditolak"}
      </p>
      <p>Sokong: ${item.sokong} | Tolak: ${item.tolak} | Berkecuali: ${item.berkecuali}</p>
      <small>${escapeHTML(item.masa)}</small>
    </div>
  `).join("");
}

// 4. FUNGSI SOKONGAN
function hadkan(nilai, minimum = 0, maksimum = 100) {
  return Math.max(minimum, Math.min(maksimum, nilai));
}

function kemasKiniPaparan() {
  const paparan = {
    populariti: populariti + "%",
    ekonomi: ekonomi,
    kestabilan: kestabilan,
    kdnk: "RM " + kdnk.toFixed(2) + "T",
    inflasi: inflasi.toFixed(1) + "%",
    pengangguran: pengangguran.toFixed(1) + "%",
    hutang: "RM " + hutang.toFixed(2) + "T"
  };

  Object.entries(paparan).forEach(([id, nilai]) => {
    const elemen = document.getElementById(id);
    if (elemen) elemen.textContent = nilai;
  });
}

// 5. TINDAKAN KERAJAAN
function buatKeputusan(jenis) {
  const mesej = document.getElementById("mesej");

  if (jenis === "ekonomi") {
    ekonomi = hadkan(ekonomi + 8);
    populariti = hadkan(populariti + 3);
    kestabilan = hadkan(kestabilan + 2);
    kdnk += 0.03;
    inflasi = Math.max(0, inflasi - 0.1);
    pengangguran = Math.max(0, pengangguran - 0.1);
    hutang += 0.02;

    if (mesej) mesej.textContent =
      "Pelan Ekonomi diumumkan. Ekonomi meningkat.";
  } else if (jenis === "rakyat") {
    populariti = hadkan(populariti + 8);
    ekonomi = hadkan(ekonomi - 2);
    kestabilan = hadkan(kestabilan + 2);
    inflasi += 0.1;
    hutang += 0.04;

    if (mesej) mesej.textContent =
      "Bantuan Rakyat diumumkan. Populariti meningkat, hutang bertambah.";
  } else if (jenis === "reformasi") {
    kestabilan = hadkan(kestabilan + 8);
    populariti = hadkan(populariti + 2);
    ekonomi = hadkan(ekonomi + 2);
    pengangguran = Math.max(0, pengangguran - 0.1);

    if (mesej) mesej.textContent =
      "Reformasi dilaksanakan. Kestabilan meningkat.";
  }

  kemasKiniPaparan();
}

// 6. DIALOG RUNDINGAN
function dialogRespons(ahli, jenisTawaran, berjaya) {
  if (berjaya) {
    const dialog = {
      pembangunan: "Saya menghargai komitmen pembangunan kawasan. Saya bersedia menyokong kerajaan buat masa ini.",
      dasar: "Komitmen terhadap cadangan dasar saya meyakinkan. Saya bersedia memberikan sokongan.",
      belanjawan: "Saya berpuas hati dengan kesediaan kerajaan mempertimbangkan keperluan kawasan melalui proses belanjawan."
    };

    return "“" + dialog[jenisTawaran] + "”";
  }

  const dialogGagal = {
    pembangunan: "Saya masih belum yakin keperluan kawasan saya akan diberi perhatian.",
    dasar: "Saya perlukan komitmen dasar yang lebih jelas.",
    belanjawan: "Saya belum berpuas hati dengan penjelasan belanjawan."
  };

  return "“" + dialogGagal[jenisTawaran] + "”";
}

// 7. RUNDING AHLI BEBAS
function rundingAhli(id, jenisTawaran) {
  const ahli = ahliBebas.find(item => item.id === id);

  if (!ahli || ahli.status !== "neutral") return;
  if (!Object.prototype.hasOwnProperty.call(tawaran, jenisTawaran)) return;

  const sepadan = ahli.keutamaan === jenisTawaran;
  const berjaya = Math.random() < (sepadan ? 0.8 : 0.3);

  ahli.status = berjaya ? "menyokong" : "menolak";

  if (berjaya) {
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    kestabilan = hadkan(kestabilan - 1);
    populariti = hadkan(populariti - 1);
  }

  const hasil = document.getElementById("statusRundingan");

  if (hasil) {
    hasil.textContent =
      ahli.nama + " (" + ahli.personaliti + "). " +
      "Tawaran: " + tawaran[jenisTawaran].nama + ". " +
      dialogRespons(ahli, jenisTawaran, berjaya) +
      (berjaya ? " Rundingan berjaya." : " Rundingan gagal.");
  }

  kemasKiniPaparan();
  kemasKiniParlimen();
}

// 8. PUSINGAN RUNDINGAN BAHARU
function pusinganRundinganBaharu() {
  ahliBebas.forEach(ahli => ahli.status = "neutral");

  kemasKiniParlimen();

  const hasil = document.getElementById("statusRundingan");
  if (hasil) {
    hasil.textContent =
      "Pusingan baharu bermula. Semua Ahli Parlimen Bebas boleh dirunding semula.";
  }
}

// 9. PAPARAN PARLIMEN DAN RUNDINGAN
function kemasKiniParlimen() {
  const menyokong = ahliBebas.filter(a => a.status === "menyokong").length;
  const sokongan = kerusiKerajaan + menyokong;

  const nilai = {
    kerusiKerajaan: kerusiKerajaan,
    kerusiPembangkang: kerusiPembangkang,
    kerusiBebas: ahliBebas.length,
    sokonganKerajaan: sokongan + " / " + jumlahKerusi,
    majoritiParlimen: sokongan + " / " + jumlahKerusi,
    statusMajoriti: sokongan >= majoritiMudah ? "Majoriti" : "Tiada majoriti"
  };

  Object.entries(nilai).forEach(([id, teks]) => {
    const elemen = document.getElementById(id);
    if (elemen) elemen.textContent = teks;
  });

  const senarai = document.getElementById("senaraiBebas");
  if (!senarai) return;

  senarai.innerHTML = ahliBebas.map(ahli => {
    const status = ahli.status === "menyokong"
      ? "Menyokong kerajaan"
      : ahli.status === "menolak"
        ? "Menolak tawaran"
        : "Belum dirunding";

    const kelasStatus = ahli.status === "menyokong"
      ? "status-sokong"
      : ahli.status === "menolak"
        ? "status-tolak"
        : "status-neutral";

    const kawalan = ahli.status === "neutral" ? `
      <label for="tawaran-${ahli.id}">Pilih tawaran:</label>
      <select id="tawaran-${ahli.id}">
        <option value="pembangunan">Pembangunan kawasan</option>
        <option value="dasar">Komitmen dasar</option>
        <option value="belanjawan">Sokongan belanjawan</option>
      </select>
      <p class="nota">${ahli.personaliti}. Keutamaan: ${tawaran[ahli.keutamaan].nama}.</p>
      <button onclick="rundingAhli(${ahli.id}, document.getElementById('tawaran-${ahli.id}').value)">
        Hantar tawaran
      </button>
    ` : "<p class=\"nota\">Rundingan selesai untuk pusingan ini.</p>";

    return `
      <div class="stat ahli">
        <h3>${ahli.nama}</h3>
        <p class="${kelasStatus}">${status}</p>
        ${kawalan}
      </div>
    `;
  }).join("");

  const butang = document.createElement("button");
  butang.textContent = "Mulakan Pusingan Rundingan Baharu";
  butang.className = "sekunder";
  butang.onclick = pusinganRundinganBaharu;
  senarai.appendChild(butang);
}

// 10. MULAKAN APLIKASI
document.addEventListener("DOMContentLoaded", () => {
  kemasKiniPaparan();
  kemasKiniParlimen();
  kemasKiniSejarahUndian();
});
