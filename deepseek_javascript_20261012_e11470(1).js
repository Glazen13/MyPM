/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS
   Bahagian 1: Data, State, Utiliti, Splash, Menu, Cipta Watak
   ============================================================ */

'use strict';

/* ============ TETAPAN GLOBAL ============ */
const VERSION = '1.0.0';
const SAVE_KEY_PREFIX = 'sppm_save_';
const SAVE_AUTO_KEY = 'sppm_autosave';
const SETTINGS_KEY = 'sppm_settings';

/* ============ PANGKALAN DATA: NEGERI ============ */
const STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Penang', 'Sabah', 'Sarawak',
  'Selangor', 'Terengganu', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'
];

/* ============ PANGKALAN DATA: KERJAYA (Nilai Simulasi) ============ */
const CAREERS = {
  'Tiada Kerja': { gaji: 0, tekanan: 0, pengalaman: 0, kelayakan: 'SPM', jam: 0 },
  'Pekerja Separuh Masa': { gaji: 1500, tekanan: 20, pengalaman: 1, kelayakan: 'SPM', jam: 20 },
  'Pekerja Mahir': { gaji: 2500, tekanan: 35, pengalaman: 1, kelayakan: 'SPM', jam: 45 },
  'Guru': { gaji: 3000, tekanan: 45, pengalaman: 2, kelayakan: 'Diploma', jam: 45 },
  'Eksekutif Swasta': { gaji: 3500, tekanan: 50, pengalaman: 2, kelayakan: 'Ijazah Sarjana Muda', jam: 48 },
  'Pegawai Kerajaan': { gaji: 3500, tekanan: 40, pengalaman: 2, kelayakan: 'Ijazah Sarjana Muda', jam: 42 },
  'Akauntan': { gaji: 4000, tekanan: 50, pengalaman: 3, kelayakan: 'Ijazah Sarjana Muda', jam: 48 },
  'Jurutera': { gaji: 4500, tekanan: 50, pengalaman: 3, kelayakan: 'Ijazah Sarjana Muda', jam: 48 },
  'Pensyarah': { gaji: 5000, tekanan: 45, pengalaman: 4, kelayakan: 'Sarjana', jam: 45 },
  'Pengurus': { gaji: 7000, tekanan: 60, pengalaman: 5, kelayakan: 'Ijazah Sarjana Muda', jam: 55 },
  'Peguam Berpengalaman': { gaji: 8000, tekanan: 65, pengalaman: 6, kelayakan: 'Ijazah Sarjana Muda', jam: 55 },
  'Doktor Berpengalaman': { gaji: 9000, tekanan: 75, pengalaman: 7, kelayakan: 'Ijazah Sarjana Muda', jam: 60 },
  'Pengarah Syarikat': { gaji: 15000, tekanan: 70, pengalaman: 10, kelayakan: 'Sarjana', jam: 55 }
};

/* ============ PANGKALAN DATA: PARTI POLITIK ============ */
const PARTIES = [
  { id: 'P001', nama: 'Parti Rakyat Bersatu', singkatan: 'PRB', ideologi: 'Tengah', warna: '#d4af37', status: 'Simulasi' },
  { id: 'P002', nama: 'Barisan Nasional Rakyat', singkatan: 'BNR', ideologi: 'Konservatif', warna: '#1a3a6b', status: 'Simulasi' },
  { id: 'P003', nama: 'Pakatan Progresif', singkatan: 'PPP', ideologi: 'Progresif', warna: '#e74c3c', status: 'Simulasi' },
  { id: 'P004', nama: 'Parti Islam Nusantara', singkatan: 'PIN', ideologi: 'Islamik', warna: '#27ae60', status: 'Simulasi' },
  { id: 'P005', nama: 'Gerakan Anak Muda', singkatan: 'GAM', ideologi: 'Belia', warna: '#3498db', status: 'Simulasi' },
  { id: 'P006', nama: 'Parti Sabah Maju', singkatan: 'PSM', ideologi: 'Serantau', warna: '#f39c12', status: 'Simulasi' },
  { id: 'P007', nama: 'Parti Sarawak Bersatu', singkatan: 'PSB', ideologi: 'Serantau', warna: '#9b59b6', status: 'Simulasi' }
];

