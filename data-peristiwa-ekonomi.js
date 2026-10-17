"use strict";

// =====================================
// MyPM Simulasi - Data Peristiwa Ekonomi
// Fasa 6.0: Sistem Ekonomi dan Bajet
// =====================================

const DATA_PERISTIWA_EKONOMI = [
  // =====================================
  // KEJUTAN GLOBAL
  // =====================================
  {
    id: "EK001",
    nama: "Kejutan Harga Minyak Dunia",
    kategori: "global",
    ikon: "🛢️",
    deskripsi: "Harga minyak mentah dunia melonjak 40% akibat ketegangan geopolitik. Kos import dan subsidi kerajaan meningkat.",
    jenis: "negatif",
    kesanAsas: {
      inflasi: +1.2,
      hasil: +15,
      perbelanjaan: +25,
      populariti: -3,
      pertumbuhan: -0.5
    },
    pilihan: [
      {
        teks: "Naikkan subsidi minyak",
        kesan: { populariti: +3, perbelanjaan: +15, inflasi: -0.8 },
        label: "Populari naik"
      },
      {
        teks: "Biarkan harga terapung",
        kesan: { populariti: -5, perbelanjaan: -10, inflasi: +0.5 },
        label: "Jimat bajet"
      },
      {
        teks: "Kawal harga siling",
        kesan: { populariti: +2, inflasi: -0.4, pertumbuhan: -0.3 },
        label: "Inflasi turun"
      }
    ]
  },
  {
    id: "EK002",
    nama: "Kemelesetan Ekonomi Global",
    kategori: "global",
    ikon: "🌍",
    deskripsi: "Ekonomi dunia menyusut akibat kemelesetan di Amerika Syarikat dan China. Permintaan eksport Malaysia jatuh.",
    jenis: "negatif",
    kesanAsas: {
      pertumbuhan: -2.0,
      hasil: -25,
      populariti: -4,
      pengangguran: +0.8
    },
    pilihan: [
      {
        teks: "Rangsangan fiskal besar",
        kesan: { pertumbuhan: +1.5, hasil: -10, hutang: +20, populariti: +3 },
        label: "Ekonomi pulih"
      },
      {
        teks: "Rangsangan sederhana",
        kesan: { pertumbuhan: +0.6, hutang: +8 },
        label: "Seimbang"
      },
      {
        teks: "Jimat dan tunggu",
        kesan: { populariti: -3, pengangguran: +0.5 },
        label: "Jimat bajet"
      }
    ]
  },
  {
    id: "EK003",
    nama: "Krisis Rantaian Bekalan",
    kategori: "global",
    ikon: "🚢",
    deskripsi: "Pelabuhan utama Asia tersekat akibat bencana alam. Bekalan barang keperluan lambat sampai.",
    jenis: "negatif",
    kesanAsas: {
      inflasi: +0.8,
      pertumbuhan: -0.6,
      populariti: -2
    },
    pilihan: [
      {
        teks: "Import dari sumber alternatif",
        kesan: { inflasi: -0.3, perbelanjaan: +10 },
        label: "Inflasi turun"
      },
      {
        teks: "Kawal bekalan tempatan",
        kesan: { populariti: +1, pertumbuhan: -0.2 },
        label: "Sokongan rakyat"
      }
    ]
  },

  // =====================================
  // PELABURAN DAN PERTUMBUHAN
  // =====================================
  {
    id: "EK004",
    nama: "Pelaburan Besar Masuk",
    kategori: "positif",
    ikon: "💼",
    deskripsi: "Sebuah syarikat teknologi multinasional mengumumkan pelaburan RM 20 bilion di Malaysia. Ribuan pekerjaan baharu dijangka tercipta.",
    jenis: "positif",
    kesanAsas: {
      pertumbuhan: +1.2,
      pengangguran: -0.4,
      hasil: +10,
      populariti: +4
    },
    pilihan: [
      {
        teks: "Beri insentif cukai tambahan",
        kesan: { pertumbuhan: +0.5, hasil: -5, populariti: +2 },
        label: "Pelaburan naik"
      },
      {
        teks: "Syarat ketat tempatan",
        kesan: { hasil: +5, populariti: -1 },
        label: "Hasil naik"
      },
      {
        teks: "Terima tanpa syarat",
        kesan: { populariti: +3, pengangguran: -0.3 },
        label: "Populari naik"
      }
    ]
  },
  {
    id: "EK005",
    nama: "Boom Pelancongan",
    kategori: "positif",
    ikon: "✈️",
    deskripsi: "Bilangan pelancong asing meningkat 30% tahun ini. Sektor hotel, restoran dan pengangkutan menerima manfaat besar.",
    jenis: "positif",
    kesanAsas: {
      pertumbuhan: +0.8,
      hasil: +8,
      pengangguran: -0.3,
      populariti: +2
    },
    pilihan: [
      {
        teks: "Promosi agresif ke luar negara",
        kesan: { populariti: +1, perbelanjaan: +3, pertumbuhan: +0.3 },
        label: "Pelancong naik"
      },
      {
        teks: "Naik taraf infrastruktur",
        kesan: { pertumbuhan: +0.2, perbelanjaan: +8 },
        label: "Jangka panjang"
      }
    ]
  },
  {
    id: "EK006",
    nama: "Sektor Teknologi Berkembang",
    kategori: "positif",
    ikon: "🚀",
    deskripsi: "Startup tempatan berjaya menarik pelaburan antarabangsa. Ekonomi digital menyumbang lebih banyak kepada KDNK.",
    jenis: "positif",
    kesanAsas: {
      pertumbuhan: +0.6,
      pengangguran: -0.3,
      populariti: +2
    },
    pilihan: [
      {
        teks: "Beri geran penyelidikan",
        kesan: { pertumbuhan: +0.3, perbelanjaan: +5 },
        label: "Inovasi naik"
      },
      {
        teks: "Kurangkan cukai startup",
        kesan: { hasil: -3, pertumbuhan: +0.4 },
        label: "Startup naik"
      }
    ]
  },

  // =====================================
  // CUKAI DAN HASIL
  // =====================================
  {
    id: "EK007",
    nama: "Kebocoran Hasil Cukai",
    kategori: "negatif",
    ikon: "💰",
    deskripsi: "Audit mendapati terdapat kebocoran dalam kutipan cukai dan duti import. Kerajaan kehilangan hasil yang besar.",
    jenis: "negatif",
    kesanAsas: {
      hasil: -20,
      populariti: -3
    },
    pilihan: [
      {
        teks: "Lancar operasi besar-besaran",
        kesan: { hasil: +12, populariti: -1, perbelanjaan: +5 },
        label: "Hasil pulih"
      },
      {
        teks: "Perkukuh sistem digital",
        kesan: { hasil: +5, perbelanjaan: +8 },
        label: "Jangka panjang"
      },
      {
        teks: "Abaikan dulu",
        kesan: { populariti: -2, hasil: -5 },
        label: "Kritikan media"
      }
    ]
  },
  {
    id: "EK008",
    nama: "Hasil Komoditi Meningkat",
    kategori: "positif",
    ikon: "🌴",
    deskripsi: "Harga minyak sawit dan getah dunia melonjak. Hasil eksport Malaysia meningkat mendadak.",
    jenis: "positif",
    kesanAsas: {
      hasil: +18,
      pertumbuhan: +0.7,
      populariti: +2
    },
    pilihan: [
      {
        teks: "Simpan sebagai rizab",
        kesan: { populariti: +1, hutang: -5 },
        label: "Kurang hutang"
      },
      {
        teks: "Agih kepada rakyat",
        kesan: { populariti: +4, perbelanjaan: +10 },
        label: "Populari naik"
      }
    ]
  },

  // =====================================
  // KEWANGAN DAN HUTANG
  // =====================================
  {
    id: "EK009",
    nama: "Kadar Faedah Global Naik",
    kategori: "kewangan",
    ikon: "📈",
    deskripsi: "Bank pusat global menaikkan kadar faedah. Kos pinjaman Malaysia meningkat, dan pelabur asing tarik modal keluar.",
    jenis: "negatif",
    kesanAsas: {
      pertumbuhan: -0.8,
      hutang: +15,
      populariti: -2
    },
    pilihan: [
      {
        teks: "Naikkan kadar faedah tempatan",
        kesan: { populariti: -2, pertumbuhan: -0.3, hutang: -5 },
        label: "Ringgit stabil"
      },
      {
        teks: "Kekalkan kadar faedah",
        kesan: { pertumbuhan: +0.2, hutang: +8 },
        label: "Rangsangan"
      }
    ]
  },
  {
    id: "EK010",
    nama: "Ringgit Melemah",
    kategori: "kewangan",
    ikon: "💱",
    deskripsi: "Ringgit jatuh ke paras terendah berbanding dolar AS. Kos import naik tetapi eksport jadi lebih kompetitif.",
    jenis: "negatif",
    kesanAsas: {
      inflasi: +1.0,
      hasil: -8,
      populariti: -3
    },
    pilihan: [
      {
        teks: "Intervensi bank pusat",
        kesan: { inflasi: -0.5, populariti: +2, hutang: +5 },
        label: "Ringgit pulih"
      },
      {
        teks: "Biarkan pasaran tentukan",
        kesan: { populariti: -2, hasil: +3 },
        label: "Eksport naik"
      },
      {
        teks: "Naikkan kadar faedah",
        kesan: { populariti: -1, pertumbuhan: -0.3 },
        label: "Stabil"
      }
    ]
  },

  // =====================================
  // HARGA DAN SUBSIDI
  // =====================================
  {
    id: "EK011",
    nama: "Harga Makanan Melonjak",
    kategori: "harga",
    ikon: "🍚",
    deskripsi: "Harga barang keperluan seperti beras, ayam dan sayur naik 20% akibat kegagalan tanaman dan kos pengangkutan.",
    jenis: "negatif",
    kesanAsas: {
      inflasi: +1.5,
      populariti: -5,
      perbelanjaan: +5
    },
    pilihan: [
      {
        teks: "Tambah subsidi makanan",
        kesan: { populariti: +4, perbelanjaan: +15, inflasi: -0.5 },
        label: "Populari naik"
      },
      {
        teks: "Kawal harga runcit",
        kesan: { populariti: +1, inflasi: -0.3 },
        label: "Inflasi turun"
      },
      {
        teks: "Buka import makanan",
        kesan: { inflasi: -0.8, populariti: +2 },
        label: "Bekalan naik"
      }
    ]
  },
  {
    id: "EK012",
    nama: "Subsidi Minyak Membebankan",
    kategori: "harga",
    ikon: "⛽",
    deskripsi: "Subsidi minyak melebihi anggaran tahunan. Kerajaan perlu menyemak semula jumlah subsidi.",
    jenis: "negatif",
    kesanAsas: {
      perbelanjaan: +20,
      populariti: +1,
      hasil: -10
    },
    pilihan: [
      {
        teks: "Kurangkan subsidi secara berperingkat",
        kesan: { populariti: -5, perbelanjaan: -15 },
        label: "Jimat bajet"
      },
      {
        teks: "Kekalkan subsidi penuh",
        kesan: { populariti: +2, hutang: +10 },
        label: "Populari naik"
      },
      {
        teks: "Beri subsidi bersasar",
        kesan: { populariti: +1, perbelanjaan: -8 },
        label: "Seimbang"
      }
    ]
  },

  // =====================================
  // PEKERJAAN
  // =====================================
  {
    id: "EK013",
    nama: "Penutupan Kilang Besar",
    kategori: "pekerjaan",
    ikon: "🏭",
    deskripsi: "Sebuah kilang pembuatan besar mengumumkan penutupan operasi. Ribuan pekerja terjejas.",
    jenis: "negatif",
    kesanAsas: {
      pengangguran: +0.6,
      populariti: -3,
      pertumbuhan: -0.4
    },
    pilihan: [
      {
        teks: "Program latihan semula pekerja",
        kesan: { populariti: +3, perbelanjaan: +8, pengangguran: -0.3 },
        label: "Populari naik"
      },
      {
        teks: "Cari pelabur pengganti",
        kesan: { populariti: +2, pertumbuhan: +0.2 },
        label: "Jangka panjang"
      },
      {
        teks: "Serahkan pada pasaran",
        kesan: { populariti: -2, pengangguran: +0.2 },
        label: "Kritikan"
      }
    ]
  },
  {
    id: "EK014",
    nama: "Kekurangan Pekerja Mahir",
    kategori: "pekerjaan",
    ikon: "👷",
    deskripsi: "Sektor teknologi dan perkilangan menghadapi kekurangan pekerja mahir. Syarikat sukar mengisi jawatan kritikal.",
    jenis: "negatif",
    kesanAsas: {
      pertumbuhan: -0.3,
      populariti: -1
    },
    pilihan: [
      {
        teks: "Tarik pekerja mahir asing",
        kesan: { pertumbuhan: +0.4, populariti: -2 },
        label: "Ekonomi naik"
      },
      {
        teks: "Program latihan tempatan",
        kesan: { populariti: +2, perbelanjaan: +6 },
        label: "Jangka panjang"
      }
    ]
  },

  // =====================================
  // PASARAN KEWANGAN
  // =====================================
  {
    id: "EK015",
    nama: "Pasaran Saham Jatuh",
    kategori: "kewangan",
    ikon: "📉",
    deskripsi: "Pasaran saham Bursa Malaysia jatuh 8% akibat kebimbangan pelabur. Nilai ringgit turut terjejas.",
    jenis: "negatif",
    kesanAsas: {
      pertumbuhan: -0.5,
      populariti: -2,
      hasil: -5
    },
    pilihan: [
      {
        teks: "Kenyataan menenangkan pelabur",
        kesan: { populariti: +1, pertumbuhan: +0.1 },
        label: "Stabil"
      },
      {
        teks: "Dana sokongan pasaran",
        kesan: { pertumbuhan: +0.3, perbelanjaan: +10 },
        label: "Pasaran pulih"
      },
      {
        teks: "Biarkan pasaran betul sendiri",
        kesan: { populariti: -1 },
        label: "Neutral"
      }
    ]
  },
  {
    id: "EK016",
    nama: "Pelaburan Asing Meningkat",
    kategori: "positif",
    ikon: "💵",
    deskripsi: "Dana pelaburan asing menunjukkan minat terhadap pasaran Malaysia. Ringgit mengukuh dan pasaran saham naik.",
    jenis: "positif",
    kesanAsas: {
      pertumbuhan: +0.5,
      populariti: +2,
      hasil: +5
    },
    pilihan: [
      {
        teks: "Beri insentif kepada pelabur",
        kesan: { pertumbuhan: +0.3, hasil: -3 },
        label: "Pelaburan naik"
      },
      {
        teks: "Kekalkan dasar semasa",
        kesan: { populariti: +1 },
        label: "Stabil"
      }
    ]
  },

  // =====================================
  // KEMARAU DAN BENCANA
  // =====================================
  {
    id: "EK017",
    nama: "Kemarau Panjang",
    kategori: "bencana",
    ikon: "☀️",
    deskripsi: "Kemarau melanda beberapa negeri. Bekalan air dan hasil pertanian terjejas teruk.",
    jenis: "negatif",
    kesanAsas: {
      inflasi: +0.7,
      pertumbuhan: -0.4,
      populariti: -2
    },
    pilihan: [
      {
        teks: "Bantuan segera kepada petani",
        kesan: { populariti: +3, perbelanjaan: +12 },
        label: "Populari naik"
      },
      {
        teks: "Catuan air berjadual",
        kesan: { populariti: -2, inflasi: -0.2 },
        label: "Jimat air"
      },
      {
        teks: "Import bekalan makanan",
        kesan: { inflasi: -0.3, hasil: -3 },
        label: "Bekalan cukup"
      }
    ]
  },
  {
    id: "EK018",
    nama: "Banjir Besar",
    kategori: "bencana",
    ikon: "🌊",
    deskripsi: "Banjir besar melanda beberapa negeri. Infrastruktur rosak dan aktiviti ekonomi terganggu.",
    jenis: "negatif",
    kesanAsas: {
      pertumbuhan: -0.8,
      perbelanjaan: +30,
      populariti: -3
    },
    pilihan: [
      {
        teks: "Operasi bantuan besar-besaran",
        kesan: { populariti: +5, perbelanjaan: +20 },
        label: "Populari naik"
      },
      {
        teks: "Naik taraf sistem perparitan",
        kesan: { populariti: +2, perbelanjaan: +25 },
        label: "Jangka panjang"
      },
      {
        teks: "Pulihkan secara berperingkat",
        kesan: { populariti: -3 },
        label: "Kritikan"
      }
    ]
  },

  // =====================================
  // TEKNOLOGI DAN INOVASI
  // =====================================
  {
    id: "EK019",
    nama: "Revolusi AI di Malaysia",
    kategori: "teknologi",
    ikon: "🤖",
    deskripsi: "Syarikat teknologi mula menggunakan AI secara meluas. Ada yang untung, ada pekerjaan yang terjejas.",
    jenis: "positif",
    kesanAsas: {
      pertumbuhan: +0.9,
      pengangguran: +0.3,
      populariti: +1
    },
    pilihan: [
      {
        teks: "Latihan AI untuk pekerja",
        kesan: { populariti: +3, perbelanjaan: +10, pengangguran: -0.2 },
        label: "Populari naik"
      },
      {
        teks: "Cukai syarikat AI besar",
        kesan: { hasil: +8, populariti: +2, pertumbuhan: -0.2 },
        label: "Hasil naik"
      },
      {
        teks: "Biarkan pasaran tentukan",
        kesan: { populariti: -3, pengangguran: +0.2 },
        label: "Kritikan"
      }
    ]
  },
  {
    id: "EK020",
    nama: "Penemuan Sumber Asli Baharu",
    kategori: "positif",
    ikon: "💎",
    deskripsi: "Rizab mineral baharu ditemui di kawasan pedalaman. Potensi hasil eksport yang besar pada masa hadapan.",
    jenis: "positif",
    kesanAsas: {
      hasil: +12,
      populariti: +3,
      pertumbuhan: +0.4
    },
    pilihan: [
      {
        teks: "Lombong dengan syarat ketat",
        kesan: { populariti: +2, hasil: +8, pertumbuhan: +0.3 },
        label: "Hasil naik"
      },
      {
        teks: "Jual hak kepada syarikat asing",
        kesan: { hasil: +15, populariti: -2 },
        label: "Hasil besar"
      },
      {
        teks: "Simpan untuk generasi akan datang",
        kesan: { populariti: +4, hasil: -3 },
        label: "Populari naik"
      }
    ]
  }
];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanPeristiwaEkonomi(id) {
  return DATA_PERISTIWA_EKONOMI.find(p => p.id === id);
}

function senaraiPeristiwaEkonomiMengikutKategori(kategori) {
  return DATA_PERISTIWA_EKONOMI.filter(p => p.kategori === kategori);
}

function jumlahPeristiwaEkonomi() {
  return DATA_PERISTIWA_EKONOMI.length;
}

/**
 * Pilih satu peristiwa ekonomi secara rawak.
 */
function pilihPeristiwaEkonomiRawak() {
  const index = Math.floor(Math.random() * DATA_PERISTIWA_EKONOMI.length);
  return DATA_PERISTIWA_EKONOMI[index];
}