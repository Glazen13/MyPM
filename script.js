```javascript
let populariti = 50;
let ekonomi = 50;
let kestabilan = 50;

function kemasKiniPaparan() {
  document.getElementById("populariti").textContent =
    populariti + "%";

  document.getElementById("ekonomi").textContent =
    ekonomi;

  document.getElementById("kestabilan").textContent =
    kestabilan;
}

function hadkanNilai(nilai) {
  return Math.max(0, Math.min(100, nilai));
}

function buatKeputusan(jenis) {
  const mesej = document.getElementById("mesej");

  if (jenis === "ekonomi") {
    ekonomi = hadkanNilai(ekonomi + 8);
    populariti = hadkanNilai(populariti + 3);
    kestabilan = hadkanNilai(kestabilan + 2);

    mesej.textContent =
      "Kerajaan mengumumkan Pelan Ekonomi. Ekonomi dan populariti meningkat.";
  } else if (jenis === "rakyat") {
    populariti = hadkanNilai(populariti + 8);
    ekonomi = hadkanNilai(ekonomi - 2);
    kestabilan = hadkanNilai(kestabilan + 2);

    mesej.textContent =
      "Kerajaan mengumumkan Bantuan Rakyat. Populariti meningkat tetapi ekonomi menggunakan sumber.";
  } else if (jenis === "reformasi") {
    kestabilan = hadkanNilai(kestabilan + 8);
    populariti = hadkanNilai(populariti + 2);
    ekonomi = hadkanNilai(ekonomi + 2);

    mesej.textContent =
      "Kerajaan melaksanakan Reformasi. Kestabilan kerajaan meningkat.";
  }

  kemasKiniPaparan();
}

kemasKiniPaparan();
```
