"use strict";

// =====================================
// MyPM SIMULASI - SISTEM NEGARA
// Fasa 2.1: Integrasi kecenderungan
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
  { id: 1, nama: "Ahli Parlimen Bebas 1", personaliti: "Mesra pembangunan", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false },
  { id: 2, nama: "Ahli Parlimen Bebas 2", personaliti: "Mementingkan reformasi", keutamaan: "dasar", kecenderungan: 0, dirunding: false },
  { id: 3, nama: "Ahli Parlimen Bebas 3", personaliti: "Berhati-hati", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false },
  { id: 4, nama: "Ahli Parlimen Bebas 4", personaliti: "Mesra rakyat", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false },
  { id: 5, nama: "Ahli Parlimen Bebas 5", personaliti: "Pencinta reformasi", keutamaan: "dasar", kecenderungan: 0, dirunding: false },
  { id: 6, nama: "Ahli Parlimen Bebas 6", personaliti: "Mementingkan kewangan", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false },
  { id: 7, nama: "Ahli Parlimen Bebas 7", personaliti: "Pragmatik", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false },
  { id: 8, nama: "Ahli Parlimen Bebas 8", personaliti: "Tegas tentang dasar", keutamaan: "dasar", kecenderungan: 0, dirunding: false },
  { id: 9, nama: "Ahli Parlimen Bebas 9", personaliti: "Sangat berhati-hati", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false },
  { id: 10, nama: "Ahli Parlimen Bebas 10", personaliti: "Suka berunding", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false }
];

// =====================================
// 2b. MODEL MP INDIVIDU (Kerajaan & Pembangkang)
// =====================================

// Parameter individu MP
const paramMP = {
  hadirKerajaan: 0.95,
  hadirPembangkang: 0.90,
  disiplinKerajaan: 0.95,
  disiplinPembangkang: 0.95,
  maksKecenderungan: 3
};
// =====================================
// 2c. FUNGSI UNDI MP INDIVIDU
// =====================================

// Tentukan undi satu MP kerajaan atau pembangkang
// berdasarkan afiliasi, disiplin parti, dan kecenderungan peribadi
function undiMPParti(mp) {
  // Tentukan hadir atau tidak
  const peluangHadir = mp.afiliasi === "kerajaan"
    ? paramMP.hadirKerajaan
    : paramMP.hadirPembangkang;

  mp.hadir = Math.random() < peluangHadir;

  if (!mp.hadir) {
    mp.undi = "absen";
    return mp;
  }

  // Tentukan undi ikut afiliasi
  // Kerajaan: sokong melainkan kecenderungan peribadi menolak
  // Pembangkang: tolak melainkan kecenderungan peribadi menyokong
  const disiplin = mp.afiliasi === "kerajaan"
    ? paramMP.disiplinKerajaan
    : paramMP.disiplinPembangkang;

  // Kesan kecenderungan peribadi
  // kecenderungan positif → lebih cenderung sokong
  // kecenderungan negatif → lebih cenderung tolak
  let peluangSokong;

  if (mp.afiliasi === "kerajaan") {
    peluangSokong = disiplin
      + (mp.kecenderungan * 0.05);
  } else {
    // Pembangkang: asas 1 - disiplin
    peluangSokong = (1 - disiplin)
      + (mp.kecenderungan * 0.05);
  }

  peluangSokong = Math.max(0, Math.min(1, peluangSokong));

  const rawak = Math.random();

  if (rawak < peluangSokong) {
    mp.undi = "menyokong";
  } else {
    mp.undi = "menentang";
  }

  return mp;
}

// Undi semua MP kerajaan & pembangkang
function undiSemuaMPParti() {
  mpKerajaan.forEach(mp => undiMPParti(mp));
  mpPembangkang.forEach(mp => undiMPParti(mp));
}

// Jana satu MP individu
function janaMP(afiliasi, id) {
  return {
    id: id,
    afiliasi: afiliasi,          // "kerajaan" atau "pembangkang"
    kecenderungan: 0,            // -3 … +3 (0 = ikut parti)
    hadir: true,                 // dikira semasa undian
    undi: "belum"                // "menyokong" | "menentang" | "berkecuali"
  };
}

// Jana senarai MP kerajaan (120)
const mpKerajaan = [];
for (let i = 1; i <= 120; i++) {
  mpKerajaan.push(janaMP("kerajaan", i));
}

// Jana senarai MP pembangkang (92)
const mpPembangkang = [];
for (let i = 1; i <= 92; i++) {
  mpPembangkang.push(janaMP("pembangkang", i));
}

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

// Parameter undian (boleh dilaras)
const paramUndian = {
  peluangSokongSepadan: 0.70,
  peluangSokongTakSepadan: 0.30,
  peluangBerkecuali: 0.20,
  kesanKecenderungan: 0.10,
  maksKecenderungan: 3,
  kesanRundingBerjaya: 2,
  kesanRundingGagal: -1
};

