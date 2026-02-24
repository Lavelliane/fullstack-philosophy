import CodeBlock from "../../components/CodeBlock";
import DragBucket from "../../components/DragBucket";
import Quiz from "../../components/Quiz";
import MatchPairs from "../../components/MatchPairs";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import ErrorPrinciples from "../components/ErrorPrinciples";
import ErrorSim from "../components/ErrorSim";
import {
  errorPrinciples,
  errorHandlingBad,
  errorHandlingGood,
  errorTypesCode,
  errorBucketItems,
  errorBucketBuckets,
  errorBucketMapping,
  idempotencyQuiz,
  errorMatchPairs,
} from "../data";

export default function ErrorHandlingSection() {
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
            label="Errors as Data"
            heading="Errors are data, not disasters."
            time="7 min"
          />
          <Prose>
            The single most transferable concept in backend engineering:
            <strong> errors are not exceptions to handle — they&apos;re outcomes to model.</strong>
            Every function has two possible results: success or failure. The moment you write
            a function that can fail and don&apos;t account for it, you&apos;ve created a time bomb.
          </Prose>
          <Prose>
            Beginners write happy-path code and hope nothing breaks. Seniors design for failure
            from the start. They ask: <em>What happens if this runs twice? What if the database is down?
            Can I tell from the logs what went wrong?</em> These questions aren&apos;t paranoia —
            they&apos;re professional obligation.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── The 6 Principles ────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The 6 fundamental principles</ChallengeLabel>
        <Prose>
          Everything else branches from these. They apply to every backend system,
          regardless of language, framework, or scale. Click each to expand.
        </Prose>
        <ErrorPrinciples principles={errorPrinciples} />
      </BackendChallengeSection>

      {/* ── Dev vs Prod Simulation ───────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Development vs production</ChallengeLabel>
        <Prose>
          <strong>Fail loudly in development. Fail gracefully in production.</strong>{" "}
          Pick a scenario below and toggle between environments to see how the same
          error looks completely different depending on who&apos;s watching.
        </Prose>
        <ErrorSim />
        <details className="mt-4 group">
          <summary className="cursor-pointer text-[9px] uppercase tracking-[0.15em] text-zinc-400 hover:text-zinc-600 transition-colors select-none">
            See the code pattern ↓
          </summary>
          <div className="mt-3">
            <CodeBlock
              code={`// Development: fail loud
if (process.env.NODE_ENV === "development") {
  throw new Error(\`Database connection failed: \${err.message}\\nStack: \${err.stack}\`);
}

// Production: fail gracefully
if (process.env.NODE_ENV === "production") {
  logger.error("Database connection failed", { error: err.message });
  return res.status(503).json({
    error: "Service temporarily unavailable. Please try again later.",
  });
}`}
            />
          </div>
        </details>
      </BackendChallengeSection>

      {/* ── Recoverable vs Unrecoverable ────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Recoverable vs unrecoverable errors</ChallengeLabel>
        <Prose>
          Not all errors are created equal. The first group is expected — return a message
          to the user. The second group signals something broken — log it and alert ops.
        </Prose>

        {/* Visual card comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
            <div className="text-[9px] uppercase tracking-[0.15em] text-amber-600 font-bold mb-3">
              Recoverable → 4xx
            </div>
            <ul className="space-y-2">
              {[
                { label: "ValidationError", note: "Bad email format" },
                { label: "DuplicateEmailError", note: "Already registered" },
                { label: "AuthorizationError", note: "Wrong permissions" },
                { label: "NotFoundError", note: "Resource doesn't exist" },
              ].map(({ label, note }) => (
                <li key={label} className="flex items-start gap-2 font-mono text-[10px]">
                  <span className="text-amber-400 mt-0.5 shrink-0">→</span>
                  <span>
                    <span className="font-semibold text-amber-800">{label}</span>
                    <span className="text-amber-600"> — {note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-amber-200 text-[9px] text-amber-700">
              Return to user. They can fix it and retry.
            </div>
          </div>

          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="text-[9px] uppercase tracking-[0.15em] text-red-600 font-bold mb-3">
              Unrecoverable → 5xx
            </div>
            <ul className="space-y-2">
              {[
                { label: "DatabaseConnectionError", note: "Postgres unreachable" },
                { label: "ConfigMissingError", note: "Env var not set" },
                { label: "ThirdPartyTimeoutError", note: "Stripe API down" },
                { label: "TypeError (unhandled)", note: "Bug in your code" },
              ].map(({ label, note }) => (
                <li key={label} className="flex items-start gap-2 font-mono text-[10px]">
                  <span className="text-red-400 mt-0.5 shrink-0">→</span>
                  <span>
                    <span className="font-semibold text-red-800">{label}</span>
                    <span className="text-red-600"> — {note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-red-200 text-[9px] text-red-700">
              Log it. Alert ops. User gets a generic 5xx.
            </div>
          </div>
        </div>

        <details className="group">
          <summary className="cursor-pointer text-[9px] uppercase tracking-[0.15em] text-zinc-400 hover:text-zinc-600 transition-colors select-none">
            See how to model this in code ↓
          </summary>
          <div className="mt-3">
            <CodeBlock code={errorTypesCode} />
          </div>
        </details>
      </BackendChallengeSection>

      {/* ── Anti-patterns vs Best Practices ─────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Anti-patterns vs best practices</ChallengeLabel>
        <Prose>
          Silent failures and vague errors are the most dangerous patterns — they look
          like success but corrupt your system&apos;s reliability. Here&apos;s what they
          look like side by side.
        </Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-[9px] uppercase tracking-[0.12em] text-red-500 mb-2">
              Anti-patterns
            </div>
            <CodeBlock code={errorHandlingBad} />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.12em] text-emerald-600 mb-2">
              Best practices
            </div>
            <CodeBlock code={errorHandlingGood} />
          </div>
        </div>
      </BackendChallengeSection>

      {/* ── Challenges ──────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ChallengeLabel>Challenge: classify the error</ChallengeLabel>
            <DragBucket
              items={errorBucketItems}
              buckets={errorBucketBuckets}
              correctMapping={errorBucketMapping}
              prompt="Each error belongs to one category. Recoverable errors get handled and returned to the user. Unrecoverable errors get logged and trigger alerts."
              scoreId="backend:s4:bucket"
            />
          </div>
          <div>
            <ChallengeLabel>Quiz: idempotency</ChallengeLabel>
            <Quiz
              question={idempotencyQuiz.question}
              options={idempotencyQuiz.options}
              correctId={idempotencyQuiz.correctId}
              explanation={idempotencyQuiz.explanation}
              scoreId="backend:s4:quiz"
            />
          </div>
        </div>
      </BackendChallengeSection>

      {/* ── Match Pairs ─────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge: match concepts</ChallengeLabel>
        <Prose>
          Match each error handling concept to its definition. These are the terms
          you&apos;ll use when discussing system reliability with your team.
        </Prose>
        <MatchPairs pairs={errorMatchPairs} prompt="Match each concept to its definition." scoreId="backend:s4:match" />
      </BackendChallengeSection>

    </section>
  );
}
