"use client";

import { useState } from "react";

type Item = {
  id: string;
  label: string;
};

type Bucket = {
  id: string;
  label: string;
};

type DragBucketProps = {
  items: Item[];
  buckets: Bucket[];
  correctMapping: Record<string, string>;
  prompt: string;
};

type BucketState = Record<string, string[]>;

export default function DragBucket({
  items,
  buckets,
  correctMapping,
  prompt,
}: DragBucketProps) {
  const [pool, setPool] = useState<Item[]>(items);
  const [bucketContents, setBucketContents] = useState<BucketState>(() =>
    Object.fromEntries(buckets.map((b) => [b.id, []]))
  );
  const [dragging, setDragging] = useState<{ id: string; from: string | "pool" } | null>(null);
  const [checked, setChecked] = useState(false);

  function handleDragStart(itemId: string, from: string | "pool") {
    setDragging({ id: itemId, from });
    setChecked(false);
  }

  function handleDropOnBucket(e: React.DragEvent, bucketId: string) {
    e.preventDefault();
    if (!dragging) return;

    const itemId = dragging.id;
    const from = dragging.from;

    if (from === bucketId) return;

    if (from === "pool") {
      setPool((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setBucketContents((prev) => ({
        ...prev,
        [from]: prev[from].filter((id) => id !== itemId),
      }));
    }

    setBucketContents((prev) => ({
      ...prev,
      [bucketId]: [...prev[bucketId], itemId],
    }));

    setDragging(null);
  }

  function handleDropOnPool(e: React.DragEvent) {
    e.preventDefault();
    if (!dragging) return;

    const itemId = dragging.id;
    const from = dragging.from;

    if (from === "pool") return;

    setBucketContents((prev) => ({
      ...prev,
      [from]: prev[from].filter((id) => id !== itemId),
    }));
    const item = items.find((i) => i.id === itemId)!;
    setPool((prev) => [...prev, item]);
    setDragging(null);
  }

  function handleCheck() {
    setChecked(true);
  }

  function handleReset() {
    setPool(items);
    setBucketContents(Object.fromEntries(buckets.map((b) => [b.id, []])));
    setChecked(false);
  }

  function getItemById(id: string) {
    return items.find((i) => i.id === id)!;
  }

  function getItemStatus(itemId: string, bucketId: string): "correct" | "wrong" | "neutral" {
    if (!checked) return "neutral";
    return correctMapping[itemId] === bucketId ? "correct" : "wrong";
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-6">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{prompt}</p>

      {/* Pool */}
      {pool.length > 0 && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPool}
          className="flex flex-wrap gap-2 min-h-[48px] border border-dashed border-zinc-200 dark:border-zinc-700 p-3"
        >
          {pool.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id, "pool")}
              className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200 cursor-grab select-none hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors duration-150"
            >
              {item.label}
            </div>
          ))}
          {pool.length === 0 && (
            <span className="text-xs text-zinc-300 dark:text-zinc-600 self-center">
              All items placed
            </span>
          )}
        </div>
      )}

      {/* Buckets */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${buckets.length}, minmax(0, 1fr))` }}
      >
        {buckets.map((bucket) => (
          <div key={bucket.id} className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-700 pb-2">
              {bucket.label}
            </span>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnBucket(e, bucket.id)}
              className="flex flex-col gap-2 min-h-[80px] border border-dashed border-zinc-200 dark:border-zinc-700 p-2"
            >
              {bucketContents[bucket.id].map((itemId) => {
                const status = getItemStatus(itemId, bucket.id);
                let cls =
                  "px-3 py-2 text-xs cursor-grab select-none border transition-colors duration-150";
                if (status === "correct")
                  cls += " border-emerald-500 bg-emerald-50 text-emerald-700";
                else if (status === "wrong")
                  cls += " border-red-400 bg-red-50 text-red-600";
                else
                  cls += " border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-400";

                return (
                  <div
                    key={itemId}
                    draggable
                    onDragStart={() => handleDragStart(itemId, bucket.id)}
                    className={cls}
                  >
                    {getItemById(itemId).label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCheck}
          disabled={pool.length > 0}
          className="text-xs font-medium border border-zinc-900 dark:border-zinc-400 px-4 py-2 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-900 dark:hover:bg-zinc-700 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {pool.length > 0 ? `Place all items first (${pool.length} left)` : "Check answers"}
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {checked && (
        <div className="border-l-2 border-zinc-300 dark:border-zinc-600 pl-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {Object.entries(correctMapping).every(
              ([itemId, bucketId]) => bucketContents[bucketId]?.includes(itemId)
            )
              ? "All correct. Each piece belongs exactly where you placed it."
              : "Some items are misplaced: highlighted in red. Drag them to try again."}
          </p>
        </div>
      )}
    </div>
  );
}
