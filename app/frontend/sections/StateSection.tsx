import CodeWithDiagram from "../components/CodeWithDiagram";
import Quiz from "../../components/Quiz";
import DragBucket from "../../components/DragBucket";
import DragSort from "../../components/DragSort";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import { InteractiveCounterVisual, InteractiveLiftStateVisual } from "../components/CodeVisuals";
import StateOwnershipFlow from "../components/StateOwnershipFlow";
import {
  localStateCode,
  liftStateCode,
  stateQuiz,
  stateLoopDragItems,
  stateLoopCorrectOrder,
  stateBucketItems,
  stateBucketBuckets,
  stateBucketMapping,
} from "../data";

const stateSlideCode = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

// setCount called → state changes → re-render`;

export default function StateSection() {
  return (
    <section id="s3" style={{ scrollSnapAlign: "start" }}>

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
          03
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl relative z-10">

          {/* Left: concept */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 03 · 8 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-8"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              What the app
              <br />
              remembers.
            </h2>

            {/* The core loop: visual emphasis */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              {[
                { label: "User acts", color: "bg-zinc-100 text-zinc-700 border border-zinc-200" },
                { label: "→", color: "text-zinc-300" },
                { label: "State changes", color: "bg-zinc-900 text-white" },
                { label: "→", color: "text-zinc-300" },
                { label: "UI re-renders", color: "bg-zinc-100 text-zinc-700 border border-zinc-200" },
              ].map((item, i) =>
                item.label === "→" ? (
                  <span key={i} className={`font-mono text-lg ${item.color}`}>
                    {item.label}
                  </span>
                ) : (
                  <span
                    key={i}
                    className={`font-mono text-xs px-3 py-2 ${item.color}`}
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-900 text-white px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  Local
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Owned by one component.</strong>{" "}
                  A dropdown open/closed. A form field. Only that component
                  needs to know.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-500 text-white px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  Global
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Shared across the app.</strong>{" "}
                  Who&apos;s logged in. A student&apos;s enrolled courses. Multiple
                  components need the same data.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-200 text-zinc-800 px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  Derived
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Computed from existing state.</strong>{" "}
                  Never store what you can calculate; it drifts out of sync.
                </p>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-zinc-900 pl-6 py-1">
              <p className="text-lg font-light text-zinc-900 leading-snug italic">
                &ldquo;Keep state as close to where it&apos;s used as possible.
                Lift it up only when you have to.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: code (desktop only) */}
          <div className="hidden lg:flex flex-col gap-3 min-w-0 max-w-lg">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
              The core loop in code
            </p>
            <CodeWithDiagram
              code={stateSlideCode}
              diagram={<InteractiveCounterVisual />}
              orientation="vertical"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">
            Practice ↓
          </span>
        </div>
      </div>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-7xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Challenges: Section 03
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              State is what makes a UI dynamic. Without state, your app is a
              static page. With state, every click, keystroke, and fetch has a
              place to land.
            </p>
          </div>
        </div>

        <ChallengeSection>
          <ChallengeLabel>Local state</ChallengeLabel>
          <CodeWithDiagram
            code={localStateCode}
            diagram={<InteractiveCounterVisual />}
            orientation="horizontal"
          />
        </ChallengeSection>

        {/* Lifting state: code + ownership diagram */}
        <ChallengeSection wide>
          <ChallengeLabel>Lifting state up</ChallengeLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeWithDiagram
              code={liftStateCode}
              diagram={<InteractiveLiftStateVisual />}
              orientation="vertical"
            />

            {/* State ownership diagram */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                State ownership: who owns, who reads
              </p>

              <StateOwnershipFlow />

              <p className="text-[10px] text-zinc-400 mt-4 text-center leading-relaxed">
                State lives in the parent. All three children receive it as props.<br />
                One update in the parent re-renders all three simultaneously.
              </p>
            </div>
          </div>
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: where does state live?</ChallengeLabel>
          <Quiz {...stateQuiz} />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: local or global?</ChallengeLabel>
          <DragBucket
            items={stateBucketItems}
            buckets={stateBucketBuckets}
            correctMapping={stateBucketMapping}
            prompt="Decide whether each piece of state belongs to one component (local) or the whole app (global)."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge C: the reactivity loop</ChallengeLabel>
          <DragSort
            items={stateLoopDragItems}
            correctOrder={stateLoopCorrectOrder}
            prompt="Put the steps of the reactivity loop in the correct order."
          />
        </ChallengeSection>
      </div>
    </section>
  );
}
