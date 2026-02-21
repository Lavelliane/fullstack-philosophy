"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, PowerOff, AlertCircle, Send, RotateCcw, CheckCircle2, XCircle, Info } from "lucide-react";

type CircuitState = "closed" | "open" | "half-open";

type LogEntry = {
  id: number;
  message: string;
  type: "success" | "failure" | "system";
};

const FAILURE_THRESHOLD = 3;
const COOLDOWN_SECONDS = 8;

export default function CircuitSim() {
  const [circuitState, setCircuitState] = useState<CircuitState>("closed");
  const [failureCount, setFailureCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([
    { id: 0, message: "Circuit CLOSED: system operational.", type: "system" },
  ]);
  const logIdRef = useRef(1);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function addLog(message: string, type: LogEntry["type"]) {
    setLog((prev) => [
      { id: logIdRef.current++, message, type },
      ...prev.slice(0, 7),
    ]);
  }

  function startCooldown() {
    setCooldown(COOLDOWN_SECONDS);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          setCircuitState("half-open");
          addLog(
            `Cooldown expired → Circuit HALF-OPEN. Next request is a probe.`,
            "system"
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  function sendRequest() {
    const reqNum = requestCount + 1;
    setRequestCount(reqNum);

    if (circuitState === "open") {
      addLog(`Request #${reqNum} → CIRCUIT OPEN: fast fail. Not sent.`, "failure");
      return;
    }

    const success = Math.random() < 0.65;

    if (circuitState === "half-open") {
      if (success) {
        addLog(`Request #${reqNum} → Probe SUCCESS → Circuit CLOSED.`, "success");
        setCircuitState("closed");
        setFailureCount(0);
      } else {
        addLog(`Request #${reqNum} → Probe FAILED → Circuit re-OPENED.`, "failure");
        setCircuitState("open");
        startCooldown();
      }
      return;
    }

    if (success) {
      addLog(`Request #${reqNum} → Success (200 OK).`, "success");
      setFailureCount(0);
    } else {
      const newCount = failureCount + 1;
      setFailureCount(newCount);
      if (newCount >= FAILURE_THRESHOLD) {
        addLog(
          `Request #${reqNum} → Failure #${newCount} → Threshold reached → Circuit OPEN.`,
          "failure"
        );
        setCircuitState("open");
        startCooldown();
      } else {
        addLog(
          `Request #${reqNum} → Failure #${newCount}/${FAILURE_THRESHOLD}.`,
          "failure"
        );
      }
    }
  }

  function handleReset() {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setCircuitState("closed");
    setFailureCount(0);
    setRequestCount(0);
    setCooldown(0);
    logIdRef.current = 1;
    setLog([{ id: 0, message: "Circuit CLOSED: system reset.", type: "system" }]);
  }

  const stateConfig = {
    closed: {
      label: "CLOSED",
      description: "Normal operation. Requests pass through.",
      dot: "bg-emerald-500",
      ring: "ring-emerald-200",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      Icon: Zap,
    },
    open: {
      label: "OPEN",
      description: cooldown > 0 ? `Failing fast. Cooldown: ${cooldown}s` : "Failing fast.",
      dot: "bg-red-500",
      ring: "ring-red-200",
      text: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      Icon: PowerOff,
    },
    "half-open": {
      label: "HALF-OPEN",
      description: "Probing. Next request decides the circuit.",
      dot: "bg-amber-400",
      ring: "ring-amber-200",
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      Icon: AlertCircle,
    },
  };

  const config = stateConfig[circuitState];
  const StateIcon = config.Icon;

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-zinc-500" />
          <p className="text-sm font-medium text-zinc-900">Circuit Breaker Simulator</p>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Hit "Send Request" repeatedly. Fail {FAILURE_THRESHOLD}× in a row and
          watch the circuit open. Wait for cooldown, then try again.
        </p>
      </div>

      {/* State Indicator */}
      <div className={`flex items-center gap-4 border p-4 ${config.bg} ${config.border}`}>
        <StateIcon className={`w-5 h-5 shrink-0 ${config.text}`} />
        <div>
          <p className={`text-xs font-mono font-medium ${config.text}`}>
            {config.label}
          </p>
          <p className={`text-xs mt-0.5 ${config.text} opacity-80`}>
            {config.description}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-zinc-400">Failures</p>
          <p className="text-lg font-mono font-medium text-zinc-700">
            {failureCount}
            <span className="text-xs text-zinc-400">/{FAILURE_THRESHOLD}</span>
          </p>
        </div>
      </div>

      {/* State Machine Diagram */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono">
        {(["closed", "open", "half-open"] as CircuitState[]).map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span
              className={`px-2 py-1 border text-xs ${
                circuitState === s
                  ? `${stateConfig[s].border} ${stateConfig[s].text} ${stateConfig[s].bg} font-medium`
                  : "border-zinc-200 text-zinc-400"
              }`}
            >
              {stateConfig[s].label}
            </span>
            {i < 2 && <span className="text-zinc-300">→</span>}
          </span>
        ))}
      </div>

      {/* Action */}
      <div className="flex items-center gap-3">
        <button
          onClick={sendRequest}
          className={`flex items-center gap-2 text-xs font-medium px-5 py-2.5 border transition-colors duration-200 ${
            circuitState === "open"
              ? "border-red-300 text-red-500 bg-red-50 cursor-not-allowed"
              : "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          {circuitState === "open" ? "Circuit Open: fail fast" : "Send Request"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        <span className="ml-auto text-xs font-mono text-zinc-300">
          #{requestCount} total
        </span>
      </div>

      {/* Log */}
      <div className="bg-zinc-50 border border-zinc-200 p-3 flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
          Request log
        </p>
        {log.map((entry) => {
          const LogIcon =
            entry.type === "success"
              ? CheckCircle2
              : entry.type === "failure"
              ? XCircle
              : Info;
          return (
            <div
              key={entry.id}
              className={`flex items-start gap-2 text-xs font-mono leading-relaxed ${
                entry.type === "success"
                  ? "text-emerald-600"
                  : entry.type === "failure"
                  ? "text-red-500"
                  : "text-zinc-400"
              }`}
            >
              <LogIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{entry.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
