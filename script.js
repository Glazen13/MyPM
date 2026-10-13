/* ============================================================
   SIMULATOR RAKYAT MALAYSIA — SCRIPT.JS (BAHARU)
   Bahagian 1: Data, State, Utiliti, Splash, Menu, Cipta Watak
   ============================================================ */

'use strict';

/* ============ TETAPAN GLOBAL ============ */
const VERSION = '2.0.0';
const SAVE_KEY_PREFIX = 'srm_save_';
const SAVE_AUTO_KEY = 'srm_autosave';
const SETTINGS_KEY = 'srm_settings';

/* ============ PANGKALAN DATA: NEGERI ============ */
const STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Penang', 'Sabah', 'Sarawak',
  'Selangor', 'Terengganu', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'
];

/* ============ PANGKALAN DATA: KERJAYA ============ */
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

/* ============ PANGKALAN DATA: PARTI ============ */
const PARTIES = [
  { id: 'P001', nama: 'Parti Rakyat Bersatu', singkatan: 'PRB', ideologi: 'Tengah', warna: '#d4af37', status: 'Simulasi' },
  { id: 'P002', nama: 'Barisan Nasional Rakyat', singkatan: 'BNR', ideologi: 'Konservatif', warna: '#1a3a6b', status: 'Simulasi' },
  { id: 'P003', nama: 'Pakatan Progresif', singkatan: 'PPP', ideologi: 'Progresif', warna: '#e74c3c', status: 'Simulasi' },
  { id: 'P004', nama: 'Parti Islam Nusantara', singkatan: 'PIN', ideologi: 'Islamik', warna: '#27ae60', status: 'Simulasi' },
  { id: 'P005', nama: 'Gerakan Anak Muda', singkatan: 'GAM', ideologi: 'Belia', warna: '#3498db', status: 'Simulasi' },
  { id: 'P006', nama: 'Parti Sabah Maju', singkatan: 'PSM', ideologi: 'Serantau', warna: '#f39c12', status: 'Simulasi' },
  { id: 'P007', nama: 'Parti Sarawak Bersatu', singkatan: 'PSB', ideologi: 'Serantau', warna: '#9b59b6', status: 'Simulasi' }
];

/* ============ PANGKALAN DATA: WATAK ============ */
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

/* ============ PANGKALAN DATA: TAHAP ============ */
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
  { id: 'EV001', kategori: 'KEWANGAN', tajuk: 'Kenaikan Sewa Rumah',
    desk: 'Tuan rumah memaklumkan sewa akan naik bermula bulan depan.',
    pilihan: [
      { teks: 'Terima dan bayar sewa baharu', kesan: { wang: -200, stress: 3 } },
      { teks: 'Runding turunkan kadar', kesan: { wang: -100, stress: 5, charisma: 2 } },
      { teks: 'Cari rumah lain', kesan: { wang: -500, stress: 8 } }
    ] },
  { id: 'EV002', kategori: 'KERJAYA', tajuk: 'Tawaran Kenaikan Pangkat',
    desk: 'Pihak pengurusan menawarkan kenaikan pangkat dengan gaji lebih tinggi.',
    pilihan: [
      { teks: 'Terima kenaikan pangkat', kesan: { gaji: 800, stress: 10, experience: 5 } },
      { teks: 'Tolak dengan sopan', kesan: { stress: -3, charisma: 1 } },
      { teks: 'Runding keseimbangan', kesan: { gaji: 400, stress: 4, negotiation: 3 } }
    ] },
  { id: 'EV003', kategori: 'KELUARGA', tajuk: 'Ibu Bapa Perlukan Bantuan',
    desk: 'Ibu bapa anda memerlukan bantuan kewangan untuk rawatan kesihatan.',
    pilihan: [
      { teks: 'Bantu sepenuhnya (RM3,000)', kesan: { wang: -3000, integrity: 8 } },
      { teks: 'Bantu sebahagian (RM1,500)', kesan: { wang: -1500, integrity: 5 } },
      { teks: 'Bincang dengan adik-beradik', kesan: { wang: -800, negotiation: 2 } }
    ] },
  { id: 'EV004', kategori: 'POLITIK', tajuk: 'Jemputan Menyertai Parti',
    desk: 'Seorang kenalan mengajak anda menyertai parti politik tempatan.',
    pilihan: [
      { teks: 'Terima dan sertai segera', kesan: { joinParty: true, partyInfluence: 5, experience: 10 } },
      { teks: 'Fikir dahulu', kesan: { stress: 2 } },
      { teks: 'Tolak dengan hormat', kesan: { integrity: 2 } }
    ] },
  { id: 'EV005', kategori: 'MEDIA', tajuk: 'Wartawan Ingin Temu Bual',
    desk: 'Seorang wartawan ingin membuat temu bual mengenai pandangan anda.',
    pilihan: [
      { teks: 'Terima temu bual', kesan: { mediaRelations: 8, popularity: 5, risk: 3 } },
      { teks: 'Tolak dengan sopan', kesan: { mediaRelations: -3 } },
      { teks: 'Hantar kenyataan bertulis', kesan: { mediaRelations: 3, stress: 2 } }
    ] },
  { id: 'EV006', kategori: 'KEWANGAN', tajuk: 'Peluang Pelaburan',
    desk: 'Rakan anda mencadangkan pelaburan dengan potensi pulangan tinggi.',
    pilihan: [
      { teks: 'Labur RM5,000', kesan: { wang: -5000, investment: 5000, risk: 5 } },
      { teks: 'Labur RM1,000', kesan: { wang: -1000, investment: 1000, risk: 2 } },
      { teks: 'Tolak pelaburan', kesan: { integrity: 1 } }
    ] },
  { id: 'EV007', kategori: 'KESIHATAN', tajuk: 'Tekanan Kerja Meningkat',
    desk: 'Anda mengalami tekanan kerja yang serius. Kesihatan mula terjejas.',
    pilihan: [
      { teks: 'Ambil cuti rehat', kesan: { stress: -15, gaji: -500 } },
      { teks: 'Teruskan bekerja', kesan: { stress: 8, health: -5 } },
      { teks: 'Dapatkan bantuan profesional', kesan: { wang: -300, stress: -10 } }
    ] },
  { id: 'EV008', kategori: 'MASYARAKAT', tajuk: 'Program Khidmat Masyarakat',
    desk: 'Komuniti tempatan menganjurkan program gotong-royong.',
    pilihan: [
      { teks: 'Hadir dan bantu', kesan: { grassrootsSupport: 5, popularity: 3, stress: 3 } },
      { teks: 'Sumbang dana (RM500)', kesan: { wang: -500, popularity: 4, integrity: 3 } },
      { teks: 'Tidak dapat hadir', kesan: {} }
    ] },
  { id: 'EV009', kategori: 'PELUANG', tajuk: 'Tawaran Perniagaan Sampingan',
    desk: 'Seorang kenalan menawarkan peluang perniagaan kecil-kecilan.',
    pilihan: [
      { teks: 'Terima dan labur RM2,000', kesan: { wang: -2000, business: 2500, stress: 5 } },
      { teks: 'Tolak kerana fokus kerjaya', kesan: {} },
      { teks: 'Cadang perkongsian modal', kesan: { wang: -1000, business: 1200 } }
    ] },
  { id: 'EV010', kategori: 'INTEGRITI', tajuk: 'Rasuah Ditawarkan',
    desk: 'Seorang kontraktor menawarkan anda wang untuk meluluskan projek tanpa prosedur.',
    pilihan: [
      { teks: 'Tolak dan laporkan', kesan: { integrity: 15, legalRisk: -10, stress: 5 } },
      { teks: 'Tolak secara senyap', kesan: { integrity: 5 } },
      { teks: 'Terima wang', kesan: { wang: 10000, integrity: -30, legalRisk: 25 } }
    ] }
];

