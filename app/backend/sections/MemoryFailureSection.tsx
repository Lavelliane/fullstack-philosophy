import CodeBlock from "../../components/CodeBlock";
import DragBucket from "../../components/DragBucket";
import CircuitSim from "../../components/CircuitSim";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import {
  memoryFailureCode,
  memoryFailureBucketItems,
  memoryFailureBucketBuckets,
  memoryFailureBucketMapping,
} from "../data";

export default function MemoryFailureSection() {
  return (
    <section id="s4" className="py-20">
      <SectionHeader
        number="04"
        label="Memory and Failure"
        heading="Your server forgets everything. That's a feature."
        time="7 min"
      />

      <ProseBlock>
        <Prose>
          <strong>Statelessness:</strong> Your server doesn&apos;t remember the
          last request. Each request is independent. That&apos;s intentional:
          you can scale by adding more servers, and a crash doesn&apos;t lose
          in-memory state. Where does data live? In a database (persistent),
          cache (fast, volatile), or session (per-user, short-lived). Each has a
          cost. Choose deliberately.
        </Prose>
        <Prose>
          <strong>Failure types:</strong> When something goes wrong, who owns
          it? (1) <em>You broke it</em>: bug in your code, unhandled case. (2){" "}
          <em>They sent garbage</em>: missing field, malformed JSON, invalid
          input. (3) <em>Nobody controls it</em>: payment API down, network
          outage. Your error responses are as much a product as success
          responses. Return clear status codes and messages.
        </Prose>
        <Prose>
          <strong>Circuit Breaker:</strong> If a dependency (e.g. payment API)
          keeps failing, stop calling it. Fail fast instead of cascading. After
          a cooldown, try again (probe). If it works, resume. If not, stay
          open. Retry with backoff: wait, retry, wait longer, retry. Don&apos;t
          flood a recovering service.
        </Prose>
      </ProseBlock>

      <CodeBlock code={memoryFailureCode} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </section>
  );
}
