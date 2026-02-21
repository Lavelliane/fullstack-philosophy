"use client";

import { useState } from "react";

type Option = {
  id: string;
  label: string;
};

type QuizProps = {
  question: string;
  options: Option[];
  correctId: string;
  explanation: string;
  type?: "multiple-choice" | "true-false";
};

export default function Quiz({
  question,
  options,
  correctId,
  explanation,
}: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const revealed = selected !== null;

  function handleSelect(id: string) {
    if (revealed) return;
    setSelected(id);
  }

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-5">
      <p className="text-sm font-medium leading-relaxed text-zinc-900">
        {question}
      </p>

      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === correctId;

          let borderClass = "border-zinc-200 text-zinc-600";
          if (revealed) {
            if (isCorrect) borderClass = "border-emerald-500 text-emerald-700 bg-emerald-50";
            else if (isSelected && !isCorrect) borderClass = "border-red-400 text-red-600 bg-red-50";
            else borderClass = "border-zinc-100 text-zinc-400";
          } else {
            borderClass = "border-zinc-200 text-zinc-700 hover:border-zinc-400 cursor-pointer";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={revealed}
              className={`text-left border px-4 py-3 text-sm leading-relaxed transition-all duration-200 ${borderClass}`}
            >
              <span className="font-mono text-xs mr-3 opacity-50">{opt.id.toUpperCase()}</span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="border-l-2 border-zinc-300 pl-4">
          <p className="text-xs text-zinc-500 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
