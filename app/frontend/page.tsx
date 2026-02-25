import type { Metadata } from "next";
import { Suspense } from "react";
import FrontendPageWrapper from "./components/FrontendPageWrapper";
import IntroSlide from "./components/IntroSlide";
import ThreeRolesSection from "./sections/ThreeRolesSection";
import ComponentsSection from "./sections/ComponentsSection";
import StateSection from "./sections/StateSection";
import FetchingSection from "./sections/FetchingSection";
import RoutingSection from "./sections/RoutingSection";
import ChecklistSection from "./sections/ChecklistSection";

export const metadata: Metadata = {
  title: "The Face of Software | The Human Behind the Endpoint",
  description:
    "A 30-minute interactive deep-dive into frontend development. Components, state, and data flow. No prior framework experience required.",
};

export default function FrontendPage() {
  return (
    <FrontendPageWrapper>
      <main
        id="scroll-container"
        className="flex-1 overflow-y-auto"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <IntroSlide />
        <ThreeRolesSection />
        <ComponentsSection />
        <StateSection />
        <FetchingSection />
        <RoutingSection />
        <Suspense
          fallback={
            <section id="s6" style={{ scrollSnapAlign: "start" }}>
              <div
                className="relative flex items-center px-8 md:px-16"
                style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
              >
                <div className="h-12 w-48 bg-zinc-100 rounded animate-pulse" />
              </div>
            </section>
          }
        >
          <ChecklistSection />
        </Suspense>
      </main>
    </FrontendPageWrapper>
  );
}
