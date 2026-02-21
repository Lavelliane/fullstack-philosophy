export default function BackendHero() {
  return (
    <div
      className="relative flex flex-col justify-center px-8 md:px-16 min-h-[calc(100vh-var(--nav-height,61px))]"
      style={{ scrollSnapAlign: "start" }}
    >
      <span
        aria-hidden
        className="absolute right-0 top-0 font-light text-zinc-100 dark:text-zinc-800 leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 22vw, 220px)", lineHeight: 1 }}
      >
        00
      </span>
      <div className="relative z-10 max-w-screen-lg">
        <div className="mb-4">
          <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
            Workshop: Part 1
          </span>
        </div>
        <h1
          className="font-light leading-[0.9] tracking-tight text-zinc-900 dark:text-zinc-100 mb-6"
          style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
        >
          The Quiet Side
          <br />
          of Software
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-lg mb-12">
          30 minutes. Six concepts. No syntax. By the end you&apos;ll see every
          API, every service, and every failure mode differently.
        </p>
        <div className="flex items-center gap-6 text-xs font-mono text-zinc-300 dark:text-zinc-600">
          <span>6 sections</span>
          <span>·</span>
          <span>12 interactions</span>
          <span>·</span>
          <span>30–35 min</span>
        </div>
      </div>
      <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300 dark:text-zinc-600">
        <span className="text-xs font-mono uppercase tracking-[0.15em]">
          Begin ↓
        </span>
      </div>
    </div>
  );
}
