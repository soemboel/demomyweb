import { useLanguage } from "../i18n/LanguageContext";
import { useClock } from "../hooks";

export default function Footer() {
  const { t } = useLanguage();
  const { profile, footer, terminal } = t;
  const clock = useClock(terminal.dateLocale);

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-8 font-mono text-[12px] text-fog sm:flex-row sm:items-center sm:px-8">
        <div className="space-y-1">
          <p>
            <span className="text-term">❯</span> {footer.rightsPrefix}
            {profile.name}
            {footer.rightsSuffix}
          </p>
          <p className="text-fog/60">
            {footer.stackPrefix}
            <span className="line-through">{footer.stackStrike}</span>
            {footer.stackSuffix}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-fog/80">
            <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-term" />
            {footer.timezoneLabel} {clock}
          </span>
          <span className="text-fog/50">·</span>
          <span className="text-term">{footer.exitLabel}</span>
          <a
            href="#beranda"
            className="border border-line px-3 py-1.5 text-fog transition-all duration-200 hover:-translate-y-0.5 hover:border-term/50 hover:text-term"
            aria-label={footer.backToTopAria}
          >
            {footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
