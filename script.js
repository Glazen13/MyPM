"use strict";

// =====================================
// MyPM SIMULASI - SISTEM NEGARA
// Fasa 3.2: Kalendar, Peristiwa & Undian
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
  { id: 1, nama: "Ahli Parlimen Bebas 1", personaliti: "Mesra pembangunan", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 2, nama: "Ahli Parlimen Bebas 2", personaliti: "Mementingkan reformasi", keutamaan: "dasar", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 3, nama: "Ahli Parlimen Bebas 3", personaliti: "Berhati-hati", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 4, nama: "Ahli Parlimen Bebas 4", personaliti: "Mesra rakyat", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 5, nama: "Ahli Parlimen Bebas 5", personaliti: "Pencinta reformasi", keutamaan: "dasar", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 6, nama: "Ahli Parlimen Bebas 6", personaliti: "Mementingkan kewangan", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 7, nama: "Ahli Parlimen Bebas 7", personaliti: "Pragmatik", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 8, nama: "Ahli Parlimen Bebas 8", personaliti: "Tegas tentang dasar", keutamaan: "dasar", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 9, nama: "Ahli Parlimen Bebas 9", personaliti: "Sangat berhati-hati", keutamaan: "belanjawan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" },
  { id: 10, nama: "Ahli Parlimen Bebas 10", personaliti: "Suka berunding", keutamaan: "pembangunan", kecenderungan: 0, dirunding: false, hadir: true, undi: "belum" }
];

// =====================================
// 2b. MODEL MP INDIVIDU
// =====================================

const paramMP = {
  hadirKerajaan: 0.95,
  hadirPembangkang: 0.90,
  disiplinKerajaan: 0.95,
  disiplinPembangkang: 0.95,
  kesanKecenderungan: 0.10,
  maksKecenderungan: 3
};

function janaMP(afiliasi, id) {
  return { id, afiliasi, kecenderungan: 0, hadir: true, undi: "belum" };
}

const mpKerajaan = [];
for (let i = 1; i <= 120; i++) mpKerajaan.push(janaMP("kerajaan", i));

const mpPembangkang = [];
for (let i = 1; i <= 92; i++) mpPembangkang.push(janaMP("pembangkang", i));

// =====================================
// 2c. FUNGSI UNDI MP
// =====================================

function undiMPParti(mp) {
  const peluangHadir = mp.afiliasi === "kerajaan"
    ? paramMP.hadirKerajaan
    : paramMP.hadirPembangkang;

  mp.hadir = Math.random() < peluangHadir;
  if (!mp.hadir) { mp.undi = "absen"; return mp; }

  const disiplin = mp.afiliasi === "kerajaan"
    ? paramMP.disiplinKerajaan
    : paramMP.disiplinPembangkang;

  let peluangSokong;
  if (mp.afiliasi === "kerajaan") {
    peluangSokong = disiplin + (mp.kecenderungan * paramMP.kesanKecenderungan);
  } else {
    peluangSokong = (1 - disiplin) + (mp.kecenderungan * paramMP.kesanKecenderungan);
  }
  peluangSokong = Math.max(0, Math.min(1, peluangSokong));

  mp.undi = Math.random() < peluangSokong ? "menyokong" : "menentang";
  return mp;
}

function undiSemuaMPParti() {
  mpKerajaan.forEach(mp => undiMPParti(mp));
  mpPembangkang.forEach(mp => undiMPParti(mp));
}

const tawaran = {
  pembangunan: { nama: "Pembangunan kawasan", penerangan: "Komitmen projek infrastruktur untuk kawasan beliau." },
  dasar: { nama: "Komitmen dasar", penerangan: "Komitmen untuk meneliti cadangan dasar beliau." },
  belanjawan: { nama: "Sokongan belanjawan", penerangan: "Komitmen mempertimbangkan keperluan kawasan melalui proses belanjawan." }
};

const paramUndian = {
  peluangSokongSepadan: 0.70,
  peluangSokongTakSepadan: 0.30,
  peluangBerkecuali: 0.20,
  kesanKecenderungan: 0.10,
  maksKecenderungan: 3,
  kesanRundingBerjaya: 2,
  kesanRundingGagal: -1,
  hadirBebas: 0.95
};

const paramBelanjawan = {
  kesanLulusKestabilan: 3,
  kesanLulusPopulariti: 2,
  kesanGagalKestabilan: -8,
  kesanGagalPopulariti: -4,
  ambangUndiTidakPercaya: 30
};

// =====================================
// 3. SISTEM UNDIAN
// =====================================

let sejarahUndian = [];
let nomborUndian = 0;
const hadSejarahUndian = 20;

// =====================================
// 3b. KALENDAR & GILIRAN MINGGUAN
// =====================================

const masa = {
  minggu: 1,
  bulan: 1,
  tahun: 1,
  maksMinggu: 260
};

function kiraMasa() {
  masa.bulan = Math.ceil(masa.minggu / 4);
  masa.tahun = Math.ceil(masa.minggu / 52);
}

function kemasKiniKalendar() {
  kiraMasa();

  const elMinggu = document.getElementById("mingguSemasa");
  const elBulan = document.getElementById("bulanSemasa");
  const elTahun = document.getElementById("tahunSemasa");
  const elStatus = document.getElementById("statusMinggu");

  if (elMinggu) elMinggu.textContent = masa.minggu + " / " + masa.maksMinggu;
  if (elBulan) elBulan.textContent = masa.bulan + " / 65";
  if (elTahun) elTahun.textContent = masa.tahun + " / 5";

  if (elStatus) {
    elStatus.textContent =
      "Minggu " + masa.minggu +
      " (Bulan " + masa.bulan +
      ", Tahun " + masa.tahun + ").";
  }
}

function semakPeristiwaMinggu() {
  const peristiwa = [];

  if (masa.minggu % 4 === 0) {
    peristiwa.push({
      jenis: "ekonomi",
      teks: "Laporan ekonomi bulanan akan dikira pada akhir minggu ini."
    });
  }

  if (masa.minggu % 52 === 0) {
    peristiwa.push({
      jenis: "tahun",
      teks: "Tahun penggal baharu bermula."
    });
  }

  if (masa.minggu >= masa.maksMinggu) {
    peristiwa.push({
      jenis: "tamat",
      teks: "Penggal 5 tahun tamat. Pilihan raya akan dijalankan."
    });
  }

  return peristiwa;
}