// 3. SISTEM UNDIAN
let sejarahUndian = [];
let nomborUndian = 0;
const hadSejarahUndian = 20;

// Label status (paparan sahaja)
function labelStatus(ahli) {
  // Berdasarkan kecenderungan
  if (ahli.kecenderungan >= 2) {
    return { teks: "Menyokong kerajaan", kelas: "status-sokong" };
  }
  if (ahli.kecenderungan <= -2) {
    return { teks: "Menentang kerajaan", kelas: "status-tolak" };
  }
  // Kecenderungan neutral
  if (ahli.dirunding) {
    return { teks: "Sudah dirunding", kelas: "status-neutral" };
  }
  return { teks: "Belum dirunding", kelas: "status-neutral" };
}

function undiAhliBebas(ahli, jenisUsul) {
  const sepadan = ahli.keutamaan === jenisUsul;

  let peluangSokong = sepadan
    ? paramUndian.peluangSokongSepadan
    : paramUndian.peluangSokongTakSepadan;

  peluangSokong += ahli.kecenderungan * paramUndian.kesanKecenderungan;
  peluangSokong = Math.max(0, Math.min(1, peluangSokong));

  const rawak = Math.random();

  if (rawak < peluangSokong) {
    return {
      undi: "menyokong",
      sebab: sepadan
        ? "Usul sepadan dengan keutamaan"
        : "Bersedia memberi peluang"
    };
  }

  if (rawak < peluangSokong + paramUndian.peluangBerkecuali) {
    return { undi: "berkecuali", sebab: "Belum yakin" };
  }

  return {
    undi: "menentang",
    sebab: sepadan
      ? "Masih ragu walaupun sepadan"
      : "Usul tidak sepadan dengan keutamaan"
  };
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

  // Undi AP Bebas
  const undiBebas = { menyokong: 0, menentang: 0, berkecuali: 0 };
  const sebabBebas = [];

  ahliBebas.forEach(ahli => {
    const hasil = undiAhliBebas(ahli, jenis);
    undiBebas[hasil.undi]++;
    sebabBebas.push({
      id: ahli.id,
      nama: ahli.nama,
      undi: hasil.undi,
      sebab: hasil.sebab
    });
  });

  // Undi MP kerajaan & pembangkang secara individu
  undiSemuaMPParti();

  const sokongKerajaan = mpKerajaan.filter(
    mp => mp.hadir && mp.undi === "menyokong"
  ).length;
  const tolakKerajaan = mpKerajaan.filter(
    mp => mp.hadir && mp.undi === "menentang"
  ).length;
  const absenKerajaan = mpKerajaan.filter(
    mp => !mp.hadir
  ).length;

  const sokongPembangkang = mpPembangkang.filter(
    mp => mp.hadir && mp.undi === "menyokong"
  ).length;
  const tolakPembangkang = mpPembangkang.filter(
    mp => mp.hadir && mp.undi === "menentang"
  ).length;
  const absenPembangkang = mpPembangkang.filter(
    mp => !mp.hadir
  ).length;

  // Jumlah undi sebenar
  const jumlahSokong =
    sokongKerajaan + sokongPembangkang + undiBebas.menyokong;
  const jumlahTolak =
    tolakKerajaan + tolakPembangkang + undiBebas.menentang;
  const jumlahBerkecuali = undiBebas.berkecuali;
  const jumlahHadir =
    jumlahSokong + jumlahTolak + jumlahBerkecuali;
  const jumlahAbsen =
    absenKerajaan + absenPembangkang;

  // Majoriti dikira daripada yang hadir
  const majoritiHadir = Math.floor(jumlahHadir / 2) + 1;

  // Lulus jika sokong > tolak DAN sokong >= majoriti hadir
  const lulus = jumlahSokong > jumlahTolak && jumlahSokong >= majoritiHadir;

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

  // Kesan kepada kestabilan & populariti
  if (lulus) {
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    kestabilan = hadkan(kestabilan - 4);
    populariti = hadkan(populariti - 2);
  }

  // Kesan kepada AP bebas: guna id, bukan indeks
  sebabBebas.forEach(item => {
    const ahli = ahliBebas.find(a => a.id === item.id);
    if (!ahli) return;

    if (item.undi === "menyokong") {
      ahli.kecenderungan = Math.min(
        paramUndian.maksKecenderungan,
        ahli.kecenderungan + 1
      );
    } else if (item.undi === "menentang") {
      ahli.kecenderungan = Math.max(
        -paramUndian.maksKecenderungan,
        ahli.kecenderungan - 1
      );
    }
  });

  kemasKiniPaparan();
  kemasKiniParlimen();

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
      <p>Majoriti diperlukan: ${majoritiHadir}</p>
      <p>Jumlah hadir: ${jumlahHadir}</p>
      <p>Jumlah absen: ${jumlahAbsen}</p>
      <p>${lulus
        ? "Kerajaan berjaya meluluskan usul."
        : "Kerajaan gagal mendapatkan sokongan mencukupi."}</p>
      <details style="margin-top:10px">
        <summary>Lihat pecahan undi AP bebas</summary>
        <ul>
          ${sebabBebas.map(s =>
            `<li>${escapeHTML(s.nama)}: ${escapeHTML(s.undi)} — ${escapeHTML(s.sebab)}</li>`
          ).join("")}
        </ul>
      </details>
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

    // Reformasi menaikkan kecenderungan AP keutamaan "dasar"
    ahliBebas.forEach(ahli => {
      if (ahli.keutamaan === "dasar") {
        ahli.kecenderungan = Math.min(
          paramUndian.maksKecenderungan,
          ahli.kecenderungan + 1
        );
      }
    });

    if (mesej) mesej.textContent =
      "Reformasi dilaksanakan. Kestabilan meningkat.";
  }

  kemasKiniPaparan();
  kemasKiniParlimen();
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

