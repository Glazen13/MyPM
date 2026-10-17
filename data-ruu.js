"use strict";

// =====================================
// MyPM Simulasi - Data Rang Undang-Undang (RUU)
// Fasa 4.4: Sistem Undian Parlimen
// =====================================

const DATA_RUU = [
  {
    id: "RUU001",
    nama: "Akta Perlindungan Pekerja Gig",
    kategori: "buruh",
    deskripsi: "Memberi perlindungan sosial, insurans kemalangan dan hak gaji minimum kepada pekerja gig seperti penghantar makanan dan pemandu e-hailing.",
    kesan: "Sokongan pekerja gig naik, kos syarikat platform naik sedikit.",
    kementerian: "Sumber Manusia",
    sokonganKerajaanAsas: 0.85,
    sokonganPembangkangAsas: 0.45,
    sokonganBebasAsas: 0.55,
    isuPanas: false
  },
  {
    id: "RUU002",
    nama: "Akta Integriti Perolehan Kerajaan",
    kategori: "integriti",
    deskripsi: "Mewajibkan semua perolehan kerajaan melebihi RM 50 juta melalui tender terbuka dan diaudit oleh badan bebas.",
    kesan: "Integriti kerajaan naik, sebahagian ahli politik tidak puas hati.",
    kementerian: "Undang-Undang dan Reformasi Institusi",
    sokonganKerajaanAsas: 0.60,
    sokonganPembangkangAsas: 0.75,
    sokonganBebasAsas: 0.70,
    isuPanas: true
  },
  {
    id: "RUU003",
    nama: "Akta Kos Sara Hidup (Kawalan Harga)",
    kategori: "ekonomi",
    deskripsi: "Mengawal harga barang keperluan utama (beras, minyak masak, gula) dan mengenakan penalti kepada peniaga yang menaikkan harga melebihi kadar ditetapkan.",
    kesan: "Kepuasan rakyat naik, sebahagian peniaga dan pengeluar bantah.",
    kementerian: "Perdagangan Dalam Negeri dan Kos Sara Hidup",
    sokonganKerajaanAsas: 0.80,
    sokonganPembangkangAsas: 0.65,
    sokonganBebasAsas: 0.75,
    isuPanas: false
  },
  {
    id: "RUU004",
    nama: "Akta Cukai Keuntungan Modal",
    kategori: "cukai",
    deskripsi: "Mengenakan cukai ke atas keuntungan jualan saham dan hartanah bernilai tinggi untuk meningkatkan hasil kerajaan.",
    kesan: "Hasil kerajaan naik, pelabur besar kurang puas hati.",
    kementerian: "Kewangan",
    sokonganKerajaanAsas: 0.70,
    sokonganPembangkangAsas: 0.35,
    sokonganBebasAsas: 0.40,
    isuPanas: true
  },
  {
    id: "RUU005",
    nama: "Akta Peralihan Tenaga Bersih",
    kategori: "alam",
    deskripsi: "Menetapkan sasaran 40% tenaga boleh diperbaharui menjelang 2035 dan mengenakan cukai karbon kepada industri besar.",
    kesan: "Imej hijau negara naik, kos industri naik jangka pendek.",
    kementerian: "Peralihan Tenaga dan Transformasi Air",
    sokonganKerajaanAsas: 0.75,
    sokonganPembangkangAsas: 0.55,
    sokonganBebasAsas: 0.50,
    isuPanas: false
  },
  {
    id: "RUU006",
    nama: "Akta Perumahan Mampu Milik",
    kategori: "perumahan",
    deskripsi: "Mewajibkan pemaju menyediakan 30% unit rumah mampu milik dalam setiap projek perumahan baharu.",
    kesan: "Rakyat muda gembira, pemaju hartanah kurang puas hati.",
    kementerian: "Perumahan dan Kerajaan Tempatan",
    sokonganKerajaanAsas: 0.85,
    sokonganPembangkangAsas: 0.70,
    sokonganBebasAsas: 0.80,
    isuPanas: false
  },
  {
    id: "RUU007",
    nama: "Akta Pembaharuan Pendidikan",
    kategori: "pendidikan",
    deskripsi: "Mengurangkan beban peperiksaan, memperluas pendidikan vokasional dan meningkatkan gaji guru.",
    kesan: "Guru dan ibu bapa gembira, kos pendidikan naik.",
    kementerian: "Pendidikan",
    sokonganKerajaanAsas: 0.80,
    sokonganPembangkangAsas: 0.60,
    sokonganBebasAsas: 0.70,
    isuPanas: false
  },
  {
    id: "RUU008",
    nama: "Akta Autonomi Sabah dan Sarawak",
    kategori: "wilayah",
    deskripsi: "Memberi kuasa lebih besar kepada Sabah dan Sarawak dalam pengurusan hasil, tanah dan pendidikan.",
    kesan: "Ahli Parlimen Borneo gembira, sebahagian Semenanjung bimbang.",
    kementerian: "Pembangunan Sabah",
    sokonganKerajaanAsas: 0.55,
    sokonganPembangkangAsas: 0.80,
    sokonganBebasAsas: 0.60,
    isuPanas: true
  },
  {
    id: "RUU009",
    nama: "Akta Keselamatan Siber Negara",
    kategori: "keselamatan",
    deskripsi: "Memperkukuh perlindungan data rakyat dan mengenakan penalti berat kepada syarikat yang gagal melindungi data pengguna.",
    kesan: "Pengguna gembira, syarikat teknologi bimbang kos pematuhan.",
    kementerian: "Digital",
    sokonganKerajaanAsas: 0.85,
    sokonganPembangkangAsas: 0.65,
    sokonganBebasAsas: 0.70,
    isuPanas: false
  },
  {
    id: "RUU010",
    nama: "Akta Kesihatan Mental Kebangsaan",
    kategori: "kesihatan",
    deskripsi: "Memperuntukkan dana khas untuk perkhidmatan kesihatan mental dan mewajibkan majikan menyediakan sokongan kesihatan mental pekerja.",
    kesan: "Pekerja dan keluarga gembira, kos majikan naik sedikit.",
    kementerian: "Kesihatan",
    sokonganKerajaanAsas: 0.85,
    sokonganPembangkangAsas: 0.75,
    sokonganBebasAsas: 0.80,
    isuPanas: false
  },
  {
    id: "RUU011",
    nama: "Akta Antiberita Palsu",
    kategori: "komunikasi",
    deskripsi: "Mengenakan penalti kepada penyebar berita palsu yang menjejaskan ketenteraman awam.",
    kesan: "Kerajaan nampak tegas, tetapi media dan aktivis bantah.",
    kementerian: "Komunikasi",
    sokonganKerajaanAsas: 0.75,
    sokonganPembangkangAsas: 0.20,
    sokonganBebasAsas: 0.35,
    isuPanas: true
  },
  {
    id: "RUU012",
    nama: "Akta Gaji Minimum Baharu",
    kategori: "buruh",
    deskripsi: "Menaikkan gaji minimum dari RM 1500 kepada RM 1800 sebulan.",
    kesan: "Pekerja gembira, majikan kecil bimbang.",
    kementerian: "Sumber Manusia",
    sokonganKerajaanAsas: 0.80,
    sokonganPembangkangAsas: 0.60,
    sokonganBebasAsas: 0.70,
    isuPanas: false
  }
];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanRUU(id) {
  return DATA_RUU.find(r => r.id === id);
}

function senaraiRUUMengikutKategori(kategori) {
  return DATA_RUU.filter(r => r.kategori === kategori);
}

function jumlahRUU() {
  return DATA_RUU.length;
}