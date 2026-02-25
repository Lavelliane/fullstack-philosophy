import Link from "next/link";
import Quiz from "../../components/Quiz";
import RevealStepper from "../../components/RevealStepper";
import ScoreTracker from "../../components/ScoreTracker";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import {
  ChecklistSkeletonVisual,
  ChecklistStudentCardVisual,
  ChecklistErrorVisual,
  ChecklistEditToggleVisual,
  ChecklistFlowVisual,
  UrlParamsVisual,
  FetchInFlightVisual,
} from "../components/CodeVisuals";
import StepBrowserFrame from "../components/StepBrowserFrame";
import { highlightCode } from "../../../lib/shiki";
import { checklistSteps, finalQuizzes } from "../data";

const CHECKLIST_STEP_VISUALS: Record<number, React.ReactNode> = {
  0: <UrlParamsVisual />,
  1: <FetchInFlightVisual />,
  2: <ChecklistSkeletonVisual />,
  3: <ChecklistStudentCardVisual />,
  4: <ChecklistErrorVisual />,
  5: <ChecklistEditToggleVisual mode="edit" />,
  6: <ChecklistStudentCardVisual />,
};

/** Browser frame config per step — aligned with walkthrough lifecycle */
const CHECKLIST_STEP_FRAME: Record<
  number,
  {
    initialId?: string;
    initialTab?: "grades" | "courses";
    showProfileHeader?: boolean;
    showUrlControls?: boolean;
    contentMode?: "route" | "tab" | "custom";
  }
> = {
  0: { initialId: "42", initialTab: "grades", showProfileHeader: false, showUrlControls: true, contentMode: "route" },
  1: { initialId: "42", showProfileHeader: false, showUrlControls: false, contentMode: "custom" },
  2: { initialId: "42", showProfileHeader: false, showUrlControls: true, contentMode: "custom" },
  3: { initialId: "42", initialTab: "grades", showProfileHeader: true, showUrlControls: true, contentMode: "tab" },
  4: { initialId: "42", showProfileHeader: false, showUrlControls: false, contentMode: "custom" },
  5: { initialId: "42", initialTab: "grades", showProfileHeader: true, showUrlControls: true, contentMode: "custom" },
  6: { initialId: "42", initialTab: "grades", showProfileHeader: true, showUrlControls: true, contentMode: "tab" },
};

export default async function ChecklistSection() {
  const stepsWithHighlight = await Promise.all(
    checklistSteps.map(async (step, index) => {
      const rawVisual = CHECKLIST_STEP_VISUALS[index];
      const frameConfig = CHECKLIST_STEP_FRAME[index] ?? {};
      const visual = rawVisual !== undefined ? (
        <StepBrowserFrame
          initialId={frameConfig.initialId ?? "42"}
          initialTab={frameConfig.initialTab ?? "grades"}
          interactive={true}
          showProfileHeader={frameConfig.showProfileHeader ?? false}
          showUrlControls={frameConfig.showUrlControls ?? true}
          contentMode={frameConfig.contentMode ?? "custom"}
        >
          {rawVisual}
        </StepBrowserFrame>
      ) : undefined;
      return {
        ...step,
        codeHtml: step.code ? await highlightCode(step.code) : undefined,
        visual,
      };
    })
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl relative z-10">

          {/* Left: overview */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 06 · 3 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              A Student Profile page:
              <br />
              the full lifecycle.
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed mb-10 max-w-7xl">
              When a user visits <code className="px-1 py-0.5 rounded bg-zinc-100 font-mono text-zinc-700">/students/42</code>, this is what happens: route mounts → fetch fires → loading skeleton → success or error → edit GPA → save. Before you ship, answer: <em>What shows while loading? What if it fails? Does the back button work?</em>
            </p>

            <div className="space-y-3 mb-10">
              {[
                "Route /students/:id renders <StudentProfile />",
                "Component mounts, fetch /api/students/:id fires",
                "Loading: show a skeleton",
                "Success: render <StudentCard /> and <CourseList />",
                "Error: show message and retry",
                "Edit GPA button: local state toggles view",
                "Save: PATCH /students/:id/gpa, update state",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs text-zinc-300 w-5 shrink-0 mt-0.5 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right: animated step flow (like Full fetch component) */}
          <div className="hidden lg:flex flex-col gap-4 justify-center min-w-0 flex-1">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2">
              Student Profile lifecycle — click Run to step through what happens at /students/42
            </p>
            <ChecklistFlowVisual />
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
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex flex-col items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-3xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Walkthrough + Final Quiz: Section 06
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              A user visits <code className="px-1.5 py-0.5 rounded bg-zinc-200 font-mono text-zinc-700">/students/42</code>. Click <strong className="text-zinc-700">Next step</strong> to reveal each phase of the lifecycle — route, fetch, loading, success or error, edit, save. Every concept from this session connects here.
            </p>
          </div>
        </div>

        <ChallengeSection>
          <ChallengeLabel>Walkthrough: Step through the lifecycle</ChallengeLabel>
          <p className="text-xs text-zinc-500 mb-4">
            Use <strong className="text-zinc-700">Next step</strong> to reveal each phase. See the code and what the UI looks like at that moment.
          </p>
          <RevealStepper
            steps={stepsWithHighlight}
            prompt=""
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Final quiz: one from each section</ChallengeLabel>
          <div className="flex flex-col gap-4">
            {finalQuizzes.map((q, i) => (
              <Quiz key={i} {...q} scoreId={`frontend:final:quiz-${i}`} />
            ))}
          </div>
        </ChallengeSection>

        <ChallengeSection>
          <ScoreTracker topic="frontend" />
        </ChallengeSection>

        {/* Closing */}
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-16 flex items-center justify-center min-h-[50vh]"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-7xl">
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
            <p className="mt-6 text-sm text-zinc-500 max-w-7xl">
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
              <Link
                href="/"
                className="text-sm font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all duration-200"
              >
                Back to workshop →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
