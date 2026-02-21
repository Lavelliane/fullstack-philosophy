import type { Metadata } from "next";
import FrontendNav from "./components/FrontendNav";
import FrontendHero from "./components/FrontendHero";
import SectionDivider from "../backend/components/SectionDivider";
import SectionOne from "./sections/SectionOne";
import SectionTwo from "./sections/SectionTwo";

export const metadata: Metadata = {
  title: "The Surface That Speaks | The Human Behind the Endpoint",
  description:
    "Frontend workshop. Where the backend meets the human. WIP.",
};

export default function FrontendPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <FrontendNav />
      <FrontendHero />

      <div className="max-w-screen-lg mx-auto px-8 py-12 flex flex-col gap-0">
        <SectionDivider />
        <SectionOne />
        <SectionDivider />
        <SectionTwo />
      </div>
    </div>
  );
}
