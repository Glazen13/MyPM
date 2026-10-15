// =====================================
// MyPM Simulasi - Sistem Negara
// =====================================

alert("JavaScript MyPM berjaya dimuatkan!");
console.log("MyPM: JavaScript aktif");

let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

let kdnk = 1.8;          // RM trilion
let inflasi = 2.5;       // peratus
let pengangguran = 3.5;  // peratus
let hutang = 1.2;        // RM trilion

function hadkan(nilai, minimum = 0, maksimum = 100) {
  return Math.max(minimum, Math.min(maksimum, nilai));
}

function kemasKiniPaparan() {
  document.getElementById("populariti").textContent =
    populariti + "%";

  document.getElementById("ekonomi").textContent =
    ekonomi;

  document.getElementById("kestabilan").textContent =
    kestabilan;

  document.getElementById("kdnk").textContent =
    "RM " + kdnk.toFixed(2) + "T";

  document.getElementById("inflasi").textContent =
    inflasi.toFixed(1) + "%";

  document.getElementById("pengangguran").textContent =
    pengangguran.toFixed(1) + "%";

  document.getElementById("hutang").textContent =
    "RM " + hutang.toFixed(2) + "T";
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

    mesej.textContent =
      "Pelan Ekonomi diumumkan. Ekonomi meningkat, peluang pekerjaan bertambah dan hutang bertambah sedikit.";
  }

  else if (jenis === "rakyat") {
    populariti = hadkan(populariti + 8);
    ekonomi = hadkan(ekonomi - 2);
    kestabilan = hadkan(kestabilan + 2);

    inflasi += 0.1;
    hutang += 0.04;

    mesej.textContent =
      "Bantuan Rakyat diumumkan. Populariti meningkat tetapi perbelanjaan kerajaan menambah hutang.";
  }

  else if (jenis === "reformasi") {
    kestabilan = hadkan(kestabilan + 8);
    populariti = hadkan(populariti + 2);
    ekonomi = hadkan(ekonomi + 2);

    pengangguran = Math.max(0, pengangguran - 0.1);

    mesej.textContent =
      "Reformasi dilaksanakan. Kestabilan meningkat dan pengangguran berkurang sedikit.";
  }

  kemasKiniPaparan();
}

kemasKiniPaparan();
```
