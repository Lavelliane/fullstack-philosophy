import type { Metadata } from "next";
import SectionNav from "../components/SectionNav";
import BackendNav from "./components/BackendNav";
import BackendHero from "./components/BackendHero";
import ContractSection from "./sections/ContractSection";
import GatekeepersSection from "./sections/GatekeepersSection";
import RequestLifecycleSection from "./sections/RequestLifecycleSection";
import MemoryFailureSection from "./sections/MemoryFailureSection";
import LettingGoSection from "./sections/LettingGoSection";
import ChecklistSection from "./sections/ChecklistSection";
import { NAV_SECTIONS } from "./data";

export const metadata: Metadata = {
  title: "Think Like a Backend Developer | The Human Behind the Endpoint",
  description:
    "A 30-minute philosophical deep-dive into backend architecture. No syntax. All thinking.",
};

export default function BackendPage() {
  return (
    <div className="h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col overflow-hidden">
      <BackendNav />
      <SectionNav sections={NAV_SECTIONS} />
      <main
        className="flex-1 overflow-y-auto"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <BackendHero />
        <ContractSection />
        <GatekeepersSection />
        <RequestLifecycleSection />
        <MemoryFailureSection />
        <LettingGoSection />
        <ChecklistSection />
      </main>
    </div>
  );
}
