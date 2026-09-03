import { profile } from "../data";
import { useClock } from "../hooks";

export default function Footer() {
  const clock = useClock();

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-8 font-mono text-[12px] text-fog sm:flex-row sm:items-center sm:px-8">
        <div className="space-y-1">
          <p>
            <span className="text-term">❯</span> © 2026 {profile.name} : dirancang dari satu.
          </p>
          <p className="text-fog/60">
            React + Tailwind CSS · tanpa <span className="line-through">sleep</span> tidur cukup.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-fog/80">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-term" />
            WIB {clock}
          </span>
          <span className="text-fog/50">·</span>
          <span className="text-term">exit 0</span>
          <a
            href="#beranda"
            className="border border-line px-3 py-1.5 text-fog transition-all duration-200 hover:-translate-y-0.5 hover:border-term/50 hover:text-term"
            aria-label="Kembali ke atas"
          >
            cd ~
          </a>
        </div>
      </div>
    </footer>
  );
}
