# Portofolio Vinson Nicholas Sorensen

Website portofolio berisi kumpulan proyek data. Dibuat dengan HTML, CSS, dan sedikit JavaScript, tanpa framework, supaya ringan dan mudah diperbarui.

## Isi folder

```
index.html     seluruh isi halaman
styles.css     warna, tata letak, dan tampilan kartu
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

1. Foto profil. Simpan fotomu sebagai `assets/foto-profil.jpg`, lalu di `index.html` ganti `assets/foto-profil.svg` menjadi `assets/foto-profil.jpg`. Ukuran yang cocok sekitar 720x900 piksel (potret).
2. Versi PDF. Simpan sebagai `assets/portofolio-vinson-nicholas-sorensen.pdf`. Tombolnya sudah ada di `index.html` tetapi sementara disembunyikan, supaya tidak menghasilkan halaman error. Setelah file PDF-nya ada, hapus baris `<!--` dan `-->` yang mengapit tombol itu.
3. Link GitHub dan LinkedIn di bagian Kontak. Di `index.html`, cari `href="#"` lalu ganti dengan alamat profilmu.

## Menambah proyek baru

Di `index.html`, bagian `<section id="proyek">`, salin satu blok `<article class="kartu">` lalu ganti isinya:

- `href` pada `tautan-kartu` diarahkan ke repo GitHub proyek itu. Seluruh kartu otomatis bisa diklik.
- `<ul class="poin">` diisi dua sampai tiga temuan utama.
- `<ul class="tag">` diisi teknologi yang dipakai.
- `kartu-tautan` diisi link demo, kalau ada.

Kartu bertanda `kartu-kosong` adalah tempat kosong untuk proyek berikutnya. Hapus satu setiap kali ada proyek baru.

## Deploy

Setelah folder ini menjadi repo GitHub, hubungkan ke Vercel. Setiap push ke branch `main` akan otomatis diterbitkan, dan alamat websitenya tetap sama.
