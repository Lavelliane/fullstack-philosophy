import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SectionNav from "../components/SectionNav";
import JourneySim from "./components/JourneySim";
import BridgeSystemDiagram from "./components/BridgeSystemDiagram";
import {
  NAV_SECTIONS,
  mapLegend,
  journeySteps,
  fullStackPrinciples,
} from "./data";

export const metadata: Metadata = {
  title: "Where the Two Worlds Meet | The Human Behind the Endpoint",
  description:
    "A short transition into full stack development, where frontend and backend become one product story.",
};

export default function BridgePage() {
  return (
    <div className="h-screen bg-white text-zinc-900 flex flex-col overflow-hidden">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a
          href="/"
          className="text-sm font-medium tracking-tight text-zinc-900 hover:text-zinc-500 transition-colors"
        >
          The Human Behind the Endpoint
        </a>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="/intro" className="hover:text-zinc-900 transition-colors duration-200">
            Intro
          </a>
          <span className="text-zinc-900 font-medium">The Bridge</span>
          <a href="/backend" className="hover:text-zinc-900 transition-colors duration-200">
            Backend
          </a>
          <a href="/frontend" className="hover:text-zinc-900 transition-colors duration-200">
            Frontend
          </a>
          <a href="/about" className="hover:text-zinc-900 transition-colors duration-200">
            About
          </a>
        </div>
      </nav>

      <SectionNav sections={NAV_SECTIONS} />

      <main className="flex-1 overflow-y-auto" style={{ scrollSnapType: "y mandatory" }}>
        <section id="s1" style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-screen-lg mx-auto px-8 py-20 border-b border-zinc-100">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6">Two jobs, one product</p>
            <h1
              className="font-light leading-tight tracking-tight text-zinc-900 mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 58px)" }}
            >
              Where the two worlds meet.
              <br />
              Full stack is one conversation.
            </h1>
            <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
              The backend makes it work. The frontend makes it matter.
              Every click a user makes crosses both worlds and returns as a feeling.
              This is the craft of full stack development.
            </p>

            <div className="border border-zinc-200 p-6 max-w-5xl mb-8">
              <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-4">Full stack request map</p>
              <BridgeSystemDiagram />
            </div>

            <div className="grid gap-3 md:grid-cols-3 max-w-5xl mb-8">
              {mapLegend.map((item) => (
                <div key={item.title} className="border border-zinc-200 p-4 bg-zinc-50/60">
                  <p className="text-xs font-mono text-zinc-900 mb-1">{item.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="border border-zinc-200 bg-zinc-50/60 p-6 max-w-5xl">
              <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">How to read this map</p>
              <div className="space-y-2">
                {fullStackPrinciples.map((principle) => (
                  <p key={principle} className="text-sm text-zinc-600 leading-relaxed">
                    {principle}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="s2" style={{ scrollSnapAlign: "start" }}>
          <div className="max-w-screen-lg mx-auto px-8 py-20">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6">Where they handshake</p>
            <h2
              className="font-light leading-tight tracking-tight text-zinc-900 mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              They speak through a contract.
              <br />
              You are learning both sides of it.
            </h2>
            <p className="text-sm text-zinc-500 leading-[1.85] max-w-xl mb-10">
              One side protects truth. One side protects trust.
              When they move together, software feels calm, clear, and human.
            </p>

            <JourneySim steps={[...journeySteps]} />

            <div className="border border-zinc-200 p-6 bg-zinc-50/60 mt-8">
              <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">Reading the journey</p>
              <div className="grid md:grid-cols-3 gap-4">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Each step in the simulation represents one responsibility in the system. Walk the journey from first click to rendered result.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  If something fails, this map helps you ask better questions. Did the interface send the right shape? Did the contract define the right expectation? Did the backend enforce the right rule?
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Full stack maturity is not only writing code in two places. It is understanding how meaning travels between them.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-wrap gap-3">
              <a
                href="/backend"
                className="inline-flex items-center gap-2 text-sm font-medium border border-zinc-900 px-5 py-2.5 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
              >
                The Quiet Side
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/frontend"
                className="inline-flex items-center gap-2 text-sm font-medium border border-zinc-200 px-5 py-2.5 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-200"
              >
                The Face of Software
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
