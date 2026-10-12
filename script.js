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
/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS
   Bahagian 2: Politik, Berita, Giliran, Peristiwa, Simpan/Muat, Init
   ============================================================ */

/* ============ TAB: POLITIK ============ */
function renderPolitics(el) {
  const p = state.player;

  // Belum sertai parti
  if (!p.party) {
    el.innerHTML = `
      <div class="dash-section">
        <h4>🏛️ Peluang Anda Memasuki Dunia Politik Malaysia</h4>
        <p style="font-size:13px;color:var(--kelabu);line-height:1.6;">
          Anda belum menyertai mana-mana parti politik. Menyertai parti membuka peluang
          untuk bertanding dalam pilihan raya dan berkhidmat kepada masyarakat.
        </p>
        <div class="action-list mt-16">
          <button class="action-btn primary" data-pol="join">
            <span class="a-icon">🤝</span>
            <span class="a-text"><strong>Sertai Parti Politik</strong><small>Pilih parti yang sesuai</small></span>
          </button>
          <button class="action-btn" data-pol="volunteer">
            <span class="a-icon">🙋</span>
            <span class="a-text"><strong>Jadi Sukarelawan Masyarakat</strong><small>Bina reputasi tanpa parti</small></span>
          </button>
        </div>
      </div>

      <div class="dash-section">
        <h4>📋 Senarai Parti Tersedia</h4>
        <div style="font-size:12px;">
          ${PARTIES.map(pt => `
            <div style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
              <strong>${pt.singkatan}</strong> — ${pt.nama}
              <br><small style="color:var(--kelabu);">Ideologi: ${pt.ideologi}</small>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // Sudah sertai parti
    el.innerHTML = `
      <div class="dash-section">
        <h4>🏛️ Parti Anda</h4>
        <div class="stat-grid">
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
          <div class="stat-item">
            <label>Populariti</label>
            <strong>${Math.round(p.popularity)}</strong>
          </div>
          <div class="stat-item">
            <label>Kepercayaan Awam</label>
            <strong>${Math.round(p.publicTrust)}</strong>
          </div>
        </div>
      </div>

      <div class="dash-section">
        <h4>🎯 Tindakan Politik</h4>
        <div class="action-list">
          <button class="action-btn" data-pol="campaign">
            <span class="a-icon">📢</span>
            <span class="a-text"><strong>Kempen Parti</strong><small>Tingkatkan sokongan akar umbi</small></span>
          </button>
          <button class="action-btn" data-pol="meeting">
            <span class="a-icon">👥</span>
            <span class="a-text"><strong>Hadiri Mesyuarat Parti</strong><small>Bina hubungan dalaman</small></span>
          </button>
          <button class="action-btn gold" data-pol="election">
            <span class="a-icon">🗳️</span>
            <span class="a-text"><strong>Sertai Pilihan Raya</strong><small>${p.level >= 5 ? 'Anda layak bertanding' : 'Perlu tahap 5+'}</small></span>
          </button>
          <button class="action-btn" data-pol="leave">
            <span class="a-icon">🚪</span>
            <span class="a-text"><strong>Tinggalkan Parti</strong><small>Keluar dari keahlian semasa</small></span>
          </button>
        </div>
      </div>

      <div class="dash-section">
        <h4>👥 Hubungan Watak Utama</h4>
        <div style="font-size:12px;">
          ${CHARACTERS.slice(0, 8).map(c => {
            const rel = state.relationships[c.id];
            const cls = rel.score > 40 ? 'good' : rel.score < -20 ? 'bad' : '';
            return `
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;">
                <span>${c.emoji} ${c.nama}</span>
                <strong class="${cls}">${rel.score > 0 ? '+' : ''}${rel.score}</strong>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  el.querySelectorAll('[data-pol]').forEach(btn => {
    btn.addEventListener('click', () => handlePoliticsAction(btn.dataset.pol));
  });
}

function handlePoliticsAction(action) {
  const p = state.player;
  switch(action) {
    case 'join': modalJoinParty(); break;
    case 'volunteer':
      p.grassrootsSupport = clamp(p.grassrootsSupport + 3, 0, 100);
      p.popularity = clamp(p.popularity + 2, 0, 100);
      p.xp += 15;
      addXP(15);
      checkLevelUp();
      saveGame(true);
      renderGame();
      showToast('Anda menyertai aktiviti sukarelawan', 'success');
      break;
    case 'campaign':
      if (p.wang < 200) { showToast('Perlu sekurang-kurangnya RM200', 'error'); return; }
      p.wang -= 200;
      addTransaction('Kempen Parti', -200);
      const gain = randomInt(3, 8);
      p.grassrootsSupport = clamp(p.grassrootsSupport + gain, 0, 100);
      p.popularity = clamp(p.popularity + Math.floor(gain / 2), 0, 100);
      p.xp += 20;
      addXP(20);
      checkLevelUp();
      saveGame(true);
      renderGame();
      showToast(`Kempen berjaya! +${gain} sokongan akar umbi`, 'success');
      break;
    case 'meeting':
      p.partyInfluence = clamp(p.partyInfluence + 4, 0, 100);
      // Peluang baik hubungan dengan watak
      const char = pickRandom(CHARACTERS);
      state.relationships[char.id].score = clamp(state.relationships[char.id].score + 5, -100, 100);
      state.relationships[char.id].memory.push(`Berjumpa pada mesyuarat (${state.date.label})`);
      p.xp += 10;
      addXP(10);
      checkLevelUp();
      saveGame(true);
      renderGame();
      showToast(`Berjumpa ${char.nama} — hubungan bertambah baik`, 'success');
      break;
    case 'election': modalElection(); break;
    case 'leave':
      openModal('Tinggalkan Parti',
        `<p>Adakah anda pasti mahu meninggalkan ${p.party.nama}? Semua pengaruh dalam parti akan hilang.</p>`,
        `<button class="btn-secondary" onclick="closeModal()">Batal</button>
         <button class="btn-danger" id="confirmLeave">Ya, Tinggalkan</button>`
      );
      setTimeout(() => {
        const btn = $('#confirmLeave');
        if (btn) btn.onclick = () => {
          p.party = null;
          p.position = null;
          p.partyInfluence = 0;
          p.grassrootsSupport = Math.floor(p.grassrootsSupport / 2);
          saveGame(true);
          closeModal();
          renderGame();
          showToast('Anda telah meninggalkan parti', 'warn');
        };
      }, 50);
      break;
  }
}

function modalJoinParty() {
  const options = PARTIES.map(pt =>
    `<option value="${pt.id}">${pt.singkatan} — ${pt.nama} (${pt.ideologi})</option>`
  ).join('');
  openModal('Sertai Parti Politik',
    `<div class="form-group">
      <label>Pilih Parti</label>
      <select id="selectParty">${options}</select>
      <small style="font-size:11px;color:var(--kelabu);">
        Semua parti di atas adalah parti simulasi fiksyen.
      </small>
    </div>
    <p style="font-size:12px;color:var(--kelabu);margin-top:12px;">
      Penyertaan parti tidak menjamin jawatan. Anda perlu membina reputasi dari bawah.
    </p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmJoin" style="width:auto;margin:0;">Sertai</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmJoin');
    if (btn) btn.onclick = () => {
      const id = $('#selectParty').value;
      const party = PARTIES.find(x => x.id === id);
      state.player.party = party;
      state.player.position = 'Ahli Biasa';
      state.player.xp += 30;
      addXP(30);
      checkLevelUp();
      saveGame(true);
      closeModal();
      renderGame();
      showToast(`Anda kini ahli ${party.singkatan}`, 'success');
    };
  }, 50);
}

function modalElection() {
  const p = state.player;
  if (p.level < 5) {
    showToast('Perlu tahap 5 atau lebih untuk bertanding', 'warn');
    return;
  }
  const jenis = p.level >= 10 ? ['DUN', 'Parlimen'] : ['DUN'];
  const jenisOpt = jenis.map(j => `<option value="${j}">${j}</option>`).join('');

  openModal('Sertai Pilihan Raya',
    `<div class="form-group">
      <label>Jenis Pilihan Raya</label>
      <select id="electionType">${jenisOpt}</select>
    </div>
    <div class="form-group">
      <label>Kod / Nama Kawasan (Simulasi)</label>
      <input type="text" id="electionArea" placeholder="Contoh: P.001 atau N.01" value="N.01">
    </div>
    <p style="font-size:12px;color:var(--kelabu);">
      Anggaran peluang kemenangan dinilai berdasarkan sokongan akar umbi, populariti dan reputasi.
    </p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmElection" style="width:auto;margin:0;">Bertanding</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmElection');
    if (btn) btn.onclick = () => {
      const jenis = $('#electionType').value;
      const kawasan = $('#electionArea').value || 'N.01';
      // Kira peluang kemenangan
      const chance = clamp(
        20 + p.grassrootsSupport * 0.3 + p.popularity * 0.3 + p.partyInfluence * 0.2,
        5, 90
      );
      const roll = Math.random() * 100;
      const menang = roll < chance;

      if (menang) {
        p.position = jenis === 'Parlimen' ? 'Ahli Parlimen' : 'ADUN';
        p.constituencySupport = clamp(p.constituencySupport + 20, 0, 100);
        p.xp += 200;
        addXP(200);
        checkLevelUp();
        addNews(`${p.nama} memenangi kerusi ${jenis} ${kawasan}`,
                'Menang dalam simulasi pilihan raya',
                'POLITIK');
        saveGame(true);
        closeModal();
        renderGame();
        openModal('🎉 Kemenangan!',
          `<p style="font-size:15px;color:var(--hijau);font-weight:600;">Tahniah!</p>
           <p>Anda memenangi kerusi <strong>${jenis} ${kawasan}</strong> dalam dunia simulasi.</p>
           <p>Jawatan baharu: <strong>${p.position}</strong></p>`,
          `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">Terima</button>`
        );
      } else {
        p.popularity = clamp(p.popularity - 5, 0, 100);
        p.xp += 50;
        addXP(50);
        addNews(`${p.nama} tewas di ${kawasan}`,
                'Keputusan simulasi pilihan raya',
                'POLITIK');
        saveGame(true);
        closeModal();
        renderGame();
        openModal('Keputusan Pilihan Raya',
          `<p style="color:var(--merah);font-weight:600;">Anda tidak berjaya kali ini.</p>
           <p>Jangan putus asa — bina semula sokongan dan cuba lagi.</p>
           <p style="font-size:12px;color:var(--kelabu);">Peluang anda: ${Math.round(chance)}%</p>`,
          `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">OK</button>`
        );
      }
    };
  }, 50);
}

