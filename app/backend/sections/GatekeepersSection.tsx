import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import MatchPairs from "../../components/MatchPairs";
import AuthFlowDiagram from "../../components/AuthFlowDiagram";
import JwtInspector from "../../components/JwtInspector";
import AuthSim from "../../components/AuthSim";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
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
    <section id="s2" className="py-20">
      <SectionHeader
        number="02"
        label="The Gatekeepers"
        heading="Every route answers three questions."
        time="15 min"
      />

      {/* Opening: the pipeline */}
      <ProseBlock>
        <Prose>
          Before your business logic runs, every request passes three checks:{" "}
          <strong>Who are you?</strong> (Authentication).{" "}
          <strong>Are you allowed?</strong> (Authorization).{" "}
          <strong>Is the input valid?</strong> (Validation). They run in that
          order - each one can short-circuit the chain and stop the request cold.
        </Prose>
        <Prose>
          You can&apos;t check permissions until you know who the user is. You
          can&apos;t process a body until you know it&apos;s well-formed. Each
          layer returns a specific status: invalid token → 401, wrong role → 403,
          missing field → 400. The principle:{" "}
          <strong>never trust the client.</strong> This section breaks down how
          the first question - <em>Who are you?</em> - is actually answered.
        </Prose>
      </ProseBlock>

      <div className="mb-10">
        <CodeBlock code={gatekeepersCode} lang="plaintext" />
      </div>

      {/* 1. The identity problem */}
      <div className="mb-3">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
          The identity problem
        </p>
      </div>

      <ProseBlock>
        <Prose>
          HTTP is <strong>stateless</strong> - the server forgets everything
          between requests. So how does it know who&apos;s sending the next one?
          Two broad approaches:
        </Prose>
      </ProseBlock>

      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            maintain state. Scaling across multiple servers needs shared session
            storage (Redis, etc.).
          </p>
        </div>
        <div className="border border-zinc-200 p-5 flex flex-col gap-2">
          <p className="text-xs font-medium text-zinc-900 uppercase tracking-[0.12em]">
            Token-based / JWT (stateless)
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Server signs a token (a card) containing the user&apos;s identity.
            Client holds the token. Each request the server just verifies the
            signature - no DB lookup needed.
          </p>
          <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-2 mt-1">
            <strong className="text-zinc-600">Trade-off:</strong> tokens
            can&apos;t be invalidated until they expire ( unless you maintain a
            deny-list). Logout is more complex.
          </p>
        </div>
      </div>

      {/* 2. Passwords: hashing vs encryption */}
      <div className="mb-3">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
          Passwords - what you store vs what you know
        </p>
      </div>

      <ProseBlock>
        <Prose>
          <strong>Hashing</strong> is a one-way transformation. You hash at
          registration and store the result. At login, you hash the submitted
          password with the same algorithm and compare. You can never reverse a
          hash to recover the original password - not even you.
        </Prose>
        <Prose>
          <strong>Salting</strong> adds a random value before hashing. Without
          it, two users with the same password produce identical hashes - and
          attackers can precompute a database of hash→password mappings (a
          &quot;rainbow table&quot;) to reverse them. A unique salt means each
          hash is unique, even for identical passwords.{" "}
          <strong>bcrypt</strong> handles this automatically.
        </Prose>
        <Prose>
          <strong>Encryption</strong> is two-way - there&apos;s a key, and you
          can decrypt with it. Use this for data at rest (API keys, credit card
          numbers, PII that the system needs to read back). Never use it for
          passwords. If your encryption key leaks, all your encrypted passwords
          are compromised. With hashing, a breach of the DB gives attackers
          hashes they&apos;d have to brute-force individually.
        </Prose>
      </ProseBlock>

      <div className="mb-10">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          bcrypt: register and login in Node.js
        </p>
        <CodeBlock code={passwordHashingCode} lang="javascript" />
      </div>

      {/* 3. JWT deep dive */}
      <div className="mb-3">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
          JWT - the signed card
        </p>
      </div>

      <ProseBlock>
        <Prose>
          A JWT (JSON Web Token) has three parts separated by dots:{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            header.payload.signature
          </code>
          . The header declares the algorithm. The payload holds the
          claims - who the user is, their role, and an expiry timestamp. The
          signature is a cryptographic hash of the first two parts using your
          server&apos;s secret.
        </Prose>
        <Prose>
          Anyone can decode the header and payload (they&apos;re just
          Base64-encoded). The signature is what you can&apos;t fake - without
          the secret, you can&apos;t produce a valid signature. So if an
          attacker modifies the payload (e.g., changing{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            role: &quot;student&quot;
          </code>{" "}
          to{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            role: &quot;admin&quot;
          </code>
          ),{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            jwt.verify()
          </code>{" "}
          will reject it.
        </Prose>
      </ProseBlock>

      <div className="mb-8">
        <JwtInspector token={jwtExampleToken} parts={jwtParts} />
      </div>

      <div className="mb-6">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          Signing a token on login
        </p>
        <CodeBlock code={jwtSignCode} lang="javascript" />
      </div>

      <div className="mb-10">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          Verifying in middleware
        </p>
        <CodeBlock code={jwtMiddlewareCode} lang="javascript" />
      </div>

      {/* 4. Authorization middleware */}
      <div className="mb-3">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
          Authorization - from "who" to "what"
        </p>
      </div>

      <ProseBlock>
        <Prose>
          Authentication answers <em>who you are</em>. Authorization answers{" "}
          <em>what you can do</em>. They&apos;re separate middleware in the
          chain. After <code className="font-mono text-zinc-700 bg-zinc-100 px-1">authenticate()</code>{" "}
          attaches <code className="font-mono text-zinc-700 bg-zinc-100 px-1">req.user</code>,
          the next middleware checks the role:{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            requireRole(&quot;admin&quot;)
          </code>
          . If the role doesn&apos;t match → 403 Forbidden. Not 401 - the server
          knows who you are. You&apos;re just not allowed here.
        </Prose>
      </ProseBlock>

      <div className="mb-10">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          Role-based authorization middleware
        </p>
        <CodeBlock code={roleMiddlewareCode} lang="javascript" />
      </div>

      {/* 5. Auth flow diagram */}
      <div className="mb-3">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
          The full auth flow
        </p>
      </div>

      <ProseBlock>
        <Prose>
          Here&apos;s how all the pieces connect - step by step, for both
          registration and login. Each node shows the actual function called and
          why it matters. Use the tab to switch between flows, then step through
          each stage.
        </Prose>
      </ProseBlock>

      <div className="mb-14">
        <AuthFlowDiagram
          registerSteps={registerFlowSteps}
          loginSteps={loginFlowSteps}
        />
      </div>

      {/* Challenges */}
      <div className="flex flex-col gap-8">
        <div>
          <ChallengeLabel>Challenge A: auth middleware simulator</ChallengeLabel>
          <AuthSim scenarios={authSimScenarios} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <ChallengeLabel>Challenge D: match the concepts</ChallengeLabel>
          <MatchPairs
            pairs={authMatchPairs}
            prompt="Match each auth concept to what it actually does."
          />
        </div>

        <div>
          <ChallengeLabel>Challenge E: where does the secret go?</ChallengeLabel>
          <Quiz {...jwtSecretQuiz} />
        </div>
      </div>
    </section>
  );
}
