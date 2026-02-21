"use client";

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

type BoxData = {
  label: string;
  sub?: string;
  variant?: "service" | "impl" | "interface" | "client" | "bad";
  annotation?: string;
};

function BoxNode({ data }: NodeProps<Node<BoxData>>) {
  const variantStyles: Record<string, string> = {
    service: "border-zinc-800 bg-white",
    impl: "border-zinc-400 bg-white",
    interface: "border-dashed border-2 border-zinc-700 bg-zinc-50",
    client: "border-zinc-300 bg-zinc-50",
    bad: "border-red-300 bg-red-50",
  };
  const v = data.variant ?? "impl";

  return (
    <div className="relative">
      <div
        className={`font-mono text-[11px] px-4 py-3 border text-center min-w-[150px] ${variantStyles[v]}`}
      >
        <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
        <div className="font-semibold text-zinc-900">{data.label}</div>
        {data.sub && <div className="text-[9px] text-zinc-400 mt-0.5">{data.sub}</div>}
      </div>
      {data.annotation && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-zinc-400 italic">
          {data.annotation}
        </div>
      )}
    </div>
  );
}

const nodeTypes = { box: BoxNode };

const coupledNodes: Node[] = [
  {
    id: "svc",
    type: "box",
    position: { x: 60, y: 80 },
    data: { label: "OrderService", variant: "service" },
  },
  {
    id: "pg",
    type: "box",
    position: { x: 320, y: 80 },
    data: {
      label: "PostgresDatabase",
      sub: "new PostgresDatabase()",
      variant: "bad",
      annotation: "hardwired — can't swap, can't test",
    },
  },
];

const coupledEdges: Edge[] = [
  {
    id: "e1",
    source: "svc",
    sourceHandle: "right",
    target: "pg",
    targetHandle: "left",
    type: "straight",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
    label: "creates inside",
    labelStyle: { fontSize: 10, fill: "#ef4444", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
];

const injectedNodes: Node[] = [
  {
    id: "client",
    type: "box",
    position: { x: 20, y: 80 },
    data: { label: "Client", sub: "bootstrap()", variant: "client" },
  },
  {
    id: "idb",
    type: "box",
    position: { x: 240, y: 80 },
    data: { label: "IDatabase", sub: "«interface»", variant: "interface" },
  },
  {
    id: "svc",
    type: "box",
    position: { x: 460, y: 80 },
    data: { label: "OrderService", variant: "service" },
  },
  {
    id: "pg",
    type: "box",
    position: { x: 680, y: 20 },
    data: { label: "PostgresDB", sub: "production", variant: "impl", annotation: "real database" },
  },
  {
    id: "mock",
    type: "box",
    position: { x: 680, y: 140 },
    data: { label: "MockDB", sub: "tests", variant: "impl", annotation: "fake, instant, no DB needed" },
  },
];

const injectedEdges: Edge[] = [
  {
    id: "e-client-idb",
    source: "client",
    sourceHandle: "right",
    target: "idb",
    targetHandle: "left",
    type: "straight",
    style: { stroke: "#71717a", strokeWidth: 1.5, strokeDasharray: "5 3" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#71717a" },
    label: "injects",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-idb-svc",
    source: "idb",
    sourceHandle: "right",
    target: "svc",
    targetHandle: "left",
    type: "straight",
    style: { stroke: "#18181b", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#18181b" },
    label: "received by",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-pg-idb",
    source: "pg",
    sourceHandle: "left",
    target: "idb",
    targetHandle: "right",
    type: "smoothstep",
    style: { stroke: "#18181b", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.Arrow, color: "#18181b", width: 18, height: 18 },
    label: "implements",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-mock-idb",
    source: "mock",
    sourceHandle: "left",
    target: "idb",
    targetHandle: "right",
    type: "smoothstep",
    style: { stroke: "#18181b", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.Arrow, color: "#18181b", width: 18, height: 18 },
    label: "implements",
    labelStyle: { fontSize: 10, fill: "#a1a1aa", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
];

type Props = { mode: "coupled" | "injected" };

export default function DIFlowDiagram({ mode }: Props) {
  const nodes = mode === "coupled" ? coupledNodes : injectedNodes;
  const edges = mode === "coupled" ? coupledEdges : injectedEdges;
  const height = mode === "coupled" ? 200 : 260;

  return (
    <div
      className="w-full border border-zinc-100 bg-zinc-50"
      style={{ height }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
