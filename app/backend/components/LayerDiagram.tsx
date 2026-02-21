import { Shield, Layers, Brain, Database, ChevronDown } from "lucide-react";

const LAYERS = [
  {
    id: "middleware",
    label: "Middleware",
    role: "Asks: Who? Allowed? Valid?",
    detail: "Cross-cutting. Runs for every request.",
    Icon: Shield,
  },
  {
    id: "controller",
    label: "Controller",
    role: "Reads input, calls service, returns response",
    detail: "Receptionist. No business rules.",
    Icon: Layers,
  },
  {
    id: "service",
    label: "Service",
    role: "Applies rules, coordinates, decides",
    detail: "Brain. Pricing, validation, orchestration.",
    Icon: Brain,
  },
  {
    id: "repository",
    label: "Repository",
    role: "Saves and loads data",
    detail: "Storage. No business logic.",
    Icon: Database,
  },
];

export default function LayerDiagram() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 p-6">
      <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">
        Request flow (top to bottom)
      </p>
      <div className="flex flex-col gap-0">
        {LAYERS.map((layer, i) => {
          const Icon = layer.Icon;
          return (
            <div key={layer.id} className="flex flex-col">
              <div className="flex flex-col gap-1 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {layer.label}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">{layer.role}</p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{layer.detail}</p>
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
