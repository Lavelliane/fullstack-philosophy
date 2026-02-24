"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MousePointerClick, ArrowRight, ArrowDown, ArrowUp, Send } from "lucide-react";
import StepBrowserFrame from "./StepBrowserFrame";

/**
 * Visual previews for code - what the code looks like when rendered.
 * Use with CodeVisual component, placed below CodeBlock in the parent.
 */

// ─── Three Roles (HTML/CSS/JS) ────────────────────────────────────────────

export function ThreeRolesButtonVisual() {
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => setEnrolled(true)}
        className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${enrolled
          ? "bg-emerald-600 text-white cursor-default"
          : "bg-[#0f172a] text-white hover:bg-zinc-800"
          }`}
        disabled={enrolled}
      >
        {enrolled ? "Enrolled ✓" : "Enroll in Course"}
      </button>
      {enrolled && (
        <button
          type="button"
          onClick={() => setEnrolled(false)}
          className="text-base text-zinc-400 hover:text-zinc-600"
        >
          Reset
        </button>
      )}
    </div>
  );
}

// ─── Components ────────────────────────────────────────────────────────────

const STUDENTS_PREVIEW = [
  { name: "Ana Reyes", year: 3, gpa: 3.9, initial: "A" },
  { name: "Ben Cruz", year: 2, gpa: 3.5, initial: "B" },
];

/** 12 students for the 1→many comparison animation */
const STUDENTS_COMPARISON = [
  { name: "Ana Reyes", year: 3, gpa: 3.9, initial: "A" },
  { name: "Ben Cruz", year: 2, gpa: 3.5, initial: "B" },
  { name: "Cora Lee", year: 4, gpa: 3.8, initial: "C" },
  { name: "Davi Kim", year: 1, gpa: 3.6, initial: "D" },
  { name: "Evan Park", year: 2, gpa: 3.7, initial: "E" },
  { name: "Faye Chen", year: 3, gpa: 3.9, initial: "F" },
  { name: "Gia Torres", year: 2, gpa: 3.4, initial: "G" },
  { name: "Hugo Wells", year: 4, gpa: 3.2, initial: "H" },
  { name: "Ivy Santos", year: 1, gpa: 3.8, initial: "I" },
  { name: "Jake Moore", year: 3, gpa: 3.5, initial: "J" },
  { name: "Kira Young", year: 2, gpa: 3.9, initial: "K" },
  { name: "Leo Zhang", year: 4, gpa: 3.6, initial: "L" },
];

function StudentCardPreview({ name, year, gpa, initial }: { name: string; year: number; gpa: number; initial: string }) {
  return (
    <div className="flex items-center gap-2 border border-zinc-200 rounded-lg p-2 bg-white">
      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
        <span className="text-base font-mono font-semibold text-zinc-500">{initial}</span>
      </div>
      <div>
        <p className="text-base font-semibold text-zinc-800">{name}</p>
        <p className="text-base text-zinc-500">Year {year} · GPA {gpa}</p>
      </div>
    </div>
  );
}

export function ComponentCardsVisual() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {STUDENTS_PREVIEW.map((s) => (
        <StudentCardPreview key={s.name} {...s} />
      ))}
    </div>
  );
}

/** Visual for bad copy-paste: 12 duplicated blocks, change 12 places */
export function ComponentComparisonBadVisual() {
  return (
    <div>
      <div className="flex items-start gap-2">
        <div className="flex flex-wrap gap-1.5 justify-start">
          {STUDENTS_COMPARISON.slice(0, 5).map((s) => (
            <StudentCardPreview key={s.name} {...s} />
          ))}
          <p className="text-base text-nowrap text-zinc-500 text-center h-20 w-40 items-center justify-center flex">
            ... + 7 more
          </p>
        </div>
      </div>
      <p className="text-base text-red-600 font-medium">
        Change design? Update 12 places.
      </p>
    </div>
  );
}

/** Visual for copy-paste vs reuse: click to reveal, animates from 1 to many actual cards */
export function ComponentComparisonVisual() {
  return (
    <div>
      <div className="flex items-start gap-2">
        <div className="flex flex-wrap gap-1.5 justify-start">
          {STUDENTS_COMPARISON.slice(0, 5).map((s) => (
            <StudentCardPreview key={s.name} {...s} />
          ))}
          <p className="text-base text-nowrap text-zinc-500 text-center h-20 w-40 items-center justify-center flex">
            ... + 7 more
          </p>
        </div>
      </div>
      <p className="text-base text-green-600 font-medium">
        One component, students.map(...). Change the card? Change it once.
      </p>
    </div>
  );
}

export function PropsButtonsVisual() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => setLastAction("Saved!")}
          className="px-3 py-1.5 rounded text-base font-medium bg-zinc-900 text-white cursor-pointer hover:bg-zinc-800 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setLastAction("Cancelled")}
          className="px-3 py-1.5 rounded text-base font-medium bg-zinc-200 text-zinc-800 cursor-pointer hover:bg-zinc-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setLastAction("Deleted")}
          className="px-3 py-1.5 rounded text-base font-medium bg-red-100 text-red-800 cursor-pointer hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
      {lastAction && (
        <p className="text-base text-zinc-500 font-mono">
          onClick → {lastAction}
        </p>
      )}
    </div>
  );
}

export function PropsFlowVisual() {
  return (
    <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50 flex flex-col items-center">
      <p className="text-base text-zinc-400 uppercase tracking-wider mb-2">StudentCard receives student prop</p>
      <StudentCardPreview name="Ana Reyes" year={3} gpa={3.9} initial="A" />
    </div>
  );
}

/** Diagram: child-to-parent callback flow for beginners */
const COURSES_DEMO = [
  { id: 1, name: "CS 101" },
  { id: 2, name: "Math 201" },
];

export function ChildToParentFlowVisual() {
  const [selectedCourse, setSelectedCourse] = useState<{ id: number; name: string } | null>(null);

  return (
    <div className="border border-zinc-200 rounded-lg p-4 bg-white">
      <p className="text-base text-zinc-400 uppercase tracking-wider mb-3 text-center font-mono">
        How callbacks flow: parent → child → parent
      </p>
      <div className="flex flex-col items-center gap-2">
        {/* Parent box */}
        <div className="w-full max-w-sm rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2">
          <p className="text-base font-semibold text-blue-800 uppercase tracking-wider">Parent</p>
          <p className="text-base text-zinc-600 mt-0.5 font-mono">
            selectedCourse = {selectedCourse ? `"${selectedCourse.name}"` : "null"}
          </p>
          <p className="text-base text-zinc-500 mt-1">passes onSelect down ↓</p>
        </div>

        <div className="flex flex-col items-center text-zinc-400">
          <ArrowDown className="w-4 h-4" />
          <span className="text-base font-mono">onSelect prop</span>
        </div>

        {/* Child box */}
        <div className="w-full max-w-sm rounded-lg border-2 border-amber-200 bg-amber-50/50 px-3 py-2">
          <p className="text-base font-semibold text-amber-800 uppercase tracking-wider">Child (CourseList)</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {COURSES_DEMO.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCourse(c)}
                className={`px-2 py-1 rounded text-base font-medium transition-colors ${selectedCourse?.id === c.id
                  ? "bg-amber-600 text-white ring-2 ring-amber-400"
                  : "bg-white border border-amber-200 text-amber-800 hover:bg-amber-100"
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <p className="text-base text-zinc-500 mt-2">click → calls onSelect(course) ↑</p>
        </div>

        <div className="flex flex-col items-center text-zinc-400">
          <ArrowUp className="w-4 h-4" />
          <span className="text-base font-mono">data flows up</span>
        </div>

        <p className="text-base text-zinc-500 text-center mt-1">
          Parent&apos;s handler runs → setState → re-render. Child never &quot;sends props&quot; — it invokes the callback.
        </p>
      </div>
    </div>
  );
}