function kiraEkonomiBulanan() {
  const kestabilanFaktor = (kestabilan - 50) / 100;
  const popularitiFaktor = (populariti - 50) / 200;

  const tumbesaran = 0.005 + (kestabilanFaktor * 0.01);
  kdnk += kdnk * tumbesaran;

  inflasi += (popularitiFaktor * 0.05);
  pengangguran -= (kestabilanFaktor * 0.05);
  hutang += 0.005;

  if (inflasi < 0) inflasi = 0;
  if (pengangguran < 0) pengangguran = 0;
  if (inflasi > 10) inflasi = 10;
  if (pengangguran > 10) pengangguran = 10;

  ekonomi = hadkan(ekonomi + (kestabilanFaktor * 2));
}

function tamatkanMinggu() {
  const peristiwa = semakPeristiwaMinggu();

  let laporanEkonomi = "";
  if (masa.minggu % 4 === 0) {
    kiraEkonomiBulanan();
    laporanEkonomi = "Laporan ekonomi bulanan telah dikira.";
    cetusPeristiwa();
  }

  masa.minggu++;

  if (masa.minggu > masa.maksMinggu) {
    alert("Penggal 5 tahun tamat. Permainan akan berakhir dengan pilihan raya.");
    masa.minggu = masa.maksMinggu;
    return;
  }

  kiraMasa();
  kemasKiniKalendar();
  kemasKiniPaparan();
  kemasKiniParlimen();

  const elStatus = document.getElementById("statusMinggu");
  if (elStatus) {
    let teks = "Minggu " + masa.minggu +
      " (Bulan " + masa.bulan +
      ", Tahun " + masa.tahun + ").";

    if (laporanEkonomi) teks += " " + laporanEkonomi;
    if (peristiwa.length > 0) teks += " " + peristiwa.map(p => p.teks).join(" ");

    elStatus.textContent = teks;
  }

  if (peristiwa.length > 0) {
    const hasil = document.getElementById("hasilUndian");
    if (hasil) {
      hasil.innerHTML = `
        <div class="stat hasil">
          <h3>Peristiwa Minggu ${masa.minggu - 1}</h3>
          ${peristiwa.map(p => `
            <div class="peristiwa-minggu">
              <h4>${escapeHTML(p.jenis.toUpperCase())}</h4>
              <p>${escapeHTML(p.teks)}</p>
            </div>
          `).join("")}
        </div>
      `;
    }
  }
}
// =====================================
// 3g. PARTI POLITIK & GABUNGAN
// =====================================

const senaraiParti = [
  { id: "partiA", nama: "Parti A (PM)", kerusi: 60, afiliasi: "gabungan", hubungan: 80, dirunding: false,
    tuntutan: [
      { jenis: "jawatan", teks: "Menteri Kewangan", selesai: false },
      { jenis: "dasar", teks: "Dasar ekonomi terbuka", selesai: false },
      { jenis: "belanjawan", teks: "Peruntukan pembangunan besar", selesai: false }
    ]
  },
  { id: "partiB", nama: "Parti B", kerusi: 30, afiliasi: "gabungan", hubungan: 65, dirunding: false,
    tuntutan: [
      { jenis: "jawatan", teks: "Menteri Pendidikan", selesai: false },
      { jenis: "dasar", teks: "Reformasi pendidikan", selesai: false },
      { jenis: "belanjawan", teks: "Biasiswa pelajar", selesai: false }
    ]
  },
  { id: "partiC", nama: "Parti C", kerusi: 20, afiliasi: "gabungan", hubungan: 55, dirunding: false,
    tuntutan: [
      { jenis: "jawatan", teks: "Timbalan Menteri", selesai: false },
      { jenis: "dasar", teks: "Dasar pertanian", selesai: false },
      { jenis: "belanjawan", teks: "Subsidi petani", selesai: false }
    ]
  },
  { id: "partiD", nama: "Parti D", kerusi: 10, afiliasi: "gabungan", hubungan: 45, dirunding: false,
    tuntutan: [
      { jenis: "jawatan", teks: "Pengerusi GLC", selesai: false },
      { jenis: "dasar", teks: "Dasar belia", selesai: false },
      { jenis: "belanjawan", teks: "Dana belia", selesai: false }
    ]
  },
  { id: "partiX", nama: "Parti X (Pembangkang)", kerusi: 50, afiliasi: "pembangkang", hubungan: 20, dirunding: false,
    tuntutan: [
      { jenis: "dasar", teks: "Reformasi institusi", selesai: false },
      { jenis: "belanjawan", teks: "Ketelusan belanjawan", selesai: false }
    ]
  },
  { id: "partiY", nama: "Parti Y (Pembangkang)", kerusi: 30, afiliasi: "pembangkang", hubungan: 15, dirunding: false,
    tuntutan: [
      { jenis: "dasar", teks: "Kebebasan media", selesai: false },
      { jenis: "belanjawan", teks: "Sokongan pekerja", selesai: false }
    ]
  },
  { id: "partiZ", nama: "Parti Z (Pembangkang)", kerusi: 12, afiliasi: "pembangkang", hubungan: 10, dirunding: false,
    tuntutan: [
      { jenis: "dasar", teks: "Dasar alam sekitar", selesai: false }
    ]
  }
];

function kiraHubunganParti() {
  const gabungan = senaraiParti.filter(p => p.afiliasi === "gabungan");
  if (gabungan.length === 0) return 0;
  const jumlah = gabungan.reduce((sum, p) => sum + p.hubungan, 0);
  return Math.round(jumlah / gabungan.length);
}

function labelHubungan(nilai) {
  if (nilai >= 70) return { teks: "Baik", kelas: "hubungan-baik" };
  if (nilai >= 40) return { teks: "Sederhana", kelas: "hubungan-sederhana" };
  return { teks: "Teruk", kelas: "hubungan-teruk" };
}

