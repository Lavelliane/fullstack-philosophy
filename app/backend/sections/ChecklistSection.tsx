import Quiz from "../../components/Quiz";
import RevealStepper from "../../components/RevealStepper";
import SectionHeader from "../components/SectionHeader";
import Prose, { ProseBlock } from "../components/Prose";
import ChallengeLabel from "../components/ChallengeLabel";
import WorkshopClosing from "../components/WorkshopClosing";
import { highlightCode } from "../../../lib/shiki";
import { checklistSteps, finalQuizzes } from "../data";

export default async function ChecklistSection() {
  const stepsWithHighlight = await Promise.all(
    checklistSteps.map(async (step) => ({
      ...step,
      codeHtml: step.code ? await highlightCode(step.code) : undefined,
    }))
  );

  return (
    <section id="s6" className="py-20">
      <SectionHeader
        number="06"
        label="The Checklist"
        heading="POST /orders: end to end."
        time="3 min"
      />

      <ProseBlock>
        <Prose>
          Here&apos;s a single <code className="font-mono text-zinc-700 bg-zinc-100 px-1">POST /orders</code> request,
          traced through every layer we discussed. Step through to see how
          middleware, controller, service, repository, and events work together.
        </Prose>
        <Prose>
          Before shipping any endpoint, ask: What&apos;s the contract? Who&apos;s
          allowed? What if it fails? What state changes? Can someone abuse this?
          Frameworks change. This thinking doesn&apos;t.
        </Prose>
      </ProseBlock>

      <ChallengeLabel>Walkthrough: step through the lifecycle</ChallengeLabel>
      <RevealStepper
        steps={stepsWithHighlight}
        prompt="A POST /orders request has just arrived. Step through what happens."
      />

      <div className="mt-12">
        <ChallengeLabel>Final quiz: one from each section</ChallengeLabel>
        <div className="flex flex-col gap-4">
          {finalQuizzes.map((q, i) => (
            <Quiz key={i} {...q} />
          ))}
        </div>
      </div>

      <WorkshopClosing />
    </section>
  );
}
