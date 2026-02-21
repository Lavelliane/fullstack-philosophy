"use client";

import { useState } from "react";
import { motion, useAnimate } from "motion/react";
import { Send, CheckCircle2, XCircle, Database, FileCode, Shield, ArrowRight } from "lucide-react";
import type { ValidatorSimPayload } from "../backend/data";

const NODE_OFFSETS = [18, 142, 266, 390, 514];

const NODES = [
  { id: "client", label: "Client", Icon: Send },
  { id: "parse", label: "Zod Parse", Icon: Shield },
  { id: "controller", label: "Controller", Icon: FileCode },
  { id: "db", label: "DB Write", Icon: Database },
  { id: "response", label: "Response", Icon: CheckCircle2 },
];

type SimState = "idle" | "running" | "pass" | "fail";

type ValidatorSimProps = {
  payloads: ValidatorSimPayload[];
};

export default function ValidatorSim({ payloads }: ValidatorSimProps) {
  const [selectedId, setSelectedId] = useState<string>(payloads[0]?.id ?? "valid");
  const [simState, setSimState] = useState<SimState>("idle");
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [scope, animate] = useAnimate();

  const selected = payloads.find((p) => p.id === selectedId) ?? payloads[0];
  const willFail = selected?.outcome === "fail";

  async function runSimulation() {
    if (simState === "running") return;
    setSimState("running");
    setActiveNodeIndex(-1);

    await animate("#packet", { x: 0, opacity: 1 }, { duration: 0.1 });

    for (let i = 0; i <= (willFail ? 1 : 4); i++) {
      setActiveNodeIndex(i);
      await animate("#packet", { x: NODE_OFFSETS[i] }, { duration: 0.35 });

      if (i === 1 && willFail) {
        await animate("#packet", { scale: [1, 1.3, 0.9, 1.1, 1] }, { duration: 0.25 });
        await animate("#error-badge", { scale: [0.5, 1.1, 1], opacity: 1 }, { duration: 0.2 });
        setSimState("fail");
        return;
      }
    }

    setSimState("pass");
  }

  return (
    <div ref={scope} className="border border-zinc-200 p-6 flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-zinc-900">DTO Validator Simulator</p>
        <p className="text-xs text-zinc-400 mt-1">
          Pick a payload, then hit Send. Watch how data flows through the pipeline. Valid data reaches the DB. Invalid data fails at Zod.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {payloads.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            disabled={simState === "running"}
            className={`text-xs font-medium px-4 py-2 border transition-colors duration-200 ${
              selectedId === p.id
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
            } ${simState === "running" ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative h-24 flex items-center">
        <div className="flex items-center gap-6">
          {NODES.map((node, i) => {
            const Icon = node.Icon;
            const isActive = activeNodeIndex === i;
            const isErrorSpot = node.id === "parse" && willFail && simState === "fail";
            return (
              <div key={node.id} className="flex items-center gap-6">
                <motion.div
                  className={`flex flex-col items-center justify-center w-[100px] h-14 border rounded transition-all duration-200 ${
                    isErrorSpot ? "border-red-300 bg-red-50" : "border-zinc-200 bg-zinc-50"
                  } ${isActive ? "ring-2 ring-emerald-400 ring-offset-2 scale-105" : ""}`}
                  animate={isActive && !isErrorSpot ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={`w-4 h-4 mb-1 ${isErrorSpot ? "text-red-500" : "text-zinc-500"}`} />
                  <span className="text-[10px] font-mono text-zinc-600">{node.label}</span>
                </motion.div>
                {i < NODES.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-zinc-300 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {willFail && (
          <motion.div
            id="error-badge"
            initial={{ opacity: 0, scale: 0.5 }}
            className="absolute left-[110px] top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 border border-red-300 bg-red-50 rounded z-10"
            style={{ opacity: simState === "fail" ? 1 : 0 }}
          >
            <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-[10px] font-mono text-red-600">400 ZodError</span>
          </motion.div>
        )}

        <motion.div
          id="packet"
          className="absolute left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-900 shadow-md"
          initial={{ x: 0 }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={runSimulation}
          disabled={simState === "running"}
          className={`flex items-center gap-2 text-xs font-medium px-5 py-2.5 border transition-colors duration-200 ${
            simState === "running"
              ? "border-zinc-200 text-zinc-400 cursor-not-allowed"
              : "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          {simState === "running" ? "Sending…" : "Send Request"}
        </button>
      </div>

      {(simState === "pass" || simState === "fail") && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 text-zinc-100 p-4 font-mono text-xs overflow-x-auto rounded"
        >
          <p className="text-zinc-400 mb-2">Result</p>
          {simState === "pass" ? (
            <div>
              <p className="text-emerald-400">201 Created</p>
              <pre className="mt-2 text-zinc-300 whitespace-pre-wrap">
                {JSON.stringify({ id: 101, ...selected?.payload }, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <p className="text-red-400">400 Bad Request</p>
              <p className="mt-2 text-zinc-400">ZodError: {selected?.errorMessage ?? "Validation failed"}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