function paparParti() {
  const panel = document.getElementById("senaraiParti");
  if (!panel) return;

  panel.innerHTML = senaraiParti.map(p => {
    const label = labelHubungan(p.hubungan);
    const kelasAfiliasi = p.afiliasi === "gabungan" ? "gabungan" : "pembangkang";

    const tuntutanHTML = p.tuntutan.map(t => `
      <div class="tuntutan-parti">
        <strong>${t.jenis.toUpperCase()}:</strong> ${escapeHTML(t.teks)}
        ${t.selesai ? " ✅" : ""}
      </div>
    `).join("");

    const kawalan = !p.dirunding && p.afiliasi === "gabungan" ? `
      <button onclick="rundingParti('${p.id}')">
        Runding dengan ${escapeHTML(p.nama)}
      </button>
    ` : p.dirunding ? `
      <p class="nota">Sudah dirunding pusingan ini.</p>
    ` : "";

    return `
      <div class="stat parti ${kelasAfiliasi}">
        <h3>${escapeHTML(p.nama)}</h3>
        <p>Kerusi: ${p.kerusi} | Afiliasi: ${p.afiliasi}</p>
        <p>Hubungan: <span class="${label.kelas}">${p.hubungan} (${label.teks})</span></p>
        ${tuntutanHTML}
        ${kawalan}
      </div>
    `;
  }).join("");
}

function rundingParti(idParti) {
  const parti = senaraiParti.find(p => p.id === idParti);
  if (!parti || parti.dirunding) return;
  if (parti.afiliasi !== "gabungan") return;

  const peluang = Math.max(0, Math.min(1, parti.hubungan / 100));
  const tuntutanBelum = parti.tuntutan.find(t => !t.selesai);
  const berjaya = Math.random() < peluang;

  if (berjaya && tuntutanBelum) {
    tuntutanBelum.selesai = true;
    parti.hubungan = Math.min(100, parti.hubungan + 10);
    kestabilan = hadkan(kestabilan + 2);
  } else {
    parti.hubungan = Math.max(0, parti.hubungan - 5);
    kestabilan = hadkan(kestabilan - 1);
  }

  parti.dirunding = true;

  const status = document.getElementById("statusRundinganParti");
  if (status) {
    if (berjaya && tuntutanBelum) {
      status.textContent =
        "Rundingan dengan " + parti.nama + " berjaya. " +
        "Tuntutan dipenuhi: " + tuntutanBelum.teks + ". " +
        "Hubungan kini: " + parti.hubungan + ".";
    } else {
      status.textContent =
        "Rundingan dengan " + parti.nama + " gagal. " +
        "Hubungan kini: " + parti.hubungan + ".";
    }
  }

  paparParti();
  kemasKiniPaparan();
  kemasKiniParlimen();
}

function pusinganPartiBaharu() {
  senaraiParti.forEach(p => { p.dirunding = false; });
  paparParti();

  const status = document.getElementById("statusRundinganParti");
  if (status) {
    status.textContent = "Pusingan rundingan parti baharu bermula.";
  }
}
// =====================================
// 3c. PERISTIWA BERSYARAT
// =====================================

let peristiwaAktif = [];
let sejarahPeristiwa = [];
let nomborPeristiwa = 0;
const hadSejarahPeristiwa = 30;