/* ============ TAB: BERITA ============ */
function renderNews(el) {
  el.innerHTML = `
    <div class="dash-section">
      <h4>📰 Pusat Berita Simulasi</h4>
      <p style="font-size:12px;color:var(--kelabu);">
        Semua berita di bawah adalah <strong>berita simulasi fiksyen</strong> — bukan berita sebenar.
      </p>
    </div>

    <div class="dash-section">
      <h4>📋 Berita Terkini</h4>
      ${state.news.length === 0
        ? '<p style="font-size:13px;color:var(--kelabu);">Belum ada berita.</p>'
        : state.news.slice(0, 20).map(n => `
          <div style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
            <span style="font-size:10px;background:var(--biru-muda);color:#fff;padding:2px 8px;border-radius:10px;">${n.kategori}</span>
            <strong style="display:block;margin:6px 0 4px;font-size:14px;color:var(--biru-gelap);">${n.tajuk}</strong>
            <p style="font-size:12px;color:var(--kelabu);margin-bottom:4px;">${n.ringkasan}</p>
            <small style="font-size:10px;color:var(--kelabu);">${n.tarikh} • ${n.status}</small>
          </div>
        `).join('')
      }
    </div>
  `;
}

function addNews(tajuk, ringkasan, kategori = 'UMUM') {
  state.news.unshift({
    id: uid(),
    tarikh: state.date.label,
    tajuk,
    ringkasan,
    kategori,
    status: 'Disahkan dalam dunia simulasi'
  });
  if (state.news.length > 100) state.news = state.news.slice(0, 100);
}

