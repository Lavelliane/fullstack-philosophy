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

type SystemNodeData = {
  label: string;
  sublabel: string;
  tone?: "frontend" | "contract" | "backend";
};

function SystemNode({ data }: NodeProps<Node<SystemNodeData>>) {
  const toneClass = {
    frontend: "border-blue-200 bg-blue-50",
    contract: "border-zinc-900 bg-zinc-900 text-white",
    backend: "border-emerald-200 bg-emerald-50",
  }[data.tone ?? "frontend"];

  const sublabelClass = data.tone === "contract" ? "text-zinc-300" : "text-zinc-500";

  return (
    <div className={`border px-4 py-3 min-w-[160px] ${toneClass}`}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <p className="text-xs font-mono font-semibold">{data.label}</p>
      <p className={`text-[10px] mt-1 leading-relaxed ${sublabelClass}`}>{data.sublabel}</p>
    </div>
  );
}

const nodeTypes = { systemNode: SystemNode };

const nodes: Node<SystemNodeData>[] = [
  {
    id: "browser",
    type: "systemNode",
    position: { x: 0, y: 40 },
    data: { label: "Browser", sublabel: "User action begins", tone: "frontend" },
  },
  {
    id: "frontend",
    type: "systemNode",
    position: { x: 240, y: 40 },
    data: { label: "Frontend", sublabel: "Builds request and feedback", tone: "frontend" },
  },
  {
    id: "contract",
    type: "systemNode",
    position: { x: 480, y: 40 },
    data: { label: "API Contract", sublabel: "Shared language", tone: "contract" },
  },
  {
    id: "backend",
    type: "systemNode",
    position: { x: 720, y: 40 },
    data: { label: "Backend", sublabel: "Rules and permissions", tone: "backend" },
  },
  {
    id: "database",
    type: "systemNode",
    position: { x: 960, y: 40 },
    data: { label: "Database", sublabel: "Durable memory", tone: "backend" },
  },
  {
    id: "response",
    type: "systemNode",
    position: { x: 720, y: 200 },
    data: { label: "Response", sublabel: "Result returns to UI", tone: "contract" },
  },
  {
    id: "ui",
    type: "systemNode",
    position: { x: 240, y: 200 },
    data: { label: "Updated UI", sublabel: "User sees outcome", tone: "frontend" },
  },
];

const edges: Edge[] = [
  {
    id: "e-browser-frontend",
    source: "browser",
    target: "frontend",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "click",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-frontend-contract",
    source: "frontend",
    target: "contract",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "request",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-contract-backend",
    source: "contract",
    target: "backend",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "validated input",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-backend-database",
    source: "backend",
    target: "database",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "write",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-backend-response",
    source: "backend",
    target: "response",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "response",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
  {
    id: "e-response-ui",
    source: "response",
    target: "ui",
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#52525b" },
    style: { stroke: "#52525b", strokeWidth: 1.6 },
    label: "render",
    labelStyle: { fontSize: 10, fill: "#71717a", fontFamily: "monospace" },
    labelBgStyle: { fill: "white", fillOpacity: 1 },
  },
];

export default function BridgeSystemDiagram() {
  return (
    <div className="w-full h-[380px] border border-zinc-200 bg-zinc-50/60">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
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
