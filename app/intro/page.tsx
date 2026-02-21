import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Before We Begin | The Human Behind the Endpoint",
  description:
    "A note on where software engineering stands today, and why thinking still matters more than syntax.",
};

function Beat({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[32px_1fr] gap-6 items-start">
      <span className="font-mono text-xs text-zinc-300 pt-1">{number}</span>
      <div>{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3">
      {children}
    </p>
  );
}

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a
          href="/"
          className="text-sm font-medium tracking-tight text-zinc-900 hover:text-zinc-500 transition-colors"
        >
          The Human Behind the Endpoint
        </a>
        <div className="flex items-center gap-8 text-sm text-zinc-500">
          <a href="/backend" className="hover:text-zinc-900 transition-colors duration-200">Backend</a>
          <a href="/frontend" className="hover:text-zinc-900 transition-colors duration-200">Frontend</a>
          <a href="/about" className="hover:text-zinc-900 transition-colors duration-200">About</a>
        </div>
      </nav>

      {/* Opening */}
      <section className="max-w-screen-lg mx-auto px-8 pt-24 pb-20 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-8">Before we begin</p>
        <h1
          className="font-light leading-[0.9] tracking-tight text-zinc-900 mb-10"
          style={{ fontSize: "clamp(48px, 7.5vw, 104px)" }}
        >
          The world changed.
          <br />
          <span className="text-zinc-400">Did you?</span>
        </h1>
        <p className="text-sm text-zinc-500 leading-[1.9] max-w-lg">
          This is not a syntax workshop. This is about how you think.
          Because the engineers who survive the next decade won&apos;t be
          the ones who memorize APIs. They&apos;ll be the ones who understand
          systems, build products, and stay deeply curious.
        </p>
      </section>

      {/* Beat 1: The squeeze */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="01">
          <Label>The uncomfortable truth</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            Junior roles are shrinking.
            <br />
            AI is doing the entry-level work.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
            Companies that once hired 10 junior devs to write boilerplate now
            hire 2 seniors to review what an AI generates. This is not a
            threat to good engineers. It is a threat to engineers who only
            know how to execute instructions.
          </p>

          {/* Diagram: The Squeeze */}
          <div className="border border-zinc-200 p-6 max-w-xl">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-5">Hiring funnel shift</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500">Senior / Staff</span>
                  <span className="text-xs text-emerald-600 font-medium">Growing</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-none">
                  <div className="h-2 bg-emerald-500 rounded-none" style={{ width: "78%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500">Mid-level</span>
                  <span className="text-xs text-zinc-400 font-medium">Stable</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-none">
                  <div className="h-2 bg-zinc-400 rounded-none" style={{ width: "55%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500">Junior / Entry</span>
                  <span className="text-xs text-red-500 font-medium">Contracting</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-none">
                  <div className="h-2 bg-red-400 rounded-none" style={{ width: "22%" }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-300 mt-4">
              AI handles repetitive implementation. Demand shifts to judgment and ownership.
            </p>
          </div>
        </Beat>
      </section>

      {/* Beat 2: The shift */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="02">
          <Label>The new role of engineering</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            The job is no longer
            <br />
            writing code. It&apos;s making decisions.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
            Software engineering has shifted toward architecture and product
            thinking. The most valued engineers aren&apos;t the fastest typists.
            They&apos;re the ones who ask: <em>Why are we building this?
            Is this the right abstraction? What breaks at scale?</em>
          </p>

          {/* Diagram: The Spectrum */}
          <div className="border border-zinc-200 p-6 max-w-xl">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-5">Engineering value spectrum</p>
            <div className="relative">
              <div className="flex justify-between text-[10px] text-zinc-400 mb-2">
                <span>Syntax execution</span>
                <span>System thinking</span>
              </div>
              <div className="h-1.5 bg-zinc-100 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-900" />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-300 mt-2">
                <span>AI does this well</span>
                <span className="text-zinc-900 font-medium">Humans own this</span>
              </div>
            </div>
          </div>
        </Beat>
      </section>

      {/* Beat 3: Product blind */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="03">
          <Label>A warning</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            Don&apos;t be syntax-perfect
            <br />
            and product-blind.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl">
            Closing Jira tickets is not a career strategy. The engineers who
            last are the ones obsessed with the user, the outcome, the
            experience. Ask yourself: does this feel good to use? Would I
            use this? What would make it 10x better? That instinct is
            what no AI has.
          </p>

          {/* Two columns contrast */}
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-xl">
            <div className="border border-red-100 bg-red-50/50 p-4">
              <p className="text-xs text-red-400 uppercase tracking-[0.15em] mb-3">Trap</p>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li>"I just implement what&apos;s in the ticket."</li>
                <li>"The PM decides what we build."</li>
                <li>"My job is to code, not design."</li>
              </ul>
            </div>
            <div className="border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs text-emerald-600 uppercase tracking-[0.15em] mb-3">Mindset</p>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li>"Why does this ticket exist?"</li>
                <li>"What outcome does this create?"</li>
                <li>"How do we make this feel right?"</li>
              </ul>
            </div>
          </div>
        </Beat>
      </section>

      {/* Beat 4: Curiosity */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="04">
          <Label>Stay dangerous</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            Curiosity is your
            <br />
            compounding interest.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
            Build a home server. Experiment with AI. Try IoT. Connect to
            an MCP. Read the newsletter you&apos;ve been ignoring. Join the
            Reddit thread. The engineers who stay relevant are not smarter.
            They are more curious, more often.
          </p>

          {/* Trend grid */}
          <div className="border border-zinc-200 p-6 max-w-xl">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">Things worth exploring right now</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                "LLMs & AI Agents",
                "MCP Protocol",
                "Edge Compute",
                "IoT & Embedded",
                "WebAssembly",
                "Vercel / Fly.io",
                "Open Source",
                "Local AI (Ollama)",
                "5G / Networking",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-zinc-200 px-3 py-2 text-xs text-zinc-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Beat>
      </section>

      {/* Beat 5: Invest in yourself */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="05">
          <Label>The 10x engineer</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            Code is one skill.
            <br />
            Build the rest.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
            The engineer who designs, ships, markets, and communicates their
            work is not just more valuable. They are harder to replace. Invest
            in writing, design sensibility, business acumen, and systems
            thinking. Stack your skills. Stay in the game.
          </p>

          {/* Skills stack */}
          <div className="border border-zinc-200 p-6 max-w-sm">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">Skill stack of the 10x engineer</p>
            <div className="flex flex-col gap-2">
              {[
                { skill: "Systems thinking", width: "100%" },
                { skill: "Product intuition", width: "90%" },
                { skill: "Communication", width: "85%" },
                { skill: "Design sensibility", width: "75%" },
                { skill: "Code", width: "70%" },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-zinc-600">{item.skill}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100">
                    <div
                      className="h-1.5 bg-zinc-900"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-300 mt-4">
              Code is the foundation. Not the ceiling.
            </p>
          </div>
        </Beat>
      </section>

      {/* Beat 6: No correct framework */}
      <section className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
        <Beat number="06">
          <Label>The tool trap</Label>
          <h2
            className="font-light tracking-tight text-zinc-900 leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
          >
            There is no best framework.
            <br />
            There is only the right tool
            <br />
            for the right problem.
          </h2>
          <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
            Every framework has a use case and a community. Every language
            has a domain where it shines. The engineer who fights the
            React vs Vue war is the one who doesn&apos;t ship. The one
            who asks <em>what does this problem need?</em> is the one
            who leads.
          </p>

          {/* Frameworks as equals */}
          <div className="border border-zinc-200 p-6 max-w-xl">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">All tools, all valid</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                "React", "Vue", "Angular", "Svelte",
                "Next.js", "Nuxt", "Remix", "Astro",
                "Node", "Django", "Rails", "Laravel",
                "Postgres", "MongoDB", "Redis", "SQLite",
              ].map((t) => (
                <div
                  key={t}
                  className="border border-zinc-200 px-3 py-2 text-xs text-zinc-500 text-center"
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-300 mt-4">
              None of these win. All of these have jobs.
            </p>
          </div>
        </Beat>
      </section>

      {/* CTA */}
      <section className="max-w-screen-lg mx-auto px-8 py-24">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6">Up next</p>
        <h2
          className="font-light leading-tight tracking-tight text-zinc-900 mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Most of the web
          <br />
          is invisible.
        </h2>
        <p className="text-sm text-zinc-500 leading-[1.85] max-w-md mb-2">
          No interface. No animations. Just systems quietly deciding
          whether your request lives or dies.
        </p>
        <p className="text-sm text-zinc-400 leading-[1.85] max-w-md mb-10 italic">
          The Quiet Side of Software.
        </p>
        <a
          href="/backend"
          className="inline-flex items-center gap-3 text-sm font-medium border border-zinc-900 px-6 py-3 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
        >
          Enter the backend
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