/* ============ PANGKALAN DATA: 20 WATAK FIKSYEN ============ */
const CHARACTERS = [
  { id: 'C01', nama: 'Rizal Hakim', peranan: 'Rakan Setia', emoji: '🤝', desk: 'Rakan yang setia dan rasional.' },
  { id: 'C02', nama: 'Dr. Aishah Rahman', peranan: 'Aktivis', emoji: '👩‍⚕️', desk: 'Aktivis masyarakat yang berprinsip.' },
  { id: 'C03', nama: 'Tan Sri Arman', peranan: 'Mentor', emoji: '🧔', desk: 'Mentor politik berpengalaman.' },
  { id: 'C04', nama: 'Siti Farah', peranan: 'Pengurus Operasi', emoji: '👩‍💼', desk: 'Pengurus operasi yang teratur.' },
  { id: 'C05', nama: 'Amirul Haziq', peranan: 'Rakan Perniagaan', emoji: '💼', desk: 'Rakan perniagaan pragmatik.' },
  { id: 'C06', nama: "Dato' Seri Hisham", peranan: 'Pesaing', emoji: '🎩', desk: 'Pesaing strategik bercita-cita tinggi.' },
  { id: 'C07', nama: 'Datuk Seri Liyana', peranan: 'Perunding', emoji: '👩‍⚖️', desk: 'Perunding berpengaruh.' },
  { id: 'C08', nama: 'Tuan Rahman', peranan: 'Pegawai PRU', emoji: '📋', desk: 'Pegawai pengurusan pilihan raya.' },
  { id: 'C09', nama: 'Firdaus Khalid', peranan: 'Penyiasat', emoji: '🕵️', desk: 'Pemberi maklumat berhati-hati.' },
  { id: 'C10', nama: 'Nadia Azman', peranan: 'Wartawan', emoji: '📰', desk: 'Wartawan kritikal.' },
  { id: 'C11', nama: 'Hakim Salleh', peranan: 'Pakar Ekonomi', emoji: '📊', desk: 'Pakar ekonomi dan kewangan.' },
  { id: 'C12', nama: 'Datuk Kamal Idris', peranan: 'Pentadbir', emoji: '🏛️', desk: 'Pengurus krisis pentadbiran.' },
  { id: 'C13', nama: 'Dr. Nurul Huda', peranan: 'Pakar Pendidikan', emoji: '🎓', desk: 'Pakar pendidikan dan dasar sosial.' },
  { id: 'C14', nama: 'Daniel Wong', peranan: 'Perunding Gabungan', emoji: '🤵', desk: 'Ahli politik berpengalaman.' },
  { id: 'C15', nama: 'Farid Iskandar', peranan: 'Pemimpin Parti', emoji: '🎖️', desk: 'Pemimpin organisasi parti.' },
  { id: 'C16', nama: 'Pak Salleh', peranan: 'Pemimpin Komuniti', emoji: '👴', desk: 'Pemimpin komuniti setempat.' },
  { id: 'C17', nama: 'Mei Ling', peranan: 'Pengundi Kritikal', emoji: '👩', desk: 'Pengundi yang menilai dasar.' },
  { id: 'C18', nama: 'Hafiz', peranan: 'Penyokong Belia', emoji: '🧑', desk: 'Penyokong belia yang mahu hasil.' },
  { id: 'C19', nama: 'Puan Salmah', peranan: 'Pemimpin NGO', emoji: '👵', desk: 'Pemimpin NGO merentas parti.' },
  { id: 'C20', nama: 'Jason Lee', peranan: 'Pempengaruh', emoji: '📱', desk: 'Pempengaruh media sosial.' }
];

/* ============ PANGKALAN DATA: TAHAP KEMAJUAN ============ */
const LEVELS = [
  { lvl: 0, nama: 'Rakyat Biasa', xp: 0 },
  { lvl: 1, nama: 'Aktivis Komuniti', xp: 50 },
  { lvl: 2, nama: 'Pengenalan Politik', xp: 150 },
  { lvl: 3, nama: 'Ahli Parti', xp: 300 },
  { lvl: 4, nama: 'Petugas Parti', xp: 500 },
  { lvl: 5, nama: 'Jawatan Cawangan', xp: 800 },
  { lvl: 6, nama: 'Kepimpinan Bahagian', xp: 1200 },
  { lvl: 7, nama: 'Kepimpinan Negeri', xp: 1800 },
  { lvl: 8, nama: 'Kepimpinan Nasional', xp: 2600 },
  { lvl: 9, nama: 'Calon Pilihan Raya', xp: 3600 },
  { lvl: 10, nama: 'Wakil Rakyat', xp: 5000 },
  { lvl: 11, nama: 'Kepimpinan Legislatif', xp: 7000 },
  { lvl: 12, nama: 'Kepimpinan Negeri', xp: 9500 },
  { lvl: 13, nama: 'Kepimpinan Persekutuan', xp: 12500 },
  { lvl: 14, nama: 'Kepimpinan Tertinggi', xp: 16000 },
  { lvl: 15, nama: 'Legasi', xp: 20000 }
];

