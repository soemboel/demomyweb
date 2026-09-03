import { FormEvent, useState } from "react";
import { profile, socials } from "../data";
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
  const reduced = useReducedMotion();
  const { ref, visible } = useReveal<HTMLDivElement>(0.08);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent">("idle");
  const [outLines, setOutLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "sending") return;
    const firstName = name.trim().split(" ")[0] || "kawan";
    const lines = [
      "> memvalidasi input ............ [ OK ]",
      "> membuka koneksi aman ......... [ OK ]",
      "> mengirim pesan ............... [ OK ]",
      "",
      `Terima kasih, ${firstName}! Pesanmu sudah masuk.`,
      "// saya biasanya membalas < 24 jam (kecuali lagi UTS).",
    ];
    if (reduced) {
      setOutLines(lines);
      setPhase("sent");
      return;
    }
    setPhase("sending");
    setOutLines([]);
    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutLines((prev) => [...prev, line]);
        if (i === lines.length - 1) setPhase("sent");
      }, 420 + i * 380);
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
        <SectionHeader
          index="06"
          cmd="$ ./hubungi-saya.sh"
          title="Mari Bikin Sesuatu"
          sub="// magang, proyek bareng, atau sekadar diskusi soal kenapa printer selalu error (pintu terbuka)."
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-12">
          {/* kiri: info */}
          <div className={`reveal lg:col-span-5 ${visible ? "is-in" : ""}`}>
            <p className="text-[15px] leading-relaxed text-mist/85">
              Cara tercepat menghubungi saya: <span className="text-term">email</span>. Semua pesan saya baca.
              Bahkan yang isinya cuma "bro, laptopku kena virus".
            </p>

            <div className="mt-8 border border-line bg-ink-900/80">
              <div className="flex items-center justify-between border-b border-line bg-ink-850 px-4 py-2.5">
                <span className="font-mono text-[11px] text-fog">alamat_email.txt</span>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-term transition-colors hover:text-snow"
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                  {copied ? "tersalin!" : "salin"}
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
              <span className="text-term">$</span> cat ketersediaan.txt
              <br />
              <span className="text-mist/80">→ freelance: akhir pekan, proyek kecil-menengah</span>
              <br />
              <span className="text-mist/80">→ zona waktu: WIB (UTC+7), sering online malam</span>
            </div>
          </div>

          {/* kanan: form ala shell */}
          <div className={`reveal lg:col-span-7 ${visible ? "is-in" : ""}`} style={{ transitionDelay: "140ms" }}>
            <div className="border border-line bg-ink-900 shadow-[0_28px_80px_-32px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-blush/80" />
                <span className="h-3 w-3 rounded-full bg-solar/80" />
                <span className="h-3 w-3 rounded-full bg-term/80" />
                <span className="ml-3 font-mono text-[11px] tracking-wide text-fog">kirim-pesan.sh (executable)</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">bash</span>
              </div>

              {phase === "idle" || phase === "sending" ? (
                <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[12px] text-fog">
                        <span className="text-term">$</span> read -p "nama"
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[12px] text-fog">
                        <span className="text-term">$</span> read -p "email"
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ada@analytical.engine"
                        className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[12px] text-fog">
                      <span className="text-term">$</span> cat pesan.txt
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Halo Habiby, saya mau ngajak kolaborasi proyek..."
                      className="mt-2 w-full resize-none border-b border-line bg-transparent px-1 py-2 font-mono text-[14px] leading-relaxed text-snow outline-none transition-colors duration-200 placeholder:text-fog/40 focus:border-term"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="font-mono text-[11px] text-blush">
                      // Error: API sedang gangguan. Tombol kirim pesan tidak dapat digunakan saat ini.
                    </p>
                    <button
                      type="button"
                      disabled={true}
                      className="group flex items-center gap-2.5 border border-blush/40 bg-ink-850 px-6 py-3 font-mono text-[13px] font-medium text-blush/80 cursor-not-allowed opacity-70"
                    >
                      <span className="text-blush">✕</span> ./kirim --pesan (API Error)
                    </button>
                  </div>

                  {outLines.length > 0 && (
                    <div className="border-t border-line/70 pt-4 font-mono text-[12.5px] leading-relaxed">
                      {outLines.map((l, i) => (
                        <div key={i} className={l.startsWith(">") ? "text-term/90" : l.startsWith("//") ? "text-fog/70" : "text-snow"}>
                          {l || "\u00A0"}
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              ) : (
                <div className="p-6 font-mono text-[13px] leading-[1.9] sm:p-8">
                  {outLines.map((l, i) => (
                    <div key={i} className={l.startsWith(">") ? "text-term/90" : l.startsWith("//") ? "text-fog/70" : "text-snow"}>
                      {l || "\u00A0"}
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
                    $ kirim pesan lain
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
