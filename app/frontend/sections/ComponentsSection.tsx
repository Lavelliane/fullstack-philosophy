import CodeBlock from "../components/CodeBlock";
import CodeWithDiagram from "../components/CodeWithDiagram";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import ComponentsVisual from "../components/ComponentsVisual";
import {
  ComponentCardsVisual,
  ComponentComparisonBadVisual,
  ComponentComparisonVisual,
  PropsButtonsVisual,
  PropsFlowVisual,
  ChildToParentFlowVisual,
  ChildrenBadgeVisual,
  ComposeLayoutVisual,
} from "../components/CodeVisuals";
import {
  componentComparisonBadCode,
  componentComparisonGoodCode,
  propsIntroCode,
  propsCode,
  propsFlowLoopCode,
  propsSourcesCode,
  childToParentCode,
  childrenCode,
  componentQuiz,
  componentDragSortItems,
  componentDragSortCorrectOrder,
  propsMatchPairs,
} from "../data";

const compositionSlideCode = `// Parent owns data, passes as props
function StudentDashboard() {
  const [students, setStudents] = useState([]);
  return (
    <Layout>
      <NavBar />
      {students.map(s => (
        <StudentCard key={s.id} student={s} />
      ))}
      <Badge>Dean's List</Badge>
      <Footer />
    </Layout>
  );
}`;

