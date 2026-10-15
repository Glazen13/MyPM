
/* =====================================
   MyPM Simulasi - Sistem Negara
   Sistem Parlimen dan Rundingan
   ===================================== */

"use strict";

// =====================================
// 1. STATISTIK NEGARA
// =====================================

let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

let kdnk = 1.8;
let inflasi = 2.5;
let pengangguran = 3.5;
let hutang = 1.2;

// =====================================
// 2. KOMPOSISI PARLIMEN
// =====================================

const kerusiKerajaan = 120;
const kerusiPembangkang = 92;

const ahliBebas = [
  {
    id: 1,
    nama: "Ahli Parlimen Bebas 1",
    personaliti: "Mesra pembangunan",
    keutamaan: "pembangunan",
    status: "neutral"
  },
  {
    id: 2,
    nama: "Ahli Parlimen Bebas 2",
    personaliti: "Mementingkan reformasi",
    keutamaan: "dasar",
    status: "neutral"
  },
  {
    id: 3,
    nama: "Ahli Parlimen Bebas 3",
    personaliti: "Berhati-hati",
    keutamaan: "belanjawan",
    status: "neutral"
  },
  {
    id: 4,
    nama: "Ahli Parlimen Bebas 4",
    personaliti: "Mesra rakyat",
    keutamaan: "pembangunan",
    status: "neutral"
  },
  {
    id: 5,
    nama: "Ahli Parlimen Bebas 5",
    personaliti: "Pencinta reformasi",
    keutamaan: "dasar",
    status: "neutral"
  },
  {
    id: 6,
    nama: "Ahli Parlimen Bebas 6",
    personaliti: "Mementingkan kewangan",
    keutamaan: "belanjawan",
    status: "neutral"
  },
  {
    id: 7,
    nama: "Ahli Parlimen Bebas 7",
    personaliti: "Pragmatik",
    keutamaan: "pembangunan",
    status: "neutral"
  },
  {
    id: 8,
    nama: "Ahli Parlimen Bebas 8",
    personaliti: "Tegas tentang dasar",
    keutamaan: "dasar",
    status: "neutral"
  },
  {
    id: 9,
    nama: "Ahli Parlimen Bebas 9",
    personaliti: "Sangat berhati-hati",
    keutamaan: "belanjawan",
    status: "neutral"
  },
  {
    id: 10,
    nama: "Ahli Parlimen Bebas 10",
    personaliti: "Suka berunding",
    keutamaan: "pembangunan",
    status: "neutral"
  }
];

// =====================================
// 3. JENIS TAWARAN
// =====================================

const tawaran = {
  pembangunan: {
    nama: "Pembangunan kawasan",
    penerangan:
      "Komitmen projek infrastruktur untuk kawasan beliau."
  },

  dasar: {
    nama: "Komitmen dasar",
    penerangan:
      "Komitmen untuk meneliti cadangan dasar beliau."
  },

  belanjawan: {
    nama: "Sokongan belanjawan",
    penerangan:
      "Komitmen mempertimbangkan keperluan kawasan melalui proses belanjawan."
  }
};

// =====================================
// 4. FUNGSI SOKONGAN
// =====================================

function hadkan(nilai, minimum = 0, maksimum = 100) {
  return Math.max(minimum, Math.min(maksimum, nilai));
}

function dapatkanElemen(id) {
  const elemen = document.getElementById(id);

  if (!elemen) {
    console.error("Elemen HTML tidak ditemui: " + id);
  }

  return elemen;
}

// =====================================
// 5. KEMAS KINI DASHBOARD
// =====================================

function kemasKiniPaparan() {
  const elemenPopulariti = dapatkanElemen("populariti");
  const elemenEkonomi = dapatkanElemen("ekonomi");
  const elemenKestabilan = dapatkanElemen("kestabilan");
  const elemenKDNK = dapatkanElemen("kdnk");
  const elemenInflasi = dapatkanElemen("inflasi");
  const elemenPengangguran = dapatkanElemen("pengangguran");
  const elemenHutang = dapatkanElemen("hutang");

  if (elemenPopulariti) {
    elemenPopulariti.textContent = populariti + "%";
  }

  if (elemenEkonomi) {
    elemenEkonomi.textContent = ekonomi;
  }

  if (elemenKestabilan) {
    elemenKestabilan.textContent = kestabilan;
  }

  if (elemenKDNK) {
    elemenKDNK.textContent = "RM " + kdnk.toFixed(2) + "T";
  }

  if (elemenInflasi) {
    elemenInflasi.textContent = inflasi.toFixed(1) + "%";
  }

  if (elemenPengangguran) {
    elemenPengangguran.textContent =
      pengangguran.toFixed(1) + "%";
  }

  if (elemenHutang) {
    elemenHutang.textContent = "RM " + hutang.toFixed(2) + "T";
  }
}

