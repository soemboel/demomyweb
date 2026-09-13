import { useLanguage } from "../i18n/LanguageContext";
import { Crab } from "./CrabWalk";

export default function CrabMobile() {
  const { language } = useLanguage();
  const blueLabel = language === "id" ? "Kepiting biru — klik untuk lompat" : "Blue crab — click to jump";
  const chocoLabel = language === "id" ? "Kepiting cokelat — klik untuk lompat" : "Chocolate crab — click to jump";

  return (
    <div className="block min-[1700px]:hidden">
      <div className="crab-track relative h-16 overflow-hidden border-y border-line bg-ink-900/40">
        <div className="crab-floor-line" aria-hidden="true" />
        <Crab color="#6fd6ff" side="left" full startFrac={0.12} label={blueLabel} />
        <Crab color="#972828" side="right" full startFrac={0.78} label={chocoLabel} />
      </div>
    </div>
  );
}
