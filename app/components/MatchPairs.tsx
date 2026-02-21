"use client";

import { useState, useMemo } from "react";

type Pair = {
  left: string;
  right: string;
};

type MatchPairsProps = {
  pairs: Pair[];
  prompt: string;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchPairs({ pairs, prompt }: MatchPairsProps) {
  const leftItems = useMemo(() => pairs.map((p) => p.left), [pairs]);
  const rightItems = useMemo(() => shuffleArray(pairs.map((p) => p.right)), [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const connectedLeft = new Set(Object.keys(connections));
  const connectedRight = new Set(Object.values(connections));

  function handleLeftClick(left: string) {
    if (checked) return;
    if (selectedLeft === left) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(left);
  }

  function handleRightClick(right: string) {
    if (checked) return;
    if (!selectedLeft) return;

    setConnections((prev) => {
      const updated = { ...prev };
      const existingLeft = Object.keys(updated).find((k) => updated[k] === right);
      if (existingLeft) delete updated[existingLeft];
      updated[selectedLeft] = right;
      return updated;
    });
    setSelectedLeft(null);
  }

  function handleCheck() {
    setChecked(true);
  }

  function handleReset() {
    setConnections({});
    setSelectedLeft(null);
    setChecked(false);
  }

  function getPairStatus(left: string): "correct" | "wrong" | "neutral" {
    if (!checked) return "neutral";
    const matchedRight = connections[left];
    const correctRight = pairs.find((p) => p.left === left)?.right;
    return matchedRight === correctRight ? "correct" : "wrong";
  }

  function getRightStatus(right: string): "correct" | "wrong" | "neutral" | "selected" {
    if (!checked) {
      const leftForRight = Object.keys(connections).find((k) => connections[k] === right);
      if (leftForRight && selectedLeft === null) return "selected";
      return "neutral";
    }
    const leftForRight = Object.keys(connections).find((k) => connections[k] === right);
    if (!leftForRight) return "neutral";
    const correctRight = pairs.find((p) => p.left === leftForRight)?.right;
    return connections[leftForRight] === correctRight ? "correct" : "wrong";
  }

  function itemClasses(status: string, isActive: boolean) {
    const base = "px-4 py-3 text-xs border text-left transition-all duration-150 w-full";
    if (status === "correct") return `${base} border-emerald-500 bg-emerald-50 text-emerald-700`;
    if (status === "wrong") return `${base} border-red-400 bg-red-50 text-red-600`;
    if (isActive) return `${base} border-zinc-900 bg-zinc-900 text-white cursor-pointer`;
    return `${base} border-zinc-200 text-zinc-700 hover:border-zinc-400 cursor-pointer`;
  }

  const allConnected = connectedLeft.size === pairs.length;

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-zinc-900">{prompt}</p>
        <p className="text-xs text-zinc-400 mt-1">
          Click a left item, then click its match on the right.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {leftItems.map((left) => {
            const status = getPairStatus(left);
            const isActive = selectedLeft === left;
            const isConnected = connectedLeft.has(left);
            return (
              <button
                key={left}
                onClick={() => handleLeftClick(left)}
                disabled={checked}
                className={itemClasses(status, isActive)}
              >
                <span className="flex items-center gap-2">
                  {isConnected && !checked && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  )}
                  {left}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {rightItems.map((right) => {
            const status = getRightStatus(right);
            const isConnected = connectedRight.has(right);
            return (
              <button
                key={right}
                onClick={() => handleRightClick(right)}
                disabled={checked || !selectedLeft}
                className={itemClasses(status, false)}
              >
                <span className="flex items-center gap-2">
                  {isConnected && !checked && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                  )}
                  {right}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCheck}
          disabled={!allConnected}
          className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {allConnected ? "Check matches" : `Match all pairs first (${pairs.length - connectedLeft.size} left)`}
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {checked && (
        <div className="border-l-2 border-zinc-300 pl-4">
          <p className="text-xs text-zinc-500 leading-relaxed">
            {[...connectedLeft].every((l) => getPairStatus(l) === "correct")
              ? "Perfect. Every pattern matched to its correct purpose."
              : "Some pairs are off: the correct ones are highlighted green."}
          </p>
        </div>
      )}
    </div>
  );
}