/* ============ SISTEM GILIRAN ============ */
function nextTurn() {
  // Proses 4 bulan
  for (let i = 0; i < 4; i++) {
    processMonth();
  }

  // Majukan kalendar
  state.date.month += 4;
  while (state.date.month >= 12) {
    state.date.month -= 12;
    state.date.year += 1;
  }
  state.date.turn += 1;
  state.date.label = getMonthLabel(state.date.month) + ' ' + state.date.year;

  state.player.umur += (state.date.turn % 3 === 0) ? 1 : 0;

  // Periksa peristiwa rawak
  maybeTriggerEvent();

  // Auto-save
  saveGame(true);

  renderGame();

  showToast(`Giliran ${state.date.turn} — ${state.date.label}`, 'success');
}

function getMonthLabel(m) {
  const bulan = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
  return bulan[m] || 'Jan';
}

function processMonth() {
  const p = state.player;
  const f = state.finances;

  // Pendapatan
  const income = p.gaji;
  p.wang += income;
  f.transactions.unshift({
    tarikh: state.date.label,
    desk: `Gaji — ${p.career}`,
    jumlah: income
  });

  // Perbelanjaan
  const expense = f.perbelanjaanBulanan;
  p.wang -= expense;
  f.transactions.unshift({
    tarikh: state.date.label,
    desk: 'Perbelanjaan bulanan',
    jumlah: -expense
  });

  // Bayaran hutang (jika ada)
  if (p.hutang > 0) {
    const bayar = Math.min(200, p.hutang, p.wang);
    if (bayar > 0) {
      p.wang -= bayar;
      p.hutang -= bayar;
      f.transactions.unshift({
        tarikh: state.date.label,
        desk: 'Bayaran hutang',
        jumlah: -bayar
      });
    }
  }

  // Stress berkurang sedikit jika wang cukup
  if (p.wang > 2000) {
    p.stress = clamp(p.stress - 2, 0, 100);
  } else if (p.wang < 0) {
    p.stress = clamp(p.stress + 5, 0, 100);
    p.health = clamp(p.health - 2, 0, 100);
  }

  // Simpan sejarah
  state.activityHistory.unshift({
    tarikh: state.date.label,
    desk: `Giliran diproses — pendapatan ${formatRM(income)}, perbelanjaan ${formatRM(expense)}`
  });
  if (state.activityHistory.length > 200) state.activityHistory = state.activityHistory.slice(0, 200);
}

