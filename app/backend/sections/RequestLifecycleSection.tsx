import CodeBlock from "../../components/CodeBlock";
import DragBucket from "../../components/DragBucket";
import FillBlank from "../../components/FillBlank";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import LayerDiagram from "../components/LayerDiagram";
import StrategyDiagram from "../components/StrategyDiagram";
import ConceptComparison from "../components/ConceptComparison";
import {
  lifecycleCode,
  lifecycleLayerComparison,
  lifecycleBucketItems,
  lifecycleBucketBuckets,
  lifecycleBucketMapping,
  lifecycleFillSegments,
} from "../data";

export default function RequestLifecycleSection() {
  return (
    <section id="s3">

      {/* ── Intro slide ─────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center px-8 md:px-16 min-h-[calc(100vh-var(--nav-height,61px))]"
        style={{ scrollSnapAlign: "start" }}
      >
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(120px, 24vw, 200px)", lineHeight: 1 }}
        >
          03
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="03"
            label="The Request Lifecycle"
            heading="Middleware → Controller → Service → Repository → Response."
            time="8 min"
          />
          <Prose>
            A request doesn&apos;t jump straight to your business logic. It flows
            through layers, each with a single job. Think of it like a restaurant:
            the host seats you (middleware), the waiter takes your order
            (controller), the kitchen decides how to make it (service), and
            someone fetches from the pantry (repository).
          </Prose>
          <Prose>
            The key insight: <strong>each layer has one responsibility</strong>.
            The controller never calculates prices. The service never writes SQL.
            When you mix them, you get code that&apos;s hard to test, change, and
            reuse.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── Layer diagram ───────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The layers visualised</ChallengeLabel>
        <LayerDiagram />
      </BackendChallengeSection>

      {/* ── Concept comparison ──────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>What each layer does (and does not)</ChallengeLabel>
        <ConceptComparison
          title="What each layer does (and does not)"
          rows={lifecycleLayerComparison}
        />
      </BackendChallengeSection>

      {/* ── Strategy pattern: diagram ────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Strategy pattern in the service</ChallengeLabel>
        <Prose>
          <strong>Strategy pattern:</strong> Your pricing logic might change
          (standard, bulk discount, Black Friday). Instead of if/else everywhere,
          the service receives a{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">pricingStrategy</code>.
          Same interface, swappable implementation. The service says
          &quot;calculate the total&quot;; it doesn&apos;t care which strategy does it.
        </Prose>
        <StrategyDiagram />
      </BackendChallengeSection>

      {/* ── Strategy pattern: code ───────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Strategy pattern — the code</ChallengeLabel>
        <CodeBlock code={lifecycleCode} />
      </BackendChallengeSection>

      {/* ── Challenge: sort into layers ─────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge: sort into layers</ChallengeLabel>
        <DragBucket
          items={lifecycleBucketItems}
          buckets={lifecycleBucketBuckets}
          correctMapping={lifecycleBucketMapping}
          prompt="Each description belongs to exactly one layer. Drag each into the correct bucket."
        />
      </BackendChallengeSection>

      {/* ── Challenge: fill in the blanks ───────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge: fill in the blanks</ChallengeLabel>
        <FillBlank
          segments={lifecycleFillSegments}
          prompt="A controller function with two gaps. Select the correct value for each blank."
        />
      </BackendChallengeSection>

    </section>
  );
}
