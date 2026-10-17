"use strict";

// =====================================
// MyPM Simulasi - Sistem Pilihan Raya
// Fasa 11.0 — v10 (Fix Gambar Pemain di Akhbar)
// =====================================

const KONFIG_PR = {
  majoriti: 112,
  jumlahKerusi: 222,
  partisipasiMin: 0.68,
  partisipasiMax: 0.82,
  penyandangBonus: 8,
  waveMax: 20,
  undiRosak: 0.015,

  prPertama: {
    penyandangBonus: 0,
    waveBonusPemain: 8,
    skorPemainBonus: 10,
    lawanPenalti: 3,
    silingKerusiPemain: 160,
    skorPemainK222Bonus: 40,
    lawanK222Penalti: 10
  }
};

// =====================================
// WAVE KEBANGSAAN
// =====================================

function kiraWave() {
  const s = gameState.statistik;
  const pop = (s.popularitiPM - 50) * 0.5;
  const pres = (s.prestasiKerajaan - 50) * 0.3;
  const kep = (s.kepuasanRakyat - 50) * 0.2;
  const wave = pop + pres + kep;
  return hadkan(wave, -KONFIG_PR.waveMax, KONFIG_PR.waveMax);
}

// =====================================
// PENGARUH WILAYAH
// =====================================

function dapatkanPartiCalon(partiId) {
  return DATA_PARTI.find(p => p.id === partiId) || null;
}

function dapatkanPengaruhWilayah(partiId, wilayah) {
  const parti = dapatkanPartiCalon(partiId);
  if (!parti || !parti.pengaruhWilayah) return 50;
  return parti.pengaruhWilayah[wilayah] || 50;
}

// =====================================
// JANA CALON KAWASAN
// =====================================

function janaCalonKawasan(k) {
  const calon = [];
  const idP = gameState.parti ? gameState.parti.id : null;

  if (k.mp) {
    const mp = DATA_MP.find(m => m.id === k.mp);
    if (mp) {
      calon.push({
        jenis: "PENYANDANG",
        id: mp.id,
        nama: mp.nama,
        parti: mp.parti,
        umur: mp.umur,
        data: mp
      });
    }
  }

  const penyandangParti = k.mp
    ? (DATA_MP.find(m => m.id === k.mp) || {}).parti
    : null;

  const calonTersedia = DATA_CALON.filter(c => {
    if (!c) return false;
    if (penyandangParti && c.parti === penyandangParti) return false;
    return true;
  });

  const shuffled = [...calonTersedia].sort(() => Math.random() - 0.5);
  const dipilih = shuffled.slice(0, 3);

  dipilih.forEach(c => {
    calon.push({
      jenis: "CABARAN",
      id: c.id,
      nama: c.nama,
      parti: c.parti,
      umur: c.umur,
      data: c
    });
  });

  if (idP && !calon.some(c => c.parti === idP) && k.id !== "K222") {
    const calonPemain = DATA_CALON.filter(c => c.parti === idP);
    if (calonPemain.length > 0) {
      const pilihan = calonPemain[Math.floor(Math.random() * calonPemain.length)];
      calon[1] = {
        jenis: "CABARAN",
        id: pilihan.id,
        nama: pilihan.nama,
        parti: pilihan.parti,
        umur: pilihan.umur,
        data: pilihan
      };
    }
  }

  return calon;
}

// =====================================
// SKOR CALON
// =====================================

function kiraSkorAsasCalon(c) {
  const d = c.data || {};
  if (c.jenis === "PENYANDANG") {
    return (d.prestasi || 50) * 0.35
         + (d.populariti || 50) * 0.30
         + (d.integriti || 50) * 0.20
         + (d.rundingan || 50) * 0.15;
  }
  return (d.populariti || 50) * 0.30
       + (d.pengalaman || 50) * 0.25
       + (d.akarUmbi || 50) * 0.20
       + (d.komunikasi || 50) * 0.15
       + (d.integriti || 50) * 0.10;
}

