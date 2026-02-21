"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, ShieldCheck, ShieldX, UserCheck, FileCode, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import type { AuthSimScenario } from "../backend/data";

const STEP_DELAY_MS = 450;

type SimState = "idle" | "running" | "pass" | "fail";

type Node = {
  id: string;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
  failKey: "auth" | "authz" | null;
};

const NODES: Node[] = [
  { id: "client",     label: "Client",      sublabel: "HTTP Request",          Icon: Send,         failKey: null },
  { id: "auth",       label: "Auth",         sublabel: "jwt.verify()",          Icon: ShieldCheck,  failKey: "auth" },
  { id: "authz",      label: "Authz",        sublabel: "requireRole()",         Icon: UserCheck,    failKey: "authz" },
  { id: "controller", label: "Controller",   sublabel: "Business logic",        Icon: FileCode,     failKey: null },
  { id: "response",   label: "Response",     sublabel: "200 OK",                Icon: CheckCircle2, failKey: null },
];

type AuthSimProps = {
  scenarios: AuthSimScenario[];
};

export default function AuthSim({ scenarios }: AuthSimProps) {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id);
  const [simState, setSimState] = useState<SimState>("idle");
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0];

  function getFailNodeIndex(): number {
    if (!selected.failsAt) return NODES.length - 1;
    return NODES.findIndex((n) => n.failKey === selected.failsAt);
  }

  async function runSimulation() {
    if (simState === "running") return;
    setSimState("running");
    setActiveNodeIndex(-1);

    const failIndex = getFailNodeIndex();

    for (let i = 0; i <= failIndex; i++) {
      setActiveNodeIndex(i);
      await new Promise((r) => setTimeout(r, STEP_DELAY_MS));

      if (selected.failsAt && NODES[i].failKey === selected.failsAt) {
        setSimState("fail");
        return;
      }
    }

    setSimState("pass");
  }

  function handleReset() {
    setSimState("idle");
    setActiveNodeIndex(-1);
  }

  const failNodeIndex = getFailNodeIndex();

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-zinc-900">Auth Middleware Simulator</p>
        <p className="text-xs text-zinc-400 mt-1">
          Pick a scenario, then hit Send. Watch the request flow through the auth
          pipeline — and see exactly where (and why) it gets blocked.
        </p>
      </div>

      {/* Scenario picker */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSelectedId(s.id);
              handleReset();
            }}
            disabled={simState === "running"}
            className={`text-xs font-medium px-4 py-2 border transition-colors duration-150 ${
              selectedId === s.id
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
            } ${simState === "running" ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Scenario description */}
      <div className="bg-zinc-50 border border-zinc-200 px-4 py-2.5">
        <p className="text-[11px] font-mono text-zinc-500">{selected.description}</p>
      </div>

      {/* Pipeline diagram */}
      <div className="relative overflow-x-auto">
        <div className="flex items-center gap-0 min-w-[600px]">
          {NODES.map((node, i) => {
            const Icon = node.Icon;
            const isActive = activeNodeIndex === i;
            const isFailSpot =
              selected.failsAt &&
              node.failKey === selected.failsAt &&
              simState === "fail";
            const isPassed =
              simState !== "idle" && i < (simState === "fail" ? failNodeIndex : NODES.length);
            const isUnreachable =
              simState === "fail" && i > failNodeIndex;

            let nodeClass =
              "flex flex-col items-center justify-center w-[100px] h-[60px] border transition-all duration-200 shrink-0 ";

            if (isFailSpot) {
              nodeClass += "border-red-300 bg-red-50 ring-2 ring-red-200 ring-offset-1";
            } else if (isActive && simState === "running") {
              nodeClass += "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200 ring-offset-1";
            } else if (isPassed && simState === "pass") {
              nodeClass += "border-emerald-300 bg-emerald-50";
            } else if (isUnreachable) {
              nodeClass += "border-zinc-100 bg-zinc-50 opacity-30";
            } else {
              nodeClass += "border-zinc-200 bg-white";
            }

            return (
              <div key={node.id} className="flex items-center shrink-0">
                <motion.div
                  className={nodeClass}
                  animate={
                    isActive && simState === "running"
                      ? { scale: 1.05 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.15 }}
                >
                  <Icon
                    className={`w-4 h-4 mb-1 ${
                      isFailSpot
                        ? "text-red-500"
                        : isPassed && simState === "pass"
                        ? "text-emerald-500"
                        : "text-zinc-400"
                    }`}
                  />
                  <span className="text-[10px] font-mono text-zinc-700 font-medium">
                    {node.label}
                  </span>
                  <span className="text-[9px] text-zinc-400 mt-0.5">{node.sublabel}</span>
                </motion.div>
                {i < NODES.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 mx-0.5 transition-colors duration-200 ${
                      isUnreachable || (simState === "fail" && i >= failNodeIndex - 1)
                        ? "text-zinc-100"
                        : "text-zinc-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Error badge */}
        {selected.failsAt && simState === "fail" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              left: `${failNodeIndex * 124 + 48}px`,
              top: "-8px",
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-red-300 bg-red-50 z-10 pointer-events-none"
          >
            <XCircle className="w-3 h-3 text-red-500 shrink-0" />
            <span className="text-[10px] font-mono text-red-600 whitespace-nowrap">
              {selected.statusCode} · {selected.errorMessage}
            </span>
          </motion.div>
        )}
      </div>

      {/* Action buttons */}
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
        {(simState === "pass" || simState === "fail") && (
          <button
            onClick={handleReset}
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
          >
            Reset
          </button>
        )}
      </div>

      {/* Result */}
      {(simState === "pass" || simState === "fail") && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 font-mono text-xs border ${
            simState === "pass"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {simState === "pass" ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-700 font-medium">200 OK — Request reached the controller.</p>
                <p className="text-emerald-600 mt-1 font-normal text-[11px]">
                  Token verified. Role confirmed. Business logic ran. This is the happy path.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <ShieldX className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-medium">
                  {selected.statusCode} —{" "}
                  {selected.statusCode === 401
                    ? "Unauthorized: identity check failed."
                    : "Forbidden: identity confirmed, access denied."}
                </p>
                <p className="text-red-600 mt-1 font-normal text-[11px]">
                  {selected.statusCode === 401
                    ? "The server doesn't know who you are. Fix: provide a valid, unexpired token."
                    : "The server knows who you are — but your role isn't allowed here. Fix: use an account with the required permissions."}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
