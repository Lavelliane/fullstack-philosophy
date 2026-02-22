"use client";

import { useState, useRef, useEffect } from "react";
import { useScoreStore } from "../store/scoreStore";

type Item = {
  id: string;
  label: string;
};

type DragSortProps = {
  items: Item[];
  correctOrder: string[];
  prompt: string;
  scoreId?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DragSort({ items, correctOrder, prompt, scoreId }: DragSortProps) {
  const [order, setOrder] = useState<Item[]>(() => [...items]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => {
    setOrder(shuffle(items));
  }, [items]);

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    const from = dragIndex.current;
    if (from === null || from === index) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(index, 0, moved);
    dragIndex.current = index;
    setOrder(newOrder);
    setChecked(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragIndex.current = null;
  }

  function handleCheck() {
    const isCorrect = order.map((i) => i.id).join(",") === correctOrder.join(",");
    setCorrect(isCorrect);
    setChecked(true);
    if (scoreId) {
      useScoreStore.getState().recordAnswer(scoreId, isCorrect);
    }
  }

  function handleReset() {
    setOrder(shuffle(items));
    setChecked(false);
    setCorrect(false);
  }

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-5">
      <p className="text-sm font-medium text-zinc-900">{prompt}</p>

      <div className="flex flex-col gap-2">
        {order.map((item, index) => {
          let itemClass =
            "flex items-center gap-3 border px-4 py-3 text-sm cursor-grab select-none transition-all duration-200";

          if (checked) {
            const isCorrectPos = item.id === correctOrder[index];
            itemClass += isCorrectPos
              ? " border-emerald-500 bg-emerald-50 text-emerald-700"
              : " border-red-400 bg-red-50 text-red-600";
          } else {
            itemClass += " border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white";
          }

          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={handleDrop}
              className={itemClass}
            >
              <span className="font-mono text-xs text-zinc-300 w-4 text-center select-none">
                ⠿
              </span>
              <span className="font-mono text-xs text-zinc-400 w-4">{index + 1}.</span>
              {item.label}
            </div>
          );
        })}
      </div>

      {checked && (
        <div className={`border-l-2 pl-4 ${correct ? "border-emerald-500" : "border-red-400"}`}>
          <p className={`text-xs leading-relaxed ${correct ? "text-emerald-600" : "text-red-500"}`}>
            {correct
              ? "Correct. That's the exact order requests flow through a backend."
              : "Not quite: drag to reorder and try again."}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleCheck}
          className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
        >
          Check order
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
