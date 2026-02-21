import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragBucket from "../../components/DragBucket";
import DragSort from "../../components/DragSort";
import ValidatorSim from "../../components/ValidatorSim";
import RequestAnatomy from "../../components/RequestAnatomy";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import {
  httpMethodsCode,
  zodDtoCode,
  csharpDtoCode,
  contractCodeBad,
  contractCodeGood,
  contractQuiz,
  contractBucketItems,
  contractBucketBuckets,
  contractBucketMapping,
  contractDragSortItems,
  contractDragSortCorrectOrder,
  validatorSimPayloads,
} from "../data";

export default function ContractSection() {
  return (
    <section id="s1">

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
          01
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="01"
            label="The Contract"
            heading="Your backend is a promise."
            time="8 min"
          />
          <Prose>
            Your API is a contract between you and whoever calls it. The contract
            says: &quot;Send me this shape, I&apos;ll give you that shape.&quot; Two
            rules make that contract clear and stable.
          </Prose>
          <Prose>
            <strong>1. Resources as nouns, methods as verbs.</strong> The URL names
            the thing. The HTTP method names the action.{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">GET /students/42</code>{" "}
            reads student 42.{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">POST /students</code>{" "}
            creates a student.
          </Prose>
          <Prose>
            <strong>2. DTOs: shape for the audience.</strong> Your database has
            columns like <code className="font-mono text-zinc-700 bg-zinc-100 px-1">password_hash</code>.
            The client doesn&apos;t need those. A Data Transfer Object defines the
            response shape you expose — not your schema.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── HTTP methods ────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>HTTP methods: the five verbs</ChallengeLabel>
        <CodeBlock code={httpMethodsCode} lang="plaintext" />
      </BackendChallengeSection>

      {/* ── Request anatomy ─────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Anatomy of an HTTP request</ChallengeLabel>
        <p className="text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-6">
          Every request has four parts. Click each one to see what it does and why it matters.
        </p>
        <RequestAnatomy />
      </BackendChallengeSection>

      {/* ── DTOs: two syntaxes ──────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>DTOs: same idea, different syntax</ChallengeLabel>
        <p className="text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-4">
          Functional (Zod) vs OOP (C# ASP.NET). Same contract: reject bad shapes before they touch your logic.
        </p>
        <CodeBlock
          mode="split"
          code={zodDtoCode}
          splitCode={csharpDtoCode}
          labels={["Zod (TypeScript)", "C# ASP.NET"]}
        />
      </BackendChallengeSection>

      {/* ── Bad vs good ─────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Nouns vs verbs in practice</ChallengeLabel>
        <CodeBlock
          mode="split"
          code={contractCodeBad}
          splitCode={contractCodeGood}
          labels={["Bad: verbs in URLs, leaking schema", "Good: nouns, shaped DTO"]}
        />
      </BackendChallengeSection>

      {/* ── Challenge A ─────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge A: design the endpoint</ChallengeLabel>
        <Quiz {...contractQuiz} />
      </BackendChallengeSection>

      {/* ── Challenge B ─────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge B: shape the DTO</ChallengeLabel>
        <DragBucket
          items={contractBucketItems}
          buckets={contractBucketBuckets}
          correctMapping={contractBucketMapping}
          prompt="Which student fields belong in the API response? Drag each field into the correct bucket."
        />
      </BackendChallengeSection>

      {/* ── Challenge C ─────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge C: assemble the route</ChallengeLabel>
        <DragSort
          items={contractDragSortItems}
          correctOrder={contractDragSortCorrectOrder}
          prompt="Drag the code pieces into the correct order for a Zod-validated POST route."
        />
      </BackendChallengeSection>

      {/* ── Challenge D ─────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge D: validator simulator</ChallengeLabel>
        <ValidatorSim payloads={validatorSimPayloads} />
      </BackendChallengeSection>

    </section>
  );
}