function kiraSkorCalon(c, k, wave, idP, gab, isPRPertama) {
  let skor = kiraSkorAsasCalon(c);

  if (c.jenis === "PENYANDANG") {
    skor += isPRPertama
      ? KONFIG_PR.prPertama.penyandangBonus
      : KONFIG_PR.penyandangBonus;
  }

  if (c.parti === idP) {
    skor += wave;
    if (isPRPertama) skor += KONFIG_PR.prPertama.waveBonusPemain;
  } else if (gab.includes(c.parti)) {
    skor += wave * 0.5;
  } else {
    skor -= wave * 0.3;
  }

  const pengaruh = dapatkanPengaruhWilayah(c.parti, k.wilayah);
  skor += (pengaruh - 50) / 4;

  if (isPRPertama && c.parti !== idP) {
    skor -= KONFIG_PR.prPertama.lawanPenalti;
  }

  skor += (Math.random() - 0.5) * 4;

  return Math.max(5, skor);
}

// =====================================
// KIRA UNDI SATU KAWASAN
// =====================================

function kiraUndiKawasan(k, calon, wave, isPRPertama) {
  const idP = gameState.parti ? gameState.parti.id : null;
  const gab = gameState.parlimen.partiKerajaan || [];

  const partisipasi = KONFIG_PR.partisipasiMin
    + Math.random() * (KONFIG_PR.partisipasiMax - KONFIG_PR.partisipasiMin);

  const jumlahPengundi = k.pengundi || 100000;
  const jumlahMengundi = Math.round(jumlahPengundi * partisipasi);
  const undiSah = Math.round(jumlahMengundi * (1 - KONFIG_PR.undiRosak));

  const skor = calon.map(c => kiraSkorCalon(c, k, wave, idP, gab, isPRPertama));
  const totalSkor = skor.reduce((a, b) => a + b, 0);

  const keputusan = calon.map((c, i) => ({
    ...c,
    skor: skor[i],
    undi: Math.round((skor[i] / totalSkor) * undiSah),
    peratus: (skor[i] / totalSkor) * 100
  }));

  const jumlahDiberi = keputusan.reduce((a, b) => a + b.undi, 0);
  const beza = undiSah - jumlahDiberi;
  if (beza !== 0 && keputusan.length > 0) keputusan[0].undi += beza;

  keputusan.sort((a, b) => b.undi - a.undi);

  const pemenang = keputusan[0];
  const majoriti = keputusan.length > 1
    ? pemenang.undi - keputusan[1].undi
    : pemenang.undi;

  return {
    id: k.id,
    nama: k.nama,
    negeri: k.negeri,
    wilayah: k.wilayah,
    pengundi: jumlahPengundi,
    partisipasi: partisipasi,
    jumlahMengundi: jumlahMengundi,
    undiSah: undiSah,
    calon: keputusan,
    pemenang: pemenang,
    majoriti: majoriti
  };
}

// =====================================
// KIRA KAWASAN PEMAIN (K222)
// =====================================

function kiraKawasanPemain(k, wave, isPRPertama) {
  const idP = gameState.parti.id;
  const p = gameState.pemain;

  const s = gameState.statistik;
  const integriti = typeof kiraIntegritiKabinet === "function"
    ? kiraIntegritiKabinet()
    : 50;

  let skorPemain = s.popularitiPM * 0.35
                 + s.prestasiKerajaan * 0.25
                 + s.kepuasanRakyat * 0.20
                 + integriti * 0.10
                 + wave * 0.5
                 + (Math.random() - 0.5) * 6;

  if (isPRPertama) {
    skorPemain += KONFIG_PR.prPertama.skorPemainBonus;
    skorPemain += KONFIG_PR.prPertama.skorPemainK222Bonus;
  }

  const lawan = DATA_CALON.filter(c => c.parti !== idP);
  const shuffled = [...lawan].sort(() => Math.random() - 0.5);
  const calonLawan = shuffled.slice(0, 3);

  const calon = [{
    jenis: "PEMAIN",
    id: "PEMAIN",
    nama: p.gelaran ? p.gelaran + " " + p.nama : p.nama,
    parti: idP,
    data: {
      populariti: s.popularitiPM,
      prestasi: s.prestasiKerajaan,
      integriti: integriti
    }
  }];

  calonLawan.forEach(c => {
    calon.push({
      jenis: "CABARAN",
      id: c.id,
      nama: c.nama,
      parti: c.parti,
      data: c
    });
  });

  const skor = calon.map((c, i) => {
    if (i === 0) return Math.max(5, skorPemain);
    let sk = kiraSkorAsasCalon(c);
    const pengaruh = dapatkanPengaruhWilayah(c.parti, k.wilayah);
    sk += (pengaruh - 50) / 4;

    if (isPRPertama) {
      sk -= KONFIG_PR.prPertama.lawanPenalti;
      sk -= KONFIG_PR.prPertama.lawanK222Penalti;
    }

    return Math.max(5, sk);
  });

  const totalSkor = skor.reduce((a, b) => a + b, 0);
  const partisipasi = KONFIG_PR.partisipasiMin
    + Math.random() * (KONFIG_PR.partisipasiMax - KONFIG_PR.partisipasiMin);
  const undiSah = Math.round((k.pengundi || 100000) * partisipasi * (1 - KONFIG_PR.undiRosak));

  const keputusan = calon.map((c, i) => ({
    ...c,
    skor: skor[i],
    undi: Math.round((skor[i] / totalSkor) * undiSah),
    peratus: (skor[i] / totalSkor) * 100
  }));

  const jumlahDiberi = keputusan.reduce((a, b) => a + b.undi, 0);
  const beza = undiSah - jumlahDiberi;
  if (beza !== 0) keputusan[0].undi += beza;

  keputusan.sort((a, b) => b.undi - a.undi);

  const pemenang = keputusan[0];
  const majoriti = keputusan.length > 1
    ? pemenang.undi - keputusan[1].undi
    : pemenang.undi;

  return {
    id: k.id,
    nama: k.nama,
    negeri: k.negeri,
    wilayah: k.wilayah,
    pengundi: k.pengundi,
    partisipasi: partisipasi,
    jumlahMengundi: Math.round(k.pengundi * partisipasi),
    undiSah: undiSah,
    calon: keputusan,
    pemenang: pemenang,
    majoriti: majoriti
  };
}

