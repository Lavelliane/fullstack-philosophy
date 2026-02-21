"use client";

import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";

type CodeOption = {
  id: string;
  label: string;
};

type CodeQuizProps = {
  question: string;
  options: CodeOption[];
  correctId: string;
  explanation: string;
};

function HighlightedCode({ code }: { code: string }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    codeToHtml(code, { lang: "typescript", themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }).then(setHtml);
  }, [code]);

  if (!html) {
    return (
      <pre className="text-xs font-mono leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre overflow-x-auto p-4 bg-zinc-50 dark:bg-zinc-800">
        {code}
      </pre>
    );
  }

  return (
    <div
      className="shiki-no-bg w-full overflow-x-auto [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!p-4 [&_pre]:!text-xs [&_pre]:!leading-[1.85] [&_pre]:!font-mono [&_pre]:!whitespace-pre"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}

export default function CodeQuiz({
  question,
  options,
  correctId,
  explanation,
}: CodeQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const revealed = selected !== null;

  function handleSelect(id: string) {
    if (revealed) return;
    setSelected(id);
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-5">
      <p className="text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">{question}</p>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === correctId;

          let borderClass = "border-zinc-200";
          let labelColor = "text-zinc-400";
          if (revealed) {
            if (isCorrect) {
              borderClass = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
              labelColor = "text-emerald-600 dark:text-emerald-400";
            } else if (isSelected && !isCorrect) {
              borderClass = "border-red-300 bg-red-50 dark:bg-red-950/40";
              labelColor = "text-red-400";
            } else {
              borderClass = "border-zinc-100 dark:border-zinc-800";
              labelColor = "text-zinc-300 dark:text-zinc-600";
            }
          } else {
            borderClass = "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer";
            labelColor = "text-zinc-400 dark:text-zinc-500";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={revealed}
              className={`text-left border transition-all duration-200 ${borderClass}`}
            >
              <div className={`px-3 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest ${labelColor}`}>
                {opt.id.toUpperCase()}
              </div>
              <div className={`${revealed && !isCorrect && !isSelected ? "opacity-40" : ""}`}>
                <HighlightedCode code={opt.label} />
              </div>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="border-l-2 border-zinc-300 dark:border-zinc-600 pl-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
