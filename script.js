// Menulis tahun berjalan di footer, supaya tidak perlu diganti manual setiap tahun.
document.getElementById("tahun").textContent = new Date().getFullYear();

// Tombol unduh (CV dan portofolio PDF) hanya ditampilkan kalau filenya memang ada.
// Dengan begitu tidak ada tombol yang mengarah ke halaman error.
document.querySelectorAll("[data-cek-file]").forEach(function (tombol) {
  fetch(tombol.getAttribute("href"), { method: "HEAD" })
    .then(function (jawaban) {
      if (jawaban.ok) {
        tombol.hidden = false;
      }
    })
    .catch(function () {
      // Kalau halaman dibuka langsung dari file (bukan lewat server), pengecekan ini gagal
      // dan tombolnya tetap disembunyikan. Di Vercel pengecekannya berjalan normal.
    });
});

// ------------------------------------------------------------------ menu samping (laci)
// Laci dibuat di sini, bukan ditulis di setiap halaman, supaya isinya cukup diubah di satu tempat.
// Proyek baru cukup ditambahkan ke daftar PROYEK.
var PROYEK = [
  ["Tokopedia Market Dashboard", "tokopedia.html"],
  ["bfull — Pesan Makanan Kantin", "bfull.html"],
  ["Credit Score Classification", "credit-score.html"],
  ["Prediksi Harga Saham dengan LSTM", "prediksi-saham.html"],
  ["Prediksi Klaim Asuransi Kesehatan", "prediksi-klaim.html"]
];

(function buatLaci() {
  // Halaman detail ada di folder proyek/, jadi alamat ke halaman utama perlu awalan "../".
  var dalamProyek = /\/proyek\//.test(window.location.pathname);
  var akar = dalamProyek ? "../" : "";
  var halamanIni = window.location.pathname.split("/").pop() || "index.html";

  function tautan(href, teks, sekarang) {
    return '<a href="' + href + '"' + (sekarang ? ' aria-current="page"' : "") + ">" + teks + "</a>";
  }

  var daftarProyek = PROYEK.map(function (p) {
    return "<li>" + tautan(akar + "proyek/" + p[1], p[0], dalamProyek && halamanIni === p[1]) + "</li>";
  }).join("");

  var laci = document.createElement("nav");
  laci.id = "laci";
  laci.className = "laci";
  laci.setAttribute("aria-label", "Menu samping");
  laci.innerHTML =
    '<div class="laci-kepala">' +
      '<span class="laci-nama">Vinson Nicholas Sorensen</span>' +
      '<button type="button" class="laci-tutup" aria-label="Tutup menu">×</button>' +
    "</div>" +
    '<p class="laci-judul">Navigasi</p>' +
    "<ul>" +
      // Di halaman utama, Beranda cukup menggulir ke atas, tidak memuat ulang halaman.
      "<li>" + tautan(dalamProyek ? akar + "index.html" : "#konten", "Beranda", !dalamProyek) + "</li>" +
      "<li>" + tautan(akar + "index.html#about", "About") + "</li>" +
      "<li>" + tautan(akar + "index.html#proyek", "Proyek") + "</li>" +
      "<li>" + tautan(akar + "index.html#kontak", "Kontak") + "</li>" +
    "</ul>" +
    '<p class="laci-judul">Proyek</p>' +
    "<ul>" + daftarProyek + "</ul>" +
    '<p class="laci-judul">Temukan saya</p>' +
    "<ul>" +
      '<li><a href="https://github.com/vinsonns24-lgtm" target="_blank" rel="noopener">GitHub ↗</a></li>' +
      '<li><a href="https://www.linkedin.com/in/vinson-nicholas-sorensen-231737326" target="_blank" rel="noopener">LinkedIn ↗</a></li>' +
      '<li><a href="mailto:vinson.sorensen@binus.ac.id">Email</a></li>' +
    "</ul>";

  var latar = document.createElement("div");
  latar.className = "laci-latar";

  var tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "tombol-menu";
  tombol.setAttribute("aria-label", "Buka menu");
  tombol.setAttribute("aria-controls", "laci");
  tombol.setAttribute("aria-expanded", "false");
  tombol.innerHTML = "<span></span><span></span><span></span>";

  var header = document.querySelector(".header");
  header.insertBefore(tombol, header.firstChild);
  document.body.appendChild(latar);
  document.body.appendChild(laci);

  function buka() {
    document.body.classList.add("laci-buka");
    tombol.setAttribute("aria-expanded", "true");
    laci.querySelector(".laci-tutup").focus();
  }
  function tutup(kembalikanFokus) {
    document.body.classList.remove("laci-buka");
    tombol.setAttribute("aria-expanded", "false");
    if (kembalikanFokus) tombol.focus();
  }

  tombol.addEventListener("click", buka);
  laci.querySelector(".laci-tutup").addEventListener("click", function () { tutup(true); });
  latar.addEventListener("click", function () { tutup(true); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("laci-buka")) tutup(true);
  });
  // Laci ditutup saat salah satu tautannya dipilih, termasuk tautan ke bagian di halaman yang sama.
  laci.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { tutup(false); });
  });
})();

