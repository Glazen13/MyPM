"use strict";

// =====================================
// MyPM Simulasi - Bentuk Gabungan
// Fasa 11.0 — pilih parti gabungan selepas PR
// =====================================

let partiGabunganDipilih = [];

// =====================================
// TUNJUK SKRIN
// =====================================

function tunjukSkrinGabungan() {
  const s1 = document.getElementById("skrinProlog");
  const s2 = document.getElementById("skrinGabungan");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  partiGabunganDipilih = [];
  paparSkrinGabungan();
}

function kembaliKeMenuGabungan() {
  // Balik ke prolog step 1
  const s1 = document.getElementById("skrinGabungan");
  const s2 = document.getElementById("skrinProlog");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.remove("hidden");

  if (typeof paparPrologStep === "function") paparPrologStep(1);
}

// =====================================
// PAPAR
// =====================================

function paparSkrinGabungan() {
  const idP = gameState.parti ? gameState.parti.id : null;
  const rekod = gameState.keputusanPRSemasa;
  if (!rekod || !idP) return;

  const partiSaya = DATA_PARTI.find(p => p.id === idP);
  const kerusiSaya = rekod.kerusi[idP] || 0;

  setTeks("gabunganPartiSaya", partiSaya ? partiSaya.singkatan : "—");
  setTeks("gabunganKerusiSaya", kerusiSaya);

  // Kira jumlah gabungan semasa
  const jumlah = hitungJumlahGabungan();
  setTeks("gabunganJumlah", jumlah);

  // Status
  const status = document.getElementById("gabunganStatus");
  if (status) {
    if (jumlah >= 112) {
      status.textContent = "✅ Cukup majoriti! Anda boleh sahkan gabungan.";
      status.className = "gabungan-status cukup";
    } else {
      status.textContent = "Perlu " + (112 - jumlah) + " kerusi lagi untuk majoriti.";
      status.className = "gabungan-status tak-cukup";
    }
  }

  // Butang sahkan
  const btn = document.getElementById("btnSahkanGabungan");
  if (btn) btn.disabled = jumlah < 112;

  // Papar senarai parti
  paparSenaraiPartiGabungan();
}

function paparSenaraiPartiGabungan() {
  const panel = document.getElementById("senaraiPartiGabungan");
  if (!panel) return;

  const idP = gameState.parti ? gameState.parti.id : null;
  const rekod = gameState.keputusanPRSemasa;
  if (!rekod || !idP) return;

  // Senarai parti yang ada kerusi, kecuali parti pemain
  const senarai = Object.keys(rekod.kerusi)
    .filter(id => id !== idP && id !== "Bebas")
    .map(id => {
      const parti = DATA_PARTI.find(p => p.id === id);
      return {
        id,
        nama: parti ? parti.nama : id,
        singkatan: parti ? parti.singkatan : id,
        emoji: parti ? parti.emoji : "🏛️",
        warna: parti ? (parti.warna || warnaKategori(parti.kategori)) : "#64748b",
        kerusi: rekod.kerusi[id] || 0
      };
    })
    .filter(p => p.kerusi > 0)
    .sort((a, b) => b.kerusi - a.kerusi);

  panel.innerHTML = senarai.map(p => {
    const dipilih = partiGabunganDipilih.includes(p.id);
    const kelas = dipilih ? "dipilih" : "";

    return `
      <div class="kad-gabungan-parti ${kelas}" onclick="togolPartiGabungan('${p.id}')">
        <div class="kad-gabungan-check">✓</div>
        <div class="kad-gabungan-logo" style="background:${p.warna}">
          ${p.emoji}
        </div>
        <div class="kad-gabungan-info">
          <p class="kad-gabungan-nama">${escapeHTML(p.nama)}</p>
          <p class="kad-gabungan-parti-nama">${escapeHTML(p.singkatan)}</p>
          <p class="kad-gabungan-kerusi"><strong>${p.kerusi}</strong> kerusi</p>
        </div>
      </div>
    `;
  }).join("");
}

// =====================================
// TOGOL PARTI
// =====================================

function togolPartiGabungan(id) {
  const i = partiGabunganDipilih.indexOf(id);
  if (i !== -1) {
    partiGabunganDipilih.splice(i, 1);
  } else {
    partiGabunganDipilih.push(id);
  }

  paparSkrinGabungan();
}

// =====================================
// KIRA JUMLAH
// =====================================

function hitungJumlahGabungan() {
  const idP = gameState.parti ? gameState.parti.id : null;
  const rekod = gameState.keputusanPRSemasa;
  if (!rekod || !idP) return 0;

  let jumlah = rekod.kerusi[idP] || 0;
  partiGabunganDipilih.forEach(id => {
    jumlah += rekod.kerusi[id] || 0;
  });
  return jumlah;
}

// =====================================
// SAHKAN GABUNGAN
// =====================================

function sahkanGabungan() {
  const jumlah = hitungJumlahGabungan();
  if (jumlah < 112) {
    tunjukModal("Belum Cukup", "<p>Gabungan perlu sekurang-kurangnya 112 kerusi.</p>");
    return;
  }

  const idP = gameState.parti.id;

  // Simpan senarai parti kerajaan
  gameState.parlimen.partiKerajaan = [idP, ...partiGabunganDipilih];
  gameState.parlimen.jumlahKerusiGabungan = jumlah;

  console.log("Gabungan disahkan:", {
    parti: gameState.parlimen.partiKerajaan,
    jumlahKerusi: jumlah
  });

  const s = document.getElementById("skrinGabungan");
  if (s) s.classList.add("hidden");

  // Pergi ke kabinet
  if (typeof tunjukSkrinKabinet === "function") tunjukSkrinKabinet();
}