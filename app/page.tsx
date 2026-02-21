import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <span className="text-sm font-medium tracking-tight">The Human Behind the Endpoint</span>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-8">
            <a href="/intro" className="hover:text-zinc-900 transition-colors duration-200">Intro</a>
            <a href="/backend" className="hover:text-zinc-900 transition-colors duration-200">Backend</a>
            <a href="/frontend" className="hover:text-zinc-900 transition-colors duration-200">Frontend</a>
            <a href="/about" className="hover:text-zinc-900 transition-colors duration-200">About</a>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-12 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-start mb-10">
          <h1
            className="font-light leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(56px, 9vw, 124px)" }}
          >
            The Human Behind
            <br />
            the Endpoint
          </h1>
          <p className="max-w-[190px] text-sm text-zinc-400 leading-relaxed mt-2 text-right hidden sm:block">
            Exploring the ideas and principles that power modern web
            applications.
          </p>
        </div>

        <div className="w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
          <Image
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80"
            alt="Code editor with colorful syntax highlighting"
            width={1400}
            height={613}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* CTA row below hero image */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-zinc-100">
          <p className="text-sm text-zinc-500 max-w-md leading-[1.8]">
            A workshop on how to think about software. Not syntax. Not frameworks.
            The reasoning behind the decisions.
          </p>
          <a
            href="/intro"
            className="inline-flex items-center gap-3 text-sm font-medium border border-zinc-900 px-6 py-3 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200 shrink-0 ml-10"
          >
            Begin here
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 mt-16">
        <div className="max-w-screen-xl mx-auto px-8 py-8 flex justify-between items-center">
          <p className="text-xs text-zinc-400">
            © 2026 The Human Behind the Endpoint. For Educational Purposes.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <a href="/about" className="hover:text-zinc-900 transition-colors duration-200">About</a>
            <a href="https://github.com/Lavelliane" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
