import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { BranchIcon } from "./icons";

const typeStyle: Record<string, { badge: string; dot: string }> = {
  init: { badge: "border-aqua/40 text-aqua", dot: "bg-aqua" },
  feat: { badge: "border-term/40 text-term", dot: "bg-term" },
  chore: { badge: "border-solar/40 text-solar", dot: "bg-solar" },
  fix: { badge: "border-blush/40 text-blush", dot: "bg-blush" },
};

export default function Timeline() {
  const { t } = useLanguage();
  const { gitLog, timelineUI } = t;
  const { ref, visible } = useReveal<HTMLDivElement>(0.06);

  return (
    <section id="riwayat" className="relative scroll-mt-24 border-y border-line bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeader index="04" cmd={timelineUI.sectionCmd} title={timelineUI.sectionTitle} sub={timelineUI.sectionSub} />

        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] text-fog">
          <span className="flex items-center gap-2 text-term">
            <BranchIcon className="h-4 w-4" /> {timelineUI.branchLabel} <span className="text-mist">main</span>
          </span>
          <span>
            {timelineUI.commitsLabel} <span className="text-mist">{gitLog.length}</span>
          </span>
          <span>
            {timelineUI.mergeConflictLabel} <span className="text-term">0</span>{" "}
            <span className="text-fog/60">{timelineUI.mergeConflictNote}</span>
          </span>
          <span>
            {timelineUI.contributorsLabel} <span className="text-solar">1</span> {timelineUI.contributorsNote}
          </span>
        </div>

        <div ref={ref} className="relative ml-2 border-l border-line sm:ml-4">
          {gitLog.map((entry, i) => {
            const style = typeStyle[entry.type];
            return (
              <div
                key={entry.hash}
                className={`reveal group relative pb-10 pl-7 transition-colors duration-300 last:pb-0 sm:pl-10 ${
                  visible ? "is-in" : ""
                }`}
                style={{ transitionDelay: visible ? `${i * 90}ms` : "0ms" }}
              >
                <span
                  className={`absolute -left-[7px] top-1.5 h-[13px] w-[13px] rounded-full border-[3px] border-ink-950 transition-transform duration-300 group-hover:scale-125 ${style.dot}`}
                />

                <div className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <div className="flex items-center gap-3 font-mono text-[12px]">
                    <span className={`${style.badge.split(" ")[1]} transition-colors duration-200 group-hover:opacity-100 opacity-80`}>
                      {entry.hash}
                    </span>
                    <span className={`border px-2 py-0.5 text-[10px] uppercase tracking-wider ${style.badge}`}>
                      {entry.type}
                    </span>
                  </div>

                  <div className="border border-transparent p-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-line group-hover:bg-ink-850/80 sm:-m-3.5 sm:p-3.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-[16.5px] font-semibold text-snow">
                        {entry.message}
                      </h3>
                      <span className="font-mono text-[11.5px] text-fog/80">{entry.date}</span>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-mist/75">{entry.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-term shadow-[0_0_14px_rgba(92,232,164,0.9)]" />
        </div>
      </div>
    </section>
  );
}
