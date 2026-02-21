"use client";

import { useState } from "react";

type Segment =
  | string
  | {
      blank: string;
      options: string[];
      correct: string;
    };

type FillBlankProps = {
  segments: Segment[];
  prompt: string;
};

export default function FillBlank({ segments, prompt }: FillBlankProps) {
  const blanks = segments.filter((s): s is Exclude<Segment, string> => typeof s !== "string");

  const [selections, setSelections] = useState<Record<string, string>>(
    Object.fromEntries(blanks.map((b) => [b.blank, ""]))
  );
  const [checked, setChecked] = useState(false);

  function handleChange(blank: string, value: string) {
    setSelections((prev) => ({ ...prev, [blank]: value }));
    setChecked(false);
  }

  function handleCheck() {
    setChecked(true);
  }

  function handleReset() {
    setSelections(Object.fromEntries(blanks.map((b) => [b.blank, ""])));
    setChecked(false);
  }

  const allFilled = blanks.every((b) => selections[b.blank] !== "");
  const allCorrect = blanks.every((b) => selections[b.blank] === b.correct);

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-5">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{prompt}</p>

      <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-5 font-mono text-xs leading-[2] overflow-x-auto">
        {segments.map((segment, i) => {
          if (typeof segment === "string") {
            return (
              <span key={i} className="text-zinc-700 dark:text-zinc-300 whitespace-pre">
                {segment}
              </span>
            );
          }

          const selected = selections[segment.blank];
          let selectClass =
            "inline-block border-b mx-1 font-mono text-xs bg-transparent outline-none appearance-none cursor-pointer transition-colors duration-150 px-1";

          if (checked && selected) {
            selectClass +=
              selected === segment.correct
                ? " border-emerald-500 text-emerald-700"
                : " border-red-400 text-red-600";
          } else {
            selectClass += " border-zinc-400 dark:border-zinc-500 text-zinc-700 dark:text-zinc-300 hover:border-zinc-700 dark:hover:border-zinc-300 dark:bg-zinc-800";
          }

          return (
            <select
              key={i}
              value={selected}
              onChange={(e) => handleChange(segment.blank, e.target.value)}
              disabled={checked}
              className={selectClass}
            >
              <option value="" disabled>
                ___
              </option>
              {segment.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        })}
      </div>

      {checked && (
        <div className={`border-l-2 pl-4 ${allCorrect ? "border-emerald-500" : "border-red-400"}`}>
          <p className={`text-xs leading-relaxed ${allCorrect ? "text-emerald-600" : "text-red-500"}`}>
            {allCorrect
              ? "All blanks correct. The structure is clear."
              : "Some selections are off: wrong ones are highlighted in red."}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleCheck}
          disabled={!allFilled}
          className="text-xs font-medium border border-zinc-900 dark:border-zinc-400 px-4 py-2 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-900 dark:hover:bg-zinc-700 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {allFilled ? "Check answers" : "Fill all blanks first"}
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
