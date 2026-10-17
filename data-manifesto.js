"use strict";

// =====================================
// MyPM Simulasi - Data Manifesto 100 Hari
// 10 manifesto untuk pemain pilih 5
// =====================================

const DATA_MANIFESTO = [
  {
    id: "M001",
    nama: "Mengurangkan Kos Sara Hidup",
    kategori: "ekonomi",
    matlamat: "Mengurangkan tekanan perbelanjaan isi rumah melalui bantuan bersasar dan langkah mengawal harga barangan keperluan.",
    kementerian: ["Kewangan", "Perdagangan Dalam Negeri dan Kos Sara Hidup", "Ekonomi"],
    sasaran: { metrik: "indeksKosSaraHidup", dari: 50, ke: 42 },
    kos: 8,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 8, populariti: 5, ekonomi: 3 },
    akibatGagal: { kepuasan: -5, populariti: -3, ekonomi: -1 }
  },
  {
    id: "M002",
    nama: "Mewujudkan Peluang Pekerjaan",
    kategori: "pekerjaan",
    matlamat: "Meningkatkan peluang pekerjaan melalui insentif penggajian, latihan kemahiran dan galakan pelaburan.",
    kementerian: ["Ekonomi", "Sumber Manusia", "Pelaburan, Perdagangan dan Industri"],
    sasaran: { metrik: "pengangguran", dari: 3.5, ke: 3.0 },
    kos: 6,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 6, populariti: 4, ekonomi: 5 },
    akibatGagal: { kepuasan: -4, populariti: -2, ekonomi: -2 }
  },
  {
    id: "M003",
    nama: "Memperbaiki Perkhidmatan Kesihatan Awam",
    kategori: "kesihatan",
    matlamat: "Memperbaiki akses rawatan, menambah baik kemudahan kesihatan dan mengurangkan kesesakan hospital.",
    kementerian: ["Kesihatan", "Kewangan"],
    sasaran: { metrik: "aksesKesihatan", dari: 55, ke: 65 },
    kos: 10,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 9, populariti: 5 },
    akibatGagal: { kepuasan: -6, populariti: -3 }
  },
  {
    id: "M004",
    nama: "Memperkukuh Pendidikan dan Kemahiran Belia",
    kategori: "pendidikan",
    matlamat: "Memperluas latihan teknikal dan vokasional, tingkatkan kemahiran graduan serta peluang pekerjaan golongan muda.",
    kementerian: ["Pendidikan", "Pendidikan Tinggi", "Sumber Manusia", "Belia dan Sukan"],
    sasaran: { metrik: "kemahiranBelia", dari: 50, ke: 60 },
    kos: 7,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 7, populariti: 4 },
    akibatGagal: { kepuasan: -4, populariti: -2 }
  },
  {
    id: "M005",
    nama: "Mempercepat Pembangunan Infrastruktur",
    kategori: "infrastruktur",
    matlamat: "Menaik taraf jalan raya, pengangkutan awam dan kemudahan asas mengikut keutamaan negara.",
    kementerian: ["Kerja Raya", "Pengangkutan", "Pembangunan Luar Bandar", "Kewangan"],
    sasaran: { metrik: "indeksInfrastruktur", dari: 55, ke: 62 },
    kos: 12,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 7, populariti: 3, ekonomi: 4 },
    akibatGagal: { kepuasan: -5, populariti: -3, ekonomi: -2 }
  },
  {
    id: "M006",
    nama: "Memerangi Rasuah",
    kategori: "integriti",
    matlamat: "Memperbaiki ketelusan perolehan kerajaan, memperkukuh pengawasan dan mengurangkan risiko salah guna kuasa.",
    kementerian: ["Undang-Undang dan Reformasi Institusi"],
    sasaran: { metrik: "indeksIntegriti", dari: 50, ke: 65 },
    kos: 3,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 6, populariti: 5, integriti: 10 },
    akibatGagal: { kepuasan: -7, populariti: -5, integriti: -5 }
  },
  {
    id: "M007",
    nama: "Memperbaiki Perumahan Rakyat",
    kategori: "perumahan",
    matlamat: "Memperluas akses rumah mampu milik dan menambah baik kemudahan perumahan untuk golongan memerlukan.",
    kementerian: ["Perumahan dan Kerajaan Tempatan", "Kewangan"],
    sasaran: { metrik: "aksesPerumahan", dari: 48, ke: 58 },
    kos: 9,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 8, populariti: 4 },
    akibatGagal: { kepuasan: -5, populariti: -3 }
  },
  {
    id: "M008",
    nama: "Memperkukuh Keselamatan Makanan",
    kategori: "pertanian",
    matlamat: "Meningkatkan pengeluaran makanan tempatan, membantu petani dan mengurangkan risiko gangguan bekalan.",
    kementerian: ["Pertanian dan Keterjaminan Makanan", "Ekonomi"],
    sasaran: { metrik: "keterjaminanMakanan", dari: 52, ke: 62 },
    kos: 6,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 6, populariti: 3, ekonomi: 3 },
    akibatGagal: { kepuasan: -4, populariti: -2 }
  },
  {
    id: "M009",
    nama: "Membantu Perusahaan Kecil dan Sederhana",
    kategori: "perniagaan",
    matlamat: "Memudahkan akses pembiayaan, latihan perniagaan dan peluang pasaran untuk perusahaan kecil dan sederhana.",
    kementerian: ["Pembangunan Usahawan dan Koperasi", "Pelaburan, Perdagangan dan Industri"],
    sasaran: { metrik: "indeksPKS", dari: 50, ke: 60 },
    kos: 7,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 5, populariti: 3, ekonomi: 6 },
    akibatGagal: { kepuasan: -3, populariti: -2, ekonomi: -3 }
  },
  {
    id: "M010",
    nama: "Mempercepat Pendigitalan Kerajaan",
    kategori: "teknologi",
    matlamat: "Memperluas perkhidmatan kerajaan dalam talian dan mengurangkan proses pentadbiran yang tidak perlu.",
    kementerian: ["Digital", "Komunikasi"],
    sasaran: { metrik: "indeksDigital", dari: 50, ke: 65 },
    kos: 5,
    tempoh: 100,
    ganjaranBerjaya: { kepuasan: 5, populariti: 4, ekonomi: 4 },
    akibatGagal: { kepuasan: -3, populariti: -2, ekonomi: -1 }
  }
];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanManifesto(id) {
  return DATA_MANIFESTO.find(m => m.id === id);
}

function senaraiManifestoMengikutKategori(kategori) {
  return DATA_MANIFESTO.filter(m => m.kategori === kategori);
}

function jumlahManifesto() {
  return DATA_MANIFESTO.length;
}