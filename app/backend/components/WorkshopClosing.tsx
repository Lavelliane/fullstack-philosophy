export default function WorkshopClosing() {
  return (
    <div className="mt-16 border-t border-zinc-100 pt-10">
      <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-4">
        Closing thought
      </p>
      <blockquote
        className="font-light leading-tight tracking-tight text-zinc-900"
        style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
      >
        &ldquo;Frameworks and languages will keep changing.
        <br />
        This thinking won&apos;t.&rdquo;
      </blockquote>
      <div className="mt-10 flex items-center gap-6">
        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
        >
          ← Back to workshop
        </a>
        <a
          href="/frontend"
          className="text-sm font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all duration-200"
        >
          Next: Think Like a Frontend Developer →
        </a>
      </div>
    </div>
  );
}
