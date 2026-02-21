"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, RotateCcw, UserPlus, LogIn } from "lucide-react";
import type { AuthFlowStep } from "../backend/data";

type Tab = "register" | "login";

type AuthFlowDiagramProps = {
  registerSteps: AuthFlowStep[];
  loginSteps: AuthFlowStep[];
};

const STEP_COLORS: Record<string, { dot: string; badge: string; text: string }> = {
  Client:     { dot: "bg-zinc-900",    badge: "bg-zinc-900 text-white",    text: "text-zinc-900" },
  Controller: { dot: "bg-indigo-500",  badge: "bg-indigo-50 text-indigo-700 border border-indigo-200", text: "text-indigo-700" },
  Service:    { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 border border-violet-200", text: "text-violet-700" },
  Repository: { dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border border-amber-200",   text: "text-amber-700" },
  Response:   { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", text: "text-emerald-700" },
};

function getColor(label: string) {
  return STEP_COLORS[label] ?? { dot: "bg-zinc-400", badge: "bg-zinc-50 text-zinc-700 border border-zinc-200", text: "text-zinc-700" };
}

export default function AuthFlowDiagram({ registerSteps, loginSteps }: AuthFlowDiagramProps) {
  const [tab, setTab] = useState<Tab>("register");
  const [revealed, setRevealed] = useState(1);

  const steps = tab === "register" ? registerSteps : loginSteps;
  const isComplete = revealed === steps.length;

  function handleTabChange(next: Tab) {
    setTab(next);
    setRevealed(1);
  }

  function handleNext() {
    setRevealed((p) => Math.min(p + 1, steps.length));
  }

  function handleReset() {
    setRevealed(1);
  }

  return (
    <div className="border border-zinc-200">
      {/* Tab bar */}
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => handleTabChange("register")}
          className={`flex items-center gap-2 px-5 py-3.5 text-xs font-medium transition-colors duration-150 border-r border-zinc-200 ${
            tab === "register"
              ? "bg-zinc-900 text-white"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          Registration flow
        </button>
        <button
          onClick={() => handleTabChange("login")}
          className={`flex items-center gap-2 px-5 py-3.5 text-xs font-medium transition-colors duration-150 ${
            tab === "login"
              ? "bg-zinc-900 text-white"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          Login flow
        </button>
        <div className="ml-auto flex items-center px-4">
          <span className="text-[10px] font-mono text-zinc-300">
            {revealed}/{steps.length}
          </span>
        </div>
      </div>

      {/* Flow steps */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {steps.map((step, index) => {
              const stepNum = index + 1;
              const isVisible = stepNum <= revealed;
              const isLast = stepNum === steps.length;
              const color = getColor(step.label);

              return (
                <AnimatePresence key={step.id}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="relative flex gap-4"
                    >
                      {/* Timeline column */}
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${color.dot}`}
                        >
                          <span className="text-[9px] font-mono text-white font-bold">
                            {stepNum}
                          </span>
                        </div>
                        {!isLast && (
                          <div
                            className="w-px bg-zinc-200 mt-1"
                            style={{ minHeight: "20px", flex: 1 }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-6 flex flex-col gap-2 w-full ${isLast ? "pb-0" : ""}`}>
                        {/* Node label */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm ${color.badge}`}
                          >
                            {step.label}
                          </span>
                          <ChevronRight className="w-3 h-3 text-zinc-300" />
                          <span className="text-xs text-zinc-500">{step.sublabel}</span>
                        </div>

                        {/* Code */}
                        <pre className="bg-zinc-50 border border-zinc-200 px-4 py-3 text-[11px] font-mono text-zinc-700 leading-[1.7] overflow-x-auto whitespace-pre">
                          {step.code}
                        </pre>

                        {/* Note */}
                        <p className="text-[11px] text-zinc-400 leading-relaxed border-l-2 border-zinc-200 pl-3">
                          {step.note}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 border-t border-zinc-100 px-6 py-4">
        {!isComplete ? (
          <button
            onClick={handleNext}
            className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            Next step →
          </button>
        ) : (
          <span className="text-xs text-emerald-600 font-medium">
            {tab === "register" ? "Registration flow complete." : "Login flow complete."}
          </span>
        )}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>
  );
}