export function ChildrenBadgeVisual() {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-base font-medium text-amber-800 border border-amber-200">
        Dean&apos;s List
      </span>
    </div>
  );
}

export function ChildrenBadgeStrongVisual() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-base font-medium text-amber-800 border border-amber-200">
      <strong>Honor Roll</strong>
    </span>
  );
}

export function ComposeLayoutVisual() {
  return (
    <div className="border border-zinc-300 rounded-lg overflow-hidden text-base">
      <div className="h-6 bg-zinc-800 flex items-center justify-between px-2">
        <span className="font-mono text-base text-zinc-300">NavBar</span>
        <span className="w-3 h-3 rounded-full bg-zinc-500" />
      </div>
      <div className="p-2 space-y-2 bg-white flex flex-col items-center">
        <div className="flex gap-1 flex-wrap justify-center">
          {STUDENTS_PREVIEW.map((s) => (
            <StudentCardPreview key={s.name} {...s} />
          ))}
        </div>
        <ChildrenBadgeVisual />
      </div>
      <div className="h-5 bg-zinc-100 flex items-center justify-start px-2 border-t border-zinc-200">
        <span className="font-mono text-base text-zinc-600">Footer</span>
      </div>
    </div>
  );
}

// ─── State ─────────────────────────────────────────────────────────────────

