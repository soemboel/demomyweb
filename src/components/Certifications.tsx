import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight } from "./icons";

export default function Certifications() {
  const { t } = useLanguage();
  const { certifications, certUI } = t;
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeader index="05" cmd={certUI.sectionCmd} title={certUI.sectionTitle} sub={certUI.sectionSub} />

      <div ref={ref} className="border-t border-line">
        {certifications.map((c, i) => (
          <div
            key={c.title}
            className={`reveal group grid grid-cols-[64px_1fr] items-baseline gap-x-5 gap-y-1 border-b border-line px-2 py-5 transition-all duration-300 hover:bg-ink-900/70 hover:pl-5 sm:grid-cols-[90px_1fr_auto] sm:gap-x-8 ${
              visible ? "is-in" : ""
            }`}
            style={{ transitionDelay: visible ? `${i * 70}ms` : "0ms" }}
          >
            <span className="font-mono text-[13px] text-term">{c.year}</span>
            <div>
              <h3 className="font-display text-[16px] font-semibold text-snow transition-colors duration-200 group-hover:text-term">
                {c.title}
              </h3>
              <p className="mt-0.5 font-mono text-[12px] text-fog">{c.issuer}</p>
            </div>
            <span
              className={`col-start-2 justify-self-start border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] sm:col-start-3 sm:justify-self-end ${
                c.kind === "certification" ? "border-aqua/40 text-aqua" : "border-solar/40 text-solar"
              }`}
            >
              {certUI.kindLabels[c.kind]}
            </span>
          </div>
        ))}

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-fog transition-colors duration-200 hover:text-term"
        >
          <span className="text-term">$</span> {certUI.verifyCta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
