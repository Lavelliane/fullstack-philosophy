"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { AuthSimScenario } from "../backend/data";

type PipelineNode = { id: string; label: string; sublabel: string; failKey: "auth" | "authz" | null };

const PIPELINE: PipelineNode[] = [
  { id: "client",     label: "Client",     sublabel: "HTTP Request",   failKey: null },
  { id: "auth",       label: "Auth",        sublabel: "jwt.verify()",   failKey: "auth" },
  { id: "authz",      label: "Authz",       sublabel: "requireRole()",  failKey: "authz" },
  { id: "controller", label: "Controller",  sublabel: "Business logic", failKey: null },
  { id: "response",   label: "Response",    sublabel: "200 / 4xx",      failKey: null },
];

const NODE_COLORS = [
  "bg-blue-50 border-blue-300 text-blue-800",
  "bg-indigo-50 border-indigo-300 text-indigo-800",
  "bg-violet-50 border-violet-300 text-violet-800",
  "bg-zinc-100 border-zinc-300 text-zinc-800",
  "bg-emerald-50 border-emerald-300 text-emerald-800",
];

// ── Shared primitives ─────────────────────────────────────────────────────────
function TLines({ lines }: { lines: { text: string; color?: string; delay: number }[] }) {
  return (
    <div className="space-y-0.5">
      {lines.map((l, i) => (
        <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: l.delay, duration: 0.18 }} className={l.color ?? "text-zinc-300"}>{l.text}</motion.p>
      ))}
    </div>
  );
}

function Term({ title, note, children }: { title: string; note?: { text: string; color: string; border: string; bg: string }; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">{title}</p>
      {children}
      {note && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className={`mt-4 border px-3 py-2 ${note.border} ${note.bg}`}>
          <p className={`text-[11px] ${note.color}`}>{note.text}</p>
        </motion.div>
      )}
    </div>
  );
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-zinc-300 bg-white overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 border-b border-zinc-200 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-[10px] font-mono text-zinc-500">school-portal.edu/admin/users</div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

