import { useState } from "react";
import { useScrollProgress } from "../hooks";
import { useLanguage } from "../i18n/LanguageContext";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink-950/85 backdrop-blur-md">
      {/* scroll progress */}
      <div
        className="absolute left-0 top-0 h-[2px] bg-term shadow-[0_0_12px_rgba(92,232,164,0.8)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
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
            <span className={`h-[2px] w-4 bg-term transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-4 bg-term transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-4 bg-term transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>

          <a href="#beranda" className="group flex items-center gap-2 font-mono text-sm text-snow">
            <span className="text-term transition-transform duration-300 group-hover:translate-x-0.5">❯_</span>
            <span>
              habiby<span className="text-fog">.dev</span>
            </span>
          </a>
        </div>

        <ul className="hidden items-center gap-7 md:flex">
          {t.navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="group font-mono text-[12px] text-fog transition-colors duration-200 hover:text-term"
              >
                <span className="mr-1 text-fog/50 group-hover:text-term/70">0{i + 1}.</span>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageToggle />
          </li>
        </ul>

        <LanguageToggle className="md:hidden" />
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-line/70 bg-ink-900/95 transition-all duration-300 md:hidden ${
          open ? "max-h-80 border-b" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {t.navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block py-1.5 font-mono text-sm text-mist transition-colors hover:text-term"
              >
                <span className="mr-2 text-fog/50">0{i + 1}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