// =====================================
// JANA MP DARI KERUSI PR (FIX 222 MP)
// =====================================

function janaMPDariKerusi(rekod) {
  if (!rekod || !rekod.senaraiKawasan) return;

  const mpMenangBaru = [];

  rekod.senaraiKawasan.forEach(ksw => {
    const pemenang = ksw.pemenang;
    if (!pemenang || !pemenang.parti) return;
    if (pemenang.jenis === "PEMAIN") return;

    const mpSediaAda = DATA_MP.find(mp => mp.id === pemenang.id);

    if (mpSediaAda) {
      mpMenangBaru.push(mpSediaAda);
    } else {
      const dataCalon = pemenang.jenis === "CABARAN"
        ? (DATA_CALON.find(c => c.id === pemenang.id) || {})
        : {};

      mpMenangBaru.push({
        id: "MP_" + ksw.id,
        nama: pemenang.nama,
        kawasan: ksw.nama,
        negeri: ksw.negeri,
        parti: pemenang.parti,
        umur: pemenang.umur || dataCalon.umur || (35 + Math.floor(Math.random() * 25)),
        fokus: dataCalon.latar || "Wakil rakyat " + ksw.nama,
        kesetiaan: dataCalon.kesetiaan || (60 + Math.floor(Math.random() * 25)),
        populariti: dataCalon.populariti || (50 + Math.floor(Math.random() * 30)),
        pengaruh: 50 + Math.floor(Math.random() * 30),
        prestasi: 50 + Math.floor(Math.random() * 30),
        rundingan: 50 + Math.floor(Math.random() * 30),
        integriti: dataCalon.integriti || (55 + Math.floor(Math.random() * 30)),
        kehadiran: 80 + Math.floor(Math.random() * 15),
        personaliti: "Wakil rakyat",
        undian: "mengikut parti"
      });
    }
  });

  DATA_MP.length = 0;
  mpMenangBaru.forEach(mp => DATA_MP.push(mp));

  console.log("Data MP dikemaskini. Jumlah MP AI:", DATA_MP.length);
  const idP = rekod.partiPemain;
  const jumlahPartiSaya = DATA_MP.filter(mp => mp.parti === idP).length;
  console.log("Jumlah MP untuk parti pemain (" + idP + "):", jumlahPartiSaya);
}

// =====================================
// JALANKAN PILIHAN RAYA
// =====================================

