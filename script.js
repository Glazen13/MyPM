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
         Satu giliran = 1 bulan. Tekan butang di bawah untuk teruskan masa.
      </p>
      <div class="action-list mt-16">
        <button class="action-btn primary" data-action="nextTurn">
          <span class="a-icon">⏭️</span>
          <span class="a-text">
            <strong>Teruskan 1 Bulan</strong>
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
  // Proses 1 bulan sahaja
  processMonth();

  // Majukan kalendar 1 bulan
  state.date.month += 1;
  while (state.date.month >= 12) {
    state.date.month -= 12;
    state.date.year += 1;
  }
  state.date.turn += 1;
  state.date.label = getMonthLabel(state.date.month) + ' ' + state.date.year;

  // Umur naik setiap 12 giliran (12 bulan = 1 tahun)
  state.player.umur += (state.date.turn % 12 === 0) ? 1 : 0;

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
  if (Math.random() > 0.25) return;

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
/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS v2.0
   Modul Lanjutan: Kawasan, Peta, Kempen, Kabinet, Tugas, Projek, Bajet
   ============================================================ */

/* ============ PANGKALAN DATA: KAWASAN PARLIMEN (SAMPEL SIMULASI) ============ */
/* Nota: Ini adalah data SIMULASI bagi tujuan permainan. Bukan data rasmi SPR. */
const PARLIMEN_DB = [
  { kod: 'P.001', nama: 'Padang Besar', negeri: 'Perlis', pengundi: 52000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.002', nama: 'Kangar', negeri: 'Perlis', pengundi: 48000, penyandang: 'Simulasi', parti: 'PRB' },
  { kod: 'P.003', nama: 'Arau', negeri: 'Perlis', pengundi: 45000, penyandang: 'Simulasi', parti: 'PIN' },
  { kod: 'P.010', nama: 'Alor Setar', negeri: 'Kedah', pengundi: 78000, penyandang: 'Simulasi', parti: 'PRB' },
  { kod: 'P.020', nama: 'Kangar Town', negeri: 'Kedah', pengundi: 65000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.030', nama: 'Kota Bharu', negeri: 'Kelantan', pengundi: 82000, penyandang: 'Simulasi', parti: 'PIN' },
  { kod: 'P.040', nama: 'Kuala Terengganu', negeri: 'Terengganu', pengundi: 76000, penyandang: 'Simulasi', parti: 'PIN' },
  { kod: 'P.050', nama: 'Ipoh Timor', negeri: 'Perak', pengundi: 88000, penyandang: 'Simulasi', parti: 'PPP' },
  { kod: 'P.060', nama: 'Petaling Jaya', negeri: 'Selangor', pengundi: 95000, penyandang: 'Simulasi', parti: 'PPP' },
  { kod: 'P.070', nama: 'Shah Alam', negeri: 'Selangor', pengundi: 105000, penyandang: 'Simulasi', parti: 'PPP' },
  { kod: 'P.080', nama: 'Cheras', negeri: 'W.P. Kuala Lumpur', pengundi: 110000, penyandang: 'Simulasi', parti: 'PPP' },
  { kod: 'P.090', nama: 'Titiwangsa', negeri: 'W.P. Kuala Lumpur', pengundi: 78000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.100', nama: 'Seremban', negeri: 'Negeri Sembilan', pengundi: 85000, penyandang: 'Simulasi', parti: 'PRB' },
  { kod: 'P.110', nama: 'Melaka Tengah', negeri: 'Melaka', pengundi: 72000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.120', nama: 'Johor Bahru', negeri: 'Johor', pengundi: 98000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.130', nama: 'Kuantan', negeri: 'Pahang', pengundi: 68000, penyandang: 'Simulasi', parti: 'BNR' },
  { kod: 'P.140', nama: 'Kota Kinabalu', negeri: 'Sabah', pengundi: 72000, penyandang: 'Simulasi', parti: 'PSM' },
  { kod: 'P.150', nama: 'Kuching', negeri: 'Sarawak', pengundi: 80000, penyandang: 'Simulasi', parti: 'PSB' }
];

/* ============ PANGKALAN DATA: KAWASAN DUN (SAMPEL SIMULASI) ============ */
const DUN_DB = [
  { kod: 'N.01', nama: 'Titi Tinggi', negeri: 'Perlis', parlimenInduk: 'P.001', pengundi: 18000 },
  { kod: 'N.02', nama: 'Beseri', negeri: 'Perlis', parlimenInduk: 'P.001', pengundi: 15000 },
  { kod: 'N.03', nama: 'Chuping', negeri: 'Perlis', parlimenInduk: 'P.001', pengundi: 17000 },
  { kod: 'N.10', nama: 'Bukit Kayu Hitam', negeri: 'Kedah', parlimenInduk: 'P.010', pengundi: 22000 },
  { kod: 'N.20', nama: 'Kubang Kerian', negeri: 'Kelantan', parlimenInduk: 'P.030', pengundi: 28000 },
  { kod: 'N.30', nama: 'Batu Buruk', negeri: 'Terengganu', parlimenInduk: 'P.040', pengundi: 25000 },
  { kod: 'N.40', nama: 'Pasir Pinji', negeri: 'Perak', parlimenInduk: 'P.050', pengundi: 30000 },
  { kod: 'N.50', nama: 'Bukit Lanjan', negeri: 'Selangor', parlimenInduk: 'P.060', pengundi: 38000 },
  { kod: 'N.60', nama: 'Bukit Antarabangsa', negeri: 'Selangor', parlimenInduk: 'P.070', pengundi: 42000 },
  { kod: 'N.70', nama: 'Bukit Bintang', negeri: 'W.P. Kuala Lumpur', parlimenInduk: 'P.080', pengundi: 32000 },
  { kod: 'N.80', nama: 'Lenggeng', negeri: 'Negeri Sembilan', parlimenInduk: 'P.100', pengundi: 24000 },
  { kod: 'N.90', nama: 'Ayer Keroh', negeri: 'Melaka', parlimenInduk: 'P.110', pengundi: 26000 },
  { kod: 'N.100', nama: 'Stulang', negeri: 'Johor', parlimenInduk: 'P.120', pengundi: 34000 },
  { kod: 'N.110', nama: 'Teruntum', negeri: 'Pahang', parlimenInduk: 'P.130', pengundi: 23000 },
  { kod: 'N.120', nama: 'Likas', negeri: 'Sabah', parlimenInduk: 'P.140', pengundi: 27000 },
  { kod: 'N.130', nama: 'Padungan', negeri: 'Sarawak', parlimenInduk: 'P.150', pengundi: 25000 }
];

/* ============ PANGKALAN DATA: PORTFOLIO KEMENTERIAN (SIMULASI) ============ */
const MINISTRIES = [
  { id: 'M01', nama: 'Kewangan', emoji: '💵', kpi: 'Kestabilan fiskal' },
  { id: 'M02', nama: 'Pendidikan', emoji: '🎓', kpi: 'Kualiti pembelajaran' },
  { id: 'M03', nama: 'Kesihatan', emoji: '🏥', kpi: 'Akses perkhidmatan' },
  { id: 'M04', nama: 'Pengangkutan', emoji: '🚆', kpi: 'Kesalinghubungan' },
  { id: 'M05', nama: 'Kerja Raya', emoji: '🏗️', kpi: 'Infrastruktur' },
  { id: 'M06', nama: 'Ekonomi', emoji: '📈', kpi: 'Pertumbuhan' },
  { id: 'M07', nama: 'Dalam Negeri', emoji: '🛡️', kpi: 'Keselamatan' },
  { id: 'M08', nama: 'Luar', emoji: '🌐', kpi: 'Diplomasi' },
  { id: 'M09', nama: 'Pertanian', emoji: '🌾', kpi: 'Sekuriti makanan' },
  { id: 'M10', nama: 'Alam Sekitar', emoji: '🌳', kpi: 'Kelestarian' }
];

/* ============ PANGKALAN DATA: JENIS PROJEK ============ */
const PROJECT_TYPES = [
  { id: 'PRJ01', nama: 'Baik Pulih Jalan', kos: 500000, masa: 3, manfaat: 'Infrastruktur', emoji: '🛣️' },
  { id: 'PRJ02', nama: 'Naik Taraf Sekolah', kos: 800000, masa: 4, manfaat: 'Pendidikan', emoji: '🏫' },
  { id: 'PRJ03', nama: 'Klinik Desa', kos: 1200000, masa: 5, manfaat: 'Kesihatan', emoji: '🏥' },
  { id: 'PRJ04', nama: 'Kawalan Banjir', kos: 2000000, masa: 6, manfaat: 'Alam Sekitar', emoji: '🌊' },
  { id: 'PRJ05', nama: 'Pasar Awam', kos: 1500000, masa: 4, manfaat: 'Ekonomi', emoji: '🏪' },
  { id: 'PRJ06', nama: 'Internet Luar Bandar', kos: 1000000, masa: 5, manfaat: 'Digital', emoji: '📡' },
  { id: 'PRJ07', nama: 'Program Belia', kos: 300000, masa: 2, manfaat: 'Sosial', emoji: '🧑‍🎓' },
  { id: 'PRJ08', nama: 'Bantuan Banjir', kos: 600000, masa: 2, manfaat: 'Kebajikan', emoji: '🚨' },
  { id: 'PRJ09', nama: 'Perumahan Rakyat', kos: 5000000, masa: 8, manfaat: 'Perumahan', emoji: '🏘️' },
  { id: 'PRJ10', nama: 'Pusat Latihan Vokasional', kos: 1800000, masa: 5, manfaat: 'Pekerjaan', emoji: '🔧' }
];

/* ============ PANGKALAN DATA: TUGAS MENGIKUT JAWATAN ============ */
const TASK_TEMPLATES = {
  'Perdana Menteri': [
    { id: 'T_PM1', tajuk: 'Mesyuarat Kabinet Mingguan', desk: 'Pengerusikan mesyuarat kabinet untuk menyelaras dasar kerajaan.', prioriti: 'high', masa: 1 },
    { id: 'T_PM2', tajuk: 'Sesi Parlimen', desk: 'Hadiri sesi Parlimen dan jawab soalan ahli.', prioriti: 'high', masa: 1 },
    { id: 'T_PM3', tajuk: 'Lawatan Rasmi Negeri', desk: 'Lawatan kerja ke negeri untuk semak projek.', prioriti: 'medium', masa: 1 },
    { id: 'T_PM4', tajuk: 'Hubungan Antarabangsa', desk: 'Mesyuarat diplomatik dengan delegasi asing.', prioriti: 'medium', masa: 1 },
    { id: 'T_PM5', tajuk: 'Sidang Media Nasional', desk: 'Beri kenyataan media tentang isu semasa.', prioriti: 'low', masa: 1 }
  ],
  'Menteri': [
    { id: 'T_M1', tajuk: 'Semakan KPI Kementerian', desk: 'Nilai prestasi agensi di bawah portfolio.', prioriti: 'high', masa: 1 },
    { id: 'T_M2', tajuk: 'Mesyuarat Kabinet', desk: 'Hadiri mesyuarat kabinet mingguan.', prioriti: 'high', masa: 1 },
    { id: 'T_M3', tajuk: 'Lawatan Projek', desk: 'Semak projek pembangunan kementerian.', prioriti: 'medium', masa: 1 },
    { id: 'T_M4', tajuk: 'Sesi Parlimen', desk: 'Jawab soalan berkaitan portfolio.', prioriti: 'high', masa: 1 },
    { id: 'T_M5', tajuk: 'Dialog Industri', desk: 'Mesyuarat dengan pemain industri.', prioriti: 'low', masa: 1 }
  ],
  'Ahli Parlimen': [
    { id: 'T_AP1', tajuk: 'Kehadiran Parlimen', desk: 'Hadir dan berbahas di Parlimen.', prioriti: 'high', masa: 1 },
    { id: 'T_AP2', tajuk: 'Khidmat Kawasan', desk: 'Hadiri program komuniti di kawasan.', prioriti: 'medium', masa: 1 },
    { id: 'T_AP3', tajuk: 'Aduan Penduduk', desk: 'Uruskan aduan rakyat kawasan.', prioriti: 'high', masa: 1 },
    { id: 'T_AP4', tajuk: 'Mesyuarat Parti', desk: 'Hadiri mesyuarat bahagian parti.', prioriti: 'medium', masa: 1 },
    { id: 'T_AP5', tajuk: 'Program Belia', desk: 'Anjur program bersama golongan muda.', prioriti: 'low', masa: 1 }
  ],
  'ADUN': [
    { id: 'T_AD1', tajuk: 'Sidang DUN', desk: 'Hadir dan berbahas di Dewan Undangan Negeri.', prioriti: 'high', masa: 1 },
    { id: 'T_AD2', tajuk: 'Program Komuniti', desk: 'Hadiri aktiviti masyarakat setempat.', prioriti: 'medium', masa: 1 },
    { id: 'T_AD3', tajuk: 'Aduan Tempatan', desk: 'Uruskan aduan jalan, air, banjir.', prioriti: 'high', masa: 1 },
    { id: 'T_AD4', tajuk: 'Semak Projek', desk: 'Pantau projek pembangunan di kawasan.', prioriti: 'medium', masa: 1 }
  ],
  'Ahli Biasa': [
    { id: 'T_AB1', tajuk: 'Hadiri Mesyuarat Cawangan', desk: 'Sertai mesyuarat cawangan parti.', prioriti: 'low', masa: 1 },
    { id: 'T_AB2', tajuk: 'Sukarelawan Program', desk: 'Bantu program masyarakat.', prioriti: 'low', masa: 1 },
    { id: 'T_AB3', tajuk: 'Kempen Parti', desk: 'Sertai kempen dan aktiviti parti.', prioriti: 'medium', masa: 1 }
  ]
};

/* ============ INIT v2.0 KE DALAM STATE ============ */
function initV2State() {
  if (!state) return;
  if (!state.parlimen) {
    state.parlimen = { contested: null, won: [] };
    state.dun = { contested: null, won: [] };
    state.cabinet = { portfolio: null, menteri: [], kpi: {}, tugasan: [] };
    state.tasks = { aktif: [], selesai: [], tertunggak: [] };
    state.projects = [];
    state.budget = { federal: 0, state: 0, used: 0, committed: 0 };
    state.newsChains = [];
    state.eventChains = {};
  }
}

/* ============ PETA MALAYSIA ============ */
function openMapModal() {
  initV2State();
  const body = $('#mapBody');
  const byState = {};
  STATES.forEach(s => byState[s] = { parlimen: 0, dun: 0 });
  PARLIMEN_DB.forEach(p => { if (byState[p.negeri]) byState[p.negeri].parlimen++; });
  DUN_DB.forEach(d => { if (byState[d.negeri]) byState[d.negeri].dun++; });

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:10px;">
      Peta simulasi — data kawasan adalah contoh permainan, bukan data rasmi SPR.
    </p>
    <div class="map-grid">
      ${STATES.map(s => `
        <button class="map-state" data-state="${s}">
          <strong>${s}</strong>
          <small>${byState[s].parlimen} Parlimen • ${byState[s].dun} DUN</small>
        </button>
      `).join('')}
    </div>
  `;

  body.querySelectorAll('[data-state]').forEach(btn => {
    btn.addEventListener('click', () => showStateConstituencies(btn.dataset.state));
  });

  $('#mapModal').classList.add('open');
}

function showStateConstituencies(negeri) {
  const parlimen = PARLIMEN_DB.filter(p => p.negeri === negeri);
  const dun = DUN_DB.filter(d => d.negeri === negeri);

  const body = $('#mapBody');
  body.innerHTML = `
    <button class="btn-back" id="backToMap">← Kembali ke Peta</button>
    <h4 style="margin:12px 0 8px;color:var(--biru-gelap);">📍 ${negeri}</h4>

    <h5 style="margin-top:14px;font-size:13px;color:var(--biru-muda);">PARLIMEN (${parlimen.length})</h5>
    ${parlimen.length === 0
      ? '<p style="font-size:12px;color:var(--kelabu);">Tiada data simulasi.</p>'
      : `<div class="const-list">
          ${parlimen.map(p => `
            <button class="const-item" data-const="${p.kod}">
              <span class="code">${p.kod}</span>
              <span class="name">${p.nama}</span>
              <span class="meta">Pengundi: ${formatNum(p.pengundi)} • Parti simulasi: ${p.parti}</span>
            </button>
          `).join('')}
        </div>`
    }

    <h5 style="margin-top:18px;font-size:13px;color:var(--biru-muda);">DUN (${dun.length})</h5>
    ${dun.length === 0
      ? '<p style="font-size:12px;color:var(--kelabu);">Tiada data simulasi.</p>'
      : `<div class="const-list">
          ${dun.map(d => `
            <button class="const-item" data-const="${d.kod}">
              <span class="code">${d.kod}</span>
              <span class="name">${d.nama}</span>
              <span class="meta">Pengundi: ${formatNum(d.pengundi)} • Parlimen induk: ${d.parlimenInduk}</span>
            </button>
          `).join('')}
        </div>`
    }
  `;

  $('#backToMap').onclick = openMapModal;
  body.querySelectorAll('[data-const]').forEach(btn => {
    btn.addEventListener('click', () => showConstituencyDetails(btn.dataset.const));
  });
}

function showConstituencyDetails(kod) {
  const p = PARLIMEN_DB.find(x => x.kod === kod);
  const d = DUN_DB.find(x => x.kod === kod);
  const info = p || d;
  if (!info) return;

  const isDun = !!d;
  $('#constTitle').textContent = `📍 ${info.nama} (${info.kod})`;

  const body = $('#constBody');
  body.innerHTML = `
    <div class="stat-grid">
      <div class="stat-item">
        <label>Jenis</label>
        <strong>${isDun ? 'DUN' : 'Parlimen'}</strong>
      </div>
      <div class="stat-item">
        <label>Negeri</label>
        <strong>${info.negeri}</strong>
      </div>
      <div class="stat-item">
        <label>Pengundi (simulasi)</label>
        <strong>${formatNum(info.pengundi)}</strong>
      </div>
      ${isDun ? `<div class="stat-item"><label>Parlimen Induk</label><strong>${info.parlimenInduk}</strong></div>` : ''}
      ${p ? `<div class="stat-item"><label>Penyandang Simulasi</label><strong>${p.penyandang}</strong></div>` : ''}
      ${p ? `<div class="stat-item"><label>Parti Simulasi</label><strong>${p.parti}</strong></div>` : ''}
    </div>

    <h4 style="margin-top:14px;color:var(--biru-gelap);font-size:13px;">📊 Isu Setempat (Simulasi)</h4>
    <ul style="font-size:12px;color:var(--kelabu-gelap);padding-left:18px;">
      <li>Kos sara hidup meningkat</li>
      <li>Keperluan infrastruktur tempatan</li>
      <li>Peluang pekerjaan belia</li>
      <li>Kualiti perkhidmatan awam</li>
    </ul>

    ${state.player.party && state.player.level >= 5
      ? `<button class="btn-primary" id="contestBtn" style="margin-top:14px;">🗳️ Bertanding Di Sini</button>`
      : `<p style="font-size:12px;color:var(--kelabu);margin-top:12px;">
          Anda perlu menyertai parti dan mencapai Tahap 5 untuk bertanding di kawasan ini.
        </p>`
    }
  `;

  const btn = $('#contestBtn');
  if (btn) btn.onclick = () => {
    $('#constituencyModal').classList.remove('open');
    startCampaign(isDun ? 'DUN' : 'Parlimen', info);
  };

  $('#constituencyModal').classList.add('open');
}

/* ============ KEMPEN PILIHAN RAYA (5 FASA) ============ */
let campaignState = null;

function startCampaign(jenis, kawasan) {
  initV2State();
  campaignState = {
    jenis, kawasan,
    stage: 0,
    stages: [
      { nama: 'Pendaftaran Calon', desk: 'Serahkan borang pencalonan dan deposit.' },
      { nama: 'Mesyuarat Strategi', desk: 'Rancang strategi kempen bersama pasukan.' },
      { nama: 'Kempen Pintu ke Pintu', desk: 'Bertemu pengundi secara langsung.' },
      { nama: 'Debat & Media', desk: 'Hadiri debat dan sesi media.' },
      { nama: 'Hari Pengundian', desk: 'Proses pengundian dan pengiraan undi.' }
    ],
    resources: {
      kewangan: 5000,
      sukarelawan: 10,
      momentum: 50
    }
  };
  renderCampaign();
  $('#campaignModal').classList.add('open');
}

function renderCampaign() {
  const c = campaignState;
  const body = $('#campaignBody');
  const footer = $('#campaignFooter');

  const stage = c.stages[c.stage];
  const progress = ((c.stage) / c.stages.length) * 100;

  body.innerHTML = `
    <div style="margin-bottom:12px;">
      <span class="badge">${c.jenis}</span>
      <strong style="margin-left:8px;color:var(--biru-gelap);">${c.kawasan.nama}</strong>
    </div>

    <div class="stage-progress">
      <div class="stage-progress-fill" style="width:${progress}%"></div>
    </div>
    <small style="font-size:11px;color:var(--kelabu);">Fasa ${c.stage + 1} / ${c.stages.length}</small>

    <div class="campaign-stage mt-16">
      <h5>📌 ${stage.nama}</h5>
      <p>${stage.desk}</p>
    </div>

    <div class="stat-grid mt-16">
      <div class="stat-item good">
        <label>Kewangan Kempen</label>
        <strong>${formatRM(c.resources.kewangan)}</strong>
      </div>
      <div class="stat-item">
        <label>Sukarelawan</label>
        <strong>${c.resources.sukarelawan}</strong>
      </div>
      <div class="stat-item ${c.resources.momentum > 60 ? 'good' : c.resources.momentum < 30 ? 'bad' : 'warn'}">
        <label>Momentum</label>
        <strong>${Math.round(c.resources.momentum)}%</strong>
      </div>
    </div>

    <div class="action-list mt-16" id="campaignActions">
      ${renderCampaignActions()}
    </div>
  `;

  footer.innerHTML = `<button class="btn-secondary" onclick="abortCampaign()">Tinggalkan Kempen</button>`;

  body.querySelectorAll('[data-caction]').forEach(btn => {
    btn.addEventListener('click', () => handleCampaignAction(btn.dataset.caction));
  });
}

function renderCampaignActions() {
  const c = campaignState;
  const actions = [];

  if (c.stage === 0) {
    actions.push(`<button class="action-btn" data-caction="register"><span class="a-icon">📝</span><span class="a-text"><strong>Daftar Calon</strong><small>Deposit RM3,000 + dokumen</small></span></button>`);
  } else if (c.stage === 1) {
    actions.push(`<button class="action-btn" data-caction="strategy1"><span class="a-icon">📊</span><span class="a-text"><strong>Strategi Menyeluruh</strong><small>Guna RM2,000, +10 momentum</small></span></button>`);
    actions.push(`<button class="action-btn" data-caction="strategy2"><span class="a-icon">🎯</span><span class="a-text"><strong>Fokus Kawasan Kunci</strong><small>Guna RM1,000, +15 momentum</small></span></button>`);
  } else if (c.stage === 2) {
    actions.push(`<button class="action-btn" data-caction="door1"><span class="a-icon">🚪</span><span class="a-text"><strong>Kempen Pintu Agresif</strong><small>Libat 5 sukarelawan, +20 momentum, tekanan+5</small></span></button>`);
    actions.push(`<button class="action-btn" data-caction="door2"><span class="a-icon">🍵</span><span class="a-text"><strong>Majlis Teh Tarik</strong><small>Guna RM500, +12 momentum</small></span></button>`);
  } else if (c.stage === 3) {
    actions.push(`<button class="action-btn" data-caction="debate1"><span class="a-icon">🎤</span><span class="a-text"><strong>Hadiri Debat Penuh</strong><small>Risiko tinggi, ganjaran tinggi</small></span></button>`);
    actions.push(`<button class="action-btn" data-caction="debate2"><span class="a-icon">📻</span><span class="a-text"><strong>Sesi Media Terkawal</strong><small>Risiko rendah, +8 momentum</small></span></button>`);
  } else if (c.stage === 4) {
    actions.push(`<button class="action-btn primary" data-caction="vote"><span class="a-icon">🗳️</span><span class="a-text"><strong>Kira Undi</strong><small>Lihat keputusan akhir</small></span></button>`);
  }

  return actions.join('');
}

function handleCampaignAction(action) {
  const c = campaignState;
  const p = state.player;

  switch(action) {
    case 'register':
      if (p.wang < 3000) { showToast('Wang tidak mencukupi (perlu RM3,000)', 'error'); return; }
      p.wang -= 3000;
      addTransaction('Deposit pencalonan', -3000);
      c.resources.kewangan += 2000;
      c.stage++;
      break;

    case 'strategy1':
      if (c.resources.kewangan < 2000) { showToast('Kewangan kempen tidak cukup', 'error'); return; }
      c.resources.kewangan -= 2000;
      c.resources.momentum += 10;
      c.stage++;
      break;
    case 'strategy2':
      if (c.resources.kewangan < 1000) { showToast('Kewangan kempen tidak cukup', 'error'); return; }
      c.resources.kewangan -= 1000;
      c.resources.momentum += 15;
      c.stage++;
      break;

    case 'door1':
      if (c.resources.sukarelawan < 5) { showToast('Sukarelawan tidak cukup', 'error'); return; }
      c.resources.sukarelawan -= 5;
      c.resources.momentum += 20;
      p.stress = clamp(p.stress + 5, 0, 100);
      c.stage++;
      break;
    case 'door2':
      if (c.resources.kewangan < 500) { showToast('Kewangan kempen tidak cukup', 'error'); return; }
      c.resources.kewangan -= 500;
      c.resources.momentum += 12;
      c.stage++;
      break;

    case 'debate1':
      const debateSuccess = Math.random() < (0.4 + p.charisma / 200);
      if (debateSuccess) {
        c.resources.momentum += 25;
        showToast('Debat berjaya! Momentum meningkat', 'success');
      } else {
        c.resources.momentum -= 10;
        showToast('Debat kurang memberangsangkan', 'warn');
      }
      c.stage++;
      break;
    case 'debate2':
      c.resources.momentum += 8;
      c.stage++;
      break;

    case 'vote':
      resolveCampaign();
      return;
  }

  renderCampaign();
}

function resolveCampaign() {
  const c = campaignState;
  const p = state.player;

  const chance = clamp(
    15 + c.resources.momentum * 0.5 + p.popularity * 0.2 + p.grassrootsSupport * 0.2 + p.partyInfluence * 0.1,
    5, 90
  );
  const roll = Math.random() * 100;
  const menang = roll < chance;

  $('#campaignModal').classList.remove('open');

  if (menang) {
    p.position = c.jenis === 'Parlimen' ? 'Ahli Parlimen' : 'ADUN';
    p.constituencySupport = clamp(p.constituencySupport + 20, 0, 100);
    p.popularity = clamp(p.popularity + 10, 0, 100);
    p.xp += 250;
    addXP(250);
    checkLevelUp();

    if (c.jenis === 'Parlimen') {
      state.parlimen.contested = c.kawasan.kod;
      state.parlimen.won.push({ kod: c.kawasan.kod, nama: c.kawasan.nama, tarikh: state.date.label });
    } else {
      state.dun.contested = c.kawasan.kod;
      state.dun.won.push({ kod: c.kawasan.kod, nama: c.kawasan.nama, tarikh: state.date.label });
    }

    addNews(`${p.nama} memenangi ${c.jenis} ${c.kawasan.nama}`, 'Kemenangan dalam simulasi pilihan raya', 'POLITIK');

    // Tambah tugasan untuk jawatan baharu
    generateTasksForPosition();

    saveGame(true);
    renderGame();

    openModal('🎉 Kemenangan!',
      `<p style="font-size:16px;color:var(--hijau);font-weight:700;text-align:center;">TAHNIAH!</p>
       <p style="text-align:center;">Anda memenangi kerusi <strong>${c.jenis} ${c.kawasan.nama}</strong> dalam simulasi.</p>
       <div class="stat-grid mt-16">
         <div class="stat-item"><label>Jawatan</label><strong>${p.position}</strong></div>
         <div class="stat-item"><label>Momentum</label><strong>${Math.round(c.resources.momentum)}%</strong></div>
         <div class="stat-item"><label>Peluang</label><strong>${Math.round(chance)}%</strong></div>
         <div class="stat-item"><label>XP</label><strong>+250</strong></div>
       </div>`,
      `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">Terima</button>`
    );
  } else {
    p.popularity = clamp(p.popularity - 5, 0, 100);
    p.stress = clamp(p.stress + 8, 0, 100);
    p.xp += 60;
    addXP(60);
    addNews(`${p.nama} tewas di ${c.kawasan.nama}`, 'Keputusan simulasi', 'POLITIK');
    saveGame(true);
    renderGame();

    openModal('Keputusan Pilihan Raya',
      `<p style="color:var(--merah);font-weight:600;text-align:center;">Anda tidak berjaya kali ini</p>
       <p style="text-align:center;">Jangan putus asa. Bina semula sokongan dan cuba lagi.</p>
       <p style="font-size:12px;color:var(--kelabu);text-align:center;">Peluang anda: ${Math.round(chance)}%</p>`,
      `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">OK</button>`
    );
  }

  campaignState = null;
}

function abortCampaign() {
  if (confirm('Tinggalkan kempen? Deposit dan kos tidak akan dikembalikan.')) {
    campaignState = null;
    $('#campaignModal').classList.remove('open');
    showToast('Kempen dihentikan', 'warn');
  }
}

/* ============ KABINET & PELANTIKAN ============ */
function openCabinetModal() {
  initV2State();
  const p = state.player;
  const body = $('#cabinetBody');

  const eligible = checkCabinetEligibility();

  body.innerHTML = `
    <div class="pos-card">
      <div class="pos-title">KEDUDUKAN SEMASA</div>
      <div class="pos-name">${p.position || 'Rakyat Biasa'}</div>
      <div class="pos-meta">${p.party ? p.party.nama : 'Tiada parti'}</div>
      <div class="pos-kpi">
        <div>Populariti: ${Math.round(p.popularity)}</div>
        <div>Integriti: ${Math.round(p.integrity)}</div>
        <div>Kepimpinan: ${Math.round(p.leadership)}</div>
        <div>Pengalaman: ${Math.round(p.experience)}</div>
      </div>
    </div>

    <h4 style="color:var(--biru-gelap);font-size:13px;margin-top:14px;">📋 Kelayakan Pelantikan</h4>
    <div class="stat-grid">
      <div class="stat-item ${eligible.menteri ? 'good' : 'bad'}">
        <label>Menteri</label>
        <strong>${eligible.menteri ? 'Layak' : 'Belum Layak'}</strong>
      </div>
      <div class="stat-item ${eligible.timbalan ? 'good' : 'bad'}">
        <label>Timbalan Menteri</label>
        <strong>${eligible.timbalan ? 'Layak' : 'Belum Layak'}</strong>
      </div>
      <div class="stat-item ${eligible.exco ? 'good' : 'bad'}">
        <label>EXCO Negeri</label>
        <strong>${eligible.exco ? 'Layak' : 'Belum Layak'}</strong>
      </div>
      <div class="stat-item ${eligible.senator ? 'good' : 'bad'}">
        <label>Senator</label>
        <strong>${eligible.senator ? 'Layak' : 'Belum Layak'}</strong>
      </div>
    </div>

    <h4 style="color:var(--biru-gelap);font-size:13px;margin-top:16px;">🏛️ Portfolio Kementerian (Simulasi)</h4>
    <div class="cabinet-grid">
      ${MINISTRIES.map(m => `
        <div class="cabinet-item">
          <span class="c-icon">${m.emoji}</span>
          <div class="c-info">
            <strong>${m.nama}</strong>
            <small>${m.kpi}</small>
          </div>
        </div>
      `).join('')}
    </div>

    ${eligible.menteri && !p.isMenteri
      ? `<button class="btn-primary" id="lobbyBtn" style="margin-top:14px;">📨 Lobi Pelantikan Menteri</button>`
      : ''
    }
  `;

  const lobby = $('#lobbyBtn');
  if (lobby) lobby.onclick = lobbyMinister;

  $('#cabinetModal').classList.add('open');
}

function checkCabinetEligibility() {
  const p = state.player;
  return {
    menteri: p.level >= 10 && p.popularity >= 60 && p.integrity >= 60 && p.leadership >= 60,
    timbalan: p.level >= 9 && p.popularity >= 50 && p.leadership >= 50,
    exco: p.level >= 8 && p.popularity >= 40,
    senator: p.level >= 6 && p.popularity >= 30
  };
}

function lobbyMinister() {
  const p = state.player;
  const chance = clamp(
    p.popularity * 0.3 + p.integrity * 0.2 + p.partyInfluence * 0.3 + p.leadership * 0.2,
    5, 85
  );

  if (Math.random() * 100 < chance) {
    const m = pickRandom(MINISTRIES);
    p.position = `Menteri ${m.nama}`;
    p.isMenteri = true;
    p.cabinetPortfolio = m;
    generateTasksForPosition();
    addNews(`${p.nama} dilantik Menteri ${m.nama}`, 'Pelantikan kabinet simulasi', 'POLITIK');
    saveGame(true);
    $('#cabinetModal').classList.remove('open');
    renderGame();
    openModal('🎖️ Pelantikan',
      `<p style="text-align:center;">Anda telah dilantik sebagai</p>
       <p style="text-align:center;font-size:18px;font-weight:700;color:var(--biru-muda);">
         Menteri ${m.nama}
       </p>
       <p style="font-size:12px;color:var(--kelabu);text-align:center;">
         KPI utama: ${m.kpi}
       </p>`,
      `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">Terima</button>`
    );
  } else {
    showToast('Pelantikan tidak berjaya kali ini', 'warn');
    $('#cabinetModal').classList.remove('open');
  }
}

/* ============ PUSAT TUGAS RASMI ============ */
function generateTasksForPosition() {
  const p = state.player;
  let posKey = 'Ahli Biasa';
  if (p.position) {
    if (p.position.includes('Perdana Menteri')) posKey = 'Perdana Menteri';
    else if (p.position.includes('Menteri')) posKey = 'Menteri';
    else if (p.position === 'Ahli Parlimen') posKey = 'Ahli Parlimen';
    else if (p.position === 'ADUN') posKey = 'ADUN';
  }

  const templates = TASK_TEMPLATES[posKey] || TASK_TEMPLATES['Ahli Biasa'];
  state.tasks.aktif = templates.map(t => ({
    ...t,
    status: 'aktif',
    dueTurn: state.date.turn + 1 + randomInt(0, 1)
  }));
}

function openTaskModal() {
  initV2State();
  if (!state.tasks.aktif || state.tasks.aktif.length === 0) {
    generateTasksForPosition();
  }

  const body = $('#taskBody');
  const tasks = state.tasks.aktif;

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">
      Tugasan berkaitan jawatan anda: <strong>${state.player.position || 'Rakyat'}</strong>
    </p>
    ${tasks.length === 0
      ? '<p>Tidak ada tugasan aktif.</p>'
      : tasks.map(t => `
          <div class="task-item priority-${t.prioriti}">
            <h5>${t.tajuk}</h5>
            <p>${t.desk}</p>
            <div class="task-meta">
              <span>Prioriti: ${t.prioriti.toUpperCase()}</span>
              <span>Tarikh akhir: Giliran ${t.dueTurn}</span>
            </div>
            <div class="task-actions">
              <button style="background:var(--hijau);color:#fff;" data-task="${t.id}" data-taction="selesai">
                ✅ Selesai
              </button>
              <button style="background:var(--kelabu-cerah);color:var(--kelabu-gelap);" data-task="${t.id}" data-taction="tangguh">
                ⏸️ Tangguh
              </button>
            </div>
          </div>
        `).join('')
    }
  `;

  body.querySelectorAll('[data-taction]').forEach(btn => {
    btn.addEventListener('click', () => handleTaskAction(btn.dataset.task, btn.dataset.taction));
  });

  $('#taskModal').classList.add('open');
}

function handleTaskAction(taskId, action) {
  const idx = state.tasks.aktif.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  const task = state.tasks.aktif[idx];

  if (action === 'selesai') {
    state.tasks.aktif.splice(idx, 1);
    state.tasks.selesai.push({ ...task, tarikh: state.date.label });
    state.player.xp += 15;
    addXP(15);
    state.player.popularity = clamp(state.player.popularity + 2, 0, 100);
    checkLevelUp();
    showToast(`✅ ${task.tajuk} selesai`, 'success');
  } else if (action === 'tangguh') {
    task.dueTurn += 1;
    state.player.popularity = clamp(state.player.popularity - 1, 0, 100);
    showToast('Tugasan ditangguh', 'warn');
  }

  saveGame(true);
  openTaskModal();
  renderGame();
}

/* ============ PROJEK PEMBANGUNAN ============ */
function openProjectModal() {
  initV2State();
  const body = $('#projectBody');

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">
      Cadang dan laksana projek. Projek memerlukan masa dan kos.
    </p>

    <h4 style="color:var(--biru-gelap);font-size:13px;">📌 Projek Aktif</h4>
    ${state.projects.length === 0
      ? '<p style="font-size:12px;color:var(--kelabu);">Belum ada projek.</p>'
      : state.projects.map(pr => `
          <div class="project-item">
            <h5>${pr.emoji} ${pr.nama}</h5>
            <div class="proj-desc">${pr.desk}</div>
            <div class="proj-stats">
              <span>Kos: ${formatRM(pr.kos)}</span>
              <span>Masa: ${pr.masa} giliran</span>
              <span>Status: ${pr.status}</span>
              <span>Manfaat: ${pr.manfaat}</span>
            </div>
            ${pr.progress !== undefined
              ? `<div class="stage-progress"><div class="stage-progress-fill" style="width:${pr.progress}%"></div></div>`
              : ''}
          </div>
        `).join('')
    }

    <h4 style="color:var(--biru-gelap);font-size:13px;margin-top:16px;">➕ Cadang Projek Baharu</h4>
    <div style="font-size:12px;">
      ${PROJECT_TYPES.map(p => `
        <button class="const-item" data-prj="${p.id}" style="width:100%;">
          <span style="font-size:16px;">${p.emoji}</span>
          <strong style="margin-left:8px;font-size:13px;color:var(--biru-gelap);">${p.nama}</strong>
          <span class="meta">Kos: ${formatRM(p.kos)} • Masa: ${p.masa} giliran • ${p.manfaat}</span>
        </button>
      `).join('')}
    </div>
  `;

  body.querySelectorAll('[data-prj]').forEach(btn => {
    btn.addEventListener('click', () => proposeProject(btn.dataset.prj));
  });

  $('#projectModal').classList.add('open');
}

function proposeProject(prjId) {
  const prj = PROJECT_TYPES.find(p => p.id === prjId);
  if (!prj) return;

  openModal('Cadang Projek',
    `<div style="text-align:center;font-size:36px;">${prj.emoji}</div>
     <h4 style="text-align:center;color:var(--biru-gelap);">${prj.nama}</h4>
     <div class="stat-grid mt-16">
       <div class="stat-item"><label>Kos</label><strong>${formatRM(prj.kos)}</strong></div>
       <div class="stat-item"><label>Masa</label><strong>${prj.masa} giliran</strong></div>
       <div class="stat-item"><label>Manfaat</label><strong>${prj.manfaat}</strong></div>
       <div class="stat-item"><label>Wang Anda</label><strong>${formatRM(state.player.wang)}</strong></div>
     </div>
     <p style="font-size:12px;color:var(--kelabu);margin-top:12px;">
       Untuk jawatan rasmi, projek boleh dicadangkan melalui bajet kerajaan.
       Sebagai rakyat biasa, projek ini menggunakan wang peribadi/dana sumbangan.
     </p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmProj" style="width:auto;margin:0;">Laksana</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmProj');
    if (btn) btn.onclick = () => {
      const p = state.player;
      // Projek rasmi guna bajet; rakyat guna wang sendiri
      const hasOffice = p.position && p.position !== 'Ahli Biasa';
      if (hasOffice) {
        if (state.budget.federal < prj.kos) {
          showToast('Bajet tidak mencukupi', 'error');
          return;
        }
        state.budget.federal -= prj.kos;
        state.budget.committed += prj.kos;
      } else {
        if (p.wang < prj.kos) {
          showToast('Wang tidak mencukupi', 'error');
          return;
        }
        p.wang -= prj.kos;
        addTransaction(`Projek: ${prj.nama}`, -prj.kos);
      }

      state.projects.push({
        id: uid(),
        nama: prj.nama,
        emoji: prj.emoji,
        kos: prj.kos,
        masa: prj.masa,
        manfaat: prj.manfaat,
        status: 'Dalam Pelaksanaan',
        progress: 0,
        giliranMula: state.date.turn,
        giliranSiap: state.date.turn + prj.masa,
        desk: `Projek pembangunan ${prj.manfaat.toLowerCase()}`
      });

      addNews(`${p.nama} lancar projek ${prj.nama}`, 'Projek pembangunan simulasi', 'PROJEK');
      saveGame(true);
      closeModal();
      openProjectModal();
      renderGame();
      showToast('Projek dilancarkan', 'success');
    };
  }, 50);
}

/* ============ BAJET & PERUNTUKAN ============ */
function openBudgetModal() {
  initV2State();
  const p = state.player;
  const body = $('#budgetBody');

  // Sediakan bajet awal jika belum ada
  if (state.budget.federal === 0 && p.position) {
    const budgetByPos = {
      'Perdana Menteri': 50000000,
      'Menteri': 10000000,
      'Ahli Parlimen': 1000000,
      'ADUN': 500000
    };
    state.budget.federal = budgetByPos[p.position] || 0;
  }

  const total = state.budget.federal + state.budget.committed;
  const usedPct = total > 0 ? (state.budget.used / total) * 100 : 0;
  const commitPct = total > 0 ? (state.budget.committed / total) * 100 : 0;
  const availPct = Math.max(0, 100 - usedPct - commitPct);

  body.innerHTML = `
    <div class="pos-card">
      <div class="pos-title">PERUNTUKAN RASMI (SIMULASI)</div>
      <div class="pos-name">${formatRM(state.budget.federal)}</div>
      <div class="pos-meta">Jawatan: ${p.position || 'Tiada'}</div>
    </div>

    <div class="budget-bar">
      <div class="budget-seg used" style="width:${usedPct}%">DIGUNA</div>
      <div class="budget-seg committed" style="width:${commitPct}%">KOMIT</div>
      <div class="budget-seg available" style="width:${availPct}%">BAKI</div>
    </div>

    <div class="stat-grid">
      <div class="stat-item bad">
        <label>Dibelanjakan</label>
        <strong>${formatRM(state.budget.used)}</strong>
      </div>
      <div class="stat-item warn">
        <label>Komitmen</label>
        <strong>${formatRM(state.budget.committed)}</strong>
      </div>
      <div class="stat-item good">
        <label>Baki Tersedia</label>
        <strong>${formatRM(state.budget.federal)}</strong>
      </div>
      <div class="stat-item">
        <label>Bajet Negeri</label>
        <strong>${formatRM(state.budget.state)}</strong>
      </div>
    </div>

    <p style="font-size:11px;color:var(--kelabu);margin-top:14px;">
      ⚠️ Wang peribadi, parti, kempen dan kerajaan diasingkan sepenuhnya dalam simulasi.
    </p>
  `;

  $('#budgetModal').classList.add('open');
}

/* ============ INTEGRASI: PROSES PROJEK DALAM GILIRAN ============ */
function processProjects() {
  if (!state.projects) return;
  state.projects.forEach(pr => {
    if (pr.status === 'Dalam Pelaksanaan') {
      const totalMasa = pr.masa;
      const lepas = state.date.turn - pr.giliranMula;
      pr.progress = clamp((lepas / totalMasa) * 100, 0, 100);
      if (lepas >= totalMasa) {
        pr.status = 'Siap';
        pr.progress = 100;
        state.player.popularity = clamp(state.player.popularity + 8, 0, 100);
        state.player.integrity = clamp(state.player.integrity + 3, 0, 100);
        addNews(`Projek ${pr.nama} siap`, 'Hasil pembangunan simulasi', 'PROJEK');
      }
    }
  });
}

/* ============ INTEGRASI: PROSES TUGAS TERTUNGGAK ============ */
function processTasks() {
  if (!state.tasks || !state.tasks.aktif) return;
  const overdue = [];
  state.tasks.aktif = state.tasks.aktif.filter(t => {
    if (state.date.turn > t.dueTurn) {
      overdue.push(t);
      return false;
    }
    return true;
  });
  overdue.forEach(t => {
    state.tasks.tertunggak.push({ ...t, tarikh: state.date.label });
    state.player.popularity = clamp(state.player.popularity - 3, 0, 100);
  });
  if (overdue.length > 0) {
    showToast(`${overdue.length} tugasan tertunggak!`, 'warn');
  }
}

/* ============ EXTRA NAV BUTTONS ============ */
function setupExtraNav() {
  const nav = $('#extraNav');
  if (!nav) return;

  // Tunjuk nav tambahan bila dalam game
  const observer = new MutationObserver(() => {
    if ($('#game').classList.contains('active')) {
      nav.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
    }
  });
  observer.observe($('#game'), { attributes: true, attributeFilter: ['class'] });

  nav.querySelectorAll('[data-extra]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.extra;
      switch(action) {
        case 'map': openMapModal(); break;
        case 'tasks': openTaskModal(); break;
        case 'projects': openProjectModal(); break;
        case 'budget': openBudgetModal(); break;
        case 'cabinet': openCabinetModal(); break;
      }
    });
  });
}

/* ============ PATCH nextTurn UNTUK v2.0 ============ */
const _originalNextTurn = nextTurn;
nextTurn = function() {
  _originalNextTurn();
  // Proses modul lanjutan
  processProjects();
  processTasks();
  saveGame(true);
};

/* ============ PATCH init UNTUK v2.0 ============ */
const _originalInit = init;
init = function() {
  _originalInit();
  setupExtraNav();
  initV2State();
};
/* ============ SEMUA KOD v2.0 DI ATAS ============ */
/* ... tampal SEMUA kod v2.0 di sini ... */

/* ============ JALANKAN ============ */
/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS v3.0
   Modul Akhir: PRU, Krisis, Watak AI, Legasi, Timeline, Pencapaian
   ============================================================ */

/* ============ PANGKALAN DATA: 222 PARLIMEN SIMULASI (GEN) ============ */
/* Nota: Ini penjana simulasi, bukan data rasmi SPR. */
const PRU_SEATS = (() => {
  const seats = [];
  const negeriPengundi = {
    'Perlis': 3, 'Kedah': 15, 'Kelantan': 14, 'Terengganu': 8,
    'Penang': 13, 'Perak': 24, 'Pahang': 14, 'Selangor': 22,
    'W.P. Kuala Lumpur': 11, 'W.P. Putrajaya': 1, 'W.P. Labuan': 1,
    'Negeri Sembilan': 8, 'Melaka': 6, 'Johor': 26,
    'Sabah': 25, 'Sarawak': 31
  };
  let counter = 1;
  const partyCycle = ['PRB', 'BNR', 'PPP', 'PIN', 'GAM', 'PSM', 'PSB'];
  Object.entries(negeriPengundi).forEach(([negeri, jml]) => {
    for (let i = 0; i < jml; i++) {
      seats.push({
        kod: `P.${String(counter).padStart(3, '0')}`,
        nama: `${negeri} ${i + 1}`,
        negeri,
        parti: partyCycle[(counter + i) % partyCycle.length],
        pengundi: 30000 + Math.floor(Math.random() * 90000),
        majoriti: 1000 + Math.floor(Math.random() * 20000)
      });
      counter++;
    }
  });
  return seats;
})();

/* ============ PANGKALAN DATA: PENCAPAIAN ============ */
const ACHIEVEMENTS = [
  { id: 'A01', nama: 'Langkah Pertama', emoji: '👣', desk: 'Selesaikan giliran pertama', check: s => s.date.turn >= 2 },
  { id: 'A02', nama: 'Ahli Aktif', emoji: '📢', desk: 'Sertai parti politik', check: s => !!s.player.party },
  { id: 'A03', nama: 'Wakil Rakyat', emoji: '🎖️', desk: 'Menang kerusi DUN atau Parlimen', check: s => s.player.level >= 10 },
  { id: 'A04', nama: 'Bebas Hutang', emoji: '💳', desk: 'Kurangkan hutang kepada RM0', check: s => s.player.hutang <= 0 && s.date.turn > 3 },
  { id: 'A05', nama: 'Jutawan', emoji: '💎', desk: 'Kumpul RM100,000', check: s => s.player.wang >= 100000 },
  { id: 'A06', nama: 'Integriti Tinggi', emoji: '🛡️', desk: 'Integriti 80+', check: s => s.player.integrity >= 80 },
  { id: 'A07', nama: 'Populariti Melonjak', emoji: '⭐', desk: 'Populariti 80+', check: s => s.player.popularity >= 80 },
  { id: 'A08', nama: 'Menteri', emoji: '🏛️', desk: 'Dilantik sebagai Menteri', check: s => (s.player.position || '').includes('Menteri') },
  { id: 'A09', nama: 'Pemimpin Tertinggi', emoji: '👑', desk: 'Dilantik sebagai Perdana Menteri', check: s => (s.player.position || '').includes('Perdana Menteri') },
  { id: 'A10', nama: 'Legasi Kukuh', emoji: '🏆', desk: 'Skor legasi melebihi 70', check: s => calculateLegacyScore(s).total >= 70 },
  { id: 'A11', nama: 'Keluarga Bahagia', emoji: '👨‍👩‍👧', desk: 'Berumah tangga dan berkeluarga', check: s => !!s.player.pasangan },
  { id: 'A12', nama: 'Veteran', emoji: '🎗️', desk: 'Main 20 giliran', check: s => s.date.turn >= 20 }
];

/* ============ WATAK AI: AGENDA ============ */
const CHAR_AGENDAS = [
  'ingin naik jawatan dalam parti',
  'mahu membina rangkaian pengaruh',
  'bercita-cita menjadi calon pilihan raya',
  'ingin menyekat dominasi pemain',
  'mencari sekutu untuk gabungan',
  'mahu memperbaiki dasar kerajaan',
  'menyiasat potensi skandal',
  'mencari mentor politik',
  'mahu memperluas pengaruh di peringkat negeri',
  'bersedia berkhidmat kepada masyarakat'
];

/* ============ INIT v3 STATE ============ */
function initV3State() {
  if (!state) return;
  if (!state.pru) {
    state.pru = { lastResult: null, tahun: 0, kerusi: [] };
    state.crisis = { aktif: null, sejarah: [] };
    state.achievements = state.achievements || [];
    state.legacy = null;
    state.charAgenda = {};
    state.timeline = [];
    state.newsChains = [];
    state.pendingConsequences = state.pendingConsequences || [];
    state.byElections = [];
  }
}

/* ============ SISTEM TIMELINE ============ */
function addTimeline(emoji, title, desc, jenis = 'normal') {
  if (!state.timeline) state.timeline = [];
  state.timeline.unshift({
    id: uid(),
    tarikh: state.date.label,
    emoji, title, desc, jenis
  });
  if (state.timeline.length > 200) state.timeline = state.timeline.slice(0, 200);
}

function openTimelineModal() {
  initV3State();
  const body = $('#modalBody');
  const events = state.timeline || [];

  if (events.length === 0) {
    openModal('📅 Timeline Kehidupan',
      '<p style="color:var(--kelabu);font-size:13px;">Belum ada peristiwa direkod.</p>',
      `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
    );
    return;
  }

  const html = `
    <div class="tl-wrap">
      ${events.slice(0, 50).map(ev => `
        <div class="tl-node ${ev.jenis}">
          <div class="tl-date">${ev.tarikh} • ${ev.emoji}</div>
          <div class="tl-title">${ev.title}</div>
          <div class="tl-desc">${ev.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('📅 Timeline Kehidupan', html, `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`);
}

/* ============ SISTEM PRU ============ */
function openPRUModal() {
  initV3State();
  const p = state.player;

  if (!p.party) {
    showToast('Sertai parti dahulu untuk bertanding PRU', 'warn');
    return;
  }
  if (p.level < 5) {
    showToast('Perlu Tahap 5+ untuk bertanding PRU', 'warn');
    return;
  }

  const body = $('#pruBody');
  const footer = $('#pruFooter');
  const pru = state.pru;

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">
      Pilih kerusi untuk ditandingi. Semua kerusi adalah <strong>simulasi fiksyen</strong> — bukan data rasmi SPR.
    </p>

    <div class="stat-grid">
      <div class="stat-item">
        <label>Jumlah Kerusi</label>
        <strong>${PRU_SEATS.length}</strong>
      </div>
      <div class="stat-item">
        <label>Parti Anda</label>
        <strong>${p.party.singkatan}</strong>
      </div>
      <div class="stat-item">
        <label>Tahap</label>
        <strong>${p.level}</strong>
      </div>
      <div class="stat-item ${p.popularity > 50 ? 'good' : 'warn'}">
        <label>Populariti</label>
        <strong>${Math.round(p.popularity)}</strong>
      </div>
    </div>

    <h4 style="margin-top:16px;font-size:13px;color:var(--biru-gelap);">🗳️ Pilih Kerusi (${PRU_SEATS.length})</h4>
    <div class="pru-grid">
      ${PRU_SEATS.slice(0, 60).map(s => {
        const won = (pru.kerusi || []).find(k => k.kod === s.kod && k.hasil === 'menang');
        const lost = (pru.kerusi || []).find(k => k.kod === s.kod && k.hasil === 'kalah');
        const cls = won ? 'win' : lost ? 'lose' : '';
        return `
          <button class="pru-seat ${cls}" data-seat="${s.kod}">
            <span class="seat-code">${s.kod}</span>
            <span class="seat-name">${s.nama}</span>
            <span class="seat-party">${s.parti}</span>
          </button>
        `;
      }).join('')}
    </div>
    <p style="font-size:11px;color:var(--kelabu);text-align:center;margin-top:8px;">
      (Menunjukkan 60 kerusi pertama dari ${PRU_SEATS.length} kerusi simulasi)
    </p>

    ${pru.lastResult ? `
      <h4 style="margin-top:18px;font-size:13px;color:var(--biru-gelap);">📊 Keputusan PRU Terakhir</h4>
      <div class="result-bar">
        ${Object.entries(pru.lastResult.partyVotes || {}).map(([party, votes]) => {
          const pct = (votes / pru.lastResult.totalVotes) * 100;
          const color = PARTIES.find(x => x.singkatan === party)?.warna || '#888';
          return `<div class="result-seg" style="width:${pct}%;background:${color};">${party} ${Math.round(pct)}%</div>`;
        }).join('')}
      </div>
      <p style="font-size:12px;color:var(--kelabu);text-align:center;">
        Jumlah undi: ${formatNum(pru.lastResult.totalVotes)} • Kerusi anda menang: ${pru.lastResult.kerusiMenang || 0}
      </p>
    ` : ''}
  `;

  footer.innerHTML = `
    <button class="btn-secondary" onclick="document.getElementById('pruModal').classList.remove('open')">Tutup</button>
    <button class="btn-primary" id="startPRUBtn" style="width:auto;margin:0;">▶️ Lancar PRU</button>
  `;

  body.querySelectorAll('[data-seat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const kod = btn.dataset.seat;
      const seat = PRU_SEATS.find(s => s.kod === kod);
      startPRUCampaign(seat);
    });
  });

  setTimeout(() => {
    const btn = $('#startPRUBtn');
    if (btn) btn.onclick = runFullPRU;
  }, 50);

  $('#pruModal').classList.add('open');
}

function startPRUCampaign(seat) {
  $('#pruModal').classList.remove('open');
  startCampaign('Parlimen', seat);
}

function runFullPRU() {
  const p = state.player;
  const pru = state.pru;

  // Simulasi seluruh negara
  const hasil = {};
  const partyVotes = {};
  PRU_SEATS.forEach(s => { partyVotes[s.parti] = (partyVotes[s.parti] || 0) + s.pengundi; });

  // Kesan kepada pengaruh parti pemain
  const myParty = p.party.singkatan;
  const myInfluence = p.partyInfluence / 100;

  let kerusiMenang = 0;
  const updatedSeats = PRU_SEATS.map(s => {
    let pengaruh = 0.5;
    if (s.parti === myParty) pengaruh += myInfluence * 0.3;
    pengaruh += (p.popularity / 100) * 0.1;
    pengaruh = clamp(pengaruh, 0.1, 0.9);

    const menang = Math.random() < pengaruh;
    const pemenang = menang ? myParty : s.parti;
    if (menang) kerusiMenang++;

    return { ...s, hasil: menang ? 'menang' : 'kalah', pemenang };
  });

  pru.kerusi = updatedSeats;
  pru.lastResult = {
    tahun: state.date.year,
    totalVotes: Object.values(partyVotes).reduce((a, b) => a + b, 0),
    partyVotes,
    kerusiMenang
  };
  pru.tahun = state.date.year;

  addNews(`PRU ${state.date.year} selesai — ${p.party.singkatan} menang ${kerusiMenang} kerusi`,
    'Keputusan pilihan raya umum simulasi', 'POLITIK');

  addTimeline('🗳️', `PRU ${state.date.year}`,
    `Parti ${p.party.singkatan} memenangi ${kerusiMenang} kerusi dalam simulasi.`,
    kerusiMenang > PRU_SEATS.length / 2 ? 'gold' : 'normal');

  saveGame(true);
  renderGame();

  openModal('📊 Keputusan PRU Selesai',
    `<div style="text-align:center;font-size:44px;margin-bottom:10px;">🗳️</div>
     <h4 style="text-align:center;color:var(--biru-gelap);">PRU ${state.date.year}</h4>
     <div class="stat-grid mt-16">
       <div class="stat-item"><label>Jumlah Kerusi</label><strong>${PRU_SEATS.length}</strong></div>
       <div class="stat-item good"><label>Parti Anda Menang</label><strong>${kerusiMenang}</strong></div>
       <div class="stat-item"><label>Jumlah Undi</label><strong>${formatNum(pru.lastResult.totalVotes)}</strong></div>
       <div class="stat-item"><label>Parti</label><strong>${p.party.singkatan}</strong></div>
     </div>
     <p style="text-align:center;font-size:12px;color:var(--kelabu);margin-top:12px;">
       ${kerusiMenang > PRU_SEATS.length / 2
         ? '🎉 Parti anda memperoleh majoriti!'
         : 'Parti anda tidak memperoleh majoriti. Gabungan mungkin diperlukan.'}
     </p>`,
    `<button class="btn-primary" onclick="closeModal()" style="width:auto;margin:0;">Terima</button>`
  );
}

/* ============ KRISIS KABINET & UNDI TIDAK PERCAYA ============ */
function maybeTriggerCrisis() {
  if (!state.player.party) return;
  if (Math.random() > 0.3) return; // 15% peluang
  if (state.crisis.aktif) return; // sudah ada krisis

  const jenis = pickRandom([
    { id: 'CA1', tajuk: 'Konflik Kabinet', desk: 'Dua menteri berselisih pendapat tentang dasar ekonomi. Perhatian media meningkat.', risiko: 20 },
    { id: 'CA2', tajuk: 'Kenyataan Kontroversi', desk: 'Seorang pemimpin parti mengeluarkan kenyataan yang mencetuskan kemarahan awam.', risiko: 25 },
    { id: 'CA3', tajuk: 'Desakan Undi Tidak Percaya', desk: 'Pembangkang mengemukakan usul undi tidak percaya terhadap kepimpinan.', risiko: 35 },
    { id: 'CA4', tajuk: 'Ketegangan Gabungan', desk: 'Rakan gabungan mengancam menarik diri jika tuntutan mereka tidak dipenuhi.', risiko: 30 }
  ]);

  state.crisis.aktif = { ...jenis, tarikh: state.date.label, giliran: state.date.turn };
  showCrisisModal();
}

function showCrisisModal() {
  const c = state.crisis.aktif;
  if (!c) return;

  $('#crisisBody').innerHTML = `
    <div class="crisis-alert">
      <h4>⚠️ ${c.tajuk}</h4>
      <p>${c.desk}</p>
    </div>
    <p style="font-size:12px;color:var(--kelabu);">
      Kestabilan gabungan: <strong>${Math.round(state.player.coalitionStability)}%</strong> •
      Risiko jawatan: <strong>${c.risiko}%</strong>
    </p>
  `;

  $('#crisisFooter').innerHTML = `
    <button class="btn-secondary" data-caction="ignore">😶 Abaikan</button>
    <button class="btn-secondary" data-caction="dialogue">🤝 Dialog</button>
    <button class="btn-primary" data-caction="address" style="width:auto;margin:0;">📢 Tangani</button>
  `;

  $('#crisisModal').classList.add('open');

  $('#crisisFooter').querySelectorAll('[data-caction]').forEach(btn => {
    btn.onclick = () => resolveCrisis(btn.dataset.caction);
  });
}

function resolveCrisis(action) {
  const c = state.crisis.aktif;
  const p = state.player;
  if (!c) return;

  let hasil = '';
  switch(action) {
    case 'ignore':
      p.coalitionStability = clamp(p.coalitionStability - 15, 0, 100);
      p.popularity = clamp(p.popularity - 5, 0, 100);
      if (Math.random() * 100 < c.risiko) {
        p.position = null;
        hasil = '❌ Krisis memuncak — anda kehilangan jawatan.';
        addTimeline('🚨', 'Kehilangan Jawatan', c.tajuk, 'red');
      } else {
        hasil = 'Krisis reda sedikit tetapi reputasi terjejas.';
      }
      break;
    case 'dialogue':
      if (p.negotiation >= 50 || Math.random() < 0.6) {
        p.coalitionStability = clamp(p.coalitionStability + 5, 0, 100);
        hasil = '✅ Dialog berjaya — kestabilan pulih.';
        addTimeline('🤝', 'Dialog Krisis', c.tajuk, 'green');
      } else {
        p.coalitionStability = clamp(p.coalitionStability - 8, 0, 100);
        hasil = '⚠️ Dialog gagal.';
      }
      break;
    case 'address':
      p.popularity = clamp(p.popularity + 5, 0, 100);
      p.integrity = clamp(p.integrity + 3, 0, 100);
      p.coalitionStability = clamp(p.coalitionStability + 8, 0, 100);
      hasil = '✅ Anda menangani krisis dengan kenyataan tegas.';
      addTimeline('📢', 'Kenyataan Awam', c.tajuk, 'green');
      break;
  }

  state.crisis.sejarah.push({ ...c, hasil, tindakan: action });
  state.crisis.aktif = null;

  addNews(`Krisis: ${c.tajuk}`, hasil, 'POLITIK');
  saveGame(true);
  $('#crisisModal').classList.remove('open');
  renderGame();

  showToast(hasil, action === 'ignore' && p.position === null ? 'error' : 'success');
}

/* ============ WATAK AI: TINDAKAN OTONOM ============ */
function processCharacterActions() {
  if (!state.charAgenda) state.charAgenda = {};

  // Set agenda untuk watak yang belum ada
  CHARACTERS.forEach(c => {
    if (!state.charAgenda[c.id]) {
      state.charAgenda[c.id] = pickRandom(CHAR_AGENDAS);
    }
  });

  // 25% peluang setiap giliran ada tindakan watak
  if (Math.random() > 0.10) return;

  const char = pickRandom(CHARACTERS);
  const rel = state.relationships[char.id];
  const agenda = state.charAgenda[char.id];

  const actions = [
    { id: 'A1', desk: `${char.nama} menghantar mesej untuk bertanya khabar.`, efek: { score: +3, memory: 'Menghubungi anda pada ' + state.date.label } },
    { id: 'A2', desk: `${char.nama} mencadangkan kerjasama projek komuniti.`, efek: { score: +5, memory: 'Cadang projek bersama' } },
    { id: 'A3', desk: `${char.nama} mengkritik keputusan anda secara terbuka.`, efek: { score: -5, memory: 'Kritik terbuka' } },
    { id: 'A4', desk: `${char.nama} meminta bantuan kewangan.`, efek: { score: +2, memory: 'Minta bantuan' } },
    { id: 'A5', desk: `${char.nama} menyebarkan berita positif tentang anda.`, efek: { score: +7, memory: 'Sokong di media' } },
    { id: 'A6', desk: `${char.nama} menyertai parti politik lain.`, efek: { score: -3, memory: 'Tukar parti' } }
  ];

  const aksi = pickRandom(actions);
  rel.score = clamp(rel.score + aksi.efek.score, -100, 100);
  if (rel.memory.length < 20) rel.memory.push(aksi.efek.memory + ` (${state.date.label})`);

  addNews(`Watak: ${char.nama}`, aksi.desk, 'WATAK');

  if (Math.random() < 0.3) {
    showToast(`💬 ${char.nama}: ${aksi.desk}`, aksi.efek.score > 0 ? 'success' : 'warn');
  }
}

/* ============ BERITA BERPANTAI (CHAIN NEWS) ============ */
function scheduleNewsChain(rootNews) {
  if (!state.newsChains) state.newsChains = [];
  state.newsChains.push({
    id: uid(),
    root: rootNews,
    giliranMula: state.date.turn,
    fasa: 0,
    jadual: [
      { tunggu: 1, tajuk: `Kesinambungan: ${rootNews}`, kategori: 'SUSULAN' },
      { tunggu: 3, tajuk: `Analisis mendalam: ${rootNews}`, kategori: 'ANALISIS' },
      { tunggu: 5, tajuk: `Kesan jangka panjang: ${rootNews}`, kategori: 'IMPAK' }
    ]
  });
}

function processNewsChains() {
  if (!state.newsChains) return;
  state.newsChains.forEach(chain => {
    const lepas = state.date.turn - chain.giliranMula;
    chain.jadual.forEach((jad, i) => {
      if (chain.fasa === i && lepas >= jad.tunggu) {
        addNews(jad.tajuk, `Laporan simulasi berkaitan: ${chain.root}`, jad.kategori);
        chain.fasa++;
      }
    });
  });
  state.newsChains = state.newsChains.filter(c => c.fasa < c.jadual.length);
}

/* ============ WATAK DETAIL MODAL ============ */
function openCharacterModal(charId) {
  initV3State();
  const char = CHARACTERS.find(c => c.id === charId);
  if (!char) return;

  const rel = state.relationships[char.id];
  const agenda = state.charAgenda[char.id] || 'tidak diketahui';

  $('#charTitle').textContent = `${char.emoji} ${char.nama}`;
  $('#charBody').innerHTML = `
    <div class="char-card ${rel.score > 40 ? 'high' : rel.score < -20 ? 'low' : ''}">
      <div class="c-head">
        <div class="c-emoji">${char.emoji}</div>
        <div>
          <div class="c-name">${char.nama}</div>
          <div class="c-role">${char.peranan}</div>
        </div>
        <div class="c-score">${rel.score > 0 ? '+' : ''}${rel.score}</div>
      </div>
      <p style="font-size:12px;color:var(--kelabu-gelap);margin-bottom:8px;">${char.desk}</p>
      <div style="font-size:11px;color:var(--kelabu);">
        <strong>Agenda:</strong> ${agenda}
      </div>
    </div>

    <h4 style="font-size:13px;color:var(--biru-gelap);margin-top:14px;">📊 Dimensi Hubungan</h4>
    <div class="stat-grid">
      <div class="stat-item"><label>Kepercayaan</label><strong>${rel.trust}</strong></div>
      <div class="stat-item"><label>Kesetiaan</label><strong>${rel.loyalty}</strong></div>
      <div class="stat-item"><label>Rasa Hormat</label><strong>${rel.respect}</strong></div>
      <div class="stat-item"><label>Skor Keseluruhan</label><strong>${rel.score}</strong></div>
    </div>

    ${rel.memory.length > 0
      ? `<h4 style="font-size:13px;color:var(--biru-gelap);margin-top:14px;">🧠 Memori</h4>
         <ul style="font-size:12px;color:var(--kelabu-gelap);padding-left:18px;">
           ${rel.memory.slice(-8).map(m => `<li>${m}</li>`).join('')}
         </ul>`
      : ''
    }
  `;

  $('#charModal').classList.add('open');
}

function openAllCharactersModal() {
  initV3State();
  openModal('👥 Semua Watak AI',
    `<div style="font-size:12px;">
      ${CHARACTERS.map(c => {
        const r = state.relationships[c.id];
        const cls = r.score > 40 ? 'high' : r.score < -20 ? 'low' : '';
        return `
          <div class="char-card ${cls}" data-charid="${c.id}" style="cursor:pointer;">
            <div class="c-head">
              <div class="c-emoji">${c.emoji}</div>
              <div>
                <div class="c-name">${c.nama}</div>
                <div class="c-role">${c.peranan}</div>
              </div>
              <div class="c-score">${r.score > 0 ? '+' : ''}${r.score}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
  setTimeout(() => {
    $$('#modalBody [data-charid]').forEach(el => {
      el.onclick = () => {
        closeModal();
        setTimeout(() => openCharacterModal(el.dataset.charid), 200);
      };
    });
  }, 50);
}

/* ============ SISTEM PENCAPAIAN ============ */
function checkAchievements() {
  if (!state.achievements) state.achievements = [];
  ACHIEVEMENTS.forEach(a => {
    if (!state.achievements.find(x => x.id === a.id)) {
      try {
        if (a.check(state)) {
          state.achievements.push({ id: a.id, tarikh: state.date.label, nama: a.nama });
          showToast(`🏆 Pencapaian: ${a.nama}`, 'success');
          addTimeline('🏆', `Pencapaian: ${a.nama}`, a.desk, 'gold');
        }
      } catch(e) {}
    }
  });
}

function openAchievementsModal() {
  initV3State();
  openModal('🏆 Pencapaian',
    `<div style="font-size:12px;">
      ${ACHIEVEMENTS.map(a => {
        const unlocked = state.achievements.find(x => x.id === a.id);
        return `
          <div class="ach-card ${unlocked ? '' : 'locked'}">
            <div class="ach-icon">${a.emoji}</div>
            <div class="ach-info">
              <strong>${a.nama}</strong>
              <small>${a.desk}</small>
              ${unlocked ? `<small style="color:var(--hijau);font-weight:600;">✓ ${unlocked.tarikh}</small>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

/* ============ SKOR LEGASI ============ */
function calculateLegacyScore(s) {
  const p = s.player;
  const f = s.finances;

  const kekayaan = clamp(p.wang + p.tabungan, 0, 500000) / 5000;
  const pengaruh = (p.popularity + p.partyInfluence + p.publicTrust) / 3;
  const integriti = p.integrity;
  const jawatan = (p.position ? 20 : 0) + p.level * 3;
  const projek = (s.projects || []).filter(x => x.status === 'Siap').length * 5;
  const keluarga = p.pasangan ? 10 : 0;
  const pencapaian = (s.achievements || []).length * 2;

  const total = clamp(
    kekayaan * 0.15 + pengaruh * 0.3 + integriti * 0.2 + jawatan * 0.15 + projek + keluarga + pencapaian,
    0, 100
  );

  return { total, kekayaan, pengaruh, integriti, jawatan, projek, keluarga, pencapaian };
}

function openLegacyModal() {
  initV3State();
  const p = state.player;
  const s = calculateLegacyScore(state);
  const rank = s.total >= 85 ? 'LEGENDA' :
               s.total >= 70 ? 'NEGARAWAN' :
               s.total >= 55 ? 'PEMIMPIN' :
               s.total >= 40 ? 'AKTIVIS' : 'RAKYAT';

  const body = $('#legacyBody');
  body.innerHTML = `
    <div class="legacy-hero">
      <div class="lh-emoji">${s.total >= 70 ? '🏆' : s.total >= 40 ? '🎖️' : '👤'}</div>
      <div class="lh-title">${p.nama}</div>
      <div class="lh-sub">${p.position || 'Rakyat Biasa'} • ${p.party ? p.party.nama : 'Tanpa Parti'}</div>
      <div class="lh-rank">${rank}</div>
    </div>

    <h4 style="font-size:13px;color:var(--biru-gelap);">📊 Skor Legasi: ${Math.round(s.total)}/100</h4>

    <div class="lscore-row"><span>Pengaruh Politik</span><strong>${Math.round(s.pengaruh)}</strong></div>
    <div class="lscore-bar"><div class="lscore-fill" style="width:${s.pengaruh}%"></div></div>

    <div class="lscore-row"><span>Integriti</span><strong>${Math.round(s.integriti)}</strong></div>
    <div class="lscore-bar"><div class="lscore-fill" style="width:${s.integriti}%"></div></div>

    <div class="lscore-row"><span>Kekayaan</span><strong>${formatRM(p.wang + p.tabungan)}</strong></div>
    <div class="lscore-bar"><div class="lscore-fill" style="width:${clamp(s.kekayaan * 20, 0, 100)}%"></div></div>

    <h4 style="font-size:13px;color:var(--biru-gelap);margin-top:14px;">📜 Ringkasan Kehidupan</h4>
    <div class="stat-grid">
      <div class="stat-item"><label>Umur</label><strong>${p.umur}</strong></div>
      <div class="stat-item"><label>Tahap</label><strong>${p.level}</strong></div>
      <div class="stat-item"><label>Giliran</label><strong>${state.date.turn}</strong></div>
      <div class="stat-item"><label>Projek Siap</label><strong>${(state.projects || []).filter(x => x.status === 'Siap').length}</strong></div>
      <div class="stat-item"><label>Pencapaian</label><strong>${(state.achievements || []).length}/${ACHIEVEMENTS.length}</strong></div>
      <div class="stat-item"><label>Nilai Bersih</label><strong>${formatRM(state.finances.netWorth)}</strong></div>
    </div>

    ${(state.parlimen?.won?.length > 0 || state.dun?.won?.length > 0) ? `
      <h4 style="font-size:13px;color:var(--biru-gelap);margin-top:14px;">🎖️ Kerusi Dimenangi</h4>
      <ul style="font-size:12px;padding-left:18px;color:var(--kelabu-gelap);">
        ${(state.dun?.won || []).map(w => `<li>${w.kod} ${w.nama} (DUN) — ${w.tarikh}</li>`).join('')}
        ${(state.parlimen?.won || []).map(w => `<li>${w.kod} ${w.nama} (Parlimen) — ${w.tarikh}</li>`).join('')}
      </ul>
    ` : ''}
  `;

  $('#legacyFooter').innerHTML = `
    <button class="btn-secondary" onclick="document.getElementById('legacyModal').classList.remove('open')">Tutup</button>
    <button class="btn-primary" id="endLifeBtn" style="width:auto;margin:0;">🚪 Bersara Sekarang</button>
  `;

  setTimeout(() => {
    const btn = $('#endLifeBtn');
    if (btn) btn.onclick = () => {
      $('#legacyModal').classList.remove('open');
      showFinalReport();
    };
  }, 50);

  $('#legacyModal').classList.add('open');
}

/* ============ PILIHAN RAYA KECIL (AUTO) ============ */
function maybeTriggerByElection() {
  if (Math.random() > 0.1) return; // 10% peluang
  if (!state.player.party) return;

  const seat = pickRandom(PRU_SEATS);
  state.byElections.push({
    kod: seat.kod,
    nama: seat.nama,
    negeri: seat.negeri,
    giliran: state.date.turn,
    status: 'aktif'
  });

  addNews(`Pilihan raya kecil di ${seat.nama}`, 'Kerusi kosong mencetuskan PRK simulasi', 'POLITIK');
  showToast(`📮 PRK di ${seat.nama}! Sertai di Peta`, 'warn');
}

/* ============ EXTRA NAV 3 ============ */
function setupExtraNav3() {
  const nav = $('#extraNav3');
  if (!nav) return;

  const observer = new MutationObserver(() => {
    if ($('#game').classList.contains('active')) {
      nav.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
    }
  });
  observer.observe($('#game'), { attributes: true, attributeFilter: ['class'] });

  nav.querySelectorAll('[data-extra3]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.extra3;
      switch(action) {
        case 'pru': openPRUModal(); break;
        case 'chars': openAllCharactersModal(); break;
        case 'legacy': openLegacyModal(); break;
        case 'timeline': openTimelineModal(); break;
      }
    });
  });
}

/* ============ PATCH nextTurn UNTUK v3 ============ */
const _v2NextTurn = nextTurn;
nextTurn = function() {
  _v2NextTurn();
  // Proses modul v3
  processCharacterActions();
  processNewsChains();
  maybeTriggerCrisis();
  maybeTriggerByElection();
  checkAchievements();
  saveGame(true);
};

/* ============ PATCH init UNTUK v3 ============ */
const _v2Init = init;
init = function() {
  _v2Init();
  setupExtraNav3();
  initV3State();
};
/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS v4.0
   Modul Akhir: Graf, Audio, Cutscene, Peta SVG, Tema, PWA, Tetapan
   ============================================================ */

/* ============ THEME MANAGER ============ */
const THEME_KEY = 'sppm_theme';
const AVAILABLE_THEMES = ['blue', 'gold', 'green', 'red'];

function applyTheme(themeName) {
  if (!AVAILABLE_THEMES.includes(themeName)) themeName = 'blue';
  document.body.classList.remove('theme-blue', 'theme-gold', 'theme-green', 'theme-red');
  document.body.classList.add('theme-' + themeName);
  try { localStorage.setItem(THEME_KEY, themeName); } catch(e) {}
  settings.theme = themeName;
  saveSettings();
}

function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY) || 'blue';
    applyTheme(saved);
  } catch(e) {
    applyTheme('blue');
  }
}

function openThemePicker() {
  const current = settings.theme || 'blue';
  openModal('🎨 Pilih Tema Warna',
    `<p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">
      Pilih warna tema pilihan anda. Perubahan akan digunakan serta-merta.
    </p>
    <div class="theme-picker">
      <div class="theme-swatch ${current === 'blue' ? 'active' : ''}" data-theme="blue" title="Biru Klasik"></div>
      <div class="theme-swatch ${current === 'gold' ? 'active' : ''}" data-theme="gold" title="Emas Diraja"></div>
      <div class="theme-swatch ${current === 'green' ? 'active' : ''}" data-theme="green" title="Hijau Zamrud"></div>
      <div class="theme-swatch ${current === 'red' ? 'active' : ''}" data-theme="red" title="Merah Berani"></div>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
  setTimeout(() => {
    $$('#modalBody .theme-swatch').forEach(sw => {
      sw.onclick = () => {
        const theme = sw.dataset.theme;
        applyTheme(theme);
        $$('#modalBody .theme-swatch').forEach(x => x.classList.remove('active'));
        sw.classList.add('active');
        showToast(`Tema ditukar ke ${theme}`, 'success');
      };
    });
  }, 50);
}

/* ============ AUDIO MANAGER (Web Audio API) ============ */
const AudioManager = {
  ctx: null,
  enabled: true,
  muted: false,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch(e) { this.ctx = null; }
    this.enabled = settings.bunyi !== false;
    this.muted = settings.muted === true;
    this.updateIndicator();
  },

  playTone(freq, duration, type = 'sine', volume = 0.05) {
    if (!this.ctx || !this.enabled || this.muted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },

  click() { this.playTone(800, 0.06, 'sine', 0.03); },
  success() {
    this.playTone(523, 0.1, 'sine', 0.05);
    setTimeout(() => this.playTone(659, 0.1, 'sine', 0.05), 80);
    setTimeout(() => this.playTone(784, 0.15, 'sine', 0.05), 160);
  },
  error() {
    this.playTone(300, 0.15, 'sawtooth', 0.04);
    setTimeout(() => this.playTone(200, 0.2, 'sawtooth', 0.04), 100);
  },
  warn() {
    this.playTone(440, 0.1, 'triangle', 0.04);
    setTimeout(() => this.playTone(440, 0.1, 'triangle', 0.04), 150);
  },
  notify() {
    this.playTone(1000, 0.08, 'sine', 0.03);
    setTimeout(() => this.playTone(1200, 0.1, 'sine', 0.03), 60);
  },
  levelUp() {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.15, 'sine', 0.06), i * 90);
    });
  },
  victory() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.2, 'triangle', 0.08), i * 120);
    });
  },

  updateIndicator() {
    const ind = $('#audioIndicator');
    if (!ind) return;
    if (this.muted) {
      ind.textContent = '🔇';
      ind.classList.add('muted');
    } else {
      ind.textContent = '🔊';
      ind.classList.remove('muted');
    }
  }
};

function toggleMute() {
  AudioManager.muted = !AudioManager.muted;
  settings.muted = AudioManager.muted;
  saveSettings();
  AudioManager.updateIndicator();
  showToast(AudioManager.muted ? '🔇 Bunyi dimatikan' : '🔊 Bunyi dihidupkan', 'success');
}

/* ============ GRAF (Canvas API) ============ */

/* Graf Bar */
function drawBarChart(canvasId, data, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padding = { top: 20, right: 10, bottom: 40, left: 40 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const barW = chartW / data.length;
  const barGap = barW * 0.2;

  // Grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = '#8892a6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const val = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(val, padding.left - 6, y);
  }

  // Bars
  data.forEach((d, i) => {
    const x = padding.left + i * barW + barGap / 2;
    const barHeight = (d.value / maxVal) * chartH;
    const y = padding.top + chartH - barHeight;

    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, d.color || '#2c5aa0');
    gradient.addColorStop(1, d.color2 || '#1a3a6b');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, barW - barGap, barHeight, 4);
    } else {
      ctx.rect(x, y, barW - barGap, barHeight);
    }
    ctx.fill();

    // Label
    ctx.fillStyle = '#4a5568';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(d.label, x + (barW - barGap) / 2, h - padding.bottom + 8);

    // Value on top
    if (barHeight > 20) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(d.value, x + (barW - barGap) / 2, y + 4);
    }
  });
}

/* Graf Garis */
function drawLineChart(canvasId, series, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;

  ctx.clearRect(0, 0, w, h);

  const allValues = series.flatMap(s => s.data);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);
  const range = maxVal - minVal || 1;

  // Grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = '#8892a6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const val = Math.round(maxVal - (range / 4) * i);
    ctx.fillText(val, padding.left - 6, y);
  }

  // Lines
  series.forEach(s => {
    if (s.data.length < 2) return;
    ctx.strokeStyle = s.color || '#2c5aa0';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    s.data.forEach((val, i) => {
      const x = padding.left + (i / (s.data.length - 1)) * chartW;
      const y = padding.top + chartH - ((val - minVal) / range) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    ctx.fillStyle = s.color || '#2c5aa0';
    s.data.forEach((val, i) => {
      const x = padding.left + (i / (s.data.length - 1)) * chartW;
      const y = padding.top + chartH - ((val - minVal) / range) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

/* Graf Pai */
function drawPieChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) / 2 - 20;

  ctx.clearRect(0, 0, w, h);

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let startAngle = -Math.PI / 2;

  data.forEach(d => {
    const angle = (d.value / total) * Math.PI * 2;
    ctx.fillStyle = d.color || '#2c5aa0';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fill();

    // Label
    const midAngle = startAngle + angle / 2;
    const labelX = cx + Math.cos(midAngle) * (radius * 0.7);
    const labelY = cy + Math.sin(midAngle) * (radius * 0.7);
    if (angle > 0.3) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pct = Math.round((d.value / total) * 100);
      ctx.fillText(pct + '%', labelX, labelY);
    }

    startAngle += angle;
  });
}

/* Buka modal graf */
function openChartModal() {
  openModal('📊 Graf Statistik',
    `<div class="chart-container">
      <h4>📈 Statistik Utama</h4>
      <canvas id="chartStats" class="chart-canvas"></canvas>
    </div>
    <div class="chart-container">
      <h4>💼 Kemajuan Kerjaya</h4>
      <canvas id="chartCareer" class="chart-canvas"></canvas>
    </div>
    <div class="chart-container">
      <h4>🏛️ Pengaruh Politik</h4>
      <canvas id="chartPolitics" class="chart-canvas"></canvas>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
  setTimeout(() => {
    const p = state.player;
    // Graf 1: Statistik
    drawBarChart('chartStats', [
      { label: 'Populari', value: Math.round(p.popularity), color: '#2c5aa0', color2: '#1a3a6b' },
      { label: 'Integriti', value: Math.round(p.integrity), color: '#27ae60', color2: '#1e8449' },
      { label: 'Karisma', value: Math.round(p.charisma), color: '#d4af37', color2: '#8b6f1f' },
      { label: 'Kepimpi', value: Math.round(p.leadership), color: '#9b59b6', color2: '#6c3483' },
      { label: 'Kesihatan', value: Math.round(p.health), color: '#e74c3c', color2: '#922b21' },
      { label: 'Tekanan', value: Math.round(p.stress), color: '#f39c12', color2: '#b9770e' }
    ]);

    // Graf 2: Gaji vs Perbelanjaan
    const f = state.finances;
    drawBarChart('chartCareer', [
      { label: 'Pendapatan', value: Math.round(f.pendapatanBulanan / 100), color: '#27ae60', color2: '#1e8449' },
      { label: 'Perbelanjaan', value: Math.round(f.perbelanjaanBulanan / 100), color: '#e74c3c', color2: '#922b21' },
      { label: 'Aliran', value: Math.max(0, Math.round(f.cashFlow / 100)), color: '#2c5aa0', color2: '#1a3a6b' }
    ]);

    // Graf 3: Pengaruh politik
    drawBarChart('chartPolitics', [
      { label: 'Parti', value: Math.round(p.partyInfluence), color: '#2c5aa0', color2: '#1a3a6b' },
      { label: 'Akar U.', value: Math.round(p.grassrootsSupport), color: '#27ae60', color2: '#1e8449' },
      { label: 'Media', value: Math.round(p.mediaRelations), color: '#9b59b6', color2: '#6c3483' },
      { label: 'Awam', value: Math.round(p.publicTrust), color: '#d4af37', color2: '#8b6f1f' },
      { label: 'Kawasan', value: Math.round(p.constituencySupport), color: '#3498db', color2: '#1f6ca0' }
    ]);
  }, 100);
}

/* ============ CUTSCENE ============ */
let cutsceneTimer = null;

function playCutscene(emoji, title, sub, duration = 3500) {
  const cut = $('#cutscene');
  if (!cut) return;

  $('#cutEmoji').textContent = emoji;
  $('#cutTitle').textContent = title;
  $('#cutSub').textContent = sub;

  cut.classList.remove('hidden');
  AudioManager.victory();

  clearTimeout(cutsceneTimer);
  cutsceneTimer = setTimeout(skipCutscene, duration);
}

function skipCutscene() {
  clearTimeout(cutsceneTimer);
  const cut = $('#cutscene');
  if (cut) cut.classList.add('hidden');
}

/* Cutscene khusus */
function cutsceneAppointment(position) {
  playCutscene('🏛️', `Dilantik sebagai ${position}`, 'Simulasi fiksyen — bukan pelantikan sebenar', 4000);
}
function cutsceneVictory(seatName) {
  playCutscene('🎉', 'Kemenangan Pilihan Raya', `Anda memenangi kerusi ${seatName} dalam simulasi`, 4000);
}
function cutscenePM() {
  playCutscene('👑', 'Perdana Menteri (Simulasi)', 'Peraturan permainan — bukan proses perlembagaan sebenar', 5000);
}
function cutsceneLevelUp(level) {
  playCutscene('⭐', `Tahap ${level}`, 'Kemajuan kehidupan dalam simulasi', 2500);
}

/* ============ PETA SVG MALAYSIA (SIMPLIFIED) ============ */
function renderSVGMap() {
  const body = $('#svgMapBody');
  const p = state.player;
  const wonSeats = [
    ...(state.dun?.won || []).map(w => ({ ...w, jenis: 'DUN' })),
    ...(state.parlimen?.won || []).map(w => ({ ...w, jenis: 'Parlimen' }))
  ];

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:10px;">
      Peta skematik simulasi (bukan sempadan rasmi). Klik negeri untuk maklumat lanjut.
    </p>
    <div class="svg-map-wrap" id="mapWrap">
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <!-- Simplified Malaysia regions -->
        <!-- Perlis -->
        <polygon class="state-region" data-state="Perlis" points="55,60 75,55 80,75 60,80"/>
        <!-- Kedah -->
        <polygon class="state-region" data-state="Kedah" points="60,80 80,75 90,110 70,120 55,100"/>
        <!-- Penang -->
        <polygon class="state-region" data-state="Penang" points="48,115 65,120 60,135 45,130"/>
        <!-- Perak -->
        <polygon class="state-region" data-state="Perak" points="70,120 110,130 115,175 75,170 60,140"/>
        <!-- Kelantan -->
        <polygon class="state-region" data-state="Kelantan" points="115,70 145,65 155,105 120,115"/>
        <!-- Terengganu -->
        <polygon class="state-region" data-state="Terengganu" points="145,65 175,75 180,115 155,120 155,105"/>
        <!-- Pahang -->
        <polygon class="state-region" data-state="Pahang" points="120,115 180,115 195,180 125,180 115,150"/>
        <!-- Selangor -->
        <polygon class="state-region" data-state="Selangor" points="70,175 100,175 105,200 75,205"/>
        <!-- W.P. Kuala Lumpur -->
        <polygon class="state-region" data-state="W.P. Kuala Lumpur" points="98,197 108,197 108,207 98,207"/>
        <!-- Negeri Sembilan -->
        <polygon class="state-region" data-state="Negeri Sembilan" points="75,205 110,205 115,235 80,235"/>
        <!-- Melaka -->
        <polygon class="state-region" data-state="Melaka" points="80,240 105,240 108,260 83,260"/>
        <!-- Johor -->
        <polygon class="state-region" data-state="Johor" points="83,260 125,260 145,320 90,320 78,290"/>
        <!-- Sabah (kiri atas) -->
        <polygon class="state-region" data-state="Sabah" points="280,80 340,75 355,120 320,140 275,130"/>
        <!-- Sarawak -->
        <polygon class="state-region" data-state="Sarawak" points="275,130 320,140 355,120 360,180 300,190 265,170"/>
        <!-- W.P. Labuan -->
        <circle class="state-region" data-state="W.P. Labuan" cx="272" cy="128" r="6"/>
        <!-- W.P. Putrajaya -->
        <circle class="state-region" data-state="W.P. Putrajaya" cx="110" cy="205" r="4"/>
      </svg>
      <div class="map-tooltip" id="mapTooltip"></div>
    </div>
    <div class="chart-legend" style="margin-top:12px;justify-content:center;">
      <div class="chart-legend-item"><div class="chart-legend-dot" style="background:#c8d8e8;"></div>Negeri</div>
      <div class="chart-legend-item"><div class="chart-legend-dot" style="background:#2c5aa0;"></div>Pemain aktif</div>
      <div class="chart-legend-item"><div class="chart-legend-dot" style="background:#e74c3c;"></div>Kerusi dimenangi</div>
    </div>

    ${wonSeats.length > 0 ? `
      <h4 style="font-size:13px;color:var(--biru-gelap);margin-top:14px;">🎖️ Kerusi Dimenangi</h4>
      <ul style="font-size:12px;padding-left:18px;color:var(--kelabu-gelap);">
        ${wonSeats.map(w => `<li>${w.kod} ${w.nama} (${w.jenis}) — ${w.tarikh}</li>`).join('')}
      </ul>
    ` : '<p style="font-size:12px;color:var(--kelabu);text-align:center;margin-top:12px;">Belum ada kerusi dimenangi.</p>'}
  `;

  // Interaksi
  body.querySelectorAll('.state-region').forEach(region => {
    region.addEventListener('click', () => {
      const negeri = region.dataset.state;
      if (p.negeri === negeri) {
        showToast(`📍 Anda tinggal di ${negeri}`, 'success');
      }
      showStateConstituencies(negeri);
      $('#svgMapModal').classList.remove('open');
      setTimeout(() => $('#mapModal').classList.add('open'), 200);
    });

    region.addEventListener('mouseenter', (e) => {
      const tooltip = $('#mapTooltip');
      if (!tooltip) return;
      tooltip.textContent = region.dataset.state;
      tooltip.classList.add('show');
      const wrapRect = $('#mapWrap').getBoundingClientRect();
      tooltip.style.left = (e.clientX - wrapRect.left + 10) + 'px';
      tooltip.style.top = (e.clientY - wrapRect.top + 10) + 'px';
    });
    region.addEventListener('mouseleave', () => {
      const tooltip = $('#mapTooltip');
      if (tooltip) tooltip.classList.remove('show');
    });
  });
}

function openSVGMapModal() {
  initV3State();
  renderSVGMap();
  $('#svgMapModal').classList.add('open');
}

/* ============ TETAPAN LANJUTAN ============ */
function openAdvancedSettings() {
  $('#advSettingsBody').innerHTML = `
    <div class="settings-row">
      <div>
        <label>Auto-Simpan</label>
        <small>Simpan automatik setiap giliran</small>
      </div>
      <div class="toggle-switch">
        <input type="checkbox" id="setAutoSave" ${settings.autoSave !== false ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </div>
    </div>

    <div class="settings-row">
      <div>
        <label>Kesan Bunyi</label>
        <small>Bunyi klik, notifikasi, cutscene</small>
      </div>
      <div class="toggle-switch">
        <input type="checkbox" id="setSound" ${settings.bunyi !== false ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </div>
    </div>

    <div class="settings-row">
      <div>
        <label>Muzik Latar</label>
        <small>Muzik lembut sepanjang permainan</small>
      </div>
      <div class="toggle-switch">
        <input type="checkbox" id="setMusic" ${settings.muzik === true ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </div>
    </div>

    <div class="settings-row">
      <div>
        <label>Cutscene</label>
        <small>Animasi pelantikan & kemenangan</small>
      </div>
      <div class="toggle-switch">
        <input type="checkbox" id="setCutscene" ${settings.cutscene !== false ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </div>
    </div>

    <div class="form-group" style="margin-top:14px;">
      <label>Tahap Kesukaran</label>
      <select id="setDiffAdv">
        <option value="santai" ${settings.kesukaran==='santai'?'selected':''}>Santai — lebihan wang +50%, krisis jarang</option>
        <option value="seimbang" ${settings.kesukaran==='seimbang'?'selected':''}>Seimbang — pengalaman standard</option>
        <option value="mencabar" ${settings.kesukaran==='mencabar'?'selected':''}>Mencabar — kos +30%, krisis kerap</option>
      </select>
    </div>

    <div style="font-size:11px;color:var(--kelabu);margin-top:14px;padding:10px;background:var(--kelabu-cerah);border-radius:8px;">
      <strong>ℹ️ Maklumat:</strong><br>
      Versi: ${VERSION}<br>
      Modul: v1.0 + v2.0 + v3.0 + v4.0<br>
      PWA: ${'serviceWorker' in navigator ? 'Disokong' : 'Tidak disokong'}<br>
      Penyimpanan: LocalStorage
    </div>
  `;

  $('#advSettingsFooter').innerHTML = `
    <button class="btn-secondary" id="resetSaveBtn" style="color:var(--merah);">🗑️ Padam Semua Simpanan</button>
    <button class="btn-primary" id="saveAdvBtn" style="width:auto;margin:0;">Simpan</button>
  `;

  setTimeout(() => {
    $('#saveAdvBtn').onclick = () => {
      settings.autoSave = $('#setAutoSave').checked;
      settings.bunyi = $('#setSound').checked;
      settings.muzik = $('#setMusic').checked;
      settings.cutscene = $('#setCutscene').checked;
      settings.kesukaran = $('#setDiffAdv').value;
      saveSettings();
      AudioManager.enabled = settings.bunyi;
      AudioManager.updateIndicator();
      showToast('Tetapan disimpan', 'success');
    };
    $('#resetSaveBtn').onclick = () => {
      if (confirm('Padam SEMUA simpanan? Tindakan ini tidak boleh dibatalkan.')) {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(SAVE_KEY_PREFIX)) keys.push(k);
        }
        keys.forEach(k => localStorage.removeItem(k));
        localStorage.removeItem(SAVE_AUTO_KEY);
        showToast('Semua simpanan dipadam', 'warn');
      }
    };
  }, 50);

  $('#advSettingsModal').classList.add('open');
}

/* ============ SERVICE WORKER (PWA) ============ */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol === 'file:') {
    console.log('Service Worker tidak aktif pada file://');
    return;
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('✅ Service Worker didaftarkan:', reg.scope))
      .catch(err => console.log('⚠️ Service Worker gagal:', err));
  });
}

/* ============ EXTRA NAV 4 ============ */
function setupExtraNav4() {
  const nav = $('#extraNav4');
  if (!nav) return;

  const observer = new MutationObserver(() => {
    if ($('#game').classList.contains('active')) {
      nav.classList.remove('hidden');
      const ind = $('#audioIndicator');
      if (ind) ind.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
      const ind = $('#audioIndicator');
      if (ind) ind.classList.add('hidden');
    }
  });
  observer.observe($('#game'), { attributes: true, attributeFilter: ['class'] });

  nav.querySelectorAll('[data-extra4]').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioManager.click();
      const action = btn.dataset.extra4;
      switch(action) {
        case 'chart': openChartModal(); break;
        case 'svgmap': openSVGMapModal(); break;
        case 'advset': openAdvancedSettings(); break;
        case 'theme': openThemePicker(); break;
      }
    });
  });
}

/* ============ INTEGRASI AUDIO KE AKSI ============ */
/* Wrap showToast untuk main bunyi */
const _originalShowToast = showToast;
showToast = function(msg, type = '') {
  _originalShowToast(msg, type);
  if (type === 'success') AudioManager.success();
  else if (type === 'error') AudioManager.error();
  else if (type === 'warn') AudioManager.warn();
  else AudioManager.notify();
};

/* Wrap addXP / checkLevelUp */
const _originalCheckLevelUp = checkLevelUp;
checkLevelUp = function() {
  const beforeLevel = state.player.level;
  _originalCheckLevelUp();
  if (state.player.level > beforeLevel) {
    AudioManager.levelUp();
    if (settings.cutscene !== false) {
      cutsceneLevelUp(state.player.level);
    }
  }
};

/* Hook cutscene untuk kemenangan pilihan raya */
const _originalResolveCampaign = resolveCampaign;
resolveCampaign = function() {
  const beforePos = state.player.position;
  _originalResolveCampaign();
  if (settings.cutscene !== false && state.player.position !== beforePos && state.player.position) {
    setTimeout(() => cutsceneVictory(campaignState ? campaignState.kawasan.nama : ''), 500);
  }
};

/* Hook cutscene untuk pelantikan menteri */
const _originalLobbyMinister = lobbyMinister;
lobbyMinister = function() {
  const beforePos = state.player.position;
  _originalLobbyMinister();
  if (settings.cutscene !== false && state.player.position !== beforePos && state.player.position) {
    setTimeout(() => cutsceneAppointment(state.player.position), 500);
  }
};

/* ============ PATCH init UNTUK v4 ============ */
const _v3Init = init;
init = function() {
  _v3Init();

  // Load tema
  loadTheme();

  // Init audio
  AudioManager.init();

  // Setup extra nav v4
  setupExtraNav4();

  // Register service worker
  registerServiceWorker();

  // Simpan settings
  saveSettings();

  console.log('🎮 Simulator Parti Politik Malaysia v' + VERSION + ' dimuatkan');
  console.log('📦 Modul: v1.0 + v2.0 + v3.0 + v4.0');
};

/* ============================================================
   SIMULATOR PARTI POLITIK MALAYSIA — SCRIPT.JS v5.0
   Modul Akhir: I18N, Slot, Leaderboard, Story, Analitik, Notif, PDF
   ============================================================ */

/* ============ I18N — SISTEM BAHASA ============ */
const LANG_KEY = 'sppm_lang';
let currentLang = 'ms';

const I18N = {
  ms: {
    // Menu
    newGame: 'Permainan Baharu', newGameSub: 'Mula dari umur 18 tahun',
    continue: 'Sambung Permainan', continueSub: 'Teruskan dari simpanan terakhir',
    loadGame: 'Muatkan Permainan', loadSub: 'Pilih dari senarai simpanan',
    guide: 'Panduan', guideSub: 'Cara bermain',
    settings: 'Tetapan', settingsSub: 'Bunyi, kesukaran, paparan',
    credits: 'Kredit', creditsSub: 'Maklumat projek',
    language: 'Bahasa', languageSub: 'Melayu / English',
    storyMode: 'Mod Cerita', storySub: '3 senario khas',
    leaderboard: 'Leaderboard', leaderSub: 'Ranking tempatan',
    // Navigasi
    tabHome: 'Utama', tabFinance: 'Kewangan', tabCareer: 'Kerjaya',
    tabPolitics: 'Politik', tabNews: 'Berita',
    // Dashboard
    nextTurn: 'Teruskan 1 Bulan', nextTurnSub: 'Proses pendapatan, perbelanjaan & peristiwa',
    oneTurnEquals: 'Satu giliran = 1 bulan. Tekan butang di bawah untuk teruskan masa.',
    lifeProgress: 'Kemajuan Kehidupan', level: 'Tahap', xp: 'XP',
    mainStats: 'Statistik Utama', cash: 'Wang Tunai', career: 'Kerjaya',
    stress: 'Tekanan', integrity: 'Integriti', popularity: 'Populariti',
    netWorth: 'Nilai Bersih', politicalStatus: 'Status Politik',
    party: 'Parti', position: 'Jawatan', partyInfluence: 'Pengaruh Parti',
    grassroots: 'Sokongan Akar Umbi',
    notInParty: 'Anda belum menyertai mana-mana parti politik. Buka tab Politik untuk melihat peluang.',
    // Slot
    slotTitle: '🕹️ Slot Simpanan', slotEmpty: 'Kosong — Klik untuk simpan',
    slotAuto: 'Auto-Save', slotActive: 'Aktif', slotSave: 'Simpan', slotLoad: 'Muat',
    slotDelete: 'Padam', slotNewHere: 'Simpan permainan semasa di sini',
    slotConfirmDelete: 'Padam slot ini? Tindakan ini tidak boleh dibatalkan.',
    slotSaved: 'Permainan disimpan', slotLoaded: 'Permainan dimuatkan',
    // Leaderboard
    lbTitle: '🏅 Leaderboard Tempatan', lbEmpty: 'Belum ada rekod. Mainkan permainan dan bersara untuk rekod.',
    lbYourRank: 'Kedudukan Anda', lbScore: 'Skor',
    // Story
    storyTitle: '🎭 Mod Cerita', storyDesc: 'Pilih senario permulaan yang berbeza',
    storyStart: 'Mula Senario',
    // Analitik
    analyticsTitle: '📊 Analitik Peribadi',
    // Notif
    notifTitle: '🔔 Notifikasi', notifMarkAll: 'Tandakan Semua Dibaca',
    notifClearAll: 'Kosongkan Semua', notifEmpty: 'Tiada notifikasi',
    // PDF
    pdfTitle: '📤 Laporan Boleh Cetak', pdfPrint: 'Cetak / Simpan PDF',
    // Language
    langTitle: '🌐 Bahasa', langDesc: 'Pilih bahasa antara muka',
    // Umum
    close: 'Tutup', cancel: 'Batal', save: 'Simpan', confirm: 'Sahkan',
    delete: 'Padam', yes: 'Ya', no: 'Tidak'
  },
  en: {
    // Menu
    newGame: 'New Game', newGameSub: 'Start from age 18',
    continue: 'Continue Game', continueSub: 'Resume from last save',
    loadGame: 'Load Game', loadSub: 'Choose from save list',
    guide: 'Guide', guideSub: 'How to play',
    settings: 'Settings', settingsSub: 'Sound, difficulty, display',
    credits: 'Credits', creditsSub: 'Project info',
    language: 'Language', languageSub: 'Malay / English',
    storyMode: 'Story Mode', storySub: '3 special scenarios',
    leaderboard: 'Leaderboard', leaderSub: 'Local ranking',
    // Navigation
    tabHome: 'Home', tabFinance: 'Finance', tabCareer: 'Career',
    tabPolitics: 'Politics', tabNews: 'News',
    // Dashboard
    nextTurn: 'Continue 1 Month', nextTurnSub: 'Process income, expenses & events',
    oneTurnEquals: 'One turn = 1 month. Press the button below to advance time.',
    lifeProgress: 'Life Progress', level: 'Level', xp: 'XP',
    mainStats: 'Main Stats', cash: 'Cash', career: 'Career',
    stress: 'Stress', integrity: 'Integrity', popularity: 'Popularity',
    netWorth: 'Net Worth', politicalStatus: 'Political Status',
    party: 'Party', position: 'Position', partyInfluence: 'Party Influence',
    grassroots: 'Grassroots Support',
    notInParty: 'You have not joined any political party. Open Politics tab for opportunities.',
    // Slot
    slotTitle: '🕹️ Save Slots', slotEmpty: 'Empty — Click to save',
    slotAuto: 'Auto-Save', slotActive: 'Active', slotSave: 'Save', slotLoad: 'Load',
    slotDelete: 'Delete', slotNewHere: 'Save current game here',
    slotConfirmDelete: 'Delete this slot? This action cannot be undone.',
    slotSaved: 'Game saved', slotLoaded: 'Game loaded',
    // Leaderboard
    lbTitle: '🏅 Local Leaderboard', lbEmpty: 'No records yet. Play and retire to record.',
    lbYourRank: 'Your Rank', lbScore: 'Score',
    // Story
    storyTitle: '🎭 Story Mode', storyDesc: 'Choose a different starting scenario',
    storyStart: 'Start Scenario',
    // Analitik
    analyticsTitle: '📊 Personal Analytics',
    // Notif
    notifTitle: '🔔 Notifications', notifMarkAll: 'Mark All Read',
    notifClearAll: 'Clear All', notifEmpty: 'No notifications',
    // PDF
    pdfTitle: '📤 Printable Report', pdfPrint: 'Print / Save PDF',
    // Language
    langTitle: '🌐 Language', langDesc: 'Choose interface language',
    // Umum
    close: 'Close', cancel: 'Cancel', save: 'Save', confirm: 'Confirm',
    delete: 'Delete', yes: 'Yes', no: 'No'
  }
};

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.ms[key]) || key;
}

function setLanguage(lang) {
  currentLang = I18N[lang] ? lang : 'ms';
  try { localStorage.setItem(LANG_KEY, currentLang); } catch(e) {}
  settings.language = currentLang;
  saveSettings();
  updateUILanguage();
  showToast(currentLang === 'ms' ? '✅ Bahasa: Melayu' : '✅ Language: English', 'success');
}

function loadLanguage() {
  try {
    const saved = localStorage.getItem(LANG_KEY) || 'ms';
    currentLang = saved;
    settings.language = saved;
  } catch(e) { currentLang = 'ms'; }
}

function updateUILanguage() {
  // Update menu utama
  const map = [
    ['#btnNewGame .btn-text strong', 'newGame'],
    ['#btnNewGame .btn-text small', 'newGameSub'],
    ['#btnContinueGame .btn-text strong', 'continue'],
    ['#btnLoadGame .btn-text strong', 'loadGame'],
    ['#btnLoadGame .btn-text small', 'loadSub'],
    ['#btnGuide .btn-text strong', 'guide'],
    ['#btnGuide .btn-text small', 'guideSub'],
    ['#btnSettings .btn-text strong', 'settings'],
    ['#btnSettings .btn-text small', 'settingsSub'],
    ['#btnCredits .btn-text strong', 'credits'],
    ['#btnCredits .btn-text small', 'creditsSub'],
    ['#btnLangLabel', 'language'],
    ['#btnLangSub', 'languageSub'],
    ['#btnStoryLabel', 'storyMode'],
    ['#btnStorySub', 'storySub'],
    ['#btnLeaderLabel', 'leaderboard'],
    ['#btnLeaderSub', 'leaderSub']
  ];
  map.forEach(([sel, key]) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  });

  // Update bottom nav
  const navMap = {
    dashboard: 'tabHome', finance: 'tabFinance', career: 'tabCareer',
    politics: 'tabPolitics', news: 'tabNews'
  };
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const key = navMap[btn.dataset.tab];
    if (key) {
      const label = btn.querySelector('.nav-label');
      if (label) label.textContent = t(key);
    }
  });

  // Refresh permainan jika ada
  if (state && $('#game').classList.contains('active')) {
    renderGame();
  }
}

function openLanguageModal() {
  const body = $('#langBody');
  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">${t('langDesc')}</p>
    <div class="lang-grid">
      <button class="lang-option ${currentLang === 'ms' ? 'active' : ''}" data-lang="ms">
        <span class="lang-flag">🇲🇾</span>
        <span class="lang-name">Bahasa Melayu</span>
      </button>
      <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
        <span class="lang-flag">🇬🇧</span>
        <span class="lang-name">English</span>
      </button>
    </div>
  `;
  body.querySelectorAll('[data-lang]').forEach(btn => {
    btn.onclick = () => {
      setLanguage(btn.dataset.lang);
      openLanguageModal();
    };
  });
  $('#langModal').classList.add('open');
}

/* ============ NOTIFIKASI MANAGER ============ */
const NotifManager = {
  items: [],
  max: 100,

  init() {
    if (!state) return;
    if (!state.notifications) state.notifications = [];
    this.items = state.notifications;
    this.updateBadge();
  },

  push(emoji, title, msg, category = 'info') {
    const notif = {
      id: uid(),
      tarikh: state ? state.date.label : new Date().toLocaleDateString(),
      emoji, title, msg,
      category,
      read: false,
      timestamp: Date.now()
    };
    this.items.unshift(notif);
    if (this.items.length > this.max) this.items = this.items.slice(0, this.max);
    if (state) state.notifications = this.items;
    this.updateBadge();
  },

  markAllRead() {
    this.items.forEach(n => n.read = true);
    if (state) state.notifications = this.items;
    this.updateBadge();
    saveGame(true);
  },

  clearAll() {
    this.items = [];
    if (state) state.notifications = [];
    this.updateBadge();
    saveGame(true);
  },

  unreadCount() {
    return this.items.filter(n => !n.read).length;
  },

  updateBadge() {
    const badge = $('#notifBadge');
    if (!badge) return;
    const count = this.unreadCount();
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
    // Update badge di side link
    const sideNotif = document.querySelector('[data-extra5="notif"]');
    if (sideNotif) {
      const existing = sideNotif.querySelector('.link-badge');
      if (count > 0) {
        if (existing) existing.textContent = count;
        else {
          const span = document.createElement('span');
          span.className = 'link-badge';
          span.textContent = count;
          sideNotif.appendChild(span);
        }
      } else if (existing) {
        existing.remove();
      }
    }
  }
};

function openNotifModal() {
  NotifManager.init();
  const body = $('#notifBody');
  const items = NotifManager.items;

  if (items.length === 0) {
    body.innerHTML = `<p style="text-align:center;color:var(--kelabu);padding:20px;font-size:13px;">${t('notifEmpty')}</p>`;
  } else {
    body.innerHTML = `
      <div style="font-size:12px;">
        ${items.slice(0, 40).map(n => `
          <div class="notif-item ${n.category} ${n.read ? '' : 'unread'}">
            <span class="notif-icon">${n.emoji}</span>
            <div class="notif-content">
              <strong>${n.title}</strong>
              <div style="font-size:12px;color:var(--kelabu-gelap);margin:2px 0;">${n.msg}</div>
              <small>${n.tarikh}</small>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    // Auto-mark read
    setTimeout(() => NotifManager.markAllRead(), 500);
  }

  $('#notifFooter').innerHTML = `
    <button class="btn-secondary" id="notifClearBtn">${t('notifClearAll')}</button>
    <button class="btn-primary" onclick="document.getElementById('notifModal').classList.remove('open')" style="width:auto;margin:0;">${t('close')}</button>
  `;

  setTimeout(() => {
    const clearBtn = $('#notifClearBtn');
    if (clearBtn) clearBtn.onclick = () => {
      if (confirm('Kosongkan semua notifikasi?')) {
        NotifManager.clearAll();
        openNotifModal();
      }
    };
  }, 50);

  $('#notifModal').classList.add('open');
}

/* ============ SLOT SIMPANAN ============ */
const SLOT_PREFIX = 'sppm_slot_';
const MAX_SLOTS = 6;

function getSlotKey(n) { return SLOT_PREFIX + n; }

function listSlotSaves() {
  const slots = [];
  for (let i = 1; i <= MAX_SLOTS; i++) {
    const raw = localStorage.getItem(getSlotKey(i));
    if (raw) {
      try {
        const d = JSON.parse(raw);
        slots.push({
          num: i,
          kosong: false,
          nama: d.player.nama,
          level: d.player.level,
          position: d.player.position,
          umur: d.player.umur,
          tarikh: d.date.label,
          giliran: d.date.turn,
          wang: d.player.wang,
          savedAt: d.savedAt || Date.now()
        });
      } catch(e) {
        slots.push({ num: i, kosong: true });
      }
    } else {
      slots.push({ num: i, kosong: true });
    }
  }
  return slots;
}

function saveToSlot(n) {
  if (!state) { showToast('Tiada permainan aktif', 'error'); return; }
  state.savedAt = Date.now();
  try {
    localStorage.setItem(getSlotKey(n), JSON.stringify(state));
    showToast(`${t('slotSaved')} — Slot ${n}`, 'success');
    if (state) NotifManager.push('💾', 'Permainan Disimpan', `Slot ${n}`, 'info');
  } catch(e) {
    showToast('Gagal simpan', 'error');
  }
}

function loadFromSlot(n) {
  try {
    const raw = localStorage.getItem(getSlotKey(n));
    if (!raw) { showToast('Slot kosong', 'warn'); return; }
    if (state && !confirm('Muatkan slot ini? Permainan semasa akan diganti.')) return;
    state = JSON.parse(raw);
    enterGame();
    NotifManager.init();
    showToast(`${t('slotLoaded')} — Slot ${n}`, 'success');
  } catch(e) {
    showToast('Slot rosak', 'error');
  }
}

function deleteSlot(n) {
  if (!confirm(t('slotConfirmDelete'))) return;
  localStorage.removeItem(getSlotKey(n));
  showToast(`Slot ${n} dipadam`, 'warn');
  openSlotsModal();
}

function openSlotsModal() {
  const slots = listSlotSaves();
  const body = $('#slotsBody');

  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:12px;">
      ${currentLang === 'ms' ? 'Simpan atau muatkan permainan dalam mana-mana slot.' : 'Save or load your game in any slot.'}
    </p>

    <!-- Auto-save slot -->
    ${localStorage.getItem(SAVE_AUTO_KEY) ? (() => {
      try {
        const auto = JSON.parse(localStorage.getItem(SAVE_AUTO_KEY));
        return `
          <div class="slot-card auto" data-slot="auto">
            <div class="slot-num">A</div>
            <div class="slot-info">
              <strong>${t('slotAuto')} — ${auto.player.nama}</strong>
              <small>${auto.player.position || (currentLang === 'ms' ? 'Rakyat' : 'Citizen')} • ${auto.date.label}</small>
              <div class="slot-meta">
                <span>Lvl ${auto.player.level}</span>
                <span>${formatRM(auto.player.wang)}</span>
                <span>${currentLang === 'ms' ? 'Giliran' : 'Turn'} ${auto.date.turn}</span>
              </div>
            </div>
          </div>
        `;
      } catch(e) { return ''; }
    })() : ''}

    <div class="slot-grid">
      ${slots.map(s => {
        if (s.kosong) {
          return `
            <button class="slot-card empty" data-slot="${s.num}" data-action="save">
              <div class="slot-num">${s.num}</div>
              <div class="slot-info">
                <strong>Slot ${s.num}</strong>
                <small>${t('slotEmpty')}</small>
              </div>
            </button>
          `;
        }
        return `
          <div class="slot-card" data-slot="${s.num}">
            <div class="slot-num">${s.num}</div>
            <div class="slot-info">
              <strong>${s.nama}</strong>
              <small>${s.position || (currentLang === 'ms' ? 'Rakyat' : 'Citizen')} • ${s.tarikh}</small>
              <div class="slot-meta">
                <span>Lvl ${s.level}</span>
                <span>${formatRM(s.wang)}</span>
                <span>${currentLang === 'ms' ? 'Umur' : 'Age'} ${s.umur}</span>
              </div>
            </div>
            <div class="slot-actions">
              <button data-action="load" data-slot="${s.num}" title="${t('slotLoad')}">📂</button>
              <button data-action="save" data-slot="${s.num}" title="${t('slotSave')}">💾</button>
              <button data-action="delete" data-slot="${s.num}" title="${t('slotDelete')}">🗑️</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  body.querySelectorAll('[data-action]').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      const action = el.dataset.action;
      const slot = parseInt(el.dataset.slot);
      if (action === 'save') saveToSlot(slot);
      else if (action === 'load') loadFromSlot(slot);
      else if (action === 'delete') deleteSlot(slot);
      if (action !== 'delete') openSlotsModal();
    };
  });

  // Klik kosong slot → simpan
  body.querySelectorAll('.slot-card.empty').forEach(el => {
    el.onclick = () => {
      saveToSlot(parseInt(el.dataset.slot));
      openSlotsModal();
    };
  });

  $('#slotsFooter').innerHTML = `
    <button class="btn-secondary" onclick="document.getElementById('slotsModal').classList.remove('open')">${t('close')}</button>
  `;

  $('#slotsModal').classList.add('open');
}

/* ============ LEADERBOARD ============ */
const LB_KEY = 'sppm_leaderboard';

function recordToLeaderboard() {
  if (!state) return;
  const score = calculateLegacyScore(state);
  const record = {
    nama: state.player.nama,
    negeri: state.player.negeri,
    position: state.player.position || 'Rakyat',
    level: state.player.level,
    umur: state.player.umur,
    giliran: state.date.turn,
    skor: Math.round(score.total),
    rank: score.total >= 85 ? 'LEGENDA' :
          score.total >= 70 ? 'NEGARAWAN' :
          score.total >= 55 ? 'PEMIMPIN' :
          score.total >= 40 ? 'AKTIVIS' : 'RAKYAT',
    tarikh: new Date().toLocaleDateString(),
    timestamp: Date.now()
  };
  try {
    const list = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
    list.push(record);
    list.sort((a, b) => b.skor - a.skor);
    const trimmed = list.slice(0, 20);
    localStorage.setItem(LB_KEY, JSON.stringify(trimmed));
  } catch(e) {}
}

function openLeaderboardModal() {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
  } catch(e) {}

  const body = $('#leaderboardBody');
  if (list.length === 0) {
    body.innerHTML = `<p style="text-align:center;color:var(--kelabu);padding:24px;font-size:13px;">${t('lbEmpty')}</p>`;
  } else {
    body.innerHTML = `
      <p style="font-size:12px;color:var(--kelabu);margin-bottom:10px;">
        ${currentLang === 'ms' ? 'Rekod pemain terdahulu pada peranti ini.' : 'Records of previous players on this device.'}
      </p>
      <div class="leader-list">
        ${list.map((r, i) => `
          <div class="leader-item rank-${i + 1}">
            <div class="leader-rank">${i + 1}</div>
            <div class="leader-info">
              <strong>${r.nama}</strong>
              <small>${r.position} • ${r.negeri} • ${currentLang === 'ms' ? 'Umur' : 'Age'} ${r.umur}</small>
              <small style="color:var(--emas);font-weight:600;letter-spacing:1px;">${r.rank}</small>
            </div>
            <div class="leader-score">
              <strong>${r.skor}</strong>
              <small>${t('lbScore')}</small>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  $('#leaderboardModal').classList.add('open');
}

/* ============ MOD CERITA ============ */
const STORIES = [
  {
    id: 'S01',
    emoji: '🎣',
    tajuk: 'Anak Nelayan',
    sub: 'Dari Kampung ke Parlimen',
    desk: 'Anda dibesarkan dalam keluarga nelayan di pantai Timur. Ibu bapa bekerja keras menampung keluarga. Anda bercita-cita tinggi dan ingin mengubah nasib keluarga.',
    tags: ['Keluarga B40', 'Pantai Timur', 'Semangat Tinggi'],
    diff: 'medium',
    start: {
      negeri: 'Kelantan',
      latar: 'B40',
      wang: 300,
      pendidikan: 'SPM',
      kerjaya: 'Pekerja Separuh Masa',
      matlamat: 'politik',
      minatPolitik: 7,
      integrity: 60,
      charisma: 55,
      popularity: 15
    }
  },
  {
    id: 'S02',
    emoji: '📚',
    tajuk: 'Anak Guru',
    sub: 'Didikan & Perjuangan',
    desk: 'Ibu bapa anda guru sekolah. Anda dibesarkan dalam suasana ilmiah. Diharapkan menjadi pemimpin berpendidikan yang memperjuangkan pendidikan untuk semua.',
    tags: ['Keluarga M40', 'Pendidikan', 'Idealisme'],
    diff: 'easy',
    start: {
      negeri: 'Johor',
      latar: 'M40',
      wang: 1500,
      pendidikan: 'Diploma',
      kerjaya: 'Guru',
      matlamat: 'masyarakat',
      minatPolitik: 5,
      integrity: 70,
      charisma: 50,
      popularity: 20
    }
  },
  {
    id: 'S03',
    emoji: '💼',
    tajuk: 'Anak Pedagang',
    sub: 'Bisnes & Pengaruh',
    desk: 'Keluarga anda berniaga di bandar. Anda mahir dalam perniagaan dan rangkaian. Cita-cita anda adalah menggabungkan perniagaan dengan kepimpinan politik.',
    tags: ['Keluarga T20', 'Perniagaan', 'Rangkaian'],
    diff: 'hard',
    start: {
      negeri: 'Selangor',
      latar: 'T20',
      wang: 15000,
      pendidikan: 'Ijazah Sarjana Muda',
      kerjaya: 'Pengurus',
      matlamat: 'kaya',
      minatPolitik: 4,
      integrity: 45,
      charisma: 65,
      popularity: 25
    }
  }
];

function openStoryModal() {
  const body = $('#storyBody');
  body.innerHTML = `
    <p style="font-size:12px;color:var(--kelabu);margin-bottom:14px;">${t('storyDesc')}</p>
    ${STORIES.map(s => `
      <div class="story-card" data-story="${s.id}">
        <div class="story-diff ${s.diff}">${s.diff.toUpperCase()}</div>
        <div class="story-header">
          <span class="story-icon">${s.emoji}</span>
          <div>
            <div class="story-title">${s.tajuk}</div>
            <div class="story-sub">${s.sub}</div>
          </div>
        </div>
        <div class="story-desc">${s.desk}</div>
        <div class="story-tags">
          ${s.tags.map(tag => `<span class="story-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('')}
  `;
  body.querySelectorAll('[data-story]').forEach(el => {
    el.onclick = () => {
      const id = el.dataset.story;
      startStory(id);
    };
  });
  $('#storyModal').classList.add('open');
}

function startStory(storyId) {
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return;
  if (state && !confirm(currentLang === 'ms' ? 'Mulakan cerita ini? Permainan semasa akan diganti.' : 'Start this story? Current game will be replaced.')) return;

  const nama = prompt(currentLang === 'ms' ? 'Nama watak anda:' : 'Your character name:', 'Ahmad');
  if (!nama) return;

  const s = story.start;
  const careerData = CAREERS[s.kerjaya] || CAREERS['Tiada Kerja'];

  state = {
    version: VERSION,
    createdAt: Date.now(),
    story: story.id,
    player: {
      nama: nama.trim(),
      umur: 18,
      jantina: 'Lelaki',
      negeri: s.negeri,
      pendidikan: s.pendidikan,
      latar: s.latar,
      matlamat: s.matlamat,
      minatPolitik: s.minatPolitik,
      avatar: nama.trim().charAt(0).toUpperCase(),
      level: 0,
      xp: 0,
      wang: s.wang,
      tabungan: 0,
      hutang: 0,
      aset: 0,
      career: s.kerjaya,
      gaji: careerData.gaji,
      stress: 0,
      health: 100,
      popularity: s.popularity,
      integrity: s.integrity,
      charisma: s.charisma,
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
      party: null,
      position: null,
      positions: [],
      housing: 'IbuBapa',
      pasangan: null,
      anak: 0,
      tanggungan: 0
    },
    date: { year: 2025, month: 0, turn: 1, label: 'Jan 2025' },
    finances: {
      pendapatanBulanan: careerData.gaji,
      perbelanjaanBulanan: 800,
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
    activityHistory: [],
    notifications: []
  };

  CHARACTERS.forEach(c => {
    state.relationships[c.id] = {
      score: randomInt(0, 20),
      trust: 10, loyalty: 10, respect: 10,
      memory: []
    };
  });

  state.news.unshift({
    id: uid(), tarikh: state.date.label,
    tajuk: `Cerita: ${story.tajuk}`,
    kategori: 'UMUM',
    ringkasan: story.desk,
    status: 'Disahkan dalam dunia simulasi'
  });

  recalcFinances();
  $('#storyModal').classList.remove('open');
  $('#mainMenu').classList.remove('active');
  saveGame(true);
  enterGame();
  NotifManager.init();
  NotifManager.push(story.emoji, story.tajuk, story.sub, 'gold');
  showToast(`📖 ${story.tajuk}`, 'success');

  if (settings.cutscene !== false) {
    playCutscene(story.emoji, story.tajuk, story.sub, 3500);
  }
}

/* ============ ANALITIK PERIBADI ============ */
function openAnalyticsModal() {
  if (!state) return;
  const p = state.player;
  const f = state.finances;
  const legacy = calculateLegacyScore(state);

  const totalEvents = state.eventHistory.length;
  const totalNews = state.news.length;
  const totalProjects = (state.projects || []).length;
  const siapProjects = (state.projects || []).filter(x => x.status === 'Siap').length;
  const totalTasks = (state.tasks?.selesai?.length || 0) + (state.tasks?.aktif?.length || 0);

  $('#analyticsBody').innerHTML = `
    <div class="analytics-section">
      <h4>📊 Ringkasan Permainan</h4>
      <div class="analytics-grid">
        <div class="analytics-item">
          <label>Total Giliran</label>
          <strong>${state.date.turn}</strong>
        </div>
        <div class="analytics-item">
          <label>Umur</label>
          <strong>${p.umur}</strong>
        </div>
        <div class="analytics-item">
          <label>Level</label>
          <strong>${p.level}</strong>
        </div>
        <div class="analytics-item">
          <label>Skor Legasi</label>
          <strong>${Math.round(legacy.total)}</strong>
        </div>
      </div>
    </div>

    <div class="analytics-section">
      <h4>💰 Kewangan</h4>
      <div class="analytics-grid">
        <div class="analytics-item ${p.wang > 5000 ? 'good' : p.wang < 500 ? 'bad' : ''}">
          <label>Wang Tunai</label>
          <strong>${formatRM(p.wang)}</strong>
        </div>
        <div class="analytics-item">
          <label>Nilai Bersih</label>
          <strong>${formatRM(f.netWorth)}</strong>
        </div>
        <div class="analytics-item ${p.hutang > 0 ? 'warn' : 'good'}">
          <label>Hutang</label>
          <strong>${formatRM(p.hutang)}</strong>
        </div>
        <div class="analytics-item">
          <label>Aliran / Bulan</label>
          <strong>${formatRM(f.cashFlow)}</strong>
        </div>
      </div>
    </div>

    <div class="analytics-section">
      <h4>📈 Aktiviti</h4>
      <div class="analytics-grid">
        <div class="analytics-item">
          <label>Peristiwa Dilalui</label>
          <strong>${totalEvents}</strong>
        </div>
        <div class="analytics-item">
          <label>Berita Direkod</label>
          <strong>${totalNews}</strong>
        </div>
        <div class="analytics-item">
          <label>Projek (Siap/Total)</label>
          <strong>${siapProjects}/${totalProjects}</strong>
        </div>
        <div class="analytics-item">
          <label>Tugasan</label>
          <strong>${totalTasks}</strong>
        </div>
      </div>
    </div>

    <div class="analytics-section">
      <h4>🏛️ Politik</h4>
      <div class="analytics-grid">
        <div class="analytics-item">
          <label>Parti</label>
          <strong>${p.party ? p.party.singkatan : '-'}</strong>
        </div>
        <div class="analytics-item">
          <label>Jawatan</label>
          <strong>${p.position || '-'}</strong>
        </div>
        <div class="analytics-item">
          <label>Populariti</label>
          <strong>${Math.round(p.popularity)}</strong>
        </div>
        <div class="analytics-item">
          <label>Integriti</label>
          <strong>${Math.round(p.integrity)}</strong>
        </div>
      </div>
    </div>

    <div class="analytics-section">
      <h4>🏆 Pencapaian</h4>
      <p style="font-size:12px;color:var(--kelabu-gelap);">
        ${(state.achievements || []).length} / ${ACHIEVEMENTS.length} pencapaian dibuka
      </p>
      <div class="progress-bar" style="margin-top:8px;">
        <div class="progress-fill" style="width:${((state.achievements?.length || 0) / ACHIEVEMENTS.length) * 100}%"></div>
      </div>
    </div>

    ${state.story ? `
      <div class="analytics-section" style="background:linear-gradient(135deg,#fffbea,#fff);">
        <h4>📖 Mod Cerita</h4>
        <p style="font-size:12px;color:var(--kelabu-gelap);">
          Anda bermain dalam cerita: <strong>${STORIES.find(x => x.id === state.story)?.tajuk || 'Tidak diketahui'}</strong>
        </p>
      </div>
    ` : ''}
  `;

  $('#analyticsModal').classList.add('open');
}

/* ============ LAPORAN PDF ============ */
function openPDFReport() {
  if (!state) return;
  const p = state.player;
  const f = state.finances;
  const legacy = calculateLegacyScore(state);
  const tarikh = new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });

  const html = `
    <div class="pdf-preview" id="pdfPreview">
      <h1>LAPORAN LEGASI</h1>
      <div class="pdf-subtitle">Simulator Parti Politik Malaysia — Laporan Rasmi Simulasi</div>

      <h2>Maklumat Pemain</h2>
      <table>
        <tr><th width="30%">Nama</th><td>${p.nama}</td></tr>
        <tr><th>Umur</th><td>${p.umur} tahun</td></tr>
        <tr><th>Negeri</th><td>${p.negeri}</td></tr>
        <tr><th>Jantina</th><td>${p.jantina}</td></tr>
        <tr><th>Pendidikan</th><td>${p.pendidikan}</td></tr>
        <tr><th>Latar Keluarga</th><td>${p.latar}</td></tr>
      </table>

      <h2>Kerjaya</h2>
      <table>
        <tr><th width="30%">Kerjaya Semasa</th><td>${p.career}</td></tr>
        <tr><th>Gaji Bulanan</th><td>${formatRM(p.gaji)}</td></tr>
        <tr><th>Tahap</th><td>${p.level} — ${LEVELS[p.level].nama}</td></tr>
        <tr><th>Pengalaman</th><td>${p.experience}</td></tr>
        <tr><th>XP</th><td>${p.xp}</td></tr>
      </table>

      <h2>Kewangan</h2>
      <table>
        <tr><th width="30%">Wang Tunai</th><td>${formatRM(p.wang)}</td></tr>
        <tr><th>Tabungan</th><td>${formatRM(p.tabungan)}</td></tr>
        <tr><th>Aset</th><td>${formatRM(p.aset)}</td></tr>
        <tr><th>Hutang</th><td>${formatRM(p.hutang)}</td></tr>
        <tr><th>Nilai Bersih</th><td>${formatRM(f.netWorth)}</td></tr>
        <tr><th>Pendapatan / Bulan</th><td>${formatRM(f.pendapatanBulanan)}</td></tr>
        <tr><th>Perbelanjaan / Bulan</th><td>${formatRM(f.perbelanjaanBulanan)}</td></tr>
        <tr><th>Aliran Tunai</th><td>${formatRM(f.cashFlow)}</td></tr>
      </table>

      <h2>Politik</h2>
      <table>
        <tr><th width="30%">Parti</th><td>${p.party ? p.party.nama + ' (' + p.party.singkatan + ')' : 'Tiada'}</td></tr>
        <tr><th>Jawatan</th><td>${p.position || 'Tiada'}</td></tr>
        <tr><th>Populariti</th><td>${Math.round(p.popularity)} / 100</td></tr>
        <tr><th>Integriti</th><td>${Math.round(p.integrity)} / 100</td></tr>
        <tr><th>Karisma</th><td>${Math.round(p.charisma)} / 100</td></tr>
        <tr><th>Kepimpinan</th><td>${Math.round(p.leadership)} / 100</td></tr>
        <tr><th>Pengaruh Parti</th><td>${Math.round(p.partyInfluence)} / 100</td></tr>
        <tr><th>Sokongan Akar Umbi</th><td>${Math.round(p.grassrootsSupport)} / 100</td></tr>
      </table>

      ${(state.dun?.won?.length > 0 || state.parlimen?.won?.length > 0) ? `
        <h2>Kerusi Dimenangi</h2>
        <ul>
          ${(state.dun?.won || []).map(w => `<li>${w.kod} ${w.nama} (DUN) — ${w.tarikh}</li>`).join('')}
          ${(state.parlimen?.won || []).map(w => `<li>${w.kod} ${w.nama} (Parlimen) — ${w.tarikh}</li>`).join('')}
        </ul>
      ` : ''}

      ${(state.projects && state.projects.length > 0) ? `
        <h2>Projek Pembangunan</h2>
        <table>
          <tr><th>Nama Projek</th><th>Kos</th><th>Status</th><th>Manfaat</th></tr>
          ${state.projects.map(pr => `
            <tr>
              <td>${pr.nama}</td>
              <td>${formatRM(pr.kos)}</td>
              <td>${pr.status}</td>
              <td>${pr.manfaat}</td>
            </tr>
          `).join('')}
        </table>
      ` : ''}

      ${(state.achievements && state.achievements.length > 0) ? `
        <h2>Pencapaian</h2>
        <ul>
          ${state.achievements.map(a => `<li><strong>${a.nama}</strong> — dibuka ${a.tarikh}</li>`).join('')}
        </ul>
      ` : ''}

      <h2>Skor Legasi</h2>
      <table>
        <tr><th width="50%">Jumlah Skor</th><td><strong>${Math.round(legacy.total)} / 100</strong></td></tr>
        <tr><th>Rank</th><td><strong>${legacy.total >= 85 ? 'LEGENDA' : legacy.total >= 70 ? 'NEGARAWAN' : legacy.total >= 55 ? 'PEMIMPIN' : legacy.total >= 40 ? 'AKTIVIS' : 'RAKYAT'}</strong></td></tr>
        <tr><th>Pengaruh Politik</th><td>${Math.round(legacy.pengaruh)} / 100</td></tr>
        <tr><th>Integriti</th><td>${Math.round(legacy.integriti)} / 100</td></tr>
      </table>

      <h2>Ringkasan Statistik</h2>
      <table>
        <tr><th width="50%">Giliran Dimainkan</th><td>${state.date.turn}</td></tr>
        <tr><th>Peristiwa Dilalui</th><td>${state.eventHistory.length}</td></tr>
        <tr><th>Berita Direkod</th><td>${state.news.length}</td></tr>
        <tr><th>Pencapaian Dibuka</th><td>${(state.achievements || []).length} / ${ACHIEVEMENTS.length}</td></tr>
      </table>

      <h2>Penafian</h2>
      <p style="font-size:11px;color:#666;font-style:italic;">
        Semua parti, watak, kawasan, berita dan peristiwa dalam laporan ini adalah
        FIKSYEN SIMULASI. Ia bukan gambaran mana-mana individu, parti politik, atau
        peristiwa sebenar Malaysia. Data rasmi SPR tidak digunakan dalam laporan ini.
      </p>

      <div class="pdf-signature">
        <em>Dijana oleh Simulator Parti Politik Malaysia v${VERSION}</em>
      </div>

      <div class="pdf-meta">
        <span>Dijana pada: ${tarikh}</span>
        <span>Versi: ${VERSION}</span>
        <span>Giliran: ${state.date.turn}</span>
      </div>
    </div>
  `;

  $('#pdfBody').innerHTML = html;
  $('#pdfFooter').innerHTML = `
    <button class="btn-secondary" onclick="document.getElementById('pdfModal').classList.remove('open')">${t('close')}</button>
    <button class="btn-primary" id="printBtn" style="width:auto;margin:0;">🖨️ ${t('pdfPrint')}</button>
  `;

  setTimeout(() => {
    const btn = $('#printBtn');
    if (btn) btn.onclick = () => {
      window.print();
    };
  }, 50);

  $('#pdfModal').classList.add('open');
}

/* ============ HOOK: TAMBAH NOTIFIKASI PADA AKSI PENTING ============ */

/* Hook: level up */
const _v4CheckLevelUp = checkLevelUp;
checkLevelUp = function() {
  const before = state.player.level;
  _v4CheckLevelUp();
  if (state.player.level > before) {
    NotifManager.push('⭐', `Tahap ${state.player.level}`,
      LEVELS[state.player.level].nama, 'gold');
  }
};

/* Hook: kemenangan pilihan raya */
const _v4ResolveCampaign = resolveCampaign;
resolveCampaign = function() {
  const beforePos = state.player.position;
  _v4ResolveCampaign();
  if (state.player.position && state.player.position !== beforePos) {
    NotifManager.push('🎉', 'Kemenangan Pilihan Raya!',
      `Jawatan: ${state.player.position}`, 'success');
  }
};

/* Hook: berita */
const _v4AddNews = addNews;
addNews = function(tajuk, ringkasan, kategori) {
  _v4AddNews(tajuk, ringkasan, kategori);
  if (kategori === 'POLITIK') {
    NotifManager.push('📰', tajuk, ringkasan, 'info');
  } else if (kategori === 'PROJEK') {
    NotifManager.push('🏗️', tajuk, ringkasan, 'success');
  }
};

/* Hook: krisis */
const _v4ResolveCrisis = resolveCrisis;
resolveCrisis = function(action) {
  _v4ResolveCrisis(action);
  const c = state.crisis.sejarah[state.crisis.sejarah.length - 1];
  if (c) {
    NotifManager.push('🚨', `Krisis: ${c.tajuk}`, c.hasil,
      c.hasil.includes('❌') ? 'error' : 'success');
  }
};

/* ============ EXTRA NAV 5 ============ */
function setupExtraNav5() {
  const nav = $('#extraNav5');
  if (!nav) return;

  const observer = new MutationObserver(() => {
    if ($('#game').classList.contains('active')) {
      nav.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
    }
  });
  observer.observe($('#game'), { attributes: true, attributeFilter: ['class'] });

  nav.querySelectorAll('[data-extra5]').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioManager.click();
      const action = btn.dataset.extra5;
      switch(action) {
        case 'slots': openSlotsModal(); break;
        case 'leader': openLeaderboardModal(); break;
        case 'story': openStoryModal(); break;
        case 'analytics': openAnalyticsModal(); break;
        case 'notif': openNotifModal(); break;
        case 'pdf': openPDFReport(); break;
        case 'lang': openLanguageModal(); break;
      }
    });
  });
}

/* ============ HOOK: SIMPAN PERMAINAN → NOTIFIKASI ============ */
const _v4SaveGame = saveGame;
saveGame = function(auto) {
  _v4SaveGame(auto);
};

/* ============ HOOK: BERSARA → REKOD LEADERBOARD ============ */
const _v4ShowFinalReport = showFinalReport;
showFinalReport = function() {
  recordToLeaderboard();
  NotifManager.push('🏆', 'Laporan Akhir Dijana', 'Skor direkod ke leaderboard', 'gold');
  _v4ShowFinalReport();
};

/* ============ BUTANG MENU UTAMA ============ */
function setupMenuButtons() {
  const btnLang = $('#btnLanguage');
  if (btnLang) btnLang.onclick = openLanguageModal;
  const btnStory = $('#btnStoryMode');
  if (btnStory) btnStory.onclick = openStoryModal;
  const btnLeader = $('#btnLeaderboard');
  if (btnLeader) btnLeader.onclick = openLeaderboardModal;
}

/* ============ HOOK init UNTUK v5 ============ */
const _v4Init = init;
init = function() {
  _v4Init();

  // Load bahasa
  loadLanguage();

  // Setup menu butang
  setupMenuButtons();

  // Setup extra nav v5
  setupExtraNav5();

  // Update UI mengikut bahasa
  updateUILanguage();

  // Init NotifManager (jika state ada dari autosave)
  if (state) NotifManager.init();

  console.log('🌐 v5.0: I18N, Slot, Leaderboard, Story, Analitik, Notif, PDF');
};

/* ============ JALANKAN ============ */
document.addEventListener('DOMContentLoaded', init);
