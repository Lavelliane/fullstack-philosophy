import ThemeToggle from "../../components/ThemeToggle";

export default function BackendNav() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <a
        href="/"
        className="text-sm font-medium tracking-tight text-zinc-900 hover:text-zinc-500 transition-colors"
      >
        The Human Behind the Endpoint
      </a>
      <div className="flex items-center gap-4 text-sm text-zinc-500">
        <div className="flex items-center gap-6">
          <a
            href="/intro"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            Intro
          </a>
          <span className="text-zinc-900 font-medium">Backend</span>
          <a
            href="/frontend"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            Frontend
          </a>
          <a
            href="/about"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            About
          </a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