/* ============ PANGKALAN DATA: PERISTIWA ============ */
const EVENTS = [
  {
    id: 'EV001', kategori: 'KEWANGAN', tajuk: 'Kenaikan Sewa Rumah',
    desk: 'Tuan rumah memaklumkan sewa akan naik bermula bulan depan. Anda perlu membuat keputusan.',
    pilihan: [
      { teks: 'Terima dan bayar sewa baharu', kesan: { wang: -200, stress: 3 } },
      { teks: 'Runding turunkan kadar', kesan: { wang: -100, stress: 5, charisma: 2 } },
      { teks: 'Cari rumah lain', kesan: { wang: -500, stress: 8, masa: 1 } }
    ]
  },
  {
    id: 'EV002', kategori: 'KERJAYA', tajuk: 'Tawaran Kenaikan Pangkat',
    desk: 'Pihak pengurusan menawarkan kenaikan pangkat dengan gaji lebih tinggi, tetapi beban kerja bertambah.',
    pilihan: [
      { teks: 'Terima kenaikan pangkat', kesan: { gaji: 800, stress: 10, experience: 5 } },
      { teks: 'Tolak dengan sopan', kesan: { stress: -3, charisma: 1 } },
      { teks: 'Runding keseimbangan', kesan: { gaji: 400, stress: 4, negotiation: 3 } }
    ]
  },
  {
    id: 'EV003', kategori: 'KELUARGA', tajuk: 'Ibu Bapa Perlukan Bantuan',
    desk: 'Ibu bapa anda memerlukan bantuan kewangan untuk rawatan kesihatan.',
    pilihan: [
      { teks: 'Bantu sepenuhnya (RM3,000)', kesan: { wang: -3000, integrity: 8, family: 10 } },
      { teks: 'Bantu sebahagian (RM1,500)', kesan: { wang: -1500, integrity: 5 } },
      { teks: 'Bincang dengan adik-beradik', kesan: { wang: -800, negotiation: 2 } }
    ]
  },
  {
    id: 'EV004', kategori: 'POLITIK', tajuk: 'Jemputan Menyertai Parti',
    desk: 'Seorang kenalan mengajak anda menyertai parti politik tempatan. Beliau melihat potensi kepimpinan anda.',
    pilihan: [
      { teks: 'Terima dan sertai segera', kesan: { joinParty: true, partyInfluence: 5, experience: 10 } },
      { teks: 'Fikir dahulu', kesan: { stress: 2 } },
      { teks: 'Tolak dengan hormat', kesan: { integrity: 2 } }
    ]
  },
  {
    id: 'EV005', kategori: 'MEDIA', tajuk: 'Wartawan Ingin Temu Bual',
    desk: 'Seorang wartawan ingin membuat temu bual mengenai pandangan anda tentang isu semasa.',
    pilihan: [
      { teks: 'Terima temu bual', kesan: { mediaRelations: 8, popularity: 5, risk: 3 } },
      { teks: 'Tolak dengan sopan', kesan: { mediaRelations: -3 } },
      { teks: 'Hantar kenyataan bertulis', kesan: { mediaRelations: 3, stress: 2 } }
    ]
  },
  {
    id: 'EV006', kategori: 'KEWANGAN', tajuk: 'Peluang Pelaburan',
    desk: 'Rakan anda mencadangkan pelaburan dengan potensi pulangan tinggi, tetapi berisiko.',
    pilihan: [
      { teks: 'Labur RM5,000', kesan: { wang: -5000, investment: 5000, risk: 5 } },
      { teks: 'Labur RM1,000', kesan: { wang: -1000, investment: 1000, risk: 2 } },
      { teks: 'Tolak pelaburan', kesan: { integrity: 1 } }
    ]
  },
  {
    id: 'EV007', kategori: 'KESIHATAN', tajuk: 'Tekanan Kerja Meningkat',
    desk: 'Anda mengalami tekanan kerja yang serius. Kesihatan mula terjejas.',
    pilihan: [
      { teks: 'Ambil cuti rehat', kesan: { stress: -15, gaji: -500 } },
      { teks: 'Teruskan bekerja', kesan: { stress: 8, health: -5 } },
      { teks: 'Dapatkan bantuan profesional', kesan: { wang: -300, stress: -10 } }
    ]
  },
  {
    id: 'EV008', kategori: 'MASYARAKAT', tajuk: 'Program Khidmat Masyarakat',
    desk: 'Komuniti tempatan menganjurkan program gotong-royong. Anda dijemput menyertai.',
    pilihan: [
      { teks: 'Hadir dan bantu', kesan: { grassrootsSupport: 5, popularity: 3, stress: 3 } },
      { teks: 'Sumbang dana (RM500)', kesan: { wang: -500, popularity: 4, integrity: 3 } },
      { teks: 'Tidak dapat hadir', kesan: {} }
    ]
  },
  {
    id: 'EV009', kategori: 'PELUANG', tajuk: 'Tawaran Perniagaan Sampingan',
    desk: 'Seorang kenalan menawarkan peluang perniagaan kecil-kecilan di kawasan anda.',
    pilihan: [
      { teks: 'Terima dan labur RM2,000', kesan: { wang: -2000, business: 2500, stress: 5 } },
      { teks: 'Tolak kerana fokus kerjaya', kesan: {} },
      { teks: 'Cadang perkongsian modal', kesan: { wang: -1000, business: 1200 } }
    ]
  },
  {
    id: 'EV010', kategori: 'INTEGRITI', tajuk: 'Rasuah Ditawarkan',
    desk: 'Seorang kontraktor menawarkan anda wang untuk meluluskan projek tanpa prosedur.',
    pilihan: [
      { teks: 'Tolak dan laporkan', kesan: { integrity: 15, legalRisk: -10, stress: 5 } },
      { teks: 'Tolak secara senyap', kesan: { integrity: 5 } },
      { teks: 'Terima wang', kesan: { wang: 10000, integrity: -30, legalRisk: 25 } }
    ]
  }
];