// ── Node panels ───────────────────────────────────────────────────────────────
function ClientPanel({ s }: { s: AuthSimScenario }) {
  const hasToken = s.id !== "missing";
  const isExpired = s.id === "expired";
  const role = s.id === "valid" ? "admin" : s.id === "wrong_role" ? "student" : null;
  return (
    <BrowserChrome>
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">DELETE /admin/users/99</p>
        <p className="text-[11px] text-zinc-400 mb-4">Admin action: remove a user account</p>
        <div className="space-y-2 font-mono text-[11px]">
          {[["Method","DELETE"],["URL","/admin/users/99"]].map(([k,v]) => (
            <div key={k} className="border border-zinc-100 bg-zinc-50 px-3 py-2">
              <span className="text-zinc-400">{k}: </span><span className="text-zinc-700">{v}</span>
            </div>
          ))}
          <div className={`border px-3 py-2 ${hasToken ? "border-zinc-100 bg-zinc-50" : "border-red-200 bg-red-50"}`}>
            <span className="text-zinc-400">Authorization: </span>
            {hasToken
              ? <span className={isExpired ? "text-amber-600" : "text-emerald-600"}>Bearer eyJhbGci...{isExpired ? " (expired)" : role ? ` · role: ${role}` : ""}</span>
              : <span className="text-red-500">— not present</span>}
          </div>
        </div>
        {!hasToken && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[10px] text-red-500 mt-3 font-mono">No Authorization header. Will fail at auth middleware.</motion.p>}
      </div>
    </BrowserChrome>
  );
}

function AuthPanel({ s }: { s: AuthSimScenario }) {
  const fails = s.failsAt === "auth";
  const isMissing = s.id === "missing";
  const isExpired = s.id === "expired";
  const role = s.id === "wrong_role" ? "student" : "admin";
  return (
    <Term title="Auth middleware — jwt.verify()" note={fails
      ? { text: `${s.errorMessage} — request blocked here. Controller never runs.`, color: "text-red-300", border: "border-red-800", bg: "bg-red-950/40" }
      : { text: "Identity confirmed. req.user attached. Passing to authz.", color: "text-emerald-300", border: "border-emerald-800", bg: "bg-emerald-950/40" }
    }>
      <TLines lines={[
        { text: "const token = req.cookies?.token", color: "text-zinc-500", delay: 0 },
        { text: "  ?? req.headers.authorization?.split(' ')[1]", color: "text-zinc-500", delay: 0.08 },
        { text: "", delay: 0.14 },
        ...(isMissing ? [
          { text: "// token === undefined", color: "text-zinc-500", delay: 0.2 },
          { text: "if (!token) return res.status(401)", color: "text-red-400", delay: 0.3 },
          { text: '  .json({ error: "No token provided" })', color: "text-red-400", delay: 0.38 },
        ] : [
          { text: "const decoded = jwt.verify(token, process.env.JWT_SECRET)", delay: 0.2 },
          { text: "", delay: 0.3 },
          ...(isExpired ? [
            { text: "// TokenExpiredError thrown", color: "text-zinc-500", delay: 0.36 },
            { text: 'catch → res.status(401).json({ error: "Token expired" })', color: "text-red-400", delay: 0.46 },
          ] : [
            { text: "// decoded:", color: "text-zinc-500", delay: 0.36 },
            { text: `{ userId: 42, email: "ada@school.edu",`, color: "text-emerald-300", delay: 0.46 },
            { text: `  role: "${role}" }`, color: "text-emerald-300", delay: 0.54 },
            { text: "req.user = decoded", color: "text-zinc-500", delay: 0.62 },
            { text: "next()  ✓", color: "text-emerald-400", delay: 0.7 },
          ]),
        ]),
      ]} />
    </Term>
  );
}

function AuthzPanel({ s }: { s: AuthSimScenario }) {
  const fails = s.failsAt === "authz";
  const role = s.id === "wrong_role" ? "student" : "admin";
  return (
    <Term title="Authz middleware — requireRole('admin')" note={fails
      ? { text: "Identity confirmed, access denied. The server knows who you are — you just lack the required role.", color: "text-amber-300", border: "border-amber-800", bg: "bg-amber-950/40" }
      : { text: "Role confirmed. Passing to controller.", color: "text-emerald-300", border: "border-emerald-800", bg: "bg-emerald-950/40" }
    }>
      <TLines lines={[
        { text: "// req.user was attached by authenticate()", color: "text-zinc-500", delay: 0 },
        { text: `// req.user.role = "${role}"`, color: fails ? "text-amber-300" : "text-emerald-300", delay: 0.1 },
        { text: "// required: 'admin'", color: "text-zinc-500", delay: 0.18 },
        { text: "", delay: 0.24 },
        ...(fails ? [
          { text: `roles.includes("${role}") → false`, color: "text-red-400", delay: 0.32 },
          { text: 'return res.status(403).json({ error: "Insufficient permissions" })', color: "text-red-400", delay: 0.42 },
        ] : [
          { text: `roles.includes("${role}") → true  ✓`, color: "text-emerald-400", delay: 0.32 },
          { text: "next()", color: "text-emerald-300", delay: 0.42 },
        ]),
      ]} />
    </Term>
  );
}

function ControllerPanel() {
  return (
    <Term title="Controller — business logic runs" note={{ text: "This code only runs because both middleware checks passed. The controller trusts req.user completely.", color: "text-indigo-300", border: "border-indigo-800", bg: "bg-indigo-950/40" }}>
      <TLines lines={[
        { text: "app.delete('/admin/users/:id',", delay: 0 },
        { text: "  authenticate,         // ✓ passed", color: "text-emerald-400", delay: 0.1 },
        { text: "  requireRole('admin'), // ✓ passed", color: "text-emerald-400", delay: 0.18 },
        { text: "  async (req, res) => {", delay: 0.26 },
        { text: "    await userService.delete(req.params.id)", delay: 0.36 },
        { text: "    return res.status(204).send()", delay: 0.46 },
        { text: "  }", delay: 0.54 },
        { text: ")", delay: 0.6 },
        { text: "", delay: 0.66 },
        { text: "// DELETE FROM users WHERE id = 99", color: "text-zinc-500", delay: 0.74 },
        { text: "// 1 row affected", color: "text-emerald-400", delay: 0.82 },
      ]} />
    </Term>
  );
}

function ResponsePanel({ s }: { s: AuthSimScenario }) {
  const ok = s.failsAt === null;
  const c = ok ? "text-emerald-400" : s.statusCode === 401 ? "text-red-400" : "text-amber-400";
  const statusText = ok ? "No Content" : s.statusCode === 401 ? "Unauthorized" : "Forbidden";
  return (
    <Term title="Response">
      <TLines lines={[
        { text: `HTTP/1.1 ${s.statusCode} ${statusText}`, color: c, delay: 0 },
        { text: "Content-Type: application/json", color: "text-zinc-500", delay: 0.1 },
        { text: "", delay: 0.16 },
        ...(ok
          ? [{ text: "// 204 — no body. User 99 deleted.", color: "text-emerald-400", delay: 0.24 }]
          : [{ text: "{", delay: 0.24 }, { text: `  "error": "${s.errorMessage}"`, color: "text-red-300", delay: 0.34 }, { text: "}", delay: 0.42 }]
        ),
      ]} />
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className={`mt-4 border px-3 py-2 ${ok ? "border-emerald-800 bg-emerald-950/40" : s.statusCode === 401 ? "border-red-800 bg-red-950/40" : "border-amber-800 bg-amber-950/40"}`}>
        <p className={`text-[10px] uppercase tracking-wider mb-1 ${c}`}>{ok ? "Request succeeded" : s.statusCode === 401 ? "401 Unauthorized" : "403 Forbidden"}</p>
        <p className={`text-[11px] ${ok ? "text-emerald-300" : s.statusCode === 401 ? "text-red-300" : "text-amber-300"}`}>
          {ok ? "All three questions answered. Identity verified, role confirmed, action executed."
            : s.statusCode === 401 ? "The server doesn't know who you are. Provide a valid, unexpired token."
            : "The server knows who you are — but your role isn't allowed here."}
        </p>
      </motion.div>
    </Term>
  );
}

function StepPanel({ nodeIndex, scenario }: { nodeIndex: number; scenario: AuthSimScenario }) {
  const map: Record<number, React.ReactNode> = {
    0: <ClientPanel s={scenario} />,
    1: <AuthPanel s={scenario} />,
    2: <AuthzPanel s={scenario} />,
    3: <ControllerPanel />,
    4: <ResponsePanel s={scenario} />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={`${scenario.id}-${nodeIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26 }} className="h-full">
        {map[nodeIndex] ?? <ClientPanel s={scenario} />}
      </motion.div>
    </AnimatePresence>
  );
}

type AuthSimProps = { scenarios: AuthSimScenario[] };

// ── Pipeline sidebar ──────────────────────────────────────────────────────────
function PipelineSidebar({ activeIndex, scenario }: { activeIndex: number; scenario: AuthSimScenario }) {
  const failIndex = scenario.failsAt
    ? PIPELINE.findIndex((n) => n.failKey === scenario.failsAt)
    : PIPELINE.length;

  return (
    <div className="flex flex-col gap-1.5">
      {PIPELINE.map((node, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        const isBlocked = i > failIndex;
        const isFailNode = i === failIndex && activeIndex > failIndex;
        const color = NODE_COLORS[i];
        return (
          <div
            key={node.id}
            className={`flex items-center gap-2 border px-3 py-2 text-xs font-mono transition-all duration-300 ${
              isActive ? `${color} shadow-sm`
              : isPast && !isBlocked ? "border-zinc-200 bg-zinc-50 text-zinc-400"
              : isBlocked ? "border-zinc-100 bg-white text-zinc-200 opacity-50"
              : "border-zinc-100 bg-white text-zinc-300"
            }`}
          >
            <span className="text-[10px] opacity-50 w-3 shrink-0">{i + 1}</span>
            <span className="truncate">{node.label}</span>
            {isPast && !isBlocked && !isFailNode && <span className="ml-auto text-emerald-500 text-[10px] shrink-0">✓</span>}
            {isFailNode && <span className="ml-auto text-red-500 text-[10px] shrink-0">✗</span>}
            {isActive && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-auto text-[10px] shrink-0">●</motion.span>}
          </div>
        );
      })}
    </div>
  );
}

// ── Per-node descriptions ─────────────────────────────────────────────────────
const NODE_DESCRIPTIONS: Record<string, { title: string; note: string }> = {
  client:     { title: "Client sends the request", note: "The browser or API client builds the HTTP request and attaches the token — either as a cookie or an Authorization header. The server hasn't seen it yet." },
  auth:       { title: "Auth middleware runs first", note: "jwt.verify() checks the token's signature and expiry. If it fails, the request stops here with a 401. The controller never runs. This is the 'Who are you?' check." },
  authz:      { title: "Authz middleware checks the role", note: "requireRole() reads req.user.role — attached by the previous middleware. If the role doesn't match, the request stops with a 403. This is the 'Are you allowed?' check." },
  controller: { title: "Controller runs the business logic", note: "Both gates passed. The controller trusts req.user completely — it was verified upstream. This is where the actual work happens: DB writes, service calls, responses." },
  response:   { title: "Response returned to client", note: "The pipeline is complete. 204 on success, 401 if identity failed, 403 if role failed. The status code tells the client exactly what went wrong and why." },
};

export default function AuthSim({ scenarios }: AuthSimProps) {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id);
  const [nodeIndex, setNodeIndex] = useState(0);

  const selected = scenarios.find((s) => s.id === selectedId) ?? scenarios[0];
  const isLast = nodeIndex === PIPELINE.length - 1;
  const activeNode = PIPELINE[nodeIndex];
  const desc = NODE_DESCRIPTIONS[activeNode.id];

  function handleScenarioChange(id: string) {
    setSelectedId(id);
    setNodeIndex(0);
  }

  function handleNext() {
    setNodeIndex((p) => (p + 1) % PIPELINE.length);
  }

  function handleReset() {
    setNodeIndex(0);
  }

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-0.5">Auth middleware simulator</p>
        <p className="text-[11px] text-zinc-400">Pick a scenario and step through the pipeline to see where and why it passes or fails.</p>
      </div>

      {/* Scenario pills */}
      <div className="flex flex-wrap gap-0 border-b border-zinc-200">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(s.id)}
            className={`text-xs font-medium px-4 py-3 border-r border-zinc-200 transition-colors duration-150 ${
              selectedId === s.id ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main split panel */}
      <div className="grid lg:grid-cols-[1fr_200px] min-h-[320px]">
        <div className="p-5 border-r border-zinc-100 min-h-[320px]">
          <StepPanel nodeIndex={nodeIndex} scenario={selected} />
        </div>
        <div className="p-4 bg-zinc-50/60">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-3">Pipeline</p>
          <PipelineSidebar activeIndex={nodeIndex} scenario={selected} />
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4 border-t border-zinc-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedId}-${nodeIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-1">{desc.title}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{desc.note}</p>
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
          {nodeIndex > 0 && (
            <button onClick={handleReset} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">
              Reset
            </button>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-300">{nodeIndex + 1} / {PIPELINE.length}</span>
      </div>
    </div>
  );
}
