"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Server, FileText, Key, CheckCircle2 } from "lucide-react";

type Part = "method" | "url" | "headers" | "body" | "all";

const PARTS = [
  { id: "method" as Part, label: "Method", icon: CheckCircle2, color: "text-blue-600" },
  { id: "url" as Part, label: "URL", icon: Globe, color: "text-violet-600" },
  { id: "headers" as Part, label: "Headers", icon: Key, color: "text-amber-600" },
  { id: "body" as Part, label: "Body", icon: FileText, color: "text-emerald-600" },
];

export default function RequestAnatomy() {
  const [activePart, setActivePart] = useState<Part>("all");

  return (
    <div className="border border-zinc-200 bg-white">
      {/* Part selector */}
      <div className="flex flex-wrap gap-0 border-b border-zinc-200">
        <button
          onClick={() => setActivePart("all")}
          className={`text-xs font-medium px-4 py-3 border-r border-zinc-200 transition-colors duration-150 ${
            activePart === "all" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
          }`}
        >
          All parts
        </button>
        {PARTS.map((part) => {
          const Icon = part.icon;
          return (
            <button
              key={part.id}
              onClick={() => setActivePart(part.id)}
              className={`flex items-center gap-2 text-xs font-medium px-4 py-3 border-r border-zinc-200 transition-colors duration-150 ${
                activePart === part.id ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {part.label}
            </button>
          );
        })}
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left: Request visualization */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">HTTP Request</p>
            <div className="bg-zinc-950 border border-zinc-800 p-5 font-mono text-sm">
              {/* Method + URL */}
              <div className="flex items-start gap-2 mb-4">
                <motion.span
                  animate={{
                    color: activePart === "method" || activePart === "all" ? "#60a5fa" : "#52525b",
                  }}
                  className="font-bold"
                >
                  POST
                </motion.span>
                <motion.span
                  animate={{
                    color: activePart === "url" || activePart === "all" ? "#a78bfa" : "#52525b",
                  }}
                >
                  /api/students
                </motion.span>
                <span className="text-zinc-600">HTTP/1.1</span>
              </div>

              {/* Headers */}
              <motion.div
                animate={{
                  opacity: activePart === "headers" || activePart === "all" ? 1 : 0.3,
                }}
                className="mb-4 space-y-1"
              >
                <div className="text-amber-400">
                  <span className="text-zinc-500">Host:</span> school-portal.edu
                </div>
                <div className="text-amber-400">
                  <span className="text-zinc-500">Content-Type:</span> application/json
                </div>
                <div className="text-amber-400">
                  <span className="text-zinc-500">Authorization:</span> Bearer eyJhbGci...
                </div>
                <div className="text-amber-400">
                  <span className="text-zinc-500">Content-Length:</span> 89
                </div>
              </motion.div>

              {/* Empty line separator */}
              <div className="h-3" />

              {/* Body */}
              <motion.div
                animate={{
                  opacity: activePart === "body" || activePart === "all" ? 1 : 0.3,
                }}
                className="text-emerald-400"
              >
                <div>&#123;</div>
                <div className="pl-4">
                  <span className="text-blue-300">&quot;fullName&quot;</span>: <span className="text-yellow-300">&quot;Ada Lovelace&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-300">&quot;email&quot;</span>: <span className="text-yellow-300">&quot;ada@school.edu&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-300">&quot;gpa&quot;</span>: <span className="text-orange-300">3.9</span>
                </div>
                <div>&#125;</div>
              </motion.div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePart}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {activePart === "all" && <AllPartsExplanation />}
                {activePart === "method" && <MethodExplanation />}
                {activePart === "url" && <UrlExplanation />}
                {activePart === "headers" && <HeadersExplanation />}
                {activePart === "body" && <BodyExplanation />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllPartsExplanation() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-2">The four parts</p>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Every HTTP request has four parts. The method says what you want to do. The URL says where. Headers carry metadata. The body carries data.
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-blue-900">Method</p>
            <p className="text-xs text-blue-700">The verb. GET reads. POST creates. PUT updates. DELETE removes.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-violet-50 border border-violet-200">
          <Globe className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-violet-900">URL</p>
            <p className="text-xs text-violet-700">The noun. The resource you're targeting. /students means the students collection.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200">
          <Key className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-amber-900">Headers</p>
            <p className="text-xs text-amber-700">Metadata. Content type, auth tokens, cache directives. The server reads these first.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-200">
          <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-emerald-900">Body</p>
            <p className="text-xs text-emerald-700">The payload. JSON, form data, files. This is what you're sending to create or update.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodExplanation() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-900 mb-2">The HTTP Method</p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-3">
            The method is the verb. It tells the server what action you want to perform on the resource.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 border border-zinc-200 p-4 space-y-2">
        <div className="flex items-start gap-2">
          <code className="font-mono text-xs text-blue-600 font-bold w-16 shrink-0">GET</code>
          <p className="text-xs text-zinc-600">Read a resource. No body. Idempotent (safe to repeat).</p>
        </div>
        <div className="flex items-start gap-2">
          <code className="font-mono text-xs text-blue-600 font-bold w-16 shrink-0">POST</code>
          <p className="text-xs text-zinc-600">Create a new resource. Has a body. Not idempotent.</p>
        </div>
        <div className="flex items-start gap-2">
          <code className="font-mono text-xs text-blue-600 font-bold w-16 shrink-0">PUT</code>
          <p className="text-xs text-zinc-600">Replace a resource entirely. Has a body. Idempotent.</p>
        </div>
        <div className="flex items-start gap-2">
          <code className="font-mono text-xs text-blue-600 font-bold w-16 shrink-0">PATCH</code>
          <p className="text-xs text-zinc-600">Update part of a resource. Has a body. Not always idempotent.</p>
        </div>
        <div className="flex items-start gap-2">
          <code className="font-mono text-xs text-blue-600 font-bold w-16 shrink-0">DELETE</code>
          <p className="text-xs text-zinc-600">Remove a resource. No body. Idempotent.</p>
        </div>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">
        The method determines which handler function runs on the server. <code className="font-mono bg-zinc-100 px-0.5">app.post('/students', ...)</code> only runs for POST requests.
      </p>
    </div>
  );
}

function UrlExplanation() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Globe className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-900 mb-2">The URL (Resource Path)</p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-3">
            The URL is the noun. It identifies which resource you're acting on. REST APIs use nouns, not verbs.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 border border-zinc-200 p-4 space-y-3">
        <div>
          <code className="font-mono text-xs text-violet-600 font-medium">/api/students</code>
          <p className="text-xs text-zinc-600 mt-1">The collection. POST here creates a new student. GET here lists all students.</p>
        </div>
        <div>
          <code className="font-mono text-xs text-violet-600 font-medium">/api/students/42</code>
          <p className="text-xs text-zinc-600 mt-1">A specific resource. GET reads student 42. PUT replaces student 42. DELETE removes student 42.</p>
        </div>
        <div>
          <code className="font-mono text-xs text-violet-600 font-medium">/api/students/42/courses</code>
          <p className="text-xs text-zinc-600 mt-1">A nested resource. The courses belonging to student 42.</p>
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 p-3">
        <p className="text-xs font-medium text-red-900 mb-1">Bad URL design</p>
        <code className="font-mono text-xs text-red-600">/api/createStudent</code>
        <p className="text-xs text-red-700 mt-1">Don't put verbs in URLs. The method is the verb. The URL is the noun.</p>
      </div>
    </div>
  );
}

function HeadersExplanation() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Key className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-900 mb-2">Headers (Metadata)</p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-3">
            Headers carry metadata about the request. The server reads these before touching the body.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 border border-zinc-200 p-4 space-y-3">
        <div>
          <code className="font-mono text-xs text-amber-600 font-medium">Content-Type</code>
          <p className="text-xs text-zinc-600 mt-1">Tells the server what format the body is in. <code className="font-mono bg-zinc-100 px-0.5">application/json</code> means JSON.</p>
        </div>
        <div>
          <code className="font-mono text-xs text-amber-600 font-medium">Authorization</code>
          <p className="text-xs text-zinc-600 mt-1">Carries the auth token. <code className="font-mono bg-zinc-100 px-0.5">Bearer &lt;token&gt;</code> is the standard format for JWTs.</p>
        </div>
        <div>
          <code className="font-mono text-xs text-amber-600 font-medium">Content-Length</code>
          <p className="text-xs text-zinc-600 mt-1">The size of the body in bytes. The server uses this to know when it has received the full payload.</p>
        </div>
        <div>
          <code className="font-mono text-xs text-amber-600 font-medium">Host</code>
          <p className="text-xs text-zinc-600 mt-1">The domain you're sending the request to. Required in HTTP/1.1.</p>
        </div>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">
        Middleware reads headers first. Authentication middleware extracts the token from <code className="font-mono bg-zinc-100 px-0.5">Authorization</code> before your handler runs.
      </p>
    </div>
  );
}

function BodyExplanation() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-900 mb-2">The Request Body</p>
          <p className="text-sm text-zinc-600 leading-relaxed mb-3">
            The body carries the actual data you're sending. For POST and PUT, this is the resource you want to create or update.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 border border-zinc-200 p-4">
        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Common formats</p>
        <div className="space-y-2">
          <div>
            <code className="font-mono text-xs text-emerald-600 font-medium">application/json</code>
            <p className="text-xs text-zinc-600 mt-1">Most common for APIs. Structured data as JSON objects and arrays.</p>
          </div>
          <div>
            <code className="font-mono text-xs text-emerald-600 font-medium">application/x-www-form-urlencoded</code>
            <p className="text-xs text-zinc-600 mt-1">HTML form submissions. Key-value pairs like <code className="font-mono bg-zinc-100 px-0.5">name=Ada&email=ada@...</code></p>
          </div>
          <div>
            <code className="font-mono text-xs text-emerald-600 font-medium">multipart/form-data</code>
            <p className="text-xs text-zinc-600 mt-1">File uploads. Can send files + text fields in one request.</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 p-3">
        <p className="text-xs font-medium text-blue-900 mb-1">This is what DTOs validate</p>
        <p className="text-xs text-blue-700 leading-relaxed">
          The body is untrusted input from the client. Your DTO schema (Zod, class-validator, etc.) validates the shape and types before your business logic runs. If it doesn't match, reject it with 400 Bad Request.
        </p>
      </div>
    </div>
  );
}
