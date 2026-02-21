import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragBucket from "../../components/DragBucket";
import DragSort from "../../components/DragSort";
import ValidatorSim from "../../components/ValidatorSim";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
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
    <section id="s1" className="py-20">
      <SectionHeader
        number="01"
        label="The Contract"
        heading="Your backend is a promise."
        time="8 min"
      />

      <ProseBlock>
        <Prose>
          Your API is a contract between you and whoever calls it. The contract
          says: &quot;Send me this shape, I&apos;ll give you that shape.&quot; Two
          rules make that contract clear and stable.
        </Prose>
        <Prose>
          <strong>1. Resources as nouns, methods as verbs.</strong> The URL names
          the thing. The HTTP method names the action.{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            GET /students/42
          </code>{" "}
          reads student 42.{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            POST /students
          </code>{" "}
          creates a student. Avoid{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            GET /fetchStudentById
          </code>
          : verbs in URLs leak implementation and make the API harder to reason
          about.
        </Prose>
        <Prose>
          <strong>2. DTOs: shape for the audience.</strong> Your database has
          columns like <code className="font-mono text-zinc-700 bg-zinc-100 px-1">password_hash</code> and{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">ssn_hash</code>.
          The client doesn&apos;t need those. A Data Transfer Object (DTO) is the
          response shape you choose to expose. The contract defines the shape,
          not your schema.
        </Prose>
      </ProseBlock>

      <div className="mb-8">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          HTTP methods: the five verbs
        </p>
        <CodeBlock code={httpMethodsCode} lang="plaintext" />
      </div>

      <div className="mb-8">
        <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
          DTOs: same idea, different syntax
        </p>
        <p className="text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-4">
          Functional (Zod) vs OOP (C# ASP.NET). Same contract: reject bad shapes before they touch your logic.
        </p>
        <CodeBlock
          mode="split"
          code={zodDtoCode}
          splitCode={csharpDtoCode}
          labels={["Zod (TypeScript)", "C# ASP.NET"]}
        />
      </div>

      <div className="mb-8">
        <CodeBlock
          mode="split"
          code={contractCodeBad}
          splitCode={contractCodeGood}
          labels={["Bad: verbs in URLs, leaking schema", "Good: nouns, shaped DTO"]}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ChallengeLabel>Challenge A: design the endpoint</ChallengeLabel>
          <Quiz {...contractQuiz} />
        </div>
        <div>
          <ChallengeLabel>Challenge B: shape the DTO</ChallengeLabel>
          <DragBucket
            items={contractBucketItems}
            buckets={contractBucketBuckets}
            correctMapping={contractBucketMapping}
            prompt="Which student fields belong in the API response? Drag each field into the correct bucket."
          />
        </div>
      </div>

      <div className="mt-10">
        <ChallengeLabel>Challenge C: assemble the route</ChallengeLabel>
        <DragSort
          items={contractDragSortItems}
          correctOrder={contractDragSortCorrectOrder}
          prompt="Drag the code pieces into the correct order for a Zod-validated POST route."
        />
      </div>

      <div className="mt-10">
        <ChallengeLabel>Challenge D: validator simulator</ChallengeLabel>
        <ValidatorSim payloads={validatorSimPayloads} />
      </div>
    </section>
  );
}
