import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import MatchPairs from "../../components/MatchPairs";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import {
  lettingGoCodeBad,
  lettingGoCodeGood,
  lettingGoPairs,
  lettingGoQuiz,
} from "../data";

export default function LettingGoSection() {
  return (
    <section id="s5" className="py-20">
      <SectionHeader
        number="05"
        label="Letting Go of Control"
        heading="The less a component knows, the more resilient it is."
        time="5 min"
      />

      <ProseBlock>
        <Prose>
          <strong>Dependency Injection (DI):</strong> Your service receives its
          tools; it doesn&apos;t create them. Instead of{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">new PostgresDatabase()</code>{" "}
          inside the class, the constructor receives a{" "}
          <code className="font-mono text-zinc-700 bg-zinc-100 px-1">Database</code>{" "}
          interface. In production you pass a real DB. In tests you pass a fake.
          Same code, different behavior. No mocking frameworks needed for the
          basics.
        </Prose>
        <Prose>
          <strong>Event-Driven / Pub-Sub:</strong> Instead of calling
          NotificationService and InventoryService directly after creating an
          order, emit one event: <code className="font-mono text-zinc-700 bg-zinc-100 px-1">order.created</code>.
          Whoever subscribes reacts. The order service doesn&apos;t know who
          listens. Add analytics later? Just add a subscriber. No changes to the
          order code.
        </Prose>
        <Prose>
          <strong>Queue-Based Load Leveling:</strong> Sending an email or
          generating a PDF shouldn&apos;t block the HTTP response. Push the work
          to a queue. Return immediately. A worker processes it async. The user
          gets a fast response; heavy work happens in the background.
        </Prose>
      </ProseBlock>

      <CodeBlock
        mode="split"
        code={lettingGoCodeBad}
        splitCode={lettingGoCodeGood}
        labels={["Tightly coupled: hard to test", "Dependency Injection: flexible"]}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ChallengeLabel>Challenge: match the patterns</ChallengeLabel>
          <MatchPairs
            pairs={lettingGoPairs}
            prompt="Connect each pattern to its one-line purpose."
          />
        </div>
        <div>
          <ChallengeLabel>Challenge: pub/sub subscribers</ChallengeLabel>
          <Quiz {...lettingGoQuiz} />
        </div>
      </div>
    </section>
  );
}
