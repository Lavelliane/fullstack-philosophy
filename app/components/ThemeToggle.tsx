"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next: Theme = (theme ?? "light") === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="border border-zinc-200 px-2.5 py-1 text-[11px] font-mono text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-200"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === null ? "Theme" : theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