/* ============ STATE GLOBAL ============ */
let state = null;
let currentTab = 'dashboard';
let settings = {
  bunyi: true,
  muzik: false,
  kesukaran: 'seimbang'
};

/* ============ UTILITI ============ */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function formatRM(amount) {
  const num = Math.round(amount);
  return 'RM' + num.toLocaleString('ms-MY');
}

function formatNum(num) {
  return Math.round(num).toLocaleString('ms-MY');
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch(e) {}
}

function loadSettings() {
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    if (s) settings = { ...settings, ...JSON.parse(s) };
  } catch(e) {}
}

/* ============ TOAST ============ */
let toastTimer = null;
function showToast(msg, type = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast ' + type; }, 2800);
}

/* ============ MODAL ============ */
function openModal(title, bodyHTML, footerHTML = '') {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modalFooter').innerHTML = footerHTML;
  $('#modal').classList.add('open');
}
function closeModal() { $('#modal').classList.remove('open'); }

/* ============ SPLASH ============ */
function initSplash() {
  setTimeout(() => {
    $('#splash').classList.remove('active');
    $('#mainMenu').classList.add('active');
    refreshContinueButton();
  }, 2600);
}

/* ============ MENU UTAMA ============ */
function refreshContinueButton() {
  const auto = localStorage.getItem(SAVE_AUTO_KEY);
  const btn = $('#btnContinueGame');
  const info = $('#continueInfo');
  if (auto) {
    try {
      const data = JSON.parse(auto);
      info.textContent = `${data.player.nama} • ${data.date.label}`;
      btn.disabled = false;
    } catch(e) {
      info.textContent = 'Tiada simpanan';
      btn.disabled = true;
    }
  } else {
    info.textContent = 'Tiada simpanan';
    btn.disabled = true;
  }
}

/* ============ CIPTA WATAK ============ */
function initCreateChar() {
  // Populate states
  const stateSel = $('#inputState');
  stateSel.innerHTML = STATES.map(s => `<option value="${s}">${s}</option>`).join('');

  // Populate careers (hanya yang layak dengan SPM)
  const careerSel = $('#inputCareer');
  const basicCareers = ['Tiada Kerja', 'Pekerja Separuh Masa', 'Pekerja Mahir'];
  careerSel.innerHTML = basicCareers.map(c => `<option value="${c}">${c} (${formatRM(CAREERS[c].gaji)}/bulan)</option>`).join('');

  // Update careers bila education berubah
  $('#inputEducation').addEventListener('change', updateCareerOptions);
  updateCareerOptions();

  // Range politics interest
  $('#inputPoliticsInterest').addEventListener('input', (e) => {
    $('#interestLabel').textContent = e.target.value + ' / 10';
  });

  // Start life
  $('#btnStartLife').addEventListener('click', startNewLife);
}

function updateCareerOptions() {
  const edu = $('#inputEducation').value;
  const eduRank = { 'SPM': 1, 'Diploma': 2, 'Ijazah Sarjana Muda': 3, 'Sarjana': 4, 'PhD': 5 };
  const careerSel = $('#inputCareer');
  const available = Object.keys(CAREERS).filter(k => eduRank[CAREERS[k].kelayakan] <= eduRank[edu]);
  careerSel.innerHTML = available.map(c =>
    `<option value="${c}">${c} (${formatRM(CAREERS[c].gaji)}/bulan)</option>`
  ).join('');
}

