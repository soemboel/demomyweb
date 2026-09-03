export const profile = {
  name: "Habiby Eko Putra Nugraha",
  firstName: "HABIBY",
  lastName: "EKO",
  handle: "soemboel",
  role: "Siswa SMK Negeri 5 Batam",
  university: "SMK Negeri 5 Batam",
  nim: "TKJ · Angkatan 2024/2025",
  major: "Teknik Komputer dan Jaringan",
  semester: "Semester 6 · Angkatan 2024/2025",
  location: "Batam, Indonesia",
  email: "hammudqwe@gmail.com",
  gpa: "",
  status: "[idle] bersantai",
  focus: ["Desktop App Development", "Web Development", "Ngoprek Server & Otomasi"],
  avatar: "/profile.jpg",
};

export const stats = [
  { value: "4", suffix: "", label: "Proyek selesai & deploy" },
  { value: "1", suffix: "x", label: "Juara LKS Provinsi" },
  { value: "6", suffix: " bln", label: "Pengalaman magang" },
];

export const marqueeItems = [
  "C++",
  "C#",
  "Python",
  "TypeScript",
  "React",
  ".NET",
  "Linux",
  "Docker",
  "MySQL",
  "Git",
  "Node.js",
  "Kotlin",
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
      { name: "C++ / C#", level: 80 },
      { name: "Python", level: 78 },
      { name: "TypeScript / JavaScript", level: 85 },
      { name: "PHP", level: 70 },
      { name: "SQL", level: 75 },
      { name: "XML", level: 65 },
      { name: "Kotlin", level: 60 },
    ],
  },
  {
    title: "Web & Framework",
    accent: "aqua",
    note: "// tampilannya juga harus niat",
    items: [
      { name: "React", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Node.js", level: 75 },
      { name: ".NET", level: 72 },
    ],
  },
  {
    title: "Sistem & Tools",
    accent: "solar",
    note: "// karena komputer bukan cuma browser",
    items: [
      { name: "Linux (Debian/Ubuntu)", level: 85 },
      { name: "Git & GitHub", level: 88 },
      { name: "Docker", level: 65 },
      { name: "Jaringan Komputer", level: 80 },
      { name: "MySQL", level: 75 },
    ],
  },
];

export const learning = ["VB.NET", "Machine Learning", "Backend Web / Aplikasi"];

export const toolbox = ["Laptop", "PC Bekas", "Neovim", "WSL2", "Postman", "Git"];

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
    id: "macroapp",
    title: "MacroApp",
    tagline: "desktop-tools",
    desc: "Aplikasi desktop macro untuk otomasi tugas berulang. Dibangun saat magang di PT Trisulla Softwareindo Solusi sebagai tool produktivitas internal.",
    tags: ["C#", ".NET", "WinForms"],
    year: "2026",
    status: "deployed",
    accent: "term",
    repo: "https://github.com/soemboel",
    featured: true,
    image: "/macroapp.png",
  },
  {
    id: "steganography",
    title: "Web Steganography",
    tagline: "keamanan-web",
    desc: "Aplikasi web untuk menyembunyikan pesan rahasia di dalam gambar menggunakan teknik steganografi. Dibangun saat magang sebagai proyek riset keamanan.",
    tags: ["JavaScript"],
    year: "2026",
    status: "aktif",
    accent: "aqua",
    repo: "https://github.com/soemboel",
  },
  {
    id: "runner-app",
    title: "Runner App (Backend)",
    tagline: "mobile-backend",
    desc: "Backend aplikasi Android runner untuk LKS Provinsi. Dikerjakan solo dalam 8 jam menggunakan .NET/C#, menangani seluruh logika server dan API.",
    tags: ["C#", ".NET", "REST API"],
    year: "2026",
    status: "lomba",
    accent: "solar",
    repo: "https://github.com/soemboel",
  },
  {
    id: "js-security",
    title: "JS Security Script",
    tagline: "keamanan-web",
    desc: "Kumpulan script JavaScript untuk pengujian dan penguatan keamanan web. Mencakup proteksi XSS, CSRF, dan validasi input sisi klien.",
    tags: ["JavaScript", "Security", "Web"],
    year: "2026",
    status: "open-source",
    accent: "term",
    repo: "https://github.com/soemboel",
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
    hash: "f3a9c12",
    type: "feat",
    message: "magang: Programmer @ PT Trisulla Softwareindo Solusi",
    detail: "Bikin MacroApp, script JS untuk keamanan web, web Steganography.",
    date: "Jul 2026 - Des 2026",
  },
  {
    hash: "b7e41d0",
    type: "feat",
    message: "juara 3 LKS Provinsi kategori Mobile Application",
    detail: "8 jam, 1 tim 1 orang, 1 aplikasi runner (Android). Cuman ngerjain backend memakai .NET/C#.",
    date: "Jun 2026",
  },
  {
    hash: "1f0a4e7",
    type: "fix",
    message: "bertahan hidup dari tugas yang berdatangan",
    detail: "Pointer, fork(), dan segfault jam 2 pagi. Karakter terbangun di sini.",
    date: "Mar 2025",
  },
  {
    hash: "0b7d2c5",
    type: "init",
    message: "commit pertama: mulai sekolah TKJ SMKN 5 Batam",
    detail: "Hello, world. Belum tahu apa itu git, apalagi git blame.",
    date: "Jul 2024",
  },
];

export type Certification = {
  year: string;
  title: string;
  issuer: string;
  kind: "sertifikasi" | "penghargaan";
};

export const certifications: Certification[] = [
  { year: "2026", title: "Juara 3: LKS Provinsi — Mobile Application", issuer: "Dinas Pendidikan Provinsi", kind: "penghargaan" },
  { year: "2026", title: "Magang Programmer", issuer: "PT Trisulla Softwareindo Solusi", kind: "sertifikasi" },
];

export const socials = [
  { name: "GitHub", handle: "github.com/soemboel", url: "https://github.com/soemboel" },
  { name: "LinkedIn", handle: "in/habiby-eko-putra-nugraha", url: "https://www.linkedin.com/in/habiby-eko-putra-nugraha-4745a73b3/" },
  { name: "Instagram", handle: "@habiby_eko", url: "https://www.instagram.com/habiby_eko/" },
  { name: "Email", handle: "hammudqwe@gmail.com", url: "mailto:hammudqwe@gmail.com" },
];

export const navLinks = [
  { id: "tentang", label: "tentang" },
  { id: "skill", label: "skill" },
  { id: "proyek", label: "proyek" },
  { id: "riwayat", label: "riwayat" },
  { id: "kontak", label: "kontak" },
];
