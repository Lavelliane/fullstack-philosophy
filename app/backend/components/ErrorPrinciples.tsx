"use client";

import { useState } from "react";

type Principle = {
  id: number;
  title: string;
  description: string;
};

type ErrorPrinciplesProps = {
  principles: Principle[];
};

export default function ErrorPrinciples({ principles }: ErrorPrinciplesProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="font-mono text-xs space-y-3">
      <p className="text-zinc-500 text-[11px] mb-4">
        Click each principle to read more. These fundamentals apply across all backend systems.
      </p>

      <div className="space-y-2">
        {principles.map((principle) => (
          <button
            key={principle.id}
            onClick={() => setSelected(selected === principle.id ? null : principle.id)}
            className={`w-full text-left border transition-all duration-200 ${
              selected === principle.id
                ? "border-zinc-800 bg-zinc-50"
                : "border-zinc-200 bg-white hover:border-zinc-400"
            }`}
          >
            <div className="px-4 py-3">
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${
                    selected === principle.id
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {principle.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold text-[11px] leading-tight ${
                      selected === principle.id ? "text-zinc-900" : "text-zinc-700"
                    }`}
                  >
                    {principle.title}
                  </div>
                  {selected === principle.id && (
                    <div className="mt-2 text-zinc-600 text-[10px] leading-relaxed">
                      {principle.description}
                    </div>
                  )}
                </div>
                <span className="text-zinc-400 text-[10px]">
                  {selected === principle.id ? "−" : "+"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800">
          <strong>Key takeaway:</strong> {principles.find((p) => p.id === selected)?.title}
        </div>
      )}
    </div>
  );
}