function startNewLife() {
  const nama = $('#inputName').value.trim() || 'Pemain';
  const umur = parseInt($('#inputAge').value) || 18;
  const jantina = $('#inputGender').value;
  const negeri = $('#inputState').value;
  const pendidikan = $('#inputEducation').value;
  const latar = $('#inputBackground').value;
  const kerjaya = $('#inputCareer').value;
  const housing = $('#inputHousing').value;
  const matlamat = $('#inputGoal').value;
  const minatPolitik = parseInt($('#inputPoliticsInterest').value);

  const careerData = CAREERS[kerjaya] || CAREERS['Tiada Kerja'];
  const bgMoney = { 'B40': 500, 'M40': 2000, 'T20': 10000 };
  const housingCost = { 'IbuBapa': 0, 'SewaBilik': 450, 'SewaRumah': 1200 };

  state = {
    version: VERSION,
    createdAt: Date.now(),
    player: {
      nama, umur, jantina, negeri, pendidikan, latar, matlamat,
      minatPolitik,
      avatar: nama.charAt(0).toUpperCase(),
      level: 0,
      xp: 0,
      wang: bgMoney[latar],
      tabungan: 0,
      hutang: 0,
      aset: 0,
      career: kerjaya,
      gaji: careerData.gaji,
      stress: 0,
      health: 100,
      // Stats politik
      popularity: 0,
      integrity: 50,
      charisma: 50,
      leadership: 30,
      experience: 0,
      partyInfluence: 0,
      grassrootsSupport: 0,
      mediaRelations: 0,
      publicTrust: 50,
      coalitionStability: 50,
      legalRisk: 0,
      administration: 20,
      negotiation: 30,
      partyRelations: 50,
      youthSupport: 30,
      constituencySupport: 0,
      electionChance: 0,
      allyLoyalty: 50,
      // Politik
      party: null,
      position: null,
      positions: [],
      // Keluarga
      housing: housing,
      pasangan: null,
      anak: 0,
      tanggungan: 0
    },
    date: { year: 2025, month: 0, turn: 1, label: 'Jan 2025' },
    finances: {
      pendapatanBulanan: careerData.gaji,
      perbelanjaanBulanan: housingCost[housing] + 800,
      cashFlow: 0,
      netWorth: 0,
      bil: [],
      transactions: []
    },
    relationships: {},
    eventHistory: [],
    activeEvents: [],
    pendingConsequences: [],
    cooldowns: {},
    flags: {},
    news: [],
    achievements: [],
    activityHistory: []
  };

  // Init relationships
  CHARACTERS.forEach(c => {
    state.relationships[c.id] = {
      score: randomInt(0, 20),
      trust: 10, loyalty: 10, respect: 10,
      memory: []
    };
  });

  // Initial news
  state.news.unshift({
    id: uid(), tarikh: state.date.label,
    tajuk: 'Selamat Datang ke Simulasi',
    kategori: 'UMUM',
    ringkasan: `${nama} memulakan kehidupan pada umur ${umur} di ${negeri}.`,
    status: 'Disahkan dalam dunia simulasi'
  });

  recalcFinances();
  saveGame(true);
  enterGame();
}

/* ============ MASUK PERMAINAN ============ */
function enterGame() {
  $('#createChar').classList.remove('active');
  $('#mainMenu').classList.remove('active');
  $('#game').classList.add('active');
  renderGame();
}

/* ============ RENDER UTAMA ============ */
function renderGame() {
  updateTopbar();
  renderTab();
}

function updateTopbar() {
  if (!state) return;
  const p = state.player;
  $('#topPlayerName').textContent = p.nama.split(' ')[0];
  const levelData = LEVELS[p.level] || LEVELS[0];
  $('#topPlayerStatus').textContent = `Tahap ${p.level} • ${levelData.nama}`;
  $('#topDate').textContent = state.date.label;
  $('#topTurn').textContent = `Giliran ${state.date.turn}`;
  $('#topMoney').textContent = formatRM(p.wang);
  $('#playerAvatar').textContent = p.avatar;
}

function renderTab() {
  const content = $('#gameContent');
  const renderers = {
    dashboard: renderDashboard,
    finance: renderFinance,
    career: renderCareer,
    politics: renderPolitics,
    news: renderNews
  };
  content.innerHTML = '';
  (renderers[currentTab] || renderDashboard)(content);
}

