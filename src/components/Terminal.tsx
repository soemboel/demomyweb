import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Content } from "../locales/types";
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

function runCommand(raw: string, t: Content): Line[] {
  const { profile, projects, skillGroups, socials, terminal } = t;
  const [cmd, ...rest] = raw.trim().toLowerCase().split(/\s+/);
  switch (cmd) {
    case "help":
    case "bantuan":
      return [{ kind: "accent", text: terminal.help.join("\n") }];
    case "whoami":
      return [
        { kind: "out", text: `${profile.name}, ${profile.role}, ${profile.university}.` },
        { kind: "out", text: terminal.whoamiLine2 },
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
        { kind: "out", text: `${terminal.contact.emailLabel}${profile.email}` },
        { kind: "out", text: terminal.contact.githubLabel },
        { kind: "out", text: terminal.contact.responseLabel },
      ];
    case "sosial":
    case "social":
      return socials.map((s) => ({ kind: "out", text: `  ${s.name.padEnd(11, " ")} ${s.handle}` }));

    case "neofetch":
      return [{ kind: "accent", text: terminal.neofetch.join("\n") }];
    case "tanggal":
    case "date":
      return [{ kind: "out", text: new Date().toLocaleString(terminal.dateLocale, { dateStyle: "full", timeStyle: "medium" }) }];
    case "sudo":
      return [
        { kind: "err", text: terminal.sudoTemplate.replace("{handle}", profile.handle) },
        { kind: "out", text: terminal.sudoNote },
      ];
    case "rm":
      if (rest.includes("-rf") && rest.includes("/"))
        return [{ kind: "err", text: terminal.rmSandbox }];
      return [{ kind: "err", text: terminal.rmIncomplete }];
    case "vim":
    case "vi":
      return [{ kind: "warn", text: terminal.vimMessage }];
    case "exit":
    case "quit":
      return [{ kind: "out", text: terminal.exitMessage }];
    case "":
      return [];
    default:
      return [
        { kind: "err", text: terminal.notFoundTemplate.replace("{cmd}", cmd) },
        { kind: "out", text: terminal.tryHelpNote },
      ];
  }
}

type BootStep = { text: string; kind: Line["kind"]; wait: number };

const BOOT_WAITS = [0, 420, 900, 1400, 1950];

export default function Terminal() {
  const { t } = useLanguage();
  const { profile, terminal } = t;
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [focused, setFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const BOOT: BootStep[] = terminal.boot.map((step, i) => ({
    text: step.text,
    kind: step.kind,
    wait: BOOT_WAITS[i] ?? BOOT_WAITS[BOOT_WAITS.length - 1],
  }));

  useEffect(() => {
    setLines([]);
    setBooted(false);

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
  }, [reduced, terminal]);

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
      const output = runCommand(value, t);
      setLines((prev) => [...prev, cmdLine, ...output]);
      if (value) {
        setHistory((h) => [...h, value]);
      }
      setHistIdx(-1);
    },
    [t]
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
      <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-blush/80" />
        <span className="h-3 w-3 rounded-full bg-solar/80" />
        <span className="h-3 w-3 rounded-full bg-term/80" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-fog">
          {profile.handle}@portfolio: {terminal.pathHome}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">{terminal.shellLabel}</span>
      </div>

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
              aria-label={terminal.inputAriaLabel}
              placeholder={!focused ? "" : ""}
            />
            <span className={`cursor-blink font-mono text-term ${focused ? "hidden" : ""}`}>▍</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-ink-850/70 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">{terminal.chipsLabel}</span>
        {terminal.chips.map((c) => (
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
