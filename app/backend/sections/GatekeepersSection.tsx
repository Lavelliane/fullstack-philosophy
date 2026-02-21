import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import {
  gatekeepersCode,
  gatekeepersDragItems,
  gatekeepersCorrectOrder,
  gatekeepersQuiz,
} from "../data";

export default function GatekeepersSection() {
  return (
    <section id="s2" className="py-20">
      <SectionHeader
        number="02"
        label="The Gatekeepers"
        heading="Every route answers three questions."
        time="5 min"
      />

      <ProseBlock>
        <Prose>
          Before your business logic runs, every request must pass three checks.
          <strong> Who are you?</strong> (Authentication).{" "}
          <strong>Are you allowed?</strong> (Authorization).{" "}
          <strong>Is the input valid?</strong> (Validation). These run in that
          order, as a pipeline of middleware.
        </Prose>
        <Prose>
          Why that order? You can&apos;t check permissions until you know who the
          user is. You can&apos;t process a body until you know it&apos;s
          well-formed. Each layer can short-circuit: invalid token → 401, wrong
          role → 403, missing field → 400. The principle:{" "}
          <strong>never trust the client</strong>. Assume every request could be
          malicious. These layers exist so your system works correctly even when
          users send garbage or try to access things they shouldn&apos;t.
        </Prose>
      </ProseBlock>

      <CodeBlock code={gatekeepersCode} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ChallengeLabel>Challenge: order the pipeline</ChallengeLabel>
          <DragSort
            items={gatekeepersDragItems}
            correctOrder={gatekeepersCorrectOrder}
            prompt="Drag the middleware steps into the correct order. What runs first?"
          />
        </div>
        <div>
          <ChallengeLabel>Challenge: true or false?</ChallengeLabel>
          <Quiz {...gatekeepersQuiz} />
        </div>
      </div>
    </section>
  );
}