// ------------------------------------------------------------------ interaksi
// Semua animasi dilewati kalau pengunjung memilih "kurangi gerakan" di perangkatnya.
var kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Efek riak dari titik yang ditekan, pada kartu proyek, tombol, dan kartu GitHub/LinkedIn.
function riak(elemen, event) {
  if (kurangiGerak) return;
  var kotak = elemen.getBoundingClientRect();
  var ukuran = Math.max(kotak.width, kotak.height) * 2;
  var titik = document.createElement("span");
  titik.className = "riak";
  titik.style.width = titik.style.height = ukuran + "px";
  titik.style.left = event.clientX - kotak.left - ukuran / 2 + "px";
  titik.style.top = event.clientY - kotak.top - ukuran / 2 + "px";
  elemen.appendChild(titik);
  titik.addEventListener("animationend", function () { titik.remove(); });
}

document.querySelectorAll(".kartu, .tombol, .sosial, .kartu-aksi a").forEach(function (elemen) {
  elemen.addEventListener("pointerdown", function (event) {
    // Kalau yang ditekan tombol di dalam kartu, riak cukup muncul di tombolnya, bukan di kartu juga.
    if (elemen.classList.contains("kartu") && event.target.closest("a")) return;
    riak(elemen, event);
  });
});

// Seluruh kartu proyek bisa diklik dan membuka halaman penjelasannya.
// Tautan di dalam kartu (demo, GitHub) tetap berjalan seperti biasa.
document.querySelectorAll(".kartu").forEach(function (kartu) {
  var tujuan = kartu.querySelector(".aksi-detail");
  if (!tujuan) return;
  kartu.classList.add("kartu-klik");
  kartu.addEventListener("click", function (event) {
    if (event.target.closest("a")) return;
    if (window.getSelection().toString()) return; // pengunjung sedang memilih teks
    pindahHalaman(tujuan.href);
  });
});

// Transisi pindah halaman: halaman memudar keluar sebelum halaman berikutnya dibuka.
// Halaman baru muncul dengan animasi masuk yang diatur di styles.css.
function pindahHalaman(url) {
  if (kurangiGerak) { window.location.href = url; return; }
  document.body.classList.add("keluar");
  setTimeout(function () { window.location.href = url; }, 220);
}

document.querySelectorAll("a[href]").forEach(function (tautan) {
  tautan.addEventListener("click", function (event) {
    var url = new URL(tautan.href, window.location.href);
    var halamanSama = url.pathname === window.location.pathname;
    if (tautan.target === "_blank" || tautan.hasAttribute("download") || url.origin !== window.location.origin ||
        halamanSama || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    pindahHalaman(url.href);
  });
});

// Saat kembali dengan tombol Back, browser bisa menampilkan halaman dari cache dalam keadaan pudar.
window.addEventListener("pageshow", function () { document.body.classList.remove("keluar"); });

// Kartu dan bagian halaman muncul perlahan saat digulir ke layar.
if (!kurangiGerak && "IntersectionObserver" in window) {
  var target = document.querySelectorAll(".kartu, .profil-blok, .tentang, .keputusan, .gambar, .tabel-bungkus, .kontak-daftar li");
  var pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        el.classList.add("tampil");
        pengamat.unobserve(el);
        // Jeda hanya untuk animasi muncul. Setelah itu dihapus supaya efek sorot tidak ikut terlambat.
        setTimeout(function () { el.style.transitionDelay = ""; }, 800);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  target.forEach(function (el, i) {
    el.classList.add("muncul");
    // Elemen yang bersebelahan muncul bergantian sedikit, bukan serentak.
    el.style.transitionDelay = (i % 3) * 70 + "ms";
    pengamat.observe(el);
  });
}