function addTransaction(desk, jumlah) {
  state.finances.transactions.unshift({
    tarikh: state.date.label,
    desk,
    jumlah
  });
  if (state.finances.transactions.length > 100) {
    state.finances.transactions = state.finances.transactions.slice(0, 100);
  }
}

function recalcFinances() {
  const p = state.player;
  const f = state.finances;

  f.pendapatanBulanan = p.gaji;
  const housing = { 'IbuBapa': 0, 'SewaBilik': 450, 'SewaRumah': 1200 };
  const lifestyle = [500, 800, 1500, 3000];
  const lifeCost = lifestyle[p.lifestyleLevel || 1];
  f.perbelanjaanBulanan = (housing[p.housing] || 0) + lifeCost;
  f.cashFlow = f.pendapatanBulanan - f.perbelanjaanBulanan;
  f.netWorth = p.wang + p.tabungan + p.aset - p.hutang;
}

/* ============ SISTEM XP DAN TAHAP ============ */
function addXP(amount) {
  state.player.xp += amount;
}

function checkLevelUp() {
  const p = state.player;
  let newLevel = p.level;
  while (newLevel < LEVELS.length - 1 && p.xp >= LEVELS[newLevel + 1].xp) {
    newLevel++;
  }
  if (newLevel > p.level) {
    p.level = newLevel;
    addNews(`${p.nama} naik ke Tahap ${newLevel} — ${LEVELS[newLevel].nama}`,
            'Kemajuan kehidupan simulasi',
            'UMUM');
    showToast(`🎉 Naik Tahap ${newLevel}: ${LEVELS[newLevel].nama}`, 'success');
  }
}

/* ============ SISTEM PERISTIWA ============ */
function maybeTriggerEvent() {
  // 40% peluang peristiwa setiap giliran
  if (Math.random() > 0.4) return;

  // Filter peristiwa yang tidak dalam cooldown
  const available = EVENTS.filter(ev => {
    const cd = state.cooldowns[ev.id];
    return !cd || state.date.turn - cd >= 3;
  });

  if (available.length === 0) return;

  const event = pickRandom(available);
  showEvent(event);
}

function showEvent(event) {
  const evModal = $('#eventModal');
  $('#eventCategory').textContent = event.kategori;
  $('#eventTitle').textContent = event.tajuk;
  $('#eventBody').innerHTML = `<p>${event.desk}</p>`;

  const choicesEl = $('#eventChoices');
  choicesEl.innerHTML = event.pilihan.map((p, idx) =>
    `<button class="event-choice" data-idx="${idx}">
      <strong>${p.teks}</strong>
      ${describeKesan(p.kesan)}
    </button>`
  ).join('');

  choicesEl.querySelectorAll('.event-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      applyEventChoice(event, event.pilihan[idx]);
      evModal.classList.remove('open');
    });
  });

  evModal.classList.add('open');
}

