# Portfolio Template — Mahasiswa Informatika

Website portfolio bertema terminal/developer. Dibangun dengan **React + TypeScript + Vite + Tailwind CSS v4**.

## Menjalankan di Komputer Kamu

### 1. Prasyarat

Pastikan **Node.js v18+** sudah terpasang (v20 LTS direkomendasikan). Cek dengan:

```bash
node -v
npm -v
```

Kalau belum ada, unduh dari https://nodejs.org (pilih LTS), lalu install seperti biasa.

### 2. Buka terminal di folder proyek

```bash
cd path/ke/folder-proyek
```

### 3. Install dependencies

```bash
npm install
```

### 4. Jalankan development server

```bash
npm run dev
```

Buka browser di **http://localhost:5173** (Vite biasanya juga menampilkan URL-nya di terminal).
Perubahan kode langsung terlihat tanpa refresh (hot reload).

### 5. Build untuk production (opsional)

```bash
npm run build     # menghasilkan folder dist/
npm run preview   # tes hasil build di http://localhost:4173
```

Folder `dist/` bisa di-deploy ke **Vercel**, **Netlify**, atau **GitHub Pages**.

## Mengganti Isi Portfolio

Semua konten (nama, NIM, skill, proyek, riwayat, sertifikat, sosial media) terpusat di:

```
src/data.ts
```

Edit file itu saja — seluruh halaman ikut berubah.

Untuk mengganti foto avatar, timpa URL gambar di `src/data.ts` dan `src/components/About.tsx`
(dengan path file lokal di folder `public/`, misalnya `public/images/avatar.png`).

## Perintah lain

| Perintah          | Fungsi                              |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Jalankan server pengembangan        |
| `npm run build`   | Build production ke folder `dist/`  |
| `npm run preview` | Preview hasil build                 |
| `npm run typecheck` | Periksa error TypeScript          |
