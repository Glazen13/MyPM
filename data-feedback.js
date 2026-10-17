"use strict";

// =====================================
// MyPM Simulasi - Data Mesej Feedback
// Fasa 7.1: 250 peristiwa × 3 pilihan = 750 mesej
// =====================================

const DATA_FEEDBACK = {

  // =====================================================
  // EV001–EV010 (Ekonomi & Kos Sara Hidup)
  // =====================================================
  EV001: [
    { mesej: "RAKYAT B40 BERASA TERBANTU", jenis: "positif" },
    { mesej: "PEMANTAUAN BEKALAN DIPERKETAT", jenis: "neutral" },
    { mesej: "RAKYAT KECEWA DENGAN KERAJIAN", jenis: "negatif" }
  ],
  EV002: [
    { mesej: "KEYAKINAN PASARAN PULIH", jenis: "positif" },
    { mesej: "IMPORT DIKURANGKAN BERPERINGKAT", jenis: "neutral" },
    { mesej: "RINGGIT TERUS TERUMAN", jenis: "negatif" }
  ],
  EV003: [
    { mesej: "PELABUR KEMBALI YAKIN", jenis: "positif" },
    { mesej: "INSENTIF TARIK PELABURAN", jenis: "positif" },
    { mesej: "PELABUR PINDAH KE NEGARA LAIN", jenis: "negatif" }
  ],
  EV004: [
    { mesej: "BELIA DAPAT PELUANG KERJA", jenis: "positif" },
    { mesej: "MAJIKAN AMBIL PEKERJA BAHARU", jenis: "positif" },
    { mesej: "GRADUAN TERUS MENGANGGUR", jenis: "negatif" }
  ],
  EV005: [
    { mesej: "JIMAT BAJET SUBSIDI", jenis: "positif" },
    { mesej: "RAKYAT TERLINDUNG DARI KENAIKAN", jenis: "positif" },
    { mesej: "BANTAHAN HARGA MINYAK", jenis: "negatif" }
  ],
  EV006: [
    { mesej: "EKONOMI DIRANGSANG", jenis: "positif" },
    { mesej: "PKS TERUS BERNIAGA", jenis: "positif" },
    { mesej: "EKONOMI TERUS LEMBAP", jenis: "negatif" }
  ],
  EV007: [
    { mesej: "HARGA PERKHIDMATAN STABIL", jenis: "positif" },
    { mesej: "KELUARGA RENTAN TERBANTU", jenis: "positif" },
    { mesej: "KOS SARA HIDUP MENINGKAT", jenis: "negatif" }
  ],
  EV008: [
    { mesej: "JURANG PENDAPATAN MENUTUP", jenis: "positif" },
    { mesej: "BANTUAN SAMPAI KEPADA RAKYAT", jenis: "positif" },
    { mesej: "JURANG TERUS MELEBAR", jenis: "negatif" }
  ],
  EV009: [
    { mesej: "KEYAKINAN RAKYAT PULIH", jenis: "positif" },
    { mesej: "JARINGAN SOSIAL DIPERKUKUH", jenis: "positif" },
    { mesej: "PENGGUNA TAK YAKIN", jenis: "negatif" }
  ],
  EV010: [
    { mesej: "LOGISTIK LEBIH CEKAP", jenis: "positif" },
    { mesej: "KOS LOGISTIK BERKURANGAN", jenis: "positif" },
    { mesej: "HARGA BARANG NAIK", jenis: "negatif" }
  ],

  // =====================================================
  // EV011–EV020 (Fiskal, Cukai, Bajet)
  // =====================================================
  EV011: [
    { mesej: "PERBELANJAAN DIJIMATKAN", jenis: "positif" },
    { mesej: "HASIL KERAJAAN MENINGKAT", jenis: "positif" },
    { mesej: "DEFISIT TERUS MELEBAR", jenis: "negatif" }
  ],
  EV012: [
    { mesej: "AUDIT KOS DIJALANKAN", jenis: "positif" },
    { mesej: "PROJEK DITERUSKAN", jenis: "positif" },
    { mesej: "PROJEK TERHENTI SEMENTARA", jenis: "negatif" }
  ],
  EV013: [
    { mesej: "KETELUSAN DIPERKUKUH", jenis: "positif" },
    { mesej: "PENJELASAN DIBERIKAN", jenis: "neutral" },
    { mesej: "MEDIA TERUS KRITIK", jenis: "negatif" }
  ],
  EV014: [
    { mesej: "PELAN FISKAL DIUMUMKAN", jenis: "positif" },
    { mesej: "PERBELANJAAN DIPOTONG", jenis: "neutral" },
    { mesej: "KEYAKINAN PASARAN JATUH", jenis: "negatif" }
  ],
  EV015: [
    { mesej: "BANTUAN SEGERA DISALURKAN", jenis: "positif" },
    { mesej: "PERUNTUKAN DISUSUN SEMULA", jenis: "neutral" },
    { mesej: "BANTUAN LEWAT SAMPAI", jenis: "negatif" }
  ],
  EV016: [
    { mesej: "HASIL CUKAI MENINGKAT", jenis: "positif" },
    { mesej: "ASAS CUKAI DIPERLUAS", jenis: "neutral" },
    { mesej: "RINGGIT TERUS TERUMAN", jenis: "negatif" }
  ],
  EV017: [
    { mesej: "SUBSIDI LEBIH TEPAT SASARAN", jenis: "positif" },
    { mesej: "SUBSIDI MENYELURUH KEKAL", jenis: "neutral" },
    { mesej: "HARGA NAIK MENDADAK", jenis: "negatif" }
  ],
  EV018: [
    { mesej: "PEMBEKAL DIBERI BAYARAN", jenis: "positif" },
    { mesej: "JADUAL PEMBAYARAN DISUSUN", jenis: "neutral" },
    { mesej: "PEMBEKAL TIDAK PUAS HATI", jenis: "negatif" }
  ],
  EV019: [
    { mesej: "DANA DIPINDAH KE PROJEK BERSEDIA", jenis: "positif" },
    { mesej: "KEMENTERIAN DIBANTU", jenis: "neutral" },
    { mesej: "PROJEK DIBATALKAN", jenis: "negatif" }
  ],
  EV020: [
    { mesej: "BELANJAWAN DIPINDA", jenis: "positif" },
    { mesej: "BELANJAWAN DIPERTAHANKAN", jenis: "neutral" },
    { mesej: "BELANJAWAN TERTANGGUH", jenis: "negatif" }
  ],

  // =====================================================
  // EV021–EV030 (Pekerjaan & Pasaran Buruh)
  // =====================================================
  EV021: [
    { mesej: "PEKERJA DIBANTU", jenis: "positif" },
    { mesej: "RUNDINGAN MAJIKAN-PEKERJA", jenis: "neutral" },
    { mesej: "PEKERJA KECEWA", jenis: "negatif" }
  ],
  EV022: [
    { mesej: "KEMAHIRAN PEKERJA NAIK", jenis: "positif" },
    { mesej: "KELAYAKAN DIIKTIRAF", jenis: "positif" },
    { mesej: "INDUSTRI KEKURANGAN PEKERJA", jenis: "negatif" }
  ],
  EV023: [
    { mesej: "DIALOG PEKERJA-MAJIKAN BERJALAN", jenis: "positif" },
    { mesej: "GAJI MINIMUM DIKAJI", jenis: "positif" },
    { mesej: "PEKERJA TERUS BANTAH", jenis: "negatif" }
  ],
  EV024: [
    { mesej: "MOGOK DITAMATKAN", jenis: "positif" },
    { mesej: "PERKHIDMATAN KRITIKAL BERJALAN", jenis: "neutral" },
    { mesej: "OPERASI TERGANGGU", jenis: "negatif" }
  ],
  EV025: [
    { mesej: "PEKERJA GIG TERLINDUNG", jenis: "positif" },
    { mesej: "STANDARD KONTRAK DIJELASKAN", jenis: "positif" },
    { mesej: "PEKERJA GIG TERUS BANTAH", jenis: "negatif" }
  ],
  EV026: [
    { mesej: "PERUSAHAAN TEMPATAN BERTUMBUH", jenis: "positif" },
    { mesej: "PUSAT LATIHAN SERANTAU DIBINA", jenis: "positif" },
    { mesej: "BELIA TERUS BERHIJRAH", jenis: "negatif" }
  ],
  EV027: [
    { mesej: "PRODUKTIVITI MENINGKAT", jenis: "positif" },
    { mesej: "KAJIAN PUNCA DIJALANKAN", jenis: "neutral" },
    { mesej: "INDUSTRI KURANG BERDAYA SAING", jenis: "negatif" }
  ],
  EV028: [
    { mesej: "KESELAMATAN TEMPAT KERJA TERJAGA", jenis: "positif" },
    { mesej: "PROSEDUR MAJIKAN DIPERBAIKI", jenis: "positif" },
    { mesej: "RISIKO KEMALANGAN KEKAL", jenis: "negatif" }
  ],
  EV029: [
    { mesej: "KEPERLUAN SEKTOR DIKAJI", jenis: "neutral" },
    { mesej: "AUTOMASI DIPERCEPAT", jenis: "positif" },
    { mesej: "PEKERJA ASING MASUK", jenis: "neutral" }
  ],
  EV030: [
    { mesej: "KEMAHIRAN GRADUAN SEPADAN", jenis: "positif" },
    { mesej: "LATIHAN SEMULA GRADUAN", jenis: "positif" },
    { mesej: "GRADUAN TERUS MENGANGGUR", jenis: "negatif" }
  ],

  // =====================================================
  // EV031–EV040 (Perniagaan & Pelaburan)
  // =====================================================
  EV031: [
    { mesej: "SYARIKAT KEKAL DI MALAYSIA", jenis: "positif" },
    { mesej: "OPERASI DITERUSKAN", jenis: "positif" },
    { mesej: "SYARIKAT PINDAH KELUAR", jenis: "negatif" }
  ],
  EV032: [
    { mesej: "PKS DAPAT PEMBIAYAAN", jenis: "positif" },
    { mesej: "LATIHAN PERNIAGAAN DIBERI", jenis: "positif" },
    { mesej: "PKS TERUS TUTUP", jenis: "negatif" }
  ],
  EV033: [
    { mesej: "PROSES LEBIH CEPAT", jenis: "positif" },
    { mesej: "BIROKRASI DIKURANGKAN", jenis: "positif" },
    { mesej: "PELABUR TERUS TUNGGU", jenis: "negatif" }
  ],
  EV034: [
    { mesej: "PELABURAN TEKNOLOGI DITERIMA", jenis: "positif" },
    { mesej: "PEKERJAAN BAHARU TERBUKA", jenis: "positif" },
    { mesej: "PELUANG PELABURAN TERLEPAS", jenis: "negatif" }
  ],
  EV035: [
    { mesej: "PERSAINGAN ADIL DIPERKUKUH", jenis: "positif" },
    { mesej: "PENIAGA KECIL DIBANTU", jenis: "positif" },
    { mesej: "PENIAGA KECIL TERUS TERJEJAS", jenis: "negatif" }
  ],
  EV036: [
    { mesej: "PASARAN EKSPORT DIBUKA", jenis: "positif" },
    { mesej: "KUALITI PRODUK DIPERBAIKI", jenis: "positif" },
    { mesej: "EKSPORT TERUS JATUH", jenis: "negatif" }
  ],
  EV037: [
    { mesej: "KUNJUNGAN PENIAGA PULIH", jenis: "positif" },
    { mesej: "PERNIAGAAN DIPULIHKAN", jenis: "positif" },
    { mesej: "KEDAI TERUS TUTUP", jenis: "negatif" }
  ],
  EV038: [
    { mesej: "SIASATAN MONOPOLI DIMULAKAN", jenis: "positif" },
    { mesej: "KETELUSAN HARGA DITINGKAT", jenis: "positif" },
    { mesej: "MONOPOLI TERUS BERLELUASA", jenis: "negatif" }
  ],
  EV039: [
    { mesej: "PELABURAN BESAR MASUK", jenis: "positif" },
    { mesej: "PEKERJAAN BAHARU DIJANA", jenis: "positif" },
    { mesej: "PELABUR PINDAH KE NEGARA LAIN", jenis: "negatif" }
  ],
  EV040: [
    { mesej: "PENGGUNA SELAMAT", jenis: "positif" },
    { mesej: "PRODUK DITARIK BALIK", jenis: "positif" },
    { mesej: "RISIKO KESELAMATAN KEKAL", jenis: "negatif" }
  ],

  // =====================================================
  // EV041–EV050 (Perumahan & Kemudahan Tempatan)
  // =====================================================
  EV041: [
    { mesej: "PENYEWA TERBANTU", jenis: "positif" },
    { mesej: "BEKALAN RUMAH DITAMBAH", jenis: "positif" },
    { mesej: "PENYEWA TERUS TERBEBAN", jenis: "negatif" }
  ],
  EV042: [
    { mesej: "PEMAJU DIKENAKAN TINDAKAN", jenis: "positif" },
    { mesej: "PROJEK RUMAH DIPULIHKAN", jenis: "positif" },
    { mesej: "PEMBELI TERUS MENUNGGU", jenis: "negatif" }
  ],
  EV043: [
    { mesej: "HAK PEMBELI TERJAGA", jenis: "positif" },
    { mesej: "PROJEK DISAMBUNG", jenis: "positif" },
    { mesej: "PEMBELI KECEWA", jenis: "negatif" }
  ],
  EV044: [
    { mesej: "BANJIR KILAT DIKAWAL", jenis: "positif" },
    { mesej: "PELAN JANGKA PANJANG DISEDIAKAN", jenis: "positif" },
    { mesej: "BANJIR TERUS BERULANG", jenis: "negatif" }
  ],
  EV045: [
    { mesej: "PENGINAPAN PEKERJA DIPERBAIKI", jenis: "positif" },
    { mesej: "PENGINAPAN BAHARU DIBINA", jenis: "positif" },
    { mesej: "PEKERJA MASIH KURANG TEMPAT", jenis: "negatif" }
  ],
  EV046: [
    { mesej: "KEMUDAHAN DIPULIHKAN", jenis: "positif" },
    { mesej: "GERAN PENYELENGGARAAN DIBERI", jenis: "positif" },
    { mesej: "KEMUDAHAN TERUS ROSAK", jenis: "negatif" }
  ],
  EV047: [
    { mesej: "PENGANGKUTAN AWAM DIPERBAIKI", jenis: "positif" },
    { mesej: "TRAFIK DIKAWAL", jenis: "positif" },
    { mesej: "KESESAKAN TERUS TERUK", jenis: "negatif" }
  ],
  EV048: [
    { mesej: "KLINIK BERGERAK BEROPERASI", jenis: "positif" },
    { mesej: "KLINIK BAHARU DINILAI", jenis: "neutral" },
    { mesej: "AKSES RAWATAN TERHAD", jenis: "negatif" }
  ],
  EV049: [
    { mesej: "KEBERSIHAN DIPULIHKAN", jenis: "positif" },
    { mesej: "PROGRAM KITAR SEMULA DIMULAKAN", jenis: "positif" },
    { mesej: "ADUAN SAMPAH BERTERUSAN", jenis: "negatif" }
  ],
  EV050: [
    { mesej: "PENDUDUK DIAJAK BINCANG", jenis: "positif" },
    { mesej: "PROJEK DIUBAH SUAI", jenis: "positif" },
    { mesej: "PENDUDUK TERUS BANTAH", jenis: "negatif" }
  ],

  // =====================================================
  // EV051–EV060 (Pendidikan & Belia)
  // =====================================================
  EV051: [
    { mesej: "GURU DITEMpatKAN SEMULA", jenis: "positif" },
    { mesej: "GURU BAHARU DIAMBIL", jenis: "positif" },
    { mesej: "BEBAN GURU MENINGKAT", jenis: "negatif" }
  ],
  EV052: [
    { mesej: "SEKOLAH BERISIKO DIPULIHKAN", jenis: "positif" },
    { mesej: "PAKEJ PEMBAIKAN MENYELURUH", jenis: "positif" },
    { mesej: "SEKOLAH TERUS ROSAK", jenis: "negatif" }
  ],
  EV053: [
    { mesej: "MURID BERISIKO DIBANTU", jenis: "positif" },
    { mesej: "LALUAN ALTERNATIF DIBUKA", jenis: "positif" },
    { mesej: "KECICIRAN TERUS MENINGKAT", jenis: "negatif" }
  ],
  EV054: [
    { mesej: "GRADUAN LEBIH BERSEDIA", jenis: "positif" },
    { mesej: "KURIKULUM DIKAJI SEMULA", jenis: "positif" },
    { mesej: "GRADUAN TERUS MENGANGGUR", jenis: "negatif" }
  ],
  EV055: [
    { mesej: "PELAJAR TERBANTU", jenis: "positif" },
    { mesej: "KERJA SAMBILAN DIBUKA", jenis: "positif" },
    { mesej: "PELAJAR TERUS TERBEBAN", jenis: "negatif" }
  ],
  EV056: [
    { mesej: "SALURAN ADUAN DIPERKUKUH", jenis: "positif" },
    { mesej: "SIASATAN BULI DIJALANKAN", jenis: "positif" },
    { mesej: "IBU BAPA KECEWA", jenis: "negatif" }
  ],
  EV057: [
    { mesej: "PELAJAR DAPAT PERANTI", jenis: "positif" },
    { mesej: "SAMBUNGAN INTERNET DIPERLUAS", jenis: "positif" },
    { mesej: "JURANG DIGITAL KEKAL", jenis: "negatif" }
  ],
  EV058: [
    { mesej: "LATIHAN TVET BERSEPADAN", jenis: "positif" },
    { mesej: "PERALATAN INSTITUSI DINAIK TARAF", jenis: "positif" },
    { mesej: "KEKURANGAN KEMAHIRAN KEKAL", jenis: "negatif" }
  ],
  EV059: [
    { mesej: "BELIA DAPAT PEKERJAAN", jenis: "positif" },
    { mesej: "PERUSAHAAN BELIA BERKEMBANG", jenis: "positif" },
    { mesej: "BELIA BANDAR MENGANGGUR", jenis: "negatif" }
  ],
  EV060: [
    { mesej: "KHIDMAT KAUNSELING DIPERLUAS", jenis: "positif" },
    { mesej: "TENAGA PENGAJAR DILATIH", jenis: "positif" },
    { mesej: "KESIHATAN MENTAL TERUS MEROSOT", jenis: "negatif" }
  ],

  // =====================================================
  // EV061–EV070 (Kesihatan & Kebajikan)
  // =====================================================
  EV061: [
    { mesej: "KESESAKAN HOSPITAL DIKAWAL", jenis: "positif" },
    { mesej: "KAPASITI RAWATAN DITAMBAH", jenis: "positif" },
    { mesej: "PESAKIT TERUS MENUNGGU", jenis: "negatif" }
  ],
  EV062: [
    { mesej: "BEKALAN UBAT DISEIMBANG", jenis: "positif" },
    { mesej: "PEROLEHAN UBAT DIPERCEPAT", jenis: "positif" },
    { mesej: "UBAT TERUS BERKURANGAN", jenis: "negatif" }
  ],
  EV063: [
    { mesej: "WABAK DIKAWAL", jenis: "positif" },
    { mesej: "KAWASAN TERJEJAS DIFOKUSKAN", jenis: "positif" },
    { mesej: "WABAK TERUS MENULAR", jenis: "negatif" }
  ],
  EV064: [
    { mesej: "PETUGAS KESIHATAN DIBANTU", jenis: "positif" },
    { mesej: "PENGAMBILAN BAHARU DIBUKA", jenis: "positif" },
    { mesej: "BEBAN KERJA TERUS TINGGI", jenis: "negatif" }
  ],
  EV065: [
    { mesej: "PESAKIT TERBANTU", jenis: "positif" },
    { mesej: "KOS RAWATAN DIKURANGKAN", jenis: "positif" },
    { mesej: "PESAKIT TERUS TERBEBAN", jenis: "negatif" }
  ],
  EV066: [
    { mesej: "KANAK-KANAK TERBANTU", jenis: "positif" },
    { mesej: "PENDIDIKAN PEMAKANAN DIPERLUAS", jenis: "positif" },
    { mesej: "MASALAH PEMAKANAN KEKAL", jenis: "negatif" }
  ],
  EV067: [
    { mesej: "WARGA EMAS TERJAGA", jenis: "positif" },
    { mesej: "PENJAGA DILATIH", jenis: "positif" },
    { mesej: "SOKONGAN WARGA EMAS TERHAD", jenis: "negatif" }
  ],
  EV068: [
    { mesej: "AKSESIBILITI DIPERBAIKI", jenis: "positif" },
    { mesej: "BANTUAN MOBILITI DIBERI", jenis: "positif" },
    { mesej: "HALANGAN AKSES KEKAL", jenis: "negatif" }
  ],
  EV069: [
    { mesej: "PEMANTAUAN KESIHATAN DIPERKUKUH", jenis: "positif" },
    { mesej: "TINDAKAN PENCEMARAN DIAMBIL", jenis: "positif" },
    { mesej: "RISIKO KESIHATAN KEKAL", jenis: "negatif" }
  ],
  EV070: [
    { mesej: "KLINIK BERGERAK DIPERLUAS", jenis: "positif" },
    { mesej: "KEMUDAHAN DINAIK TARAF", jenis: "positif" },
    { mesej: "AKSES LUAR BANDAR TERHAD", jenis: "negatif" }
  ],

  // =====================================================
  // EV071–EV075 (Makanan & Pertanian)
  // =====================================================
  EV071: [
    { mesej: "BEKALAN BERAS TERJAMIN", jenis: "positif" },
    { mesej: "PENGELUARAN TEMPATAN DISOKONG", jenis: "positif" },
    { mesej: "BEKALAN BERAS TERANCAM", jenis: "negatif" }
  ],
  EV072: [
    { mesej: "HARGA AYAM & TELUR DIKAWAL", jenis: "positif" },
    { mesej: "PENGELUAR DIBANTU", jenis: "positif" },
    { mesej: "HARGA TERUS TIDAK STABIL", jenis: "negatif" }
  ],
  EV073: [
    { mesej: "PENYAKIT TANAMAN DIKAWAL", jenis: "positif" },
    { mesej: "LADANG TERJEJAS DIPULIHKAN", jenis: "positif" },
    { mesej: "HASIL PERTANIAN MEROSOT", jenis: "negatif" }
  ],
  EV074: [
    { mesej: "PETANI TERBANTU", jenis: "positif" },
    { mesej: "KOS INPUT DIKURANGKAN", jenis: "positif" },
    { mesej: "PETANI TERUS TERBEBAN", jenis: "negatif" }
  ],
  EV075: [
    { mesej: "NELAYAN DIBANTU", jenis: "positif" },
    { mesej: "PERALATAN CEKAP DIBERI", jenis: "positif" },
    { mesej: "HASIL TANGKAPAN TERUS MEROSOT", jenis: "negatif" }
  ]
  ,

  // =====================================================
  // EV076–EV080 (Makanan & Pertanian sambungan)
  // =====================================================
  EV076: [
    { mesej: "PETANI BANJIR DIBANTU", jenis: "positif" },
    { mesej: "SISTEM SALIRAN DIPERBAIKI", jenis: "positif" },
    { mesej: "PETANI TERUS TERJEJAS", jenis: "negatif" }
  ],
  EV077: [
    { mesej: "IMPORT DIPELBAGAIKAN", jenis: "positif" },
    { mesej: "PENGELUARAN TEMPATAN NAIK", jenis: "positif" },
    { mesej: "PERGANTUNGAN IMPORT KEKAL", jenis: "negatif" }
  ],
  EV078: [
    { mesej: "PEMBAZIRAN MAKANAN DIKAWAL", jenis: "positif" },
    { mesej: "KEMPEN DIJALANKAN", jenis: "positif" },
    { mesej: "MAKANAN TERUS DIBUANG", jenis: "negatif" }
  ],
  EV079: [
    { mesej: "BEKALAN MAKANAN TERJAMIN", jenis: "positif" },
    { mesej: "PENGELUAR & PENGEDAR DIBANTU", jenis: "positif" },
    { mesej: "HARGA MAKANAN NAIK", jenis: "negatif" }
  ],
  EV080: [
    { mesej: "PERTIKAIAN TANAH DISELESAIKAN", jenis: "positif" },
    { mesej: "REKOD TANAH DIKEMASKINI", jenis: "positif" },
    { mesej: "PERTIKAIAN TANAH BERLARUTAN", jenis: "negatif" }
  ],

  // =====================================================
  // EV081–EV090 (Infrastruktur & Pengangkutan)
  // =====================================================
  EV081: [
    { mesej: "JALAN BERISIKO DIBAliki", jenis: "positif" },
    { mesej: "PENYELENGGARAAN BERJADUAL", jenis: "positif" },
    { mesej: "JALAN TERUS ROSAK", jenis: "negatif" }
  ],
  EV082: [
    { mesej: "PROJEK DIAUDIT", jenis: "positif" },
    { mesej: "PELAKSANAAN DISUSUN SEMULA", jenis: "positif" },
    { mesej: "PROJEK TERUS LEWAT", jenis: "negatif" }
  ],
  EV083: [
    { mesej: "PELABUHAN LEBIH CEKAP", jenis: "positif" },
    { mesej: "KAPASITI PELABUHAN DITAMBAH", jenis: "positif" },
    { mesej: "BARANG TERUS TERTAHAN", jenis: "negatif" }
  ],
  EV084: [
    { mesej: "KESELAMATAN KERETA API DIUTAMAKAN", jenis: "positif" },
    { mesej: "PENGANGKUTAN ALTERNATIF DISEDIAKAN", jenis: "positif" },
    { mesej: "PENUMPANG TERUS TERJEJAS", jenis: "negatif" }
  ],
  EV085: [
    { mesej: "PENUMPANG LAPANGAN TERBANG LEBIH LANCAR", jenis: "positif" },
    { mesej: "PELUASAN KAPASITI DINILAI", jenis: "positif" },
    { mesej: "KELEWATAN TERUS BERLAKU", jenis: "negatif" }
  ],
  EV086: [
    { mesej: "BEKALAN ELEKTRIK STABIL", jenis: "positif" },
    { mesej: "GRID DINAIK TARAF", jenis: "positif" },
    { mesej: "GANGGUAN ELEKTRIK BERULANG", jenis: "negatif" }
  ],
  EV087: [
    { mesej: "LIPUTAN INTERNET DIPERLUAS", jenis: "positif" },
    { mesej: "INFRASTRUKTUR DIKONGSI", jenis: "positif" },
    { mesej: "JURANG LIPUTAN KEKAL", jenis: "negatif" }
  ],
  EV088: [
    { mesej: "PROJEK LEBUH RAYA DIKAJI SEMULA", jenis: "positif" },
    { mesej: "LANGKAH MITIGASI DIAMBIL", jenis: "positif" },
    { mesej: "PENDUDUK TERUS BANTAH", jenis: "negatif" }
  ],
  EV089: [
    { mesej: "LALUAN PENGANGKUTAN DIKAJI", jenis: "positif" },
    { mesej: "PROMOSI PENUMPANG DIJALANKAN", jenis: "positif" },
    { mesej: "PENUMPANG TERUS BERKURANGAN", jenis: "negatif" }
  ],
  EV090: [
    { mesej: "STRUKTUR KRITIKAL DIPERIKSA", jenis: "positif" },
    { mesej: "JAMBATAN DIPULIHKAN SEGERA", jenis: "positif" },
    { mesej: "KESELAMATAN TERANCAM", jenis: "negatif" }
  ],

  // =====================================================
  // EV091–EV100 (Sabah, Sarawak & Wilayah)
  // =====================================================
  EV091: [
    { mesej: "JALAN LUAR BANDAR DIBAliki", jenis: "positif" },
    { mesej: "PROGRAM JALAN BERFASA", jenis: "positif" },
    { mesej: "AKSES LUAR BANDAR TERUS SUKAR", jenis: "negatif" }
  ],
  EV092: [
    { mesej: "AIR BERSIH DISALURKAN", jenis: "positif" },
    { mesej: "SISTEM AIR JANGKA PANJANG DIBINA", jenis: "positif" },
    { mesej: "BEKALAN AIR TERUS TERHAD", jenis: "negatif" }
  ],
  EV093: [
    { mesej: "AKSES ELEKTRIK DIPERLUAS", jenis: "positif" },
    { mesej: "PROJEK TENAGA BERFASA", jenis: "positif" },
    { mesej: "BEKALAN ELEKTRIK TERHAD", jenis: "negatif" }
  ],
  EV094: [
    { mesej: "PELUANG SABAH MENINGKAT", jenis: "positif" },
    { mesej: "PELABURAN MASUK SABAH", jenis: "positif" },
    { mesej: "TUNTUTAN SABAH BERTERUSAN", jenis: "negatif" }
  ],
  EV095: [
    { mesej: "PENYELARASAN SARAWAK BERJAYA", jenis: "positif" },
    { mesej: "PROJEK BERSEDIA DIUTAMAKAN", jenis: "positif" },
    { mesej: "PROJEK PERTINDIHAN", jenis: "negatif" }
  ],
  EV096: [
    { mesej: "KEMUDAHAN KESIHATAN PEDALAMAN DIPERLUAS", jenis: "positif" },
    { mesej: "KEMUDAHAN DINAIK TARAF", jenis: "positif" },
    { mesej: "AKSES KESIHATAN TERHAD", jenis: "negatif" }
  ],
  EV097: [
    { mesej: "OPERASI PELABUHAN DIPERBAIKI", jenis: "positif" },
    { mesej: "KAPASITI PELABUHAN DINILAI", jenis: "positif" },
    { mesej: "KOS LOGISTIK TINGGI KEKAL", jenis: "negatif" }
  ],
  EV098: [
    { mesej: "BELIA DIBERI PELUANG", jenis: "positif" },
    { mesej: "KERJASAMA LATIHAN DIBINA", jenis: "positif" },
    { mesej: "BELIA TERUS BERHIJRAH", jenis: "negatif" }
  ],
  EV099: [
    { mesej: "KRITERIA PERUNTUKAN DIUMUMKAN", jenis: "positif" },
    { mesej: "RUNDINGAN WILAYAH DIJALANKAN", jenis: "positif" },
    { mesej: "WILAYAH TERUS TIDAK PUAS HATI", jenis: "negatif" }
  ],
  EV100: [
    { mesej: "PUNCA KEULEWATAN DIKENAL PASTI", jenis: "positif" },
    { mesej: "KONTRAK DISUSUN SEMULA", jenis: "positif" },
    { mesej: "PROJEK TERUS LEWAT", jenis: "negatif" }
  ],

  // =====================================================
  // EV101–EV110 (Perpaduan & Masyarakat)
  // =====================================================
  EV101: [
    { mesej: "KETEGANGAN KOMUNITI REDA", jenis: "positif" },
    { mesej: "PENGUATKUASAAN DIJALANKAN", jenis: "positif" },
    { mesej: "SALAH FAHAM BERLARUTAN", jenis: "negatif" }
  ],
  EV102: [
    { mesej: "DIALOG KOMUNITI DIJALANKAN", jenis: "positif" },
    { mesej: "PRINSIP UNDANG-UNDANG DIUTAMAKAN", jenis: "positif" },
    { mesej: "KONTROVERSI TERUS MEMANAS", jenis: "negatif" }
  ],
  EV103: [
    { mesej: "IBU BAPA DILIBATKAN", jenis: "positif" },
    { mesej: "DASAR DILAKSANA BERFASA", jenis: "positif" },
    { mesej: "BANTAHAN PENDIDIKAN MENINGKAT", jenis: "negatif" }
  ],
  EV104: [
    { mesej: "KEMUDAHAN DIAGIH ADIL", jenis: "positif" },
    { mesej: "KEMUDAHAN DIKONGSI", jenis: "positif" },
    { mesej: "KETIDAKSEIMBANGAN KEKAL", jenis: "negatif" }
  ],
  EV105: [
    { mesej: "PERATURAN GUNA RUANG DIJELASKAN", jenis: "positif" },
    { mesej: "KOMPROMI DICAPAI", jenis: "positif" },
    { mesej: "AKSES AWAM TERHAD", jenis: "negatif" }
  ],
  EV106: [
    { mesej: "SUKARELAWAN DISOKONG", jenis: "positif" },
    { mesej: "KAPASITI SUKARELAWAN DIPERKUKUH", jenis: "positif" },
    { mesej: "PROGRAM SUKARELAWAN TERBATAS", jenis: "negatif" }
  ],
  EV107: [
    { mesej: "ADUAN DISIASAT", jenis: "positif" },
    { mesej: "PETUGAS DILATIH", jenis: "positif" },
    { mesej: "LAYANAN TIDAK ADIL TERUS BERLAKU", jenis: "negatif" }
  ],
  EV108: [
    { mesej: "MAKLUMAT LEBIH MUDAH DIFAHAMI", jenis: "positif" },
    { mesej: "DOKUMEN DIBAHASAKAN", jenis: "positif" },
    { mesej: "MAKLUMAT SUKAR DIFAHAMI", jenis: "negatif" }
  ],
  EV109: [
    { mesej: "SYARAT ACARA DIPERJELAS", jenis: "positif" },
    { mesej: "RUNDINGAN KESELAMATAN DIJALANKAN", jenis: "positif" },
    { mesej: "ACARA DIBATALKAN", jenis: "negatif" }
  ],
  EV110: [
    { mesej: "PERPADUAN NASIONAL DIPERKUKUH", jenis: "positif" },
    { mesej: "INISIATIF AKAR UMBI DISOKONG", jenis: "positif" },
    { mesej: "KEMPEN PERPADUAN TERTANGGUH", jenis: "negatif" }
  ]
    ,

  // =====================================================
  // EV111–EV120 (Parlimen, Undian & Dasar)
  // =====================================================
  EV111: [
    { mesej: "USUL LULUS DENGAN PINDAAN", jenis: "positif" },
    { mesej: "UNDIAN DIJALANKAN", jenis: "neutral" },
    { mesej: "UNDIAN DITANGGUHKAN", jenis: "negatif" }
  ],
  EV112: [
    { mesej: "AHLI PARLIMEN DIPUJUK", jenis: "positif" },
    { mesej: "PELAKSANAAN DIUBAH", jenis: "positif" },
    { mesej: "KETEGANGAN DALAMAN NAIK", jenis: "negatif" }
  ],
  EV113: [
    { mesej: "RANG UNDANG-UNDANG DIKEMBALIKAN", jenis: "positif" },
    { mesej: "RUNDINGAN BERJAYA", jenis: "positif" },
    { mesej: "RANG UNDANG-UNDANG DIGUGURKAN", jenis: "negatif" }
  ],
  EV114: [
    { mesej: "GABUNGAN DIPULIHKAN", jenis: "positif" },
    { mesej: "SOKONGAN DIPULIHKAN", jenis: "positif" },
    { mesej: "KRISIS GABUNGAN MELETUS", jenis: "negatif" }
  ],
  EV115: [
    { mesej: "AHLI PARLIMEN DIBERI TAKLIMAT", jenis: "positif" },
    { mesej: "USUL DIPINDA", jenis: "positif" },
    { mesej: "UNDIAN TIDAK MENENTU", jenis: "negatif" }
  ],
  EV116: [
    { mesej: "KEDUDUKAN KERAJAAN DIJELASKAN", jenis: "positif" },
    { mesej: "SOKONGAN DIPERKUKUH", jenis: "positif" },
    { mesej: "DESAKAN PILIHAN RAYA MENINGKAT", jenis: "negatif" }
  ],
  EV117: [
    { mesej: "SOKONGAN DIBUKTIKAN", jenis: "positif" },
    { mesej: "RUNDINGAN SOKONGAN BERJAYA", jenis: "positif" },
    { mesej: "KRISIS INSTITUSI MELETUS", jenis: "negatif" }
  ],
  EV118: [
    { mesej: "KOMPROMI DICAPAI", jenis: "positif" },
    { mesej: "UNDIAN BEBAS DIBENARKAN", jenis: "neutral" },
    { mesej: "PERPECAHAN PARTI", jenis: "negatif" }
  ],
  EV119: [
    { mesej: "MAKLUMAT DIDEDAHKAN", jenis: "positif" },
    { mesej: "MASA TAMBAHAN DIBERI", jenis: "neutral" },
    { mesej: "PERTIKAIAN BERLAKU", jenis: "negatif" }
  ],
  EV120: [
    { mesej: "KEHADIRAN MENINGKAT", jenis: "positif" },
    { mesej: "REKOD KEHADIRAN TELUS", jenis: "positif" },
    { mesej: "URUSAN DEWAN TERGANGGU", jenis: "negatif" }
  ],

  // =====================================================
  // EV121–EV130 (Kabinet & Kepimpinan)
  // =====================================================
  EV121: [
    { mesej: "PRESTASI KEMENTERIAN PULIH", jenis: "positif" },
    { mesej: "PASUKAN PELAKSANA DIBENTUK", jenis: "positif" },
    { mesej: "PORTFOLIO DIROMBAK", jenis: "neutral" }
  ],
  EV122: [
    { mesej: "TANGGUNGJAWAB DIJELASKAN", jenis: "positif" },
    { mesej: "RUNDINGAN MENTERI BERJAYA", jenis: "positif" },
    { mesej: "PROJEK TERUS TERLEWAT", jenis: "negatif" }
  ],
  EV123: [
    { mesej: "PERMOHONAN DINILAI", jenis: "neutral" },
    { mesej: "PORTFOLIO TAMBAHAN DIBERI", jenis: "positif" },
    { mesej: "MENTERI TIDAK PUAS HATI", jenis: "negatif" }
  ],
  EV124: [
    { mesej: "PRESTASI KABINET DINILAI", jenis: "positif" },
    { mesej: "ROMBAKAN KABINET DIJALANKAN", jenis: "positif" },
    { mesej: "KRITIKAN KABINET BERTERUSAN", jenis: "negatif" }
  ],
  EV125: [
    { mesej: "PENDIRIAN BERSAMA DICAPAI", jenis: "positif" },
    { mesej: "TANGGUNGJAWAB DIPISAHKAN", jenis: "positif" },
    { mesej: "KETEGANGAN KEPIMPINAN NAIK", jenis: "negatif" }
  ],
  EV126: [
    { mesej: "SIASATAN BEBAS DIJALANKAN", jenis: "positif" },
    { mesej: "PENJELASAN MENTERI DIBERI", jenis: "neutral" },
    { mesej: "KEPERCAYAAN RAKYAT MEROSOT", jenis: "negatif" }
  ],
  EV127: [
    { mesej: "FUNGSI KEMENTERIAN DISATUKAN", jenis: "positif" },
    { mesej: "PEMBAHAGIAN DIJELASKAN", jenis: "positif" },
    { mesej: "PEMBAZIRAN BERTERUSAN", jenis: "negatif" }
  ],
  EV128: [
    { mesej: "PEGAWAI DILIBATKAN", jenis: "positif" },
    { mesej: "PEMBAHARUAN DILAKSANA BERFASA", jenis: "positif" },
    { mesej: "PEMBAHARUAN DIBATALKAN", jenis: "negatif" }
  ],
  EV129: [
    { mesej: "KRITERIA BAJET DIJELASKAN", jenis: "positif" },
    { mesej: "PAKEJ KOMPROMI DICAPAI", jenis: "positif" },
    { mesej: "KETIDAKPUASAN KABINET NAIK", jenis: "negatif" }
  ],
  EV130: [
    { mesej: "PORTFOLIO DIISI", jenis: "positif" },
    { mesej: "PEMANGKU DILANTIK", jenis: "neutral" },
    { mesej: "KEPUTUSAN KEMENTERIAN TERTANGGUH", jenis: "negatif" }
  ],

  // =====================================================
  // EV131–EV140 (Integriti & Antirasuah)
  // =====================================================
  EV131: [
    { mesej: "SIASATAN RASUAH DIMULAKAN", jenis: "positif" },
    { mesej: "SEMAKAN PENTADBIRAN DIJALANKAN", jenis: "neutral" },
    { mesej: "RISIKO INTEGRITI MENINGKAT", jenis: "negatif" }
  ],
  EV132: [
    { mesej: "PEMBERI MAKLUMAT DILINDUNGI", jenis: "positif" },
    { mesej: "DOKUMEN DISAHKAN", jenis: "positif" },
    { mesej: "RISIKO PRIVASI TERJEJAS", jenis: "negatif" }
  ],
  EV133: [
    { mesej: "AUDIT PEROLEHAN DIJALANKAN", jenis: "positif" },
    { mesej: "KONTRAK DISEMAK", jenis: "positif" },
    { mesej: "REPUTASI KERAJAAN TERJEJAS", jenis: "negatif" }
  ],
  EV134: [
    { mesej: "KONFLIK KEPENTINGAN DITANGANI", jenis: "positif" },
    { mesej: "PENGLIBATAN DIHADKAN", jenis: "positif" },
    { mesej: "KEPERCAYAAN RAKYAT MEROSOT", jenis: "negatif" }
  ],
  EV135: [
    { mesej: "TENDER LEBIH TELUS", jenis: "positif" },
    { mesej: "AUDIT BERISIKO DIPERLUAS", jenis: "positif" },
    { mesej: "KRITIKAN TENDER BERTERUSAN", jenis: "negatif" }
  ],
  EV136: [
    { mesej: "AUDIT KECEMASAN DIJALANKAN", jenis: "positif" },
    { mesej: "MAKLUMAT DIDEDAHKAN", jenis: "positif" },
    { mesej: "REPUTASI TERJEJAS", jenis: "negatif" }
  ],
  EV137: [
    { mesej: "SALURAN ADUAN DIBUKA", jenis: "positif" },
    { mesej: "PROSES PERKHIDMATAN DIAUDIT", jenis: "positif" },
    { mesej: "MASALAH BAYARAN BERULANG", jenis: "negatif" }
  ],
  EV138: [
    { mesej: "KAWALAN DIBETULKAN", jenis: "positif" },
    { mesej: "KES SERIUS DIRUJUK", jenis: "positif" },
    { mesej: "KETIRISAN BERULANG", jenis: "negatif" }
  ],
  EV139: [
    { mesej: "KRITERIA PELANTIKAN DIUMUMKAN", jenis: "positif" },
    { mesej: "KELAYAKAN DISEMAK", jenis: "positif" },
    { mesej: "KRITIKAN PELANTIKAN BERTERUSAN", jenis: "negatif" }
  ],
  EV140: [
    { mesej: "PELAN INTEGRITI DILANCARKAN", jenis: "positif" },
    { mesej: "PROJEK RINTIS DIMULAKAN", jenis: "positif" },
    { mesej: "KEMPEN INTEGRITI TERHAD", jenis: "negatif" }
  ],

  // =====================================================
  // EV141–EV150 (Media & Pandangan Rakyat)
  // =====================================================
  EV141: [
    { mesej: "KERAJAAN JAWAB DENGAN FAKTA", jenis: "positif" },
    { mesej: "SIDANG MEDIA DIJALANKAN", jenis: "positif" },
    { mesej: "SPEKULASI MEDIA MENINGKAT", jenis: "negatif" }
  ],
  EV142: [
    { mesej: "KEJADIAN DISEMAK", jenis: "positif" },
    { mesej: "ADUAN DISALURKAN", jenis: "neutral" },
    { mesej: "REPUTASI PEGAWAI TERJEJAS", jenis: "negatif" }
  ],
  EV143: [
    { mesej: "PELAN TINDAKAN DIUMUMKAN", jenis: "positif" },
    { mesej: "DIALOG AWAM DIJALANKAN", jenis: "positif" },
    { mesej: "KEYAKINAN RAKYAT MEROSOT", jenis: "negatif" }
  ],
  EV144: [
    { mesej: "PENJELASAN DIBERI", jenis: "positif" },
    { mesej: "KERJASAMA MEDIA DIJALANKAN", jenis: "positif" },
    { mesej: "KEKELIRUAN BERTERUSAN", jenis: "negatif" }
  ],
  EV145: [
    { mesej: "JAWAPAN TERBUKA DIBERI", jenis: "positif" },
    { mesej: "MESEJ DISAMPAIKAN", jenis: "positif" },
    { mesej: "PERSEPSI MENGELAK SOALAN", jenis: "negatif" }
  ],
  EV146: [
    { mesej: "ADUAN SUBSTANTIF DISEMAK", jenis: "positif" },
    { mesej: "PROSES DIJELASKAN", jenis: "positif" },
    { mesej: "KRITIKAN MEDIA SOSIAL MENINGKAT", jenis: "negatif" }
  ],
  EV147: [
    { mesej: "KESELAMATAN DIPERKUKUH", jenis: "positif" },
    { mesej: "KANDUNGAN DIDEDAHKAN", jenis: "positif" },
    { mesej: "KEPERCAYAAN RAKYAT MEROSOT", jenis: "negatif" }
  ],
  EV148: [
    { mesej: "FAKTA DISELARASKAN", jenis: "positif" },
    { mesej: "PROTOKOL KOMUNIKASI DIBUAT", jenis: "positif" },
    { mesej: "MAKLUMAT BERCANGGAH BERULANG", jenis: "negatif" }
  ],
  EV149: [
    { mesej: "DATA PRESTASI DIDEDAHKAN", jenis: "positif" },
    { mesej: "RINGKASAN RASMI DIBERI", jenis: "positif" },
    { mesej: "KRITIKAN KETELUSAN NAIK", jenis: "negatif" }
  ],
  EV150: [
    { mesej: "LAPORAN 100 HARI DITERBITKAN", jenis: "positif" },
    { mesej: "PENCAPAIAN DILAPORKAN", jenis: "positif" },
    { mesej: "LAPORAN DITANGGUHKAN", jenis: "negatif" }
  ]
    ,

  // =====================================================
  // EV151–EV160 (Bencana & Kecemasan)
  // =====================================================
  EV151: [
    { mesej: "PENDUDUK DISELAMATKAN", jenis: "positif" },
    { mesej: "INFRASTRUKTUR DIPULIHKAN", jenis: "positif" },
    { mesej: "BANTUAN LEWAT SAMPAI", jenis: "negatif" }
  ],
  EV152: [
    { mesej: "KAWASAN BERISIKO DIKOSONGKAN", jenis: "positif" },
    { mesej: "LALUAN DIPULIHKAN", jenis: "positif" },
    { mesej: "RISIKO KESELAMATAN TINGGI", jenis: "negatif" }
  ],
  EV153: [
    { mesej: "BEKALAN AIR DIKAWAL", jenis: "positif" },
    { mesej: "BEKALAN SEMENTARA DISALURKAN", jenis: "positif" },
    { mesej: "KEMARAU TERUS MERUNcing", jenis: "negatif" }
  ],
  EV154: [
    { mesej: "KEBAKARAN DIKAWAL", jenis: "positif" },
    { mesej: "PENCEGAHAN DIPERKUKUH", jenis: "positif" },
    { mesej: "KEROSAKAN MELUAS", jenis: "negatif" }
  ],
  EV155: [
    { mesej: "UTILITI DIPULIHKAN", jenis: "positif" },
    { mesej: "RUMAH DIBANTU DIPULIHKAN", jenis: "positif" },
    { mesej: "PEMULIHAN LEWAT", jenis: "negatif" }
  ],
  EV156: [
    { mesej: "PENDUDUK DIPINDAHKAN", jenis: "positif" },
    { mesej: "KERJA PENGUKUHAN DIJALANKAN", jenis: "positif" },
    { mesej: "RISIKO TANAH RUNTUH KEKAL", jenis: "negatif" }
  ],
  EV157: [
    { mesej: "BEKALAN AIR PULIH", jenis: "positif" },
    { mesej: "BEKALAN ALTERNATIF DISEDIAKAN", jenis: "positif" },
    { mesej: "GANGGUAN AIR BERTERUSAN", jenis: "negatif" }
  ],
  EV158: [
    { mesej: "KAWASAN DIASINGKAN", jenis: "positif" },
    { mesej: "PEMANTAUAN DIJALANKAN", jenis: "neutral" },
    { mesej: "RISIKO KESIHATAN MENINGKAT", jenis: "negatif" }
  ],
  EV159: [
    { mesej: "BEKALAN MAKANAN DIJAMIN", jenis: "positif" },
    { mesej: "LALUAN ALTERNATIF DIBUKA", jenis: "positif" },
    { mesej: "BEKALAN MAKANAN TERGANGgu", jenis: "negatif" }
  ],
  EV160: [
    { mesej: "DANA PEMULIHAN TELUS", jenis: "positif" },
    { mesej: "PENGAGIHAN DIPERBAIKI", jenis: "positif" },
    { mesej: "KETIDAKADILAN DANA DIDAKWA", jenis: "negatif" }
  ],

  // =====================================================
  // EV161–EV170 (Alam Sekitar & Tenaga)
  // =====================================================
  EV161: [
    { mesej: "JEREBU DIKAWAL", jenis: "positif" },
    { mesej: "TINDAKAN PUNCA DIJALANKAN", jenis: "positif" },
    { mesej: "KUALITI UDARA MEROSOT", jenis: "negatif" }
  ],
  EV162: [
    { mesej: "BEKALAN ELEKTRIK PULIH", jenis: "positif" },
    { mesej: "KETAHANAN SISTEM DINAIK TARAF", jenis: "positif" },
    { mesej: "GANGGUAN ELEKTRIK BERULANG", jenis: "negatif" }
  ],
  EV163: [
    { mesej: "IMPACT ALAM DINILAI", jenis: "positif" },
    { mesej: "MITIGASI ALAM DIAMBIL", jenis: "positif" },
    { mesej: "PROJEK DIBATALKAN", jenis: "neutral" }
  ],
  EV164: [
    { mesej: "BEKALAN AIR BERSIH DISEDIAKAN", jenis: "positif" },
    { mesej: "PROJEK AIR JANGKA PANJANG DIPERCEPAT", jenis: "positif" },
    { mesej: "AIR BERSIH TERUS TERHAD", jenis: "negatif" }
  ],
  EV165: [
    { mesej: "PENDUDUK DIAJAK BINCANG", jenis: "positif" },
    { mesej: "REKA BENTUK DIUBAH SUAI", jenis: "positif" },
    { mesej: "BANTAHAN PROJEK TENAGA", jenis: "negatif" }
  ],
  EV166: [
    { mesej: "SUNGAI DIBERSIHKAN", jenis: "positif" },
    { mesej: "KAWASAN TERJEJAS DIPULIHKAN", jenis: "positif" },
    { mesej: "PENCEMARAN SUNGAI BERULANG", jenis: "negatif" }
  ],
  EV167: [
    { mesej: "KITAR SEMULA DIPERLUAS", jenis: "positif" },
    { mesej: "KEMUDAHAN PEMPROSESAN DIBINA", jenis: "positif" },
    { mesej: "SISA PEPEJAL MENINGKAT", jenis: "negatif" }
  ],
  EV168: [
    { mesej: "PERMINTAAN TENAGA DIKAWAL", jenis: "positif" },
    { mesej: "KAPASITI TENAGA DITAMBAH", jenis: "positif" },
    { mesej: "PEMBANGUNAN DIHADKAN", jenis: "negatif" }
  ],
  EV169: [
    { mesej: "PANTAI DILINDUNGI", jenis: "positif" },
    { mesej: "EKOSISTEM PULIH", jenis: "positif" },
    { mesej: "HAKISAN PANTAI BERTERUSAN", jenis: "negatif" }
  ],
  EV170: [
    { mesej: "PEMANTAUAN UDARA DIJALANKAN", jenis: "positif" },
    { mesej: "TINDAKAN PENCEMARAN DIAMBIL", jenis: "positif" },
    { mesej: "PENCEMARAN UDARA BERULANG", jenis: "negatif" }
  ],

  // =====================================================
  // EV171–EV180 (Hubungan Luar & Perdagangan)
  // =====================================================
  EV171: [
    { mesej: "KETEGANGAN DIPULIHKAN", jenis: "positif" },
    { mesej: "PENDIRIAN NEGARA DIJELASKAN", jenis: "positif" },
    { mesej: "HUBUNGAN DIPLOMATIK TEGANG", jenis: "negatif" }
  ],
  EV172: [
    { mesej: "PASARAN EKSPORT DIPULIHKAN", jenis: "positif" },
    { mesej: "PASARAN ALTERNATIF DIBUKA", jenis: "positif" },
    { mesej: "EKSPORT TERUS JATUH", jenis: "negatif" }
  ],
  EV173: [
    { mesej: "IMPAK PERJANJIAN DINILAI", jenis: "positif" },
    { mesej: "PERJANJIAN DITANDATANGANI", jenis: "positif" },
    { mesej: "PELUANG PERDAGANGAN TERLEPAS", jenis: "negatif" }
  ],
  EV174: [
    { mesej: "KEPASTIAN PELABUR DIBERI", jenis: "positif" },
    { mesej: "DIALOG SEKTOR DIJALANKAN", jenis: "positif" },
    { mesej: "PELABURAN TERTANGGUH", jenis: "negatif" }
  ],
  EV175: [
    { mesej: "RANTAIAN BEKALAN DIPELBAGAIKAN", jenis: "positif" },
    { mesej: "STOK STRATEGIK DISIMPAN", jenis: "positif" },
    { mesej: "BEKALAN TERANCAM", jenis: "negatif" }
  ],
  EV176: [
    { mesej: "BANTUAN KEMANUSIAAN DIHULURKAN", jenis: "positif" },
    { mesej: "SUMBANGAN DIJALURKAN", jenis: "positif" },
    { mesej: "KRITIKAN KEMANUSIAAN NAIK", jenis: "negatif" }
  ],
  EV177: [
    { mesej: "RUNDINGAN DITERUSKAN", jenis: "positif" },
    { mesej: "SALURAN DIPLOMATIK DIPERKUKUH", jenis: "positif" },
    { mesej: "RUNDINGAN DITANGGUHKAN", jenis: "negatif" }
  ],
  EV178: [
    { mesej: "SUMBER ALTERNATIF DICARI", jenis: "positif" },
    { mesej: "KAPASITI TEMPATAN DIBINA", jenis: "positif" },
    { mesej: "PENGELUARAN TERJEJAS", jenis: "negatif" }
  ],
  EV179: [
    { mesej: "SYARIKAT TEMPATAN DIBANTU", jenis: "positif" },
    { mesej: "NASIHAT UNDANG-UNDANG DIBERI", jenis: "positif" },
    { mesej: "SYARIKAT TERUS TERJEJAS", jenis: "negatif" }
  ],
  EV180: [
    { mesej: "MALAYSIA JADI TUAN RUMAH", jenis: "positif" },
    { mesej: "PENGANJURAN DIKONGSI", jenis: "positif" },
    { mesej: "PELUANG DIPLOMATIK TERLEPAS", jenis: "negatif" }
  ],

  // =====================================================
  // EV181–EV190 (Teknologi, Siber & Privasi)
  // =====================================================
  EV181: [
    { mesej: "SERANGAN SIBER DIBENDUNG", jenis: "positif" },
    { mesej: "SISTEM DIPULIHKAN", jenis: "positif" },
    { mesej: "SERANGAN SIBER BERULANG", jenis: "negatif" }
  ],
  EV182: [
    { mesej: "DATA RAKYAT DILINDUNGI", jenis: "positif" },
    { mesej: "AUDIT KESELAMATAN DIJALANKAN", jenis: "positif" },
    { mesej: "RISIKO DATA RAKYAT TINGGI", jenis: "negatif" }
  ],
  EV183: [
    { mesej: "PERKHIDMATAN DIGITAL PULIH", jenis: "positif" },
    { mesej: "SISTEM DIPULIHKAN", jenis: "positif" },
    { mesej: "URUSAN RAKYAT TERJEJAS", jenis: "negatif" }
  ],
  EV184: [
    { mesej: "AI DIUJI SECARA RINTIS", jenis: "positif" },
    { mesej: "AI DILAKSANA MELUAS", jenis: "positif" },
    { mesej: "PELUANG AI TERLEPAS", jenis: "negatif" }
  ],
  EV185: [
    { mesej: "PENIPUAN DIGITAL DIKAWAL", jenis: "positif" },
    { mesej: "KESEDARAN DIGITAL NAIK", jenis: "positif" },
    { mesej: "PENIPUAN DIGITAL BERULANG", jenis: "negatif" }
  ],
  EV186: [
    { mesej: "KEMAHIRAN DIGITAL NAIK", jenis: "positif" },
    { mesej: "PKS DINAIK TARAF", jenis: "positif" },
    { mesej: "JURANG KEMAHIRAN KEKAL", jenis: "negatif" }
  ],
  EV187: [
    { mesej: "PEKERJA DILATIH SEMULA", jenis: "positif" },
    { mesej: "AUTOMASI BERSAMA PEKERJAAN", jenis: "positif" },
    { mesej: "PEKERJAAN TERJEJAS", jenis: "negatif" }
  ],
  EV188: [
    { mesej: "PRIVASI PENGGUNA DILINDUNGI", jenis: "positif" },
    { mesej: "DASAR PRIVASI DIJELASKAN", jenis: "positif" },
    { mesej: "KEBIMBANGAN PRIVASI KEKAL", jenis: "negatif" }
  ],
  EV189: [
    { mesej: "SISTEM DIGITAL DIPULIHKAN", jenis: "positif" },
    { mesej: "PEMBAIKAN DITERUSKAN", jenis: "positif" },
    { mesej: "PROJEK DIHENTIKAN", jenis: "negatif" }
  ],
  EV190: [
    { mesej: "KEBERGANTUNGAN DIKURANGKAN", jenis: "positif" },
    { mesej: "KONTRAK DIRUNDING SEMULA", jenis: "positif" },
    { mesej: "RISIKO PEMBEKAL KEKAL", jenis: "negatif" }
  ]
    ,

  // =====================================================
  // EV191–EV200 (Undang-Undang & Pentadbiran)
  // =====================================================
  EV191: [
    { mesej: "UNDANG-UNDANG DISEMAK", jenis: "positif" },
    { mesej: "PINDAAN DILAKUKAN", jenis: "positif" },
    { mesej: "UNDANG-UNDANG LAPUK KEKAL", jenis: "negatif" }
  ],
  EV192: [
    { mesej: "PROSES MAHKAMAH DIHORMATI", jenis: "positif" },
    { mesej: "DASAR DISEMAK SEMULA", jenis: "neutral" },
    { mesej: "CABARAN UNDANG-UNDANG MENINGKAT", jenis: "negatif" }
  ],
  EV193: [
    { mesej: "TUNGGAKAN KES DIKURANGKAN", jenis: "positif" },
    { mesej: "PROSES DIPERMUDAHKAN", jenis: "positif" },
    { mesej: "TUNGGAKAN KES BERTERUSAN", jenis: "negatif" }
  ],
  EV194: [
    { mesej: "BIDANG KUASA DIJELASKAN", jenis: "positif" },
    { mesej: "AGENSI PENERAJU DILANTIK", jenis: "positif" },
    { mesej: "KEKELIRUAN AGENSI KEKAL", jenis: "negatif" }
  ],
  EV195: [
    { mesej: "BIROKRASI DIKURANGKAN", jenis: "positif" },
    { mesej: "BORANG DIGITAL DIPERKENALKAN", jenis: "positif" },
    { mesej: "BEBAN DOKUMEN BERTERUSAN", jenis: "negatif" }
  ],
  EV196: [
    { mesej: "REFORMASI DIJELASKAN", jenis: "positif" },
    { mesej: "REFORMASI DILAKSANA BERFASA", jenis: "positif" },
    { mesej: "REFORMASI DIBATALKAN", jenis: "negatif" }
  ],
  EV197: [
    { mesej: "ADUAN AWAM DITANGANI", jenis: "positif" },
    { mesej: "TEMPOH RESPONS DIKAWAL", jenis: "positif" },
    { mesej: "ADUAN TERTUNGGAK MENINGKAT", jenis: "negatif" }
  ],
  EV198: [
    { mesej: "PANDUAN SERAGAM DIKELUARKAN", jenis: "positif" },
    { mesej: "PEGAWAI DILATIH", jenis: "positif" },
    { mesej: "PELAKSANAAN TIDAK SERAGAM", jenis: "negatif" }
  ],
  EV199: [
    { mesej: "DATA PRESTASI DIDEDAHKAN", jenis: "positif" },
    { mesej: "RINGKASAN BERKALA DIKELUARKAN", jenis: "positif" },
    { mesej: "KETELUSAN BERKURANGAN", jenis: "negatif" }
  ],
  EV200: [
    { mesej: "PRESTASI PERKHIDMATAN DINILAI", jenis: "positif" },
    { mesej: "KEMENTERIAN BERMASALAH DIFOKUSKAN", jenis: "positif" },
    { mesej: "KELEMAHAN TIDAK DIKENAL PASTI", jenis: "negatif" }
  ],

  // =====================================================
  // EV201–EV210 (Manifesto & 100 Hari)
  // =====================================================
  EV201: [
    { mesej: "MANIFESTO DIPULIHKAN", jenis: "positif" },
    { mesej: "SKOP MANIFESTO DIKECILKAN", jenis: "neutral" },
    { mesej: "MANIFESTO DITANGGUHKAN", jenis: "negatif" }
  ],
  EV202: [
    { mesej: "PROGRAM PEKERJAAN DIPERBAIKI", jenis: "positif" },
    { mesej: "DANA DIALIH KE LATIHAN", jenis: "positif" },
    { mesej: "PROGRAM PEKERJAAN GAGAL", jenis: "negatif" }
  ],
  EV203: [
    { mesej: "KOS KESIHATAN DIAUDIT", jenis: "positif" },
    { mesej: "DANA KESIHATAN DITAMBAH", jenis: "positif" },
    { mesej: "SKOP KESIHATAN DIKURANGKAN", jenis: "negatif" }
  ],
  EV204: [
    { mesej: "PENDIDIKAN DIAJAK BINCANG", jenis: "positif" },
    { mesej: "DASAR PENDIDIKAN DIRINTIS", jenis: "positif" },
    { mesej: "BANTAHAN PENDIDIKAN MENINGKAT", jenis: "negatif" }
  ],
  EV205: [
    { mesej: "PROJEK INFRASTRUKTUR DIPULIHKAN", jenis: "positif" },
    { mesej: "KEUTAMAAN PROJEK DISUSUN", jenis: "positif" },
    { mesej: "PROJEK TERUS LEWAT", jenis: "negatif" }
  ],
  EV206: [
    { mesej: "KEMAJUAN INTEGRITI DIDEDAHKAN", jenis: "positif" },
    { mesej: "AUDIT BEBAS DIJALANKAN", jenis: "positif" },
    { mesej: "PENGUMUMAN DASAR SAHAJA", jenis: "negatif" }
  ],
  EV207: [
    { mesej: "BAJET MANIFESTO DIUTAMAKAN", jenis: "positif" },
    { mesej: "PENGURANGAN SEIMBANG", jenis: "neutral" },
    { mesej: "PEMBIAYAAN TAMBAHAN DIPERLUKAN", jenis: "negatif" }
  ],
  EV208: [
    { mesej: "SKOP MANIFESTO DILARASKAN", jenis: "positif" },
    { mesej: "MANIFESTO DILAKSANA BERFASA", jenis: "positif" },
    { mesej: "MANIFESTO POPULAR GAGAL", jenis: "negatif" }
  ],
  EV209: [
    { mesej: "LAPORAN 100 HARI TELUS", jenis: "positif" },
    { mesej: "PENCAPAIAN DILAPORKAN", jenis: "positif" },
    { mesej: "LAPORAN DITANGGUHKAN", jenis: "negatif" }
  ],
  EV210: [
    { mesej: "SEBAB KEGAGALAN DIJELASKAN", jenis: "positif" },
    { mesej: "PROGRAM DITERUSKAN", jenis: "neutral" },
    { mesej: "MANIFESTO DIIENTIKAN", jenis: "negatif" }
  ],

  // =====================================================
  // EV211–EV220 (Pilihan Raya & Kedudukan Politik)
  // =====================================================
  EV211: [
    { mesej: "SOKONGAN KERAJAAN DIPULIHKAN", jenis: "positif" },
    { mesej: "DASAR BERMASALAH DIPERBAIKI", jenis: "positif" },
    { mesej: "SOKONGAN TERUS MENURUN", jenis: "negatif" }
  ],
  EV212: [
    { mesej: "PARTI GABUNGAN DIPUJUK", jenis: "positif" },
    { mesej: "SOKONGAN AKAR UMBI PULIH", jenis: "positif" },
    { mesej: "SOKONGAN PARTI TERUS MEROSOT", jenis: "negatif" }
  ],
  EV213: [
    { mesej: "PEMILIHAN CALON TELUS", jenis: "positif" },
    { mesej: "RUNDINGAN PARTI BERJAYA", jenis: "positif" },
    { mesej: "PERPECAHAN SETEMPAT", jenis: "negatif" }
  ],
  EV214: [
    { mesej: "CALON DINILAI ADIL", jenis: "positif" },
    { mesej: "PENYANDANG KEKAL", jenis: "neutral" },
    { mesej: "CALON BAHARU DIPILIH", jenis: "positif" }
  ],
  EV215: [
    { mesej: "DANA AGIH MENGIKUT PERATURAN", jenis: "positif" },
    { mesej: "KAWASAN SASARAN DITUMPUKAN", jenis: "neutral" },
    { mesej: "KEMPEN KURANG BERKESAN", jenis: "negatif" }
  ],
  EV216: [
    { mesej: "ISU TEMPATAN DISELESAIKAN", jenis: "positif" },
    { mesej: "JADUAL PELAKSANAAN DIJELASKAN", jenis: "neutral" },
    { mesej: "SOKONGAN TEMPATAN MEROSOT", jenis: "negatif" }
  ],
  EV217: [
    { mesej: "DASAR DIPERBAIKI", jenis: "positif" },
    { mesej: "KHIDMAT KAWASAN DIPERKUKUH", jenis: "positif" },
    { mesej: "PENGUNDI MENJAUH", jenis: "negatif" }
  ],
  EV218: [
    { mesej: "DAKWAAN DIJAWAB", jenis: "positif" },
    { mesej: "PEMBETULAN DIMINTA", jenis: "positif" },
    { mesej: "REPUTASI TERJEJAS", jenis: "negatif" }
  ],
  EV219: [
    { mesej: "PROSES DIHORMATI", jenis: "positif" },
    { mesej: "MAKLUMAT PROSEDUR DIBERI", jenis: "positif" },
    { mesej: "KEYAKINAN PROSES MEROSOT", jenis: "negatif" }
  ],
  EV220: [
    { mesej: "KERAJAAN DIBENTUK", jenis: "positif" },
    { mesej: "SOKONGAN DIPERKUKUH", jenis: "positif" },
    { mesej: "KEBUNTUAN POLITIK", jenis: "negatif" }
  ],

  // =====================================================
  // EV221–EV230 (Kepimpinan Peribadi & Media)
  // =====================================================
  EV221: [
    { mesej: "KONTEKS UCAPAN DIJELASKAN", jenis: "positif" },
    { mesej: "PENJELASAN DIBERI", jenis: "neutral" },
    { mesej: "SALAH FAHAM BERLARUTAN", jenis: "negatif" }
  ],
  EV222: [
    { mesej: "KERAJAAN MINTA MAAF", jenis: "positif" },
    { mesej: "LANGKAH PEMULIHAN DITERANGKAN", jenis: "positif" },
    { mesej: "PERSEPSI MENGELAK TANGGUNGJAWAB", jenis: "negatif" }
  ],
  EV223: [
    { mesej: "ADUAN DITANGANI", jenis: "positif" },
    { mesej: "KES TERPILIH DIAUDIT", jenis: "positif" },
    { mesej: "ADUAN BERULANG", jenis: "negatif" }
  ],
  EV224: [
    { mesej: "KEPUTUSAN KRITIKAL DIUTAMAKAN", jenis: "positif" },
    { mesej: "TUGAS DIDELEGASIKAN", jenis: "positif" },
    { mesej: "KEPUTUSAN TERLEWAT", jenis: "negatif" }
  ],
  EV225: [
    { mesej: "PERUBAHAN DIJELASKAN", jenis: "positif" },
    { mesej: "PINDAAN DIUMUMKAN", jenis: "positif" },
    { mesej: "KEPUTUSAN ASAL KEKAL", jenis: "negatif" }
  ],
  EV226: [
    { mesej: "SASARAN DISEMAK", jenis: "positif" },
    { mesej: "PELAKSANAAN DIUTAMAKAN", jenis: "positif" },
    { mesej: "JANJI TIDAK DITUNAIKAN", jenis: "negatif" }
  ],
  EV227: [
    { mesej: "LANGKAH SEMENTARA DIAMBIL", jenis: "positif" },
    { mesej: "PENILAIAN LENGKAP DIJALANKAN", jenis: "neutral" },
    { mesej: "KEPUTUSAN TERBURU-BURU", jenis: "negatif" }
  ],
  EV228: [
    { mesej: "KERJASAMA DIJALINKAN", jenis: "positif" },
    { mesej: "SOKONGAN TERHAD DITERIMA", jenis: "positif" },
    { mesej: "KERJASAMA DITOLAK", jenis: "negatif" }
  ],
  EV229: [
    { mesej: "REKOD JANJI DIDEDAHKAN", jenis: "positif" },
    { mesej: "SEMAKAN FAKTA DIJALANKAN", jenis: "positif" },
    { mesej: "KEPERCAYAAN RAKYAT MEROSOT", jenis: "negatif" }
  ],
  EV230: [
    { mesej: "PRESTASI PM DILAPORKAN", jenis: "positif" },
    { mesej: "PENCAPAIAN DIUTAMAKAN", jenis: "positif" },
    { mesej: "LAPORAN DITANGGUHKAN", jenis: "negatif" }
  ]
    ,

  // =====================================================
  // EV231–EV240 (Kejutan Politik, Sosial & Ekonomi)
  // =====================================================
  EV231: [
    { mesej: "BEKALAN BARANG DIJAMIN", jenis: "positif" },
    { mesej: "STOK DIAGIH MENGIKUT KEUTAMAAN", jenis: "neutral" },
    { mesej: "BARANG KRITIKAL TERUS BERKURANGAN", jenis: "negatif" }
  ],
  EV232: [
    { mesej: "PEKERJA TERJEJAS DIBANTU", jenis: "positif" },
    { mesej: "PENYUSUNAN SEMULA DIJALANKAN", jenis: "positif" },
    { mesej: "PEKERJAAN HILANG", jenis: "negatif" }
  ],
  EV233: [
    { mesej: "SISTEM PEMBAYARAN PULIH", jenis: "positif" },
    { mesej: "PUNCA GANGGUAN DISIASAT", jenis: "positif" },
    { mesej: "URUSAN PERNIAGAAN TERJEJAS", jenis: "negatif" }
  ],
  EV234: [
    { mesej: "MOGOK DITAMATKAN", jenis: "positif" },
    { mesej: "LALUAN ALTERNATIF DIBUKA", jenis: "positif" },
    { mesej: "BARANGAN TERUS TERTANGGUH", jenis: "negatif" }
  ],
  EV235: [
    { mesej: "KESTABILAN KEWANGAN DIJAMIN", jenis: "positif" },
    { mesej: "PEMANTAUAN RISIKO DIJALANKAN", jenis: "positif" },
    { mesej: "KEYAKINAN PASARAN MEROSOT", jenis: "negatif" }
  ],
  EV236: [
    { mesej: "BEKALAN TENAGA DIPULIHKAN", jenis: "positif" },
    { mesej: "BEKALAN ALTERNATIF DICARI", jenis: "positif" },
    { mesej: "INDUSTRI TERJEJAS", jenis: "negatif" }
  ],
  EV237: [
    { mesej: "INSIDEN DIKAWAL", jenis: "positif" },
    { mesej: "OPERASI DIHENTIKAN SEMENTARA", jenis: "neutral" },
    { mesej: "RISIKO KESELAMATAN TINGGI", jenis: "negatif" }
  ],
  EV238: [
    { mesej: "RANGKAIAN DIPULIHKAN", jenis: "positif" },
    { mesej: "DAYA TAHAN SISTEM DINAIK TARAF", jenis: "positif" },
    { mesej: "GANGGUAN TELEKOMUNIKASI BERULANG", jenis: "negatif" }
  ],
  EV239: [
    { mesej: "PENIPUAN BANTUAN DIKESAN", jenis: "positif" },
    { mesej: "PERMOHONAN DISEMAK", jenis: "positif" },
    { mesej: "PENIPUAN BERULANG", jenis: "negatif" }
  ],
  EV240: [
    { mesej: "PEMANTAUAN EKONOMI DIJALANKAN", jenis: "positif" },
    { mesej: "KUMPULAN RENTAN DILINDUNGI", jenis: "positif" },
    { mesej: "EKONOMI TERUS TERJEJAS", jenis: "negatif" }
  ],

  // =====================================================
  // EV241–EV250 (Berantai, Penilaian & Akhir Penggal)
  // =====================================================
  EV241: [
    { mesej: "PUNCA KELEWATAN DIKENAL PASTI", jenis: "positif" },
    { mesej: "PELAN PELAKSANAAN DITUKAR", jenis: "positif" },
    { mesej: "PROJEK TERUS LEWAT", jenis: "negatif" }
  ],
  EV242: [
    { mesej: "BANTUAN SAMPAI KEPADA PENERIMA", jenis: "positif" },
    { mesej: "RANTAIAN AGIHAN DIAUDIT", jenis: "positif" },
    { mesej: "PENERIMA TERUS MENUNGGU", jenis: "negatif" }
  ],
  EV243: [
    { mesej: "REFORMASI DIPULIHKAN", jenis: "positif" },
    { mesej: "PROJEK RINTIS DILAKSANA", jenis: "positif" },
    { mesej: "REFORMASI DIBATALKAN", jenis: "negatif" }
  ],
  EV244: [
    { mesej: "PRESTASI KEMENTERIAN DIPULIHKAN", jenis: "positif" },
    { mesej: "SUMBER DAN KEPIMPINAN DISUSUN", jenis: "positif" },
    { mesej: "SASARAN TIDAK DICAPAI", jenis: "negatif" }
  ],
  EV245: [
    { mesej: "RIZAB KECEMASAN DIKAWAL", jenis: "positif" },
    { mesej: "PENJIMATAN DILAKUKAN", jenis: "positif" },
    { mesej: "RIZAB TERUS BERKURANGAN", jenis: "negatif" }
  ],
  EV246: [
    { mesej: "PROGRAM DIPERLUAS", jenis: "positif" },
    { mesej: "SKALA PROGRAM DIKEKALKAN", jenis: "neutral" },
    { mesej: "PELUASAN TERHAD", jenis: "negatif" }
  ],
  EV247: [
    { mesej: "PROGRAM DISATUKAN", jenis: "positif" },
    { mesej: "SKOP PROGRAM DIJELASKAN", jenis: "positif" },
    { mesej: "PERTINDIHAN PROGRAM KEKAL", jenis: "negatif" }
  ],
  EV248: [
    { mesej: "PROJEK KRITIKAL DIUTAMAKAN", jenis: "positif" },
    { mesej: "LAPORAN STATUS DITERBITKAN", jenis: "positif" },
    { mesej: "MAKLUMAT TIDAK LENGKAP", jenis: "negatif" }
  ],
  EV249: [
    { mesej: "PRESTASI KERAJAAN DINILAI", jenis: "positif" },
    { mesej: "BIDANG TERBAIK DIFOKUSKAN", jenis: "positif" },
    { mesej: "PENILAIAN DITANGGUHKAN", jenis: "negatif" }
  ],
  EV250: [
    { mesej: "REKOD PENCAPAIAN DIBENTANGKAN", jenis: "positif" },
    { mesej: "KEKURANGAN DIAKUI", jenis: "positif" },
    { mesej: "KEMPEN TANPA LAPORAN TERPERINCI", jenis: "negatif" }
  ]

};

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanFeedback(idPeristiwa, indexPilihan) {
  if (!DATA_FEEDBACK[idPeristiwa]) return null;
  const senarai = DATA_FEEDBACK[idPeristiwa];
  if (!senarai || indexPilihan >= senarai.length) return null;
  return senarai[indexPilihan];
}

function jumlahFeedback() {
  let jumlah = 0;
  Object.keys(DATA_FEEDBACK).forEach(id => {
    jumlah += (DATA_FEEDBACK[id] || []).length;
  });
  return jumlah;
}

// Log pengesahan
console.log("💬 DATA_FEEDBACK dimuatkan:", Object.keys(DATA_FEEDBACK).length, "peristiwa,", jumlahFeedback(), "mesej feedback");
  