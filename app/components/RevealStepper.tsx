"use client";

import { useState } from "react";

type Step = {
  title: string;
  content: string;
  code?: string;
  codeHtml?: string;
  /** Renders the frontend output of the code (what it looks like) */
  visual?: React.ReactNode;
};

type RevealStepperProps = {
  steps: Step[];
  prompt?: string;
};

export default function RevealStepper({ steps, prompt }: RevealStepperProps) {
  const [revealed, setRevealed] = useState(1);

  function handleNext() {
    setRevealed((prev) => Math.min(prev + 1, steps.length));
  }

  function handleReset() {
    setRevealed(1);
  }

  const isComplete = revealed === steps.length;

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
      {prompt && (
        <div className="px-6 pt-6">
          <p className="text-sm text-zinc-600 leading-relaxed">{prompt}</p>
        </div>
      )}

      <div className="flex flex-col p-6 pt-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isVisible = stepNumber <= revealed;
          const isLast = stepNumber === steps.length;

          return (
            <div
              key={index}
              className={`relative flex gap-5 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"}`}
            >
              {/* Timeline */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors duration-300 ${
                    isVisible
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 text-zinc-400"
                  }`}
                >
                  {stepNumber}
                </div>
                {!isLast && (
                  <div
                    className={`w-px flex-1 mt-1 mb-1 transition-colors duration-300 ${
                      stepNumber < revealed ? "bg-zinc-300" : "bg-zinc-100"
                    }`}
                    style={{ minHeight: "24px" }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-6 flex flex-col gap-3 flex-1 min-w-0 ${isLast ? "" : ""}`}>
                <p className="text-sm font-medium text-zinc-900 leading-tight">
                  {step.title}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {step.content}
                </p>
                {/* Code and visual side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-1">
                  {(step.codeHtml ?? step.code) && (
                    <div className="min-w-0">
                      {step.codeHtml ? (
                        <div
                          className="overflow-x-auto rounded border border-zinc-200 bg-[#f6f8fa] [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-4 [&_pre]:!text-xs [&_pre]:!leading-[1.75] [&_pre]:!font-mono [&_pre]:!whitespace-pre"
                          dangerouslySetInnerHTML={{ __html: step.codeHtml }}
                          suppressHydrationWarning
                        />
                      ) : (
                        <pre className="bg-zinc-50 border border-zinc-200 rounded px-4 py-3 text-xs font-mono text-zinc-600 leading-[1.75] overflow-x-auto whitespace-pre">
                          {step.code}
                        </pre>
                      )}
                    </div>
                  )}
                  {step.visual && (
                    <div className="min-w-0 flex-1">
                      {step.visual}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 border-t border-zinc-100 pt-4 px-6 pb-6">
        <span className="text-xs font-mono text-zinc-400 shrink-0">
          Step {revealed} of {steps.length}
        </span>
        {!isComplete ? (
          <button
            onClick={handleNext}
            className="text-xs font-medium border border-zinc-900 px-5 py-2.5 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            Next step →
          </button>
        ) : (
          <span className="text-xs text-emerald-600 font-medium">
            ✓ End-to-end complete
          </span>
        )}
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200 ml-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
