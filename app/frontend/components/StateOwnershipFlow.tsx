"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type ParentNodeType = Node<{ label: string; subtitle: string }, "parent">;
type ChildNodeType = Node<{ label: string; subtitle: string }, "child">;

function ParentNode({ data }: NodeProps<ParentNodeType>) {
  return (
    <div className="rounded border-2 border-zinc-900 bg-zinc-900 px-4 py-2.5 text-white shadow relative">
      <p className="text-base font-mono font-medium">{data.label}</p>
      <p className="text-base text-zinc-400 mt-0.5">{data.subtitle}</p>
      <Handle type="source" id="left" position={Position.Bottom} className="!left-[25%] !-translate-x-1/2 -bottom-1!" />
      <Handle type="source" id="center" position={Position.Bottom} className="!left-1/2 !-translate-x-1/2 -bottom-1!" />
      <Handle type="source" id="right" position={Position.Bottom} className="!left-[75%] !-translate-x-1/2 -bottom-1!" />
    </div>
  );
}

function ChildNode({ data }: NodeProps<ChildNodeType>) {
  return (
    <div className="rounded border border-zinc-300 bg-white px-3 py-2 shadow-sm">
      <Handle type="target" position={Position.Top} className="-top-1!" />
      <p className="text-base font-mono font-medium text-zinc-700">{data.label}</p>
      <p className="text-base text-zinc-400 mt-0.5">{data.subtitle}</p>
    </div>
  );
}

const nodeTypes = { parent: ParentNode, child: ChildNode };

const initialNodes: Node[] = [
  {
    id: "enrollment-panel",
    type: "parent",
    position: { x: 160, y: 0 },
    data: { label: "EnrollmentPanel", subtitle: "owns: enrolled[]" },
  },
  {
    id: "course-list",
    type: "child",
    position: { x: 0, y: 100 },
    data: { label: "CourseList", subtitle: "reads enrolled" },
  },
  {
    id: "enrolled-summary",
    type: "child",
    position: { x: 160, y: 100 },
    data: { label: "EnrolledSummary", subtitle: "reads enrolled" },
  },
  {
    id: "submit-button",
    type: "child",
    position: { x: 320, y: 100 },
    data: { label: "SubmitButton", subtitle: "reads enrolled" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "enrollment-panel", target: "course-list", sourceHandle: "left", markerEnd: "arrowclosed", type: "straight" },
  { id: "e2", source: "enrollment-panel", target: "enrolled-summary", sourceHandle: "center", markerEnd: "arrowclosed", type: "straight" },
  { id: "e3", source: "enrollment-panel", target: "submit-button", sourceHandle: "right", markerEnd: "arrowclosed", type: "straight" },
];

export default function StateOwnershipFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const defaultEdgeOptions = useMemo(() => ({ type: "straight", markerEnd: "arrowclosed" }), []);

  const onConnect = useCallback(() => {}, []);

  return (
    <div className="h-[240px] w-full rounded-lg border border-zinc-200 bg-zinc-50/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultMarkerColor="#71717a"
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
      >
        <Background className="bg-transparent!" />
        <Controls showInteractive={false} className="bottom-2! left-2! top-auto!" />
      </ReactFlow>
    </div>
  );
}
