export default function BackendHero() {
  return (
    <div className="max-w-screen-lg mx-auto px-8 pt-16 pb-4">
      <div className="mb-2">
        <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
          Workshop: Part 1
        </span>
      </div>
      <h1
        className="font-light leading-[0.9] tracking-tight text-zinc-900 mb-6"
        style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
      >
        The Quiet Side 
        <br />
        of Software
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-lg mb-12">
        30 minutes. Six concepts. No syntax. By the end you&apos;ll see every
        API, every service, and every failure mode differently.
      </p>
      <div className="flex items-center gap-6 text-xs font-mono text-zinc-300">
        <span>6 sections</span>
        <span>·</span>
        <span>12 interactions</span>
        <span>·</span>
        <span>30–35 min</span>
      </div>
    </div>
  );
}
