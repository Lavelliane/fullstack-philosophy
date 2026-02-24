import Quiz from "../../components/Quiz";
import RevealStepper from "../../components/RevealStepper";
import ScoreTracker from "../../components/ScoreTracker";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import WorkshopClosing from "../components/WorkshopClosing";
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
    <section id="s6">

      {/* ── Intro slide ─────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center px-8 md:px-16 min-h-[calc(100vh-var(--nav-height,61px))]"
        style={{ scrollSnapAlign: "start" }}
      >
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(120px, 24vw, 200px)", lineHeight: 1 }}
        >
          06
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="06"
            label="The Checklist"
            heading="POST /orders: end to end."
            time="3 min"
          />
          <Prose>
            Here&apos;s a single{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">POST /orders</code>{" "}
            request, traced through every layer we discussed. Step through to see
            how middleware, controller, service, repository, and events work
            together.
          </Prose>
          <Prose>
            Before shipping any endpoint, ask: What&apos;s the contract?
            Who&apos;s allowed? What if it fails? What state changes? Can someone
            abuse this? Frameworks change. This thinking doesn&apos;t.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── Lifecycle walkthrough ───────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Walkthrough: step through the lifecycle</ChallengeLabel>
        <RevealStepper
          steps={stepsWithHighlight}
          prompt="A POST /orders request has just arrived. Step through what happens."
        />
      </BackendChallengeSection>

      {/* ── Final quiz ──────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Final quiz: one from each section</ChallengeLabel>
        <div className="flex flex-col gap-4">
          {finalQuizzes.map((q, i) => (
            <Quiz key={i} {...q} scoreId={`backend:final:quiz-${i}`} />
          ))}
        </div>
      </BackendChallengeSection>

      {/* ── Score tracker ───────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ScoreTracker topic="backend" />
      </BackendChallengeSection>

      {/* ── Closing ─────────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <WorkshopClosing />
      </BackendChallengeSection>

    </section>
  );
}
