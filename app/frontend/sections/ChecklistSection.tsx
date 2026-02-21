import Quiz from "../../components/Quiz";
import RevealStepper from "../../components/RevealStepper";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import { highlightCode } from "../../../lib/shiki";
import { checklistSteps, finalQuizzes } from "../data";

export default async function ChecklistSection() {
  const stepsWithHighlight = await Promise.all(
    checklistSteps.map(async (step) => ({
      ...step,
      codeHtml: step.code ? await highlightCode(step.code) : undefined,
    }))
  );

  return (
    <section id="s6" style={{ scrollSnapAlign: "start" }}>

      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center px-8 md:px-16 overflow-hidden"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        {/* Decorative number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(140px, 28vw, 260px)", lineHeight: 1 }}
        >
          06
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-screen-xl relative z-10">

          {/* Left: overview */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 06 · 3 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-10"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              A profile page:
              <br />
              end to end.
            </h2>

            <div className="space-y-3 mb-10">
              {[
                "Route /profile/:id renders <ProfilePage />",
                "Component mounts → fetch fires",
                "Loading → show a skeleton",
                "Success → render <UserCard /> and <PostList />",
                "Error → show message + retry",
                "Edit button → local state toggles view",
                "Save → POST → update state",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs text-zinc-300 w-5 shrink-0 mt-0.5 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-zinc-900 pl-6 py-1">
              <p className="text-lg font-light text-zinc-900 leading-snug italic">
                &ldquo;Frameworks will come and go.
                <br />
                Components, state, and data flow won&apos;t.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: questions to ask */}
          <div className="hidden lg:flex flex-col gap-4 justify-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2">
              Before shipping any screen
            </p>
            {[
              { q: "Loading?", a: "What does it show while data is in transit?" },
              { q: "Error?", a: "What if the request fails? Is there a retry?" },
              { q: "Empty?", a: "What if the data comes back as an empty array?" },
              { q: "URL?", a: "Can this screen be shared as a link?" },
              { q: "Back button?", a: "Does navigation preserve browser history?" },
            ].map(({ q, a }) => (
              <div key={q} className="flex items-start gap-4 border-b border-zinc-100 pb-3">
                <span className="font-mono text-xs bg-zinc-900 text-white px-2 py-1 shrink-0 mt-0.5">
                  {q}
                </span>
                <p className="text-sm text-zinc-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">
            Walkthrough ↓
          </span>
        </div>
      </div>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-2xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Walkthrough + Final Quiz — Section 06
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              Step through a full User Profile Page — route to render,
              fetch to display, edit to save. Every concept from this session
              connects here.
            </p>
          </div>
        </div>

        <ChallengeSection wide>
          <ChallengeLabel>Walkthrough: step through the lifecycle</ChallengeLabel>
          <RevealStepper
            steps={stepsWithHighlight}
            prompt="A user navigates to /profile/42. Step through what happens."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Final quiz: one from each section</ChallengeLabel>
          <div className="flex flex-col gap-4">
            {finalQuizzes.map((q, i) => (
              <Quiz key={i} {...q} />
            ))}
          </div>
        </ChallengeSection>

        {/* Closing */}
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-16 flex items-center justify-center min-h-[50vh]"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-2xl">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-4">
              Why we do this
            </p>
            <blockquote
              className="font-light leading-tight tracking-tight text-zinc-900"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              The human on the other side of the screen
              <br />
              is always the answer.
            </blockquote>
            <p className="mt-6 text-sm text-zinc-500 max-w-xl">
              Frameworks will come and go. Components, state, and data flow
              won&apos;t.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="/backend"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
              >
                ← Backend
              </a>
              <a
                href="/"
                className="text-sm font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all duration-200"
              >
                Back to workshop →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
