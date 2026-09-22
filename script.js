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
