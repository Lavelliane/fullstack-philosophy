"use client";

import { useState } from "react";
import CodeBlock from "../../components/CodeBlock";

type Implementation = {
  id: string;
  name: string;
  sub: string;
  color: string;
  result: string;
  internal: string;
};

const implementations: Implementation[] = [
  {
    id: "postgres",
    name: "PostgresDB",
    sub: "production",
    color: "border-blue-300 bg-blue-50 text-blue-800",
    result: `{
  id: 42,
  status: "pending",
  total: 99.00
}`,
    internal: `// PostgresDB.save()
const query = "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *";
return await this.pool.query(query, [dto.userId, dto.total]);`,
  },
  {
    id: "mock",
    name: "MockDB",
    sub: "unit tests",
    color: "border-emerald-300 bg-emerald-50 text-emerald-800",
    result: `{
  id: 1,
  status: "pending",
  total: 99.00
}`,
    internal: `// MockDB.save()
// No real DB needed
return {
  id: 1,
  ...dto,
  createdAt: new Date().toISOString()
};`,
  },
  {
    id: "inmemory",
    name: "InMemoryDB",
    sub: "integration tests",
    color: "border-amber-300 bg-amber-50 text-amber-800",
    result: `{
  id: 3,
  status: "pending",
  total: 99.00
}`,
    internal: `// InMemoryDB.save()
const order = {
  id: this.store.length + 1,
  ...dto,
  createdAt: new Date().toISOString()
};
this.store.push(order);
return order;`,
  },
];

export default function DISwitchboard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [ran, setRan] = useState(false);

  const impl = implementations.find((i) => i.id === selected) ?? null;

  function handleRun() {
    if (selected) setRan(true);
  }

  function handleSelect(id: string) {
    setSelected(id);
    setRan(false);
  }

  return (
    <div className="font-mono text-xs">
      <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mb-6 leading-relaxed">
        <strong className="text-zinc-700 dark:text-zinc-300">OrderService</strong> has a dependency slot for a database.
        Click an implementation to plug it in, then call{" "}
        <code className="bg-zinc-100 dark:bg-zinc-700 px-1">create()</code> to see what happens.
        The service code never changes.
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* ── Left: implementations ───────────────────────────────────── */}
        <div className="flex flex-col gap-3 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-1">
            Pick an implementation
          </p>
          {implementations.map((i) => (
            <button
              key={i.id}
              onClick={() => handleSelect(i.id)}
              className={`border px-4 py-3 text-left transition-all duration-150 w-48 ${
                selected === i.id
                  ? i.color + " ring-2 ring-offset-1 ring-zinc-400"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500"
              }`}
            >
              <div className="font-semibold text-[11px]">{i.name}</div>
              <div className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">{i.sub}</div>
            </button>
          ))}
        </div>

        {/* ── Center: OrderService ─────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-1">
            OrderService
          </p>
          <div className="border-2 border-zinc-800 dark:border-zinc-500 bg-white dark:bg-zinc-800 w-full max-w-xs">
            <div className="bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-800 dark:border-zinc-600 px-4 py-2 text-center">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-[11px]">OrderService</div>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              <div className="text-zinc-500 dark:text-zinc-400">
                - db:{" "}
                {impl ? (
                  <span className={`px-1.5 py-0.5 text-[10px] border ${impl.color}`}>
                    {impl.name}
                  </span>
                ) : (
                  <span className="border border-dashed border-zinc-300 dark:border-zinc-600 px-2 py-0.5 text-zinc-300 dark:text-zinc-600">
                    IDatabase ← plug in
                  </span>
                )}
              </div>
              <div className="text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-700 pt-2 mt-1">
                + create(dto): OrderDTO
              </div>
            </div>
          </div>

          {/* ── Run button ──────────────────────────────────────────────── */}
          <button
            onClick={handleRun}
            disabled={!selected}
            className={`mt-2 w-full max-w-xs px-4 py-2 text-[11px] font-semibold transition-all duration-150 ${
              selected
                ? "bg-zinc-900 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            Call create(dto) →
          </button>
        </div>

        {/* ── Right: output ───────────────────────────────────────────── */}
        <div className="flex-1 w-full">
          <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-2">
            What happens inside
          </p>
          {ran && impl ? (
            <div className="space-y-3">
              <div>
                <div className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.12em] mb-1">
                  {impl.name}.save()
                </div>
                <div className="border border-zinc-200 dark:border-zinc-700">
                  <CodeBlock code={impl.internal} />
                </div>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-700 px-4 py-3">
                <div className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.12em] mb-1">Response</div>
                <div className="border border-zinc-100 dark:border-zinc-700">
                  <CodeBlock code={impl.result} />
                </div>
              </div>
              <div className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-3 text-zinc-400 dark:text-zinc-500 text-[10px] leading-relaxed">
                Same <code className="bg-zinc-100 dark:bg-zinc-700 px-1">OrderService.create()</code> code ran.
                Only the database implementation changed.
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-zinc-200 dark:border-zinc-700 px-4 py-8 text-center text-zinc-300 dark:text-zinc-600 text-[10px]">
              {selected ? "Hit 'Call create(dto) →' to run" : "Select an implementation first"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
