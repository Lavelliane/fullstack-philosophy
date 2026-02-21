export default function FrontendHero() {
  return (
    <div className="max-w-screen-lg mx-auto px-8 pt-16 pb-4">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
          Workshop: Part 2
        </span>
        <span className="text-[10px] text-amber-600 uppercase tracking-wider font-medium px-2 py-0.5 border border-amber-200 bg-amber-50">
          WIP
        </span>
      </div>
      <h1
        className="font-light leading-[0.9] tracking-tight text-zinc-900 mb-6"
        style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
      >
        The Surface
        <br />
        That Speaks
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
        Where the backend meets the human. DOM, events, components, and state.
        Coming soon.
      </p>
    </div>
  );
}
