import Link from "next/link";

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
        &ldquo;A perfect backend is one nobody talks about.
        <br />
        Your goal is to be forgotten.&rdquo;
      </blockquote>
      <p className="mt-6 text-base text-zinc-500 leading-relaxed max-w-2xl">
        The best infrastructure is invisible. Nobody praises the plumbing until it breaks. Build something so reliable it earns the right to be ignored.
      </p>
      <div className="mt-10 flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
        >
          ← Back to workshop
        </Link>
        <a
          href="/frontend"
          className="text-sm font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all duration-200"
        >
          Next: The Surface That Speaks →
        </a>
      </div>
    </div>
  );
}