const katalogPeristiwa = [
  // === POPULARITI ===
  {
    id: "demo_populariti",
    nama: "Demonstrasi Jalanan",
    keterukan: "teruk",
    syarat: (s) => s.populariti < 30,
    keterangan: "Rakyat tidak puas hati dengan kerajaan. Demonstrasi besar berlaku di Kuala Lumpur.",
    pilihan: [
      {
        teks: "Bertemu wakil rakyat",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.kestabilan = hadkan(s.kestabilan - 2); },
        maklumBalas: "PM bertemu wakil rakyat. Populariti naik sedikit, kestabilan turun."
      },
      {
        teks: "Guna kekuatan polis",
        kesan: (s) => { s.populariti = hadkan(s.populariti - 3); s.kestabilan = hadkan(s.kestabilan + 3); },
        maklumBalas: "Polis bertindak. Kestabilan naik, populariti turun."
      }
    ]
  },
  {
    id: "sokongan_merosot",
    nama: "Sokongan Menurun",
    keterukan: "sederhana",
    syarat: (s) => s.populariti < 40 && s.populariti >= 30,
    keterangan: "Tinjauan terkini menunjukkan sokongan kepada kerajaan semakin menurun.",
    pilihan: [
      {
        teks: "Umum bantuan rakyat",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.03; },
        maklumBalas: "Bantuan diumumkan. Populariti naik, hutang bertambah."
      },
      {
        teks: "Kempen media",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 3); },
        maklumBalas: "Kempen media dilancarkan. Populariti naik sedikit."
      }
    ]
  },

  // === KESTABILAN ===
  {
    id: "undi_tidak_percaya",
    nama: "Ancaman Undi Tidak Percaya",
    keterukan: "teruk",
    syarat: (s) => s.kestabilan < 25,
    keterangan: "Pembangkang mengancam untuk membawa undi tidak percaya terhadap PM.",
    pilihan: [
      {
        teks: "Runding dengan parti",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 6); },
        maklumBalas: "Rundingan berjaya. Kestabilan naik."
      },
      {
        teks: "Cabaran terbuka",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 3); s.populariti = hadkan(s.populariti + 2); },
        maklumBalas: "PM cabar pembangkang. Kestabilan turun, populariti naik."
      }
    ]
  },
  {
    id: "gabungan_renggang",
    nama: "Gabungan Renggang",
    keterukan: "sederhana",
    syarat: (s) => s.kestabilan < 40 && s.kestabilan >= 25,
    keterangan: "Rakan gabungan mula tidak puas hati dengan kepimpinan PM.",
    pilihan: [
      {
        teks: "Beri jawatan menteri",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 5); s.populariti = hadkan(s.populariti - 2); },
        maklumBalas: "Jawatan diberi. Kestabilan naik, populariti turun."
      },
      {
        teks: "Tegakkan pendirian",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 2); s.populariti = hadkan(s.populariti + 3); },
        maklumBalas: "PM tegaskan pendirian. Kestabilan turun, populariti naik."
      }
    ]
  },

  // === EKONOMI ===
  {
    id: "krisis_ekonomi",
    nama: "Krisis Ekonomi",
    keterukan: "teruk",
    syarat: (s) => s.ekonomi < 30,
    keterangan: "Ekonomi negara merudum. Pelabur mula menarik diri.",
    pilihan: [
      {
        teks: "Rangsangan ekonomi",
        kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 10); s.hutang += 0.05; },
        maklumBalas: "Rangsangan diumumkan. Ekonomi naik, hutang bertambah."
      },
      {
        teks: "Jimat belanja",
        kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 3); s.populariti = hadkan(s.populariti - 3); },
        maklumBalas: "Langkah berjimat. Ekonomi naik sedikit, populariti turun."
      }
    ]
  },
  {
    id: "harga_naik",
    nama: "Harga Barang Naik",
    keterukan: "sederhana",
    syarat: (s) => s.inflasi > 4,
    keterangan: "Inflasi meningkat. Harga barang keperluan naik mendadak.",
    pilihan: [
      {
        teks: "Kawalan harga",
        kesan: (s) => { s.inflasi = Math.max(0, s.inflasi - 0.8); s.populariti = hadkan(s.populariti + 4); },
        maklumBalas: "Kawalan harga dilaksana. Inflasi turun, populariti naik."
      },
      {
        teks: "Bantuan tunai",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.04; },
        maklumBalas: "Bantuan tunai diberi. Populariti naik, hutang bertambah."
      }
    ]
  },
  {
    id: "pengangguran_tinggi",
    nama: "Pengangguran Meningkat",
    keterukan: "sederhana",
    syarat: (s) => s.pengangguran > 5,
    keterangan: "Kadar pengangguran meningkat. Graduan sukar dapat kerja.",
    pilihan: [
      {
        teks: "Program latihan",
        kesan: (s) => { s.pengangguran = Math.max(0, s.pengangguran - 0.5); s.hutang += 0.02; },
        maklumBalas: "Program latihan dilancarkan. Pengangguran turun."
      },
      {
        teks: "Galak pelaburan",
        kesan: (s) => { s.pengangguran = Math.max(0, s.pengangguran - 0.3); s.ekonomi = hadkan(s.ekonomi + 3); },
        maklumBalas: "Pelaburan digalakkan. Ekonomi naik."
      }
    ]
  },
  {
    id: "hutang_tinggi",
    nama: "Amaran Hutang Negara",
    keterukan: "teruk",
    syarat: (s) => s.hutang > 1.6,
    keterangan: "Hutang negara menghampiri paras bahaya. Agensi penarafan beri amaran.",
    pilihan: [
      {
        teks: "Kurangkan perbelanjaan",
        kesan: (s) => { s.hutang = Math.max(1.0, s.hutang - 0.05); s.populariti = hadkan(s.populariti - 4); s.ekonomi = hadkan(s.ekonomi - 3); },
        maklumBalas: "Perbelanjaan dikurangkan. Hutang turun, populariti & ekonomi turun."
      },
      {
        teks: "Cukai baru",
        kesan: (s) => { s.hutang = Math.max(1.0, s.hutang - 0.08); s.populariti = hadkan(s.populariti - 6); },
        maklumBalas: "Cukai baru diperkenal. Hutang turun, populariti turun."
      }
    ]
  },

  // === PARLIMEN ===
  {
    id: "majoriti_tipis",
    nama: "Majoriti Tipis",
    keterukan: "sederhana",
    syarat: (s) => s.majoritiTipis === true,
    keterangan: "Kerajaan baru sahaja menang undian dengan margin tipis. Pembangkang mula mendesak.",
    pilihan: [
      {
        teks: "Kukuhkan gabungan",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); },
        maklumBalas: "Gabungan dikukuhkan. Kestabilan naik."
      },
      {
        teks: "Abaikan tekanan",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 2); },
        maklumBalas: "Tekanan diabaikan. Kestabilan turun."
      }
    ]
  },
  {
    id: "pemberontakan_mp",
    nama: "Pemberontakan MP Kerajaan",
    keterukan: "teruk",
    syarat: (s) => s.pemberontakanBesar === true,
    keterangan: "Ramai MP kerajaan mengundi menentang usul. Pemberontakan dalaman berlaku.",
    pilihan: [
      {
        teks: "Disiplin MP",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 5); s.populariti = hadkan(s.populariti - 2); },
        maklumBalas: "MP didisiplin. Kestabilan naik, populariti turun."
      },
      {
        teks: "Dengar keluhan",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 3); s.populariti = hadkan(s.populariti + 2); },
        maklumBalas: "Keluhan didengar. Kestabilan & populariti naik sedikit."
      }
    ]
  },

  // === MEDIA ===
  {
    id: "skandal_media",
    nama: "Skandal Media",
    keterukan: "teruk",
    syarat: (s) => s.populariti < 35 && s.kestabilan < 45,
    keterangan: "Media mendedahkan skandal dalam kerajaan. Rakyat mula hilang kepercayaan.",
    pilihan: [
      {
        teks: "Siasatan terbuka",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.kestabilan = hadkan(s.kestabilan - 3); },
        maklumBalas: "Siasatan diumumkan. Populariti naik, kestabilan turun."
      },
      {
        teks: "Nafikan tuduhan",
        kesan: (s) => { s.populariti = hadkan(s.populariti - 4); s.kestabilan = hadkan(s.kestabilan + 2); },
        maklumBalas: "Tuduhan dinafikan. Populariti turun, kestabilan naik sedikit."
      },
      {
        teks: "Saman media",
        kesan: (s) => { s.populariti = hadkan(s.populariti - 6); s.kestabilan = hadkan(s.kestabilan + 3); },
        maklumBalas: "Media disaman. Populariti turun, kestabilan naik."
      }
    ]
  },
  {
    id: "kempen_media_positif",
    nama: "Peluang Media",
    keterukan: "biasa",
    syarat: (s) => s.populariti > 60 && s.ekonomi > 55,
    keterangan: "Media memberi liputan positif terhadap kerajaan. Peluang untuk tingkatkan sokongan.",
    pilihan: [
      {
        teks: "Kempen besar",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.hutang += 0.02; },
        maklumBalas: "Kempen dilancarkan. Populariti naik, hutang naik."
      },
      {
        teks: "Biar semula jadi",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 2); },
        maklumBalas: "Liputan positif berterusan. Populariti naik sedikit."
      }
    ]
  },

  // === DASAR ===
  {
    id: "tuntutan_reformasi",
    nama: "Tuntutan Reformasi",
    keterukan: "sederhana",
    syarat: (s) => s.populariti < 45 && s.kestabilan > 40,
    keterangan: "Rakyat menuntut reformasi dasar. Kerajaan perlu respons.",
    pilihan: [
      {
        teks: "Laksana reformasi",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 8); s.ekonomi = hadkan(s.ekonomi - 3); },
        maklumBalas: "Reformasi dilaksana. Populariti naik, ekonomi turun sedikit."
      },
      {
        teks: "Tangguh dahulu",
        kesan: (s) => { s.populariti = hadkan(s.populariti - 4); },
        maklumBalas: "Reformasi ditangguh. Populariti turun."
      }
    ]
  },
  {
    id: "tuntutan_pembangunan",
    nama: "Tuntutan Pembangunan",
    keterukan: "biasa",
    syarat: (s) => s.ekonomi > 45 && s.populariti < 55,
    keterangan: "Rakyat minta projek pembangunan di kawasan mereka.",
    pilihan: [
      {
        teks: "Luluskan projek",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.03; },
        maklumBalas: "Projek diluluskan. Populariti naik, hutang naik."
      },
      {
        teks: "Kaji dahulu",
        kesan: (s) => { s.populariti = hadkan(s.populariti - 2); s.ekonomi = hadkan(s.ekonomi + 2); },
        maklumBalas: "Projek dikaji. Populariti turun sedikit, ekonomi naik."
      }
    ]
  },

  // === KRISIS LANJUTAN ===
  {
    id: "krisis_kabinet",
    nama: "Krisis Kabinet",
    keterukan: "teruk",
    syarat: (s) => s.kestabilan < 30 && s.populariti < 40,
    keterangan: "Menteri kabinet bergaduh secara terbuka. Kerajaan nampak lemah.",
    pilihan: [
      {
        teks: "Rombak kabinet",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 8); s.populariti = hadkan(s.populariti - 2); },
        maklumBalas: "Kabinet dirombak. Kestabilan naik, populariti turun."
      },
      {
        teks: "Mediasi",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); },
        maklumBalas: "Mediasi dijalankan. Kestabilan naik."
      },
      {
        teks: "Biar selesai sendiri",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 3); s.populariti = hadkan(s.populariti - 2); },
        maklumBalas: "Krisis berterusan. Kestabilan & populariti turun."
      }
    ]
  },
  {
    id: "krisis_antarabangsa",
    nama: "Krisis Antarabangsa",
    keterukan: "sederhana",
    syarat: (s) => s.ekonomi > 50 && s.hutang > 1.3,
    keterangan: "Ketegangan antarabangsa menjejaskan perdagangan Malaysia.",
    pilihan: [
      {
        teks: "Diplomasi",
        kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 3); s.populariti = hadkan(s.populariti + 2); },
        maklumBalas: "Diplomasi berjaya. Ekonomi & populariti naik."
      },
      {
        teks: "Kukuhkan pertahanan",
        kesan: (s) => { s.hutang += 0.05; s.kestabilan = hadkan(s.kestabilan + 3); },
        maklumBalas: "Pertahanan dikukuhkan. Hutang naik, kestabilan naik."
      }
    ]
  },

  // === PILIHAN RAYA ===
  {
    id: "tekanan_pilihan_raya",
    nama: "Tekanan Pilihan Raya",
    keterukan: "sederhana",
    syarat: (s) => s.populariti < 35 && s.kestabilan < 45,
    keterangan: "Pembangkang mendesak pilihan raya awal diadakan.",
    pilihan: [
      {
        teks: "Tolak pilihan raya awal",
        kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); s.populariti = hadkan(s.populariti - 3); },
        maklumBalas: "Pilihan raya awal ditolak. Kestabilan naik, populariti turun."
      },
      {
        teks: "Pertimbang",
        kesan: (s) => { s.populariti = hadkan(s.populariti + 3); s.kestabilan = hadkan(s.kestabilan - 2); },
        maklumBalas: "PM pertimbang. Populariti naik, kestabilan turun."
      }
    ]
  }
];