/* ============ TAB: DASHBOARD ============ */
function renderDashboard(el) {
  const p = state.player;
  const levelData = LEVELS[p.level];
  const nextLevel = LEVELS[p.level + 1];
  const xpProgress = nextLevel
    ? ((p.xp - levelData.xp) / (nextLevel.xp - levelData.xp)) * 100
    : 100;

  el.innerHTML = `
    <div class="dash-section">
      <h4>📅 Giliran Semasa — ${state.date.label}</h4>
      <p style="font-size:13px;color:var(--kelabu);">
        Satu giliran = 4 bulan. Tekan butang di bawah untuk teruskan masa.
      </p>
      <div class="action-list mt-16">
        <button class="action-btn primary" data-action="nextTurn">
          <span class="a-icon">⏭️</span>
          <span class="a-text">
            <strong>Teruskan 4 Bulan</strong>
            <small>Proses pendapatan, perbelanjaan & peristiwa</small>
          </span>
        </button>
      </div>
    </div>

    <div class="dash-section">
      <h4>🎯 Kemajuan Kehidupan</h4>
      <div class="stat-grid">
        <div class="stat-item">
          <label>Tahap</label>
          <strong>${p.level} — ${levelData.nama}</strong>
        </div>
        <div class="stat-item">
          <label>XP</label>
          <strong>${formatNum(p.xp)}</strong>
        </div>
      </div>
      <div class="progress-bar mt-8">
        <div class="progress-fill" style="width:${clamp(xpProgress,0,100)}%"></div>
      </div>
      ${nextLevel ? `<small style="font-size:11px;color:var(--kelabu);">${formatNum(p.xp)} / ${formatNum(nextLevel.xp)} XP ke tahap ${nextLevel.lvl}</small>` : '<small style="font-size:11px;color:var(--hijau);">Tahap maksimum dicapai</small>'}
    </div>

    <div class="dash-section">
      <h4>📊 Statistik Utama</h4>
      <div class="stat-grid">
        <div class="stat-item ${p.wang > 5000 ? 'good' : p.wang < 500 ? 'bad' : ''}">
          <label>Wang Tunai</label>
          <strong>${formatRM(p.wang)}</strong>
        </div>
        <div class="stat-item">
          <label>Kerjaya</label>
          <strong>${p.career}</strong>
        </div>
        <div class="stat-item ${p.stress > 70 ? 'bad' : p.stress > 40 ? 'warn' : 'good'}">
          <label>Tekanan</label>
          <strong>${Math.round(p.stress)}%</strong>
        </div>
        <div class="stat-item ${p.integrity > 60 ? 'good' : p.integrity < 40 ? 'bad' : ''}">
          <label>Integriti</label>
          <strong>${Math.round(p.integrity)}</strong>
        </div>
        <div class="stat-item">
          <label>Populariti</label>
          <strong>${Math.round(p.popularity)}</strong>
        </div>
        <div class="stat-item">
          <label>Nilai Bersih</label>
          <strong>${formatRM(state.finances.netWorth)}</strong>
        </div>
      </div>
    </div>

    <div class="dash-section">
      <h4>🏛️ Status Politik</h4>
      ${p.party
        ? `<div class="stat-grid">
            <div class="stat-item">
              <label>Parti</label>
              <strong>${p.party.nama}</strong>
            </div>
            <div class="stat-item">
              <label>Jawatan</label>
              <strong>${p.position || 'Ahli Biasa'}</strong>
            </div>
            <div class="stat-item">
              <label>Pengaruh Parti</label>
              <strong>${Math.round(p.partyInfluence)}</strong>
            </div>
            <div class="stat-item">
              <label>Sokongan Akar Umbi</label>
              <strong>${Math.round(p.grassrootsSupport)}</strong>
            </div>
          </div>`
        : `<p style="font-size:13px;color:var(--kelabu);">Anda belum menyertai mana-mana parti politik. Buka tab <strong>Politik</strong> untuk melihat peluang.</p>`
      }
    </div>
  `;

  // Bind buttons
  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action));
  });
}

/* ============ HANDLE ACTION ============ */
function handleAction(action) {
  switch(action) {
    case 'nextTurn': nextTurn(); break;
  }
}

/* ============ TAB: KEWANGAN ============ */
function renderFinance(el) {
  const f = state.finances;
  const p = state.player;

  el.innerHTML = `
    <div class="dash-section">
      <h4>💰 Ringkasan Kewangan</h4>
      <div class="stat-grid">
        <div class="stat-item good">
          <label>Pendapatan / Bulan</label>
          <strong>${formatRM(f.pendapatanBulanan)}</strong>
        </div>
        <div class="stat-item bad">
          <label>Perbelanjaan / Bulan</label>
          <strong>${formatRM(f.perbelanjaanBulanan)}</strong>
        </div>
        <div class="stat-item ${f.cashFlow >= 0 ? 'good' : 'bad'}">
          <label>Aliran Tunai</label>
          <strong>${formatRM(f.cashFlow)}</strong>
        </div>
        <div class="stat-item">
          <label>Nilai Bersih</label>
          <strong>${formatRM(f.netWorth)}</strong>
        </div>
        <div class="stat-item">
          <label>Wang Tunai</label>
          <strong>${formatRM(p.wang)}</strong>
        </div>
        <div class="stat-item">
          <label>Tabungan</label>
          <strong>${formatRM(p.tabungan)}</strong>
        </div>
        <div class="stat-item ${p.hutang > 0 ? 'warn' : 'good'}">
          <label>Hutang</label>
          <strong>${formatRM(p.hutang)}</strong>
        </div>
        <div class="stat-item">
          <label>Aset</label>
          <strong>${formatRM(p.aset)}</strong>
        </div>
      </div>
    </div>

    <div class="dash-section">
      <h4>📋 Urus Kewangan</h4>
      <div class="action-list">
        <button class="action-btn" data-fin="save">
          <span class="a-icon">🏦</span>
          <span class="a-text"><strong>Pindah ke Tabungan</strong><small>Simpan wang untuk kecemasan</small></span>
        </button>
        <button class="action-btn" data-fin="debt">
          <span class="a-icon">💳</span>
          <span class="a-text"><strong>Bayar Hutang</strong><small>Kurangkan liabiliti</small></span>
        </button>
        <button class="action-btn" data-fin="lifestyle">
          <span class="a-icon">🎚️</span>
          <span class="a-text"><strong>Ubah Gaya Hidup</strong><small>Sesuaikan perbelanjaan bulanan</small></span>
        </button>
        <button class="action-btn" data-fin="housing">
          <span class="a-icon">🏠</span>
          <span class="a-text"><strong>Tukar Tempat Tinggal</strong><small>Kos & keselesaan berbeza</small></span>
        </button>
      </div>
    </div>

    <div class="dash-section">
      <h4>📜 Transaksi Terkini</h4>
      ${f.transactions.length === 0
        ? '<p style="font-size:13px;color:var(--kelabu);">Belum ada transaksi.</p>'
        : `<div style="font-size:12px;">${f.transactions.slice(0,10).map(t => `
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;">
              <span>${t.desk}</span>
              <strong style="color:${t.jumlah >= 0 ? 'var(--hijau)' : 'var(--merah)'}">${t.jumlah >= 0 ? '+' : ''}${formatRM(t.jumlah)}</strong>
            </div>
          `).join('')}</div>`
      }
    </div>
  `;

  el.querySelectorAll('[data-fin]').forEach(btn => {
    btn.addEventListener('click', () => handleFinanceAction(btn.dataset.fin));
  });
}

