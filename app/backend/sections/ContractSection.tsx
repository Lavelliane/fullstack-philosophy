import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragBucket from "../../components/DragBucket";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import {
  contractCodeBad,
  contractCodeGood,
  contractQuiz,
  contractBucketItems,
  contractBucketBuckets,
  contractBucketMapping,
} from "../data";

export default function ContractSection() {
  return (
    <section id="s1" className="py-20">
      <SectionHeader
        number="01"
        label="The Contract"
        heading="Your backend is a promise."
        time="5 min"
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
            GET /users/5
          </code>{" "}
          reads user 5.{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            POST /orders
          </code>{" "}
          creates an order. Avoid{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">
            GET /fetchUserById
          </code>
          : verbs in URLs leak implementation and make the API harder to reason
          about.
        </Prose>
        <Prose>
          <strong>2. DTOs: shape for the audience.</strong> Your database has
          columns like <code className="font-mono text-zinc-700 bg-zinc-100 px-1">password_hash</code> and{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">internal_flag</code>.
          The client doesn&apos;t need those. A Data Transfer Object (DTO) is the
          response shape you choose to expose. The contract defines the shape,
          not your schema.
        </Prose>
      </ProseBlock>

      <CodeBlock
        mode="split"
        code={contractCodeBad}
        splitCode={contractCodeGood}
        labels={["Bad: verbs in URLs, leaking schema", "Good: nouns, shaped DTO"]}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ChallengeLabel>Challenge: design the endpoint</ChallengeLabel>
          <Quiz {...contractQuiz} />
        </div>
        <div>
          <ChallengeLabel>Challenge: shape the DTO</ChallengeLabel>
          <DragBucket
            items={contractBucketItems}
            buckets={contractBucketBuckets}
            correctMapping={contractBucketMapping}
            prompt="Which user fields belong in the API response? Drag each field into the correct bucket."
          />
        </div>
      </div>
    </section>
  );
}
