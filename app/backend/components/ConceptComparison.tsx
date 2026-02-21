import { CheckCircle2, XCircle } from "lucide-react";

type Row = {
  concept: string;
  does: string;
  doesNot: string;
};

type ConceptComparisonProps = {
  title: string;
  rows: Row[];
};

export default function ConceptComparison({ title, rows }: ConceptComparisonProps) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="bg-zinc-50 dark:bg-zinc-800 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{title}</p>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3 text-sm"
          >
            <div className="font-medium text-zinc-900 dark:text-zinc-100">{row.concept}</div>
            <div className="flex gap-2 text-zinc-600 dark:text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <span className="text-emerald-600 font-medium">Does: </span>
                {row.does}
              </span>
            </div>
            <div className="flex gap-2 text-zinc-600 dark:text-zinc-300">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                <span className="text-red-500 font-medium">Does not: </span>
                {row.doesNot}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
