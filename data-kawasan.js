"use strict";

// =====================================
// MyPM Simulasi - Data Kawasan Parlimen
// 221 kawasan AI + 1 slot pemain = 222 kerusi
// =====================================

const DATA_NEGERI = [
  { id: "PLS", nama: "Perlis", wilayah: "utara" },
  { id: "KDH", nama: "Kedah", wilayah: "utara" },
  { id: "PLM", nama: "Pulau Mutiara", wilayah: "utara" },
  { id: "PRK", nama: "Perak Darul Reka", wilayah: "tengah" },
  { id: "SGR", nama: "Selangor Raya", wilayah: "tengah" },
  { id: "KLR", nama: "Kuala Lumpur Raya", wilayah: "tengah" },
  { id: "PJB", nama: "Putrajaya Bestari", wilayah: "tengah" },
  { id: "NSM", nama: "Negeri Sembilan Makmur", wilayah: "selatan" },
  { id: "MLJ", nama: "Melaka Jaya", wilayah: "selatan" },
  { id: "JHG", nama: "Johor Gemilang", wilayah: "selatan" },
  { id: "PHS", nama: "Pahang Sejahtera", wilayah: "pantai-timur" },
  { id: "TRG", nama: "Terengganu Indah", wilayah: "pantai-timur" },
  { id: "KLN", nama: "Kelantan Harmoni", wilayah: "pantai-timur" },
  { id: "SBM", nama: "Sabah Maju", wilayah: "sabah" },
  { id: "SWK", nama: "Sarawak Sentosa", wilayah: "sarawak" },
  { id: "LBN", nama: "Labuan Permai", wilayah: "sabah" }
];

// =====================================
// PENGUNDI PER KAWASAN
// Jumlah ~22.8 juta (dinormalize)
// =====================================

const PENGUNDI_NEGERI = {
  "Selangor Raya": 120000,
  "Kuala Lumpur Raya": 100000,
  "Putrajaya Bestari": 90000,
  "Johor Gemilang": 90000,
  "Pulau Mutiara": 85000,
  "Perak Darul Reka": 80000,
  "Kedah": 80000,
  "Negeri Sembilan Makmur": 80000,
  "Melaka Jaya": 80000,
  "Pahang Sejahtera": 75000,
  "Kelantan Harmoni": 70000,
  "Terengganu Indah": 70000,
  "Perlis": 60000,
  "Sabah Maju": 50000,
  "Sarawak Sentosa": 50000,
  "Labuan Permai": 40000
};

function kiraPengundiMentah(negeri) {
  const base = PENGUNDI_NEGERI[negeri] || 75000;
  const variasi = 0.85 + (Math.random() * 0.3);
  return Math.round(base * variasi);
}

// Bina DATA_KAWASAN
const DATA_KAWASAN = DATA_MP.map(mp => ({
  id: "K" + mp.id.substring(2),
  nama: mp.kawasan,
  negeri: mp.negeri,
  wilayah: dapatkanWilayah(mp.negeri),
  mp: mp.id,
  pengundi: kiraPengundiMentah(mp.negeri)
}));

// Tambah K222
DATA_KAWASAN.push({
  id: "K222",
  nama: "Bandar Wawasan 222",
  negeri: "Selangor Raya",
  wilayah: "tengah",
  mp: null,
  pengundi: kiraPengundiMentah("Selangor Raya")
});

// =====================================
// NORMALIZE — cukup 22.8 juta
// =====================================

const JUMLAH_SASARAN = 22800000;
const jumlahMentah = DATA_KAWASAN.reduce((t, k) => t + k.pengundi, 0);
const faktor = JUMLAH_SASARAN / jumlahMentah;

DATA_KAWASAN.forEach(k => {
  k.pengundi = Math.round(k.pengundi * faktor);
});

// Betulkan baki sebab rounding
const jumlahBaru = DATA_KAWASAN.reduce((t, k) => t + k.pengundi, 0);
const beza = JUMLAH_SASARAN - jumlahBaru;
if (beza !== 0) {
  DATA_KAWASAN[0].pengundi += beza;
}

const JUMLAH_PENGUNDI = DATA_KAWASAN.reduce((t, k) => t + k.pengundi, 0);
console.log("👥 Jumlah pengundi:", JUMLAH_PENGUNDI.toLocaleString());

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanWilayah(namaNegeri) {
  const negeri = DATA_NEGERI.find(n => n.nama === namaNegeri);
  return negeri ? negeri.wilayah : "lain";
}

function dapatkanKawasan(id) {
  return DATA_KAWASAN.find(k => k.id === id);
}

function dapatkanKawasanMP(mpId) {
  return DATA_KAWASAN.find(k => k.mp === mpId);
}

function senaraiKawasanMengikutNegeri(namaNegeri) {
  return DATA_KAWASAN.filter(k => k.negeri === namaNegeri);
}

function senaraiKawasanMengikutWilayah(wilayah) {
  return DATA_KAWASAN.filter(k => k.wilayah === wilayah);
}

function jumlahKerusiDewanRakyat() {
  return DATA_KAWASAN.length;
}

function jumlahKerusiAI() {
  return DATA_KAWASAN.filter(k => !k.mp).length;
}

function dapatkanKerusiPemain() {
  return DATA_KAWASAN.find(k => k.id === "K222");
}