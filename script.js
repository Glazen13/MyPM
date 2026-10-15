"use strict";

// =====================================
// MyPM SIMULASI - SISTEM NEGARA
// Fasa 4.1: Pilihan Raya Berdasarkan Kerusi
// =====================================

// =====================================
// 0. FUNGSI ASAS
// =====================================

function hadkan(nilai, minimum = 0, maksimum = 100) {
  return Math.max(minimum, Math.min(maksimum, nilai));
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

// =====================================
// 1. STATISTIK NEGARA
// =====================================

let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

let kdnk = 1.8;
let inflasi = 2.5;
let pengangguran = 3.5;
let hutang = 1.2;

// =====================================
// 2. KOMPOSISI PARLIMEN
// =====================================

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

// =====================================
// 3. DATA SISTEM
// =====================================

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

let sejarahUndian = [];
let nomborUndian = 0;
const hadSejarahUndian = 20;

// =====================================
// 3b. KALENDAR & GILIRAN
// =====================================

const masa = {
  minggu: 1,
  hari: 1,
  bulan: 1,
  tahun: 1,
  maksMinggu: 260,
  maksHari: 7,
  tindakanMinggu: 0,
  hadTindakan: 5
};

function kiraMasa() {
  masa.bulan = Math.ceil(masa.minggu / 4);
  masa.tahun = Math.ceil(masa.minggu / 52);
}

function kemasKiniKalendar() {
  kiraMasa();

  const elMinggu = document.getElementById("mingguSemasa");
  const elHari = document.getElementById("hariSemasa");
  const elTindakan = document.getElementById("tindakanBaki");
  const elBulan = document.getElementById("bulanSemasa");
  const elTahun = document.getElementById("tahunSemasa");
  const elStatus = document.getElementById("statusMinggu");

  const baki = masa.hadTindakan - masa.tindakanMinggu;

  if (elMinggu) elMinggu.textContent = masa.minggu + " / " + masa.maksMinggu;
  if (elHari) elHari.textContent = masa.hari + " / " + masa.maksHari;
  if (elTindakan) elTindakan.textContent = baki;
  if (elBulan) elBulan.textContent = masa.bulan + " / 65";
  if (elTahun) elTahun.textContent = masa.tahun + " / 5";

  if (elStatus) {
    elStatus.textContent = "Minggu " + masa.minggu +
      ", Hari " + masa.hari +
      ". Tindakan baki: " + baki + ".";
  }
}

// Guna satu tindakan
function gunaTindakan() {
  if (masa.tindakanMinggu >= masa.hadTindakan) {
    alert("Tindakan minggu ini sudah habis. Tamatkan hari untuk teruskan.");
    return false;
  }

  masa.tindakanMinggu++;
  kemasKiniKalendar();
  return true;
}
function semakPeristiwaMinggu() {
  const peristiwa = [];

  if (masa.minggu % 4 === 0) {
    peristiwa.push({ jenis: "ekonomi", teks: "Laporan ekonomi bulanan akan dikira pada akhir minggu ini." });
  }
  if (masa.minggu % 52 === 0) {
    peristiwa.push({ jenis: "tahun", teks: "Tahun penggal baharu bermula." });
  }
  if (masa.minggu >= masa.maksMinggu) {
    peristiwa.push({ jenis: "tamat", teks: "Penggal 5 tahun tamat. Pilihan raya akan dijalankan." });
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

function tamatkanHari() {
  // Majukan hari
  masa.hari++;

  // Jika lebih dari 7, tamatkan minggu
  if (masa.hari > masa.maksHari) {
    masa.hari = 1;
    masa.tindakanMinggu = 0;
    tamatkanMinggu();
    return;
  }

  kemasKiniKalendar();

  const elStatus = document.getElementById("statusMinggu");
  if (elStatus) {
    const baki = masa.hadTindakan - masa.tindakanMinggu;
    elStatus.textContent = "Minggu " + masa.minggu +
      ", Hari " + masa.hari +
      ". Tindakan baki: " + baki + ".";
  }
}

function tamatkanMinggu() {
  const peristiwa = semakPeristiwaMinggu();

  let laporanEkonomi = "";
  if (masa.minggu % 4 === 0) {
    kiraEkonomiBulanan();
    laporanEkonomi = "Laporan ekonomi bulanan telah dikira.";
    cetusPeristiwa();
  }

  kemajuanDasar();

  masa.minggu++;

  if (masa.minggu > masa.maksMinggu) {
    alert("Penggal 5 tahun tamat. Hantar ke pilihan raya.");
    masa.minggu = masa.maksMinggu;
    paparPanelPilihanRaya();
    return;
  }
  
 masa.tindakanMinggu = 0;
  kiraMasa();
  kemasKiniKalendar();
  kemasKiniPaparan();
  kemasKiniParlimen();

  const elStatus = document.getElementById("statusMinggu");
  if (elStatus) {
    let teks = "Minggu " + masa.minggu +
      " (Bulan " + masa.bulan + ", Tahun " + masa.tahun + ").";

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

  paparPanelPilihanRaya();
}

// =====================================
// 3c. MEDIA & PENDAPAT AWAM
// =====================================

const pendapatKumpulan = {
  bandar: 50,
  luarBandar: 50,
  belia: 50,
  wargaEmas: 50,
  pekerja: 50
};

const media = [
  { id: "nasional", nama: "Media Nasional", sikap: "pro-kerajaan", pengaruh: 1.2 },
  { id: "bebas", nama: "Media Bebas", sikap: "neutral", pengaruh: 1.0 },
  { id: "kritis", nama: "Media Kritis", sikap: "pembangkang", pengaruh: 0.8 },
  { id: "sosial", nama: "Media Sosial", sikap: "rakyat", pengaruh: 1.5 }
];

function kiraPopularitiKumpulan() {
  const nilai = Object.values(pendapatKumpulan);
  return Math.round(nilai.reduce((a, b) => a + b, 0) / nilai.length);
}

function paparPendapat() {
  const bandar = document.getElementById("pendapatBandar");
  const luarBandar = document.getElementById("pendapatLuarBandar");
  const belia = document.getElementById("pendapatBelia");
  const wargaEmas = document.getElementById("pendapatWargaEmas");
  const pekerja = document.getElementById("pendapatPekerja");

  if (bandar) bandar.textContent = pendapatKumpulan.bandar + "%";
  if (luarBandar) luarBandar.textContent = pendapatKumpulan.luarBandar + "%";
  if (belia) belia.textContent = pendapatKumpulan.belia + "%";
  if (wargaEmas) wargaEmas.textContent = pendapatKumpulan.wargaEmas + "%";
  if (pekerja) pekerja.textContent = pendapatKumpulan.pekerja + "%";
}

function komunikasiPM(jenis) {
  const hasil = document.getElementById("hasilKomunikasi");
  let teks = "";

  if (jenis === "sidangMedia") {
    pendapatKumpulan.bandar = hadkan(pendapatKumpulan.bandar + 4);
    pendapatKumpulan.belia = hadkan(pendapatKumpulan.belia + 2);
    pendapatKumpulan.wargaEmas = hadkan(pendapatKumpulan.wargaEmas + 3);
    kestabilan = hadkan(kestabilan + 1);
    teks = "Sidang media diadakan. Bandar +4, Warga Emas +3, Belia +2, Kestabilan +1.";
  } else if (jenis === "lawatan") {
    pendapatKumpulan.luarBandar = hadkan(pendapatKumpulan.luarBandar + 6);
    pendapatKumpulan.pekerja = hadkan(pendapatKumpulan.pekerja + 4);
    populariti = hadkan(populariti + 2);
    teks = "Lawatan ke kawasan. Luar Bandar +6, Pekerja +4, Populariti +2.";
  } else if (jenis === "pengakuan") {
    pendapatKumpulan.bandar = hadkan(pendapatKumpulan.bandar + 3);
    pendapatKumpulan.belia = hadkan(pendapatKumpulan.belia + 5);
    kestabilan = hadkan(kestabilan - 2);
    populariti = hadkan(populariti + 3);
    teks = "PM akui kesilapan. Bandar +3, Belia +5, Kestabilan −2, Populariti +3.";
  } else if (jenis === "diam") {
    pendapatKumpulan.bandar = hadkan(pendapatKumpulan.bandar - 2);
    pendapatKumpulan.belia = hadkan(pendapatKumpulan.belia - 3);
    pendapatKumpulan.pekerja = hadkan(pendapatKumpulan.pekerja + 2);
    ekonomi = hadkan(ekonomi + 2);
    teks = "PM diam & fokus kerja. Ekonomi +2, Bandar −2, Belia −3, Pekerja +2.";
  }

  const mediaSosial = media.find(m => m.id === "sosial");
  const kesanMedia = jenis === "diam" ? -1 : 1;
  pendapatKumpulan.belia = hadkan(
    pendapatKumpulan.belia + Math.round(kesanMedia * mediaSosial.pengaruh)
  );

  populariti = kiraPopularitiKumpulan();

  paparPendapat();
  kemasKiniPaparan();

  if (hasil) {
    hasil.innerHTML = `
      <div class="stat hasil">
        <h3>Kesan Komunikasi PM</h3>
        <p>${escapeHTML(teks)}</p>
        <p><strong>Populariti keseluruhan:</strong> ${populariti}%</p>
        <p class="nota">Kesan media sosial: Belia ${kesanMedia > 0 ? "+" : ""}${Math.round(kesanMedia * mediaSosial.pengaruh)}</p>
      </div>
    `;
  }
}

// =====================================
// 3d. PARTI POLITIK & GABUNGAN
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
      status.textContent = "Rundingan dengan " + parti.nama + " berjaya. " +
        "Tuntutan dipenuhi: " + tuntutanBelum.teks + ". " +
        "Hubungan kini: " + parti.hubungan + ".";
    } else {
      status.textContent = "Rundingan dengan " + parti.nama + " gagal. " +
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
// 3e. DASAR & PROJEK KERAJAAN
// =====================================

let belanjawanDasar = 50;

const senaraiDasar = [
  { id: "lebuhraya", nama: "Projek Lebuh Raya", kategori: "infrastruktur", kos: 15, tempoh: 52, mingguBerjalan: 0, risiko: 0.15, status: "belum", kesanPendek: { populariti: 3 }, kesanPanjang: { ekonomi: 8 } },
  { id: "lrt", nama: "LRT Baharu", kategori: "infrastruktur", kos: 20, tempoh: 52, mingguBerjalan: 0, risiko: 0.20, status: "belum", kesanPendek: { populariti: 5 }, kesanPanjang: { ekonomi: 10 } },
  { id: "sekolah", nama: "Sekolah Baharu", kategori: "pendidikan", kos: 8, tempoh: 26, mingguBerjalan: 0, risiko: 0.10, status: "belum", kesanPendek: { populariti: 4 }, kesanPanjang: { ekonomi: 5 } },
  { id: "biasiswa", nama: "Program Biasiswa", kategori: "pendidikan", kos: 5, tempoh: 12, mingguBerjalan: 0, risiko: 0.05, status: "belum", kesanPendek: { populariti: 6 }, kesanPanjang: { ekonomi: 3 } },
  { id: "hospital", nama: "Hospital Baharu", kategori: "kesihatan", kos: 12, tempoh: 39, mingguBerjalan: 0, risiko: 0.12, status: "belum", kesanPendek: { populariti: 5 }, kesanPanjang: { ekonomi: 4 } },
  { id: "subsidiUbat", nama: "Subsidi Ubat", kategori: "kesihatan", kos: 3, tempoh: 8, mingguBerjalan: 0, risiko: 0.05, status: "belum", kesanPendek: { populariti: 7 }, kesanPanjang: { ekonomi: 2 } },
  { id: "subsidiPetani", nama: "Subsidi Petani", kategori: "ekonomi", kos: 6, tempoh: 16, mingguBerjalan: 0, risiko: 0.08, status: "belum", kesanPendek: { populariti: 4 }, kesanPanjang: { ekonomi: 6 } },
  { id: "digital", nama: "Transformasi Digital", kategori: "ekonomi", kos: 10, tempoh: 30, mingguBerjalan: 0, risiko: 0.18, status: "belum", kesanPendek: { populariti: 2 }, kesanPanjang: { ekonomi: 12 } }
];

function paparDasar() {
  const panel = document.getElementById("senaraiDasar");
  if (!panel) return;

  const aktif = senaraiDasar.filter(d => d.status === "aktif").length;
  const selesai = senaraiDasar.filter(d => d.status === "selesai").length;

  const elBelanjawan = document.getElementById("belanjawanDasar");
  const elAktif = document.getElementById("dasarAktif");
  const elSelesai = document.getElementById("dasarSelesai");

  if (elBelanjawan) elBelanjawan.textContent = "RM " + belanjawanDasar + "B";
  if (elAktif) elAktif.textContent = aktif;
  if (elSelesai) elSelesai.textContent = selesai;

  panel.innerHTML = senaraiDasar.map(d => {
    const kelasStatus = d.status === "aktif" ? "aktif" :
                        d.status === "selesai" ? "selesai" :
                        d.status === "gagal" ? "gagal" : "";

    const peratus = d.tempoh > 0 ? Math.round((d.mingguBerjalan / d.tempoh) * 100) : 0;

    const bar = d.status === "aktif" || d.status === "selesai" || d.status === "gagal"
      ? `<div class="bar-kemajuan"><div class="bar-kemajuan-dalam ${d.status}" style="width:${peratus}%"></div></div>`
      : "";

    const kawalan = d.status === "belum" ? `
      <button onclick="laksanaDasar('${d.id}')" ${belanjawanDasar < d.kos ? "disabled" : ""}>
        Laksana (RM ${d.kos}B)
      </button>
    ` : d.status === "aktif" ? `
      <p class="nota">Sedang berjalan: ${d.mingguBerjalan} / ${d.tempoh} minggu</p>
    ` : d.status === "selesai" ? `
      <p class="nota">✅ Selesai sepenuhnya</p>
    ` : `
      <p class="nota">❌ Gagal dilaksanakan</p>
    `;

    return `
      <div class="stat dasar ${kelasStatus}">
        <h3>${escapeHTML(d.nama)}</h3>
        <p>Kategori: ${escapeHTML(d.kategori)} | Kos: RM ${d.kos}B | Tempoh: ${d.tempoh} minggu</p>
        <p>Risiko: ${Math.round(d.risiko * 100)}% | Status: ${d.status}</p>
        ${bar}
        ${kawalan}
      </div>
    `;
  }).join("");
}

function laksanaDasar(idDasar) {
  const dasar = senaraiDasar.find(d => d.id === idDasar);
  if (!dasar || dasar.status !== "belum") return;

  if (belanjawanDasar < dasar.kos) {
    alert("Belanjawan tidak mencukupi.");
    return;
  }

  belanjawanDasar -= dasar.kos;
  dasar.status = "aktif";
  dasar.mingguBerjalan = 0;

  paparDasar();
  kemasKiniPaparan();
}

function kemajuanDasar() {
  senaraiDasar.forEach(d => {
    if (d.status !== "aktif") return;

    d.mingguBerjalan++;

    if (Math.random() < d.risiko / 10) {
      d.mingguBerjalan--;
    }

    if (d.mingguBerjalan >= d.tempoh) {
      if (Math.random() < d.risiko) {
        d.status = "gagal";
        kestabilan = hadkan(kestabilan - 3);
        populariti = hadkan(populariti - 3);
      } else {
        d.status = "selesai";
        if (d.kesanPendek.populariti) {
          populariti = hadkan(populariti + d.kesanPendek.populariti);
        }
        if (d.kesanPanjang.ekonomi) {
          ekonomi = hadkan(ekonomi + d.kesanPanjang.ekonomi);
        }
        if (d.kesanPanjang.populariti) {
          populariti = hadkan(populariti + d.kesanPanjang.populariti);
        }
      }
    }
  });

  paparDasar();
}

// =====================================
// 3f. PERISTIWA BERSYARAT
// =====================================

let peristiwaAktif = [];
let sejarahPeristiwa = [];
let nomborPeristiwa = 0;
const hadSejarahPeristiwa = 30;

const katalogPeristiwa = [
  { id: "demo_populariti", nama: "Demonstrasi Jalanan", keterukan: "teruk", syarat: (s) => s.populariti < 30,
    keterangan: "Rakyat tidak puas hati dengan kerajaan. Demonstrasi besar berlaku di Kuala Lumpur.",
    pilihan: [
      { teks: "Bertemu wakil rakyat", kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.kestabilan = hadkan(s.kestabilan - 2); }, maklumBalas: "PM bertemu wakil rakyat. Populariti naik sedikit, kestabilan turun." },
      { teks: "Guna kekuatan polis", kesan: (s) => { s.populariti = hadkan(s.populariti - 3); s.kestabilan = hadkan(s.kestabilan + 3); }, maklumBalas: "Polis bertindak. Kestabilan naik, populariti turun." }
    ] },
  { id: "sokongan_merosot", nama: "Sokongan Menurun", keterukan: "sederhana", syarat: (s) => s.populariti < 40 && s.populariti >= 30,
    keterangan: "Tinjauan terkini menunjukkan sokongan kepada kerajaan semakin menurun.",
    pilihan: [
      { teks: "Umum bantuan rakyat", kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.03; }, maklumBalas: "Bantuan diumumkan. Populariti naik, hutang bertambah." },
      { teks: "Kempen media", kesan: (s) => { s.populariti = hadkan(s.populariti + 3); }, maklumBalas: "Kempen media dilancarkan. Populariti naik sedikit." }
    ] },
  { id: "undi_tidak_percaya", nama: "Ancaman Undi Tidak Percaya", keterukan: "teruk", syarat: (s) => s.kestabilan < 25,
    keterangan: "Pembangkang mengancam untuk membawa undi tidak percaya terhadap PM.",
    pilihan: [
      { teks: "Runding dengan parti", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 6); }, maklumBalas: "Rundingan berjaya. Kestabilan naik." },
      { teks: "Cabaran terbuka", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 3); s.populariti = hadkan(s.populariti + 2); }, maklumBalas: "PM cabar pembangkang. Kestabilan turun, populariti naik." }
    ] },
  { id: "gabungan_renggang", nama: "Gabungan Renggang", keterukan: "sederhana", syarat: (s) => s.kestabilan < 40 && s.kestabilan >= 25,
    keterangan: "Rakan gabungan mula tidak puas hati dengan kepimpinan PM.",
    pilihan: [
      { teks: "Beri jawatan menteri", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 5); s.populariti = hadkan(s.populariti - 2); }, maklumBalas: "Jawatan diberi. Kestabilan naik, populariti turun." },
      { teks: "Tegakkan pendirian", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 2); s.populariti = hadkan(s.populariti + 3); }, maklumBalas: "PM tegaskan pendirian. Kestabilan turun, populariti naik." }
    ] },
  { id: "krisis_ekonomi", nama: "Krisis Ekonomi", keterukan: "teruk", syarat: (s) => s.ekonomi < 30,
    keterangan: "Ekonomi negara merudum. Pelabur mula menarik diri.",
    pilihan: [
      { teks: "Rangsangan ekonomi", kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 10); s.hutang += 0.05; }, maklumBalas: "Rangsangan diumumkan. Ekonomi naik, hutang bertambah." },
      { teks: "Jimat belanja", kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 3); s.populariti = hadkan(s.populariti - 3); }, maklumBalas: "Langkah berjimat. Ekonomi naik sedikit, populariti turun." }
    ] },
  { id: "harga_naik", nama: "Harga Barang Naik", keterukan: "sederhana", syarat: (s) => s.inflasi > 4,
    keterangan: "Inflasi meningkat. Harga barang keperluan naik mendadak.",
    pilihan: [
      { teks: "Kawalan harga", kesan: (s) => { s.inflasi = Math.max(0, s.inflasi - 0.8); s.populariti = hadkan(s.populariti + 4); }, maklumBalas: "Kawalan harga dilaksana. Inflasi turun, populariti naik." },
      { teks: "Bantuan tunai", kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.04; }, maklumBalas: "Bantuan tunai diberi. Populariti naik, hutang bertambah." }
    ] },
  { id: "pengangguran_tinggi", nama: "Pengangguran Meningkat", keterukan: "sederhana", syarat: (s) => s.pengangguran > 5,
    keterangan: "Kadar pengangguran meningkat. Graduan sukar dapat kerja.",
    pilihan: [
      { teks: "Program latihan", kesan: (s) => { s.pengangguran = Math.max(0, s.pengangguran - 0.5); s.hutang += 0.02; }, maklumBalas: "Program latihan dilancarkan. Pengangguran turun." },
      { teks: "Galak pelaburan", kesan: (s) => { s.pengangguran = Math.max(0, s.pengangguran - 0.3); s.ekonomi = hadkan(s.ekonomi + 3); }, maklumBalas: "Pelaburan digalakkan. Ekonomi naik." }
    ] },
  { id: "hutang_tinggi", nama: "Amaran Hutang Negara", keterukan: "teruk", syarat: (s) => s.hutang > 1.6,
    keterangan: "Hutang negara menghampiri paras bahaya. Agensi penarafan beri amaran.",
    pilihan: [
      { teks: "Kurangkan perbelanjaan", kesan: (s) => { s.hutang = Math.max(1.0, s.hutang - 0.05); s.populariti = hadkan(s.populariti - 4); s.ekonomi = hadkan(s.ekonomi - 3); }, maklumBalas: "Perbelanjaan dikurangkan. Hutang turun, populariti & ekonomi turun." },
      { teks: "Cukai baru", kesan: (s) => { s.hutang = Math.max(1.0, s.hutang - 0.08); s.populariti = hadkan(s.populariti - 6); }, maklumBalas: "Cukai baru diperkenal. Hutang turun, populariti turun." }
    ] },
  { id: "majoriti_tipis", nama: "Majoriti Tipis", keterukan: "sederhana", syarat: (s) => s.majoritiTipis === true,
    keterangan: "Kerajaan baru sahaja menang undian dengan margin tipis. Pembangkang mula mendesak.",
    pilihan: [
      { teks: "Kukuhkan gabungan", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); }, maklumBalas: "Gabungan dikukuhkan. Kestabilan naik." },
      { teks: "Abaikan tekanan", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 2); }, maklumBalas: "Tekanan diabaikan. Kestabilan turun." }
    ] },
  { id: "pemberontakan_mp", nama: "Pemberontakan MP Kerajaan", keterukan: "teruk", syarat: (s) => s.pemberontakanBesar === true,
    keterangan: "Ramai MP kerajaan mengundi menentang usul. Pemberontakan dalaman berlaku.",
    pilihan: [
      { teks: "Disiplin MP", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 5); s.populariti = hadkan(s.populariti - 2); }, maklumBalas: "MP didisiplin. Kestabilan naik, populariti turun." },
      { teks: "Dengar keluhan", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 3); s.populariti = hadkan(s.populariti + 2); }, maklumBalas: "Keluhan didengar. Kestabilan & populariti naik sedikit." }
    ] },
  { id: "skandal_media", nama: "Skandal Media", keterukan: "teruk", syarat: (s) => s.populariti < 35 && s.kestabilan < 45,
    keterangan: "Media mendedahkan skandal dalam kerajaan. Rakyat mula hilang kepercayaan.",
    pilihan: [
      { teks: "Siasatan terbuka", kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.kestabilan = hadkan(s.kestabilan - 3); }, maklumBalas: "Siasatan diumumkan. Populariti naik, kestabilan turun." },
      { teks: "Nafikan tuduhan", kesan: (s) => { s.populariti = hadkan(s.populariti - 4); s.kestabilan = hadkan(s.kestabilan + 2); }, maklumBalas: "Tuduhan dinafikan. Populariti turun, kestabilan naik sedikit." },
      { teks: "Saman media", kesan: (s) => { s.populariti = hadkan(s.populariti - 6); s.kestabilan = hadkan(s.kestabilan + 3); }, maklumBalas: "Media disaman. Populariti turun, kestabilan naik." }
    ] },
  { id: "kempen_media_positif", nama: "Peluang Media", keterukan: "biasa", syarat: (s) => s.populariti > 60 && s.ekonomi > 55,
    keterangan: "Media memberi liputan positif terhadap kerajaan. Peluang untuk tingkatkan sokongan.",
    pilihan: [
      { teks: "Kempen besar", kesan: (s) => { s.populariti = hadkan(s.populariti + 5); s.hutang += 0.02; }, maklumBalas: "Kempen dilancarkan. Populariti naik, hutang naik." },
      { teks: "Biar semula jadi", kesan: (s) => { s.populariti = hadkan(s.populariti + 2); }, maklumBalas: "Liputan positif berterusan. Populariti naik sedikit." }
    ] },
  { id: "tuntutan_reformasi", nama: "Tuntutan Reformasi", keterukan: "sederhana", syarat: (s) => s.populariti < 45 && s.kestabilan > 40,
    keterangan: "Rakyat menuntut reformasi dasar. Kerajaan perlu respons.",
    pilihan: [
      { teks: "Laksana reformasi", kesan: (s) => { s.populariti = hadkan(s.populariti + 8); s.ekonomi = hadkan(s.ekonomi - 3); }, maklumBalas: "Reformasi dilaksana. Populariti naik, ekonomi turun sedikit." },
      { teks: "Tangguh dahulu", kesan: (s) => { s.populariti = hadkan(s.populariti - 4); }, maklumBalas: "Reformasi ditangguh. Populariti turun." }
    ] },
  { id: "tuntutan_pembangunan", nama: "Tuntutan Pembangunan", keterukan: "biasa", syarat: (s) => s.ekonomi > 45 && s.populariti < 55,
    keterangan: "Rakyat minta projek pembangunan di kawasan mereka.",
    pilihan: [
      { teks: "Luluskan projek", kesan: (s) => { s.populariti = hadkan(s.populariti + 6); s.hutang += 0.03; }, maklumBalas: "Projek diluluskan. Populariti naik, hutang naik." },
      { teks: "Kaji dahulu", kesan: (s) => { s.populariti = hadkan(s.populariti - 2); s.ekonomi = hadkan(s.ekonomi + 2); }, maklumBalas: "Projek dikaji. Populariti turun sedikit, ekonomi naik." }
    ] },
  { id: "krisis_kabinet", nama: "Krisis Kabinet", keterukan: "teruk", syarat: (s) => s.kestabilan < 30 && s.populariti < 40,
    keterangan: "Menteri kabinet bergaduh secara terbuka. Kerajaan nampak lemah.",
    pilihan: [
      { teks: "Rombak kabinet", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 8); s.populariti = hadkan(s.populariti - 2); }, maklumBalas: "Kabinet dirombak. Kestabilan naik, populariti turun." },
      { teks: "Mediasi", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); }, maklumBalas: "Mediasi dijalankan. Kestabilan naik." },
      { teks: "Biar selesai sendiri", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan - 3); s.populariti = hadkan(s.populariti - 2); }, maklumBalas: "Krisis berterusan. Kestabilan & populariti turun." }
    ] },
  { id: "krisis_antarabangsa", nama: "Krisis Antarabangsa", keterukan: "sederhana", syarat: (s) => s.ekonomi > 50 && s.hutang > 1.3,
    keterangan: "Ketegangan antarabangsa menjejaskan perdagangan Malaysia.",
    pilihan: [
      { teks: "Diplomasi", kesan: (s) => { s.ekonomi = hadkan(s.ekonomi + 3); s.populariti = hadkan(s.populariti + 2); }, maklumBalas: "Diplomasi berjaya. Ekonomi & populariti naik." },
      { teks: "Kukuhkan pertahanan", kesan: (s) => { s.hutang += 0.05; s.kestabilan = hadkan(s.kestabilan + 3); }, maklumBalas: "Pertahanan dikukuhkan. Hutang naik, kestabilan naik." }
    ] },
  { id: "tekanan_pilihan_raya", nama: "Tekanan Pilihan Raya", keterukan: "sederhana", syarat: (s) => s.populariti < 35 && s.kestabilan < 45,
    keterangan: "Pembangkang mendesak pilihan raya awal diadakan.",
    pilihan: [
      { teks: "Tolak pilihan raya awal", kesan: (s) => { s.kestabilan = hadkan(s.kestabilan + 4); s.populariti = hadkan(s.populariti - 3); }, maklumBalas: "Pilihan raya awal ditolak. Kestabilan naik, populariti turun." },
      { teks: "Pertimbang", kesan: (s) => { s.populariti = hadkan(s.populariti + 3); s.kestabilan = hadkan(s.kestabilan - 2); }, maklumBalas: "PM pertimbang. Populariti naik, kestabilan turun." }
    ] }
];