// =====================================
// 6. TINDAKAN KERAJAAN
// =====================================

function buatKeputusan(jenis) {
  const mesej = dapatkanElemen("mesej");

  if (!["ekonomi", "rakyat", "reformasi"].includes(jenis)) {
    console.warn("Jenis keputusan tidak dikenali:", jenis);
    return;
  }

  if (jenis === "ekonomi") {
    ekonomi = hadkan(ekonomi + 8);
    populariti = hadkan(populariti + 3);
    kestabilan = hadkan(kestabilan + 2);

    kdnk += 0.03;
    inflasi = Math.max(0, inflasi - 0.1);
    pengangguran = Math.max(0, pengangguran - 0.1);
    hutang += 0.02;

    if (mesej) {
      mesej.textContent =
        "Pelan Ekonomi diumumkan. Ekonomi meningkat.";
    }
  }

  else if (jenis === "rakyat") {
    populariti = hadkan(populariti + 8);
    ekonomi = hadkan(ekonomi - 2);
    kestabilan = hadkan(kestabilan + 2);

    inflasi += 0.1;
    hutang += 0.04;

    if (mesej) {
      mesej.textContent =
        "Bantuan Rakyat diumumkan. Populariti meningkat, hutang bertambah.";
    }
  }

  else if (jenis === "reformasi") {
    kestabilan = hadkan(kestabilan + 8);
    populariti = hadkan(populariti + 2);
    ekonomi = hadkan(ekonomi + 2);

    pengangguran = Math.max(0, pengangguran - 0.1);

    if (mesej) {
      mesej.textContent =
        "Reformasi dilaksanakan. Kestabilan meningkat.";
    }
  }

  kemasKiniPaparan();
}

// =====================================
// 7. DIALOG AHLI PARLIMEN BEBAS
// =====================================

function dialogRespons(ahli, jenisTawaran, berjaya) {
  if (berjaya) {
    const dialogBerjaya = {
      pembangunan:
        "Saya menghargai komitmen terhadap pembangunan kawasan. Saya bersedia menyokong kerajaan buat masa ini.",

      dasar:
        "Komitmen terhadap cadangan dasar saya meyakinkan. Saya bersedia memberikan sokongan.",

      belanjawan:
        "Saya berpuas hati dengan kesediaan kerajaan mempertimbangkan keperluan kawasan melalui proses belanjawan."
    };

    return "“" + dialogBerjaya[jenisTawaran] + "”";
  }

  const dialogGagal = {
    pembangunan:
      "Saya masih belum yakin bahawa keperluan kawasan saya akan diberi perhatian.",

    dasar:
      "Saya perlukan komitmen dasar yang lebih jelas sebelum mempertimbangkan sokongan.",

    belanjawan:
      "Saya belum berpuas hati dengan penjelasan mengenai keperluan belanjawan."
  };

  return "“" + dialogGagal[ahli.keutamaan] + "”";
}

// =====================================
// 8. PROSES RUNDINGAN
// =====================================

function rundingAhli(id, jenisTawaran) {
  const ahli = ahliBebas.find(item => item.id === id);

  if (!ahli) {
    console.warn("Ahli Parlimen tidak ditemui:", id);
    return;
  }

  if (ahli.status !== "neutral") {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(tawaran, jenisTawaran)) {
    console.warn("Tawaran tidak sah:", jenisTawaran);
    return;
  }

  // Tawaran yang sepadan dengan keutamaan
  // mempunyai peluang lebih tinggi untuk berjaya.
  const sepadan = ahli.keutamaan === jenisTawaran;
  const peluang = sepadan ? 0.8 : 0.3;
  const berjaya = Math.random() < peluang;

  ahli.status = berjaya ? "menyokong" : "menolak";

  // Kesan rundingan terhadap kestabilan dan populariti.
  if (berjaya) {
    kestabilan = hadkan(kestabilan + 2);
    populariti = hadkan(populariti + 1);
  } else {
    kestabilan = hadkan(kestabilan - 1);
    populariti = hadkan(populariti - 1);
  }

  kemasKiniPaparan();

  const hasil = dapatkanElemen("statusRundingan");

  if (hasil) {
    hasil.textContent =
      ahli.nama + " (" + ahli.personaliti + "). " +
      "Tawaran: " + tawaran[jenisTawaran].nama + ". " +
      dialogRespons(ahli, jenisTawaran, berjaya) +
      (
        berjaya
          ? " Rundingan berjaya."
          : " Rundingan gagal. Wakil ini tidak boleh dirunding semula dalam pusingan ini."
      );
  }

  kemasKiniParlimen();
}

