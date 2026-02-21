"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STUDENTS = [
  { id: "42", name: "Ana Reyes" },
  { id: "88", name: "Bo Kim" },
  { id: "99", name: "Jay Patel" },
] as const;

const TABS = [
  { id: "grades", label: "Grades" },
  { id: "courses", label: "Courses" },
] as const;

type StepBrowserFrameProps = {
  initialId?: string;
  initialTab?: "grades" | "courses";
  interactive?: boolean;
  showProfileHeader?: boolean;
  /** Show Student ID / Tab controls (for route/data steps); hide for fetch/loading/error */
  showUrlControls?: boolean;
  /** "route" = route matched placeholder, "tab" = grades/courses, "custom" = children */
  contentMode?: "route" | "tab" | "custom";
  children?: React.ReactNode;
};

export default function StepBrowserFrame({
  initialId = "42",
  initialTab = "grades",
  interactive = true,
  showProfileHeader = true,
  showUrlControls = true,
  contentMode = "custom",
  children,
}: StepBrowserFrameProps) {
  const [id, setId] = useState(initialId);
  const [tab, setTab] = useState<"grades" | "courses">(initialTab ?? "grades");

  const url = `https://www.portal.edu.ph/students/${id}${tab ? `?tab=${tab}` : ""}`;

  return (
    <div className="flex flex-col w-full border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm min-h-[180px]">
      {/* Browser chrome */}
      <div className="px-3 py-2 border-b border-zinc-100 bg-zinc-50 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1.5 bg-white rounded border border-zinc-200 text-xs font-mono text-zinc-500 truncate">
          {url}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        {showUrlControls && (
        <div className="mb-4">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Change URL → component re-renders with new params
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 font-mono">Student ID</span>
              <div className="flex gap-1">
                {STUDENTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => interactive && setId(s.id)}
                    disabled={!interactive}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${interactive ? "cursor-pointer" : "cursor-default"} ${
                      id === s.id
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 font-mono">Tab (?tab=)</span>
              <div className="flex gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => interactive && setTab(t.id)}
                    disabled={!interactive}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${interactive ? "cursor-pointer" : "cursor-default"} ${
                      tab === t.id
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Rendered page content (like a real page) */}
        <div className={`min-h-[180px] ${showUrlControls ? "border-t border-zinc-100 pt-3" : ""}`}>
          {showProfileHeader && contentMode !== "route" && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-mono font-semibold text-zinc-600 shrink-0">
                {STUDENTS.find((s) => s.id === id)?.name[0] ?? "?"}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">
                  {STUDENTS.find((s) => s.id === id)?.name ?? `Student #${id}`}
                </p>
                <p className="text-xs text-zinc-500">
                  Year 3 · GPA 3.9 · Refresh, share, or go back — URL preserves this.
                </p>
              </div>
            </div>
          )}
          <div className={showProfileHeader && contentMode !== "route" ? "mt-2" : ""}>
            {contentMode === "route" ? (
              <div className="text-xs font-mono text-zinc-600 space-y-1">
                <p>Route matched → <span className="text-zinc-900">{"<StudentProfile />"}</span> mounts</p>
                <p className="text-zinc-500">useParams() → id = &quot;{id}&quot;</p>
              </div>
            ) : contentMode === "tab" ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-zinc-600 space-y-1"
                >
                  {tab === "grades" && (
                    <>
                      <p>Intro to React: A</p>
                      <p>Data Structures: B+</p>
                    </>
                  )}
                  {tab === "courses" && (
                    <>
                      <p>CS 101 · Intro to React</p>
                      <p>CS 202 · Data Structures</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full min-w-0">{children}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
