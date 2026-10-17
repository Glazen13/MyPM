"use strict";

// =====================================
// MyPM Simulasi - Data Parti Politik
// 24 Parti Fiksyen
// =====================================

const DATA_PARTI = [
  // =====================================
  // A. Parti Nasional dan Arus Perdana
  // =====================================
  {
    id: "PAN",
    nama: "Parti Amanat Nasional",
    singkatan: "PAN",
    emoji: "🕊️",
    kategori: "nasional",
    ideologi: "Reformasi dan pentadbiran progresif",
    warna: "#2563eb",
    fokus: "Integriti, akauntabiliti, pembaharuan institusi",
    kekuatan: "Kredibiliti reformasi, sokongan bandar, pengundi terpelajar",
    kelemahan: "Kurang sokongan luar bandar, dianggap idealistik",
    kumpulanSokongan: ["bandar", "belia", "profesional"],
    pengaruhWilayah: { utara: 45, tengah: 75, selatan: 55, sabah: 40, sarawak: 40 }
  },
  {
    id: "PMR",
    nama: "Parti Muafakat Rakyat",
    singkatan: "PMR",
    emoji: "🤝",
    kategori: "nasional",
    ideologi: "Konservatisme dan perpaduan masyarakat",
    warna: "#166534",
    fokus: "Keselamatan, perpaduan, nilai tradisional",
    kekuatan: "Sokongan luar bandar, kestabilan, tradisi",
    kelemahan: "Kurang popular bandar, dianggap kolot",
    kumpulanSokongan: ["luarBandar", "wargaEmas", "pekerja"],
    pengaruhWilayah: { utara: 70, tengah: 45, selatan: 60, sabah: 55, sarawak: 60 }
  },
  {
    id: "PKB",
    nama: "Parti Kemajuan Bersama",
    singkatan: "PKB",
    emoji: "💼",
    kategori: "nasional",
    ideologi: "Pembangunan ekonomi dan pragmatisme",
    warna: "#0369a1",
    fokus: "Ekonomi, pelaburan, industri, pekerjaan",
    kekuatan: "Pengalaman ekonomi, sokongan perniagaan",
    kelemahan: "Dianggap pro-korporat, kurang mesra rakyat",
    kumpulanSokongan: ["bandar", "pekerja", "profesional"],
    pengaruhWilayah: { utara: 55, tengah: 70, selatan: 65, sabah: 50, sarawak: 50 }
  },
  {
    id: "PDM",
    nama: "Parti Demokratik Madani",
    singkatan: "PDM",
    emoji: "❤",
    kategori: "nasional",
    ideologi: "Demokrasi sosial dan kebajikan",
    warna: "#dc2626",
    fokus: "Kebajikan, kesihatan, pendidikan, hak sosial",
    kekuatan: "Sokongan pekerja, program sosial",
    kelemahan: "Dianggap pemboros, kurang mesra perniagaan",
    kumpulanSokongan: ["bandar", "pekerja", "belia"],
    pengaruhWilayah: { utara: 60, tengah: 65, selatan: 55, sabah: 55, sarawak: 50 }
  },
  {
    id: "PPM",
    nama: "Parti Perpaduan Malaysia",
    singkatan: "PPM",
    emoji: "🇲🇾",
    kategori: "nasional",
    ideologi: "Nasionalisme dan perpaduan",
    warna: "#7c3aed",
    fokus: "Perpaduan nasional, kedaulatan, tradisi",
    kekuatan: "Sokongan Melayu, perpaduan kaum",
    kelemahan: "Dianggap perkauman oleh sesetengah pihak",
    kumpulanSokongan: ["luarBandar", "pekerja", "wargaEmas"],
    pengaruhWilayah: { utara: 65, tengah: 55, selatan: 65, sabah: 60, sarawak: 55 }
  },
  {
    id: "PMM",
    nama: "Parti Masa Depan Malaysia",
    singkatan: "PMM",
    emoji: "🚀",
    kategori: "nasional",
    ideologi: "Teknologi dan pembaharuan",
    warna: "#0891b2",
    fokus: "Teknologi, inovasi, digitalisasi, masa depan",
    kekuatan: "Sokongan belia, bandar, teknologi",
    kelemahan: "Kurang sokongan luar bandar, warga emas",
    kumpulanSokongan: ["bandar", "belia", "profesional"],
    pengaruhWilayah: { utara: 45, tengah: 75, selatan: 55, sabah: 45, sarawak: 45 }
  },

  // =====================================
  // B. Parti Berteraskan Agama, Nilai dan Masyarakat
  // =====================================
  {
    id: "PIS",
    nama: "Parti Islam Sejahtera",
    singkatan: "PIS",
    emoji: "🕌",
    kategori: "agama",
    ideologi: "Nilai Islam, kebajikan dan pendidikan",
    warna: "#15803d",
    fokus: "Nilai Islam, pendidikan, kebajikan ummah",
    kekuatan: "Sokongan kuat Melayu-Muslim, luar bandar",
    kelemahan: "Kurang sokongan bukan-Muslim, bandar",
    kumpulanSokongan: ["luarBandar", "wargaEmas", "pekerja"],
    pengaruhWilayah: { utara: 80, tengah: 45, selatan: 55, sabah: 45, sarawak: 35 }
  },
  {
    id: "PUP",
    nama: "Parti Ummah Progresif",
    singkatan: "PUP",
    emoji: "⭐",
    kategori: "agama",
    ideologi: "Pembangunan masyarakat dan integriti",
    warna: "#059669",
    fokus: "Integriti, masyarakat, pembangunan insan",
    kekuatan: "Integriti tinggi, sokongan profesional Muslim",
    kelemahan: "Kurang sokongan pekerja, luar bandar",
    kumpulanSokongan: ["bandar", "profesional", "belia"],
    pengaruhWilayah: { utara: 55, tengah: 60, selatan: 55, sabah: 50, sarawak: 50 }
  },
  {
    id: "PHM",
    nama: "Parti Hak Masyarakat",
    singkatan: "PHM",
    emoji: "🤲",
    kategori: "masyarakat",
    ideologi: "Hak komuniti dan peluang saksama",
    warna: "#ea580c",
    fokus: "Hak komuniti, peluang saksama, kepelbagaian",
    kekuatan: "Sokongan minoriti, bandar, profesional muda",
    kelemahan: "Kurang sokongan luar bandar Melayu",
    kumpulanSokongan: ["bandar", "belia", "profesional"],
    pengaruhWilayah: { utara: 45, tengah: 70, selatan: 50, sabah: 55, sarawak: 55 }
  },
  {
    id: "PKS",
    nama: "Parti Keadilan Sosial",
    singkatan: "PKS",
    emoji: "⚖️",
    kategori: "masyarakat",
    ideologi: "Kebajikan dan keadilan ekonomi",
    warna: "#be123c",
    fokus: "Keadilan ekonomi, kos sara hidup, kebajikan",
    kekuatan: "Sokongan pekerja, bandar, golongan B40",
    kelemahan: "Dianggap populis, kurang mesra perniagaan",
    kumpulanSokongan: ["bandar", "pekerja", "belia"],
    pengaruhWilayah: { utara: 60, tengah: 65, selatan: 60, sabah: 55, sarawak: 50 }
  },
  {
    id: "PSR",
    nama: "Parti Suara Rakyat",
    singkatan: "PSR",
    emoji: "📢",
    kategori: "masyarakat",
    ideologi: "Ketelusan dan akauntabiliti",
    warna: "#7e22ce",
    fokus: "Ketelusan, akauntabiliti, antirasuah",
    kekuatan: "Integriti tinggi, sokongan profesional",
    kelemahan: "Kurang sokongan luar bandar",
    kumpulanSokongan: ["bandar", "profesional", "belia"],
    pengaruhWilayah: { utara: 50, tengah: 70, selatan: 55, sabah: 50, sarawak: 50 }
  },
  {
    id: "PGM",
    nama: "Parti Generasi Muda",
    singkatan: "PGM",
    emoji: "🎓",
    kategori: "masyarakat",
    ideologi: "Pekerjaan, perumahan dan pendidikan belia",
    warna: "#f59e0b",
    fokus: "Belia, pekerjaan, perumahan, pendidikan",
    kekuatan: "Sokongan belia kuat, media sosial",
    kelemahan: "Kurang sokongan warga emas",
    kumpulanSokongan: ["bandar", "belia"],
    pengaruhWilayah: { utara: 55, tengah: 70, selatan: 60, sabah: 50, sarawak: 50 }
  },

  // =====================================
  // C. Parti Wilayah dan Negeri
  // =====================================
  {
    id: "PKSbh",
    nama: "Parti Kemajuan Sabah",
    singkatan: "PKSbh",
    emoji: "🌴",
    kategori: "wilayah",
    ideologi: "Pembangunan Sabah",
    warna: "#0d9488",
    fokus: "Pembangunan Sabah, infrastruktur, ekonomi tempatan",
    kekuatan: "Sokongan kuat Sabah",
    kelemahan: "Kurang pengaruh Semenanjung",
    kumpulanSokongan: ["luarBandar", "pekerja", "belia"],
    pengaruhWilayah: { utara: 20, tengah: 20, selatan: 20, sabah: 90, sarawak: 30 }
  },
  {
    id: "PRSB",
    nama: "Parti Rakyat Sabah Bersatu",
    singkatan: "PRSB",
    emoji: "🏝️",
    kategori: "wilayah",
    ideologi: "Hak negeri dan pembangunan luar bandar",
    warna: "#15803d",
    fokus: "Hak Sabah, luar bandar, masyarakat tempatan",
    kekuatan: "Sokongan luar bandar Sabah",
    kelemahan: "Kurang sokongan bandar",
    kumpulanSokongan: ["luarBandar", "pekerja"],
    pengaruhWilayah: { utara: 15, tengah: 15, selatan: 15, sabah: 80, sarawak: 25 }
  },
  {
    id: "PWB",
    nama: "Parti Warisan Borneo",
    singkatan: "PWB",
    emoji: "🌊",
    kategori: "wilayah",
    ideologi: "Identiti wilayah dan pembangunan tempatan",
    warna: "#0e7490",
    fokus: "Identiti Borneo, pembangunan tempatan",
    kekuatan: "Sokongan Sabah + Sarawak",
    kelemahan: "Kurang sokongan Semenanjung",
    kumpulanSokongan: ["luarBandar", "belia", "pekerja"],
    pengaruhWilayah: { utara: 20, tengah: 20, selatan: 25, sabah: 75, sarawak: 75 }
  },
  {
    id: "PBSwk",
    nama: "Parti Bumiputera Sarawak",
    singkatan: "PBSwk",
    emoji: "🦅",
    kategori: "wilayah",
    ideologi: "Hak negeri dan masyarakat tempatan",
    warna: "#166534",
    fokus: "Hak Sarawak, masyarakat tempatan, tanah adat",
    kekuatan: "Sokongan kuat Sarawak",
    kelemahan: "Kurang pengaruh Semenanjung",
    kumpulanSokongan: ["luarBandar", "pekerja"],
    pengaruhWilayah: { utara: 20, tengah: 20, selatan: 20, sabah: 30, sarawak: 85 }
  },
  {
    id: "PRSM",
    nama: "Parti Rakyat Sarawak Maju",
    singkatan: "PRSM",
    emoji: "⚡",
    kategori: "wilayah",
    ideologi: "Industri, tenaga dan pekerjaan",
    warna: "#0d9488",
    fokus: "Industri Sarawak, tenaga, pekerjaan",
    kekuatan: "Sokongan bandar Sarawak",
    kelemahan: "Kurang sokongan luar bandar",
    kumpulanSokongan: ["bandar", "pekerja", "profesional"],
    pengaruhWilayah: { utara: 15, tengah: 15, selatan: 15, sabah: 30, sarawak: 75 }
  },
  {
    id: "PSB",
    nama: "Parti Suara Borneo",
    singkatan: "PSB",
    emoji: "🗻",
    kategori: "wilayah",
    ideologi: "Kepentingan wilayah Sabah dan Sarawak",
    warna: "#0284c7",
    fokus: "Sabah dan Sarawak, autonomi, pembangunan",
    kekuatan: "Sokongan Sabah + Sarawak",
    kelemahan: "Kurang sokongan Semenanjung",
    kumpulanSokongan: ["luarBandar", "belia"],
    pengaruhWilayah: { utara: 20, tengah: 20, selatan: 20, sabah: 70, sarawak: 70 }
  },
  {
    id: "PKU",
    nama: "Parti Kemajuan Utara",
    singkatan: "PKU",
    emoji: "🌾",
    kategori: "wilayah",
    ideologi: "Pertanian dan industri utara Semenanjung",
    warna: "#65a30d",
    fokus: "Pertanian, industri utara, nelayan, petani",
    kekuatan: "Sokongan utara Semenanjung",
    kelemahan: "Kurang sokongan selatan",
    kumpulanSokongan: ["luarBandar", "pekerja"],
    pengaruhWilayah: { utara: 75, tengah: 25, selatan: 20, sabah: 25, sarawak: 25 }
  },
  {
    id: "PPPT",
    nama: "Parti Pembangunan Pantai Timur",
    singkatan: "PPPT",
    emoji: "🌅",
    kategori: "wilayah",
    ideologi: "Infrastruktur dan pembangunan Pantai Timur",
    warna: "#ca8a04",
    fokus: "Infrastruktur Pantai Timur, jalan, bekalan air",
    kekuatan: "Sokongan Pantai Timur",
    kelemahan: "Kurang pengaruh bandar besar",
    kumpulanSokongan: ["luarBandar", "pekerja"],
    pengaruhWilayah: { utara: 30, tengah: 30, selatan: 30, sabah: 70, sarawak: 65 }
  },

  // =====================================
  // D. Parti Khusus dan Alternatif
  // =====================================
  {
    id: "PHijau",
    nama: "Parti Hijau Malaysia",
    singkatan: "PHijau",
    emoji: "🌿",
    kategori: "khusus",
    ideologi: "Alam sekitar dan tenaga bersih",
    warna: "#16a34a",
    fokus: "Alam sekitar, tenaga bersih, kelestarian",
    kekuatan: "Sokongan belia, bandar, profesional",
    kelemahan: "Kurang sokongan luar bandar, industri",
    kumpulanSokongan: ["bandar", "belia", "profesional"],
    pengaruhWilayah: { utara: 45, tengah: 60, selatan: 50, sabah: 55, sarawak: 55 }
  },
  {
    id: "PSP",
    nama: "Parti Suara Pekerja",
    singkatan: "PSP",
    emoji: "👷",
    kategori: "khusus",
    ideologi: "Hak pekerja dan gaji",
    warna: "#dc2626",
    fokus: "Hak pekerja, gaji minimum, keselamatan kerja",
    kekuatan: "Sokongan pekerja, kesatuan sekerja",
    kelemahan: "Kurang sokongan profesional, perniagaan",
    kumpulanSokongan: ["pekerja", "bandar"],
    pengaruhWilayah: { utara: 55, tengah: 65, selatan: 60, sabah: 55, sarawak: 55 }
  },
  {
    id: "PUM",
    nama: "Parti Usahawan Malaysia",
    singkatan: "PUM",
    emoji: "🏪",
    kategori: "khusus",
    ideologi: "PKS, perniagaan dan pelaburan",
    warna: "#1d4ed8",
    fokus: "PKS, perniagaan, pelaburan, usahawan",
    kekuatan: "Sokongan perniagaan, profesional",
    kelemahan: "Kurang sokongan pekerja, luar bandar",
    kumpulanSokongan: ["bandar", "profesional"],
    pengaruhWilayah: { utara: 55, tengah: 65, selatan: 60, sabah: 55, sarawak: 55 }
  },
  {
    id: "PRI",
    nama: "Parti Reformasi Institusi",
    singkatan: "PRI",
    emoji: "🛡️",
    kategori: "khusus",
    ideologi: "Antirasuah dan pembaharuan institusi",
    warna: "#7c2d12",
    fokus: "Antirasuah, reformasi, integriti institusi",
    kekuatan: "Integriti tertinggi, sokongan profesional",
    kelemahan: "Kurang sokongan luar bandar",
    kumpulanSokongan: ["bandar", "profesional", "belia"],
    pengaruhWilayah: { utara: 50, tengah: 70, selatan: 55, sabah: 50, sarawak: 50 }
  }
];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanParti(id) {
  return DATA_PARTI.find(p => p.id === id);
}

function senaraiPartiMengikutKategori(kategori) {
  return DATA_PARTI.filter(p => p.kategori === kategori);
}