function handleFinanceAction(action) {
  switch(action) {
    case 'save': modalSaveMoney(); break;
    case 'debt': modalPayDebt(); break;
    case 'lifestyle': modalLifestyle(); break;
    case 'housing': modalHousing(); break;
  }
}

function modalSaveMoney() {
  openModal('Pindah ke Tabungan',
    `<div class="form-group">
      <label>Jumlah untuk disimpan</label>
      <input type="number" id="saveAmount" min="0" max="${state.player.wang}" value="500">
      <small style="font-size:11px;color:var(--kelabu);">Wang tunai semasa: ${formatRM(state.player.wang)}</small>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmSave" style="width:auto;margin:0;">Simpan</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmSave');
    if (btn) btn.onclick = () => {
      const amt = parseInt($('#saveAmount').value) || 0;
      if (amt > 0 && amt <= state.player.wang) {
        state.player.wang -= amt;
        state.player.tabungan += amt;
        recalcFinances();
        saveGame(true);
        closeModal();
        renderGame();
        showToast(`Disimpan ${formatRM(amt)} ke tabungan`, 'success');
      } else {
        showToast('Jumlah tidak sah', 'error');
      }
    };
  }, 50);
}

function modalPayDebt() {
  if (state.player.hutang <= 0) {
    showToast('Tiada hutang untuk dibayar', 'warn');
    return;
  }
  openModal('Bayar Hutang',
    `<div class="form-group">
      <label>Jumlah bayaran</label>
      <input type="number" id="debtAmount" min="0" max="${state.player.hutang}" value="${Math.min(500, state.player.hutang)}">
      <small style="font-size:11px;color:var(--kelabu);">Hutang semasa: ${formatRM(state.player.hutang)}</small>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmDebt" style="width:auto;margin:0;">Bayar</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmDebt');
    if (btn) btn.onclick = () => {
      const amt = parseInt($('#debtAmount').value) || 0;
      if (amt > 0 && amt <= state.player.wang && amt <= state.player.hutang) {
        state.player.wang -= amt;
        state.player.hutang -= amt;
        recalcFinances();
        saveGame(true);
        closeModal();
        renderGame();
        showToast(`Bayar hutang ${formatRM(amt)}`, 'success');
      } else {
        showToast('Jumlah tidak sah', 'error');
      }
    };
  }, 50);
}

function modalLifestyle() {
  const current = state.player.lifestyleLevel || 1;
  openModal('Ubah Gaya Hidup',
    `<div class="form-group">
      <label>Tahap Gaya Hidup</label>
      <select id="lifeLevel">
        <option value="0" ${current==0?'selected':''}>Sederhana (RM500/bulan)</option>
        <option value="1" ${current==1?'selected':''}>Biasa (RM800/bulan)</option>
        <option value="2" ${current==2?'selected':''}>Selesa (RM1,500/bulan)</option>
        <option value="3" ${current==3?'selected':''}>Mewah (RM3,000/bulan)</option>
      </select>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmLife" style="width:auto;margin:0;">Simpan</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmLife');
    if (btn) btn.onclick = () => {
      state.player.lifestyleLevel = parseInt($('#lifeLevel').value);
      recalcFinances();
      saveGame(true);
      closeModal();
      renderGame();
      showToast('Gaya hidup dikemas kini', 'success');
    };
  }, 50);
}

function modalHousing() {
  openModal('Tukar Tempat Tinggal',
    `<div class="form-group">
      <label>Pilihan Tempat Tinggal</label>
      <select id="housingOpt">
        <option value="IbuBapa" ${state.player.housing==='IbuBapa'?'selected':''}>Tinggal bersama ibu bapa (RM0/bulan)</option>
        <option value="SewaBilik" ${state.player.housing==='SewaBilik'?'selected':''}>Menyewa bilik (RM450/bulan)</option>
        <option value="SewaRumah" ${state.player.housing==='SewaRumah'?'selected':''}>Menyewa rumah (RM1,200/bulan)</option>
      </select>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmHouse" style="width:auto;margin:0;">Tukar</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmHouse');
    if (btn) btn.onclick = () => {
      state.player.housing = $('#housingOpt').value;
      recalcFinances();
      saveGame(true);
      closeModal();
      renderGame();
      showToast('Tempat tinggal dikemas kini', 'success');
    };
  }, 50);
}

