"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ─────────────────────────────────────────────────────────────────────

type StrategyId = "standard" | "black_friday" | "bulk";

type Strategy = {
  id: StrategyId;
  name: string;
  rule: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  calculate: (basePrice: number, qty: number) => { total: number; discount: number; breakdown: string[] };
};

const STRATEGIES: Strategy[] = [
  {
    id: "standard",
    name: "StandardPricing",
    rule: "Full price. No discount.",
    color: "border-zinc-400 bg-white text-zinc-800",
    accentBg: "bg-zinc-50",
    accentBorder: "border-zinc-300",
    accentText: "text-zinc-700",
    calculate: (basePrice, qty) => ({
      total: basePrice * qty,
      discount: 0,
      breakdown: [`${basePrice} × ${qty}`, `= $${(basePrice * qty).toFixed(2)}`],
    }),
  },
  {
    id: "black_friday",
    name: "BlackFridayPricing",
    rule: "30% off everything.",
    color: "border-red-400 bg-red-50 text-red-800",
    accentBg: "bg-red-50",
    accentBorder: "border-red-300",
    accentText: "text-red-700",
    calculate: (basePrice, qty) => {
      const total = basePrice * qty * 0.7;
      return {
        total,
        discount: 0.3,
        breakdown: [`${basePrice} × ${qty} × (1 − 0.30)`, `${basePrice} × ${qty} × 0.70`, `= $${total.toFixed(2)}`],
      };
    },
  },
  {
    id: "bulk",
    name: "BulkPricing",
    rule: "10% off when qty > 10.",
    color: "border-blue-400 bg-blue-50 text-blue-800",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-300",
    accentText: "text-blue-700",
    calculate: (basePrice, qty) => {
      const discount = qty > 10 ? 0.1 : 0;
      const total = basePrice * qty * (1 - discount);
      return {
        total,
        discount,
        breakdown:
          qty > 10
            ? [`qty > 10 → 10% discount applies`, `${basePrice} × ${qty} × 0.90`, `= $${total.toFixed(2)}`]
            : [`qty ≤ 10 → no discount`, `${basePrice} × ${qty}`, `= $${total.toFixed(2)}`],
      };
    },
  },
];

// ── Step definitions ──────────────────────────────────────────────────────────

type SimStep = {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  getCode: (s: Strategy, basePrice: number, qty: number) => { lines: { text: string; color?: string; highlight?: boolean }[] };
  getNote: (s: Strategy, basePrice: number, qty: number) => { text: string; color: string; border: string; bg: string } | null;
};

