"use client";

import { useState, useEffect } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type ClassData = {
  stereotype?: string;
  name: string;
  fields?: string[];
  methods: string[];
  isInterface?: boolean;
};

function ClassNode({ data }: NodeProps<Node<ClassData>>) {
  return (
    <div
      className={`font-mono text-[10px] min-w-[170px] shadow-sm ${
        data.isInterface
          ? "border-2 border-dashed border-zinc-700 dark:border-zinc-400 bg-white dark:bg-zinc-900"
          : "border border-zinc-800 dark:border-zinc-500 bg-white dark:bg-zinc-800"
      }`}
    >
      <Handle type="source" position={Position.Top} id="top-src" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top-tgt" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom-src" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} id="bottom-tgt" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />

      <div
        className={`px-3 py-2 text-center border-b ${
          data.isInterface
            ? "bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600"
            : "bg-zinc-100 dark:bg-zinc-700 border-zinc-800 dark:border-zinc-600"
        }`}
      >
        {data.stereotype && (
          <div className="text-zinc-400 dark:text-zinc-500 text-[9px] italic leading-tight">{data.stereotype}</div>
        )}
        <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-[11px]">{data.name}</div>
      </div>

      {data.fields && data.fields.length > 0 && (
        <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-700 space-y-0.5">
          {data.fields.map((f, i) => (
            <div key={i} className="text-zinc-500 dark:text-zinc-400">{f}</div>
          ))}
        </div>
      )}

      <div className="px-3 py-2 space-y-0.5">
        {data.methods.map((m, i) => (
          <div
            key={i}
            className={m.startsWith("//") ? "text-zinc-400 dark:text-zinc-500 italic" : "text-zinc-600 dark:text-zinc-300"}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

const nodeTypes = { classNode: ClassNode };

const nodes: Node[] = [
  {
    id: "orderService",
    type: "classNode",
    position: { x: 40, y: 60 },
    data: {
      name: "OrderService",
      fields: ["- strategy: PricingStrategy"],
      methods: ["+ OrderService(strategy)", "+ create(dto): OrderDTO"],
    },
  },
  {
    id: "client",
    type: "classNode",
    position: { x: 40, y: 280 },
    data: {
      name: "Client",
      methods: ["+ bootstrap()", "+ injectStrategy()"],
    },
  },
  {
    id: "pricingStrategy",
    type: "classNode",
    position: { x: 530, y: 60 },
    data: {
      stereotype: "«interface»",
      name: "PricingStrategy",
      methods: ["+ calculate(dto): PriceResult"],
      isInterface: true,
    },
  },
  {
    id: "blackFriday",
    type: "classNode",
    position: { x: 170, y: 360 },
    data: {
      name: "BlackFridayPricing",
      methods: ["+ calculate(dto)", "// 30% off everything"],
    },
  },
  {
    id: "standard",
    type: "classNode",
    position: { x: 440, y: 360 },
    data: {
      name: "StandardPricing",
      methods: ["+ calculate(dto)", "// base price × qty"],
    },
  },
  {
    id: "bulk",
    type: "classNode",
    position: { x: 710, y: 360 },
    data: {
      name: "BulkPricing",
      methods: ["+ calculate(dto)", "// 10% off qty > 10"],
    },
  },
];

const edges: Edge[] = [
  {
    id: "uses",
    source: "orderService",
    sourceHandle: "right",
    target: "pricingStrategy",
    targetHandle: "left",
    type: "straight",
    style: { stroke: "#71717a", strokeDasharray: "6 4", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#71717a" },
    label: "uses",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "creates",
    source: "client",
    sourceHandle: "top-src",
    target: "orderService",
    targetHandle: "bottom-tgt",
    type: "straight",
    style: { stroke: "#71717a", strokeDasharray: "4 3", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#71717a" },
    label: "creates",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "impl-bf",
    source: "blackFriday",
    sourceHandle: "top-src",
    target: "pricingStrategy",
    targetHandle: "bottom-tgt",
    type: "smoothstep",
    style: { stroke: "#18181b", strokeWidth: 2 },
    markerEnd: { type: MarkerType.Arrow, color: "#18181b", width: 22, height: 22 },
  },
  {
    id: "impl-std",
    source: "standard",
    sourceHandle: "top-src",
    target: "pricingStrategy",
    targetHandle: "bottom-tgt",
    type: "smoothstep",
    style: { stroke: "#18181b", strokeWidth: 2 },
    markerEnd: { type: MarkerType.Arrow, color: "#18181b", width: 22, height: 22 },
  },
  {
    id: "impl-bulk",
    source: "bulk",
    sourceHandle: "top-src",
    target: "pricingStrategy",
    targetHandle: "bottom-tgt",
    type: "smoothstep",
    style: { stroke: "#18181b", strokeWidth: 2 },
    markerEnd: { type: MarkerType.Arrow, color: "#18181b", width: 22, height: 22 },
  },
];

export default function StrategyDiagram() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const labelBg = isDark ? "#18181b" : "white";
  const labelFill = isDark ? "#a1a1aa" : "#a1a1aa";
  const arrowDark = isDark ? "#a1a1aa" : "#18181b";

  const themedEdges: Edge[] = edges.map((e) => ({
    ...e,
    style: {
      ...e.style,
      stroke: e.id === "uses" || e.id === "creates"
        ? (isDark ? "#71717a" : (e.style?.stroke as string))
        : (isDark ? "#a1a1aa" : (e.style?.stroke as string)),
    },
    markerEnd: typeof e.markerEnd === "object"
      ? { ...e.markerEnd, color: e.id === "uses" || e.id === "creates" ? "#71717a" : arrowDark }
      : e.markerEnd,
    labelStyle: { ...(e.labelStyle as object), fill: labelFill },
    labelBgStyle: { fill: labelBg, fillOpacity: 1 },
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[480px] border border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
        <ReactFlow
          nodes={nodes}
          edges={themedEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnDrag={false}
          proOptions={{ hideAttribution: true }}
        />
      </div>

      <div className="flex items-center gap-6 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
        <span className="flex items-center gap-2">
          <svg width="36" height="10" viewBox="0 0 36 10"><line x1="0" y1="5" x2="28" y2="5" stroke="#18181b" strokeWidth="2" /><polygon points="28,1 36,5 28,9" fill="none" stroke="#18181b" strokeWidth="2" /></svg>
          implements
        </span>
        <span className="flex items-center gap-2">
          <svg width="36" height="10" viewBox="0 0 36 10"><line x1="0" y1="5" x2="28" y2="5" stroke="#71717a" strokeWidth="2" strokeDasharray="5 3" /><polygon points="28,1 36,5 28,9" fill="#71717a" /></svg>
          uses / creates
        </span>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 flex gap-3 items-start">
        <span className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5 shrink-0">→</span>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
          <strong className="text-zinc-700 dark:text-zinc-300">OrderService</strong> depends only on{" "}
          <strong className="text-zinc-700 dark:text-zinc-300">PricingStrategy</strong>, not any concrete class.
          Swap <code className="bg-zinc-100 dark:bg-zinc-700 px-1">StandardPricing</code> for{" "}
          <code className="bg-zinc-100 dark:bg-zinc-700 px-1">BlackFridayPricing</code> at runtime — the service never changes.
        </p>
      </div>
    </div>
  );
}
