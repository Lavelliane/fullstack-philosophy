"use client";

import { useState } from "react";

type Env = "dev" | "prod";

type Scenario = {
  id: string;
  label: string;
  method: string;
  path: string;
  badge: "recoverable" | "unrecoverable";
  dev: {
    status: number;
    statusText: string;
    body: object;
    logs: string[];
    explanation: string;
  };
  prod: {
    status: number;
    statusText: string;
    body: object;
    logs: string[];
    explanation: string;
  };
};

const SCENARIOS: Scenario[] = [
  {
    id: "validation",
    label: "Invalid email submitted",
    method: "POST",
    path: "/api/orders",
    badge: "recoverable",
    dev: {
      status: 400,
      statusText: "Bad Request",
      body: {
        error: "ValidationError",
        message: "Email validation failed: missing @domain",
        field: "email",
        received: "notanemail",
        stack:
          "ValidationError: Email validation failed\n  at validateOrder (validators.js:42)\n  at POST /api/orders (routes.js:18)",
      },
      logs: [
        "→ POST /api/orders  400  12ms",
        "  ValidationError: Email validation failed: missing @domain",
        '  field=email  received="notanemail"',
      ],
      explanation:
        "Full details in the response — you see exactly what failed and where in the source.",
    },
    prod: {
      status: 400,
      statusText: "Bad Request",
      body: {
        error: "Please provide a valid email address.",
      },
      logs: [
        "→ POST /api/orders  400  12ms",
        "  warn: validation_failed  field=email  userId=null",
      ],
      explanation:
        "User gets a clear, safe message. Stack trace and field names stay private.",
    },
  },
  {
    id: "db_down",
    label: "Database unreachable",
    method: "GET",
    path: "/api/orders",
    badge: "unrecoverable",
    dev: {
      status: 500,
      statusText: "Internal Server Error",
      body: {
        error: "DatabaseConnectionError",
        message: "connect ECONNREFUSED 127.0.0.1:5432",
        stack:
          "Error: connect ECONNREFUSED 127.0.0.1:5432\n  at TCPConnectWrap.afterConnect (net.js:1144)\n  at db.connect (pool.js:91)",
      },
      logs: [
        "→ GET /api/orders  500  2041ms",
        "  error: DB connection failed — ECONNREFUSED 127.0.0.1:5432",
      ],
      explanation:
        "Exact host, port, and error type visible. You know within seconds what service is down.",
    },
    prod: {
      status: 503,
      statusText: "Service Unavailable",
      body: {
        error: "Service temporarily unavailable. Please try again later.",
      },
      logs: [
        "→ GET /api/orders  503  2041ms",
        "  critical: db_connection_failed  host=postgres",
        "  alert: PagerDuty #INC-4821 opened",
      ],
      explanation:
        "User sees a 503 retry message. Ops gets paged. Internal topology never leaves the server.",
    },
  },
  {
    id: "unhandled",
    label: "Unhandled exception (bug)",
    method: "POST",
    path: "/api/checkout",
    badge: "unrecoverable",
    dev: {
      status: 500,
      statusText: "Internal Server Error",
      body: {
        error: "TypeError: Cannot read properties of undefined (reading 'price')",
        stack:
          "TypeError: Cannot read properties of undefined\n  at calculateTotal (cart.js:77)\n  at POST /api/checkout (routes.js:31)",
      },
      logs: [
        "→ POST /api/checkout  500  8ms",
        "  UNHANDLED: TypeError at cart.js:77",
        "  Cannot read properties of undefined (reading 'price')",
      ],
      explanation:
        "File name, line number, and exact failing expression — zero guesswork to find the bug.",
    },
    prod: {
      status: 500,
      statusText: "Internal Server Error",
      body: {
        error: "An unexpected error occurred. Our team has been notified.",
      },
      logs: [
        "→ POST /api/checkout  500  8ms",
        "  critical: unhandled_exception  service=checkout",
        "  alert: Sentry #8821 — TypeError in calculateTotal",
      ],
      explanation:
        "User sees a safe message. Sentry captures the full trace privately for your team.",
    },
  },
  {
    id: "auth",
    label: "Permission denied",
    method: "DELETE",
    path: "/api/orders/99",
    badge: "recoverable",
    dev: {
      status: 403,
      statusText: "Forbidden",
      body: {
        error: "AuthorizationError",
        message: "User 42 lacks permission 'orders:delete'",
        userId: 42,
        resource: "order #99",
        requiredRole: "admin",
      },
      logs: [
        "→ DELETE /api/orders/99  403  5ms",
        "  AuthorizationError: user=42 needs orders:delete",
      ],
      explanation:
        "All context needed to debug the permission model — user, resource, and required role.",
    },
    prod: {
      status: 403,
      statusText: "Forbidden",
      body: {
        error: "You don't have permission to do that.",
      },
      logs: [
        "→ DELETE /api/orders/99  403  5ms",
        "  warn: unauthorized  userId=42  resource=order#99",
      ],
      explanation:
        "Nothing about permission structure is revealed. Attacker learns nothing useful.",
    },
  },
];

