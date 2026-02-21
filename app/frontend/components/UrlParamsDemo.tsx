"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TABS = [
  { id: "grades", label: "Grades" },
  { id: "courses", label: "Courses" },
] as const;

const STUDENTS = [
  { id: "42", name: "Ana Reyes" },
  { id: "88", name: "Bo Kim" },
  { id: "99", name: "Jay Patel" },
] as const;

export default function UrlParamsDemo() {
  const [id, setId] = useState("42");
  const [tab, setTab] = useState<"grades" | "courses">("grades");

  const url = `https://www.portal.edu.ph/students/${id}?tab=${tab}`;

  return (
    <div className="flex flex-col w-full h-fit">
      {/* Mini browser chrome */}
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

      {/* Page content: student profile + tab content */}
      <div className="p-4 space-y-4 shrink-0">
        <div>
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
                    onClick={() => setId(s.id)}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
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
                    onClick={() => setTab(t.id)}
                    className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
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

        {/* Simulated profile content based on params */}
        <div className="border-t border-zinc-100 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-mono font-semibold text-zinc-600">
              {STUDENTS.find((s) => s.id === id)?.name[0] ?? "?"}
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">
                {STUDENTS.find((s) => s.id === id)?.name ?? `Student #${id}`}
              </p>
              <p className="text-xs text-zinc-500">Refresh, share, or go back — URL preserves this.</p>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
