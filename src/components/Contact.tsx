import { FormEvent, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReducedMotion, useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, CopyIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "./icons";

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

export default function Contact() {
  const { t } = useLanguage();
  const { profile, socials, contactUI } = t;
  const reduced = useReducedMotion();
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent">("idle");
  const [outLines, setOutLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const validate = (): string | null => {
    if (!name.trim()) return contactUI.validation.nameRequired;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return contactUI.validation.emailInvalid;
    if (!message.trim() || message.trim().length < 5)
      return contactUI.validation.messageTooShort;
    return null;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "sending") return;

    const errMsg = validate();
    if (errMsg) {
      setValidationError(errMsg);
      return;
    }
    setValidationError(null);

    const firstName = name.trim().split(" ")[0] || contactUI.fallbackName;

    const steps: [string, boolean][] = contactUI.steps.map((label) => [label, true]);
    const suffix = [
      "",
      `${contactUI.thanksPrefix}${firstName}${contactUI.thanksSuffix}`,
      contactUI.replyNote,
    ];

    if (reduced) {
      const lines = [
        ...steps.map(([label, ok]) => {
          const pad = ".".repeat(Math.max(1, 28 - label.length));
          return `> ${label} ${pad} [ ${ok ? "OK" : "ERR"} ]`;
        }),
        ...suffix,
      ];
      setOutLines(lines);
      setPhase("sent");
      return;
    }

    setPhase("sending");
    setOutLines([]);

    const DOT_INTERVAL = 120;
    const DOT_COUNT = 4;
    const STEP_GAP = 220;

    let timeOffset = 300;

    steps.forEach(([label, ok], stepIdx) => {
      const pad = ".".repeat(Math.max(1, 28 - label.length));
      const loadingLine = `> ${label} ${pad} ...`;
      const resultLine = `> ${label} ${pad} [ ${ok ? "OK" : "ERR"} ]`;

      setTimeout(() => {
        setOutLines((prev) => [...prev, loadingLine]);
      }, timeOffset);
      timeOffset += DOT_INTERVAL * DOT_COUNT;

      setTimeout(() => {
        setOutLines((prev) => {
          const next = [...prev];
          const idx = next.lastIndexOf(loadingLine);
          if (idx !== -1) next[idx] = resultLine;
          return next;
        });
      }, timeOffset);
      timeOffset += STEP_GAP;

      if (stepIdx === steps.length - 1) {
        suffix.forEach((line, si) => {
          setTimeout(() => {
            setOutLines((prev) => [...prev, line]);
            if (si === suffix.length - 1) setPhase("sent");
          }, timeOffset + si * 300);
        });
      }
    });
  };

  const reset = () => {
    setPhase("idle");
    setOutLines([]);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="kontak" className="relative scroll-mt-24 border-t border-line bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeader index="06" cmd={contactUI.sectionCmd} title={contactUI.sectionTitle} sub={contactUI.sectionSub} />

        <div ref={ref} className="grid gap-12 lg:grid-cols-12">
          <div className={`reveal lg:col-span-5 ${visible ? "is-in" : ""}`}>
            <p className="text-[15px] leading-relaxed text-mist/85">
              {contactUI.introBefore}
              <span className="text-term">{contactUI.introHighlight}</span>
              {contactUI.introAfter}
            </p>

            <div className="mt-8 border border-line bg-ink-900/80">
              <div className="flex items-center justify-between border-b border-line bg-ink-850 px-4 py-2.5">
                <span className="font-mono text-[11px] text-fog">{contactUI.emailFileLabel}</span>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-term transition-colors hover:text-snow"
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                  {copied ? contactUI.copiedLabel : contactUI.copyLabel}
                </button>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="block break-all px-4 py-4 font-mono text-[13.5px] text-snow transition-colors duration-200 hover:text-term sm:text-[14.5px]"
              >
                {profile.email}
              </a>
            </div>

            <ul className="mt-6 space-y-1">
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-line/60 py-3.5 transition-all duration-200 hover:border-term/40 hover:pl-2"
                    >
                      <span className="flex items-center gap-3.5">
                        <span className="text-fog transition-colors duration-200 group-hover:text-term">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="font-display text-[15px] font-semibold text-snow">{s.name}</span>
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[12px] text-fog">
                        {s.handle}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border border-dashed border-line p-5 font-mono text-[12px] leading-relaxed text-fog">
              <span className="text-term">$</span> {contactUI.availabilityCmd.replace(/^\$\s*/, "")}
              <br />
              <span className="text-mist/80">{contactUI.availabilityActivity}</span>
              <br />
              <span className="text-mist/80">{contactUI.availabilityTimezone}</span>
            </div>
          </div>

          <div className={`reveal lg:col-span-7 ${visible ? "is-in" : ""}`} style={{ transitionDelay: "140ms" }}>
            <div className="border border-line bg-ink-900 shadow-[0_28px_80px_-32px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-blush/80" />
                <span className="h-3 w-3 rounded-full bg-solar/80" />
                <span className="h-3 w-3 rounded-full bg-term/80" />
                <span className="ml-3 font-mono text-[11px] tracking-wide text-fog">{contactUI.formFileLabel}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">bash</span>
              </div>

              {phase === "idle" || phase === "sending" ? (
                <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[12px] text-fog">
                        <span className="text-term">$</span> {contactUI.namePrompt}
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={contactUI.namePlaceholder}
                        className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[12px] text-fog">
                        <span className="text-term">$</span> {contactUI.emailPrompt}
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={contactUI.emailPlaceholder}
                        className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[12px] text-fog">
                      <span className="text-term">$</span> {contactUI.messagePrompt}
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={contactUI.messagePlaceholder}
                      className="mt-2 w-full resize-none border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] leading-relaxed text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="font-mono text-[11px] text-fog/60">
                      {validationError
                        ? <span className="text-blush">{`// Error: ${validationError}`}</span>
                        : contactUI.helperText}
                    </p>
                    <button
                      type="submit"
                      disabled={phase === "sending"}
                      className="group flex items-center gap-2.5 border border-term/50 bg-ink-850 px-6 py-3 font-mono text-[13px] font-medium text-term hover:bg-term/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <span className="text-term">▶</span>
                      {phase === "sending" ? contactUI.sendingLabel : contactUI.sendLabel}
                    </button>
                  </div>

                  {outLines.length > 0 && (
                    <div className="border-t border-line/70 pt-4 font-mono text-[12.5px] leading-relaxed">
                      {outLines.map((l, i) => (
                        <div key={i} className={l.startsWith(">") ? "text-term/90" : l.startsWith("//") ? "text-fog/70" : "text-snow"}>
                          {l || " "}
                        </div>
                      ))}
                    </div>
                  )}

                </form>
              ) : (
                <div className="p-6 font-mono text-[13px] leading-[1.9] sm:p-8">
                  {outLines.map((l, i) => (
                    <div key={i} className={l.startsWith(">") ? "text-term/90" : l.startsWith("//") ? "text-fog/70" : "text-snow"}>
                      {l || " "}
                    </div>
                  ))}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-term">{profile.handle}@portfolio</span>
                    <span className="text-fog">:</span>
                    <span className="text-aqua">~</span>
                    <span className="text-fog">$</span>
                    <span className="cursor-blink text-term">▍</span>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-6 border border-term/40 px-4 py-2 text-[12px] text-term transition-all duration-200 hover:-translate-y-0.5 hover:bg-term/10"
                  >
                    {contactUI.resetLabel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