// =====================================
// 9. PUSINGAN RUNDINGAN BAHARU
// =====================================

function pusinganRundinganBaharu() {
  ahliBebas.forEach(ahli => {
    ahli.status = "neutral";
  });

  kemasKiniParlimen();

  const hasil = dapatkanElemen("statusRundingan");

  if (hasil) {
    hasil.textContent =
      "Pusingan rundingan baharu bermula. Semua Ahli Parlimen Bebas boleh dirunding semula.";
  }
}

// =====================================
// 10. KEMAS KINI PAPARAN PARLIMEN
// =====================================

function kemasKiniParlimen() {
  const menyokong = ahliBebas.filter(
    ahli => ahli.status === "menyokong"
  ).length;

  const selesai = ahliBebas.filter(
    ahli => ahli.status !== "neutral"
  ).length;

  // Sokongan kerajaan terdiri daripada kerusi kerajaan
  // dan Ahli Parlimen Bebas yang bersetuju menyokong.
  const sokongan = kerusiKerajaan + menyokong;

  const elemenKerajaan = dapatkanElemen("kerusiKerajaan");
  const elemenPembangkang = dapatkanElemen("kerusiPembangkang");
  const elemenBebas = dapatkanElemen("kerusiBebas");
  const elemenSokongan = dapatkanElemen("sokonganKerajaan");
  const elemenMajoriti = dapatkanElemen("statusMajoriti");
  const senarai = dapatkanElemen("senaraiBebas");

  if (elemenKerajaan) {
    elemenKerajaan.textContent = kerusiKerajaan;
  }

  if (elemenPembangkang) {
    elemenPembangkang.textContent = kerusiPembangkang;
  }

  if (elemenBebas) {
    elemenBebas.textContent = ahliBebas.length;
  }

  if (elemenSokongan) {
    elemenSokongan.textContent = sokongan + " / 222";
  }

  if (elemenMajoriti) {
    elemenMajoriti.textContent =
      sokongan >= 112 ? "Majoriti" : "Tiada majoriti";
  }

  if (!senarai) {
    return;
  }

  // Bina semula senarai supaya butang pusingan
  // tidak ditambah berulang kali.
  senarai.innerHTML = ahliBebas.map(ahli => {
    let status = "Belum dirunding";

    if (ahli.status === "menyokong") {
      status = "Menyokong kerajaan";
    }

    if (ahli.status === "menolak") {
      status = "Menolak tawaran";
    }

    let kawalan = "";

    if (ahli.status === "neutral") {
      kawalan = `
        <label for="tawaran-${ahli.id}">
          Pilih tawaran:
        </label>

        <select id="tawaran-${ahli.id}">
          <option value="pembangunan">
            Pembangunan kawasan
          </option>

          <option value="dasar">
            Komitmen dasar
          </option>

          <option value="belanjawan">
            Sokongan belanjawan
          </option>
        </select>

        <p>
          ${ahli.personaliti}.
          Keutamaan: ${tawaran[ahli.keutamaan].nama}.
        </p>

        <button
          onclick="rundingAhli(
            ${ahli.id},
            document.getElementById('tawaran-${ahli.id}').value
          )"
        >
          Hantar tawaran
        </button>
      `;
    } else {
      kawalan = `
        <p>Rundingan selesai untuk pusingan ini.</p>
      `;
    }

    return `
      <div class="stat" style="margin:10px 0">
        <h3>${ahli.nama}</h3>
        <p style="font-size:16px">${status}</p>
        ${kawalan}
      </div>
    `;
  }).join("");

  // Butang ini diletakkan sekali sahaja selepas senarai.
  const butangPusingan = document.createElement("button");

  butangPusingan.textContent =
    "Mulakan Pusingan Rundingan Baharu";

  butangPusingan.onclick = pusinganRundinganBaharu;

  senarai.appendChild(butangPusingan);

  // Paparkan arahan awal jika belum ada rundingan.
  if (selesai === 0) {
    const hasil = dapatkanElemen("statusRundingan");

    if (hasil) {
      hasil.textContent =
        "Pilih tawaran untuk memulakan rundingan dengan seorang Ahli Parlimen bebas.";
    }
  }
}

// =====================================
// 11. MULAKAN APLIKASI
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  kemasKiniPaparan();
  kemasKiniParlimen();
});
