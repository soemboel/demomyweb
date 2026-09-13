import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, BranchIcon, FolderIcon, GithubIcon, StarIcon } from "./icons";

const accentMap = {
  term: { top: "border-t-term", text: "text-term", tag: "border-term/30 text-term/90" },
  aqua: { top: "border-t-aqua", text: "text-aqua", tag: "border-aqua/30 text-aqua/90" },
  solar: { top: "border-t-solar", text: "text-solar", tag: "border-solar/30 text-solar/90" },
} as const;

export default function Projects() {
  const { t } = useLanguage();
  const { projects, projectsUI } = t;
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="proyek" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeader
        index="03"
        cmd={projectsUI.sectionCmd}
        title={projectsUI.sectionTitle}
        sub={`${projectsUI.subBefore}${projects.length}${projectsUI.subAfter}`}
      />

      <div ref={ref}>
        <article
          className={`reveal group relative grid overflow-hidden border border-line bg-ink-900 transition-all duration-300 hover:border-term/40 lg:grid-cols-2 ${
            visible ? "is-in" : ""
          }`}
        >
          <div className="relative min-h-[240px] overflow-hidden border-b border-line lg:border-b-0 lg:border-r">
            <img
              src={featured.image}
              alt={`${featured.title} preview`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
            <span className="absolute left-4 top-4 border border-term/50 bg-ink-950/85 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-term">
              {projectsUI.featuredBadge}
            </span>
            <span className="absolute bottom-4 left-4 font-mono text-[11px] text-mist/80">
              {featured.tagline} · {featured.year}
            </span>
          </div>

          <div className="flex flex-col p-7 sm:p-9">
            <p className="font-mono text-[12px] text-fog">
              <span className="text-term">$</span> cd ~/proyek/{featured.id}
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-snow transition-colors duration-300 group-hover:text-term sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-mist/85">{featured.desc}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span key={tag} className="border border-term/30 bg-term/5 px-3 py-1 font-mono text-[11.5px] text-term/90">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4 pt-8">
              <a
                href={featured.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[12.5px] text-mist transition-all duration-200 hover:-translate-y-0.5 hover:border-term/50 hover:text-term"
              >
                <GithubIcon className="h-4 w-4" /> {projectsUI.sourceCode}
              </a>
              {featured.demo && (
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="group/demo flex items-center gap-2 bg-term px-4 py-2.5 font-mono text-[12.5px] font-medium text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-10px_rgba(92,232,164,0.7)]"
                >
                  {projectsUI.liveDemo}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
                </a>
              )}
              <span className="ml-auto hidden items-center gap-4 font-mono text-[11.5px] text-fog sm:flex">
                <span className="flex items-center gap-1.5">
                  <StarIcon className="h-3.5 w-3.5 text-solar" /> 128
                </span>
                <span className="flex items-center gap-1.5">
                  <BranchIcon className="h-3.5 w-3.5 text-aqua" /> 24
                </span>
              </span>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((p, i) => {
            const accent = accentMap[p.accent];
            return (
              <article
                key={p.id}
                className={`reveal group relative flex flex-col border border-line border-t-2 bg-ink-900/80 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-ink-900 hover:shadow-[0_22px_55px_-26px_rgba(0,0,0,0.95)] sm:p-7 ${accent.top} ${
                  visible ? "is-in" : ""
                }`}
                style={{ transitionDelay: visible ? `${140 + i * 90}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between">
                  <span className={`${accent.text} transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110`}>
                    <FolderIcon className="h-7 w-7" />
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-fog/70">{p.year}</span>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Repository ${p.title}`}
                      className="text-fog transition-all duration-200 hover:-translate-y-0.5 hover:text-term"
                    >
                      <GithubIcon className="h-[18px] w-[18px]" />
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Demo ${p.title}`}
                        className="text-fog transition-all duration-200 hover:-translate-y-0.5 hover:text-term"
                      >
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-fog/60">{p.tagline}</p>
                <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-snow transition-colors duration-200 group-hover:text-term">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist/80">{p.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2 pt-1">
                  {p.tags.map((tag) => (
                    <span key={tag} className={`border bg-ink-950/50 px-2.5 py-0.5 font-mono text-[10.5px] ${accent.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line/70 pt-4 font-mono text-[11px] text-fog/70">
                  <span>
                    {projectsUI.statusLabel} <span className={accent.text}>{p.status}</span>
                  </span>
                  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ~/proyek/{p.id} <span className="cursor-blink text-term">▍</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center font-mono text-[12.5px] text-fog">
          <span className="text-term">$</span> {projectsUI.cloneCmd}{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="border-b border-term/40 text-term transition-colors hover:bg-term/10"
          >
            {projectsUI.cloneCta}
          </a>
        </p>
      </div>
    </section>
  );
}