const SIM_STEPS: SimStep[] = [
  {
    id: "request",
    label: "HTTP Request",
    sublabel: "POST /orders",
    description: "The client sends an order. The body includes which pricing strategy to use. The controller reads this field and decides which concrete strategy to inject.",
    getCode: (s, basePrice, qty) => ({
      lines: [
        { text: "// POST /orders", color: "text-zinc-500" },
        { text: "{", color: "text-purple-400" },
        { text: '  "item": "Widget",', color: "text-emerald-400" },
        { text: `  "basePrice": ${basePrice},`, color: "text-emerald-400" },
        { text: `  "qty": ${qty},`, color: "text-emerald-400" },
        { text: `  "pricingStrategy": "${s.id}"`, color: "text-emerald-400", highlight: true },
        { text: "}", color: "text-purple-400" },
      ],
    }),
    getNote: () => ({
      text: "The pricingStrategy field is the only thing that changes between requests. The rest of the pipeline is identical.",
      color: "text-zinc-300",
      border: "border-zinc-700",
      bg: "bg-zinc-900",
    }),
  },
  {
    id: "registry",
    label: "Strategy Registry",
    sublabel: "getStrategy(name)",
    description: "The controller calls the registry with the strategy name. The registry maps string keys to pre-instantiated strategy objects. If the key is unknown, it throws — the controller never receives a null.",
    getCode: (s) => ({
      lines: [
        { text: "// strategies/registry.js", color: "text-zinc-500" },
        { text: "const strategies = {", color: "text-purple-400" },
        { text: "  standard: new StandardPricing(),", color: s.id === "standard" ? "text-emerald-400" : "text-zinc-500" },
        { text: "  black_friday: new BlackFridayPricing(),", color: s.id === "black_friday" ? "text-emerald-400" : "text-zinc-500" },
        { text: "  bulk: new BulkPricing(),", color: s.id === "bulk" ? "text-emerald-400" : "text-zinc-500" },
        { text: "};", color: "text-purple-400" },
        { text: "", color: "text-zinc-300" },
        { text: "function getStrategy(name) {", color: "text-blue-400" },
        { text: "  const strategy = strategies[name];", color: "text-zinc-300" },
        { text: "  if (!strategy) throw new Error(...);", color: "text-amber-400" },
        { text: "  return strategy;", color: "text-emerald-400", highlight: true },
        { text: "}", color: "text-purple-400" },
      ],
    }),
    getNote: (s) => ({
      text: `getStrategy("${s.id}") → returns ${s.name} instance`,
      color: "text-emerald-300",
      border: "border-emerald-800",
      bg: "bg-emerald-950/40",
    }),
  },
  {
    id: "injection",
    label: "Controller injects strategy",
    sublabel: "new OrderService(strategy)",
    description: "The controller creates the service and passes the strategy in. OrderService never imports StandardPricing, BlackFridayPricing, or BulkPricing directly. It only receives something that has a calculate() method.",
    getCode: (s, basePrice, qty) => ({
      lines: [
        { text: "// order.controller.js", color: "text-zinc-500" },
        { text: "async function createOrder(req, res) {", color: "text-blue-400" },
        { text: "  const {", color: "text-purple-400" },
        { text: "    item,", color: "text-zinc-300" },
        { text: "    basePrice,", color: "text-zinc-300" },
        { text: "    qty,", color: "text-zinc-300" },
        { text: "    pricingStrategy = 'standard',", color: "text-zinc-300" },
        { text: "  } = req.body;", color: "text-purple-400" },
        { text: "", color: "text-zinc-300" },
        { text: `  // resolves to ${s.name}`, color: "text-zinc-500" },
        { text: "  const strategy = getStrategy(pricingStrategy);", color: "text-emerald-400", highlight: true },
        { text: "", color: "text-zinc-300" },
        { text: "  // strategy injected here ↓", color: "text-zinc-500" },
        { text: "  const service = new OrderService(strategy);", color: "text-violet-400", highlight: true },
        { text: `  const order = service.create({ item, basePrice: ${basePrice}, qty: ${qty} });`, color: "text-zinc-300" },
        { text: "  res.status(201).json(order);", color: "text-zinc-300" },
        { text: "}", color: "text-purple-400" },
      ],
    }),
    getNote: (s) => ({
      text: `OrderService receives ${s.name}. It only knows it has a calculate() method — nothing else.`,
      color: "text-violet-300",
      border: "border-violet-800",
      bg: "bg-violet-950/40",
    }),
  },
  {
    id: "service",
    label: "Service calls the interface",
    sublabel: "this.strategy.calculate(dto)",
    description: "OrderService calls this.strategy.calculate(dto). It has no if/else for strategy types. It doesn't know which concrete class is running. This is the key: the service never changes when you add a new strategy.",
    getCode: (s) => ({
      lines: [
        { text: "// order.service.js", color: "text-zinc-500" },
        { text: "class OrderService {", color: "text-blue-400" },
        { text: "  constructor(strategy) {", color: "text-blue-400" },
        { text: "    this.strategy = strategy;", color: "text-zinc-300" },
        { text: "  }", color: "text-purple-400" },
        { text: "", color: "text-zinc-300" },
        { text: "  create(dto) {", color: "text-blue-400" },
        { text: "    // calls the interface — not the class", color: "text-zinc-500" },
        { text: "    const pricing = this.strategy.calculate(dto);", color: "text-emerald-400", highlight: true },
        { text: `    // → delegates to ${s.name}`, color: "text-zinc-500" },
        { text: "    return {", color: "text-purple-400" },
        { text: "      id: crypto.randomUUID(),", color: "text-zinc-300" },
        { text: "      item: dto.item,", color: "text-zinc-300" },
        { text: "      ...pricing,", color: "text-zinc-300" },
        { text: "      createdAt: new Date().toISOString(),", color: "text-zinc-300" },
        { text: "    };", color: "text-zinc-300" },
        { text: "  }", color: "text-purple-400" },
        { text: "}", color: "text-purple-400" },
      ],
    }),
    getNote: (s) => ({
      text: `No import of ${s.name} anywhere in this file. The service is completely decoupled from the concrete implementation.`,
      color: "text-emerald-300",
      border: "border-emerald-800",
      bg: "bg-emerald-950/40",
    }),
  },
  {
    id: "strategy_runs",
    label: `Strategy executes`,
    sublabel: "calculate(dto) → PriceResult",
    description: "The concrete strategy's calculate() method runs. Each strategy implements the same interface but with a different algorithm. The result shape is always the same — the service can always spread it into the response.",
    getCode: (s, basePrice, qty) => {
      const result = s.calculate(basePrice, qty);
      const discountLine = result.discount > 0
        ? [{ text: `const discount = ${result.discount};`, color: "text-amber-400", highlight: true }]
        : [{ text: `const discount = 0; // no discount`, color: "text-zinc-500" }];
      return {
        lines: [
          { text: `// strategies/${s.name}.js`, color: "text-zinc-500" },
          { text: `class ${s.name} extends PricingStrategy {`, color: "text-blue-400" },
          { text: "  calculate({ basePrice, qty }) {", color: "text-blue-400" },
          ...discountLine.map(line => ({ ...line, text: "    " + line.text })),
          { text: `    const total = basePrice * qty * (1 - discount);`, color: "text-zinc-300" },
          { text: "    return {", color: "text-purple-400" },
          { text: `      strategy: "${s.id}",`, color: "text-emerald-400" },
          { text: `      basePrice,`, color: "text-zinc-300" },
          { text: `      qty,`, color: "text-zinc-300" },
          { text: `      discount,`, color: "text-zinc-300" },
          { text: `      total, // → ${result.total.toFixed(2)}`, color: "text-emerald-400", highlight: true },
          { text: "    };", color: "text-purple-400" },
          { text: "  }", color: "text-purple-400" },
          { text: "}", color: "text-purple-400" },
        ],
      };
    },
    getNote: (s, basePrice, qty) => {
      const result = s.calculate(basePrice, qty);
      return {
        text: `${s.name}.calculate({ basePrice: ${basePrice}, qty: ${qty} }) → total: $${result.total.toFixed(2)}`,
        color: "text-emerald-300",
        border: "border-emerald-800",
        bg: "bg-emerald-950/40",
      };
    },
  },
  {
    id: "response",
    label: "Response",
    sublabel: "201 Created",
    description: "The order is returned. The strategy field in the response tells the client which pricing was applied. The service code that built this response is identical regardless of which strategy ran.",
    getCode: (s, basePrice, qty) => {
      const result = s.calculate(basePrice, qty);
      return {
        lines: [
          { text: "HTTP/1.1 201 Created", color: "text-emerald-400" },
          { text: "Content-Type: application/json", color: "text-zinc-500" },
          { text: "", color: "text-zinc-300" },
          { text: "{", color: "text-purple-400" },
          { text: '  "id": "a3f7-...",', color: "text-emerald-400" },
          { text: '  "item": "Widget",', color: "text-emerald-400" },
          { text: `  "strategy": "${s.id}",`, color: "text-emerald-400", highlight: true },
          { text: `  "basePrice": ${basePrice},`, color: "text-emerald-400" },
          { text: `  "qty": ${qty},`, color: "text-emerald-400" },
          ...(result.discount > 0
            ? [{ text: `  "discount": ${(result.discount * 100).toFixed(0)}%,`, color: "text-emerald-400" }]
            : []),
          { text: `  "total": ${result.total.toFixed(2)}`, color: "text-emerald-400", highlight: true },
          { text: "}", color: "text-purple-400" },
        ],
      };
    },
    getNote: () => ({
      text: `To add a HolidayPricing next month: create one new file, register it in the registry. OrderService stays completely untouched.`,
      color: "text-zinc-300",
      border: "border-zinc-700",
      bg: "bg-zinc-900",
    }),
  },
];