function describeKesan(kesan) {
  const parts = [];
  if (kesan.wang) parts.push(`Wang ${kesan.wang > 0 ? '+' : ''}${formatRM(kesan.wang)}`);
  if (kesan.stress) parts.push(`Tekanan ${kesan.stress > 0 ? '+' : ''}${kesan.stress}`);
  if (kesan.integrity) parts.push(`Integriti ${kesan.integrity > 0 ? '+' : ''}${kesan.integrity}`);
  if (kesan.popularity) parts.push(`Populariti ${kesan.popularity > 0 ? '+' : ''}${kesan.popularity}`);
  if (kesan.mediaRelations) parts.push(`Media ${kesan.mediaRelations > 0 ? '+' : ''}${kesan.mediaRelations}`);
  if (kesan.grassrootsSupport) parts.push(`Akar Umbi +${kesan.grassrootsSupport}`);
  if (kesan.legalRisk) parts.push(`Risiko Undang-undang ${kesan.legalRisk > 0 ? '+' : ''}${kesan.legalRisk}`);
  if (kesan.experience) parts.push(`Pengalaman +${kesan.experience}`);
  if (kesan.charisma) parts.push(`Karisma +${kesan.charisma}`);
  if (kesan.negotiation) parts.push(`Rundingan +${kesan.negotiation}`);
  if (kesan.family) parts.push(`Keluarga +${kesan.family}`);
  if (kesan.health) parts.push(`Kesihatan ${kesan.health > 0 ? '+' : ''}${kesan.health}`);
  if (kesan.gaji) parts.push(`Gaji +${formatRM(kesan.gaji)}`);
  if (kesan.joinParty) parts.push('Menyertai parti');
  if (!parts.length) return '';
  return `<small>${parts.join(' • ')}</small>`;
}

function applyEventChoice(event, choice) {
  const p = state.player;
  const k = choice.kesan || {};

  if (k.wang) {
    p.wang += k.wang;
    addTransaction(`Peristiwa: ${event.tajuk}`, k.wang);
  }
  if (k.stress) p.stress = clamp(p.stress + k.stress, 0, 100);
  if (k.integrity) p.integrity = clamp(p.integrity + k.integrity, 0, 100);
  if (k.popularity) p.popularity = clamp(p.popularity + k.popularity, 0, 100);
  if (k.charisma) p.charisma = clamp(p.charisma + k.charisma, 0, 100);
  if (k.mediaRelations) p.mediaRelations = clamp(p.mediaRelations + k.mediaRelations, 0, 100);
  if (k.grassrootsSupport) p.grassrootsSupport = clamp(p.grassrootsSupport + k.grassrootsSupport, 0, 100);
  if (k.legalRisk) p.legalRisk = clamp(p.legalRisk + k.legalRisk, 0, 100);
  if (k.experience) p.experience += k.experience;
  if (k.negotiation) p.negotiation = clamp(p.negotiation + k.negotiation, 0, 100);
  if (k.health) p.health = clamp(p.health + k.health, 0, 100);
  if (k.gaji) {
    p.gaji += k.gaji;
    state.finances.pendapatanBulanan = p.gaji;
  }
  if (k.joinParty && !p.party) {
    p.party = PARTIES[0];
    p.position = 'Ahli Biasa';
  }

  // Cooldown
  state.cooldowns[event.id] = state.date.turn;

  // Rekod
  state.eventHistory.unshift({
    id: event.id,
    tarikh: state.date.label,
    pilihan: choice.teks
  });
  if (state.eventHistory.length > 100) state.eventHistory = state.eventHistory.slice(0, 100);

  // Berita
  addNews(`Peristiwa: ${event.tajuk}`, `Pilihan: ${choice.teks}`, 'UMUM');

  recalcFinances();
  saveGame(true);
  renderGame();
  showToast('Peristiwa selesai', 'success');
}

/* ============ SIMPAN / MUAT ============ */
function saveGame(auto = false) {
  if (!state) return;
  try {
    const data = JSON.stringify(state);
    if (auto) {
      localStorage.setItem(SAVE_AUTO_KEY, data);
    } else {
      const slot = SAVE_KEY_PREFIX + uid();
      localStorage.setItem(slot, data);
    }
  } catch(e) {
    console.error('Save error', e);
  }
}