function jalankanPilihanRayaBaru(sebab) {
  console.log("▶ Menjalankan PR. Sebab:", sebab);
  
  if (gameState.pilihanrayaSedangBerjalan) {
    console.warn("PR sudah berjalan");
    return null;
  }

  gameState.pilihanrayaSedangBerjalan = true;
  if (typeof hentikanAuto === "function") hentikanAuto();

  const isPRPertama = (sebab === "PR Pertama");
  const wave = kiraWave();
  const kerusi = {};
  const undiPopular = {};
  const senaraiKawasan = [];

  console.log("Wave:", wave.toFixed(2), "| PR Pertama:", isPRPertama);

  DATA_KAWASAN.forEach(k => {
    let keputusan;

    if (k.id === "K222" && gameState.pemain) {
      keputusan = kiraKawasanPemain(k, wave, isPRPertama);
    } else {
      const calon = janaCalonKawasan(k);
      keputusan = kiraUndiKawasan(k, calon, wave, isPRPertama);
    }

    senaraiKawasan.push(keputusan);

    const pemenang = keputusan.pemenang;
    if (pemenang && pemenang.parti) {
      kerusi[pemenang.parti] = (kerusi[pemenang.parti] || 0) + 1;
    }

    keputusan.calon.forEach(c => {
      if (c.parti) {
        undiPopular[c.parti] = (undiPopular[c.parti] || 0) + c.undi;
      }
    });
  });

  const idP = gameState.parti.id;
  const kerusiPemainAwal = kerusi[idP] || 0;

  if (isPRPertama) {
    const siling = KONFIG_PR.prPertama.silingKerusiPemain;
    if (kerusiPemainAwal > siling) {
      const lebihan = kerusiPemainAwal - siling;
      const kawasanPemainMenang = senaraiKawasan.filter(
        k => k.pemenang.parti === idP && k.id !== "K222"
      );

      const shuffled = [...kawasanPemainMenang].sort(() => Math.random() - 0.5);
      const tukar = shuffled.slice(0, lebihan);

      tukar.forEach(ksw => {
        const calonLain = ksw.calon.filter(c => c.parti !== idP);
        if (calonLain.length === 0) return;

        const pemenangBaru = calonLain[0];
        if (kerusi[idP]) kerusi[idP]--;
        kerusi[pemenangBaru.parti] = (kerusi[pemenangBaru.parti] || 0) + 1;

        ksw.pemenang = pemenangBaru;
      });

      console.log("Siling dikenakan: kerusi pemain diturunkan dari", kerusiPemainAwal, "ke", siling);
    }
  }

  const kerusiPemain = kerusi[idP] || 0;
  const sp = Object.keys(kerusi).sort((a, b) => kerusi[b] - kerusi[a]);
  const kedudukan = sp.indexOf(idP) + 1;

  const kawasanPemain = senaraiKawasan.find(x => x.id === "K222");
  const menangKawasan = kawasanPemain && kawasanPemain.pemenang.parti === idP;
  const menangParti = kedudukan === 1;
  const menang = menangKawasan && menangParti;

  const jumlahUndiPopular = Object.values(undiPopular).reduce((a, b) => a + b, 0);

  const rekod = {
    penggalKe: gameState.penggalKe,
    tarikh: kiraTarikh(gameState.masa.hari),
    hari: gameState.masa.hari,
    sebab: sebab,
    kerusi: { ...kerusi },
    undiPopular: { ...undiPopular },
    jumlahUndiPopular: jumlahUndiPopular,
    senaraiKawasan: senaraiKawasan,
    partiPemain: idP,
    kerusiPemain: kerusiPemain,
    kedudukanParti: kedudukan,
    menangKawasan: menangKawasan,
    menangParti: menangParti,
    menang: menang,
    wave: wave,
    isPRPertama: isPRPertama,
    jumlahPartiBertanding: Object.keys(kerusi).length
  };

  console.log("Keputusan PR:", {
    kerusiPemain,
    kedudukan,
    menangKawasan,
    menangParti,
    menang
  });

  // JANA MP DARI KERUSI & KEMASKINI DATA_MP
  janaMPDariKerusi(rekod);

  gameState.sejarahPR.push(rekod);
  gameState.keputusanPRSemasa = rekod;
  gameState.kerusiSemasa = { ...kerusi };

  if (gameState.tetapan.autoSave && typeof simpanPermainan === "function") {
    simpanPermainan(true);
  }

  return rekod;
}

// =====================================
// WRAPPER
// =====================================