/* ============ STATE GLOBAL ============ */
let state = null;
let currentTab = 'dashboard';
let settings = {
  bunyi: true,
  muzik: false,
  kesukaran: 'seimbang',
  autoSave: true,
  cutscene: true,
  theme: 'blue',
  language: 'ms'
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

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[s]);
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
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast ' + type; }, 2800);
  if (typeof AudioManager !== 'undefined' && AudioManager.enabled) {
    if (type === 'success') AudioManager.success();
    else if (type === 'error') AudioManager.error();
    else if (type === 'warn') AudioManager.warn();
    else AudioManager.notify();
  }
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
  if (!btn || !info) return;
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

/* ============================================================
   CIPTA WATAK (v6.1 — Bebas)
   ============================================================ */
let createCharState = {
  photoData: null,
  tanggungan: []
};

function initCreateChar() {
  createCharState = { photoData: null, tanggungan: [] };

  const stateSel = $('#inputState');
  if (stateSel) {
    stateSel.innerHTML = STATES.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  // === UPLOAD GAMBAR ===
  const photoInput = $('#inputPhoto');
  const photoPreview = $('#photoPreview');
  const btnRemovePhoto = $('#btnRemovePhoto');

  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        showToast('Gambar terlalu besar (max 2MB)', 'error');
        photoInput.value = '';
        return;
      }
      if (!file.type.startsWith('image/')) {
        showToast('Fail bukan gambar', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 300;
          let w = img.width, h = img.height;
          if (w > h) { if (w > maxSize) { h = h * maxSize / w; w = maxSize; } }
          else { if (h > maxSize) { w = w * maxSize / h; h = maxSize; } }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          createCharState.photoData = dataUrl;
          photoPreview.innerHTML = `<img src="${dataUrl}" alt="Profil">`;
          btnRemovePhoto.classList.remove('hidden');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener('click', (e) => {
      e.preventDefault();
      createCharState.photoData = null;
      if (photoInput) photoInput.value = '';
      if (photoPreview) photoPreview.innerHTML = '<span class="photo-placeholder">📷</span>';
      btnRemovePhoto.classList.add('hidden');
    });
  }

  // === TANGGUNGAN ===
  const btnAdd = $('#btnAddTanggungan');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      addTanggunganRow();
      updateSummary();
    });
  }

  // === RANGE MATLAMAT ===
  const rangeInput = $('#inputPoliticsInterest');
  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      $('#interestLabel').textContent = e.target.value + ' / 10';
    });
  }

  // === AUTO UPDATE RINGKASAN ===
  const inputs = [
    'inputName', 'inputAge', 'inputGender', 'inputState',
    'inputEducation', 'inputBackground', 'inputCash',
    'inputJobName', 'inputSalary', 'inputJobType', 'inputTax',
    'inputHousingType', 'inputRent', 'inputMonthlyDebt',
    'inputTotalDebt', 'inputLivingCost', 'inputGoal',
    'inputPoliticsInterest'
  ];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateSummary);
      el.addEventListener('change', updateSummary);
    }
  });

  // Handle housing type
  const housingSel = $('#inputHousingType');
  if (housingSel) {
    housingSel.addEventListener('change', (e) => {
      const rentInput = $('#inputRent');
      if (e.target.value === 'IbuBapa') {
        rentInput.value = 0;
        rentInput.disabled = true;
      } else {
        rentInput.disabled = false;
        if (!rentInput.value || rentInput.value === '0') {
          rentInput.value = e.target.value === 'Milik' ? 800 : 450;
        }
      }
      updateSummary();
    });
  }

  // === MULA KEHIDUPAN ===
  const btnStart = $('#btnStartLife');
  if (btnStart) {
    btnStart.addEventListener('click', startNewLife);
  }

  updateSummary();
  renderTanggunganList();
}

function addTanggunganRow() {
  const tg = { id: uid(), jenis: 'anak', nama: '', amaun: 500 };
  createCharState.tanggungan.push(tg);
  renderTanggunganList();
}