// 7. RUNDING AHLI BEBAS (kecenderungan sebagai penentu tunggal)
function rundingAhli(id, jenisTawaran) {
  const ahli = ahliBebas.find(item => item.id === id);

  if (!ahli || ahli.dirunding) return;
  if (!Object.prototype.hasOwnProperty.call(tawaran, jenisTawaran)) return;

  const sepadan = ahli.keutamaan === jenisTawaran;

  let peluang = sepadan ? 0.8 : 0.3;
  peluang += ahli.kecenderungan * paramUndian.kesanKecenderungan;
  peluang = Math.max(0, Math.min(1, peluang));

  const berjaya = Math.random() < peluang;

  if (berjaya) {
    ahli.kecenderungan = Math.min(
      paramUndian.maksKecenderungan,
      ahli.kecenderungan + paramUndian.kesanRundingBerjaya
    );
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    ahli.kecenderungan = Math.max(
      -paramUndian.maksKecenderungan,
      ahli.kecenderungan + paramUndian.kesanRundingGagal
    );
    kestabilan = hadkan(kestabilan - 1);
    populariti = hadkan(populariti - 1);
  }

  ahli.dirunding = true;

  const hasil = document.getElementById("statusRundingan");

  if (hasil) {
    hasil.textContent =
      ahli.nama + " (" + ahli.personaliti + "). " +
      "Tawaran: " + tawaran[jenisTawaran].nama + ". " +
      dialogRespons(ahli, jenisTawaran, berjaya) +
      (berjaya ? " Rundingan berjaya." : " Rundingan gagal.") +
      " Kecenderungan sekarang: " + ahli.kecenderungan + ".";
  }

  kemasKiniPaparan();
  kemasKiniParlimen();
}

// 8. PUSINGAN RUNDINGAN BAHARU (reset dirunding sahaja)
function pusinganRundinganBaharu() {
  ahliBebas.forEach(ahli => {
    ahli.dirunding = false;
  });

  kemasKiniParlimen();

  const hasil = document.getElementById("statusRundingan");
  if (hasil) {
    hasil.textContent =
      "Pusingan baharu bermula. Semua Ahli Parlimen Bebas boleh dirunding semula. Kecenderungan mereka kekal dari pusingan lepas.";
  }
}

// 9. PAPARAN PARLIMEN DAN RUNDINGAN
function kemasKiniParlimen() {
  // Sokongan dikira dari kecenderungan ≥ 2
  const menyokong = ahliBebas.filter(a => a.kecenderungan >= 2).length;
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
    const label = labelStatus(ahli);

    const kawalan = !ahli.dirunding ? `
      <label for="tawaran-${ahli.id}">Pilih tawaran:</label>
      <select id="tawaran-${ahli.id}">
        <option value="pembangunan">Pembangunan kawasan</option>
        <option value="dasar">Komitmen dasar</option>
        <option value="belanjawan">Sokongan belanjawan</option>
      </select>
      <p class="nota">
        ${ahli.personaliti}. Keutamaan: ${tawaran[ahli.keutamaan].nama}.
        Kecenderungan: ${ahli.kecenderungan}.
      </p>
      <button onclick="rundingAhli(${ahli.id}, document.getElementById('tawaran-${ahli.id}').value)">
        Hantar tawaran
      </button>
    ` : `
      <p class="nota">
        Sudah dirunding pusingan ini.
        Kecenderungan: ${ahli.kecenderungan}.
      </p>
    `;

    return `
      <div class="stat ahli">
        <h3>${ahli.nama}</h3>
        <p class="${label.kelas}">${label.teks}</p>
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
