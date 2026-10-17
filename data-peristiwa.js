"use strict";

// =====================================
// MyPM Simulasi - Data 250 Peristiwa
// Fasa 7.0: Manifesto dan Peristiwa
// =====================================

const DATA_PERISTIWA = [

  // =====================================================
  // KATEGORI 1 — EKONOMI DAN KOS SARA HIDUP (EV001–EV010)
  // =====================================================
  {
    id: "EV001", nama: "Harga Barang Keperluan Meningkat",
    kategori: "ekonomi", ikon: "🛒", jenis: "negatif",
    deskripsi: "Harga makanan asas meningkat dan rakyat meminta tindakan segera.",
    kesanAsas: { populariti: -3, kepuasan: -3, inflasi: 0.4 },
    pilihan: [
      { teks: "Bantuan bersasar kepada B40", kesan: { populariti: 3, kepuasan: 4, perbelanjaan: 15 }, label: "Populari naik" },
      { teks: "Perketat pemantauan bekalan", kesan: { inflasi: -0.3, populariti: 1 }, label: "Inflasi turun" },
      { teks: "Kekalkan dasar semasa", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV002", nama: "Ringgit Mengalami Tekanan",
    kategori: "ekonomi", ikon: "💱", jenis: "negatif",
    deskripsi: "Ringgit melemah dan kos import menjadi perhatian.",
    kesanAsas: { inflasi: 0.5, populariti: -2, hasil: -8 },
    pilihan: [
      { teks: "Selaraskan komunikasi dan dasar ekonomi", kesan: { populariti: 2, hasil: 5 }, label: "Keyakinan pulih" },
      { teks: "Kurangkan kebergantungan import", kesan: { hasil: -10, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Tunggu pasaran stabil", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV003", nama: "Pelaburan Asing Tertangguh",
    kategori: "ekonomi", ikon: "💼", jenis: "negatif",
    deskripsi: "Pelabur menangguhkan projek kerana kos dan ketidakpastian dasar.",
    kesanAsas: { pertumbuhan: -0.5, populariti: -1 },
    pilihan: [
      { teks: "Tubuhkan pasukan penyelarasan", kesan: { perbelanjaan: 8, pertumbuhan: 0.4 }, label: "Pelaburan naik" },
      { teks: "Beri insentif bersasar", kesan: { hasil: -12, pertumbuhan: 0.6 }, label: "Insentif" },
      { teks: "Kekalkan syarat semasa", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV004", nama: "Pengangguran Belia Meningkat",
    kategori: "ekonomi", ikon: "🎓", jenis: "negatif",
    deskripsi: "Graduan sukar mendapat pekerjaan yang sepadan dengan kemahiran mereka.",
    kesanAsas: { pengangguran: 0.4, populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Perluas latihan industri", kesan: { perbelanjaan: 12, pengangguran: -0.3, populariti: 2 }, label: "Peluang naik" },
      { teks: "Insentif pengambilan pekerja", kesan: { perbelanjaan: 15, pengangguran: -0.4 }, label: "Pekerjaan naik" },
      { teks: "Tunggu pasaran pulih", kesan: { populariti: -3, pengangguran: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV005", nama: "Harga Minyak Dunia Melonjak",
    kategori: "ekonomi", ikon: "🛢️", jenis: "negatif",
    deskripsi: "Kenaikan harga minyak menekan kos pengangkutan dan perbelanjaan subsidi.",
    kesanAsas: { inflasi: 0.8, perbelanjaan: 20, populariti: -2 },
    pilihan: [
      { teks: "Semak bantuan tenaga bersasar", kesan: { perbelanjaan: -10, populariti: -2 }, label: "Jimat bajet" },
      { teks: "Kekalkan bantuan penuh", kesan: { populariti: 2, perbelanjaan: 15 }, label: "Populari naik" },
      { teks: "Kurangkan berperingkat", kesan: { perbelanjaan: -8, populariti: -3 }, label: "Risiko bantahan" }
    ]
  },
  {
    id: "EV006", nama: "Pertumbuhan Ekonomi Perlahan",
    kategori: "ekonomi", ikon: "📉", jenis: "negatif",
    deskripsi: "Aktiviti perniagaan dan perbelanjaan pengguna menunjukkan kelembapan.",
    kesanAsas: { pertumbuhan: -0.8, hasil: -12, populariti: -2 },
    pilihan: [
      { teks: "Percepat projek berimpak tinggi", kesan: { perbelanjaan: 25, pertumbuhan: 0.6 }, label: "Rangsangan" },
      { teks: "Sokong perniagaan berdaya maju", kesan: { perbelanjaan: 10, pertumbuhan: 0.3 }, label: "Perniagaan" },
      { teks: "Utamakan penjimatan fiskal", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Jimat bajet" }
    ]
  },
  {
    id: "EV007", nama: "Inflasi Perkhidmatan Meningkat",
    kategori: "ekonomi", ikon: "📈", jenis: "negatif",
    deskripsi: "Kos sewa, pengangkutan dan perkhidmatan asas semakin membebankan isi rumah.",
    kesanAsas: { inflasi: 0.5, populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Perkukuh persaingan dan ketelusan harga", kesan: { inflasi: -0.3, populariti: 1 }, label: "Inflasi turun" },
      { teks: "Bantu kumpulan rentan", kesan: { populariti: 3, perbelanjaan: 10 }, label: "Populari naik" },
      { teks: "Pantau tanpa langkah tambahan", kesan: { populariti: -2, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV008", nama: "Jurang Pendapatan Melebar",
    kategori: "ekonomi", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Manfaat pertumbuhan ekonomi tidak dirasai secara seimbang.",
    kesanAsas: { kepuasan: -3, populariti: -1 },
    pilihan: [
      { teks: "Perluas latihan dan peluang pekerjaan", kesan: { perbelanjaan: 15, kepuasan: 3 }, label: "Jangka panjang" },
      { teks: "Tambah bantuan bersasar", kesan: { populariti: 3, perbelanjaan: 12 }, label: "Populari naik" },
      { teks: "Fokus pertumbuhan keseluruhan", kesan: { pertumbuhan: 0.3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV009", nama: "Keyakinan Pengguna Merosot",
    kategori: "ekonomi", ikon: "😟", jenis: "negatif",
    deskripsi: "Isi rumah mengurangkan perbelanjaan kerana bimbang tentang masa depan ekonomi.",
    kesanAsas: { pertumbuhan: -0.4, populariti: -2 },
    pilihan: [
      { teks: "Terangkan keadaan dengan data", kesan: { populariti: 2, kepuasan: 1 }, label: "Ketelusan" },
      { teks: "Perkukuh jaringan keselamatan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Tangguhkan tindakan baharu", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV010", nama: "Kos Logistik Meningkat",
    kategori: "ekonomi", ikon: "🚚", jenis: "negatif",
    deskripsi: "Perniagaan melaporkan kenaikan kos penghantaran dan pengedaran.",
    kesanAsas: { inflasi: 0.3, populariti: -1, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Baiki kesesakan infrastruktur", kesan: { perbelanjaan: 20, pertumbuhan: 0.4 }, label: "Kecekapan" },
      { teks: "Semak halangan dan proses", kesan: { perbelanjaan: 5, inflasi: -0.2 }, label: "Jimat" },
      { teks: "Bantuan sementara sektor terjejas", kesan: { perbelanjaan: 8, populariti: 1 }, label: "Sokongan" }
    ]
  },

  // =====================================================
  // KATEGORI 2 — FISKAL, CUKAI, BAJET (EV011–EV020)
  // =====================================================
  {
    id: "EV011", nama: "Hasil Kerajaan Merosot",
    kategori: "fiskal", ikon: "💰", jenis: "negatif",
    deskripsi: "Kutipan hasil berada di bawah unjuran belanjawan.",
    kesanAsas: { hasil: -25, populariti: -2 },
    pilihan: [
      { teks: "Semak projek kurang mendesak", kesan: { hasil: 15, populariti: -1 }, label: "Jimat" },
      { teks: "Perbaiki pematuhan cukai", kesan: { hasil: 20, perbelanjaan: 5 }, label: "Hasil naik" },
      { teks: "Kekalkan semua perbelanjaan", kesan: { hutang: 25, populariti: -3 }, label: "Hutang naik" }
    ]
  },
  {
    id: "EV012", nama: "Projek Melebihi Bajet",
    kategori: "fiskal", ikon: "💸", jenis: "negatif",
    deskripsi: "Kos projek awam meningkat jauh daripada anggaran asal.",
    kesanAsas: { perbelanjaan: 15, populariti: -2 },
    pilihan: [
      { teks: "Audit kos dan kontrak", kesan: { populariti: 2, pertumbuhan: -0.1 }, label: "Ketelusan" },
      { teks: "Luluskan tambahan jika berasas", kesan: { perbelanjaan: 20, populariti: 1 }, label: "Projek terus" },
      { teks: "Hentikan sementara", kesan: { populariti: -3, perbelanjaan: -10 }, label: "Jimat bajet" }
    ]
  },
  {
    id: "EV013", nama: "Dakwaan Pembaziran Wang Awam",
    kategori: "fiskal", ikon: "🔍", jenis: "negatif",
    deskripsi: "Media mempersoalkan pembelian kerajaan yang mahal.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Jalankan audit bebas", kesan: { populariti: 3, perbelanjaan: 5 }, label: "Ketelusan" },
      { teks: "Minta penjelasan kementerian", kesan: { populariti: 1, kepuasan: 1 }, label: "Siasatan" },
      { teks: "Tolak dakwaan", kesan: { populariti: -5, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV014", nama: "Hutang Kerajaan Dipersoalkan",
    kategori: "fiskal", ikon: "📉", jenis: "negatif",
    deskripsi: "Rakyat dan penganalisis mempersoalkan komitmen hutang negara.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Terbitkan pelan fiskal sederhana", kesan: { populariti: 3, hutang: -5 }, label: "Keyakinan" },
      { teks: "Potong perbelanjaan menyeluruh", kesan: { hutang: -20, populariti: -4, pertumbuhan: -0.4 }, label: "Jimat" },
      { teks: "Tangguhkan penjelasan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV015", nama: "Permintaan Dana Kecemasan",
    kategori: "fiskal", ikon: "🆘", jenis: "neutral",
    deskripsi: "Beberapa agensi meminta dana tambahan bagi menangani keperluan mendesak.",
    kesanAsas: {},
    pilihan: [
      { teks: "Guna rizab untuk keperluan disahkan", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Bantuan cepat" },
      { teks: "Susun semula peruntukan", kesan: { populariti: -1 }, label: "Rizab terpelihara" },
      { teks: "Tunggu belanjawan tambahan", kesan: { populariti: -3 }, label: "Bantuan lewat" }
    ]
  },
  {
    id: "EV016", nama: "Cadangan Cukai Baharu",
    kategori: "fiskal", ikon: "🧾", jenis: "neutral",
    deskripsi: "Kerajaan perlu mencari hasil tambahan tanpa membebankan kumpulan rentan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Cukai bersasar selepas penilaian", kesan: { hasil: 25, populariti: -3 }, label: "Hasil naik" },
      { teks: "Luaskan asas cukai sedia ada", kesan: { hasil: 15, populariti: -1 }, label: "Sederhana" },
      { teks: "Tolak cukai baharu", kesan: { hasil: -10, populariti: 2 }, label: "Populari naik" }
    ]
  },
  {
    id: "EV017", nama: "Subsidi Tidak Tepat Sasaran",
    kategori: "fiskal", ikon: "🎯", jenis: "negatif",
    deskripsi: "Semakan menunjukkan sebahagian subsidi diterima oleh golongan yang tidak memerlukannya.",
    kesanAsas: { perbelanjaan: 10, populariti: -2 },
    pilihan: [
      { teks: "Perkenalkan kelayakan bersasar", kesan: { perbelanjaan: -15, populariti: -2 }, label: "Jimat bajet" },
      { teks: "Kekalkan subsidi menyeluruh", kesan: { populariti: 1, perbelanjaan: 10 }, label: "Populari naik" },
      { teks: "Kurangkan secara mendadak", kesan: { perbelanjaan: -20, populariti: -5 }, label: "Bantahan" }
    ]
  },
  {
    id: "EV018", nama: "Tunggakan Bayaran Kerajaan",
    kategori: "fiskal", ikon: "⏳", jenis: "negatif",
    deskripsi: "Pembekal melaporkan bayaran kontrak kerajaan lewat diterima.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Selesaikan tunggakan sah", kesan: { perbelanjaan: 25, populariti: 2, pertumbuhan: 0.2 }, label: "Aliran pulih" },
      { teks: "Susun jadual pembayaran", kesan: { populariti: 0 }, label: "Berperingkat" },
      { teks: "Tangguhkan pembayaran", kesan: { populariti: -4, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV019", nama: "Dana Pembangunan Tidak Digunakan",
    kategori: "fiskal", ikon: "📊", jenis: "negatif",
    deskripsi: "Beberapa kementerian gagal menggunakan peruntukan yang telah diluluskan.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Pindahkan dana kepada projek bersedia", kesan: { pertumbuhan: 0.3, populariti: 1 }, label: "Cekap" },
      { teks: "Bantu kementerian memperbaiki", kesan: { perbelanjaan: 5, pertumbuhan: 0.2 }, label: "Sokongan" },
      { teks: "Batalkan baki peruntukan", kesan: { perbelanjaan: -10, populariti: -1 }, label: "Jimat" }
    ]
  },
  {
    id: "EV020", nama: "Belanjawan Tahunan Ditentang",
    kategori: "fiskal", ikon: "🏛️", jenis: "negatif",
    deskripsi: "Cadangan belanjawan menerima bantahan daripada parti gabungan dan pembangkang.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Runding pindaan terpilih", kesan: { populariti: 2 }, label: "Kompromi" },
      { teks: "Kekalkan dan jelaskan keutamaan", kesan: { populariti: -1 }, label: "Konsisten" },
      { teks: "Tangguhkan pembentangan", kesan: { populariti: -3 }, label: "Kelewatan" }
    ]
  },

  // =====================================================
  // KATEGORI 3 — PEKERJAAN & PASARAN BURUH (EV021–EV030)
  // =====================================================
  {
    id: "EV021", nama: "Kilang Besar Mengurangkan Pekerja",
    kategori: "pekerjaan", ikon: "🏭", jenis: "negatif",
    deskripsi: "Sebuah majikan utama mengumumkan pemberhentian pekerja.",
    kesanAsas: { pengangguran: 0.5, populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Bantuan penempatan semula dan latihan", kesan: { perbelanjaan: 12, populariti: 3, pengangguran: -0.2 }, label: "Populari naik" },
      { teks: "Bantu rundingan majikan-pekerja", kesan: { populariti: 1 }, label: "Rundingan" },
      { teks: "Tidak campur tangan", kesan: { pengangguran: 0.3, populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV022", nama: "Kekurangan Pekerja Berkemahiran",
    kategori: "pekerjaan", ikon: "🔧", jenis: "negatif",
    deskripsi: "Industri melaporkan kesukaran mencari pekerja dengan kemahiran teknikal tertentu.",
    kesanAsas: { pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Biayai latihan bersama industri", kesan: { perbelanjaan: 10, pertumbuhan: 0.3 }, label: "Kemahiran" },
      { teks: "Pengiktirafan kelayakan lebih mudah", kesan: { populariti: 1 }, label: "Cekap" },
      { teks: "Serahkan kepada majikan", kesan: { pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV023", nama: "Pertikaian Gaji",
    kategori: "pekerjaan", ikon: "💰", jenis: "neutral",
    deskripsi: "Pekerja menuntut kenaikan gaji, manakala majikan bimbang tentang kos operasi.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Fasilitasi dialog dan penilaian sektor", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Kaji gaji minimum berdasarkan bukti", kesan: { populariti: 3, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Tangguhkan perubahan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV024", nama: "Mogok Pekerja",
    kategori: "pekerjaan", ikon: "✊", jenis: "negatif",
    deskripsi: "Pertikaian pekerjaan menyebabkan operasi sektor tertentu terganggu.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Lantik pengantara diterima", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Pastikan perkhidmatan kritikal", kesan: { populariti: -1, pertumbuhan: 0.1 }, label: "Perkhidmatan" },
      { teks: "Biarkan rundingan tanpa campur tangan", kesan: { populariti: -3, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV025", nama: "Pekerja Gig Menuntut Perlindungan",
    kategori: "pekerjaan", ikon: "🛵", jenis: "neutral",
    deskripsi: "Pekerja gig meminta perlindungan sosial dan kejelasan hak pekerjaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Runding skim perlindungan", kesan: { populariti: 3, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Panduan dan standard kontrak", kesan: { populariti: 2 }, label: "Kejelasan" },
      { teks: "Kekalkan kerangka semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV026", nama: "Kekurangan Peluang di Luar Bandar",
    kategori: "pekerjaan", ikon: "🌾", jenis: "negatif",
    deskripsi: "Belia berhijrah kerana peluang pekerjaan tempatan terhad.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Sokong perusahaan tempatan", kesan: { perbelanjaan: 12, populariti: 3, pengangguran: -0.2 }, label: "Populari naik" },
      { teks: "Bina pusat latihan serantau", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Tumpukan pelaburan di bandar", kesan: { pertumbuhan: 0.3, populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV027", nama: "Produktiviti Pekerja Merosot",
    kategori: "pekerjaan", ikon: "📉", jenis: "negatif",
    deskripsi: "Sektor tertentu melaporkan produktiviti rendah dan kos pengeluaran meningkat.",
    kesanAsas: { pertumbuhan: -0.4 },
    pilihan: [
      { teks: "Sokong latihan dan automasi", kesan: { perbelanjaan: 15, pertumbuhan: 0.4 }, label: "Produktiviti" },
      { teks: "Kajian punca industri", kesan: { perbelanjaan: 5 }, label: "Kajian" },
      { teks: "Tiada intervensi", kesan: { pertumbuhan: -0.3, populariti: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV028", nama: "Pertikaian Keselamatan Tempat Kerja",
    kategori: "pekerjaan", ikon: "⚠️", jenis: "negatif",
    deskripsi: "Aduan keselamatan di tempat kerja meningkat selepas beberapa insiden.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Perketat pemeriksaan berasaskan risiko", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Keselamatan" },
      { teks: "Bantu majikan naik taraf prosedur", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Sokongan" },
      { teks: "Kekalkan pemeriksaan rutin", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV029", nama: "Pekerja Asing dan Keperluan Industri",
    kategori: "pekerjaan", ikon: "🌐", jenis: "neutral",
    deskripsi: "Industri meminta pekerja tambahan, sementara isu penguatkuasaan dan pergantungan buruh menjadi perhatian.",
    kesanAsas: {},
    pilihan: [
      { teks: "Semak keperluan sektor dan pematuhan", kesan: { populariti: 1 }, label: "Teliti" },
      { teks: "Galakkan automasi dan latihan tempatan", kesan: { perbelanjaan: 15, populariti: 2, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Luluskan permintaan secara meluas", kesan: { pertumbuhan: 0.4, populariti: -2 }, label: "Industri gembira" }
    ]
  },
  {
    id: "EV030", nama: "Graduan Tidak Sejajar dengan Keperluan Industri",
    kategori: "pekerjaan", ikon: "🎓", jenis: "negatif",
    deskripsi: "Majikan mendapati sebahagian graduan tidak mempunyai kemahiran yang diperlukan.",
    kesanAsas: { pengangguran: 0.2, populariti: -1 },
    pilihan: [
      { teks: "Libatkan industri dalam latihan", kesan: { perbelanjaan: 10, pengangguran: -0.2, populariti: 2 }, label: "Padanan" },
      { teks: "Biayai latihan semula graduan", kesan: { perbelanjaan: 12, pengangguran: -0.3 }, label: "Latihan" },
      { teks: "Kekalkan program sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 4 — PERNIAGAAN & PELABURAN (EV031–EV040)
  // =====================================================
  {
    id: "EV031", nama: "Syarikat Utama Mengancam Berpindah",
    kategori: "perniagaan", ikon: "🏢", jenis: "negatif",
    deskripsi: "Sebuah syarikat mempertimbangkan memindahkan operasi ke negara lain.",
    kesanAsas: { pengangguran: 0.3, populariti: -2 },
    pilihan: [
      { teks: "Runding penyelesaian operasi", kesan: { populariti: 1, pengangguran: -0.2 }, label: "Rundingan" },
      { teks: "Insentif terhad dan bersyarat", kesan: { hasil: -12, populariti: 2, pengangguran: -0.3 }, label: "Syarikat kekal" },
      { teks: "Tolak rundingan khas", kesan: { populariti: -3, pengangguran: 0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV032", nama: "Perusahaan Kecil Kehabisan Modal",
    kategori: "perniagaan", ikon: "💼", jenis: "negatif",
    deskripsi: "Perniagaan kecil sukar mendapatkan pembiayaan untuk meneruskan operasi.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Perluas pembiayaan bersyarat", kesan: { perbelanjaan: 15, populariti: 3, pertumbuhan: 0.3 }, label: "PKS disokong" },
      { teks: "Latihan kewangan dan perniagaan", kesan: { perbelanjaan: 5, populariti: 1 }, label: "Latihan" },
      { teks: "Biarkan pembiayaan pasaran", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV033", nama: "Kelulusan Perniagaan Terlalu Lambat",
    kategori: "perniagaan", ikon: "🐌", jenis: "negatif",
    deskripsi: "Pelabur mengadu proses lesen dan kelulusan bertindih antara agensi.",
    kesanAsas: { populariti: -1, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Pusat penyelarasan", kesan: { perbelanjaan: 12, pertumbuhan: 0.3, populariti: 2 }, label: "Cekap" },
      { teks: "Hapus proses bertindih", kesan: { perbelanjaan: 15, pertumbuhan: 0.4 }, label: "Jangka panjang" },
      { teks: "Kekalkan proses", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV034", nama: "Pelaburan Teknologi Baharu Ditawarkan",
    kategori: "perniagaan", ikon: "💡", jenis: "positif",
    deskripsi: "Pelabur menawarkan projek teknologi dengan potensi pekerjaan tetapi meminta sokongan kerajaan.",
    kesanAsas: { pertumbuhan: 0.4, pengangguran: -0.2 },
    pilihan: [
      { teks: "Nilai manfaat dan syarat pemindahan teknologi", kesan: { pertumbuhan: 0.3, populariti: 1 }, label: "Kajian" },
      { teks: "Sokong dengan sasaran prestasi", kesan: { hasil: -10, pertumbuhan: 0.6, populariti: 2 }, label: "Pelaburan naik" },
      { teks: "Tolak tawaran", kesan: { populariti: -1 }, label: "Peluang hilang" }
    ]
  },
  {
    id: "EV035", nama: "Perniagaan Tempatan Mengadu Persaingan Tidak Seimbang",
    kategori: "perniagaan", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Peniaga tempatan mendakwa mereka sukar bersaing dengan syarikat lebih besar.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Perkukuh penguatkuasaan persaingan", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Adil" },
      { teks: "Bantu produktiviti peniaga kecil", kesan: { perbelanjaan: 12, populariti: 3 }, label: "Populari naik" },
      { teks: "Tiada bantuan khusus", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV036", nama: "Eksport Menurun",
    kategori: "perniagaan", ikon: "📦", jenis: "negatif",
    deskripsi: "Permintaan luar negara terhadap produk tempatan merosot.",
    kesanAsas: { pertumbuhan: -0.5, hasil: -12 },
    pilihan: [
      { teks: "Bantu cari pasaran baharu", kesan: { perbelanjaan: 10, pertumbuhan: 0.3 }, label: "Pasaran" },
      { teks: "Sokongan produktiviti dan kualiti", kesan: { perbelanjaan: 15, pertumbuhan: 0.4 }, label: "Jangka panjang" },
      { teks: "Tunggu pemulihan permintaan", kesan: { pertumbuhan: -0.3, populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV037", nama: "Penutupan Perniagaan di Pusat Bandar",
    kategori: "perniagaan", ikon: "🏚️", jenis: "negatif",
    deskripsi: "Kedai dan perniagaan kecil tutup akibat sewa dan permintaan yang lemah.",
    kesanAsas: { populariti: -2, pengangguran: 0.2 },
    pilihan: [
      { teks: "Baiki akses kawasan perniagaan", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Kunjungan naik" },
      { teks: "Khidmat pemulihan perniagaan", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Sokongan" },
      { teks: "Biarkan pasaran menyesuaikan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV038", nama: "Aduan Monopoli Pasaran",
    kategori: "perniagaan", ikon: "🔒", jenis: "negatif",
    deskripsi: "Pengguna dan peniaga mendakwa beberapa syarikat menguasai pasaran tertentu.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Rujuk kes kepada pengawasan persaingan", kesan: { populariti: 3, perbelanjaan: 3 }, label: "Siasatan" },
      { teks: "Tingkatkan ketelusan harga", kesan: { populariti: 1 }, label: "Ketelusan" },
      { teks: "Tiada tindakan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV039", nama: "Projek Pelaburan Menjanjikan Pekerjaan",
    kategori: "perniagaan", ikon: "🏗️", jenis: "positif",
    deskripsi: "Syarikat menawarkan projek besar tetapi meminta jaminan infrastruktur dan tenaga kerja.",
    kesanAsas: { pertumbuhan: 0.5, pengangguran: -0.3 },
    pilihan: [
      { teks: "Runding komitmen pekerjaan", kesan: { pertumbuhan: 0.4, populariti: 2 }, label: "Terukur" },
      { teks: "Sediakan infrastruktur", kesan: { perbelanjaan: 25, pertumbuhan: 0.7, populariti: 2 }, label: "Pelaburan" },
      { teks: "Tolak komitmen tambahan", kesan: { populariti: -1 }, label: "Peluang hilang" }
    ]
  },
  {
    id: "EV040", nama: "Skandal Produk Pengguna",
    kategori: "perniagaan", ikon: "⚠️", jenis: "negatif",
    deskripsi: "Produk popular didakwa tidak memenuhi standard keselamatan atau kualiti.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Pemeriksaan dan maklumkan hasil", kesan: { populariti: 2, kepuasan: 2 }, label: "Keselamatan" },
      { teks: "Penarikan balik sementara", kesan: { populariti: 3, kepuasan: 2, pertumbuhan: -0.1 }, label: "Populari naik" },
      { teks: "Tunggu lebih banyak aduan", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  }

// (sambungan di bahagian 2)
  ,

  // =====================================================
  // KATEGORI 5 — PERUMAHAN & KEMUDAHAN TEMPATAN (EV041–EV050)
  // =====================================================
  {
    id: "EV041", nama: "Sewa Rumah Meningkat",
    kategori: "perumahan", ikon: "🏠", jenis: "negatif",
    deskripsi: "Penyewa di kawasan bandar menghadapi kenaikan sewa yang mendadak.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Perluas bantuan perumahan bersasar", kesan: { populariti: 3, kepuasan: 3, perbelanjaan: 12 }, label: "Populari naik" },
      { teks: "Tambah bekalan rumah", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan pendekatan semasa", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV042", nama: "Projek Rumah Mampu Milik Lewat",
    kategori: "perumahan", ikon: "🏗️", jenis: "negatif",
    deskripsi: "Pembeli menunggu projek perumahan yang gagal mengikut jadual.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Audit kemajuan dan tindakan pemaju", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Ketelusan" },
      { teks: "Pelan pemulihan yang sah", kesan: { populariti: 3, perbelanjaan: 15 }, label: "Populari naik" },
      { teks: "Tidak campur tangan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV043", nama: "Rumah Terbengkalai",
    kategori: "perumahan", ikon: "🏚️", jenis: "negatif",
    deskripsi: "Pembeli bimbang projek kediaman tidak akan disiapkan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Proses perlindungan pembeli", kesan: { populariti: 3, perbelanjaan: 8 }, label: "Hak terjaga" },
      { teks: "Fasilitasi penyelesaian", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Tunggu tindakan pihak swasta", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV044", nama: "Banjir Kilat di Kawasan Perumahan",
    kategori: "perumahan", ikon: "🌊", jenis: "negatif",
    deskripsi: "Penduduk meminta penyelesaian terhadap banjir berulang.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Baiki saliran kritikal", kesan: { perbelanjaan: 18, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Pelan jangka panjang guna tanah", kesan: { perbelanjaan: 30, populariti: 2 }, label: "Menyeluruh" },
      { teks: "Bantuan selepas kejadian sahaja", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV045", nama: "Kekurangan Rumah Pekerja",
    kategori: "perumahan", ikon: "🏢", jenis: "negatif",
    deskripsi: "Kawasan industri menghadapi kekurangan penginapan pekerja yang sesuai.",
    kesanAsas: { populariti: -1, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Tetapkan standard penginapan", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Piawaian" },
      { teks: "Galakkan pembangunan penginapan", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Pekerja gembira" },
      { teks: "Serahkan kepada majikan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV046", nama: "Kemudahan Awam Rosak",
    kategori: "perumahan", ikon: "🛠️", jenis: "negatif",
    deskripsi: "Taman, tandas awam dan kemudahan komuniti kurang diselenggara.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Utamakan pembaikan keselamatan", kesan: { perbelanjaan: 10, populariti: 2, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Geran penyelenggaraan bersyarat", kesan: { perbelanjaan: 8, populariti: 1 }, label: "Berkongsi" },
      { teks: "Tangguhkan pembaikan", kesan: { populariti: -2, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV047", nama: "Kesesakan Bandar Semakin Teruk",
    kategori: "perumahan", ikon: "🚗", jenis: "negatif",
    deskripsi: "Masa perjalanan meningkat dan penduduk menuntut pilihan pengangkutan lebih baik.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Tingkatkan pengangkutan awam", kesan: { perbelanjaan: 30, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Baiki pengurusan trafik", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Cekap" },
      { teks: "Tambah kapasiti jalan sahaja", kesan: { perbelanjaan: 20, populariti: 1 }, label: "Sementara" }
    ]
  },
  {
    id: "EV048", nama: "Kawasan Perumahan Kekurangan Klinik",
    kategori: "perumahan", ikon: "🏥", jenis: "negatif",
    deskripsi: "Penduduk terpaksa melakukan perjalanan jauh untuk mendapatkan rawatan asas.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Klinik bergerak atau sesi tambahan", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Nilai pembinaan kemudahan tetap", kesan: { perbelanjaan: 25, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan rangkaian semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV049", nama: "Masalah Sampah dan Kebersihan",
    kategori: "perumahan", ikon: "🗑️", jenis: "negatif",
    deskripsi: "Aduan mengenai kutipan sampah dan kebersihan awam meningkat.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Baiki jadual kutipan", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Program pengasingan sisa", kesan: { perbelanjaan: 10, populariti: 1 }, label: "Jangka panjang" },
      { teks: "Kekalkan operasi sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV050", nama: "Penduduk Membantah Projek Pembangunan",
    kategori: "perumahan", ikon: "📢", jenis: "negatif",
    deskripsi: "Projek baharu mendapat bantahan kerana kesan trafik, bunyi atau alam sekitar.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Konsultasi dan semak impak", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Rundingan" },
      { teks: "Ubah reka bentuk dan syarat", kesan: { populariti: 3, perbelanjaan: 10 }, label: "Populari naik" },
      { teks: "Teruskan tanpa perubahan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 6 — PENDIDIKAN & BELIA (EV051–EV060)
  // =====================================================
  {
    id: "EV051", nama: "Kekurangan Guru",
    kategori: "pendidikan", ikon: "👨‍🏫", jenis: "negatif",
    deskripsi: "Beberapa sekolah kekurangan guru dalam mata pelajaran tertentu.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Susun penempatan semula", kesan: { populariti: 2 }, label: "Cekap" },
      { teks: "Latih dan ambil guru tambahan", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Pengaturan sementara", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV052", nama: "Sekolah Memerlukan Pembaikan",
    kategori: "pendidikan", ikon: "🏫", jenis: "negatif",
    deskripsi: "Bangunan sekolah menghadapi kerosakan yang mengganggu pembelajaran.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Utamakan pembaikan berisiko tinggi", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Pakej pembaikan menyeluruh", kesan: { perbelanjaan: 25, populariti: 3 }, label: "Menyeluruh" },
      { teks: "Tangguhkan pembaikan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV053", nama: "Keciciran Murid Meningkat",
    kategori: "pendidikan", ikon: "📉", jenis: "negatif",
    deskripsi: "Lebih ramai murid berisiko meninggalkan persekolahan.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Sokongan keluarga dan bimbingan", kesan: { perbelanjaan: 12, populariti: 3 }, label: "Populari naik" },
      { teks: "Laluan pendidikan alternatif", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Akses" },
      { teks: "Kekalkan program sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV054", nama: "Graduan Sukar Mendapat Kerja",
    kategori: "pendidikan", ikon: "🎓", jenis: "negatif",
    deskripsi: "Graduan mendapati kelayakan mereka tidak sepadan dengan permintaan majikan.",
    kesanAsas: { pengangguran: 0.2, populariti: -2 },
    pilihan: [
      { teks: "Perluas latihan industri", kesan: { perbelanjaan: 12, pengangguran: -0.2, populariti: 3 }, label: "Populari naik" },
      { teks: "Semak kurikulum bersama majikan", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Fokus akademik sahaja", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV055", nama: "Kos Pengajian Membebankan",
    kategori: "pendidikan", ikon: "💸", jenis: "negatif",
    deskripsi: "Pelajar menghadapi kesukaran menanggung kos pendidikan dan sara hidup.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Bantuan berdasarkan keperluan", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Kerja sambilan dan latihan berbayar", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Pendapatan" },
      { teks: "Kekalkan skim semasa", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV056", nama: "Isu Disiplin dan Buli",
    kategori: "pendidikan", ikon: "😢", jenis: "negatif",
    deskripsi: "Aduan buli dan keselamatan murid mendapat perhatian ibu bapa.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Perkukuh saluran aduan dan kaunseling", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Siasatan dan tindakan mengikut prosedur", kesan: { populariti: 2, kepuasan: 2 }, label: "Akauntabiliti" },
      { teks: "Serahkan kepada sekolah", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV057", nama: "Jurang Digital Pelajar",
    kategori: "pendidikan", ikon: "💻", jenis: "negatif",
    deskripsi: "Pelajar di kawasan tertentu kekurangan peranti dan sambungan internet.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Bantuan peranti bersasar", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Sambungan dan kemudahan komuniti", kesan: { perbelanjaan: 25, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Bahan pembelajaran luar talian", kesan: { perbelanjaan: 5, populariti: -1 }, label: "Terhad" }
    ]
  },
  {
    id: "EV058", nama: "Kemahiran TVET Tidak Mencukupi",
    kategori: "pendidikan", ikon: "🔧", jenis: "negatif",
    deskripsi: "Industri meminta lebih ramai pekerja dengan kemahiran teknikal.",
    kesanAsas: { pertumbuhan: -0.2, populariti: -1 },
    pilihan: [
      { teks: "Latihan bersama industri", kesan: { perbelanjaan: 12, pertumbuhan: 0.3, populariti: 2 }, label: "Padanan" },
      { teks: "Naik taraf peralatan institusi", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan program sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV059", nama: "Pengangguran Belia Bandar",
    kategori: "pendidikan", ikon: "🏙️", jenis: "negatif",
    deskripsi: "Belia bandar menghadapi persaingan tinggi untuk pekerjaan peringkat permulaan.",
    kesanAsas: { pengangguran: 0.3, populariti: -2 },
    pilihan: [
      { teks: "Sokong penempatan kerja dan latihan", kesan: { perbelanjaan: 12, pengangguran: -0.3, populariti: 3 }, label: "Populari naik" },
      { teks: "Bantu perusahaan belia", kesan: { perbelanjaan: 15, populariti: 2 }, label: "Perniagaan" },
      { teks: "Tunggu permintaan pulih", kesan: { populariti: -2, pengangguran: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV060", nama: "Kesihatan Mental Pelajar",
    kategori: "pendidikan", ikon: "🧠", jenis: "negatif",
    deskripsi: "Sekolah dan institusi pendidikan melaporkan peningkatan permintaan sokongan psikososial.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Perluas khidmat kaunseling", kesan: { perbelanjaan: 10, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Latih tenaga pengajar", kesan: { perbelanjaan: 6, populariti: 2 }, label: "Sokongan" },
      { teks: "Kekalkan perkhidmatan sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 7 — KESIHATAN & KEBAJIKAN (EV061–EV070)
  // =====================================================
  {
    id: "EV061", nama: "Kesesakan Hospital",
    kategori: "kesihatan", ikon: "🏥", jenis: "negatif",
    deskripsi: "Hospital menghadapi peningkatan pesakit dan masa menunggu yang panjang.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Susun aliran pesakit dan rujukan", kesan: { populariti: 2, kepuasan: 2 }, label: "Cekap" },
      { teks: "Tambah kapasiti di lokasi kritikal", kesan: { perbelanjaan: 25, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Kekalkan operasi", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV062", nama: "Kekurangan Ubat",
    kategori: "kesihatan", ikon: "💊", jenis: "negatif",
    deskripsi: "Beberapa kemudahan kesihatan melaporkan bekalan ubat tertentu tidak mencukupi.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Selaras pengagihan stok", kesan: { populariti: 2, kepuasan: 2 }, label: "Cekap" },
      { teks: "Percepat perolehan", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Tunggu kitaran biasa", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV063", nama: "Wabak Penyakit Berjangkit",
    kategori: "kesihatan", ikon: "🦠", jenis: "negatif",
    deskripsi: "Kes penyakit berjangkit meningkat di beberapa kawasan.",
    kesanAsas: { populariti: -3, kepuasan: -4, pertumbuhan: -0.4 },
    pilihan: [
      { teks: "Pengukuhan pengesanan dan respons", kesan: { perbelanjaan: 20, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Fokus kawasan terjejas", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Tertumpu" },
      { teks: "Kurangkan tindakan tambahan", kesan: { populariti: -4, kepuasan: -4, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV064", nama: "Kekurangan Petugas Kesihatan",
    kategori: "kesihatan", ikon: "👩‍⚕️", jenis: "negatif",
    deskripsi: "Petugas melaporkan beban kerja yang tinggi dan kekurangan tenaga kerja.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Susun semula jadual dan penempatan", kesan: { populariti: 2 }, label: "Cekap" },
      { teks: "Tambah pengambilan dan latihan", kesan: { perbelanjaan: 20, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Kekalkan tenaga kerja sedia ada", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV065", nama: "Kos Rawatan Membebankan",
    kategori: "kesihatan", ikon: "💉", jenis: "negatif",
    deskripsi: "Pesakit memerlukan bantuan bagi menanggung kos rawatan dan perjalanan.",
    kesanAsas: { populariti: -2, kepuasan: -3 },
    pilihan: [
      { teks: "Perluas bantuan pesakit layak", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Runding pengurangan kos", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Kekalkan skim semasa", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV066", nama: "Pemakanan Kanak-kanak Menjadi Kebimbangan",
    kategori: "kesihatan", ikon: "🍎", jenis: "negatif",
    deskripsi: "Laporan menunjukkan sebahagian kanak-kanak menghadapi masalah pemakanan.",
    kesanAsas: { populariti: -2, kepuasan: -3 },
    pilihan: [
      { teks: "Program pemakanan bersasar", kesan: { perbelanjaan: 12, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Pendidikan pemakanan keluarga", kesan: { perbelanjaan: 6, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Pantau tanpa program baharu", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV067", nama: "Perlindungan Warga Emas",
    kategori: "kesihatan", ikon: "👴", jenis: "neutral",
    deskripsi: "Keluarga dan penyedia penjagaan meminta bantuan lebih baik untuk warga emas.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Perluas sokongan berasaskan keperluan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Latih penjaga dan sokong komuniti", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan skim semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV068", nama: "Kebajikan Orang Kurang Upaya",
    kategori: "kesihatan", ikon: "♿", jenis: "negatif",
    deskripsi: "Aduan timbul tentang akses bangunan, pengangkutan dan perkhidmatan awam.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Audit aksesibiliti dan pelan pembaikan", kesan: { perbelanjaan: 12, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Bantuan mobiliti dan perkhidmatan", kesan: { perbelanjaan: 10, populariti: 3 }, label: "Bantuan segera" },
      { teks: "Tangguhkan pembaikan menyeluruh", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV069", nama: "Kesihatan Awam Terjejas oleh Pencemaran",
    kategori: "kesihatan", ikon: "🌫️", jenis: "negatif",
    deskripsi: "Penduduk melaporkan gangguan kesihatan berhampiran kawasan pencemaran.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Pantau kualiti persekitaran dan kesihatan", kesan: { perbelanjaan: 8, populariti: 2, kepuasan: 2 }, label: "Pemantauan" },
      { teks: "Tindakan pematuhan jika disahkan", kesan: { populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Tunggu bukti tambahan", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV070", nama: "Kemudahan Kesihatan Luar Bandar Terhad",
    kategori: "kesihatan", ikon: "🚑", jenis: "negatif",
    deskripsi: "Penduduk perlu bergerak jauh untuk mendapat perkhidmatan rawatan asas.",
    kesanAsas: { populariti: -2, kepuasan: -3 },
    pilihan: [
      { teks: "Perluas klinik bergerak", kesan: { perbelanjaan: 12, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Naik taraf kemudahan sedia ada", kesan: { perbelanjaan: 20, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Kekalkan rangkaian semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 8 — MAKANAN & PERTANIAN (EV071–EV080)
  // =====================================================
  {
    id: "EV071", nama: "Bekalan Beras Tertekan",
    kategori: "makanan", ikon: "🍚", jenis: "negatif",
    deskripsi: "Bekalan beras menjadi perhatian akibat gangguan pengeluaran atau perdagangan.",
    kesanAsas: { populariti: -3, kepuasan: -3, inflasi: 0.4 },
    pilihan: [
      { teks: "Perkukuh stok dan sumber alternatif", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Sokong pengeluaran tempatan", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Bergantung pada pasaran", kesan: { populariti: -3, inflasi: 0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV072", nama: "Harga Ayam dan Telur Berubah Mendadak",
    kategori: "makanan", ikon: "🐔", jenis: "negatif",
    deskripsi: "Pengguna dan penternak melaporkan ketidakstabilan harga.",
    kesanAsas: { inflasi: 0.3, populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Pantau kos rantaian bekalan", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Pemantauan" },
      { teks: "Bantu pengeluar memenuhi syarat", kesan: { perbelanjaan: 12, populariti: 3, inflasi: -0.2 }, label: "Populari naik" },
      { teks: "Tidak campur tangan", kesan: { populariti: -3, inflasi: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV073", nama: "Penyakit Tanaman Merebak",
    kategori: "makanan", ikon: "🌾", jenis: "negatif",
    deskripsi: "Penyakit tanaman mengancam hasil pertanian di beberapa kawasan.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Bantuan teknikal dan pemantauan", kesan: { perbelanjaan: 10, populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Bantu pemulihan ladang terjejas", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Bantuan" },
      { teks: "Tunggu musim berikutnya", kesan: { populariti: -3, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV074", nama: "Petani Menghadapi Kos Input Tinggi",
    kategori: "makanan", ikon: "🚜", jenis: "negatif",
    deskripsi: "Kos baja, benih dan bahan pertanian meningkat.",
    kesanAsas: { populariti: -2, inflasi: 0.3 },
    pilihan: [
      { teks: "Bantuan bersasar kepada petani layak", kesan: { perbelanjaan: 15, populariti: 3, inflasi: -0.2 }, label: "Populari naik" },
      { teks: "Sokong pembelian bersama", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Cekap" },
      { teks: "Kekalkan bantuan semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV075", nama: "Hasil Tangkapan Nelayan Merosot",
    kategori: "makanan", ikon: "🐟", jenis: "negatif",
    deskripsi: "Nelayan melaporkan hasil tangkapan berkurang dan kos operasi meningkat.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Sokong peralatan cekap dan keselamatan", kesan: { perbelanjaan: 10, populariti: 3 }, label: "Populari naik" },
      { teks: "Perkukuh pengurusan sumber perikanan", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Bantuan tunai sementara", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Bantuan" }
    ]
  },
  {
    id: "EV076", nama: "Banjir Memusnahkan Tanaman",
    kategori: "makanan", ikon: "🌊", jenis: "negatif",
    deskripsi: "Banjir merosakkan tanaman dan menjejaskan pendapatan petani.",
    kesanAsas: { populariti: -3, kepuasan: -3, inflasi: 0.3 },
    pilihan: [
      { teks: "Bantuan pemulihan berasaskan kerosakan", kesan: { perbelanjaan: 20, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Baiki saliran dan perlindungan", kesan: { perbelanjaan: 25, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Biarkan petani pulih sendiri", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV077", nama: "Kebergantungan Makanan Import",
    kategori: "makanan", ikon: "🚢", jenis: "negatif",
    deskripsi: "Gangguan perdagangan mendedahkan pergantungan kepada makanan import tertentu.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Pelbagaikan sumber import", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Kepelbagaian" },
      { teks: "Tingkatkan pengeluaran tempatan", kesan: { perbelanjaan: 20, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Kekalkan strategi semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV078", nama: "Pembaziran Makanan Meningkat",
    kategori: "makanan", ikon: "🍞", jenis: "negatif",
    deskripsi: "Banyak makanan dibuang sepanjang rantaian bekalan dan penggunaan.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Sokong penyimpanan dan pengedaran cekap", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Cekap" },
      { teks: "Kempen pengagihan lebihan", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Kesedaran" },
      { teks: "Kekalkan amalan sedia ada", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV079", nama: "Bekalan Makanan Terganggu Akibat Cuaca",
    kategori: "makanan", ikon: "🌧️", jenis: "negatif",
    deskripsi: "Cuaca ekstrem mengganggu pengeluaran dan penghantaran makanan.",
    kesanAsas: { inflasi: 0.4, populariti: -2 },
    pilihan: [
      { teks: "Pemantauan bekalan dan pelan kontingensi", kesan: { perbelanjaan: 8, populariti: 2, inflasi: -0.2 }, label: "Siap sedia" },
      { teks: "Bantu pengeluar dan pengedar", kesan: { perbelanjaan: 12, populariti: 3 }, label: "Populari naik" },
      { teks: "Tunggu bekalan pulih", kesan: { populariti: -3, inflasi: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV080", nama: "Pertikaian Tanah Pertanian",
    kategori: "makanan", ikon: "🌱", jenis: "neutral",
    deskripsi: "Petani dan pemilik tanah mempertikaikan penggunaan atau pemilikan tanah.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Fasilitasi penyelesaian sah", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Rundingan" },
      { teks: "Semak rekod dan status tanah", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Ketelusan" },
      { teks: "Tangguhkan tindakan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  }
    ,

  // =====================================================
  // KATEGORI 9 — INFRASTRUKTUR & PENGANGKUTAN (EV081–EV090)
  // =====================================================
  {
    id: "EV081", nama: "Jalan Raya Rosak",
    kategori: "infrastruktur", ikon: "🛣️", jenis: "negatif",
    deskripsi: "Aduan mengenai jalan berlubang dan kerosakan meningkat.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Baiki lokasi berisiko tinggi dahulu", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Penyelenggaraan berjadual", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Berperingkat" },
      { teks: "Tangguhkan pembaikan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV082", nama: "Projek Pengangkutan Awam Lewat",
    kategori: "infrastruktur", ikon: "🚆", jenis: "negatif",
    deskripsi: "Projek pengangkutan utama tertangguh akibat masalah teknikal dan kontrak.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Audit jadual dan halangan", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Ketelusan" },
      { teks: "Susun semula pelaksanaan", kesan: { perbelanjaan: 15, populariti: 2 }, label: "Pemulihan" },
      { teks: "Kekalkan jadual tanpa perubahan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV083", nama: "Kesesakan Pelabuhan",
    kategori: "infrastruktur", ikon: "🚢", jenis: "negatif",
    deskripsi: "Barangan tertahan dan perniagaan mengadu kelewatan penghantaran.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Tambah penyelarasan operasi", kesan: { perbelanjaan: 10, populariti: 2, pertumbuhan: 0.2 }, label: "Cekap" },
      { teks: "Naik taraf kapasiti", kesan: { perbelanjaan: 30, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan operasi semasa", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV084", nama: "Gangguan Perkhidmatan Kereta Api",
    kategori: "infrastruktur", ikon: "🚉", jenis: "negatif",
    deskripsi: "Gangguan teknikal menjejaskan penumpang dan perniagaan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Keselamatan dan pemeriksaan teknikal", kesan: { populariti: 2 }, label: "Keselamatan" },
      { teks: "Pengangkutan alternatif", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Pulihkan operasi tanpa semakan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV085", nama: "Lapangan Terbang Sesak",
    kategori: "infrastruktur", ikon: "✈️", jenis: "negatif",
    deskripsi: "Kelewatan dan kesesakan menjejaskan penumpang serta operasi penerbangan.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Baiki aliran penumpang", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Cekap" },
      { teks: "Nilai peluasan kapasiti", kesan: { perbelanjaan: 35, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan susunan semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV086", nama: "Infrastruktur Elektrik Usang",
    kategori: "infrastruktur", ikon: "⚡", jenis: "negatif",
    deskripsi: "Gangguan berulang menimbulkan kebimbangan tentang ketahanan grid.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Utamakan penyelenggaraan aset kritikal", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Percepat naik taraf berfasa", kesan: { perbelanjaan: 30, populariti: 3, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Baiki apabila rosak", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV087", nama: "Liputan Internet Tidak Sekata",
    kategori: "infrastruktur", ikon: "📡", jenis: "negatif",
    deskripsi: "Komuniti tertentu masih menghadapi sambungan internet yang lemah.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Utamakan kawasan kurang liputan", kesan: { perbelanjaan: 20, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Perkongsian infrastruktur", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Cekap" },
      { teks: "Tumpukan kawasan berpermintaan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV088", nama: "Projek Lebuh Raya Ditentang",
    kategori: "infrastruktur", ikon: "🛤️", jenis: "negatif",
    deskripsi: "Penduduk bimbang projek baharu menjejaskan komuniti dan alam sekitar.",
    kesanAsas: { populariti: -3 },
    pilihan: [
      { teks: "Semak alternatif laluan dan impak", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Rundingan" },
      { teks: "Langkah mitigasi sambil teruskan", kesan: { perbelanjaan: 15, populariti: 1 }, label: "Projek terus" },
      { teks: "Hentikan projek", kesan: { populariti: 2, pertumbuhan: -0.3 }, label: "Komuniti gembira" }
    ]
  },
  {
    id: "EV089", nama: "Pengangkutan Awam Kekurangan Penumpang",
    kategori: "infrastruktur", ikon: "🚌", jenis: "negatif",
    deskripsi: "Penggunaan laluan tertentu rendah berbanding kos operasinya.",
    kesanAsas: { populariti: -1, perbelanjaan: 5 },
    pilihan: [
      { teks: "Semak laluan dan jadual", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Kajian" },
      { teks: "Promosi bersasar sementara", kesan: { perbelanjaan: 8, populariti: 1 }, label: "Kempen" },
      { teks: "Kurangkan perkhidmatan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV090", nama: "Kemalangan Infrastruktur Kritikal",
    kategori: "infrastruktur", ikon: "🌉", jenis: "negatif",
    deskripsi: "Kerosakan jambatan atau struktur penting memerlukan tindakan segera.",
    kesanAsas: { populariti: -4, kepuasan: -4, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Tutup dan pemeriksaan", kesan: { populariti: 3, kepuasan: 2 }, label: "Keselamatan" },
      { teks: "Baiki segera dengan pengawasan", kesan: { perbelanjaan: 25, populariti: 4, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Buka semula selepas pemeriksaan minimum", kesan: { populariti: -4, kepuasan: -3 }, label: "Risiko tinggi" }
    ]
  },

  // =====================================================
  // KATEGORI 10 — SABAH, SARAWAK & WILAYAH (EV091–EV100)
  // =====================================================
  {
    id: "EV091", nama: "Aduan Jalan Luar Bandar Sabah",
    kategori: "wilayah", ikon: "🛤️", jenis: "negatif",
    deskripsi: "Penduduk melaporkan akses jalan yang sukar ke sekolah, klinik dan pusat ekonomi.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Utamakan laluan kritikal", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Rancang program berfasa", kesan: { perbelanjaan: 30, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Kekalkan jadual sedia ada", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV092", nama: "Bekalan Air di Komuniti Pedalaman",
    kategori: "wilayah", ikon: "💧", jenis: "negatif",
    deskripsi: "Komuniti pedalaman menghadapi bekalan air yang tidak konsisten.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Sistem sementara dan penyelenggaraan", kesan: { perbelanjaan: 12, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Sistem jangka panjang", kesan: { perbelanjaan: 25, populariti: 3 }, label: "Berkekalan" },
      { teks: "Tangguhkan projek", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV093", nama: "Akses Elektrik di Kawasan Terpencil",
    kategori: "wilayah", ikon: "🔌", jenis: "negatif",
    deskripsi: "Isi rumah terpencil meminta bekalan elektrik yang lebih stabil.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Nilai penyelesaian grid dan luar grid", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Kajian" },
      { teks: "Projek tenaga berfasa", kesan: { perbelanjaan: 25, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Kekalkan sistem sementara", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV094", nama: "Tuntutan Peluang Ekonomi Sabah",
    kategori: "wilayah", ikon: "🏝️", jenis: "negatif",
    deskripsi: "Wakil tempatan meminta lebih banyak peluang pekerjaan dan pembangunan perniagaan.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Sokong latihan dan perusahaan tempatan", kesan: { perbelanjaan: 15, populariti: 4 }, label: "Populari naik" },
      { teks: "Tarik pelaburan dengan sasaran tempatan", kesan: { perbelanjaan: 10, populariti: 3, pertumbuhan: 0.3 }, label: "Pelaburan" },
      { teks: "Kekalkan dasar sedia ada", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV095", nama: "Penyelarasan Pembangunan Sarawak",
    kategori: "wilayah", ikon: "🛠️", jenis: "negatif",
    deskripsi: "Projek negeri-persekutuan menghadapi perbezaan keutamaan.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Mekanisme penyelarasan bersama", kesan: { populariti: 3 }, label: "Rundingan" },
      { teks: "Utamakan projek bersedia", kesan: { perbelanjaan: 15, populariti: 2, pertumbuhan: 0.2 }, label: "Cepat" },
      { teks: "Teruskan setiap pelan berasingan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV096", nama: "Kemudahan Kesihatan Pedalaman",
    kategori: "wilayah", ikon: "🏥", jenis: "negatif",
    deskripsi: "Penduduk sukar mendapatkan rawatan kerana jarak dan pengangkutan.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Klinik bergerak dan rujukan", kesan: { perbelanjaan: 12, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Naik taraf kemudahan terpilih", kesan: { perbelanjaan: 25, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Kekalkan rangkaian semasa", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV097", nama: "Infrastruktur Pelabuhan Wilayah Terhad",
    kategori: "wilayah", ikon: "⚓", jenis: "negatif",
    deskripsi: "Kos logistik meningkat kerana kemudahan pelabuhan dan sambungan pengangkutan.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Baiki proses dan operasi", kesan: { perbelanjaan: 8, populariti: 2, pertumbuhan: 0.2 }, label: "Cekap" },
      { teks: "Nilai pelaburan kapasiti baharu", kesan: { perbelanjaan: 30, populariti: 2, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Tiada perubahan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV098", nama: "Bakat Muda Berhijrah",
    kategori: "wilayah", ikon: "🧳", jenis: "negatif",
    deskripsi: "Tenaga kerja muda meninggalkan wilayah asal untuk mencari peluang di tempat lain.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Sokong perusahaan dan pekerjaan tempatan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Kerjasama latihan dengan industri", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Terima mobiliti tanpa program", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV099", nama: "Pertikaian Keutamaan Peruntukan Wilayah",
    kategori: "wilayah", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Beberapa wilayah mendakwa pengagihan pembangunan tidak seimbang.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Terbitkan kriteria pengagihan", kesan: { populariti: 3 }, label: "Ketelusan" },
      { teks: "Runding keutamaan dengan wakil", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Kekalkan pengagihan lama", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV100", nama: "Projek Wilayah Tertangguh",
    kategori: "wilayah", ikon: "🏗️", jenis: "negatif",
    deskripsi: "Projek pembangunan wilayah tidak bergerak mengikut jadual.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Audit punca kelewatan", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Ketelusan" },
      { teks: "Susun semula kontrak dan pelaksanaan", kesan: { perbelanjaan: 15, pertumbuhan: 0.2 }, label: "Pemulihan" },
      { teks: "Kekalkan pelaksanaan semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 11 — PERPADUAN & MASYARAKAT (EV101–EV110)
  // =====================================================
  {
    id: "EV101", nama: "Ketegangan Antara Komuniti",
    kategori: "perpaduan", ikon: "🤝", jenis: "negatif",
    deskripsi: "Insiden setempat mencetuskan salah faham antara kumpulan masyarakat.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Dialog dengan wakil komuniti", kesan: { populariti: 3, kepuasan: 3, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Penguatkuasaan terhadap kesalahan terbukti", kesan: { populariti: 2, kepuasan: 2 }, label: "Akauntabiliti" },
      { teks: "Kurangkan penglibatan kerajaan", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV102", nama: "Kenyataan Awam Mencetuskan Kontroversi",
    kategori: "perpaduan", ikon: "🗣️", jenis: "negatif",
    deskripsi: "Kenyataan seorang tokoh menimbulkan kemarahan sebahagian masyarakat.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Seru penjelasan dan dialog", kesan: { populariti: 2, kepuasan: 2 }, label: "Rundingan" },
      { teks: "Tegaskan prinsip undang-undang", kesan: { populariti: 1 }, label: "Tegas" },
      { teks: "Abaikan isu", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV103", nama: "Bantahan Terhadap Dasar Pendidikan",
    kategori: "perpaduan", ikon: "📚", jenis: "negatif",
    deskripsi: "Ibu bapa dan kumpulan masyarakat tidak bersetuju dengan perubahan dasar sekolah.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Konsultasi dan terbitkan rasional", kesan: { populariti: 3, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Laksanakan perubahan berfasa", kesan: { populariti: 2 }, label: "Berperingkat" },
      { teks: "Teruskan tanpa konsultasi", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV104", nama: "Kemudahan Komuniti Tidak Seimbang",
    kategori: "perpaduan", ikon: "🏟️", jenis: "negatif",
    deskripsi: "Penduduk membandingkan akses kemudahan sukan, perpustakaan dan pusat komuniti.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Agih dana berdasarkan kekurangan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Gunakan kemudahan sedia ada bersama", kesan: { perbelanjaan: 5, populariti: 1 }, label: "Cekap" },
      { teks: "Kekalkan pengagihan semasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV105", nama: "Konflik Penggunaan Ruang Awam",
    kategori: "perpaduan", ikon: "🌳", jenis: "negatif",
    deskripsi: "Kumpulan berbeza bertelagah tentang penggunaan taman atau kawasan komuniti.",
    kesanAsas: { populariti: -1, kepuasan: -2 },
    pilihan: [
      { teks: "Jadual dan peraturan adil", kesan: { populariti: 2, kepuasan: 2 }, label: "Rundingan" },
      { teks: "Kompromi dengan pihak terlibat", kesan: { populariti: 2 }, label: "Kompromi" },
      { teks: "Hadkan penggunaan sementara", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV106", nama: "Sukarelawan Meminta Sokongan",
    kategori: "perpaduan", ikon: "🙋", jenis: "neutral",
    deskripsi: "Organisasi sukarelawan memohon bantuan untuk menjalankan program komuniti.",
    kesanAsas: {},
    pilihan: [
      { teks: "Geran bersyarat dan audit", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Sokongan" },
      { teks: "Latihan dan kemudahan", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Kapasiti" },
      { teks: "Tolak bantuan kewangan", kesan: { populariti: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV107", nama: "Aduan Diskriminasi Perkhidmatan",
    kategori: "perpaduan", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Rakyat mendakwa layanan berbeza diberikan ketika mendapatkan perkhidmatan awam.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Siasat aduan melalui proses adil", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Latih petugas dan semak prosedur", kesan: { perbelanjaan: 8, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Tolak aduan tanpa semakan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV108", nama: "Isu Bahasa dan Komunikasi Awam",
    kategori: "perpaduan", ikon: "💬", jenis: "neutral",
    deskripsi: "Orang ramai meminta maklumat kerajaan lebih mudah difahami oleh pelbagai kumpulan.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Bahan dalam format dan bahasa sesuai", kesan: { perbelanjaan: 5, populariti: 2, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Bahasa mudah dalam dokumen utama", kesan: { perbelanjaan: 3, populariti: 2 }, label: "Cekap" },
      { teks: "Kekalkan format sedia ada", kesan: { populariti: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV109", nama: "Pertikaian Acara Masyarakat",
    kategori: "perpaduan", ikon: "🎉", jenis: "neutral",
    deskripsi: "Acara awam menimbulkan pertikaian tentang permit, keselamatan atau penggunaan ruang.",
    kesanAsas: {},
    pilihan: [
      { teks: "Semak syarat secara konsisten", kesan: { populariti: 2 }, label: "Konsisten" },
      { teks: "Runding syarat keselamatan", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Batalkan acara jika risiko tinggi", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV110", nama: "Kempen Perpaduan Nasional",
    kategori: "perpaduan", ikon: "🇲🇾", jenis: "positif",
    deskripsi: "Kementerian mencadangkan kempen untuk meningkatkan kerjasama antara komuniti.",
    kesanAsas: {},
    pilihan: [
      { teks: "Biayai program bersama dengan petunjuk hasil", kesan: { perbelanjaan: 10, populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Sokong inisiatif akar umbi", kesan: { perbelanjaan: 5, populariti: 2, kepuasan: 2 }, label: "Akar umbi" },
      { teks: "Tangguhkan kempen", kesan: { populariti: -1 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 12 — PARLIMEN, UNDIAN & DASAR (EV111–EV120)
  // =====================================================
  {
    id: "EV111", nama: "Usul Kerajaan Mendapat Sokongan Tipis",
    kategori: "parlimen", ikon: "🏛️", jenis: "negatif",
    deskripsi: "Usul penting dijangka lulus dengan majoriti yang kecil.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Runding pindaan", kesan: { populariti: 2, sokonganParlimen: 3 }, label: "Kompromi" },
      { teks: "Teruskan undian", kesan: { sokonganParlimen: -2 }, label: "Risiko" },
      { teks: "Tangguhkan undian", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV112", nama: "Ahli Parlimen Mengkritik Dasar",
    kategori: "parlimen", ikon: "🗣️", jenis: "negatif",
    deskripsi: "Ahli Parlimen kerajaan mempertikaikan kesan dasar terhadap kawasan mereka.",
    kesanAsas: { sokonganParlimen: -2, populariti: -1 },
    pilihan: [
      { teks: "Sesi taklimat dan rundingan", kesan: { sokonganParlimen: 3, populariti: 1 }, label: "Rundingan" },
      { teks: "Ubah pelaksanaan tanpa ubah matlamat", kesan: { populariti: 2, sokonganParlimen: 2 }, label: "Fleksibel" },
      { teks: "Tolak semua kritikan", kesan: { sokonganParlimen: -3, populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV113", nama: "Rang Undang-Undang Ditolak",
    kategori: "parlimen", ikon: "📜", jenis: "negatif",
    deskripsi: "Rang undang-undang kerajaan gagal mendapat sokongan yang mencukupi.",
    kesanAsas: { populariti: -3, sokonganParlimen: -2 },
    pilihan: [
      { teks: "Semak dan kemukakan versi baharu", kesan: { populariti: 2, sokonganParlimen: 3 }, label: "Pemulihan" },
      { teks: "Runding dengan pihak yang menolak", kesan: { populariti: 2, sokonganParlimen: 4 }, label: "Populari naik" },
      { teks: "Gugurkan rang undang-undang", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV114", nama: "Parti Gabungan Mengancam Tarik Sokongan",
    kategori: "parlimen", ikon: "🤝", jenis: "negatif",
    deskripsi: "Parti gabungan tidak berpuas hati dengan dasar dan pembahagian portfolio.",
    kesanAsas: { sokonganParlimen: -3, populariti: -2 },
    pilihan: [
      { teks: "Runding secara rasmi", kesan: { sokonganParlimen: 4, populariti: 1 }, label: "Populari naik" },
      { teks: "Tawarkan semakan dasar atau portfolio", kesan: { sokonganParlimen: 5, populariti: 2 }, label: "Sokongan pulih" },
      { teks: "Tolak tuntutan", kesan: { sokonganParlimen: -5, populariti: -3 }, label: "Risiko krisis" }
    ]
  },
  {
    id: "EV115", nama: "Ahli Parlimen Berkecuali dalam Undian",
    kategori: "parlimen", ikon: "❓", jenis: "neutral",
    deskripsi: "Beberapa Ahli Parlimen belum memutuskan pendirian terhadap usul.",
    kesanAsas: {},
    pilihan: [
      { teks: "Taklimat fakta dan kesan dasar", kesan: { sokonganParlimen: 3 }, label: "Sokongan naik" },
      { teks: "Pinda usul untuk tangani kebimbangan", kesan: { sokonganParlimen: 4, populariti: 1 }, label: "Kompromi" },
      { teks: "Teruskan undian", kesan: { sokonganParlimen: -1 }, label: "Risiko" }
    ]
  },
  {
    id: "EV116", nama: "Desakan Pilihan Raya Awal",
    kategori: "parlimen", ikon: "🗳️", jenis: "negatif",
    deskripsi: "Pembangkang mendesak pilihan raya lebih awal.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Jelaskan kedudukan kerajaan", kesan: { populariti: 2 }, label: "Ketelusan" },
      { teks: "Kukuhkan sokongan melalui rundingan dasar", kesan: { populariti: 3, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Abaikan desakan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV117", nama: "Usul Tidak Percaya",
    kategori: "parlimen", ikon: "⚠️", jenis: "negatif",
    deskripsi: "Usul tidak percaya mengancam kedudukan Perdana Menteri.",
    kesanAsas: { populariti: -4, sokonganParlimen: -5 },
    pilihan: [
      { teks: "Buktikan sokongan melalui proses sah", kesan: { populariti: 2, sokonganParlimen: 3 }, label: "Legitimasi" },
      { teks: "Runding pembentukan sokongan", kesan: { sokonganParlimen: 5, populariti: 2 }, label: "Populari naik" },
      { teks: "Elakkan proses tanpa penyelesaian", kesan: { populariti: -5, sokonganParlimen: -3 }, label: "Krisis" }
    ]
  },
  {
    id: "EV118", nama: "Konflik Dasar Antara Parti Gabungan",
    kategori: "parlimen", ikon: "⚔️", jenis: "negatif",
    deskripsi: "Parti gabungan berbeza pendapat mengenai satu dasar utama.",
    kesanAsas: { sokonganParlimen: -2, populariti: -1 },
    pilihan: [
      { teks: "Kompromi bertulis", kesan: { sokonganParlimen: 3, populariti: 1 }, label: "Stabil" },
      { teks: "Benarkan undian bebas", kesan: { populariti: 1, sokonganParlimen: -1 }, label: "Fleksibel" },
      { teks: "Paksa pendirian tunggal", kesan: { sokonganParlimen: -4, populariti: -2 }, label: "Risiko" }
    ]
  },
  {
    id: "EV119", nama: "Jawatankuasa Parlimen Meminta Penjelasan",
    kategori: "parlimen", ikon: "📋", jenis: "neutral",
    deskripsi: "Jawatankuasa meminta dokumen dan penjelasan tentang program kerajaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Sediakan maklumat sah untuk didedahkan", kesan: { populariti: 3, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Minta masa tambahan", kesan: { populariti: -1 }, label: "Neutral" },
      { teks: "Hadkan maklumat", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV120", nama: "Kehadiran Ahli Parlimen Rendah",
    kategori: "parlimen", ikon: "🪑", jenis: "negatif",
    deskripsi: "Kehadiran rendah menjejaskan urusan dan undian Dewan.",
    kesanAsas: { sokonganParlimen: -1, populariti: -1 },
    pilihan: [
      { teks: "Runding jadual dan tanggungjawab", kesan: { sokonganParlimen: 3 }, label: "Rundingan" },
      { teks: "Perkukuh ketelusan rekod kehadiran", kesan: { populariti: 2, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Teruskan urusan mengikut kehadiran", kesan: { sokonganParlimen: -2 }, label: "Kritikan" }
    ]
  }
    ,

  // =====================================================
  // KATEGORI 13 — KABINET & KEPIMPINAN (EV121–EV130)
  // =====================================================
  {
    id: "EV121", nama: "Menteri Gagal Mencapai Sasaran",
    kategori: "kabinet", ikon: "📉", jenis: "negatif",
    deskripsi: "Kementerian tidak memenuhi petunjuk prestasi yang dipersetujui.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -3 },
    pilihan: [
      { teks: "Pelan pemulihan dan tarikh semakan", kesan: { populariti: 2, prestasiKerajaan: 3 }, label: "Pemulihan" },
      { teks: "Pasukan pelaksana khas", kesan: { perbelanjaan: 8, prestasiKerajaan: 2, populariti: 1 }, label: "Sokongan" },
      { teks: "Pecat atau rombak portfolio", kesan: { populariti: 3, prestasiKerajaan: -2, sokonganParlimen: -2 }, label: "Akauntabiliti" }
    ]
  },
  {
    id: "EV122", nama: "Konflik Antara Menteri",
    kategori: "kabinet", ikon: "⚔️", jenis: "negatif",
    deskripsi: "Dua menteri saling menyalahkan tentang kegagalan projek bersama.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Tetapkan kementerian peneraju", kesan: { populariti: 2, prestasiKerajaan: 3 }, label: "Jelas" },
      { teks: "Pengerusikan rundingan bersama", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Rundingan" },
      { teks: "Biarkan mereka selesaikan sendiri", kesan: { populariti: -2, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV123", nama: "Menteri Meminta Portfolio Tambahan",
    kategori: "kabinet", ikon: "📋", jenis: "neutral",
    deskripsi: "Seorang menteri meminta kuasa lebih besar dan tanggungjawab baharu.",
    kesanAsas: {},
    pilihan: [
      { teks: "Nilai beban kerja dan keupayaan", kesan: { populariti: 1, prestasiKerajaan: 1 }, label: "Berhati-hati" },
      { teks: "Beri portfolio tambahan terhad", kesan: { populariti: 1, prestasiKerajaan: 2, sokonganParlimen: 1 }, label: "Rundingan" },
      { teks: "Tolak permintaan", kesan: { populariti: -1, sokonganParlimen: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV124", nama: "Rombakan Kabinet Dituntut",
    kategori: "kabinet", ikon: "🔄", jenis: "negatif",
    deskripsi: "Prestasi kabinet dipersoalkan oleh rakyat dan Ahli Parlimen.",
    kesanAsas: { populariti: -3, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Nilai semua menteri menggunakan kriteria seragam", kesan: { populariti: 3, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Rombak portfolio terpilih", kesan: { populariti: 4, prestasiKerajaan: 3, sokonganParlimen: -2 }, label: "Rombakan" },
      { teks: "Kekalkan kabinet", kesan: { populariti: -4, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV125", nama: "Timbalan Perdana Menteri Berbeza Pendapat",
    kategori: "kabinet", ikon: "🤝", jenis: "negatif",
    deskripsi: "Timbalan Perdana Menteri menolak pendekatan yang dicadangkan oleh Perdana Menteri.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Runding pendirian bersama secara tertutup", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Bahagikan tanggungjawab pelaksanaan", kesan: { populariti: 2, prestasiKerajaan: 1 }, label: "Jelas" },
      { teks: "Kekalkan keputusan PM", kesan: { populariti: -2, prestasiKerajaan: -1 }, label: "Risiko" }
    ]
  },
  {
    id: "EV126", nama: "Menteri Menghadapi Dakwaan Salah Laku",
    kategori: "kabinet", ikon: "⚠️", jenis: "negatif",
    deskripsi: "Dakwaan salah laku terhadap seorang menteri mendapat perhatian umum.",
    kesanAsas: { populariti: -3, prestasiKerajaan: -3 },
    pilihan: [
      { teks: "Rujuk kepada siasatan bebas", kesan: { populariti: 3, prestasiKerajaan: 1 }, label: "Akauntabiliti" },
      { teks: "Minta penjelasan tanpa halang siasatan", kesan: { populariti: 1 }, label: "Berhati-hati" },
      { teks: "Pertahankan menteri", kesan: { populariti: -4, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV127", nama: "Kementerian Bertindih Fungsi",
    kategori: "kabinet", ikon: "🔀", jenis: "negatif",
    deskripsi: "Dua kementerian menjalankan program yang hampir sama.",
    kesanAsas: { populariti: -1, perbelanjaan: 5 },
    pilihan: [
      { teks: "Audit fungsi dan satukan program", kesan: { populariti: 2, perbelanjaan: -8, prestasiKerajaan: 2 }, label: "Cekap" },
      { teks: "Tetapkan pembahagian penerima", kesan: { populariti: 2, prestasiKerajaan: 1 }, label: "Jelas" },
      { teks: "Kekalkan kedua-dua program", kesan: { populariti: -2, perbelanjaan: 8 }, label: "Pembaziran" }
    ]
  },
  {
    id: "EV128", nama: "Pegawai Kanan Menentang Pembaharuan",
    kategori: "kabinet", ikon: "🛑", jenis: "negatif",
    deskripsi: "Perubahan pentadbiran menghadapi tentangan daripada sebahagian pegawai.",
    kesanAsas: { populariti: -1, prestasiKerajaan: -1 },
    pilihan: [
      { teks: "Libatkan pegawai dalam reka bentuk", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Laksanakan berfasa dengan latihan", kesan: { perbelanjaan: 8, prestasiKerajaan: 2 }, label: "Berperingkat" },
      { teks: "Batalkan pembaharuan", kesan: { populariti: -2, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV129", nama: "Kabinet Tidak Sepakat tentang Keutamaan",
    kategori: "kabinet", ikon: "🗂️", jenis: "negatif",
    deskripsi: "Menteri berbeza pandangan tentang pembahagian bajet.",
    kesanAsas: { populariti: -1, prestasiKerajaan: -1 },
    pilihan: [
      { teks: "Tetapkan kriteria nasional", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Ketelusan" },
      { teks: "Runding pakej kompromi", kesan: { populariti: 2, prestasiKerajaan: 1 }, label: "Rundingan" },
      { teks: "Tentukan keutamaan unilateral", kesan: { populariti: -2, sokonganParlimen: -2 }, label: "Risiko" }
    ]
  },
  {
    id: "EV130", nama: "Kekosongan Portfolio Menteri",
    kategori: "kabinet", ikon: "🪑", jenis: "negatif",
    deskripsi: "Portfolio kosong dan beberapa projek kementerian memerlukan keputusan.",
    kesanAsas: { populariti: -1, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Lantik pengganti sesuai", kesan: { populariti: 2, prestasiKerajaan: 3, sokonganParlimen: 1 }, label: "Pulih" },
      { teks: "Lantik pemangku sementara", kesan: { populariti: 1, prestasiKerajaan: 1 }, label: "Sementara" },
      { teks: "Tangguhkan pelantikan", kesan: { populariti: -2, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 14 — INTEGRITI & ANTIRASUAH (EV131–EV140)
  // =====================================================
  {
    id: "EV131", nama: "Dakwaan Rasuah terhadap Pegawai",
    kategori: "integriti", ikon: "💼", jenis: "negatif",
    deskripsi: "Laporan mendakwa seorang pegawai menerima bayaran tidak wajar.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Serah kepada penyiasat berbidang kuasa", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Semakan pentadbiran yang sah", kesan: { populariti: 1 }, label: "Berhati-hati" },
      { teks: "Abaikan laporan", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV132", nama: "Pemberi Maklumat Menyerahkan Bukti",
    kategori: "integriti", ikon: "📄", jenis: "neutral",
    deskripsi: "Dokumen yang didakwa menunjukkan salah guna kuasa diserahkan kepada kerajaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Lindungi maklumat dan salurkan melalui proses sah", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Sahkan kesahihan dokumen", kesan: { populariti: 2 }, label: "Teliti" },
      { teks: "Dedahkan tanpa semakan", kesan: { populariti: 1, kepuasan: -1 }, label: "Risiko" }
    ]
  },
  {
    id: "EV133", nama: "Kontrak Kerajaan Dipertikaikan",
    kategori: "integriti", ikon: "📝", jenis: "negatif",
    deskripsi: "Dakwaan konflik kepentingan timbul dalam proses tender.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Audit proses perolehan", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Semak kontrak dan bukti", kesan: { populariti: 2 }, label: "Berhati-hati" },
      { teks: "Pertahankan kontrak", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV134", nama: "Konflik Kepentingan Menteri",
    kategori: "integriti", ikon: "⚠️", jenis: "negatif",
    deskripsi: "Kepentingan peribadi menteri didakwa berkait dengan keputusan rasmi.",
    kesanAsas: { populariti: -3, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Pengisytiharan kepentingan dan semakan bebas", kesan: { populariti: 3, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Hadkan penglibatan dalam keputusan", kesan: { populariti: 2 }, label: "Berhati-hati" },
      { teks: "Tiada tindakan", kesan: { populariti: -4, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV135", nama: "Reformasi Tender Kerajaan",
    kategori: "integriti", ikon: "🏗️", jenis: "positif",
    deskripsi: "Perniagaan meminta proses tender lebih terbuka.",
    kesanAsas: {},
    pilihan: [
      { teks: "Terbitkan maklumat tender", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Perluas audit berasaskan risiko", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Pengawasan" },
      { teks: "Kekalkan proses lama", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV136", nama: "Perolehan Kecemasan Dipersoalkan",
    kategori: "integriti", ikon: "🆘", jenis: "negatif",
    deskripsi: "Pembelian segera ketika krisis didakwa kurang telus.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Audit selepas tindakan kecemasan", kesan: { populariti: 3, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Terbitkan asas keputusan", kesan: { populariti: 2 }, label: "Ketelusan" },
      { teks: "Tolak permintaan penjelasan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV137", nama: "Aduan Bayaran Tidak Rasmi",
    kategori: "integriti", ikon: "💵", jenis: "negatif",
    deskripsi: "Rakyat mendakwa diminta membayar wang tambahan untuk perkhidmatan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Saluran aduan selamat dan siasatan", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Audit proses perkhidmatan berisiko", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Sistemik" },
      { teks: "Anggap kes terpencil", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV138", nama: "Audit Menemui Ketirisan",
    kategori: "integriti", ikon: "🔍", jenis: "negatif",
    deskripsi: "Audit mengenal pasti kelemahan kawalan dalam program kerajaan.",
    kesanAsas: { populariti: -2, perbelanjaan: 5 },
    pilihan: [
      { teks: "Betulkan kawalan dan pulihkan dana", kesan: { populariti: 3, perbelanjaan: -5 }, label: "Populari naik" },
      { teks: "Rujuk kes serius kepada pihak berkuasa", kesan: { populariti: 3, kepuasan: 2 }, label: "Akauntabiliti" },
      { teks: "Simpan laporan tanpa tindakan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV139", nama: "Pelantikan Awam Dipertikaikan",
    kategori: "integriti", ikon: "👔", jenis: "negatif",
    deskripsi: "Pelantikan ke jawatan awam dikritik kerana didakwa tidak berasaskan merit.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Terbitkan kriteria dan proses pemilihan", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Semak kelayakan dan konflik kepentingan", kesan: { populariti: 2 }, label: "Berhati-hati" },
      { teks: "Kekalkan pelantikan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV140", nama: "Pelan Integriti Nasional Baharu",
    kategori: "integriti", ikon: "🛡️", jenis: "positif",
    deskripsi: "Kerajaan mahu memperkukuh integriti dalam perolehan dan pentadbiran.",
    kesanAsas: {},
    pilihan: [
      { teks: "Sasaran, audit dan pelaporan berkala", kesan: { populariti: 4, kepuasan: 3, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Projek rintis", kesan: { populariti: 2, perbelanjaan: 3 }, label: "Rintis" },
      { teks: "Kempen umum sahaja", kesan: { populariti: 1 }, label: "Sederhana" }
    ]
  },

  // =====================================================
  // KATEGORI 15 — MEDIA & PANDANGAN RAKYAT (EV141–EV150)
  // =====================================================
  {
    id: "EV141", nama: "Laporan Media Mengkritik Kerajaan",
    kategori: "media", ikon: "📰", jenis: "negatif",
    deskripsi: "Media mempersoalkan keberkesanan dasar utama kerajaan.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Jawab dengan fakta yang boleh disahkan", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Sidang media bersama kementerian", kesan: { populariti: 2 }, label: "Koordinasi" },
      { teks: "Tidak memberi respons segera", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV142", nama: "Video Tular tentang Layanan Tidak Adil",
    kategori: "media", ikon: "📱", jenis: "negatif",
    deskripsi: "Video yang tular mendakwa pegawai kerajaan melayan rakyat dengan buruk.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Semak kejadian dan umumkan tindakan", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Salurkan aduan melalui proses rasmi", kesan: { populariti: 1 }, label: "Prosedur" },
      { teks: "Serang pengkritik", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV143", nama: "Keyakinan Rakyat Merosot",
    kategori: "media", ikon: "📊", jenis: "negatif",
    deskripsi: "Tinjauan menunjukkan penurunan keyakinan terhadap kerajaan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Pelan tindakan bersasaran", kesan: { populariti: 3, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Dialog awam", kesan: { populariti: 2, kepuasan: 2 }, label: "Rundingan" },
      { teks: "Abaikan tinjauan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV144", nama: "Maklumat Palsu tentang Dasar",
    kategori: "media", ikon: "❌", jenis: "negatif",
    deskripsi: "Maklumat tidak tepat tersebar dan menimbulkan kekeliruan.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Penjelasan berserta dokumen", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Kerjasama dengan media", kesan: { populariti: 2 }, label: "Jangkauan" },
      { teks: "Tidak membuat penjelasan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV145", nama: "Sidang Media Perdana Menteri",
    kategori: "media", ikon: "🎤", jenis: "neutral",
    deskripsi: "Wartawan menuntut jawapan mengenai keputusan kerajaan yang dipertikaikan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Jawab terbuka dan akui perkara belum selesai", kesan: { populariti: 4, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Fokus pada pencapaian dan langkah seterusnya", kesan: { populariti: 2 }, label: "Tersusun" },
      { teks: "Tangguhkan dengan alasan jelas", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV146", nama: "Hashtag Kritikan Tular",
    kategori: "media", ikon: "#️⃣", jenis: "negatif",
    deskripsi: "Kempen media sosial mengkritik keputusan kerajaan.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Semak aduan substantif dan jawab", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Terangkan proses keputusan", kesan: { populariti: 1 }, label: "Ketelusan" },
      { teks: "Abaikan kritikan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV147", nama: "Kebocoran Dokumen Dalaman",
    kategori: "media", ikon: "📄", jenis: "negatif",
    deskripsi: "Dokumen kerajaan tersebar dan menimbulkan persoalan tentang dasar.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Sahkan ketulenan dan semak keselamatan", kesan: { populariti: 2 }, label: "Siasatan" },
      { teks: "Terangkan kandungan yang boleh didedahkan", kesan: { populariti: 3, kepuasan: 1 }, label: "Populari naik" },
      { teks: "Nafikan tanpa pengesahan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV148", nama: "Kritikan terhadap Komunikasi Kerajaan",
    kategori: "media", ikon: "📢", jenis: "negatif",
    deskripsi: "Rakyat menerima maklumat bercanggah daripada kementerian berbeza.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Selaraskan fakta dan jurucakap", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Protokol komunikasi krisis", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Sistematik" },
      { teks: "Biarkan kementerian menjawab sendiri", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV149", nama: "Wartawan Meminta Akses Maklumat",
    kategori: "media", ikon: "🔓", jenis: "neutral",
    deskripsi: "Media meminta data berkaitan prestasi projek dan perbelanjaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Dedahkan data yang sesuai", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Sediakan ringkasan rasmi", kesan: { populariti: 1 }, label: "Sederhana" },
      { teks: "Tolak permintaan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV150", nama: "Kempen Komunikasi 100 Hari",
    kategori: "media", ikon: "📅", jenis: "positif",
    deskripsi: "Kerajaan mahu melaporkan kemajuan manifesto kepada rakyat.",
    kesanAsas: {},
    pilihan: [
      { teks: "Terbitkan kemajuan, kos dan kelemahan", kesan: { populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Fokus pada pencapaian utama", kesan: { populariti: 2, kepuasan: 1 }, label: "Sederhana" },
      { teks: "Tangguhkan laporan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 16 — BENCANA & KECEMASAN (EV151–EV160)
  // =====================================================
  {
    id: "EV151", nama: "Banjir Besar",
    kategori: "bencana", ikon: "🌊", jenis: "negatif",
    deskripsi: "Banjir memaksa penduduk berpindah dan merosakkan kemudahan asas.",
    kesanAsas: { populariti: -4, kepuasan: -4, pertumbuhan: -0.4 },
    pilihan: [
      { teks: "Pusat pemindahan dan bantuan kecemasan", kesan: { perbelanjaan: 30, populariti: 5, kepuasan: 4 }, label: "Populari naik" },
      { teks: "Utamakan pemulihan infrastruktur", kesan: { perbelanjaan: 40, populariti: 4, pertumbuhan: 0.2 }, label: "Pemulihan" },
      { teks: "Tunggu penilaian lengkap", kesan: { populariti: -4, kepuasan: -4 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV152", nama: "Tanah Runtuh",
    kategori: "bencana", ikon: "⛰️", jenis: "negatif",
    deskripsi: "Tanah runtuh mengancam penempatan dan laluan pengangkutan.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Kosongkan kawasan berisiko", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Baiki laluan selepas pemeriksaan", kesan: { perbelanjaan: 25, populariti: 3 }, label: "Pemulihan" },
      { teks: "Buka laluan dengan pemeriksaan minimum", kesan: { populariti: -4, kepuasan: -3 }, label: "Risiko" }
    ]
  },
  {
    id: "EV153", nama: "Kemarau Berpanjangan",
    kategori: "bencana", ikon: "☀️", jenis: "negatif",
    deskripsi: "Bekalan air dan hasil pertanian terjejas akibat kekurangan hujan.",
    kesanAsas: { populariti: -3, kepuasan: -3, inflasi: 0.3 },
    pilihan: [
      { teks: "Pelan catuan dan bantuan bersasar", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Bekalan sementara ke kawasan kritikal", kesan: { perbelanjaan: 25, populariti: 3, kepuasan: 2 }, label: "Bantuan" },
      { teks: "Tunggu hujan kembali", kesan: { populariti: -4, kepuasan: -3, inflasi: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV154", nama: "Kebakaran Hutan",
    kategori: "bencana", ikon: "🔥", jenis: "negatif",
    deskripsi: "Kebakaran menjejaskan alam sekitar, kesihatan dan penempatan berdekatan.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Tindak balas kecemasan", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Pencegahan dan pemantauan kawasan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Tumpukan bantuan selepas kebakaran", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV155", nama: "Ribut Merosakkan Infrastruktur",
    kategori: "bencana", ikon: "🌪️", jenis: "negatif",
    deskripsi: "Ribut merosakkan bekalan elektrik, jalan dan rumah.",
    kesanAsas: { populariti: -3, kepuasan: -3, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Pulihkan utiliti dan akses kritikal", kesan: { perbelanjaan: 25, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Bantuan pembaikan rumah", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Bantuan" },
      { teks: "Tunggu laporan penuh", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV156", nama: "Tanah Runtuh di Kawasan Perumahan",
    kategori: "bencana", ikon: "🏘️", jenis: "negatif",
    deskripsi: "Struktur tanah tidak stabil menimbulkan risiko kepada penduduk.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Pindahkan penduduk dari zon bahaya", kesan: { perbelanjaan: 25, populariti: 5, kepuasan: 4 }, label: "Populari naik" },
      { teks: "Kerja pengukuhan selepas penilaian", kesan: { perbelanjaan: 30, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Kekalkan penduduk dengan pemantauan", kesan: { populariti: -4, kepuasan: -3 }, label: "Risiko" }
    ]
  },
  {
    id: "EV157", nama: "Gangguan Bekalan Air Kecemasan",
    kategori: "bencana", ikon: "🚰", jenis: "negatif",
    deskripsi: "Loji atau saluran utama gagal membekalkan air.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Edarkan air sementara dan baiki sistem", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Hubungkan bekalan alternatif", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 2 }, label: "Alternatif" },
      { teks: "Hadkan bantuan kepada kawasan tertentu", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV158", nama: "Kemalangan Bahan Berbahaya",
    kategori: "bencana", ikon: "☢️", jenis: "negatif",
    deskripsi: "Insiden industri menimbulkan risiko pencemaran dan keselamatan awam.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Asingkan kawasan dan aktifkan pakar", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Pantau sambil menunggu penilaian", kesan: { perbelanjaan: 8, populariti: 1 }, label: "Berhati-hati" },
      { teks: "Teruskan operasi sekitar", kesan: { populariti: -4, kepuasan: -3 }, label: "Risiko" }
    ]
  },
  {
    id: "EV159", nama: "Gangguan Bekalan Makanan Akibat Bencana",
    kategori: "bencana", ikon: "🍞", jenis: "negatif",
    deskripsi: "Bencana memutuskan laluan penghantaran makanan ke beberapa kawasan.",
    kesanAsas: { populariti: -3, kepuasan: -3, inflasi: 0.3 },
    pilihan: [
      { teks: "Pengagihan bekalan kecemasan", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3, inflasi: -0.2 }, label: "Populari naik" },
      { teks: "Buka laluan alternatif", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Logistik" },
      { teks: "Tunggu laluan utama dibuka", kesan: { populariti: -3, kepuasan: -3, inflasi: 0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV160", nama: "Dana Pemulihan Bencana Dipertikaikan",
    kategori: "bencana", ikon: "💸", jenis: "negatif",
    deskripsi: "Rakyat mempersoalkan cara dana pemulihan diagihkan.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Terbitkan kriteria, penerima dan audit", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Semak aduan dan baiki pengagihan", kesan: { populariti: 2, kepuasan: 2 }, label: "Pemulihan" },
      { teks: "Teruskan pengagihan tanpa semakan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  }
    ,

  // =====================================================
  // KATEGORI 17 — ALAM SEKITAR & TENAGA (EV161–EV170)
  // =====================================================
  {
    id: "EV161", nama: "Jerebu Menjejaskan Kesihatan",
    kategori: "alam", ikon: "🌫️", jenis: "negatif",
    deskripsi: "Kualiti udara merosot dan aktiviti luar terjejas.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Perkukuh pemantauan dan nasihat kesihatan", kesan: { perbelanjaan: 10, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Selaras tindakan terhadap punca", kesan: { populariti: 2 }, label: "Kerjasama" },
      { teks: "Kenyataan umum sahaja", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV162", nama: "Gangguan Bekalan Elektrik",
    kategori: "alam", ikon: "⚡", jenis: "negatif",
    deskripsi: "Gangguan bekalan menjejaskan isi rumah dan perniagaan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Selaras pemulihan dengan penyedia", kesan: { perbelanjaan: 8, populariti: 3 }, label: "Populari naik" },
      { teks: "Percepat pelaburan ketahanan sistem", kesan: { perbelanjaan: 25, populariti: 3, pertumbuhan: 0.2 }, label: "Jangka panjang" },
      { teks: "Tunggu laporan teknikal", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV163", nama: "Konflik Pembangunan dan Pemuliharaan",
    kategori: "alam", ikon: "🌳", jenis: "negatif",
    deskripsi: "Projek dicadangkan di kawasan sensitif dari sudut alam sekitar.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Penilaian impak dan konsultasi", kesan: { perbelanjaan: 8, populariti: 3 }, label: "Rundingan" },
      { teks: "Teruskan dengan mitigasi sah", kesan: { perbelanjaan: 15, pertumbuhan: 0.3, populariti: 1 }, label: "Projek terus" },
      { teks: "Batalkan projek", kesan: { populariti: 3, pertumbuhan: -0.3 }, label: "Komuniti gembira" }
    ]
  },
  {
    id: "EV164", nama: "Kekurangan Air Bersih",
    kategori: "alam", ikon: "💧", jenis: "negatif",
    deskripsi: "Komuniti menghadapi kekurangan bekalan air bersih.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Bekalan sementara", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Percepat projek jangka panjang", kesan: { perbelanjaan: 30, populariti: 3 }, label: "Berkekalan" },
      { teks: "Tangguhkan projek", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV165", nama: "Bantahan terhadap Projek Tenaga Baharu",
    kategori: "alam", ikon: "🔌", jenis: "negatif",
    deskripsi: "Penduduk bimbang tentang kesan projek tenaga kepada kawasan mereka.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Konsultasi dan penilaian", kesan: { perbelanjaan: 8, populariti: 3 }, label: "Populari naik" },
      { teks: "Ubah reka bentuk", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Penerimaan" },
      { teks: "Teruskan tanpa rundingan", kesan: { populariti: -4 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV166", nama: "Pencemaran Sungai",
    kategori: "alam", ikon: "🏞️", jenis: "negatif",
    deskripsi: "Sungai tercemar dan menjejaskan bekalan air serta ekosistem.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Siasat punca dan kuatkuasa", kesan: { populariti: 4, kepuasan: 3, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Pulihkan kawasan terjejas", kesan: { perbelanjaan: 25, populariti: 3 }, label: "Jangka panjang" },
      { teks: "Pantau tanpa penguatkuasaan", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV167", nama: "Pengurusan Sisa Pepejal Tertekan",
    kategori: "alam", ikon: "🗑️", jenis: "negatif",
    deskripsi: "Tapak pelupusan hampir penuh dan kos pengurusan meningkat.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Pengasingan dan kitar semula", kesan: { perbelanjaan: 15, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Kemudahan pemprosesan baharu", kesan: { perbelanjaan: 35, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Tambah pelupusan konvensional", kesan: { perbelanjaan: 10, populariti: -2 }, label: "Sementara" }
    ]
  },
  {
    id: "EV168", nama: "Permintaan Tenaga Meningkat",
    kategori: "alam", ikon: "🔋", jenis: "neutral",
    deskripsi: "Permintaan elektrik bertambah lebih cepat daripada kapasiti tertentu.",
    kesanAsas: { populariti: -1, pertumbuhan: 0.2 },
    pilihan: [
      { teks: "Pengurusan permintaan dan kecekapan", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Cekap" },
      { teks: "Tambah kapasiti selepas penilaian", kesan: { perbelanjaan: 30, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Hadkan pembangunan tertentu", kesan: { populariti: -2, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV169", nama: "Hakisan Pantai",
    kategori: "alam", ikon: "🌊", jenis: "negatif",
    deskripsi: "Hakisan mengancam rumah, jalan dan aktiviti ekonomi pantai.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Lindungi lokasi kritikal", kesan: { perbelanjaan: 30, populariti: 3 }, label: "Populari naik" },
      { teks: "Pulihkan ekosistem dan guna tanah", kesan: { perbelanjaan: 25, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Pindahkan aset berisiko", kesan: { perbelanjaan: 35, populariti: 2 }, label: "Berhati-hati" }
    ]
  },
  {
    id: "EV170", nama: "Kebimbangan terhadap Kualiti Udara Industri",
    kategori: "alam", ikon: "🏭", jenis: "negatif",
    deskripsi: "Penduduk berhampiran kawasan industri melaporkan bau dan pencemaran.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Pemantauan bebas dan pemeriksaan", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Tindakan terhadap pelanggaran", kesan: { populariti: 4, kepuasan: 3 }, label: "Penguatkuasaan" },
      { teks: "Tunggu aduan tambahan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 18 — HUBUNGAN LUAR & PERDAGANGAN (EV171–EV180)
  // =====================================================
  {
    id: "EV171", nama: "Pertikaian Diplomatik dengan Negara Jiran",
    kategori: "luar", ikon: "🌏", jenis: "negatif",
    deskripsi: "Kenyataan atau tindakan antara dua negara mencetuskan pertikaian.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Saluran diplomatik rasmi", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Kenyataan tegas tetapi berfakta", kesan: { populariti: 3, hasil: -5 }, label: "Populari naik" },
      { teks: "Tangguhkan respons awam", kesan: { populariti: -1 }, label: "Berhati-hati" }
    ]
  },
  {
    id: "EV172", nama: "Pasaran Eksport Mengenakan Sekatan Baharu",
    kategori: "luar", ikon: "🚫", jenis: "negatif",
    deskripsi: "Produk tempatan menghadapi halangan perdagangan di pasaran luar.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Runding pengecualian atau penyelesaian", kesan: { populariti: 2, pertumbuhan: 0.3 }, label: "Rundingan" },
      { teks: "Bantu syarikat cari pasaran alternatif", kesan: { perbelanjaan: 10, populariti: 2, pertumbuhan: 0.2 }, label: "Pasaran baharu" },
      { teks: "Tunggu perubahan dasar pasaran", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV173", nama: "Peluang Perjanjian Perdagangan",
    kategori: "luar", ikon: "🤝", jenis: "positif",
    deskripsi: "Negara asing menawarkan rundingan perjanjian perdagangan baharu.",
    kesanAsas: {},
    pilihan: [
      { teks: "Penilaian impak menyeluruh", kesan: { pertumbuhan: 0.2, populariti: 1 }, label: "Kajian" },
      { teks: "Runding dengan perlindungan sektor", kesan: { populariti: 2, pertumbuhan: 0.4 }, label: "Populari naik" },
      { teks: "Tolak rundingan", kesan: { populariti: -1 }, label: "Peluang hilang" }
    ]
  },
  {
    id: "EV174", nama: "Pelabur Asing Meminta Kepastian Dasar",
    kategori: "luar", ikon: "💼", jenis: "neutral",
    deskripsi: "Pelabur meminta jaminan tentang peraturan dan kestabilan dasar.",
    kesanAsas: {},
    pilihan: [
      { teks: "Terbitkan garis panduan dan jadual", kesan: { populariti: 2, pertumbuhan: 0.3 }, label: "Ketelusan" },
      { teks: "Rundingan sektor", kesan: { populariti: 2, pertumbuhan: 0.4 }, label: "Populari naik" },
      { teks: "Kekalkan ketidakjelasan", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV175", nama: "Gangguan Rantaian Bekalan Antarabangsa",
    kategori: "luar", ikon: "⛓️", jenis: "negatif",
    deskripsi: "Konflik atau gangguan luar menjejaskan penghantaran barangan penting.",
    kesanAsas: { inflasi: 0.3, populariti: -2 },
    pilihan: [
      { teks: "Pelbagaikan pembekal dan laluan", kesan: { perbelanjaan: 15, populariti: 2, inflasi: -0.2 }, label: "Kepelbagaian" },
      { teks: "Stok strategik", kesan: { perbelanjaan: 20, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Bergantung pada penghantaran biasa", kesan: { populariti: -3, inflasi: 0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV176", nama: "Krisis Kemanusiaan di Rantau",
    kategori: "luar", ikon: "🌍", jenis: "neutral",
    deskripsi: "Krisis di negara jiran menimbulkan permintaan bantuan kemanusiaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Bantuan mengikut kemampuan", kesan: { perbelanjaan: 15, populariti: 3 }, label: "Populari naik" },
      { teks: "Sumbang melalui organisasi", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Berstruktur" },
      { teks: "Hadkan komitmen", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV177", nama: "Rundingan Dua Hala Buntu",
    kategori: "luar", ikon: "🔒", jenis: "negatif",
    deskripsi: "Rundingan dengan negara rakan tidak mencapai persetujuan.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Teruskan rundingan teknikal", kesan: { populariti: 1 }, label: "Berterusan" },
      { teks: "Libatkan saluran diplomatik tinggi", kesan: { populariti: 2 }, label: "Populari naik" },
      { teks: "Tangguhkan rundingan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV178", nama: "Sekatan Eksport Bahan Strategik",
    kategori: "luar", ikon: "📦", jenis: "negatif",
    deskripsi: "Bekalan bahan penting berisiko terjejas akibat sekatan luar.",
    kesanAsas: { pertumbuhan: -0.3, populariti: -2 },
    pilihan: [
      { teks: "Cari sumber alternatif sah", kesan: { perbelanjaan: 15, pertumbuhan: 0.2 }, label: "Kepelbagaian" },
      { teks: "Bina kapasiti tempatan", kesan: { perbelanjaan: 30, pertumbuhan: 0.3 }, label: "Jangka panjang" },
      { teks: "Kurangkan penggunaan", kesan: { populariti: -2, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV179", nama: "Syarikat Tempatan Menghadapi Risiko Luar Negara",
    kategori: "luar", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Syarikat tempatan menghadapi masalah undang-undang atau operasi di pasaran asing.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Bantuan konsular dan maklumat", kesan: { populariti: 3, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Nasihat perdagangan dan undang-undang", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Sokongan" },
      { teks: "Serahkan kepada syarikat", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV180", nama: "Sidang Kemuncak Antarabangsa",
    kategori: "luar", ikon: "🌐", jenis: "positif",
    deskripsi: "Malaysia berpeluang menjadi tuan rumah persidangan serantau.",
    kesanAsas: {},
    pilihan: [
      { teks: "Terima dengan bajet dan sasaran jelas", kesan: { perbelanjaan: 20, populariti: 4, pertumbuhan: 0.3 }, label: "Populari naik" },
      { teks: "Kongsi penganjuran", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Kongsi kos" },
      { teks: "Tolak jemputan", kesan: { populariti: -1 }, label: "Peluang hilang" }
    ]
  },

  // =====================================================
  // KATEGORI 19 — TEKNOLOGI, SIBER & PRIVASI (EV181–EV190)
  // =====================================================
  {
    id: "EV181", nama: "Serangan Siber terhadap Sistem Kerajaan",
    kategori: "teknologi", ikon: "🛡️", jenis: "negatif",
    deskripsi: "Sistem digital kerajaan mengalami gangguan yang mungkin berpunca daripada serangan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Respons insiden dan lindungi sistem kritikal", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 10 }, label: "Populari naik" },
      { teks: "Audit dan pemulihan berfasa", kesan: { populariti: 2, perbelanjaan: 8 }, label: "Sistematik" },
      { teks: "Anggap gangguan biasa", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV182", nama: "Kebocoran Data Rakyat",
    kategori: "teknologi", ikon: "🔓", jenis: "negatif",
    deskripsi: "Maklumat peribadi mungkin terdedah akibat kelemahan sistem.",
    kesanAsas: { populariti: -4, kepuasan: -3 },
    pilihan: [
      { teks: "Lindungi sistem, maklumkan dan siasat", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Audit dahulu dengan komunikasi berperingkat", kesan: { populariti: 1 }, label: "Berhati-hati" },
      { teks: "Tidak mengumumkan tanpa penilaian", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV183", nama: "Gangguan Perkhidmatan Digital",
    kategori: "teknologi", ikon: "🌐", jenis: "negatif",
    deskripsi: "Rakyat tidak dapat menggunakan portal kerajaan untuk urusan penting.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Saluran alternatif dan pulihkan sistem", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Baiki sistem dan audit punca", kesan: { populariti: 2, perbelanjaan: 10 }, label: "Jangka panjang" },
      { teks: "Minta pengguna menunggu", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV184", nama: "Penggunaan AI dalam Perkhidmatan Awam",
    kategori: "teknologi", ikon: "🤖", jenis: "positif",
    deskripsi: "Kementerian mencadangkan penggunaan AI untuk mempercepat urusan kerajaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Projek rintis dengan pengawasan manusia", kesan: { populariti: 3, perbelanjaan: 10 }, label: "Rintis" },
      { teks: "Laksanakan secara meluas", kesan: { populariti: 2, perbelanjaan: 20, pertumbuhan: 0.3 }, label: "Cepat" },
      { teks: "Tangguhkan penggunaan AI", kesan: { populariti: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV185", nama: "Penipuan Digital Meningkat",
    kategori: "teknologi", ikon: "🚨", jenis: "negatif",
    deskripsi: "Aduan penipuan dalam talian meningkat dan menjejaskan pengguna.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Kerjasama penguatkuasaan dan saluran aduan", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Pendidikan keselamatan digital", kesan: { populariti: 2, perbelanjaan: 6 }, label: "Kesedaran" },
      { teks: "Serahkan kepada pengguna", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV186", nama: "Jurang Kemahiran Digital",
    kategori: "teknologi", ikon: "💻", jenis: "negatif",
    deskripsi: "Pekerja dan perusahaan kecil sukar menggunakan sistem digital baharu.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Latihan bersasar", kesan: { populariti: 3, perbelanjaan: 10 }, label: "Populari naik" },
      { teks: "Bantu perniagaan naik taraf sistem", kesan: { populariti: 2, perbelanjaan: 15, pertumbuhan: 0.2 }, label: "Sokongan" },
      { teks: "Biarkan pasaran menyesuaikan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV187", nama: "Teknologi Baharu Menggantikan Pekerjaan",
    kategori: "teknologi", ikon: "⚙️", jenis: "negatif",
    deskripsi: "Automasi mengurangkan permintaan terhadap beberapa jenis kerja.",
    kesanAsas: { pengangguran: 0.3, populariti: -2 },
    pilihan: [
      { teks: "Biayai latihan semula", kesan: { perbelanjaan: 15, pengangguran: -0.3, populariti: 3 }, label: "Populari naik" },
      { teks: "Automasi bersama penciptaan pekerjaan", kesan: { perbelanjaan: 20, pertumbuhan: 0.3, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Hadkan perubahan teknologi", kesan: { populariti: -2, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV188", nama: "Isu Privasi dalam Aplikasi Kerajaan",
    kategori: "teknologi", ikon: "🔒", jenis: "negatif",
    deskripsi: "Pengguna bimbang tentang jumlah data yang dikumpulkan oleh aplikasi kerajaan.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Audit data dan minimakan pengumpulan", kesan: { populariti: 3, kepuasan: 2, perbelanjaan: 8 }, label: "Populari naik" },
      { teks: "Terbitkan dasar privasi lebih jelas", kesan: { populariti: 2 }, label: "Ketelusan" },
      { teks: "Kekalkan sistem tanpa semakan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV189", nama: "Sistem Digital Baharu Gagal",
    kategori: "teknologi", ikon: "❌", jenis: "negatif",
    deskripsi: "Sistem baharu kementerian tidak berfungsi seperti dirancang selepas pelancaran.",
    kesanAsas: { populariti: -3, kepuasan: -2, perbelanjaan: 10 },
    pilihan: [
      { teks: "Pulihkan sistem lama dan baiki baharu", kesan: { populariti: 3, perbelanjaan: 15 }, label: "Populari naik" },
      { teks: "Teruskan dengan pembaikan", kesan: { populariti: 1, perbelanjaan: 8 }, label: "Berterusan" },
      { teks: "Hentikan projek", kesan: { populariti: -3, perbelanjaan: -10 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV190", nama: "Kebergantungan kepada Pembekal Teknologi",
    kategori: "teknologi", ikon: "🔗", jenis: "negatif",
    deskripsi: "Kerajaan bergantung kepada satu pembekal untuk sistem kritikal.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Rancang kebolehoperasian dan pilihan", kesan: { populariti: 2, perbelanjaan: 15 }, label: "Jangka panjang" },
      { teks: "Runding semula kontrak dan SLA", kesan: { populariti: 2, perbelanjaan: -5 }, label: "Rundingan" },
      { teks: "Kekalkan kontrak", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 20 — UNDANG-UNDANG & PENTADBIRAN (EV191–EV200)
  // =====================================================
  {
    id: "EV191", nama: "Undang-Undang Memerlukan Semakan",
    kategori: "undang", ikon: "📚", jenis: "neutral",
    deskripsi: "Undang-undang sedia ada didakwa tidak lagi sesuai dengan keadaan semasa.",
    kesanAsas: {},
    pilihan: [
      { teks: "Semakan dan konsultasi menyeluruh", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Menyeluruh" },
      { teks: "Pinda bahagian paling mendesak", kesan: { populariti: 1, perbelanjaan: 3 }, label: "Cepat" },
      { teks: "Kekalkan undang-undang", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV192", nama: "Kes Mahkamah Melibatkan Dasar Kerajaan",
    kategori: "undang", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Pelaksanaan dasar dicabar melalui proses mahkamah.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Nasihat undang-undang dan patuhi proses", kesan: { populariti: 2 }, label: "Prosedur" },
      { teks: "Semak dasar yang dicabar", kesan: { populariti: 2 }, label: "Berhati-hati" },
      { teks: "Abaikan cabaran", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV193", nama: "Tunggakan Kes Pentadbiran",
    kategori: "undang", ikon: "📂", jenis: "negatif",
    deskripsi: "Permohonan dan rayuan pentadbiran mengambil masa terlalu lama.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Tambah kapasiti di bahagian sesak", kesan: { perbelanjaan: 12, populariti: 3 }, label: "Populari naik" },
      { teks: "Permudahkan proses tidak perlu", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Cekap" },
      { teks: "Kekalkan sistem", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV194", nama: "Pertindihan Bidang Kuasa Agensi",
    kategori: "undang", ikon: "🔀", jenis: "negatif",
    deskripsi: "Dua agensi memberikan arahan yang bercanggah kepada pihak awam.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Jelaskan bidang kuasa dan protokol", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Lantik agensi peneraju", kesan: { populariti: 2 }, label: "Jelas" },
      { teks: "Biarkan agensi selesaikan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV195", nama: "Aduan Birokrasi Berlebihan",
    kategori: "undang", ikon: "📋", jenis: "negatif",
    deskripsi: "Rakyat dan perniagaan perlu mengemukakan dokumen berulang kali.",
    kesanAsas: { populariti: -2, kepuasan: -2 },
    pilihan: [
      { teks: "Hapus keperluan berulang", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Borang dan perkhidmatan digital", kesan: { perbelanjaan: 12, populariti: 3 }, label: "Digital" },
      { teks: "Kekalkan prosedur", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV196", nama: "Reformasi Institusi Ditentang",
    kategori: "undang", ikon: "🛑", jenis: "negatif",
    deskripsi: "Cadangan reformasi menghadapi bantahan daripada pihak yang terlibat.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Terbitkan alasan dan perlindungan proses", kesan: { populariti: 3 }, label: "Populari naik" },
      { teks: "Laksanakan berperingkat", kesan: { populariti: 2 }, label: "Berfasa" },
      { teks: "Batalkan reformasi", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV197", nama: "Sistem Aduan Awam Tidak Berkesan",
    kategori: "undang", ikon: "📢", jenis: "negatif",
    deskripsi: "Rakyat tidak menerima maklum balas selepas membuat aduan.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Tempoh respons dan sistem penjejakan", kesan: { perbelanjaan: 10, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Audit aduan tertunggak", kesan: { perbelanjaan: 8, populariti: 3, kepuasan: 2 }, label: "Sistematik" },
      { teks: "Kekalkan proses sedia ada", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV198", nama: "Pelaksanaan Dasar Tidak Seragam",
    kategori: "undang", ikon: "📏", jenis: "negatif",
    deskripsi: "Arahan kerajaan ditafsirkan secara berbeza antara agensi atau wilayah.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Panduan pelaksanaan seragam", kesan: { perbelanjaan: 5, populariti: 3 }, label: "Populari naik" },
      { teks: "Latih pegawai pelaksana", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Sokongan" },
      { teks: "Biarkan agensi sesuaikan", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV199", nama: "Keperluan Ketelusan Maklumat",
    kategori: "undang", ikon: "🔍", jenis: "neutral",
    deskripsi: "Masyarakat meminta lebih banyak data tentang hasil program kerajaan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Terbitkan data prestasi", kesan: { populariti: 4, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Terbitkan ringkasan berkala", kesan: { populariti: 2 }, label: "Sederhana" },
      { teks: "Hadkan penerbitan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV200", nama: "Penilaian Prestasi Perkhidmatan Awam",
    kategori: "undang", ikon: "📊", jenis: "positif",
    deskripsi: "Kerajaan mahu menilai mutu perkhidmatan antara kementerian.",
    kesanAsas: {},
    pilihan: [
      { teks: "Petunjuk prestasi dan maklum balas pengguna", kesan: { perbelanjaan: 10, populariti: 3, prestasiKerajaan: 3 }, label: "Populari naik" },
      { teks: "Fokus kementerian bermasalah dahulu", kesan: { perbelanjaan: 5, prestasiKerajaan: 2 }, label: "Tertumpu" },
      { teks: "Kekalkan kaedah lama", kesan: { populariti: -1 }, label: "Kritikan" }
    ]
  }
    ,

  // =====================================================
  // KATEGORI 21 — MANIFESTO & 100 HARI PERTAMA (EV201–EV210)
  // =====================================================
  {
    id: "EV201", nama: "Manifesto Kos Sara Hidup Tertangguh",
    kategori: "manifesto", ikon: "📋", jenis: "negatif",
    deskripsi: "Program manifesto belum bermula kerana isu perolehan dan penyelarasan.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Pelan pemulihan dengan tarikh baharu", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Kecilkan skop kepada penerima paling memerlukan", kesan: { populariti: 1, perbelanjaan: -8 }, label: "Skop kecil" },
      { teks: "Umumkan penangguhan", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV202", nama: "Manifesto Pekerjaan Kurang Kemajuan",
    kategori: "manifesto", ikon: "💼", jenis: "negatif",
    deskripsi: "Program pekerjaan tidak mencapai kadar penyertaan yang dirancang.",
    kesanAsas: { populariti: -2, pengangguran: 0.2 },
    pilihan: [
      { teks: "Semak halangan penyertaan", kesan: { populariti: 2, pengangguran: -0.1 }, label: "Pemulihan" },
      { teks: "Alih dana kepada latihan berdemand", kesan: { perbelanjaan: -5, pengangguran: -0.2, populariti: 2 }, label: "Populari naik" },
      { teks: "Kekalkan program", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV203", nama: "Manifesto Kesihatan Melebihi Kos",
    kategori: "manifesto", ikon: "🏥", jenis: "negatif",
    deskripsi: "Projek kesihatan memerlukan perbelanjaan lebih tinggi daripada anggaran.",
    kesanAsas: { perbelanjaan: 20, populariti: -2 },
    pilihan: [
      { teks: "Audit kos dan keutamaan klinikal", kesan: { perbelanjaan: -10, populariti: 2 }, label: "Cekap" },
      { teks: "Tambah dana jika dibuktikan", kesan: { perbelanjaan: 20, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Kurangkan skop", kesan: { perbelanjaan: -15, populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV204", nama: "Manifesto Pendidikan Mendapat Tentangan",
    kategori: "manifesto", ikon: "🎓", jenis: "negatif",
    deskripsi: "Pelaksanaan dasar pendidikan baharu menghadapi bantahan pihak berkepentingan.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Konsultasi dan pelarasan", kesan: { populariti: 3, perbelanjaan: 3 }, label: "Populari naik" },
      { teks: "Uji dasar secara rintis", kesan: { populariti: 1, perbelanjaan: 8 }, label: "Rintis" },
      { teks: "Teruskan pelaksanaan penuh", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV205", nama: "Manifesto Infrastruktur Lewat",
    kategori: "manifesto", ikon: "🏗️", jenis: "negatif",
    deskripsi: "Projek utama tidak mencapai kemajuan yang dijadualkan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Kenal pasti halangan dan pemilik tindakan", kesan: { populariti: 3, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Susun semula keutamaan projek", kesan: { populariti: 2 }, label: "Keutamaan" },
      { teks: "Kekalkan jadual asal", kesan: { populariti: -3, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV206", nama: "Manifesto Antirasuah Dipersoalkan",
    kategori: "manifesto", ikon: "🛡️", jenis: "negatif",
    deskripsi: "Rakyat meminta bukti konkrit bahawa pembaharuan integriti sedang berjalan.",
    kesanAsas: { populariti: -2, kepuasan: -1 },
    pilihan: [
      { teks: "Terbitkan kemajuan, tindakan dan petunjuk", kesan: { populariti: 4, kepuasan: 3, perbelanjaan: 5 }, label: "Populari naik" },
      { teks: "Audit bebas bidang terpilih", kesan: { populariti: 3, perbelanjaan: 8 }, label: "Sistematik" },
      { teks: "Fokus pada pengumuman dasar", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV207", nama: "Lima Manifesto Berebut Bajet",
    kategori: "manifesto", ikon: "💰", jenis: "neutral",
    deskripsi: "Semua manifesto memerlukan dana yang melebihi kemampuan peruntukan semasa.",
    kesanAsas: {},
    pilihan: [
      { teks: "Utamakan berdasarkan impak dan keperluan", kesan: { populariti: 2, perbelanjaan: -10 }, label: "Keutamaan" },
      { teks: "Agihkan pengurangan seimbang", kesan: { populariti: 1 }, label: "Seimbang" },
      { teks: "Tambah pembiayaan melalui pelarasan fiskal", kesan: { perbelanjaan: 20, populariti: 3, hutang: 15 }, label: "Populari naik" }
    ]
  },
  {
    id: "EV208", nama: "Manifesto Popular Tidak Mampu Dibiayai",
    kategori: "manifesto", ikon: "💸", jenis: "negatif",
    deskripsi: "Manifesto mendapat sokongan rakyat tetapi kos pelaksanaannya terlalu tinggi.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Reka semula skop dan sasaran", kesan: { populariti: 1, perbelanjaan: -10 }, label: "Skop baharu" },
      { teks: "Laksanakan secara berfasa", kesan: { populariti: 2, perbelanjaan: -5 }, label: "Berfasa" },
      { teks: "Teruskan tanpa pembiayaan mencukupi", kesan: { populariti: -4, hutang: 20 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV209", nama: "Laporan Hari Ke-100 Menghampiri",
    kategori: "manifesto", ikon: "📅", jenis: "neutral",
    deskripsi: "Kerajaan perlu melaporkan pencapaian awal kepada rakyat dan Parlimen.",
    kesanAsas: {},
    pilihan: [
      { teks: "Laporkan pencapaian, kegagalan dan kos", kesan: { populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Fokus pada hasil yang disahkan", kesan: { populariti: 2 }, label: "Sederhana" },
      { teks: "Tangguhkan laporan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV210", nama: "Manifesto Gagal Mencapai Sasaran",
    kategori: "manifesto", ikon: "❌", jenis: "negatif",
    deskripsi: "Satu manifesto tidak memenuhi sasaran dalam tempoh 100 hari.",
    kesanAsas: { populariti: -4, kepuasan: -3 },
    pilihan: [
      { teks: "Terbitkan sebab dan pelan pembetulan", kesan: { populariti: 2, kepuasan: 1 }, label: "Pemulihan" },
      { teks: "Sambung program dengan sasaran disemak", kesan: { populariti: 1 }, label: "Berterusan" },
      { teks: "Hentikan program", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 22 — PILIHAN RAYA & KEDUDUKAN POLITIK (EV211–EV220)
  // =====================================================
  {
    id: "EV211", nama: "Sokongan Kerajaan Menurun",
    kategori: "pilihanraya", ikon: "📉", jenis: "negatif",
    deskripsi: "Sokongan rakyat dan Ahli Parlimen terhadap kerajaan merosot.",
    kesanAsas: { populariti: -3, sokonganParlimen: -2 },
    pilihan: [
      { teks: "Kenal pasti punca melalui data", kesan: { populariti: 3, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Percepat pembaikan dasar bermasalah", kesan: { populariti: 2, sokonganParlimen: 2 }, label: "Pemulihan" },
      { teks: "Teruskan strategi semasa", kesan: { populariti: -3, sokonganParlimen: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV212", nama: "Parti Kerajaan Kehilangan Sokongan",
    kategori: "pilihanraya", ikon: "🤝", jenis: "negatif",
    deskripsi: "Parti gabungan melaporkan sokongan akar umbi merosot.",
    kesanAsas: { populariti: -2, sokonganParlimen: -3 },
    pilihan: [
      { teks: "Runding isu dasar dan kawasan", kesan: { populariti: 2, sokonganParlimen: 3 }, label: "Populari naik" },
      { teks: "Perbaiki pelaksanaan di kawasan terjejas", kesan: { perbelanjaan: 10, populariti: 3, sokonganParlimen: 2 }, label: "Sokongan naik" },
      { teks: "Abaikan aduan parti", kesan: { populariti: -3, sokonganParlimen: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV213", nama: "Calon Pilihan Raya Dipertikaikan",
    kategori: "pilihanraya", ikon: "🗳️", jenis: "negatif",
    deskripsi: "Pemilihan calon mencetuskan bantahan dalam parti.",
    kesanAsas: { populariti: -2, sokonganParlimen: -2 },
    pilihan: [
      { teks: "Kriteria prestasi dan pemilihan telus", kesan: { populariti: 2, sokonganParlimen: 2 }, label: "Ketelusan" },
      { teks: "Runding penyelesaian dengan bahagian parti", kesan: { populariti: 2 }, label: "Rundingan" },
      { teks: "Kekalkan keputusan asal", kesan: { populariti: -2, sokonganParlimen: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV214", nama: "Calon Baharu Mengatasi Penyandang",
    kategori: "pilihanraya", ikon: "🌟", jenis: "neutral",
    deskripsi: "Calon baharu mempunyai sokongan komuniti lebih kuat berbanding penyandang.",
    kesanAsas: {},
    pilihan: [
      { teks: "Nilai prestasi dan sokongan berdasarkan bukti", kesan: { populariti: 2 }, label: "Berbasis" },
      { teks: "Kekalkan penyandang", kesan: { populariti: 0 }, label: "Kesinambungan" },
      { teks: "Pilih calon baharu", kesan: { populariti: 3, sokonganParlimen: 1 }, label: "Populari naik" }
    ]
  },
  {
    id: "EV215", nama: "Kempen Pilihan Raya Memerlukan Dana Tambahan",
    kategori: "pilihanraya", ikon: "💰", jenis: "neutral",
    deskripsi: "Parti meminta dana lebih besar untuk kawasan yang dianggap penting.",
    kesanAsas: {},
    pilihan: [
      { teks: "Agih mengikut keperluan dan peraturan", kesan: { populariti: 1 }, label: "Ketelusan" },
      { teks: "Tumpukan kawasan sasaran", kesan: { populariti: 2, sokonganParlimen: 2 }, label: "Strategik" },
      { teks: "Bekukan tambahan dana", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV216", nama: "Isu Tempatan Menjejaskan Sokongan",
    kategori: "pilihanraya", ikon: "🏘️", jenis: "negatif",
    deskripsi: "Aduan jalan, air atau kemudahan tempatan menjejaskan sokongan kepada wakil kerajaan.",
    kesanAsas: { populariti: -2, sokonganParlimen: -1 },
    pilihan: [
      { teks: "Percepat penyelesaian isu disahkan", kesan: { perbelanjaan: 12, populariti: 3, sokonganParlimen: 1 }, label: "Populari naik" },
      { teks: "Terangkan jadual pelaksanaan", kesan: { populariti: 1 }, label: "Ketelusan" },
      { teks: "Abaikan isu kecil", kesan: { populariti: -3, sokonganParlimen: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV217", nama: "Parti Baharu Menarik Pengundi",
    kategori: "pilihanraya", ikon: "🆕", jenis: "negatif",
    deskripsi: "Parti baharu mencabar sokongan parti sedia ada.",
    kesanAsas: { populariti: -2, sokonganParlimen: -2 },
    pilihan: [
      { teks: "Semak keperluan pengundi dan dasar", kesan: { populariti: 3, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Perkukuh khidmat kawasan", kesan: { perbelanjaan: 8, populariti: 3, sokonganParlimen: 1 }, label: "Sokongan naik" },
      { teks: "Serang parti baharu", kesan: { populariti: -3, sokonganParlimen: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV218", nama: "Kempen Lawan Menyebarkan Dakwaan",
    kategori: "pilihanraya", ikon: "📢", jenis: "negatif",
    deskripsi: "Dakwaan politik muncul menjelang pilihan raya.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Jawab dengan bukti disahkan", kesan: { populariti: 3 }, label: "Populari naik" },
      { teks: "Minta pembetulan melalui saluran sesuai", kesan: { populariti: 1 }, label: "Formal" },
      { teks: "Balas dengan dakwaan lain", kesan: { populariti: -4 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV219", nama: "Keputusan Pilihan Raya Dipertikaikan",
    kategori: "pilihanraya", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Pihak tertentu mencabar keputusan melalui saluran rasmi.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Hormati proses dan serahkan bukti", kesan: { populariti: 3 }, label: "Populari naik" },
      { teks: "Terbitkan maklumat prosedur", kesan: { populariti: 1 }, label: "Prosedur" },
      { teks: "Kenyataan muktamad sebelum proses selesai", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV220", nama: "Kerajaan Perlu Membentuk Semula Sokongan",
    kategori: "pilihanraya", ikon: "🏛️", jenis: "negatif",
    deskripsi: "Selepas pilihan raya, tiada gabungan mempunyai sokongan jelas untuk membentuk kerajaan.",
    kesanAsas: { populariti: -3, sokonganParlimen: -3 },
    pilihan: [
      { teks: "Runding dasar dan sokongan secara rasmi", kesan: { populariti: 3, sokonganParlimen: 5 }, label: "Populari naik" },
      { teks: "Perjanjian sokongan dengan skop jelas", kesan: { populariti: 2, sokonganParlimen: 6 }, label: "Stabil" },
      { teks: "Tolak semua kompromi", kesan: { populariti: -4, sokonganParlimen: -3 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 23 — MEDIA, MAKLUMAT & KEPIMPINAN PERIBADI (EV221–EV230)
  // =====================================================
  {
    id: "EV221", nama: "Ucapan Perdana Menteri Disalah Faham",
    kategori: "kepimpinan", ikon: "🎙️", jenis: "negatif",
    deskripsi: "Petikan ucapan Perdana Menteri tersebar tanpa konteks lengkap.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Terbitkan konteks dan transkrip tepat", kesan: { populariti: 3 }, label: "Populari naik" },
      { teks: "Penjelasan ringkas", kesan: { populariti: 1 }, label: "Sederhana" },
      { teks: "Tidak memberi respons", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV222", nama: "Permintaan Maaf kepada Rakyat",
    kategori: "kepimpinan", ikon: "🙏", jenis: "neutral",
    deskripsi: "Kesilapan pentadbiran yang disahkan menjejaskan rakyat.",
    kesanAsas: {},
    pilihan: [
      { teks: "Akui kesilapan dan umumkan pembetulan", kesan: { populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Terangkan punca dan langkah pemulihan", kesan: { populariti: 2, kepuasan: 2 }, label: "Ketelusan" },
      { teks: "Elakkan pengakuan", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV223", nama: "Aduan Perkhidmatan kepada Perdana Menteri",
    kategori: "kepimpinan", ikon: "📬", jenis: "negatif",
    deskripsi: "Aduan awam yang banyak diterima menunjukkan masalah merentas kementerian.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Rujuk aduan dengan tarikh tindakan", kesan: { populariti: 3, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Pilih beberapa kes untuk audit segera", kesan: { populariti: 2, perbelanjaan: 5 }, label: "Audit" },
      { teks: "Serahkan kepada proses biasa", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV224", nama: "Jadual Perdana Menteri Terlalu Padat",
    kategori: "kepimpinan", ikon: "📅", jenis: "negatif",
    deskripsi: "Banyak keputusan, mesyuarat dan krisis bertindih pada minggu yang sama.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Utamakan keputusan berisiko tinggi", kesan: { populariti: 2 }, label: "Keutamaan" },
      { teks: "Delegasikan tugas kepada menteri", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Delegasi" },
      { teks: "Kekalkan semua mesyuarat", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV225", nama: "Keputusan Kerajaan Berubah Selepas Pengumuman",
    kategori: "kepimpinan", ikon: "🔄", jenis: "negatif",
    deskripsi: "Kerajaan perlu meminda keputusan yang telah diumumkan kerana maklumat baharu.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Terangkan bukti baharu dan sebab perubahan", kesan: { populariti: 3 }, label: "Populari naik" },
      { teks: "Umumkan pindaan dan pelan peralihan", kesan: { populariti: 2 }, label: "Peralihan" },
      { teks: "Kekalkan keputusan asal", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV226", nama: "Konflik Antara Janji dan Keupayaan",
    kategori: "kepimpinan", ikon: "⚖️", jenis: "negatif",
    deskripsi: "Janji awam melebihi kemampuan kewangan atau pentadbiran kerajaan.",
    kesanAsas: { populariti: -2 },
    pilihan: [
      { teks: "Semak sasaran dan jelaskan kekangan", kesan: { populariti: 2 }, label: "Ketelusan" },
      { teks: "Laksanakan bahagian paling penting dahulu", kesan: { populariti: 1, perbelanjaan: -10 }, label: "Keutamaan" },
      { teks: "Kekalkan semua janji", kesan: { populariti: -3, hutang: 15 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV227", nama: "Tekanan Membuat Keputusan Segera",
    kategori: "kepimpinan", ikon: "⏰", jenis: "negatif",
    deskripsi: "Media dan pihak berkepentingan menuntut keputusan segera sebelum fakta lengkap diperoleh.",
    kesanAsas: { populariti: -1 },
    pilihan: [
      { teks: "Langkah sementara yang boleh disemak", kesan: { populariti: 2 }, label: "Sementara" },
      { teks: "Tunggu penilaian lengkap", kesan: { populariti: -1 }, label: "Berhati-hati" },
      { teks: "Keputusan muktamad tanpa semakan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV228", nama: "Cadangan Rundingan dengan Pembangkang",
    kategori: "kepimpinan", ikon: "🤝", jenis: "positif",
    deskripsi: "Pembangkang menawarkan kerjasama untuk isu kepentingan negara.",
    kesanAsas: {},
    pilihan: [
      { teks: "Runding skop kerjasama jelas", kesan: { populariti: 3, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Terima kerjasama terhad mengikut isu", kesan: { populariti: 2 }, label: "Fleksibel" },
      { teks: "Tolak kerjasama", kesan: { populariti: -2, sokonganParlimen: -1 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV229", nama: "Kepercayaan terhadap Pengumuman Kerajaan Merosot",
    kategori: "kepimpinan", ikon: "📉", jenis: "negatif",
    deskripsi: "Rakyat mempersoalkan ketepatan pengumuman terdahulu.",
    kesanAsas: { populariti: -3, kepuasan: -2 },
    pilihan: [
      { teks: "Terbitkan rekod janji dan kemajuan", kesan: { populariti: 3, kepuasan: 2 }, label: "Populari naik" },
      { teks: "Semakan fakta sebelum pengumuman", kesan: { populariti: 2 }, label: "Sistematik" },
      { teks: "Teruskan komunikasi biasa", kesan: { populariti: -3, kepuasan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV230", nama: "Laporan Prestasi Perdana Menteri",
    kategori: "kepimpinan", ikon: "📊", jenis: "neutral",
    deskripsi: "Kerajaan perlu membentangkan penilaian keseluruhan prestasi kepada Parlimen dan rakyat.",
    kesanAsas: {},
    pilihan: [
      { teks: "Laporkan hasil, kos, kekurangan", kesan: { populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Fokus pada pencapaian utama", kesan: { populariti: 2 }, label: "Sederhana" },
      { teks: "Tangguhkan laporan", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },

  // =====================================================
  // KATEGORI 24 — KEJUTAN POLITIK, SOSIAL & EKONOMI (EV231–EV240)
  // =====================================================
  {
    id: "EV231", nama: "Krisis Bekalan Barang Kritikal",
    kategori: "kejutan", ikon: "📦", jenis: "negatif",
    deskripsi: "Barang penting sukar diperoleh akibat gangguan pengeluaran atau penghantaran.",
    kesanAsas: { inflasi: 0.4, populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Pemantauan bekalan dan sumber alternatif", kesan: { perbelanjaan: 10, populariti: 3, inflasi: -0.2 }, label: "Populari naik" },
      { teks: "Agih stok terhad mengikut keutamaan", kesan: { populariti: 1, kepuasan: 1 }, label: "Keutamaan" },
      { teks: "Biarkan pasaran berjalan", kesan: { populariti: -3, inflasi: 0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV232", nama: "Penutupan Operasi Syarikat Utama",
    kategori: "kejutan", ikon: "🏭", jenis: "negatif",
    deskripsi: "Penutupan syarikat besar mengancam pekerjaan dan rantaian pembekal.",
    kesanAsas: { pengangguran: 0.5, populariti: -3, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Bantu pekerja terjejas dan nilai pemulihan", kesan: { perbelanjaan: 15, populariti: 3, pengangguran: -0.2 }, label: "Populari naik" },
      { teks: "Fasilitasi penyusunan semula", kesan: { perbelanjaan: 8, populariti: 2, pengangguran: -0.3 }, label: "Pemulihan" },
      { teks: "Tiada sokongan khusus", kesan: { populariti: -4, pengangguran: 0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV233", nama: "Gangguan Sistem Pembayaran",
    kategori: "kejutan", ikon: "💳", jenis: "negatif",
    deskripsi: "Gangguan teknikal menjejaskan pembayaran digital dan urusan perniagaan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Saluran alternatif dan penyelarasan sistem", kesan: { perbelanjaan: 8, populariti: 3 }, label: "Populari naik" },
      { teks: "Pemulihan dan siasatan punca", kesan: { populariti: 2, perbelanjaan: 10 }, label: "Sistematik" },
      { teks: "Tunggu penyedia selesai", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV234", nama: "Mogok Pengangkutan Menjejaskan Bekalan",
    kategori: "kejutan", ikon: "🚛", jenis: "negatif",
    deskripsi: "Gangguan pengangkutan menyebabkan barangan dan penumpang tertangguh.",
    kesanAsas: { populariti: -2, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Fasilitasi rundingan dan perkhidmatan kritikal", kesan: { populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Laluan alternatif", kesan: { perbelanjaan: 10, populariti: 2 }, label: "Logistik" },
      { teks: "Tidak campur tangan", kesan: { populariti: -3, pertumbuhan: -0.2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV235", nama: "Krisis Keyakinan terhadap Sektor Kewangan",
    kategori: "kejutan", ikon: "🏦", jenis: "negatif",
    deskripsi: "Khabar angin dan kebimbangan pasaran menyebabkan orang ramai bertanya tentang kestabilan kewangan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.4 },
    pilihan: [
      { teks: "Komunikasi fakta dengan pihak berkuasa", kesan: { populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Pemantauan risiko mengikut kuasa", kesan: { populariti: 2 }, label: "Pengawasan" },
      { teks: "Jaminan tanpa data", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV236", nama: "Gangguan Bekalan Gas atau Tenaga",
    kategori: "kejutan", ikon: "⛽", jenis: "negatif",
    deskripsi: "Gangguan bekalan tenaga menjejaskan industri dan perkhidmatan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.3 },
    pilihan: [
      { teks: "Utamakan pengguna kritikal", kesan: { populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Cari bekalan alternatif", kesan: { perbelanjaan: 15, pertumbuhan: 0.2 }, label: "Alternatif" },
      { teks: "Kekalkan pengagihan biasa", kesan: { populariti: -3, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV237", nama: "Kemalangan Besar di Kawasan Industri",
    kategori: "kejutan", ikon: "💥", jenis: "negatif",
    deskripsi: "Insiden industri menjejaskan pekerja, penduduk atau alam sekitar.",
    kesanAsas: { populariti: -4, kepuasan: -3 },
    pilihan: [
      { teks: "Respons kecemasan dan siasatan", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Gantung operasi berkaitan sementara", kesan: { populariti: 3, pertumbuhan: -0.2 }, label: "Keselamatan" },
      { teks: "Sambung operasi tanpa pemeriksaan", kesan: { populariti: -4, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV238", nama: "Gangguan Sistem Telekomunikasi",
    kategori: "kejutan", ikon: "📡", jenis: "negatif",
    deskripsi: "Gangguan rangkaian menjejaskan komunikasi orang ramai dan operasi perniagaan.",
    kesanAsas: { populariti: -3, pertumbuhan: -0.2 },
    pilihan: [
      { teks: "Utamakan rangkaian kecemasan dan pemulihan", kesan: { populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Audit punca dan pelan daya tahan", kesan: { perbelanjaan: 12, populariti: 2 }, label: "Jangka panjang" },
      { teks: "Tunggu penyedia selesai", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV239", nama: "Penipuan Bantuan Kerajaan",
    kategori: "kejutan", ikon: "🕵️", jenis: "negatif",
    deskripsi: "Aduan menunjukkan kemungkinan tuntutan bantuan palsu.",
    kesanAsas: { populariti: -2, perbelanjaan: 5 },
    pilihan: [
      { teks: "Audit tuntutan berisiko", kesan: { populariti: 3, perbelanjaan: -5 }, label: "Populari naik" },
      { teks: "Semak semua permohonan terpilih", kesan: { populariti: 2 }, label: "Sistematik" },
      { teks: "Kekalkan proses tanpa perubahan", kesan: { populariti: -3, perbelanjaan: 5 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV240", nama: "Kejutan Ekonomi Global",
    kategori: "kejutan", ikon: "🌐", jenis: "negatif",
    deskripsi: "Kejutan luar menjejaskan perdagangan, pelaburan dan sentimen pasaran.",
    kesanAsas: { pertumbuhan: -0.5, populariti: -3, hasil: -15 },
    pilihan: [
      { teks: "Pemantauan dan pelan kontingensi", kesan: { perbelanjaan: 8, populariti: 3, pertumbuhan: 0.2 }, label: "Populari naik" },
      { teks: "Lindungi kumpulan paling terdedah", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Sokongan" },
      { teks: "Tunggu data lebih lengkap", kesan: { populariti: -3, pertumbuhan: -0.3 }, label: "Kritikan" }
    ]
  }
    ,

  // =====================================================
  // KATEGORI 25 — BERANTAI, PENILAIAN & AKHIR PENGGAL (EV241–EV250)
  // =====================================================
  {
    id: "EV241", nama: "Risiko Projek Berulang",
    kategori: "berantai", ikon: "🔁", jenis: "negatif",
    deskripsi: "Projek yang pernah lewat mula menunjukkan tanda kelewatan sekali lagi.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Audit kemajuan dan punca berulang", kesan: { populariti: 3, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Tukar pelan pelaksanaan", kesan: { perbelanjaan: 10, prestasiKerajaan: 3 }, label: "Pemulihan" },
      { teks: "Kekalkan pengurusan sedia ada", kesan: { populariti: -3, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV242", nama: "Bantuan Kecemasan Tidak Sampai kepada Penerima",
    kategori: "berantai", ikon: "📮", jenis: "negatif",
    deskripsi: "Aduan menunjukkan bantuan yang diluluskan belum diterima oleh sebahagian penerima layak.",
    kesanAsas: { populariti: -3, kepuasan: -3 },
    pilihan: [
      { teks: "Jejak pembayaran dan selesaikan tunggakan", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Audit rantaian agihan", kesan: { perbelanjaan: 8, populariti: 2 }, label: "Sistematik" },
      { teks: "Tunggu laporan berkala", kesan: { populariti: -3, kepuasan: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV243", nama: "Reformasi Menghadapi Halangan Pelaksanaan",
    kategori: "berantai", ikon: "🛑", jenis: "negatif",
    deskripsi: "Pembaharuan kerajaan tidak menghasilkan perubahan seperti dirancang.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -2 },
    pilihan: [
      { teks: "Semak sasaran, proses dan tanggungjawab", kesan: { populariti: 3, prestasiKerajaan: 3 }, label: "Populari naik" },
      { teks: "Laksanakan projek rintis baharu", kesan: { perbelanjaan: 8, prestasiKerajaan: 2 }, label: "Rintis" },
      { teks: "Batalkan reformasi", kesan: { populariti: -3, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV244", nama: "Kementerian Tidak Mencapai Sasaran Tahunan",
    kategori: "berantai", ikon: "📉", jenis: "negatif",
    deskripsi: "Laporan menunjukkan kementerian gagal mencapai beberapa petunjuk prestasi.",
    kesanAsas: { populariti: -2, prestasiKerajaan: -3 },
    pilihan: [
      { teks: "Pelan pembetulan dengan tarikh", kesan: { populariti: 3, prestasiKerajaan: 3 }, label: "Populari naik" },
      { teks: "Susun semula sumber dan kepimpinan", kesan: { perbelanjaan: 8, prestasiKerajaan: 3, sokonganParlimen: -1 }, label: "Rombakan" },
      { teks: "Kekalkan peruntukan dan sasaran", kesan: { populariti: -2, prestasiKerajaan: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV245", nama: "Rizab Kecemasan Semakin Berkurang",
    kategori: "berantai", ikon: "💰", jenis: "negatif",
    deskripsi: "Beberapa krisis menggunakan sebahagian besar dana kecemasan.",
    kesanAsas: { populariti: -2, hutang: 10 },
    pilihan: [
      { teks: "Keutamaan penggunaan rizab", kesan: { populariti: 2, hutang: -5 }, label: "Keutamaan" },
      { teks: "Pulihkan rizab melalui penjimatan", kesan: { populariti: 1, hutang: -10, perbelanjaan: -10 }, label: "Pemulihan" },
      { teks: "Terus guna rizab tanpa pelan", kesan: { populariti: -3, hutang: 15 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV246", nama: "Kejayaan Dasar Mencetuskan Permintaan Lebih Besar",
    kategori: "berantai", ikon: "🌟", jenis: "positif",
    deskripsi: "Program yang berjaya mendapat permintaan daripada lebih banyak kawasan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Perluas secara berfasa selepas penilaian", kesan: { perbelanjaan: 15, populariti: 4, kepuasan: 3 }, label: "Populari naik" },
      { teks: "Kekalkan skala semasa", kesan: { populariti: 1 }, label: "Kekal" },
      { teks: "Serahkan peluasan kepada pihak berkaitan", kesan: { perbelanjaan: 5, populariti: 2 }, label: "Kongsi" }
    ]
  },
  {
    id: "EV247", nama: "Janji Kerajaan Bertindih dengan Dasar Baharu",
    kategori: "berantai", ikon: "🔀", jenis: "negatif",
    deskripsi: "Dasar baharu bertindih dengan program yang telah diumumkan sebelum ini.",
    kesanAsas: { populariti: -1, perbelanjaan: 5 },
    pilihan: [
      { teks: "Satukan program dan sasaran", kesan: { perbelanjaan: -10, populariti: 3, prestasiKerajaan: 2 }, label: "Populari naik" },
      { teks: "Kekalkan program berasingan dengan skop jelas", kesan: { populariti: 1 }, label: "Berasingan" },
      { teks: "Hentikan program kurang berkesan", kesan: { perbelanjaan: -15, populariti: 2 }, label: "Jimat" }
    ]
  },
  {
    id: "EV248", nama: "Persediaan Menjelang Tamat Penggal",
    kategori: "berantai", ikon: "🗓️", jenis: "neutral",
    deskripsi: "Kerajaan menghampiri penghujung penggal dan perlu menilai projek yang belum selesai.",
    kesanAsas: {},
    pilihan: [
      { teks: "Utamakan penyelesaian projek kritikal", kesan: { perbelanjaan: 20, populariti: 4, prestasiKerajaan: 3 }, label: "Populari naik" },
      { teks: "Terbitkan laporan status dan pelan serahan", kesan: { populariti: 3, prestasiKerajaan: 2 }, label: "Ketelusan" },
      { teks: "Umumkan pencapaian tanpa semak baki projek", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV249", nama: "Penilaian Akhir Prestasi Kerajaan",
    kategori: "berantai", ikon: "📋", jenis: "neutral",
    deskripsi: "Prestasi ekonomi, kebajikan, integriti, kabinet dan sokongan politik perlu dinilai sebelum pilihan raya.",
    kesanAsas: {},
    pilihan: [
      { teks: "Penilaian menyeluruh berasaskan data", kesan: { populariti: 4, prestasiKerajaan: 3 }, label: "Populari naik" },
      { teks: "Fokus bidang dengan hasil terbaik", kesan: { populariti: 2, prestasiKerajaan: 2 }, label: "Sederhana" },
      { teks: "Tangguhkan penilaian", kesan: { populariti: -3 }, label: "Kritikan" }
    ]
  },
  {
    id: "EV250", nama: "Pilihan Raya Menentukan Masa Depan Kerajaan",
    kategori: "berantai", ikon: "🗳️", jenis: "neutral",
    deskripsi: "Penggal pemerintahan berakhir dan kerajaan perlu menghadapi proses pilihan raya mengikut peraturan permainan.",
    kesanAsas: {},
    pilihan: [
      { teks: "Bentangkan rekod pencapaian dan rancangan seterusnya", kesan: { populariti: 4, kepuasan: 3, sokonganParlimen: 2 }, label: "Populari naik" },
      { teks: "Akui kekurangan dan jelaskan pembetulan", kesan: { populariti: 3, kepuasan: 2 }, label: "Akauntabiliti" },
      { teks: "Fokus kempen tanpa laporan terperinci", kesan: { populariti: -2 }, label: "Kritikan" }
    ]
  }

];

// =====================================
// Fungsi bantuan
// =====================================

function dapatkanPeristiwa(id) {
  return DATA_PERISTIWA.find(p => p.id === id);
}

function senaraiPeristiwaMengikutKategori(kategori) {
  return DATA_PERISTIWA.filter(p => p.kategori === kategori);
}

function senaraiPeristiwaMengikutJenis(jenis) {
  return DATA_PERISTIWA.filter(p => p.jenis === jenis);
}

function jumlahPeristiwa() {
  return DATA_PERISTIWA.length;
}

/**
 * Pilih satu peristiwa rawak, kecuali yang sudah berlaku (jika ada senarai sejarah).
 * @param {Array} sejarahPeristiwa - array peristiwa yang telah berlaku
 * @returns {Object|null} peristiwa atau null kalau semua sudah berlaku
 */
function pilihPeristiwaRawak(sejarahPeristiwa) {
  const idSejarah = (sejarahPeristiwa || []).map(p => p.id);
  const tersedia = DATA_PERISTIWA.filter(p => !idSejarah.includes(p.id));

  if (tersedia.length === 0) return null;

  const index = Math.floor(Math.random() * tersedia.length);
  return tersedia[index];
}

/**
 * Senarai kategori peristiwa yang ada.
 */
function senaraiKategoriPeristiwa() {
  const set = new Set(DATA_PERISTIWA.map(p => p.kategori));
  return [...set].sort();
}

/**
 * Cari peristiwa mengikut id rantaian (untuk rantaian peristiwa).
 */
function dapatkanPeristiwaSusulan(idRantaian) {
  if (!idRantaian) return null;
  return DATA_PERISTIWA.find(p => p.id === idRantaian);
}

// =====================================
// Log pengesahan (hanya untuk debug)
// =====================================

console.log("📋 DATA_PERISTIWA dimuatkan:", DATA_PERISTIWA.length, "peristiwa");
console.log("📂 Kategori:", senaraiKategoriPeristiwa().join(", "));