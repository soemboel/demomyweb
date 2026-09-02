export const profile = {
  name: "Raka Adyatma",
  firstName: "RAKA",
  lastName: "ADYATMA",
  handle: "rakadyt",
  role: "Mahasiswa Teknik Informatika",
  university: "Universitas Gadjah Mada",
  nim: "22/498571/TK/54982",
  major: "Teknik Informatika",
  semester: "Semester 7 · Angkatan 2022",
  location: "Batam, Indonesia",
  email: "raka.adyatma@mail.ugm.ac.id",
  gpa: "3.78",
  status: "Terbuka untuk magang & kolaborasi",
  focus: ["Backend & REST API", "Web Development", "Linux & Otomasi"],
};

export const stats = [
  { value: "12", suffix: "+", label: "Proyek selesai & deploy" },
  { value: "6", suffix: "", label: "Sertifikasi & penghargaan" },
  { value: "3", suffix: "x", label: "Juara hackathon & lomba" },
];

export const marqueeItems = [
  "C++",
  "Python",
  "TypeScript",
  "React",
  "Laravel",
  "Linux",
  "Bash",
  "Docker",
  "MySQL",
  "Git",
  "Node.js",
  "Neovim",
];

export type SkillGroup = {
  title: string;
  accent: "term" | "aqua" | "solar";
  note: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Bahasa & Logika",
    accent: "term",
    note: "// dari hello world sampai segfault",
    items: [
      { name: "C / C++", level: 85 },
      { name: "Python", level: 80 },
      { name: "TypeScript / JavaScript", level: 88 },
      { name: "Java", level: 74 },
      { name: "PHP", level: 70 },
      { name: "SQL", level: 82 },
    ],
  },
  {
    title: "Web & Framework",
    accent: "aqua",
    note: "// tampilannya juga harus niat",
    items: [
      { name: "React & Next.js", level: 84 },
      { name: "Laravel", level: 78 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Node.js & Express", level: 72 },
      { name: "REST API Design", level: 80 },
      { name: "Flutter (basic)", level: 55 },
    ],
  },
  {
    title: "Sistem & Tools",
    accent: "solar",
    note: "// karena komputer bukan cuma browser",
    items: [
      { name: "Linux & Bash Scripting", level: 88 },
      { name: "Git & GitHub", level: 92 },
      { name: "Docker", level: 65 },
      { name: "Jaringan Komputer", level: 76 },
      { name: "MySQL / PostgreSQL", level: 80 },
      { name: "Nginx & VPS Setup", level: 62 },
    ],
  },
];

export const learning = ["Rust", "Kubernetes", "Machine Learning", "Keamanan Web"];

export const toolbox = ["Neovim", "tmux", "WSL2", "Postman", "Vercel", "Figma", "Raspberry Pi", "Wireshark"];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  year: string;
  status: string;
  accent: "term" | "aqua" | "solar";
  repo: string;
  demo?: string;
  featured?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "koskita",
    title: "KosKita",
    tagline: "platform-web",
    desc: "Platform pencari kos & kontrakan di sekitar kampus dengan peta interaktif, filter harga-fasilitas, dan sistem review penghuni. Dibangun end-to-end: database, API, sampai deploy VPS.",
    tags: ["Laravel", "MySQL", "Leaflet.js", "REST API"],
    year: "2025",
    status: "deployed",
    accent: "term",
    repo: "https://github.com/rakadyt/koskita",
    demo: "https://github.com/rakadyt/koskita#live-demo",
    featured: true,
    image: "https://image.qwenlm.ai/generated-images/effc6354-9994-4571-b925-8cc5e20439b4/_result.png",
  },
  {
    id: "sortviz",
    title: "SortViz",
    tagline: "edukasi",
    desc: "Visualisasi 12 algoritma sorting secara real-time dengan kontrol kecepatan dan perbandingan kompleksitas. Dipakai 200+ mahasiswa di kelas Struktur Data.",
    tags: ["React", "TypeScript", "Canvas API"],
    year: "2024",
    status: "open-source",
    accent: "aqua",
    repo: "https://github.com/rakadyt/sortviz",
    demo: "https://github.com/rakadyt/sortviz",
  },
  {
    id: "batik-cnn",
    title: "batik-cnn",
    tagline: "machine-learning",
    desc: "Klasifikasi 8 motif batik Nusantara memakai CNN arsitektur custom. Akurasi tinggi pada dataset 2.400 citra (bahan skripsi yang sedang berjalan).",
    tags: ["Python", "TensorFlow", "OpenCV"],
    year: "2024",
    status: "riset",
    accent: "solar",
    repo: "https://github.com/rakadyt/batik-cnn",
  },
  {
    id: "tasky",
    title: "tasky-cli",
    tagline: "developer-tools",
    desc: "Task manager berbasis terminal dengan sync ke file Markdown, priority queue, dan integrasi git hook. Terpasang di 300+ mesin via npm.",
    tags: ["Node.js", "TypeScript", "npm"],
    year: "2023",
    status: "npm-package",
    accent: "term",
    repo: "https://github.com/rakadyt/tasky-cli",
  },
  {
    id: "sipinter",
    title: "SiPinter Bot",
    tagline: "otomasi",
    desc: "Bot Discord pengingat jadwal kuliah, deadline tugas, dan ringkasan materi. Aktif di 14 server kelas dengan 1.800+ anggota.",
    tags: ["Discord.js", "Redis", "Cron"],
    year: "2023",
    status: "aktif",
    accent: "aqua",
    repo: "https://github.com/rakadyt/sipinter-bot",
  },
  {
    id: "sikad-mini",
    title: "SIKAD-mini",
    tagline: "sistem-informasi",
    desc: "Sistem informasi akademik mini berbasis MVC: KRS online, transkrip nilai, dan dashboard dosen. Tugas besar yang akhirnya dipakai beneran oleh prodi.",
    tags: ["PHP", "CodeIgniter", "MariaDB"],
    year: "2023",
    status: "tugas-besar",
    accent: "solar",
    repo: "https://github.com/rakadyt/sikad-mini",
  },
];

