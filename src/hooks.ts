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

export function useActiveSection(ids: string[], offset = 120): string {
  const [active, setActive] = useState("");
  const key = ids.join(",");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(ids[ids.length - 1] ?? "");
        return;
      }
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [key, offset]);

  return active;
}

export function useCleanHashLinks(): void {
  useEffect(() => {
    const stripHash = () => {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    stripHash();

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      stripHash();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.round(Math.min(1, window.scrollY / max) * 1000) / 1000 : 0;
      setProgress(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}
