import CodeBlock from "../../components/CodeBlock";
import DragBucket from "../../components/DragBucket";
import FillBlank from "../../components/FillBlank";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import LayerDiagram from "../components/LayerDiagram";
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
    <section id="s3" className="py-20">
      <SectionHeader
        number="03"
        label="The Request Lifecycle"
        heading="Middleware → Controller → Service → Repository → Response."
        time="8 min"
      />

      <ProseBlock>
        <Prose>
          A request doesn&apos;t jump straight to your business logic. It flows
          through layers, each with a single job. Think of it like a restaurant:
          the host seats you (middleware checks who you are), the waiter takes
          your order (controller reads the request), the kitchen decides how to
          make it (service applies rules), and someone fetches ingredients from
          the pantry (repository talks to the database).
        </Prose>
        <Prose>
          The key insight: <strong>each layer has one responsibility</strong>.
          The controller never calculates prices. The service never writes SQL.
          The repository never validates business rules. When you mix them, you
          get code that&apos;s hard to test, hard to change, and impossible to
          reuse from a cron job or a different API.
        </Prose>
      </ProseBlock>

      <div className="mb-8">
        <LayerDiagram />
      </div>

      <div className="mb-8">
        <ConceptComparison
          title="What each layer does (and does not)"
          rows={lifecycleLayerComparison}
        />
      </div>

      <Prose>
        <strong>Strategy pattern in the service:</strong> Your pricing logic might
        change (standard, bulk discount, Black Friday). Instead of if/else
        everywhere, the service receives a <code className="font-mono text-zinc-700 bg-zinc-100 px-1">pricingStrategy</code>.
        Same interface, swappable implementation. The service says &quot;calculate
        the total&quot;; it doesn&apos;t care which strategy does it.
      </Prose>

      <CodeBlock code={lifecycleCode} />

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <ChallengeLabel>Challenge: sort into layers</ChallengeLabel>
          <DragBucket
            items={lifecycleBucketItems}
            buckets={lifecycleBucketBuckets}
            correctMapping={lifecycleBucketMapping}
            prompt="Each description belongs to exactly one layer. Drag each into the correct bucket."
          />
        </div>
        <div>
          <ChallengeLabel>Challenge: fill in the blanks</ChallengeLabel>
          <FillBlank
            segments={lifecycleFillSegments}
            prompt="A controller function with two gaps. Select the correct value for each blank."
          />
        </div>
      </div>
    </section>
  );
}