/* ============ TAB: KERJAYA ============ */
function renderCareer(el) {
  const p = state.player;
  const careerData = CAREERS[p.career] || CAREERS['Tiada Kerja'];

  el.innerHTML = `
    <div class="dash-section">
      <h4>💼 Kerjaya Semasa</h4>
      <div class="stat-grid">
        <div class="stat-item">
          <label>Jawatan</label>
          <strong>${p.career}</strong>
        </div>
        <div class="stat-item">
          <label>Gaji Bulanan</label>
          <strong>${formatRM(p.gaji)}</strong>
        </div>
        <div class="stat-item">
          <label>Jam / Minggu</label>
          <strong>${careerData.jam} jam</strong>
        </div>
        <div class="stat-item ${p.stress > 60 ? 'bad' : 'good'}">
          <label>Tekanan</label>
          <strong>${Math.round(p.stress)}%</strong>
        </div>
        <div class="stat-item">
          <label>Pengalaman</label>
          <strong>${formatNum(p.experience)}</strong>
        </div>
        <div class="stat-item">
          <label>Kesihatan</label>
          <strong>${Math.round(p.health)}%</strong>
        </div>
      </div>
    </div>

    <div class="dash-section">
      <h4>🎯 Tindakan Kerjaya</h4>
      <div class="action-list">
        <button class="action-btn" data-career="change">
          <span class="a-icon">🔄</span>
          <span class="a-text"><strong>Tukar Kerjaya</strong><small>Cari peluang pekerjaan baharu</small></span>
        </button>
        <button class="action-btn" data-career="training">
          <span class="a-icon">📚</span>
          <span class="a-text"><strong>Latihan / Kursus</strong><small>Tingkatkan kemahiran (RM500)</small></span>
        </button>
        <button class="action-btn" data-career="rest">
          <span class="a-icon">🛌</span>
          <span class="a-text"><strong>Berehat</strong><small>Kurangkan tekanan (kos gaji)</small></span>
        </button>
      </div>
    </div>

    <div class="dash-section">
      <h4>📈 Senarai Kerjaya Tersedia</h4>
      <div style="font-size:12px;">
        ${Object.entries(CAREERS).map(([name, data]) => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;">
            <span>${name}</span>
            <strong>${formatRM(data.gaji)}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  el.querySelectorAll('[data-career]').forEach(btn => {
    btn.addEventListener('click', () => handleCareerAction(btn.dataset.career));
  });
}

function handleCareerAction(action) {
  switch(action) {
    case 'change': modalChangeCareer(); break;
    case 'training':
      if (state.player.wang >= 500) {
        state.player.wang -= 500;
        state.player.experience += 10;
        state.player.charisma = clamp(state.player.charisma + 2, 0, 100);
        addTransaction('Latihan/Kursus', -500);
        saveGame(true);
        renderGame();
        showToast('Latihan selesai! +10 XP pengalaman', 'success');
      } else showToast('Wang tidak mencukupi', 'error');
      break;
    case 'rest':
      state.player.stress = clamp(state.player.stress - 15, 0, 100);
      state.player.health = clamp(state.player.health + 5, 0, 100);
      saveGame(true);
      renderGame();
      showToast('Anda berasa lebih segar', 'success');
      break;
  }
}

function modalChangeCareer() {
  const options = Object.keys(CAREERS).map(c =>
    `<option value="${c}">${c} — ${formatRM(CAREERS[c].gaji)}/bulan</option>`
  ).join('');
  openModal('Tukar Kerjaya',
    `<div class="form-group">
      <label>Pilih Kerjaya Baharu</label>
      <select id="newCareer">${options}</select>
      <small style="font-size:11px;color:var(--kelabu);">Pertukaran kerjaya mungkin memerlukan kelayakan dan masa.</small>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmCareer" style="width:auto;margin:0;">Mohon</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmCareer');
    if (btn) btn.onclick = () => {
      const newJob = $('#newCareer').value;
      const eduRank = { 'SPM': 1, 'Diploma': 2, 'Ijazah Sarjana Muda': 3, 'Sarjana': 4, 'PhD': 5 };
      if (eduRank[CAREERS[newJob].kelayakan] > eduRank[state.player.pendidikan]) {
        showToast('Kelayakan tidak mencukupi', 'error');
        return;
      }
      // Peluang berdasarkan pengalaman
      const chance = clamp(30 + state.player.experience * 2 + state.player.charisma * 0.3, 10, 90);
      if (Math.random() * 100 < chance) {
        state.player.career = newJob;
        state.player.gaji = CAREERS[newJob].gaji;
        addTransaction(`Tukar kerja ke ${newJob}`, 0);
        recalcFinances();
        saveGame(true);
        closeModal();
        renderGame();
        showToast(`Berjaya! Kerjaya baharu: ${newJob}`, 'success');
      } else {
        closeModal();
        showToast('Permohonan tidak berjaya', 'error');
      }
    };
  }, 50);
}