function loadGame(slotKey) {
  try {
    const data = localStorage.getItem(slotKey);
    if (!data) { showToast('Simpanan tidak dijumpai', 'error'); return false; }
    state = JSON.parse(data);
    enterGame();
    showToast('Permainan dimuatkan', 'success');
    return true;
  } catch(e) {
    showToast('Simpanan rosak', 'error');
    return false;
  }
}

function listSaves() {
  const saves = [];
  const auto = localStorage.getItem(SAVE_AUTO_KEY);
  if (auto) {
    try {
      const d = JSON.parse(auto);
      saves.push({ key: SAVE_AUTO_KEY, label: `Auto — ${d.player.nama} (${d.date.label})` });
    } catch(e) {}
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(SAVE_KEY_PREFIX)) {
      try {
        const d = JSON.parse(localStorage.getItem(key));
        saves.push({ key, label: `${d.player.nama} (${d.date.label})` });
      } catch(e) {}
    }
  }
  return saves;
}

/* ============ PANEL SISI ============ */
function openSidePanel() {
  if (!state) return;
  const sp = $('#sideProfile');
  const p = state.player;
  sp.innerHTML = `
    <div class="big-avatar">${p.avatar}</div>
    <h4>${p.nama}</h4>
    <p>Umur ${p.umur} • ${p.negeri}</p>
    <p style="margin-top:6px;">Tahap ${p.level} — ${LEVELS[p.level].nama}</p>
    <p style="margin-top:4px;color:var(--biru-muda);font-weight:600;">${formatRM(p.wang)}</p>
  `;
  $('#sidePanel').classList.add('open');
}
function closeSidePanel() { $('#sidePanel').classList.remove('open'); }

function handleSideAction(action) {
  closeSidePanel();
  switch(action) {
    case 'save':
      saveGame(false);
      showToast('Permainan disimpan', 'success');
      break;
    case 'load':
      modalLoadList();
      break;
    case 'stats': modalFullStats(); break;
    case 'relationships': modalRelationships(); break;
    case 'history': modalHistory(); break;
    case 'achievements': modalAchievements(); break;
    case 'settings': modalSettings(); break;
    case 'retire': confirmRetire(); break;
    case 'quit': confirmQuit(); break;
  }
}

