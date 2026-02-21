import type { Metadata } from "next";
import SectionNav from "../components/SectionNav";
import BackendNav from "./components/BackendNav";
import BackendHero from "./components/BackendHero";
import SectionDivider from "./components/SectionDivider";
import SectionReveal from "./components/SectionReveal";
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

const SECTION_LABELS = NAV_SECTIONS.map((s) => s.label);

export default function BackendPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SectionNav sections={NAV_SECTIONS} />
      <BackendNav />
      <BackendHero />

      <div className="max-w-screen-lg mx-auto px-8 py-12 flex flex-col gap-0">
        <SectionDivider />
        <SectionReveal sectionLabels={SECTION_LABELS}>
          <ContractSection />
          <GatekeepersSection />
          <RequestLifecycleSection />
          <MemoryFailureSection />
          <LettingGoSection />
          <ChecklistSection />
        </SectionReveal>
      </div>
    </div>
  );
}