function semakPeristiwaBaru() {
  const syarat = {
    populariti, kestabilan, ekonomi, inflasi, pengangguran, hutang,
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

  const state = { populariti, kestabilan, ekonomi, inflasi, pengangguran, hutang };

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
// 3g. PENJELASAN UNDIAN
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

  sebab.push("MP kerajaan: " + b.sokongKerajaan + " sokong, " +
    b.tolakKerajaan + " menentang, " +
    b.absenKerajaan + " absen (dari 120).");

  if (b.tolakKerajaan > 5) {
    sebab.push("Pemberontakan dalaman: " + b.tolakKerajaan + " MP kerajaan mengundi menentang usul kerajaan sendiri.");
  }

  sebab.push("MP pembangkang: " + b.tolakPembangkang + " menentang, " +
    b.sokongPembangkang + " menyokong, " +
    b.absenPembangkang + " absen (dari 92).");

  if (b.sokongPembangkang > 5) {
    sebab.push("Pecah pembangkang: " + b.sokongPembangkang + " MP pembangkang menyokong usul kerajaan.");
  }

  sebab.push("AP Bebas: " + b.undiBebas.menyokong + " sokong, " +
    b.undiBebas.menentang + " menentang, " +
    b.undiBebas.berkecuali + " berkecuali, " +
    b.undiBebas.absen + " absen (dari 10).");

  sebab.push("Majoriti diperlukan: " + b.majoritiHadir +
    " (dari " + (b.jumlahSokong + b.jumlahTolak) + " undi sokong/tolak).");

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
// 3h. LABEL & UNDI AP BEBAS
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
    return { undi: "menyokong",
      sebab: sepadan ? "Usul sepadan dengan keutamaan" : "Bersedia memberi peluang" };
  }
  if (rawak < peluangSokong + paramUndian.peluangBerkecuali) {
    return { undi: "berkecuali", sebab: "Belum yakin" };
  }
  return { undi: "menentang",
    sebab: sepadan ? "Masih ragu walaupun sepadan" : "Usul tidak sepadan dengan keutamaan" };
}