const STATUS_COLORS: Record<number, string> = {
  200: "text-emerald-600 bg-emerald-50",
  400: "text-amber-600 bg-amber-50",
  403: "text-amber-600 bg-amber-50",
  500: "text-red-600 bg-red-50",
  503: "text-red-600 bg-red-50",
};

export default function ErrorSim() {
  const [env, setEnv] = useState<Env>("dev");
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);

  const scenario = SCENARIOS.find((s) => s.id === activeId)!;
  const view = env === "dev" ? scenario.dev : scenario.prod;

  return (
    <div className="font-mono text-xs space-y-4">
      {/* ENV toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.15em] text-zinc-400">
          Environment:
        </span>
        <div className="flex border border-zinc-200 overflow-hidden rounded">
          {(["dev", "prod"] as Env[]).map((e) => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              className={`px-4 py-1.5 text-[10px] font-bold tracking-wider transition-colors ${
                env === e
                  ? e === "dev"
                    ? "bg-amber-500 text-white"
                    : "bg-zinc-900 text-white"
                  : "bg-white text-zinc-400 hover:bg-zinc-50"
              }`}
            >
              {e.toUpperCase()}
            </button>
          ))}
        </div>
        <span
          className={`text-[10px] ${
            env === "dev" ? "text-amber-600" : "text-zinc-500"
          }`}
        >
          {env === "dev"
            ? "localhost:3000 — verbose, for the developer"
            : "api.myapp.com — safe, for the user"}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Scenario picker */}
        <div className="flex flex-col gap-2 shrink-0 w-full md:w-52">
          <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mb-1">
            Trigger an error
          </p>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`text-left px-3 py-2.5 border transition-all duration-150 ${
                activeId === s.id
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
              }`}
            >
              <div className="text-[10px] font-semibold leading-tight">{s.label}</div>
              <div
                className={`mt-1.5 text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm border inline-block ${
                  activeId === s.id
                    ? "border-white/20 text-white/50"
                    : s.badge === "recoverable"
                    ? "border-amber-200 text-amber-600 bg-amber-50"
                    : "border-red-200 text-red-600 bg-red-50"
                }`}
              >
                {s.badge}
              </div>
            </button>
          ))}
        </div>

        {/* Main panels */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Browser frame */}
          <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Chrome bar */}
            <div className="px-3 py-2 border-b border-zinc-100 bg-zinc-50 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="flex-1 mx-2 px-3 py-1 bg-white rounded border border-zinc-200 text-[10px] font-mono text-zinc-500 truncate">
                {env === "dev" ? "localhost:3000" : "api.myapp.com"}
                {scenario.path}
              </div>
              <span
                className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded ${
                  STATUS_COLORS[view.status] ?? "text-zinc-600 bg-zinc-100"
                }`}
              >
                {view.status}
              </span>
            </div>

            {/* Response body */}
            <div className="p-4">
              <div className="text-[9px] uppercase tracking-[0.12em] text-zinc-400 mb-2">
                <span className="font-bold text-zinc-600">{scenario.method}</span>{" "}
                {scenario.path} → response body
              </div>
              <pre className="text-[10px] leading-[1.8] text-zinc-700 bg-zinc-50 border border-zinc-100 rounded p-3 overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(view.body, null, 2)}
              </pre>
            </div>
          </div>

          {/* Server logs */}
          <div className="border border-zinc-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-zinc-900 text-[9px] uppercase tracking-[0.15em] text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              Server logs
            </div>
            <div className="bg-zinc-950 px-4 py-3 space-y-1">
              {view.logs.map((line, i) => (
                <div
                  key={i}
                  className={`text-[10px] font-mono leading-relaxed ${
                    line.startsWith("  ")
                      ? "text-zinc-500"
                      : "text-zinc-300"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div
            className={`px-4 py-3 border rounded text-[10px] leading-relaxed transition-colors ${
              env === "dev"
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-zinc-200 bg-zinc-50 text-zinc-600"
            }`}
          >
            <span className="font-semibold">
              {env === "dev" ? "Why dev shows this: " : "Why prod shows this: "}
            </span>
            {view.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
