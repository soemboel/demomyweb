import { useReveal } from "../hooks";

type Props = {
  index: string;
  cmd: string;
  title: string;
  sub?: string;
};

export default function SectionHeader({ index, cmd, title, sub }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal mb-10 sm:mb-14 ${visible ? "is-in" : ""}`}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.25em] text-term">
          <span className="text-fog/60">//</span> {index}
        </span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden font-mono text-[11px] text-fog/60 sm:block">{cmd}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-snow sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-fog">{sub}</p>}
    </div>
  );
}
