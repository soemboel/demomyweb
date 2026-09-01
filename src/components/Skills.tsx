import { learning, skillGroups, toolbox } from "../data";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { ChipIcon } from "./icons";

const accentMap = {
  term: { bar: "bg-term", text: "text-term", chip: "border-term/40 text-term" },
  aqua: { bar: "bg-aqua", text: "text-aqua", chip: "border-aqua/40 text-aqua" },
  solar: { bar: "bg-solar", text: "text-solar", chip: "border-solar/40 text-solar" },
} as const;

export default function Skills() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="skill" className="relative scroll-mt-24 border-y border-line bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeader
          index="02"
          cmd="$ htop --sort=cpu"
          title="Arsip Kemampuan"
          sub="// jujur-jujuran saja: persentase = seberapa sering saya memakainya tanpa menangis."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const accent = accentMap[group.accent];
            return (
              <div
                key={group.title}
                className={`reveal group border border-line bg-ink-900/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-600 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] ${
                  visible ? "is-in" : ""
                }`}
                style={{ transitionDelay: visible ? `${gi * 110}ms` : "0ms" }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`font-display text-lg font-semibold ${accent.text}`}>{group.title}</h3>
                  <span className="font-mono text-[10px] text-fog/60">{`0${gi + 1}/03`}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-fog/70">{group.note}</p>

                <ul className="mt-6 space-y-4">
                  {group.items.map((item, i) => (
                    <li key={item.name}>
                      <div className="mb-1.5 flex items-center justify-between font-mono text-[12px]">
                        <span className="text-mist">{item.name}</span>
                        <span className={accent.text}>{item.level}%</span>
                      </div>
                      <div className="h-[5px] w-full overflow-hidden bg-ink-700/70">
                        <div
                          className={`h-full ${accent.bar} transition-[width] duration-1000 ease-out`}
                          style={{
                            width: visible ? `${item.level}%` : "0%",
                            transitionDelay: `${gi * 110 + i * 80}ms`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* sedang dipelajari + alat tempur */}
        <div
          className={`reveal mt-10 grid gap-6 lg:grid-cols-2 ${visible ? "is-in" : ""}`}
          style={{ transitionDelay: visible ? "340ms" : "0ms" }}
        >
          <div className="border border-dashed border-term/30 bg-term/[0.03] p-6">
            <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-term">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-term" />
              sedang dipelajari
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {learning.map((l) => (
                <span
                  key={l}
                  className="border border-term/35 bg-ink-900 px-3.5 py-1.5 font-mono text-[12.5px] text-term transition-all duration-200 hover:-translate-y-0.5 hover:bg-term/10"
                >
                  {l}
                  <span className="cursor-blink ml-0.5">_</span>
                </span>
              ))}
            </div>
          </div>

          <div className="border border-line bg-ink-900/80 p-6">
            <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-solar">
              <ChipIcon className="h-4 w-4" />
              alat tempur harian
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {toolbox.map((t) => (
                <span
                  key={t}
                  className="border border-line bg-ink-850 px-3.5 py-1.5 font-mono text-[12.5px] text-mist/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-solar/40 hover:text-solar"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
