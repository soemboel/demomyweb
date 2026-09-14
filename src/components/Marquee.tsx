import { useLanguage } from "../i18n/LanguageContext";
import { AsteriskIcon } from "./icons";
// nice marque love
export default function Marquee() {
  const { t } = useLanguage();
  const unit = [...t.marqueeItems, ...t.marqueeItems, ...t.marqueeItems, ...t.marqueeItems];
  const row = [...unit, ...unit];
  return (
    <div className="marquee-mask mt-20 overflow-hidden border-y border-line bg-ink-900/70 py-4">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap pr-8">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span
              className={`font-mono text-sm tracking-[0.18em] ${
                i % 3 === 0 ? "text-term" : i % 3 === 1 ? "text-mist/70" : "text-aqua/80"
              }`}
            >
              {item.toUpperCase()}
            </span>
            <AsteriskIcon className="h-3 w-3 text-fog/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
