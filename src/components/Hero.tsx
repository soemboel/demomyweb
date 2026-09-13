import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal, useScramble } from "../hooks";
import { ArrowUpRight, GithubIcon, GraduationIcon, InstagramIcon, LinkedinIcon, MailIcon, PinIcon } from "./icons";
import Terminal from "./Terminal";
import CrabSidebar from "./CrabWalk";

const socialIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return GithubIcon;
    case "LinkedIn":
      return LinkedinIcon;
    case "Instagram":
      return InstagramIcon;
    default:
      return MailIcon;
  }
};

export default function Hero() {
  const { t } = useLanguage();
  const { profile, socials, stats, hero } = t;
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const line1 = useScramble(profile.firstName, started, 0);
  const line2 = useScramble(profile.lastName, started, 500);

  const { ref: statsRef, visible: statsIn } = useReveal<HTMLDivElement>();

  return (
    <section id="beranda" className="relative overflow-hidden pt-28 sm:pt-36">
      <CrabSidebar />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* kiri: identitas */}
          <div className="lg:col-span-6">
            <p className="font-mono text-[13px] text-term">
              <span className="text-fog">{hero.promptPath} $</span> {hero.promptCmd}
            </p>

            <h1 className="mt-5 font-display font-bold leading-[0.95] tracking-tight text-snow">
              <span className="block text-[17vw] sm:text-7xl lg:text-[5.2rem]">
                {line1 || "\u00A0"}
              </span>
              <span className="text-outline block text-[17vw] sm:text-7xl lg:text-[5.2rem]">
                {line2 || "\u00A0"}
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist/90 sm:text-base">
              {profile.role}
              {hero.joinRole}
              <span className="font-semibold text-snow">{profile.major}</span>
              {hero.afterMajor}
              <span className="text-term">{hero.highlight}</span>
              {hero.afterHighlight}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2.5 border border-term/30 bg-term/5 px-3.5 py-2 font-mono text-[11.5px] text-term">
                <span className="dot-pulse h-2 w-2 rounded-full bg-term" />
                {profile.status}
              </span>
              <span className="flex items-center gap-2 border border-line bg-ink-900 px-3.5 py-2 font-mono text-[11.5px] text-fog">
                <PinIcon className="h-3.5 w-3.5 text-solar" />
                {profile.location}
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#proyek"
                className="group flex items-center gap-2.5 bg-term px-6 py-3 font-mono text-[13px] font-medium text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_rgba(92,232,164,0.65)]"
              >
                <span className="text-ink-950/70">$</span> {hero.ctaProjects}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#kontak"
                className="border border-solar/40 px-6 py-3 font-mono text-[13px] text-solar transition-all duration-200 hover:-translate-y-0.5 hover:bg-solar/10"
              >
                {hero.ctaContact}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-2">
              <span className="mr-2 h-px w-10 bg-line" />
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-9 w-9 items-center justify-center border border-line text-fog transition-all duration-200 hover:-translate-y-1 hover:border-term/50 hover:text-term"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* kanan: terminal interaktif */}
          <div className="animate-floaty lg:col-span-6 lg:mt-2">
            <Terminal />
            <p className="mt-3 text-right font-mono text-[11px] text-fog/50">
              {hero.terminalCaption}
            </p>
          </div>
        </div>

        {/* statistik */}
        <div
          ref={statsRef}
          className={`reveal mt-16 grid grid-cols-1 border border-line bg-ink-900/60 sm:grid-cols-3 ${statsIn ? "is-in" : ""}`}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group relative px-6 py-6 transition-colors duration-300 hover:bg-ink-850 ${
                i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
              }`}
            >
              <p className="font-display text-3xl font-bold text-snow transition-colors duration-300 group-hover:text-term sm:text-4xl">
                {s.value}
                <span className="text-lg text-term sm:text-xl">{s.suffix}</span>
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fog">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
