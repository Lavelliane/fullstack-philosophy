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
    <div className="border border-zinc-200 p-6 flex flex-col gap-6">
      {prompt && (
        <p className="text-sm font-medium text-zinc-900">{prompt}</p>
      )}

      <div className="flex flex-col">
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
              <div className={`pb-6 flex flex-col gap-1 ${isLast ? "" : ""}`}>
                <p className="text-sm font-medium text-zinc-900 leading-tight">
                  {step.title}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                  {step.content}
                </p>
                {(step.codeHtml ?? step.code) && (
                  step.codeHtml ? (
                    <div
                      className="mt-2 overflow-x-auto rounded-none border border-zinc-200 bg-[#f6f8fa] [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-4 [&_pre]:!text-xs [&_pre]:!leading-[1.75] [&_pre]:!font-mono [&_pre]:!whitespace-pre"
                      dangerouslySetInnerHTML={{ __html: step.codeHtml }}
                      suppressHydrationWarning
                    />
                  ) : (
                    <pre className="mt-2 bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs font-mono text-zinc-600 leading-[1.75] overflow-x-auto whitespace-pre">
                      {step.code}
                    </pre>
                  )
                )}
                {step.visual && (
                  <div className="mt-3 border border-zinc-200 rounded-lg bg-white p-3 flex flex-col items-center justify-center">
                    {step.visual}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-100 pt-4">
        {!isComplete ? (
          <button
            onClick={handleNext}
            className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            Next step →
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-600 font-medium">
              End-to-end complete.
            </span>
          </div>
        )}
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-zinc-300 font-mono">
          {revealed}/{steps.length}
        </span>
      </div>
    </div>
  );
}
