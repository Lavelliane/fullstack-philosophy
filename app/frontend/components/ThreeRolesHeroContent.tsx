"use client";

import { useState, useEffect } from "react";

type Role = "html" | "css" | "js";

const ROLES: { id: Role; label: string; badgeClass: string }[] = [
  { id: "html", label: "HTML", badgeClass: "bg-zinc-900 text-white" },
  { id: "css", label: "CSS", badgeClass: "bg-zinc-500 text-white" },
  { id: "js", label: "JS", badgeClass: "bg-zinc-200 text-zinc-800" },
];

const CONCEPTS: Record<
  Role,
  { title: string; desc: string; strong: string }
> = {
  html: {
    title: "The skeleton",
    desc: "Declares what exists — buttons, headings, forms. No style. No behavior.",
    strong: "what exists",
  },
  css: {
    title: "The skin",
    desc: "Controls how it looks — layout, color, spacing. No structure. No behavior.",
    strong: "how it looks",
  },
  js: {
    title: "The nervous system",
    desc: "Controls what it does — events, updates, logic. No structure. No style.",
    strong: "what it does",
  },
};

type ThreeRolesHeroContentProps = {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
};

const codeBlockClass =
  "overflow-x-auto rounded-lg border bg-[#f6f8fa] dark:bg-[#0d1117] [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-4 [&_pre]:!text-xs [&_pre]:!leading-[1.75] [&_pre]:!font-mono [&_pre]:!whitespace-pre";

export default function ThreeRolesHeroContent({
  htmlCode,
  cssCode,
  jsCode,
}: ThreeRolesHeroContentProps) {
  const [step, setStep] = useState<Role>("html");
  const roleIndex = ROLES.findIndex((r) => r.id === step);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" && roleIndex < 2)
        setStep(ROLES[roleIndex + 1].id);
      if (e.key === "ArrowLeft" && roleIndex > 0)
        setStep(ROLES[roleIndex - 1].id);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [roleIndex]);

  const codeByRole: Record<Role, string> = {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-screen-xl relative z-10">
      {/* Left: concepts with highlight */}
      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
          Section 01 · 5 min
        </p>
        <h2
          className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-10"
          style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
        >
          Every UI has
          <br />
          three jobs.
        </h2>

        <div className="space-y-5">
          {ROLES.map((role) => {
            const c = CONCEPTS[role.id];
            const isActive = step === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setStep(role.id)}
                className={`text-left w-full flex items-start gap-4 p-4 -mx-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-zinc-900 dark:border-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 shadow-sm"
                    : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                }`}
              >
                <span
                  className={`font-mono text-xs px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5 ${role.badgeClass}`}
                >
                  {role.label}
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  {c.title}. {c.desc.split(c.strong)[0]}
                  <strong className="text-zinc-900"> {c.strong} </strong>
                  {c.desc.split(c.strong)[1]}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 border-l-2 border-zinc-900 pl-6 py-1">
          <p className="text-lg font-light text-zinc-900 leading-snug italic">
            &ldquo;Keep them separate. A designer changes CSS. An engineer
            changes JS. Neither touches the other&apos;s file.&rdquo;
          </p>
        </div>
      </div>

      {/* Right: code block with highlight (desktop) */}
      <div className="hidden lg:flex flex-col gap-2">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] flex items-center justify-between">
          <span>All three in one example</span>
          <span className="text-zinc-300 font-mono">
            {roleIndex + 1}/3 · click role or →
          </span>
        </p>

        <div className="flex flex-col gap-2">
          {ROLES.map((role) => {
            const isActive = step === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setStep(role.id)}
                className={`cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                  isActive
                    ? "border-zinc-900 dark:border-zinc-400 ring-2 ring-zinc-900/10 dark:ring-zinc-400/10 shadow-md"
                    : "border-zinc-200 dark:border-zinc-700 opacity-50 hover:opacity-75"
                }`}
              >
                <div className="px-3 py-1.5 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100/80 dark:bg-zinc-800/80 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {role.label}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  )}
                </div>
                <div
                  className={codeBlockClass}
                  dangerouslySetInnerHTML={{ __html: codeByRole[role.id] }}
                  suppressHydrationWarning
                />
              </div>
            );
          })}
        </div>

        {/* Next / Prev */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              setStep(ROLES[Math.max(0, roleIndex - 1)].id)
            }
            disabled={roleIndex === 0}
            className="text-xs text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
          >
            ← Prev
          </button>
          <button
            onClick={() =>
              setStep(ROLES[Math.min(2, roleIndex + 1)].id)
            }
            disabled={roleIndex === 2}
            className="text-xs text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Mobile: single code block for active role */}
      <div className="lg:hidden mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            {ROLES.find((r) => r.id === step)?.label}
          </span>
        </div>
        <div
          className={`${codeBlockClass} border-2 border-zinc-900`}
          dangerouslySetInnerHTML={{ __html: codeByRole[step] }}
          suppressHydrationWarning
        />
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setStep(ROLES[Math.max(0, roleIndex - 1)].id)}
            disabled={roleIndex === 0}
            className="text-xs text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
          >
            ← Prev
          </button>
          <button
            onClick={() => setStep(ROLES[Math.min(2, roleIndex + 1)].id)}
            disabled={roleIndex === 2}
            className="text-xs text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
