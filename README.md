# Portofolio Vinson Nicholas Sorensen

Website portofolio berisi kumpulan proyek data. Dibuat dengan HTML, CSS, dan sedikit JavaScript, tanpa framework, supaya ringan dan mudah diperbarui.

## Isi folder

```
index.html     halaman utama: profil, kartu proyek, tentang, kontak
proyek/        satu halaman detail untuk setiap proyek
styles.css     warna, tata letak, dan tampilan kartu (dipakai semua halaman)
script.js      menulis tahun berjalan di footer
assets/        foto profil dan file PDF portofolio
```

## Cara melihat di laptop

Buka `index.html` dengan klik dua kali, atau jalankan server kecil dari folder ini:

```
python -m http.server 8000
```

Lalu buka http://localhost:8000.

## Yang masih perlu diisi

1. Foto profil. Simpan fotomu sebagai `assets/foto-profil.jpg`, dan foto langsung muncul tanpa perlu mengubah kode. Selama filenya belum ada, gambar placeholder yang tampil. Foto ditampilkan kecil dan bulat, jadi foto potret dengan wajah di sepertiga atas sudah pas.
2. Dua file PDF, yaitu CV dan portofolio:

   | Tombol | Nama file yang diharapkan |
   |---|---|
   | Unduh CV | `assets/cv-vinson-nicholas-sorensen.pdf` |
   | Unduh portofolio PDF | `assets/portofolio-vinson-nicholas-sorensen.pdf` |

   Tombolnya sudah ada di `index.html` dan muncul otomatis begitu filenya ada, jadi tidak perlu mengubah kode. Selama filenya belum ada, tombolnya disembunyikan supaya tidak mengarah ke halaman error. Pengecekan ini hanya berjalan kalau halaman dibuka lewat server (`python -m http.server 8000` atau di Vercel), bukan saat file `index.html` diklik dua kali.
3. Link GitHub dan LinkedIn di bagian Kontak. Di `index.html`, cari `href="#"` lalu ganti dengan alamat profilmu.

## Menambah proyek baru

Setiap proyek punya dua bagian: kartu ringkas di halaman utama, dan halaman detail di folder `proyek/`.

1. **Halaman detail.** Salin `proyek/credit-score.html` menjadi misalnya `proyek/nama-proyek.html`, lalu ganti isinya. Urutan bagiannya: masalah, data, alur, keputusan penting, hasil, keterbatasan, langkah berikutnya, lalu pelajaran dari proyek ini. Link GitHub dan demo ditaruh di tombol bagian atas.
2. **Kartu.** Di `index.html`, bagian `<section id="proyek">`, salin satu blok `<article class="kartu">` lalu ganti isinya:
   - Judul (`<h3>`) diarahkan ke halaman detail tadi.
   - Satu kalimat ringkasan, sebaiknya memuat satu angka atau temuan utama.
   - `<ul class="tag">` diisi paling banyak tiga teknologi utama.
   - `<ul class="kartu-aksi">` berisi tiga pilihan: demo ("Buka dashboard ↗" atau "Buka aplikasi ↗"), "GitHub ↗", lalu "Penjelasan lengkap →" dengan kelas `aksi-detail`. Kalau proyeknya belum punya demo, hapus saja pilihan pertama.

Gambar untuk halaman detail disimpan di `assets/proyek/`.

## Deploy

Setelah folder ini menjadi repo GitHub, hubungkan ke Vercel. Setiap push ke branch `main` akan otomatis diterbitkan, dan alamat websitenya tetap sama.