function jalankanPRPertama() {
  console.log("✅ Menjalankan PR Pertama dari setup");
  const rekod = jalankanPilihanRayaBaru("PR Pertama");
  if (rekod) {
    console.log("✅ PR Pertama selesai, tunjuk skrin akhbar");
    tunjukModalKeputusanPRBaru(rekod);
  } else {
    console.error("❌ PR Pertama gagal dijana (rekod null)");
  }
}

function jalankanPRBubar() {
  const rekod = jalankanPilihanRayaBaru("Bubar Parlimen");
  if (rekod) tunjukModalKeputusanPRBaru(rekod);
}

function jalankanPRTamatPenggal() {
  const rekod = jalankanPilihanRayaBaru("Tamat Penggal");
  if (rekod) tunjukModalKeputusanPRBaru(rekod);
}

// =====================================
// MODAL KEPUTUSAN PR (VERSI AKHBAR)
// =====================================

function tunjukModalKeputusanPRBaru(rekod) {
  // 1. Sembunyi modal lama & skrin kiraan
  tutupModal();
  const sMengira = document.getElementById("skrinMengiraUndi");
  if (sMengira) sMengira.classList.add("hidden");

  // 2. Tunjuk skrin akhbar
  const sAkhbar = document.getElementById("skrinKeputusanPR");
  if (sAkhbar) sAkhbar.classList.remove("hidden");

  const idP = rekod.partiPemain;
  
  // 3. Isi Tabel Ringkasan Parti
  const tabelParti = document.getElementById("tabelKeputusanParti");
  if (tabelParti) {
    tabelParti.innerHTML = "";
    const senaraiParti = Object.keys(rekod.kerusi).sort((a, b) => rekod.kerusi[b] - rekod.kerusi[a]);
    
    senaraiParti.forEach(id => {
      const parti = DATA_PARTI.find(p => p.id === id);
      const namaParti = parti ? parti.nama : id;
      const isPemain = id === idP;
      
      // Highlight parti pemain
      const styleTr = isPemain ? "border: 2px solid var(--maroon); background: rgba(107,31,31,0.05);" : "border-bottom: 1px solid #1a1a1a;";
      const styleTd = isPemain ? "color: var(--maroon); font-weight: bold; font-size: 16px;" : "color: #1a1a1a;";

      tabelParti.innerHTML += `
        <tr style="${styleTr}">
          <td style="padding: 6px; ${styleTd}">${escapeHTML(namaParti.toUpperCase())}</td>
          <td style="text-align: right; padding: 6px; ${styleTd}">${rekod.kerusi[id]}</td>
        </tr>
      `;
    });

    // Jumlah
    tabelParti.innerHTML += `
      <tr style="border-top: 2px solid #1a1a1a; background: #dcd3b8;">
        <td style="padding: 6px; font-weight: bold; text-align: right;">JUMLAH:</td>
        <td style="text-align: right; padding: 6px; font-weight: bold;">${rekod.kerusiPemain} / 222</td>
      </tr>
    `;
  }

  // 4. Isi Tabel Kawasan Pemain
  const kawasanPemain = rekod.senaraiKawasan.find(k => k.id === "K222");
  if (kawasanPemain) {
    setTeks("akhbarKawasanNama", kawasanPemain.nama.toUpperCase());
    
    // Gambar pemain
    const elGambar = document.getElementById("akhbarGambarPemain");
    if (elGambar) {
      if (gameState.pemain && gameState.pemain.gambar) {
        elGambar.style.backgroundImage = `url(${gameState.pemain.gambar})`;
        elGambar.innerHTML = ""; // Kosongkan teks
      } else {
        // Kalau tak ada gambar, tunjuk emoji
        elGambar.style.backgroundImage = "none";
        elGambar.innerHTML = "<div style='display:flex; justify-content:center; align-items:center; width:100%; height:100%; font-size:24px;'>👤</div>";
      }
    }

    const tabelKawasan = document.getElementById("tabelKeputusanKawasan");
    if (tabelKawasan) {
      tabelKawasan.innerHTML = "";
      kawasanPemain.calon.forEach((c, i) => {
        const menang = i === 0;
        const status = menang ? "MENANG" : "KALAH";
        const styleStatus = menang ? "color: var(--maroon); font-weight: bold; border: 1px solid var(--maroon); padding: 2px 4px;" : "color: #1a1a1a;";
        
        tabelKawasan.innerHTML += `
          <tr style="border-bottom: 1px dashed #1a1a1a;">
            <td style="padding: 6px; font-weight: ${menang ? 'bold' : 'normal'};">${escapeHTML(c.nama)}</td>
            <td style="padding: 6px;">${escapeHTML(c.parti)}</td>
            <td style="text-align: right; padding: 6px;">${c.undi.toLocaleString()}</td>
            <td style="text-align: right; padding: 6px;"><span style="${styleStatus}">${status}</span></td>
          </tr>
        `;
      });
    }
  }

  // 5. Isi Graf Kerusi
  const graf = document.getElementById("grafKerusiAkhbar");
  if (graf) {
    graf.innerHTML = "";
    const senaraiParti = Object.keys(rekod.kerusi).sort((a, b) => rekod.kerusi[b] - rekod.kerusi[a]).slice(0, 6);
    const maxKerusi = Math.max(...Object.values(rekod.kerusi));

    senaraiParti.forEach(id => {
      const parti = DATA_PARTI.find(p => p.id === id);
      const namaParti = parti ? parti.singkatan : id;
      const jumlah = rekod.kerusi[id];
      const peratus = (jumlah / maxKerusi) * 100;
      const isPemain = id === idP;
      
      // Warna: maroon untuk pemain, hitam untuk lawan
      const warnaBar = isPemain ? "var(--maroon)" : "#1a1a1a";
      
      graf.innerHTML += `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 40px; font-family: 'Old Standard TT', serif; font-weight: bold; font-size: 12px; text-align: right;">${escapeHTML(namaParti)}</div>
          <div style="flex: 1; height: 20px; background: #dcd3b8; border: 1px solid #1a1a1a; position: relative;">
            <div style="height: 100%; width: ${peratus}%; background: ${warnaBar};"></div>
          </div>
          <div style="width: 20px; font-family: 'Old Standard TT', serif; font-weight: bold; font-size: 12px;">${jumlah}</div>
        </div>
      `;
    });
  }
}

