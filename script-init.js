"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("=====================================");
  console.log("MyPM Simulasi - " + gameState.versi + " (" + gameState.fasa + ")");
  console.log("=====================================");

  muatData();
  jalankanLoading();

  setTimeout(() => {
    const modul = [
      { nama: "Setup", semak: typeof pilihKesukaran === "function" },
      { nama: "Kabinet", semak: typeof tunjukSkrinKabinet === "function" },
      { nama: "Parlimen", semak: typeof paparHalamanParlimen === "function" },
      { nama: "Ekonomi", semak: typeof paparHalamanEkonomi === "function" },
      { nama: "Manifesto", semak: typeof paparHalamanManifesto === "function" },
      { nama: "Peristiwa", semak: typeof paparHalamanPeristiwa === "function" },
      { nama: "Media", semak: typeof paparHalamanMedia === "function" },
      { nama: "Rekod", semak: typeof paparHalamanRekod === "function" },
      { nama: "Pilihan Raya", semak: typeof jalankanPRPertama === "function" }
    ];

    console.log("📦 Modul status:");
    modul.forEach(m => {
      console.log((m.semak ? "  ✅ " : "  ❌ ") + m.nama);
    });

    const gagal = modul.filter(m => !m.semak);
    if (gagal.length > 0) {
      console.warn("⚠️ Modul tidak dimuatkan:", gagal.map(m => m.nama).join(", "));
    }
  }, 500);
});