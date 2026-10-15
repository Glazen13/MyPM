
"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  const STORAGE_PREFIX = "pm_v1_save_";
  const AUTOSAVE_KEY = "pm_v1_autosave";
  const SAVE_VERSION = 1;
  const TOTAL_SEATS = 222;
  const MAJORITY = 112;
  const MAX_WEEKS = 260;

  const scenarios = {
    stable: { ownSeats: 50, partnerSeats: 95 },
    thin: { ownSeats: 50, partnerSeats: 63 },
    minority: { ownSeats: 50, partnerSeats: 45 },
    custom: { ownSeats: 50, partnerSeats: 95 }
  };

  const initialState = {
    version: SAVE_VERSION,
    pmName: "",
    partyName: "",
    scenario: "stable",
    week: 1,
    ownSeats: 50,
    partnerSeats: 95,
    oppositionSeats: 77,
    support: 55,
    economy: 55,
    trust: 55,
    budget: 100,
    governmentStatus: "Kerajaan berfungsi",
    gameOver: false,
    actionTaken: false,
    actionHistory: [],
    log: [],
    report: [
      "Kerajaan baharu telah dibentuk.",
      "Semua angka ialah nilai simulasi, bukan statistik rasmi Malaysia."
    ]
  };

  let state = null;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function integer(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    return clamp(Math.round(number), min, max);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function getGovernmentSeats() {
    return state.ownSeats + state.partnerSeats;
  }

  function addLog(message) {
    state.log.unshift(`Minggu ${state.week}: ${message}`);
    state.log = state.log.slice(0, 30);
  }

  function setSaveStatus(message) {
    $("save-status").textContent = message;
  }

  function showSetup() {
    $("game-screen").hidden = true;
    $("setup-screen").hidden = false;
  }

  function showGame() {
    $("setup-screen").hidden = true;
    $("game-screen").hidden = false;
  }

  function updateScenarioFields() {
    const scenario = $("scenario").value;
    const preset = scenarios[scenario];

    if (!preset) return;

    $("own-seats").value = preset.ownSeats;
    $("partner-seats").value = preset.partnerSeats;

    const custom = scenario === "custom";
    $("own-seats").readOnly = !custom;
    $("partner-seats").readOnly = !custom;
  }

  function startGame(event) {
    event.preventDefault();

    const pmName = $("pm-name").value.trim();
    const partyName = $("party-name").value.trim();
    const scenario = $("scenario").value;
    const ownSeats = integer($("own-seats").value, 1, 221);
    const partnerSeats = integer($("partner-seats").value, 0, 221);

    if (!pmName || !partyName) {
      alert("Sila isi nama Perdana Menteri dan nama parti.");
      return;
    }

    if (!scenarios[scenario]) {
      alert("Sila pilih senario yang sah.");
      return;
    }

    if (ownSeats + partnerSeats > TOTAL_SEATS) {
      alert("Jumlah kerusi kerajaan tidak boleh melebihi 222.");
      return;
    }

    const oppositionSeats = TOTAL_SEATS - ownSeats - partnerSeats;

    state = {
      ...initialState,
      pmName,
      partyName,
      scenario,
      week: 1,
      ownSeats,
      partnerSeats,
      oppositionSeats,
      support: 55,
      economy: 55,
      trust: 55,
      budget: 100,
      governmentStatus: getStatus(ownSeats + partnerSeats),
      gameOver: false,
      actionTaken: false,
      actionHistory: [],
      log: [],
      report: [
        `Perdana Menteri ${pmName} memulakan pemerintahan.`,
        `Parti utama: ${partyName}.`,
        `Kerajaan mempunyai ${ownSeats + partnerSeats} kerusi daripada 222.`
      ]
    };

    addLog("Pemerintahan bermula.");
    showGame();
    render();
    autoSave();
  }

  function getStatus(seats) {
    if (seats >= MAJORITY) return "Majoriti Parlimen";
    return "Kerajaan minoriti";
  }

  const actions = {
    cost: {
      title: "Program kos sara hidup",
      description: "Bantuan bersasar diumumkan untuk membantu isi rumah.",
      budget: -8,
      support: 4,
      economy: -1,
      trust: 2
    },
    jobs: {
      title: "Program pekerjaan",
      description: "Program latihan dan peluang pekerjaan diperluas.",
      budget: -7,
      support: 2,
      economy: 4,
      trust: 1
    },
    reform: {
      title: "Reformasi pentadbiran",
      description: "Langkah ketelusan dan kecekapan pentadbiran diumumkan.",
      budget: -3,
      support: 1,
      economy: 1,
      trust: 5
    },
    coalition: {
      title: "Rundingan rakan kerajaan",
      description: "Rundingan diadakan untuk mengukuhkan kerjasama politik.",
      budget: -2,
      support: 1,
      economy: 0,
      trust: 2,
      partnerSeats: 2
    },
    health: {
      title: "Penambahbaikan kesihatan",
      description: "Peruntukan tambahan simulasi disediakan untuk perkhidmatan kesihatan.",
      budget: -6,
      support: 3,
      economy: 0,
      trust: 2
    }
  };

  function performAction(event) {
    event.preventDefault();

    if (!state || state.gameOver) {
      alert("Mulakan permainan baharu dahulu.");
      return;
    }

    if (state.actionTaken) {
      alert("Anda sudah melaksanakan tindakan minggu ini. Tamatkan minggu untuk meneruskan.");
      return;
    }

    const actionKey = $("action").value;
    const action = actions[actionKey];

    if (!action) {
      alert("Tindakan tidak sah.");
      return;
    }

    const cost = Math.abs(action.budget || 0);

    if (state.budget < cost) {
      alert("Bajet simulasi tidak mencukupi. Pilih tindakan lain atau tamatkan minggu.");
      return;
    }

    state.budget = clamp(state.budget + (action.budget || 0), 0, 200);
    state.support = clamp(state.support + action.support, 0, 100);
    state.economy = clamp(state.economy + action.economy, 0, 100);
    state.trust = clamp(state.trust + action.trust, 0, 100);

    if (action.partnerSeats) {
      state.partnerSeats = Math.min(
        state.partnerSeats + action.partnerSeats,
        TOTAL_SEATS - state.ownSeats
      );
      state.oppositionSeats = TOTAL_SEATS - state.ownSeats - state.partnerSeats;
    }

    state.actionTaken = true;

    const note = $("action-note").value.trim();
    const detail = note ? ` Catatan: ${note}` : "";

    state.report.unshift(`${action.description}${detail}`);
    state.report = state.report.slice(0, 8);

    state.actionHistory.unshift({
      week: state.week,
      action: actionKey,
      title: action.title
    });
    state.actionHistory = state.actionHistory.slice(0, 50);

    addLog(`Tindakan: ${action.title}.`);
    render();
    autoSave();
  }

  function endWeek() {
    if (!state || state.gameOver) {
      alert("Tiada permainan aktif.");
      return;
    }

    if (!state.actionTaken) {
      const proceed = confirm(
        "Anda belum melaksanakan tindakan minggu ini. Tetap tamatkan minggu?"
      );
      if (!proceed) return;
    }

    state.week += 1;
    state.actionTaken = false;

    // Perubahan kecil mingguan untuk menjadikan simulasi lebih dinamik.
    state.economy = clamp(state.economy + randomChange(), 0, 100);
    state.support = clamp(state.support + randomChange(), 0, 100);
    state.trust = clamp(state.trust + randomChange(), 0, 100);

    // Hasil bajet simulasi mingguan.
    state.budget = clamp(state.budget + 2, 0, 200);

    if (getGovernmentSeats() < MAJORITY) {
      state.governmentStatus = "Kerajaan minoriti";
    } else {
      state.governmentStatus = "Majoriti Parlimen";
    }

    if (state.week > MAX_WEEKS) {
      state.gameOver = true;
      state.report.unshift(
        "Tempoh lima tahun simulasi telah tamat. Pemerintahan berakhir."
      );
      addLog("Tempoh lima tahun tamat.");
    } else {
      addLog("Minggu pemerintahan selesai.");
      state.report.unshift(
        `Minggu baharu bermula. Bajet simulasi kini ${state.budget} unit.`
      );
    }

    state.report = state.report.slice(0, 8);
    render();
    autoSave();
  }

  function randomChange() {
    return Math.floor(Math.random() * 3) - 1;
  }

  function render() {
    if (!state) return;

    $("welcome-title").textContent = `PM ${state.pmName}`;
    $("date-label").textContent =
      `Minggu ${Math.min(state.week, MAX_WEEKS)} daripada ${MAX_WEEKS}`;

    const seats = getGovernmentSeats();

    $("seats-value").textContent = `${seats}/222`;
    $("majority-label").textContent =
      seats >= MAJORITY
        ? `${seats - MAJORITY + 1} kerusi melebihi ambang majoriti`
        : `${MAJORITY - seats} kerusi diperlukan untuk majoriti`;

    $("support-value").textContent = `${state.support}%`;
    $("economy-value").textContent = `${state.economy}/100`;
    $("trust-value").textContent = `${state.trust}/100`;
    $("government-status").textContent = state.gameOver
      ? "Pemerintahan tamat"
      : state.governmentStatus;

    $("report").innerHTML = state.report
      .map((line) => `<p>${escapeHTML(line)}</p>`)
      .join("");

    $("activity-log").innerHTML = state.log.length
      ? state.log.map((line) => `<li>${escapeHTML(line)}</li>`).join("")
      : '<li class="empty-log">Belum ada aktiviti.</li>';

    $("action-form").querySelector("button[type=submit]").disabled =
      state.actionTaken || state.gameOver;

    $("end-week").disabled = state.gameOver;

    if (state.gameOver) {
      $("end-week").textContent = "Pemerintahan tamat";
    } else {
      $("end-week").textContent = state.actionTaken
        ? "Tamatkan minggu"
        : "Tamatkan minggu tanpa tindakan";
    }
  }

  function safeSave(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Gagal menyimpan permainan:", error);
      return false;
    }
  }

  function safeLoad(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const data = JSON.parse(raw);
      if (!data || data.version !== SAVE_VERSION) return null;

      if (
        typeof data.pmName !== "string" ||
        typeof data.partyName !== "string" ||
        !Number.isInteger(data.week) ||
        !Number.isFinite(data.support) ||
        !Number.isFinite(data.economy) ||
        !Number.isFinite(data.trust) ||
        !Number.isFinite(data.budget) ||
        !Number.isFinite(data.ownSeats) ||
        !Number.isFinite(data.partnerSeats) ||
        data.week < 1 ||
        data.week > MAX_WEEKS + 1 ||
        data.ownSeats < 1 ||
        data.partnerSeats < 0 ||
        data.ownSeats + data.partnerSeats > TOTAL_SEATS
      ) {
        return null;
      }

      return {
        ...initialState,
        ...data,
        support: clamp(data.support, 0, 100),
        economy: clamp(data.economy, 0, 100),
        trust: clamp(data.trust, 0, 100),
        budget: clamp(data.budget, 0, 200),
        oppositionSeats: TOTAL_SEATS - data.ownSeats - data.partnerSeats,
        log: Array.isArray(data.log) ? data.log.slice(0, 30) : [],
        report: Array.isArray(data.report) ? data.report.slice(0, 8) : [],
        actionHistory: Array.isArray(data.actionHistory)
          ? data.actionHistory.slice(0, 50)
          : []
      };
    } catch (error) {
      console.error("Gagal membaca simpanan:", error);
      return null;
    }
  }

  function autoSave() {
    if (!state) return;

    if (safeSave(AUTOSAVE_KEY, state)) {
      setSaveStatus("Kemajuan autosimpan telah dikemas kini.");
    } else {
      setSaveStatus("Autosimpan gagal. Cuba simpan secara manual.");
    }
  }

  function saveGame() {
    if (!state) {
      alert("Mulakan permainan dahulu.");
      return;
    }

    const slot = $("save-slot").value;
    const key = STORAGE_PREFIX + slot;

    if (safeSave(key, state)) {
      setSaveStatus(`Permainan berjaya disimpan dalam Slot ${slot}.`);
    } else {
      setSaveStatus("Simpanan gagal. Semak ruang storan pelayar.");
    }
  }

  function loadGame() {
    const slot = $("save-slot").value;
    const saved = safeLoad(STORAGE_PREFIX + slot);

    if (!saved) {
      alert(`Slot ${slot} kosong atau mengandungi simpanan yang tidak sah.`);
      return;
    }

    state = saved;
    showGame();
    render();
    setSaveStatus(`Permainan daripada Slot ${slot} berjaya dimuatkan.`);
    autoSave();
  }

  function loadAutosave() {
    const saved = safeLoad(AUTOSAVE_KEY);

    if (!saved) return false;

    state = saved;
    showGame();
    render();
    setSaveStatus("Autosimpan berjaya dipulihkan.");
    return true;
  }

  function newGame() {
    const proceed = confirm(
      "Mulakan permainan baharu? Simpanan manual anda tidak akan dipadam."
    );

    if (!proceed) return;

    state = null;
    $("new-game-form").reset();
    updateScenarioFields();
    showSetup();
    setSaveStatus("Sedia untuk permainan baharu.");
  }

  function initialize() {
    $("scenario").addEventListener("change", updateScenarioFields);
    $("new-game-form").addEventListener("submit", startGame);
    $("action-form").addEventListener("submit", performAction);
    $("end-week").addEventListener("click", endWeek);
    $("save-button").addEventListener("click", saveGame);
    $("load-button").addEventListener("click", loadGame);
    $("new-game-button").addEventListener("click", newGame);

    updateScenarioFields();

    if (!loadAutosave()) {
      showSetup();
    }
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
