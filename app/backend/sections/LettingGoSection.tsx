import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import CodeQuiz from "../../components/CodeQuiz";
import FillBlank from "../../components/FillBlank";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import DIFlowDiagram from "../components/DIFlowDiagram";
import DISwitchboard from "../components/DISwitchboard";
import {
  lettingGoCodeBad,
  lettingGoCodeGood,
  diSpotCouplingQuiz,
  diFillSegments,
  diTrueFalseQuizzes,
} from "../data";

export default function LettingGoSection() {
  return (
    <section id="s5">

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
          05
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="05"
            label="Letting Go of Control"
            heading="Every time you write new X() inside a class, you've made a decision you can never take back."
            time="8 min"
          />
          <Prose>
            A <strong>dependency</strong> is anything your class needs to do its job — a
            database, an email sender, a logger. The question is: who creates it?
          </Prose>
          <Prose>
            <strong>Dependency Injection (DI)</strong> says: don&apos;t create your tools
            inside the class. Receive them from outside. Think of a lamp — it doesn&apos;t
            generate electricity. It just needs a socket. DI is the socket.
          </Prose>
          <Prose>
            The payoff: in production you plug in a real database. In tests you plug in a
            fake. <strong>Same service code. Different behavior. Zero changes.</strong>
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── The Problem: tight coupling ──────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The problem — tight coupling</ChallengeLabel>
        <Prose>
          When <code className="font-mono text-zinc-700 bg-zinc-100 px-1">OrderService</code>{" "}
          calls <code className="font-mono text-zinc-700 bg-zinc-100 px-1">new PostgresDatabase()</code>{" "}
          inside itself, it&apos;s hardwired. You can&apos;t swap it. You can&apos;t test
          it without a real running database. The service and the database are fused together.
        </Prose>
        <DIFlowDiagram mode="coupled" />
        <div className="mt-4 border-l-2 border-red-200 pl-4 text-xs text-zinc-500 leading-relaxed">
          <strong className="text-red-500">Problem:</strong> To run a single unit test on{" "}
          <code className="bg-zinc-100 px-1">OrderService</code>, you need Postgres running,
          a real database, real tables, real data. That&apos;s slow, fragile, and unnecessary.
        </div>
      </BackendChallengeSection>

      {/* ── The Solution: DI ─────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The solution — dependency injection</ChallengeLabel>
        <Prose>
          Instead of creating the database inside, the service <em>receives</em> it through
          the constructor. The constructor accepts an{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">IDatabase</code>{" "}
          interface — not a specific class. Now the client decides what to plug in.
        </Prose>
        <DIFlowDiagram mode="injected" />
        <div className="mt-4 border-l-2 border-emerald-200 pl-4 text-xs text-zinc-500 leading-relaxed">
          <strong className="text-emerald-600">Result:</strong> Production passes{" "}
          <code className="bg-zinc-100 px-1">PostgresDB</code>. Tests pass{" "}
          <code className="bg-zinc-100 px-1">MockDB</code>. The service never changes.
          This is the Hollywood Principle: <em>&quot;Don&apos;t call us, we&apos;ll call you.&quot;</em>
        </div>
      </BackendChallengeSection>

      {/* ── Code: before vs after ────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Code: tightly coupled vs injected</ChallengeLabel>
        <CodeBlock
          mode="split"
          code={lettingGoCodeBad}
          splitCode={lettingGoCodeGood}
          labels={["Tightly coupled — impossible to test", "Dependency Injection — flexible"]}
        />
      </BackendChallengeSection>

      {/* ── DI Switchboard ───────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Simulator: the DI switchboard</ChallengeLabel>
        <DISwitchboard />
      </BackendChallengeSection>

      {/* ── Challenge A: spot the coupling ───────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge A: spot the coupling</ChallengeLabel>
        <CodeQuiz {...diSpotCouplingQuiz} />
      </BackendChallengeSection>

      {/* ── Challenge B: fill in the blanks ──────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge B: refactor to DI</ChallengeLabel>
        <FillBlank
          segments={diFillSegments}
          prompt="Fill in the blanks to convert this class to use Dependency Injection."
        />
      </BackendChallengeSection>

      {/* ── Challenge C: true / false ────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge C: true or false?</ChallengeLabel>
        <div className="flex flex-col gap-4">
          {diTrueFalseQuizzes.map((q, i) => (
            <Quiz key={i} {...q} />
          ))}
        </div>
      </BackendChallengeSection>

    </section>
  );
}
