import { useEffect, useState } from "react";
// pusinggggg
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#%&@$";

export function useScramble(target: string, start: boolean, delay = 0): string {
  const reduced = useReducedMotion();
  const [out, setOut] = useState<string>(reduced ? target : "");

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(target);
      return;
    }
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame / (target.length * 2.1)) * target.length);
        if (settled >= target.length) {
          setOut(target);
          if (interval) clearInterval(interval);
          return;
        }
        let s = "";
        for (let i = 0; i < target.length; i++) {
          const ch = target[i];
          if (ch === " ") {
            s += " ";
            continue;
          }
          s += i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
      }, 34);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [target, start, delay, reduced]);

  return out;
}

export function useClock(locale = "id-ID", timeZone = "Asia/Jakarta"): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    }).format(now);
  } catch {
    return now.toLocaleTimeString(locale);
  }
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}