// ── Shared primitives ─────────────────────────────────────────────────────────

function TLines({ lines }: { lines: { text: string; color?: string; highlight?: boolean }[] }) {
  return (
    <div className="space-y-0.5">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.045, duration: 0.16 }}
          className={`leading-relaxed font-mono text-xs ${
            l.highlight ? "bg-emerald-500/20 border-l-2 border-emerald-500 pl-2 -ml-2" : ""
          }`}
        >
          <span className={`${l.color ?? "text-zinc-300"} whitespace-pre`}>
            {l.text || "\u00A0"}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function CodePanel({
  step,
  strategy,
  basePrice,
  qty,
}: {
  step: SimStep;
  strategy: Strategy;
  basePrice: number;
  qty: number;
}) {
  const { lines } = step.getCode(strategy, basePrice, qty);
  const note = step.getNote(strategy, basePrice, qty);
  return (
    <div className="bg-zinc-950 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">{step.label}</p>
      <TLines lines={lines} />
      {note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: lines.length * 0.045 + 0.2 }}
          className={`mt-4 border px-3 py-2 ${note.border} ${note.bg}`}
        >
          <p className={`text-[11px] ${note.color}`}>{note.text}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Pipeline sidebar ──────────────────────────────────────────────────────────

function PipelineSidebar({
  activeIndex,
  strategy,
}: {
  activeIndex: number;
  strategy: Strategy;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {SIM_STEPS.map((step, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        return (
          <div
            key={step.id}
            className={`flex items-center gap-2 border px-3 py-2 text-xs font-mono transition-all duration-300 ${
              isActive
                ? "border-zinc-800 bg-white shadow-sm text-zinc-900"
                : isPast
                ? "border-zinc-200 bg-zinc-50 text-zinc-400"
                : "border-zinc-100 bg-white text-zinc-300"
            }`}
          >
            <span className="text-[10px] opacity-50 w-3 shrink-0">{i + 1}</span>
            <span className="truncate leading-tight">{step.label}</span>
            {isPast && <span className="ml-auto text-emerald-500 text-[10px] shrink-0">✓</span>}
            {isActive && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-auto text-zinc-500 text-[10px] shrink-0"
              >
                ●
              </motion.span>
            )}
          </div>
        );
      })}

      {/* Strategy slot */}
      <div className="mt-3 border-2 border-dashed border-zinc-300 bg-zinc-50">
        <div className="px-2 py-1.5 border-b border-zinc-200 bg-zinc-100 text-center">
          <div className="text-[9px] text-zinc-400 italic">«interface»</div>
          <div className="text-[10px] font-mono font-semibold text-zinc-700">PricingStrategy</div>
        </div>
        <div className="px-2 py-1.5 font-mono text-[9px] text-zinc-400">
          + calculate(dto): PriceResult
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        {STRATEGIES.map((s) => (
          <div
            key={s.id}
            className={`border px-2 py-1.5 font-mono text-[9px] transition-all duration-200 ${
              s.id === strategy.id ? s.color + " shadow-sm" : "border-zinc-100 bg-white text-zinc-300"
            }`}
          >
            <div className={`font-semibold text-[10px] ${s.id === strategy.id ? "" : "text-zinc-300"}`}>
              {s.name}
            </div>
            {s.id === strategy.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[8px] uppercase tracking-wider text-zinc-400 mt-0.5"
              >
                ← active
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StrategySim() {
  const [selectedId, setSelectedId] = useState<StrategyId>("standard");
  const [stepIndex, setStepIndex] = useState(0);
  const [basePrice, setBasePrice] = useState(50);
  const [qty, setQty] = useState(3);

  const strategy = STRATEGIES.find((s) => s.id === selectedId)!;
  const currentStep = SIM_STEPS[stepIndex];
  const isLast = stepIndex === SIM_STEPS.length - 1;

  function handleStrategyChange(id: StrategyId) {
    setSelectedId(id);
    setStepIndex(0);
  }

  function handleNext() {
    if (isLast) {
      setStepIndex(0);
    } else {
      setStepIndex((p) => p + 1);
    }
  }

  function handleReset() {
    setStepIndex(0);
  }

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-0.5">Strategy pattern simulator</p>
        <p className="text-[11px] text-zinc-400">
          Pick a strategy and step through the pipeline to see exactly how the pattern works in code.
        </p>
      </div>

      {/* Strategy + inputs */}
      <div className="flex flex-wrap gap-0 border-b border-zinc-200">
        {STRATEGIES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleStrategyChange(s.id)}
            className={`text-xs font-medium px-4 py-3 border-r border-zinc-200 transition-colors duration-150 ${
              selectedId === s.id ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
            }`}
          >
            {s.name}
          </button>
        ))}

        {/* Inputs inline */}
        <div className="flex items-center gap-4 px-5 ml-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Price</span>
            {[20, 50, 100].map((v) => (
              <button
                key={v}
                onClick={() => { setBasePrice(v); setStepIndex(0); }}
                className={`border px-2 py-1 text-[10px] font-mono transition-colors ${
                  basePrice === v ? "border-zinc-800 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
                }`}
              >
                ${v}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Qty</span>
            {[3, 10, 15].map((v) => (
              <button
                key={v}
                onClick={() => { setQty(v); setStepIndex(0); }}
                className={`border px-2 py-1 text-[10px] font-mono transition-colors ${
                  qty === v ? "border-zinc-800 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main split panel */}
      <div className="grid lg:grid-cols-[1fr_220px] min-h-[340px]">
        {/* Code panel */}
        <div className="border-r border-zinc-100 min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedId}-${stepIndex}-${basePrice}-${qty}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="h-full"
            >
              <CodePanel
                step={currentStep}
                strategy={strategy}
                basePrice={basePrice}
                qty={qty}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pipeline sidebar */}
        <div className="p-4 bg-zinc-50/60 overflow-y-auto">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-3">Pipeline</p>
          <PipelineSidebar activeIndex={stepIndex} strategy={strategy} />
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4 border-t border-zinc-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${selectedId}-${stepIndex}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-1">{currentStep.sublabel}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{currentStep.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50/40">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNext}
            className="text-xs font-medium border border-zinc-900 px-4 py-2 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            {isLast ? "Restart" : "Next step"}
          </button>
          {stepIndex > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-300">
          {stepIndex + 1} / {SIM_STEPS.length}
        </span>
      </div>
    </div>
  );
}