// =====================================
// 3d. FUNGSI PERISTIWA
// =====================================

function semakPeristiwaBaru() {
  const syarat = {
    populariti: populariti,
    kestabilan: kestabilan,
    ekonomi: ekonomi,
    inflasi: inflasi,
    pengangguran: pengangguran,
    hutang: hutang,
    majoritiTipis: false,
    pemberontakanBesar: false
  };

  if (sejarahUndian.length > 0) {
    const terakhir = sejarahUndian[0];
    if (terakhir.lulus && Math.abs(terakhir.sokong - terakhir.tolak) <= 5) {
      syarat.majoritiTipis = true;
    }
    if (terakhir.penjelasan && terakhir.penjelasan.some(p => p.includes("Pemberontakan dalaman"))) {
      syarat.pemberontakanBesar = true;
    }
  }

  const peristiwaBaru = [];

  katalogPeristiwa.forEach(kp => {
    if (peristiwaAktif.some(p => p.id === kp.id)) return;

    const baruBaru = sejarahPeristiwa.slice(0, 5).some(s => s.id === kp.id);
    if (baruBaru) return;

    if (kp.syarat(syarat)) {
      peristiwaBaru.push({
        id: kp.id,
        nama: kp.nama,
        keterukan: kp.keterukan,
        keterangan: kp.keterangan,
        pilihan: kp.pilihan,
        masa: new Date().toLocaleString("ms-MY")
      });
    }
  });

  return peristiwaBaru;
}

