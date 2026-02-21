"use client";

import { useState, Children } from "react";

type SectionRevealProps = {
  children: React.ReactNode;
  sectionLabels: string[];
};

function SectionDivider() {
  return <div className="border-t border-zinc-100 my-2" />;
}

export default function SectionReveal({
  children,
  sectionLabels,
}: SectionRevealProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const childArray = Children.toArray(children);
  const totalSections = childArray.length;

  return (
    <div className="flex flex-col gap-0">
      {childArray.slice(0, visibleCount).map((child, index) => (
        <div key={index}>
          {index > 0 && <SectionDivider />}
          {child}
          {index === visibleCount - 1 && index < totalSections - 1 && (
            <div className="flex justify-center py-12">
              <button
                onClick={() => setVisibleCount((c) => c + 1)}
                className="text-sm font-medium border border-zinc-900 px-6 py-3 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
              >
                Continue to Section {String(index + 2).padStart(2, "0")}:{" "}
                {sectionLabels[index + 1]}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
