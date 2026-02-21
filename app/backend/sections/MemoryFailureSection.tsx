import CodeBlock from "../../components/CodeBlock";
import DragBucket from "../../components/DragBucket";
import CircuitSim from "../../components/CircuitSim";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import {
  memoryFailureCode,
  memoryFailureBucketItems,
  memoryFailureBucketBuckets,
  memoryFailureBucketMapping,
} from "../data";

export default function MemoryFailureSection() {
  return (
    <section id="s4">

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
          04
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="04"
            label="Memory and Failure"
            heading="Your server forgets everything. That's a feature."
            time="7 min"
          />
          <Prose>
            <strong>Statelessness:</strong> Your server doesn&apos;t remember the
            last request. Each request is independent — you can scale by adding
            more servers, and a crash doesn&apos;t lose in-memory state. Where
            does data live? In a database (persistent), cache (fast, volatile),
            or session (per-user, short-lived). Each has a cost. Choose
            deliberately.
          </Prose>
          <Prose>
            <strong>Failure types:</strong> (1) <em>You broke it</em> — bug in
            your code. (2) <em>They sent garbage</em> — missing field, malformed
            JSON. (3) <em>Nobody controls it</em> — payment API down, network
            outage. Your error responses are as much a product as success
            responses.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── Circuit breaker + code ──────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Circuit breaker pattern</ChallengeLabel>
        <Prose>
          <strong>Circuit Breaker:</strong> If a dependency keeps failing, stop
          calling it. Fail fast instead of cascading. After a cooldown, probe
          once. If it works, resume. If not, stay open. Retry with backoff — wait,
          retry, wait longer. Don&apos;t flood a recovering service.
        </Prose>
        <CodeBlock code={memoryFailureCode} />
      </BackendChallengeSection>

      {/* ── Challenges ──────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ChallengeLabel>Simulator: circuit breaker</ChallengeLabel>
            <CircuitSim />
          </div>
          <div>
            <ChallengeLabel>Challenge: classify the failure</ChallengeLabel>
            <DragBucket
              items={memoryFailureBucketItems}
              buckets={memoryFailureBucketBuckets}
              correctMapping={memoryFailureBucketMapping}
              prompt="Each failure scenario has an owner. Sort them into the right bucket."
            />
          </div>
        </div>
      </BackendChallengeSection>

    </section>
  );
}
