"use strict";

// =====================================
// MyPM Simulasi - Data 30 Kementerian
// =====================================

const DATA_KEMENTERIAN = [
  { id: "K01", nama: "Kementerian Kewangan", bidang: "Kewangan negara, belanjawan, hasil, cukai, hutang" },
  { id: "K02", nama: "Kementerian Ekonomi", bidang: "Pembangunan ekonomi, KDNK, produktiviti, strategi" },
  { id: "K03", nama: "Kementerian Dalam Negeri", bidang: "Keselamatan dalam negeri, imigresen, pendaftaran" },
  { id: "K04", nama: "Kementerian Pertahanan", bidang: "Pertahanan negara, tentera, sempadan" },
  { id: "K05", nama: "Kementerian Luar Negeri", bidang: "Diplomasi, kedutaan, hubungan antarabangsa" },
  { id: "K06", nama: "Kementerian Pendidikan", bidang: "Sekolah, kurikulum, guru, sistem pendidikan" },
  { id: "K07", nama: "Kementerian Pendidikan Tinggi", bidang: "Universiti, kolej, penyelidikan, graduan" },
  { id: "K08", nama: "Kementerian Kesihatan", bidang: "Hospital, klinik, kesihatan awam, ubat" },
  { id: "K09", nama: "Kementerian Pengangkutan", bidang: "Pengangkutan darat, laut, udara, mobiliti" },
  { id: "K10", nama: "Kementerian Kerja Raya", bidang: "Jalan raya, lebuh raya, bangunan kerajaan" },
  { id: "K11", nama: "Kementerian Perumahan dan Kerajaan Tempatan", bidang: "Perumahan mampu milik, perancangan bandar" },
  { id: "K12", nama: "Kementerian Pembangunan Luar Bandar", bidang: "Pembangunan luar bandar, kemudahan asas" },
  { id: "K13", nama: "Kementerian Pertanian dan Keterjaminan Makanan", bidang: "Pertanian, penternakan, perikanan, makanan" },
  { id: "K14", nama: "Kementerian Pelaburan, Perdagangan dan Industri", bidang: "Pelaburan, industri, perdagangan antarabangsa" },
  { id: "K15", nama: "Kementerian Pembangunan Usahawan dan Koperasi", bidang: "PKS, usahawan, koperasi, pembiayaan" },
  { id: "K16", nama: "Kementerian Sumber Manusia", bidang: "Pasaran buruh, latihan, kebajikan pekerja" },
  { id: "K17", nama: "Kementerian Pembangunan Wanita, Keluarga dan Masyarakat", bidang: "Perlindungan sosial, keluarga, kanak-kanak, warga emas" },
  { id: "K18", nama: "Kementerian Belia dan Sukan", bidang: "Belia, sukan, atlet, program generasi muda" },
  { id: "K19", nama: "Kementerian Perdagangan Dalam Negeri dan Kos Sara Hidup", bidang: "Perlindungan pengguna, harga, kos sara hidup" },
  { id: "K20", nama: "Kementerian Peralihan Tenaga dan Transformasi Air", bidang: "Tenaga, kecekapan, tenaga bersih, air" },
  { id: "K21", nama: "Kementerian Sumber Asli dan Kelestarian Alam", bidang: "Sumber asli, alam sekitar, biodiversiti" },
  { id: "K22", nama: "Kementerian Digital", bidang: "Transformasi digital, perkhidmatan kerajaan dalam talian" },
  { id: "K23", nama: "Kementerian Sains, Teknologi dan Inovasi", bidang: "Penyelidikan, inovasi, teknologi baharu" },
  { id: "K24", nama: "Kementerian Komunikasi", bidang: "Komunikasi, penyiaran, maklumat awam" },
  { id: "K25", nama: "Kementerian Perpaduan Negara", bidang: "Perpaduan masyarakat, keharmonian, integrasi" },
  { id: "K26", nama: "Kementerian Pelancongan, Seni dan Budaya", bidang: "Pelancongan, warisan, seni, budaya" },
  { id: "K27", nama: "Kementerian Pembangunan Sabah", bidang: "Pembangunan Sabah, infrastruktur, kemudahan" },
  { id: "K28", nama: "Kementerian Pembangunan Sarawak", bidang: "Pembangunan Sarawak, infrastruktur, kemudahan" },
  { id: "K29", nama: "Kementerian Hal Ehwal Agama", bidang: "Hal ehwal agama, program keagamaan" },
  { id: "K30", nama: "Kementerian Undang-Undang dan Reformasi Institusi", bidang: "Pembaharuan institusi, undang-undang, integriti" }
];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanKementerian(id) {
  return DATA_KEMENTERIAN.find(k => k.id === id);
}

function cariKementerianMengikutNama(nama) {
  return DATA_KEMENTERIAN.find(k => k.nama === nama);
}

function jumlahKementerian() {
  return DATA_KEMENTERIAN.length;
}