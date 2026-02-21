"use client";

import { useEffect, useState } from "react";

type NavSection = {
  id: string;
  label: string;
  number: string;
};

type SectionNavProps = {
  sections: NavSection[];
};

export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Desktop: fixed right sidebar */}
      <nav className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-5 z-40">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="flex items-center gap-3 group"
              title={s.label}
            >
              <span
                className={`text-[10px] font-mono transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-zinc-900 opacity-100"
                    : "text-zinc-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                {s.number}. {s.label}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 scale-125"
                    : "bg-zinc-300 group-hover:bg-zinc-500"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Mobile: sticky top progress bar */}
      <div className="xl:hidden sticky top-0 z-40 bg-white border-b border-zinc-100 overflow-x-auto">
        <div className="flex items-center gap-1 px-4 py-3 min-w-max">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
              >
                <span>{s.number}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
