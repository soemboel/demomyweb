import { useCallback, useEffect, useRef, useState } from "react";
import { profile, projects, skillGroups, socials } from "../data";
import { useReducedMotion } from "../hooks";

type Line = { kind: "cmd" | "out" | "ok" | "warn" | "err" | "accent"; text: string };

const lineClass: Record<Line["kind"], string> = {
  cmd: "text-snow",
  out: "text-mist/85",
  ok: "text-term",
  warn: "text-solar",
  err: "text-blush",
  accent: "text-aqua",
};

const NEOFETCH = [
  "   ██████╗         raka@ugm-lab",
  "   ██╔══██╗        ───────────────────────",
  "   ██████╔╝        OS       : Ubuntu 24.04 LTS (WSL2)",
  "   ██╔══██╗        Host     : Legion 5 · Ryzen 7",
  "   ██║  ██║        Kernel   : 6.8.0-generic",
  "   ╚═╝  ╚═╝        Uptime   : 3 tahun kuliah, 0 DO",
  "                   Shell    : zsh 5.9 + oh-my-posh",
  "                   Editor   : Neovim (btw)",
  "                   GPU      : RTX 3060 + kopi hitam",
];

const HELP: string[] = [
  "Perintah yang tersedia:",
  "  whoami      siapa saya, singkat saja",
  "  skills      daftar kemampuan teknis",
  "  proyek      proyek yang pernah saya kerjakan",
  "  kontak      cara paling cepat menghubungi saya",
  "  sosial      tautan media sosial",
  "  neofetch    info sistem (wajib dicoba)",
  "  tanggal     jam berapa sekarang?",
  "  clear       bersihkan layar",
];

function runCommand(raw: string): Line[] {
  const [cmd, ...rest] = raw.trim().toLowerCase().split(/\s+/);
  switch (cmd) {
    case "help":
    case "bantuan":
      return [{ kind: "accent", text: HELP.join("\n") }];
    case "whoami":
      return [
        { kind: "out", text: `${profile.name}, ${profile.role}, ${profile.university}.` },
        { kind: "out", text: "Suka ngulik sistem, mecahin bug jam 2 pagi, dan ngopi." },
      ];
    case "skills":
    case "skill": {
      const lines: Line[] = [];
      skillGroups.forEach((g) => {
        lines.push({ kind: "accent", text: `── ${g.title} ──` });
        g.items.forEach((it) =>
          lines.push({ kind: "out", text: `  • ${it.name}` })
        );
      });
      return lines;
    }
    case "proyek":
    case "projects":
      return projects.map((p) => ({
        kind: "out",
        text: `  ${p.title.padEnd(14, " ")} ${p.year}  ·  ${p.tags.slice(0, 3).join(", ")}`,
      }));
    case "kontak":
    case "contact":
      return [
        { kind: "out", text: `email  : ${profile.email}` },
        { kind: "out", text: "github : github.com/rakadyt" },
        { kind: "out", text: "respon : biasanya < 24 jam (kecuali lagi UTS)" },
      ];
    case "sosial":
    case "social":
      return socials.map((s) => ({ kind: "out", text: `  ${s.name.padEnd(11, " ")} ${s.handle}` }));

    case "neofetch":
      return [{ kind: "accent", text: NEOFETCH.join("\n") }];
    case "tanggal":
    case "date":
      return [{ kind: "out", text: new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" }) }];
    case "sudo":
      return [
        { kind: "err", text: `${profile.handle} tidak ada di berkas sudoers. Insiden ini akan dilaporkan.` },
        { kind: "out", text: "// santai, bercanda. Ketik 'help' saja." },
      ];
    case "rm":
      if (rest.includes("-rf") && rest.includes("/"))
        return [{ kind: "err", text: "Nice try. Backup dulu, baru hapus. (ini sandbox, tenang)" }];
      return [{ kind: "err", text: `rm: argumen tidak lengkap. Dan jangan sembarangan.` }];
    case "vim":
    case "vi":
      return [{ kind: "warn", text: "Kamu masuk. Tapi belum tentu bisa keluar." }];
    case "exit":
    case "quit":
      return [{ kind: "out", text: "Sampai jumpa! (tombol close-nya di pojok kanan atas)" }];
    case "":
      return [];
    default:
      return [
        { kind: "err", text: `zsh: command not found: ${cmd}` },
        { kind: "out", text: "// coba ketik 'help' untuk lihat perintah" },
      ];
  }
}

type BootStep = { text: string; kind: Line["kind"]; wait: number };

const BOOT: BootStep[] = [
  { text: "$ ./boot-portfolio.sh", kind: "cmd", wait: 0 },
  { text: "> inisialisasi portfolio v2.5.1 ....... [ OK ]", kind: "ok", wait: 420 },
  { text: "> memuat 6 proyek terpilih ............ [ OK ]", kind: "ok", wait: 900 },
  { text: "> memeriksa status .................... [ TERBUKA UNTUK MAGANG ]", kind: "warn", wait: 1400 },
  { text: "> sistem siap. Ketik 'help' untuk mulai, atau klik chip di bawah.", kind: "out", wait: 1950 },
];

export default function Terminal() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [focused, setFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reduced) {
      setLines(BOOT.map((b) => ({ text: b.text, kind: b.kind })));
      setBooted(true);
      return;
    }
    const timers = BOOT.map((step) =>
      setTimeout(() => {
        setLines((prev) => [...prev, { text: step.text, kind: step.kind }]);
      }, step.wait + 350)
    );
    const done = setTimeout(() => setBooted(true), 2500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [reduced]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = useCallback(
    (raw: string) => {
      const value = raw.trim();
      const cmdLine: Line = { kind: "cmd", text: `$ ${value}` };
      if (value === "clear") {
        setLines([]);
        setHistory((h) => [...h, value]);
        setHistIdx(-1);
        return;
      }
      const output = runCommand(value);
      setLines((prev) => [...prev, cmdLine, ...output]);
      if (value) {
        setHistory((h) => [...h, value]);
      }
      setHistIdx(-1);
    },
    []
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      className="group relative flex flex-col border border-line bg-ink-900/90 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85)] transition-colors duration-300 hover:border-ink-600"
      onClick={() => inputRef.current?.focus()}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-blush/80" />
        <span className="h-3 w-3 rounded-full bg-solar/80" />
        <span className="h-3 w-3 rounded-full bg-term/80" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-fog">
          {profile.handle}@portfolio: ~/beranda
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">zsh</span>
      </div>

      {/* output */}
      <div ref={scrollRef} className="h-[340px] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:h-[360px] sm:text-[13px]">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${lineClass[line.kind]}`}>
            {line.text}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-2">
            <span className="shrink-0">
              <span className="text-term">{profile.handle}@portfolio</span>
              <span className="text-fog">:</span>
              <span className="text-aqua">~</span>
              <span className="text-fog">$</span>
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="min-w-0 flex-1 border-none bg-transparent font-mono text-[12.5px] text-snow outline-none caret-term sm:text-[13px]"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input (ketik perintah, misalnya help)"
              placeholder={!focused ? "" : ""}
            />
            <span className={`cursor-blink font-mono text-term ${focused ? "hidden" : ""}`}>▍</span>
          </div>
        )}
      </div>

      {/* quick chips */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-ink-850/70 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">coba:</span>
        {["whoami", "skills", "neofetch", "proyek", "help"].map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation();
              submit(c);
              inputRef.current?.focus();
            }}
            className="border border-line bg-ink-800 px-2.5 py-1 font-mono text-[11px] text-term transition-all duration-200 hover:-translate-y-0.5 hover:border-term/50 hover:bg-term/10"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