function cetusPeristiwa() {
  const baru = semakPeristiwaBaru();
  if (baru.length === 0) return;

  baru.forEach(p => peristiwaAktif.push(p));
  paparPeristiwa();
}

function tindakBalasPeristiwa(idPeristiwa, indeksPilihan) {
  const p = peristiwaAktif.find(x => x.id === idPeristiwa);
  if (!p) return;

  const pilihan = p.pilihan[indeksPilihan];
  if (!pilihan) return;

  const state = {
    populariti: populariti,
    kestabilan: kestabilan,
    ekonomi: ekonomi,
    inflasi: inflasi,
    pengangguran: pengangguran,
    hutang: hutang
  };

  pilihan.kesan(state);

  populariti = state.populariti;
  kestabilan = state.kestabilan;
  ekonomi = state.ekonomi;
  inflasi = state.inflasi;
  pengangguran = state.pengangguran;
  hutang = state.hutang;

  nomborPeristiwa++;
  sejarahPeristiwa.unshift({
    nombor: nomborPeristiwa,
    id: p.id,
    nama: p.nama,
    keterukan: p.keterukan,
    pilihan: pilihan.teks,
    maklumBalas: pilihan.maklumBalas,
    masa: p.masa
  });

  if (sejarahPeristiwa.length > hadSejarahPeristiwa) {
    sejarahPeristiwa = sejarahPeristiwa.slice(0, hadSejarahPeristiwa);
  }

  peristiwaAktif = peristiwaAktif.filter(x => x.id !== idPeristiwa);

  paparPeristiwa();
  kemasKiniPaparan();
  kemasKiniSejarahPeristiwa();
}

