import CodeBlock from "../components/CodeBlock";
import CodeVisual from "../components/CodeVisual";
import Quiz from "../../components/Quiz";
import DragBucket from "../../components/DragBucket";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ThreeRolesHeroContent from "../components/ThreeRolesHeroContent";
import ScrollToPracticeButton from "../components/ScrollToPracticeButton";
import ChallengeSection from "../components/ChallengeSection";
import { ThreeRolesButtonVisual } from "../components/CodeVisuals";
import { highlightCode } from "../../../lib/shiki";
import {
  threeRolesHtmlCode,
  threeRolesCssCode,
  threeRolesJsCode,
  threeRolesBadCode,
  threeRolesGoodCode,
  threeRolesQuiz,
  rolesMatchPairs,
  rolesBucketItems,
  rolesBucketBuckets,
  rolesBucketMapping,
} from "../data";

export default async function ThreeRolesSection() {
  const [htmlHighlight, cssHighlight, jsHighlight] = await Promise.all([
    highlightCode(threeRolesHtmlCode, "html"),
    highlightCode(threeRolesCssCode, "css"),
    highlightCode(threeRolesJsCode, "javascript"),
  ]);

  return (
    <section id="s1" style={{ scrollSnapAlign: "start" }}>

      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center px-8 md:px-16 overflow-hidden"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        {/* Decorative number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(140px, 28vw, 260px)", lineHeight: 1 }}
        >
          01
        </span>

        <ThreeRolesHeroContent
          htmlCode={htmlHighlight}
          cssCode={cssHighlight}
          jsCode={jsHighlight}
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-8 md:left-16">
          <ScrollToPracticeButton targetId="s1-practice" />
        </div>
      </div>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div id="s1-practice" className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-2xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Challenges: Section 01
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              Separation of concerns: when structure, appearance, and behavior
              are mixed together, any change becomes risky. When they&apos;re
              separate, each can evolve independently.
            </p>
          </div>
        </div>

        <ChallengeSection wide>
          <ChallengeLabel>Code comparison: separated vs. mixed</ChallengeLabel>
          <div className="flex flex-col gap-4">
            <CodeBlock
              mode="split"
              code={threeRolesBadCode}
              splitCode={threeRolesGoodCode}
              labels={["Bad: mixed concerns", "Good: each role in its file"]}
            />
            <CodeVisual><ThreeRolesButtonVisual /></CodeVisual>
          </div>
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: which role changes?</ChallengeLabel>
          <Quiz {...threeRolesQuiz} />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: match the concepts</ChallengeLabel>
          <MatchPairs
            pairs={rolesMatchPairs}
            prompt="Match each technology to what it is responsible for."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge C: sort into roles</ChallengeLabel>
          <DragBucket
            items={rolesBucketItems}
            buckets={rolesBucketBuckets}
            correctMapping={rolesBucketMapping}
            prompt="Drag each code snippet into the correct role: HTML, CSS, or JavaScript."
          />
        </ChallengeSection>
      </div>
    </section>
  );
}