// =====================================
// 4. UNDIAN PARLIMEN
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
    nombor: nomborUndian, nama, jenis,
    sokong: jumlahSokong, tolak: jumlahTolak,
    berkecuali: jumlahBerkecuali, absen: jumlahAbsen,
    majoritiHadir, lulus,
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

  let amaran = "";
  if (jenis === "belanjawan" && !lulus) {
    if (kestabilan < paramBelanjawan.ambangUndiTidakPercaya) {
      amaran = `
        <div class="stat amaran-krisis" style="background:#fee2e2;border-left:5px solid #b91c1c;text-align:left;padding:15px;margin-top:10px">
          <h3 style="color:#b91c1c;margin-top:0">⚠️ AMARAN: KRISIS KERAJAAN</h3>
          <p>Kegagalan belanjawan dengan kestabilan rendah (${kestabilan}) boleh mencetus undi tidak percaya.</p>
          <p>Kerajaan berkemungkinan tumbang jika keadaan berterusan.</p>
        </div>
      `;
    } else {
      amaran = `
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
      ${amaran}
    </div>
  `;

  kemasKiniSejarahUndian();
  namaUsul.value = "";
  namaUsul.focus();
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

function kemasKiniPaparan() {
  const paparan = {
    populariti: populariti + "%",
    ekonomi,
    kestabilan,
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
// 6. DIALOG & RUNDINGAN AP BEBAS
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
    hasil.textContent = ahli.nama + " (" + ahli.personaliti + "). " +
      "Tawaran: " + tawaran[jenisTawaran].nama + ". " +
      dialogRespons(ahli, jenisTawaran, berjaya) +
      (berjaya ? " Rundingan berjaya." : " Rundingan gagal.") +
      " Kecenderungan sekarang: " + ahli.kecenderungan + ".";
  }

  kemasKiniPaparan();
  kemasKiniParlimen();
}

function pusinganRundinganBaharu() {
  ahliBebas.forEach(ahli => { ahli.dirunding = false; });
  kemasKiniParlimen();
  const hasil = document.getElementById("statusRundingan");
  if (hasil) {
    hasil.textContent = "Pusingan baharu bermula. Semua Ahli Parlimen Bebas boleh dirunding semula.";
  }
}

// =====================================
// 7. PAPARAN PARLIMEN
// =====================================

function kemasKiniParlimen() {
  const menyokong = ahliBebas.filter(a => a.kecenderungan >= 2).length;
  const sokonganAnggaran = kerusiKerajaan + menyokong;

  const nilai = {
    kerusiKerajaan, kerusiPembangkang,
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
      <p class="nota">${ahli.personaliti}. Keutamaan: ${tawaran[ahli.keutamaan].nama}. Kecenderungan: ${ahli.kecenderungan}.</p>
      <button onclick="rundingAhli(${ahli.id}, document.getElementById('tawaran-${ahli.id}').value)">
        Hantar tawaran
      </button>
    ` : `
      <p class="nota">Sudah dirunding pusingan ini. Kecenderungan: ${ahli.kecenderungan}.</p>
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
// 8. PILIHAN RAYA
// =====================================

function kiraMarkahPilihanRaya() {
  const hubungan = kiraHubunganParti();

  const dasarSelesai = senaraiDasar.filter(d => d.status === "selesai").length;
  const dasarGagal = senaraiDasar.filter(d => d.status === "gagal").length;

  const undianLulus = sejarahUndian.filter(u => u.lulus).length;
  const undianTolak = sejarahUndian.filter(u => !u.lulus).length;

  const bonusDasar = dasarSelesai * 2;
  const penaltiDasar = dasarGagal * 3;
  const bonusUndian = (undianLulus - undianTolak) * 0.5;

  const markah =
    populariti * 0.30 +
    ekonomi * 0.25 +
    kestabilan * 0.20 +
    hubungan * 0.15 +
    bonusDasar -
    penaltiDasar +
    bonusUndian;

  return {
    markah: Math.round(markah * 10) / 10,
    populariti: populariti,
    ekonomi: ekonomi,
    kestabilan: kestabilan,
    hubungan: hubungan,
    dasarSelesai: dasarSelesai,
    dasarGagal: dasarGagal,
    undianLulus: undianLulus,
    undianTolak: undianTolak,
    bonusDasar: bonusDasar,
    penaltiDasar: penaltiDasar,
    bonusUndian: Math.round(bonusUndian * 10) / 10
  };
}

function kiraKerusiPilihanRaya(markah) {
  const kerusi = Math.round(222 * (markah / 100));
  return Math.max(0, Math.min(222, kerusi));
}

function tentukanKeputusanKerusi(kerusi) {
  if (kerusi >= 148) return { status: "menang-besar", teks: "MENANG BESAR (2/3)" };
  if (kerusi >= 112) return { status: "menang", teks: "MENANG MAJORITI" };
  if (kerusi >= 100) return { status: "menang-tipis", teks: "MENANG TIPIS (perlu gabungan)" };
  return { status: "kalah", teks: "KALAH" };
}

function paparPanelPilihanRaya() {
  const panel = document.getElementById("panelPilihanRaya");
  if (!panel) return;

  const bolehPilihanRaya = masa.minggu >= 250;

  if (!bolehPilihanRaya) {
    panel.innerHTML = `
      <p class="nota">
        Pilihan raya hanya boleh diadakan pada minggu 250 dan ke atas.
        Minggu sekarang: ${masa.minggu} / 260.
      </p>
    `;
    return;
  }

  const markah = kiraMarkahPilihanRaya();
  const kerusi = kiraKerusiPilihanRaya(markah.markah);
  const keputusan = tentukanKeputusanKerusi(kerusi);
  const kelas = keputusan.status.startsWith("menang") ? "menang" : "kalah";
  const kerusiPembangkang = 222 - kerusi;

  panel.innerHTML = `
    <div class="stat pilihanraya ${kelas}">
      <h3>Keputusan Pilihan Raya</h3>
      <div class="markah-besar">${kerusi} / 222</div>
      <p><strong>Keputusan:</strong> ${keputusan.teks}</p>
      <p>Kerusi kerajaan: <strong>${kerusi}</strong></p>
      <p>Kerusi pembangkang: <strong>${kerusiPembangkang}</strong></p>
      <p>Majoriti mudah: 112 kerusi</p>
      <hr>
      <p class="nota">Pecahan markah (${markah.markah} / 100):</p>
      <p>Populariti: ${markah.populariti} (× 0.30)</p>
      <p>Ekonomi: ${markah.ekonomi} (× 0.25)</p>
      <p>Kestabilan: ${markah.kestabilan} (× 0.20)</p>
      <p>Hubungan parti: ${markah.hubungan} (× 0.15)</p>
      <p>Bonus dasar: +${markah.bonusDasar}</p>
      <p>Penalti dasar: −${markah.penaltiDasar}</p>
      <p>Bonus undian: ${markah.bonusUndian > 0 ? "+" : ""}${markah.bonusUndian}</p>
      <p><strong>${keputusan.status.startsWith("menang")
        ? "Kerajaan berjaya membentuk kerajaan baharu dengan " + kerusi + " kerusi."
        : "Kerajaan gagal. Pembangkang membentuk kerajaan dengan " + kerusiPembangkang + " kerusi."}</strong></p>
    </div>
    <button class="utama" onclick="jalankanPilihanRaya()">
      Sahkan Pilihan Raya
    </button>
  `;
}

function jalankanPilihanRaya() {
  const markah = kiraMarkahPilihanRaya();
  const kerusi = kiraKerusiPilihanRaya(markah.markah);
  const keputusan = tentukanKeputusanKerusi(kerusi);

  paparPanelPilihanRaya();

  if (keputusan.status.startsWith("menang")) {
    setTimeout(() => {
      if (confirm("Anda menang dengan " + kerusi + " kerusi!\n\nMahu teruskan penggal ke-2?")) {
        mulaPenggalBaharu();
      }
    }, 100);
  } else {
    alert("Anda kalah.\n\nKerusi: " + kerusi + " / 222\n\nPembangkang membentuk kerajaan.\n\nPermainan tamat.");
  }
}

function mulaPenggalBaharu() {
  masa.minggu = 1;
  masa.bulan = 1;
  masa.tahun = 1;

  senaraiDasar.forEach(d => {
    d.status = "belum";
    d.mingguBerjalan = 0;
  });
  belanjawanDasar = 50;

  ahliBebas.forEach(a => { a.dirunding = false; });
  senaraiParti.forEach(p => { p.dirunding = false; });

  kemasKiniKalendar();
  kemasKiniPaparan();
  kemasKiniParlimen();
  paparDasar();
  paparParti();
  paparPanelPilihanRaya();

  const elStatus = document.getElementById("statusMinggu");
  if (elStatus) {
    elStatus.textContent = "Penggal ke-2 bermula. Minggu 1.";
  }
}

// =====================================
// 9. MULAKAN APLIKASI
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  kemasKiniPaparan();
  kemasKiniParlimen();
  kemasKiniSejarahUndian();
  kemasKiniKalendar();
  paparPeristiwa();
  kemasKiniSejarahPeristiwa();
  paparParti();
  paparPendapat();
  paparDasar();
  paparPanelPilihanRaya();
});