function paparPeristiwa() {
  const panel = document.getElementById("panelPeristiwa");
  if (!panel) return;

  if (peristiwaAktif.length === 0) {
    panel.innerHTML = "<p>Tiada peristiwa aktif sekarang.</p>";
    return;
  }

  panel.innerHTML = peristiwaAktif.map(p => {
    const kelas = p.keterukan === "teruk" ? "peristiwa teruk" :
                  p.keterukan === "sederhana" ? "peristiwa sederhana" :
                  "peristiwa biasa";

    return `
      <div class="${kelas}">
        <h4>${escapeHTML(p.nama)}</h4>
        <p>${escapeHTML(p.keterangan)}</p>
        <div class="pilihan">
          ${p.pilihan.map((pil, i) => `
            <button onclick="tindakBalasPeristiwa('${p.id}', ${i})">
              ${escapeHTML(pil.teks)}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function kemasKiniSejarahPeristiwa() {
  const paparan = document.getElementById("sejarahPeristiwa");
  if (!paparan) return;

  if (sejarahPeristiwa.length === 0) {
    paparan.innerHTML = "<p>Belum ada rekod peristiwa.</p>";
    return;
  }

  paparan.innerHTML = sejarahPeristiwa.map(item => `
    <div class="stat sejarah">
      <h3>Peristiwa #${item.nombor}: ${escapeHTML(item.nama)}</h3>
      <p><strong>Pilihan:</strong> ${escapeHTML(item.pilihan)}</p>
      <p><strong>Kesan:</strong> ${escapeHTML(item.maklumBalas)}</p>
      <small>${escapeHTML(item.masa)}</small>
    </div>
  `).join("");
}

// =====================================
// 3e. FUNGSI PENJELASAN UNDIAN
// =====================================

function jelaskanUndian(keputusan, butiran) {
  const b = butiran;
  const sebab = [];

  if (keputusan.lulus) {
    sebab.push("Usul diluluskan kerana sokongan melebihi penentangan dan mencapai majoriti.");
  } else {
    if (b.jumlahSokong <= b.jumlahTolak) {
      sebab.push("Usul ditolak kerana undi menentang melebihi atau menyamai undi menyokong.");
    } else {
      sebab.push("Usul ditolak kerana sokongan tidak mencapai majoriti yang diperlukan.");
    }
  }

  sebab.push(
    "MP kerajaan: " + b.sokongKerajaan + " sokong, " +
    b.tolakKerajaan + " menentang, " +
    b.absenKerajaan + " absen (dari 120)."
  );

  if (b.tolakKerajaan > 5) {
    sebab.push("Pemberontakan dalaman: " + b.tolakKerajaan + " MP kerajaan mengundi menentang usul kerajaan sendiri.");
  }

  sebab.push(
    "MP pembangkang: " + b.tolakPembangkang + " menentang, " +
    b.sokongPembangkang + " menyokong, " +
    b.absenPembangkang + " absen (dari 92)."
  );

  if (b.sokongPembangkang > 5) {
    sebab.push("Pecah pembangkang: " + b.sokongPembangkang + " MP pembangkang menyokong usul kerajaan.");
  }

  sebab.push(
    "AP Bebas: " + b.undiBebas.menyokong + " sokong, " +
    b.undiBebas.menentang + " menentang, " +
    b.undiBebas.berkecuali + " berkecuali, " +
    b.undiBebas.absen + " absen (dari 10)."
  );

  sebab.push(
    "Majoriti diperlukan: " + b.majoritiHadir +
    " (dari " + (b.jumlahSokong + b.jumlahTolak) + " undi sokong/tolak)."
  );

  const margin = Math.abs(b.jumlahSokong - b.jumlahTolak);
  if (b.lulus) {
    sebab.push("Margin kemenangan: " + margin + " undi.");
    if (margin <= 5) sebab.push("Kemenangan tipis — kerajaan perlu berhati-hati.");
  } else {
    sebab.push("Margin kekalahan: " + margin + " undi.");
    if (margin <= 5) sebab.push("Kekalahan tipis — undi tidak percaya mungkin dipertimbangkan.");
  }

  const kesan = [];
  if (keputusan.jenis === "belanjawan") {
    if (keputusan.lulus) {
      kesan.push("Kestabilan +" + paramBelanjawan.kesanLulusKestabilan +
                 ", Populariti +" + paramBelanjawan.kesanLulusPopulariti + " (belanjawan)");
    } else {
      kesan.push("Kestabilan " + paramBelanjawan.kesanGagalKestabilan +
                 ", Populariti " + paramBelanjawan.kesanGagalPopulariti + " (belanjawan gagal)");
      kesan.push("AMARAN: Kegagalan belanjawan ialah krisis kerajaan.");
    }
  } else {
    if (keputusan.lulus) {
      kesan.push("Kestabilan +2, Populariti +1");
    } else {
      kesan.push("Kestabilan −4, Populariti −2");
      if (b.tolakKerajaan > 20) kesan.push("AMARAN: Pemberontakan besar dalam kerajaan.");
    }
  }
  sebab.push("Kesan: " + kesan.join(". "));

  return sebab;
}

// =====================================
// 3f. LABEL & UNDI AP BEBAS
// =====================================

function labelStatus(ahli) {
  if (ahli.kecenderungan >= 2) return { teks: "Menyokong kerajaan", kelas: "status-sokong" };
  if (ahli.kecenderungan <= -2) return { teks: "Menentang kerajaan", kelas: "status-tolak" };
  if (ahli.dirunding) return { teks: "Sudah dirunding", kelas: "status-neutral" };
  return { teks: "Belum dirunding", kelas: "status-neutral" };
}

function undiAhliBebas(ahli, jenisUsul) {
  const hadir = Math.random() < paramUndian.hadirBebas;
  if (!hadir) return { undi: "absen", sebab: "Tidak hadir" };

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
      sebab: sepadan ? "Usul sepadan dengan keutamaan" : "Bersedia memberi peluang"
    };
  }

  if (rawak < peluangSokong + paramUndian.peluangBerkecuali) {
    return { undi: "berkecuali", sebab: "Belum yakin" };
  }

  return {
    undi: "menentang",
    sebab: sepadan ? "Masih ragu walaupun sepadan" : "Usul tidak sepadan dengan keutamaan"
  };
}

// =====================================
// 4. FUNGSI UNDIAN PARLIMEN
// =====================================

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

  const undiBebas = { menyokong: 0, menentang: 0, berkecuali: 0, absen: 0 };
  const sebabBebas = [];

  ahliBebas.forEach(ahli => {
    const hasil = undiAhliBebas(ahli, jenis);
    undiBebas[hasil.undi]++;
    sebabBebas.push({ id: ahli.id, nama: ahli.nama, undi: hasil.undi, sebab: hasil.sebab });
  });

  undiSemuaMPParti();

  const sokongKerajaan = mpKerajaan.filter(mp => mp.hadir && mp.undi === "menyokong").length;
  const tolakKerajaan = mpKerajaan.filter(mp => mp.hadir && mp.undi === "menentang").length;
  const absenKerajaan = mpKerajaan.filter(mp => !mp.hadir).length;

  const sokongPembangkang = mpPembangkang.filter(mp => mp.hadir && mp.undi === "menyokong").length;
  const tolakPembangkang = mpPembangkang.filter(mp => mp.hadir && mp.undi === "menentang").length;
  const absenPembangkang = mpPembangkang.filter(mp => !mp.hadir).length;

  const jumlahSokong = sokongKerajaan + sokongPembangkang + undiBebas.menyokong;
  const jumlahTolak = tolakKerajaan + tolakPembangkang + undiBebas.menentang;
  const jumlahBerkecuali = undiBebas.berkecuali;
  const jumlahAbsen = absenKerajaan + absenPembangkang + undiBebas.absen;
  const jumlahHadir = jumlahSokong + jumlahTolak + jumlahBerkecuali;

  const majoritiHadir = Math.floor((jumlahSokong + jumlahTolak) / 2) + 1;
  const lulus = jumlahSokong > jumlahTolak && jumlahSokong >= majoritiHadir;

  nomborUndian++;

  const keputusan = {
    nombor: nomborUndian,
    nama: nama,
    jenis: jenis,
    sokong: jumlahSokong,
    tolak: jumlahTolak,
    berkecuali: jumlahBerkecuali,
    absen: jumlahAbsen,
    majoritiHadir: majoritiHadir,
    lulus: lulus,
    masa: new Date().toLocaleString("ms-MY")
  };

  const butiran = {
    sokongKerajaan, tolakKerajaan, absenKerajaan,
    sokongPembangkang, tolakPembangkang, absenPembangkang,
    undiBebas,
    jumlahSokong, jumlahTolak, jumlahBerkecuali, jumlahAbsen,
    majoritiHadir, lulus
  };

  keputusan.penjelasan = jelaskanUndian(keputusan, butiran);

  sejarahUndian.unshift(keputusan);
  if (sejarahUndian.length > hadSejarahUndian) {
    sejarahUndian = sejarahUndian.slice(0, hadSejarahUndian);
  }

  if (jenis === "belanjawan") {
    if (lulus) {
      kestabilan = hadkan(kestabilan + paramBelanjawan.kesanLulusKestabilan);
      populariti = hadkan(populariti + paramBelanjawan.kesanLulusPopulariti);
    } else {
      kestabilan = hadkan(kestabilan + paramBelanjawan.kesanGagalKestabilan);
      populariti = hadkan(populariti + paramBelanjawan.kesanGagalPopulariti);
    }
  } else {
    if (lulus) {
      kestabilan = hadkan(kestabilan + 2);
      populariti = hadkan(populariti + 1);
    } else {
      kestabilan = hadkan(kestabilan - 4);
      populariti = hadkan(populariti - 2);
    }
  }

  sebabBebas.forEach(item => {
    const ahli = ahliBebas.find(a => a.id === item.id);
    if (!ahli) return;

    if (item.undi === "menyokong") {
      ahli.kecenderungan = Math.min(paramUndian.maksKecenderungan, ahli.kecenderungan + 1);
    } else if (item.undi === "menentang") {
      ahli.kecenderungan = Math.max(-paramUndian.maksKecenderungan, ahli.kecenderungan - 1);
    }
  });

  let amaranUndiTidakPercaya = "";
  if (jenis === "belanjawan" && !lulus) {
    if (kestabilan < paramBelanjawan.ambangUndiTidakPercaya) {
      amaranUndiTidakPercaya = `
        <div class="stat amaran-krisis" style="background:#fee2e2;border-left:5px solid #b91c1c;text-align:left;padding:15px;margin-top:10px">
          <h3 style="color:#b91c1c;margin-top:0">⚠️ AMARAN: KRISIS KERAJAAN</h3>
          <p>Kegagalan belanjawan dengan kestabilan rendah (${kestabilan}) boleh mencetus undi tidak percaya.</p>
          <p>Kerajaan berkemungkinan tumbang jika keadaan berterusan.</p>
        </div>
      `;
    } else {
      amaranUndiTidakPercaya = `
        <div class="stat amaran-krisis" style="background:#fef3c7;border-left:5px solid #d97706;text-align:left;padding:15px;margin-top:10px">
          <h3 style="color:#d97706;margin-top:0">⚠️ Belanjawan Gagal</h3>
          <p>Kegagalan belanjawan menjejaskan kestabilan kerajaan.</p>
          <p>Kestabilan sekarang: ${kestabilan}. Risiko undi tidak percaya jika jatuh bawah ${paramBelanjawan.ambangUndiTidakPercaya}.</p>
        </div>
      `;
    }
  }

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
      <p>Jumlah hadir: ${jumlahHadir}</p>
      <p>Jumlah absen: ${jumlahAbsen}</p>
      <p>Majoriti diperlukan: ${majoritiHadir}</p>
      <p>${lulus
        ? "Kerajaan berjaya meluluskan usul."
        : "Kerajaan gagal mendapatkan sokongan mencukupi."}</p>
      <details style="margin-top:10px">
        <summary>Penjelasan keputusan</summary>
        <ul>
          ${keputusan.penjelasan.map(s => `<li>${escapeHTML(s)}</li>`).join("")}
        </ul>
      </details>
      <details style="margin-top:10px">
        <summary>Lihat pecahan undi AP bebas</summary>
        <ul>
          ${sebabBebas.map(s =>
            `<li>${escapeHTML(s.nama)}: ${escapeHTML(s.undi)} — ${escapeHTML(s.sebab)}</li>`
          ).join("")}
        </ul>
      </details>
      ${amaranUndiTidakPercaya}
    </div>
  `;

  kemasKiniSejarahUndian();
  namaUsul.value = "";
  namaUsul.focus();
}

// =====================================
// 4b. FUNGSI SOKONGAN
// =====================================

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
      <p>Sokong: ${item.sokong} | Tolak: ${item.tolak} | Berkecuali: ${item.berkecuali} | Absen: ${item.absen}</p>
      ${item.penjelasan ? `
        <details style="margin-top:8px">
          <summary>Penjelasan</summary>
          <ul>
            ${item.penjelasan.map(s => `<li>${escapeHTML(s)}</li>`).join("")}
          </ul>
        </details>
      ` : ""}
      <small>${escapeHTML(item.masa)}</small>
    </div>
  `).join("");
}

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

