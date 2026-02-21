"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ROUTES = [
  { url: "/", component: "Home", note: "welcome" },
  { url: "/students", component: "StudentList", note: "all students" },
  { url: "/students/42", component: "StudentProfile", note: "Ana Reyes · GPA 3.9" },
  { url: "/students/99", component: "StudentProfile", note: "student not found" },
  { url: "/missing-route", component: "NotFound", note: "catch-all" },
] as const;

type RouteUrl = (typeof ROUTES)[number]["url"];

// ─── Sample page components ────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (url: RouteUrl) => void }) {
  return (
    <div className="space-y-3 p-4">
      <h1 className="text-base font-semibold text-zinc-900">Student Portal</h1>
      <p className="text-xs text-zinc-600 leading-relaxed">
        Welcome! Browse students or view your dashboard.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onNavigate("/students")}
          className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Students →
        </button>
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="text-xs text-zinc-500 hover:underline cursor-pointer"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

const SAMPLE_STUDENTS = [
  { id: 42, name: "Ana Reyes", year: 3, gpa: 3.9 },
  { id: 88, name: "Bo Kim", year: 2, gpa: 3.6 },
  { id: 15, name: "Jay Patel", year: 4, gpa: 3.2 },
];

function StudentListPage({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="space-y-2 p-4">
      <h1 className="text-base font-semibold text-zinc-900">Students</h1>
      <ul className="space-y-1">
        {SAMPLE_STUDENTS.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className="flex w-full items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-100 text-left transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-mono shrink-0">
                {s.name[0]}
              </span>
              <span className="text-xs font-medium text-zinc-800">{s.name}</span>
              <span className="text-[10px] text-zinc-400 ml-auto">GPA {s.gpa}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StudentProfilePage({ id, onBack }: { id: string; onBack: () => void }) {
  // id 99 = demo for "student not found" (invalid/deleted student)
  const student = id === "99" ? null : SAMPLE_STUDENTS.find((s) => s.id === Number(id));
  if (!student) {
    return (
      <div className="p-4 space-y-2">
        <h1 className="text-base font-semibold text-zinc-900">Student #{id}</h1>
        <p className="text-xs text-red-600">Student not found.</p>
        <button
          type="button"
          onClick={onBack}
          className="text-[10px] border border-red-200 px-2 py-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
        >
          Back to list
        </button>
      </div>
    );
  }
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-mono font-semibold text-zinc-600">
          {student.name[0]}
        </div>
        <div>
          <h1 className="text-base font-semibold text-zinc-900">{student.name}</h1>
          <p className="text-[10px] text-zinc-500">Year {student.year} · GPA {student.gpa}</p>
        </div>
      </div>
      <div className="border-t border-zinc-100 pt-2 space-y-1">
        <p className="text-[10px] text-zinc-500">Courses: Intro to React, Data Structures</p>
        <button
          type="button"
          onClick={onBack}
          className="text-[10px] border border-zinc-200 px-2 py-0.5 rounded text-zinc-600 hover:bg-zinc-50 cursor-pointer"
        >
          ← Back to list
        </button>
      </div>
    </div>
  );
}

function NotFoundPage({ onHome }: { onHome: () => void }) {
  return (
    <div className="p-4 space-y-3 text-center">
      <p className="text-2xl font-light text-zinc-400">404</p>
      <h1 className="text-base font-semibold text-zinc-900">Page not found</h1>
      <p className="text-xs text-zinc-500">
        The URL you requested doesn&apos;t match any route.
      </p>
      <button
        type="button"
        onClick={onHome}
        className="text-[10px] border border-zinc-200 px-2 py-1 rounded text-zinc-600 hover:bg-zinc-50 cursor-pointer"
      >
        Go home
      </button>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function RoutePreviewDemo() {
  const [selectedUrl, setSelectedUrl] = useState<RouteUrl>("/students/42");

  const urlForPreview = selectedUrl.startsWith("/students/")
    ? selectedUrl
    : selectedUrl === "/"
      ? "/"
      : selectedUrl;

  function renderPage() {
    if (selectedUrl === "/") return <HomePage onNavigate={setSelectedUrl} />;
    if (selectedUrl === "/students")
      return <StudentListPage onSelect={(id) => setSelectedUrl(`/students/${id}` as RouteUrl)} />;
    if (selectedUrl.startsWith("/students/")) {
      const id = selectedUrl.split("/")[2] ?? "42";
      return (
        <StudentProfilePage
          id={id}
          onBack={() => setSelectedUrl("/students")}
        />
      );
    }
    return <NotFoundPage onHome={() => setSelectedUrl("/")} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Route list - clickable */}
      <div className="flex flex-col gap-1 shrink-0">
        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
          Click a route to preview
        </p>
        {ROUTES.map(({ url, component, note }) => (
          <button
            key={url}
            type="button"
            onClick={() => setSelectedUrl(url)}
            className={`flex items-start gap-3 px-3 py-2.5 border text-left text-xs font-mono rounded transition-colors cursor-pointer hover:border-zinc-400 ${
              selectedUrl === url
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white text-zinc-500"
            }`}
          >
            <span className="shrink-0 w-36 truncate">{url}</span>
            <span className={selectedUrl === url ? "text-zinc-400" : "text-zinc-300"}>→</span>
            <span className={`shrink-0 ${selectedUrl === url ? "text-white font-medium" : "text-zinc-600"}`}>
              {component}
            </span>
            <span className={`text-[10px] not-italic ${selectedUrl === url ? "text-zinc-400" : "text-zinc-400"}`}>
              {note}
            </span>
          </button>
        ))}
      </div>

      {/* Mini browser preview */}
      <div className="flex-1 min-w-0 flex flex-col border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="px-3 py-2 border-b border-zinc-100 bg-zinc-50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
          </div>
          <div className="flex-1 mx-2 px-3 py-1 bg-white rounded border border-zinc-200 text-[10px] font-mono text-zinc-500 truncate">
            {urlForPreview}
          </div>
        </div>
        <div className="min-h-[180px] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUrl}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
