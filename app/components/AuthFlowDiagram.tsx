"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserPlus, LogIn } from "lucide-react";
import type { AuthFlowStep } from "../backend/data";

// ── Shared primitives ─────────────────────────────────────────────────────────
function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="border border-zinc-300 bg-white overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 border-b border-zinc-200 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-[10px] font-mono text-zinc-500">{url}</div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

function TerminalPanel({ title, lines, note }: {
  title: string;
  lines: { text: string; color?: string; delay: number }[];
  note?: { color: string; border: string; bg: string; text: string };
}) {
  return (
    <div className="bg-zinc-950 font-mono text-xs p-5 h-full overflow-auto">
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">{title}</p>
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: line.delay, duration: 0.2 }} className={line.color ?? "text-zinc-300"}>
            {line.text}
          </motion.p>
        ))}
      </div>
      {note && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (lines[lines.length - 1]?.delay ?? 0) + 0.25 }} className={`mt-4 border px-3 py-2 ${note.border} ${note.bg}`}>
          <p className={`text-[11px] ${note.color}`}>{note.text}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Register panels ───────────────────────────────────────────────────────────
function RegStep0() {
  return (
    <BrowserChrome url="school-portal.edu/register">
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">Create an account</p>
        <p className="text-[11px] text-zinc-400 mb-4">Join the school portal</p>
        <div className="space-y-2.5 mb-4">
          {([["Full name","Ada Lovelace"],["Email","ada@school.edu"],["Password","••••••••••"]] as [string,string][]).map(([label, val]) => (
            <div key={label}>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">{label}</label>
              <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 font-mono">{val}</div>
            </div>
          ))}
        </div>
        <button disabled className="w-full text-xs font-medium py-2.5 px-4 bg-zinc-900 text-white border border-zinc-900">Create account</button>
      </div>
    </BrowserChrome>
  );
}

function RegStep1() {
  return (
    <TerminalPanel title="Controller — validate DTO"
      lines={[
        { text: "// Zod schema parse", color: "text-zinc-500", delay: 0 },
        { text: "const parsed = schema.safeParse(req.body)", delay: 0.1 },
        { text: "", delay: 0.18 },
        { text: "// Input received:", color: "text-zinc-500", delay: 0.22 },
        { text: '{ name: "Ada Lovelace",', color: "text-emerald-300", delay: 0.3 },
        { text: '  email: "ada@school.edu",', color: "text-emerald-300", delay: 0.38 },
        { text: '  password: "••••••••••" }', color: "text-emerald-300", delay: 0.46 },
        { text: "", delay: 0.52 },
        { text: "✓ parsed.success === true", color: "text-emerald-400", delay: 0.6 },
      ]}
      note={{ color: "text-violet-300", border: "border-violet-800", bg: "bg-violet-950/40", text: "Shape is valid. Passes to the service layer. If any field were missing or malformed, a 400 would be returned here — before any auth logic runs." }}
    />
  );
}

function RegStep2() {
  return (
    <TerminalPanel title="Service — hash the password"
      lines={[
        { text: "// bcrypt — saltRounds=12 (~250ms deliberately)", color: "text-zinc-500", delay: 0 },
        { text: "const hash = await bcrypt.hash(password, 12)", delay: 0.1 },
        { text: "", delay: 0.18 },
        { text: "// Result:", color: "text-zinc-500", delay: 0.22 },
        { text: '"$2b$12$eImiTXuWVxfM37uY4JANjQ', color: "text-amber-300", delay: 0.35 },
        { text: ' eim7EkpoqZe/u/dZL.9KLaByui0hp2"', color: "text-amber-300", delay: 0.45 },
        { text: "", delay: 0.52 },
        { text: "// Original password: gone.", color: "text-zinc-500", delay: 0.6 },
        { text: "// Salt embedded in hash output.", color: "text-zinc-500", delay: 0.68 },
      ]}
      note={{ color: "text-amber-300", border: "border-amber-800", bg: "bg-amber-950/40", text: "The plaintext password is never stored. bcrypt auto-generates a unique salt per user and embeds it in the output — no separate salt column needed." }}
    />
  );
}

