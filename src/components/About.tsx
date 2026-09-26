import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import SectionHeader from "./SectionHeader";
import { CheckIcon } from "./icons";
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewport } from "../motion";

export default function About() {
  const { t } = useLanguage();
  const { profile, about } = t;

  const specs: { key: string; value: string; tone?: string }[] = [
    { key: about.specsLabels.fullName, value: profile.name },
    { key: about.specsLabels.school, value: profile.university },
    { key: about.specsLabels.major, value: profile.major },
    { key: about.specsLabels.semester, value: profile.semester },
    { key: about.specsLabels.focus, value: profile.focus.join(" · ") },
    { key: about.specsLabels.location, value: profile.location },
    { key: about.specsLabels.status, value: profile.status, tone: "text-solar" },
  ];

  return (
    <section id="tentang" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeader index="01" cmd={about.sectionCmd} title={about.sectionTitle} />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <motion.div
            className="lg:sticky lg:top-28"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
          >
            <div className="group relative border border-line bg-ink-900 p-3">
              <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />

              <div className="img-sweep relative overflow-hidden">
                <img
                  src={profile.avatar || "/profile.webp"}
                  alt={`${about.altPrefix} ${profile.name}`}
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[11px] text-fog">
                <span>
                  profile.webp <span className="text-fog/50">· 1024×1024</span>
                </span>
                <span className="animate-ticker-glow text-term">● {about.liveLabel}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeRight}
        >
          <div className="space-y-5 text-[15px] leading-relaxed text-mist/90">
            <p>
              {about.introGreeting}
              <span className="font-semibold text-snow">{profile.name}</span>
              {about.introStudentOf}
              <span className="font-semibold text-snow">{profile.major}</span>
              {about.introAt}
              <span className="font-semibold text-snow">{profile.university}</span>
              {about.introEnd}
            </p>
            <p>
              {about.p2a}
              <span className="font-semibold text-snow">{about.p2highlight1}</span>
              {about.p2b}
              <span className="text-solar">{about.p2highlight2}</span>
              {about.p2c}
            </p>
            <p>
              {about.p3a}
              <span className="text-fog">{about.p3highlight1}</span>
              {about.p3b}
              <span className="text-fog">{about.p3highlight2}</span>
            </p>
          </div>

          <div className="mt-9 border border-line bg-ink-900/80">
            <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blush/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-solar/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-term/70" />
              <span className="ml-2 font-mono text-[11px] text-fog">{about.specsFileLabel}</span>
            </div>
            <dl className="px-5 py-4 font-mono text-[12.5px] leading-[2.05]">
              <div className="text-fog">
                <span className="text-term">$</span> {about.specsCommand.replace(/^\$\s*/, "")}
              </div>
              {specs.map((s) => (
                <div key={s.key} className="flex flex-col gap-0 sm:flex-row sm:gap-0">
                  <dt className="w-36 shrink-0 text-aqua/90">{s.key}</dt>
                  <dd className="text-fog">
                    <span className="text-fog/50"> : </span>
                    <span className={s.tone ?? "text-mist"}>{s.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.ul
            className="mt-9 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer(0.08)}
          >
            {about.principles.map((p, i) => (
              <motion.li key={i} variants={fadeUp} className="group flex items-start gap-3 text-[14px] text-mist/85">
                <span className="mt-0.5 text-term transition-transform duration-200 group-hover:translate-x-1">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover:border-term/40">
                  {p}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
