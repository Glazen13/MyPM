# DOKUMEN INDUK — MyPM SIMULASI v2.0

**Tarikh dikemas kini:** 15 Oktober 2026
**Status:** Fasa 1–5.2 SIAP
**Repositori:** https://github.com/Glazen13/MyPM
**Halaman:** https://glazen13.github.io/MyPM/

---

## 1. IDENTITI PROJEK

| Perkara | Nilai |
|---|---|
| Nama | MyPM Simulasi |
| Tagline | Jadilah Perdana Menteri Malaysia |
| Jenis | Simulasi politik & pentadbiran Malaysia |
| Platform | Web (HTML + CSS + JavaScript) |
| Bahasa | Bahasa Malaysia |
| Asal | SimRakyat / Simulator Rakyat Malaysia |
| Pemain | Perdana Menteri Malaysia |
| Senario mula | Kerajaan Stabil |
| Kesukaran | Normal |
| Bentuk kerajaan | Gabungan |
| Gaya pemerintahan | Pragmatik |
| Kabinet | Pemain pilih menteri sendiri |
| Giliran | Harian (7 hari = 1 minggu) |
| Penggal | 5 tahun = 260 minggu |
| Ekonomi | RM, dikira bulanan (setiap 4 minggu) |
| Tarikh mula | 1 Januari 2025 |

---

## 2. STATUS SEMASA

### ✅ SIAP

| Fasa | Komponen |
|---|---|
| Fasa 1 | Struktur projek, dashboard, sistem AP Bebas asas |
| Fasa 2.1 | Integrasi kecenderungan AP Bebas |
| Fasa 2.3 | Model MP individu (222 MP) |
| Fasa 2.4 | `jelaskanUndian()` penuh |
| Fasa 2.5 | Krisis belanjawan & undi tidak percaya |
| Fasa 3.1 | Kalendar & giliran mingguan |
| Fasa 3.2 | 17 peristiwa bersyarat |
| Fasa 3.3 | Parti politik & rundingan gabungan |
| Fasa 3.4 | Media & pendapat awam (5 kumpulan) |
| Fasa 3.5 | Dasar & projek kerajaan (8 dasar) |
| Fasa 4.1 | Pilihan raya berdasarkan kerusi |
| Fasa 4.2 | Laporan akhir penggal |
| Fasa 5.1 | Sistem masa harian (7 hari/minggu) |
| Fasa 5.2 | Auto mode (5 saat/hari) |

### ⏳ BELUM SIAP

| Fasa | Komponen |
|---|---|
| Fasa 4.3 | Dokumen Induk (dokumen ini) |
| Fasa 5.3 | Sistem save/load |
| Fasa 6 | UI baharu (menu sisi + header moden) |

---

## 3. SENI BINA TEKNIKAL

### Fail

| Fail | Fungsi |
|---|---|
| `index.html` | Struktur UI |
| `style.css` | Gaya visual |
| `script.js` | Logik permainan |

### Struktur JavaScript

| Bahagian | Kandungan |
|---|---|
| 0 | Fungsi asas (`hadkan`, `escapeHTML`) |
| 1 | Statistik negara (7 metrik) |
| 2 | Komposisi Parlimen (222 MP) |
| 3 | Data sistem (tawaran, parameter) |
| 3b | Kalendar & giliran harian |
| 3c | Media & pendapat awam |
| 3d | Parti politik & gabungan |
| 3e | Dasar & projek kerajaan |
| 3f | Peristiwa bersyarat |
| 3g | Penjelasan undian |
| 3h | Label & undi AP Bebas |
| 4 | Undian Parlimen |
| 5 | Tindakan kerajaan |
| 6 | Dialog & rundingan AP Bebas |
| 7 | Paparan Parlimen |
| 8 | Pilihan raya |
| 8b | Laporan akhir penggal |
| 9 | Mula aplikasi |

---

## 4. SISTEM YANG TELAH DIBINA

### 4.1 Statistik Negara
- Populariti PM (0–100)
- Indeks Ekonomi (0–100)
- Kestabilan Kerajaan (0–100)
- KDNK (RM Trilion)
- Inflasi (%)
- Pengangguran (%)
- Hutang Negara (RM Trilion)

### 4.2 Parlimen
- 222 kerusi: 120 kerajaan + 92 pembangkang + 10 AP Bebas
- Majoriti mudah: 112
- Setiap MP ada: id, afiliasi, kecenderungan, hadir, undi
- Kehadiran: 95% kerajaan, 90% pembangkang
- Disiplin parti: 95%
- Kesan kecenderungan: 0.10

### 4.3 Undian
- Formula majoriti: `floor((sokong+tolak)/2) + 1`
- Seri = ditolak
- Jenis usul: pembangunan, dasar, belanjawan
- Belanjawan lulus: +3 kestabilan, +2 populariti
- Belanjawan gagal: −8 kestabilan, −4 populariti

### 4.4 AP Bebas
- 10 orang dengan personaliti & keutamaan
- Keutamaan: pembangunan, dasar, belanjawan
- Kecenderungan: −3 hingga +3
- Rundingan: berjaya +2, gagal −1
- Pusingan baharu: reset `dirunding` sahaja

### 4.5 Parti Politik
- 4 gabungan (A, B, C, D) + 3 pembangkang (X, Y, Z)
- Setiap parti ada hubungan (0–100)
- Setiap parti ada tuntutan
- Rundingan berjaya: hubungan +10, kestabilan +2

### 4.6 Media & Pendapat Awam
- 5 kumpulan: bandar, luar bandar, belia, warga emas, pekerja
- 4 media: nasional, bebas, kritis, sosial
- 4 strategi komunikasi: sidang media, lawatan, pengakuan, diam
- Media sosial gandakan kesan belia

