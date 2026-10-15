
"use strict";

// =====================================
// MyPM Simulasi - Sistem Negara
// =====================================

let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

let kdnk = 1.8;
let inflasi = 2.5;
let pengangguran = 3.5;
let hutang = 1.2;

// Sistem Parlimen
const kerusiKerajaan = 120;
const kerusiPembangkang = 92;

const ahliBebas = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nama: "Ahli Parlimen Bebas " + (i + 1),
  status: "neutral"
}));

function hadkan(nilai, minimum = 0, maksimum = 100) {
  return Math.max(minimum, Math.min(maksimum, nilai));
}

function kemasKiniPaparan() {
  document.getElementById("populariti").textContent = populariti + "%";
  document.getElementById("ekonomi").textContent = ekonomi;
  document.getElementById("kestabilan").textContent = kestabilan;
  document.getElementById("kdnk").textContent = "RM " + kdnk.toFixed(2) + "T";
  document.getElementById("inflasi").textContent = inflasi.toFixed(1) + "%";
  document.getElementById("pengangguran").textContent = pengangguran.toFixed(1) + "%";
  document.getElementById("hutang").textContent = "RM " + hutang.toFixed(2) + "T";
}

function buatKeputusan(jenis) {
  const mesej = document.getElementById("mesej");

  if (jenis === "ekonomi") {
    ekonomi = hadkan(ekonomi + 8);
    populariti = hadkan(populariti + 3);
    kestabilan = hadkan(kestabilan + 2);
    kdnk += 0.03;
    inflasi = Math.max(0, inflasi - 0.1);
    pengangguran = Math.max(0, pengangguran - 0.1);
    hutang += 0.02;
    mesej.textContent = "Pelan Ekonomi diumumkan. Ekonomi meningkat.";
  } else if (jenis === "rakyat") {
    populariti = hadkan(populariti + 8);
    ekonomi = hadkan(ekonomi - 2);
    kestabilan = hadkan(kestabilan + 2);
    inflasi += 0.1;
    hutang += 0.04;
    mesej.textContent = "Bantuan Rakyat diumumkan. Populariti meningkat, hutang bertambah.";
  } else if (jenis === "reformasi") {
    kestabilan = hadkan(kestabilan + 8);
    populariti = hadkan(populariti + 2);
    ekonomi = hadkan(ekonomi + 2);
    pengangguran = Math.max(0, pengangguran - 0.1);
    mesej.textContent = "Reformasi dilaksanakan. Kestabilan meningkat.";
  }

  kemasKiniPaparan();
}

function rundingAhli(id) {
  const ahli = ahliBebas.find(a => a.id === id);

  if (!ahli || ahli.status !== "neutral") return;

  const setuju = confirm(
    "Runding dengan " + ahli.nama +
    "?\n\nOK: Tawarkan komitmen pembangunan kawasan.\nCancel: Batalkan rundingan."
  );

  if (!setuju) return;

  // Peluang menerima tawaran: 60%
  if (Math.random() < 0.6) {
    ahli.status = "menyokong";
    document.getElementById("statusRundingan").textContent =
      ahli.nama + " menerima tawaran dan menyokong kerajaan.";
  } else {
    ahli.status = "menolak";
    document.getElementById("statusRundingan").textContent =
      ahli.nama + " menolak tawaran. Rundingan telah selesai.";
  }

  kemasKiniParlimen();
}

function kemasKiniParlimen() {
  const menyokong = ahliBebas.filter(a => a.status === "menyokong").length;
  const dirunding = ahliBebas.filter(a => a.status !== "neutral").length;
  const sokongan = kerusiKerajaan + menyokong;

  document.getElementById("kerusiKerajaan").textContent = kerusiKerajaan;
  document.getElementById("kerusiPembangkang").textContent = kerusiPembangkang;
  document.getElementById("kerusiBebas").textContent = 10;
  document.getElementById("sokonganKerajaan").textContent =
    sokongan + " / 222";

  document.getElementById("statusMajoriti").textContent =
    sokongan >= 112 ? "Majoriti" : "Tiada majoriti";

  const senarai = document.getElementById("senaraiBebas");

  senarai.innerHTML = ahliBebas.map(ahli => {
    let labelStatus = "Belum dirunding";

    if (ahli.status === "menyokong") {
      labelStatus = "Menyokong kerajaan";
    } else if (ahli.status === "menolak") {
      labelStatus = "Menolak tawaran";
    }

    const butang = ahli.status === "neutral"
      ? `<button onclick="rundingAhli(${ahli.id})">Runding</button>`
      : `<button disabled>Selesai</button>`;

    return `
      <div class="stat" style="margin:10px 0">
        <strong>${ahli.nama}</strong>
        <p style="font-size:16px">${labelStatus}</p>
        ${butang}
      </div>
    `;
  }).join("");

  const ringkasan = document.getElementById("statusRundingan");

  if (dirunding === 0) {
    ringkasan.textContent =
      "10 Ahli Parlimen bebas tersedia untuk rundingan.";
  } else {
    ringkasan.textContent =
      dirunding + " daripada 10 telah dirunding. " +
      menyokong + " menyokong kerajaan.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  kemasKiniPaparan();
  kemasKiniParlimen();
});