function renderTanggunganList() {
  const listEl = $('#tanggunganList');
  if (!listEl) return;
  const items = createCharState.tanggungan;

  if (items.length === 0) {
    listEl.innerHTML = `<div class="tanggungan-empty">Belum ada tanggungan. Klik butang di bawah untuk tambah.</div>`;
    return;
  }

  listEl.innerHTML = items.map(tg => `
    <div class="tanggungan-item" data-tgid="${tg.id}">
      <span class="tg-emoji">${getTanggunganEmoji(tg.jenis)}</span>
      <div class="tg-fields">
        <select data-field="jenis">
          <option value="anak" ${tg.jenis === 'anak' ? 'selected' : ''}>Anak</option>
          <option value="isteri" ${tg.jenis === 'isteri' ? 'selected' : ''}>Isteri</option>
          <option value="suami" ${tg.jenis === 'suami' ? 'selected' : ''}>Suami</option>
          <option value="ibu" ${tg.jenis === 'ibu' ? 'selected' : ''}>Ibu</option>
          <option value="bapa" ${tg.jenis === 'bapa' ? 'selected' : ''}>Bapa</option>
          <option value="lain" ${tg.jenis === 'lain' ? 'selected' : ''}>Lain-lain</option>
        </select>
        <input type="text" data-field="nama" placeholder="Nama (pilihan)" value="${escapeHtml(tg.nama)}" maxlength="30">
        <input type="number" data-field="amaun" min="0" value="${tg.amaun}" placeholder="RM/bulan">
      </div>
      <button class="tg-remove" data-remove="${tg.id}" title="Buang">✕</button>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-tgid]').forEach(row => {
    const tgId = row.dataset.tgid;
    const tg = createCharState.tanggungan.find(x => x.id === tgId);
    if (!tg) return;

    row.querySelectorAll('[data-field]').forEach(field => {
      const handler = () => {
        const f = field.dataset.field;
        tg[f] = f === 'amaun' ? (parseFloat(field.value) || 0) : field.value;
        if (f === 'jenis') {
          row.querySelector('.tg-emoji').textContent = getTanggunganEmoji(tg.jenis);
        }
        updateSummary();
      };
      field.addEventListener('input', handler);
      field.addEventListener('change', handler);
    });

    row.querySelector('[data-remove]').addEventListener('click', () => {
      createCharState.tanggungan = createCharState.tanggungan.filter(x => x.id !== tgId);
      renderTanggunganList();
      updateSummary();
    });
  });
}

function getTanggunganEmoji(jenis) {
  return {
    anak: '👶', isteri: '👩', suami: '👨',
    ibu: '👵', bapa: '👴', lain: '👤'
  }[jenis] || '👤';
}

function getFormValues() {
  return {
    nama: ($('#inputName')?.value || '').trim() || 'Pemain',
    umur: parseInt($('#inputAge')?.value) || 18,
    jantina: $('#inputGender')?.value || 'Lelaki',
    negeri: $('#inputState')?.value || 'Selangor',
    pendidikan: $('#inputEducation')?.value || 'SPM',
    latar: $('#inputBackground')?.value || 'B40',
    cash: parseFloat($('#inputCash')?.value) || 0,
    jobName: ($('#inputJobName')?.value || '').trim() || 'Tiada Kerja',
    salary: parseFloat($('#inputSalary')?.value) || 0,
    jobType: $('#inputJobType')?.value || 'tiada',
    tax: parseFloat($('#inputTax')?.value) || 0,
    housingType: $('#inputHousingType')?.value || 'IbuBapa',
    rent: parseFloat($('#inputRent')?.value) || 0,
    monthlyDebt: parseFloat($('#inputMonthlyDebt')?.value) || 0,
    totalDebt: parseFloat($('#inputTotalDebt')?.value) || 0,
    livingCost: parseFloat($('#inputLivingCost')?.value) || 0,
    goal: $('#inputGoal')?.value || 'kerjaya',
    politicsInterest: parseInt($('#inputPoliticsInterest')?.value) || 0
  };
}

function calculateSummaryFromForm() {
  const v = getFormValues();
  const tanggunganTotal = createCharState.tanggungan.reduce(
    (sum, tg) => sum + (parseFloat(tg.amaun) || 0), 0
  );
  const gajiBersih = Math.max(0, v.salary - v.tax);
  const jumlahPerbelanjaan = v.rent + v.monthlyDebt + v.livingCost + tanggunganTotal;
  const aliranTunai = gajiBersih - jumlahPerbelanjaan;
  const nilaiBersih = v.cash - v.totalDebt;

  return {
    ...v, tanggunganTotal, gajiBersih,
    jumlahPerbelanjaan, aliranTunai, nilaiBersih,
    bilanganTanggungan: createCharState.tanggungan.length
  };
}

function updateSummary() {
  const s = calculateSummaryFromForm();
  const grid = $('#summaryGrid');
  if (!grid) return;

  const flowClass = s.aliranTunai >= 0 ? 'positive' : 'negative';
  const worthClass = s.nilaiBersih >= 0 ? 'positive' : 'negative';

  grid.innerHTML = `
    <div class="summary-item">
      <label>Gaji Kasar</label>
      <strong>${formatRM(s.salary)}</strong>
    </div>
    <div class="summary-item">
      <label>Gaji Bersih</label>
      <strong>${formatRM(s.gajiBersih)}</strong>
    </div>
    <div class="summary-item negative">
      <label>Jumlah Perbelanjaan</label>
      <strong>${formatRM(s.jumlahPerbelanjaan)}</strong>
    </div>
    <div class="summary-item ${flowClass}">
      <label>Aliran Tunai / Bulan</label>
      <strong>${s.aliranTunai >= 0 ? '+' : ''}${formatRM(s.aliranTunai)}</strong>
    </div>
    <div class="summary-item">
      <label>Wang Tunai</label>
      <strong>${formatRM(s.cash)}</strong>
    </div>
    <div class="summary-item ${worthClass}">
      <label>Nilai Bersih</label>
      <strong>${s.nilaiBersih >= 0 ? '' : '-'}${formatRM(Math.abs(s.nilaiBersih))}</strong>
    </div>
    <div class="summary-item highlight">
      <label>Anggaran Hujung Bulan</label>
      <strong>${formatRM(s.cash + s.aliranTunai)}</strong>
    </div>
    <div class="summary-note">
      ${s.bilanganTanggungan > 0 ? `${s.bilanganTanggungan} tanggungan (${formatRM(s.tanggunganTotal)}/bulan)` : 'Tiada tanggungan'}
      • Sistem akan kira secara automatik setiap bulan
    </div>
  `;
}

function startNewLife() {
  const s = calculateSummaryFromForm();

  if (!s.nama || s.nama.length < 2) {
    showToast('Sila masukkan nama yang sah', 'error');
    return;
  }
  if (s.salary < 0 || s.rent < 0 || s.monthlyDebt < 0) {
    showToast('Nilai tidak boleh negatif', 'error');
    return;
  }

  const jobTypeMap = {
    penuh: { jam: 45, stressBase: 30 },
    separuh: { jam: 20, stressBase: 15 },
    bebas: { jam: 30, stressBase: 25 },
    perniagaan: { jam: 50, stressBase: 40 },
    tiada: { jam: 0, stressBase: 10 }
  };
  const jt = jobTypeMap[s.jobType] || jobTypeMap.tiada;

  const tanggunganList = createCharState.tanggungan.map(tg => ({
    id: tg.id,
    jenis: tg.jenis,
    nama: tg.nama || getTanggunganEmoji(tg.jenis) + ' ' + tg.jenis,
    amaun: parseFloat(tg.amaun) || 0
  }));

  const pasangan = tanggunganList.find(t => t.jenis === 'isteri' || t.jenis === 'suami');
  const anakCount = tanggunganList.filter(t => t.jenis === 'anak').length;

  let initialStress = jt.stressBase;
  if (s.aliranTunai < 0) initialStress += 15;
  if (s.nilaiBersih < 0) initialStress += 10;

  state = {
    version: VERSION,
    createdAt: Date.now(),
    customProfile: true,
    player: {
      nama: s.nama, umur: s.umur, jantina: s.jantina, negeri: s.negeri,
      pendidikan: s.pendidikan, latar: s.latar, matlamat: s.goal,
      minatPolitik: s.politicsInterest,
      avatar: s.nama.charAt(0).toUpperCase(),
      photo: createCharState.photoData,
      career: s.jobName, careerType: s.jobType, careerHours: jt.jam,
      gaji: s.salary, gajiBersih: s.gajiBersih, potongan: s.tax,
      experience: 0,
      wang: s.cash, tabungan: 0, hutang: s.totalDebt,
      hutangBulanan: s.monthlyDebt, aset: 0,
      level: 0, xp: 0,
      stress: clamp(initialStress, 0, 100), health: 100,
      popularity: 0, integrity: 50, charisma: 50, leadership: 30,
      partyInfluence: 0, grassrootsSupport: 0, mediaRelations: 0,
      publicTrust: 50, coalitionStability: 50, legalRisk: 0,
      administration: 20, negotiation: 30, partyRelations: 50,
      youthSupport: 30, constituencySupport: 0, electionChance: 0, allyLoyalty: 50,
      party: null, position: null, positions: [],
      housing: s.housingType === 'IbuBapa' ? 'IbuBapa' : s.housingType === 'Sewa' ? 'Sewa' : 'Milik',
      housingCost: s.rent,
      pasangan: pasangan ? { nama: pasangan.nama, amaun: pasangan.amaun } : null,
      anak: anakCount,
      tanggungan: tanggunganList,
      tanggunganTotal: s.tanggunganTotal,
      livingCost: s.livingCost
    },
    date: { year: 2025, month: 0, turn: 1, label: 'Jan 2025' },
    finances: {
      pendapatanBulanan: s.salary,
      pendapatanBersih: s.gajiBersih,
      perbelanjaanBulanan: s.jumlahPerbelanjaan,
      cashFlow: s.aliranTunai,
      netWorth: s.nilaiBersih,
      bil: [], transactions: []
    },
    relationships: {}, eventHistory: [], activeEvents: [],
    pendingConsequences: [], cooldowns: {}, flags: {},
    news: [], achievements: [], activityHistory: [], notifications: []
  };

  CHARACTERS.forEach(c => {
    state.relationships[c.id] = {
      score: randomInt(0, 20),
      trust: 10, loyalty: 10, respect: 10, memory: []
    };
  });

  state.news.unshift({
    id: uid(), tarikh: state.date.label,
    tajuk: 'Selamat Datang ke Simulasi',
    kategori: 'UMUM',
    ringkasan: `${s.nama} memulakan kehidupan pada umur ${s.umur} di ${s.negeri}. Pekerjaan: ${s.jobName} (${formatRM(s.salary)}/bulan).`,
    status: 'Disahkan dalam dunia simulasi'
  });

  addTransaction('Wang tunai permulaan', s.cash);
  if (s.totalDebt > 0) addTransaction('Hutang awal', -s.totalDebt);

  recalcFinances();
  saveGame(true);
  enterGame();
  showToast(`Selamat datang, ${s.nama.split(' ')[0]}!`, 'success');
}

/* ============================================================
   BAHAGIAN 2: Kewangan, Kerjaya, Render, Dashboard
   ============================================================ */

/* ============ RECALC FINANCES (SATU-SATUNYA) ============ */
function recalcFinances() {
  if (!state) return;
  const p = state.player;
  const f = state.finances;

  const pendapatanKasar = p.gaji || 0;
  const potongan = p.potongan || 0;
  const pendapatanBersih = Math.max(0, pendapatanKasar - potongan);

  const housingCost = p.housingCost || 0;
  const livingCost = p.livingCost || 800;
  const debtMonthly = p.hutangBulanan || 0;
  const tanggunganCost = (p.tanggungan || []).reduce(
    (sum, tg) => sum + (parseFloat(tg.amaun) || 0), 0
  );

  const totalExpense = housingCost + livingCost + debtMonthly + tanggunganCost;

  f.pendapatanBulanan = pendapatanKasar;
  f.pendapatanBersih = pendapatanBersih;
  f.perbelanjaanBulanan = totalExpense;
  f.cashFlow = pendapatanBersih - totalExpense;
  f.netWorth = (p.wang || 0) + (p.tabungan || 0) + (p.aset || 0) - (p.hutang || 0);

  f.breakdown = {
    housing: housingCost,
    living: livingCost,
    debt: debtMonthly,
    tanggungan: tanggunganCost,
    potongan: potongan
  };
}

/* ============ PROCESS MONTH (SATU-SATUNYA) ============ */
function processMonth() {
  const p = state.player;
  const f = state.finances;

  recalcFinances();

  const income = f.pendapatanBersih || 0;
  p.wang += income;
  addTransaction(`Gaji bersih — ${p.career}`, income);

  const expense = f.perbelanjaanBulanan;
  p.wang -= expense;
  addTransaction('Perbelanjaan bulanan', -expense);

  if (p.hutang > 0 && p.hutangBulanan > 0) {
    const bayar = Math.min(p.hutangBulanan, p.hutang);
    if (bayar > 0) {
      p.hutang -= bayar;
      addTransaction('Bayaran pokok hutang', -bayar);
    }
  }

  if (p.wang > 2000) {
    p.stress = clamp(p.stress - 2, 0, 100);
  } else if (p.wang < 0) {
    p.stress = clamp(p.stress + 5, 0, 100);
    p.health = clamp(p.health - 2, 0, 100);
  } else if (f.cashFlow < 0) {
    p.stress = clamp(p.stress + 2, 0, 100);
  }

  state.activityHistory.unshift({
    tarikh: state.date.label,
    desk: `Giliran — pendapatan ${formatRM(income)}, perbelanjaan ${formatRM(expense)}`
  });
  if (state.activityHistory.length > 200) {
    state.activityHistory = state.activityHistory.slice(0, 200);
  }
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

  const avatarEl = $('#playerAvatar');
  if (avatarEl) {
    if (p.photo) {
      avatarEl.innerHTML = `<img src="${p.photo}" alt="${p.nama}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    } else {
      avatarEl.textContent = p.avatar;
    }
  }
}