function tutupKeputusanPRBaru() {
  const s = document.getElementById("skrinKeputusanPR");
  if (s) s.classList.add("hidden");

  const rekod = gameState.keputusanPRSemasa;
  if (!rekod) return;

  gameState.pilihanrayaSedangBerjalan = false;

  if (rekod.sebab === "PR Pertama") {
    if (rekod.menang) {
      setTimeout(() => {
        if (typeof tunjukSkrinProlog === "function") tunjukSkrinProlog();
      }, 300);
    } else {
      setTimeout(() => tunjukModalKalahPRPertama(rekod), 300);
    }
    return;
  }

  if (rekod.menang) {
    setTimeout(() => {
      if (typeof tunjukModalPenggalBaharu === "function") tunjukModalPenggalBaharu(rekod);
    }, 300);
  } else {
    setTimeout(() => {
      if (typeof tunjukLaporanAkhir === "function") tunjukLaporanAkhir(rekod);
    }, 300);
  }
}

function tunjukModalKalahPRPertama(rekod) {
  tunjukModal("Kalah Pilihan Raya", `
    <div style="text-align:center">
      <p style="font-size:48px;margin:16px 0">❌</p>
      <h2 style="font-family:'Playfair Display',serif;color:var(--maroon);text-transform:uppercase">Anda Kalah</h2>
      <p>Parti anda tidak menang majoriti atau anda kalah di kawasan sendiri.</p>
      <p class="nota">Cuba lagi dengan parti lain?</p>
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:center">
        <button class="btn-undi" onclick="cubaLagiPRPertama()">🔄 Cuba Lagi</button>
      </div>
    </div>
  `);
}

function cubaLagiPRPertama() {
  location.reload();
}

// =====================================
// BUBAR PARLIMEN
// =====================================

function bukaKonfirmasiBubar() {
  if (gameState.status !== "permainan") {
    tunjukModal("Belum Bermula", "<p>Mulakan dahulu.</p>");
    return;
  }
  if (gameState.pilihanrayaSedangBerjalan) {
    tunjukModal("Sedang Berjalan", "<p>Selesaikan dahulu.</p>");
    return;
  }
  tunjukModal("Bubar Parlimen",
    "<p>Anda pasti mahu <strong>bubar Parlimen</strong>?</p>" +
    "<p class='nota'>Populariti −5. Kalau kalah di kawasan sendiri atau parti bukan terbesar, permainan tamat.</p>" +
    "<div style='display:flex;gap:10px;margin-top:16px;justify-content:flex-end'>" +
    "<button class='btn-undi-batal' onclick='tutupModal()'>Batal</button>" +
    "<button class='btn-undi' onclick='sahkanBubarParlimen()'>Bubar</button></div>");
}