function modalLoadList() {
  const saves = listSaves();
  if (saves.length === 0) {
    showToast('Tiada simpanan', 'warn');
    return;
  }
  openModal('Muatkan Permainan',
    `<div style="display:flex;flex-direction:column;gap:8px;">
      ${saves.map(s => `
        <button class="action-btn" data-savekey="${s.key}">
          <span class="a-icon">💾</span>
          <span class="a-text"><strong>${s.label}</strong></span>
        </button>
      `).join('')}
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
  setTimeout(() => {
    $$('#modalBody [data-savekey]').forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.savekey;
        closeModal();
        loadGame(key);
      };
    });
  }, 50);
}

function modalFullStats() {
  const p = state.player;
  const stats = [
    ['Populariti', p.popularity],
    ['Integriti', p.integrity],
    ['Karisma', p.charisma],
    ['Kepimpinan', p.leadership],
    ['Pengalaman', p.experience],
    ['Pengaruh Parti', p.partyInfluence],
    ['Sokongan Akar Umbi', p.grassrootsSupport],
    ['Hubungan Media', p.mediaRelations],
    ['Kepercayaan Awam', p.publicTrust],
    ['Rundingan', p.negotiation],
    ['Sokongan Belia', p.youthSupport],
    ['Sokongan Kawasan', p.constituencySupport],
    ['Kesetiaan Sekutu', p.allyLoyalty],
    ['Risiko Undang-undang', p.legalRisk],
    ['Tekanan', p.stress],
    ['Kesihatan', p.health]
  ];
  openModal('📊 Statistik Penuh',
    `<div style="font-size:12px;">
      ${stats.map(([k, v]) => `
        <div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
            <span>${k}</span>
            <strong>${Math.round(v)}</strong>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${clamp(v,0,100)}%"></div>
          </div>
        </div>
      `).join('')}
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

function modalRelationships() {
  openModal('👥 Hubungan Watak',
    `<div style="font-size:12px;">
      ${CHARACTERS.map(c => {
        const r = state.relationships[c.id];
        const cls = r.score > 40 ? 'text-good' : r.score < -20 ? 'text-bad' : '';
        return `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;">
            <div>
              <strong>${c.emoji} ${c.nama}</strong>
              <br><small style="color:var(--kelabu);">${c.peranan}</small>
            </div>
            <strong class="${cls}">${r.score > 0 ? '+' : ''}${r.score}</strong>
          </div>
        `;
      }).join('')}
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

function modalHistory() {
  openModal('📜 Sejarah Aktiviti',
    `${state.activityHistory.length === 0
      ? '<p>Belum ada sejarah.</p>'
      : `<div style="font-size:12px;">
          ${state.activityHistory.slice(0, 40).map(h => `
            <div style="padding:6px 0;border-bottom:1px solid #f0f0f0;">
              <small style="color:var(--kelabu);">${h.tarikh}</small><br>
              ${h.desk}
            </div>
          `).join('')}
        </div>`
    }`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

function modalAchievements() {
  const a = state.achievements || [];
  openModal('🏆 Pencapaian',
    a.length === 0
      ? '<p style="color:var(--kelabu);">Belum ada pencapaian.</p>'
      : `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

function modalSettings() {
  openModal('⚙️ Tetapan',
    `<div class="form-group">
      <label>Tahap Kesukaran</label>
      <select id="setDiff">
        <option value="santai" ${settings.kesukaran==='santai'?'selected':''}>Santai</option>
        <option value="seimbang" ${settings.kesukaran==='seimbang'?'selected':''}>Seimbang</option>
        <option value="mencabar" ${settings.kesukaran==='mencabar'?'selected':''}>Mencabar</option>
      </select>
    </div>
    <div class="form-group">
      <label><input type="checkbox" id="setSound" ${settings.bunyi?'checked':''}> Bunyi</label>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>
     <button class="btn-primary" id="saveSettingsBtn" style="width:auto;margin:0;">Simpan</button>`
  );
  setTimeout(() => {
    const btn = $('#saveSettingsBtn');
    if (btn) btn.onclick = () => {
      settings.kesukaran = $('#setDiff').value;
      settings.bunyi = $('#setSound').checked;
      saveSettings();
      closeModal();
      showToast('Tetapan disimpan', 'success');
    };
  }, 50);
}

function confirmRetire() {
  openModal('Bersara & Laporan Akhir',
    `<p>Adakah anda pasti mahu menamatkan simulasi ini dan melihat laporan akhir?</p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmRetire">Ya, Bersara</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmRetire');
    if (btn) btn.onclick = () => {
      closeModal();
      showFinalReport();
    };
  }, 50);
}

function confirmQuit() {
  openModal('Keluar ke Menu',
    `<p>Adakah anda mahu keluar ke menu utama? Permainan akan disimpan secara automatik.</p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmQuit">Ya, Keluar</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmQuit');
    if (btn) btn.onclick = () => {
      saveGame(true);
      closeModal();
      $('#game').classList.remove('active');
      $('#mainMenu').classList.add('active');
      refreshContinueButton();
    };
  }, 50);
}

function showFinalReport() {
  const p = state.player;
  const f = state.finances;
  const html = `
    <h4>Ringkasan Kehidupan</h4>
    <p><strong>Nama:</strong> ${p.nama}<br>
    <strong>Umur:</strong> ${p.umur} tahun<br>
    <strong>Negeri:</strong> ${p.negeri}</p>

    <h4>Kerjaya</h4>
    <p>Kerjaya terakhir: <strong>${p.career}</strong><br>
    Gaji: ${formatRM(p.gaji)}/bulan<br>
    Tahap: <strong>${p.level} — ${LEVELS[p.level].nama}</strong></p>

    <h4>Kewangan</h4>
    <p>Wang tunai: ${formatRM(p.wang)}<br>
    Tabungan: ${formatRM(p.tabungan)}<br>
    Hutang: ${formatRM(p.hutang)}<br>
    Nilai bersih: <strong>${formatRM(f.netWorth)}</strong></p>

    <h4>Politik</h4>
    <p>Parti: ${p.party ? p.party.nama : 'Tiada'}<br>
    Jawatan: ${p.position || 'Tiada'}<br>
    Populariti: ${Math.round(p.popularity)}<br>
    Integriti: ${Math.round(p.integrity)}</p>

    <h4>Statistik Permainan</h4>
    <p>Giliran dimainkan: ${state.date.turn}<br>
    Peristiwa dilalui: ${state.eventHistory.length}<br>
    Berita direkod: ${state.news.length}</p>
  `;
  openModal('📜 Laporan Akhir Kehidupan', html,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>
     <button class="btn-primary" id="reportSave" style="width:auto;margin:0;">Simpan & Keluar</button>`
  );
  setTimeout(() => {
    const btn = $('#reportSave');
    if (btn) btn.onclick = () => {
      saveGame(true);
      closeModal();
      $('#game').classList.remove('active');
      $('#mainMenu').classList.add('active');
      refreshContinueButton();
    };
  }, 50);
}

/* ============ GUIDE, CREDITS ============ */
function showGuide() {
  openModal('📖 Panduan Bermain',
    `<h4>Asas Permainan</h4>
    <ul>
      <li>Satu giliran = 4 bulan simulasi.</li>
      <li>Setiap bulan, pendapatan & perbelanjaan diproses.</li>
      <li>Wang peribadi, parti, kempen dan kerajaan diasingkan.</li>
    </ul>
    <h4>Kemajuan</h4>
    <ul>
      <li>Kumpul XP melalui tindakan & peristiwa.</li>
      <li>Naik tahap membuka peluang politik.</li>
      <li>Anda boleh berjaya tanpa menyertai politik.</li>
    </ul>
    <h4>Pilihan Raya</h4>
    <ul>
      <li>Perlu tahap 5+ untuk bertanding.</li>
      <li>Kemenangan bergantung pada sokongan, populariti & reputasi.</li>
      <li>Kalah bukan penamat — cuba lagi.</li>
    </ul>
    <h4>Nota Penting</h4>
    <p style="font-size:12px;color:var(--kelabu);">
      Semua parti, watak dan berita dalam permainan ini adalah <strong>fiksyen simulasi</strong>.
      Ia bukan gambaran individu, parti atau peristiwa sebenar.
    </p>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

function showCredits() {
  openModal('ℹ️ Kredit',
    `<p><strong>Simulator Parti Politik Malaysia</strong><br>Versi ${VERSION}</p>
    <p>Sebuah permainan simulasi fiksyen.</p>
    <h4>Penafian</h4>
    <p style="font-size:12px;color:var(--kelabu);">
      Semua watak, parti, berita dan peristiwa dalam permainan ini adalah fiksyen.
      Ia tidak menggambarkan mana-mana individu, organisasi atau peristiwa sebenar.
      Nama parti adalah rekaan dan tidak merujuk kepada parti politik sebenar.
    </p>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

/* ============ INIT ============ */
function init() {
  loadSettings();

  // Splash
  initSplash();

  // Menu utama
  $('#btnNewGame').addEventListener('click', () => {
    $('#mainMenu').classList.remove('active');
    $('#createChar').classList.add('active');
  });
  $('#btnContinueGame').addEventListener('click', () => {
    const auto = localStorage.getItem(SAVE_AUTO_KEY);
    if (auto) {
      try {
        state = JSON.parse(auto);
        $('#mainMenu').classList.remove('active');
        enterGame();
      } catch(e) { showToast('Simpanan rosak', 'error'); }
    }
  });
  $('#btnLoadGame').addEventListener('click', modalLoadList);
  $('#btnGuide').addEventListener('click', showGuide);
  $('#btnSettings').addEventListener('click', modalSettings);
  $('#btnCredits').addEventListener('click', showCredits);

  // Cipta watak
  initCreateChar();

  // Butang kembali
  $$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.closest('.screen');
      screen.classList.remove('active');
      $('#mainMenu').classList.add('active');
    });
  });

  // Topbar
  $('#btnMenuGame').addEventListener('click', openSidePanel);
  $('#btnClosePanel').addEventListener('click', closeSidePanel);
  $('#sidePanel').addEventListener('click', (e) => {
    if (e.target.id === 'sidePanel') closeSidePanel();
  });

  // Side links
  $$('.side-link').forEach(btn => {
    btn.addEventListener('click', () => handleSideAction(btn.dataset.action));
  });

  // Modal close
  $('#btnCloseModal').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  // Bottom nav
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      if (state) renderTab();
    });
  });

  // Event modal close
  $('#eventModal').addEventListener('click', (e) => {
    if (e.target.id === 'eventModal') $('#eventModal').classList.remove('open');
  });

  // Expose function ke global untuk onclick
  window.closeModal = closeModal;
}

/* ============ JALANKAN ============ */
document.addEventListener('DOMContentLoaded', init);
