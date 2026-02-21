"use client";

import { useState, useEffect } from "react";
import FrontendNav from "./FrontendNav";
import SlideNav from "./SlideNav";

const SECTIONS = ["s0", "s1", "s2", "s3", "s4", "s5", "s6"];
const HIDE_NAV_FROM_SECTION = "s1"; // Hide nav after intro slide (when viewing s1 or later)

export default function FrontendPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    function onScroll() {
      if (!container) return;
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      let active = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollTop + height * 0.4) active = id;
      }
      const sectionIndex = SECTIONS.indexOf(active);
      const hideFromIndex = SECTIONS.indexOf(HIDE_NAV_FROM_SECTION);
      setHideNav(sectionIndex >= hideFromIndex);
    }

    onScroll(); // Initial check
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-height",
      hideNav ? "0px" : "61px"
    );
  }, [hideNav]);

  return (
    <div className="h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col overflow-hidden">
      <header
        className={`shrink-0 overflow-hidden transition-all duration-300 ${
          hideNav ? "h-0 border-b-0" : ""
        }`}
      >
        <FrontendNav />
      </header>
      <SlideNav />
      {children}
    </div>
  );
}