function RegStep3() {
  return (
    <TerminalPanel title="Repository — persist to database"
      lines={[
        { text: "await db.users.create({", delay: 0 },
        { text: '  email: "ada@school.edu",', delay: 0.1 },
        { text: '  name:  "Ada Lovelace",', delay: 0.18 },
        { text: '  passwordHash: "$2b$12$eImi..."', color: "text-amber-300", delay: 0.26 },
        { text: "})", delay: 0.34 },
        { text: "", delay: 0.4 },
        { text: "// INSERT INTO users ... 1 row affected", color: "text-emerald-400", delay: 0.5 },
        { text: "// id: 42, createdAt: 2026-01-15T09:00:00Z", color: "text-zinc-500", delay: 0.6 },
      ]}
      note={{ color: "text-emerald-300", border: "border-emerald-800", bg: "bg-emerald-950/40", text: "Only the hash reaches the database. If the DB is breached, attackers get hashes — not passwords. bcrypt's slowness makes brute-forcing those hashes impractical." }}
    />
  );
}

function RegStep4() {
  return (
    <BrowserChrome url="school-portal.edu/register">
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">Create an account</p>
        <p className="text-[11px] text-zinc-400 mb-4">Join the school portal</p>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="border border-emerald-300 bg-emerald-50 px-4 py-3 mb-3">
          <p className="text-xs font-medium text-emerald-700 mb-0.5">Account created</p>
          <p className="text-[11px] text-emerald-600">Welcome, Ada. Please log in to continue.</p>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[10px] font-mono text-zinc-400 text-center">
          201 Created · No token issued yet
        </motion.p>
      </div>
    </BrowserChrome>
  );
}

// ── Login panels ──────────────────────────────────────────────────────────────
function LoginStep0() {
  return (
    <BrowserChrome url="school-portal.edu/login">
      <div className="p-5">
        <p className="text-xs font-semibold text-zinc-900 mb-0.5">Sign in</p>
        <p className="text-[11px] text-zinc-400 mb-4">Welcome back</p>
        <div className="space-y-2.5 mb-4">
          {([["Email","ada@school.edu"],["Password","••••••••••"]] as [string,string][]).map(([label, val]) => (
            <div key={label}>
              <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">{label}</label>
              <div className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 font-mono">{val}</div>
            </div>
          ))}
        </div>
        <button disabled className="w-full text-xs font-medium py-2.5 px-4 bg-zinc-900 text-white border border-zinc-900">Sign in</button>
      </div>
    </BrowserChrome>
  );
}

function LoginStep1() {
  return (
    <TerminalPanel title="Repository — find the user"
      lines={[
        { text: "const user = await db.users.findOne({", delay: 0 },
        { text: '  email: "ada@school.edu"', delay: 0.1 },
        { text: "})", delay: 0.18 },
        { text: "", delay: 0.24 },
        { text: "// Result:", color: "text-zinc-500", delay: 0.3 },
        { text: "{ id: 42,", color: "text-emerald-300", delay: 0.38 },
        { text: '  email: "ada@school.edu",', color: "text-emerald-300", delay: 0.46 },
        { text: '  passwordHash: "$2b$12$eImi...",', color: "text-amber-300", delay: 0.54 },
        { text: '  role: "student" }', color: "text-emerald-300", delay: 0.62 },
      ]}
      note={{ color: "text-zinc-400", border: "border-zinc-700", bg: "bg-zinc-900/60", text: 'If email not found, return a generic "Invalid credentials" — never reveal whether it was the email or password that was wrong. That detail helps attackers enumerate accounts.' }}
    />
  );
}