// =====================================
// 5. TINDAKAN KERAJAAN
// =====================================

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
    if (mesej) mesej.textContent = "Pelan Ekonomi diumumkan. Ekonomi meningkat.";
  } else if (jenis === "rakyat") {
    populariti = hadkan(populariti + 8);
    ekonomi = hadkan(ekonomi - 2);
    kestabilan = hadkan(kestabilan + 2);
    inflasi += 0.1;
    hutang += 0.04;
    if (mesej) mesej.textContent = "Bantuan Rakyat diumumkan. Populariti meningkat, hutang bertambah.";
  } else if (jenis === "reformasi") {
    kestabilan = hadkan(kestabilan + 8);
    populariti = hadkan(populariti + 2);
    ekonomi = hadkan(ekonomi + 2);
    pengangguran = Math.max(0, pengangguran - 0.1);
    ahliBebas.forEach(ahli => {
      if (ahli.keutamaan === "dasar") {
        ahli.kecenderungan = Math.min(paramUndian.maksKecenderungan, ahli.kecenderungan + 1);
      }
    });
    if (mesej) mesej.textContent = "Reformasi dilaksanakan. Kestabilan meningkat.";
  }

  kemasKiniPaparan();
  kemasKiniParlimen();
}

// =====================================
// 6. DIALOG RUNDINGAN
// =====================================

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

// =====================================
// 7. RUNDING AP BEBAS
// =====================================

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
    ahli.kecenderungan = Math.min(paramUndian.maksKecenderungan,
      ahli.kecenderungan + paramUndian.kesanRundingBerjaya);
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    ahli.kecenderungan = Math.max(-paramUndian.maksKecenderungan,
      ahli.kecenderungan + paramUndian.kesanRundingGagal);
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

// =====================================
// 8. PUSINGAN RUNDINGAN BAHARU
// =====================================

function pusinganRundinganBaharu() {
  ahliBebas.forEach(ahli => { ahli.dirunding = false; });
  kemasKiniParlimen();
  const hasil = document.getElementById("statusRundingan");
  if (hasil) {
    hasil.textContent = "Pusingan baharu bermula. Semua Ahli Parlimen Bebas boleh dirunding semula. Kecenderungan mereka kekal dari pusingan lepas.";
  }
}

// =====================================
// 9. PAPARAN PARLIMEN
// =====================================

function kemasKiniParlimen() {
  const menyokong = ahliBebas.filter(a => a.kecenderungan >= 2).length;
  const sokonganAnggaran = kerusiKerajaan + menyokong;

  const nilai = {
    kerusiKerajaan: kerusiKerajaan,
    kerusiPembangkang: kerusiPembangkang,
    kerusiBebas: ahliBebas.length,
    sokonganKerajaan: sokonganAnggaran + " / " + jumlahKerusi,
    majoritiParlimen: sokonganAnggaran + " / " + jumlahKerusi,
    statusMajoriti: sokonganAnggaran >= majoritiMudah ? "Majoriti" : "Tiada majoriti"
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

// =====================================
// 10. MULAKAN APLIKASI
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  kemasKiniPaparan();
  kemasKiniParlimen();
  kemasKiniSejarahUndian();
  kemasKiniKalendar();
  paparPeristiwa();
  kemasKiniSejarahPeristiwa();
  paparParti();
});