function renderTab() {
  const content = $('#gameContent');
  if (!content) return;
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
      ${nextLevel
        ? `<small style="font-size:11px;color:var(--kelabu);">${formatNum(p.xp)} / ${formatNum(nextLevel.xp)} XP ke tahap ${nextLevel.lvl}</small>`
        : '<small style="font-size:11px;color:var(--hijau);">Tahap maksimum dicapai</small>'}
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

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action));
  });
}

function handleAction(action) {
  if (action === 'nextTurn') nextTurn();
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
  if (action === 'save') modalSaveMoney();
  else if (action === 'debt') modalPayDebt();
  else if (action === 'lifestyle') modalLifestyle();
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
      <small style="font-size:11px;color:var(--kelabu);">Ini gantikan "Kos Hidup" dalam kiraan bulanan.</small>
    </div>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmLife" style="width:auto;margin:0;">Simpan</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmLife');
    if (btn) btn.onclick = () => {
      const lifestyle = [500, 800, 1500, 3000];
      state.player.lifestyleLevel = parseInt($('#lifeLevel').value);
      state.player.livingCost = lifestyle[state.player.lifestyleLevel];
      recalcFinances();
      saveGame(true);
      closeModal();
      renderGame();
      showToast('Gaya hidup dikemas kini', 'success');
    };
  }, 50);
}