### 4.7 Dasar & Projek
- 8 dasar dalam 4 kategori
- Belanjawan awal: RM 50B
- Setiap dasar ada kos, tempoh, risiko
- Status: belum, aktif, selesai, gagal

### 4.8 Peristiwa
- 17 peristiwa dalam 8 kategori
- Cetus automatik bila syarat dipenuhi
- Setiap peristiwa ada 2–3 pilihan tindak balas
- Had sejarah: 30 rekod

### 4.9 Kalendar & Giliran
- 1 minggu = 7 hari
- 1 bulan = 4 minggu
- 1 tahun = 52 minggu
- 1 penggal = 260 minggu (5 tahun)
- Tindakan: 3–5 per minggu (default 5)

### 4.10 Auto Mode
- Kadar: 5 saat / hari
- Berhenti bila pilihan raya
- Berhenti bila tamat penggal
- Reset bila penggal baharu

### 4.11 Pilihan Raya
- Markah: populariti×0.30 + ekonomi×0.25 + kestabilan×0.20 + hubungan×0.15 + bonus − penalti
- Tukar ke kerusi: `round(222 × markah / 100)`
- Keputusan: MENANG BESAR (≥148), MENANG (≥112), MENANG TIPIS (≥100), KALAH (<100)

### 4.12 Laporan Akhir
- Prestasi negara (nilai vs awal)
- Ekonomi penuh
- Parlimen (undian lulus/tolak)
- Dasar (selesai/gagal/aktif)
- Peristiwa
- Parti
- Pilihan raya
- Butang salin laporan

---

## 5. SISTEM YANG BELUM DIBINA

| Sistem | Keutamaan |
|---|---|
| Save/load (localStorage) | Tinggi |
| UI baharu (menu sisi) | Sederhana |
| Kabinet menteri (pilih sendiri) | Sederhana |
| Rundingan parti pembangkang | Rendah |
| Krisis lanjutan (rantaian) | Rendah |
| Ekonomi lanjutan (sektor) | Rendah |
| Simpanan PM berasingan | Rendah |
| Audio / bunyi | Rendah |

---

## 6. FORMULA & PARAMETER

### Formula utama
majoritiHadir = floor((sokong + tolak) / 2) + 1
kerusiPilihanRaya = round(222 × markah / 100)
markahPilihanRaya = populariti×0.30 + ekonomi×0.25 + kestabilan×0.20 + hubungan×0.15 + bonusDasar − penaltiDasar + bonusUndian


### Parameter

| Parameter | Nilai |
|---|---|
| `hadirKerajaan` | 0.95 |
| `hadirPembangkang` | 0.90 |
| `disiplinKerajaan` | 0.95 |
| `disiplinPembangkang` | 0.95 |
| `kesanKecenderungan` | 0.10 |
| `hadirBebas` | 0.95 |
| `peluangSokongSepadan` | 0.70 |
| `peluangSokongTakSepadan` | 0.30 |
| `peluangBerkecuali` | 0.20 |

---

## 7. SENARAI FAIL
MyPM/
├── index.html (struktur UI)
├── script.js (logik permainan)
├── style.css (gaya visual)
└── DOKUMEN_INDUK_v2.md (dokumen ini)

---

## 8. UJIAN YANG DILALUI

| Ujian | Status |
|---|---|
| Undian Parlimen — kerajaan boleh kalah | ✅ |
| AP Bebas — 10 orang dengan kecenderungan | ✅ |
| Parti — rundingan berjaya/gagal | ✅ |
| Media — komunikasi PM berkesan | ✅ |
| Dasar — laksana & kemajuan | ✅ |
| Peristiwa — 17 cetus & tindak balas | ✅ |
| Kalendar — hari & minggu | ✅ |
| Auto — 5 saat/hari | ✅ |
| Pilihan raya — kira kerusi | ✅ |
| Laporan akhir — semua seksyen | ✅ |

---

## 9. CADANGAN SETERUSNYA

### Keutamaan tinggi
1. **Save/load** — supaya pemain tak hilang progres
2. **Ujian penuh** — main 260 minggu

### Keutamaan sederhana
3. **UI baharu** — menu sisi + header moden
4. **Kabinet menteri** — pemain pilih sendiri

### Keutamaan rendah
5. **Krisis lanjutan** — rantaian
6. **Ekonomi lanjutan** — sektor
7. **Audio** — bunyi butang

---

## 10. SEJARAH FASA

| Fasa | Tarikh | Komponen |
|---|---|---|
| Fasa 1 | Okt 2026 | Struktur, dashboard, AP Bebas |
| Fasa 2.1 | Okt 2026 | Integrasi kecenderungan |
| Fasa 2.3 | Okt 2026 | Model MP individu |
| Fasa 2.4 | Okt 2026 | Penjelasan undian |
| Fasa 2.5 | Okt 2026 | Krisis belanjawan |
| Fasa 3.1 | Okt 2026 | Kalendar mingguan |
| Fasa 3.2 | Okt 2026 | 17 peristiwa |
| Fasa 3.3 | Okt 2026 | Parti politik |
| Fasa 3.4 | Okt 2026 | Media & pendapat |
| Fasa 3.5 | Okt 2026 | Dasar & projek |
| Fasa 4.1 | Okt 2026 | Pilihan raya |
| Fasa 4.2 | Okt 2026 | Laporan akhir |
| Fasa 5.1 | Okt 2026 | Masa harian |
| Fasa 5.2 | Okt 2026 | Auto mode |
| **Fasa 4.3** | **Okt 2026** | **Dokumen Induk (ini)** |

---

**Akhir dokumen.**

