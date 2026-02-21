"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type JourneyStep = {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
};

const LAYERS = [
  { id: "browser",  label: "Browser",      color: "bg-blue-50 border-blue-300 text-blue-800" },
  { id: "frontend", label: "Frontend",     color: "bg-blue-50 border-blue-300 text-blue-800" },
  { id: "api",      label: "API Contract", color: "bg-violet-50 border-violet-300 text-violet-800" },
  { id: "backend",  label: "Backend",      color: "bg-emerald-50 border-emerald-300 text-emerald-800" },
  { id: "database", label: "Database",     color: "bg-emerald-50 border-emerald-300 text-emerald-800" },
  { id: "response", label: "Response",     color: "bg-violet-50 border-violet-300 text-violet-800" },
];

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-zinc-300 bg-white overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 border-b border-zinc-200 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-[10px] font-mono text-zinc-500">
          school-portal.edu/courses/cs-101
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

function BrowserPanel({ submitting }: { submitting: boolean }) {
  return (
    <BrowserChrome>
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">CS 101: Intro to Computer Science</p>
        <p className="text-[11px] text-zinc-400 mb-4">Prof. Ada Lovelace · MWF 10:00 AM · 3 credits</p>
        <div className="space-y-2.5 mb-4">
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Student</label>
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 font-mono">Ben Cruz · ID: 42</div>
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Semester</label>
            <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 font-mono">Fall 2026</div>
          </div>
        </div>
        <button disabled className={`w-full text-xs font-medium py-2.5 px-4 border transition-all duration-300 ${submitting ? "bg-zinc-100 text-zinc-400 border-zinc-200" : "bg-zinc-900 text-white border-zinc-900"}`}>
          {submitting ? "Sending request..." : "Enroll in Course"}
        </button>
        {submitting && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-mono text-blue-500 mt-2">
            POST /api/enrollments · payload attached
          </motion.p>
        )}
      </div>
    </BrowserChrome>
  );
}

function ApiPanel() {
  const lines = [
    { key: "method",    val: '"POST"',           delay: 0 },
    { key: "url",       val: '"/api/enrollments"', delay: 0.08 },
    { key: "studentId", val: "42",               delay: 0.16 },
    { key: "courseId",  val: '"cs-101"',          delay: 0.24 },
    { key: "semester",  val: '"Fall 2026"',        delay: 0.32 },
  ];
  return (
    <div className="bg-zinc-950 text-emerald-400 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Request payload in flight</p>
      <p className="text-zinc-400 mb-1">{"{"}</p>
      {lines.map(({ key, val, delay }) => (
        <motion.p key={key} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.2 }} className="pl-4">
          <span className="text-violet-400">&quot;{key}&quot;</span>
          <span className="text-zinc-500">: </span>
          <span className="text-emerald-300">{val}</span>
          <span className="text-zinc-600">,</span>
        </motion.p>
      ))}
      <p className="text-zinc-400 mt-1">{"}"}</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4 border border-violet-800 bg-violet-950/50 px-3 py-2">
        <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Contract check</p>
        <p className="text-[11px] text-violet-300">Shape matches schema. All required fields present.</p>
      </motion.div>
    </div>
  );
}

const CHECKS = [
  { label: "JWT verified",              delay: 0 },
  { label: "Role: student",             delay: 0.18 },
  { label: "Course cs-101 exists",      delay: 0.36 },
  { label: "Not already enrolled",      delay: 0.54 },
  { label: "Enrollment window open",    delay: 0.72 },
  { label: "Credit limit not exceeded", delay: 0.9 },
];

function BackendPanel() {
  return (
    <div className="bg-zinc-950 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Backend validation pipeline</p>
      <div className="space-y-2.5">
        {CHECKS.map(({ label, delay }) => (
          <motion.div key={label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.2 }} className="flex items-center gap-3">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.14, type: "spring", stiffness: 320 }} className="text-emerald-400 text-sm shrink-0">✓</motion.span>
            <span className="text-zinc-300">{label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-5 border border-emerald-800 bg-emerald-950/40 px-3 py-2">
        <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">All checks passed</p>
        <p className="text-[11px] text-emerald-300">Proceeding to write enrollment record.</p>
      </motion.div>
    </div>
  );
}

const DB_EXISTING = [
  ["1", "17", "math-201", "Fall 2026", "2026-01-10"],
  ["2", "33", "eng-110",  "Fall 2026", "2026-01-11"],
  ["3", "08", "cs-101",   "Fall 2026", "2026-01-12"],
];
const DB_NEW = ["4", "42", "cs-101", "Fall 2026", "2026-01-15"];
const DB_COLS = ["id", "student_id", "course_id", "semester", "enrolled_at"];

function DatabasePanel() {
  return (
    <div className="bg-zinc-950 font-mono text-[11px] p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Table: enrollments</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>{DB_COLS.map((c) => <th key={c} className="text-left text-[10px] text-zinc-500 border-b border-zinc-800 pb-1.5 pr-5">{c}</th>)}</tr>
          </thead>
          <tbody>
            {DB_EXISTING.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j} className="text-zinc-500 py-1.5 pr-5 border-b border-zinc-900">{cell}</td>)}</tr>
            ))}
            <motion.tr initial={{ opacity: 0, backgroundColor: "rgba(52,211,153,0.2)" }} animate={{ opacity: 1, backgroundColor: "rgba(52,211,153,0)" }} transition={{ duration: 1.4, delay: 0.3 }}>
              {DB_NEW.map((cell, j) => (
                <motion.td key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + j * 0.12 }} className="text-emerald-400 py-1.5 pr-5 border-b border-zinc-800">{cell}</motion.td>
              ))}
            </motion.tr>
          </tbody>
        </table>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-[10px] text-emerald-500 mt-3">
        INSERT INTO enrollments ... 1 row affected
      </motion.p>
    </div>
  );
}