/* ============ TAB: KERJAYA ============ */
function renderCareer(el) {
  const p = state.player;
  const careerData = CAREERS[p.career] || { jam: 0 };

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
          <strong>${careerData.jam || p.careerHours || 0} jam</strong>
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
          <span class="a-text"><strong>Berehat</strong><small>Kurangkan tekanan</small></span>
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
  if (action === 'change') modalChangeCareer();
  else if (action === 'training') {
    if (state.player.wang >= 500) {
      state.player.wang -= 500;
      state.player.experience += 10;
      state.player.charisma = clamp(state.player.charisma + 2, 0, 100);
      addTransaction('Latihan/Kursus', -500);
      saveGame(true);
      renderGame();
      showToast('Latihan selesai! +10 XP pengalaman', 'success');
    } else showToast('Wang tidak mencukupi', 'error');
  } else if (action === 'rest') {
    state.player.stress = clamp(state.player.stress - 15, 0, 100);
    state.player.health = clamp(state.player.health + 5, 0, 100);
    saveGame(true);
    renderGame();
    showToast('Anda berasa lebih segar', 'success');
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
      const chance = clamp(30 + state.player.experience * 2 + state.player.charisma * 0.3, 10, 90);
      if (Math.random() * 100 < chance) {
        state.player.career = newJob;
        state.player.gaji = CAREERS[newJob].gaji;
        state.player.careerHours = CAREERS[newJob].jam;
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
   BAHAGIAN 3: Politik, Berita, Giliran, Peristiwa
   ============================================================ */

/* ============ TAB: POLITIK ============ */
function renderPolitics(el) {
  const p = state.player;

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
  if (action === 'join') modalJoinParty();
  else if (action === 'volunteer') {
    p.grassrootsSupport = clamp(p.grassrootsSupport + 3, 0, 100);
    p.popularity = clamp(p.popularity + 2, 0, 100);
    addXP(15);
    checkLevelUp();
    saveGame(true);
    renderGame();
    showToast('Anda menyertai aktiviti sukarelawan', 'success');
  } else if (action === 'campaign') {
    if (p.wang < 200) { showToast('Perlu sekurang-kurangnya RM200', 'error'); return; }
    p.wang -= 200;
    addTransaction('Kempen Parti', -200);
    const gain = randomInt(3, 8);
    p.grassrootsSupport = clamp(p.grassrootsSupport + gain, 0, 100);
    p.popularity = clamp(p.popularity + Math.floor(gain / 2), 0, 100);
    addXP(20);
    checkLevelUp();
    saveGame(true);
    renderGame();
    showToast(`Kempen berjaya! +${gain} sokongan akar umbi`, 'success');
  } else if (action === 'meeting') {
    p.partyInfluence = clamp(p.partyInfluence + 4, 0, 100);
    const char = pickRandom(CHARACTERS);
    state.relationships[char.id].score = clamp(state.relationships[char.id].score + 5, -100, 100);
    state.relationships[char.id].memory.push(`Berjumpa pada mesyuarat (${state.date.label})`);
    addXP(10);
    checkLevelUp();
    saveGame(true);
    renderGame();
    showToast(`Berjumpa ${char.nama} — hubungan bertambah baik`, 'success');
  } else if (action === 'election') modalElection();
  else if (action === 'leave') {
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
      const chance = clamp(
        20 + p.grassrootsSupport * 0.3 + p.popularity * 0.3 + p.partyInfluence * 0.2,
        5, 90
      );
      const roll = Math.random() * 100;
      const menang = roll < chance;

      if (menang) {
        p.position = jenis === 'Parlimen' ? 'Ahli Parlimen' : 'ADUN';
        p.constituencySupport = clamp(p.constituencySupport + 20, 0, 100);
        addXP(200);
        checkLevelUp();
        addNews(`${p.nama} memenangi kerusi ${jenis} ${kawasan}`,
                'Menang dalam simulasi pilihan raya', 'POLITIK');
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
        addXP(50);
        addNews(`${p.nama} tewas di ${kawasan}`, 'Keputusan simulasi pilihan raya', 'POLITIK');
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
  if (!state) return;
  state.news.unshift({
    id: uid(),
    tarikh: state.date.label,
    tajuk, ringkasan, kategori,
    status: 'Disahkan dalam dunia simulasi'
  });
  if (state.news.length > 100) state.news = state.news.slice(0, 100);
}

/* ============ SISTEM GILIRAN ============ */
function nextTurn() {
  // Proses 1 bulan
  processMonth();

  // Majukan kalendar
  state.date.month += 1;
  while (state.date.month >= 12) {
    state.date.month -= 12;
    state.date.year += 1;
  }
  state.date.turn += 1;
  state.date.label = getMonthLabel(state.date.month) + ' ' + state.date.year;

  // Umur naik setiap 12 giliran
  state.player.umur += (state.date.turn % 12 === 0) ? 1 : 0;

  // Peristiwa rawak
  maybeTriggerEvent();

  // Proses modul lanjutan (kalau ada)
  if (typeof processProjects === 'function') processProjects();
  if (typeof processTasks === 'function') processTasks();
  if (typeof processCharacterActions === 'function') processCharacterActions();
  if (typeof processNewsChains === 'function') processNewsChains();
  if (typeof maybeTriggerCrisis === 'function') maybeTriggerCrisis();
  if (typeof maybeTriggerByElection === 'function') maybeTriggerByElection();
  if (typeof checkAchievements === 'function') checkAchievements();

  // Auto-save
  if (settings.autoSave !== false) saveGame(true);

  renderGame();
  showToast(`Giliran ${state.date.turn} — ${state.date.label}`, 'success');
}

function getMonthLabel(m) {
  const bulan = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
  return bulan[m] || 'Jan';
}

/* ============ TRANSACTION ============ */
function addTransaction(desk, jumlah) {
  if (!state || !state.finances) return;
  state.finances.transactions.unshift({
    tarikh: state.date.label,
    desk, jumlah
  });
  if (state.finances.transactions.length > 100) {
    state.finances.transactions = state.finances.transactions.slice(0, 100);
  }
}

/* ============ SISTEM XP & TAHAP ============ */
function addXP(amount) {
  if (!state || !state.player) return;
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
            'Kemajuan kehidupan simulasi', 'UMUM');
    showToast(`🎉 Naik Tahap ${newLevel}: ${LEVELS[newLevel].nama}`, 'success');
    if (typeof AudioManager !== 'undefined' && AudioManager.levelUp) {
      AudioManager.levelUp();
    }
  }
}

/* ============ SISTEM PERISTIWA ============ */
function maybeTriggerEvent() {
  if (Math.random() > 0.25) return;

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
  if (!evModal) return;
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

  state.cooldowns[event.id] = state.date.turn;
  state.eventHistory.unshift({
    id: event.id,
    tarikh: state.date.label,
    pilihan: choice.teks
  });
  if (state.eventHistory.length > 100) state.eventHistory = state.eventHistory.slice(0, 100);

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

/* ============================================================
   BAHAGIAN 4: Side Panel, Modal, Tetapan, Init
   ============================================================ */

/* ============ SIDE PANEL ============ */
function openSidePanel() {
  if (!state) return;
  const sp = $('#sideProfile');
  const p = state.player;
  const avatarHtml = p.photo
    ? `<img src="${p.photo}" alt="${p.nama}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
    : p.avatar;

  if (sp) {
    sp.innerHTML = `
      <div class="big-avatar">${avatarHtml}</div>
      <h4>${p.nama}</h4>
      <p>Umur ${p.umur} • ${p.negeri}</p>
      <p style="margin-top:6px;">Tahap ${p.level} — ${LEVELS[p.level].nama}</p>
      <p style="margin-top:4px;color:var(--biru-muda);font-weight:600;">${formatRM(p.wang)}</p>
    `;
  }
  $('#sidePanel').classList.add('open');
  setTimeout(setupSideDropdown, 100);
}

function closeSidePanel() {
  const panel = $('#sidePanel');
  if (panel) panel.classList.remove('open');
}

function setupSideDropdown() {
  const toggle = document.querySelector('[data-toggle="advanced"]');
  const menu = document.getElementById('sideAdvancedMenu');
  if (!toggle || !menu) return;

  toggle.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  };

  menu.querySelectorAll('.side-sub-link').forEach(btn => {
    btn.onclick = () => {
      handleSideAction(btn.dataset.action);
    };
  });
}

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
    case 'stats':
      modalFullStats();
      break;
    case 'relationships':
      modalRelationships();
      break;
    case 'history':
      modalHistory();
      break;
    case 'achievements':
      modalAchievements();
      break;
    case 'settings':
      modalSettings();
      break;
    case 'retire':
      confirmRetire();
      break;
    case 'quit':
      confirmQuit();
      break;
    case 'theme':
      if (typeof openThemePicker === 'function') openThemePicker();
      break;
    case 'chart':
      if (typeof openChartModal === 'function') openChartModal();
      break;
    case 'map':
      if (typeof openMapModal === 'function') openMapModal();
      break;
    case 'slots':
      if (typeof openSlotsModal === 'function') openSlotsModal();
      break;
    case 'leaderboard':
      if (typeof openLeaderboardModal === 'function') openLeaderboardModal();
      break;
    case 'story':
      if (typeof openStoryModal === 'function') openStoryModal();
      break;
    case 'analytics':
      if (typeof openAnalyticsModal === 'function') openAnalyticsModal();
      break;
    case 'notifications':
      if (typeof openNotifModal === 'function') openNotifModal();
      break;
    case 'pdf':
      if (typeof openPDFReport === 'function') openPDFReport();
      break;
    case 'language':
      if (typeof openLanguageModal === 'function') openLanguageModal();
      break;
    case 'ai':
      if (typeof openAllCharactersModal === 'function') openAllCharactersModal();
      break;
    case 'advset':
      modalSettings();
      break;
  }
}

/* ============ MODAL: MUATKAN ============ */
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

/* ============ MODAL: STATISTIK ============ */
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

/* ============ MODAL: HUBUNGAN ============ */
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

/* ============ MODAL: SEJARAH ============ */
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

/* ============ MODAL: PENCAPAIAN ============ */
function modalAchievements() {
  const a = state.achievements || [];
  openModal('🏆 Pencapaian',
    a.length === 0
      ? '<p style="color:var(--kelabu);">Belum ada pencapaian.</p>'
      : `<ul>${a.map(x => `<li>${x.nama || x}</li>`).join('')}</ul>`,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>`
  );
}

/* ============ MODAL: TETAPAN ============ */
function modalSettings() {
  const currentTheme = settings.theme || 'blue';
  const currentLang = settings.language || 'ms';

  openModal('⚙️ Tetapan',
    `
    <div class="settings-section">
      <h4>🎨 Paparan & Bahasa</h4>
      <div class="form-group">
        <label>Tema Warna</label>
        <div class="theme-picker">
          <div class="theme-swatch ${currentTheme === 'blue' ? 'active' : ''}" data-theme="blue" title="Biru Klasik"></div>
          <div class="theme-swatch ${currentTheme === 'gold' ? 'active' : ''}" data-theme="gold" title="Emas Diraja"></div>
          <div class="theme-swatch ${currentTheme === 'green' ? 'active' : ''}" data-theme="green" title="Hijau Zamrud"></div>
          <div class="theme-swatch ${currentTheme === 'red' ? 'active' : ''}" data-theme="red" title="Merah Berani"></div>
        </div>
      </div>
      <div class="form-group">
        <label>Bahasa Antara Muka</label>
        <select id="setLang">
          <option value="ms" ${currentLang === 'ms' ? 'selected' : ''}>🇲🇾 Bahasa Melayu</option>
          <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 English</option>
        </select>
      </div>
    </div>

    <div class="settings-section">
      <h4>🔊 Audio</h4>
      <div class="settings-row">
        <div>
          <label>Kesan Bunyi</label>
          <small>Bunyi klik & notifikasi</small>
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
    </div>

    <div class="settings-section">
      <h4>🎮 Permainan</h4>
      <div class="form-group">
        <label>Tahap Kesukaran</label>
        <select id="setDiff">
          <option value="santai" ${settings.kesukaran === 'santai' ? 'selected' : ''}>🟢 Santai — Lebihan wang</option>
          <option value="seimbang" ${settings.kesukaran === 'seimbang' ? 'selected' : ''}>🟡 Seimbang — Standard</option>
          <option value="mencabar" ${settings.kesukaran === 'mencabar' ? 'selected' : ''}>🔴 Mencabar — Kos +30%</option>
        </select>
      </div>
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
          <label>Cutscene</label>
          <small>Animasi pelantikan & kemenangan</small>
        </div>
        <div class="toggle-switch">
          <input type="checkbox" id="setCutscene" ${settings.cutscene !== false ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h4>💾 Data & Simpanan</h4>
      <button class="btn-secondary" id="resetSaveBtn"
        style="width:100%;color:var(--merah);border:1.5px solid rgba(231,76,60,0.3);background:rgba(231,76,60,0.05);">
        🗑️ Padam Semua Simpanan
      </button>
      <small style="display:block;color:var(--kelabu);font-size:11px;margin-top:6px;text-align:center;">
        Tindakan ini tidak boleh dibatalkan
      </small>
    </div>

    <div class="settings-section">
      <h4>ℹ️ Maklumat</h4>
      <div class="settings-info-box">
        <div class="info-row">
          <span class="info-label">Versi</span>
          <span class="info-value">${VERSION}</span>
        </div>
        <div class="info-row">
          <span class="info-label">PWA</span>
          <span class="info-value">${'serviceWorker' in navigator ? '✅ Disokong' : '❌ Tidak'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Penyimpanan</span>
          <span class="info-value">LocalStorage</span>
        </div>
      </div>
    </div>
    `,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>
     <button class="btn-primary" id="saveSettingsBtn" style="width:auto;margin:0;">💾 Simpan</button>`
  );

  setTimeout(() => {
    document.querySelectorAll('#modalBody .theme-swatch').forEach(sw => {
      sw.onclick = () => {
        const theme = sw.dataset.theme;
        if (typeof applyTheme === 'function') applyTheme(theme);
        settings.theme = theme;
        saveSettings();
        document.querySelectorAll('#modalBody .theme-swatch').forEach(x => x.classList.remove('active'));
        sw.classList.add('active');
      };
    });

    const langSel = document.getElementById('setLang');
    if (langSel) {
      langSel.onchange = () => {
        if (typeof setLanguage === 'function') setLanguage(langSel.value);
      };
    }

    const soundToggle = document.getElementById('setSound');
    if (soundToggle) {
      soundToggle.onchange = () => {
        settings.bunyi = soundToggle.checked;
        saveSettings();
        if (typeof AudioManager !== 'undefined') {
          AudioManager.enabled = settings.bunyi;
          AudioManager.updateIndicator();
        }
      };
    }

    const resetBtn = document.getElementById('resetSaveBtn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm('⚠️ Padam SEMUA simpanan?')) {
          const keys = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('srm_')) keys.push(k);
          }
          keys.forEach(k => localStorage.removeItem(k));
          showToast('🗑️ Semua simpanan dipadam', 'warn');
        }
      };
    }

    const btn = document.getElementById('saveSettingsBtn');
    if (btn) {
      btn.onclick = () => {
        settings.kesukaran = document.getElementById('setDiff').value;
        settings.autoSave = document.getElementById('setAutoSave').checked;
        settings.cutscene = document.getElementById('setCutscene').checked;
        settings.bunyi = document.getElementById('setSound').checked;
        settings.muzik = document.getElementById('setMusic').checked;
        settings.language = document.getElementById('setLang').value;
        saveSettings();
        if (typeof AudioManager !== 'undefined') {
          AudioManager.enabled = settings.bunyi;
          AudioManager.updateIndicator();
        }
        closeModal();
        showToast('✅ Tetapan disimpan', 'success');
      };
    }
  }, 80);
}

/* ============ BERSARA & KELUAR ============ */
function confirmRetire() {
  openModal('Bersara & Laporan Akhir',
    `<p>Adakah anda pasti mahu menamatkan simulasi ini dan melihat laporan akhir?</p>`,
    `<button class="btn-secondary" onclick="closeModal()">Batal</button>
     <button class="btn-primary" id="confirmRetireBtn">Ya, Bersara</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmRetireBtn');
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
     <button class="btn-primary" id="confirmQuitBtn">Ya, Keluar</button>`
  );
  setTimeout(() => {
    const btn = $('#confirmQuitBtn');
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
  const legacy = typeof calculateLegacyScore === 'function' ? calculateLegacyScore(state) : { total: 0 };
  const rank = legacy.total >= 85 ? 'LEGENDA' :
               legacy.total >= 70 ? 'NEGARAWAN' :
               legacy.total >= 55 ? 'PEMIMPIN' :
               legacy.total >= 40 ? 'AKTIVIS' : 'RAKYAT';

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

    <h4>Skor Legasi</h4>
    <p>Jumlah: <strong>${Math.round(legacy.total)} / 100</strong><br>
    Rank: <strong>${rank}</strong></p>

    <h4>Statistik Permainan</h4>
    <p>Giliran dimainkan: ${state.date.turn}<br>
    Peristiwa dilalui: ${state.eventHistory.length}<br>
    Berita direkod: ${state.news.length}</p>

    <p style="font-size:11px;color:var(--kelabu);font-style:italic;margin-top:14px;">
      Semua parti, watak dan peristiwa adalah fiksyen simulasi.
    </p>
  `;

  openModal('📜 Laporan Akhir Kehidupan', html,
    `<button class="btn-secondary" onclick="closeModal()">Tutup</button>
     <button class="btn-primary" id="reportSaveBtn" style="width:auto;margin:0;">Simpan & Keluar</button>`
  );
  setTimeout(() => {
    const btn = $('#reportSaveBtn');
    if (btn) btn.onclick = () => {
      saveGame(true);
      if (typeof recordToLeaderboard === 'function') recordToLeaderboard();
      closeModal();
      $('#game').classList.remove('active');
      $('#mainMenu').classList.add('active');
      refreshContinueButton();
    };
  }, 50);
}

/* ============ PANDUAN & KREDIT ============ */
function showGuide() {
  openModal('📖 Panduan Bermain',
    `<h4>Asas Permainan</h4>
    <ul>
      <li>Satu giliran = 1 bulan simulasi.</li>
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
    `<p><strong>Simulator Rakyat Malaysia</strong><br>Versi ${VERSION}</p>
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

  // Menu utama — semua butang
  const btnNew = $('#btnNewGame');
  if (btnNew) btnNew.addEventListener('click', () => {
    $('#mainMenu').classList.remove('active');
    $('#createChar').classList.add('active');
  });

  const btnCont = $('#btnContinueGame');
  if (btnCont) btnCont.addEventListener('click', () => {
    const auto = localStorage.getItem(SAVE_AUTO_KEY);
    if (auto) {
      try {
        state = JSON.parse(auto);
        $('#mainMenu').classList.remove('active');
        enterGame();
      } catch(e) { showToast('Simpanan rosak', 'error'); }
    }
  });

  const btnLoad = $('#btnLoadGame');
  if (btnLoad) btnLoad.addEventListener('click', modalLoadList);

  const btnGuide = $('#btnGuide');
  if (btnGuide) btnGuide.addEventListener('click', showGuide);

  const btnSettings = $('#btnSettings');
  if (btnSettings) btnSettings.addEventListener('click', modalSettings);

  const btnCredits = $('#btnCredits');
  if (btnCredits) btnCredits.addEventListener('click', showCredits);

  // Cipta watak
  initCreateChar();

  // Butang kembali
  $$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.closest('.screen');
      if (screen) screen.classList.remove('active');
      $('#mainMenu').classList.add('active');
    });
  });

  // Topbar
  const btnMenu = $('#btnMenuGame');
  if (btnMenu) btnMenu.addEventListener('click', openSidePanel);

  const btnClose = $('#btnClosePanel');
  if (btnClose) btnClose.addEventListener('click', closeSidePanel);

  const sidePanel = $('#sidePanel');
  if (sidePanel) {
    sidePanel.addEventListener('click', (e) => {
      if (e.target.id === 'sidePanel') closeSidePanel();
    });
  }

  // Modal close
  const btnCloseModal = $('#btnCloseModal');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  const modalEl = $('#modal');
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target.id === 'modal') closeModal();
    });
  }

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
  const evModal = $('#eventModal');
  if (evModal) {
    evModal.addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') evModal.classList.remove('open');
    });
  }

  // Expose global functions
  window.closeModal = closeModal;
  window.openMapModal = openMapModal;
  window.openSlotsModal = openSlotsModal;
  window.openLeaderboardModal = openLeaderboardModal;
  window.openStoryModal = openStoryModal;
  window.openAnalyticsModal = openAnalyticsModal;
  window.openNotifModal = openNotifModal;
  window.openPDFReport = openPDFReport;
  window.openLanguageModal = openLanguageModal;
  window.openChartModal = openChartModal;
  window.openThemePicker = openThemePicker;
  window.openCabinetModal = openCabinetModal;
  window.openTaskModal = openTaskModal;
  window.openProjectModal = openProjectModal;
  window.openBudgetModal = openBudgetModal;
  window.openPRUModal = openPRUModal;
  window.openAllCharactersModal = openAllCharactersModal;
  window.openTimelineModal = openTimelineModal;
  window.openLegacyModal = openLegacyModal;

  // Modul lanjutan — optional init
  if (typeof initV2State === 'function') initV2State();
  if (typeof initV3State === 'function') initV3State();
  if (typeof AudioManager !== 'undefined') AudioManager.init();
  if (typeof setupExtraNav === 'function') setupExtraNav();

  console.log('🎮 Simulator Rakyat Malaysia v' + VERSION + ' dimuatkan');
}

/* ============ JALANKAN ============ */
document.addEventListener('DOMContentLoaded', init);
