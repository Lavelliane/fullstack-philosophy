"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "s0", label: "Intro", number: "00" },
  { id: "s1", label: "Three Roles", number: "01" },
  { id: "s2", label: "Components", number: "02" },
  { id: "s3", label: "State", number: "03" },
  { id: "s4", label: "Fetching", number: "04" },
  { id: "s5", label: "Routing", number: "05" },
  { id: "s6", label: "Checklist", number: "06" },
];

export default function SlideNav() {
  const [active, setActive] = useState("s0");
  const activeIndex = SECTIONS.findIndex((s) => s.id === active);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    function onScroll() {
      const scrollTop = container!.scrollTop;
      const height = container!.clientHeight;
      let best = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollTop + height * 0.4) best = id;
      }
      setActive(best);
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 xl:flex flex-col items-end gap-3 hidden">
      {/* Prev */}
      <button
        onClick={() => activeIndex > 0 && scrollTo(SECTIONS[activeIndex - 1].id)}
        className={`text-zinc-300 hover:text-zinc-900 transition-colors duration-200 text-xs font-mono mb-1 ${activeIndex === 0 ? "opacity-0 pointer-events-none" : ""}`}
        aria-label="Previous section"
      >
        ↑
      </button>

      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
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
                  ? "bg-zinc-900 scale-[1.75]"
                  : "bg-zinc-200 group-hover:bg-zinc-500"
              }`}
            />
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() =>
          activeIndex < SECTIONS.length - 1 &&
          scrollTo(SECTIONS[activeIndex + 1].id)
        }
        className={`text-zinc-300 hover:text-zinc-900 transition-colors duration-200 text-xs font-mono mt-1 ${activeIndex === SECTIONS.length - 1 ? "opacity-0 pointer-events-none" : ""}`}
        aria-label="Next section"
      >
        ↓
      </button>
    </nav>
  );
}