function LoginStep2() {
  return (
    <TerminalPanel title="Service — compare passwords"
      lines={[
        { text: "const match = await bcrypt.compare(", delay: 0 },
        { text: "  password,          // submitted plaintext", color: "text-zinc-500", delay: 0.1 },
        { text: "  user.passwordHash  // stored hash", color: "text-zinc-500", delay: 0.18 },
        { text: ")", delay: 0.26 },
        { text: "", delay: 0.32 },
        { text: "// bcrypt re-hashes input using embedded salt,", color: "text-zinc-500", delay: 0.38 },
        { text: "// then compares — takes ~250ms deliberately.", color: "text-zinc-500", delay: 0.46 },
        { text: "", delay: 0.52 },
        { text: "match === true  ✓", color: "text-emerald-400", delay: 0.6 },
      ]}
      note={{ color: "text-amber-300", border: "border-amber-800", bg: "bg-amber-950/40", text: "The deliberate slowness (~250ms) is a feature. It makes brute-forcing a stolen hash database take years instead of hours." }}
    />
  );
}

function LoginStep3() {
  return (
    <TerminalPanel title="Service — sign a JWT"
      lines={[
        { text: "const payload = {", delay: 0 },
        { text: "  userId: 42,", color: "text-violet-300", delay: 0.1 },
        { text: '  email:  "ada@school.edu",', color: "text-violet-300", delay: 0.18 },
        { text: '  role:   "student"', color: "text-violet-300", delay: 0.26 },
        { text: "}", delay: 0.34 },
        { text: "const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })", delay: 0.46 },
        { text: "", delay: 0.54 },
        { text: "// eyJhbGciOiJIUzI1NiJ9.eyJ1c2...", color: "text-emerald-400", delay: 0.64 },
      ]}
      note={{ color: "text-violet-300", border: "border-violet-800", bg: "bg-violet-950/40", text: "The payload is readable by anyone — it's Base64, not encrypted. The signature is what you can't fake. Changing role to admin invalidates the signature." }}
    />
  );
}

function LoginStep4() {
  return (
    <TerminalPanel title="Controller — set secure cookie"
      lines={[
        { text: 'res.cookie("token", jwt, {', delay: 0 },
        { text: "  httpOnly: true,    // JS can't read it (XSS-safe)", color: "text-zinc-500", delay: 0.12 },
        { text: "  secure:   true,    // HTTPS only", color: "text-zinc-500", delay: 0.24 },
        { text: '  sameSite: "strict" // no cross-site sends (CSRF)', color: "text-zinc-500", delay: 0.36 },
        { text: "})", delay: 0.48 },
        { text: "", delay: 0.54 },
        { text: "// Three lines. Three attack vectors closed.", color: "text-emerald-400", delay: 0.64 },
      ]}
      note={{ color: "text-emerald-300", border: "border-emerald-800", bg: "bg-emerald-950/40", text: "httpOnly blocks XSS. secure blocks plain HTTP interception. sameSite strict blocks CSRF. The browser attaches this cookie automatically on every subsequent request." }}
    />
  );
}

