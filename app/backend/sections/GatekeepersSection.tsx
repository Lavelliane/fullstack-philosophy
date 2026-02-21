import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import MatchPairs from "../../components/MatchPairs";
import AuthFlowDiagram from "../../components/AuthFlowDiagram";
import JwtInspector from "../../components/JwtInspector";
import AuthSim from "../../components/AuthSim";
import JwtSignVerifyDiagram from "../../components/JwtSignVerifyDiagram";
import SectionHeader from "../components/SectionHeader";
import Prose from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import BackendChallengeSection from "../components/BackendChallengeSection";
import {
  gatekeepersCode,
  gatekeepersQuiz,
  passwordHashingCode,
  jwtSignCode,
  jwtMiddlewareCode,
  roleMiddlewareCode,
  jwtExampleToken,
  jwtParts,
  authSimScenarios,
  gatekeepersDragItemsV2,
  gatekeepersCorrectOrderV2,
  authMatchPairs,
  jwtSecretQuiz,
  registerFlowSteps,
  loginFlowSteps,
} from "../data";

export default function GatekeepersSection() {
  return (
    <section id="s2">

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
          02
        </span>
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            number="02"
            label="The Gatekeepers"
            heading="Every route answers three questions."
            time="15 min"
          />
          <Prose>
            Before your business logic runs, every request passes three checks:{" "}
            <strong>Who are you?</strong> (Authentication).{" "}
            <strong>Are you allowed?</strong> (Authorization).{" "}
            <strong>Is the input valid?</strong> (Validation). They run in that
            order — each one can short-circuit the chain.
          </Prose>
          <Prose>
            Each layer returns a specific status: invalid token → 401, wrong role → 403,
            missing field → 400. The principle:{" "}
            <strong>never trust the client.</strong> This section breaks down how
            the first question — <em>Who are you?</em> — is actually answered.
          </Prose>
        </div>
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">Practice ↓</span>
        </div>
      </div>

      {/* ── Pipeline + identity problem ─────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The middleware pipeline</ChallengeLabel>
        <CodeBlock code={gatekeepersCode} lang="plaintext" />
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mt-8 mb-4">
          The identity problem: two approaches
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-zinc-200 p-5 flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-900 uppercase tracking-[0.12em]">
              Session-based (stateful)
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Server stores a session object in memory or a DB. Client holds a
              session ID in a cookie. Every request the server looks up the session
              to identify the user.
            </p>
            <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-2 mt-1">
              <strong className="text-zinc-600">Trade-off:</strong> server must
              maintain state. Scaling needs shared session storage (Redis, etc.).
            </p>
          </div>
          <div className="border border-zinc-200 p-5 flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-900 uppercase tracking-[0.12em]">
              Token-based / JWT (stateless)
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Server signs a token containing the user&apos;s identity. Client holds
              the token. Each request the server just verifies the signature — no
              DB lookup needed.
            </p>
            <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-2 mt-1">
              <strong className="text-zinc-600">Trade-off:</strong> tokens
              can&apos;t be invalidated until they expire unless you maintain a
              deny-list.
            </p>
          </div>
        </div>
      </BackendChallengeSection>

      {/* ── Passwords ───────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Passwords — what you store vs what you know</ChallengeLabel>
        <div className="space-y-4 mb-6">
          <Prose>
            <strong>Hashing</strong> is a one-way transformation. You hash at
            registration and store the result. At login, you hash the submitted
            password and compare. You can never reverse a hash — not even you.
          </Prose>
          <Prose>
            <strong>Salting</strong> adds a random value before hashing so two
            users with the same password produce different hashes. Without it,
            attackers can use precomputed rainbow tables. <strong>bcrypt</strong>{" "}
            handles this automatically.
          </Prose>
          <Prose>
            <strong>Encryption</strong> is two-way. Use it for data at rest that
            the system needs to read back (API keys, PII). Never for passwords —
            if the key leaks, all passwords are compromised.
          </Prose>
        </div>
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          bcrypt: register and login in Node.js
        </p>
        <CodeBlock code={passwordHashingCode} lang="javascript" />
      </BackendChallengeSection>

      {/* ── JWT deep dive ───────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>JWT — the signed card</ChallengeLabel>
        <div className="space-y-4 mb-6">
          <Prose>
            A JWT has three parts:{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">header.payload.signature</code>.
            The header declares the algorithm. The payload holds claims — user ID,
            role, expiry. The signature is a cryptographic hash of the first two
            parts using your server&apos;s secret.
          </Prose>
          <Prose>
            Anyone can decode the header and payload (Base64-encoded). The
            signature is what you can&apos;t fake. If an attacker changes{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">role: &quot;student&quot;</code>{" "}
            to{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">role: &quot;admin&quot;</code>,{" "}
            <code className="font-mono text-zinc-700 bg-zinc-100 px-1">jwt.verify()</code>{" "}
            will reject it.
          </Prose>
        </div>
        <JwtInspector token={jwtExampleToken} parts={jwtParts} />
      </BackendChallengeSection>

      {/* ── JWT sign + verify ───────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Signing and verifying JWTs</ChallengeLabel>
        <JwtSignVerifyDiagram />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
              Signing a token on login
            </p>
            <CodeBlock code={jwtSignCode} lang="javascript" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
              Verifying in middleware
            </p>
            <CodeBlock code={jwtMiddlewareCode} lang="javascript" />
          </div>
        </div>
      </BackendChallengeSection>

      {/* ── Authorization ───────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Authorization — from &quot;who&quot; to &quot;what&quot;</ChallengeLabel>
        <Prose>
          Authentication answers <em>who you are</em>. Authorization answers{" "}
          <em>what you can do</em>. After{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">authenticate()</code>{" "}
          attaches <code className="font-mono text-zinc-700 bg-zinc-100 px-1">req.user</code>,
          the next middleware checks the role. If it doesn&apos;t match → 403
          Forbidden. Not 401 — the server knows who you are. You&apos;re just
          not allowed here.
        </Prose>
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3 mt-2">
          Role-based authorization middleware
        </p>
        <CodeBlock code={roleMiddlewareCode} lang="javascript" />
      </BackendChallengeSection>

      {/* ── Auth flow diagram ───────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>The full auth flow</ChallengeLabel>
        <Prose>
          Here&apos;s how all the pieces connect — step by step, for both
          registration and login. Use the tab to switch between flows, then step
          through each stage.
        </Prose>
        <AuthFlowDiagram
          registerSteps={registerFlowSteps}
          loginSteps={loginFlowSteps}
        />
      </BackendChallengeSection>

      {/* ── Challenge A ─────────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <ChallengeLabel>Challenge A: auth middleware simulator</ChallengeLabel>
        <AuthSim scenarios={authSimScenarios} />
      </BackendChallengeSection>

      {/* ── Challenge B + C ─────────────────────────────────────────────── */}
      <BackendChallengeSection wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ChallengeLabel>Challenge B: order the pipeline</ChallengeLabel>
            <DragSort
              items={gatekeepersDragItemsV2}
              correctOrder={gatekeepersCorrectOrderV2}
              prompt="Drag the steps into the correct order for a JWT-authenticated route."
            />
          </div>
          <div>
            <ChallengeLabel>Challenge C: 401 vs 403</ChallengeLabel>
            <Quiz {...gatekeepersQuiz} />
          </div>
        </div>
      </BackendChallengeSection>

      {/* ── Challenge D ─────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge D: match the concepts</ChallengeLabel>
        <MatchPairs
          pairs={authMatchPairs}
          prompt="Match each auth concept to what it actually does."
        />
      </BackendChallengeSection>

      {/* ── Challenge E ─────────────────────────────────────────────────── */}
      <BackendChallengeSection>
        <ChallengeLabel>Challenge E: where does the secret go?</ChallengeLabel>
        <Quiz {...jwtSecretQuiz} />
      </BackendChallengeSection>

    </section>
  );
}