export type LogEntry = {
  hash: string;
  type: "init" | "feat" | "chore" | "fix";
  message: string;
  detail: string;
  date: string;
};

export const gitLog: LogEntry[] = [
  {
    hash: "e7f2a91",
    type: "feat",
    message: "magang: Junior Backend Developer @ PT Solusi Data Nusantara",
    detail: "Bikin microservice Go + optimasi query PostgreSQL, latency turun signifikan.",
    date: "Jun 2025 - kini",
  },
  {
    hash: "9c41bd6",
    type: "feat",
    message: "juara 2 Hackathon Nasional kategori EdTech",
    detail: "48 jam, 1 tim 3 orang, 1 aplikasi belajar bareng realtime. Nyaris juara 1.",
    date: "Okt 2024",
  },
  {
    hash: "4ad83f0",
    type: "chore",
    message: "asisten praktikum Struktur Data & Algoritma",
    detail: "Ngajar 120 mahasiswa, ngoreksi 600+ laporan, sabar level max.",
    date: "Feb - Jun 2024",
  },
  {
    hash: "b5e60c2",
    type: "feat",
    message: "bergabung dengan Google Developer Student Clubs (GDSC)",
    detail: "Divisi web & cloud. Pertama kalinya kontribusi ke proyek open source.",
    date: "Sep 2023",
  },
  {
    hash: "1f0a4e7",
    type: "fix",
    message: "bertahan hidup dari praktikum Sistem Operasi",
    detail: "Pointer, fork(), dan segfault jam 2 pagi. Karakter terbangun di sini.",
    date: "Mar 2023",
  },
  {
    hash: "0b7d2c5",
    type: "init",
    message: "commit pertama: mulai kuliah Teknik Informatika UGM",
    detail: "Hello, world. Belum tahu apa itu git, apalagi git blame.",
    date: "Agu 2022",
  },
];

export type Certification = {
  year: string;
  title: string;
  issuer: string;
  kind: "sertifikasi" | "penghargaan";
};

export const certifications: Certification[] = [
  { year: "2025", title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", kind: "sertifikasi" },
  { year: "2024", title: "Juara 2: Hackathon Nasional EdTech", issuer: "Kemdikbudristek × TechInAsia", kind: "penghargaan" },
  { year: "2024", title: "Front-End Web Developer Expert", issuer: "Dicoding Indonesia", kind: "sertifikasi" },
  { year: "2023", title: "Juara 1: Lomba Web Design Provinsi DIY", issuer: "Dinas Kominfo DIY", kind: "penghargaan" },
  { year: "2023", title: "Google IT Support Professional", issuer: "Google × Coursera", kind: "sertifikasi" },
  { year: "2022", title: "Beasiswa Unggulan: Kategori Prestasi", issuer: "Kemendikbudristek", kind: "penghargaan" },
];

export const socials = [
  { name: "GitHub", handle: "github.com/rakadyt", url: "https://github.com" },
  { name: "LinkedIn", handle: "in/raka-adyatma", url: "https://linkedin.com" },
  { name: "Instagram", handle: "@rakadyt", url: "https://instagram.com" },
  { name: "Email", handle: "raka.adyatma@mail.ugm.ac.id", url: "mailto:raka.adyatma@mail.ugm.ac.id" },
];

export const navLinks = [
  { id: "tentang", label: "tentang" },
  { id: "skill", label: "skill" },
  { id: "proyek", label: "proyek" },
  { id: "riwayat", label: "riwayat" },
  { id: "kontak", label: "kontak" },
];