function LoginStep5() {
  return (
    <BrowserChrome url="school-portal.edu/dashboard">
      <div className="p-5">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="border border-emerald-300 bg-emerald-50 px-4 py-3 mb-4">
          <p className="text-xs font-medium text-emerald-700 mb-0.5">Signed in</p>
          <p className="text-[11px] text-emerald-600">Welcome back, Ada Lovelace.</p>
        </motion.div>
        <div className="space-y-2">
          {["My Courses", "Grades", "Schedule", "Settings"].map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">{item}</motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-[10px] font-mono text-zinc-400 mt-3 text-center">
          200 OK · JWT cookie set · authenticated
        </motion.p>
      </div>
    </BrowserChrome>
  );
}

// ── Panel switcher ────────────────────────────────────────────────────────────
const REG_PANELS = [<RegStep0 key={0}/>,<RegStep1 key={1}/>,<RegStep2 key={2}/>,<RegStep3 key={3}/>,<RegStep4 key={4}/>];
const LOGIN_PANELS = [<LoginStep0 key={0}/>,<LoginStep1 key={1}/>,<LoginStep2 key={2}/>,<LoginStep3 key={3}/>,<LoginStep4 key={4}/>,<LoginStep5 key={5}/>];

function StepPanel({ tab, stepIndex }: { tab: Tab; stepIndex: number }) {
  const panels = tab === "register" ? REG_PANELS : LOGIN_PANELS;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={`${tab}-${stepIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26 }} className="h-full">
        {panels[stepIndex] ?? panels[0]}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Layer sidebar ─────────────────────────────────────────────────────────────
const LAYER_COLORS: Record<string, string> = {
  Client:     "bg-blue-50 border-blue-300 text-blue-800",
  Controller: "bg-indigo-50 border-indigo-300 text-indigo-800",
  Service:    "bg-violet-50 border-violet-300 text-violet-800",
  Repository: "bg-amber-50 border-amber-300 text-amber-800",
  Response:   "bg-emerald-50 border-emerald-300 text-emerald-800",
};

function LayerSidebar({ steps, activeIndex }: { steps: AuthFlowStep[]; activeIndex: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((step, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        const color = LAYER_COLORS[step.label] ?? "bg-zinc-50 border-zinc-200 text-zinc-700";
        return (
          <div key={step.id} className={`flex items-center gap-2 border px-3 py-2 text-xs font-mono transition-all duration-300 ${isActive ? `${color} shadow-sm` : isPast ? "border-zinc-200 bg-zinc-50 text-zinc-400" : "border-zinc-100 bg-white text-zinc-300"}`}>
            <span className="text-[10px] opacity-50 w-3 shrink-0">{i + 1}</span>
            <span className="truncate">{step.label}</span>
            {isPast && <span className="ml-auto text-emerald-500 text-[10px] shrink-0">✓</span>}
            {isActive && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-auto text-[10px] shrink-0">●</motion.span>}
          </div>
        );
      })}
    </div>
  );
}

type Tab = "register" | "login";
type AuthFlowDiagramProps = { registerSteps: AuthFlowStep[]; loginSteps: AuthFlowStep[] };

export default function AuthFlowDiagram({ registerSteps, loginSteps }: AuthFlowDiagramProps) {
  const [tab, setTab] = useState<Tab>("register");
  const [stepIndex, setStepIndex] = useState(0);

  const steps = tab === "register" ? registerSteps : loginSteps;
  const active = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function handleTabChange(next: Tab) {
    setTab(next);
    setStepIndex(0);
  }

  function handleNext() {
    setStepIndex((p) => (p + 1) % steps.length);
  }

  function handleReset() {
    setStepIndex(0);
  }

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-0.5">Auth flow simulation</p>
        <p className="text-[11px] text-zinc-400">Step through every layer of the auth pipeline.</p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => handleTabChange("register")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors duration-150 border-r border-zinc-200 ${tab === "register" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          Registration flow
        </button>
        <button
          onClick={() => handleTabChange("login")}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors duration-150 ${tab === "login" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}
        >
          <LogIn className="w-3.5 h-3.5" />
          Login flow
        </button>
      </div>

      {/* Main split panel */}
      <div className="grid lg:grid-cols-[1fr_200px] min-h-[320px]">
        <div className="p-5 border-r border-zinc-100 min-h-[320px]">
          <StepPanel tab={tab} stepIndex={stepIndex} />
        </div>
        <div className="p-4 bg-zinc-50/60">
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-3">Pipeline layers</p>
          <LayerSidebar steps={steps} activeIndex={stepIndex} />
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4 border-t border-zinc-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${stepIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-1">{active?.sublabel}</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{active?.note}</p>
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
            <button onClick={handleReset} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-200">
              Reset
            </button>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-300">{stepIndex + 1} / {steps.length}</span>
      </div>
    </div>
  );
}
