import { profile } from "../data";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";
import { CheckIcon } from "./icons";

const specs: { key: string; value: string; tone?: string }[] = [
  { key: "nama_lengkap", value: profile.name },
  { key: "sekolah", value: profile.university },
  { key: "jurusan", value: profile.major },
  { key: "semester", value: profile.semester },
  { key: "fokus", value: profile.focus.join(" · ") },
  { key: "domisili", value: profile.location },
  { key: "status", value: profile.status, tone: "text-solar" },
];

const principles = [
  "Debug dulu, panik belakangan.",
  "Baca dokumentasi sebelum Stack Overflow. (oke, kadang kebalik)",
  "Commit kecil, sering. Bukan satu commit \"final_fix_v2_beneran\".",
  "Komputer itu alat berpikir, bukan sekadar alat ngetik.",
];

export default function About() {
  const { ref: imgRef, visible: imgIn } = useReveal<HTMLDivElement>();
  const { ref: textRef, visible: textIn } = useReveal<HTMLDivElement>();

  return (
    <section id="tentang" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeader
        index="01"
        cmd="$ cat tentang.txt"
        title="Tentang Saya"
      />

      <div className="grid gap-12 lg:grid-cols-12">
        {/* foto: sticky di desktop */}
        <div className="lg:col-span-5">
          <div ref={imgRef} className={`reveal lg:sticky lg:top-28 ${imgIn ? "is-in" : ""}`}>
            <div className="group relative border border-line bg-ink-900 p-3">
              {/* corner brackets */}
              <span className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />
              <span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-term transition-all duration-300 group-hover:h-8 group-hover:w-8" />

              <div className="img-sweep relative overflow-hidden">
                <img
                  src={profile.avatar || "/profile.jpg"}
                  alt={`Potret ${profile.name}`}
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[11px] text-fog">
                <span>
                  profile.jpg <span className="text-fog/50">· 1024×1024</span>
                </span>
                <span className="animate-ticker-glow text-term">● live</span>
              </div>
            </div>
          </div>
        </div>

        {/* narasi + spesifikasi */}
        <div ref={textRef} className={`reveal lg:col-span-7 ${textIn ? "is-in" : ""}`}>
          <div className="space-y-5 text-[15px] leading-relaxed text-mist/90">
            <p>
              Halo! Saya <span className="font-semibold text-snow">{profile.name}</span>, siswa{" "}
              <span className="font-semibold text-snow">{profile.major}</span> di{" "}
              <span className="font-semibold text-snow">{profile.university}</span>.
            </p>
            <p>
              Sekarang fokus saya di <span className="font-semibold text-snow">desktop app development dan web</span>,
              dengan hobi sampingan ngoprek server, otomasi pakai bash/ssh, dan sesekali nyemplung ke machine learning.
              Saya percaya programmer yang baik itu <span className="text-solar">paham komputer dari bawah</span>,
              dari cara memori bekerja sampai kenapa DNS selalu jadi tersangka utama.
            </p>
            <p>
              Di luar layar: ngopi di angkringan, nonton anime, dan jadi tempat servis laptop
              gratis bagi seluruh keluarga besar. <span className="text-fog">(iya, itu juga skill.)</span>
            </p>
          </div>

          {/* spesifikasi ala sistem */}
          <div className="mt-9 border border-line bg-ink-900/80">
            <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blush/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-solar/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-term/70" />
              <span className="ml-2 font-mono text-[11px] text-fog">spesifikasi.txt (neovim)</span>
            </div>
            <dl className="px-5 py-4 font-mono text-[12.5px] leading-[2.05]">
              <div className="text-fog">
                <span className="text-term">$</span> cat spesifikasi.txt
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

          {/* prinsip */}
          <ul className="mt-9 space-y-3">
            {principles.map((p) => (
              <li key={p} className="group flex items-start gap-3 text-[14px] text-mist/85">
                <span className="mt-0.5 text-term transition-transform duration-200 group-hover:translate-x-1">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover:border-term/40">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
