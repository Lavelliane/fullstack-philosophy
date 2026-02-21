type SectionHeaderProps = {
  number: string;
  label: string;
  heading: string;
  time: string;
};

export default function SectionHeader({
  number,
  label,
  heading,
  time,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-xs text-zinc-300">{number}</span>
        <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
          {label}
        </span>
        <span className="ml-auto text-xs text-zinc-300 font-mono">{time}</span>
      </div>
      <h2
        className="font-light leading-tight tracking-tight text-zinc-900"
        style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}
      >
        {heading}
      </h2>
    </div>
  );
}