function sahkanBubarParlimen() {
  tutupModal();
  gameState.statistik.popularitiPM = hadkan(gameState.statistik.popularitiPM - 5);
  if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  setTimeout(() => jalankanPRBubar(), 300);
}

// =====================================
// TAMAT PENGGAL
// =====================================

function semakTamatPenggal() {
  if (gameState.status !== "permainan") return;
  if (gameState.pilihanrayaSedangBerjalan) return;
  if (gameState.masa.hari >= 1825) {
    if (typeof hentikanAuto === "function") hentikanAuto();
    tunjukModal("Penggal Tamat",
      "<p>Penggal 5 tahun telah <strong>tamat</strong>.</p>" +
      "<p>Pilihan raya akan dijalankan.</p>" +
      "<div style='display:flex;gap:10px;margin-top:16px;justify-content:flex-end'>" +
      "<button class='btn-undi' onclick='teruskanPilihanRayaTamatPenggal()'>Mula PR</button></div>");
  }
}

function teruskanPilihanRayaTamatPenggal() {
  tutupModal();
  setTimeout(() => jalankanPRTamatPenggal(), 300);
}

// =====================================
// PENGGAL BAHARU
// =====================================

function tunjukModalPenggalBaharu(rekod) {
  tunjukModal("Penggal Baharu", `
    <div class="pr-modal-box">
      <div class="pr-modal-header">
        <p class="pr-modal-jatah">SYABAS</p>
        <h2 class="pr-modal-tajuk">Anda Menang!</h2>
        <p class="pr-modal-sub">Penggal ke-${rekod.penggalKe + 1}</p>
      </div>
      <p class="pr-modal-sub" style="text-align:center;line-height:1.7">Parti anda menjadi <strong>parti terbesar</strong> dan anda menang di kawasan sendiri.</p>
      <div class="pr-ringkasan">
        <div class="pr-ringkasan-item">
          <span class="pr-ringkasan-label">Kerusi</span>
          <span class="pr-ringkasan-nilai menang">${rekod.kerusiPemain}</span>
        </div>
        <div class="pr-ringkasan-item">
          <span class="pr-ringkasan-label">Penggal</span>
          <span class="pr-ringkasan-nilai">${rekod.penggalKe + 1}</span>
        </div>
      </div>
      <div class="pr-modal-aksi">
        <button class="btn-undi" onclick="mulaPenggalBaharu()">▶ Mula Penggal Baharu</button>
      </div>
    </div>
  `);
}

function mulaPenggalBaharu() {
  tutupModal();
  gameState.masa.hari = 0;
  gameState.masa.bulan = 1;
  gameState.masa.tahun = 1;
  gameState.penggalKe++;
  gameState.kerusiSemasa = null;
  gameState.keputusanPRSemasa = null;
  gameState.manifestoDinilai = false;
  gameState.sejarahUndian = [];

  if (gameState.manifestoAktif.length > 0
      && typeof inisialisasiManifestoAktif === "function") {
    inisialisasiManifestoAktif();
  }

  gameState.statistik.kepuasanRakyat = 50;
  gameState.statistik.popularitiPM = 50;
  gameState.statistik.prestasiKerajaan = 50;

  if (typeof kemasKiniTopbarMasa === "function") kemasKiniTopbarMasa();
  if (typeof kemasKiniDashboard === "function") kemasKiniDashboard();
  if (typeof kemasKiniTopbarTajuk === "function") kemasKiniTopbarTajuk("ringkasan");

  if (gameState.tetapan.autoSave && typeof simpanPermainan === "function") {
    simpanPermainan(true);
  }
  tunjukModal("Penggal Baharu Bermula", "<p>Selamat kembali sebagai Perdana Menteri.</p>");
}

// =====================================
// LAPORAN AKHIR
// =====================================

