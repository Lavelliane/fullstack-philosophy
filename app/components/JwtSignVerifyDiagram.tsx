"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Key, CheckCircle2, XCircle, User, Shield, Clock, FileText } from "lucide-react";

type Tab = "sign" | "verify";

export default function JwtSignVerifyDiagram() {
  const [activeTab, setActiveTab] = useState<Tab>("sign");

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Tab switcher */}
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("sign")}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === "sign"
              ? "bg-zinc-900 text-white"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
          }`}
        >
          Signing a token (login)
        </button>
        <button
          onClick={() => setActiveTab("verify")}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 border-l border-zinc-200 ${
            activeTab === "verify"
              ? "bg-zinc-900 text-white"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
          }`}
        >
          Verifying a token (middleware)
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === "sign" ? <SigningDiagram key="sign" /> : <VerifyingDiagram key="verify" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SigningDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
        When a user logs in successfully, the server creates a signed token containing their identity. This token is like a signed ID card that proves who they are.
      </p>

      {/* Step-by-step flow */}
      <div className="grid gap-4">
        {/* Step 1: User data */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 mb-1">1. User logs in successfully</p>
            <div className="bg-zinc-50 border border-zinc-200 p-3 font-mono text-xs">
              <div className="text-zinc-500">// User data from database</div>
              <div className="text-violet-600">const user = &#123;</div>
              <div className="pl-4 text-zinc-700">id: 42,</div>
              <div className="pl-4 text-zinc-700">email: "ada@school.edu",</div>
              <div className="pl-4 text-zinc-700">role: "student"</div>
              <div className="text-violet-600">&#125;</div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-zinc-200" />
        </div>

        {/* Step 2: Create payload */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 mb-1">2. Create the payload (claims)</p>
            <div className="bg-zinc-50 border border-zinc-200 p-3 font-mono text-xs">
              <div className="text-violet-600">const payload = &#123;</div>
              <div className="pl-4 text-emerald-600">userId: user.id,</div>
              <div className="pl-4 text-emerald-600">email: user.email,</div>
              <div className="pl-4 text-emerald-600">role: user.role</div>
              <div className="text-violet-600">&#125;</div>
            </div>
            <p className="text-xs text-zinc-400 mt-2">This data will be readable by anyone (Base64-encoded, not encrypted)</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-zinc-200" />
        </div>

        {/* Step 3: Sign with secret */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 mb-1">3. Sign with secret key</p>
            <div className="bg-zinc-50 border border-zinc-200 p-3 font-mono text-xs">
              <div className="text-zinc-700">const token = jwt.sign(</div>
              <div className="pl-4 text-violet-600">payload,</div>
              <div className="pl-4 text-amber-600">process.env.JWT_SECRET,</div>
              <div className="pl-4 text-zinc-500">&#123; expiresIn: "1h" &#125;</div>
              <div className="text-zinc-700">)</div>
            </div>
            <p className="text-xs text-zinc-400 mt-2">The secret creates a signature that can't be faked without knowing the secret</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-zinc-200" />
        </div>

        {/* Step 4: Result */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 mb-1">4. Signed JWT token created</p>
            <div className="bg-emerald-50 border border-emerald-300 p-3">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs font-mono text-blue-600 break-all">eyJhbGci...</span>
                <span className="text-xs text-zinc-400">header</span>
              </div>
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs font-mono text-violet-600 break-all">eyJ1c2Vy...</span>
                <span className="text-xs text-zinc-400">payload</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-amber-600 break-all">SflKxwRJ...</span>
                <span className="text-xs text-zinc-400">signature</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mt-2">Send this to the client as a cookie or in the response body</p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-blue-50 border border-blue-200 p-4 mt-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Why signing matters</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Anyone can read the payload (it's just Base64), but they can't change it without invalidating the signature. If someone changes "student" to "admin", jwt.verify() will reject it because the signature won't match.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Frieren conversation types ────────────────────────────────────────────────
type Speaker = "himmel" | "frieren";
type Outcome = "pass" | "fail-missing" | "fail-expired" | "fail-tampered";

const FRIEREN_IMG = "https://static.wikia.nocookie.net/frieren/images/3/35/Frieren_anime_profile.png/revision/latest/scale-to-width-down/120?cb=20230521074853";
const HIMMEL_IMG  = "https://static.wikia.nocookie.net/frieren/images/9/92/Himmel_anime_profile.png/revision/latest/scale-to-width-down/120?cb=20230714204210";

type Message = {
  speaker: Speaker;
  text: string;
  code?: { lines: { text: string; color?: string }[] };
  tag?: string;
  tagColor?: string;
};

const SCENARIOS: Record<Outcome, { label: string; color: string; messages: Message[] }> = {
  "pass": {
    label: "Valid token",
    color: "bg-emerald-900 text-emerald-100",
    messages: [
      {
        speaker: "himmel",
        text: "Excuse me! I'd like to access /dashboard please. I have a token!",
        code: { lines: [
          { text: "GET /dashboard", color: "text-blue-400" },
          { text: "Authorization: Bearer eyJhbGci...", color: "text-zinc-400" },
        ]},
        tag: "req arrives at middleware",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "frieren",
        text: "Hmm. Let me check your cookie first. Then your header. I check both, I don't play favorites.",
        code: { lines: [
          { text: "const token =", color: "text-zinc-300" },
          { text: "  req.cookies?.token ??", color: "text-blue-400" },
          { text: "  req.headers.authorization?.split(' ')[1]", color: "text-blue-400" },
        ]},
        tag: "extract token",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "himmel",
        text: "It's right there! I'm Himmel the Hero, I defeated the Demon King, surely you—",
      },
      {
        speaker: "frieren",
        text: "I've lived a thousand years. I've heard that before. I'm running jwt.verify() regardless.",
        code: { lines: [
          { text: "const decoded = jwt.verify(", color: "text-zinc-300" },
          { text: "  token,", color: "text-violet-400" },
          { text: "  process.env.JWT_SECRET", color: "text-amber-400" },
          { text: ")", color: "text-zinc-300" },
        ]},
        tag: "signature check + expiry check",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "frieren",
        text: "...Signature matches. Not expired. Fine. req.user is now you. next().",
        code: { lines: [
          { text: "req.user = decoded", color: "text-emerald-400" },
          { text: "// { userId: 1, role: 'hero', email: 'himmel@party.dev' }", color: "text-zinc-500" },
          { text: "next()", color: "text-emerald-400" },
        ]},
        tag: "200 — request continues",
        tagColor: "text-emerald-400",
      },
      {
        speaker: "himmel",
        text: "Thank you! You know, I think we're going to be great friends.",
      },
      {
        speaker: "frieren",
        text: "I won't remember this in fifty years. Next request.",
      },
    ],
  },
  "fail-missing": {
    label: "No token",
    color: "bg-red-900 text-red-100",
    messages: [
      {
        speaker: "himmel",
        text: "Hello! I'd like to access /dashboard. I forgot my token at home but I promise I'm a hero.",
        code: { lines: [
          { text: "GET /dashboard", color: "text-blue-400" },
          { text: "// no Authorization header, no cookie", color: "text-zinc-500" },
        ]},
        tag: "req arrives — no token",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "frieren",
        text: "Cookie: nothing. Header: nothing. Token: null.",
        code: { lines: [
          { text: "const token =", color: "text-zinc-300" },
          { text: "  req.cookies?.token ??", color: "text-zinc-500" },
          { text: "  req.headers.authorization?.split(' ')[1]", color: "text-zinc-500" },
          { text: "// → undefined", color: "text-red-400" },
        ]},
      },
      {
        speaker: "himmel",
        text: "But I'm Himmel! The Hero! Surely my reputation—",
      },
      {
        speaker: "frieren",
        text: "I don't store state. I don't remember reputations. I check tokens. You have none. 401.",
        code: { lines: [
          { text: "if (!token)", color: "text-violet-400" },
          { text: "  return res.status(401).json({", color: "text-red-400" },
          { text: "    error: 'No token provided'", color: "text-red-300" },
          { text: "  })", color: "text-red-400" },
        ]},
        tag: "401 Unauthorized — request blocked",
        tagColor: "text-red-400",
      },
      {
        speaker: "himmel",
        text: "This is outrageous! I defeated the Demon King!",
      },
      {
        speaker: "frieren",
        text: "Go log in. Get a token. Come back. That's how this works.",
      },
    ],
  },
  "fail-expired": {
    label: "Expired token",
    color: "bg-amber-900 text-amber-100",
    messages: [
      {
        speaker: "himmel",
        text: "I have a token! It's from... a while ago. But it's still me, I promise.",
        code: { lines: [
          { text: "Authorization: Bearer eyJhbGci...", color: "text-blue-400" },
          { text: "// exp: 1672531200 (Jan 1, 2023)", color: "text-zinc-500" },
        ]},
        tag: "req arrives — old token",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "frieren",
        text: "Token found. Running jwt.verify().",
        code: { lines: [
          { text: "try {", color: "text-violet-400" },
          { text: "  const decoded = jwt.verify(token, JWT_SECRET)", color: "text-zinc-300" },
        ]},
      },
      {
        speaker: "frieren",
        text: "TokenExpiredError. The exp timestamp passed. I've seen empires fall in less time than this token has been expired.",
        code: { lines: [
          { text: "} catch (err) {", color: "text-violet-400" },
          { text: "  // err.name === 'TokenExpiredError'", color: "text-red-400" },
          { text: "  return res.status(401).json({", color: "text-red-400" },
          { text: "    error: 'Token invalid or expired'", color: "text-red-300" },
          { text: "  })", color: "text-red-400" },
          { text: "}", color: "text-violet-400" },
        ]},
        tag: "401 Unauthorized — token expired",
        tagColor: "text-red-400",
      },
      {
        speaker: "himmel",
        text: "Can't you just... let it slide this once?",
      },
      {
        speaker: "frieren",
        text: "Expiry exists to limit damage if a token is stolen. I don't make exceptions. Go re-authenticate.",
      },
    ],
  },
  "fail-tampered": {
    label: "Tampered token",
    color: "bg-red-900 text-red-100",
    messages: [
      {
        speaker: "himmel",
        text: "I have a token! I may have... slightly edited the payload. role is now 'admin'. For good reasons.",
        code: { lines: [
          { text: "// Original payload:", color: "text-zinc-500" },
          { text: '{ userId: 1, role: "hero" }', color: "text-zinc-400" },
          { text: "// Tampered payload:", color: "text-zinc-500" },
          { text: '{ userId: 1, role: "admin" }', color: "text-red-400" },
        ]},
        tag: "req arrives — modified payload",
        tagColor: "text-zinc-400",
      },
      {
        speaker: "frieren",
        text: "Running jwt.verify(). The signature is computed from the original header and payload. If you changed anything, it won't match.",
        code: { lines: [
          { text: "// jwt.verify() recomputes:", color: "text-zinc-500" },
          { text: "HMACSHA256(base64(header) + '.' + base64(payload), secret)", color: "text-amber-400" },
          { text: "// then compares to the signature in your token", color: "text-zinc-500" },
        ]},
      },
      {
        speaker: "frieren",
        text: "JsonWebTokenError. Signature mismatch. You changed the payload. The math doesn't lie.",
        code: { lines: [
          { text: "} catch (err) {", color: "text-violet-400" },
          { text: "  // err.name === 'JsonWebTokenError'", color: "text-red-400" },
          { text: "  return res.status(401).json({", color: "text-red-400" },
          { text: "    error: 'Token invalid or expired'", color: "text-red-300" },
          { text: "  })", color: "text-red-400" },
          { text: "}", color: "text-violet-400" },
        ]},
        tag: "401 Unauthorized — signature invalid",
        tagColor: "text-red-400",
      },
      {
        speaker: "himmel",
        text: "But I just changed one field! Nobody would notice!",
      },
      {
        speaker: "frieren",
        text: "That's the point of cryptographic signatures. Changing one character changes the entire hash. This is not negotiable.",
      },
    ],
  },
};

function ChatBubble({ msg, index }: { msg: Message; index: number }) {
  const isHimmel = msg.speaker === "himmel";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.08 }}
      className={`flex items-end gap-3 ${isHimmel ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <img
          src={isHimmel ? HIMMEL_IMG : FRIEREN_IMG}
          alt={isHimmel ? "Himmel" : "Frieren"}
          className="w-12 h-12 object-cover object-top rounded-full border-2 border-zinc-200 bg-zinc-100"
        />
        <span className="text-[9px] text-zinc-400 font-mono">
          {isHimmel ? "request" : "middleware"}
        </span>
      </div>

      {/* Bubble + code */}
      <div className={`flex flex-col gap-2 max-w-[75%] ${isHimmel ? "items-start" : "items-end"}`}>
        <div className={`px-4 py-2.5 text-sm leading-relaxed rounded-none border ${
          isHimmel
            ? "bg-blue-50 border-blue-200 text-blue-900"
            : "bg-zinc-900 border-zinc-700 text-zinc-100"
        }`}>
          {msg.text}
        </div>
        {msg.code && (
          <div className="bg-zinc-950 border border-zinc-800 p-3 font-mono text-xs w-full">
            {msg.code.lines.map((l, i) => (
              <div key={i} className={l.color ?? "text-zinc-300"}>{l.text}</div>
            ))}
          </div>
        )}
        {msg.tag && (
          <span className={`text-[10px] font-mono ${msg.tagColor ?? "text-zinc-400"}`}>
            {msg.tag}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function VerifyingDiagram() {
  const [outcome, setOutcome] = useState<Outcome>("pass");
  const scenario = SCENARIOS[outcome];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
          Himmel (the HTTP request) arrives at the gate. Frieren (the middleware) has been doing this for a thousand years and has zero patience for nonsense.
        </p>
        <div className="flex flex-wrap gap-2 shrink-0">
          {(Object.keys(SCENARIOS) as Outcome[]).map((key) => (
            <button
              key={key}
              onClick={() => setOutcome(key)}
              className={`text-xs font-mono px-3 py-1.5 border transition-colors duration-150 ${
                outcome === key
                  ? SCENARIOS[key].color + " border-transparent"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
              }`}
            >
              {SCENARIOS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="border border-zinc-200 bg-zinc-50 p-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <img src={HIMMEL_IMG} alt="Himmel" className="w-8 h-8 object-cover object-top rounded-full border border-zinc-200" />
            <span className="text-xs font-mono text-zinc-500">Himmel <span className="text-zinc-300">— HTTP Request</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500"><span className="text-zinc-300">authenticate() —</span> Frieren</span>
            <img src={FRIEREN_IMG} alt="Frieren" className="w-8 h-8 object-cover object-top rounded-full border border-zinc-200" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={outcome}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {scenario.messages.map((msg, i) => (
              <ChatBubble key={i} msg={msg} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Technical summary */}
      <div className="bg-zinc-50 border border-zinc-200 p-4">
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-3">What jwt.verify() actually does</p>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-white border border-zinc-200 p-3">
            <p className="text-xs font-medium text-zinc-900 mb-1">1. Recomputes the signature</p>
            <p className="text-xs text-zinc-500 leading-relaxed">Takes the header + payload from your token, hashes them with the secret. If it doesn't match the signature you sent, rejected.</p>
          </div>
          <div className="bg-white border border-zinc-200 p-3">
            <p className="text-xs font-medium text-zinc-900 mb-1">2. Checks expiry</p>
            <p className="text-xs text-zinc-500 leading-relaxed">Reads the <code className="font-mono bg-zinc-100 px-0.5">exp</code> claim from the payload. If the current time is past it, throws <code className="font-mono bg-zinc-100 px-0.5">TokenExpiredError</code>.</p>
          </div>
          <div className="bg-white border border-zinc-200 p-3">
            <p className="text-xs font-medium text-zinc-900 mb-1">3. Returns decoded payload</p>
            <p className="text-xs text-zinc-500 leading-relaxed">If both pass, returns the decoded payload object. You attach it to <code className="font-mono bg-zinc-100 px-0.5">req.user</code> so downstream handlers know who's asking.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
