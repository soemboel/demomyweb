import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import SectionHeader from "./SectionHeader";
import { ChipIcon } from "./icons";
import { fadeUp, staggerContainer, viewport } from "../motion";

const accentMap = {
  term: { bar: "bg-term", text: "text-term", chip: "border-term/40 text-term" },
  aqua: { bar: "bg-aqua", text: "text-aqua", chip: "border-aqua/40 text-aqua" },
  solar: { bar: "bg-solar", text: "text-solar", chip: "border-solar/40 text-solar" },
} as const;

export default function Skills() {
  const { t } = useLanguage();
  const { skillGroups, learning, toolbox, skills } = t;

  return (
    <section id="skill" className="relative scroll-mt-24 border-y border-line bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeader index="02" cmd={skills.sectionCmd} title={skills.sectionTitle} sub={skills.sectionSub} />

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.12)}
        >
          {skillGroups.map((group, gi) => {
            const accent = accentMap[group.accent];
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group border border-line bg-ink-900/80 p-6 transition-[border-color,box-shadow] duration-300 hover:border-ink-600 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`font-display text-lg font-semibold ${accent.text}`}>{group.title}</h3>
                  <span className="font-mono text-[10px] text-fog/60">{`0${gi + 1}/03`}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-fog/70">{group.note}</p>

                <ul className="mt-6 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2.5 font-mono text-[12.5px]">
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.bar}`} />
                      <span className="text-mist">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.div variants={fadeUp} className="border border-dashed border-term/30 bg-term/[0.03] p-6">
            <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-term">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-term" />
              {skills.learningLabel}
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
          </motion.div>

          <motion.div variants={fadeUp} className="border border-line bg-ink-900/80 p-6">
            <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-solar">
              <ChipIcon className="h-4 w-4" />
              {skills.toolboxLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {toolbox.map((tool) => (
                <span
                  key={tool}
                  className="border border-line bg-ink-850 px-3.5 py-1.5 font-mono text-[12.5px] text-mist/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-solar/40 hover:text-solar"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
