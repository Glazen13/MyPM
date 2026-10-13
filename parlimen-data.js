/* ============================================================
   PARLIMEN-DATA.JS
   Pangkalan data kawasan Parlimen Malaysia (222 kawasan)
   + Sifat kawasan + Parti berkuasa (penyandang)
   
   ⚠️ PENAFIAN:
   - Semua nama & kod kawasan adalah berdasarkan senarai rasmi SPR
   - Sifat kawasan (ideologi, kelas pengundi, dll.) adalah SIMULASI FIKSYEN
   - Parti berkuasa (penyandang) bertanda "Belum Disahkan" — bukan data rasmi
   - Data ini untuk tujuan simulasi permainan sahaja
   ============================================================ */

const PARLIMEN_DB = [

  /* ============================================================
     PERLIS (3 kawasan)
     ============================================================ */
  {
    kod: 'P.001', nama: 'Padang Besar', negeri: 'Perlis',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'nasionalis',
    jenisKerusi: 'selamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 65, infrastruktur: 55, pendidikan: 60,
    pengangguran: 4, kestabilanTempatan: 70,
    keaktifanNGO: 30, pendedahanMedia: 45,
    isuSetempat: ['Harga getah jatuh', 'Jalan rosak', 'Banjir monsun'],
    tradisiKhas: 'Kawasan sempadan Malaysia–Thailand',
    notaTempatan: 'Kawasan sempadan, majoriti petani & peniaga kecil',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'nasionalis',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.002', nama: 'Kangar', negeri: 'Perlis',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'dewasa',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'nasionalis',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 58, infrastruktur: 65, pendidikan: 65,
    pengangguran: 5, kestabilanTempatan: 72,
    keaktifanNGO: 45, pendedahanMedia: 55,
    isuSetempat: ['Peluang pekerjaan', 'Harga barang naik', 'Perumahan'],
    tradisiKhas: null,
    notaTempatan: 'Ibu negeri Perlis, pusat pentadbiran',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'nasionalis',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.003', nama: 'Arau', negeri: 'Perlis',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'wargaEmas',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'selamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 62, infrastruktur: 48, pendidikan: 52,
    pengangguran: 6, kestabilanTempatan: 68,
    keaktifanNGO: 25, pendedahanMedia: 38,
    isuSetempat: ['Harga padi', 'Kemudahan kesihatan', 'Pengangkutan awam'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan luar bandar, ramai pesara & petani',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },

  /* ============================================================
     PULAU PINANG (13 kawasan)
     ============================================================ */
  {
    kod: 'P.041', nama: 'Kepala Batas', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'nasionalis',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 55, infrastruktur: 70, pendidikan: 65,
    pengangguran: 4, kestabilanTempatan: 72,
    keaktifanNGO: 40, pendedahanMedia: 55,
    isuSetempat: ['Pembangunan tanah', 'Banjir kilat', 'Kos sara hidup'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan campuran pertanian & bandar',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'nasionalis',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.042', nama: 'Tasek Gelugor', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'campuran', ideologiDominan: 'nasionalis',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 52, infrastruktur: 68, pendidikan: 62,
    pengangguran: 4, kestabilanTempatan: 70,
    keaktifanNGO: 35, pendedahanMedia: 55,
    isuSetempat: ['Trafik', 'Perumahan', 'Pencemaran'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan separa bandar',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'nasionalis',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.043', nama: 'Bagan', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'M40', kumpulanUmur: 'dewasa',
    ekonomiUtama: 'perniagaan', ideologiDominan: 'progresif',
    jenisKerusi: 'selamat', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 68, infrastruktur: 82, pendidikan: 72,
    pengangguran: 3, kestabilanTempatan: 75,
    keaktifanNGO: 60, pendedahanMedia: 70,
    isuSetempat: ['Pembangunan pelabuhan', 'Banjir', 'Kos perumahan'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan bandar pelabuhan',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.044', nama: 'Permatang Pauh', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'campuran', ideologiDominan: 'progresif',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 60, infrastruktur: 75, pendidikan: 68,
    pengangguran: 4, kestabilanTempatan: 72,
    keaktifanNGO: 55, pendedahanMedia: 65,
    isuSetempat: ['Pendidikan', 'Kesihatan', 'Banjir kilat'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pendidikan & kediaman',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.045', nama: 'Bukit Mertajam', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'M40', kumpulanUmur: 'dewasa',
    ekonomiUtama: 'perniagaan', ideologiDominan: 'progresif',
    jenisKerusi: 'selamat', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 66, infrastruktur: 80, pendidikan: 70,
    pengangguran: 4, kestabilanTempatan: 74,
    keaktifanNGO: 55, pendedahanMedia: 68,
    isuSetempat: ['Keselamatan', 'Peluang pekerjaan', 'Pengangkutan'],
    tradisiKhas: null,
    notaTempatan: 'Bandar utama Seberang Perai',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.046', nama: 'Batu Kawan', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'campuran', kumpulanUmur: 'belia',
    ekonomiUtama: 'perindustrian', ideologiDominan: 'progresif',
    jenisKerusi: 'marginal', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 55, infrastruktur: 78, pendidikan: 70,
    pengangguran: 3, kestabilanTempatan: 70,
    keaktifanNGO: 50, pendedahanMedia: 62,
    isuSetempat: ['Peluang pekerjaan', 'Perumahan', 'Banjir'],
    tradisiKhas: null,
    notaTempatan: 'Zon industri utama Pulau Pinang',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.047', nama: 'Nibong Tebal', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'M40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'campuran', ideologiDominan: 'progresif',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 56, infrastruktur: 68, pendidikan: 62,
    pengangguran: 4, kestabilanTempatan: 70,
    keaktifanNGO: 40, pendedahanMedia: 55,
    isuSetempat: ['Pencemaran sungai', 'Banjir', 'Pendidikan'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pertanian & industri',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.048', nama: 'Bukit Bendera', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'M40', kumpulanUmur: 'dewasa',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'progresif',
    jenisKerusi: 'selamat', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 70, infrastruktur: 88, pendidikan: 80,
    pengangguran: 3, kestabilanTempatan: 78,
    keaktifanNGO: 65, pendedahanMedia: 75,
    isuSetempat: ['Pelancongan', 'Perumahan', 'Trafik'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pelancongan & pentadbiran',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.049', nama: 'Tanjong', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandarBesar', kepadatan: 'tinggi',
    kelasPengundi: 'campuran', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'perniagaan', ideologiDominan: 'progresif',
    jenisKerusi: 'marginal', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 58, infrastruktur: 85, pendidikan: 75,
    pengangguran: 5, kestabilanTempatan: 70,
    keaktifanNGO: 55, pendedahanMedia: 70,
    isuSetempat: ['Perumahan', 'Kos sara hidup', 'Peluang pekerjaan'],
    tradisiKhas: 'Kawasan bandar warisan',
    notaTempatan: 'Kawasan bandar George Town',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.050', nama: 'Jelutong', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'M40', kumpulanUmur: 'belia',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'progresif',
    jenisKerusi: 'selamat', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 65, infrastruktur: 82, pendidikan: 74,
    pengangguran: 4, kestabilanTempatan: 72,
    keaktifanNGO: 60, pendedahanMedia: 68,
    isuSetempat: ['Perumahan', 'Pengangkutan awam', 'Belia'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan kediaman & komersial',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.051', nama: 'Bukit Gelugor', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'M40', kumpulanUmur: 'dewasa',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'progresif',
    jenisKerusi: 'selamat', kesukaranTanding: 'sukar',
    kekuatanIdeologi: 68, infrastruktur: 84, pendidikan: 76,
    pengangguran: 3, kestabilanTempatan: 75,
    keaktifanNGO: 55, pendedahanMedia: 70,
    isuSetempat: ['Pendidikan', 'Kesihatan', 'Trafik'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan kediaman kelas menengah',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.052', nama: 'Bayan Baru', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'campuran', kumpulanUmur: 'belia',
    ekonomiUtama: 'perindustrian', ideologiDominan: 'progresif',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 60, infrastruktur: 82, pendidikan: 75,
    pengangguran: 4, kestabilanTempatan: 72,
    keaktifanNGO: 50, pendedahanMedia: 68,
    isuSetempat: ['Pekerjaan teknologi', 'Perumahan', 'Pengangkutan'],
    tradisiKhas: null,
    notaTempatan: 'Zon teknologi & industri',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'progresif',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.053', nama: 'Balik Pulau', negeri: 'Pulau Pinang',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'campuran',
    jenisKerusi: 'marginal', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 50, infrastruktur: 60, pendidikan: 58,
    pengangguran: 5, kestabilanTempatan: 65,
    keaktifanNGO: 35, pendedahanMedia: 48,
    isuSetempat: ['Pertanian', 'Pelancongan', 'Infrastruktur'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pertanian & pelancongan',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'campuran',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },

  /* ============================================================
     KELANTAN (14 kawasan)
     ============================================================ */
  {
    kod: 'P.019', nama: 'Tumpat', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 78, infrastruktur: 55, pendidikan: 58,
    pengangguran: 6, kestabilanTempatan: 72,
    keaktifanNGO: 40, pendedahanMedia: 45,
    isuSetempat: ['Banjir', 'Peluang kerja', 'Harga barang'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan sempadan, tradisi agama kuat',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.020', nama: 'Pengkalan Chepa', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'belia',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 75, infrastruktur: 62, pendidikan: 60,
    pengangguran: 7, kestabilanTempatan: 70,
    keaktifanNGO: 45, pendedahanMedia: 50,
    isuSetempat: ['Peluang kerja belia', 'Infrastruktur', 'Pendidikan'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan sekitar lapangan terbang',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.021', nama: 'Kota Bharu', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'bandar', kepadatan: 'tinggi',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'perniagaan', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 76, infrastruktur: 65, pendidikan: 62,
    pengangguran: 6, kestabilanTempatan: 72,
    keaktifanNGO: 50, pendedahanMedia: 55,
    isuSetempat: ['Banjir', 'Peluang kerja', 'Harga barang'],
    tradisiKhas: null,
    notaTempatan: 'Ibu negeri Kelantan, pusat pentadbiran',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.022', nama: 'Pasir Mas', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 77, infrastruktur: 58, pendidikan: 55,
    pengangguran: 6, kestabilanTempatan: 70,
    keaktifanNGO: 42, pendedahanMedia: 45,
    isuSetempat: ['Banjir', 'Harga getah', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pertanian & perdagangan',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.023', nama: 'Rantau Panjang', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'perniagaan', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 74, infrastruktur: 60, pendidikan: 55,
    pengangguran: 6, kestabilanTempatan: 70,
    keaktifanNGO: 45, pendedahanMedia: 48,
    isuSetempat: ['Sempadan', 'Banjir', 'Harga barang'],
    tradisiKhas: 'Kawasan sempadan Malaysia–Thailand',
    notaTempatan: 'Kawasan sempadan, perdagangan bebas',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.024', nama: 'Kubang Kerian', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'pinggirBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'perkhidmatan', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 78, infrastruktur: 62, pendidikan: 62,
    pengangguran: 5, kestabilanTempatan: 72,
    keaktifanNGO: 48, pendedahanMedia: 50,
    isuSetempat: ['Kesihatan', 'Pendidikan', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan sekitar HUSM',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.025', nama: 'Bachok', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 76, infrastruktur: 55, pendidikan: 58,
    pengangguran: 6, kestabilanTempatan: 70,
    keaktifanNGO: 40, pendedahanMedia: 42,
    isuSetempat: ['Pantai hakisan', 'Nelayan', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pesisir pantai, majoriti nelayan',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.026', nama: 'Ketereh', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'campuran',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 55, infrastruktur: 58, pendidikan: 55,
    pengangguran: 5, kestabilanTempatan: 68,
    keaktifanNGO: 35, pendedahanMedia: 45,
    isuSetempat: ['Pertanian', 'Jalan rosak', 'Banjir'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan luar bandar',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'campuran',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.027', nama: 'Tanah Merah', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'selamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 68, infrastruktur: 56, pendidikan: 55,
    pengangguran: 6, kestabilanTempatan: 68,
    keaktifanNGO: 35, pendedahanMedia: 42,
    isuSetempat: ['Banjir', 'Harga getah', 'Jalan rosak'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pertanian',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.028', nama: 'Pasir Puteh', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 73, infrastruktur: 55, pendidikan: 54,
    pengangguran: 6, kestabilanTempatan: 68,
    keaktifanNGO: 38, pendedahanMedia: 42,
    isuSetempat: ['Nelayan', 'Banjir', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pesisir & pertanian',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.029', nama: 'Machang', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'sederhana',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'kubuKuat', kesukaranTanding: 'kubuKuat',
    kekuatanIdeologi: 72, infrastruktur: 58, pendidikan: 55,
    pengangguran: 5, kestabilanTempatan: 70,
    keaktifanNGO: 40, pendedahanMedia: 45,
    isuSetempat: ['Pertanian', 'Banjir', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pertanian',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.030', nama: 'Jeli', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'islamik',
    jenisKerusi: 'selamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 68, infrastruktur: 50, pendidikan: 52,
    pengangguran: 6, kestabilanTempatan: 68,
    keaktifanNGO: 30, pendedahanMedia: 38,
    isuSetempat: ['Jalan rosak', 'Pertanian', 'Banjir'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pedalaman',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'islamik',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.031', nama: 'Kuala Krai', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'campuran',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 55, infrastruktur: 52, pendidikan: 52,
    pengangguran: 6, kestabilanTempatan: 65,
    keaktifanNGO: 32, pendedahanMedia: 40,
    isuSetempat: ['Banjir', 'Infrastruktur', 'Peluang kerja'],
    tradisiKhas: null,
    notaTempatan: 'Kawasan pedalaman',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'campuran',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  },
  {
    kod: 'P.032', nama: 'Gua Musang', negeri: 'Kelantan',
    pengundi: null,
    jenisKawasan: 'luarBandar', kepadatan: 'rendah',
    kelasPengundi: 'B40', kumpulanUmur: 'seimbang',
    ekonomiUtama: 'pertanian', ideologiDominan: 'campuran',
    jenisKerusi: 'separuhSelamat', kesukaranTanding: 'sederhana',
    kekuatanIdeologi: 52, infrastruktur: 48, pendidikan: 50,
    pengangguran: 7, kestabilanTempatan: 62,
    keaktifanNGO: 30, pendedahanMedia: 38,
    isuSetempat: ['Infrastruktur', 'Pendidikan', 'Peluang kerja'],
    tradisiKhas: 'Kawasan Orang Asli',
    notaTempatan: 'Kawasan pedalaman & Orang Asli',
    penyandang: {
      parti: 'Belum Disahkan', ideologi: 'campuran',
      nama: null, tahunMenang: null, majoriti: null, sumber: null
    },
    statusSimulasi: 'belumDisahkan',
    sejarahPenyandang: []
  }

  /* ⚠️ NOTA:
     - 30 kawasan di atas adalah SAMPEL untuk semakan
     - Baki 192 kawasan (Terengganu, Perak, Pahang, Selangor, 
       W.P. KL, W.P. Putrajaya, N.Sembilan, Melaka, Johor, 
       W.P. Labuan, Sabah, Sarawak) akan ditambah dalam mesej 
       seterusnya selepas anda sahkan pola ini.
     - Untuk tambah kawasan baharu, salin struktur di atas.
     - Untuk isi penyandang, gantikan 'Belum Disahkan' dengan 
       nama parti fiksyen (PRB/BNR/PPP/PIN/GAM/PSM/PSB) 
       BILA ADA DATA RASMI dari SPR.
  */

];

/* ============================================================
   FUNGSI BANTUAN
   ============================================================ */

/* Kira bilangan kawasan mengikut negeri */
function getParlimenStatistik() {
  const stats = {};
  PARLIMEN_DB.forEach(p => {
    if (!stats[p.negeri]) stats[p.negeri] = { parlimen: 0, disahkan: 0, belum: 0 };
    stats[p.negeri].parlimen++;
    if (p.statusSimulasi === 'aktif') stats[p.negeri].disahkan++;
    else stats[p.negeri].belum++;
  });
  return stats;
}

/* Cari Parlimen ikut kod */
function cariParlimenByKod(kod) {
  return PARLIMEN_DB.find(p => p.kod === kod);
}

/* Cari Parlimen ikut nama */
function cariParlimenByNama(nama) {
  return PARLIMEN_DB.filter(p =>
    p.nama.toLowerCase().includes(nama.toLowerCase())
  );
}

/* Cari Parlimen ikut negeri */
function cariParlimenByNegeri(negeri) {
  return PARLIMEN_DB.filter(p => p.negeri === negeri);
}

/* Dapatkan kawasan berdasarkan kekuatan ideologi dominan */
function getKawasanByIdeologi(ideologi) {
  return PARLIMEN_DB.filter(p => p.ideologiDominan === ideologi);
}

/* Kira kesukaran menang bagi pemain */
function kiraKesukaranMenang(parlimen, pemain) {
  if (!parlimen || !pemain) return 50;

  let peluang = 40; // asas

  // Kesan ideologi
  if (pemain.party && pemain.party.ideologi === parlimen.ideologiDominan) {
    peluang += 15;
  } else if (pemain.party && pemain.party.ideologi !== parlimen.ideologiDominan) {
    peluang -= 10;
  }

  // Kesan jenis kerusi
  const kesanKerusi = {
    'selamat': -15,
    'separuhSelamat': 0,
    'marginal': +15,
    'panas': +25,
    'kubuKuat': -25
  };
  peluang += kesanKerusi[parlimen.jenisKerusi] || 0;

  // Kesan populariti pemain
  peluang += (pemain.popularity || 0) * 0.2;

  // Kesan sokongan akar umbi
  peluang += (pemain.grassrootsSupport || 0) * 0.15;

  return clamp(Math.round(peluang), 5, 95);
}
