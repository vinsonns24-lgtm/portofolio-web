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