function tunjukLaporanAkhir(rekod) {
  const s = gameState.statistik;
  const e = gameState.ekonomi;
  const m = gameState.manifestoAktif || [];

  let bj = 0, gg = 0;
  m.forEach(x => {
    if (typeof kiraKemajuanManifesto === "function" && kiraKemajuanManifesto(x) >= 100) bj++;
    else gg++;
  });

  let sebab = "";
  if (!rekod.menangKawasan && !rekod.menangParti) sebab = "Kalah di kawasan sendiri <strong>DAN</strong> parti bukan terbesar";
  else if (!rekod.menangKawasan) sebab = "Kalah di kawasan sendiri";
  else if (!rekod.menangParti) sebab = "Parti bukan terbesar";

  const mh = m.map(x => {
    const k = typeof kiraKemajuanManifesto === "function"
      ? kiraKemajuanManifesto(x)
      : 0;
    const kl = k >= 100 ? "berjaya" : "gagal";
    return `<div class="laporan-akhir-manifesto-item ${kl}">
      <span class="laporan-akhir-manifesto-nama">${escapeHTML(x.nama)}</span>
      <span class="laporan-akhir-manifesto-status ${kl}">${k >= 100 ? "Berjaya" : "Gagal"}</span>
    </div>`;
  }).join("");

  const nk = !rekod.menangKawasan
    ? `<div class="laporan-akhir-nota-khas">Kekalahan di kawasan sendiri menunjukkan kelemahan kepimpinan.</div>`
    : "";

  tunjukModal("Laporan Akhir", `
    <div class="laporan-akhir">
      <div class="laporan-akhir-header">
        <p class="laporan-akhir-jatah">TAMAT</p>
        <h2 class="laporan-akhir-tajuk">Laporan Akhir Penggal</h2>
        <p class="laporan-akhir-sub">${escapeHTML(rekod.tarikh)} — ${sebab}</p>
      </div>
      ${nk}
      <div class="laporan-akhir-seksyen">
        <p class="laporan-akhir-seksyen-tajuk">📊 Prestasi</p>
        <div class="laporan-akhir-baris"><span>Populariti PM</span><strong>${Math.round(s.popularitiPM)}%</strong></div>
        <div class="laporan-akhir-baris"><span>Kepuasan Rakyat</span><strong>${Math.round(s.kepuasanRakyat)}%</strong></div>
        <div class="laporan-akhir-baris"><span>Prestasi Kerajaan</span><strong>${Math.round(s.prestasiKerajaan)}</strong></div>
        <div class="laporan-akhir-baris"><span>Pertumbuhan</span><strong>${formatPeratus(s.pertumbuhanEkonomi)}</strong></div>
      </div>
      <div class="laporan-akhir-seksyen">
        <p class="laporan-akhir-seksyen-tajuk">💰 Kewangan</p>
        <div class="laporan-akhir-baris"><span>KDNK</span><strong>${formatRM(e.kdnk)}</strong></div>
        <div class="laporan-akhir-baris"><span>Hutang</span><strong>${formatRM(e.hutang)}</strong></div>
      </div>
      <div class="laporan-akhir-seksyen">
        <p class="laporan-akhir-seksyen-tajuk">📋 Manifesto</p>
        <div class="laporan-akhir-baris" style="margin-bottom:10px"><span>Berjaya / Gagal</span><strong>${bj} / ${gg}</strong></div>
        <div class="laporan-akhir-manifesto">${mh || "<p class='nota'>Tiada manifesto</p>"}</div>
      </div>
      <div class="laporan-akhir-seksyen">
        <p class="laporan-akhir-seksyen-tajuk">📜 Rekod</p>
        <div class="laporan-akhir-baris"><span>Penggal</span><strong>${rekod.penggalKe}</strong></div>
        <div class="laporan-akhir-baris"><span>Hari</span><strong>${rekod.hari} hari</strong></div>
        <div class="laporan-akhir-baris"><span>Undian</span><strong>${gameState.sejarahUndian.length}</strong></div>
        <div class="laporan-akhir-baris"><span>Peristiwa</span><strong>${gameState.sejarahPeristiwa.length}</strong></div>
      </div>
      <div class="laporan-akhir-aksi">
        <button class="btn-undi" onclick="mulaPermainanBaruDariLaporan()">🔄 Mula Permainan Baru</button>
      </div>
    </div>
  `);
}

function mulaPermainanBaruDariLaporan() {
  tutupModal();
  setTimeout(() => location.reload(), 300);
}

// =====================================
// LOG
// =====================================

console.log("✅ script-pilihanraya.js v10 dimuatkan (skrin akhbar fix)");