export default function ComponentsSection() {
  return (
    <section id="s2" style={{ scrollSnapAlign: "start" }}>

      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center px-8 md:px-16 overflow-y-auto py-6"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(140px, 28vw, 260px)", lineHeight: 1 }}
        >
          02
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl relative z-10 shrink-0">
          <div className="min-w-0">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 02 · 5 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-8"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Stop copying.
              <br />
              Start composing.
            </h2>

            <p className="text-sm text-zinc-600 leading-relaxed mb-4">
              Break UI into <strong className="text-zinc-900">self-contained units</strong>: Button, StudentCard, NavBar.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-900 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Component
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Reusability.</strong> One definition, many uses. Change once → updates everywhere.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-500 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Props
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Parent passes data down.</strong> Child receives, renders. Props come from parent&apos;s state, fetch, or its props.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-400 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Children
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Content between tags. <strong className="text-zinc-900">&lt;Card&gt;...&lt;/Card&gt;</strong>, whatever goes inside becomes the <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">children</code> prop.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-200 text-zinc-800 px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Compose
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Nest simple parts. <strong className="text-zinc-900">Page is components all the way down.</strong>
                </p>
              </div>
            </div>

            <div className="mt-4 border-l-2 border-zinc-900 pl-4 py-0.5">
              <p className="text-base font-light text-zinc-900 leading-snug italic">
                &ldquo;Change the component once. It updates everywhere.&rdquo;
              </p>
              <p className="text-xs text-zinc-500 mt-1.5 not-italic">
                Props down. State up. Re-render → new props. That&apos;s the loop.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 min-w-0 max-w-lg">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
              In code
            </p>
            <CodeBlock code={compositionSlideCode} lang="jsx" />
          </div>
        </div>

        <div className="w-full px-0 pt-4 shrink-0">
          <ComponentsVisual />
        </div>

        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">
            Practice ↓
          </span>
        </div>
      </div>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-7xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Challenges: Section 02
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              Copy-paste vs reuse. Props flow. Child to parent. Same ideas, hands-on.
            </p>
          </div>
        </div>

        {/* 1. Copy-paste vs reuse — two CodeWithDiagram, each with its own diagram */}
        <ChallengeSection>
          <ChallengeLabel>Copy-paste vs. reuse</ChallengeLabel>
          <div className="space-y-10">
            <CodeWithDiagram
              label="Bad: 12 copies"
              description="Copy the same card 12 times. Change the design? Update 12 places."
              code={componentComparisonBadCode}
              lang="html"
              diagram={<ComponentComparisonBadVisual />}
              orientation="vertical"
            />
            <CodeWithDiagram
              label="Good: one loop"
              description="One component, students.map(...). Change the card? Change it once."
              code={componentComparisonGoodCode}
              diagram={<ComponentComparisonVisual />}
              orientation="vertical"
            />
          </div>
        </ChallengeSection>

        {/* 2. Props: linear flow in one section */}
        <ChallengeSection>
          <ChallengeLabel>Props: definition → flow → callbacks → children</ChallengeLabel>
          <p className="text-sm text-zinc-600 mb-6 border-l-2 border-zinc-300 pl-4">
            Props are inputs a parent passes to a child. One-way flow: parent → child. Child communicates up via callbacks. Follow the flow below.
          </p>

          <div className="space-y-10">
            <CodeWithDiagram
              label="What are props?"
              description={
                <p>Inputs like function arguments. Can be <strong>data</strong>, <strong>callbacks</strong> (onClick, onSelect), or <strong>children</strong>. Read-only.</p>
              }
              code={propsIntroCode}
              diagram={<ComponentCardsVisual />}
            />

            <CodeWithDiagram
              label="Same component, different inputs"
              description={
                <p>One definition, many uses. Pass different props → get different output. <code className="px-1 py-0.5 rounded bg-zinc-100">onClick</code> is a callback prop.</p>
              }
              code={propsCode}
              diagram={<PropsButtonsVisual />}
            />

            <CodeWithDiagram
              label="The props flow loop"
              description={
                <p><strong>Parent owns data</strong> → passes as props → <strong>child renders</strong>. State change → re-render → new props flow down.</p>
              }
              code={propsFlowLoopCode}
              diagram={<PropsFlowVisual />}
            />

            <CodeWithDiagram
              label="Where do props come from?"
              description={
                <p><strong>Always the parent.</strong> From state, pass-through, fetch, derived, or hardcoded.</p>
              }
              code={propsSourcesCode}
              diagram={<ComponentCardsVisual />}
            />

            <CodeWithDiagram
              label="Child to parent: callbacks"
              description={
                <p>Props flow down. To communicate up: pass a function. Child calls it with data. Parent&apos;s handler updates state.</p>
              }
              code={childToParentCode}
              diagram={<ChildToParentFlowVisual />}
              orientation="horizontal"
              footer={
                <p><strong className="text-zinc-700">Patterns:</strong> Callback props (onSelect), lift state up, Context for deep trees.</p>
              }
            />

            <CodeWithDiagram
              label="Children: content between tags"
              description={
                <p>Whatever goes inside <code className="px-1 py-0.5 rounded bg-zinc-100">&lt;Card&gt;...&lt;/Card&gt;</code> becomes the <code className="px-1 py-0.5 rounded bg-zinc-100">children</code> prop.</p>
              }
              code={childrenCode}
              diagram={<ChildrenBadgeVisual />}
            />
          </div>
        </ChallengeSection>

        {/* 3. Compose — before challenges */}
        <ChallengeSection>
          <ChallengeLabel>Compose: putting it together</ChallengeLabel>
          <CodeWithDiagram
            label="Nest components"
            description={
              <p>A page is Layout with NavBar, content, and Footer inside. Components all the way down.</p>
            }
            code={compositionSlideCode}
            diagram={<ComposeLayoutVisual />}
            orientation="horizontal"
          />
        </ChallengeSection>

        {/* 4. Challenges */}
        <ChallengeSection>
          <ChallengeLabel>Challenge A: reuse in action</ChallengeLabel>
          <Quiz {...componentQuiz} scoreId="frontend:s2:quiz" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: match the vocabulary</ChallengeLabel>
          <MatchPairs
            pairs={propsMatchPairs}
            prompt="Match each term to its correct definition."
            scoreId="frontend:s2:match"
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge C: build a component</ChallengeLabel>
          <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
            You create a component in one file, then use it elsewhere. Drag the steps into the order you&apos;d follow: first <strong>define and export</strong> the component, then <strong>import and use</strong> it.
          </p>
          <DragSort
            items={componentDragSortItems}
            correctOrder={componentDragSortCorrectOrder}
            prompt="Drag the steps into the correct order for creating and using a React component."
            successMessage="Correct! Define → markup → export, then import → use. That's the flow."
            failureMessage="Not quite. Remember: define and export first, then import and use."
            scoreId="frontend:s2:sort"
          />
        </ChallengeSection>
      </div>
    </section>
  );
}