export function LiftStateVisual() {
  return (
    <div className="space-y-2 text-base flex flex-col items-center">
      <div className="border border-zinc-200 rounded p-2">
        <p className="text-base text-zinc-400 mb-1">CourseList</p>
        <p className="text-base text-zinc-600">Enroll → adds to enrolled[]</p>
      </div>
      <div className="border border-zinc-200 rounded p-2">
        <p className="text-base text-zinc-400 mb-1">EnrolledSummary</p>
        <p className="text-base text-zinc-600">Shows enrolled count</p>
      </div>
      <button
        type="button"
        className="px-2 py-1 rounded border border-zinc-300 text-base text-zinc-500 bg-zinc-50"
        style={{ cursor: "default" }}
      >
        Submit (disabled when empty)
      </button>
    </div>
  );
}

const SAMPLE_COURSE = { id: "cs101", name: "CS 101", credits: 3 };

/** Interactive lift state: actual enrollment panel layout */
export function InteractiveLiftStateVisual() {
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [pulsing, setPulsing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleEnroll() {
    if (enrolled.includes(SAMPLE_COURSE.id) || submitted) return;
    setEnrolled((e) => [...e, SAMPLE_COURSE.id]);
    setPulsing(true);
  }

  useEffect(() => {
    if (!pulsing) return;
    const t = setTimeout(() => setPulsing(false), 500);
    return () => clearTimeout(t);
  }, [pulsing]);

  function handleSubmit() {
    if (enrolled.length === 0) return;
    setSubmitted(true);
  }

  function handleReset() {
    setEnrolled([]);
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <div className="flex flex-row flex-wrap items-center gap-4 w-full">
        {/* CourseList - course cards */}
        <motion.div
          className="border border-zinc-200 rounded-lg p-2.5 bg-white shrink-0 w-[220px] h-[112px] flex flex-col"
          animate={{ backgroundColor: pulsing ? "rgb(254 249 195)" : "transparent" }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-base text-zinc-400 uppercase tracking-wider mb-2">Available courses</p>
          <motion.button
            type="button"
            onClick={handleEnroll}
            disabled={enrolled.includes(SAMPLE_COURSE.id) || submitted}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left text-base transition-colors ${enrolled.includes(SAMPLE_COURSE.id)
              ? "bg-zinc-100 text-zinc-400 cursor-default"
              : "bg-zinc-50 hover:bg-emerald-50 text-zinc-700 cursor-pointer border border-zinc-200"
              }`}
            whileTap={enrolled.includes(SAMPLE_COURSE.id) ? {} : { scale: 0.98 }}
          >
            <span className="font-medium">{SAMPLE_COURSE.name}</span>
            <span className="text-base text-zinc-500">{SAMPLE_COURSE.credits} cr</span>
          </motion.button>
        </motion.div>

        {/* EnrolledSummary - enrolled chips */}
        <motion.div
          className="border border-zinc-200 rounded-lg p-2.5 bg-white shrink-0 w-[220px] h-[112px] flex flex-col"
          animate={{ backgroundColor: pulsing ? "rgb(254 249 195)" : "transparent" }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-base text-zinc-400 uppercase tracking-wider mb-2">Enrolled</p>
          <div className="flex flex-wrap gap-1.5 min-h-[24px]">
            {enrolled.length === 0 ? (
              <span className="text-base text-zinc-400 italic">None yet</span>
            ) : (
              enrolled.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-base font-medium text-emerald-800"
                >
                  {id === SAMPLE_COURSE.id ? SAMPLE_COURSE.name : id}
                </span>
              ))
            )}
          </div>
        </motion.div>

        {/* Submit */}
        {submitted ? (
          <div className="flex flex-col gap-1.5 shrink-0 items-start">
            <span className="text-base text-emerald-600 font-medium">Submitted ✓</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-base text-zinc-500 hover:text-zinc-700 underline underline-offset-1"
            >
              Try again
            </button>
          </div>
        ) : (
          <motion.button
            type="button"
            onClick={handleSubmit}
            className={`shrink-0 py-2 px-4 rounded-md text-base font-medium transition-colors ${enrolled.length > 0
              ? "bg-zinc-900 text-white hover:bg-zinc-800 cursor-pointer"
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
            disabled={enrolled.length === 0}
            whileTap={enrolled.length > 0 ? { scale: 0.98 } : {}}
          >
            {enrolled.length > 0 ? `Submit (${enrolled.length})` : "Submit"}
          </motion.button>
        )}
      </div>
      <p className="text-base text-zinc-400">Click course → state updates → all re-render</p>
    </div>
  );
}

/** Static counter (for comparison or when interactivity not needed) */
export function CounterVisual({ count = 0 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-base text-zinc-700">Count: {count}</p>
      <button
        type="button"
        className="w-fit px-3 py-1.5 rounded text-base font-medium bg-zinc-900 text-white"
        style={{ cursor: "default" }}
      >
        +1
      </button>
    </div>
  );
}

/** Interactive counter with pulse animation - actual counter UI layout */
export function InteractiveCounterVisual() {
  const [count, setCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="border border-zinc-200 rounded-lg bg-white p-4 shadow-sm min-w-[140px]">
        <motion.div
          key={count}
          className="flex flex-col items-center gap-3"
          initial={hasInteracted ? { backgroundColor: "rgb(254 249 195)" } : false}
          animate={{ backgroundColor: "transparent" }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-base text-zinc-400 uppercase tracking-wider font-mono">Count</span>
          <motion.span
            key={count}
            className="text-2xl font-mono font-semibold tabular-nums text-zinc-900"
            initial={hasInteracted ? { scale: 1.2 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {count}
          </motion.span>
          <motion.button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              setCount((c) => c + 1);
            }}
            className="w-full py-2 rounded-md text-sm font-medium bg-zinc-900 text-white cursor-pointer hover:bg-zinc-800 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            +1
          </motion.button>
        </motion.div>
      </div>
      <p className="text-base text-zinc-400">Click to see state → re-render</p>
    </div>
  );
}

// ─── Fetching ──────────────────────────────────────────────────────────────

export function FetchInFlightVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full min-h-[80px] py-2">
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center gap-1"
      >
        <Send className="w-5 h-5 text-zinc-500 shrink-0" />
        <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
      </motion.div>
      <p className="text-base font-mono text-zinc-500">Request sent — fetch() in flight</p>
    </div>
  );
}

