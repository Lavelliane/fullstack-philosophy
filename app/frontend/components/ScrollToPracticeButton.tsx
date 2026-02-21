"use client";

import { useEffect, useCallback } from "react";

type ScrollToPracticeButtonProps = {
  targetId: string;
};

export default function ScrollToPracticeButton({ targetId }: ScrollToPracticeButtonProps) {
  const scrollToPractice = useCallback(() => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetId]);

  useEffect(() => {
    function isElementInViewport(el: Element): boolean {
      const rect = el.getBoundingClientRect();
      const container = document.getElementById("scroll-container");
      if (!container) return false;
      const containerRect = container.getBoundingClientRect();
      return rect.top < containerRect.bottom && rect.bottom > containerRect.top;
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        const target = document.getElementById(targetId);
        const hero = target?.previousElementSibling;
        if (hero && isElementInViewport(hero)) {
          e.preventDefault();
          scrollToPractice();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [targetId, scrollToPractice]);

  return (
    <button
      onClick={scrollToPractice}
      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
      aria-label="Scroll to practice section"
    >
      <span className="text-xs font-mono uppercase tracking-[0.15em]">
        Practice ↓
      </span>
    </button>
  );
}