function ResponsePanel() {
  const lines = [
    { key: "status",     val: "201",                    color: "text-emerald-400", delay: 0 },
    { key: "id",         val: "4",                      color: "text-zinc-300",    delay: 0.1 },
    { key: "studentId",  val: "42",                     color: "text-zinc-300",    delay: 0.18 },
    { key: "courseId",   val: '"cs-101"',               color: "text-zinc-300",    delay: 0.26 },
    { key: "semester",   val: '"Fall 2026"',             color: "text-zinc-300",    delay: 0.34 },
    { key: "enrolledAt", val: '"2026-01-15T09:00:00Z"', color: "text-zinc-400",    delay: 0.42 },
  ];
  return (
    <div className="bg-zinc-950 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">Response payload</p>
      <p className="text-zinc-400 mb-1">{"{"}</p>
      {lines.map(({ key, val, color, delay }) => (
        <motion.p key={key} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.2 }} className="pl-4">
          <span className="text-violet-400">&quot;{key}&quot;</span>
          <span className="text-zinc-500">: </span>
          <span className={color}>{val}</span>
          <span className="text-zinc-600">,</span>
        </motion.p>
      ))}
      <p className="text-zinc-400 mt-1">{"}"}</p>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-4 border border-emerald-700 bg-emerald-950/40 px-3 py-2">
        <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Frontend receives 201</p>
        <p className="text-[11px] text-emerald-300">Button turns green. Confirmation appears. Loop complete.</p>
      </motion.div>
    </div>
  );
}

function EnrolledBrowserPanel() {
  return (
    <BrowserChrome>
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">CS 101: Intro to Computer Science</p>
        <p className="text-[11px] text-zinc-400 mb-4">Prof. Ada Lovelace · MWF 10:00 AM · 3 credits</p>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="border border-emerald-300 bg-emerald-50 px-4 py-3 mb-3">
          <p className="text-xs font-medium text-emerald-700 mb-0.5">Enrolled</p>
          <p className="text-[11px] text-emerald-600">You are now enrolled in CS 101 for Fall 2026.</p>
        </motion.div>
        <button disabled className="w-full text-xs font-medium py-2.5 px-4 bg-emerald-600 text-white border border-emerald-600">Enrolled</button>
      </div>
    </BrowserChrome>
  );
}

function StepPanel({ step }: { step: number }) {
  const panels: Record<number, React.ReactNode> = {
    0: <BrowserPanel submitting={false} />,
    1: <BrowserPanel submitting={true} />,
    2: <ApiPanel />,
    3: <BackendPanel />,
    4: <DatabasePanel />,
    5: <EnrolledBrowserPanel />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26 }} className="h-full">
        {panels[step] ?? <BrowserPanel submitting={false} />}
      </motion.div>
    </AnimatePresence>
  );
}

function LayerStack({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      {LAYERS.map((layer, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        return (
          <div key={layer.id} className={`flex items-center gap-2 border px-3 py-2 text-xs font-mono transition-all duration-300 ${isActive ? `${layer.color} shadow-sm` : isPast ? "border-zinc-200 bg-zinc-50 text-zinc-400" : "border-zinc-100 bg-white text-zinc-300"}`}>
            <span className="text-[10px] opacity-50 w-3 shrink-0">{i + 1}</span>
            <span className="truncate">{layer.label}</span>
            {isPast && <span className="ml-auto text-emerald-500 text-[10px] shrink-0">✓</span>}
            {isActive && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-auto text-[10px] shrink-0">●</motion.span>}
          </div>
        );
      })}
    </div>
  );
}

export default function JourneySim({ steps }: { steps: readonly JourneyStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  function handleAdvance() {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  }

  function handleReset() {
    setActiveIndex(0);
  }

  return (
    <div className="border border-zinc-200 bg-white">
      <div className="px-6 pt-6 pb-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-1">Request journey simulation</p>
        <p className="text-[11px] text-zinc-400">
          A student enrolls in CS 101. Watch the request travel through every layer.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_200px] min-h-[340px]">
        <div className="p-5 border-r border-zinc-100 min-h-[340px]">
          <StepPanel step={activeIndex} />
        </div>

        <div className="p-4 bg-zinc-50/60">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-3">System layers</p>
          <LayerStack activeIndex={activeIndex} />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-zinc-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-1">{active.description}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{active.whyItMatters}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50/40">
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdvance}
            className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            {activeIndex === steps.length - 1 ? "Restart" : "Next step"}
          </button>
          {activeIndex > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-300">
          {activeIndex + 1} / {steps.length}
        </span>
      </div>
    </div>
  );
}
