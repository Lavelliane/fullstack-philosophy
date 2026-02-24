"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Play } from "lucide-react";

type Step = "idle" | "navigating" | "loading" | "page1" | "page2" | "page3";

const DELAY_NAVIGATE_MS = 450;
const DELAY_LOADING_MS = 900;

/** Page 1: Home, Page 2: Students, Page 3: Student Profile — 2 navigations to show 2 pages changed */
function PageContent({ page }: { page: 1 | 2 | 3 }) {
  if (page === 1) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-800">Home</p>
        <p className="text-base text-zinc-500">Welcome to the portal.</p>
        <button className="text-base text-blue-600 hover:underline font-medium">Students →</button>
      </div>
    );
  }
  if (page === 2) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-800">Students</p>
        <ul className="space-y-1 text-base text-zinc-600">
          <li>Ana Reyes · GPA 3.9</li>
          <li>Bo Kim · GPA 3.6</li>
          <li>Jay Patel · GPA 3.2</li>
        </ul>
        <button className="text-base text-blue-600 hover:underline font-medium">View Ana →</button>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-800">Ana Reyes</p>
      <p className="text-base text-zinc-600">Year 3 · GPA 3.9</p>
      <p className="text-base text-zinc-500">Profile loaded. Nav never reloaded.</p>
    </div>
  );
}

export default function TraditionalVsSpaFlow() {
  const [traditionalStep, setTraditionalStep] = useState<Step>("idle");
  const [spaStep, setSpaStep] = useState<Step>("idle");
  const [isRunning, setIsRunning] = useState(false);

  async function runComparison() {
    if (isRunning) return;
    setIsRunning(true);
    setTraditionalStep("idle");
    setSpaStep("idle");
    await new Promise((r) => setTimeout(r, 500));

    // Transition 1: Home → Students
    setTraditionalStep("navigating");
    setSpaStep("page2");
    await new Promise((r) => setTimeout(r, DELAY_NAVIGATE_MS));

    setTraditionalStep("loading");
    await new Promise((r) => setTimeout(r, DELAY_LOADING_MS));

    setTraditionalStep("page2");
    await new Promise((r) => setTimeout(r, 1200)); // Pause on Students page

    // Transition 2: Students → Student Profile
    setTraditionalStep("navigating");
    setSpaStep("page3");
    await new Promise((r) => setTimeout(r, DELAY_NAVIGATE_MS));

    setTraditionalStep("loading");
    await new Promise((r) => setTimeout(r, DELAY_LOADING_MS));

    setTraditionalStep("page3");
    await new Promise((r) => setTimeout(r, 1200)); // Pause on Profile page
    setIsRunning(false);
  }

  function handleReset() {
    setTraditionalStep("idle");
    setSpaStep("idle");
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={runComparison}
          disabled={isRunning}
          className="flex items-center gap-2 text-base font-medium px-4 py-2.5 border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          <Play className="w-3.5 h-3.5" />
          Run comparison
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 text-base text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        <span className="text-base text-zinc-400 font-mono ml-2">
          Home → Students → Profile (2 page changes)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traditional */}
        <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-zinc-100 bg-zinc-50">
            <p className="text-base font-mono uppercase tracking-wider text-zinc-600">
              Traditional — full page reload
            </p>
          </div>
          <div className="relative min-h-[220px] bg-white">
            <AnimatePresence mode="wait">
              {traditionalStep === "idle" && (
                <motion.div
                  key="t-idle"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  <div className="flex items-center gap-2 px-3 py-2 mb-3 bg-zinc-100 rounded text-base font-mono text-zinc-600 w-fit border border-zinc-200">
                    Nav bar (reloads with page)
                  </div>
                  <PageContent page={1} />
                </motion.div>
              )}
              {traditionalStep === "navigating" && (
                <motion.div
                  key="t-nav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-zinc-50"
                >
                  <p className="text-base text-zinc-400 font-mono">Discarding page...</p>
                </motion.div>
              )}
              {traditionalStep === "loading" && (
                <motion.div
                  key="t-load"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white"
                >
                  <div className="w-24 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-zinc-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-base text-zinc-500 font-mono">Fetching new HTML document</p>
                </motion.div>
              )}
              {(traditionalStep === "page2" || traditionalStep === "page3") && (
                <motion.div
                  key={`t-${traditionalStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="p-4"
                >
                  <div className="flex items-center gap-2 px-3 py-2 mb-3 bg-zinc-100 rounded text-base font-mono text-zinc-600 w-fit border border-zinc-200">
                    Nav bar (reloaded)
                  </div>
                  <PageContent page={traditionalStep === "page2" ? 2 : 3} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SPA */}
        <div className="border-2 border-emerald-200 rounded-lg overflow-hidden bg-emerald-50/20 shadow-sm">
          <div className="px-4 py-2.5 border-b border-emerald-100 bg-emerald-100/50">
            <p className="text-base font-mono uppercase tracking-wider text-emerald-700">
              SPA — in-place swap
            </p>
          </div>
          <div className="relative min-h-[220px] bg-white">
            {/* Nav stays fixed (never reloads) */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-emerald-100 bg-emerald-50/50">
              <span className="text-base font-mono text-emerald-600 font-medium">Nav bar (persists)</span>
            </div>

            <AnimatePresence mode="wait">
              {spaStep === "idle" && (
                <motion.div
                  key="s-idle"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  <PageContent page={1} />
                </motion.div>
              )}
              {(spaStep === "page2" || spaStep === "page3") && (
                <motion.div
                  key={`s-${spaStep}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="p-4"
                >
                  <PageContent page={spaStep === "page2" ? 2 : 3} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-zinc-500">
        <p>
          <strong className="text-zinc-700">Traditional:</strong> 2 navigations = 2 full reloads. Each page change: unmount → fetch HTML → re-render. Nav, scripts, styles reload every time.
        </p>
        <p>
          <strong className="text-emerald-700">SPA:</strong> Nav stays. 2 content swaps, no reloads. JavaScript intercepts clicks and mounts components in-place.
        </p>
      </div>
    </div>
  );
}
