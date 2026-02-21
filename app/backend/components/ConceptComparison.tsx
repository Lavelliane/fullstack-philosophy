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
    <div className="border border-zinc-200 overflow-hidden">
      <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200">
        <p className="text-xs font-medium text-zinc-700">{title}</p>
      </div>
      <div className="divide-y divide-zinc-100">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3 text-sm"
          >
            <div className="font-medium text-zinc-900">{row.concept}</div>
            <div className="flex gap-2 text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <span className="text-emerald-600 font-medium">Does: </span>
                {row.does}
              </span>
            </div>
            <div className="flex gap-2 text-zinc-600">
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
