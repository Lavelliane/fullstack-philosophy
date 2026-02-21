"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

type SegmentKey = "header" | "payload" | "signature";

type JwtPart = {
  label: string;
  segment: number;
  decoded: Record<string, unknown> | null;
  explanation: string;
};

type JwtInspectorProps = {
  token: string;
  parts: Record<SegmentKey, JwtPart>;
};

const SEGMENT_STYLES: Record<SegmentKey, { text: string; bg: string; border: string; dot: string }> = {
  header:    { text: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    dot: "bg-red-500" },
  payload:   { text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500" },
  signature: { text: "text-cyan-600",   bg: "bg-cyan-50",   border: "border-cyan-200",   dot: "bg-cyan-500" },
};

const TOKEN_TEXT_STYLES: Record<SegmentKey, string> = {
  header:    "text-red-500",
  payload:   "text-violet-500",
  signature: "text-cyan-500",
};

export default function JwtInspector({ token, parts }: JwtInspectorProps) {
  const [expanded, setExpanded] = useState<SegmentKey | null>(null);
  const segments = token.split(".");

  function toggle(key: SegmentKey) {
    setExpanded((prev) => (prev === key ? null : key));
  }

  const segmentKeys: SegmentKey[] = ["header", "payload", "signature"];

  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-5">
      <div>
        <p className="text-sm font-medium text-zinc-900">JWT Anatomy</p>
        <p className="text-xs text-zinc-400 mt-1">
          A JWT has three Base64-encoded parts separated by dots. Click each part to inspect it.
        </p>
      </div>

      {/* Token display */}
      <div className="bg-zinc-950 rounded-none p-4 overflow-x-auto">
        <p className="font-mono text-[11px] leading-relaxed break-all">
          {segmentKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`hover:opacity-80 transition-opacity duration-150 underline-offset-2 ${
                expanded === key ? "underline" : ""
              } ${TOKEN_TEXT_STYLES[key]}`}
            >
              {segments[i]}
            </button>
          )).reduce<React.ReactNode[]>((acc, el, i) => {
            if (i === 0) return [el];
            return [...acc, <span key={`dot-${i}`} className="text-zinc-500">.</span>, el];
          }, [])}
        </p>
      </div>

      {/* Segment pills */}
      <div className="flex flex-wrap gap-2">
        {segmentKeys.map((key) => {
          const part = parts[key];
          const styles = SEGMENT_STYLES[key];
          const isOpen = expanded === key;
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border transition-all duration-150 ${
                isOpen
                  ? `${styles.bg} ${styles.border} ${styles.text}`
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
              {part.label}
              {isOpen ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key={expanded}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className={`border p-4 flex flex-col gap-3 ${SEGMENT_STYLES[expanded].border} ${SEGMENT_STYLES[expanded].bg}`}
            >
              <p className={`text-xs font-medium ${SEGMENT_STYLES[expanded].text}`}>
                {parts[expanded].label}
              </p>

              {parts[expanded].decoded !== null ? (
                <pre className="bg-white border border-zinc-200 px-4 py-3 text-[11px] font-mono text-zinc-700 leading-[1.7] overflow-x-auto whitespace-pre rounded-none">
                  {JSON.stringify(parts[expanded].decoded, null, 2)}
                </pre>
              ) : (
                <div className="bg-white border border-zinc-200 px-4 py-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {segments[2]}
                  </span>
                </div>
              )}

              <p className={`text-xs leading-relaxed ${SEGMENT_STYLES[expanded].text} opacity-80`}>
                {parts[expanded].explanation}
              </p>

              {expanded === "payload" && (
                <div className="flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    Base64 is <strong>not</strong> encryption. Anyone can decode this in seconds.
                    Never store passwords, card numbers, or secrets in a JWT payload.
                  </p>
                </div>
              )}

              {expanded === "header" && (
                <div className="flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    Always use <strong>HS256</strong> or stronger. Some older libraries accept{" "}
                    <code className="font-mono">alg: &quot;none&quot;</code> — which disables
                    signature verification entirely. Always validate the algorithm.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && (
        <p className="text-xs text-zinc-400">
          ↑ Click a segment above to inspect its decoded contents.
        </p>
      )}
    </div>
  );
}
