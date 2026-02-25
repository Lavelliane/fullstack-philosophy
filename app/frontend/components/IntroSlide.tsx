"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = 3;

export default function IntroSlide() {
  const [step, setStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<"backend" | "frontend" | null>(
    null
  );
  const isDone = step >= STEPS - 1;

  const handleNext = useCallback(() => {
    if (!isDone) setStep((s) => s + 1);
  }, [isDone]);

  const handlePrev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const handleStart = useCallback(() => {
    const el = document.getElementById("s1");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        if (isDone) handleStart();
        else handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step, isDone, handleNext, handlePrev, handleStart]);

  return (
    <section id="s0" style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-8 md:px-24 lg:px-32 relative"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        {/* Step content — one focal idea per view (click to advance) */}
        <div
          className="max-w-7xl cursor-pointer"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            if (isDone) handleStart();
            else handleNext();
          }}
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-mono mb-16">
                  Before we start
                </p>
                <h2
                  className="font-light text-zinc-900 leading-[1.15] tracking-tight"
                  style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
                >
                  What&apos;s the difference between software that{" "}
                  <span className="text-zinc-500">works</span>
                  <br />
                  and software that{" "}
                  <span className="text-zinc-900">matters</span>?
                </h2>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-mono mb-12">
                  Two sides of the same system
                </p>
                <div
                  className="grid grid-cols-2 gap-6"
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    onMouseEnter={() => setHoveredCard("backend")}
                    className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                      hoveredCard === "backend"
                        ? "border-zinc-400 bg-zinc-50"
                        : hoveredCard === "frontend"
                        ? "border-zinc-200 opacity-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Backend
                    </span>
                    <p className="mt-3 text-xl font-medium text-zinc-900">
                      Makes it work
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Logic, data, APIs
                    </p>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    onMouseEnter={() => setHoveredCard("frontend")}
                    className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                      hoveredCard === "frontend"
                        ? "border-zinc-400 bg-zinc-50"
                        : hoveredCard === "backend"
                        ? "border-zinc-200 opacity-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Frontend
                    </span>
                    <p className="mt-3 text-xl font-medium text-zinc-900">
                      Makes it matter
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Interface, behavior, humans
                    </p>
                  </button>
                </div>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key="2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs text-zinc-400 uppercase tracking-[0.2em] font-mono mb-12">
                  The frontend is where software speaks
                </p>
                <p
                  className="font-light text-zinc-700 leading-relaxed"
                  style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
                >
                  Every button is a decision.
                  <br />
                  Every loading state is a promise.
                  <br />
                  Every error message is a conversation.
                </p>
                <p className="mt-8 text-sm text-zinc-500 max-w-7xl">
                  In the next 30 minutes we&apos;ll unpack how frontends build that
                  connection: structure, state, and data flow. No prior
                  framework experience required.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions — fixed at bottom with space */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-24 lg:px-32 pb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isDone ? (
              <>
                <button
                  onClick={handleNext}
                  className="text-sm font-medium border border-zinc-900 px-5 py-2.5 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {step === 0 ? "Explore" : "Continue"}
                </button>
                {step > 0 && (
                  <button
                    onClick={handlePrev}
                    className="text-sm text-zinc-400 hover:text-zinc-600"
                  >
                    Back
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleStart}
                className="text-sm font-medium border border-zinc-900 px-5 py-2.5 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Start the discussion →
              </button>
            )}
          </div>
          <span className="text-[11px] text-zinc-300 font-mono">
            {!isDone ? `${step + 1}/${STEPS - 1} · space, enter, or →` : "or scroll"}
          </span>
        </div>
      </div>
    </section>
  );
}