export function FetchSkeletonVisual() {
  return (
    <div className="flex items-center gap-2 w-fit">
      <div className="w-8 h-8 rounded-full bg-zinc-200 animate-pulse shrink-0" />
      <div className="space-y-2 shrink-0">
        <div className="h-2.5 w-24 bg-zinc-200 rounded animate-pulse" />
        <div className="h-2 w-16 bg-zinc-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function FetchStudentCardVisual() {
  return (
    <div className="flex items-center gap-2 w-fit">
      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
        <span className="text-base font-mono font-semibold text-emerald-600">A</span>
      </div>
      <div>
        <p className="text-base font-semibold text-zinc-800">Ana Reyes</p>
        <p className="text-base text-zinc-500">Year 3 · GPA 3.9 · Enrolled</p>
      </div>
    </div>
  );
}

/** Visual for bad fetch: only success handled — loading/error show nothing or crash */
export function FetchStateBadVisual() {
  return (
    <div className="flex flex-col items-center gap-2">
      <FetchStudentCardVisual />
      <p className="text-base text-amber-600 font-medium text-center max-w-[180px]">
        Success only. Loading? Blank. Error? Crash.
      </p>
    </div>
  );
}

export function FetchErrorVisual() {
  return (
    <div className="flex items-center justify-between gap-2 w-fit">
      <p className="text-base text-red-600">Student profile unavailable.</p>
      <span className="text-base border border-red-200 px-2 py-0.5 text-red-500 font-mono rounded">
        Retry
      </span>
    </div>
  );
}

type FetchState = "loading" | "success" | "error";

const FETCH_NODES = [
  { id: "fetch", label: "fetch()", sublabel: "Request sent" },
  { id: "loading", label: "Loading", sublabel: "In flight" },
  { id: "success", label: "Success", sublabel: "Data arrived" },
  { id: "error", label: "Error", sublabel: "Request failed" },
] as const;

const STEP_DELAY_MS = 750;

/** Pipeline flow diagram: 3 buttons trigger animation to Loading/Success/Error; result on right */
export function FetchStatesFlowVisual() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [outcome, setOutcome] = useState<"success" | "error">("success");
  const [isRunning, setIsRunning] = useState(false);

  async function runToState(target: "loading" | "success" | "error") {
    if (isRunning) return;
    setIsRunning(true);
    setActiveIndex(-1);
    setOutcome(target === "error" ? "error" : "success");

    const steps: number[] =
      target === "loading" ? [0, 1] : target === "success" ? [0, 1, 2] : [0, 1, 3];

    for (let i = 0; i < steps.length; i++) {
      setActiveIndex(steps[i]);
      await new Promise((r) => setTimeout(r, STEP_DELAY_MS));
    }

    setIsRunning(false);
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl min-w-0">
      {/* 3 buttons: Loading | Success | Error */}
      <div className="flex gap-1.5 flex-wrap w-full">
        {(["loading", "success", "error"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => runToState(s)}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded text-base font-mono uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0 ${activeIndex === (s === "loading" ? 1 : s === "success" ? 2 : 3)
              ? s === "loading"
                ? "bg-amber-200 text-amber-900"
                : s === "success"
                  ? "bg-emerald-200 text-emerald-900"
                  : "bg-red-200 text-red-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
          >
            <span className="whitespace-nowrap text-nowrap">{s}</span>
          </button>
        ))}
      </div>

      {/* Pipeline + Result: pipeline on top, result below (matches ChecklistFlowVisual) */}
      <div className="flex flex-col items-start gap-3 min-w-0 w-full">
        {/* Pipeline: fetch → Loading → Success | Error */}
        <div className="overflow-hidden shrink-0 p-1">
          <div className="flex items-center gap-0">
            {FETCH_NODES.map((node, i) => {
              const isSuccessNode = node.id === "success";
              const isErrorNode = node.id === "error";
              const isOutcomeNode = isSuccessNode || isErrorNode;
              const showThisOutcome =
                (isSuccessNode && outcome === "success") ||
                (isErrorNode && outcome === "error");
              const isActive = activeIndex === i && (!isOutcomeNode || showThisOutcome);
              const isPassed = activeIndex > i || (activeIndex === i && isActive);
              const isHidden = isOutcomeNode && !showThisOutcome;

              if (isHidden) return null;

              const nodeClass = `relative flex flex-col items-center justify-center w-[84px] min-h-[52px] px-2 py-2 border rounded transition-all duration-300 shrink-0 ${isActive
                ? isErrorNode
                  ? "border-red-300 bg-red-50 ring-2 ring-red-200 ring-offset-1 shadow-sm"
                  : "border-amber-400 bg-amber-50 ring-2 ring-amber-200 ring-offset-1 shadow-sm"
                : isPassed
                  ? isErrorNode
                    ? "border-red-200 bg-red-50/50"
                    : "border-emerald-200 bg-emerald-50/50"
                  : "border-zinc-200 bg-zinc-50/50"
                }`;

              return (
                <div key={node.id} className="flex items-center shrink-0">
                  <motion.div className={nodeClass} layout>
                    <span className="text-base font-mono text-zinc-700 font-medium">
                      {node.label}
                    </span>
                    <span className="text-sm text-zinc-400 mt-0.5">{node.sublabel}</span>
                  </motion.div>
                  {i < 2 && (
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 mx-1 text-zinc-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Result: show for fetch, Loading, Success, or Error */}
        {activeIndex >= 0 && (
          <div className="flex-none w-fit min-w-[140px] min-h-[120px] border border-zinc-200 rounded-md bg-white p-4 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {activeIndex === 0 && (
                <motion.div
                  key="fetch"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center w-fit"
                >
                  <FetchInFlightVisual />
                </motion.div>
              )}
              {activeIndex === 1 && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center w-fit"
                >
                  <FetchSkeletonVisual />
                </motion.div>
              )}
              {activeIndex === 2 && outcome === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center w-fit"
                >
                  <FetchStudentCardVisual />
                </motion.div>
              )}
              {activeIndex === 3 && outcome === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center w-fit"
                >
                  <FetchErrorVisual />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export function FetchStatesVisual() {
  const [state, setState] = useState<FetchState>("loading");

  return (
    <div className="flex flex-col gap-3 w-fit">
      {/* Horizontal tabs */}
      <div className="flex gap-1">
        {(["loading", "success", "error"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setState(s)}
            className={`px-3 py-1.5 rounded text-base font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${state === s
              ? s === "loading"
                ? "bg-amber-200 text-amber-900"
                : s === "success"
                  ? "bg-emerald-200 text-emerald-900"
                  : "bg-red-200 text-red-900"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
          >
            {s}
          </button>
        ))}
      </div>
      {/* Content area with animation */}
      <div className="w-fit min-h-[90px] border border-zinc-200 rounded-lg bg-white p-3 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-fit"
            >
              <FetchSkeletonVisual />
            </motion.div>
          )}
          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-fit"
            >
              <FetchStudentCardVisual />
            </motion.div>
          )}
          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-fit"
            >
              <FetchErrorVisual />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Routing ───────────────────────────────────────────────────────────────

const ROUTE_ITEMS = [
  { path: "/", component: "Home" },
  { path: "/dashboard", component: "Dashboard" },
  { path: "/students", component: "StudentList" },
  { path: "/students/:id", component: "StudentProfile" },
  { path: "*", component: "NotFound" },
];

export function RoutesVisual() {
  return (
    <div className="space-y-1.5 text-base font-mono flex flex-col items-center">
      {ROUTE_ITEMS.map(({ path, component }) => (
        <div key={path} className="flex items-center gap-2 text-zinc-700">
          <span className="text-zinc-400 w-28 shrink-0">{path}</span>
          <span>→</span>
          <span className="text-zinc-900">{`<${component} />`}</span>
        </div>
      ))}
    </div>
  );
}

export function UrlParamsVisual() {
  return (
    <div className="space-y-2 text-base font-mono flex flex-col items-center">
      <div className="flex items-center gap-2">
        <span className="text-zinc-400">/students/42</span>
        <span>→</span>
        <span className="text-zinc-900">id = &quot;42&quot;</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-zinc-400">?tab=grades</span>
        <span>→</span>
        <span className="text-zinc-900">tab = &quot;grades&quot;</span>
      </div>
    </div>
  );
}

// ─── Checklist flow (animated pipeline, like FetchStatesFlowVisual) ─────────

const CHECKLIST_NODES = [
  { id: "route", label: "Route", sublabel: "mount" },
  { id: "fetch", label: "fetch()", sublabel: "fires" },
  { id: "loading", label: "Loading", sublabel: "skeleton" },
  { id: "success", label: "Success", sublabel: "StudentCard" },
  { id: "error", label: "Error", sublabel: "retry" },
  { id: "edit", label: "Edit", sublabel: "toggle" },
  { id: "save", label: "Save", sublabel: "PATCH" },
] as const;

const CHECKLIST_STEP_DELAY_MS = 950;

export function ChecklistFlowVisual() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [outcome, setOutcome] = useState<"success" | "error">("success");
  const [isRunning, setIsRunning] = useState(false);

  async function runToState(target: "success" | "error") {
    if (isRunning) return;
    setIsRunning(true);
    setActiveIndex(-1);
    setOutcome(target);

    const steps = target === "success" ? [0, 1, 2, 3, 5, 6] : [0, 1, 2, 4];
    for (let i = 0; i < steps.length; i++) {
      setActiveIndex(steps[i]);
      await new Promise((r) => setTimeout(r, CHECKLIST_STEP_DELAY_MS));
    }
    setIsRunning(false);
  }

  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      <div className="flex gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => runToState("success")}
          disabled={isRunning}
          className={`px-3 py-1.5 rounded text-base font-mono uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60 shrink-0 ${activeIndex >= 3 && outcome === "success"
            ? "bg-emerald-200 text-emerald-900"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
        >
          Run (happy path)
        </button>
        <button
          type="button"
          onClick={() => runToState("error")}
          disabled={isRunning}
          className={`px-3 py-1.5 rounded text-base font-mono uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60 shrink-0 ${activeIndex === 4 ? "bg-red-200 text-red-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
        >
          Error path
        </button>
      </div>

      <div className="flex flex-col items-start gap-3 min-w-0">
        <div className="relative overflow-x-auto shrink-0 p-1">
          <div className="flex items-center gap-0">
            {CHECKLIST_NODES.map((node, i) => {
              const isSuccessNode = node.id === "success";
              const isErrorNode = node.id === "error";
              const isEditOrSave = node.id === "edit" || node.id === "save";
              const showNode =
                (!isSuccessNode && !isErrorNode) ||
                (isSuccessNode && outcome === "success") ||
                (isErrorNode && outcome === "error");
              const hideEditSave = outcome === "error" && isEditOrSave;
              if (!showNode || hideEditSave) return null;

              const visibleIndices = CHECKLIST_NODES.map((n, idx) => {
                const s = n.id === "success";
                const e = n.id === "error";
                const es = n.id === "edit" || n.id === "save";
                const show = (!s && !e) || (s && outcome === "success") || (e && outcome === "error");
                const hide = outcome === "error" && es;
                return show && !hide ? idx : -1;
              }).filter((idx) => idx >= 0);
              const posInVisible = visibleIndices.indexOf(i);
              const hasNext = posInVisible >= 0 && posInVisible < visibleIndices.length - 1;

              const isActive = activeIndex === i;
              const isPassed = activeIndex > i;

              const nodeClass = `relative flex flex-col items-center justify-center w-[72px] min-h-[48px] px-2 py-2 border rounded text-center transition-all duration-300 shrink-0 ${isActive
                ? isErrorNode
                  ? "border-red-300 bg-red-50 ring-2 ring-red-200 ring-offset-1 shadow-sm"
                  : "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 ring-offset-1 shadow-sm"
                : isPassed
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-zinc-200 bg-zinc-50/50"
                }`;

              return (
                <div key={node.id} className="flex items-center shrink-0">
                  <motion.div className={nodeClass} layout>
                    <span className="text-base font-mono text-zinc-700 font-medium block truncate w-full px-0.5">
                      {node.label}
                    </span>
                    <span className="text-base text-zinc-400 block">{node.sublabel}</span>
                  </motion.div>
                  {hasNext && <ArrowRight className="w-3 h-3 shrink-0 mx-0.5 text-zinc-300" />}
                </div>
              );
            })}
          </div>
        </div>

        {activeIndex >= 0 && (
          <div className="w-full self-stretch">
            <StepBrowserFrame
              initialId="42"
              initialTab="grades"
              interactive={false}
              showProfileHeader={activeIndex === 3 || activeIndex === 5 || activeIndex === 6}
              showUrlControls={true}
              contentMode={
                activeIndex === 0
                  ? "route"
                  : activeIndex === 3 || activeIndex === 6
                    ? "tab"
                    : "custom"
              }
            >
              <AnimatePresence mode="wait">
                {activeIndex === 1 && (
                  <motion.div
                    key="fetch"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full flex justify-center"
                  >
                    <FetchInFlightVisual />
                  </motion.div>
                )}
                {activeIndex === 2 && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <ChecklistSkeletonVisual />
                  </motion.div>
                )}
                {activeIndex === 4 && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <ChecklistErrorVisual />
                  </motion.div>
                )}
                {activeIndex === 5 && (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <ChecklistEditToggleVisual mode="edit" />
                  </motion.div>
                )}
              </AnimatePresence>
            </StepBrowserFrame>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Checklist steps ───────────────────────────────────────────────────────

export function ChecklistSkeletonVisual() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-zinc-200 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-3 w-32 bg-zinc-200 rounded animate-pulse" />
          <div className="h-2 w-24 bg-zinc-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-1.5 mt-1">
        <div className="h-2.5 w-40 bg-zinc-200 rounded animate-pulse" />
        <div className="h-2.5 w-36 bg-zinc-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function ChecklistStudentCardVisual() {
  return (
    <div className="space-y-2 flex flex-col w-full">
      <StudentCardPreview name="Ana Reyes" year={3} gpa={3.9} initial="A" />
      <p className="text-base text-zinc-400">+ CourseList</p>
    </div>
  );
}

export function ChecklistErrorVisual() {
  return (
    <div className="flex flex-col gap-2 w-full min-h-[60px] py-2">
      <p className="text-base text-red-600">Couldn&apos;t load this student&apos;s profile.</p>
      <span className="text-base w-fit border border-red-200 px-2 py-0.5 text-red-500 font-mono rounded">
        Retry
      </span>
    </div>
  );
}

export function ChecklistEditToggleVisual({ mode }: { mode: "view" | "edit" }) {
  return mode === "view" ? (
    <div className="space-y-2 flex flex-col w-full">
      <StudentCardPreview name="Ana Reyes" year={3} gpa={3.9} initial="A" />
      <button type="button" className="text-base text-zinc-500 underline w-fit" style={{ cursor: "default" }}>
        Edit GPA
      </button>
    </div>
  ) : (
    <div className="border border-zinc-200 rounded-lg p-3 flex flex-col gap-2 w-full">
      <p className="text-base text-zinc-500 font-mono">GPA</p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value="3.9"
          readOnly
          className="w-20 border border-zinc-200 rounded px-2 py-1 text-sm font-mono"
        />
        <button
          type="button"
          className="shrink-0 px-3 py-1.5 text-base font-medium border border-zinc-300 bg-zinc-100 text-zinc-700 rounded transition-colors"
          style={{ cursor: "default" }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
