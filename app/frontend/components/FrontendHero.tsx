export default function FrontendHero() {
  return (
    <div className="max-w-screen-lg mx-auto px-8 pt-16 pb-4">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
          Workshop: Part 2
        </span>
        <span className="text-[10px] text-zinc-500 font-mono px-2 py-0.5 border border-zinc-200">
          30–35 min
        </span>
      </div>
      <h1
        className="font-light leading-[0.9] tracking-tight text-zinc-900 mb-6"
        style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
      >
        The Face
        <br />
        of Software
      </h1>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-lg mb-4">
        The backend handles logic. The frontend handles humans. Structure,
        appearance, behavior: components, state, and data flow. This is
        where everything becomes visible.
      </p>
      <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
        <span>6 sections</span>
        <span className="text-zinc-200">·</span>
        <span>Interactive challenges</span>
        <span className="text-zinc-200">·</span>
        <span>No framework required</span>
      </div>
    </div>
  );
}
