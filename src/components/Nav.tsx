import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useActiveSection, useScrollProgress } from "../hooks";
import { useLanguage } from "../i18n/LanguageContext";

function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("light");
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsLight(e.matches);
        document.documentElement.classList.toggle("light", e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`border border-term/40 bg-term/5 px-4 py-1.5 font-mono text-[12px] text-term transition-all duration-200 hover:-translate-y-0.5 hover:bg-term/15 hover:shadow-[0_6px_24px_-8px_rgba(92,232,164,0.5)] ${className}`}
    >
      [ {isLight ? "DARK" : "LIGHT"} ]
    </button>
  );
}

function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const nextLabel = language === "id" ? "EN" : "ID";
  const ariaLabel = language === "id" ? "Switch language to English" : "Ganti bahasa ke Indonesia";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={ariaLabel}
      className={`border border-term/40 bg-term/5 px-4 py-1.5 font-mono text-[12px] text-term transition-all duration-200 hover:-translate-y-0.5 hover:bg-term/15 hover:shadow-[0_6px_24px_-8px_rgba(92,232,164,0.5)] ${className}`}
    >
      [ {nextLabel} ]
    </button>
  );
}

export default function Nav() {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const active = useActiveSection(t.navLinks.map((l) => l.id));

  return (
    <m.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 0.8, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink-950/85 backdrop-blur-md"
    >
      <div
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-term shadow-[0_0_12px_rgba(92,232,164,0.8)] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.openMenuAria}
            aria-expanded={open}
          >
            <m.span
              animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.25 }}
              className="h-[2px] w-4 bg-term"
            />
            <m.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-[2px] w-4 bg-term"
            />
            <m.span
              animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.25 }}
              className="h-[2px] w-4 bg-term"
            />
          </button>

          <a href="#beranda" className="group flex items-center gap-2 font-mono text-sm text-snow">
            <span className="text-term transition-transform duration-300 group-hover:translate-x-0.5">❯_</span>
            <span>
              habiby<span className="text-fog">.dev</span>
            </span>
          </a>
        </div>

        <ul className="hidden items-center gap-7 md:flex">
          {t.navLinks.map((l, i) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-1 font-mono text-[12px] transition-colors duration-200 hover:text-term ${
                    isActive ? "text-term" : "text-fog"
                  }`}
                >
                  <span
                    className={`mr-1 transition-colors duration-200 ${
                      isActive ? "text-term" : "text-fog/50 group-hover:text-term/70"
                    }`}
                  >
                    0{i + 1}.
                  </span>
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-term shadow-[0_0_8px_rgba(92,232,164,0.8)] transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          <li className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 0.8, 0.22, 1] }}
            className="overflow-hidden border-b border-line/70 bg-ink-900/95 md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {t.navLinks.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`block py-1.5 font-mono text-sm transition-colors hover:text-term ${
                      active === l.id ? "text-term" : "text-mist"
                    }`}
                  >
                    <span className={`mr-2 ${active === l.id ? "text-term" : "text-fog/50"}`}>
                      0{i + 1}.
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
